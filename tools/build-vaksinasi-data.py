# -*- coding: utf-8 -*-
"""Convert the vaccine Excel into vaksinasi-data.js (anak, dewasa, perjalanan, lansia)."""
import json
import re
import subprocess
import sys
import openpyxl
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
XLSX = ROOT / 'assets' / 'JADWAL VAKSINASI ANAK DAN DEWASA .xlsx'
OUT = ROOT / 'vaksinasi-data.js'

CHILD_SECTIONS = ('0-2 TAHUN', '3 - 18 TAHUN')

# Display-only fixes; the Excel itself stays untouched.
TEXT_FIXES = [
    ('Hepatisis', 'Hepatitis'),
    ('Diferi', 'Difteri'),
    ('Japanese Ensefalitis', 'Japanese Encephalitis'),
    ('Infranrix', 'Infanrix'),
]


def clean(text):
    out = (text or '').strip()
    for bad, good in TEXT_FIXES:
        out = out.replace(bad, good)
    out = re.sub(r'\(\s+', '(', out)
    out = re.sub(r'\s+\)', ')', out)
    out = re.sub(r',(?=\S)', ', ', out)
    out = re.sub(r'\s{2,}', ' ', out)
    return out.strip()


def read_sections():
    """{SECTION NAME: [{'age': str, 'vaccines': [...]}, ...]} in sheet order."""
    ws = openpyxl.load_workbook(XLSX, data_only=True)['VAKSINASI']
    sections = {}
    section = None
    group = None
    first = True
    for row in ws.iter_rows(values_only=True):
        vals = ['' if c is None else str(c).strip() for c in row[:5]]
        if not any(vals):
            continue
        if first:  # header row
            first = False
            continue
        umur, jenis, manfaat, jadwal, merek = vals
        if umur and not jenis and not manfaat:
            section = umur.upper()
            sections.setdefault(section, [])
            group = None
            continue
        if section is None:
            continue
        if umur:
            group = {'age': clean(umur), 'vaccines': []}
            sections[section].append(group)
        if group is None:
            group = {'age': '', 'vaccines': []}
            sections[section].append(group)
        option = {
            'schedule': clean(jadwal),
            'brand': clean(merek),
            'pending': (merek or '').strip().lower() == 'belum tersedia'
        }
        if not jenis:
            # Row without a vaccine name lists another brand/dose option for the row above.
            if group['vaccines'] and (option['schedule'] or option['brand']):
                group['vaccines'][-1]['options'].append(option)
            continue
        group['vaccines'].append({
            'name': clean(jenis),
            'benefit': clean(manfaat),
            'options': [option]
        })
    for groups in sections.values():
        groups[:] = [g for g in groups if g['vaccines']]
        for group in groups:
            group['vaccines'] = [finalize(v) for v in group['vaccines']]
    return sections


def unique(values):
    seen = []
    for value in values:
        if value and value not in seen:
            seen.append(value)
    return seen


def finalize(vaccine):
    options = vaccine.pop('options')
    pending = all(o['pending'] for o in options)
    schedules = unique(o['schedule'] for o in options)
    brands = [] if pending else unique(o['brand'] for o in options if not o['pending'])
    vaccine['schedule'] = schedules[0] if schedules else ''
    vaccine['brand'] = brands[0] if brands else ''
    vaccine['brandPending'] = pending
    if len(schedules) > 1:
        vaccine['schedules'] = schedules
    if len(brands) > 1:
        vaccine['brands'] = brands
    return vaccine


def child_bucket(label):
    low = label.lower().replace('–', '-')
    match = re.match(r'^(\d+)\s*tahun', low)
    if match:
        years = int(match.group(1))
        if years <= 2:
            return '0-2'
        if years <= 5:
            return '2-5'
        if years <= 12:
            return '6-12'
        return 'remaja'
    return '0-2'


CHILD_TABS = [
    {
        'id': '0-2',
        'label': '0–2 tahun',
        'labelEn': '0–2 years',
        'lead': 'Masa imunisasi dasar dan beberapa dosis lanjutan untuk membangun perlindungan sejak awal kehidupan.',
        'leadEn': 'Primary immunization and some follow-up doses to build protection from early life.'
    },
    {
        'id': '2-5',
        'label': '2–5 tahun',
        'labelEn': '2–5 years',
        'lead': 'Booster dan vaksin lanjutan sesuai usia prasekolah serta pemantauan imunisasi tahunan.',
        'leadEn': 'Boosters and follow-up vaccines for preschool age, plus annual immunization where relevant.'
    },
    {
        'id': '6-12',
        'label': '6–12 tahun',
        'labelEn': '6–12 years',
        'lead': 'Vaksin usia sekolah termasuk booster, influenza, dan vaksin yang mulai relevan pada usia ini.',
        'leadEn': 'School-age vaccines including boosters, influenza, and vaccines that become relevant at this age.'
    },
    {
        'id': 'remaja',
        'label': 'Remaja',
        'labelEn': 'Teens',
        'lead': 'Vaksinasi remaja termasuk booster dan vaksin sesuai kebutuhan usia remaja.',
        'leadEn': 'Adolescent vaccination including boosters and age-appropriate vaccines.'
    }
]

# section name -> optional age label filter within that section
ADULT_TABS = {
    'dewasa': [
        {
            'id': 'dewasa',
            'label': 'Dewasa',
            'labelEn': 'Adults',
            'lead': 'Vaksin yang umum dipertimbangkan pada usia dewasa, termasuk booster yang mungkin sudah terlewat.',
            'leadEn': 'Vaccines commonly considered in adulthood, including boosters that may have been missed.',
            'from': [('DEWASA', None)]
        },
        {
            'id': 'premarital',
            'label': 'Premarital',
            'labelEn': 'Premarital',
            'lead': 'Vaksin yang dapat dipertimbangkan sebelum menikah atau saat merencanakan kehamilan.',
            'leadEn': 'Vaccines that may be considered before marriage or when planning a pregnancy.',
            'from': [('PREMARITAL', 'Premarital')]
        },
        {
            'id': 'hamil',
            'label': 'Ibu Hamil',
            'labelEn': 'Pregnancy',
            'lead': 'Vaksin yang dapat dipertimbangkan selama kehamilan sesuai penilaian dokter dan usia kehamilan.',
            'leadEn': 'Vaccines that may be considered during pregnancy based on the doctor’s assessment and gestational age.',
            'from': [('PREMARITAL', 'Ibu Hamil')]
        },
        {
            'id': 'nakes',
            'label': 'Tenaga Kesehatan',
            'labelEn': 'Healthcare Workers',
            'lead': 'Vaksin yang dapat dipertimbangkan karena risiko paparan di lingkungan kerja kesehatan.',
            'leadEn': 'Vaccines that may be considered because of exposure risk in healthcare settings.',
            'from': [('TENAGA KESEHATAN', None)]
        },
        {
            'id': 'rabies',
            'label': 'Pasca Gigitan Hewan',
            'labelEn': 'After Animal Bite',
            'lead': 'Setelah gigitan hewan yang dicurigai rabies, penanganan perlu dilakukan sesegera mungkin. Hubungi tim untuk arahan lebih lanjut.',
            'leadEn': 'After a bite from an animal suspected of rabies, handling should not be delayed. Contact the team for further guidance.',
            'from': [('PASCA GIGITAN HEWAN TERSANGKA RABIES', None)]
        }
    ],
    'perjalanan': [
        {
            'id': 'travelling',
            'label': 'Negara Tertentu',
            'labelEn': 'Certain Countries',
            'lead': 'Vaksin yang dapat dipertimbangkan atau dipersyaratkan untuk perjalanan ke negara tertentu.',
            'leadEn': 'Vaccines that may be considered or required for travel to certain countries.',
            'from': [('TRAVELLING (NEGARA TERTENTU)', None)]
        },
        {
            'id': 'haji',
            'label': 'Haji & Umroh',
            'labelEn': 'Hajj & Umrah',
            'lead': 'Vaksin yang umum dibutuhkan jemaah haji dan umroh, termasuk yang menjadi persyaratan keberangkatan.',
            'leadEn': 'Vaccines commonly needed by Hajj and Umrah pilgrims, including those required for departure.',
            'from': [('JEMAAH HAJI DAN UMROH', None)]
        }
    ],
    'lansia': [
        {
            'id': '50',
            'label': 'Di atas 50 tahun',
            'labelEn': 'Over 50',
            'lead': 'Vaksin yang dapat dipertimbangkan mulai usia 50 tahun ke atas.',
            'leadEn': 'Vaccines that may be considered from age 50 onwards.',
            'from': [('LANSIA', 'Lansia > 50 tahun')]
        },
        {
            'id': '60',
            'label': 'Di atas 60 tahun',
            'labelEn': 'Over 60',
            'lead': 'Vaksin tambahan yang dapat dipertimbangkan mulai usia 60 tahun ke atas, selain vaksin di atas 50 tahun.',
            'leadEn': 'Additional vaccines that may be considered from age 60 onwards, alongside the over-50 vaccines.',
            'from': [('LANSIA', 'Lansia > 60 tahun')]
        }
    ]
}

CATEGORY_META = {
    'anak': {
        'title': 'Jadwal Vaksinasi Anak',
        'titleEn': 'Child Vaccination Schedule',
        'lead': 'Kebutuhan vaksinasi anak berubah seiring bertambahnya usia. Pilih usia anak untuk melihat vaksin yang dapat direkomendasikan sesuai jadwal imunisasi.',
        'leadEn': 'Child vaccination needs change with age. Select the child’s age to see vaccines that may be recommended on the immunization schedule.',
        'note': 'Jadwal bersifat panduan. Rekomendasi final mengikuti penilaian dokter, riwayat imunisasi, dan ketersediaan vaksin.',
        'noteEn': 'This schedule is a guide. Final recommendations follow the doctor’s assessment, immunization history, and vaccine availability.',
        'tabsLabel': 'Usia anak',
        'tabsLabelEn': 'Child age'
    },
    'dewasa': {
        'title': 'Jadwal Vaksinasi Dewasa',
        'titleEn': 'Adult Vaccination Schedule',
        'lead': 'Kebutuhan vaksin dewasa berbeda untuk setiap orang. Pilih kelompok yang sesuai untuk melihat vaksin yang dapat dipertimbangkan.',
        'leadEn': 'Adult vaccine needs differ from person to person. Select the relevant group to see vaccines that may be considered.',
        'note': 'Jadwal bersifat panduan. Rekomendasi final mengikuti penilaian dokter, riwayat vaksinasi, dan ketersediaan vaksin.',
        'noteEn': 'This schedule is a guide. Final recommendations follow the doctor’s assessment, vaccination history, and vaccine availability.',
        'tabsLabel': 'Kelompok vaksinasi dewasa',
        'tabsLabelEn': 'Adult vaccination groups'
    },
    'perjalanan': {
        'title': 'Jadwal Vaksinasi Perjalanan',
        'titleEn': 'Travel Vaccination Schedule',
        'lead': 'Vaksin perjalanan menyesuaikan tujuan dan persyaratan masuk. Pilih kebutuhan perjalanan untuk melihat vaksin yang dapat dipertimbangkan.',
        'leadEn': 'Travel vaccines depend on destination and entry requirements. Select the travel need to see vaccines that may be considered.',
        'note': 'Jadwal bersifat panduan. Persyaratan negara tujuan dan ketersediaan vaksin dikonfirmasi saat booking.',
        'noteEn': 'This schedule is a guide. Destination requirements and vaccine availability are confirmed when booking.',
        'tabsLabel': 'Kebutuhan perjalanan',
        'tabsLabelEn': 'Travel needs'
    },
    'lansia': {
        'title': 'Jadwal Vaksinasi Lansia',
        'titleEn': 'Elderly Vaccination Schedule',
        'lead': 'Beberapa vaksin dapat dipertimbangkan seiring bertambahnya usia. Pilih kelompok usia untuk melihat vaksin yang dapat dipertimbangkan.',
        'leadEn': 'Some vaccines may be considered as age increases. Select the age group to see vaccines that may be considered.',
        'note': 'Jadwal bersifat panduan. Rekomendasi final mengikuti penilaian dokter, riwayat penyakit, dan obat yang dikonsumsi.',
        'noteEn': 'This schedule is a guide. Final recommendations follow the doctor’s assessment, medical history, and current medicines.',
        'tabsLabel': 'Kelompok usia lansia',
        'tabsLabelEn': 'Older adult age groups'
    }
}


def build_child(sections):
    buckets = {tab['id']: [] for tab in CHILD_TABS}
    for name in CHILD_SECTIONS:
        for group in sections.get(name, []):
            buckets[child_bucket(group['age'])].append(group)
    tabs = []
    for tab in CHILD_TABS:
        tabs.append(dict(tab, groups=buckets[tab['id']]))
    return tabs


def build_adult(sections, key):
    tabs = []
    for tab in ADULT_TABS[key]:
        groups = []
        for section_name, age_filter in tab['from']:
            for group in sections.get(section_name, []):
                if age_filter and group['age'] != age_filter:
                    continue
                groups.append({'age': group['age'], 'vaccines': group['vaccines']})
        if not groups:
            continue
        if len(groups) == 1:
            # Tab label already names the group; avoid repeating it as a heading.
            groups[0]['age'] = ''
        spec = {k: v for k, v in tab.items() if k != 'from'}
        spec['groups'] = groups
        tabs.append(spec)
    return tabs


sections = read_sections()

payload = {'source': 'assets/JADWAL VAKSINASI ANAK DAN DEWASA .xlsx'}
for key in ('anak', 'dewasa', 'perjalanan', 'lansia'):
    tabs = build_child(sections) if key == 'anak' else build_adult(sections, key)
    payload[key] = dict(CATEGORY_META[key], tabs=tabs)

js = (
    '/** Auto-generated from Excel — run: python tools/build-vaksinasi-data.py */\n'
    '(function (root, factory) {\n'
    '    const api = factory();\n'
    '    if (typeof module === "object" && module.exports) module.exports = api;\n'
    '    else root.VAKSINASI_DATA = api;\n'
    '})(typeof self !== "undefined" ? self : this, function () {\n'
    '    return ' + json.dumps(payload, ensure_ascii=False, indent=4) + ';\n'
    '});\n'
)
OUT.write_text(js, encoding='utf-8')

print('Wrote', OUT)
for key in ('anak', 'dewasa', 'perjalanan', 'lansia'):
    tabs = payload[key]['tabs']
    total = sum(len(g['vaccines']) for t in tabs for g in t['groups'])
    print('  {:11s} tabs={} vaccines={}'.format(key, [t['id'] for t in tabs], total))

subprocess.check_call([sys.executable, str(ROOT / 'tools' / 'build-vaksinasi-pdf.py')])
