/**
 * Content for the standalone SEO landing pages.
 *
 * This file is ADDITIVE. It never feeds the homepage -- that keeps reading
 * services-data.js. Here we only store the extra, page-only content that
 * makes each landing page worth indexing on its own.
 *
 * Build with:   node tools/build-seo.js
 * Then check:   node tools/verify-seo.js
 *
 * ADDING A SERVICE:
 *   1. Add it to SERVICES in services-data.js and run tools/build-services.js
 *      (that updates homepage footer links).
 *   2. Add a matching entry to SERVICE_SEO below, keyed by the same slug, then
 *      run tools/build-seo.js to get its landing page.
 *   A service without a SERVICE_SEO entry simply gets no landing page and is
 *   left out of the link lists, so nothing breaks if you only do step 1.
 *
 * Rules for editing:
 *   - No prices, response times, patient counts, or licence numbers unless the
 *     business can actually back them up.
 *   - `published: false` pages render with noindex and stay out of sitemap.xml.
 *     Flip to true only once the specific data on the page is verified.
 */
(function (root, factory) {
    const api = factory();
    if (typeof module === 'object' && module.exports) module.exports = api;
    else Object.keys(api).forEach(k => { root[k] = api[k]; });
})(typeof self !== 'undefined' ? self : this, function () {

    /** Change SITE_URL if the site is published on another domain. */
    const SITE = {
        url: 'https://dokterpanggil.id',
        name: 'DokterPanggil.id',
        legalName: 'CV. Mentari Kasih Indonesia',
        phone: '0811-4677-700',
        phoneSchema: '+62-811-4677-700',
        email: 'dokterpanggil.id@gmail.com',
        hours: '24 jam',
        opens: '00:00',
        closes: '23:59',
        waNumber: '628114677700',
        instagram: 'https://www.instagram.com/dokterpanggil.id/',
        tiktok: 'https://www.tiktok.com/@dokterpanggil',
        address: 'Jl. Letnan Jenderal Hertasning No. 110, Bonto Makkio, Rappocini, Makassar, Sulawesi Selatan 90222',
        cities: ['Makassar']
    };

    /** Verified, watermark-free Unsplash photo IDs already used on this site. */
    const IMG = {
        dokter: 'photo-1758691462321-9b6c98c40f7e',
        perawat: 'photo-1749065312519-1902cb8431ae',
        lab: 'photo-1631815588090-d4bfec5b1ccb',
        fisio: 'photo-1649751361457-01d3a696c7e6',
        vaksin: 'photo-1576765608622-067973a79f53',
        lansia: 'photo-1765896387387-0538bc9f997e',
        luka: 'photo-1559123633-d373e3384f08',
        checkup: 'photo-1631815590058-860e4f83c1e8'
    };

    /**
     * Page-only expansion per service, keyed by the slug in services-data.js.
     * The generator merges this with the shared service data at build time.
     */
    const SERVICE_SEO = {
        'kunjungan-dokter': {
            // Form D1 — hero wording dari client
            h1: 'Dokter Umum 24 Jam ke Rumah',
            metaTitle: 'Dokter Umum 24 Jam ke Rumah | DokterPanggil.id',
            metaDesc: 'Butuh pemeriksaan dokter tanpa harus pergi ke rumah sakit atau klinik? Dokter umum siap datang ke rumah 24 jam untuk anak, dewasa, dan lansia di Makassar.',
            lead: 'Butuh pemeriksaan dokter tanpa harus pergi ke rumah sakit atau klinik? Dokter umum siap datang ke rumah untuk melakukan pemeriksaan, memberikan penanganan awal, dan membantu menentukan perawatan selanjutnya sesuai kondisi pasien.',
            heroChips: [
                { id: 'Tersedia 24 Jam', en: 'Available 24 Hours' },
                { id: 'Dokter Datang ke Rumah', en: 'Doctor Comes to Your Home' },
                { id: 'Untuk Anak, Dewasa, dan Lansia', en: 'For Children, Adults, and Elderly' }
            ],
            ctaBook: { id: 'Panggil Dokter Sekarang', en: 'Call a Doctor Now' },
            ctaAsk: { id: 'Tanya via WhatsApp', en: 'Ask via WhatsApp' }
        },

        'perawatan-rumah': {
            // Form — Perawat Homecare (hero wording dari client)
            h1: 'Pendampingan Perawat Profesional langsung di Rumah',
            metaTitle: 'Perawat Homecare ke Rumah | DokterPanggil.id',
            metaDesc: 'Pendampingan perawat profesional di rumah berdasarkan rekomendasi dan supervisi dokter. Pemantauan, perawatan, dan koordinasi medis di Makassar.',
            lead: 'Perawat profesional hadir langsung di rumah untuk mendampingi, memantau kondisi, dan membantu kebutuhan perawatan pasien berdasarkan rekomendasi serta di bawah supervisi dokter.',
            heroChips: [
                { id: 'Perawat Profesional', en: 'Professional Nurses' },
                { id: 'Di Bawah Supervisi Dokter', en: 'Under Doctor Supervision' },
                { id: 'Pendampingan Sesuai Kebutuhan', en: 'Care Matched to Your Needs' }
            ],
            ctaBook: { id: 'Konsultasikan Kebutuhan Pasien', en: 'Discuss Patient Needs' },
            ctaAsk: { id: 'Chat WhatsApp', en: 'Chat WhatsApp' },


        },

        'tes-laboratorium': {
            // Form — Laboratorium 24 jam di Rumah
            h1: 'Laboratorium 24 jam di Rumah',
            metaTitle: 'Laboratorium 24 jam di Rumah | DokterPanggil.id',
            metaDesc: 'Pemeriksaan laboratorium dengan pengambilan sampel di rumah melalui laboratorium rekanan Dokter Panggil di Makassar.',
            lead: 'Layanan pemeriksaan laboratorium dengan pengambilan sampel langsung di rumah melalui laboratorium rekanan Dokter Panggil. Kebutuhan pemeriksaan dapat dikonsultasikan melalui konsultasi online dengan dokter atau kunjungan dokter langsung ke rumah.',
            heroChips: [
                { id: 'Layanan 24 Jam', en: '24-Hour Service' },
                { id: 'Pengambilan Sampel di Rumah', en: 'Sample Collection at Home' },
                { id: 'Terhubung dengan Dokter', en: 'Connected to a Doctor' }
            ],
            ctaBook: { id: 'Pesan Pemeriksaan Laboratorium', en: 'Book Lab Test' },
            ctaAsk: { id: 'Konsultasikan dengan Dokter', en: 'Consult with a Doctor' },


        },

        
        'vaksinasi': {
            // Form — Vaksinasi di Rumah
            h1: 'Vaksinasi di Rumah',
            metaTitle: 'Vaksinasi di Rumah | DokterPanggil.id',
            metaDesc: 'Vaksinasi anak dan dewasa di rumah oleh dokter, dengan pemeriksaan sebelum vaksin dan booking untuk memastikan ketersediaan di Makassar.',
            lead: 'Layanan vaksinasi langsung di rumah untuk anak maupun dewasa, dengan pemeriksaan kondisi kesehatan sebelum vaksinasi dan pemantauan setelah pemberian vaksin.',
            heroChips: [
                { id: 'Pemeriksaan Sebelum Vaksinasi', en: 'Exam Before Vaccination' },
                { id: 'Vaksinasi Langsung oleh Dokter', en: 'Vaccination by a Doctor' },
                { id: 'Anak & Dewasa', en: 'Children & Adults' }
            ],
            ctaBook: { id: 'Booking Vaksinasi', en: 'Book Vaccination' },
            ctaAsk: { id: 'Tanya via WhatsApp', en: 'Ask via WhatsApp' },


        },

        'perawatan-lansia': {
            // Form — Rawat Inap di Rumah (hero wording dari client)
            h1: 'Perawatan Lebih Lengkap, Langsung di Rumah',
            metaTitle: 'Rawat Inap di Rumah | DokterPanggil.id',
            metaDesc: 'Rawat inap di rumah dengan dokter, perawat, obat, lab, dan tindakan medis terkoordinasi. Berdasarkan penilaian dokter di Makassar.',
            lead: 'Layanan perawatan medis di rumah bagi pasien yang membutuhkan pemantauan dan perawatan berkelanjutan, dengan dokter, perawat, obat, pemeriksaan, dan kebutuhan medis lainnya yang terkoordinasi sesuai kondisi pasien.',
            heroChips: [
                { id: 'Berdasarkan Penilaian Dokter', en: 'Based on Doctor Assessment' },
                { id: 'Pemantauan oleh Tim Medis', en: 'Monitored by Medical Team' },
                { id: 'Perawatan Terkoordinasi di Rumah', en: 'Coordinated Care at Home' }
            ],
            ctaBook: { id: 'Konsultasikan Kondisi Pasien', en: 'Discuss Patient Condition' },
            ctaAsk: { id: 'Chat WhatsApp', en: 'Chat WhatsApp' },


        },

        'perawatan-luka': {
            // Form — Perawatan Luka di Rumah
            h1: 'Perawatan Luka',
            metaTitle: 'Perawatan Luka di Rumah | DokterPanggil.id',
            metaDesc: 'Perawatan luka di rumah oleh dokter atau perawat, dengan penilaian kondisi luka dan rencana perawatan berdasarkan rekomendasi dokter di Makassar.',
            lead: 'Perawatan luka langsung di rumah oleh dokter atau perawat, dengan penilaian kondisi luka dan rencana perawatan berdasarkan rekomendasi dokter.',
            heroChips: [
                { id: 'Perawatan Berdasarkan Rekomendasi Dokter', en: 'Care Based on Doctor Recommendation' },
                { id: 'Dokter atau Perawat ke Rumah', en: 'Doctor or Nurse to Your Home' },
                { id: 'Monitoring Perkembangan Luka', en: 'Wound Progress Monitoring' }
            ],
            ctaBook: { id: 'Booking Perawatan Luka', en: 'Book Wound Care' },
            ctaAsk: { id: 'Konsultasikan Kondisi Luka', en: 'Discuss Wound Condition' },


        },

        'pemeriksaan-kesehatan': {
            // Form — Medical Check Up di Rumah
            h1: 'Medical Check Up di Rumah',
            metaTitle: 'Medical Check Up di Rumah | DokterPanggil.id',
            metaDesc: 'Pemeriksaan kesehatan di rumah bersama dokter umum atau spesialis, dilengkapi laboratorium dan penunjang sesuai paket di Makassar.',
            lead: 'Pemeriksaan kesehatan langsung di rumah bersama Dokter umum atau Dokter Spesialis, dilengkapi pemeriksaan laboratorium dan pemeriksaan penunjang sesuai paket yang dipilih.',
            heroChips: [
                { id: 'Pemeriksaan Langsung oleh Dokter', en: 'Exam by a Doctor' },
                { id: 'Dokter Umum & Dokter Spesialis', en: 'GP & Specialists' },
                { id: 'Pemeriksaan Penunjang dari Rumah', en: 'Supporting Tests at Home' }
            ],
            ctaBook: { id: 'Lihat Paket Medical Check Up', en: 'View MCU Packages' },
            ctaAsk: { id: 'Tanya Pilihan Paket', en: 'Ask About Packages' },
            ctaBookHref: '#paket-mcu',


        },
        'kunjungan-dokter-spesialis': {
            // Form D2 — hero wording dari client
            h1: 'Dokter Spesialis ke Rumah',
            metaTitle: 'Dokter Spesialis ke Rumah | DokterPanggil.id',
            metaDesc: 'Dapatkan pemeriksaan dan konsultasi dokter spesialis langsung di rumah. Tim Dokter Panggil membantu mengoordinasikan jadwal kunjungan di Makassar.',
            lead: 'Dapatkan pemeriksaan dan konsultasi bersama dokter spesialis sesuai kebutuhan pasien tanpa harus pergi ke rumah sakit. Tim Dokter Panggil membantu mengoordinasikan jadwal kunjungan dokter langsung ke rumah.',
            heroChips: [
                { id: 'Berbagai Dokter Spesialis', en: 'Multiple Specialists' },
                { id: 'Kunjungan Langsung ke Rumah', en: 'Home Visit' },
                { id: 'Jadwal Dikoordinasikan untuk Anda', en: 'Schedule Coordinated for You' }
            ],
            ctaBook: { id: 'Temukan Dokter Spesialis', en: 'Find a Specialist' },
            ctaAsk: { id: 'Konsultasikan Kebutuhan', en: 'Discuss Your Needs' },
            ctaBookHref: '../dokter/index.html?cat=spesialis#temukan-dokter',


        },
        'konsultasi-online': {
            // Form — Konsultasi Dokter Online
            h1: 'Konsultasi Dokter, Langsung dari Mana Saja',
            metaTitle: 'Konsultasi Dokter Online | DokterPanggil.id',
            metaDesc: 'Konsultasi dokter umum atau spesialis via Chat/Telepon atau Video Call tanpa datang ke fasilitas kesehatan di Makassar.',
            lead: 'Konsultasikan kondisi kesehatan bersama Dokter Umum atau Dokter Spesialis tanpa perlu datang ke fasilitas kesehatan. Pilih konsultasi melalui Chat/Telepon atau Video Call sesuai kebutuhan Anda.',
            heroChips: [
                { id: 'Dokter Umum & Spesialis', en: 'GP & Specialists' },
                { id: 'Chat, Telepon & Video Call', en: 'Chat, Phone & Video Call' },
                { id: 'Tanpa Perlu Keluar Rumah', en: 'No Need to Leave Home' }
            ],
            ctaBook: { id: 'Mulai Konsultasi', en: 'Start Consultation' },
            ctaAsk: { id: 'Chat WhatsApp', en: 'Chat WhatsApp' },
            ctaBookHref: '#mulai-konsultasi',


        },
        'tindakan-medis': {
            // Form D4 — hub tindakan medis
            h1: 'Tindakan Medis, Langsung di Rumah Anda',
            metaTitle: 'Tindakan Medis di Rumah | DokterPanggil.id',
            metaDesc: 'Infus, nebulizer, perawatan luka, kateter, dan tindakan medis lainnya di rumah berdasarkan rekomendasi dokter di Makassar.',
            lead: 'Berbagai tindakan medis dan keperawatan dapat dilakukan langsung di rumah oleh dokter maupun perawat, berdasarkan rekomendasi dokter serta sesuai kondisi dan kebutuhan pasien.',
            heroChips: [
                { id: 'Berdasarkan Rekomendasi Dokter', en: 'Based on Doctor Recommendation' },
                { id: 'Dokter & Perawat Profesional', en: 'Professional Doctors & Nurses' },
                { id: 'Tindakan Langsung di Rumah', en: 'Procedures at Home' }
            ],
            ctaBook: { id: 'Pilih Tindakan Medis', en: 'Choose a Procedure' },
            ctaAsk: { id: 'Konsultasikan Kebutuhan', en: 'Discuss Your Needs' },
            ctaBookHref: '#pilih-tindakan',


        },

        'terapi-nebulizer': {
            // Form D8 — Terapi Nebulizer di Rumah
            h1: 'Terapi Nebulizer di Rumah',
            metaTitle: 'Terapi Nebulizer di Rumah | DokterPanggil.id',
            metaDesc: 'Terapi nebulizer di rumah berdasarkan rekomendasi dokter. Obat, dosis, dan pemantauan disesuaikan kondisi pasien di Makassar.',
            lead: 'Layanan terapi nebulizer langsung di rumah untuk membantu pemberian obat melalui saluran pernapasan, berdasarkan hasil penilaian dan rekomendasi dokter sesuai kondisi pasien.',
            heroChips: [
                { id: 'Berdasarkan Rekomendasi Dokter', en: 'Based on Doctor Recommendation' },
                { id: 'Obat Sesuai Kondisi Pasien', en: 'Medicine Matched to Patient Needs' },
                { id: 'Dokter atau Perawat ke Rumah', en: 'Doctor or Nurse to Your Home' }
            ],
            ctaBook: { id: 'Konsultasikan Kondisi Pasien', en: 'Discuss Patient Condition' },
            ctaAsk: { id: 'Hubungi Dokter Panggil', en: 'Contact Dokter Panggil' },


        },

        'pemasangan-ngt': {
            // Form — Pemasangan Selang Makan (NGT)
            h1: 'Pemasangan Selang Makan',
            metaTitle: 'Pemasangan Selang Makan (NGT) di Rumah | DokterPanggil.id',
            metaDesc: 'Pemasangan atau penggantian NGT di rumah oleh dokter atau perawat berdasarkan rekomendasi dokter di Makassar.',
            lead: 'Layanan pemasangan selang makan atau Nasogastric Tube (NGT) langsung di rumah oleh dokter atau perawat, berdasarkan hasil penilaian dan rekomendasi dokter sesuai kondisi serta kebutuhan pasien.',
            heroChips: [
                { id: 'Berdasarkan Rekomendasi Dokter', en: 'Based on Doctor Recommendation' },
                { id: 'Dokter atau Perawat ke Rumah', en: 'Doctor or Nurse to Your Home' },
                { id: 'Pemeriksaan Sebelum Tindakan', en: 'Exam Before Procedure' }
            ],
            ctaBook: { id: 'Booking Pemasangan NGT', en: 'Book NGT Placement' },
            ctaAsk: { id: 'Konsultasikan Kondisi Pasien', en: 'Discuss Patient Condition' },


        },

        'pemasangan-kateter': {
            // Form — Pemasangan Kateter Urin di Rumah
            h1: 'Pemasangan Kateter Urin di Rumah',
            metaTitle: 'Pemasangan Kateter Urin di Rumah | DokterPanggil.id',
            metaDesc: 'Pemasangan atau penggantian kateter urin di rumah oleh dokter atau perawat berdasarkan rekomendasi dokter di Makassar.',
            lead: 'Layanan pemasangan dan penggantian kateter urin langsung di rumah oleh dokter atau perawat, berdasarkan hasil penilaian dan rekomendasi dokter sesuai kondisi serta kebutuhan pasien.',
            heroChips: [
                { id: 'Berdasarkan Rekomendasi Dokter', en: 'Based on Doctor Recommendation' },
                { id: 'Dokter atau Perawat ke Rumah', en: 'Doctor or Nurse to Your Home' },
                { id: 'Pemeriksaan Sebelum Tindakan', en: 'Exam Before Procedure' }
            ],
            ctaBook: { id: 'Booking Pemasangan Kateter', en: 'Book Catheter Placement' },
            ctaAsk: { id: 'Konsultasikan Kondisi Pasien', en: 'Discuss Patient Condition' },


        },

        'suction': {
            // Form — Suction / Sedot Dahak di Rumah
            h1: 'Suction / Sedot Dahak di Rumah',
            metaTitle: 'Suction / Sedot Dahak di Rumah | DokterPanggil.id',
            metaDesc: 'Suction atau sedot dahak di rumah oleh dokter atau perawat berdasarkan penilaian dan rekomendasi dokter di Makassar.',
            lead: 'Layanan suction atau sedot dahak langsung di rumah oleh dokter atau perawat untuk membantu mengeluarkan sekret dari jalan napas pada kondisi tertentu, berdasarkan hasil penilaian dan rekomendasi dokter.',
            heroChips: [
                { id: 'Berdasarkan Rekomendasi Dokter', en: 'Based on Doctor Recommendation' },
                { id: 'Dokter atau Perawat ke Rumah', en: 'Doctor or Nurse to Your Home' },
                { id: 'Pemantauan Kondisi Pasien', en: 'Patient Condition Monitoring' }
            ],
            ctaBook: { id: 'Booking Layanan Suction', en: 'Book Suction Service' },
            ctaAsk: { id: 'Konsultasikan Kondisi Pasien', en: 'Discuss Patient Condition' },


        },

        'terapi-oksigen': {
            // Form D7 — Terapi Oksigen di Rumah
            h1: 'Terapi Oksigen di Rumah',
            metaTitle: 'Terapi Oksigen di Rumah | DokterPanggil.id',
            metaDesc: 'Terapi oksigen di rumah berdasarkan penilaian dokter, dengan pemantauan saturasi dan peralatan sesuai kebutuhan di Makassar.',
            lead: 'Layanan pemberian terapi oksigen langsung di rumah berdasarkan hasil penilaian dan rekomendasi dokter, sesuai kondisi serta kebutuhan oksigen pasien.',
            heroChips: [
                { id: 'Berdasarkan Rekomendasi Dokter', en: 'Based on Doctor Recommendation' },
                { id: 'Pemantauan Kondisi Pasien', en: 'Patient Condition Monitoring' },
                { id: 'Tenaga Medis Datang ke Rumah', en: 'Medical Staff Come to Your Home' }
            ],
            ctaBook: { id: 'Konsultasikan Kondisi Pasien', en: 'Discuss Patient Condition' },
            ctaAsk: { id: 'Hubungi Dokter Panggil', en: 'Contact Dokter Panggil' },


        },

        'terapi-infus': {
            // Form D5 — Terapi Infus di Rumah
            h1: 'Terapi Infus di Rumah',
            metaTitle: 'Terapi Infus di Rumah | DokterPanggil.id',
            metaDesc: 'Terapi infus di rumah oleh dokter atau perawat berdasarkan penilaian dan rekomendasi dokter. Cairan, obat, dan kit medis dipersiapkan di Makassar.',
            lead: 'Layanan terapi infus langsung di rumah oleh dokter atau perawat, berdasarkan hasil penilaian dan rekomendasi dokter sesuai kondisi serta kebutuhan medis pasien.',
            heroChips: [
                { id: 'Berdasarkan Rekomendasi Dokter', en: 'Based on Doctor Recommendation' },
                { id: 'Dokter & Perawat Profesional', en: 'Professional Doctors & Nurses' },
                { id: 'Obat & Kebutuhan Medis Dipersiapkan', en: 'Medicine & Supplies Prepared' }
            ],
            ctaBook: { id: 'Konsultasikan Kondisi Pasien', en: 'Discuss Patient Condition' },
            ctaAsk: { id: 'Chat WhatsApp', en: 'Chat WhatsApp' },


        },
        'infus-vitamin': {
            // Form — Infus Vitamin di Rumah
            h1: 'Infus Vitamin di Rumah',
            metaTitle: 'Infus Vitamin di Rumah | DokterPanggil.id',
            metaDesc: 'Infus vitamin di rumah dengan pilihan dokter atau perawat. Pemeriksaan dulu, rekomendasi vitamin oleh dokter di Makassar.',
            lead: 'Layanan infus vitamin langsung di rumah dengan pilihan kunjungan dokter atau perawat, disertai pemeriksaan sebelum terapi dan rekomendasi vitamin oleh dokter sesuai kondisi serta kebutuhan pasien.',
            heroChips: [
                { id: 'Pemeriksaan Sebelum Terapi', en: 'Exam Before Therapy' },
                { id: 'Rekomendasi oleh Dokter', en: 'Doctor Recommendation' },
                { id: 'Dokter atau Perawat ke Rumah', en: 'Doctor or Nurse to Your Home' }
            ],
            ctaBook: { id: 'Booking Infus Vitamin', en: 'Book Vitamin Infusion' },
            ctaAsk: { id: 'Tanya Tim Dokter Panggil', en: 'Ask the Dokter Panggil Team' },


        },
        'farmasi': {
            // Form — Layanan Farmasi 24 jam di Rumah
            h1: 'Layanan Farmasi 24 jam di Rumah',
            metaTitle: 'Farmasi 24 jam di Rumah | DokterPanggil.id',
            metaDesc: 'Obat setelah konsultasi online atau kunjungan dokter, dipersiapkan dan diantar langsung ke rumah di Makassar.',
            lead: 'Kebutuhan obat pasien dapat dilayani langsung dari rumah setelah konsultasi online atau kunjungan dokter. Obat yang diresepkan akan dipersiapkan dan diantar langsung ke lokasi pasien.',
            heroChips: [
                { id: 'Layanan 24 Jam', en: '24-Hour Service' },
                { id: 'Berdasarkan Resep & Rekomendasi Dokter', en: 'Based on Prescription & Doctor Advice' },
                { id: 'Obat Diantar ke Rumah', en: 'Medicine Delivered Home' }
            ],
            ctaBook: { id: 'Konsultasikan Kebutuhan Obat', en: 'Discuss Medicine Needs' },
            ctaAsk: { id: 'Chat WhatsApp', en: 'Chat WhatsApp' },


        },
    };

    /**
     * Role and specialty pages. These describe scope of care and when a home
     * visit is or is not appropriate. They deliberately do NOT republish
     * individual practitioner names, ratings, or credentials -- the live
     * directory on dokter/index.html stays the single place for that.
     */
    const DOCTOR_PAGES = [
        {
            slug: 'dokter-umum', group: 'dokter', image: IMG.dokter,
            h1: 'Dokter Umum ke Rumah',
            metaTitle: 'Dokter Umum ke Rumah | DokterPanggil.id',
            metaDesc: 'Dokter umum datang ke rumah untuk keluhan sehari-hari: pemeriksaan fisik, diagnosis awal, resep, dan rujukan bila kondisi memerlukan.',
            lead: 'Dokter umum menangani keluhan sehari-hari dan menjadi titik awal penilaian sebelum diketahui apakah diperlukan pemeriksaan lanjutan.',
            intro: [
                'Dokter umum menilai keluhan secara menyeluruh sebelum menentukan apakah kondisi cukup ditangani di rumah atau membutuhkan pemeriksaan lanjutan. Penilaian ini mencakup wawancara riwayat kesehatan, pemeriksaan fisik, dan pemeriksaan tanda vital.',
                'Untuk banyak keluhan harian, penanganan oleh dokter umum sudah memadai. Bila ditemukan hal yang memerlukan kompetensi lebih spesifik, dokter akan menjelaskan alasannya dan mengarahkan ke pemeriksaan spesialis atau fasilitas kesehatan yang sesuai.'
            ],
            scopeTitle: 'Keluhan yang Umum Ditangani',
            scope: [
                'Demam, batuk, flu, dan nyeri tenggorokan',
                'Keluhan saluran cerna seperti mual, diare, atau nyeri perut ringan',
                'Nyeri kepala dan keluhan tubuh yang belum jelas penyebabnya',
                'Kontrol lanjutan setelah rawat inap atau setelah keluhan mereda'
            ],
            limitTitle: 'Kondisi yang Perlu ke Fasilitas Kesehatan',
            limits: [
                'Nyeri dada hebat atau sesak napas berat',
                'Perdarahan yang tidak berhenti atau cedera berat',
                'Penurunan kesadaran atau kejang',
                'Keluhan yang memerlukan pencitraan atau tindakan segera'
            ],
            faq: [
                { q: 'Apa bedanya dengan memanggil dokter spesialis langsung?', a: 'Dokter umum menilai keluhan secara menyeluruh lebih dulu. Untuk keluhan yang belum jelas arahnya, penilaian ini membantu menentukan pemeriksaan yang benar-benar diperlukan.' },
                { q: 'Apakah dokter umum bisa meresepkan obat?', a: 'Ya, sesuai hasil pemeriksaan. Dokter juga menjelaskan cara penggunaan serta hal yang perlu diperhatikan selama pengobatan.' },
                { q: 'Bagaimana jika kondisi memburuk setelah kunjungan?', a: 'Dokter menjelaskan tanda yang perlu diwaspadai. Bila tanda tersebut muncul, segera hubungi kami atau bawa pasien ke fasilitas gawat darurat terdekat.' }
            ],
            services: ['kunjungan-dokter', 'pemeriksaan-kesehatan', 'tes-laboratorium']
        },
        {
            slug: 'perawat-home-care', group: 'dokter', image: IMG.perawat,
            h1: 'Perawat Home Care',
            metaTitle: 'Perawat Home Care ke Rumah | DokterPanggil.id',
            metaDesc: 'Perawat home care berlisensi untuk infus, injeksi, perawatan luka, kateter, dan pemantauan pasien di rumah sesuai instruksi dokter.',
            lead: 'Perawat home care menjalankan tindakan keperawatan sesuai instruksi dokter dan memantau kondisi pasien selama masa pemulihan.',
            intro: [
                'Peran perawat home care berpusat pada pelaksanaan tindakan keperawatan dan pemantauan kondisi pasien di rumah. Perawat bekerja mengikuti instruksi dokter penanggung jawab, mencatat perkembangan pasien, dan menjelaskan hal yang perlu diperhatikan keluarga.',
                'Selain tindakan teknis, perawat membantu keluarga memahami cara merawat pasien sehari-hari. Edukasi ini penting agar perawatan tetap berjalan konsisten di antara jadwal kunjungan.'
            ],
            scopeTitle: 'Tindakan yang Dapat Dilakukan',
            scope: [
                'Pemasangan dan pemantauan infus sesuai instruksi dokter',
                'Pemberian obat injeksi sesuai resep',
                'Perawatan luka, kateter, dan selang makan',
                'Pemantauan tanda vital serta pencatatan perkembangan pasien'
            ],
            limitTitle: 'Yang Berada di Luar Kewenangan Perawat',
            limits: [
                'Menentukan diagnosis atau mengubah terapi tanpa instruksi dokter',
                'Meresepkan obat baru',
                'Tindakan yang harus dilakukan di fasilitas rawat inap',
                'Penanganan kondisi gawat darurat'
            ],
            faq: [
                { q: 'Apakah perlu instruksi dokter sebelum perawat datang?', a: 'Untuk tindakan seperti infus, injeksi, dan pemberian obat tertentu diperlukan resep atau instruksi tertulis dokter. Untuk pemantauan dan perawatan dasar, tim kami akan membahas kebutuhannya lebih dulu.' },
                { q: 'Bisakah perawat mendampingi dalam durasi panjang?', a: 'Tersedia pilihan per kunjungan maupun pendampingan dengan durasi lebih panjang. Sampaikan kebutuhan jam pendampingan saat pemesanan.' },
                { q: 'Apakah keluarga tetap perlu terlibat?', a: 'Keterlibatan keluarga sangat membantu. Perawat memberikan edukasi agar perawatan tetap konsisten di antara kunjungan.' }
            ],
            services: ['perawatan-rumah', 'perawatan-luka', 'perawatan-lansia']
        },
        {
            slug: 'fisioterapis', group: 'dokter', image: IMG.fisio,
            h1: 'Fisioterapis ke Rumah',
            metaTitle: 'Fisioterapis ke Rumah | Rehabilitasi | DokterPanggil.id',
            metaDesc: 'Fisioterapis datang ke rumah untuk asesmen, program latihan bertahap, terapi manual, dan evaluasi kemajuan pemulihan pasien.',
            lead: 'Fisioterapis menyusun dan mendampingi program latihan yang disesuaikan kondisi pasien serta kondisi ruang di rumah.',
            intro: [
                'Fisioterapis bekerja dari hasil asesmen kondisi fisik pasien, bukan dari program yang sama untuk semua orang. Asesmen ini menentukan jenis latihan, intensitas awal, dan target yang realistis untuk dicapai secara bertahap.',
                'Karena terapi berlangsung di rumah, fisioterapis dapat melatih gerakan pada situasi nyata yang dihadapi pasien setiap hari, seperti berpindah dari tempat tidur, berjalan di lorong, atau menaiki tangga.'
            ],
            scopeTitle: 'Fokus Penanganan',
            scope: [
                'Pemulihan kekuatan dan rentang gerak setelah operasi atau cedera',
                'Latihan mobilitas dan keseimbangan pada pasien pascastroke',
                'Penanganan nyeri punggung, leher, dan sendi yang membatasi aktivitas',
                'Program menjaga kekuatan otot pada lansia'
            ],
            limitTitle: 'Yang Tidak Termasuk',
            limits: [
                'Tindakan bedah atau intervensi medis invasif',
                'Peresepan obat pereda nyeri',
                'Terapi yang membutuhkan alat besar khusus klinik',
                'Penanganan kondisi gawat darurat'
            ],
            faq: [
                { q: 'Apakah perlu rujukan dokter sebelum fisioterapi?', a: 'Untuk kondisi pascaoperasi atau penyakit tertentu, informasi dari dokter sangat membantu penyusunan program. Bila belum ada, tim kami akan mengarahkan pemeriksaan yang sesuai lebih dulu.' },
                { q: 'Berapa lama satu program terapi berjalan?', a: 'Durasi program bergantung kondisi dan target pemulihan. Fisioterapis menyampaikan perkiraannya setelah asesmen awal dan meninjaunya secara berkala.' },
                { q: 'Apakah pasien perlu berlatih di luar sesi?', a: 'Ya. Fisioterapis memberikan panduan latihan mandiri karena konsistensi di antara sesi berpengaruh besar pada kemajuan pemulihan.' }
            ],
            services: ['fisioterapi', 'perawatan-lansia', 'kunjungan-dokter']
        },
        {
            slug: 'anak', group: 'spesialis', image: IMG.vaksin,
            h1: 'Dokter Spesialis Anak ke Rumah',
            metaTitle: 'Dokter Anak ke Rumah | DokterPanggil.id',
            metaDesc: 'Konsultasi dokter spesialis anak di rumah untuk keluhan non-darurat, pemantauan tumbuh kembang, dan perencanaan imunisasi.',
            lead: 'Konsultasi spesialis anak di rumah membantu anak diperiksa dalam suasana yang lebih tenang dan familier.',
            intro: [
                'Anak sering lebih kooperatif saat diperiksa di lingkungan yang dikenalnya. Pemeriksaan di rumah juga mengurangi waktu menunggu bersama pasien lain, yang biasanya melelahkan bagi anak yang sedang tidak nyaman.',
                'Konsultasi mencakup penilaian keluhan, pemeriksaan fisik, serta diskusi mengenai pola makan, tidur, dan aktivitas anak. Orang tua memperoleh penjelasan mengenai temuan pemeriksaan dan hal yang perlu dipantau di rumah.'
            ],
            scopeTitle: 'Hal yang Umum Dibahas',
            scope: [
                'Demam, batuk, dan keluhan infeksi ringan pada anak',
                'Keluhan saluran cerna seperti diare atau sulit makan',
                'Pemantauan pertumbuhan dan perkembangan',
                'Perencanaan serta penyesuaian jadwal imunisasi'
            ],
            limitTitle: 'Kondisi yang Perlu Segera ke Rumah Sakit',
            limits: [
                'Sesak napas, napas cepat, atau anak tampak sangat lemah',
                'Kejang atau penurunan kesadaran',
                'Dehidrasi berat dan tidak mau minum sama sekali',
                'Cedera berat atau keluhan yang memerlukan tindakan segera'
            ],
            faq: [
                { q: 'Apakah imunisasi bisa dilakukan pada kunjungan yang sama?', a: 'Sampaikan rencana tersebut saat pemesanan. Pemberian vaksin tetap bergantung hasil skrining kondisi anak saat kunjungan.' },
                { q: 'Apakah orang tua perlu menyiapkan sesuatu?', a: 'Siapkan buku catatan kesehatan atau riwayat imunisasi anak, daftar keluhan, serta obat yang sedang diberikan.' },
                { q: 'Bagaimana jika anak menolak diperiksa?', a: 'Pemeriksaan disesuaikan agar anak merasa lebih nyaman, dan orang tua diminta mendampingi selama proses berlangsung.' }
            ],
            services: ['kunjungan-dokter', 'vaksinasi', 'tes-laboratorium']
        },
        {
            slug: 'jantung', group: 'spesialis', image: IMG.checkup,
            h1: 'Dokter Spesialis Jantung ke Rumah',
            metaTitle: 'Dokter Spesialis Jantung ke Rumah | DokterPanggil.id',
            metaDesc: 'Konsultasi dokter spesialis jantung di rumah untuk kontrol kondisi kardiovaskular yang stabil, penyesuaian gaya hidup, dan tinjauan hasil pemeriksaan.',
            lead: 'Konsultasi spesialis jantung di rumah ditujukan untuk kontrol kondisi yang stabil, bukan untuk keluhan yang bersifat darurat.',
            intro: [
                'Pemantauan kondisi kardiovaskular umumnya berjalan jangka panjang dan memerlukan kontrol berkala. Konsultasi di rumah memudahkan pasien yang merasa berat menempuh perjalanan rutin ke fasilitas kesehatan, khususnya pasien lansia.',
                'Pada konsultasi, dokter meninjau keluhan, tekanan darah, obat yang sedang dikonsumsi, serta hasil pemeriksaan yang sudah ada. Bila diperlukan pemeriksaan yang hanya tersedia di fasilitas kesehatan, dokter akan menjelaskannya dan mengarahkan langkah lanjutan.'
            ],
            scopeTitle: 'Yang Dapat Dibahas di Rumah',
            scope: [
                'Kontrol tekanan darah dan keluhan pada kondisi yang stabil',
                'Tinjauan obat yang sedang dikonsumsi',
                'Pembahasan hasil pemeriksaan yang sudah tersedia',
                'Saran penyesuaian aktivitas, pola makan, dan gaya hidup'
            ],
            limitTitle: 'Segera ke Gawat Darurat Bila',
            limits: [
                'Nyeri dada hebat, terutama yang menjalar ke lengan, leher, atau punggung',
                'Sesak napas berat atau muncul saat berbaring',
                'Jantung berdebar disertai pusing hebat atau hampir pingsan',
                'Penurunan kesadaran'
            ],
            faq: [
                { q: 'Apakah pemeriksaan EKG bisa dilakukan di rumah?', a: 'Ketersediaan pemeriksaan penunjang berbeda menurut area dan jenis alatnya. Sampaikan kebutuhan Anda saat pemesanan agar dapat dikonfirmasi lebih dulu.' },
                { q: 'Apakah konsultasi ini menggantikan kontrol di rumah sakit?', a: 'Tidak selalu. Sebagian pemeriksaan dan tindakan hanya dapat dilakukan di fasilitas kesehatan. Dokter akan menjelaskan bila kontrol langsung tetap diperlukan.' },
                { q: 'Apa yang perlu disiapkan sebelum konsultasi?', a: 'Siapkan catatan tekanan darah bila Anda memantaunya sendiri, daftar obat, serta hasil pemeriksaan jantung terakhir.' }
            ],
            services: ['kunjungan-dokter', 'pemeriksaan-kesehatan', 'tes-laboratorium']
        },
        {
            slug: 'penyakit-dalam', group: 'spesialis', image: IMG.lab,
            h1: 'Dokter Spesialis Penyakit Dalam ke Rumah',
            metaTitle: 'Dokter Penyakit Dalam ke Rumah | Internis | DokterPanggil.id',
            metaDesc: 'Konsultasi dokter spesialis penyakit dalam di rumah untuk pemantauan penyakit kronis seperti diabetes dan hipertensi, serta tinjauan hasil laboratorium.',
            lead: 'Konsultasi spesialis penyakit dalam di rumah membantu pemantauan penyakit kronis yang memerlukan kontrol berkala.',
            intro: [
                'Penyakit kronis seperti diabetes dan hipertensi memerlukan pemantauan yang berkelanjutan, bukan penanganan sesaat. Konsultasi di rumah memudahkan pasien menjaga keteraturan kontrol tanpa terbebani perjalanan berulang.',
                'Dokter meninjau keluhan, hasil laboratorium terakhir, serta obat yang sedang dikonsumsi, lalu membahas penyesuaian yang diperlukan bersama pasien dan keluarga. Pemeriksaan penunjang yang dibutuhkan dapat dijadwalkan melalui layanan tes laboratorium di rumah.'
            ],
            scopeTitle: 'Kondisi yang Umum Dipantau',
            scope: [
                'Diabetes dan pemantauan kadar gula darah',
                'Hipertensi dan keluhan terkait tekanan darah',
                'Keluhan pencernaan yang berlangsung berulang',
                'Tinjauan hasil laboratorium dan penyesuaian rencana pengobatan'
            ],
            limitTitle: 'Kondisi yang Perlu Penanganan Fasilitas Kesehatan',
            limits: [
                'Sesak napas berat atau nyeri dada',
                'Gula darah sangat tinggi atau sangat rendah disertai penurunan kesadaran',
                'Dehidrasi berat atau muntah terus-menerus',
                'Kondisi yang memerlukan pencitraan atau perawatan inap'
            ],
            faq: [
                { q: 'Apakah bisa sekaligus mengambil sampel laboratorium?', a: 'Sampaikan kebutuhan tersebut saat pemesanan agar kunjungan dokter dan pengambilan sampel dapat direncanakan berdekatan.' },
                { q: 'Apakah dokter dapat menyesuaikan dosis obat?', a: 'Penyesuaian terapi dilakukan dokter berdasarkan hasil pemeriksaan dan kondisi Anda saat konsultasi, serta dijelaskan lebih dulu sebelum diterapkan.' },
                { q: 'Seberapa sering kontrol sebaiknya dilakukan?', a: 'Jarak kontrol bergantung kestabilan kondisi dan hasil pemeriksaan. Dokter memberikan saran jadwal yang sesuai setelah konsultasi.' }
            ],
            services: ['kunjungan-dokter', 'tes-laboratorium', 'pemeriksaan-kesehatan']
        }
    ];

    return {
        SITE: SITE,
        IMG: IMG,
        SERVICE_SEO: SERVICE_SEO,
        DOCTOR_PAGES: DOCTOR_PAGES
    };
});
