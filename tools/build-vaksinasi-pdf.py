# -*- coding: utf-8 -*-
"""Build printable vaccination-schedule PDFs from vaksinasi-data.js."""
import json
import subprocess
import sys
from pathlib import Path

from fpdf import FPDF

ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / 'assets' / 'pdf'
LOGO = ROOT / 'assets' / 'images' / 'logo-white.png'

BRAND = (216, 48, 48)
INK = (45, 45, 45)
MUTED = (92, 92, 92)
LINE = (241, 231, 224)
CREAM = (255, 249, 245)
ROW_ALT = (255, 247, 243)
WHITE = (255, 255, 255)
SOFT = (252, 246, 242)

WA = '0811-4677-700'
SITE = 'dokterpanggil.id'

FILES = {
    'anak': 'jadwal-vaksinasi-anak.pdf',
    'dewasa': 'jadwal-vaksinasi-dewasa.pdf',
    'perjalanan': 'jadwal-vaksinasi-perjalanan.pdf',
    'lansia': 'jadwal-vaksinasi-lansia.pdf',
}

FONT_REG = Path(r'C:\Windows\Fonts\segoeui.ttf')
FONT_BOLD = Path(r'C:\Windows\Fonts\segoeuib.ttf')
if not FONT_REG.exists():
    FONT_REG = Path(r'C:\Windows\Fonts\arial.ttf')
    FONT_BOLD = Path(r'C:\Windows\Fonts\arialbd.ttf')

COL_W = [38, 68, 38, 46]  # vaksin, manfaat, jadwal, merek  (190mm usable)


def load_data():
    raw = subprocess.check_output(
        ['node', '-e', "process.stdout.write(JSON.stringify(require('./vaksinasi-data.js')))"],
        cwd=str(ROOT),
    )
    return json.loads(raw.decode('utf-8'))


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
        self.set_auto_page_break(auto=True, margin=20)
        self.set_left_margin(12)
        self.set_right_margin(12)
        self.add_font('UI', '', str(FONT_REG))
        self.add_font('UI', 'B', str(FONT_BOLD))
        self._table_header_drawn = False
        self.current_age = ''

    def header(self):
        self.set_fill_color(*BRAND)
        self.rect(0, 0, 210, 28, 'F')
        if LOGO.exists():
            self.image(str(LOGO), x=12, y=7, h=13)
        self.set_text_color(*WHITE)
        self.set_font('UI', 'B', 14)
        self.set_xy(88, 6.5)
        self.cell(110, 8, self.category['title'], align='R')
        self.set_font('UI', '', 8)
        self.set_text_color(255, 226, 226)
        self.set_xy(88, 15)
        self.cell(110, 5, 'Vaksinasi di rumah  ·  Makassar  ·  24 jam', align='R')
        self.set_y(34)

    def footer(self):
        self.set_y(-16)
        self.set_draw_color(*LINE)
        self.set_line_width(0.3)
        self.line(12, self.get_y(), 198, self.get_y())
        self.set_y(-14)
        self.set_font('UI', '', 7.5)
        self.set_text_color(*MUTED)
        self.cell(120, 5, self.category.get('note', ''), new_x='RIGHT', new_y='TOP')
        self.cell(0, 5, f'Halaman {self.page_no()}  ·  {SITE}  ·  WA {WA}', align='R')

    def section_title(self, text, sub=''):
        if self.get_y() > 250:
            self.add_page()
        self.set_fill_color(*BRAND)
        self.rect(12, self.get_y(), 2.2, 9 if not sub else 13, 'F')
        self.set_xy(17, self.get_y())
        self.set_font('UI', 'B', 12)
        self.set_text_color(*INK)
        self.cell(0, 6, text, new_x='LMARGIN', new_y='NEXT')
        if sub:
            self.set_x(17)
            self.set_font('UI', '', 8.5)
            self.set_text_color(*MUTED)
            self.multi_cell(181, 4, sub)
        self.ln(2)

    def age_band(self, text):
        if self.get_y() > 258:
            self.add_page()
            self.table_header()
        self.set_fill_color(*SOFT)
        self.set_font('UI', 'B', 8.5)
        self.set_text_color(*BRAND)
        self.cell(sum(COL_W), 6.5, '  ' + text, fill=True, new_x='LMARGIN', new_y='NEXT')

    def table_header(self):
        self.set_fill_color(247, 236, 232)
        self.set_text_color(*BRAND)
        self.set_font('UI', 'B', 8)
        labels = ['Vaksin', 'Manfaat', 'Jadwal', 'Merek']
        x = 12
        y = self.get_y()
        h = 7
        if y + h > 277:
            self.add_page()
            y = self.get_y()
        for i, label in enumerate(labels):
            self.set_xy(x, y)
            self.cell(COL_W[i], h, label, fill=True)
            x += COL_W[i]
        self.set_y(y + h)
        self._table_header_drawn = True

    def table_row(self, cells, alt=False):
        self.set_font('UI', '', 8)
        heights = []
        for i, text in enumerate(cells):
            heights.append(self.font_size * 1.35 * max(1, self._wrap_count(text, COL_W[i] - 2)))
        h = max(heights) + 3.2
        if self.get_y() + h > 277:
            self.add_page()
            self.table_header()
            if self.current_age:
                self.age_band(self.current_age + '  (lanjutan)')
        y = self.get_y()
        x = 12
        if alt:
            self.set_fill_color(*ROW_ALT)
        else:
            self.set_fill_color(*WHITE)
        self.set_draw_color(*LINE)
        self.rect(12, y, sum(COL_W), h, 'F')
        self.set_text_color(*INK)
        for i, text in enumerate(cells):
            self.set_xy(x + 1, y + 1.4)
            weight = 'B' if i == 0 else ''
            self.set_font('UI', weight, 8)
            self.multi_cell(COL_W[i] - 2, 3.6, text or '—', new_x='RIGHT', new_y='TOP')
            x += COL_W[i]
        self.set_y(y + h)

    def _wrap_count(self, text, width):
        if not text:
            return 1
        words = str(text).split()
        if not words:
            return 1
        lines = 1
        line = ''
        for word in words:
            trial = (line + ' ' + word).strip()
            if self.get_string_width(trial) <= width:
                line = trial
            else:
                lines += 1
                line = word
        return lines


def write_pdf(category_id, category):
    pdf = SchedulePDF(category)
    pdf.set_title(category['title'])
    pdf.set_author('Dokter Panggil')
    pdf.set_creator('DokterPanggil.id')
    pdf.add_page()

    pdf.set_fill_color(*CREAM)
    pdf.set_draw_color(*LINE)
    box_y = pdf.get_y()
    pdf.set_xy(12, box_y + 2)
    pdf.set_font('UI', '', 9.5)
    pdf.set_text_color(*INK)
    lead = category.get('lead') or ''
    pdf.multi_cell(186, 4.6, lead)
    after = pdf.get_y()
    pdf.set_xy(12, after + 1)
    pdf.set_font('UI', '', 8)
    pdf.set_text_color(*MUTED)
    pdf.multi_cell(186, 4, f'WhatsApp & hotline 24 jam  {WA}   ·   Booking vaksinasi di rumah di Makassar')
    box_bottom = pdf.get_y() + 2
    pdf.set_fill_color(*CREAM)
    # redraw fill behind by drawing a rounded-looking band first is hard; skip
    pdf.set_y(box_bottom + 3)

    pdf.set_font('UI', '', 8)
    pdf.set_text_color(*MUTED)
    pdf.multi_cell(186, 4, 'Cara baca: setiap baris adalah satu jenis vaksin. Kolom Jadwal menunjukkan dosis atau interval. Merek dapat berubah sesuai ketersediaan saat booking.')
    pdf.ln(3)

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
        pdf.ln(4)

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    dest = OUT_DIR / FILES[category_id]
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
