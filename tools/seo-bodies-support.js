/**
 * Custom SEO landing bodies for support services (lab, farmasi, MCU, konsultasi online).
 * Factory receives helpers from build-seo.js.
 */
module.exports = function createSupportBodies(h) {
    const {
        sectionHead, biTag, biAttrs, icon, esc, waLink, faqBlock, ctaBlock, BRAND,
        composeBody, aboutCard, howStepCards, whyCards,
        pathCards, noteLine, iconInfoCards
    } = h;

    function laboratoriumBody(prefix, en) {
        const e = en.lab || en;
        const waBook = 'Halo, saya ingin pesan pemeriksaan laboratorium di rumah di Makassar.';
        const waAsk = 'Halo, saya ingin konsultasikan kebutuhan laboratorium di rumah di Makassar.';

        const onlineFlow = ['Konsultasi Online', 'Rekomendasi Pemeriksaan', 'Pengambilan Sampel di Rumah', 'Hasil Laboratorium'];
        const homeFlow = ['Dokter Datang', 'Pemeriksaan Pasien', 'Rekomendasi Pemeriksaan', 'Pengambilan Sampel di Rumah', 'Hasil Laboratorium'];
        const onlineFlowEn = e.onlineFlow || ['Online Consultation', 'Test Recommendation', 'Home Sample Collection', 'Lab Results'];
        const homeFlowEn = e.homeFlow || ['Doctor Visit', 'Patient Exam', 'Test Recommendation', 'Home Sample Collection', 'Lab Results'];

        const pathSection = pathCards([
            {
                icon: 'message-circle',
                title: 'Konsultasi Online Dokter', titleEn: e.onlineTitle,
                p1: 'Pasien menyampaikan keluhan dan kondisi kesehatan melalui konsultasi online. Dokter melakukan penilaian dan merekomendasikan pemeriksaan laboratorium apabila diperlukan.',
                p1En: e.onlineP1,
                p2: 'Setelah itu, tim Dokter Panggil mengoordinasikan pengambilan sampel di rumah.',
                p2En: e.onlineP2,
                flow: onlineFlow, flowEn: onlineFlowEn
            },
            {
                icon: 'stethoscope',
                title: 'Dokter Datang ke Rumah', titleEn: e.homeTitle,
                p1: 'Dokter datang langsung untuk melakukan anamnesis dan pemeriksaan fisik pasien. Apabila diperlukan, dokter menentukan pemeriksaan laboratorium yang sesuai dengan kondisi pasien.',
                p1En: e.homeP1,
                p2: 'Tim kemudian mengoordinasikan pengambilan sampel di rumah.',
                p2En: e.homeP2,
                flow: homeFlow, flowEn: homeFlowEn
            }
        ]);

        const examCats = [
            { title: 'Darah Rutin', desc: 'Darah Lengkap • Hemoglobin • Leukosit • Trombosit • dan lainnya', icon: 'droplets' },
            { title: 'Gula Darah & Diabetes', desc: 'Gula Darah • HbA1c • dan pemeriksaan terkait', icon: 'activity' },
            { title: 'Fungsi Hati & Ginjal', desc: 'SGOT • SGPT • Ureum • Kreatinin • dan lainnya', icon: 'heart-pulse' },
            { title: 'Kolesterol & Lemak Darah', desc: 'Kolesterol Total • LDL • HDL • Trigliserida', icon: 'clipboard-check' },
            { title: 'Elektrolit & Metabolik', desc: 'Natrium • Kalium • Klorida • dan pemeriksaan terkait', icon: 'pill' },
            { title: 'Infeksi & Pemeriksaan Khusus', desc: 'Pemeriksaan tertentu sesuai kondisi pasien dan rekomendasi dokter.', icon: 'clipboard-list' }
        ];
        const examCards = iconInfoCards(examCats, e.examCats);

        const sampleTypes = ['Darah', 'Urine', 'Feses', 'Sputum/Dahak'];
        const sampleEn = e.sampleTypes || ['Blood', 'Urine', 'Stool', 'Sputum'];
        const samplePills = '<ul class="flex flex-wrap gap-2 mb-4">' + sampleTypes.map((t, i) =>
            '<li class="inline-flex px-3 py-1.5 rounded-full bg-primary/10 text-xs font-semibold text-primary">'
            + biTag('span', t, sampleEn[i] || t)
            + '</li>'
        ).join('') + '</ul>';

        const howSteps = [
            { n: '01', title: 'Konsultasi Dokter', desc: 'Kondisi pasien dinilai melalui konsultasi online atau kunjungan dokter langsung ke rumah.' },
            { n: '02', title: 'Rekomendasi Pemeriksaan', desc: 'Dokter menentukan pemeriksaan laboratorium yang diperlukan berdasarkan kondisi pasien.' },
            { n: '03', title: 'Konfirmasi Pemeriksaan', desc: 'Tim Dokter Panggil menginformasikan jenis pemeriksaan, biaya, persiapan yang diperlukan, serta rencana pengambilan sampel.' },
            { n: '04', title: 'Pengambilan Sampel di Rumah', desc: 'Petugas dari laboratorium rekanan datang langsung ke lokasi pasien untuk melakukan pengambilan sampel sesuai pemeriksaan yang telah ditentukan.' },
            { n: '05', title: 'Pemeriksaan Laboratorium', desc: 'Sampel diproses oleh laboratorium sesuai jenis pemeriksaan yang dilakukan.' },
            { n: '06', title: 'Hasil Laboratorium', desc: 'Hasil pemeriksaan tersedia sesuai estimasi waktu masing-masing jenis pemeriksaan.' },
            { n: '07', title: 'Evaluasi Dokter', desc: 'Hasil dikonsultasikan kembali dengan dokter untuk membantu memahami hasil pemeriksaan dan menentukan langkah selanjutnya.' }
        ];

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

        const audience = [
            { title: 'Anak & Dewasa', desc: 'Pemeriksaan laboratorium sesuai kondisi dan kebutuhan kesehatan.', icon: 'users', href: null },
            { title: 'Lansia', desc: 'Memudahkan pemeriksaan tanpa perlu bepergian ke laboratorium.', icon: 'heart-handshake', href: null },
            { title: 'Pasien Homecare', desc: 'Mendukung pemantauan kondisi dan evaluasi selama menjalani perawatan di rumah.', icon: 'home', href: null },
            { title: 'Medical Check Up', desc: 'Berbagai pemeriksaan laboratorium sebagai bagian dari evaluasi kesehatan.', icon: 'clipboard-check', href: prefix + 'layanan/pemeriksaan-kesehatan.html' }
        ];
        const audEn = e.audience || [];
        const audienceCards = '<div class="grid sm:grid-cols-2 gap-4">' + audience.map((a, i) => {
            const ae = audEn[i] || {};
            const inner = '<div class="w-11 h-11 mb-3 bg-primary/10 rounded-xl flex items-center justify-center">' + icon(a.icon, 22, BRAND) + '</div>'
                + biTag('h3', a.title, ae.title, 'class="font-bold mb-2 text-sm leading-snug"')
                + biTag('p', a.desc, ae.desc, 'class="text-sm text-gray-600 leading-relaxed"');
            if (a.href) {
                return '<a href="' + esc(a.href) + '" class="canva-card rounded-2xl p-5 block hover:shadow-lg hover:border-primary/20 transition-all group">'
                    + inner
                    + '</a>';
            }
            return '<div class="canva-card rounded-2xl p-5">' + inner + '</div>';
        }).join('') + '</div>';

        const whyItems = [
            { title: 'Pemeriksaan Sesuai Kebutuhan', desc: 'Dokter membantu menentukan pemeriksaan berdasarkan kondisi pasien.' },
            { title: 'Pengambilan Sampel di Rumah', desc: 'Pasien tidak perlu datang langsung ke laboratorium untuk pemeriksaan yang dapat dilakukan dari rumah.' },
            { title: 'Terhubung dengan Dokter', desc: 'Hasil pemeriksaan dapat dilanjutkan dengan evaluasi dokter apabila diperlukan.' },
            { title: 'Terintegrasi dengan Layanan Homecare', desc: 'Apabila diperlukan penanganan lebih lanjut, pelayanan dapat dikoordinasikan dengan layanan medis lainnya.' }
        ];

        const faqs = [
            { q: 'Apakah semua pemeriksaan laboratorium dapat dilakukan dari rumah?', a: 'Tidak semua pemeriksaan dapat dilakukan melalui layanan pengambilan sampel di rumah. Ketersediaan bergantung pada jenis pemeriksaan, sampel yang diperlukan, serta layanan laboratorium rekanan.' },
            { q: 'Apakah pemeriksaan laboratorium harus puasa?', a: 'Tidak semua pemeriksaan membutuhkan puasa. Tim akan menginformasikan apabila terdapat persiapan khusus sebelum pengambilan sampel.' },
            { q: 'Apakah pemeriksaan laboratorium dapat dilakukan untuk anak?', a: 'Bisa, sesuai jenis pemeriksaan yang dibutuhkan dan ketersediaan layanan.' },
            { q: 'Apakah beberapa anggota keluarga dapat melakukan pemeriksaan sekaligus?', a: 'Bisa. Informasikan jumlah pasien dan pemeriksaan yang dibutuhkan agar tim dapat mengoordinasikan pelayanan.' }
        ];

        return composeBody([
            sectionHead('Pemeriksaan Laboratorium dari Rumah', 'Tidak Perlu Datang ke Laboratorium', e.introTitle, e.introLead)
            + aboutCard([
                'Dokter Panggil membantu mengoordinasikan kebutuhan pemeriksaan laboratorium pasien langsung dari rumah.',
                'Dokter dapat melakukan penilaian melalui konsultasi online atau kunjungan langsung ke rumah untuk menentukan pemeriksaan yang diperlukan sesuai kondisi pasien.',
                'Setelah pemeriksaan ditentukan, pengambilan sampel akan dikoordinasikan dengan laboratorium rekanan untuk dilakukan langsung di lokasi pasien.',
                'Mulai dari konsultasi dokter, pengambilan sampel, hingga evaluasi hasil dapat dikoordinasikan langsung dari rumah.'
            ], [e.introP1, e.introP2, e.introP3, e.introP4]),
            sectionHead('Pilih Konsultasi Online atau Dokter ke Rumah', 'Pasien dapat memilih konsultasi online atau kunjungan dokter langsung ke rumah sesuai kondisi dan kebutuhan.', e.pathTitle, e.pathLead)
            + pathSection,
            sectionHead('Pilihan Pemeriksaan Laboratorium', 'Berbagai Pemeriksaan Laboratorium dari Rumah', e.examTitle, e.examLead)
            + examCards,
            sectionHead('Berbagai Jenis Sampel', 'Tidak Hanya Pemeriksaan Darah', e.sampleTitle, e.sampleLead)
            + '<div class="canva-card rounded-3xl p-6 sm:p-8 max-w-4xl">'
            + biTag('p', 'Sesuai jenis pemeriksaan yang diperlukan, pemeriksaan laboratorium dapat menggunakan berbagai jenis sampel seperti:', e.sampleP1, 'class="text-gray-600 leading-relaxed mb-4"')
            + samplePills
            + biTag('p', 'Jenis sampel, cara pengambilan, dan persiapan pasien akan disesuaikan dengan pemeriksaan yang dilakukan.', e.sampleP2, 'class="text-sm text-gray-500 leading-relaxed"')
            + '</div>',
            sectionHead('Bagaimana Prosesnya?', 'Dari Konsultasi hingga Hasil Laboratorium', e.howTitle, e.howLead)
            + howStepCards(howSteps, e.howSteps),
            sectionHead('Persiapan Sebelum Pemeriksaan', 'Apakah Perlu Puasa?', e.prepTitle, e.prepLead)
            + '<div class="canva-card rounded-3xl p-6 sm:p-8 max-w-4xl">' + prepList + '</div>',
            sectionHead('Kapan Hasil Laboratorium Keluar?', 'Waktu Hasil Sesuai Jenis Pemeriksaan', e.resultsTitle, e.resultsLead)
            + aboutCard([
                'Waktu penyelesaian hasil dapat berbeda pada setiap pemeriksaan. Beberapa pemeriksaan dapat tersedia lebih cepat, sementara pemeriksaan tertentu membutuhkan waktu pemrosesan lebih lama.',
                'Estimasi waktu hasil akan diinformasikan sesuai jenis pemeriksaan dan laboratorium rekanan.'
            ], [e.resultsP1, e.resultsP2]),
            sectionHead('Laboratorium di Rumah untuk Berbagai Kebutuhan', null, e.audienceTitle)
            + audienceCards,
            sectionHead('Mengapa Laboratorium melalui Dokter Panggil?', null, e.whyTitle)
            + whyCards(whyItems, e.whyItems, ['clipboard-check', 'home', 'stethoscope', 'heart-handshake']),
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
        const waConsult = 'Halo, saya ingin konsultasi dengan dokter tentang kebutuhan obat di Makassar.';

        const onlineFlow = ['Konsultasi Online', 'Resep/Rekomendasi Dokter', 'Obat Dipersiapkan', 'Diantar ke Rumah'];
        const homeFlow = ['Dokter Datang', 'Pemeriksaan Pasien', 'Resep/Rekomendasi Dokter', 'Obat Dipersiapkan', 'Diantar ke Rumah'];
        const onlineFlowEn = e.onlineFlow || ['Online Consultation', 'Prescription / Doctor Recommendation', 'Medicine Prepared', 'Delivered Home'];
        const homeFlowEn = e.homeFlow || ['Doctor Visit', 'Patient Exam', 'Prescription / Doctor Recommendation', 'Medicine Prepared', 'Delivered Home'];

        const pathSection = pathCards([
            {
                icon: 'message-circle',
                title: 'Konsultasi Online Dokter', titleEn: e.onlineTitle,
                p1: 'Pasien dapat berkonsultasi dengan dokter secara online mengenai keluhan dan kondisi kesehatan yang dialami.',
                p1En: e.onlineP1,
                p2: 'Apabila berdasarkan hasil konsultasi dokter memberikan terapi atau meresepkan obat, kebutuhan obat akan dipersiapkan dan diantar langsung ke lokasi pasien.',
                p2En: e.onlineP2,
                flow: onlineFlow, flowEn: onlineFlowEn
            },
            {
                icon: 'stethoscope',
                title: 'Dokter Datang ke Rumah', titleEn: e.homeTitle,
                p1: 'Dokter datang langsung ke rumah untuk melakukan anamnesis dan pemeriksaan kondisi pasien.',
                p1En: e.homeP1,
                p2: 'Apabila pasien membutuhkan obat, dokter akan menentukan terapi sesuai hasil pemeriksaan. Obat kemudian dipersiapkan dan diantar ke lokasi pasien.',
                p2En: e.homeP2,
                flow: homeFlow, flowEn: homeFlowEn
            }
        ]) + noteLine('Pada kondisi tertentu, dokter dapat merekomendasikan pemeriksaan langsung apabila kondisi pasien tidak cukup dinilai melalui konsultasi online.', e.pathNote);

        const howSteps = [
            { n: '01', title: 'Konsultasi Dokter', desc: 'Kondisi pasien dinilai melalui konsultasi online atau kunjungan dokter langsung ke rumah.' },
            { n: '02', title: 'Dokter Menentukan Terapi', desc: 'Dokter menentukan terapi dan obat yang diperlukan berdasarkan hasil penilaian kondisi pasien.' },
            { n: '03', title: 'Konfirmasi Obat', desc: 'Tim mengonfirmasi kebutuhan obat, ketersediaan, biaya, serta informasi yang diperlukan sebelum pengiriman.' },
            { n: '04', title: 'Obat Dipersiapkan', desc: 'Obat dipersiapkan sesuai resep atau rekomendasi dokter.' },
            { n: '05', title: 'Obat Diantar ke Rumah', desc: 'Obat kemudian dikirim langsung ke lokasi pasien.' },
            { n: '06', title: 'Penggunaan Sesuai Anjuran', desc: 'Pasien menggunakan obat sesuai dosis, cara penggunaan, dan petunjuk yang diberikan.' }
        ];

        const whyItems = [
            { title: 'Terhubung dengan Dokter', desc: 'Kebutuhan obat dapat ditentukan setelah penilaian kondisi pasien oleh dokter.' },
            { title: 'Konsultasi Online atau di Rumah', desc: 'Pasien dapat memilih konsultasi sesuai kebutuhan dan kondisi.' },
            { title: 'Obat Diantar ke Rumah', desc: 'Kebutuhan obat dipersiapkan dan dikirim langsung ke lokasi pasien.' },
            { title: 'Terintegrasi dengan Homecare', desc: 'Pengobatan dapat dikoordinasikan bersama pelayanan medis dan perawatan pasien di rumah.' }
        ];

        const faqs = [
            { q: 'Apakah bisa memesan obat tanpa konsultasi dokter?', a: 'Tidak, pasien dapat berkonsultasi dengan dokter secara online atau melalui kunjungan langsung ke rumah.' },
            { q: 'Apakah semua obat tersedia 24 jam?', a: 'Ketersediaan setiap obat dapat berbeda. Tim akan melakukan pengecekan dan menginformasikan ketersediaan serta estimasi pengantaran sebelum pelayanan dikonfirmasi.' },
            { q: 'Berapa lama obat sampai ke rumah?', a: 'Waktu pengantaran bergantung pada lokasi pasien, ketersediaan obat, dan kondisi pelayanan pada saat pemesanan. Estimasi akan diinformasikan setelah kebutuhan obat dikonfirmasi.' },
            { q: 'Apakah obat untuk anak juga dapat diantar?', a: 'Bisa, sesuai resep atau rekomendasi dokter dan ketersediaan obat.' },
            { q: 'Bagaimana jika obat yang diresepkan tidak tersedia?', a: 'Tim akan menginformasikan ketersediaannya. Apabila diperlukan perubahan terapi atau alternatif obat, keputusan tersebut tetap dikonsultasikan dengan dokter.' }
        ];

        return composeBody([
            sectionHead('Dari Konsultasi hingga Obat Tiba di Rumah', 'Tidak Perlu Keluar Rumah untuk Mencari Obat', e.introTitle, e.introLead)
            + aboutCard([
                'Dokter Panggil membantu pasien mendapatkan obat yang diperlukan setelah penilaian kondisi oleh dokter.',
                'Konsultasi dapat dilakukan secara online atau melalui kunjungan dokter langsung ke rumah. Setelah dokter menentukan terapi yang sesuai, kebutuhan obat akan dipersiapkan dan diantar langsung ke lokasi pasien.',
                'Mulai dari konsultasi dokter hingga obat tiba di rumah, kebutuhan pengobatan pasien dapat dikoordinasikan dalam satu layanan.'
            ], [e.introP1, e.introP2, e.introP3]),
            sectionHead('Pilih Konsultasi Online atau Dokter ke Rumah', 'Pilih Layanan Sesuai Kondisi Pasien', e.pathTitle, e.pathLead)
            + pathSection,
            sectionHead('Bagaimana Proses Layanan Farmasi?', 'Dari Pemeriksaan hingga Obat Diantar', e.howTitle, e.howLead)
            + howStepCards(howSteps, e.howSteps),
            sectionHead('Belum Memiliki Resep?', 'Konsultasikan Kondisi dengan Dokter', e.noRxTitle, e.noRxLead)
            + '<div class="canva-card rounded-3xl p-6 sm:p-8 max-w-4xl">'
            + biTag('p', 'Tidak perlu menentukan obat sendiri.', e.noRxP1, 'class="font-semibold text-gray-800 mb-3"')
            + biTag('p', 'Ceritakan keluhan, riwayat kesehatan, serta obat yang sedang digunakan kepada dokter. Dokter akan melakukan penilaian dan menentukan terapi yang sesuai apabila diperlukan.', e.noRxP2, 'class="text-gray-600 leading-relaxed mb-5"')
            + biTag('p', 'Pasien dapat memilih konsultasi online atau dokter datang ke rumah.', e.noRxP3, 'class="text-sm text-gray-500 leading-relaxed mb-5"')
            + '<div class="flex flex-col sm:flex-row gap-3">'
            + '<a href="' + esc(prefix + 'layanan/konsultasi-online.html') + '"' + biAttrs('Konsultasi Online', e.noRxCtaOnline || 'Online Consultation') + ' class="inline-flex justify-center px-6 py-3 rounded-full bg-primary text-white text-sm font-semibold hover:scale-105 transition-transform">Konsultasi Online</a>'
            + '<a href="' + esc(waLink(waConsult)) + '" target="_blank" rel="noopener noreferrer"' + biAttrs('Chat WhatsApp', 'Chat WhatsApp') + ' class="inline-flex justify-center px-6 py-3 rounded-full border-2 border-primary text-primary text-sm font-semibold hover:bg-primary/5 transition-colors">Chat WhatsApp</a>'
            + '</div></div>',
            sectionHead('Mengapa Layanan Farmasi melalui Dokter Panggil?', null, e.whyTitle)
            + whyCards(whyItems, e.whyItems, ['stethoscope', 'message-circle', 'home', 'heart-handshake']),
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
        const waGp = 'Halo, saya ingin booking Medical Check Up dengan Dokter Umum di rumah di Makassar.';
        const waSp = 'Halo, saya ingin booking Medical Check Up dengan Spesialis Penyakit Dalam di rumah di Makassar.';

        const doctorCards = '<div class="grid md:grid-cols-2 gap-5">'
            + '<div class="canva-card rounded-3xl p-6 sm:p-8 flex flex-col">'
            + '<div class="w-12 h-12 mb-4 bg-primary/10 rounded-xl flex items-center justify-center">' + icon('stethoscope', 24, BRAND) + '</div>'
            + biTag('h3', 'Dokter Umum', e.gpTitle, 'class="text-xl font-bold mb-2"')
            + biTag('p', 'Pemeriksaan kesehatan langsung di rumah bersama dokter umum untuk evaluasi kesehatan secara umum dan berkala.', e.gpDesc, 'class="text-sm text-gray-600 leading-relaxed mb-4 flex-1"')
            + biTag('p', 'Mulai Rp1.000.000*', e.gpPrice, 'class="text-lg font-bold text-primary mb-4"')
            + '<a href="' + esc(waLink(waGp)) + '" target="_blank" rel="noopener noreferrer"' + biAttrs('Pesan Sekarang', 'Book Now') + ' class="inline-flex justify-center px-6 py-3 rounded-full bg-primary text-white text-sm font-semibold hover:scale-105 transition-transform">Pesan Sekarang</a>'
            + '</div>'
            + '<div class="canva-card rounded-3xl p-6 sm:p-8 flex flex-col">'
            + '<div class="w-12 h-12 mb-4 bg-primary/10 rounded-xl flex items-center justify-center">' + icon('heart-pulse', 24, BRAND) + '</div>'
            + biTag('h3', 'Dokter Spesialis Penyakit Dalam', e.spTitle, 'class="text-xl font-bold mb-2"')
            + biTag('p', 'Pemeriksaan kesehatan langsung di rumah bersama Dokter Spesialis untuk evaluasi kesehatan yang lebih mendalam.', e.spDesc, 'class="text-sm text-gray-600 leading-relaxed mb-4 flex-1"')
            + biTag('p', 'Mulai Rp1.230.000*', e.spPrice, 'class="text-lg font-bold text-primary mb-4"')
            + '<a href="' + esc(waLink(waSp)) + '" target="_blank" rel="noopener noreferrer"' + biAttrs('Pesan Sekarang', 'Book Now') + ' class="inline-flex justify-center px-6 py-3 rounded-full bg-primary text-white text-sm font-semibold hover:scale-105 transition-transform">Pesan Sekarang</a>'
            + '</div>'
            + '</div>';

        const packages = [
            {
                name: 'PANEL FIT',
                badge: null,
                prices: [
                    { label: 'Dokter Umum', value: 'Rp1.000.000*' },
                    { label: 'Spesialis Penyakit Dalam', value: 'Rp1.230.000*' }
                ],
                items: ['Home Visit & Pemeriksaan Dokter', 'Asam Urat', 'Glukosa Darah Puasa', 'Kolesterol Total', 'Kolesterol LDL', 'Trigliserida'],
                cta: 'Pesan Sekarang',
                wa: 'Halo, saya ingin booking Panel FIT Medical Check Up di rumah di Makassar.'
            },
            {
                name: 'PANEL PRIMA',
                badge: 'Pemeriksaan Lebih Lengkap',
                prices: [
                    { label: 'Dokter Umum', value: 'Rp1.350.000*' },
                    { label: 'Spesialis Penyakit Dalam', value: 'Rp1.600.000*' }
                ],
                items: ['Home Visit & Pemeriksaan Dokter', 'Darah Lengkap', 'HbA1c', 'Asam Urat', 'Kolesterol Total', 'Kolesterol LDL', 'Trigliserida'],
                cta: 'Pesan Sekarang',
                wa: 'Halo, saya ingin booking Panel PRIMA Medical Check Up di rumah di Makassar.'
            },
            {
                name: 'PANEL JANTUNG SEHAT',
                badge: 'Dengan Pemeriksaan EKG',
                prices: [
                    { label: 'Dokter Umum', value: 'Rp1.750.000*' },
                    { label: 'Spesialis Jantung', value: 'Rp1.990.000*' }
                ],
                items: ['Home Visit & Pemeriksaan Dokter', 'Rekam Jantung (EKG)', 'Darah Lengkap', 'HbA1c', 'Asam Urat', 'Kolesterol Total', 'Kolesterol LDL', 'Trigliserida'],
                cta: 'Pesan Sekarang',
                wa: 'Halo, saya ingin booking Panel Jantung Sehat Medical Check Up di rumah di Makassar.'
            },
            {
                name: 'PANEL HEALTHY LIFE',
                badge: 'Pemeriksaan Paling Lengkap',
                prices: [
                    { label: 'Dokter Umum', value: 'Rp2.090.000*' },
                    { label: 'Spesialis Penyakit Dalam', value: 'Rp2.350.000*' }
                ],
                items: [
                    'Home Visit & Pemeriksaan Dokter', 'Rekam Jantung (EKG)', 'Hematologi Lengkap', 'Glukosa Darah Puasa',
                    'Kolesterol Total', 'Kolesterol HDL', 'Kolesterol LDL', 'Trigliserida',
                    'SGOT (AST)', 'SGPT (ALT)', 'Kreatinin', 'Urine Rutin', 'Asam Urat'
                ],
                cta: 'Pesan Sekarang',
                wa: 'Halo, saya ingin booking Panel Healthy Life Medical Check Up di rumah di Makassar.'
            }
        ];
        const pkgEn = e.packages || [];
        const packageCards = '<div id="paket-mcu" class="grid sm:grid-cols-2 gap-5">' + packages.map((p, i) => {
            const pe = pkgEn[i] || {};
            const priceRows = p.prices.map((pr, j) => {
                const pre = (pe.prices && pe.prices[j]) || {};
                return '<div class="flex justify-between gap-3 text-sm py-1.5 border-b border-gray-100 last:border-0">'
                    + biTag('span', pr.label, pre.label, 'class="text-gray-600 min-w-0"')
                    + biTag('span', pr.value, pre.value || pr.value, 'class="font-semibold text-primary shrink-0"')
                    + '</div>';
            }).join('');
            const itemList = '<ul class="mt-4 space-y-1.5 mb-5">' + p.items.map((it, j) =>
                '<li class="flex gap-2 text-sm text-gray-600">'
                + '<span class="shrink-0 mt-0.5">' + icon('check', 14, BRAND) + '</span>'
                + biTag('span', it, (pe.items && pe.items[j]) || it)
                + '</li>'
            ).join('') + '</ul>';
            return '<div class="canva-card rounded-3xl p-6 sm:p-8 flex flex-col">'
                + (p.badge || pe.badge
                    ? '<div class="mb-2">' + biTag('span', p.badge || '', pe.badge || p.badge, 'class="inline-block text-xs font-semibold text-primary bg-primary/10 px-2.5 py-1 rounded-full"') + '</div>'
                    : '')
                + biTag('h3', p.name, pe.name || p.name, 'class="text-xl font-bold mb-3"')
                + '<div class="mb-2">' + priceRows + '</div>'
                + biTag('p', 'Pemeriksaan:', pe.examLabel || 'Includes:', 'class="text-xs font-semibold uppercase tracking-wide text-gray-400 mt-3"')
                + itemList
                + '<a href="' + esc(waLink(p.wa)) + '" target="_blank" rel="noopener noreferrer"' + biAttrs('Pesan Sekarang', 'Book Now') + ' class="mt-auto inline-flex justify-center px-6 py-3 rounded-full bg-primary text-white text-sm font-semibold hover:scale-105 transition-transform">Pesan Sekarang</a>'
                + '</div>';
        }).join('') + '</div>';

        const howSteps = [
            { n: '01', title: 'Pilih Dokter & Paket MCU', desc: 'Pilih pemeriksaan bersama dokter umum atau Dokter Spesialis, kemudian tentukan Paket MCU yang diinginkan.' },
            { n: '02', title: 'Konfirmasi Jadwal & Biaya', desc: 'Tim mengonfirmasi jadwal pemeriksaan, lokasi pasien, biaya transportasi, serta total biaya pelayanan sebelum booking dikonfirmasi.' },
            { n: '03', title: 'Persiapan Medical Check Up', desc: 'Tim menginformasikan persiapan yang perlu dilakukan sebelum pemeriksaan, termasuk puasa apabila diperlukan sesuai paket.' },
            { n: '04', title: 'Dokter Datang ke Rumah', desc: 'Dokter datang langsung untuk melakukan wawancara medis dan pemeriksaan kondisi kesehatan pasien.' },
            { n: '05', title: 'Pemeriksaan Penunjang', desc: 'Pemeriksaan laboratorium dan pemeriksaan penunjang seperti EKG dilakukan sesuai paket yang dipilih.' },
            { n: '06', title: 'Hasil Pemeriksaan', desc: 'Hasil pemeriksaan laboratorium dan penunjang tersedia sesuai waktu pemrosesan masing-masing pemeriksaan.' },
            { n: '07', title: 'Evaluasi Hasil', desc: 'Hasil dapat dievaluasi bersama dokter untuk membantu memahami kondisi kesehatan pasien dan menentukan tindak lanjut apabila diperlukan.' }
        ];

        const prepBullets = [
            'Beberapa Paket Medical Check Up mencakup pemeriksaan glukosa darah puasa sehingga membutuhkan persiapan sebelum pemeriksaan.',
            'Tim Dokter Panggil akan menginformasikan persiapan sesuai paket yang dipilih sebelum kunjungan.',
            'Pasien juga sebaiknya menyiapkan informasi mengenai obat dan suplemen yang sedang digunakan, riwayat penyakit, alergi, serta hasil pemeriksaan kesehatan sebelumnya apabila tersedia.',
            'Jangan menghentikan obat rutin sebelum pemeriksaan kecuali atas arahan dokter.'
        ];
        const prepEn = e.prepBullets || [];
        const prepList = '<ul class="seo-list">' + prepBullets.map((item, i) =>
            '<li><span class="seo-dot" style="background:rgba(216,48,48,0.10)">' + icon('check', 13, BRAND) + '</span>'
            + biTag('span', item, prepEn[i])
            + '</li>'
        ).join('') + '</ul>';

        const whyItems = [
            { title: 'Dokter Datang ke Rumah', desc: 'Tidak perlu datang ke klinik atau rumah sakit untuk memulai pemeriksaan.' },
            { title: 'Pilih Dokter Anda', desc: 'Tersedia pilihan pemeriksaan bersama dokter umum atau Dokter Spesialis.' },
            { title: 'Paket Pemeriksaan Lengkap', desc: 'Pilih Paket FIT, PRIMA, Jantung Sehat, atau Healthy Life sesuai kebutuhan pemeriksaan.' },
            { title: 'Terintegrasi dengan Layanan Medis', desc: 'Apabila diperlukan tindak lanjut, pasien dapat terhubung dengan layanan medis Dokter Panggil lainnya.' }
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
            sectionHead('Medical Check Up Langsung di Rumah', 'Lebih dari Sekadar Pemeriksaan Laboratorium', e.introTitle, e.introLead)
            + '<div class="canva-card rounded-3xl p-6 sm:p-8 max-w-4xl">'
            + biTag('p', 'Medical Check Up Dokter Panggil dimulai dengan kunjungan dokter langsung ke rumah untuk melakukan wawancara medis dan pemeriksaan kondisi kesehatan pasien.', e.introP1, 'class="text-gray-600 leading-relaxed mb-4"')
            + biTag('p', 'Pemeriksaan kemudian dilengkapi dengan pemeriksaan laboratorium dan pemeriksaan penunjang sesuai paket yang dipilih.', e.introP2, 'class="text-gray-600 leading-relaxed mb-4"')
            + biTag('p', 'Hasil pemeriksaan dapat dievaluasi bersama dokter untuk membantu memahami kondisi kesehatan dan menentukan langkah selanjutnya apabila diperlukan.', e.introP3, 'class="text-gray-600 leading-relaxed mb-4"')
            + biTag('p', 'Dokter datang. Pemeriksaan dilakukan dari rumah. Hasil dievaluasi secara medis.', e.introP4, 'class="text-gray-600 leading-relaxed font-medium"')
            + '</div>',
            sectionHead('Pilih Dokter untuk Medical Check Up', 'Pilih Pemeriksaan Bersama Dokter Umum atau Dokter Spesialis', e.doctorTitle, e.doctorLead)
            + doctorCards
            + noteLine('*Harga paket belum termasuk biaya transportasi.', e.priceNoteShort),
            sectionHead('Paket Medical Check Up', 'Pilih panel pemeriksaan sesuai kebutuhan Anda.', e.pkgTitle, e.pkgLead)
            + packageCards
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
            sectionHead('Persiapan Sebelum Medical Check Up', 'Apa yang Perlu Dipersiapkan?', e.prepTitle, e.prepLead)
            + '<div class="canva-card rounded-3xl p-6 sm:p-8 max-w-4xl">' + prepList + '</div>',
            sectionHead('Medical Check Up 24 Jam', 'Medical Check Up dari Rumah, Sesuai Waktu Anda', e.hoursTitle, e.hoursLead)
            + aboutCard([
                'Tim Dokter Panggil dapat dihubungi 24 jam untuk membantu kebutuhan Medical Check Up di rumah.',
                'Jadwal pemeriksaan akan dikonfirmasi berdasarkan pilihan dokter, paket MCU, lokasi pasien, dan ketersediaan pelayanan.'
            ], [e.hoursP1, e.hoursP2]),
            sectionHead('Mengapa MCU bersama Dokter Panggil?', null, e.whyTitle)
            + whyCards(whyItems, e.whyItems, ['home', 'users', 'clipboard-check', 'heart-handshake']),
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
        const waGp = 'Halo, saya ingin konsultasi online dengan Dokter Umum di Makassar.';
        const waSp = 'Halo, saya ingin konsultasi online dengan Dokter Spesialis di Makassar.';
        const waChat = 'Halo, saya ingin konsultasi online via Chat/Telepon di Makassar.';
        const waVideo = 'Halo, saya ingin konsultasi online via Video Call di Makassar.';

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
            { label: 'Paru', wa: 'Halo, saya ingin konsultasi online Dokter Spesialis Paru di Makassar.' }
        ];
        const specEn = e.specialties || [];
        const specialtyChips = '<ul class="flex flex-wrap gap-2 mt-4">' + specialties.map((s, i) =>
            '<li><a href="' + esc(waLink(s.wa)) + '" target="_blank" rel="noopener noreferrer" class="inline-flex px-3 py-1.5 rounded-full bg-primary/10 text-xs font-semibold text-primary hover:bg-primary/20 transition-colors">'
            + biTag('span', s.label, specEn[i] || s.label)
            + '</a></li>'
        ).join('') + '</ul>';

        const doctorCards = '<div id="mulai-konsultasi" class="grid md:grid-cols-2 gap-5">'
            + '<div class="canva-card rounded-3xl p-6 sm:p-8 flex flex-col">'
            + '<div class="w-12 h-12 mb-4 bg-primary/10 rounded-xl flex items-center justify-center">' + icon('stethoscope', 24, BRAND) + '</div>'
            + biTag('h3', 'Dokter Umum', e.gpTitle, 'class="text-xl font-bold mb-3"')
            + biTag('p', 'Konsultasikan berbagai keluhan dan kondisi kesehatan bersama dokter umum secara online.', e.gpP1, 'class="text-sm text-gray-600 leading-relaxed mb-3"')
            + biTag('p', 'Dokter akan menggali keluhan, riwayat kesehatan, serta informasi lain yang diperlukan untuk membantu menilai kondisi pasien.', e.gpP2, 'class="text-sm text-gray-600 leading-relaxed mb-5 flex-1"')
            + '<a href="' + esc(waLink(waGp)) + '" target="_blank" rel="noopener noreferrer"' + biAttrs('Pesan Sekarang', 'Book Now') + ' class="inline-flex justify-center px-6 py-3 rounded-full bg-primary text-white text-sm font-semibold hover:scale-105 transition-transform">Pesan Sekarang</a>'
            + '</div>'
            + '<div class="canva-card rounded-3xl p-6 sm:p-8 flex flex-col">'
            + '<div class="w-12 h-12 mb-4 bg-primary/10 rounded-xl flex items-center justify-center">' + icon('heart-pulse', 24, BRAND) + '</div>'
            + biTag('h3', 'Dokter Spesialis', e.spTitle, 'class="text-xl font-bold mb-3"')
            + biTag('p', 'Konsultasi online bersama dokter spesialis untuk kondisi yang membutuhkan evaluasi sesuai bidang spesialisasi tertentu.', e.spP1, 'class="text-sm text-gray-600 leading-relaxed mb-3"')
            + biTag('p', 'Pasien dapat memilih dokter spesialis sesuai kebutuhan dan ketersediaan jadwal.', e.spP2, 'class="text-sm text-gray-600 leading-relaxed mb-3"')
            + biTag('p', 'Bisa pilih langsung sesuai bidang:', e.spFieldsLead, 'class="text-sm font-semibold text-gray-700 mt-2"')
            + specialtyChips
            + '<a href="' + esc(waLink(waSp)) + '" target="_blank" rel="noopener noreferrer"' + biAttrs('Pesan Sekarang', 'Book Now') + ' class="mt-5 inline-flex justify-center px-6 py-3 rounded-full bg-primary text-white text-sm font-semibold hover:scale-105 transition-transform">Pesan Sekarang</a>'
            + '</div>'
            + '</div>';

        const methodCards = '<div class="grid md:grid-cols-2 gap-5">'
            + '<div class="canva-card rounded-3xl p-6 sm:p-8 flex flex-col">'
            + '<div class="w-12 h-12 mb-4 bg-primary/10 rounded-xl flex items-center justify-center">' + icon('phone', 24, BRAND) + '</div>'
            + biTag('h3', 'Chat / Telepon', e.chatTitle, 'class="text-xl font-bold mb-3"')
            + biTag('p', 'Konsultasi dengan dokter melalui percakapan chat atau telepon untuk membahas kondisi dan kebutuhan kesehatan pasien.', e.chatP1, 'class="text-sm text-gray-600 leading-relaxed mb-3"')
            + biTag('p', 'Cocok untuk: keluhan yang dapat dijelaskan melalui percakapan, konsultasi hasil pemeriksaan, pertanyaan mengenai terapi, atau tindak lanjut kondisi tertentu.', e.chatP2, 'class="text-sm text-gray-600 leading-relaxed mb-4 flex-1"')
            + biTag('p', 'Mulai Rp60.000', e.chatPrice, 'class="text-lg font-bold text-primary mb-4"')
            + '<a href="' + esc(waLink(waChat)) + '" target="_blank" rel="noopener noreferrer"' + biAttrs('Pesan Sekarang', 'Book Now') + ' class="inline-flex justify-center px-6 py-3 rounded-full bg-primary text-white text-sm font-semibold hover:scale-105 transition-transform">Pesan Sekarang</a>'
            + '</div>'
            + '<div class="canva-card rounded-3xl p-6 sm:p-8 flex flex-col">'
            + '<div class="w-12 h-12 mb-4 bg-primary/10 rounded-xl flex items-center justify-center">' + icon('video', 24, BRAND) + '</div>'
            + biTag('h3', 'Video Call', e.videoTitle, 'class="text-xl font-bold mb-3"')
            + biTag('p', 'Konsultasi secara langsung melalui video bersama dokter, sehingga komunikasi antara pasien dan dokter dapat berlangsung secara visual dan lebih interaktif.', e.videoP1, 'class="text-sm text-gray-600 leading-relaxed mb-4 flex-1"')
            + biTag('p', 'Mulai Rp100.000', e.videoPrice, 'class="text-lg font-bold text-primary mb-4"')
            + '<a href="' + esc(waLink(waVideo)) + '" target="_blank" rel="noopener noreferrer"' + biAttrs('Pesan Sekarang', 'Book Now') + ' class="inline-flex justify-center px-6 py-3 rounded-full bg-primary text-white text-sm font-semibold hover:scale-105 transition-transform">Pesan Sekarang</a>'
            + '</div>'
            + '</div>';

        const tariffRows = [
            { role: 'Dokter Umum', chat: 'Rp60.000', video: 'Rp100.000' },
            { role: 'Dokter Spesialis', chat: 'Rp125.000', video: 'Rp200.000' }
        ];
        const tariffEn = e.tariffRows || [];
        const tariffCards = '<div class="grid sm:grid-cols-2 gap-4 mb-4">' + tariffRows.map((r, i) => {
            const re = tariffEn[i] || {};
            return '<div class="canva-card rounded-2xl p-5 sm:p-6">'
                + biTag('h3', r.role, re.role, 'class="font-bold mb-4"')
                + '<div class="space-y-3">'
                + '<div class="flex justify-between gap-3 text-sm"><span class="text-gray-500 min-w-0"' + biAttrs('Chat / Telepon', e.tariffChatLabel || 'Chat / Phone') + '>Chat / Telepon</span>'
                + biTag('span', r.chat, re.chat || r.chat, 'class="font-semibold text-primary shrink-0"') + '</div>'
                + '<div class="flex justify-between gap-3 text-sm"><span class="text-gray-500 min-w-0"' + biAttrs('Video Call', e.tariffVideoLabel || 'Video Call') + '>Video Call</span>'
                + biTag('span', r.video, re.video || r.video, 'class="font-semibold text-primary shrink-0"') + '</div>'
                + '</div></div>';
        }).join('') + '</div>'
            + noteLine('Pembayaran dilakukan terlebih dahulu sebelum sesi konsultasi dimulai.', e.paymentNote);

        const howSteps = [
            { n: '01', title: 'Pilih Dokter', desc: 'Pilih konsultasi bersama dokter umum atau dokter spesialis sesuai kebutuhan.' },
            { n: '02', title: 'Pilih Metode Konsultasi', desc: 'Pilih Chat/Telepon atau Video Call.' },
            { n: '03', title: 'Konfirmasi Dokter, Jadwal & Tarif', desc: 'Tim mengonfirmasi dokter yang dipilih, ketersediaan jadwal, metode konsultasi, serta tarif layanan.' },
            { n: '04', title: 'Lakukan Pembayaran', desc: 'Pasien melakukan pembayaran sesuai layanan yang telah dikonfirmasi.' },
            { n: '05', title: 'Konsultasi Dimulai', desc: 'Setelah pembayaran terkonfirmasi, pasien akan dihubungkan dengan dokter untuk memulai sesi konsultasi sesuai metode yang dipilih.' },
            { n: '06', title: 'Rekomendasi Dokter', desc: 'Dokter memberikan penjelasan dan rekomendasi berdasarkan hasil konsultasi serta kondisi pasien.' }
        ];

        const topics = [
            { title: 'Keluhan Kesehatan', desc: 'Diskusikan gejala atau keluhan yang sedang dialami bersama dokter.', icon: 'activity' },
            { title: 'Hasil Pemeriksaan', desc: 'Konsultasikan hasil laboratorium atau pemeriksaan kesehatan yang sudah dimiliki.', icon: 'clipboard-check' },
            { title: 'Pengobatan & Terapi', desc: 'Diskusikan penggunaan obat, perkembangan terapi, atau kebutuhan tindak lanjut sesuai penilaian dokter.', icon: 'pill' },
            { title: 'Second Opinion', desc: 'Diskusikan kondisi atau hasil pemeriksaan untuk mendapatkan penilaian medis tambahan.', icon: 'message-circle' },
            { title: 'Follow-up Kondisi', desc: 'Melanjutkan evaluasi kondisi setelah konsultasi atau perawatan sebelumnya.', icon: 'clock' }
        ];
        const topicCards = iconInfoCards(topics, e.topics);

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

        const whyItems = [
            { title: 'Dokter Umum & Spesialis', desc: 'Pilih dokter sesuai kebutuhan konsultasi.' },
            { title: 'Pilih Cara Konsultasi', desc: 'Tersedia Chat/Telepon atau Video Call.' },
            { title: 'Terhubung dengan Homecare', desc: 'Apabila diperlukan pemeriksaan langsung, pelayanan dapat dilanjutkan dengan kunjungan ke rumah.' },
            { title: 'Obat Dapat Diantar', desc: 'Kebutuhan obat berdasarkan resep dokter dapat dikoordinasikan untuk diantar ke rumah.' }
        ];

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
            sectionHead('Pilih Dokter Anda', 'Konsultasi dengan Dokter Umum atau Dokter Spesialis', e.doctorTitle, e.doctorLead)
            + doctorCards,
            sectionHead('Pilih Cara Konsultasi', 'Chat/Telepon atau Video Call', e.methodTitle, e.methodLead)
            + biTag('p', 'Pilih metode konsultasi yang paling nyaman sesuai kebutuhan Anda.', e.methodSub, 'class="text-gray-600 leading-relaxed mb-6 max-w-3xl"')
            + methodCards,
            sectionHead('Tarif Konsultasi Online', 'Pilihan Konsultasi', e.tariffTitle, e.tariffLead)
            + tariffCards,
            sectionHead('Bagaimana Cara Konsultasi Online?', 'Konsultasi dalam Beberapa Langkah', e.howTitle, e.howLead)
            + howStepCards(howSteps, e.howSteps),
            sectionHead('Apa yang Bisa Dikonsultasikan?', 'Konsultasikan Berbagai Kebutuhan Kesehatan', e.topicsTitle, e.topicsLead)
            + topicCards,
            sectionHead('Persiapkan Sebelum Konsultasi', 'Agar Konsultasi Lebih Efektif', e.prepTitle, e.prepLead)
            + aboutCard([
                'Sebelum sesi dimulai, pasien sebaiknya menyiapkan informasi mengenai keluhan utama, kapan keluhan mulai dirasakan, riwayat penyakit, obat dan suplemen yang sedang digunakan, alergi obat, serta hasil pemeriksaan sebelumnya apabila tersedia.',
                'Untuk Video Call, pasien sebaiknya berada di tempat dengan pencahayaan dan koneksi internet yang memadai.'
            ], [e.prepP1, e.prepP2]),
            sectionHead('Jika Dokter Membutuhkan Pemeriksaan Langsung', 'Butuh Pemeriksaan Lebih Lanjut?', e.followTitle, e.followLead)
            + aboutCard([
                'Tidak semua kondisi dapat dinilai atau ditangani hanya melalui konsultasi online.',
                'Apabila dokter menilai pasien membutuhkan pemeriksaan fisik, pemeriksaan laboratorium, tindakan medis, atau evaluasi lebih lanjut, dokter dapat memberikan rekomendasi pelayanan yang sesuai.',
                'Jika diperlukan, tim Dokter Panggil dapat membantu mengoordinasikan kunjungan dokter ke rumah, pemeriksaan laboratorium, obat, maupun layanan homecare lainnya.',
                'Dari konsultasi online hingga pelayanan langsung di rumah, kebutuhan pasien dapat dikoordinasikan dalam satu layanan.'
            ], [e.followP1, e.followP2, e.followP3, e.followP4])
            + followCards,
            sectionHead('Bagaimana dengan Resep & Obat?', 'Jika Dokter Meresepkan Obat', e.rxTitle, e.rxLead)
            + '<div class="canva-card rounded-3xl p-6 sm:p-8 max-w-4xl">'
            + biTag('p', 'Apabila berdasarkan hasil konsultasi dokter memberikan resep atau merekomendasikan obat, pasien dapat melanjutkan kebutuhan obat melalui layanan farmasi Dokter Panggil.', e.rxP1, 'class="text-gray-600 leading-relaxed mb-3"')
            + biTag('p', 'Obat dapat dipersiapkan dan diantar langsung ke rumah pasien sesuai ketersediaan dan ketentuan pelayanan.', e.rxP2, 'class="text-gray-600 leading-relaxed mb-4"')
            + biTag('p', 'Online Consultation → Resep → Farmasi → Obat Sampai Rumah.', e.rxFlow, 'class="text-sm font-semibold text-primary mb-5"')
            + '<a href="' + esc(prefix + 'layanan/farmasi.html') + '"' + biAttrs('Lihat Layanan Farmasi', e.rxCta || 'View Pharmacy Service') + ' class="inline-flex px-6 py-3 rounded-full bg-primary text-white text-sm font-semibold hover:scale-105 transition-transform">Lihat Layanan Farmasi</a>'
            + '</div>',
            sectionHead('Mengapa Konsultasi Online melalui Dokter Panggil?', null, e.whyTitle)
            + whyCards(whyItems, e.whyItems, ['users', 'phone', 'home', 'pill']),
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
                    askHref: waLink(waSp)
                })
        ]);
    }

    return { laboratoriumBody, farmasiBody, medicalCheckUpBody, konsultasiOnlineBody };
};
