/**
 * Generates the standalone SEO landing pages, sitemap.xml, and robots.txt.
 *
 *   node tools/build-seo.js
 *
 * Reads services-data.js plus seo-data.js (page-only content). Writes SEO
 * landing pages under layanan/, dokter/, and dokter-spesialis/. About, FAQ,
 * locations, and contact stay on index.html only.
 *
 * Pages flagged `published: false` in seo-data.js render with a noindex robots
 * tag and are left out of sitemap.xml.
 */
const fs = require('fs');
const path = require('path');
const { SERVICES, COMMON, pick } = require('../services-data.js');
const { SITE, IMG, SERVICE_SEO, DOCTOR_PAGES } = require('../seo-data.js');
const SEO_EN = require('../seo-en.js');
const VAKSINASI_DATA = require('../vaksinasi-data.js');

const ROOT = path.join(__dirname, '..');
const LANG = 'id';
const BRAND = '#D83030';

const L = obj => pick(obj, LANG);
const T = key => pick(COMMON[key], LANG);
const Ten = key => pick(COMMON[key], 'en');

function asBi(idVal, enVal) {
    const id = idVal == null ? '' : String(idVal);
    const en = enVal == null || enVal === '' ? id : String(enVal);
    return { id, en };
}

function biAttrs(idVal, enVal) {
    const { id, en } = asBi(idVal, enVal);
    return ' data-i18n-id="' + esc(id) + '" data-i18n-en="' + esc(en) + '"';
}

function biSpan(idVal, enVal, className) {
    const { id, en } = asBi(idVal, enVal);
    return '<span' + (className ? ' class="' + className + '"' : '') + biAttrs(id, en) + '>' + esc(id) + '</span>';
}

function biTag(tag, idVal, enVal, attrs) {
    const { id, en } = asBi(idVal, enVal);
    return '<' + tag + (attrs ? ' ' + attrs : '') + biAttrs(id, en) + '>' + esc(id) + '</' + tag + '>';
}

/**
 * Only services with an entry in SERVICE_SEO get a landing page, so every other
 * page must link to this list rather than SERVICES -- otherwise adding a service
 * to services-data.js would scatter broken links across the whole site.
 */
const SEO_SERVICES = SERVICES.filter(s => Boolean(SERVICE_SEO[s.slug]));

/* ------------------------------------------------------------------ helpers */

function esc(value) {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

function photo(id, width) {
    return 'https://images.unsplash.com/' + id + '?w=' + width + '&q=80&auto=format&fit=crop';
}

function icon(name, size, color) {
    const aliases = { 'hand-helping': 'helping-hand', bandage: 'plus-square', cross: 'plus-square' };
    const id = aliases[name] || name;
    return '<i data-lucide="' + id + '" style="width:' + size + 'px;height:' + size + 'px;color:' + color + '"></i>';
}

function waLink(message) {
    return 'https://wa.me/' + SITE.waNumber + '?text=' + encodeURIComponent(message);
}

function openingHours() {
    return {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: SITE.opens,
        closes: SITE.closes
    };
}

function jsonLd(data) {
    return '<script type="application/ld+json">' + JSON.stringify(data) + '</script>';
}

/** '' for a root-level file, '../' for one directory deep, etc. */
function rootPrefix(file) {
    return '../'.repeat(file.split('/').length - 1);
}

function absUrl(urlPath) {
    return SITE.url + urlPath;
}

/* ------------------------------------------------------- content components */

function sectionHead(title, subtitle, titleEn, subtitleEn) {
    return biTag('h2', title, titleEn, 'class="text-2xl sm:text-3xl font-bold ' + (subtitle ? 'mb-2' : 'mb-6') + '"')
        + (subtitle ? biTag('p', subtitle, subtitleEn, 'class="text-gray-500 mb-6 leading-relaxed max-w-3xl"') : '');
}

function prose(paragraphs, paragraphsEn) {
    const enList = paragraphsEn || [];
    return '<div class="seo-prose">' + paragraphs.map((p, i) =>
        biTag('p', p, enList[i], '')
    ).join('') + '</div>';
}

function bulletList(items, iconName, tint, color, itemsEn) {
    const enList = itemsEn || [];
    return '<ul class="seo-list">' + items.map((item, i) =>
        '<li><span class="seo-dot" style="background:' + tint + '">' + icon(iconName, 13, color) + '</span>'
        + biSpan(item, enList[i], '') + '</li>'
    ).join('') + '</ul>';
}

function card(inner, extraClass) {
    return '<div class="canva-card rounded-2xl p-6 sm:p-8' + (extraClass ? ' ' + extraClass : '') + '">' + inner + '</div>';
}

function faqBlock(items, itemsEn) {
    const enList = itemsEn || [];
    return '<div class="canva-card rounded-2xl px-6 sm:px-8 py-1">' + items.map((f, i) => {
        const fe = enList[i] || {};
        return '<div class="seo-faq-item">'
            + '<button type="button" class="seo-faq-q" aria-expanded="false">' + biSpan(f.q, fe.q, '') + icon('chevron-down', 18, BRAND) + '</button>'
            + '<div class="seo-faq-a">' + biTag('div', f.a, fe.a, '') + '</div>'
            + '</div>';
    }).join('') + '</div>';
}

function emergencyBlock() {
    return '<div class="rounded-2xl border border-[#F3C9C9] bg-[#FFF4F2] p-5 sm:p-6 flex gap-4">'
        + '<span class="shrink-0">' + icon('alert-triangle', 20, BRAND) + '</span>'
        + '<div>' + biTag('p', T('emergency.title'), Ten('emergency.title'), 'class="font-semibold mb-1"')
        + biTag('p', T('emergency.body'), Ten('emergency.body'), 'class="text-sm text-gray-600 leading-relaxed"')
        + '</div></div>';
}

function isInternalCtaHref(href) {
    if (!href) return false;
    if (href.charAt(0) === '#') return true;
    if (/^https?:\/\//i.test(href)) return false;
    return href.indexOf('wa.me') === -1;
}

function ctaPair(opts) {
    const book = { id: T('cta.book'), en: Ten('cta.book') };
    const ask = { id: T('cta.ask'), en: Ten('cta.ask') };
    const bookLabel = isInternalCtaHref(opts && opts.bookHref) && opts.bookLabel ? opts.bookLabel : book;
    const askLabel = isInternalCtaHref(opts && opts.askHref) && opts.askLabel ? opts.askLabel : ask;
    return { bookLabel, askLabel };
}

function ctaBlock(prefix, waMessage, headline, body, bookMessage, opts) {
    const bookMsg = bookMessage || waMessage;
    const { bookLabel, askLabel } = ctaPair(opts);
    const bookHref = (opts && opts.bookHref) || waLink(bookMsg);
    const askHref = (opts && opts.askHref) || waLink(waMessage);
    const bookTarget = (opts && opts.bookHref) ? '' : ' target="_blank" rel="noopener noreferrer"';
    const askTarget = (opts && opts.askHref) ? '' : ' target="_blank" rel="noopener noreferrer"';
    return '<div class="rounded-3xl bg-primary text-white p-7 sm:p-10 text-center">'
        + biTag('h2', headline, opts && opts.headlineEn, 'class="text-2xl sm:text-3xl font-bold mb-3"')
        + biTag('p', body, opts && opts.bodyEn, 'class="opacity-90 max-w-2xl mx-auto mb-7 leading-relaxed"')
        + '<div class="flex flex-col sm:flex-row gap-3 justify-center">'
        + '<a href="' + esc(bookHref) + '"' + bookTarget + biAttrs(bookLabel.id, bookLabel.en) + ' class="px-7 py-3.5 rounded-full bg-white text-primary font-semibold transition-transform hover:scale-105">' + esc(bookLabel.id) + '</a>'
        + '<a href="' + esc(askHref) + '"' + askTarget + biAttrs(askLabel.id, askLabel.en) + ' class="px-7 py-3.5 rounded-full border-2 border-white/70 text-white font-semibold transition-transform hover:scale-105 hover:bg-white/10">' + esc(askLabel.id) + '</a>'
        + '</div></div>';
}

/** Form D1 — full body for Dokter Umum 24 Jam (typos from client wording cleaned). */
function dokterUmumBody(prefix, en) {
    const {
        composeBody, aboutCard, whenCards, iconInfoCards, iconRowCards, howStepCards,
        compactStepCards, whyCards, pills, pathCards, doctorNursePathCards, doubtBox,
        noteLine, promoBanner, linkCards, flowPills
    } = sections;
    const e = en.d1 || en;
    const waAsk = 'Halo, saya ingin bertanya tentang dokter umum ke rumah di Makassar.';
    const waBook = 'Halo, saya ingin panggil dokter umum ke rumah di Makassar.';
    const waArea = 'Halo, saya ingin bertanya jangkauan layanan Dokter Panggil di area saya.';

    const whenItems = [
        {
            title: 'Sedang Sakit dan Membutuhkan Pemeriksaan Dokter',
            desc: 'Demam, batuk, pilek, sakit tenggorokan, pusing, mual, muntah, diare, nyeri, badan lemas, atau keluhan kesehatan lainnya yang perlu diperiksa secara langsung'
        },
        {
            title: 'Pasien Sulit atau Tidak Nyaman Bepergian',
            desc: 'Cocok untuk lansia, pasien yang sedang lemas, dalam masa pemulihan, atau memiliki keterbatasan mobilitas sehingga lebih nyaman diperiksa di rumah'
        },
        {
            title: 'Anak Sedang Sakit',
            desc: 'Ketika anak demam atau kurang sehat dan orang tua ingin mendapatkan pemeriksaan dokter tanpa harus membawa anak keluar rumah atau mengantre'
        },
        {
            title: 'Membutuhkan Penilaian Sebelum Perawatan Lanjutan',
            desc: 'Dokter dapat melakukan pemeriksaan terlebih dahulu untuk menentukan apakah pasien membutuhkan obat, pemeriksaan laboratorium, tindakan medis, perawatan oleh perawat, konsultasi spesialis, atau pemeriksaan lebih lanjut di fasilitas kesehatan.'
        }
    ];

    const symptoms = [
        'Diare', 'Nyeri Perut', 'Badan Lemas', 'Nyeri Otot & Sendi', 'Alergi Ringan',
        'Keluhan Kulit Ringan', 'Tekanan Darah', 'Gula Darah', 'Keluhan Lansia', 'Keluhan Umum Lainnya'
    ];
    const symptomsEn = e.symptoms || symptoms;

    const visitSteps = [
        { n: '01', title: 'Evaluasi Keluhan', desc: 'Dokter menanyakan keluhan, riwayat penyakit, obat yang sedang digunakan, dan informasi kesehatan lainnya.' },
        { n: '02', title: 'Pemeriksaan Fisik', desc: 'Pemeriksaan tanda vital dan pemeriksaan fisik dilakukan sesuai kondisi pasien. Peralatan medis standar akan dibawa saat pemeriksaan.' },
        { n: '03', title: 'Penilaian & Penanganan', desc: 'Dokter menjelaskan hasil pemeriksaan dan memberikan terapi atau tindakan awal bila diperlukan.' },
        { n: '04', title: 'Rencana Perawatan Selanjutnya', desc: 'Bila dibutuhkan, dokter dapat merekomendasikan obat, pemeriksaan laboratorium, tindakan medis, konsultasi dokter spesialis, atau rujukan ke fasilitas kesehatan.' }
    ];

    const followUps = [
        { icon: 'pill', title: 'Obat & Farmasi', desc: 'Membantu kebutuhan obat sesuai resep atau anjuran dokter.' },
        { icon: 'test-tubes', title: 'Pemeriksaan Laboratorium', desc: 'Pengambilan sampel dapat dilakukan langsung di rumah.' },
        { icon: 'syringe', title: 'Tindakan Medis', desc: 'Infus, nebulizer, perawatan luka, pemasangan kateter, dan tindakan lain sesuai indikasi.' },
        { icon: 'heart-handshake', title: 'Perawat Homecare hingga Rawat Inap di Rumah', desc: 'Pendampingan dan pemantauan pasien untuk kebutuhan perawatan lanjutan.' }
    ];

    const howSteps = [
        { n: '1', title: 'Hubungi Kami 24 Jam', desc: 'WhatsApp atau hubungi Call Centre Dokter Panggil.' },
        { n: '2', title: 'Sampaikan Kondisi Pasien', desc: 'Informasikan keluhan, KTP pasien, serta lokasi kunjungan.' },
        { n: '3', title: 'Konfirmasi Layanan & Biaya', desc: 'Tim akan menginformasikan layanan dan perkiraan biaya sebelum kunjungan.' },
        { n: '4', title: 'Dokter Menghubungi Anda', desc: 'Setelah dikonfirmasi, dokter yang bertugas akan menghubungi Anda untuk persiapan dan kunjungan.' }
    ];

    const whyItems = [
        { title: 'Tersedia 24 Jam', desc: 'Akses dokter umum kapan dibutuhkan, termasuk malam hari.' },
        { title: 'Pemeriksaan Langsung di Rumah', desc: 'Pasien tidak perlu antre atau bepergian ketika sedang kurang sehat.' },
        { title: 'Perawatan Terkoordinasi', desc: 'Kebutuhan obat, laboratorium, tindakan medis, hingga perawat dapat dikoordinasikan setelah pemeriksaan.' },
        { title: 'Untuk Seluruh Keluarga', desc: 'Layanan tersedia untuk berbagai kebutuhan kesehatan anak, dewasa, hingga lansia.' }
    ];
    const whyIcons = ['clock', 'home', 'share-2', 'users'];

    const faqs = [
        {
            q: 'Berapa lama dokter akan sampai ke rumah?',
            a: 'Waktu kedatangan bergantung pada lokasi pasien, kondisi lalu lintas, dan lokasi dokter saat pemesanan. Setelah pesanan dikonfirmasi, tim medis akan menginformasikan perkiraan waktu kunjungan.'
        },
        {
            q: 'Berapa biaya kunjungan dokter umum ke rumah?',
            a: 'Biaya kunjungan dokter umum sebesar Rp220.000 untuk satu kali kunjungan, ditambah biaya transportasi dokter sebesar Rp10.000/km dari lokasi Dokter Panggil. Kunjungan di luar jam kerja dikenakan tambahan biaya sebesar 50% dari biaya kunjungan dokter. Biaya tersebut belum termasuk kebutuhan tambahan apabila diperlukan, seperti obat, bahan medis habis pakai, tindakan medis, pemeriksaan laboratorium, jasa tindakan dan transportasi perawat, serta biaya administrasi.'
        },
        {
            q: 'Bisakah satu kunjungan dokter untuk beberapa anggota keluarga?',
            a: 'Ya. Satu kunjungan dapat melayani lebih dari satu anggota keluarga. Sampaikan jumlah pasien saat melakukan pemesanan agar tim kami dapat mempersiapkan waktu pemeriksaan dan kebutuhan medis yang diperlukan. Biaya kunjungan dokter akan dikenakan untuk setiap pasien, sedangkan biaya transportasi dokter hanya dikenakan satu kali dalam kunjungan yang sama.'
        },
        {
            q: 'Apakah dokter datang sendiri?',
            a: 'Tidak. Setiap kunjungan dokter akan didampingi oleh perawat untuk membantu proses pemeriksaan dan pelayanan selama kunjungan. Pendampingan perawat tidak dikenakan biaya tambahan selama tidak terdapat tindakan keperawatan atau tindakan medis yang dilakukan.'
        },
        {
            q: 'Apakah obat disediakan saat kunjungan?',
            a: 'Ya. Sebelum kunjungan, dokter akan melakukan triase awal untuk memahami keluhan dan kondisi pasien. Berdasarkan hasil triase tersebut, dokter akan berkoordinasi dengan tim perawat untuk mempersiapkan obat serta kebutuhan medis yang mungkin diperlukan dan membawanya saat kunjungan. Obat dan kebutuhan medis akan diberikan sesuai hasil pemeriksaan dokter di lokasi dan dikenakan biaya sesuai penggunaan.'
        },
        {
            q: 'Apakah dokter dapat memberikan resep, obat, rekomendasi laboratorium setelah pemeriksaan?',
            a: 'Ya. Apabila diperlukan, dokter dapat memberikan resep, obat, dan rekomendasi laboratorium sesuai hasil pemeriksaan. Kebutuhan selanjutnya akan dikoordinasikan oleh Tim Dokter Panggil.'
        },
        {
            q: 'Apakah dokter dapat melakukan infus atau tindakan medis lainnya di rumah?',
            a: 'Ya. Tindakan medis dapat dilakukan langsung di rumah oleh Tim Medis sesuai kebutuhan pasien dan berdasarkan hasil pemeriksaan dokter.'
        },
        {
            q: 'Apakah dokter dapat memberikan surat keterangan sakit?',
            a: 'Dokter dapat memberikan surat keterangan sakit apabila berdasarkan hasil pemeriksaan terdapat indikasi yang sesuai dengan ketentuan yang berlaku.'
        }
    ];
    const faqEn = e.faqs || [];

    return composeBody([
        sectionHead('Kapan Sebaiknya Memanggil Dokter ke Rumah?', null, e.whenTitle)
        + whenCards(whenItems, e.whenCards),
        sectionHead('Apa yang Dilakukan Dokter Saat Kunjungan', 'Pemeriksaan langsung di rumah — dokter akan melakukan pemeriksaan sesuai keluhan dan kondisi pasien untuk menentukan penanganan yang dibutuhkan.', e.visitTitle, e.visitLead)
        + howStepCards(visitSteps, e.visitSteps),
        sectionHead('Cara Panggil Dokter', null, e.howTitle)
        + howStepCards(howSteps, e.howSteps),
        sectionHead('Keluhan yang Dapat Ditangani Dokter Umum', 'Dokter umum dapat melakukan pemeriksaan dan penanganan awal untuk berbagai keluhan kesehatan pada anak, dewasa, maupun lansia.', e.symptomsTitle, e.symptomsLead)
        + pills(symptoms, symptomsEn)
        + '<p class="mt-5 text-sm text-gray-600 leading-relaxed">'
        + biSpan('Tidak menemukan keluhan Anda? ', e.symptomsMissPrefix || 'Can’t find your concern? ')
        + '<a href="' + esc(waLink(waAsk)) + '" target="_blank" rel="noopener noreferrer" class="font-semibold text-primary hover:underline"'
        + biAttrs('Ceritakan kondisi pasien kepada tim kami melalui WhatsApp. Kami akan membantu mengarahkan layanan yang sesuai.', e.symptomsMissLink || 'Tell our team about the patient’s condition via WhatsApp. We will help direct you to the right service.')
        + '>Ceritakan kondisi pasien kepada tim kami melalui WhatsApp. Kami akan membantu mengarahkan layanan yang sesuai.</a></p>',
        sectionHead('Perawatan Tidak Berhenti Setelah Konsultasi', 'Apabila dibutuhkan berdasarkan hasil pemeriksaan, Tim Dokter Panggil dapat membantu mengoordinasikan layanan lanjutan di rumah:', e.followTitle, e.followLead)
        + iconRowCards(followUps, e.followUps),
        promoBanner({
            tone: 'dark',
            title: 'Butuh Dokter Malam Hari? Kami tetap siap.',
            titleEn: e.nightTitle,
            body: 'Layanan dokter umum tersedia 24 jam, termasuk malam hari, akhir pekan, dan hari libur.',
            bodyEn: e.nightBody,
            cta: 'Pesan Sekarang',
            ctaEn: 'Book Now',
            href: waLink(waBook)
        }),
        promoBanner({
            tone: 'card',
            label: 'Area Layanan',
            labelEn: e.areaLabel,
            title: 'Dokter Umum ke Rumah di Makassar',
            titleEn: e.areaTitle,
            body: 'Layanan tersedia di Kota Makassar, Gowa, dan Maros dalam jangkauan operasional Dokter Panggil.',
            bodyEn: e.areaBody,
            cta: 'Chat WhatsApp',
            ctaEn: 'Chat WhatsApp',
            href: waLink(waArea)
        }),
        doubtBox({
            title: 'Masih ragu apakah kondisi pasien dapat ditangani di rumah?',
            titleEn: e.doubtTitle,
            body: 'Ceritakan keluhan pasien kepada Tim Dokter Panggil. Kami akan membantu mengarahkan layanan yang sesuai.',
            bodyEn: e.doubtBody,
            cta: 'Chat WhatsApp',
            ctaEn: 'Chat WhatsApp',
            href: waLink(waAsk)
        }),
        sectionHead('Mengapa Panggil Dokter Umum dari Dokter Panggil?', null, e.whyTitle)
        + whyCards(whyItems, e.whyItems, whyIcons),
        sectionHead('Pertanyaan Umum', null, e.faqTitle || 'FAQ')
        + faqBlock(faqs, faqEn),
        ctaBlock(prefix, waAsk,
            'Butuh Dokter Datang ke Rumah?',
            'Tidak perlu menunggu atau keluar rumah saat sedang sakit. Hubungi Dokter Panggil dan sampaikan kondisi pasien. Tim kami siap membantu mengatur kunjungan dokter umum ke rumah Anda 24 jam.',
            waBook,
            {
                headlineEn: e.ctaTitle,
                bodyEn: e.ctaBody,
                bookLabel: { id: 'Panggil Dokter Sekarang', en: e.ctaBook || 'Call a Doctor Now' },
                askLabel: { id: 'Chat WhatsApp', en: e.ctaAskChat || 'Chat WhatsApp' }
            })
    ]);
}

/** Form D2 — body for Dokter Spesialis ke Rumah (same section rhythm as D1). */
function dokterSpesialisBody(prefix, en) {
    const {
        composeBody, aboutCard, whenCards, iconInfoCards, iconRowCards, howStepCards,
        compactStepCards, whyCards, pills, pathCards, doctorNursePathCards, doubtBox,
        noteLine, promoBanner, linkCards, flowPills
    } = sections;
    const e = en.d2 || en;
    const waAsk = 'Halo, saya ingin konsultasikan kebutuhan dokter spesialis ke rumah di Makassar.';
    const waBook = 'Halo, saya ingin panggil dokter spesialis ke rumah di Makassar.';
    const findHref = prefix + 'dokter/index.html?cat=spesialis#temukan-dokter';

    const whenItems = [
        {
            title: 'Membutuhkan Pemeriksaan yang Lebih Spesifik',
            desc: 'Ketika kondisi pasien membutuhkan penilaian lebih lanjut oleh dokter spesialis sesuai bidang keahliannya.'
        },
        {
            title: 'Membutuhkan Kontrol atau Evaluasi Lanjutan',
            desc: 'Untuk pasien yang membutuhkan pemantauan kondisi, evaluasi pengobatan, atau konsultasi lanjutan setelah pemeriksaan maupun perawatan sebelumnya.'
        },
        {
            title: 'Pasien Sulit atau Tidak Nyaman Bepergian',
            desc: 'Cocok untuk lansia, pasien dengan keterbatasan mobilitas, dalam masa pemulihan, atau kondisi lain yang membuat perjalanan ke fasilitas kesehatan menjadi lebih sulit.'
        },
        {
            title: 'Membutuhkan Perawatan Lanjutan di Rumah',
            desc: 'Dokter spesialis dapat mengevaluasi kondisi pasien dan memberikan rekomendasi perawatan selanjutnya yang dapat dikoordinasikan bersama tim homecare sesuai kebutuhan.'
        }
    ];

    const flowSteps = [
        { n: '01', title: 'Sampaikan Kebutuhan Pasien', desc: 'Informasikan kondisi pasien atau dokter spesialis yang dibutuhkan.' },
        { n: '02', title: 'Pilih Dokter Spesialis', desc: 'Tim membantu menemukan dokter sesuai kebutuhan pasien.' },
        { n: '03', title: 'Penjadwalan Kunjungan', desc: 'Waktu kunjungan dikoordinasikan terlebih dahulu bersama dokter spesialis.' },
        { n: '04', title: 'Dokter Datang ke Rumah', desc: 'Setelah jadwal dikonfirmasi, dokter spesialis melakukan pemeriksaan dan konsultasi langsung di rumah.' }
    ];

    const getItems = [
        { n: '01', title: 'Konsultasi Medis', desc: 'Evaluasi keluhan dan riwayat kesehatan.' },
        { n: '02', title: 'Pemeriksaan Langsung', desc: 'Pemeriksaan sesuai bidang spesialisasi dan kondisi pasien.' },
        { n: '03', title: 'Rencana Penanganan', desc: 'Dokter memberikan rekomendasi terapi dan tindak lanjut.' },
        { n: '04', title: 'Koordinasi Layanan Lanjutan', desc: 'Laboratorium, obat, perawat, atau layanan lain dapat dibantu sesuai rekomendasi dokter.' }
    ];

    const followUps = [
        { icon: 'pill', title: 'Obat & Farmasi', desc: 'Membantu kebutuhan obat sesuai resep atau anjuran dokter.' },
        { icon: 'test-tubes', title: 'Pemeriksaan Laboratorium', desc: 'Pengambilan sampel dapat dilakukan langsung di rumah.' },
        { icon: 'syringe', title: 'Tindakan Medis', desc: 'Infus, nebulizer, perawatan luka, pemasangan kateter, dan tindakan lain sesuai indikasi.' },
        { icon: 'heart-handshake', title: 'Perawat Homecare hingga Rawat Inap di Rumah', desc: 'Pendampingan dan pemantauan pasien untuk kebutuhan perawatan lanjutan.' }
    ];

    const howSteps = [
        { n: '1', title: 'Hubungi Kami 24 Jam', desc: 'WhatsApp atau hubungi Call Centre Dokter Panggil.' },
        { n: '2', title: 'Sampaikan Kondisi Pasien', desc: 'Informasikan keluhan, KTP pasien, serta lokasi kunjungan.' },
        { n: '3', title: 'Konfirmasi Layanan & Biaya', desc: 'Tim akan menginformasikan layanan dan perkiraan biaya sebelum kunjungan.' },
        { n: '4', title: 'Dokter Menghubungi Anda', desc: 'Setelah dikonfirmasi, dokter yang bertugas akan menghubungi Anda untuk persiapan dan kunjungan.' }
    ];

    const whyItems = [
        { title: 'Dokter Sesuai Kebutuhan', desc: 'Temukan dokter spesialis berdasarkan bidang keahlian atau kondisi pasien.' },
        { title: 'Konsultasi Nyaman di Rumah', desc: 'Pasien tidak perlu melakukan perjalanan dan menunggu di fasilitas kesehatan.' },
        { title: 'Penjadwalan Terkoordinasi', desc: 'Tim membantu mengoordinasikan jadwal kunjungan bersama dokter spesialis.' },
        { title: 'Perawatan Lanjutan Terintegrasi', desc: 'Kebutuhan setelah konsultasi dapat dikoordinasikan melalui layanan Dokter Panggil.' }
    ];
    const whyIcons = ['stethoscope', 'home', 'calendar', 'share-2'];

    const faqs = [
        {
            q: 'Apakah saya bisa memilih dokter spesialis yang diinginkan?',
            a: 'Ya. Anda dapat memilih dokter spesialis berdasarkan bidang keahlian maupun dokter yang diinginkan. Tim Dokter Panggil akan membantu menghubungi dokter dan mengoordinasikan ketersediaan jadwal kunjungan.'
        },
        {
            q: 'Berapa lama waktu yang dibutuhkan untuk mendapatkan jadwal dokter spesialis?',
            a: 'Waktu kunjungan menyesuaikan ketersediaan dokter spesialis. Setelah menerima permintaan, tim kami akan mengoordinasikan jadwal bersama dokter dan segera menginformasikan pilihan waktu kunjungan kepada pasien atau keluarga.'
        },
        {
            q: 'Berapa biaya kunjungan dokter spesialis ke rumah?',
            a: 'Biaya kunjungan dokter spesialis sebesar Rp450.000 untuk satu kali kunjungan, ditambah biaya transportasi dokter sebesar Rp10.000/km dari lokasi Dokter Panggil. Kunjungan di luar jam kerja dikenakan tambahan biaya sebesar 50% dari biaya kunjungan dokter. Biaya tersebut belum termasuk kebutuhan tambahan apabila diperlukan, seperti obat, bahan medis habis pakai, tindakan medis, pemeriksaan laboratorium, jasa tindakan dan transportasi perawat, serta biaya administrasi.'
        },
        {
            q: 'Apakah dokter spesialis dapat melakukan kontrol rutin di rumah?',
            a: 'Ya. Untuk kondisi yang memungkinkan, konsultasi dan kontrol lanjutan dapat dilakukan di rumah sesuai kebutuhan pasien. Jadwal kunjungan berikutnya dikoordinasikan kembali oleh tim Dokter Panggil.'
        },
        {
            q: 'Bagaimana jika setelah pemeriksaan dokter spesialis pasien membutuhkan obat, laboratorium, atau perawatan lanjutan?',
            a: 'Tim Dokter Panggil dapat membantu mengoordinasikan kebutuhan lanjutan sesuai rekomendasi dokter, seperti obat, pemeriksaan laboratorium, tindakan medis, fisioterapi, maupun pendampingan perawat di rumah.'
        }
    ];
    const faqEn = e.faqs || [];

    return composeBody([
        // Form D2 — pintu ke Temukan Dokter (bukan fake search)
        '<div class="canva-card rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">'
        + '<div class="max-w-2xl">'
        + biTag('h2', 'Temukan Dokter Spesialis', e.findTitle, 'class="text-xl sm:text-2xl font-bold mb-2"')
        + biTag('p', 'Cari berdasarkan nama, spesialisasi, atau kondisi medis.', e.findLead, 'class="text-gray-600 leading-relaxed"')
        + '</div>'
        + '<a href="' + esc(findHref) + '"' + biAttrs('Lihat Dokter Spesialis', e.findCta || 'Browse Specialists') + ' class="shrink-0 px-6 py-3 rounded-full bg-primary text-white text-sm font-semibold text-center hover:scale-105 transition-transform">Lihat Dokter Spesialis</a>'
        + '</div>',
        sectionHead('Kapan Sebaiknya Memanggil Dokter Spesialis ke Rumah?', null, e.whenTitle)
        + whenCards(whenItems, e.whenCards),
        sectionHead('Bagaimana Kunjungan Dokter Spesialis Berlangsung?', null, e.flowTitle)
        + howStepCards(flowSteps, e.flowSteps),
        sectionHead('Cara Panggil Dokter', null, e.howTitle)
        + howStepCards(howSteps, e.howSteps),
        sectionHead('Apa yang Didapatkan Saat Kunjungan?', null, e.getTitle)
        + howStepCards(getItems, e.getItems),
        sectionHead('Perawatan Tidak Berhenti Setelah Konsultasi', 'Tim Dokter Panggil dapat membantu mengoordinasikan kebutuhan perawatan lanjutan sesuai rekomendasi dokter spesialis.', e.followTitle, e.followLead)
        + iconRowCards(followUps, e.followUps),
        doubtBox({
            title: 'Belum tahu dokter spesialis yang tepat?',
            titleEn: e.doubtTitle,
            body: 'Sampaikan kondisi atau kebutuhan pasien kepada tim Dokter Panggil. Kami akan membantu mengarahkan Anda ke dokter spesialis yang sesuai.',
            bodyEn: e.doubtBody,
            cta: 'Temukan Dokter Spesialis',
            ctaEn: e.doubtCta || 'Find a Specialist',
            href: findHref,
            external: false
        }),
        sectionHead('Mengapa Dokter Spesialis bersama Dokter Panggil?', null, e.whyTitle)
        + whyCards(whyItems, e.whyItems, whyIcons),
        sectionHead('Pertanyaan Umum', null, e.faqTitle || 'FAQ')
        + faqBlock(faqs, faqEn),
        ctaBlock(prefix, waAsk,
            'Butuh Dokter Spesialis di Rumah?',
            'Sampaikan kondisi pasien atau dokter spesialis yang Anda butuhkan. Tim Dokter Panggil akan membantu menemukan dokter dan mengoordinasikan jadwal kunjungan.',
            waBook,
            {
                headlineEn: e.ctaTitle,
                bodyEn: e.ctaBody,
                bookLabel: { id: 'Panggil Dokter Spesialis', en: e.ctaBook || 'Call a Specialist' },
                askLabel: { id: 'Temukan Dokter', en: e.ctaFind || 'Find a Doctor' },
                askHref: findHref
            })
    ]);
}

/** Form — Perawat Homecare (same section rhythm as D1/D2). */
function perawatHomecareBody(prefix, en) {
    const {
        composeBody, aboutCard, whenCards, iconInfoCards, iconRowCards, howStepCards,
        compactStepCards, whyCards, pills, pathCards, doctorNursePathCards, doubtBox,
        noteLine, promoBanner, linkCards, flowPills
    } = sections;
    const e = en.d3 || en;
    const waAsk = 'Halo, saya ingin bertanya tentang perawat homecare di Makassar.';
    const waBook = 'Halo, saya ingin konsultasikan kebutuhan perawat homecare di Makassar.';
    const waDoctor = 'Halo, saya ingin konsultasi dengan dokter untuk menilai kebutuhan perawat homecare di Makassar.';

    const whenIntro = 'Pendampingan perawat di rumah diberikan berdasarkan hasil pemeriksaan dan rekomendasi dokter, sesuai kondisi serta kebutuhan perawatan setiap pasien.';
    const whenItems = [
        { title: 'Membutuhkan Pemantauan Kondisi', desc: 'Untuk pasien yang memerlukan pemantauan kondisi kesehatan secara berkala atau berkelanjutan selama menjalani perawatan di rumah.' },
        { title: 'Setelah Perawatan di Rumah Sakit', desc: 'Untuk pasien yang masih membutuhkan pemantauan dan pendampingan selama proses pemulihan di rumah sesuai rencana perawatan dokter.' },
        { title: 'Membutuhkan Bantuan Perawatan', desc: 'Untuk pasien dengan kondisi tertentu atau keterbatasan aktivitas yang membutuhkan bantuan keperawatan dalam menjalani perawatan sehari-hari.' },
        { title: 'Membutuhkan Perawatan Berkelanjutan', desc: 'Untuk pasien yang membutuhkan pendampingan perawat dalam periode tertentu sebagai bagian dari rencana perawatan dokter.' }
    ];

    const tasks = [
        { title: 'Pemantauan Kondisi', desc: 'Memantau perkembangan dan perubahan kondisi pasien selama masa pendampingan.' },
        { title: 'Pemantauan Tanda Vital', desc: 'Melakukan pemantauan tekanan darah, nadi, suhu, pernapasan, dan parameter lainnya sesuai kebutuhan.' },
        { title: 'Pemberian Obat', desc: 'Membantu pemberian obat sesuai resep dan instruksi medis.' },
        { title: 'Perawatan Dasar Pasien', desc: 'Membantu kebutuhan kebersihan, kenyamanan, dan perawatan sehari-hari pasien.' },
        { title: 'Mobilisasi Pasien', desc: 'Membantu mobilisasi dan aktivitas sesuai kondisi serta kemampuan pasien.' },
        { title: 'Pemantauan Asupan & Eliminasi', desc: 'Memantau asupan makan dan minum serta eliminasi apabila dibutuhkan.' },
        { title: 'Tindakan Keperawatan', desc: 'Melakukan tindakan keperawatan yang dibutuhkan sesuai instruksi dan rencana medis.' },
        { title: 'Koordinasi dengan Dokter', desc: 'Mengomunikasikan perkembangan atau perubahan kondisi pasien kepada dokter yang melakukan supervisi.' }
    ];
    const taskIcons = ['activity', 'heart-pulse', 'pill', 'helping-hand', 'user', 'clipboard-list', 'syringe', 'message-circle'];
    const taskEn = e.tasks || [];
    const taskCards = '<div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">' + tasks.map((t, i) => {
        const te = taskEn[i] || {};
        return '<div class="canva-card rounded-2xl p-5">'
            + '<div class="w-11 h-11 mb-3 bg-primary/10 rounded-xl flex items-center justify-center">' + icon(taskIcons[i], 22, BRAND) + '</div>'
            + biTag('h3', t.title, te.title, 'class="font-bold mb-1 text-sm leading-snug"')
            + biTag('p', t.desc, te.desc, 'class="text-sm text-gray-600 leading-relaxed"')
            + '</div>';
    }).join('') + '</div>';

    const flowSteps = [
        { n: '01', title: 'Pemeriksaan Dokter', desc: 'Dokter menilai kondisi dan kebutuhan perawatan pasien.' },
        { n: '02', title: 'Rencana Perawatan', desc: 'Dokter menyusun rencana perawatan dan bentuk pendampingan.' },
        { n: '03', title: 'Pendampingan Perawat di Rumah', desc: 'Perawat menjalankan pemantauan dan perawatan sesuai rencana.' },
        { n: '04', title: 'Pemantauan & Koordinasi', desc: 'Perkembangan pasien dikomunikasikan kepada dokter supervisi.' },
        { n: '05', title: 'Evaluasi / Penyesuaian', desc: 'Dokter dapat menyesuaikan perawatan sesuai perkembangan pasien.' }
    ];

    const durations = [
        { title: 'Pendampingan Harian', desc: 'Pendampingan dalam periode tertentu sesuai kebutuhan pasien.' },
        { title: 'Pendampingan 24 Jam', desc: 'Pemantauan dan pendampingan pasien selama 24 jam sesuai rekomendasi dokter.' },
        { title: 'Pendampingan Berkelanjutan', desc: 'Pendampingan selama beberapa hari atau periode tertentu dengan evaluasi sesuai perkembangan kondisi pasien.' }
    ];
    const durEn = e.durations || [];
    const durCards = '<div class="grid md:grid-cols-3 gap-4">' + durations.map((d, i) => {
        const de = durEn[i] || {};
        return '<div class="canva-card rounded-2xl p-5 sm:p-6">'
            + biTag('h3', d.title, de.title, 'class="font-bold mb-2"')
            + biTag('p', d.desc, de.desc, 'class="text-sm text-gray-600 leading-relaxed"')
            + '</div>';
    }).join('') + '</div>';

    const startSteps = [
        { n: '01', title: 'Konsultasi & Pemeriksaan Dokter', desc: 'Dokter melakukan penilaian terhadap kondisi dan kebutuhan perawatan pasien.' },
        { n: '02', title: 'Rekomendasi Pendampingan', desc: 'Dokter menentukan kebutuhan pendampingan, rencana perawatan, serta durasi sesuai dengan kondisi pasien.' },
        { n: '03', title: 'Konfirmasi Biaya', desc: 'Tim Dokter Panggil menginformasikan estimasi biaya kepada keluarga.' },
        { n: '04', title: 'Pendampingan Dimulai', desc: 'Perawat menjalankan pendampingan sesuai rencana perawatan dengan supervisi dokter.' }
    ];

    const linked = [
        { href: prefix + 'layanan/kunjungan-dokter-spesialis.html', icon: 'heart-pulse', title: 'Dokter Spesialis', titleEn: 'Specialist Doctor' },
        { href: prefix + 'layanan/tes-laboratorium.html', icon: 'test-tubes', title: 'Laboratorium', titleEn: 'Laboratory' },
        { href: prefix + 'layanan/farmasi.html', icon: 'pill', title: 'Farmasi', titleEn: 'Pharmacy' },
        { href: prefix + 'layanan/tindakan-medis.html', icon: 'syringe', title: 'Tindakan Medis', titleEn: 'Medical Procedures' }
    ];
    const linkedCards = '<div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">' + linked.map(l =>
        '<a href="' + esc(l.href) + '" class="canva-card rounded-2xl p-5 block hover:shadow-lg hover:border-primary/20 transition-all text-center">'
        + '<div class="w-11 h-11 mx-auto mb-3 bg-primary/10 rounded-xl flex items-center justify-center">' + icon(l.icon, 22, BRAND) + '</div>'
        + biTag('h3', l.title, l.titleEn, 'class="font-bold text-sm"')
        + '</a>'
    ).join('') + '</div>';

    const whyItems = [
        { title: 'Berdasarkan Rekomendasi Dokter', desc: 'Pendampingan diberikan berdasarkan hasil penilaian dokter dan kebutuhan perawatan pasien.' },
        { title: 'Perawat Profesional', desc: 'Perawatan dan pemantauan dilakukan oleh tenaga keperawatan sesuai kebutuhan pasien.' },
        { title: 'Di Bawah Supervisi Dokter', desc: 'Perkembangan kondisi pasien dapat dikoordinasikan dengan dokter selama masa pendampingan.' },
        { title: 'Terhubung dengan Layanan Medis', desc: 'Dokter spesialis, laboratorium, farmasi, tindakan medis, dan layanan lainnya dapat dikoordinasikan apabila diperlukan.' }
    ];
    const whyIcons = ['stethoscope', 'heart-handshake', 'shield-check', 'share-2'];

    const faqs = [
        { q: 'Apakah bisa langsung memesan perawat homecare?', a: 'Pendampingan perawat dilakukan berdasarkan rekomendasi dokter. Dokter akan menilai kondisi pasien terlebih dahulu untuk menentukan kebutuhan dan bentuk pendampingan yang sesuai.' },
        { q: 'Apakah perawat selalu berada di bawah supervisi dokter?', a: 'Ya. Selama masa pendampingan, perawat menjalankan rencana perawatan dan berkoordinasi dengan dokter yang melakukan supervisi terkait perkembangan kondisi pasien.' },
        { q: 'Apakah perawat dapat mendampingi pasien selama 24 jam?', a: 'Ya. Pendampingan 24 jam diberikan apabila sesuai dengan kebutuhan pasien dan rekomendasi dokter. Pengaturan perawat dan jadwal akan dikoordinasikan oleh Tim Dokter Panggil.' },
        { q: 'Apakah bisa memilih perawat laki-laki atau perempuan?', a: 'Kebutuhan atau preferensi dapat disampaikan kepada tim kami dan akan disesuaikan dengan ketersediaan perawat.' },
        { q: 'Apakah perawat dapat melakukan tindakan medis di rumah?', a: 'Perawat dapat melakukan tindakan keperawatan sesuai kompetensi, kebutuhan pasien, serta instruksi atau rencana medis yang telah ditetapkan.' },
        { q: 'Bagaimana jika kondisi pasien berubah selama pendampingan?', a: 'Perawat akan melakukan pemantauan dan berkoordinasi dengan dokter apabila terdapat perubahan kondisi yang membutuhkan evaluasi atau penyesuaian perawatan.' },
        { q: 'Berapa biaya pendampingan Perawat Homecare?', a: 'Biaya disesuaikan dengan kebutuhan pasien, durasi pendampingan, serta pelayanan yang diperlukan. Estimasi biaya akan diinformasikan sebelum layanan dimulai.' },
        { q: 'Apakah pasien bisa dirawat oleh lebih dari satu dokter spesialis?', a: 'Ya. Apabila kondisi pasien membutuhkan penanganan dari beberapa bidang spesialisasi, dokter spesialis dapat berkoordinasi dan melakukan perawatan bersama sesuai kebutuhan medis pasien. Tim Dokter Panggil akan membantu mengoordinasikan dokter serta jadwal kunjungan yang diperlukan.' }
    ];
    const faqEn = e.faqs || [];

    return composeBody([
        sectionHead('Kapan Membutuhkan Perawat Homecare di Rumah?', whenIntro, e.whenTitle, e.whenLead)
        + whenCards(whenItems, e.whenCards)
        + '<div class="mt-6">'
        + doubtBox({
            title: 'Apakah pasien membutuhkan pendampingan perawat?',
            titleEn: e.doubtTitle,
            body: 'Dokter akan melakukan penilaian terlebih dahulu untuk menentukan kebutuhan dan bentuk pendampingan yang sesuai dengan kondisi pasien.',
            bodyEn: e.doubtBody,
            cta: 'Chat WhatsApp',
            ctaEn: 'Chat WhatsApp',
            href: waLink(waDoctor)
        })
        + '</div>',
        sectionHead('Apa yang Dilakukan Perawat Selama Pendampingan?', 'Perawatan sesuai rencana dokter — perawat membantu menjalankan pemantauan dan kebutuhan perawatan pasien di rumah sesuai rencana perawatan dan arahan dokter yang melakukan supervisi.', e.tasksTitle, e.tasksLead)
        + taskCards,
        sectionHead('Pendampingan dengan Supervisi Dokter', null, e.superTitle)
        + '<div class="canva-card rounded-3xl p-6 sm:p-8 mb-6">'
        + biTag('h3', 'Perawat Tidak Bekerja Sendiri', e.superHeadline, 'class="text-xl font-bold mb-2"')
        + biTag('p', 'Setiap pendampingan Perawat Homecare Dokter Panggil berada di bawah supervisi dokter. Perawat melakukan pemantauan dan menjalankan rencana perawatan di rumah, sementara perkembangan kondisi pasien dapat dikoordinasikan dengan dokter selama masa pendampingan.', e.superBody, 'class="text-gray-600 leading-relaxed"')
        + '</div>'
        + compactStepCards(flowSteps, e.flowSteps, 'sm:grid-cols-2 lg:grid-cols-5'),
        sectionHead('Durasi Pendampingan Sesuai Kebutuhan Pasien', 'Durasi pendampingan perawat ditentukan berdasarkan kondisi pasien, kebutuhan pemantauan, dan rekomendasi dokter.', e.durationTitle, e.durationLead)
        + durCards,
        sectionHead('Bagaimana Pendampingan Perawat Dimulai?', null, e.startTitle)
        + howStepCards(startSteps, e.startSteps),
        sectionHead('Ketika Kondisi Pasien Berubah', 'Perawatan yang tetap terhubung — selama masa pendampingan, perawat memantau perkembangan pasien dan dapat berkoordinasi dengan dokter apabila terdapat perubahan kondisi. Dokter dapat melakukan evaluasi dan memberikan rekomendasi pelayanan selanjutnya sesuai kebutuhan pasien.', e.changeTitle, e.changeLead)
        + biTag('p', 'Layanan terhubung dengan:', e.linkedLabel, 'class="font-semibold mb-1"')
        + linkedCards,
        sectionHead('Mengapa Perawat Homecare Dokter Panggil?', null, e.whyTitle)
        + whyCards(whyItems, e.whyItems, whyIcons),
        sectionHead('Pertanyaan Umum', null, e.faqTitle || 'FAQ')
        + faqBlock(faqs, faqEn),
        ctaBlock(prefix, waAsk,
            'Apakah Keluarga Anda Membutuhkan Pendampingan Perawat di Rumah?',
            'Konsultasikan kondisi pasien dengan Tim Dokter Panggil. Dokter akan membantu menilai kebutuhan perawatan dan menentukan pendampingan yang sesuai.',
            waBook,
            {
                headlineEn: e.ctaTitle,
                bodyEn: e.ctaBody,
                bookLabel: { id: 'Konsultasikan Kebutuhan Pasien', en: e.ctaBook || 'Discuss Patient Needs' },
                askLabel: { id: 'Chat WhatsApp', en: e.ctaAskChat || 'Chat WhatsApp' }
            })
    ]);
}

/** Form — Rawat Inap di Rumah (same section rhythm as D1–D3). */
function rawatInapBody(prefix, en) {
    const {
        composeBody, aboutCard, whenCards, iconInfoCards, iconRowCards, howStepCards,
        compactStepCards, whyCards, pills, pathCards, doctorNursePathCards, doubtBox,
        noteLine, promoBanner, linkCards, flowPills
    } = sections;
    const e = en.d4ri || en.ri || en;
    const waAsk = 'Halo, saya ingin bertanya tentang rawat inap di rumah di Makassar.';
    const waBook = 'Halo, saya ingin konsultasikan kondisi pasien untuk rawat inap di rumah di Makassar.';

    const whenLead = 'Rawat inap di rumah dapat dipertimbangkan untuk pasien yang membutuhkan perawatan dan pemantauan berkelanjutan, namun berdasarkan penilaian dokter kondisinya memungkinkan untuk mendapatkan perawatan di rumah.';
    const whenItems = [
        { title: 'Setelah Pulang dari Rumah Sakit', desc: 'Untuk pasien yang masih membutuhkan perawatan, pemantauan, atau terapi lanjutan selama masa pemulihan di rumah.' },
        { title: 'Membutuhkan Perawatan Berkelanjutan', desc: 'Untuk kondisi tertentu yang membutuhkan pemberian terapi dan pemantauan secara berkala dalam beberapa hari atau sesuai rencana dokter.' },
        { title: 'Pasien dengan Mobilitas Terbatas', desc: 'Untuk pasien yang membutuhkan perawatan medis tetapi memiliki keterbatasan untuk melakukan perjalanan ke fasilitas kesehatan.' },
        { title: 'Membutuhkan Pemantauan Berkelanjutan', desc: 'Untuk pasien yang membutuhkan pemantauan kondisi dan pendampingan perawat secara berkala atau berkelanjutan sesuai rencana perawatan dan rekomendasi dokter.' }
    ];

    const includes = [
        { icon: 'stethoscope', title: 'Dokter', desc: 'Melakukan penilaian, menentukan rencana perawatan, serta mengevaluasi perkembangan kondisi pasien.' },
        { icon: 'heart-handshake', title: 'Perawat Homecare', desc: 'Mendampingi pasien, melakukan pemantauan, menjalankan rencana perawatan, dan berkoordinasi dengan dokter.' },
        { icon: 'pill', title: 'Obat & Terapi', desc: 'Pemberian obat dan terapi dilakukan sesuai resep serta instruksi medis.' },
        { icon: 'test-tubes', title: 'Pemeriksaan Laboratorium', desc: 'Pengambilan sampel dapat dilakukan di rumah apabila dibutuhkan untuk pemantauan kondisi pasien.' },
        { icon: 'syringe', title: 'Tindakan Medis', desc: 'Infus, nebulizer, perawatan luka, kateter, suction, atau tindakan lainnya dapat dilakukan sesuai kebutuhan dan indikasi medis.' },
        { icon: 'clipboard-list', title: 'Peralatan Medis', desc: 'Peralatan untuk membantu pemantauan dan perawatan dapat disiapkan sesuai kondisi pasien.' }
    ];
    const flowSteps = [
        { n: '01', title: 'Dokter', desc: 'Penilaian dan rencana perawatan.' },
        { n: '02', title: 'Rencana Perawatan', desc: 'Disusun sesuai kondisi pasien.' },
        { n: '03', title: 'Perawat + Pemantauan', desc: 'Pendampingan di rumah sesuai rencana.' },
        { n: '04', title: 'Obat · Lab · Tindakan · Alat', desc: 'Dikoordinasikan sesuai kebutuhan.' },
        { n: '05', title: 'Evaluasi Dokter', desc: 'Perkembangan ditinjau kembali.' },
        { n: '06', title: 'Lanjutkan / Sesuaikan / Rujuk', desc: 'Keputusan sesuai kondisi pasien.' }
    ];

    const startSteps = [
        { n: '01', title: 'Pemeriksaan Kondisi Pasien', desc: 'Dokter melakukan pemeriksaan untuk memahami kondisi dan kebutuhan medis pasien.' },
        { n: '02', title: 'Penilaian Kelayakan Perawatan di Rumah', desc: 'Dokter menentukan apakah kondisi pasien memungkinkan untuk mendapatkan perawatan di rumah atau membutuhkan fasilitas kesehatan.' },
        { n: '03', title: 'Konfirmasi Layanan & Biaya', desc: 'Rencana pelayanan dan estimasi biaya diinformasikan kepada pasien atau keluarga sebelum perawatan dimulai.' },
        { n: '04', title: 'Rekomendasi Rencana Perawatan', desc: 'Dokter merekomendasikan kebutuhan perawat, obat, tindakan, pemeriksaan, alat medis, serta pemantauan yang diperlukan.' },
        { n: '05', title: 'Perawatan Dimulai di Rumah', desc: 'Tim medis menjalankan rencana perawatan dan melakukan pemantauan sesuai kondisi pasien serta berkoordinasi dengan dokter penanggung jawab.' }
    ];

    const whyItems = [
        { title: 'Perawatan Berdasarkan Penilaian Dokter', desc: 'Rencana pelayanan disusun berdasarkan kondisi dan kebutuhan medis pasien.' },
        { title: 'Tim Medis Terkoordinasi', desc: 'Dokter, perawat, dan layanan pendukung bekerja dalam satu rencana perawatan.' },
        { title: 'Pemantauan Berkelanjutan', desc: 'Perkembangan kondisi pasien dipantau selama masa perawatan dan dapat dievaluasi kembali oleh dokter.' },
        { title: 'Layanan Medis Hadir di Rumah', desc: 'Obat, laboratorium, tindakan, hingga kebutuhan medis lainnya dapat dikoordinasikan langsung di rumah sesuai kebutuhan pasien.' }
    ];
    const whyIcons = ['stethoscope', 'users', 'activity', 'home'];

    const faqs = [
        { q: 'Kondisi pasien seperti apa yang dapat dirawat di rumah?', a: 'Rawat Inap di Rumah dapat dipertimbangkan untuk pasien yang membutuhkan perawatan, terapi, dan pemantauan berkelanjutan, namun berdasarkan hasil pemeriksaan dokter kondisinya masih memungkinkan untuk mendapatkan perawatan di rumah. Kebutuhan setiap pasien akan dinilai terlebih dahulu sebelum layanan dimulai.' },
        { q: 'Apakah semua pasien bisa menjalani Rawat Inap di Rumah?', a: 'Tidak. Dokter akan melakukan pemeriksaan dan menilai kondisi pasien terlebih dahulu untuk menentukan apakah perawatan dapat dilakukan dengan aman di rumah. Apabila kondisi pasien membutuhkan pemeriksaan, pemantauan, tindakan, atau fasilitas yang tidak tersedia di rumah, dokter akan merekomendasikan perawatan di fasilitas kesehatan.' },
        { q: 'Apakah pasien akan didampingi perawat selama 24 jam?', a: 'Pendampingan perawat disesuaikan dengan kondisi dan kebutuhan perawatan pasien berdasarkan rekomendasi dokter. Apabila pasien membutuhkan pendampingan selama 24 jam, Tim Dokter Panggil akan mengatur jadwal dan pergantian perawat sesuai kebutuhan pelayanan.' },
        { q: 'Siapa dokter yang bertanggung jawab selama pasien dirawat di rumah?', a: 'Setiap pasien akan berada di bawah supervisi dokter selama menjalani perawatan di rumah. Dokter akan melakukan kunjungan setiap hari untuk mengevaluasi perkembangan kondisi pasien, menentukan dan menyesuaikan rencana perawatan, serta berkoordinasi dengan perawat yang mendampingi pasien. Apabila kondisi pasien membutuhkan penanganan dari dokter spesialis, Tim Dokter Panggil dapat membantu mengoordinasikan konsultasi dan perawatan bersama dokter spesialis sesuai kebutuhan medis pasien.' },
        { q: 'Apakah obat, laboratorium, dan alat medis dapat disediakan di rumah?', a: 'Ya, sesuai kebutuhan dan rencana perawatan pasien. Tim Dokter Panggil menyediakan obat dan kebutuhan medis, mengoordinasikan pemeriksaan laboratorium di rumah, serta menyiapkan peralatan medis yang tersedia apabila diperlukan. Untuk mendukung pemantauan dan terapi pasien, saat ini tersedia patient monitor dan syringe pump sesuai kebutuhan dan rekomendasi dokter.' },
        { q: 'Berapa biaya Rawat Inap di Rumah?', a: 'Biaya Rawat Inap di Rumah disesuaikan dengan kondisi dan kebutuhan setiap pasien. Komponen biaya dapat meliputi layanan dokter, pendampingan perawat, obat dan bahan medis, tindakan, pemeriksaan laboratorium, penggunaan peralatan medis, serta kebutuhan pelayanan lainnya. Setelah kebutuhan perawatan ditentukan, Tim Dokter Panggil akan memberikan estimasi biaya kepada pasien atau keluarga sebelum layanan dimulai.' },
        { q: 'Bagaimana jika kondisi pasien memburuk selama perawatan?', a: 'Selama masa perawatan, kondisi pasien akan dipantau oleh perawat dan perkembangannya dapat dikoordinasikan dengan dokter yang melakukan supervisi. Apabila terjadi perubahan kondisi, dokter akan melakukan evaluasi dan menentukan penanganan selanjutnya. Jika kondisi pasien membutuhkan pemeriksaan, tindakan, atau fasilitas yang tidak dapat diberikan di rumah, dokter akan merekomendasikan pasien untuk segera mendapatkan penanganan lebih lanjut di fasilitas kesehatan.' }
    ];
    const faqEn = e.faqs || [];

    return composeBody([
        sectionHead('Kapan Pasien Dapat Dirawat di Rumah?', whenLead, e.whenTitle, e.whenLead)
        + whenCards(whenItems, e.whenCards),
        sectionHead('Apa Saja yang Termasuk dalam Perawatan?', null, e.includesTitle)
        + biTag('h3', 'Perawatan Disesuaikan dengan Kondisi Setiap Pasien', e.includesHeadline, 'class="text-xl font-bold mb-2"')
        + biTag('p', 'Tidak semua pasien mendapatkan komponen yang sama. Tim medis menyusun kebutuhan pelayanan berdasarkan kondisi dan rencana perawatan dokter.', e.includesLead, 'class="text-gray-600 leading-relaxed mb-6 max-w-3xl"')
        + iconInfoCards(includes, e.includes)
        + '<div class="canva-card rounded-3xl p-6 sm:p-8 mt-8 mb-6">'
        + biTag('h3', 'Satu Pasien, Satu Perawatan yang Terkoordinasi', e.coordHeadline, 'class="text-xl font-bold mb-2"')
        + biTag('p', 'Dokter, perawat, dan layanan pendukung bekerja dalam rencana perawatan yang sama. Perkembangan kondisi pasien dipantau dan dapat dikomunikasikan kepada dokter untuk menentukan kebutuhan pelayanan selanjutnya.', e.coordBody, 'class="text-gray-600 leading-relaxed"')
        + '</div>'
        + compactStepCards(flowSteps, e.flowSteps, 'sm:grid-cols-2 lg:grid-cols-3'),
        sectionHead('Bagaimana Rawat Inap di Rumah Dimulai?', null, e.startTitle)
        + biTag('p', 'Dimulai dengan Penilaian Dokter', e.startHeadline, 'class="font-semibold text-lg mb-5"')
        + howStepCards(startSteps, e.startSteps),
        sectionHead('Pemantauan Selama Perawatan', null, e.monitorTitle)
        + '<div class="canva-card rounded-3xl p-6 sm:p-8">'
        + biTag('h3', 'Kondisi Pasien Dipantau Selama Perawatan', e.monitorHeadline, 'class="text-xl font-bold mb-2"')
        + biTag('p', 'Perawat melakukan pemantauan sesuai rencana perawatan dan mengomunikasikan perkembangan kondisi pasien kepada dokter. Apabila diperlukan, dokter dapat melakukan evaluasi dan menyesuaikan rencana pelayanan sesuai perkembangan pasien.', e.monitorBody, 'class="text-gray-600 leading-relaxed"')
        + '</div>',
        sectionHead('Bagaimana Jika Kondisi Pasien Memburuk?', null, e.worseTitle)
        + '<div class="canva-card rounded-3xl p-6 sm:p-8 border border-[#F1E7E0]">'
        + biTag('h3', 'Keselamatan Pasien Tetap Menjadi Prioritas', e.worseHeadline, 'class="text-xl font-bold mb-2"')
        + biTag('p', 'Kondisi pasien akan dievaluasi selama masa perawatan. Apabila terdapat perubahan kondisi yang membutuhkan pemeriksaan, tindakan, atau fasilitas yang tidak dapat diberikan di rumah, dokter akan merekomendasikan pasien untuk mendapatkan penanganan lebih lanjut di fasilitas kesehatan.', e.worseBody, 'class="text-gray-600 leading-relaxed"')
        + '</div>',
        sectionHead('Mengapa Rawat Inap di Rumah Bersama Dokter Panggil?', null, e.whyTitle)
        + whyCards(whyItems, e.whyItems, whyIcons),
        sectionHead('Pertanyaan Umum', null, e.faqTitle || 'FAQ')
        + faqBlock(faqs, faqEn),
        ctaBlock(prefix, waAsk,
            'Apakah Pasien Dapat Dirawat di Rumah?',
            'Konsultasikan kondisi pasien dengan Tim Dokter Panggil. Dokter akan melakukan penilaian untuk menentukan apakah perawatan dapat dilakukan di rumah serta kebutuhan medis yang perlu dipersiapkan.',
            waBook,
            {
                headlineEn: e.ctaTitle,
                bodyEn: e.ctaBody,
                bookLabel: { id: 'Konsultasikan Kondisi Pasien', en: e.ctaBook || 'Discuss Patient Condition' },
                askLabel: { id: 'Chat WhatsApp', en: e.ctaAskChat || 'Chat WhatsApp' }
            })
    ]);
}

/** Form D4 — Tindakan Medis hub (picker + assessment flow). */
function tindakanMedisBody(prefix, en) {
    const {
        composeBody, aboutCard, whenCards, iconInfoCards, iconRowCards, howStepCards,
        compactStepCards, whyCards, pills, pathCards, doctorNursePathCards, doubtBox,
        noteLine, promoBanner, linkCards, flowPills
    } = sections;
    const e = en.d4 || en;
    const waAsk = 'Halo, saya ingin konsultasikan kebutuhan tindakan medis di rumah di Makassar.';
    const waBook = 'Halo, saya ingin konsultasikan kondisi pasien untuk tindakan medis di rumah di Makassar.';

    const procedures = [
        { href: prefix + 'layanan/terapi-infus.html', icon: 'syringe', title: 'Terapi Infus', desc: 'Pemberian cairan dan terapi melalui infus sesuai indikasi serta rekomendasi dokter.', titleEn: 'Infusion Therapy', descEn: 'IV fluids and therapy based on indication and the doctor’s recommendation.' },
        { href: prefix + 'layanan/infus-vitamin.html', icon: 'pill', title: 'Infus Vitamin', desc: 'Pemberian vitamin melalui infus berdasarkan hasil penilaian kondisi dan rekomendasi dokter.', titleEn: 'Vitamin Infusion', descEn: 'Vitamin infusion based on condition assessment and the doctor’s recommendation.' },
        { href: prefix + 'layanan/terapi-oksigen.html', icon: 'wind', title: 'Terapi Oksigen', desc: 'Pemberian terapi oksigen sesuai kondisi dan kebutuhan medis pasien.', titleEn: 'Oxygen Therapy', descEn: 'Oxygen therapy based on the patient’s condition and medical needs.' },
        { href: prefix + 'layanan/terapi-nebulizer.html', icon: 'cloud', title: 'Terapi Uap / Nebulizer', desc: 'Pemberian terapi melalui nebulizer sesuai indikasi dan rekomendasi dokter.', titleEn: 'Nebulizer Therapy', descEn: 'Nebulizer therapy based on indication and the doctor’s recommendation.' },
        { href: prefix + 'layanan/perawatan-luka.html', icon: 'plus-square', title: 'Perawatan Luka', desc: 'Perawatan dan penggantian balutan sesuai jenis, kondisi, dan kebutuhan perawatan luka pasien.', titleEn: 'Wound Care', descEn: 'Wound care and dressing changes matched to the wound type, condition, and care needs.' },
        { href: prefix + 'layanan/vaksinasi.html', icon: 'syringe', title: 'Vaksinasi di Rumah', desc: 'Pelayanan vaksinasi langsung di rumah sesuai jenis vaksin dan kondisi pasien.', titleEn: 'Home Vaccination', descEn: 'Vaccination at home based on vaccine type and patient condition.' },
        { href: prefix + 'layanan/pemasangan-ngt.html', icon: 'utensils', title: 'Pemasangan Selang Makan (NGT)', desc: 'Pemasangan atau penggantian selang makan berdasarkan kebutuhan dan rekomendasi medis.', titleEn: 'Feeding Tube (NGT)', descEn: 'Feeding tube placement or change based on need and medical recommendation.' },
        { href: prefix + 'layanan/pemasangan-kateter.html', icon: 'droplets', title: 'Pemasangan Kateter Urine', desc: 'Pemasangan atau penggantian kateter urine sesuai indikasi dan rekomendasi dokter.', titleEn: 'Urinary Catheter', descEn: 'Urinary catheter placement or change based on indication and the doctor’s recommendation.' },
        { href: prefix + 'layanan/suction.html', icon: 'activity', title: 'Suction / Sedot Dahak', desc: 'Tindakan membantu mengeluarkan sekret atau dahak sesuai kondisi dan kebutuhan medis pasien.', titleEn: 'Suction', descEn: 'Helps clear secretions or phlegm based on the patient’s condition and medical needs.' }
    ];
    // Safer Lucide 0.263 icons
    const procIcons = ['syringe', 'pill', 'wind', 'cloud', 'heart-pulse', 'syringe', 'clipboard-list', 'droplets', 'activity'];
    const procItems = procedures.map((p, i) => {
        const pe = (e.procedures && e.procedures[i]) || {};
        return {
            href: p.href,
            icon: procIcons[i],
            title: p.title,
            titleEn: pe.title || p.titleEn,
            desc: p.desc,
            descEn: pe.desc || p.descEn,
            cta: 'Lihat detail →',
            ctaEn: pe.cta || 'View details →'
        };
    });

    const assessSteps = [
        { n: '01', title: 'Kondisi Pasien', desc: 'Informasikan keluhan atau kebutuhan tindakan.' },
        { n: '02', title: 'Penilaian Dokter', desc: 'Konsultasi online atau kunjungan ke rumah.' },
        { n: '03', title: 'Rekomendasi Tindakan', desc: 'Dokter menentukan tindakan yang sesuai.' },
        { n: '04', title: 'Persiapan Tenaga & Kebutuhan Medis', desc: 'Dokter/perawat, obat, alat, dan bahan disiapkan.' },
        { n: '05', title: 'Tindakan di Rumah', desc: 'Dilakukan sesuai rekomendasi dan kondisi pasien.' }
    ];

    const howSteps = [
        { n: '01', title: 'Sampaikan Kondisi Pasien', desc: 'Informasikan keluhan, kondisi, atau tindakan yang dibutuhkan kepada Admin Dokter Panggil.' },
        { n: '02', title: 'Penilaian Dokter', desc: 'Dokter dapat melakukan penilaian melalui konsultasi online atau pemeriksaan langsung di rumah sesuai kondisi pasien.' },
        { n: '03', title: 'Rekomendasi Tindakan', desc: 'Dokter menentukan jenis tindakan yang sesuai dengan kondisi pasien.' },
        { n: '04', title: 'Persiapan Tindakan', desc: 'Tim mempersiapkan dokter atau perawat, obat, alat, dan bahan medis yang diperlukan.' },
        { n: '05', title: 'Tindakan Dilakukan di Rumah', desc: 'Tindakan dilakukan sesuai rekomendasi dokter dan kondisi pasien, disertai pemantauan sesuai kebutuhan.' }
    ];

    const whyItems = [
        { title: 'Berdasarkan Penilaian Dokter', desc: 'Setiap tindakan diberikan berdasarkan hasil penilaian dan rekomendasi dokter sesuai kondisi pasien.' },
        { title: 'Tenaga Kesehatan Sesuai Kompetensi', desc: 'Tindakan dilakukan oleh dokter atau perawat sesuai jenis tindakan dan kompetensi tenaga kesehatan.' },
        { title: 'Kebutuhan Dipersiapkan Sebelum Kunjungan', desc: 'Obat, alat, dan bahan medis dipersiapkan berdasarkan tindakan yang direkomendasikan sebelum tenaga kesehatan datang ke rumah.' },
        { title: 'Terhubung dengan Layanan Medis Lainnya', desc: 'Apabila diperlukan, kebutuhan dokter, laboratorium, obat, perawat homecare, maupun layanan lanjutan dapat dikoordinasikan.' }
    ];
    const whyIcons = ['stethoscope', 'shield-check', 'clipboard-check', 'share-2'];

    const faqs = [
        { q: 'Apakah tindakan medis dapat langsung dipesan tanpa pemeriksaan dokter?', a: 'Tidak. Setiap tindakan medis di Dokter Panggil dilakukan berdasarkan rekomendasi dokter. Penilaian dokter dapat dilakukan melalui konsultasi online atau kunjungan dokter langsung ke rumah sesuai kondisi pasien.' },
        { q: 'Apakah harus selalu memanggil dokter ke rumah sebelum tindakan?', a: 'Tidak selalu. Untuk kondisi yang memungkinkan, penilaian awal dapat dilakukan melalui konsultasi online. Dokter akan menentukan apakah tindakan dapat dilakukan berdasarkan konsultasi tersebut atau pasien membutuhkan pemeriksaan langsung terlebih dahulu.' },
        { q: 'Siapa yang melakukan tindakan medis di rumah?', a: 'Tindakan dapat dilakukan oleh dokter maupun perawat, sesuai jenis tindakan, kompetensi tenaga kesehatan, kondisi pasien, dan rencana medis yang telah ditentukan dokter.' },
        { q: 'Apakah obat, alat, dan bahan medis disediakan?', a: 'Ya. Tim Dokter Panggil akan mempersiapkan obat, alat, serta bahan medis yang dibutuhkan sesuai tindakan yang telah direkomendasikan dokter.' },
        { q: 'Berapa biaya tindakan medis di rumah?', a: 'Biaya disesuaikan dengan jenis tindakan, obat dan bahan medis yang digunakan, tenaga kesehatan yang melakukan tindakan, serta lokasi pasien. Estimasi biaya akan diinformasikan sebelum layanan dikonfirmasi.' },
        { q: 'Bagaimana jika setelah diperiksa ternyata tindakan tidak dapat dilakukan di rumah?', a: 'Dokter akan menjelaskan kondisi pasien dan merekomendasikan penanganan yang sesuai. Apabila pasien membutuhkan pemeriksaan, tindakan, atau fasilitas yang tidak tersedia di rumah, dokter akan menyarankan penanganan lebih lanjut di fasilitas kesehatan.' }
    ];
    const faqEn = e.faqs || [];

    return composeBody([
        sectionHead('Pilih Tindakan Medis yang Dibutuhkan', 'Temukan layanan tindakan medis sesuai kebutuhan pasien. Setiap tindakan dilakukan berdasarkan rekomendasi dokter setelah penilaian kondisi pasien.', e.pickTitle, e.pickLead)
        + '<div id="pilih-tindakan">' + linkCards(procItems) + '</div>',
        sectionHead('Setiap Tindakan Dimulai dengan Penilaian Dokter', 'Untuk memastikan tindakan yang diberikan sesuai dengan kondisi dan kebutuhan pasien, setiap tindakan medis akan dilakukan berdasarkan rekomendasi dokter. Penilaian dokter dapat dilakukan melalui konsultasi online atau kunjungan dokter langsung ke rumah, sesuai kondisi pasien.', e.assessTitle, e.assessLead)
        + compactStepCards(assessSteps, e.assessSteps, 'sm:grid-cols-2 lg:grid-cols-5'),
        sectionHead('Siapa yang Melakukan Tindakan?', null, e.whoTitle)
        + '<div class="canva-card rounded-3xl p-6 sm:p-8">'
        + biTag('h3', 'Dilakukan oleh Dokter atau Perawat', e.whoHeadline, 'class="text-xl font-bold mb-2"')
        + biTag('p', 'Tindakan medis dapat dilakukan oleh dokter maupun perawat sesuai jenis tindakan, kompetensi tenaga kesehatan, dan kondisi pasien. Setiap tindakan dilakukan berdasarkan rekomendasi serta rencana medis yang telah ditentukan oleh dokter.', e.whoBody, 'class="text-gray-600 leading-relaxed mb-4"')
        + biTag('p', 'Untuk tindakan yang dilakukan perawat: perawat menjalankan tindakan sesuai rekomendasi dan rencana medis dokter serta melakukan pemantauan pasien sesuai kebutuhan.', e.whoNurse, 'class="text-sm text-gray-600 leading-relaxed"')
        + '</div>',
        sectionHead('Bagaimana Tindakan Medis Dilakukan?', null, e.howTitle)
        + biTag('p', 'Dari Penilaian hingga Tindakan di Rumah', e.howHeadline, 'class="font-semibold text-lg mb-5"')
        + howStepCards(howSteps, e.howSteps),
        sectionHead('Tidak Yakin Tindakan yang Dibutuhkan?', null, e.doubtTitle)
        + doubtBox({
            title: 'Anda tidak perlu menentukan tindakan medis sendiri.',
            titleEn: e.doubtLead,
            body: 'Ceritakan keluhan dan kondisi pasien kepada Tim Dokter Panggil. Dokter akan melakukan penilaian dan menentukan tindakan yang sesuai.',
            bodyEn: e.doubtBody,
            cta: 'Chat WhatsApp',
            ctaEn: 'Chat WhatsApp',
            href: waLink(waBook)
        }),
        sectionHead('Mengapa Tindakan Medis Bersama Dokter Panggil?', null, e.whyTitle)
        + whyCards(whyItems, e.whyItems, whyIcons),
        sectionHead('Pertanyaan Umum', null, e.faqTitle || 'FAQ')
        + faqBlock(faqs, faqEn),
        ctaBlock(prefix, waAsk,
            'Butuh Tindakan Medis di Rumah?',
            'Ceritakan kondisi dan kebutuhan pasien kepada Tim Dokter Panggil. Dokter akan melakukan penilaian untuk menentukan tindakan yang sesuai sebelum pelayanan dilakukan di rumah.',
            waBook,
            {
                headlineEn: e.ctaTitle,
                bodyEn: e.ctaBody,
                bookLabel: { id: 'Konsultasikan Kondisi Pasien', en: e.ctaBook || 'Discuss Patient Condition' },
                askLabel: { id: 'Chat WhatsApp', en: e.ctaAskChat || 'Chat WhatsApp' }
            })
    ]);
}

/** Form D5 — Terapi Infus (emphasis: when → assess → how → monitor → FAQ). */
function terapiInfusBody(prefix, en) {
    const {
        composeBody, aboutCard, whenCards, iconInfoCards, iconRowCards, howStepCards,
        compactStepCards, whyCards, pills, pathCards, doctorNursePathCards, doubtBox,
        noteLine, promoBanner, linkCards, flowPills
    } = sections;
    const e = en.d5 || en;
    const waAsk = 'Halo, saya ingin bertanya tentang terapi infus di rumah di Makassar.';
    const waBook = 'Halo, saya ingin konsultasikan kondisi pasien untuk terapi infus di rumah di Makassar.';

    const whenLead = 'Dokter akan mempertimbangkan terapi infus berdasarkan hasil pemeriksaan, kondisi pasien, serta kebutuhan cairan atau terapi yang diperlukan.';
    const whenItems = [
        { title: 'Kekurangan Cairan', desc: 'Pada kondisi tertentu ketika pasien mengalami kekurangan cairan dan asupan melalui mulut belum mencukupi kebutuhan cairan tubuh.' },
        { title: 'Sulit Makan atau Minum', desc: 'Misalnya pada kondisi mual, muntah, atau kondisi tertentu yang menyebabkan pasien sulit memenuhi atau mempertahankan asupan cairan melalui mulut.' },
        { title: 'Membutuhkan Obat melalui Pembuluh Darah', desc: 'Pada kondisi tertentu ketika dokter menentukan bahwa obat atau terapi perlu diberikan langsung melalui pembuluh darah.' },
        { title: 'Melanjutkan Terapi yang Telah Direkomendasikan', desc: 'Untuk pasien yang masih membutuhkan terapi melalui infus sebagai bagian dari rencana perawatan yang telah ditentukan dokter.' }
    ];

    const assessSteps = [
        { n: '01', title: 'Ceritakan Kondisi Pasien', desc: 'Sampaikan keluhan dan kondisi pasien kepada Tim Dokter Panggil.' },
        { n: '02', title: 'Penilaian Dokter', desc: 'Konsultasi online atau kunjungan langsung ke rumah.' },
        { n: '03', title: 'Rekomendasi Terapi', desc: 'Dokter menentukan apakah infus diperlukan dan jenis terapinya.' },
        { n: '04', title: 'Terapi Infus di Rumah', desc: 'Dilakukan sesuai rekomendasi dan kondisi pasien.' }
    ];
    const howSteps = [
        { n: '01', title: 'Penilaian Kondisi Pasien', desc: 'Dokter melakukan penilaian dan menentukan kebutuhan terapi berdasarkan kondisi pasien.' },
        { n: '02', title: 'Persiapan Terapi', desc: 'Perawat mempersiapkan cairan infus, obat, serta alat dan bahan medis sesuai rekomendasi dokter.' },
        { n: '03', title: 'Pemasangan Infus', desc: 'Dokter atau perawat melakukan pemasangan akses infus pada pasien.' },
        { n: '04', title: 'Pemberian & Pemantauan Terapi', desc: 'Terapi diberikan sesuai rencana dokter dan kondisi pasien dipantau selama pemberian infus.' },
        { n: '05', title: 'Evaluasi Setelah Terapi', desc: 'Setelah terapi selesai, kondisi pasien dievaluasi sesuai kebutuhan dan pasien atau keluarga mendapatkan arahan mengenai perawatan selanjutnya.' }
    ];

    const prepItems = [
        { title: 'Triase Awal oleh Dokter', desc: 'Dokter menggali keluhan dan kondisi pasien sebelum kunjungan untuk membantu menentukan kebutuhan pemeriksaan dan terapi yang perlu dipersiapkan.' },
        { title: 'Kebutuhan Terapi Dipersiapkan', desc: 'Dokter berkoordinasi dengan perawat untuk menyiapkan cairan infus, obat, alat, dan bahan medis yang mungkin diperlukan berdasarkan hasil triase.' },
        { title: 'Kit Medis Standar Selalu Dibawa', desc: 'Tim membawa kit medis standar untuk mendukung pemeriksaan dan tindakan selama kunjungan di rumah.' }
    ];
    const prepEn = e.prepItems || [];
    const prepCards = '<div class="grid md:grid-cols-3 gap-4">' + prepItems.map((item, i) => {
        const pe = prepEn[i] || {};
        return '<div class="canva-card rounded-2xl p-5">'
            + biTag('h3', item.title, pe.title, 'class="font-bold mb-2 text-sm leading-snug"')
            + biTag('p', item.desc, pe.desc, 'class="text-sm text-gray-600 leading-relaxed"')
            + '</div>';
    }).join('') + '</div>';

    const whyItems = [
        { title: 'Berdasarkan Penilaian Dokter', desc: 'Infus diberikan berdasarkan kondisi dan kebutuhan medis pasien, bukan hanya berdasarkan permintaan.' },
        { title: 'Terapi Disiapkan Sesuai Kebutuhan', desc: 'Jenis cairan, obat, alat, dan bahan medis dipersiapkan sesuai rencana terapi dokter.' },
        { title: 'Dokter & Perawat Profesional', desc: 'Pemasangan dan pemberian terapi dilakukan oleh tenaga kesehatan sesuai kompetensi dan rencana pelayanan.' },
        { title: 'Terhubung dengan Layanan Medis', desc: 'Apabila diperlukan, pemeriksaan dokter, laboratorium, obat, maupun perawatan lanjutan dapat dikoordinasikan melalui Tim Dokter Panggil.' }
    ];
    const whyIcons = ['stethoscope', 'clipboard-check', 'shield-check', 'share-2'];

    const faqs = [
        { q: 'Apakah saya bisa langsung meminta infus tanpa konsultasi dokter?', a: 'Tidak. Terapi infus di Dokter Panggil dilakukan berdasarkan rekomendasi dokter setelah penilaian kondisi pasien. Penilaian dapat dilakukan melalui konsultasi online atau kunjungan dokter langsung ke rumah sesuai kondisi pasien.' },
        { q: 'Apakah badan lemas berarti membutuhkan infus?', a: 'Tidak selalu. Badan lemas dapat disebabkan oleh berbagai kondisi dan tidak semuanya membutuhkan terapi infus. Dokter akan melakukan penilaian terlebih dahulu untuk menentukan penyebab dan terapi yang sesuai.' },
        { q: 'Siapa yang memasang infus di rumah?', a: 'Pemasangan infus dapat dilakukan oleh perawat atau dokter sesuai rencana pelayanan dan berdasarkan rekomendasi dokter.' },
        { q: 'Apakah cairan infus dan obat sudah disediakan?', a: 'Ya. Cairan infus, obat, serta alat dan bahan medis akan dipersiapkan sesuai hasil triase dokter sebelum kunjungan.' },
        { q: 'Berapa lama terapi infus berlangsung?', a: 'Durasi terapi bergantung pada jenis, jumlah cairan atau obat yang diberikan, serta kondisi pasien. Dokter akan memberikan informasi mengenai perkiraan durasi berdasarkan rencana terapi.' },
        { q: 'Berapa biaya terapi infus di rumah?', a: 'Biaya disesuaikan dengan jenis terapi, cairan dan obat yang digunakan, bahan medis, tenaga kesehatan, serta lokasi pasien. Estimasi biaya akan diinformasikan terlebih dahulu sebelum layanan dikonfirmasi.' }
    ];
    const faqEn = e.faqs || [];

    return composeBody([
        sectionHead('Tentang Terapi Infus di Rumah', null, e.aboutTitle)
        + aboutCard([
            'Terapi infus merupakan pemberian cairan, obat, atau terapi tertentu melalui pembuluh darah sesuai kebutuhan medis pasien.',
            'Di Dokter Panggil, terapi infus dilakukan setelah dokter melakukan penilaian dan memberikan rekomendasi, untuk memastikan jenis terapi yang diberikan sesuai dengan kondisi pasien dan memungkinkan untuk dilakukan di rumah.'
        ], [e.aboutP1, e.aboutP2]),
        sectionHead('Kapan Tindakan Ini Dibutuhkan?', whenLead, e.whenTitle, e.whenLead)
        + biTag('p', 'Dokter dapat mempertimbangkan terapi infus pada kondisi:', e.whenSub, 'class="font-semibold mb-4"')
        + whenCards(whenItems, e.whenCards),
        sectionHead('Setiap Terapi Infus Dimulai dengan Penilaian Dokter', null, e.assessTitle)
        + '<div class="canva-card rounded-3xl p-6 sm:p-8 mb-6">'
        + biTag('h3', 'Infus Berdasarkan Rekomendasi Dokter', e.assessHeadline, 'class="text-xl font-bold mb-2"')
        + biTag('p', 'Sebelum terapi infus dilakukan, dokter akan menilai kondisi pasien terlebih dahulu untuk menentukan apakah infus diperlukan serta jenis terapi yang sesuai.', e.assessBody1, 'class="text-gray-600 leading-relaxed mb-3"')
        + biTag('p', 'Penilaian dapat dilakukan melalui konsultasi online atau kunjungan dokter langsung ke rumah, sesuai kondisi pasien.', e.assessBody2, 'class="text-gray-600 leading-relaxed"')
        + '</div>'
        + compactStepCards(assessSteps, e.assessSteps, 'sm:grid-cols-2 lg:grid-cols-4'),
        sectionHead('Bagaimana Terapi Infus Dilakukan?', null, e.howTitle)
        + biTag('p', 'Terapi Infus di Rumah dalam 5 Langkah', e.howHeadline, 'class="font-semibold text-lg mb-5"')
        + howStepCards(howSteps, e.howSteps),
        sectionHead('Siapa yang Melakukan Terapi Infus?', null, e.whoTitle)
        + '<div class="canva-card rounded-2xl p-5 sm:p-6 max-w-3xl">'
        + biTag('h3', 'Dilakukan oleh Dokter atau Perawat', e.whoHeadline, 'class="font-bold mb-2"')
        + biTag('p', 'Pemasangan dan pemberian terapi infus dapat dilakukan oleh dokter atau perawat sesuai rencana pelayanan, berdasarkan rekomendasi dokter yang telah menilai kondisi pasien.', e.whoBody, 'class="text-sm text-gray-600 leading-relaxed mb-3"')
        + biTag('p', 'Apabila dilakukan oleh perawat, tindakan dilakukan sesuai rencana terapi yang telah ditentukan dokter.', e.whoNurse, 'class="text-sm text-gray-600 leading-relaxed"')
        + '</div>',
        sectionHead('Apa yang Dipersiapkan Sebelum Kunjungan?', null, e.prepTitle)
        + biTag('p', 'Sebelum tenaga medis datang ke rumah, dokter akan melakukan triase awal untuk memahami kondisi pasien dan memperkirakan kebutuhan terapi yang mungkin diperlukan. Dokter kemudian berkoordinasi dengan perawat agar obat, cairan infus, serta kebutuhan medis yang sesuai telah dipersiapkan dan dibawa saat kunjungan.', e.prepLead, 'class="text-gray-600 leading-relaxed mb-4 max-w-3xl"')
        + biTag('p', 'Selain kebutuhan yang disiapkan berdasarkan hasil triase, Tim Dokter Panggil juga membawa kit medis standar untuk mendukung pemeriksaan dan pelayanan pasien di rumah.', e.prepLead2, 'class="text-gray-600 leading-relaxed mb-6 max-w-3xl"')
        + prepCards
        + biTag('p', 'Terapi yang diberikan tetap ditentukan berdasarkan hasil penilaian dokter dan kondisi pasien saat pelayanan.', e.prepNote, 'class="text-sm text-gray-500 mt-5 max-w-3xl"'),
        sectionHead('Pemantauan Selama Terapi', null, e.monitorTitle)
        + '<div class="canva-card rounded-3xl p-6 sm:p-8">'
        + biTag('h3', 'Pasien Dipantau Selama Pemberian Infus', e.monitorHeadline, 'class="text-xl font-bold mb-2"')
        + biTag('p', 'Selama terapi berlangsung, dokter atau perawat melakukan pemantauan sesuai kondisi pasien dan jenis terapi yang diberikan. Apabila terdapat keluhan atau perubahan kondisi, terapi dapat dievaluasi dan dikoordinasikan dengan dokter.', e.monitorBody, 'class="text-gray-600 leading-relaxed"')
        + '</div>',
        sectionHead('Mengapa Terapi Infus Bersama Dokter Panggil?', null, e.whyTitle)
        + whyCards(whyItems, e.whyItems, whyIcons),
        sectionHead('Pertanyaan Umum', null, e.faqTitle || 'FAQ')
        + faqBlock(faqs, faqEn),
        ctaBlock(prefix, waAsk,
            'Butuh Pemeriksaan atau Terapi Infus di Rumah?',
            'Ceritakan kondisi pasien kepada Tim Dokter Panggil. Dokter akan melakukan penilaian terlebih dahulu untuk menentukan apakah terapi infus diperlukan dan sesuai untuk dilakukan di rumah.',
            waBook,
            {
                headlineEn: e.ctaTitle,
                bodyEn: e.ctaBody,
                bookLabel: { id: 'Konsultasikan Kondisi Pasien', en: e.ctaBook || 'Discuss Patient Condition' },
                askLabel: { id: 'Chat WhatsApp', en: e.ctaAskChat || 'Chat WhatsApp' }
            })
    ]);
}

/** Form — Infus Vitamin di Rumah (choices + nurse/doctor paths). */
function infusVitaminBody(prefix, en) {
    const {
        composeBody, aboutCard, whenCards, iconInfoCards, iconRowCards, howStepCards,
        compactStepCards, whyCards, pills, pathCards, doctorNursePathCards, doubtBox,
        noteLine, promoBanner, linkCards, flowPills
    } = sections;
    const e = en.d6 || en.iv || en;
    const waAsk = 'Halo, saya ingin bertanya tentang infus vitamin di rumah di Makassar.';
    const waBook = 'Halo, saya ingin booking infus vitamin di rumah di Makassar.';

    const vitaminOptions = [
        {
            n: '01',
            title: 'Vitamin C',
            content: 'Vitamin C (Asam Askorbat)',
            roleTitle: 'Peran Vitamin C',
            role: 'Vitamin C berperan sebagai antioksidan serta mendukung fungsi normal sistem imun dan berbagai proses metabolisme tubuh.',
            whenTitle: 'Kapan Dapat Dipertimbangkan?',
            when: 'Sebagai suplementasi vitamin C pada kondisi tertentu ketika dokter menilai terdapat kebutuhan tambahan vitamin C, termasuk ketika asupan belum mencukupi atau pada kondisi tertentu selama masa pemulihan.'
        },
        {
            n: '02',
            title: 'Multivitamin',
            content: 'Vitamin B Kompleks + Vitamin C',
            roleTitle: 'Peran Kandungan',
            role: 'Kombinasi vitamin B kompleks dan vitamin C berperan dalam metabolisme energi, fungsi sistem saraf, pembentukan sel darah, serta membantu memenuhi kebutuhan vitamin tubuh.',
            whenTitle: 'Kapan Dapat Dipertimbangkan?',
            when: 'Sebagai suplementasi pada kondisi tertentu ketika dokter menilai pasien membutuhkan tambahan vitamin B kompleks dan vitamin C, termasuk ketika kebutuhan vitamin belum terpenuhi secara optimal melalui asupan.'
        },
        {
            n: '03',
            title: 'Immunobooster',
            content: 'Sediaan multivitamin parenteral yang mengandung 12 nutrisi lengkap: 9 vitamin larut air (B1, B2, B3, B5, B6, B7/biotin, B9/folic acid, B12, C) dan 3 vitamin larut lemak (A, D, E).',
            roleTitle: 'Peran Kandungan',
            role: 'Digunakan untuk membantu memenuhi kebutuhan berbagai vitamin pada kondisi tertentu ketika pemberian suplementasi vitamin secara parenteral dinilai diperlukan.',
            whenTitle: 'Kapan Dapat Dipertimbangkan?',
            when: 'Pada kondisi tertentu ketika dokter menilai pasien membutuhkan suplementasi multivitamin yang lebih lengkap melalui jalur intravena.'
        }
    ];
    const vitEn = e.vitamins || [];
    const vitCards = '<div class="grid md:grid-cols-3 gap-4">' + vitaminOptions.map((v, i) => {
        const ve = vitEn[i] || {};
        return '<div class="canva-card rounded-2xl p-5 sm:p-6 flex flex-col">'
            + '<span class="seo-step-num mb-3">' + v.n + '</span>'
            + biTag('h3', v.title, ve.title, 'class="font-bold text-lg mb-1"')
            + biTag('p', 'Kandungan: ' + v.content, 'Contents: ' + (ve.content || v.content), 'class="text-sm text-gray-500 mb-4 leading-relaxed"')
            + biTag('p', v.roleTitle, ve.roleTitle, 'class="font-semibold text-sm mb-1"')
            + biTag('p', v.role, ve.role, 'class="text-sm text-gray-600 leading-relaxed mb-4"')
            + biTag('p', v.whenTitle, ve.whenTitle, 'class="font-semibold text-sm mb-1"')
            + biTag('p', v.when, ve.when, 'class="text-sm text-gray-600 leading-relaxed"')
            + '</div>';
    }).join('') + '</div>';

    const whenItems = [
        { title: 'Membutuhkan Suplementasi Vitamin Tertentu', desc: 'Ketika berdasarkan hasil penilaian dokter terdapat kebutuhan tambahan vitamin tertentu.' },
        { title: 'Asupan Vitamin Belum Mencukupi', desc: 'Pada kondisi tertentu ketika kebutuhan vitamin belum terpenuhi secara optimal melalui asupan sehari-hari.' },
        { title: 'Kondisi atau Masa Pemulihan Tertentu', desc: 'Dokter dapat mempertimbangkan suplementasi vitamin pada kondisi tertentu sebagai bagian dari kebutuhan pasien selama masa pemulihan.' }
    ];
    const whenEn = e.whenCards || [];
    const whenThree = '<div class="grid md:grid-cols-3 gap-4">' + whenItems.map((c, i) => {
        const ce = whenEn[i] || {};
        return '<div class="canva-card rounded-2xl p-5 sm:p-6">'
            + biTag('h3', c.title, ce.title, 'class="font-bold mb-2 leading-snug"')
            + biTag('p', c.desc, ce.desc, 'class="text-sm text-gray-600 leading-relaxed"')
            + '</div>';
    }).join('') + '</div>';

    const nurseFlow = ['Booking', 'Perawat Datang', 'Pemeriksaan', 'Konsultasi Online Dokter', 'Rekomendasi Vitamin', 'Infus & Pemantauan'];
    const doctorFlow = ['Booking', 'Dokter Datang', 'Pemeriksaan Kesehatan', 'Rekomendasi Vitamin', 'Infus & Pemantauan'];
    const nurseFlowEn = e.nurseFlow || nurseFlow;
    const doctorFlowEn = e.doctorFlow || doctorFlow;

    const pathSection = pathCards([
        {
            icon: 'heart-handshake',
            title: 'Infus Vitamin dengan Perawat', titleEn: e.nurseTitle,
            p1: 'Perawat datang langsung ke rumah dan melakukan pemeriksaan awal kondisi pasien.',
            p1En: e.nurseP1,
            p2: 'Hasil pemeriksaan kemudian disampaikan kepada dokter. Dokter melakukan konsultasi online bersama pasien untuk melakukan penilaian dan menentukan pilihan vitamin yang sesuai.',
            p2En: e.nurseP2,
            p3: 'Setelah mendapatkan rekomendasi dokter, perawat memberikan terapi dan melakukan pemantauan selama infus.',
            p3En: e.nurseP3,
            flow: nurseFlow, flowEn: nurseFlowEn
        },
        {
            icon: 'stethoscope',
            title: 'Infus Vitamin dengan Dokter', titleEn: e.doctorTitle,
            p1: 'Dokter datang langsung ke rumah dan melakukan pemeriksaan kesehatan pasien.',
            p1En: e.doctorP1,
            p2: 'Berdasarkan hasil pemeriksaan, dokter menentukan pilihan vitamin yang sesuai dengan kondisi dan kebutuhan pasien. Terapi kemudian dapat diberikan sesuai rekomendasi dokter.',
            p2En: e.doctorP2,
            flow: doctorFlow, flowEn: doctorFlowEn
        }
    ]);

    const whyItems = [
        { title: 'Pemeriksaan Sebelum Terapi', desc: 'Kondisi pasien diperiksa terlebih dahulu sebelum infus vitamin diberikan.' },
        { title: 'Rekomendasi Vitamin oleh Dokter', desc: 'Pilihan vitamin ditentukan berdasarkan kondisi dan hasil penilaian dokter.' },
        { title: 'Pilihan Dokter atau Perawat', desc: 'Pasien dapat memilih kunjungan langsung oleh dokter atau perawat sesuai kebutuhan layanan.' },
        { title: 'Pemantauan Selama Terapi', desc: 'Pemberian infus dilakukan oleh tenaga kesehatan dengan pemantauan kondisi pasien selama terapi.' }
    ];
    const whyIcons = ['clipboard-check', 'stethoscope', 'users', 'activity'];

    const faqs = [
        { q: 'Apa saja pilihan Infus Vitamin yang tersedia?', a: 'Dokter Panggil menyediakan tiga pilihan yaitu Vitamin C, Multivitamin yang mengandung Vitamin B Kompleks + Vitamin C, serta Immunobooster. Pilihan yang diberikan akan disesuaikan dengan kondisi pasien berdasarkan rekomendasi dokter.' },
        { q: 'Apakah bisa memilih Infus Vitamin dengan dokter atau perawat?', a: 'Ya. Saat melakukan booking, pasien dapat memilih layanan dengan dokter atau perawat. Keduanya tetap melalui pemeriksaan kondisi pasien dan rekomendasi dokter sebelum vitamin diberikan.' },
        { q: 'Bagaimana jika memilih layanan dengan perawat?', a: 'Perawat akan datang ke rumah dan melakukan pemeriksaan awal kondisi pasien. Hasil pemeriksaan kemudian disampaikan kepada dokter dan pasien akan menjalani konsultasi online dengan dokter. Setelah dokter memberikan rekomendasi, perawat memberikan infus vitamin sesuai terapi yang telah ditentukan.' },
        { q: 'Bagaimana jika memilih layanan dengan dokter?', a: 'Dokter akan datang langsung ke rumah untuk melakukan pemeriksaan kesehatan pasien. Berdasarkan hasil pemeriksaan, dokter akan menentukan pilihan vitamin yang sesuai sebelum terapi diberikan.' },
        { q: 'Apakah pasien bisa memilih sendiri jenis vitamin?', a: 'Pasien dapat menyampaikan pilihan atau kebutuhan saat melakukan booking. Namun, jenis vitamin yang diberikan tetap berdasarkan hasil pemeriksaan dan rekomendasi dokter untuk memastikan kesesuaiannya dengan kondisi pasien.' },
        { q: 'Berapa lama Infus Vitamin berlangsung?', a: 'Durasi pemberian kurang lebih 30 menit dan dapat berbeda tergantung jenis terapi, volume cairan, serta kondisi pasien. Perkiraan durasi akan diinformasikan sesuai terapi yang diberikan.' },
        { q: 'Apakah Infus Vitamin memiliki efek samping?', a: 'Seperti terapi intravena lainnya, infus vitamin dapat menimbulkan efek samping atau reaksi tertentu. Karena itu, kondisi pasien diperiksa sebelum terapi dan dipantau selama pemberian infus.' },
        { q: 'Berapa biaya Infus Vitamin di rumah?', a: 'Biaya disesuaikan dengan pilihan vitamin, pilihan layanan dokter atau perawat, serta lokasi pasien. Rincian dan estimasi biaya akan diinformasikan sebelum layanan dikonfirmasi.' }
    ];
    const faqEn = e.faqs || [];

    return composeBody([
        sectionHead('Infus Vitamin, Sesuai Kebutuhan Anda', null, e.aboutTitle)
        + aboutCard([
            'Infus vitamin merupakan pemberian vitamin melalui pembuluh darah sebagai salah satu metode suplementasi.',
            'Layanan Infus Vitamin langsung di rumah dengan pemeriksaan kondisi pasien terlebih dahulu. Berdasarkan hasil pemeriksaan, dokter akan menentukan pilihan vitamin yang sesuai sebelum terapi diberikan.',
            'Pasien dapat memilih layanan dengan dokter atau perawat. Pilihan vitamin yang diberikan tetap berdasarkan rekomendasi dokter.'
        ], [e.aboutP1, e.aboutP2, e.aboutP3]),
        sectionHead('Pilihan Infus Vitamin', 'Setiap pilihan memiliki kandungan dan tujuan suplementasi yang berbeda. Dokter akan membantu menentukan terapi yang sesuai berdasarkan kondisi dan kebutuhan Anda.', e.vitTitle, e.vitLead)
        + vitCards
        + biTag('p', 'Pilihan dan pemberian infus vitamin disesuaikan dengan kondisi dan kebutuhan pasien berdasarkan hasil penilaian dokter melalui konsultasi online atau kunjungan langsung ke rumah.', e.vitNote, 'class="text-sm text-gray-500 mt-5 max-w-3xl"'),
        sectionHead('Kapan Infus Vitamin Dapat Dipertimbangkan?', 'Kebutuhan vitamin setiap orang berbeda. Dokter akan mempertimbangkan pemberian infus vitamin berdasarkan kondisi kesehatan, riwayat medis, kebutuhan pasien, serta hasil pemeriksaan.', e.whenTitle, e.whenLead)
        + whenThree,
        sectionHead('Dua Pilihan Layanan, Tetap dengan Rekomendasi Dokter', 'Pasien dapat memilih kunjungan Infus Vitamin dengan dokter atau dengan perawat. Perbedaannya terletak pada proses pemeriksaan dan konsultasi sebelum terapi diberikan.', e.pathTitle, e.pathLead)
        + pathSection,
        sectionHead('Tim Datang dengan Kebutuhan yang Telah Dipersiapkan', null, e.prepTitle)
        + '<div class="canva-card rounded-2xl p-5 sm:p-6 max-w-3xl">'
        + biTag('p', 'Sebelum kunjungan, Tim Dokter Panggil mempersiapkan kebutuhan pelayanan berdasarkan informasi awal yang disampaikan saat booking.', e.prepP1, 'class="text-sm text-gray-600 leading-relaxed mb-3"')
        + biTag('p', 'Tenaga medis juga membawa kit medis standar Dokter Panggil untuk mendukung pemeriksaan, pemberian terapi, dan pemantauan pasien di rumah.', e.prepP2, 'class="text-sm text-gray-600 leading-relaxed"')
        + '</div>',
        sectionHead('Informasikan Kondisi Kesehatan Anda', null, e.healthTitle)
        + '<div class="rounded-2xl border border-[#F1E7E0] bg-warm-gray p-5 sm:p-6 max-w-3xl">'
        + biTag('h3', 'Sampaikan Riwayat Kesehatan Sebelum Terapi', e.healthHeadline, 'class="font-bold mb-2"')
        + biTag('p', 'Sebelum infus vitamin diberikan, sampaikan kepada dokter atau perawat apabila memiliki riwayat penyakit tertentu, alergi, sedang mengonsumsi obat atau suplemen, sedang hamil atau menyusui, atau sedang menjalani terapi medis lainnya.', e.healthBody, 'class="text-sm text-gray-600 leading-relaxed mb-3"')
        + biTag('p', 'Informasi tersebut akan menjadi bagian dari penilaian dokter dalam menentukan kesesuaian terapi.', e.healthNote, 'class="text-sm text-gray-600 leading-relaxed"')
        + '</div>',
        sectionHead('Mengapa Infus Vitamin Bersama Dokter Panggil?', null, e.whyTitle)
        + whyCards(whyItems, e.whyItems, whyIcons),
        sectionHead('Pertanyaan Umum', null, e.faqTitle || 'FAQ')
        + faqBlock(faqs, faqEn),
        ctaBlock(prefix, waAsk,
            'Infus Vitamin, Langsung di Rumah Anda',
            'Pilih layanan dengan dokter atau perawat dan lakukan booking bersama Tim Dokter Panggil. Kondisi Anda akan diperiksa terlebih dahulu sebelum dokter menentukan pilihan vitamin yang sesuai.',
            waBook,
            {
                headlineEn: e.ctaTitle,
                bodyEn: e.ctaBody,
                bookLabel: { id: 'Booking Infus Vitamin', en: e.ctaBook || 'Book Vitamin Infusion' },
                askLabel: { id: 'Tanya Tim Dokter Panggil', en: e.ctaAskChat || 'Ask the Dokter Panggil Team' }
            })
    ]);
}

/** Form D7 — Terapi Oksigen di Rumah. */
function terapiOksigenBody(prefix, en) {
    const {
        composeBody, aboutCard, whenCards, iconInfoCards, iconRowCards, howStepCards,
        compactStepCards, whyCards, pills, pathCards, doctorNursePathCards, doubtBox,
        noteLine, promoBanner, linkCards, flowPills
    } = sections;
    const e = en.d7 || en;
    const waAsk = 'Halo, saya ingin hubungi Dokter Panggil tentang terapi oksigen di rumah di Makassar.';
    const waBook = 'Halo, saya ingin konsultasikan kondisi pasien untuk terapi oksigen di rumah di Makassar.';

    const whenItems = [
        { title: 'Kadar Oksigen Darah Rendah', desc: 'Pada kondisi ketika hasil pemeriksaan menunjukkan kadar oksigen yang tidak sesuai dengan target yang ditentukan dokter.' },
        { title: 'Gangguan Pernapasan Tertentu', desc: 'Pada kondisi pernapasan tertentu yang berdasarkan pemeriksaan dokter membutuhkan tambahan oksigen.' },
        { title: 'Dalam Masa Perawatan atau Pemulihan', desc: 'Untuk pasien tertentu yang masih membutuhkan terapi oksigen sebagai bagian dari rencana perawatan di rumah.' },
        { title: 'Melanjutkan Terapi Oksigen', desc: 'Untuk pasien yang sebelumnya telah mendapatkan rekomendasi terapi oksigen dan perlu melanjutkan terapi di rumah sesuai rencana dokter.' }
    ];

    const howSteps = [
        { n: '01', title: 'Penilaian Kondisi Pasien melalui Triase', desc: 'Dokter menilai keluhan, kondisi pernapasan, saturasi oksigen, serta kebutuhan medis pasien.' },
        { n: '02', title: 'Persiapan Peralatan', desc: 'Tim mempersiapkan sumber oksigen dan perangkat pemberian yang dibutuhkan sesuai rekomendasi dokter untuk dibawa ke lokasi.' },
        { n: '03', title: 'Penentuan Terapi', desc: 'Dokter melakukan pemeriksaan langsung dan menentukan kebutuhan terapi oksigen serta rencana pemberiannya.' },
        { n: '04', title: 'Pemberian Terapi Oksigen', desc: 'Oksigen diberikan sesuai rencana terapi yang telah ditentukan.' },
        { n: '05', title: 'Pemantauan & Evaluasi', desc: 'Respons pasien terhadap terapi dipantau dan dikoordinasikan dengan dokter apabila diperlukan.' }
    ];
    const monitorItems = [
        { title: 'Saturasi Oksigen (SpO₂)', desc: 'Untuk membantu menilai kadar oksigen pasien dan respons terhadap terapi.' },
        { title: 'Frekuensi Pernapasan', desc: 'Membantu memantau pola dan perubahan kondisi pernapasan.' },
        { title: 'Tanda Vital', desc: 'Pemantauan kondisi umum pasien sesuai kebutuhan.' },
        { title: 'Respons terhadap Terapi', desc: 'Menilai perkembangan kondisi pasien setelah terapi oksigen diberikan.' }
    ];

    const equipment = [
        { icon: 'wind', title: 'Tabung Oksigen Murni', titleEn: 'Pure Oxygen Cylinder' },
        { icon: 'activity', title: 'Nasal Kanula', titleEn: 'Nasal Cannula' },
        { icon: 'cloud', title: 'Masker Wajah Sederhana (Simple Mask)', titleEn: 'Simple Face Mask' },
        { icon: 'shield-check', title: 'Masker Non Rebreathing', titleEn: 'Non-Rebreathing Mask' },
        { icon: 'heart-pulse', title: 'Pulse Oximeter atau Patient Monitor', titleEn: 'Pulse Oximeter or Patient Monitor' }
    ];
    const eqEn = e.equipment || [];
    const eqCards = '<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">' + equipment.map((item, i) => {
        const ee = eqEn[i] || {};
        return '<div class="canva-card rounded-2xl p-5 flex gap-3 items-center">'
            + '<div class="w-10 h-10 shrink-0 bg-primary/10 rounded-xl flex items-center justify-center">' + icon(item.icon, 20, BRAND) + '</div>'
            + biTag('span', item.title, ee.title || item.titleEn, 'class="font-semibold text-sm leading-snug"')
            + '</div>';
    }).join('') + '</div>';

    const whyItems = [
        { title: 'Berdasarkan Penilaian Dokter', desc: 'Kebutuhan terapi oksigen ditentukan berdasarkan kondisi dan hasil penilaian pasien.' },
        { title: 'Terapi Sesuai Kebutuhan Pasien', desc: 'Metode pemberian dan rencana terapi disesuaikan dengan kondisi medis pasien.' },
        { title: 'Pemantauan Kondisi', desc: 'Saturasi oksigen dan kondisi pasien dapat dipantau sesuai kebutuhan selama terapi.' },
        { title: 'Terhubung dengan Tim Medis', desc: 'Apabila diperlukan, dokter, perawat, pemeriksaan laboratorium, maupun layanan medis lanjutan dapat dikoordinasikan melalui Dokter Panggil.' }
    ];
    const whyIcons = ['stethoscope', 'clipboard-check', 'activity', 'share-2'];

    const faqs = [
        { q: 'Apakah bisa langsung memesan oksigen tanpa konsultasi dokter?', a: 'Terapi oksigen diberikan berdasarkan rekomendasi dokter. Dokter akan melakukan penilaian dan pemeriksaan terlebih dahulu untuk menentukan kebutuhan dan rencana terapi sesuai kondisi pasien.' },
        { q: 'Apakah pasien sesak napas selalu membutuhkan oksigen?', a: 'Tidak selalu. Sesak napas dapat disebabkan oleh berbagai kondisi dan tidak semuanya membutuhkan terapi oksigen. Dokter akan melakukan penilaian untuk menentukan penyebab dan penanganan yang sesuai.' },
        { q: 'Berapa saturasi oksigen yang membutuhkan terapi oksigen?', a: 'Kebutuhan terapi tidak ditentukan hanya berdasarkan satu angka saturasi. Dokter akan mempertimbangkan hasil pengukuran bersama gejala, kondisi medis, serta target saturasi yang sesuai untuk pasien.' },
        { q: 'Siapa yang memberikan terapi oksigen di rumah?', a: 'Terapi dapat dibantu oleh dokter atau perawat sesuai kondisi pasien dan rencana terapi yang telah ditentukan dokter.' },
        { q: 'Apakah peralatan oksigen disediakan?', a: 'Peralatan yang dibutuhkan dipersiapkan sesuai rencana terapi.' },
        { q: 'Apakah terapi oksigen dapat dilakukan dalam jangka panjang?', a: 'Pada kondisi tertentu, terapi oksigen dapat menjadi bagian dari perawatan berkelanjutan. Kebutuhan, durasi, dan pemantauan harus mengikuti rencana dokter.' },
        { q: 'Bagaimana jika saturasi tetap rendah meskipun sudah diberikan oksigen?', a: 'Kondisi pasien perlu dievaluasi kembali. Apabila pasien membutuhkan pemeriksaan atau fasilitas yang tidak tersedia di rumah, dokter akan merekomendasikan penanganan lebih lanjut di fasilitas kesehatan.' }
    ];
    const faqEn = e.faqs || [];

    return composeBody([
        sectionHead('Apa Itu Terapi Oksigen?', null, e.aboutTitle)
        + '<div class="canva-card rounded-3xl p-6 sm:p-8 max-w-4xl">'
        + biTag('h3', 'Terapi Oksigen Sesuai Kebutuhan Pasien', e.aboutHeadline, 'class="text-xl font-bold mb-3"')
        + biTag('p', 'Terapi oksigen merupakan pemberian oksigen tambahan untuk membantu memenuhi kebutuhan oksigen tubuh pada pasien dengan kondisi tertentu.', e.aboutP1, 'class="text-gray-600 leading-relaxed mb-4"')
        + biTag('p', 'Di Dokter Panggil, terapi oksigen diberikan berdasarkan hasil penilaian dan rekomendasi dokter, termasuk kebutuhan, metode pemberian, serta pemantauan yang diperlukan selama terapi.', e.aboutP2, 'class="text-gray-600 leading-relaxed mb-4"')
        + biTag('p', 'Tidak semua keluhan sesak membutuhkan terapi oksigen. Penyebab keluhan dan kondisi pasien perlu dinilai terlebih dahulu oleh dokter.', e.aboutP3, 'class="text-gray-600 leading-relaxed font-medium"')
        + '</div>',
        sectionHead('Kapan Dokter Dapat Merekomendasikan Terapi Oksigen?', 'Dokter dapat mempertimbangkan terapi oksigen apabila berdasarkan pemeriksaan terdapat kondisi yang menyebabkan pasien membutuhkan tambahan oksigen.', e.whenTitle, e.whenLead)
        + whenCards(whenItems, e.whenCards),
        sectionHead('Terapi Oksigen Berdasarkan Rekomendasi Dokter', null, e.assessTitle)
        + '<div class="canva-card rounded-3xl p-6 sm:p-8 mb-6 max-w-4xl">'
        + biTag('p', 'Sebelum terapi diberikan, dokter akan menilai kondisi pasien untuk menentukan apakah oksigen diperlukan, target terapi, metode pemberian, serta kebutuhan pemantauan pasien.', e.assessP1, 'class="text-gray-600 leading-relaxed mb-3"')
        + biTag('p', 'Untuk terapi oksigen, penilaian dokter minimal dilakukan melalui pemeriksaan langsung di rumah sesuai kondisi pasien.', e.assessP2, 'class="text-gray-600 leading-relaxed"')
        + '</div>'
        + biTag('p', 'Terapi Oksigen di Rumah', e.howHeadline, 'class="font-semibold text-lg mb-5"')
        + howStepCards(howSteps, e.howSteps),
        sectionHead('Kondisi Pasien Dipantau Selama Terapi', 'Pemantauan dilakukan sesuai kondisi dan rencana terapi pasien, yang dapat mencakup:', e.monitorTitle, e.monitorLead)
        + whenCards(monitorItems, e.monitorItems),
        sectionHead('Peralatan Sesuai Kebutuhan Terapi', 'Peralatan terapi oksigen akan disiapkan sesuai rekomendasi dokter dan kebutuhan pasien.', e.equipTitle, e.equipLead)
        + eqCards,
        sectionHead('Mengapa Terapi Oksigen Bersama Dokter Panggil?', null, e.whyTitle)
        + whyCards(whyItems, e.whyItems, whyIcons),
        sectionHead('Pertanyaan Umum', null, e.faqTitle || 'FAQ')
        + faqBlock(faqs, faqEn),
        ctaBlock(prefix, waAsk,
            'Membutuhkan Terapi Oksigen di Rumah?',
            'Ceritakan kondisi pasien kepada Tim Dokter Panggil. Dokter akan melakukan penilaian untuk menentukan kebutuhan terapi oksigen dan pelayanan yang sesuai.',
            waBook,
            {
                headlineEn: e.ctaTitle,
                bodyEn: e.ctaBody,
                bookLabel: { id: 'Konsultasikan Kondisi Pasien', en: e.ctaBook || 'Discuss Patient Condition' },
                askLabel: { id: 'Hubungi Dokter Panggil', en: e.ctaAskChat || 'Contact Dokter Panggil' }
            })
    ]);
}

/** Form D8 — Terapi Nebulizer di Rumah. */
function terapiNebulizerBody(prefix, en) {
    const {
        composeBody, aboutCard, whenCards, iconInfoCards, iconRowCards, howStepCards,
        compactStepCards, whyCards, pills, pathCards, doctorNursePathCards, doubtBox,
        noteLine, promoBanner, linkCards, flowPills
    } = sections;
    const e = en.d8 || en;
    const waAsk = 'Halo, saya ingin hubungi Dokter Panggil tentang terapi nebulizer di rumah di Makassar.';
    const waBook = 'Halo, saya ingin konsultasikan kondisi pasien untuk terapi nebulizer di rumah di Makassar.';

    const whenItems = [
        { title: 'Mengi atau Bunyi Napas Tertentu', desc: 'Pada kondisi ketika pemeriksaan menunjukkan adanya gangguan saluran napas yang dapat memerlukan obat melalui nebulizer.' },
        { title: 'Penyempitan Saluran Pernapasan', desc: 'Pada kondisi tertentu ketika dokter menilai diperlukan obat untuk membantu mengatasi penyempitan saluran napas.' },
        { title: 'Kondisi Pernapasan Tertentu', desc: 'Nebulizer dapat menjadi bagian dari terapi pada penyakit atau gangguan pernapasan tertentu sesuai hasil pemeriksaan dokter.' },
        { title: 'Melanjutkan Terapi yang Telah Direkomendasikan', desc: 'Untuk pasien yang telah memiliki rencana terapi nebulizer dan masih membutuhkan pemberian obat sesuai rekomendasi dokter.' }
    ];

    const howSteps = [
        { n: '01', title: 'Triase Kondisi', desc: 'Kondisi dan keluhan pernapasan pasien dinilai terlebih dahulu sesuai kebutuhan pelayanan melalui triase.' },
        { n: '02', title: 'Persiapan Obat & Nebulizer', desc: 'Obat dan perangkat nebulizer dipersiapkan sesuai rencana terapi dokter untuk dibawa ke lokasi pasien.' },
        { n: '03', title: 'Penentuan Terapi', desc: 'Dokter menentukan kebutuhan nebulizer serta obat yang akan diberikan berdasarkan kondisi pasien.' },
        { n: '04', title: 'Pemberian Nebulizer', desc: 'Pasien menghirup aerosol obat melalui masker atau mouthpiece selama terapi berlangsung.' },
        { n: '05', title: 'Pemantauan & Evaluasi', desc: 'Kondisi dan respons pasien terhadap terapi dipantau dan dievaluasi sesuai kebutuhan.' }
    ];
    const monitorItems = [
        { title: 'Keluhan Pernapasan', desc: 'Menilai perubahan keluhan setelah terapi.' },
        { title: 'Frekuensi & Pola Napas', desc: 'Memantau kondisi pernapasan pasien sesuai kebutuhan.' },
        { title: 'Saturasi Oksigen (SpO₂)', desc: 'Dapat diperiksa sebelum dan setelah terapi sesuai kondisi pasien.' },
        { title: 'Respons terhadap Obat', desc: 'Memantau efektivitas maupun kemungkinan reaksi setelah pemberian obat.' }
    ];

    const whyItems = [
        { title: 'Berdasarkan Penilaian Dokter', desc: 'Kebutuhan nebulizer ditentukan berdasarkan kondisi pasien dan rekomendasi dokter.' },
        { title: 'Obat Sesuai Kondisi Pasien', desc: 'Jenis dan dosis obat ditentukan berdasarkan kebutuhan medis pasien.' },
        { title: 'Dokter & Perawat Profesional', desc: 'Terapi dilakukan oleh tenaga kesehatan sesuai kompetensi dan rencana terapi.' },
        { title: 'Pemantauan Setelah Terapi', desc: 'Respons pasien dapat dievaluasi setelah pemberian nebulizer sesuai kondisi pasien.' }
    ];
    const whyIcons = ['stethoscope', 'pill', 'shield-check', 'activity'];

    const faqs = [
        { q: 'Apakah batuk atau pilek perlu nebulizer?', a: 'Tidak selalu. Kebutuhan nebulizer bergantung pada penyebab keluhan dan kondisi saluran pernapasan. Dokter akan melakukan penilaian terlebih dahulu.' },
        { q: 'Apakah nebulizer hanya berisi uap?', a: 'Tidak. Nebulizer mengubah cairan obat menjadi aerosol atau kabut halus yang dapat dihirup ke saluran pernapasan.' },
        { q: 'Apakah obat nebulizer bisa dipilih sendiri?', a: 'Tidak. Jenis, dosis, dan kombinasi obat nebulizer diberikan berdasarkan rekomendasi dokter.' },
        { q: 'Siapa yang melakukan nebulizer di rumah?', a: 'Terapi dapat dilakukan oleh dokter atau perawat sesuai kebutuhan pelayanan dan rencana terapi dokter.' },
        { q: 'Apakah anak-anak bisa mendapatkan nebulizer di rumah?', a: 'Bisa apabila berdasarkan penilaian dokter terapi nebulizer memang diperlukan. Jenis dan dosis obat akan disesuaikan dengan kondisi pasien.' },
        { q: 'Berapa lama terapi nebulizer berlangsung?', a: 'Durasi dapat berbeda tergantung perangkat, obat, dan terapi yang diberikan. Tenaga medis akan melakukan terapi sesuai rencana dokter.' },
        { q: 'Bagaimana jika sesak tidak membaik setelah nebulizer?', a: 'Kondisi pasien perlu dievaluasi kembali. Apabila membutuhkan penanganan lebih lanjut, dokter dapat merekomendasikan pasien mendapatkan perawatan di fasilitas kesehatan.' }
    ];
    const faqEn = e.faqs || [];

    return composeBody([
        sectionHead('Terapi Pernapasan Menggunakan Nebulizer', null, e.aboutTitle)
        + '<div class="canva-card rounded-3xl p-6 sm:p-8 max-w-4xl">'
        + biTag('p', 'Nebulizer merupakan alat yang mengubah obat berbentuk cair menjadi aerosol atau kabut halus sehingga dapat dihirup melalui masker atau mouthpiece dan masuk ke saluran pernapasan.', e.aboutP1, 'class="text-gray-600 leading-relaxed mb-4"')
        + biTag('p', 'Terapi nebulizer dapat digunakan pada kondisi pernapasan tertentu apabila berdasarkan pemeriksaan dokter terdapat indikasi pemberian obat melalui nebulizer.', e.aboutP2, 'class="text-gray-600 leading-relaxed mb-4"')
        + biTag('p', 'Jenis obat, dosis, dan frekuensi nebulizer ditentukan berdasarkan rekomendasi dokter dan kondisi pasien.', e.aboutP3, 'class="text-gray-600 leading-relaxed font-medium"')
        + '</div>',
        sectionHead('Kapan Dokter Dapat Merekomendasikan Nebulizer?', 'Dokter akan mempertimbangkan terapi berdasarkan keluhan, hasil pemeriksaan, riwayat penyakit, serta kondisi pernapasan pasien.', e.whenTitle, e.whenLead)
        + whenCards(whenItems, e.whenCards),
        sectionHead('Obat Nebulizer Ditentukan oleh Dokter', null, e.medTitle)
        + aboutCard([
            'Sebelum terapi diberikan, dokter akan menilai kondisi pasien untuk menentukan apakah nebulizer diperlukan serta menentukan jenis obat, dosis, kombinasi obat, dan frekuensi pemberian sesuai kebutuhan pasien.'
        ], [e.medBody]),
        sectionHead('Proses Terapi Nebulizer di Rumah', null, e.howTitle)
        + howStepCards(howSteps, e.howSteps),
        sectionHead('Siapa yang Melakukan Nebulizer?', null, e.whoTitle)
        + '<div class="canva-card rounded-2xl p-5 sm:p-6 max-w-3xl">'
        + biTag('h3', 'Dokter atau Perawat Langsung ke Rumah', e.whoHeadline, 'class="font-bold mb-2"')
        + biTag('p', 'Terapi nebulizer dapat diberikan oleh dokter maupun perawat sesuai kebutuhan pelayanan.', e.whoBody, 'class="text-sm text-gray-600 leading-relaxed mb-3"')
        + biTag('p', 'Apabila dilakukan oleh perawat, pemberian obat tetap mengikuti rekomendasi dan rencana terapi yang telah ditentukan dokter.', e.whoNurse, 'class="text-sm text-gray-600 leading-relaxed"')
        + '</div>',
        sectionHead('Pemantauan Setelah Nebulizer', null, e.monitorTitle)
        + biTag('p', 'Respons Pasien Dievaluasi Setelah Terapi', e.monitorHeadline, 'class="font-semibold text-lg mb-2"')
        + biTag('p', 'Setelah nebulizer diberikan, tenaga medis dapat melakukan evaluasi terhadap:', e.monitorLead, 'class="text-gray-600 leading-relaxed mb-5"')
        + whenCards(monitorItems, e.monitorItems),
        sectionHead('Mengapa Nebulizer Bersama Dokter Panggil?', null, e.whyTitle)
        + whyCards(whyItems, e.whyItems, whyIcons),
        sectionHead('Pertanyaan Umum', null, e.faqTitle || 'FAQ')
        + faqBlock(faqs, faqEn),
        ctaBlock(prefix, waAsk,
            'Membutuhkan Terapi Nebulizer di Rumah?',
            'Ceritakan keluhan dan kondisi pasien kepada Tim Dokter Panggil. Dokter akan melakukan penilaian untuk menentukan apakah nebulizer diperlukan serta terapi yang sesuai.',
            waBook,
            {
                headlineEn: e.ctaTitle,
                bodyEn: e.ctaBody,
                bookLabel: { id: 'Konsultasikan Kondisi Pasien', en: e.ctaBook || 'Discuss Patient Condition' },
                askLabel: { id: 'Hubungi Dokter Panggil', en: e.ctaAskChat || 'Contact Dokter Panggil' }
            })
    ]);
}

/** Form — Perawatan Luka di Rumah (wound types + nurse/doctor paths). */
function perawatanLukaBody(prefix, en) {
    const {
        composeBody, aboutCard, whenCards, iconInfoCards, iconRowCards, howStepCards,
        compactStepCards, whyCards, pills, pathCards, doctorNursePathCards, doubtBox,
        noteLine, promoBanner, linkCards, flowPills
    } = sections;
    const e = en.d9 || en.pl || en;
    const waAsk = 'Halo, saya ingin konsultasikan kondisi luka di rumah di Makassar.';
    const waBook = 'Halo, saya ingin booking perawatan luka di rumah di Makassar.';

    const woundTypes = [
        { title: 'Luka Pasca Operasi', desc: 'Perawatan, penggantian balutan luka, pencabutan benang setelah tindakan operasi sesuai kondisi dan instruksi perawatan pasien.' },
        { title: 'Luka Diabetes', desc: 'Perawatan luka pada pasien diabetes yang membutuhkan pemantauan dan penanganan secara berkala.' },
        { title: 'Luka Tekan / Dekubitus', desc: 'Perawatan luka akibat tekanan berkepanjangan yang sering terjadi pada pasien dengan keterbatasan mobilitas atau tirah baring.' },
        { title: 'Luka Kronis', desc: 'Perawatan luka yang membutuhkan waktu penyembuhan lebih panjang dan pemantauan secara berkala.' },
        { title: 'Luka Akibat Cedera', desc: 'Perawatan luka akibat cedera tertentu setelah kondisi pasien dinilai oleh tenaga medis.' },
        { title: 'Luka Lainnya', desc: 'Kondisi luka lainnya dapat dikonsultasikan terlebih dahulu kepada Tim Dokter Panggil untuk menentukan pelayanan yang sesuai.' }
    ];
    const woundIcons = ['clipboard-check', 'activity', 'home', 'clock', 'heart-pulse', 'message-circle'];

    const nurseFlow = ['Booking', 'Perawat Datang', 'Pemeriksaan Luka', 'Konsultasi Online Dokter', 'Rekomendasi Perawatan', 'Perawatan Luka'];
    const doctorFlow = ['Booking', 'Dokter Datang', 'Pemeriksaan Luka & Kondisi Pasien', 'Rekomendasi', 'Perawatan Luka', 'Rencana Tindak Lanjut'];
    const nurseFlowEn = e.nurseFlow || nurseFlow;
    const doctorFlowEn = e.doctorFlow || doctorFlow;

    const pathSection = pathCards([
        {
            icon: 'heart-handshake',
            title: 'Perawatan Luka dengan Perawat', titleEn: e.nurseTitle,
            p1: 'Perawat datang langsung ke rumah untuk melakukan pemeriksaan awal kondisi luka dan kondisi pasien yang berkaitan dengan perawatan.',
            p1En: e.nurseP1,
            p2: 'Hasil pemeriksaan kemudian disampaikan kepada dokter dan pasien akan melakukan konsultasi online bersama dokter. Dokter menilai kondisi pasien serta memberikan rekomendasi dan rencana perawatan luka yang diperlukan.',
            p2En: e.nurseP2,
            p3: 'Setelah mendapatkan rekomendasi dokter, perawat melakukan perawatan luka sesuai rencana yang telah ditentukan.',
            p3En: e.nurseP3,
            flow: nurseFlow, flowEn: nurseFlowEn
        },
        {
            icon: 'stethoscope',
            title: 'Perawatan Luka dengan Dokter', titleEn: e.doctorTitle,
            p1: 'Dokter datang langsung ke rumah untuk melakukan pemeriksaan luka sekaligus mengevaluasi kondisi kesehatan pasien yang dapat berkaitan dengan proses penyembuhan.',
            p1En: e.doctorP1,
            p2: 'Berdasarkan hasil pemeriksaan, dokter menentukan rencana perawatan dan terapi yang sesuai. Perawatan luka dapat dilakukan pada kunjungan tersebut.',
            p2En: e.doctorP2,
            p3: 'Apabila pasien membutuhkan perawatan berkala, dokter dapat menentukan rencana perawatan selanjutnya yang dapat dilanjutkan oleh perawat.',
            p3En: e.doctorP3,
            flow: doctorFlow, flowEn: doctorFlowEn
        }
    ]);

    const monitorFlow = ['Rencana Dokter', 'Perawatan Berkala', 'Monitoring Luka', 'Evaluasi Perkembangan', 'Koordinasi Dokter Bila Diperlukan'];
    const monitorFlowEn = e.monitorFlow || ['Doctor Plan', 'Periodic Care', 'Wound Monitoring', 'Progress Evaluation', 'Doctor Coordination If Needed'];

    const whyItems = [
        { title: 'Dokter atau Perawat ke Rumah', desc: 'Pasien dapat memilih layanan sesuai kondisi dan kebutuhan perawatan.' },
        { title: 'Terintegrasi dengan Dokter', desc: 'Perawatan luka oleh perawat tetap melalui konsultasi dan rencana perawatan dari dokter.' },
        { title: 'Perawatan Sesuai Kondisi Luka', desc: 'Metode perawatan dan balutan disesuaikan dengan karakteristik serta perkembangan luka.' },
        { title: 'Monitoring Secara Berkala', desc: 'Perawatan dapat dilakukan secara berkala dengan pemantauan perkembangan luka dari kunjungan ke kunjungan.' }
    ];
    const whyIcons = ['users', 'stethoscope', 'clipboard-check', 'activity'];

    const faqs = [
        { q: 'Apakah perawatan luka di rumah terasa sakit?', a: 'Tingkat rasa tidak nyaman dapat berbeda tergantung jenis, lokasi, dan kondisi luka. Tenaga medis akan melakukan perawatan dengan mempertimbangkan kondisi pasien. Apabila nyeri cukup berat atau membutuhkan penanganan tambahan, kondisi tersebut dapat dikonsultasikan dengan dokter.' },
        { q: 'Apakah jahitan luka operasi bisa dilepas di rumah?', a: 'Pada kondisi tertentu, pelepasan jahitan dapat dilakukan di rumah setelah kondisi luka dinilai dan waktu pelepasan jahitan dinyatakan sesuai. Tenaga medis akan memastikan kondisi luka terlebih dahulu sebelum tindakan dilakukan.' },
        { q: 'Apakah keluarga perlu menyiapkan alat atau perlengkapan perawatan luka?', a: 'Tidak perlu menyiapkan sendiri kecuali telah diinformasikan sebelumnya. Tim Dokter Panggil dapat mempersiapkan kebutuhan dasar perawatan sesuai informasi awal pasien. Apabila setelah pemeriksaan diperlukan kebutuhan khusus lainnya, tenaga medis akan menginformasikannya kepada pasien atau keluarga.' },
        { q: 'Apakah perkembangan luka dapat didokumentasikan dari setiap kunjungan?', a: 'Pada perawatan luka berkala, perkembangan kondisi luka didokumentasikan sesuai kebutuhan untuk membantu memantau perubahan luka dari waktu ke waktu dan menjadi bagian dari evaluasi perawatan berikutnya.' },
        { q: 'Apakah perawatan luka harus dilakukan setiap hari?', a: 'Tidak selalu. Frekuensi perawatan bergantung pada jenis luka, kondisi luka, jenis balutan, serta perkembangan luka. Jadwal perawatan akan disesuaikan dengan kebutuhan pasien.' },
        { q: 'Apakah dressing dan kebutuhan perawatan disediakan?', a: 'Kebutuhan perawatan luka dipersiapkan sesuai kondisi dan rencana perawatan pasien. Informasi mengenai kebutuhan tambahan dan biaya akan disampaikan kepada pasien atau keluarga.' }
    ];
    const faqEn = e.faqs || [];

    return composeBody([
        sectionHead('Apa Itu Perawatan Luka?', null, e.aboutTitle)
        + '<div class="canva-card rounded-3xl p-6 sm:p-8 max-w-4xl">'
        + biTag('h3', 'Perawatan Sesuai Kondisi Luka', e.aboutHeadline, 'class="text-xl font-bold mb-3"')
        + biTag('p', 'Perawatan luka merupakan tindakan untuk membersihkan, merawat, dan melindungi luka serta memantau perkembangannya selama proses penyembuhan.', e.aboutP1, 'class="text-gray-600 leading-relaxed mb-4"')
        + biTag('p', 'Setiap luka dapat membutuhkan penanganan yang berbeda. Kondisi luka akan dinilai untuk menentukan metode perawatan, jenis balutan, frekuensi perawatan, serta kebutuhan terapi lainnya yang sesuai.', e.aboutP2, 'class="text-gray-600 leading-relaxed"')
        + '</div>',
        sectionHead('Jenis Luka yang Dapat Dirawat di Rumah', 'Perawatan untuk berbagai kondisi luka.', e.typesTitle, e.typesLead)
        + iconInfoCards(woundTypes, e.woundTypes, woundIcons),
        sectionHead('Pilih Perawatan oleh Dokter atau Perawat', null, e.pathTitle)
        + biTag('p', 'Pilih Layanan Sesuai Kebutuhan Pasien', e.pathHeadline, 'class="font-semibold text-lg mb-2"')
        + biTag('p', 'Pasien dapat melakukan booking Perawatan Luka dengan dokter atau Perawatan Luka dengan perawat. Pada keduanya, kondisi luka akan diperiksa dan rencana perawatan tetap berada dalam rekomendasi dokter.', e.pathLead, 'class="text-gray-600 leading-relaxed mb-6 max-w-3xl"')
        + pathSection,
        sectionHead('Perawatan & Monitoring Perkembangan Luka', null, e.monitorTitle)
        + '<div class="canva-card rounded-3xl p-6 sm:p-8 mb-5 max-w-4xl">'
        + biTag('p', 'Beberapa jenis luka tidak selesai dalam satu kali perawatan dan membutuhkan kunjungan secara berkala.', e.monitorP1, 'class="text-gray-600 leading-relaxed mb-3"')
        + biTag('p', 'Dokter akan menentukan rencana perawatan berdasarkan kondisi pasien. Perawat kemudian dapat melakukan perawatan berkala di rumah sesuai rencana tersebut.', e.monitorP2, 'class="text-gray-600 leading-relaxed mb-3"')
        + biTag('p', 'Pada setiap kunjungan, perkembangan luka akan dipantau. Apabila ditemukan perubahan kondisi atau perkembangan yang tidak sesuai harapan, perawat akan berkoordinasi kembali dengan dokter untuk evaluasi lebih lanjut.', e.monitorP3, 'class="text-gray-600 leading-relaxed"')
        + '</div>'
        + flowPills(monitorFlow, monitorFlowEn),
        sectionHead('Mengapa Perawatan Luka Bersama Dokter Panggil?', null, e.whyTitle)
        + whyCards(whyItems, e.whyItems, whyIcons),
        sectionHead('Pertanyaan Umum', null, e.faqTitle || 'FAQ')
        + faqBlock(faqs, faqEn),
        ctaBlock(prefix, waAsk,
            'Butuh Perawatan Luka di Rumah?',
            'Perawatan luka dapat dilakukan langsung di rumah oleh dokter atau perawat, dengan rencana perawatan berdasarkan rekomendasi dokter dan monitoring perkembangan luka secara berkala.',
            waBook,
            {
                headlineEn: e.ctaTitle,
                bodyEn: e.ctaBody,
                bookLabel: { id: 'Booking Perawatan Luka', en: e.ctaBook || 'Book Wound Care' },
                askLabel: { id: 'Konsultasikan Kondisi Luka', en: e.ctaAskChat || 'Discuss Wound Condition' }
            })
    ]);
}

/** Form — Vaksinasi di Rumah (hub: categories + booking flow). */
function vaksinasiBody(prefix, en) {
    const {
        composeBody, aboutCard, whenCards, iconInfoCards, iconRowCards, howStepCards,
        compactStepCards, whyCards, pills, pathCards, doctorNursePathCards, doubtBox,
        noteLine, promoBanner, linkCards, flowPills
    } = sections;
    const e = en.d10 || en.vax || en;
    const waAsk = 'Halo, saya ingin bertanya tentang vaksinasi di rumah di Makassar.';
    const waBook = 'Halo, saya ingin booking vaksinasi di rumah di Makassar.';
    const waFamily = 'Halo, saya ingin booking vaksinasi keluarga di rumah di Makassar.';

    const categories = [
        {
            id: 'anak',
            title: 'Vaksinasi Anak Sesuai Usia & Riwayat Imunisasi',
            cardTitle: 'Vaksinasi Anak',
            desc: 'Vaksinasi untuk bayi dan anak sesuai usia, jadwal imunisasi, serta riwayat vaksinasi sebelumnya.',
            cta: 'Lihat Vaksin Anak',
            wa: 'Halo, saya ingin booking vaksinasi anak di rumah di Makassar.',
            icon: 'baby',
            badge: 'Bayi & Anak',
            lead: 'Lengkapi kebutuhan imunisasi anak sesuai usia dan riwayat vaksinasi sebelumnya, mulai dari bayi hingga usia sekolah. Layanan vaksinasi anak langsung di rumah — riwayat imunisasi dan kondisi kesehatan anak dievaluasi untuk membantu menentukan vaksin yang sesuai.',
            examplesTitle: 'Jadwal vaksinasi anak',
            examples: [],
            pointsTitle: 'Yang perlu diketahui',
            points: [
                'Pilih tab usia untuk melihat vaksin yang dapat direkomendasikan sesuai jadwal imunisasi.',
                'Siapkan buku imunisasi atau catatan vaksinasi bila tersedia.',
                'Rekomendasi final mengikuti penilaian dokter, riwayat imunisasi, dan ketersediaan vaksin.'
            ],
            note: VAKSINASI_DATA.anak.note,
            bookLabel: 'Pesan Sekarang',
            schedule: VAKSINASI_DATA.anak
        },
        {
            id: 'dewasa',
            title: 'Vaksinasi Dewasa',
            desc: 'Vaksinasi untuk dewasa sesuai usia, riwayat vaksinasi, kondisi kesehatan, pekerjaan, dan faktor risiko tertentu.',
            cta: 'Lihat Vaksin Dewasa',
            wa: 'Halo, saya ingin booking vaksinasi dewasa di rumah di Makassar.',
            icon: 'user',
            badge: 'Usia Dewasa',
            lead: 'Vaksinasi dewasa dapat dipertimbangkan berdasarkan usia, riwayat vaksin, kondisi kesehatan, pekerjaan, atau faktor risiko tertentu — termasuk booster yang mungkin sudah terlewat.',
            examplesTitle: 'Jadwal vaksinasi dewasa',
            examples: [],
            pointsTitle: 'Yang perlu diketahui',
            points: [
                'Pilih kelompok vaksinasi untuk melihat vaksin yang dapat dipertimbangkan.',
                'Sampaikan riwayat vaksin, alergi, dan obat yang sedang dikonsumsi saat booking.',
                'Dokter memeriksa kondisi kesehatan sebelum vaksin diberikan.'
            ],
            note: VAKSINASI_DATA.dewasa.note,
            bookLabel: 'Pesan Sekarang',
            schedule: VAKSINASI_DATA.dewasa
        },
        {
            id: 'perjalanan',
            title: 'Vaksinasi Perjalanan',
            desc: 'Vaksinasi untuk kebutuhan perjalanan dalam maupun luar negeri, termasuk vaksin yang direkomendasikan atau dipersyaratkan untuk tujuan tertentu.',
            cta: 'Lihat Vaksin Perjalanan',
            wa: 'Halo, saya ingin booking vaksinasi perjalanan di rumah di Makassar.',
            icon: 'map-pin',
            badge: 'Travel',
            lead: 'Vaksinasi perjalanan membantu mempersiapkan perlindungan sesuai destinasi, durasi tinggal, dan aktivitas selama perjalanan — dalam maupun luar negeri.',
            examplesTitle: 'Jadwal vaksinasi perjalanan',
            examples: [],
            pointsTitle: 'Yang perlu diketahui',
            points: [
                'Pilih kebutuhan perjalanan untuk melihat vaksin yang dapat dipertimbangkan.',
                'Idealnya booking jauh sebelum keberangkatan agar jadwal dosis dapat diatur.',
                'Sertifikat vaksin perjalanan dapat dibahas bila dibutuhkan destinasi tertentu.'
            ],
            note: VAKSINASI_DATA.perjalanan.note,
            bookLabel: 'Pesan Sekarang',
            schedule: VAKSINASI_DATA.perjalanan
        },
        {
            id: 'lansia',
            title: 'Vaksinasi Lansia',
            desc: 'Vaksinasi yang dapat dipertimbangkan pada usia lanjut untuk membantu memberikan perlindungan terhadap penyakit tertentu yang risikonya dapat meningkat seiring bertambahnya usia.',
            cta: 'Lihat Vaksin Lansia',
            wa: 'Halo, saya ingin booking vaksinasi lansia di rumah di Makassar.',
            icon: 'heart-handshake',
            badge: 'Usia Lanjut',
            lead: 'Pada usia lanjut, beberapa vaksin dapat dipertimbangkan untuk membantu perlindungan terhadap penyakit yang risikonya cenderung meningkat seiring bertambahnya usia.',
            examplesTitle: 'Jadwal vaksinasi lansia',
            examples: [],
            pointsTitle: 'Yang perlu diketahui',
            points: [
                'Pilih kelompok usia untuk melihat vaksin yang dapat dipertimbangkan.',
                'Pemeriksaan dokter tetap dilakukan sebelum vaksin diberikan di rumah.',
                'Vaksinasi lansia dapat digabung dengan anggota keluarga lain dalam satu kunjungan.'
            ],
            note: VAKSINASI_DATA.lansia.note,
            bookLabel: 'Pesan Sekarang',
            schedule: VAKSINASI_DATA.lansia
        }
    ];
    const catIcons = ['baby', 'user', 'map-pin', 'heart-handshake'];
    const catEn = e.categories || [];
    const catCards = '<div id="pilihan-vaksinasi" class="grid sm:grid-cols-2 gap-4">' + categories.map((c, i) => {
        const ce = catEn[i] || {};
        const cardTitle = c.cardTitle || c.title;
        const cardTitleEn = ce.cardTitle || ce.title || cardTitle;
        return '<button type="button" data-vax-open="' + esc(c.id) + '" class="canva-card rounded-2xl p-5 sm:p-6 text-left w-full hover:shadow-lg hover:border-primary/20 transition-all group">'
            + '<div class="w-11 h-11 mb-3 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">' + icon(catIcons[i], 22, BRAND) + '</div>'
            + biTag('h3', cardTitle, cardTitleEn, 'class="font-bold mb-2 leading-snug"')
            + biTag('p', c.desc, ce.desc, 'class="text-sm text-gray-600 leading-relaxed mb-4"')
            + biTag('span', c.cta + ' →', (ce.cta || c.cta) + ' →', 'class="text-sm font-semibold text-primary inline-flex items-center gap-1 group-hover:gap-2 transition-all"')
            + '</button>';
    }).join('') + '</div>';

    const vaxModalData = {
        ui: {
            examplesTitle: { id: 'Contoh vaksin yang sering dibahas', en: (e.modalUi && e.modalUi.examplesTitle) || 'Vaccines often discussed' },
            scheduleTitle: { id: 'Jadwal Vaksinasi', en: (e.modalUi && e.modalUi.scheduleTitle) || 'Vaccination Schedule' },
            pointsTitle: { id: 'Yang perlu diketahui', en: (e.modalUi && e.modalUi.pointsTitle) || 'What to know' },
            book: { id: 'Pesan Sekarang', en: (e.modalUi && e.modalUi.book) || 'Book Now' },
            ask: { id: 'Chat WhatsApp', en: (e.modalUi && e.modalUi.ask) || 'Chat WhatsApp' },
            close: { id: 'Tutup', en: (e.modalUi && e.modalUi.close) || 'Close' },
            temp: { id: 'Wording sementara — detail jadwal & daftar lengkap menyusul.', en: (e.modalUi && e.modalUi.temp) || 'Temporary copy — full schedule & list coming soon.' },
            brandPending: { id: 'Ketersediaan dikonfirmasi saat booking', en: 'Availability confirmed when booking' },
            benefit: { id: 'Manfaat', en: 'Benefit' },
            schedule: { id: 'Jadwal', en: 'Schedule' },
            brand: { id: 'Merek', en: 'Brand' },
            downloadPdf: { id: 'Unduh Jadwal PDF', en: (e.modalUi && e.modalUi.downloadPdf) || 'Download Schedule PDF' }
        },
        items: categories.map((c, i) => {
            const ce = catEn[i] || {};
            const item = {
                id: c.id,
                icon: catIcons[i],
                title: { id: c.title, en: ce.title || c.title },
                badge: { id: c.badge, en: ce.badge || c.badge },
                lead: { id: c.lead, en: ce.lead || c.lead },
                examplesTitle: { id: c.examplesTitle, en: ce.examplesTitle || c.examplesTitle },
                examples: (c.examples || []).map((ex, j) => ({ id: ex, en: (ce.examples && ce.examples[j]) || ex })),
                pointsTitle: { id: c.pointsTitle, en: ce.pointsTitle || c.pointsTitle },
                points: (c.points || []).map((pt, j) => ({ id: pt, en: (ce.points && ce.points[j]) || pt })),
                note: { id: c.note, en: (c.schedule && c.schedule.noteEn) || ce.note || c.note },
                waBook: waLink(c.wa),
                waAsk: waLink('Halo, saya ingin bertanya tentang vaksinasi ' + c.id + ' di rumah di Makassar.'),
                hideTemp: Boolean(c.schedule),
                bookLabel: c.bookLabel ? { id: c.bookLabel, en: ce.bookLabel || c.bookLabel } : null,
                pdf: '../assets/pdf/jadwal-vaksinasi-' + c.id + '.pdf'
            };
            if (c.schedule && c.schedule.tabs) {
                item.schedule = {
                    title: { id: c.schedule.title, en: c.schedule.titleEn },
                    lead: { id: c.schedule.lead, en: c.schedule.leadEn },
                    tabsLabel: { id: c.schedule.tabsLabel, en: c.schedule.tabsLabelEn },
                    tabs: c.schedule.tabs
                };
            }
            return item;
        })
    };
    const vaxModalHtml = '<div id="vax-modal" class="fixed inset-0 z-[70] hidden items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="vax-modal-title" hidden>'
        + '<div id="vax-modal-overlay" class="modal-overlay absolute inset-0 bg-black/50 backdrop-blur-sm"></div>'
        + '<div id="vax-modal-panel" class="modal-panel relative bg-white w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden flex flex-col">'
        + '<button id="vax-modal-close" type="button" class="absolute top-3 right-3 z-10 w-11 h-11 rounded-full bg-white/95 shadow flex items-center justify-center hover:bg-white transition-colors" aria-label="Tutup">'
        + icon('x', 18, '#2D2D2D')
        + '</button>'
        + '<div id="vax-modal-body" class="overflow-y-auto overscroll-contain min-h-0 flex-1"></div>'
        + '<div id="vax-modal-footer" class="vax-modal-footer"></div>'
        + '</div></div>'
        + '<script type="application/json" id="vax-modal-data">' + JSON.stringify(vaxModalData).replace(/</g, '\\u003c') + '</script>';

    const howSteps = [
        { n: '01', title: 'Booking Vaksinasi', desc: 'Pasien menghubungi Dokter Panggil dan menyampaikan kebutuhan vaksinasi, data pasien, serta jenis vaksin yang dibutuhkan apabila sudah diketahui.' },
        { n: '02', title: 'Konfirmasi Vaksin, Jadwal & Deposit', desc: 'Tim akan mengonfirmasi jenis dan ketersediaan vaksin, jadwal pelayanan, serta rencana kunjungan dokter. Setelah layanan dikonfirmasi, pasien akan diminta melakukan deposit biaya layanan sebagai bagian dari proses booking.' },
        { n: '03', title: 'Persiapan Vaksin', desc: 'Setelah booking dan deposit dikonfirmasi, tim akan mempersiapkan vaksin serta kebutuhan medis yang diperlukan untuk kunjungan.' },
        { n: '04', title: 'Dokter Datang Melakukan Pemeriksaan', desc: 'Dokter datang langsung ke rumah dan melakukan pemeriksaan kondisi kesehatan pasien sebelum vaksinasi untuk menentukan apakah vaksin dapat diberikan pada saat kunjungan.' },
        { n: '05', title: 'Vaksinasi oleh Dokter', desc: 'Apabila berdasarkan hasil pemeriksaan kondisi pasien sesuai untuk menerima vaksin, vaksin akan diberikan langsung oleh dokter.' }
    ];
    const whyItems = [
        { title: 'Vaksinasi Langsung oleh Dokter', desc: 'Pemeriksaan dan pemberian vaksin dilakukan langsung oleh dokter di rumah.' },
        { title: 'Pemeriksaan Sebelum Vaksinasi', desc: 'Kondisi kesehatan pasien diperiksa terlebih dahulu sebelum vaksin diberikan.' },
        { title: 'Vaksin Dipersiapkan Sebelum Kunjungan', desc: 'Ketersediaan vaksin dan kebutuhan pelayanan dikonfirmasi melalui proses booking.' },
        { title: 'Observasi Setelah Vaksin', desc: 'Kondisi pasien dipantau dan dokter memberikan edukasi setelah vaksinasi.' }
    ];
    const whyIcons = ['stethoscope', 'clipboard-check', 'clipboard-list', 'activity'];

    const faqs = [
        { q: 'Apakah boleh vaksin saat sedang batuk atau pilek?', a: 'Bisa atau tidaknya vaksin diberikan bergantung pada kondisi pasien saat itu. Keluhan ringan tidak selalu menyebabkan vaksinasi harus ditunda. Dokter akan menilai kondisi pasien sebelum menentukan apakah vaksin dapat diberikan.' },
        { q: 'Apakah vaksinasi dapat tetap diberikan saat demam?', a: 'Tergantung kondisi pasien. Demam atau keluhan ringan tidak selalu menyebabkan vaksinasi harus ditunda. Namun, pada kondisi sakit akut sedang hingga berat, dokter dapat merekomendasikan vaksinasi ditunda sampai kondisi pasien membaik.' },
        { q: 'Apakah boleh menerima lebih dari satu jenis vaksin dalam satu waktu?', a: 'Pada kondisi tertentu, beberapa jenis vaksin dapat diberikan pada kunjungan yang sama. Dokter akan mempertimbangkan jenis vaksin, usia, riwayat vaksinasi, serta kondisi kesehatan pasien sebelum pemberian.' },
        { q: 'Apa yang perlu dipersiapkan sebelum dokter datang?', a: 'Apabila tersedia, siapkan buku imunisasi atau catatan vaksinasi sebelumnya, daftar obat yang sedang dikonsumsi, serta informasi mengenai riwayat alergi atau reaksi terhadap vaksin sebelumnya.' },
        { q: 'Apakah setelah vaksin boleh mandi dan beraktivitas seperti biasa?', a: 'Pada umumnya pasien tetap dapat mandi dan melakukan aktivitas sehari-hari setelah vaksinasi apabila kondisi tubuh memungkinkan. Dokter akan memberikan arahan tambahan apabila terdapat hal khusus yang perlu diperhatikan setelah pemberian vaksin.' },
        { q: 'Apakah vaksinasi dapat dilakukan untuk beberapa anggota keluarga sekaligus?', a: 'Ya. Beberapa anggota keluarga dapat melakukan vaksinasi dalam satu kunjungan dengan melakukan booking sebelumnya. Informasikan jumlah pasien dan kebutuhan vaksin masing-masing agar kebutuhan pelayanan dapat dipersiapkan.' }
    ];
    const faqEn = e.faqs || [];

    const helpTips = [
        { icon: 'message-circle', title: 'Tidak Masalah Jika Belum Tahu', desc: 'Tidak masalah apabila pasien atau keluarga belum mengetahui jenis vaksin atau dosis berikutnya yang dibutuhkan.' },
        { icon: 'clipboard-list', title: 'Sampaikan Saat Booking', desc: 'Saat melakukan booking, informasikan usia, riwayat vaksinasi, serta tujuan atau kebutuhan vaksinasi kepada Tim Dokter Panggil.' },
        { icon: 'book-open', title: 'Siapkan Catatan Imunisasi', desc: 'Apabila tersedia, siapkan buku imunisasi, sertifikat, atau catatan vaksinasi sebelumnya untuk membantu mengevaluasi riwayat vaksinasi pasien.' }
    ];
    const helpTipIcons = ['message-circle', 'clipboard-list', 'book-open'];

    const checkPoints = [
        { icon: 'stethoscope', title: 'Pemeriksaan Tetap Dilakukan', desc: 'Meskipun vaksin telah dipesan dan dipersiapkan, dokter tetap akan melakukan pemeriksaan kesehatan sebelum vaksin diberikan.' },
        { icon: 'clipboard-check', title: 'Menilai Kondisi Saat Kunjungan', desc: 'Pemeriksaan dilakukan untuk memastikan kondisi pasien saat kunjungan dan menentukan apakah vaksinasi dapat diberikan pada saat tersebut.' },
        { icon: 'calendar-clock', title: 'Bisa Ditunda Jika Perlu', desc: 'Apabila dokter menilai vaksinasi perlu ditunda karena kondisi tertentu, dokter akan memberikan rekomendasi sesuai kondisi pasien.' }
    ];
    const checkIcons = ['stethoscope', 'clipboard-check', 'clock'];

    const storagePoints = [
        { icon: 'clipboard-check', title: 'Dipersiapkan Setelah Booking', desc: 'Setelah booking dikonfirmasi, vaksin akan dipersiapkan sesuai jenis dan jumlah yang dibutuhkan.' },
        { icon: 'thermometer', title: 'Penyimpanan & Rantai Dingin', desc: 'Vaksin disimpan dan dibawa dengan memperhatikan persyaratan suhu dan penyimpanan sesuai ketentuan vaksin hingga waktu pemberian.' }
    ];
    const storageIcons = ['package', 'thermometer'];

    return composeBody([
        sectionHead('Pilihan Vaksinasi', 'Vaksin untuk berbagai kebutuhan.', e.catTitle, e.catLead)
        + '<div class="mb-6 max-w-2xl">' + noteLine('Layanan vaksinasi wajib melalui booking terlebih dahulu untuk memastikan ketersediaan vaksin dan persiapan pelayanan.', e.bookingNote) + '</div>'
        + catCards,
        sectionHead('Belum Tahu Vaksin yang Dibutuhkan?', 'Kami bantu menentukan kebutuhan vaksinasi.', e.helpTitle, e.helpLead)
        + iconInfoCards(helpTips, e.helpTips, helpTipIcons),
        sectionHead('Bagaimana Vaksinasi di Rumah Dilakukan?', null, e.howTitle)
        + howStepCards(howSteps, e.howSteps),
        sectionHead('Sudah Booking? Kondisi Tetap Diperiksa Terlebih Dahulu', 'Booking menyiapkan vaksin — dokter tetap menilai kondisi pasien sebelum vaksin diberikan.', e.checkTitle, e.checkLead)
        + iconInfoCards(checkPoints, e.checkPoints, checkIcons)
        + '<div class="mt-5 max-w-3xl">' + noteLine('Booking memastikan persiapan layanan dan ketersediaan vaksin, bukan berarti vaksin otomatis diberikan tanpa pemeriksaan dokter.', e.checkP4) + '</div>',
        sectionHead('Persiapan & Penyimpanan Vaksin', null, e.storageTitle)
        + '<div class="mb-5 max-w-2xl">' + noteLine('Layanan vaksinasi wajib melalui booking agar Tim Dokter Panggil dapat memastikan ketersediaan vaksin dan mempersiapkan kebutuhan pelayanan sebelum dokter datang.', e.storageP1) + '</div>'
        + iconInfoCards(storagePoints, e.storagePoints, storageIcons),
        sectionHead('Vaksinasi Beberapa Anggota Keluarga dalam Satu Kunjungan', null, e.familyTitle)
        + '<div class="canva-card rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row gap-6 sm:items-center">'
        + '<div class="w-14 h-14 shrink-0 bg-primary/10 rounded-2xl flex items-center justify-center">' + icon('users', 28, BRAND) + '</div>'
        + '<div class="flex-1">'
        + biTag('p', 'Layanan vaksinasi dapat dijadwalkan untuk beberapa anggota keluarga dalam satu lokasi.', e.familyP1, 'class="text-gray-600 leading-relaxed mb-2"')
        + biTag('p', 'Saat booking, informasikan jumlah pasien, usia, serta kebutuhan vaksin masing-masing agar tim dapat mempersiapkan vaksin dan kebutuhan pelayanan sebelum kunjungan dokter.', e.familyP2, 'class="text-sm text-gray-500 leading-relaxed mb-4 sm:mb-0"')
        + '</div>'
        + '<a href="' + esc(waLink(waFamily)) + '" target="_blank" rel="noopener noreferrer"' + biAttrs('Pesan Sekarang', 'Book Now') + ' class="inline-flex shrink-0 px-6 py-3 rounded-full bg-primary text-white text-sm font-semibold hover:scale-105 transition-transform text-center">Pesan Sekarang</a>'
        + '</div>',
        sectionHead('Mengapa Vaksinasi Bersama Dokter Panggil?', null, e.whyTitle)
        + whyCards(whyItems, e.whyItems, whyIcons),
        sectionHead('Pertanyaan Umum', null, e.faqTitle || 'FAQ')
        + faqBlock(faqs, faqEn),
        ctaBlock(prefix, waAsk,
            'Vaksinasi Langsung di Rumah Anda',
            'Lakukan booking vaksinasi untuk anak maupun dewasa. Dokter akan datang ke rumah, melakukan pemeriksaan kesehatan terlebih dahulu, dan memberikan vaksin apabila kondisi pasien sesuai untuk vaksinasi.',
            waBook,
            {
                headlineEn: e.ctaTitle,
                bodyEn: e.ctaBody,
                bookLabel: { id: 'Booking Vaksinasi', en: e.ctaBook || 'Book Vaccination' },
                askLabel: { id: 'Tanya via WhatsApp', en: e.ctaAskChat || 'Ask via WhatsApp' }
            })
    ]) + vaxModalHtml;
}

/** Compact link card used for related services and cross-links between hubs. */
function linkCard(href, iconName, title, text, titleEn, textEn) {
    return '<a href="' + href + '" class="canva-card rounded-2xl p-5 block hover:shadow-lg hover:border-primary/20 transition-all group">'
        + '<div class="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">' + icon(iconName, 22, BRAND) + '</div>'
        + biTag('h3', title, titleEn, 'class="font-bold mb-1 leading-snug"')
        + biTag('p', text, textEn, 'class="text-sm text-gray-500 leading-relaxed"')
        + '</a>';
}

function serviceLinkCards(slugs, prefix) {
    return '<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">' + slugs.map(slug => {
        const svc = SEO_SERVICES.filter(s => s.slug === slug)[0];
        if (!svc) return '';
        return linkCard(prefix + 'layanan/' + slug + '.html', svc.icon, L(svc.name), L(svc.tagline), pick(svc.name, 'en'), pick(svc.tagline, 'en'));
    }).join('') + '</div>';
}

/* ------------------------------------------------------------------- layout */

const NAV_LINKS = [
    { label: 'Beranda', i18n: 'nav.home', href: 'index.html' },
    { label: 'Tentang Kami', i18n: 'nav.about', href: 'index.html#about' },
    { label: 'Layanan', i18n: 'nav.services', href: 'layanan/index.html' },
    { label: 'Temukan Dokter', i18n: 'nav.doctors', href: 'dokter/index.html' },
    { label: 'Lokasi', i18n: 'nav.locations', href: 'index.html#locations' },
    { label: 'Kontak', i18n: 'nav.contact', href: 'index.html#contact' }
];

function langSwitch(variant) {
    return '<div class="lang-switch lang-switch--' + variant + '" role="group" aria-label="Language">'
        + '<button type="button" data-lang-btn="id" class="is-active" aria-pressed="true">ID</button>'
        + '<button type="button" data-lang-btn="en" aria-pressed="false">EN</button>'
        + '</div>';
}

function navPhoneIcon() {
    return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 1 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 1 2.81.7A2 2 0 0 1 22 16.92z"/></svg>';
}

function navWaIcon() {
    return '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a7.96 7.96 0 01-4.11-1.14l-.29-.174-3.01.79.8-2.93-.19-.3A7.96 7.96 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"/></svg>';
}

function header(prefix, links) {
    const desktop = links.map(l =>
        '<a href="' + prefix + l.href + '" data-i18n="' + l.i18n + '" class="text-sm font-medium text-white/90 hover:text-white transition-colors">' + esc(l.label) + '</a>'
    ).join(' ');
    const mobile = links.map(l =>
        '<a href="' + prefix + l.href + '" data-i18n="' + l.i18n + '" class="mobile-nav-link">' + esc(l.label) + '</a>'
    ).join('');
    const waAskMsg = 'Halo, saya ingin bertanya tentang layanan DokterPanggil di Makassar.';
    const waAskEn = 'Hi, I would like to ask about DokterPanggil services in Makassar.';
    const waAsk = esc(waLink(waAskMsg));
    const waBook = esc(waLink('Halo, saya ingin memesan layanan kesehatan ke rumah di Makassar.'));

    return '<header id="main-header" class="sticky top-0 z-50 w-full bg-primary shadow-md">'
        + '<div class="nav-bar max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-3">'
        + '<a href="' + prefix + 'index.html" class="flex items-center relative z-[60] min-w-0" aria-label="DokterPanggil">'
        + '<img src="' + prefix + 'assets/images/logo-white.png" alt="DokterPanggil" class="h-9 w-auto" width="140" height="36" decoding="async"></a>'
        + '<nav class="hidden lg:flex items-center gap-6" aria-label="Menu utama">' + desktop + '</nav>'
        + '<div class="nav-toolbar">'
        + '<div class="hidden lg:flex items-center gap-3">'
        + langSwitch('on-dark')
        + '<a href="' + waBook + '" target="_blank" rel="noopener noreferrer" data-i18n="btn.book" class="px-5 py-2.5 rounded-full text-sm font-semibold bg-white text-primary shadow-sm transition-transform hover:scale-105">Pesan Sekarang</a>'
        + '</div>'
        + '<div class="nav-quick-actions hidden lg:flex">'
        + '<a href="tel:+628114677700" class="nav-icon-btn" aria-label="Telepon">' + navPhoneIcon() + '</a>'
        + '<a href="' + waAsk + '" target="_blank" rel="noopener noreferrer" data-wa-id="' + esc(waAskMsg) + '" data-wa-en="' + esc(waAskEn) + '" class="nav-icon-btn nav-icon-btn--wa" aria-label="WhatsApp">' + navWaIcon() + '</a>'
        + '</div>'
        + '<button id="mobile-menu-btn" class="nav-burger lg:hidden" type="button" aria-label="Buka menu" aria-expanded="false" aria-controls="mobile-menu">'
        + '<span class="nav-burger-box" aria-hidden="true"><span class="nav-burger-inner"></span></span>'
        + '</button>'
        + '</div></div></header>'
        + '<div id="mobile-menu" class="mobile-panel lg:hidden" hidden>'
        + '<div class="mobile-panel-inner">'
        + '<div class="mobile-panel-lang">'
        + '<span data-i18n="lang.label" class="mobile-panel-lang-label">Bahasa</span>'
        + langSwitch('on-light')
        + '</div>'
        + '<nav class="mobile-panel-nav" aria-label="Menu mobile">' + mobile + '</nav>'
        + '<div class="mobile-panel-actions">'
        + '<div class="mobile-quick-actions">'
        + '<a href="tel:+628114677700" class="nav-icon-btn nav-icon-btn--on-light" aria-label="Telepon">' + navPhoneIcon() + '</a>'
        + '<a href="' + waAsk + '" target="_blank" rel="noopener noreferrer" data-wa-id="' + esc(waAskMsg) + '" data-wa-en="' + esc(waAskEn) + '" class="nav-icon-btn nav-icon-btn--wa" aria-label="WhatsApp">' + navWaIcon() + '</a>'
        + '</div>'
        + '<a href="' + waBook + '" target="_blank" rel="noopener noreferrer" data-i18n="btn.book" class="mobile-cta mobile-cta-primary">Pesan Sekarang</a>'
        + '</div></div></div>'
        + '<div id="mobile-menu-backdrop" class="mobile-backdrop lg:hidden" hidden></div>';
}

function footer(prefix) {
    // Form A2 curated layanan links (not full catalog)
    const serviceLinks = [
        ['layanan/kunjungan-dokter.html', 'Dokter Umum 24 jam'],
        ['layanan/kunjungan-dokter-spesialis.html', 'Dokter Spesialis'],
        ['layanan/perawatan-rumah.html', 'Perawat Homecare'],
        ['layanan/tindakan-medis.html', 'Infus & Tindakan Medis'],
        ['layanan/index.html', 'Lihat Semua Layanan', 'footer.allServices']
    ].map(([href, label, i18n]) =>
        '<li><a href="' + prefix + href + '"' + (i18n ? ' data-i18n="' + i18n + '"' : '') + ' class="opacity-80 hover:opacity-100">' + esc(label) + '</a></li>'
    ).join('');

    const companyLinks = [
        ['index.html#about', 'Tentang Kami', 'nav.about'],
        ['index.html#how', 'Cara Panggil', 'footer.how'],
        ['dokter/index.html', 'Temukan Dokter', 'nav.doctors'],
        ['index.html#locations', 'Area Layanan', 'footer.area'],
        ['index.html#faq', 'FAQ', 'footer.faq']
    ].map(([href, label, i18n]) =>
        '<li><a href="' + prefix + href + '" data-i18n="' + i18n + '" class="opacity-80 hover:opacity-100">' + esc(label) + '</a></li>'
    ).join('');

    const mapsUrl = 'https://www.google.com/maps/search/?api=1&query=Jl.+Letnan+Jenderal+Hertasning+No.+110,+Makassar';
    const tiktokSvg = '<svg width="16" height="16" viewBox="0 0 24 24" fill="white" aria-hidden="true"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.8a6.34 6.34 0 0010.86 4.48V13a8.27 8.27 0 005.58 2.17V11.7a4.85 4.85 0 01-3.59-1.44v-3.57z"/></svg>';

    return '<footer class="w-full py-12 bg-charcoal text-white">'
        + '<div class="max-w-7xl mx-auto px-4">'
        + '<div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">'
        + '<div><div class="mb-4"><img src="' + prefix + 'assets/images/logo-white.png" alt="Dokter Panggil" class="h-11 w-auto"></div>'
        + '<p data-i18n="footer.desc" class="text-sm leading-relaxed opacity-80 mb-4">Layanan kesehatan homecare yang menghadirkan dokter dan tenaga kesehatan langsung ke rumah untuk Anda dan keluarga</p>'
        + '<div class="flex items-center gap-3">'
        + '<a href="' + SITE.instagram + '" target="_blank" rel="noopener noreferrer" class="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors" aria-label="Instagram Dokter Panggil"><i data-lucide="instagram" style="width:18px;height:18px;color:white"></i></a>'
        + '<a href="' + SITE.tiktok + '" target="_blank" rel="noopener noreferrer" class="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors" aria-label="TikTok Dokter Panggil">' + tiktokSvg + '</a>'
        + '</div></div>'
        + '<div><h4 data-i18n="footer.services" class="font-bold mb-4">Layanan</h4><ul class="space-y-2 text-sm">' + serviceLinks + '</ul></div>'
        + '<div><h4 data-i18n="footer.company" class="font-bold mb-4">Informasi</h4><ul class="space-y-2 text-sm">' + companyLinks + '</ul></div>'
        + '<div><h4 data-i18n="footer.contact" class="font-bold mb-4">Hubungi Kami</h4><ul class="space-y-3 text-sm">'
        + '<li class="flex items-start gap-2 opacity-80"><i data-lucide="phone" style="width:14px;height:14px;margin-top:3px"></i> <a href="https://wa.me/' + SITE.waNumber + '" class="hover:opacity-100" data-i18n="footer.phone">WhatsApp &amp; Hotline 24 jam ' + esc(SITE.phone) + '</a></li>'
        + '<li class="flex items-start gap-2 opacity-80"><i data-lucide="map-pin" style="width:14px;height:14px;margin-top:3px"></i> <span><span data-i18n="footer.address">Kantor : Jl. Letnan Jenderal Hertasning No. 110 Makassar, Sulawesi Selatan.</span> <a href="' + mapsUrl + '" target="_blank" rel="noopener noreferrer" data-i18n="footer.maps" class="text-primary-light hover:underline">Lihat di Google Maps</a></span></li>'
        + '<li class="flex items-start gap-2 opacity-80"><i data-lucide="clock" style="width:14px;height:14px;margin-top:3px"></i> <span data-i18n="footer.hours">Jam Layanan : 24 jam</span></li>'
        + '<li><a href="https://wa.me/' + SITE.waNumber + '?text=Halo%2C%20saya%20ingin%20bertanya%20tentang%20layanan%20Dokter%20Panggil." target="_blank" rel="noopener noreferrer" data-i18n="footer.chatWa" class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#25D366] text-white text-sm font-semibold hover:scale-105 transition-transform">Chat WhatsApp</a></li>'
        + '</ul></div></div>'
        + '<div class="border-t border-white/20 pt-6 text-center text-sm opacity-70">'
        + '<p data-i18n="footer.copyright">2026 Dokter Panggil. All Rights Reserved</p>'
        + '</div></div></footer>';
}

function floatWa() {
    const idMsg = 'Halo, saya ingin bertanya tentang layanan DokterPanggil di Makassar.';
    const enMsg = 'Hi, I would like to ask about DokterPanggil services in Makassar.';
    const svg = '<svg width="28" height="28" viewBox="0 0 24 24" fill="white" aria-hidden="true">'
        + '<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>'
        + '<path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a7.96 7.96 0 01-4.11-1.14l-.29-.174-3.01.79.8-2.93-.19-.3A7.96 7.96 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"/>'
        + '</svg>';
    return '<a href="' + esc(waLink(idMsg)) + '" target="_blank" rel="noopener noreferrer" data-wa-id="' + esc(idMsg) + '" data-wa-en="' + esc(enMsg) + '" class="wa-float fixed z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg wa-pulse hover:scale-110 transition-transform" aria-label="Chat WhatsApp">'
        + svg + '</a>';
}

function breadcrumbs(crumbs, prefix) {
    const trail = crumbs.map((c, i) => {
        const last = i === crumbs.length - 1;
        const nameEn = c.nameEn || c.name;
        if (last) return biSpan(c.name, nameEn, 'text-white/70');
        return '<a href="' + prefix + c.href + '" class="text-white/90 hover:text-white"' + biAttrs(c.name, nameEn) + '>' + esc(c.name) + '</a>'
            + '<span class="text-white/40">/</span>';
    }).join('');
    return '<nav class="seo-crumbs mb-5" aria-label="Breadcrumb">' + trail + '</nav>';
}

function breadcrumbSchema(crumbs) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: crumbs.map((c, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: c.name,
            item: absUrl(c.canonical)
        }))
    };
}

function organizationSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: SITE.name,
        legalName: SITE.legalName,
        url: SITE.url + '/',
        logo: absUrl('/assets/images/logo-white.png'),
        email: SITE.email,
        telephone: SITE.phoneSchema,
        areaServed: SITE.cities.map(c => ({ '@type': 'City', name: c })),
        sameAs: [SITE.instagram, SITE.tiktok],
        contactPoint: [{
            '@type': 'ContactPoint',
            telephone: SITE.phoneSchema,
            email: SITE.email,
            contactType: 'customer service',
            availableLanguage: ['id', 'en'],
            hoursAvailable: openingHours()
        }]
    };
}

function faqSchema(items) {
    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: items.map(f => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a }
        }))
    };
}

/**
 * Hero band. Uses the brand red so the page reads as part of the same site,
 * without reusing the homepage carousel markup or its full-viewport #home id.
 */
function hero(page, prefix) {
    const image = page.heroImage
        ? '<div class="lg:w-[42%] shrink-0"><div class="rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] bg-white/10">'
        + '<img src="' + photo(page.heroImage, 900) + '" alt="' + esc(page.heroAlt || page.h1) + '" data-retry="1" loading="eager" decoding="async" class="w-full h-full object-cover object-center">'
        + '</div></div>'
        : '';

    const chipItems = Array.isArray(page.heroChips) && page.heroChips.length
        ? page.heroChips
        : [
            { id: T('trust.1'), en: Ten('trust.1') },
            { id: T('trust.2'), en: Ten('trust.2') },
            { id: T('trust.3'), en: Ten('trust.3') }
        ];
    const chips = chipItems.map(c =>
        '<span class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/15 text-white text-xs font-semibold">'
        + icon('check', 13, 'white') + biSpan(c.id, c.en, '') + '</span>'
    ).join('');
    const lead = page.lead
        ? biTag('p', page.lead, page.leadEn, 'class="text-base sm:text-lg text-white/90 leading-relaxed mb-6 max-w-2xl"')
        : '';
    const h1Class = page.lead
        ? 'class="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4"'
        : 'class="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6"';
    const { bookLabel: bookCta, askLabel: askCta } = ctaPair({
        bookHref: page.ctaBookHref,
        bookLabel: page.ctaBook,
        askLabel: page.ctaAsk
    });

    return '<section class="w-full bg-primary text-white">'
        + '<div class="max-w-7xl mx-auto px-4 py-12 sm:py-16">'
        + breadcrumbs(page.crumbs, prefix)
        + '<div class="flex flex-col lg:flex-row gap-10 lg:gap-14 lg:items-center">'
        + '<div class="flex-1">'
        + biTag('h1', page.h1, page.h1En, h1Class)
        + lead
        + '<div class="flex flex-wrap gap-2 mb-8">' + chips + '</div>'
        + '<div class="flex flex-col sm:flex-row gap-3">'
        + '<a href="' + esc(page.ctaBookHref || waLink(page.waBookMessage || page.waMessage)) + '"'
        + (page.ctaBookHref ? '' : ' target="_blank" rel="noopener noreferrer"')
        + biAttrs(bookCta.id, bookCta.en) + ' class="px-7 py-3.5 rounded-full bg-white text-primary font-semibold text-center transition-transform hover:scale-105">' + esc(bookCta.id) + '</a>'
        + '<a href="' + esc(waLink(page.waMessage)) + '" target="_blank" rel="noopener noreferrer"' + biAttrs(askCta.id, askCta.en) + ' class="px-7 py-3.5 rounded-full border-2 border-white/70 text-white font-semibold text-center transition-transform hover:scale-105 hover:bg-white/10">' + esc(askCta.id) + '</a>'
        + '</div></div>'
        + image
        + '</div></div></section>';
}

function renderShell(page) {
    const prefix = rootPrefix(page.file);
    const robots = page.published === false ? 'noindex, follow' : 'index, follow';
    const ogImage = page.heroImage ? photo(page.heroImage, 1200) : absUrl('/assets/images/logo-white.png');
    const schemas = [breadcrumbSchema(page.crumbs)].concat(page.schemas || []);

    return '<!doctype html>\n<html lang="id">\n<head>\n'
        + '<meta charset="UTF-8">\n'
        + '<meta name="viewport" content="width=device-width, initial-scale=1.0">\n'
        + '<style>html:not(.lang-ready) body{visibility:hidden}</style>\n'
        + '<noscript><style>html body{visibility:visible!important}</style></noscript>\n'
        + '<title>' + esc(page.title) + '</title>\n'
        + '<meta name="description" content="' + esc(page.desc) + '">\n'
        + '<meta name="robots" content="' + robots + '">\n'
        + '<link rel="canonical" href="' + esc(absUrl(page.canonical)) + '">\n'
        + '<meta property="og:type" content="website">\n'
        + '<meta property="og:site_name" content="' + esc(SITE.name) + '">\n'
        + '<meta property="og:locale" content="id_ID">\n'
        + '<meta property="og:title" content="' + esc(page.title) + '">\n'
        + '<meta property="og:description" content="' + esc(page.desc) + '">\n'
        + '<meta property="og:url" content="' + esc(absUrl(page.canonical)) + '">\n'
        + '<meta property="og:image" content="' + esc(ogImage) + '">\n'
        + '<meta name="twitter:card" content="summary_large_image">\n'
        + '<meta name="twitter:title" content="' + esc(page.title) + '">\n'
        + '<meta name="twitter:description" content="' + esc(page.desc) + '">\n'
        + '<meta name="twitter:image" content="' + esc(ogImage) + '">\n'
        + '<meta name="theme-color" content="#D83030">\n'
        + '<link rel="preconnect" href="https://fonts.googleapis.com">\n'
        + '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n'
        + '<link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin>\n'
        + '<link rel="preconnect" href="https://images.unsplash.com" crossorigin>\n'
        + '<link rel="dns-prefetch" href="https://plus.unsplash.com">\n'
        + '<script src="https://cdn.tailwindcss.com/3.4.17"></script>\n'
        + '<script src="https://cdn.jsdelivr.net/npm/lucide@0.263.0/dist/umd/lucide.min.js"></script>\n'
        + '<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&amp;display=swap" rel="stylesheet">\n'
        + '<script>\n'
        + '    tailwind.config = { theme: { extend: { colors: {\n'
        + "        primary: '#D83030', 'primary-light': '#E85555', 'primary-dark': '#772017',\n"
        + "        accent: '#EA843F', cream: '#FFF9F5', 'warm-white': '#FFFDFB', 'warm-gray': '#F7F3F0',\n"
        + "        charcoal: '#2D2D2D', 'soft-green': '#4CAF7D'\n"
        + '    } } } }\n'
        + '</script>\n'
        + '<link rel="stylesheet" href="' + prefix + 'styles.css">\n'
        + '<link rel="stylesheet" href="' + prefix + 'seo-pages.css">\n'
        + schemas.map(s => jsonLd(s)).join('\n') + '\n'
        + '</head>\n<body class="w-full min-h-screen bg-warm-white">\n'
        + header(prefix, NAV_LINKS) + '\n'
        + '<main>\n' + hero(page, prefix) + '\n' + page.body + '\n</main>\n'
        + footer(prefix) + '\n'
        + floatWa() + '\n'
        + (page.afterBody || '')
        + '<script src="' + prefix + 'seo-pages.js" defer></script>\n'
        + (page.scripts || []).map(src => '<script src="' + src + '" defer></script>\n').join('')
        + '</body>\n</html>\n';
}

/* --------------------------------------------------------------- page specs */

/**
 * Section wrappers. Content is deliberately visible without JavaScript --
 * these pages exist to be crawled and read, so no reveal-on-scroll here.
 */
function wrap(inner, tone) {
    const bg = tone === 'alt' ? ' bg-cream' : '';
    return '<section class="w-full py-12 sm:py-16' + bg + '"><div class="max-w-5xl mx-auto px-4">' + inner + '</div></section>';
}

function wrapWide(inner, tone) {
    const bg = tone === 'alt' ? ' bg-cream' : '';
    return '<section class="w-full py-12 sm:py-16' + bg + '"><div class="max-w-7xl mx-auto px-4">' + inner + '</div></section>';
}

const sections = require('./seo-sections.js')({
    wrapWide, sectionHead, biTag, biAttrs, biSpan, icon, esc, waLink, BRAND
});

const {
    laboratoriumBody,
    farmasiBody,
    medicalCheckUpBody,
    konsultasiOnlineBody
} = require('./seo-bodies-support.js')({
    wrapWide, sectionHead, biTag, biAttrs, icon, esc, waLink, faqBlock, ctaBlock, BRAND,
    ...sections
});

const {
    ngtBody,
    kateterBody,
    suctionBody
} = require('./seo-bodies-procedures.js')({
    wrapWide, sectionHead, biTag, biAttrs, icon, esc, waLink, faqBlock, ctaBlock, BRAND,
    ...sections
});

function servicePage(service) {
    const seo = SERVICE_SEO[service.slug];
    if (!seo) return null;
    const en = SEO_EN.services[service.slug] || {};

    const prefix = '../';
    let faqId = [];
    let faqEn = [];

    let body;
    if (service.slug === 'kunjungan-dokter') {
        body = dokterUmumBody(prefix, en);
        faqId = [
            { q: 'Berapa lama dokter akan sampai ke rumah?', a: 'Waktu kedatangan bergantung pada lokasi pasien, kondisi lalu lintas, dan lokasi dokter saat pemesanan. Setelah pesanan dikonfirmasi, tim medis akan menginformasikan perkiraan waktu kunjungan.' },
            { q: 'Berapa biaya kunjungan dokter umum ke rumah?', a: 'Biaya kunjungan dokter umum sebesar Rp220.000 untuk satu kali kunjungan, ditambah biaya transportasi dokter sebesar Rp10.000/km dari lokasi Dokter Panggil. Kunjungan di luar jam kerja dikenakan tambahan biaya sebesar 50% dari biaya kunjungan dokter. Biaya tersebut belum termasuk kebutuhan tambahan apabila diperlukan, seperti obat, bahan medis habis pakai, tindakan medis, pemeriksaan laboratorium, jasa tindakan dan transportasi perawat, serta biaya administrasi.' },
            { q: 'Bisakah satu kunjungan dokter untuk beberapa anggota keluarga?', a: 'Ya. Satu kunjungan dapat melayani lebih dari satu anggota keluarga. Sampaikan jumlah pasien saat melakukan pemesanan agar tim kami dapat mempersiapkan waktu pemeriksaan dan kebutuhan medis yang diperlukan. Biaya kunjungan dokter akan dikenakan untuk setiap pasien, sedangkan biaya transportasi dokter hanya dikenakan satu kali dalam kunjungan yang sama.' },
            { q: 'Apakah dokter datang sendiri?', a: 'Tidak. Setiap kunjungan dokter akan didampingi oleh perawat untuk membantu proses pemeriksaan dan pelayanan selama kunjungan. Pendampingan perawat tidak dikenakan biaya tambahan selama tidak terdapat tindakan keperawatan atau tindakan medis yang dilakukan.' },
            { q: 'Apakah obat disediakan saat kunjungan?', a: 'Ya. Sebelum kunjungan, dokter akan melakukan triase awal untuk memahami keluhan dan kondisi pasien. Berdasarkan hasil triase tersebut, dokter akan berkoordinasi dengan tim perawat untuk mempersiapkan obat serta kebutuhan medis yang mungkin diperlukan dan membawanya saat kunjungan. Obat dan kebutuhan medis akan diberikan sesuai hasil pemeriksaan dokter di lokasi dan dikenakan biaya sesuai penggunaan.' },
            { q: 'Apakah dokter dapat memberikan resep, obat, rekomendasi laboratorium setelah pemeriksaan?', a: 'Ya. Apabila diperlukan, dokter dapat memberikan resep, obat, dan rekomendasi laboratorium sesuai hasil pemeriksaan. Kebutuhan selanjutnya akan dikoordinasikan oleh Tim Dokter Panggil.' },
            { q: 'Apakah dokter dapat melakukan infus atau tindakan medis lainnya di rumah?', a: 'Ya. Tindakan medis dapat dilakukan langsung di rumah oleh Tim Medis sesuai kebutuhan pasien dan berdasarkan hasil pemeriksaan dokter.' },
            { q: 'Apakah dokter dapat memberikan surat keterangan sakit?', a: 'Dokter dapat memberikan surat keterangan sakit apabila berdasarkan hasil pemeriksaan terdapat indikasi yang sesuai dengan ketentuan yang berlaku.' }
        ];
        faqEn = (en.d1 && en.d1.faqs) || [];
    } else if (service.slug === 'kunjungan-dokter-spesialis') {
        body = dokterSpesialisBody(prefix, en);
        faqId = [
            { q: 'Apakah saya bisa memilih dokter spesialis yang diinginkan?', a: 'Ya. Anda dapat memilih dokter spesialis berdasarkan bidang keahlian maupun dokter yang diinginkan. Tim Dokter Panggil akan membantu menghubungi dokter dan mengoordinasikan ketersediaan jadwal kunjungan.' },
            { q: 'Berapa lama waktu yang dibutuhkan untuk mendapatkan jadwal dokter spesialis?', a: 'Waktu kunjungan menyesuaikan ketersediaan dokter spesialis. Setelah menerima permintaan, tim kami akan mengoordinasikan jadwal bersama dokter dan segera menginformasikan pilihan waktu kunjungan kepada pasien atau keluarga.' },
            { q: 'Berapa biaya kunjungan dokter spesialis ke rumah?', a: 'Biaya kunjungan dokter spesialis sebesar Rp450.000 untuk satu kali kunjungan, ditambah biaya transportasi dokter sebesar Rp10.000/km dari lokasi Dokter Panggil. Kunjungan di luar jam kerja dikenakan tambahan biaya sebesar 50% dari biaya kunjungan dokter. Biaya tersebut belum termasuk kebutuhan tambahan apabila diperlukan, seperti obat, bahan medis habis pakai, tindakan medis, pemeriksaan laboratorium, jasa tindakan dan transportasi perawat, serta biaya administrasi.' },
            { q: 'Apakah dokter spesialis dapat melakukan kontrol rutin di rumah?', a: 'Ya. Untuk kondisi yang memungkinkan, konsultasi dan kontrol lanjutan dapat dilakukan di rumah sesuai kebutuhan pasien. Jadwal kunjungan berikutnya dikoordinasikan kembali oleh tim Dokter Panggil.' },
            { q: 'Bagaimana jika setelah pemeriksaan dokter spesialis pasien membutuhkan obat, laboratorium, atau perawatan lanjutan?', a: 'Tim Dokter Panggil dapat membantu mengoordinasikan kebutuhan lanjutan sesuai rekomendasi dokter, seperti obat, pemeriksaan laboratorium, tindakan medis, fisioterapi, maupun pendampingan perawat di rumah.' }
        ];
        faqEn = (en.d2 && en.d2.faqs) || [];
    } else if (service.slug === 'perawatan-rumah') {
        body = perawatHomecareBody(prefix, en);
        faqId = [
            { q: 'Apakah bisa langsung memesan perawat homecare?', a: 'Pendampingan perawat dilakukan berdasarkan rekomendasi dokter. Dokter akan menilai kondisi pasien terlebih dahulu untuk menentukan kebutuhan dan bentuk pendampingan yang sesuai.' },
            { q: 'Apakah perawat selalu berada di bawah supervisi dokter?', a: 'Ya. Selama masa pendampingan, perawat menjalankan rencana perawatan dan berkoordinasi dengan dokter yang melakukan supervisi terkait perkembangan kondisi pasien.' },
            { q: 'Apakah perawat dapat mendampingi pasien selama 24 jam?', a: 'Ya. Pendampingan 24 jam diberikan apabila sesuai dengan kebutuhan pasien dan rekomendasi dokter. Pengaturan perawat dan jadwal akan dikoordinasikan oleh Tim Dokter Panggil.' },
            { q: 'Apakah bisa memilih perawat laki-laki atau perempuan?', a: 'Kebutuhan atau preferensi dapat disampaikan kepada tim kami dan akan disesuaikan dengan ketersediaan perawat.' },
            { q: 'Apakah perawat dapat melakukan tindakan medis di rumah?', a: 'Perawat dapat melakukan tindakan keperawatan sesuai kompetensi, kebutuhan pasien, serta instruksi atau rencana medis yang telah ditetapkan.' },
            { q: 'Bagaimana jika kondisi pasien berubah selama pendampingan?', a: 'Perawat akan melakukan pemantauan dan berkoordinasi dengan dokter apabila terdapat perubahan kondisi yang membutuhkan evaluasi atau penyesuaian perawatan.' },
            { q: 'Berapa biaya pendampingan Perawat Homecare?', a: 'Biaya disesuaikan dengan kebutuhan pasien, durasi pendampingan, serta pelayanan yang diperlukan. Estimasi biaya akan diinformasikan sebelum layanan dimulai.' },
            { q: 'Apakah pasien bisa dirawat oleh lebih dari satu dokter spesialis?', a: 'Ya. Apabila kondisi pasien membutuhkan penanganan dari beberapa bidang spesialisasi, dokter spesialis dapat berkoordinasi dan melakukan perawatan bersama sesuai kebutuhan medis pasien. Tim Dokter Panggil akan membantu mengoordinasikan dokter serta jadwal kunjungan yang diperlukan.' }
        ];
        faqEn = (en.d3 && en.d3.faqs) || [];
    } else if (service.slug === 'perawatan-lansia') {
        body = rawatInapBody(prefix, en);
        faqId = [
            { q: 'Kondisi pasien seperti apa yang dapat dirawat di rumah?', a: 'Rawat Inap di Rumah dapat dipertimbangkan untuk pasien yang membutuhkan perawatan, terapi, dan pemantauan berkelanjutan, namun berdasarkan hasil pemeriksaan dokter kondisinya masih memungkinkan untuk mendapatkan perawatan di rumah. Kebutuhan setiap pasien akan dinilai terlebih dahulu sebelum layanan dimulai.' },
            { q: 'Apakah semua pasien bisa menjalani Rawat Inap di Rumah?', a: 'Tidak. Dokter akan melakukan pemeriksaan dan menilai kondisi pasien terlebih dahulu untuk menentukan apakah perawatan dapat dilakukan dengan aman di rumah. Apabila kondisi pasien membutuhkan pemeriksaan, pemantauan, tindakan, atau fasilitas yang tidak tersedia di rumah, dokter akan merekomendasikan perawatan di fasilitas kesehatan.' },
            { q: 'Apakah pasien akan didampingi perawat selama 24 jam?', a: 'Pendampingan perawat disesuaikan dengan kondisi dan kebutuhan perawatan pasien berdasarkan rekomendasi dokter. Apabila pasien membutuhkan pendampingan selama 24 jam, Tim Dokter Panggil akan mengatur jadwal dan pergantian perawat sesuai kebutuhan pelayanan.' },
            { q: 'Siapa dokter yang bertanggung jawab selama pasien dirawat di rumah?', a: 'Setiap pasien akan berada di bawah supervisi dokter selama menjalani perawatan di rumah. Dokter akan melakukan kunjungan setiap hari untuk mengevaluasi perkembangan kondisi pasien, menentukan dan menyesuaikan rencana perawatan, serta berkoordinasi dengan perawat yang mendampingi pasien. Apabila kondisi pasien membutuhkan penanganan dari dokter spesialis, Tim Dokter Panggil dapat membantu mengoordinasikan konsultasi dan perawatan bersama dokter spesialis sesuai kebutuhan medis pasien.' },
            { q: 'Apakah obat, laboratorium, dan alat medis dapat disediakan di rumah?', a: 'Ya, sesuai kebutuhan dan rencana perawatan pasien. Tim Dokter Panggil menyediakan obat dan kebutuhan medis, mengoordinasikan pemeriksaan laboratorium di rumah, serta menyiapkan peralatan medis yang tersedia apabila diperlukan. Untuk mendukung pemantauan dan terapi pasien, saat ini tersedia patient monitor dan syringe pump sesuai kebutuhan dan rekomendasi dokter.' },
            { q: 'Berapa biaya Rawat Inap di Rumah?', a: 'Biaya Rawat Inap di Rumah disesuaikan dengan kondisi dan kebutuhan setiap pasien. Komponen biaya dapat meliputi layanan dokter, pendampingan perawat, obat dan bahan medis, tindakan, pemeriksaan laboratorium, penggunaan peralatan medis, serta kebutuhan pelayanan lainnya. Setelah kebutuhan perawatan ditentukan, Tim Dokter Panggil akan memberikan estimasi biaya kepada pasien atau keluarga sebelum layanan dimulai.' },
            { q: 'Bagaimana jika kondisi pasien memburuk selama perawatan?', a: 'Selama masa perawatan, kondisi pasien akan dipantau oleh perawat dan perkembangannya dapat dikoordinasikan dengan dokter yang melakukan supervisi. Apabila terjadi perubahan kondisi, dokter akan melakukan evaluasi dan menentukan penanganan selanjutnya. Jika kondisi pasien membutuhkan pemeriksaan, tindakan, atau fasilitas yang tidak dapat diberikan di rumah, dokter akan merekomendasikan pasien untuk segera mendapatkan penanganan lebih lanjut di fasilitas kesehatan.' }
        ];
        faqEn = (en.ri && en.ri.faqs) || [];
    } else if (service.slug === 'tindakan-medis') {
        body = tindakanMedisBody(prefix, en);
        faqId = [
            { q: 'Apakah tindakan medis dapat langsung dipesan tanpa pemeriksaan dokter?', a: 'Tidak. Setiap tindakan medis di Dokter Panggil dilakukan berdasarkan rekomendasi dokter. Penilaian dokter dapat dilakukan melalui konsultasi online atau kunjungan dokter langsung ke rumah sesuai kondisi pasien.' },
            { q: 'Apakah harus selalu memanggil dokter ke rumah sebelum tindakan?', a: 'Tidak selalu. Untuk kondisi yang memungkinkan, penilaian awal dapat dilakukan melalui konsultasi online. Dokter akan menentukan apakah tindakan dapat dilakukan berdasarkan konsultasi tersebut atau pasien membutuhkan pemeriksaan langsung terlebih dahulu.' },
            { q: 'Siapa yang melakukan tindakan medis di rumah?', a: 'Tindakan dapat dilakukan oleh dokter maupun perawat, sesuai jenis tindakan, kompetensi tenaga kesehatan, kondisi pasien, dan rencana medis yang telah ditentukan dokter.' },
            { q: 'Apakah obat, alat, dan bahan medis disediakan?', a: 'Ya. Tim Dokter Panggil akan mempersiapkan obat, alat, serta bahan medis yang dibutuhkan sesuai tindakan yang telah direkomendasikan dokter.' },
            { q: 'Berapa biaya tindakan medis di rumah?', a: 'Biaya disesuaikan dengan jenis tindakan, obat dan bahan medis yang digunakan, tenaga kesehatan yang melakukan tindakan, serta lokasi pasien. Estimasi biaya akan diinformasikan sebelum layanan dikonfirmasi.' },
            { q: 'Bagaimana jika setelah diperiksa ternyata tindakan tidak dapat dilakukan di rumah?', a: 'Dokter akan menjelaskan kondisi pasien dan merekomendasikan penanganan yang sesuai. Apabila pasien membutuhkan pemeriksaan, tindakan, atau fasilitas yang tidak tersedia di rumah, dokter akan menyarankan penanganan lebih lanjut di fasilitas kesehatan.' }
        ];
        faqEn = (en.d4 && en.d4.faqs) || [];
    } else if (service.slug === 'terapi-infus') {
        body = terapiInfusBody(prefix, en);
        faqId = [
            { q: 'Apakah saya bisa langsung meminta infus tanpa konsultasi dokter?', a: 'Tidak. Terapi infus di Dokter Panggil dilakukan berdasarkan rekomendasi dokter setelah penilaian kondisi pasien. Penilaian dapat dilakukan melalui konsultasi online atau kunjungan dokter langsung ke rumah sesuai kondisi pasien.' },
            { q: 'Apakah badan lemas berarti membutuhkan infus?', a: 'Tidak selalu. Badan lemas dapat disebabkan oleh berbagai kondisi dan tidak semuanya membutuhkan terapi infus. Dokter akan melakukan penilaian terlebih dahulu untuk menentukan penyebab dan terapi yang sesuai.' },
            { q: 'Siapa yang memasang infus di rumah?', a: 'Pemasangan infus dapat dilakukan oleh perawat atau dokter sesuai rencana pelayanan dan berdasarkan rekomendasi dokter.' },
            { q: 'Apakah cairan infus dan obat sudah disediakan?', a: 'Ya. Cairan infus, obat, serta alat dan bahan medis akan dipersiapkan sesuai hasil triase dokter sebelum kunjungan.' },
            { q: 'Berapa lama terapi infus berlangsung?', a: 'Durasi terapi bergantung pada jenis, jumlah cairan atau obat yang diberikan, serta kondisi pasien. Dokter akan memberikan informasi mengenai perkiraan durasi berdasarkan rencana terapi.' },
            { q: 'Berapa biaya terapi infus di rumah?', a: 'Biaya disesuaikan dengan jenis terapi, cairan dan obat yang digunakan, bahan medis, tenaga kesehatan, serta lokasi pasien. Estimasi biaya akan diinformasikan terlebih dahulu sebelum layanan dikonfirmasi.' }
        ];
        faqEn = (en.d5 && en.d5.faqs) || [];
    } else if (service.slug === 'infus-vitamin') {
        body = infusVitaminBody(prefix, en);
        faqId = [
            { q: 'Apa saja pilihan Infus Vitamin yang tersedia?', a: 'Dokter Panggil menyediakan tiga pilihan yaitu Vitamin C, Multivitamin yang mengandung Vitamin B Kompleks + Vitamin C, serta Immunobooster. Pilihan yang diberikan akan disesuaikan dengan kondisi pasien berdasarkan rekomendasi dokter.' },
            { q: 'Apakah bisa memilih Infus Vitamin dengan dokter atau perawat?', a: 'Ya. Saat melakukan booking, pasien dapat memilih layanan dengan dokter atau perawat. Keduanya tetap melalui pemeriksaan kondisi pasien dan rekomendasi dokter sebelum vitamin diberikan.' },
            { q: 'Bagaimana jika memilih layanan dengan perawat?', a: 'Perawat akan datang ke rumah dan melakukan pemeriksaan awal kondisi pasien. Hasil pemeriksaan kemudian disampaikan kepada dokter dan pasien akan menjalani konsultasi online dengan dokter. Setelah dokter memberikan rekomendasi, perawat memberikan infus vitamin sesuai terapi yang telah ditentukan.' },
            { q: 'Bagaimana jika memilih layanan dengan dokter?', a: 'Dokter akan datang langsung ke rumah untuk melakukan pemeriksaan kesehatan pasien. Berdasarkan hasil pemeriksaan, dokter akan menentukan pilihan vitamin yang sesuai sebelum terapi diberikan.' },
            { q: 'Apakah pasien bisa memilih sendiri jenis vitamin?', a: 'Pasien dapat menyampaikan pilihan atau kebutuhan saat melakukan booking. Namun, jenis vitamin yang diberikan tetap berdasarkan hasil pemeriksaan dan rekomendasi dokter untuk memastikan kesesuaiannya dengan kondisi pasien.' },
            { q: 'Berapa lama Infus Vitamin berlangsung?', a: 'Durasi pemberian kurang lebih 30 menit dan dapat berbeda tergantung jenis terapi, volume cairan, serta kondisi pasien. Perkiraan durasi akan diinformasikan sesuai terapi yang diberikan.' },
            { q: 'Apakah Infus Vitamin memiliki efek samping?', a: 'Seperti terapi intravena lainnya, infus vitamin dapat menimbulkan efek samping atau reaksi tertentu. Karena itu, kondisi pasien diperiksa sebelum terapi dan dipantau selama pemberian infus.' },
            { q: 'Berapa biaya Infus Vitamin di rumah?', a: 'Biaya disesuaikan dengan pilihan vitamin, pilihan layanan dokter atau perawat, serta lokasi pasien. Rincian dan estimasi biaya akan diinformasikan sebelum layanan dikonfirmasi.' }
        ];
        faqEn = (en.iv && en.iv.faqs) || [];
    } else if (service.slug === 'terapi-oksigen') {
        body = terapiOksigenBody(prefix, en);
        faqId = [
            { q: 'Apakah bisa langsung memesan oksigen tanpa konsultasi dokter?', a: 'Terapi oksigen diberikan berdasarkan rekomendasi dokter. Dokter akan melakukan penilaian dan pemeriksaan terlebih dahulu untuk menentukan kebutuhan dan rencana terapi sesuai kondisi pasien.' },
            { q: 'Apakah pasien sesak napas selalu membutuhkan oksigen?', a: 'Tidak selalu. Sesak napas dapat disebabkan oleh berbagai kondisi dan tidak semuanya membutuhkan terapi oksigen. Dokter akan melakukan penilaian untuk menentukan penyebab dan penanganan yang sesuai.' },
            { q: 'Berapa saturasi oksigen yang membutuhkan terapi oksigen?', a: 'Kebutuhan terapi tidak ditentukan hanya berdasarkan satu angka saturasi. Dokter akan mempertimbangkan hasil pengukuran bersama gejala, kondisi medis, serta target saturasi yang sesuai untuk pasien.' },
            { q: 'Siapa yang memberikan terapi oksigen di rumah?', a: 'Terapi dapat dibantu oleh dokter atau perawat sesuai kondisi pasien dan rencana terapi yang telah ditentukan dokter.' },
            { q: 'Apakah peralatan oksigen disediakan?', a: 'Peralatan yang dibutuhkan dipersiapkan sesuai rencana terapi.' },
            { q: 'Apakah terapi oksigen dapat dilakukan dalam jangka panjang?', a: 'Pada kondisi tertentu, terapi oksigen dapat menjadi bagian dari perawatan berkelanjutan. Kebutuhan, durasi, dan pemantauan harus mengikuti rencana dokter.' },
            { q: 'Bagaimana jika saturasi tetap rendah meskipun sudah diberikan oksigen?', a: 'Kondisi pasien perlu dievaluasi kembali. Apabila pasien membutuhkan pemeriksaan atau fasilitas yang tidak tersedia di rumah, dokter akan merekomendasikan penanganan lebih lanjut di fasilitas kesehatan.' }
        ];
        faqEn = (en.d7 && en.d7.faqs) || [];
    } else if (service.slug === 'terapi-nebulizer') {
        body = terapiNebulizerBody(prefix, en);
        faqId = [
            { q: 'Apakah batuk atau pilek perlu nebulizer?', a: 'Tidak selalu. Kebutuhan nebulizer bergantung pada penyebab keluhan dan kondisi saluran pernapasan. Dokter akan melakukan penilaian terlebih dahulu.' },
            { q: 'Apakah nebulizer hanya berisi uap?', a: 'Tidak. Nebulizer mengubah cairan obat menjadi aerosol atau kabut halus yang dapat dihirup ke saluran pernapasan.' },
            { q: 'Apakah obat nebulizer bisa dipilih sendiri?', a: 'Tidak. Jenis, dosis, dan kombinasi obat nebulizer diberikan berdasarkan rekomendasi dokter.' },
            { q: 'Siapa yang melakukan nebulizer di rumah?', a: 'Terapi dapat dilakukan oleh dokter atau perawat sesuai kebutuhan pelayanan dan rencana terapi dokter.' },
            { q: 'Apakah anak-anak bisa mendapatkan nebulizer di rumah?', a: 'Bisa apabila berdasarkan penilaian dokter terapi nebulizer memang diperlukan. Jenis dan dosis obat akan disesuaikan dengan kondisi pasien.' },
            { q: 'Berapa lama terapi nebulizer berlangsung?', a: 'Durasi dapat berbeda tergantung perangkat, obat, dan terapi yang diberikan. Tenaga medis akan melakukan terapi sesuai rencana dokter.' },
            { q: 'Bagaimana jika sesak tidak membaik setelah nebulizer?', a: 'Kondisi pasien perlu dievaluasi kembali. Apabila membutuhkan penanganan lebih lanjut, dokter dapat merekomendasikan pasien mendapatkan perawatan di fasilitas kesehatan.' }
        ];
        faqEn = (en.d8 && en.d8.faqs) || [];
    } else if (service.slug === 'perawatan-luka') {
        body = perawatanLukaBody(prefix, en);
        faqId = [
            { q: 'Apakah perawatan luka di rumah terasa sakit?', a: 'Tingkat rasa tidak nyaman dapat berbeda tergantung jenis, lokasi, dan kondisi luka. Tenaga medis akan melakukan perawatan dengan mempertimbangkan kondisi pasien. Apabila nyeri cukup berat atau membutuhkan penanganan tambahan, kondisi tersebut dapat dikonsultasikan dengan dokter.' },
            { q: 'Apakah jahitan luka operasi bisa dilepas di rumah?', a: 'Pada kondisi tertentu, pelepasan jahitan dapat dilakukan di rumah setelah kondisi luka dinilai dan waktu pelepasan jahitan dinyatakan sesuai. Tenaga medis akan memastikan kondisi luka terlebih dahulu sebelum tindakan dilakukan.' },
            { q: 'Apakah keluarga perlu menyiapkan alat atau perlengkapan perawatan luka?', a: 'Tidak perlu menyiapkan sendiri kecuali telah diinformasikan sebelumnya. Tim Dokter Panggil dapat mempersiapkan kebutuhan dasar perawatan sesuai informasi awal pasien. Apabila setelah pemeriksaan diperlukan kebutuhan khusus lainnya, tenaga medis akan menginformasikannya kepada pasien atau keluarga.' },
            { q: 'Apakah perkembangan luka dapat didokumentasikan dari setiap kunjungan?', a: 'Pada perawatan luka berkala, perkembangan kondisi luka didokumentasikan sesuai kebutuhan untuk membantu memantau perubahan luka dari waktu ke waktu dan menjadi bagian dari evaluasi perawatan berikutnya.' },
            { q: 'Apakah perawatan luka harus dilakukan setiap hari?', a: 'Tidak selalu. Frekuensi perawatan bergantung pada jenis luka, kondisi luka, jenis balutan, serta perkembangan luka. Jadwal perawatan akan disesuaikan dengan kebutuhan pasien.' },
            { q: 'Apakah dressing dan kebutuhan perawatan disediakan?', a: 'Kebutuhan perawatan luka dipersiapkan sesuai kondisi dan rencana perawatan pasien. Informasi mengenai kebutuhan tambahan dan biaya akan disampaikan kepada pasien atau keluarga.' }
        ];
        faqEn = (en.pl && en.pl.faqs) || [];
    } else if (service.slug === 'pemasangan-ngt') {
        body = ngtBody(prefix, en);
        faqId = [
            { q: 'Apakah pemasangan NGT terasa sakit?', a: 'Pemasangan dapat menimbulkan rasa tidak nyaman pada hidung dan tenggorokan. Tenaga medis akan membantu memposisikan pasien dan melakukan tindakan sesuai prosedur untuk membantu proses pemasangan.' },
            { q: 'Berapa lama NGT dapat digunakan sebelum perlu diganti?', a: 'Lama penggunaan dan kebutuhan penggantian bergantung pada jenis selang, kondisi selang, kondisi pasien, serta rencana perawatan. Tenaga medis akan memberikan arahan sesuai NGT yang digunakan.' },
            { q: 'Apakah obat dapat diberikan melalui NGT?', a: 'Obat tertentu dapat diberikan melalui NGT, tetapi tidak semua obat sesuai untuk dihancurkan atau diberikan melalui selang. Pemberian obat perlu mengikuti instruksi dokter atau tenaga kesehatan.' },
            { q: 'Bagaimana jika NGT terlepas di rumah?', a: 'Jangan memasukkan kembali selang sendiri apabila pasien atau keluarga belum memiliki kompetensi dan instruksi khusus untuk melakukannya. Hubungi tenaga medis untuk evaluasi dan pemasangan kembali apabila diperlukan.' }
        ];
        faqEn = (en.ngt && en.ngt.faqs) || [];
    } else if (service.slug === 'pemasangan-kateter') {
        body = kateterBody(prefix, en);
        faqId = [
            { q: 'Apakah pemasangan kateter terasa sakit?', a: 'Pemasangan dapat menimbulkan rasa tidak nyaman. Tenaga medis akan melakukan tindakan secara hati-hati dan memantau kondisi pasien selama proses pemasangan.' },
            { q: 'Apakah kateter boleh digunakan dalam jangka panjang?', a: 'Pada kondisi tertentu, kateter dapat digunakan dalam periode yang lebih panjang apabila memang diperlukan secara medis. Kebutuhan penggunaan dan evaluasinya disesuaikan dengan kondisi pasien.' },
            { q: 'Apakah kantong urin dapat dikosongkan sendiri oleh keluarga?', a: 'Bisa setelah mendapatkan edukasi mengenai cara mengosongkan kantong urin dan menjaga kebersihan selama proses tersebut.' },
            { q: 'Bagaimana jika urin tidak keluar setelah kateter dipasang?', a: 'Jangan mencoba memperbaiki atau memasukkan kateter lebih dalam sendiri. Periksa apakah selang tertekuk atau posisi kantong menghambat aliran, kemudian hubungi tenaga medis apabila urin tetap tidak mengalir atau pasien mengalami keluhan.' },
            { q: 'Apakah kateter harus diganti secara rutin?', a: 'Jadwal penggantian tidak sama pada setiap pasien. Jenis kateter, kondisi pasien, fungsi kateter, serta rencana perawatan akan menjadi pertimbangan dalam menentukan waktu penggantian.' }
        ];
        faqEn = (en.kateter && en.kateter.faqs) || [];
    } else if (service.slug === 'suction') {
        body = suctionBody(prefix, en);
        faqId = [
            { q: 'Apakah semua pasien dengan banyak dahak membutuhkan suction?', a: 'Tidak. Sebagian pasien masih dapat mengeluarkan dahak secara efektif melalui batuk. Kebutuhan suction ditentukan berdasarkan kondisi pasien, kemampuan mengeluarkan sekret, dan hasil penilaian dokter.' },
            { q: 'Apakah suction terasa sakit?', a: 'Suction dapat menimbulkan rasa tidak nyaman dan merangsang batuk. Tenaga medis akan melakukan tindakan sesuai kebutuhan pasien dan memantau respons selama prosedur.' },
            { q: 'Berapa kali suction boleh dilakukan?', a: 'Tidak ada jumlah yang sama untuk semua pasien. Frekuensi suction disesuaikan dengan kondisi, jumlah sekret, kemampuan pasien membersihkan jalan napas, dan rencana perawatan.' },
            { q: 'Apakah pasien dengan trakeostomi dapat dilakukan suction di rumah?', a: 'Pada kondisi tertentu, bisa. Tenaga medis akan menilai kondisi pasien, trakeostomi, sekret, dan kebutuhan perawatan sebelum tindakan.' },
            { q: 'Apakah keluarga boleh melakukan suction sendiri?', a: 'Pada pasien tertentu yang membutuhkan suction berulang, keluarga atau caregiver dapat memerlukan edukasi dan pelatihan khusus dari tenaga kesehatan. Jangan melakukan suction secara mandiri tanpa pemahaman mengenai teknik, alat, serta kondisi pasien yang perlu diperhatikan.' }
        ];
        faqEn = (en.suction && en.suction.faqs) || [];
    } else if (service.slug === 'vaksinasi') {
        body = vaksinasiBody(prefix, en);
        faqId = [
            { q: 'Apakah boleh vaksin saat sedang batuk atau pilek?', a: 'Bisa atau tidaknya vaksin diberikan bergantung pada kondisi pasien saat itu. Keluhan ringan tidak selalu menyebabkan vaksinasi harus ditunda. Dokter akan menilai kondisi pasien sebelum menentukan apakah vaksin dapat diberikan.' },
            { q: 'Apakah vaksinasi dapat tetap diberikan saat demam?', a: 'Tergantung kondisi pasien. Demam atau keluhan ringan tidak selalu menyebabkan vaksinasi harus ditunda. Namun, pada kondisi sakit akut sedang hingga berat, dokter dapat merekomendasikan vaksinasi ditunda sampai kondisi pasien membaik.' },
            { q: 'Apakah boleh menerima lebih dari satu jenis vaksin dalam satu waktu?', a: 'Pada kondisi tertentu, beberapa jenis vaksin dapat diberikan pada kunjungan yang sama. Dokter akan mempertimbangkan jenis vaksin, usia, riwayat vaksinasi, serta kondisi kesehatan pasien sebelum pemberian.' },
            { q: 'Apa yang perlu dipersiapkan sebelum dokter datang?', a: 'Apabila tersedia, siapkan buku imunisasi atau catatan vaksinasi sebelumnya, daftar obat yang sedang dikonsumsi, serta informasi mengenai riwayat alergi atau reaksi terhadap vaksin sebelumnya.' },
            { q: 'Apakah setelah vaksin boleh mandi dan beraktivitas seperti biasa?', a: 'Pada umumnya pasien tetap dapat mandi dan melakukan aktivitas sehari-hari setelah vaksinasi apabila kondisi tubuh memungkinkan. Dokter akan memberikan arahan tambahan apabila terdapat hal khusus yang perlu diperhatikan setelah pemberian vaksin.' },
            { q: 'Apakah vaksinasi dapat dilakukan untuk beberapa anggota keluarga sekaligus?', a: 'Ya. Beberapa anggota keluarga dapat melakukan vaksinasi dalam satu kunjungan dengan melakukan booking sebelumnya. Informasikan jumlah pasien dan kebutuhan vaksin masing-masing agar kebutuhan pelayanan dapat dipersiapkan.' }
        ];
        faqEn = (en.vax && en.vax.faqs) || [];
    } else if (service.slug === 'tes-laboratorium') {
        body = laboratoriumBody(prefix, en);
        faqId = [
            { q: 'Apakah semua pemeriksaan laboratorium dapat dilakukan dari rumah?', a: 'Tidak semua pemeriksaan dapat dilakukan melalui layanan pengambilan sampel di rumah. Ketersediaan bergantung pada jenis pemeriksaan, sampel yang diperlukan, serta layanan laboratorium rekanan.' },
            { q: 'Apakah pemeriksaan laboratorium harus puasa?', a: 'Tidak semua pemeriksaan membutuhkan puasa. Tim akan menginformasikan apabila terdapat persiapan khusus sebelum pengambilan sampel.' },
            { q: 'Apakah pemeriksaan laboratorium dapat dilakukan untuk anak?', a: 'Bisa, sesuai jenis pemeriksaan yang dibutuhkan dan ketersediaan layanan.' },
            { q: 'Apakah beberapa anggota keluarga dapat melakukan pemeriksaan sekaligus?', a: 'Bisa. Informasikan jumlah pasien dan pemeriksaan yang dibutuhkan agar tim dapat mengoordinasikan pelayanan.' }
        ];
        faqEn = (en.lab && en.lab.faqs) || [];
    } else if (service.slug === 'farmasi') {
        body = farmasiBody(prefix, en);
        faqId = [
            { q: 'Apakah bisa memesan obat tanpa konsultasi dokter?', a: 'Tidak, pasien dapat berkonsultasi dengan dokter secara online atau melalui kunjungan langsung ke rumah.' },
            { q: 'Apakah semua obat tersedia 24 jam?', a: 'Ketersediaan setiap obat dapat berbeda. Tim akan melakukan pengecekan dan menginformasikan ketersediaan serta estimasi pengantaran sebelum pelayanan dikonfirmasi.' },
            { q: 'Berapa lama obat sampai ke rumah?', a: 'Waktu pengantaran bergantung pada lokasi pasien, ketersediaan obat, dan kondisi pelayanan pada saat pemesanan. Estimasi akan diinformasikan setelah kebutuhan obat dikonfirmasi.' },
            { q: 'Apakah obat untuk anak juga dapat diantar?', a: 'Bisa, sesuai resep atau rekomendasi dokter dan ketersediaan obat.' },
            { q: 'Bagaimana jika obat yang diresepkan tidak tersedia?', a: 'Tim akan menginformasikan ketersediaannya. Apabila diperlukan perubahan terapi atau alternatif obat, keputusan tersebut tetap dikonsultasikan dengan dokter.' }
        ];
        faqEn = (en.farmasi && en.farmasi.faqs) || [];
    } else if (service.slug === 'pemeriksaan-kesehatan') {
        body = medicalCheckUpBody(prefix, en);
        faqId = [
            { q: 'Apakah Medical Check Up dapat dilakukan tanpa kunjungan dokter?', a: 'Tidak. Setiap paket Medical Check Up Dokter Panggil mencakup kunjungan dan pemeriksaan langsung oleh dokter di rumah.' },
            { q: 'Apa perbedaan MCU Dokter Umum dan Spesialis?', a: 'Komponen pemeriksaan pada masing-masing paket sama. Perbedaannya adalah dokter yang melakukan pemeriksaan dan evaluasi, yaitu dokter umum atau Dokter Spesialis Penyakit Dalam.' },
            { q: 'Apakah harga paket sudah termasuk biaya transportasi?', a: 'Belum. Harga paket belum termasuk biaya transportasi. Besarnya biaya transportasi akan diinformasikan berdasarkan lokasi pemeriksaan sebelum booking dikonfirmasi.' },
            { q: 'Apakah harus puasa sebelum Medical Check Up?', a: 'Tergantung paket atau jenis pemeriksaan yang dilakukan. Tim akan menginformasikan persiapan yang diperlukan sebelum kunjungan.' },
            { q: 'Apakah pemeriksaan EKG tersedia pada semua paket?', a: 'Tidak. Pemeriksaan EKG termasuk dalam Panel Jantung Sehat dan Panel Healthy Life.' },
            { q: 'Apakah hasil MCU dapat dikonsultasikan dengan dokter?', a: 'Ya. Hasil pemeriksaan akan dievaluasi bersama dokter untuk membantu memahami hasil dan menentukan tindak lanjut apabila diperlukan.' }
        ];
        faqEn = (en.mcu && en.mcu.faqs) || [];
    } else if (service.slug === 'konsultasi-online') {
        body = konsultasiOnlineBody(prefix, en);
        faqId = [
            { q: 'Apa perbedaan Chat/Telepon dan Video Call?', a: 'Chat/Telepon memungkinkan konsultasi melalui percakapan tertulis atau suara, sedangkan Video Call memungkinkan pasien dan dokter berkomunikasi secara visual selama sesi. Tarif layanan berbeda sesuai metode yang dipilih.' },
            { q: 'Apakah harus melakukan pembayaran sebelum konsultasi?', a: 'Ya. Setelah dokter, metode konsultasi, jadwal, dan tarif dikonfirmasi, pembayaran dilakukan terlebih dahulu sebelum sesi konsultasi dimulai.' },
            { q: 'Apakah saya bisa memilih dokter spesialis?', a: 'Bisa. Pilihan dokter spesialis dan jadwal konsultasi akan disesuaikan dengan kebutuhan pasien serta ketersediaan dokter.' },
            { q: 'Apakah dokter dapat memberikan resep setelah konsultasi online?', a: 'Dokter dapat memberikan resep apabila berdasarkan hasil konsultasi terdapat indikasi dan terapi obat dinilai sesuai dengan kondisi pasien.' },
            { q: 'Bagaimana jika dokter meminta pemeriksaan langsung?', a: 'Apabila diperlukan, pasien dapat melanjutkan dengan kunjungan dokter ke rumah atau pemeriksaan lain sesuai rekomendasi dokter.' }
        ];
        faqEn = (en.ko && en.ko.faqs) || [];
    } else {
        throw new Error('No custom body for service: ' + service.slug);
    }

    const heroChips = Array.isArray(seo.heroChips) ? seo.heroChips.map((c, i) => ({
        id: c.id || c,
        en: (en.chips && en.chips[i]) || c.en || c.id || c
    })) : null;

    return {
        file: 'layanan/' + service.slug + '.html',
        canonical: '/layanan/' + service.slug + '.html',
        title: seo.metaTitle,
        desc: seo.metaDesc,
        h1: seo.h1,
        h1En: en.h1,
        lead: seo.lead,
        leadEn: en.lead,
        heroChips: heroChips,
        ctaBook: seo.ctaBook ? { id: seo.ctaBook.id, en: en.ctaBook || seo.ctaBook.en || seo.ctaBook.id } : null,
        ctaAsk: seo.ctaAsk ? { id: seo.ctaAsk.id, en: en.ctaAsk || seo.ctaAsk.en || seo.ctaAsk.id } : null,
        ctaBookHref: seo.ctaBookHref || null,
        heroImage: service.image,
        heroAlt: L(service.imageAlt),
        waMessage: service.slug === 'kunjungan-dokter-spesialis'
            ? 'Halo, saya ingin konsultasikan kebutuhan dokter spesialis ke rumah di Makassar.'
            : service.slug === 'perawatan-rumah'
                ? 'Halo, saya ingin bertanya tentang perawat homecare di Makassar.'
                : service.slug === 'perawatan-lansia'
                    ? 'Halo, saya ingin bertanya tentang rawat inap di rumah di Makassar.'
                    : service.slug === 'tindakan-medis'
                        ? 'Halo, saya ingin konsultasikan kebutuhan tindakan medis di rumah di Makassar.'
                        : service.slug === 'terapi-infus'
                            ? 'Halo, saya ingin bertanya tentang terapi infus di rumah di Makassar.'
                            : service.slug === 'infus-vitamin'
                                ? 'Halo, saya ingin bertanya tentang infus vitamin di rumah di Makassar.'
                                : service.slug === 'terapi-oksigen'
                                    ? 'Halo, saya ingin hubungi Dokter Panggil tentang terapi oksigen di rumah di Makassar.'
                                    : service.slug === 'terapi-nebulizer'
                                        ? 'Halo, saya ingin hubungi Dokter Panggil tentang terapi nebulizer di rumah di Makassar.'
                                        : service.slug === 'perawatan-luka'
                                            ? 'Halo, saya ingin konsultasikan kondisi luka di rumah di Makassar.'
                                            : service.slug === 'pemasangan-ngt'
                                                ? 'Halo, saya ingin konsultasikan kondisi pasien untuk pemasangan selang makan (NGT) di rumah di Makassar.'
                                                : service.slug === 'pemasangan-kateter'
                                                    ? 'Halo, saya ingin konsultasikan kondisi pasien untuk pemasangan kateter urin di rumah di Makassar.'
                                                    : service.slug === 'suction'
                                                        ? 'Halo, saya ingin konsultasikan kondisi pasien untuk suction / sedot dahak di rumah di Makassar.'
                                                        : service.slug === 'vaksinasi'
                                                            ? 'Halo, saya ingin bertanya tentang vaksinasi di rumah di Makassar.'
                                                            : service.slug === 'tes-laboratorium'
                                                                ? 'Halo, saya ingin konsultasikan kebutuhan laboratorium di rumah di Makassar.'
                                                                : service.slug === 'farmasi'
                                                                    ? 'Halo, saya ingin konsultasikan kebutuhan obat di rumah di Makassar.'
                                                                    : service.slug === 'pemeriksaan-kesehatan'
                                                                        ? 'Halo, saya ingin tanya pilihan paket Medical Check Up di rumah di Makassar.'
                                                                        : service.slug === 'konsultasi-online'
                                                                            ? 'Halo, saya ingin bertanya tentang konsultasi online dokter di Makassar.'
                                                                            : 'Halo, saya ingin bertanya tentang ' + L(service.name) + ' di Makassar.',
        waBookMessage: service.slug === 'kunjungan-dokter'
            ? 'Halo, saya ingin panggil dokter umum ke rumah di Makassar.'
            : service.slug === 'kunjungan-dokter-spesialis'
                ? 'Halo, saya ingin panggil dokter spesialis ke rumah di Makassar.'
                : service.slug === 'perawatan-rumah'
                    ? 'Halo, saya ingin konsultasikan kebutuhan perawat homecare di Makassar.'
                    : service.slug === 'perawatan-lansia'
                        ? 'Halo, saya ingin konsultasikan kondisi pasien untuk rawat inap di rumah di Makassar.'
                        : service.slug === 'tindakan-medis'
                            ? 'Halo, saya ingin konsultasikan kondisi pasien untuk tindakan medis di rumah di Makassar.'
                            : service.slug === 'terapi-infus'
                                ? 'Halo, saya ingin konsultasikan kondisi pasien untuk terapi infus di rumah di Makassar.'
                                : service.slug === 'infus-vitamin'
                                    ? 'Halo, saya ingin booking infus vitamin di rumah di Makassar.'
                                    : service.slug === 'terapi-oksigen'
                                        ? 'Halo, saya ingin konsultasikan kondisi pasien untuk terapi oksigen di rumah di Makassar.'
                                        : service.slug === 'terapi-nebulizer'
                                            ? 'Halo, saya ingin konsultasikan kondisi pasien untuk terapi nebulizer di rumah di Makassar.'
                                            : service.slug === 'perawatan-luka'
                                                ? 'Halo, saya ingin booking perawatan luka di rumah di Makassar.'
                                                : service.slug === 'pemasangan-ngt'
                                                    ? 'Halo, saya ingin booking pemasangan/penggantian NGT di rumah di Makassar.'
                                                    : service.slug === 'pemasangan-kateter'
                                                        ? 'Halo, saya ingin booking pemasangan/penggantian kateter urin di rumah di Makassar.'
                                                        : service.slug === 'suction'
                                                            ? 'Halo, saya ingin booking layanan suction / sedot dahak di rumah di Makassar.'
                                                            : service.slug === 'vaksinasi'
                                                                ? 'Halo, saya ingin booking vaksinasi di rumah di Makassar.'
                                                                : service.slug === 'tes-laboratorium'
                                                                    ? 'Halo, saya ingin pesan pemeriksaan laboratorium di rumah di Makassar.'
                                                                    : service.slug === 'farmasi'
                                                                        ? 'Halo, saya ingin pesan obat / layanan farmasi di rumah di Makassar.'
                                                                        : service.slug === 'pemeriksaan-kesehatan'
                                                                            ? 'Halo, saya ingin booking Medical Check Up di rumah di Makassar.'
                                                                            : service.slug === 'konsultasi-online'
                                                                                ? 'Halo, saya ingin mulai konsultasi online dokter di Makassar.'
                                                                                : 'Halo, saya ingin memesan ' + L(service.name) + ' di Makassar.',
        published: true,
        body: body,
        crumbs: [
            { name: 'Beranda', nameEn: 'Home', href: 'index.html', canonical: '/' },
            { name: 'Layanan', nameEn: 'Services', href: 'layanan/index.html', canonical: '/layanan/' },
            { name: L(service.name), nameEn: pick(service.name, 'en'), href: 'layanan/' + service.slug + '.html', canonical: '/layanan/' + service.slug + '.html' }
        ],
        schemas: [
            {
                '@context': 'https://schema.org',
                '@type': 'Service',
                name: seo.h1,
                serviceType: L(service.name),
                description: seo.metaDesc,
                url: absUrl('/layanan/' + service.slug + '.html'),
                image: photo(service.image, 1200),
                category: 'Home Health Care',
                provider: { '@type': 'Organization', name: SITE.name, url: SITE.url + '/' },
                areaServed: SITE.cities.map(c => ({ '@type': 'City', name: c })),
                audience: { '@type': 'Patient' },
                termsOfService: absUrl('/')
            },
            faqSchema(faqId)
        ]
    };
}

function servicesHub() {
    /* The hub itself lives in layanan/, so siblings are linked without a prefix
       while anything outside the folder needs to step back up. */
    const prefix = '../';
    const hubEn = SEO_EN.hubs.layanan || {};
    const cards = '<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">' + SEO_SERVICES.map(s => {
        const enLead = pick(s.tagline, 'en');
        return linkCard(s.slug + '.html', s.icon, L(s.name), L(s.tagline), pick(s.name, 'en'), enLead);
    }).join('') + '</div>';

    const body = [
        // Catalog — modest bottom gap before CTA
        '<section class="w-full pt-12 sm:pt-16 pb-8 sm:pb-10"><div class="max-w-7xl mx-auto px-4">'
        + sectionHead('Pilih Layanan Sesuai Kebutuhan Anda', 'Temukan layanan kesehatan yang sesuai untuk kebutuhan Anda dan Keluarga di Rumah', hubEn.catalogTitle, hubEn.catalogSub)
        + cards
        + '</div></section>',
        '<section class="w-full pt-0 pb-12 sm:pb-16"><div class="max-w-7xl mx-auto px-4">'
        + ctaBlock(prefix,
            'Halo, saya ingin bertanya tentang layanan kesehatan ke rumah di Makassar.',
            'Tidak Yakin Layanan yang Dibutuhkan?',
            'Ceritakan kondisi atau kebutuhan pasien kepada Tim Kami. Kami akan membantu mengarahkan layanan yang sesuai.',
            'Halo, saya ingin memesan layanan kesehatan ke rumah di Makassar.')
        + '</div></section>'
    ].join('\n');

    return {
        file: 'layanan/index.html',
        canonical: '/layanan/',
        title: 'Layanan Kesehatan Ke Rumah di Makassar | DokterPanggil.id',
        desc: 'Dua belas layanan kesehatan ke rumah di Makassar: kunjungan dokter, perawatan rumah, tes laboratorium, fisioterapi, vaksinasi, perawatan lansia, perawatan luka, dan pemeriksaan kesehatan.',
        // Form C hero — judul client; subtitle paragraf dicoret → diganti 3 chip
        h1: 'Layanan Kesehatan Ke Rumah',
        h1En: hubEn.h1,
        lead: null,
        leadEn: null,
        heroChips: [
            { id: 'Tenaga Medis Terverifikasi', en: (hubEn.chips && hubEn.chips[0]) || 'Verified Medical Professionals' },
            { id: 'Datang Langsung ke Rumah', en: (hubEn.chips && hubEn.chips[1]) || 'Come Directly to Your Home' },
            { id: 'Layanan Terkoordinasi', en: (hubEn.chips && hubEn.chips[2]) || 'Coordinated Care' }
        ],
        heroImage: SERVICES[0].image,
        heroAlt: L(SERVICES[0].imageAlt),
        waMessage: 'Halo, saya ingin bertanya tentang layanan kesehatan ke rumah di Makassar.',
        waBookMessage: 'Halo, saya ingin memesan layanan kesehatan ke rumah di Makassar.',
        published: true,
        body: body,
        crumbs: [
            { name: 'Beranda', nameEn: 'Home', href: 'index.html', canonical: '/' },
            { name: 'Layanan', nameEn: 'Services', href: 'layanan/index.html', canonical: '/layanan/' }
        ],
        schemas: [
            organizationSchema(),
            {
                '@context': 'https://schema.org',
                '@type': 'CollectionPage',
                name: 'Layanan Kesehatan Ke Rumah',
                url: absUrl('/layanan/'),
                mainEntity: {
                    '@type': 'ItemList',
                    itemListElement: SEO_SERVICES.map((s, i) => ({
                        '@type': 'ListItem',
                        position: i + 1,
                        name: L(s.name),
                        url: absUrl('/layanan/' + s.slug + '.html')
                    }))
                }
            }
        ]
    };
}

const DOCTOR_DIRS = { dokter: 'dokter', spesialis: 'dokter-spesialis' };
const DOCTOR_HUB_LABEL = {
    dokter: 'Dokter & Tenaga Kesehatan',
    spesialis: 'Dokter Spesialis'
};

function doctorDirectoryBlock() {
    return '<div id="temukan-dokter" class="scroll-mt-28">'
        + sectionHead(
            'Temui Tim Medis Kami',
            'Cari dokter spesialis berdasarkan nama, bidang keahlian, atau kondisi medis. Filter menurut spesialisasi, lalu buat janji melalui WhatsApp.',
            'Meet Our Medical Team',
            'Search specialists by name, field, or medical condition. Filter by specialty, then book via WhatsApp.'
        )
        + '<div class="max-w-xl mx-auto mb-6">'
        + '<div class="relative">'
        + '<i data-lucide="search" style="width:18px;height:18px" class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>'
        + '<input id="doctor-search" type="search" placeholder="Cari nama, spesialisasi, atau kondisi..." class="w-full pl-11 pr-4 py-3 rounded-full border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary/30">'
        + '</div></div>'
        + '<div id="doctor-filters" class="flex justify-center gap-2 md:gap-3 mb-4 flex-wrap"></div>'
        + '<div id="specialty-filters" class="flex justify-center gap-2 mb-8 flex-wrap"></div>'
        + '<div id="doctors-grid" class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"></div>'
        + '<p id="doctors-empty" class="hidden text-center text-gray-500 py-10"></p>'
        + '</div>';
}

function doctorModalMarkup() {
    return '<div id="doctor-modal" class="fixed inset-0 z-[70] hidden items-center justify-center p-4">'
        + '<div id="doctor-modal-overlay" class="modal-overlay absolute inset-0 bg-black/50 backdrop-blur-sm"></div>'
        + '<div class="modal-panel relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden overflow-y-auto">'
        + '<button id="doctor-modal-close" type="button" class="absolute top-3 right-3 z-10 w-11 h-11 rounded-full bg-white/90 shadow flex items-center justify-center hover:bg-white transition-colors" aria-label="Tutup">'
        + icon('x', 18, '#2D2D2D') + '</button>'
        + '<div id="doctor-modal-body"></div>'
        + '</div></div>\n';
}

function doctorHub(group) {
    const dir = DOCTOR_DIRS[group];
    const entries = DOCTOR_PAGES.filter(d => d.group === group);
    const prefix = '../';
    const isSpecialist = group === 'spesialis';
    const hubEn = SEO_EN.hubs[isSpecialist ? 'spesialis' : 'dokter'] || {};

    const cards = '<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">' + entries.map(e => {
        const den = SEO_EN.doctors[e.slug] || {};
        return linkCard(e.slug + '.html', isSpecialist ? 'heart-pulse' : 'stethoscope', e.h1, e.lead, den.h1, den.lead);
    }).join('') + '</div>';

    const crossLink = isSpecialist
        ? '<p class="mt-6 text-sm"><a href="' + prefix + 'dokter/index.html" class="font-semibold text-primary hover:underline"' + biAttrs('Lihat dokter umum, perawat, dan fisioterapis →', hubEn.crossGeneral) + '>Lihat dokter umum, perawat, dan fisioterapis &rarr;</a></p>'
        : '';

    const intro = isSpecialist
        ? [
            'Konsultasi spesialis di rumah paling sesuai untuk kondisi yang sudah terdiagnosis dan memerlukan kontrol berkala. Untuk keluhan yang belum jelas arahnya, penilaian dokter umum lebih dulu biasanya lebih efisien karena menentukan pemeriksaan yang benar-benar diperlukan.',
            'Perlu diingat bahwa sebagian pemeriksaan penunjang dan tindakan hanya dapat dilakukan di fasilitas kesehatan. Bila hasil konsultasi menunjukkan kebutuhan tersebut, dokter akan menjelaskannya dan mengarahkan langkah lanjutan.'
        ]
        : [
            'Setiap peran memiliki kewenangan yang berbeda. Dokter menilai dan menentukan diagnosis serta terapi, perawat menjalankan tindakan keperawatan sesuai instruksi dokter, dan fisioterapis menangani pemulihan fungsi gerak.',
            'Memahami pembagian ini membantu Anda memesan layanan yang tepat sejak awal, sehingga kebutuhan pasien tidak tertunda karena harus mengatur ulang jadwal kunjungan.'
        ];

    const bodyParts = [];
    if (!isSpecialist) {
        bodyParts.push(wrapWide(doctorDirectoryBlock(), 'alt'));
    }
    bodyParts.push(wrapWide(sectionHead(isSpecialist ? 'Bidang Spesialisasi' : 'Peran Tenaga Kesehatan', null, hubEn.rolesTitle) + cards + crossLink));
    bodyParts.push(wrap(sectionHead(isSpecialist ? 'Kapan Konsultasi Spesialis di Rumah Sesuai' : 'Memilih Tenaga Kesehatan yang Tepat', null, hubEn.chooseTitle) + prose(intro, hubEn.intro), isSpecialist ? 'alt' : ''));
    bodyParts.push(wrap(sectionHead('Sebelum Anda Memesan', null, hubEn.beforeTitle) + emergencyBlock(), isSpecialist ? '' : 'alt'));
    bodyParts.push(wrapWide(ctaBlock(prefix,
        'Halo, saya ingin bertanya tentang tenaga kesehatan yang sesuai untuk kondisi pasien di Makassar.',
        'Belum yakin siapa yang perlu datang?',
        'Sampaikan kondisi pasien kepada tim kami. Kami membantu mengarahkan tenaga kesehatan yang sesuai kebutuhan di Makassar.',
        'Halo, saya ingin memesan kunjungan tenaga kesehatan ke rumah di Makassar.')));

    const page = {
        file: dir + '/index.html',
        canonical: '/' + dir + '/',
        title: isSpecialist
            ? 'Dokter Spesialis ke Rumah di Makassar | DokterPanggil.id'
            : 'Dokter & Perawat ke Rumah di Makassar | DokterPanggil.id',
        desc: isSpecialist
            ? 'Halaman konsultasi dokter spesialis ke rumah di Makassar: spesialis anak, jantung, dan penyakit dalam, beserta cakupan serta batasan penanganan di rumah.'
            : 'Direktori dokter, perawat, dan fisioterapis ke rumah di Makassar. Cari menurut peran atau spesialisasi, lalu buat janji melalui WhatsApp.',
        h1: isSpecialist ? 'Dokter Spesialis ke Rumah' : 'Dokter, Perawat, dan Fisioterapis ke Rumah',
        h1En: hubEn.h1,
        lead: isSpecialist
            ? 'Konsultasi spesialis di rumah di Makassar untuk kondisi yang stabil dan memerlukan kontrol berkala.'
            : 'Kenali peran setiap tenaga kesehatan, jelajahi direktori tim medis, dan pesan layanan yang paling sesuai kebutuhan pasien di Makassar.',
        leadEn: hubEn.lead,
        heroImage: isSpecialist ? IMG.checkup : IMG.dokter,
        heroAlt: isSpecialist ? 'Dokter spesialis memeriksa pasien di rumah' : 'Tenaga kesehatan mendampingi pasien di rumah',
        waMessage: 'Halo, saya ingin bertanya tentang tenaga kesehatan yang sesuai untuk kondisi pasien di Makassar.',
        waBookMessage: 'Halo, saya ingin memesan kunjungan tenaga kesehatan ke rumah di Makassar.',
        published: true,
        crumbs: [
            { name: 'Beranda', nameEn: 'Home', href: 'index.html', canonical: '/' },
            { name: DOCTOR_HUB_LABEL[group], nameEn: isSpecialist ? 'Specialists' : 'Doctors & Care Team', href: dir + '/index.html', canonical: '/' + dir + '/' }
        ],
        body: bodyParts.join('\n'),
        schemas: [{
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: isSpecialist ? 'Dokter Spesialis ke Rumah' : 'Dokter, Perawat, dan Fisioterapis ke Rumah',
            url: absUrl('/' + dir + '/'),
            mainEntity: {
                '@type': 'ItemList',
                itemListElement: entries.map((e, i) => ({
                    '@type': 'ListItem', position: i + 1, name: e.h1,
                    url: absUrl('/' + dir + '/' + e.slug + '.html')
                }))
            }
        }]
    };

    if (!isSpecialist) {
        page.afterBody = doctorModalMarkup();
        page.scripts = [prefix + 'doctors-data.js', prefix + 'doctors-directory.js'];
    }

    return page;
}

function doctorPage(entry) {
    const dir = DOCTOR_DIRS[entry.group];
    const prefix = '../';
    const hubLabel = DOCTOR_HUB_LABEL[entry.group];
    const en = SEO_EN.doctors[entry.slug] || {};
    const ui = SEO_EN.commonUi || {};
    const isSpecialist = entry.group === 'spesialis';

    const body = [
        wrap(sectionHead('Tentang Peran Ini', null, ui.aboutRole) + prose(entry.intro, en.intro)),
        wrap(
            sectionHead('Cakupan dan Batasan', 'Agar Anda memahami apa yang dapat dan tidak dapat ditangani dalam kunjungan ke rumah.', ui.scopeLimitsTitle, ui.scopeLimitsSub)
            + '<div class="grid md:grid-cols-2 gap-5">'
            + card(biTag('h3', entry.scopeTitle, en.scopeTitle, 'class="font-bold mb-4"') + bulletList(entry.scope, 'check', 'rgba(76,175,125,0.14)', '#4CAF7D', en.scope))
            + card(biTag('h3', entry.limitTitle, en.limitTitle, 'class="font-bold mb-4"') + bulletList(entry.limits, 'x', 'rgba(148,148,148,0.14)', '#8A8A8A', en.limits))
            + '</div>',
            'alt'
        ),
        wrapWide(
            sectionHead('Layanan Terkait', 'Halaman layanan yang paling sering dipesan bersama peran ini.', ui.relatedServicesTitle, ui.relatedServicesSub)
            + serviceLinkCards(entry.services, prefix)
        ),
        wrap(sectionHead(T('sec.faq'), null, Ten('sec.faq')) + faqBlock(entry.faq, en.faq), 'alt'),
        wrap(sectionHead('Sebelum Anda Memesan', null, ui.beforeBooking) + emergencyBlock()),
        wrapWide(ctaBlock(prefix,
            'Halo, saya ingin bertanya tentang ' + entry.h1 + ' di Makassar.',
            'Butuh ' + entry.h1.toLowerCase() + '?',
            'Sampaikan kondisi pasien dan alamat Anda di Makassar. Estimasi biaya dikonfirmasi sebelum kunjungan dijadwalkan.',
            'Halo, saya ingin memesan ' + entry.h1 + ' di Makassar.'))
    ].join('\n');

    return {
        file: dir + '/' + entry.slug + '.html',
        canonical: '/' + dir + '/' + entry.slug + '.html',
        title: entry.metaTitle,
        desc: entry.metaDesc,
        h1: entry.h1,
        h1En: en.h1,
        lead: entry.lead,
        leadEn: en.lead,
        heroImage: entry.image,
        heroAlt: entry.h1,
        waMessage: 'Halo, saya ingin bertanya tentang ' + entry.h1 + ' di Makassar.',
        waBookMessage: 'Halo, saya ingin memesan ' + entry.h1 + ' di Makassar.',
        published: true,
        crumbs: [
            { name: 'Beranda', nameEn: 'Home', href: 'index.html', canonical: '/' },
            { name: hubLabel, nameEn: isSpecialist ? 'Specialists' : 'Doctors & Care Team', href: dir + '/index.html', canonical: '/' + dir + '/' },
            { name: entry.h1, nameEn: en.h1, href: dir + '/' + entry.slug + '.html', canonical: '/' + dir + '/' + entry.slug + '.html' }
        ],
        body: body,
        schemas: [
            {
                '@context': 'https://schema.org',
                '@type': 'MedicalWebPage',
                name: entry.h1,
                description: entry.metaDesc,
                url: absUrl('/' + dir + '/' + entry.slug + '.html'),
                about: { '@type': 'MedicalProcedure', name: entry.h1 },
                publisher: { '@type': 'Organization', name: SITE.name, url: SITE.url + '/' }
            },
            faqSchema(entry.faq)
        ]
    };
}

/* -------------------------------------------------------------------- output */

/** Directories fully owned by this generator, safe to prune. */
const MANAGED_DIRS = ['layanan', 'dokter', 'dokter-spesialis'];

function writeFile(relPath, contents) {
    const target = path.join(ROOT, relPath);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, contents, 'utf8');
}

/**
 * Remove pages left behind by an earlier run, e.g. after a service is renamed or
 * dropped from services-data.js. Without this they would stay live and indexed.
 */
function pruneStalePages(written) {
    const keep = {};
    written.forEach(f => { keep[f] = true; });

    MANAGED_DIRS.forEach(dir => {
        const abs = path.join(ROOT, dir);
        if (!fs.existsSync(abs)) return;
        fs.readdirSync(abs)
            .filter(f => f.endsWith('.html'))
            .map(f => dir + '/' + f)
            .filter(f => !keep[f])
            .forEach(f => {
                fs.unlinkSync(path.join(ROOT, f));
                console.log('  - removed stale ' + f);
            });
    });
}

function sitemap(pages) {
    const today = new Date().toISOString().slice(0, 10);
    /* Hubs rank above the leaf pages they collect; root-level support pages sit
       in between. */
    function priorityFor(canonical) {
        if (canonical.slice(-1) === '/') return '0.9';
        return canonical.indexOf('/', 1) === -1 ? '0.8' : '0.7';
    }

    const entries = [{ loc: SITE.url + '/', priority: '1.0' }].concat(
        pages.filter(p => p.published !== false).map(p => ({
            loc: absUrl(p.canonical),
            priority: priorityFor(p.canonical)
        }))
    );

    return '<?xml version="1.0" encoding="UTF-8"?>\n'
        + '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
        + entries.map(e =>
            '  <url>\n    <loc>' + e.loc + '</loc>\n    <lastmod>' + today + '</lastmod>\n    <priority>' + e.priority + '</priority>\n  </url>'
        ).join('\n')
        + '\n</urlset>\n';
}

function robots() {
    return 'User-agent: *\n'
        + 'Allow: /\n'
        + '\n'
        + 'Sitemap: ' + SITE.url + '/sitemap.xml\n';
}

function build() {
    const pages = [];

    SERVICES.filter(s => !SERVICE_SEO[s.slug]).forEach(s => {
        console.warn('  ! service "' + s.slug + '" has no entry in SERVICE_SEO (seo-data.js) — no landing page, and it is left out of every SEO page link list');
    });

    pages.push(servicesHub());
    SEO_SERVICES.forEach(s => pages.push(servicePage(s)));

    pages.push(doctorHub('dokter'));
    pages.push(doctorHub('spesialis'));
    DOCTOR_PAGES.forEach(entry => pages.push(doctorPage(entry)));

    pages.forEach(page => {
        writeFile(page.file, renderShell(page));
        console.log('  + ' + page.file + (page.published === false ? '  (draft, noindex)' : ''));
    });
    pruneStalePages(pages.map(p => p.file));

    writeFile('sitemap.xml', sitemap(pages));
    writeFile('robots.txt', robots());
    console.log('  + sitemap.xml (' + (pages.filter(p => p.published !== false).length + 1) + ' urls)');
    console.log('  + robots.txt');
}

build();
