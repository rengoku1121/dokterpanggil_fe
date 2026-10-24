/**
 * Custom SEO landing bodies for support services (lab, farmasi, MCU, konsultasi online).
 * Factory receives helpers from build-seo.js.
 */
module.exports = function createSupportBodies(h) {
    const {
        sectionHead, biTag, biAttrs, icon, esc, waLink, faqBlock, ctaBlock, BRAND,
        composeBody, aboutCard, howStepCards, whyCards,
        pathCards, noteLine, iconInfoCards, stepPathCards
    } = h;

    function laboratoriumBody(prefix, en) {
        const e = en.lab || en;
        const waBook = 'Halo, saya ingin pesan pemeriksaan laboratorium di rumah di Makassar.';
        const waAsk = 'Halo, saya ingin konsultasikan kebutuhan laboratorium di rumah di Makassar.';

        const onlineFlow = ['Konfirmasi Pembayaran', 'Konsultasi Online', 'Rekomendasi Pemeriksaan', 'Konfirmasi Biaya', 'Pengambilan Sampel di Rumah', 'Konsultasi Hasil Laboratorium'];
        const homeFlow = ['Dokter Datang', 'Pemeriksaan Pasien', 'Rekomendasi Pemeriksaan', 'Konfirmasi Biaya', 'Pengambilan Sampel di Rumah', 'Konsultasi Hasil Laboratorium'];
        const onlineFlowEn = e.onlineFlow || onlineFlow;
        const homeFlowEn = e.homeFlow || homeFlow;

        const pathSection = stepPathCards([
            { icon: 'message-circle', title: 'Konsultasi Online Dokter', titleEn: e.onlineTitle, flow: onlineFlow, flowEn: onlineFlowEn },
            { icon: 'stethoscope', title: 'Dokter Datang ke Rumah', titleEn: e.homeTitle, flow: homeFlow, flowEn: homeFlowEn }
        ]);

        const labTypes = [
            { icon: 'droplet', title: 'Pemeriksaan Darah' },
            { icon: 'test-tube', title: 'Pemeriksaan Urine' },
            { icon: 'flask-conical', title: 'Pemeriksaan Feses' },
            { icon: 'wind', title: 'Pemeriksaan Sputum/Dahak' },
            { icon: 'microscope', title: 'Pemeriksaan Lainnya' }
        ];
        const labTypesEn = e.labTypes || [];
        const labTiles = '<div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 seo-icon-tiles">' + labTypes.map((t, i) =>
            '<div class="canva-card rounded-2xl' + (i === labTypes.length - 1 ? ' col-span-2 sm:col-span-1' : '') + '">'
            + '<div class="seo-icon-tile-ic">' + icon(t.icon, 22, BRAND) + '</div>'
            + biTag('h3', t.title, labTypesEn[i] || t.title, 'class="seo-icon-tile-title"')
            + '</div>'
        ).join('') + '</div>';

        const prepBullets = [
            'Tidak semua pemeriksaan laboratorium membutuhkan puasa atau persiapan khusus.',
            'Apabila terdapat persiapan tertentu, tim akan menginformasikannya sebelum pengambilan sampel.',
            'Pasien sebaiknya menyampaikan informasi mengenai obat atau suplemen yang sedang dikonsumsi serta kondisi kesehatan yang relevan.',
            'Jangan menghentikan obat rutin sebelum pemeriksaan kecuali atas arahan dokter.'
        ];
        const prepEn = e.prepBullets || [];
        const prepList = '<ul class="seo-list">' + prepBullets.map((item, i) =>
            '<li><span class="seo-dot" style="background:rgba(216,48,48,0.10)">' + icon('check', 13, BRAND) + '</span>'
            + biTag('span', item, prepEn[i])
            + '</li>'
        ).join('') + '</ul>';

        const faqs = [
            { q: 'Apakah semua pemeriksaan laboratorium dapat dilakukan dari rumah?', a: 'Tidak semua pemeriksaan dapat dilakukan melalui layanan pengambilan sampel di rumah. Ketersediaan bergantung pada jenis pemeriksaan, sampel yang diperlukan, serta layanan laboratorium rekanan.' },
            { q: 'Apakah pemeriksaan laboratorium harus puasa?', a: 'Tidak semua pemeriksaan membutuhkan puasa. Tim akan menginformasikan apabila terdapat persiapan khusus sebelum pengambilan sampel.' },
            { q: 'Apakah pemeriksaan laboratorium dapat dilakukan untuk anak?', a: 'Bisa, sesuai jenis pemeriksaan yang dibutuhkan dan ketersediaan layanan.' },
            { q: 'Apakah beberapa anggota keluarga dapat melakukan pemeriksaan sekaligus?', a: 'Bisa. Informasikan jumlah pasien dan pemeriksaan yang dibutuhkan agar tim dapat mengoordinasikan pelayanan.' }
        ];

        return composeBody([
            sectionHead('Pilih Konsultasi Online atau Dokter ke Rumah', null, e.pathTitle)
            + pathSection,
            sectionHead('Pilihan Pemeriksaan Laboratorium', 'Berbagai jenis sampel dapat diambil langsung di rumah.', e.examTitle, e.examLead)
            + labTiles
            + '<div class="mt-5 max-w-3xl">' + noteLine('Jenis sampel, cara pengambilan, dan persiapan pasien akan disesuaikan dengan pemeriksaan yang direkomendasikan dokter.', e.sampleP2) + '</div>',
            sectionHead('Persiapan Sebelum Pemeriksaan', 'Apakah Perlu Puasa?', e.prepTitle, e.prepLead)
            + '<div class="canva-card rounded-3xl p-6 sm:p-8 max-w-4xl">' + prepList + '</div>',
            sectionHead('Pertanyaan Umum', null, e.faqTitle || 'FAQ')
            + faqBlock(faqs, e.faqs),
            ctaBlock(prefix, waAsk,
                'Butuh Pemeriksaan Laboratorium dari Rumah?',
                'Ceritakan kondisi pasien atau pemeriksaan yang dibutuhkan kepada tim Dokter Panggil. Dokter dapat membantu menentukan pemeriksaan yang sesuai dan tim akan mengoordinasikan pengambilan sampel langsung di rumah.',
                waBook,
                {
                    headlineEn: e.ctaTitle,
                    bodyEn: e.ctaBody,
                    bookLabel: { id: 'Pesan Pemeriksaan Laboratorium', en: e.ctaBook || 'Book Lab Test' },
                    askLabel: { id: 'Konsultasikan dengan Dokter', en: e.ctaAskChat || 'Consult with a Doctor' }
                })
        ]);
    }

    function farmasiBody(prefix, en) {
        const e = en.farmasi || en;
        const waBook = 'Halo, saya ingin pesan obat / layanan farmasi di rumah di Makassar.';
        const waAsk = 'Halo, saya ingin konsultasikan kebutuhan obat di rumah di Makassar.';
        const onlineFlow = ['Konfirmasi Pembayaran', 'Konsultasi Online', 'Resep/Rekomendasi Dokter', 'Konfirmasi Obat', 'Obat Dipersiapkan', 'Diantar ke Rumah'];
        const homeFlow = ['Dokter Datang', 'Pemeriksaan Pasien', 'Resep/Rekomendasi Dokter', 'Konfirmasi Obat', 'Obat Dipersiapkan', 'Diantar ke Rumah'];
        const onlineFlowEn = e.onlineFlow || onlineFlow;
        const homeFlowEn = e.homeFlow || homeFlow;

        const pathSection = stepPathCards([
            { icon: 'message-circle', title: 'Konsultasi Online Dokter', titleEn: e.onlineTitle, flow: onlineFlow, flowEn: onlineFlowEn },
            { icon: 'stethoscope', title: 'Dokter Datang ke Rumah', titleEn: e.homeTitle, flow: homeFlow, flowEn: homeFlowEn }
        ]) + '<div class="mt-5">' + noteLine('Pada kondisi tertentu, dokter dapat merekomendasikan pemeriksaan langsung apabila kondisi pasien tidak cukup dinilai melalui konsultasi online.', e.pathNote) + '</div>';

        const faqs = [
            { q: 'Apakah bisa memesan obat tanpa konsultasi dokter?', a: 'Tidak, pasien dapat berkonsultasi dengan dokter secara online atau melalui kunjungan langsung ke rumah.' },
            { q: 'Apakah semua obat tersedia 24 jam?', a: 'Ketersediaan setiap obat dapat berbeda. Tim akan melakukan pengecekan dan menginformasikan ketersediaan serta estimasi pengantaran sebelum pelayanan dikonfirmasi.' },
            { q: 'Berapa lama obat sampai ke rumah?', a: 'Waktu pengantaran bergantung pada lokasi pasien, ketersediaan obat, dan kondisi pelayanan pada saat pemesanan. Estimasi akan diinformasikan setelah kebutuhan obat dikonfirmasi.' },
            { q: 'Apakah obat untuk anak juga dapat diantar?', a: 'Bisa, sesuai resep atau rekomendasi dokter dan ketersediaan obat.' },
            { q: 'Bagaimana jika obat yang diresepkan tidak tersedia?', a: 'Tim akan menginformasikan ketersediaannya. Apabila diperlukan perubahan terapi atau alternatif obat, keputusan tersebut tetap dikonsultasikan dengan dokter.' }
        ];

        return composeBody([
            pathSection,
            sectionHead('Pertanyaan Umum', null, e.faqTitle || 'FAQ')
            + faqBlock(faqs, e.faqs),
            ctaBlock(prefix, waAsk,
                'Butuh Obat Tanpa Harus Keluar Rumah?',
                'Konsultasikan kondisi pasien dengan dokter atau kirimkan resep yang sudah dimiliki. Tim Dokter Panggil akan membantu mengoordinasikan kebutuhan obat hingga diantar langsung ke rumah.',
                waBook,
                {
                    headlineEn: e.ctaTitle,
                    bodyEn: e.ctaBody,
                    bookLabel: { id: 'Konsultasi bersama Dokter', en: e.ctaBook || 'Consult with a Doctor' },
                    askLabel: { id: 'Chat WhatsApp', en: e.ctaAskChat || 'Chat WhatsApp' }
                })
        ]);
    }

    function medicalCheckUpBody(prefix, en) {
        const e = en.mcu || en;
        const waAsk = 'Halo, saya ingin tanya pilihan paket Medical Check Up di rumah di Makassar.';
        const waBook = 'Halo, saya ingin booking Medical Check Up di rumah di Makassar.';
        const allChecks = [
            { id: 'home', label: 'Home Visit & Pemeriksaan Dokter' },
            { id: 'ekg', label: 'Rekam Jantung (EKG)' },
            { id: 'cbc', label: 'Darah Lengkap (Hematologi)' },
            { id: 'hba1c', label: 'HbA1c' },
            { id: 'gdp', label: 'Glukosa Darah Puasa' },
            { id: 'ua', label: 'Asam Urat' },
            { id: 'chol', label: 'Kolesterol Total' },
            { id: 'hdl', label: 'Kolesterol HDL' },
            { id: 'ldl', label: 'Kolesterol LDL' },
            { id: 'tg', label: 'Trigliserida' },
            { id: 'sgot', label: 'SGOT (AST)' },
            { id: 'sgpt', label: 'SGPT (ALT)' },
            { id: 'cr', label: 'Kreatinin' },
            { id: 'ur', label: 'Urine Rutin' }
        ];
        const checksEn = e.checks || [];

        const packages = [
            {
                name: 'PANEL FIT',
                waName: 'Panel FIT',
                badge: null,
                prices: { gp: 'Rp1.000.000', sp: 'Rp1.230.000', spLabel: 'Spesialis Penyakit Dalam' },
                items: ['home', 'ua', 'gdp', 'chol', 'ldl', 'tg']
            },
            {
                name: 'PANEL PRIMA',
                waName: 'Panel PRIMA',
                badge: 'Paling Populer',
                featured: true,
                prices: { gp: 'Rp1.350.000', sp: 'Rp1.600.000', spLabel: 'Spesialis Penyakit Dalam' },
                items: ['home', 'cbc', 'hba1c', 'ua', 'chol', 'ldl', 'tg']
            },
            {
                name: 'PANEL JANTUNG SEHAT',
                waName: 'Panel Jantung Sehat',
                badge: 'Dengan Pemeriksaan EKG',
                prices: { gp: 'Rp1.750.000', sp: 'Rp1.990.000', spLabel: 'Spesialis Jantung' },
                items: ['home', 'ekg', 'cbc', 'hba1c', 'ua', 'chol', 'ldl', 'tg']
            },
            {
                name: 'PANEL HEALTHY LIFE',
                waName: 'Panel Healthy Life',
                badge: 'Pemeriksaan Paling Lengkap',
                prices: { gp: 'Rp2.090.000', sp: 'Rp2.350.000', spLabel: 'Spesialis Penyakit Dalam' },
                items: ['home', 'ekg', 'cbc', 'gdp', 'chol', 'hdl', 'ldl', 'tg', 'sgot', 'sgpt', 'cr', 'ur', 'ua']
            }
        ];
        const pkgEn = e.packages || [];
        const bookLabel = { id: 'Pesan Sekarang', en: 'Book Now' };

        const toggleBtn = (doc, iconName, label, labelEn, from, fromEn, active) =>
            '<button type="button" class="mcu-toggle-btn" data-mcu-set="' + doc + '" aria-pressed="' + (active ? 'true' : 'false') + '">'
            + '<span class="mcu-toggle-ic">' + icon(iconName, 18, 'currentColor') + '</span>'
            + '<span class="mcu-toggle-text">'
            + biTag('span', label, labelEn, 'class="mcu-toggle-label"')
            + biTag('span', from, fromEn, 'class="mcu-toggle-from"')
            + '</span></button>';
        const fromId = 'mulai ';
        const fromEn = (e.fromLabel || 'from') + ' ';
        const toggle = '<div class="mcu-toggle-wrap">'
            + '<div class="mcu-toggle" role="group" aria-label="Pilih dokter">'
            + toggleBtn('gp', 'stethoscope', 'Dokter Umum', e.toggleGp || 'General Practitioner',
                fromId + packages[0].prices.gp, fromEn + ((pkgEn[0] || {}).gp || packages[0].prices.gp), true)
            + toggleBtn('sp', 'heart-pulse', 'Dokter Spesialis', e.toggleSp || 'Specialist',
                fromId + packages[0].prices.sp, fromEn + ((pkgEn[0] || {}).sp || packages[0].prices.sp), false)
            + '</div></div>';

        const packageCard = (p, i) => {
            const pe = pkgEn[i] || {};
            const priceBlock = (doc, value, valueEn) =>
                '<p class="mcu-price" data-doc="' + doc + '">'
                + biTag('span', value, valueEn || value, 'class="mcu-amt"')
                + '<span class="mcu-ast">*</span></p>';
            const byGp = biTag('p', 'oleh Dokter Umum', (e.byLabel || 'by') + ' ' + (e.toggleGp || 'General Practitioner'), 'class="mcu-by" data-doc="gp"');
            const bySp = biTag('p', 'oleh ' + p.prices.spLabel, (e.byLabel || 'by') + ' ' + (pe.spLabel || p.prices.spLabel), 'class="mcu-by" data-doc="sp"');
            const waText = (doc) => 'Halo, saya ingin booking ' + p.waName + ' Medical Check Up dengan '
                + (doc === 'gp' ? 'Dokter Umum' : p.prices.spLabel) + ' di rumah di Makassar.';
            const cta = (doc) => '<a href="' + esc(waLink(waText(doc))) + '" target="_blank" rel="noopener noreferrer"' + biAttrs(bookLabel.id, bookLabel.en)
                + ' class="mcu-cta" data-doc="' + doc + '">' + bookLabel.id + '</a>';
            const checks = '<ul class="mcu-checks">' + allChecks.map((c, j) => {
                const on = p.items.includes(c.id);
                return '<li class="mcu-check' + (on ? '' : ' is-off') + '">'
                    + '<span class="mcu-check-ic" aria-hidden="true">' + icon(on ? 'check' : 'x', 13, 'currentColor') + '</span>'
                    + biTag('span', c.label, checksEn[j] || c.label, 'class="mcu-check-text"')
                    + '</li>';
            }).join('') + '</ul>';
            const badge = p.badge
                ? biTag('span', p.badge, pe.badge || p.badge, 'class="mcu-badge' + (p.featured ? ' is-hot' : '') + '"')
                : '';
            return '<article class="mcu-card' + (p.featured ? ' is-featured' : '') + '"' + (p.featured ? ' data-mcu-featured' : '') + '>'
                + '<div class="mcu-badge-slot">' + badge + '</div>'
                + biTag('h3', p.name, pe.name || p.name, 'class="mcu-name"')
                + '<div class="mcu-price-wrap">'
                + priceBlock('gp', p.prices.gp, pe.gp)
                + priceBlock('sp', p.prices.sp, pe.sp)
                + byGp + bySp
                + '</div>'
                + '<p class="mcu-count">' + icon('clipboard-check', 14, BRAND)
                + biTag('span', p.items.length + ' item pemeriksaan', p.items.length + ' ' + (e.checksCount || 'items included'))
                + '</p>'
                + cta('gp') + cta('sp')
                + checks
                + '</article>';
        };

        const arrow = (dir, iconName, label) =>
            '<button type="button" class="mcu-arrow" data-mcu-' + dir + ' aria-label="' + esc(label) + '">'
            + icon(iconName, 18, 'currentColor') + '</button>';
        const mcuPricing = '<div id="paket-mcu" class="mcu-pricing" data-mcu-doc="gp">'
            + toggle
            + '<p class="mcu-swipe-hint">' + icon('arrow-left-right', 14, BRAND)
            + biTag('span', 'Geser untuk melihat paket lainnya', e.swipeHint || 'Swipe to see other packages')
            + '</p>'
            + '<div class="mcu-grid">' + packages.map(packageCard).join('') + '</div>'
            + '<div class="mcu-nav">'
            + arrow('prev', 'chevron-left', 'Paket sebelumnya')
            + '<div class="mcu-dots">' + packages.map((p, i) =>
                '<button type="button" class="mcu-dot' + (p.featured ? ' is-active' : '') + '" data-mcu-dot="' + i + '" aria-label="' + esc(p.waName) + '"></button>'
            ).join('') + '</div>'
            + arrow('next', 'chevron-right', 'Paket berikutnya')
            + '</div>'
            + '</div>';

        const howSteps = [
            { n: '01', title: 'Pilih Dokter & Paket MCU', desc: 'Pilih pemeriksaan bersama dokter umum atau Dokter Spesialis, kemudian tentukan Paket MCU yang diinginkan.' },
            { n: '02', title: 'Konfirmasi Jadwal & Biaya', desc: 'Tim mengonfirmasi jadwal pemeriksaan, lokasi pasien, biaya transportasi, serta total biaya pelayanan sebelum booking dikonfirmasi.' },
            { n: '03', title: 'Persiapan Medical Check Up', desc: 'Tim menginformasikan persiapan yang perlu dilakukan sebelum pemeriksaan, termasuk puasa apabila diperlukan sesuai paket.' },
            { n: '04', title: 'Dokter Datang ke Rumah', desc: 'Dokter datang langsung untuk melakukan wawancara medis dan pemeriksaan kondisi kesehatan pasien.' },
            { n: '05', title: 'Pemeriksaan Penunjang', desc: 'Pemeriksaan laboratorium dan pemeriksaan penunjang seperti EKG dilakukan sesuai paket yang dipilih.' },
            { n: '06', title: 'Hasil Pemeriksaan', desc: 'Hasil pemeriksaan laboratorium dan penunjang tersedia sesuai waktu pemrosesan masing-masing pemeriksaan.' },
            { n: '07', title: 'Evaluasi Hasil', desc: 'Hasil dapat dievaluasi bersama dokter untuk membantu memahami kondisi kesehatan pasien dan menentukan tindak lanjut apabila diperlukan.' }
        ];

        const faqs = [
            { q: 'Apakah Medical Check Up dapat dilakukan tanpa kunjungan dokter?', a: 'Tidak. Setiap paket Medical Check Up Dokter Panggil mencakup kunjungan dan pemeriksaan langsung oleh dokter di rumah.' },
            { q: 'Apa perbedaan MCU Dokter Umum dan Spesialis?', a: 'Komponen pemeriksaan pada masing-masing paket sama. Perbedaannya adalah dokter yang melakukan pemeriksaan dan evaluasi, yaitu dokter umum atau Dokter Spesialis Penyakit Dalam.' },
            { q: 'Apakah harga paket sudah termasuk biaya transportasi?', a: 'Belum. Harga paket belum termasuk biaya transportasi. Besarnya biaya transportasi akan diinformasikan berdasarkan lokasi pemeriksaan sebelum booking dikonfirmasi.' },
            { q: 'Apakah harus puasa sebelum Medical Check Up?', a: 'Tergantung paket atau jenis pemeriksaan yang dilakukan. Tim akan menginformasikan persiapan yang diperlukan sebelum kunjungan.' },
            { q: 'Apakah pemeriksaan EKG tersedia pada semua paket?', a: 'Tidak. Pemeriksaan EKG termasuk dalam Panel Jantung Sehat dan Panel Healthy Life.' },
            { q: 'Apakah hasil MCU dapat dikonsultasikan dengan dokter?', a: 'Ya. Hasil pemeriksaan akan dievaluasi bersama dokter untuk membantu memahami hasil dan menentukan tindak lanjut apabila diperlukan.' }
        ];

        return composeBody([
            sectionHead('Paket Medical Check Up', 'Pilih dokter, lalu pilih panel pemeriksaan sesuai kebutuhan Anda.', e.pkgTitle, e.pkgLead)
            + mcuPricing
            + noteLine('*Harga paket belum termasuk biaya transportasi. Biaya transportasi akan diinformasikan berdasarkan lokasi pemeriksaan sebelum booking dikonfirmasi.', e.priceNote)
            + '<div class="canva-card rounded-3xl p-6 sm:p-8 mt-6 max-w-4xl flex flex-col sm:flex-row gap-5 sm:items-center">'
            + '<div class="flex-1">'
            + biTag('h3', 'Belum Tahu Paket yang Sesuai?', e.unsureTitle, 'class="font-bold mb-2"')
            + biTag('p', 'Ceritakan kebutuhan pemeriksaan kesehatan Anda kepada tim Dokter Panggil. Tim akan membantu memberikan informasi mengenai pilihan paket Medical Check Up yang tersedia.', e.unsureBody, 'class="text-sm text-gray-600 leading-relaxed"')
            + '</div>'
            + '<a href="' + esc(waLink(waAsk)) + '" target="_blank" rel="noopener noreferrer"' + biAttrs('Chat WhatsApp', 'Chat WhatsApp') + ' class="inline-flex shrink-0 justify-center px-6 py-3 rounded-full bg-primary text-white text-sm font-semibold hover:scale-105 transition-transform">Chat WhatsApp</a>'
            + '</div>',
            sectionHead('Bagaimana Proses Medical Check Up di Rumah?', 'Dari Booking hingga Evaluasi Hasil', e.howTitle, e.howLead)
            + howStepCards(howSteps, e.howSteps),
            sectionHead('Pertanyaan Umum', null, e.faqTitle || 'FAQ')
            + faqBlock(faqs, e.faqs),
            ctaBlock(prefix, waAsk,
                'Medical Check Up Tanpa Perlu Keluar Rumah',
                'Pilih dokter dan paket Medical Check Up sesuai kebutuhan Anda. Dokter akan datang langsung ke rumah untuk melakukan pemeriksaan, dilengkapi pemeriksaan laboratorium dan penunjang sesuai paket yang dipilih.',
                waBook,
                {
                    headlineEn: e.ctaTitle,
                    bodyEn: e.ctaBody,
                    bookLabel: { id: 'Booking Medical Check Up', en: e.ctaBook || 'Book Medical Check Up' },
                    askLabel: { id: 'Lihat Paket MCU', en: e.ctaAskChat || 'View MCU Packages' },
                    askHref: '#paket-mcu'
                })
        ]);
    }

    function konsultasiOnlineBody(prefix, en) {
        const e = en.ko || en;
        const waAsk = 'Halo, saya ingin bertanya tentang konsultasi online dokter di Makassar.';
        const waBook = 'Halo, saya ingin mulai konsultasi online dokter di Makassar.';
        const specialties = [
            { label: 'Penyakit Dalam', wa: 'Halo, saya ingin konsultasi online Dokter Spesialis Penyakit Dalam di Makassar.' },
            { label: 'Saraf', wa: 'Halo, saya ingin konsultasi online Dokter Spesialis Saraf di Makassar.' },
            { label: 'Jantung', wa: 'Halo, saya ingin konsultasi online Dokter Spesialis Jantung di Makassar.' },
            { label: 'Anak', wa: 'Halo, saya ingin konsultasi online Dokter Spesialis Anak di Makassar.' },
            { label: 'Gizi Klinik', wa: 'Halo, saya ingin konsultasi online Dokter Spesialis Gizi Klinik di Makassar.' },
            { label: 'Psikiatri', wa: 'Halo, saya ingin konsultasi online Dokter Spesialis Psikiatri di Makassar.' },
            { label: 'THT', wa: 'Halo, saya ingin konsultasi online Dokter Spesialis THT di Makassar.' },
            { label: 'Mata', wa: 'Halo, saya ingin konsultasi online Dokter Spesialis Mata di Makassar.' },
            { label: 'Konselor Laktasi', wa: 'Halo, saya ingin konsultasi online Konselor Laktasi di Makassar.' },
            { label: 'Paru', wa: 'Halo, saya ingin konsultasi online Dokter Spesialis Paru di Makassar.' },
            { label: 'Anestesi', wa: 'Halo, saya ingin konsultasi online Dokter Spesialis Anestesi di Makassar.' }
        ];
        const specEn = e.specialties || [];
        const specialtyChips = '<ul class="flex flex-wrap gap-2 mt-3 mb-5">' + specialties.map((s, i) =>
            '<li><a href="' + esc(waLink(s.wa)) + '" target="_blank" rel="noopener noreferrer" class="inline-flex px-3 py-1.5 rounded-full bg-primary/10 text-xs font-semibold text-primary hover:bg-primary/20 transition-colors">'
            + biTag('span', s.label, specEn[i] || s.label)
            + '</a></li>'
        ).join('') + '</ul>';

        const methods = [
            { key: 'chat', icon: 'phone', label: 'Chat / Telepon', labelEn: e.chatTitle || 'Chat / Phone', sub: 'Lewat chat atau telepon', subEn: e.chatSub || 'Via chat or phone call' },
            { key: 'video', icon: 'video', label: 'Video Call', labelEn: e.videoTitle || 'Video Call', sub: 'Tatap muka lewat video', subEn: e.videoSub || 'Face-to-face over video' }
        ];
        const methodRows = (doctor, prices, pricesEn) =>
            '<div class="ko-methods">'
            + biTag('p', 'Pilih cara konsultasi', e.methodPick || 'Choose how to consult', 'class="ko-methods-label"')
            + methods.map(m => {
                const wa = 'Halo, saya ingin konsultasi online dengan ' + doctor + ' via ' + m.label + ' di Makassar.';
                return '<a href="' + esc(waLink(wa)) + '" target="_blank" rel="noopener noreferrer" class="ko-method">'
                    + '<span class="ko-method-ic">' + icon(m.icon, 18, BRAND) + '</span>'
                    + '<span class="ko-method-text">'
                    + biTag('span', m.label, m.labelEn, 'class="ko-method-name"')
                    + biTag('span', m.sub, m.subEn, 'class="ko-method-sub"')
                    + '</span>'
                    + '<span class="ko-method-price">' + biTag('span', prices[m.key], pricesEn[m.key] || prices[m.key]) + '</span>'
                    + '<span class="ko-method-go" aria-hidden="true">' + icon('chevron-right', 16, 'currentColor') + '</span>'
                    + '</a>';
            }).join('')
            + '</div>';

        const doctorCards = '<div id="mulai-konsultasi" class="grid md:grid-cols-2 gap-5">'
            + '<div class="canva-card rounded-3xl p-6 sm:p-8 flex flex-col">'
            + '<div class="w-12 h-12 mb-4 bg-primary/10 rounded-xl flex items-center justify-center">' + icon('stethoscope', 24, BRAND) + '</div>'
            + biTag('h3', 'Dokter Umum', e.gpTitle, 'class="text-xl font-bold mb-2"')
            + biTag('p', 'Konsultasikan berbagai keluhan dan kondisi kesehatan bersama dokter umum secara online.', e.gpP1, 'class="text-sm text-gray-600 leading-relaxed mb-5"')
            + methodRows('Dokter Umum', { chat: 'Rp60.000', video: 'Rp100.000' }, { chat: 'Rp60,000', video: 'Rp100,000' })
            + '</div>'
            + '<div class="canva-card rounded-3xl p-6 sm:p-8 flex flex-col">'
            + '<div class="w-12 h-12 mb-4 bg-primary/10 rounded-xl flex items-center justify-center">' + icon('heart-pulse', 24, BRAND) + '</div>'
            + biTag('h3', 'Dokter Spesialis', e.spTitle, 'class="text-xl font-bold mb-2"')
            + biTag('p', 'Konsultasi online bersama dokter spesialis untuk kondisi yang membutuhkan evaluasi sesuai bidang spesialisasi tertentu.', e.spP1, 'class="text-sm text-gray-600 leading-relaxed"')
            + specialtyChips
            + methodRows('Dokter Spesialis', { chat: 'Rp125.000', video: 'Rp200.000' }, { chat: 'Rp125,000', video: 'Rp200,000' })
            + '</div>'
            + '</div>'
            + '<div class="mt-5 max-w-3xl">' + noteLine('Pembayaran dilakukan terlebih dahulu sebelum sesi konsultasi dimulai.', e.paymentNote) + '</div>';

        const howSteps = [
            { n: '01', title: 'Pilih Dokter', desc: 'Pilih konsultasi bersama dokter umum atau dokter spesialis sesuai kebutuhan.' },
            { n: '02', title: 'Pilih Metode Konsultasi', desc: 'Pilih Chat/Telepon atau Video Call.' },
            { n: '03', title: 'Konfirmasi Dokter, Jadwal & Tarif', desc: 'Tim mengonfirmasi dokter yang dipilih, ketersediaan jadwal, metode konsultasi, serta tarif layanan.' },
            { n: '04', title: 'Lakukan Pembayaran', desc: 'Pasien melakukan pembayaran sesuai layanan yang telah dikonfirmasi.' },
            { n: '05', title: 'Konsultasi Dimulai', desc: 'Setelah pembayaran terkonfirmasi, pasien akan dihubungkan dengan dokter untuk memulai sesi konsultasi sesuai metode yang dipilih.' },
            { n: '06', title: 'Rekomendasi Dokter', desc: 'Dokter memberikan penjelasan dan rekomendasi berdasarkan hasil konsultasi serta kondisi pasien.' }
        ];

        const followLinks = [
            { href: prefix + 'layanan/kunjungan-dokter.html', icon: 'stethoscope', title: 'Kunjungan Dokter', desc: 'Pemeriksaan langsung di rumah apabila dibutuhkan.' },
            { href: prefix + 'layanan/tes-laboratorium.html', icon: 'droplets', title: 'Laboratorium', desc: 'Pengambilan sampel dan pemeriksaan dari rumah.' },
            { href: prefix + 'layanan/farmasi.html', icon: 'pill', title: 'Farmasi', desc: 'Obat dipersiapkan dan diantar ke rumah.' }
        ];
        const followEn = e.followLinks || [];
        const followCards = '<div class="grid sm:grid-cols-3 gap-4">' + followLinks.map((l, i) => {
            const le = followEn[i] || {};
            return '<a href="' + esc(l.href) + '" class="canva-card rounded-2xl p-5 block hover:shadow-lg hover:border-primary/20 transition-all group">'
                + '<div class="w-11 h-11 mb-3 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">' + icon(l.icon, 22, BRAND) + '</div>'
                + biTag('h3', l.title, le.title, 'class="font-bold mb-1 text-sm"')
                + biTag('p', l.desc, le.desc, 'class="text-sm text-gray-500 leading-relaxed"')
                + '</a>';
        }).join('') + '</div>';

        const faqs = [
            { q: 'Apa perbedaan Chat/Telepon dan Video Call?', a: 'Chat/Telepon memungkinkan konsultasi melalui percakapan tertulis atau suara, sedangkan Video Call memungkinkan pasien dan dokter berkomunikasi secara visual selama sesi. Tarif layanan berbeda sesuai metode yang dipilih.' },
            { q: 'Apakah harus melakukan pembayaran sebelum konsultasi?', a: 'Ya. Setelah dokter, metode konsultasi, jadwal, dan tarif dikonfirmasi, pembayaran dilakukan terlebih dahulu sebelum sesi konsultasi dimulai.' },
            { q: 'Apakah saya bisa memilih dokter spesialis?', a: 'Bisa. Pilihan dokter spesialis dan jadwal konsultasi akan disesuaikan dengan kebutuhan pasien serta ketersediaan dokter.' },
            { q: 'Apakah dokter dapat memberikan resep setelah konsultasi online?', a: 'Dokter dapat memberikan resep apabila berdasarkan hasil konsultasi terdapat indikasi dan terapi obat dinilai sesuai dengan kondisi pasien.' },
            { q: 'Bagaimana jika dokter meminta pemeriksaan langsung?', a: 'Apabila diperlukan, pasien dapat melanjutkan dengan kunjungan dokter ke rumah atau pemeriksaan lain sesuai rekomendasi dokter.' }
        ];

        return composeBody([
            sectionHead('Konsultasi Dokter dari Mana Saja', 'Lebih Mudah Mendapatkan Pendapat Dokter', e.introTitle, e.introLead)
            + aboutCard([
                'Konsultasi Online memungkinkan pasien berdiskusi langsung dengan dokter mengenai keluhan, kondisi kesehatan, hasil pemeriksaan, maupun kebutuhan medis lainnya tanpa harus melakukan kunjungan langsung.',
                'Dokter akan melakukan penilaian berdasarkan informasi yang diperoleh selama konsultasi dan memberikan rekomendasi sesuai kondisi pasien.',
                'Pada kondisi tertentu, dokter dapat merekomendasikan pemeriksaan langsung apabila kondisi pasien tidak dapat dinilai secara memadai melalui konsultasi online.'
            ], [e.introP1, e.introP2, e.introP3])
            + noteLine('Sesi konsultasi dimulai setelah pemilihan dokter, metode konsultasi, konfirmasi kesesuaian jadwal, dan pembayaran dikonfirmasi.', e.sessionNote),
            sectionHead('Pilih Dokter Anda', 'Pilih dokter, lalu pilih cara konsultasi: Chat/Telepon atau Video Call.', e.doctorTitle, e.doctorLead)
            + doctorCards,
            sectionHead('Bagaimana Cara Konsultasi Online?', 'Konsultasi dalam Beberapa Langkah', e.howTitle, e.howLead)
            + howStepCards(howSteps, e.howSteps),
            sectionHead('Agar Konsultasi Lebih Efektif', null, e.prepLead)
            + aboutCard([
                'Sebelum sesi dimulai, pasien sebaiknya menyiapkan informasi mengenai keluhan utama, kapan keluhan mulai dirasakan, riwayat penyakit, obat dan suplemen yang sedang digunakan, alergi obat, serta hasil pemeriksaan sebelumnya apabila tersedia.',
                'Untuk Video Call, pasien sebaiknya berada di tempat dengan pencahayaan dan koneksi internet yang memadai.'
            ], [e.prepP1, e.prepP2]),
            sectionHead('Terkoneksi dengan Layanan Lainnya', null, e.connectedTitle)
            + followCards,
            sectionHead('Pertanyaan Umum', null, e.faqTitle || 'FAQ')
            + faqBlock(faqs, e.faqs),
            ctaBlock(prefix, waAsk,
                'Butuh Konsultasi Dokter Tanpa Keluar Rumah?',
                'Pilih dokter umum atau dokter spesialis dan tentukan cara konsultasi yang paling nyaman untuk Anda.',
                waBook,
                {
                    headlineEn: e.ctaTitle,
                    bodyEn: e.ctaBody,
                    bookHref: '#mulai-konsultasi',
                    bookLabel: { id: 'Konsultasi Dokter Umum', en: e.ctaBook || 'GP Consultation' },
                    askLabel: { id: 'Konsultasi Dokter Spesialis', en: e.ctaAskChat || 'Specialist Consultation' },
                    askHref: waLink('Halo, saya ingin konsultasi online dengan Dokter Spesialis di Makassar.')
                })
        ]);
    }

    return { laboratoriumBody, farmasiBody, medicalCheckUpBody, konsultasiOnlineBody };
};
