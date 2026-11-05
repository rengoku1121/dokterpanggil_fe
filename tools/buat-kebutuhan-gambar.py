# -*- coding: utf-8 -*-
"""Tulis ulang KEBUTUHAN GAMBAR DI WEBSITE.docx — versi mudah dibaca."""
from docx import Document
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.enum.text import WD_ALIGN_PARAGRAPH, WD_LINE_SPACING
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.shared import Cm, Pt, RGBColor

OUT = r"KEBUTUHAN GAMBAR DI WEBSITE.docx"
RED = RGBColor(0xD8, 0x30, 0x30)
CHARCOAL = RGBColor(0x2D, 0x2D, 0x2D)
GRAY = RGBColor(0x5A, 0x5A, 0x5A)
WHITE = RGBColor(0xFF, 0xFF, 0xFF)
HEAD_BG = "D83030"
ALT_BG = "FFF6F4"
SIZE_BG = "F4E8E4"


def set_run(run, size=11, bold=False, color=CHARCOAL, font="Calibri"):
    run.font.name = font
    run._element.rPr.rFonts.set(qn("w:eastAsia"), font)
    run.font.size = Pt(size)
    run.bold = bold
    run.font.color.rgb = color


def add_p(doc, text, *, size=11, bold=False, color=CHARCOAL, space_after=8, space_before=0, center=False):
    p = doc.add_paragraph()
    p.paragraph_format.space_after = Pt(space_after)
    p.paragraph_format.space_before = Pt(space_before)
    p.paragraph_format.line_spacing = 1.15
    if center:
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    run = p.add_run(text)
    set_run(run, size=size, bold=bold, color=color)
    return p


def add_mixed(doc, parts, *, space_after=8, space_before=0):
    p = doc.add_paragraph()
    p.paragraph_format.space_after = Pt(space_after)
    p.paragraph_format.space_before = Pt(space_before)
    p.paragraph_format.line_spacing = 1.15
    for text, kwargs in parts:
        run = p.add_run(text)
        set_run(run, **kwargs)
    return p


def shade(cell, hex_color):
    tc = cell._tc
    tcPr = tc.get_or_add_tcPr()
    for child in list(tcPr):
        if child.tag == qn("w:shd"):
            tcPr.remove(child)
    shd = OxmlElement("w:shd")
    shd.set(qn("w:fill"), hex_color)
    shd.set(qn("w:val"), "clear")
    tcPr.append(shd)


def set_cell_border(cell):
    tc = cell._tc
    tcPr = tc.get_or_add_tcPr()
    tcBorders = OxmlElement("w:tcBorders")
    for edge in ("top", "left", "bottom", "right"):
        el = OxmlElement(f"w:{edge}")
        el.set(qn("w:val"), "single")
        el.set(qn("w:sz"), "4")
        el.set(qn("w:space"), "0")
        el.set(qn("w:color"), "E8D4CE")
        tcBorders.append(el)
    tcPr.append(tcBorders)


def set_cell_text(cell, text, *, bold=False, size=10.5, color=CHARCOAL, center=False, white=False):
    cell.text = ""
    p = cell.paragraphs[0]
    p.paragraph_format.space_before = Pt(3)
    p.paragraph_format.space_after = Pt(3)
    p.paragraph_format.line_spacing = 1.12
    if center:
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    run = p.add_run(text)
    set_run(run, size=size, bold=bold, color=WHITE if white else color)


def set_widths(table, widths_cm):
    table.autofit = False
    table.allow_autofit = False
    for row in table.rows:
        for i, w in enumerate(widths_cm):
            row.cells[i].width = Cm(w)


def make_table(doc, headers, rows, widths, size_col=None):
    table = doc.add_table(rows=1 + len(rows), cols=len(headers))
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    table.style = "Table Grid"
    for i, h in enumerate(headers):
        cell = table.rows[0].cells[i]
        shade(cell, HEAD_BG)
        set_cell_border(cell)
        set_cell_text(cell, h, bold=True, size=10.5, white=True, center=True)
    for r_i, row in enumerate(rows):
        for c_i, val in enumerate(row):
            cell = table.rows[r_i + 1].cells[c_i]
            set_cell_border(cell)
            is_size = size_col is not None and c_i == size_col
            if is_size:
                shade(cell, SIZE_BG)
            elif r_i % 2 == 1:
                shade(cell, ALT_BG)
            set_cell_text(
                cell,
                val,
                bold=is_size,
                size=10.5,
                center=(c_i == 0 or is_size),
            )
    set_widths(table, widths)
    doc.add_paragraph().paragraph_format.space_after = Pt(4)
    return table


def heading(doc, text):
    add_p(doc, text, size=16, bold=True, color=RED, space_before=16, space_after=6)


def subhead(doc, text):
    add_p(doc, text, size=13, bold=True, color=CHARCOAL, space_before=10, space_after=4)


def size_line(doc, size):
    add_mixed(
        doc,
        [
            ("Ukuran kirim:  ", {"size": 11, "bold": True, "color": CHARCOAL}),
            (size, {"size": 12, "bold": True, "color": RED}),
        ],
        space_after=6,
    )


def main():
    doc = Document()
    section = doc.sections[0]
    section.page_width = Cm(21.0)
    section.page_height = Cm(29.7)
    section.left_margin = Cm(1.8)
    section.right_margin = Cm(1.8)
    section.top_margin = Cm(1.6)
    section.bottom_margin = Cm(1.6)

    add_p(doc, "Dokter Panggil", size=11, bold=True, color=RED, space_after=2, center=True)
    add_p(doc, "Daftar Foto untuk Website", size=22, bold=True, color=CHARCOAL, space_after=4, center=True)
    add_p(
        doc,
        "Panduan singkat untuk tim yang menyiapkan foto. Tidak perlu pengetahuan IT.",
        size=11,
        color=GRAY,
        space_after=14,
        center=True,
    )

    heading(doc, "Yang perlu diingat")
    tips = [
        "Kirim file JPG. Satu kegiatan atau satu orang = satu file.",
        "Ukuran di bawah adalah ukuran file yang dikirim (lebar × tinggi, dalam piksel). Boleh lebih besar, jangan lebih kecil.",
        "Cek ukuran di HP: buka foto → Info / Details. Yang dipakai angka piksel, bukan sentimeter.",
        "Orang atau kegiatan taruh di tengah foto. Sisi kiri akan tertutup tulisan, jadi jangan menempelkan wajah di pinggir.",
        "Website yang akan memotong foto menyesuaikan layar HP dan laptop. Tidak perlu menulis teks di atas fotonya.",
        "Pakaian dinas, suasana rumah atau ruang praktik. Hindari KTP, nama obat pasien, atau layar yang menampilkan data pribadi.",
    ]
    for t in tips:
        p = doc.add_paragraph(style="List Bullet")
        p.paragraph_format.space_after = Pt(4)
        p.paragraph_format.line_spacing = 1.15
        run = p.add_run(t)
        set_run(run, size=11)

    heading(doc, "Ukuran yang dipakai")
    add_p(
        doc,
        "Semua foto di daftar mengikuti salah satu ukuran ini.",
        size=11,
        color=GRAY,
        space_after=8,
    )
    make_table(
        doc,
        ["Jenis foto", "Ukuran kirim", "Bentuk", "Jumlah"],
        [
            ["Layar depan halaman utama", "2400 × 1600 piksel", "Mendatar, memenuhi layar", "3 foto"],
            ["Tentang Kami", "1600 × 1000 piksel", "Mendatar", "1 foto"],
            ["Kartu 4 layanan utama", "1400 × 875 piksel", "Mendatar, agak lebar", "4 foto"],
            ["Foto dokter & tim perawat", "1200 × 800 piksel", "Mendatar, dari dada ke atas", "21 foto"],
            ["Pita foto atas halaman layanan", "2000 × 1125 piksel", "Mendatar, ada tulisan di kiri", "20 foto"],
        ],
        [5.4, 4.2, 5.2, 2.4],
        size_col=1,
    )
    add_mixed(
        doc,
        [
            ("Total yang perlu disiapkan:  ", {"size": 11, "bold": False, "color": CHARCOAL}),
            ("49 foto.", {"size": 11, "bold": True, "color": RED}),
        ],
        space_after=4,
    )

    heading(doc, "1. Layar depan halaman utama — 3 foto")
    size_line(doc, "2400 × 1600 piksel")
    add_p(
        doc,
        "Foto ini mengisi seluruh layar di paling atas website. Di HP foto terpotong menjadi tegak, di laptop melebar. Wajah dan kegiatan taruh di tengah-atas, jangan di bagian bawah foto.",
        size=11,
        color=GRAY,
        space_after=8,
    )
    make_table(
        doc,
        ["No", "Foto", "Yang perlu terlihat"],
        [
            ["1", "Dokter Umum 24 jam", "Dokter umum sedang memeriksa pasien di rumah"],
            ["2", "Dokter spesialis", "Dokter spesialis sedang berkonsultasi dengan pasien / keluarga"],
            ["3", "Layanan lengkap di rumah", "Suasana perawatan di rumah (dokter, perawat, atau tindakan sederhana)"],
        ],
        [1.4, 5.0, 10.8],
    )

    heading(doc, "2. Tentang Kami — 1 foto")
    size_line(doc, "1600 × 1000 piksel")
    add_p(
        doc,
        "Muncul di halaman utama, bagian “Perawatan yang Datang ke Rumah Anda”. Di HP foto hampir persegi, di laptop lebih melebar. Taruh orang di tengah.",
        size=11,
        color=GRAY,
        space_after=8,
    )
    make_table(
        doc,
        ["No", "Foto", "Yang perlu terlihat"],
        [["1", "Tentang Kami", "Perawat atau dokter mendampingi pasien di rumah, kesan hangat dan profesional"]],
        [1.4, 5.0, 10.8],
    )

    heading(doc, "3. Kartu 4 layanan utama — 4 foto")
    size_line(doc, "1400 × 875 piksel")
    add_p(
        doc,
        "Foto ini dipakai dua kali: di kotak layanan halaman utama, dan di halaman daftar semua layanan (tampil lebih besar). Satu foto cukup untuk keduanya.",
        size=11,
        color=GRAY,
        space_after=8,
    )
    make_table(
        doc,
        ["No", "Foto", "Yang perlu terlihat"],
        [
            ["1", "Dokter Umum 24 jam", "Dokter umum datang / memeriksa di rumah"],
            ["2", "Dokter Spesialis ke Rumah", "Dokter spesialis saat kunjungan ke rumah"],
            ["3", "Perawat Homecare", "Perawat mendampingi atau merawat pasien di rumah"],
            ["4", "Rawat Inap di Rumah", "Perawatan jangka di rumah (lansia atau pasien yang didampingi)"],
        ],
        [1.4, 5.4, 10.4],
    )

    heading(doc, "4. Foto dokter dan tim perawat — 21 foto")
    size_line(doc, "1200 × 800 piksel  (setiap orang / satu foto tim)")
    add_p(
        doc,
        "Dipakai di halaman Temukan Dokter: di kartu nama dan saat tombol Detail dibuka. Website memotong foto menjadi pita pendek, jadi wajah harus di tengah, dari dada ke atas. Bukan foto full body. Latar polos atau ruang praktik. Pakaian dinas.",
        size=11,
        color=GRAY,
        space_after=8,
    )

    subhead(doc, "Dokter umum — 8 foto")
    make_table(
        doc,
        ["No", "Nama"],
        [
            ["1", "dr. Michele Wijaya Oei"],
            ["2", "dr. Aryanti Suardi"],
            ["3", "dr. Annisa Westania Danial"],
            ["4", "dr. Nurul Rifqiani Djerman"],
            ["5", "dr. Siswana Ainun Khafifa"],
            ["6", "dr. Kurniawan Trijaya"],
            ["7", "dr. Moch Raedy Noorizki"],
            ["8", "dr. Nur Fadhila J"],
        ],
        [1.8, 15.4],
    )

    subhead(doc, "Dokter spesialis — 12 foto")
    make_table(
        doc,
        ["No", "Nama", "Bidang"],
        [
            ["1", "dr. Fransiska Carmelia Subeno, Sp.N", "Saraf"],
            ["2", "dr. Leonard Prawiharjo, Sp.PD", "Penyakit Dalam"],
            ["3", "dr. Andi Muhammad Late Reza, Sp.P, AIFO-K", "Paru"],
            ["4", "dr. Muhammad Remo Lingga Riesta Armyda, Sp.An", "Anestesi & Nyeri"],
            ["5", "dr. Nurul Rezqi Amaliah, Sp.M", "Mata"],
            ["6", "dr. Emil Kardani Murdiyanto, Sp.THT-BKL", "THT"],
            ["7", "dr. Muchlisah Suci Chumaira", "Konselor Laktasi"],
            ["8", "dr. Caroline, Sp.GK", "Gizi Klinik"],
            ["9", "dr. Grace Musu'Tombilayuk, Sp.GK", "Gizi Klinik"],
            ["10", "dr. Daniel S Lawrence, Sp.JP, FIHA", "Jantung"],
            ["11", "dr. Usman Darwis, Sp.A", "Anak"],
            ["12", "dr. Dessy Natalia, Sp.KJ", "Kedokteran Jiwa"],
        ],
        [1.4, 10.2, 5.6],
    )

    subhead(doc, "Tim perawat — 1 foto")
    make_table(
        doc,
        ["No", "Foto", "Yang perlu terlihat"],
        [["1", "Tim Perawat Dokter Panggil", "Foto bersama tim perawat, atau satu perawat representatif, pakaian dinas"]],
        [1.4, 5.4, 10.4],
    )

    heading(doc, "5. Pita foto atas halaman layanan — 20 foto")
    size_line(doc, "2000 × 1125 piksel")
    add_p(
        doc,
        "Ini foto di bagian atas tiap halaman layanan, bukan layar penuh. Ada judul di sisi kiri, jadi kegiatan utama taruh di tengah foto.",
        size=11,
        color=GRAY,
        space_after=8,
    )

    subhead(doc, "Layanan utama — 4 foto")
    make_table(
        doc,
        ["No", "Halaman", "Yang perlu terlihat"],
        [
            ["1", "Dokter Umum 24 jam", "Dokter umum saat kunjungan ke rumah"],
            ["2", "Dokter Spesialis ke Rumah", "Dokter spesialis saat kunjungan ke rumah"],
            ["3", "Perawat Homecare", "Perawat merawat / mendampingi di rumah"],
            ["4", "Rawat Inap di Rumah", "Pendampingan perawatan di rumah"],
        ],
        [1.4, 5.4, 10.4],
    )

    subhead(doc, "Tindakan medis — 9 foto")
    make_table(
        doc,
        ["No", "Halaman", "Yang perlu terlihat"],
        [
            ["1", "Terapi Infus", "Pemasangan atau pemantauan infus di rumah"],
            ["2", "Infus Vitamin", "Infus vitamin di rumah (bukan close-up botol saja)"],
            ["3", "Terapi Oksigen", "Pasien memakai oksigen, didampingi tenaga kesehatan"],
            ["4", "Terapi Nebulizer", "Nebulizer di rumah"],
            ["5", "Perawatan Luka", "Perawatan luka yang rapi dan sopan (luka tidak perlu close-up)"],
            ["6", "Vaksinasi", "Pemberian vaksin di rumah"],
            ["7", "Pemasangan Selang Makan", "Pendampingan pemasangan / perawatan selang makan"],
            ["8", "Pemasangan Kateter Urin", "Suasana tindakan yang sopan, tanpa menampilkan area privat"],
            ["9", "Suction / Sedot Dahak", "Tindakan suction di rumah"],
        ],
        [1.4, 5.4, 10.4],
    )

    subhead(doc, "Pemeriksaan dan penunjang — 2 foto")
    make_table(
        doc,
        ["No", "Halaman", "Yang perlu terlihat"],
        [
            ["1", "Laboratorium di Rumah", "Petugas lab mengambil sampel di rumah"],
            ["2", "Layanan Farmasi 24 jam", "Penyiapan atau penyerahan obat ke pasien / keluarga"],
        ],
        [1.4, 5.4, 10.4],
    )

    subhead(doc, "Layanan lainnya — 2 foto")
    make_table(
        doc,
        ["No", "Halaman", "Yang perlu terlihat"],
        [
            ["1", "Medical Check-Up", "Pemeriksaan kesehatan di rumah"],
            ["2", "Konsultasi Online", "Dokter berkonsultasi lewat layar / HP, kesan jelas dan profesional"],
        ],
        [1.4, 5.4, 10.4],
    )

    subhead(doc, "Halaman kumpulan — 3 foto")
    make_table(
        doc,
        ["No", "Halaman", "Yang perlu terlihat"],
        [
            ["1", "Daftar semua layanan", "Tim medis datang ke rumah, kesan layanan lengkap"],
            ["2", "Kumpulan tindakan medis", "Tindakan medis sederhana di rumah"],
            ["3", "Temukan Dokter (halaman direktori)", "Tim dokter / perawat Dokter Panggil"],
        ],
        [1.4, 6.2, 9.6],
    )
    add_p(
        doc,
        "Catatan: halaman Dokter Umum, Perawat, dan Dokter Spesialis yang lain boleh memakai foto yang sama dengan pita layanan terkait. Tidak perlu foto tambahan.",
        size=10.5,
        color=GRAY,
        space_after=6,
    )

    heading(doc, "Yang belum perlu disiapkan")
    skip = [
        "Cerita dari Pasien Kami di halaman utama masih berupa kutipan teks. Foto pasien belum dipasang.",
        "Pilihan Infus Vitamin (Immunobooster, Multivitamin, Vitamin C) dan kartu jenis vaksin masih berupa ikon, bukan foto.",
    ]
    for t in skip:
        p = doc.add_paragraph(style="List Bullet")
        p.paragraph_format.space_after = Pt(4)
        run = p.add_run(t)
        set_run(run, size=11)

    heading(doc, "Ringkasan")
    make_table(
        doc,
        ["Bagian", "Jumlah", "Ukuran kirim"],
        [
            ["Layar depan halaman utama", "3", "2400 × 1600 piksel"],
            ["Tentang Kami", "1", "1600 × 1000 piksel"],
            ["Kartu 4 layanan utama", "4", "1400 × 875 piksel"],
            ["Dokter umum", "8", "1200 × 800 piksel"],
            ["Dokter spesialis", "12", "1200 × 800 piksel"],
            ["Tim perawat", "1", "1200 × 800 piksel"],
            ["Pita halaman layanan", "20", "2000 × 1125 piksel"],
            ["Total", "49", "—"],
        ],
        [7.2, 2.6, 7.4],
        size_col=2,
    )
    add_p(
        doc,
        "Kalau foto sudah ada tetapi ukurannya lebih kecil dari angka di atas, mohon kirim ulang file aslinya dari kamera atau HP (bukan hasil screenshot atau hasil kompres WhatsApp).",
        size=11,
        color=GRAY,
        space_after=8,
    )

    doc.save(OUT)
    print("Wrote", OUT)


if __name__ == "__main__":
    main()
