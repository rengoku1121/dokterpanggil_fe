/**
 * Custom SEO landing bodies for medical procedures (NGT, kateter, suction).
 * Factory receives helpers from build-seo.js.
 */
module.exports = function createProcedureBodies(h) {
    const {
        sectionHead, biTag, faqBlock, ctaBlock,
        composeBody, iconInfoCards, howStepCards, whyCards, doctorNursePathCards, stepPathCards
    } = h;

    function ngtBody(prefix, en) {
        const e = en.ngt || en;
        const waAsk = 'Halo, saya ingin konsultasikan kondisi pasien untuk pemasangan selang makan (NGT) di rumah di Makassar.';
        const waBook = 'Halo, saya ingin booking pemasangan/penggantian NGT di rumah di Makassar.';

        const whenItems = [
            { title: 'Kesulitan Menelan', desc: 'Pada kondisi tertentu yang menyebabkan pasien mengalami gangguan menelan sehingga asupan melalui mulut tidak mencukupi atau tidak sesuai untuk diberikan seperti biasa.' },
            { title: 'Asupan Nutrisi Tidak Mencukupi', desc: 'Ketika pasien tidak mampu memenuhi kebutuhan nutrisi melalui makan dan minum secara oral.' },
            { title: 'Penurunan Kesadaran atau Kondisi Neurologis Tertentu', desc: 'Pada pasien tertentu yang mengalami gangguan kemampuan makan atau menelan dan telah dinilai oleh dokter.' },
            { title: 'Melanjutkan Penggunaan NGT', desc: 'Untuk pasien yang sebelumnya telah menggunakan NGT dan membutuhkan penggantian atau pemasangan kembali berdasarkan rencana perawatan.' }
        ];
        const whenIcons = ['activity', 'clipboard-check', 'heart-pulse', 'home'];

        const doctorFlow = ['Booking', 'Dokter Datang', 'Pemeriksaan Pasien', 'Rekomendasi', 'Pemasangan NGT', 'Evaluasi & Edukasi'];
        const nurseFlow = ['Booking', 'Perawat Datang', 'Pemeriksaan Awal', 'Konsultasi Online Dokter', 'Rekomendasi', 'Pemasangan NGT', 'Evaluasi & Edukasi'];
        const doctorFlowEn = e.doctorFlow || ['Booking', 'Doctor Arrives', 'Patient Exam', 'Recommendation', 'NGT Placement', 'Evaluation & Education'];
        const nurseFlowEn = e.nurseFlow || ['Booking', 'Nurse Arrives', 'Initial Exam', 'Online Doctor Consult', 'Recommendation', 'NGT Placement', 'Evaluation & Education'];

        const typeItems = [
            { title: 'Pemasangan NGT Baru', desc: 'Untuk pasien yang berdasarkan penilaian dokter membutuhkan penggunaan NGT.' },
            { title: 'Penggantian NGT', desc: 'Untuk pasien yang telah menggunakan NGT dan membutuhkan penggantian sesuai rencana perawatan.' },
            { title: 'Pemasangan Kembali', desc: 'Apabila NGT terlepas atau perlu dipasang kembali, kondisi pasien dan kebutuhan pemasangan akan dinilai terlebih dahulu.' }
        ];
        const typeIcons = ['clipboard-list', 'clock', 'home'];

        const faqs = [
            { q: 'Apakah pemasangan NGT terasa sakit?', a: 'Pemasangan dapat menimbulkan rasa tidak nyaman pada hidung dan tenggorokan. Tenaga medis akan membantu memposisikan pasien dan melakukan tindakan sesuai prosedur untuk membantu proses pemasangan.' },
            { q: 'Berapa lama NGT dapat digunakan sebelum perlu diganti?', a: 'Lama penggunaan dan kebutuhan penggantian bergantung pada jenis selang, kondisi selang, kondisi pasien, serta rencana perawatan. Tenaga medis akan memberikan arahan sesuai NGT yang digunakan.' },
            { q: 'Apakah obat dapat diberikan melalui NGT?', a: 'Obat tertentu dapat diberikan melalui NGT, tetapi tidak semua obat sesuai untuk dihancurkan atau diberikan melalui selang. Pemberian obat perlu mengikuti instruksi dokter atau tenaga kesehatan.' },
            { q: 'Bagaimana jika NGT terlepas di rumah?', a: 'Jangan memasukkan kembali selang sendiri apabila pasien atau keluarga belum memiliki kompetensi dan instruksi khusus untuk melakukannya. Hubungi tenaga medis untuk evaluasi dan pemasangan kembali apabila diperlukan.' }
        ];

        return composeBody([
            sectionHead('Apa Itu Selang Makan / Nasogastric Tube?', null, e.aboutTitle)
            + '<div class="canva-card rounded-3xl p-6 sm:p-8 max-w-4xl">'
            + biTag('p', 'Nasogastric Tube (NGT) atau selang makan adalah selang fleksibel yang dimasukkan melalui hidung menuju lambung untuk membantu pemberian nutrisi, cairan, atau obat ketika pasien tidak dapat makan atau minum dengan cukup melalui mulut. Pemasangannya dilakukan berdasarkan penilaian dan rekomendasi dokter.', e.aboutP1, 'class="text-gray-600 leading-relaxed"')
            + '</div>',
            sectionHead('Kapan Dokter Dapat Merekomendasikan NGT?', null, e.whenTitle)
            + iconInfoCards(whenItems, e.whenItems, whenIcons),
            sectionHead('Pemasangan Baru atau Penggantian Selang Makan', null, e.typesTitle)
            + iconInfoCards(typeItems, e.typeItems, typeIcons),
            sectionHead('Pilih Layanan Dokter atau Perawat', null, e.pathTitle)
            + stepPathCards([
                { icon: 'stethoscope', title: 'Pemasangan NGT oleh Dokter', titleEn: e.doctorTitle, flow: doctorFlow, flowEn: doctorFlowEn },
                { icon: 'heart-handshake', title: 'Pemasangan NGT oleh Perawat', titleEn: e.nurseTitle, flow: nurseFlow, flowEn: nurseFlowEn }
            ]),
            sectionHead('Pertanyaan Umum', null, e.faqTitle || 'FAQ')
            + faqBlock(faqs, e.faqs),
            ctaBlock(prefix, waAsk,
                'Butuh Pemasangan atau Penggantian Selang Makan di Rumah?',
                'Ceritakan kondisi pasien dan kebutuhan penggunaan NGT kepada Tim Dokter Panggil. Dokter akan melakukan penilaian untuk menentukan apakah pemasangan dapat dilakukan di rumah dan tindakan yang sesuai dengan kondisi pasien.',
                waBook,
                {
                    headlineEn: e.ctaTitle,
                    bodyEn: e.ctaBody,
                    bookLabel: { id: 'Booking Pemasangan NGT', en: e.ctaBook || 'Book NGT Placement' },
                    askLabel: { id: 'Konsultasikan Kondisi Pasien', en: e.ctaAskChat || 'Discuss Patient Condition' }
                })
        ]);
    }

    function kateterBody(prefix, en) {
        const e = en.kateter || en;
        const waAsk = 'Halo, saya ingin konsultasikan kondisi pasien untuk pemasangan kateter urin di rumah di Makassar.';
        const waBook = 'Halo, saya ingin booking pemasangan/penggantian kateter urin di rumah di Makassar.';

        const whenItems = [
            { title: 'Kesulitan Mengeluarkan Urin', desc: 'Pada kondisi tertentu ketika pasien tidak dapat mengosongkan kandung kemih dengan baik.' },
            { title: 'Retensi Urin', desc: 'Ketika urin tertahan di dalam kandung kemih dan dokter menilai diperlukan pemasangan kateter untuk membantu mengeluarkannya.' },
            { title: 'Kondisi Medis atau Perawatan Tertentu', desc: 'Pada pasien tertentu yang membutuhkan kateter sebagai bagian dari rencana perawatan atau pemantauan medis.' },
            { title: 'Melanjutkan Penggunaan Kateter', desc: 'Untuk pasien yang sebelumnya telah menggunakan kateter dan membutuhkan penggantian atau pemasangan kembali sesuai rencana perawatan.' }
        ];
        const whenIcons = ['droplets', 'activity', 'clipboard-check', 'home'];

        const doctorFlow = ['Booking', 'Dokter Datang', 'Pemeriksaan', 'Rekomendasi', 'Pemasangan/Penggantian Kateter', 'Evaluasi & Edukasi'];
        const nurseFlow = ['Booking', 'Perawat Datang', 'Pemeriksaan Awal', 'Konsultasi Online Dokter', 'Rekomendasi', 'Pemasangan/Penggantian Kateter', 'Evaluasi & Edukasi'];
        const doctorFlowEn = e.doctorFlow || ['Booking', 'Doctor Arrives', 'Exam', 'Recommendation', 'Catheter Placement/Change', 'Evaluation & Education'];
        const nurseFlowEn = e.nurseFlow || ['Booking', 'Nurse Arrives', 'Initial Exam', 'Online Doctor Consult', 'Recommendation', 'Catheter Placement/Change', 'Evaluation & Education'];

        const typeItems = [
            { title: 'Pemasangan Kateter Baru', desc: 'Untuk pasien yang berdasarkan penilaian dokter membutuhkan penggunaan kateter urin.' },
            { title: 'Penggantian Kateter', desc: 'Untuk pasien yang telah menggunakan kateter dan membutuhkan penggantian sesuai kondisi kateter serta rencana perawatan.' },
            { title: 'Pemasangan Kembali', desc: 'Apabila kateter terlepas atau perlu dipasang kembali, tenaga medis akan melakukan penilaian terlebih dahulu sebelum tindakan.' }
        ];
        const typeIcons = ['clipboard-list', 'clock', 'home'];

        const faqs = [
            { q: 'Apakah pemasangan kateter terasa sakit?', a: 'Pemasangan dapat menimbulkan rasa tidak nyaman. Tenaga medis akan melakukan tindakan secara hati-hati dan memantau kondisi pasien selama proses pemasangan.' },
            { q: 'Apakah kateter boleh digunakan dalam jangka panjang?', a: 'Pada kondisi tertentu, kateter dapat digunakan dalam periode yang lebih panjang apabila memang diperlukan secara medis. Kebutuhan penggunaan dan evaluasinya disesuaikan dengan kondisi pasien.' },
            { q: 'Apakah kantong urin dapat dikosongkan sendiri oleh keluarga?', a: 'Bisa setelah mendapatkan edukasi mengenai cara mengosongkan kantong urin dan menjaga kebersihan selama proses tersebut.' },
            { q: 'Bagaimana jika urin tidak keluar setelah kateter dipasang?', a: 'Jangan mencoba memperbaiki atau memasukkan kateter lebih dalam sendiri. Periksa apakah selang tertekuk atau posisi kantong menghambat aliran, kemudian hubungi tenaga medis apabila urin tetap tidak mengalir atau pasien mengalami keluhan.' },
            { q: 'Apakah kateter harus diganti secara rutin?', a: 'Jadwal penggantian tidak sama pada setiap pasien. Jenis kateter, kondisi pasien, fungsi kateter, serta rencana perawatan akan menjadi pertimbangan dalam menentukan waktu penggantian.' }
        ];

        return composeBody([
            sectionHead('Apa Itu Kateter Urin?', null, e.aboutTitle)
            + '<div class="canva-card rounded-3xl p-6 sm:p-8 max-w-4xl">'
            + biTag('h3', 'Membantu Mengalirkan Urin dari Kandung Kemih', e.aboutHeadline, 'class="text-xl font-bold mb-4"')
            + biTag('p', 'Kateter urin adalah selang yang digunakan untuk membantu mengalirkan urin dari kandung kemih menuju kantong penampung.', e.aboutP1, 'class="text-gray-600 leading-relaxed mb-4"')
            + biTag('p', 'Kateter dapat diperlukan pada kondisi medis tertentu, baik untuk penggunaan sementara maupun dalam periode tertentu sesuai kebutuhan pasien.', e.aboutP2, 'class="text-gray-600 leading-relaxed"')
            + '</div>',
            sectionHead('Kapan Dokter Dapat Merekomendasikan Kateter Urin?', null, e.whenTitle)
            + iconInfoCards(whenItems, e.whenItems, whenIcons),
            sectionHead('Pilih Layanan Dokter atau Perawat', null, e.pathTitle)
            + stepPathCards([
                { icon: 'stethoscope', title: 'Pemasangan Kateter oleh Dokter', titleEn: e.doctorTitle, flow: doctorFlow, flowEn: doctorFlowEn },
                { icon: 'heart-handshake', title: 'Pemasangan Kateter oleh Perawat', titleEn: e.nurseTitle, flow: nurseFlow, flowEn: nurseFlowEn }
            ]),
            sectionHead('Pemasangan Baru atau Penggantian Kateter', null, e.typesTitle)
            + iconInfoCards(typeItems, e.typeItems, typeIcons),
            sectionHead('Pertanyaan Umum', null, e.faqTitle || 'FAQ')
            + faqBlock(faqs, e.faqs),
            ctaBlock(prefix, waAsk,
                'Butuh Pemasangan atau Penggantian Kateter di Rumah?',
                'Ceritakan kondisi pasien dan kebutuhan penggunaan kateter kepada tim Dokter Panggil. Dokter akan melakukan penilaian untuk menentukan kebutuhan tindakan dan apakah pemasangan atau penggantian kateter dapat dilakukan di rumah.',
                waBook,
                {
                    headlineEn: e.ctaTitle,
                    bodyEn: e.ctaBody,
                    bookLabel: { id: 'Booking Pemasangan Kateter', en: e.ctaBook || 'Book Catheter Placement' },
                    askLabel: { id: 'Konsultasikan Kondisi Pasien', en: e.ctaAskChat || 'Discuss Patient Condition' }
                })
        ]);
    }

    function suctionBody(prefix, en) {
        const e = en.suction || en;
        const waAsk = 'Halo, saya ingin konsultasikan kondisi pasien untuk suction / sedot dahak di rumah di Makassar.';
        const waBook = 'Halo, saya ingin booking layanan suction / sedot dahak di rumah di Makassar.';

        const whenItems = [
            { title: 'Dahak Sulit Dikeluarkan', desc: 'Pada pasien yang mengalami kesulitan batuk atau tidak mampu mengeluarkan sekret secara efektif.' },
            { title: 'Penumpukan Sekret di Jalan Napas', desc: 'Ketika berdasarkan pemeriksaan ditemukan tanda adanya sekret yang membutuhkan bantuan untuk dikeluarkan.' },
            { title: 'Kemampuan Batuk Menurun', desc: 'Pada kondisi tertentu seperti gangguan kesadaran, kelemahan, atau gangguan neurologis yang menyebabkan kemampuan membersihkan jalan napas berkurang.' },
            { title: 'Pasien dengan Trakeostomi', desc: 'Pada pasien tertentu dengan trakeostomi yang membutuhkan suction sebagai bagian dari perawatan jalan napas sesuai rencana perawatan.' },
            { title: 'Melanjutkan Perawatan di Rumah', desc: 'Untuk pasien yang sebelumnya telah mendapatkan perawatan dan masih membutuhkan suction sesuai rekomendasi dokter.' }
        ];
        const whenIcons = ['wind', 'activity', 'heart-pulse', 'clipboard-check', 'home'];

        const doctorFlow = ['Booking', 'Dokter Datang', 'Pemeriksaan', 'Rekomendasi', 'Suction', 'Evaluasi'];
        const nurseFlow = ['Booking', 'Perawat Datang', 'Pemeriksaan Awal', 'Konsultasi Online Dokter', 'Rekomendasi', 'Suction', 'Evaluasi'];
        const doctorFlowEn = e.doctorFlow || ['Booking', 'Doctor Arrives', 'Exam', 'Recommendation', 'Suction', 'Evaluation'];
        const nurseFlowEn = e.nurseFlow || ['Booking', 'Nurse Arrives', 'Initial Exam', 'Online Doctor Consult', 'Recommendation', 'Suction', 'Evaluation'];

        const typeItems = [
            { title: 'Suction Sekret pada Mulut', desc: 'Membantu membersihkan sekret yang terkumpul di area mulut pada pasien yang mengalami kesulitan mengeluarkannya sendiri.' },
            { title: 'Suction Jalan Napas', desc: 'Dilakukan pada kondisi tertentu ketika sekret pada jalan napas perlu dikeluarkan dengan bantuan tenaga medis.' },
            { title: 'Suction pada Pasien dengan Trakeostomi', desc: 'Untuk pasien dengan trakeostomi yang membutuhkan pembersihan sekret sesuai kondisi dan rencana perawatan.' }
        ];
        const typeIcons = ['message-circle', 'wind', 'activity'];

        const faqs = [
            { q: 'Apakah semua pasien dengan banyak dahak membutuhkan suction?', a: 'Tidak. Sebagian pasien masih dapat mengeluarkan dahak secara efektif melalui batuk. Kebutuhan suction ditentukan berdasarkan kondisi pasien, kemampuan mengeluarkan sekret, dan hasil penilaian dokter.' },
            { q: 'Apakah suction terasa sakit?', a: 'Suction dapat menimbulkan rasa tidak nyaman dan merangsang batuk. Tenaga medis akan melakukan tindakan sesuai kebutuhan pasien dan memantau respons selama prosedur.' },
            { q: 'Berapa kali suction boleh dilakukan?', a: 'Tidak ada jumlah yang sama untuk semua pasien. Frekuensi suction disesuaikan dengan kondisi, jumlah sekret, kemampuan pasien membersihkan jalan napas, dan rencana perawatan.' },
            { q: 'Apakah pasien dengan trakeostomi dapat dilakukan suction di rumah?', a: 'Pada kondisi tertentu, bisa. Tenaga medis akan menilai kondisi pasien, trakeostomi, sekret, dan kebutuhan perawatan sebelum tindakan.' },
            { q: 'Apakah keluarga boleh melakukan suction sendiri?', a: 'Pada pasien tertentu yang membutuhkan suction berulang, keluarga atau caregiver dapat memerlukan edukasi dan pelatihan khusus dari tenaga kesehatan. Jangan melakukan suction secara mandiri tanpa pemahaman mengenai teknik, alat, serta kondisi pasien yang perlu diperhatikan.' }
        ];

        return composeBody([
            sectionHead('Apa Itu Suction / Sedot Dahak?', null, e.aboutTitle)
            + '<div class="canva-card rounded-3xl p-6 sm:p-8 max-w-4xl">'
            + biTag('h3', 'Membantu Mengeluarkan Sekret dari Jalan Napas', e.aboutHeadline, 'class="text-xl font-bold mb-4"')
            + biTag('p', 'Suction atau sedot dahak adalah tindakan untuk membantu mengeluarkan lendir atau sekret dari jalan napas menggunakan alat penghisap medis.', e.aboutP1, 'class="text-gray-600 leading-relaxed mb-4"')
            + biTag('p', 'Tindakan ini dapat dipertimbangkan pada pasien tertentu yang mengalami penumpukan sekret dan kesulitan mengeluarkannya secara efektif, berdasarkan penilaian kondisi pernapasan pasien.', e.aboutP2, 'class="text-gray-600 leading-relaxed"')
            + '</div>',
            sectionHead('Kapan Suction Dapat Dipertimbangkan?', null, e.whenTitle)
            + iconInfoCards(whenItems, e.whenItems, whenIcons),
            sectionHead('Jenis Kebutuhan Suction', null, e.typesTitle)
            + iconInfoCards(typeItems, e.typeItems, typeIcons),
            sectionHead('Pilih Layanan Dokter atau Perawat', null, e.pathTitle)
            + stepPathCards([
                { icon: 'stethoscope', title: 'Suction oleh Dokter', titleEn: e.doctorTitle, flow: doctorFlow, flowEn: doctorFlowEn },
                { icon: 'heart-handshake', title: 'Suction oleh Perawat', titleEn: e.nurseTitle, flow: nurseFlow, flowEn: nurseFlowEn }
            ]),
            sectionHead('Pertanyaan Umum', null, e.faqTitle || 'FAQ')
            + faqBlock(faqs, e.faqs),
            ctaBlock(prefix, waAsk,
                'Pasien Sulit Mengeluarkan Dahak?',
                'Ceritakan kondisi pasien kepada Tim Dokter Panggil. Dokter akan melakukan penilaian untuk menentukan apakah suction diperlukan dan apakah tindakan sesuai dilakukan di rumah.',
                waBook,
                {
                    headlineEn: e.ctaTitle,
                    bodyEn: e.ctaBody,
                    bookLabel: { id: 'Booking Layanan Suction', en: e.ctaBook || 'Book Suction Service' },
                    askLabel: { id: 'Konsultasikan Kondisi Pasien', en: e.ctaAskChat || 'Discuss Patient Condition' }
                })
        ]);
    }

    return { ngtBody, kateterBody, suctionBody };
};
