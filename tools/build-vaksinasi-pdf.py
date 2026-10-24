# -*- coding: utf-8 -*-
"""Build printable vaccination-schedule PDFs from src/vaksinasi-data.js.

Run from the project root:  python tools/build-vaksinasi-pdf.py
(also runs automatically at the end of tools/build-vaksinasi-data.py)
"""
import json
import re
import subprocess
import sys
from pathlib import Path

from fpdf import FPDF

ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / 'assets' / 'pdf'
LOGO = ROOT / 'assets' / 'images' / 'logo-white.png'

BRAND = (216, 48, 48)
BRAND_DARK = (119, 32, 23)
INK = (45, 45, 45)
MUTED = (107, 101, 96)
LINE = (241, 231, 224)
CREAM = (255, 249, 245)
ROW_ALT = (255, 250, 247)
WHITE = (255, 255, 255)
SOFT = (253, 241, 238)
HEAD_BG = (250, 236, 232)

WA = '0811-4677-700'
SITE = 'dokterpanggil.id'
PAGE_URL = 'dokterpanggil.id/layanan/vaksinasi.html'

FILES = {
    'anak': 'jadwal-vaksinasi-anak.pdf',
    'dewasa': 'jadwal-vaksinasi-dewasa.pdf',
    'perjalanan': 'jadwal-vaksinasi-perjalanan.pdf',
    'lansia': 'jadwal-vaksinasi-lansia.pdf',
}

# Web copy says "Pilih ..." (tabs); the PDF has no tabs, so that sentence is swapped for these.
LEAD_SUFFIX = {
    'anak': 'Berikut daftar vaksin yang dapat direkomendasikan sesuai usia anak.',
    'dewasa': 'Berikut daftar vaksin yang dapat dipertimbangkan untuk setiap kelompok.',
    'perjalanan': 'Berikut daftar vaksin yang dapat dipertimbangkan sesuai kebutuhan perjalanan.',
    'lansia': 'Berikut daftar vaksin yang dapat dipertimbangkan sesuai kelompok usia.',
}

# Same copy as the "Pilihan Vaksinasi" / "Bagaimana Vaksinasi di Rumah Dilakukan?" sections on layanan/vaksinasi.html.
BOOKING_NOTE = ('Layanan vaksinasi wajib melalui booking terlebih dahulu untuk memastikan ketersediaan vaksin '
                'dan persiapan pelayanan. Dokter tetap memeriksa kondisi pasien sebelum vaksin diberikan.')
STEPS = [
    ('Booking Vaksinasi', 'Sampaikan kebutuhan vaksinasi, data pasien, dan jenis vaksin bila sudah diketahui.'),
    ('Konfirmasi Vaksin, Jadwal & Deposit', 'Tim mengonfirmasi ketersediaan vaksin, jadwal, dan rencana kunjungan dokter, lalu deposit dilakukan.'),
    ('Persiapan Vaksin', 'Vaksin dan kebutuhan medis disiapkan setelah booking dan deposit terkonfirmasi.'),
    ('Dokter Datang Melakukan Pemeriksaan', 'Dokter memeriksa kondisi kesehatan pasien sebelum vaksinasi di rumah.'),
    ('Vaksinasi oleh Dokter', 'Vaksin diberikan langsung oleh dokter apabila kondisi pasien sesuai.'),
]
HELP_TITLE = 'Belum Tahu Vaksin yang Dibutuhkan?'
HELP_BODY = ('Kami bantu menentukan kebutuhan vaksinasi. Saat melakukan booking, informasikan usia, riwayat '
             'vaksinasi, serta tujuan atau kebutuhan vaksinasi kepada Tim Dokter Panggil. Apabila tersedia, '
             'siapkan buku imunisasi, sertifikat, atau catatan vaksinasi sebelumnya.')

FONT_REG = Path(r'C:\Windows\Fonts\segoeui.ttf')
FONT_BOLD = Path(r'C:\Windows\Fonts\segoeuib.ttf')
if not FONT_REG.exists():
    FONT_REG = Path(r'C:\Windows\Fonts\arial.ttf')
    FONT_BOLD = Path(r'C:\Windows\Fonts\arialbd.ttf')

LEFT = 12
WIDTH = 186
COL_W = [36, 70, 36, 44]  # vaksin, manfaat, jadwal, merek
PAGE_BOTTOM = 278


def load_data():
    raw = subprocess.check_output(
        ['node', '-e', "process.stdout.write(JSON.stringify(require('./src/vaksinasi-data.js')))"],
        cwd=str(ROOT),
    )
    return json.loads(raw.decode('utf-8'))


def pdf_lead(key, lead):
    sentences = [s for s in re.split(r'(?<=\.)\s+', lead or '') if s and not s.startswith('Pilih')]
    return ' '.join(sentences + [LEAD_SUFFIX.get(key, '')]).strip()


def brand_text(vax):
    if vax.get('brandPending') or not str(vax.get('brand') or '').strip():
        if vax.get('brands'):
            return ' / '.join(vax['brands'])
        return 'Dikonfirmasi saat booking'
    brands = vax.get('brands') or [vax.get('brand')]
    return ' / '.join(b for b in brands if b)


def schedule_text(vax):
    schedules = vax.get('schedules') or ([vax.get('schedule')] if vax.get('schedule') else [])
    return ' / '.join(s for s in schedules if s) or '—'


class SchedulePDF(FPDF):
    def __init__(self, category):
        super().__init__(format='A4', unit='mm')
        self.category = category
        self.set_auto_page_break(auto=False)
        self.set_margins(LEFT, 12, LEFT)
        self.add_font('UI', '', str(FONT_REG))
        self.add_font('UI', 'B', str(FONT_BOLD))
        self.current_age = ''
        self.alias_nb_pages('{nb}')

    # ---------------------------------------------------------------- chrome
    def header(self):
        self.set_fill_color(*BRAND)
        self.rect(0, 0, 210, 30, 'F')
        self.set_fill_color(*BRAND_DARK)
        self.rect(0, 30, 210, 1.2, 'F')
        if LOGO.exists():
            self.image(str(LOGO), x=LEFT, y=8, h=14)
        self.set_text_color(*WHITE)
        self.set_font('UI', 'B', 15)
        self.set_xy(80, 8)
        self.cell(118, 8, self.category['title'], align='R')
        self.set_font('UI', '', 8.5)
        self.set_text_color(255, 225, 225)
        self.set_xy(80, 17)
        self.cell(118, 5, 'Vaksinasi di Rumah  ·  Makassar  ·  Layanan 24 Jam', align='R')
        self.set_y(38)

    def footer(self):
        self.set_draw_color(*LINE)
        self.set_line_width(0.3)
        self.line(LEFT, 282, LEFT + WIDTH, 282)
        self.set_font('UI', '', 7)
        self.set_text_color(*MUTED)
        self.set_xy(LEFT, 284)
        self.multi_cell(140, 3.4, self.category.get('note', ''), align='L')
        self.set_xy(LEFT + 140, 284)
        self.set_font('UI', 'B', 7.5)
        self.set_text_color(*BRAND)
        self.cell(WIDTH - 140, 3.4, SITE, align='R', new_x='LMARGIN', new_y='NEXT')
        self.set_xy(LEFT + 140, 287.6)
        self.set_font('UI', '', 7)
        self.set_text_color(*MUTED)
        self.cell(WIDTH - 140, 3.4, f'Halaman {self.page_no()} dari {{nb}}', align='R')

    def ensure_space(self, needed, repeat_table=False):
        if self.get_y() + needed > PAGE_BOTTOM:
            self.add_page()
            if repeat_table:
                self.table_header()
                if self.current_age:
                    self.age_band(self.current_age + '  (lanjutan)')

    # ------------------------------------------------------------- blocks
    def intro(self, lead):
        y = self.get_y()
        self.set_font('UI', '', 9.5)
        lead_h = self._text_height(lead, WIDTH - 12, 4.8)
        self.set_font('UI', '', 8.3)
        note_h = self._text_height(BOOKING_NOTE, WIDTH - 20, 4.1)
        box_h = 5 + lead_h + 3 + note_h + 5 + 5
        self.set_fill_color(*CREAM)
        self.set_draw_color(*LINE)
        self.rect(LEFT, y, WIDTH, box_h, 'DF', round_corners=True, corner_radius=3)

        self.set_xy(LEFT + 6, y + 5)
        self.set_font('UI', '', 9.5)
        self.set_text_color(*INK)
        self.multi_cell(WIDTH - 12, 4.8, lead, align='L')

        ny = self.get_y() + 3
        self.set_fill_color(*SOFT)
        self.rect(LEFT + 6, ny, WIDTH - 12, note_h + 5, 'F', round_corners=True, corner_radius=2)
        self.set_fill_color(*BRAND)
        self.ellipse(LEFT + 9, ny + 2.6, 3, 3, 'F')
        self.set_font('UI', 'B', 6)
        self.set_text_color(*WHITE)
        self.set_xy(LEFT + 9, ny + 2.55)
        self.cell(3, 3, 'i', align='C')
        self.set_xy(LEFT + 14, ny + 2.4)
        self.set_font('UI', '', 8.3)
        self.set_text_color(*BRAND_DARK)
        self.multi_cell(WIDTH - 20, 4.1, BOOKING_NOTE, align='L')

        self.set_y(y + box_h + 3)
        self.set_font('UI', '', 7.8)
        self.set_text_color(*MUTED)
        self.multi_cell(WIDTH, 3.8, 'Cara membaca tabel: setiap baris adalah satu jenis vaksin. Kolom Jadwal menunjukkan '
                        'dosis atau interval pemberian. Merek dapat berubah sesuai ketersediaan saat booking.', align='L')
        self.ln(4)

    def section_title(self, text, sub=''):
        self.set_font('UI', '', 8.5)
        sub_h = self._text_height(sub, WIDTH - 6, 4) if sub else 0
        self.ensure_space(8 + sub_h + 22)
        y = self.get_y()
        self.set_fill_color(*BRAND)
        self.rect(LEFT, y + 0.5, 2.2, 6 + sub_h, 'F', round_corners=True, corner_radius=1)
        self.set_xy(LEFT + 5, y)
        self.set_font('UI', 'B', 12.5)
        self.set_text_color(*INK)
        self.cell(0, 6.5, text, new_x='LMARGIN', new_y='NEXT')
        if sub:
            self.set_x(LEFT + 5)
            self.set_font('UI', '', 8.5)
            self.set_text_color(*MUTED)
            self.multi_cell(WIDTH - 6, 4, sub, align='L')
        self.ln(2.5)

    def table_header(self):
        y = self.get_y()
        self.set_fill_color(*HEAD_BG)
        self.rect(LEFT, y, WIDTH, 7.5, 'F', round_corners=True, corner_radius=1.5)
        self.set_text_color(*BRAND)
        self.set_font('UI', 'B', 8)
        x = LEFT
        for i, label in enumerate(['VAKSIN', 'MANFAAT', 'JADWAL', 'MEREK']):
            self.set_xy(x + 2, y)
            self.cell(COL_W[i] - 2, 7.5, label)
            x += COL_W[i]
        self.set_y(y + 7.5)

    def age_band(self, text):
        self.ensure_space(14)
        y = self.get_y()
        self.set_fill_color(*SOFT)
        self.rect(LEFT, y, WIDTH, 6.5, 'F')
        self.set_fill_color(*BRAND)
        self.rect(LEFT, y, 1, 6.5, 'F')
        self.set_xy(LEFT + 3, y)
        self.set_font('UI', 'B', 8.5)
        self.set_text_color(*BRAND)
        self.cell(WIDTH - 3, 6.5, text, new_x='LMARGIN', new_y='NEXT')

    def table_row(self, cells, alt=False):
        heights = []
        for i, text in enumerate(cells):
            self.set_font('UI', 'B' if i == 0 else '', 8)
            heights.append(self._text_height(text or '—', COL_W[i] - 4, 3.7))
        h = max(heights) + 3.6
        self.ensure_space(h, repeat_table=True)
        y = self.get_y()
        self.set_fill_color(*(ROW_ALT if alt else WHITE))
        self.rect(LEFT, y, WIDTH, h, 'F')
        self.set_draw_color(*LINE)
        self.set_line_width(0.2)
        self.line(LEFT, y + h, LEFT + WIDTH, y + h)
        x = LEFT
        for i, text in enumerate(cells):
            self.set_xy(x + 2, y + 1.8)
            self.set_font('UI', 'B' if i == 0 else '', 8)
            muted = i == 3 and text == 'Dikonfirmasi saat booking'
            self.set_text_color(*(MUTED if muted or text == '—' else INK))
            self.multi_cell(COL_W[i] - 4, 3.7, text or '—', align='L', new_x='RIGHT', new_y='TOP')
            x += COL_W[i]
        self.set_y(y + h)

    def closing(self):
        """How home vaccination works + help box, mirroring layanan/vaksinasi.html."""
        gap = 3
        col_w = (WIDTH - gap * (len(STEPS) - 1)) / len(STEPS)
        inner = col_w - 6
        card_h = 0
        for title, desc in STEPS:
            self.set_font('UI', 'B', 8.3)
            t_h = self._text_height(title, inner, 3.9)
            self.set_font('UI', '', 7.6)
            d_h = self._text_height(desc, inner, 3.6)
            card_h = max(card_h, 13 + t_h + 1.5 + d_h + 3.5)
        self.set_font('UI', '', 8.6)
        help_h = self._text_height(HELP_BODY, WIDTH - 16, 4.3) + 23

        # Steps and the help box stay together so the help box never sits alone on a page.
        self.ensure_space(14 + card_h + 4 + help_h)
        self.ln(1)
        self.section_title('Bagaimana Vaksinasi di Rumah Dilakukan?')
        y = self.get_y()
        for k, (title, desc) in enumerate(STEPS):
            self._step(LEFT + k * (col_w + gap), y, col_w, card_h, k + 1, title, desc)
        self.set_y(y + card_h + 4)
        y = self.get_y()
        self.set_fill_color(*BRAND)
        self.rect(LEFT, y, WIDTH, help_h, 'F', round_corners=True, corner_radius=3)
        self.set_xy(LEFT + 8, y + 5)
        self.set_font('UI', 'B', 12)
        self.set_text_color(*WHITE)
        self.cell(0, 6, HELP_TITLE, new_x='LMARGIN', new_y='NEXT')
        self.set_xy(LEFT + 8, y + 11.5)
        self.set_font('UI', '', 8.6)
        self.set_text_color(255, 232, 232)
        self.multi_cell(WIDTH - 16, 4.3, HELP_BODY, align='L')
        cy = self.get_y() + 2.5
        self.set_xy(LEFT + 8, cy)
        self.set_font('UI', 'B', 9)
        self.set_text_color(*WHITE)
        self.cell(0, 5, f'WhatsApp & Hotline 24 Jam: {WA}     ·     {PAGE_URL}')

    def _step(self, x, y, w, h, n, title, desc):
        self.set_fill_color(*WHITE)
        self.set_draw_color(*LINE)
        self.set_line_width(0.3)
        self.rect(x, y, w, h, 'DF', round_corners=True, corner_radius=2.5)
        self.set_fill_color(*BRAND)
        self.ellipse(x + 3, y + 3.5, 7.5, 7.5, 'F')
        self.set_font('UI', 'B', 7.5)
        self.set_text_color(*WHITE)
        self.set_xy(x + 3, y + 3.5)
        self.cell(7.5, 7.5, f'{n:02d}', align='C')
        self.set_xy(x + 3, y + 13)
        self.set_font('UI', 'B', 8.3)
        self.set_text_color(*INK)
        self.multi_cell(w - 6, 3.9, title, align='L')
        self.set_xy(x + 3, self.get_y() + 1.5)
        self.set_font('UI', '', 7.6)
        self.set_text_color(*MUTED)
        self.multi_cell(w - 6, 3.6, desc, align='L')

    def _text_height(self, text, width, line_h):
        lines = self.multi_cell(width, line_h, text or '', dry_run=True, output='LINES')
        return max(1, len(lines)) * line_h


def write_pdf(key, category):
    pdf = SchedulePDF(category)
    pdf.set_title(category['title'] + ' | Dokter Panggil')
    pdf.set_author('Dokter Panggil')
    pdf.set_subject('Jadwal vaksinasi di rumah - Dokter Panggil Makassar')
    pdf.set_creator(SITE)
    pdf.add_page()
    pdf.intro(pdf_lead(key, category.get('lead')))

    for tab in category.get('tabs') or []:
        pdf.current_age = ''
        pdf.section_title(tab.get('label') or '', tab.get('lead') or '')
        pdf.table_header()
        row_i = 0
        for group in tab.get('groups') or []:
            age = (group.get('age') or '').strip()
            pdf.current_age = age
            if age:
                pdf.age_band(age)
            for vax in group.get('vaccines') or []:
                pdf.table_row(
                    [vax.get('name') or '—', vax.get('benefit') or '—', schedule_text(vax), brand_text(vax)],
                    alt=(row_i % 2 == 1),
                )
                row_i += 1
        pdf.current_age = ''
        pdf.ln(5)

    pdf.closing()

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    dest = OUT_DIR / FILES[key]
    pdf.output(str(dest))
    print('Wrote', dest)


def main():
    data = load_data()
    for key in ('anak', 'dewasa', 'perjalanan', 'lansia'):
        if key not in data:
            print('Missing', key, file=sys.stderr)
            continue
        write_pdf(key, data[key])


if __name__ == '__main__':
    main()
