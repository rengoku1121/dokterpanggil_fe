/**
 * Custom SEO landing bodies for medical procedures (NGT, kateter, suction).
 * Factory receives helpers from build-seo.js.
 */
module.exports = function createProcedureBodies(h) {
    const {
        sectionHead, biTag, faqBlock, ctaBlock,
        composeBody, iconInfoCards, howStepCards, whyCards, doctorNursePathCards
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

        const howSteps = [
            { n: '01', title: 'Pemeriksaan Kondisi Pasien', desc: 'Tenaga medis melakukan pemeriksaan dan memastikan rencana pemasangan sesuai dengan kondisi pasien.' },
            { n: '02', title: 'Persiapan Pasien & Peralatan', desc: 'Peralatan dan kebutuhan tindakan dipersiapkan sebelum pemasangan.' },
            { n: '03', title: 'Pemasangan NGT', desc: 'Selang dimasukkan melalui hidung menuju lambung menggunakan teknik yang sesuai.' },
            { n: '04', title: 'Konfirmasi Posisi Selang', desc: 'Setelah pemasangan, posisi NGT perlu diperiksa dan dikonfirmasi sebelum digunakan untuk pemberian nutrisi atau obat.' },
            { n: '05', title: 'Fiksasi Selang', desc: 'Setelah posisi sesuai, selang difiksasi untuk membantu mempertahankan posisinya.' },
            { n: '06', title: 'Edukasi Pasien & Keluarga', desc: 'Keluarga diberikan penjelasan mengenai penggunaan, perawatan, serta kondisi yang perlu diperhatikan selama NGT digunakan.' }
        ];

        const typeItems = [
            { title: 'Pemasangan NGT Baru', desc: 'Untuk pasien yang berdasarkan penilaian dokter membutuhkan penggunaan NGT.' },
            { title: 'Penggantian NGT', desc: 'Untuk pasien yang telah menggunakan NGT dan membutuhkan penggantian sesuai rencana perawatan.' },
            { title: 'Pemasangan Kembali', desc: 'Apabila NGT terlepas atau perlu dipasang kembali, kondisi pasien dan kebutuhan pemasangan akan dinilai terlebih dahulu.' }
        ];
        const typeIcons = ['clipboard-list', 'clock', 'home'];

        const whyItems = [
            { title: 'Berdasarkan Penilaian Dokter', desc: 'Kebutuhan pemasangan NGT ditentukan berdasarkan kondisi dan kebutuhan pasien.' },
            { title: 'Dokter atau Perawat ke Rumah', desc: 'Pasien dapat memilih layanan dengan dokter atau perawat sesuai kebutuhan pelayanan.' },
            { title: 'Perawat Tetap Terhubung dengan Dokter', desc: 'Apabila tindakan dilakukan oleh perawat, pemeriksaan awal dilanjutkan dengan konsultasi online dokter sebelum tindakan.' },
            { title: 'Edukasi Penggunaan NGT', desc: 'Pasien dan keluarga mendapatkan arahan mengenai penggunaan dan hal-hal yang perlu diperhatikan setelah pemasangan.' }
        ];

        const faqs = [
            { q: 'Apakah pemasangan NGT terasa sakit?', a: 'Pemasangan dapat menimbulkan rasa tidak nyaman pada hidung dan tenggorokan. Tenaga medis akan membantu memposisikan pasien dan melakukan tindakan sesuai prosedur untuk membantu proses pemasangan.' },
            { q: 'Berapa lama NGT dapat digunakan sebelum perlu diganti?', a: 'Lama penggunaan dan kebutuhan penggantian bergantung pada jenis selang, kondisi selang, kondisi pasien, serta rencana perawatan. Tenaga medis akan memberikan arahan sesuai NGT yang digunakan.' },
            { q: 'Apakah obat dapat diberikan melalui NGT?', a: 'Obat tertentu dapat diberikan melalui NGT, tetapi tidak semua obat sesuai untuk dihancurkan atau diberikan melalui selang. Pemberian obat perlu mengikuti instruksi dokter atau tenaga kesehatan.' },
            { q: 'Bagaimana jika NGT terlepas di rumah?', a: 'Jangan memasukkan kembali selang sendiri apabila pasien atau keluarga belum memiliki kompetensi dan instruksi khusus untuk melakukannya. Hubungi tenaga medis untuk evaluasi dan pemasangan kembali apabila diperlukan.' }
        ];

        return composeBody([
            sectionHead('Apa Itu Selang Makan / Nasogastric Tube?', null, e.aboutTitle)
            + '<div class="canva-card rounded-3xl p-6 sm:p-8 max-w-4xl">'
            + biTag('h3', 'Membantu Pemberian Nutrisi dan Obat pada Kondisi Tertentu', e.aboutHeadline, 'class="text-xl font-bold mb-4"')
            + biTag('p', 'Nasogastric Tube (NGT) atau selang makan adalah selang fleksibel yang dimasukkan melalui hidung menuju lambung.', e.aboutP1, 'class="text-gray-600 leading-relaxed mb-4"')
            + biTag('p', 'Pada kondisi tertentu, NGT dapat digunakan untuk membantu pemberian nutrisi, cairan, atau obat ketika pasien tidak dapat memenuhi kebutuhan melalui mulut secara adekuat.', e.aboutP2, 'class="text-gray-600 leading-relaxed mb-4"')
            + biTag('p', 'Pemasangan NGT perlu didasarkan pada penilaian kondisi pasien dan rekomendasi dokter.', e.aboutP3, 'class="text-gray-600 leading-relaxed font-medium"')
            + '</div>',
            sectionHead('Kapan Dokter Dapat Merekomendasikan NGT?', null, e.whenTitle)
            + iconInfoCards(whenItems, e.whenItems, whenIcons),
            sectionHead('Pilih Layanan Dokter atau Perawat', null, e.pathTitle)
            + doctorNursePathCards({
                e,
                doctorTitle: 'Pemasangan NGT oleh Dokter',
                doctorP1: 'Dokter datang langsung ke rumah untuk melakukan pemeriksaan kondisi pasien dan menentukan apakah pemasangan NGT sesuai untuk dilakukan.',
                doctorP2: 'Apabila berdasarkan hasil pemeriksaan pemasangan dapat dilakukan di rumah, dokter akan melakukan tindakan serta memberikan arahan mengenai penggunaan dan perawatan NGT.',
                doctorFlow, doctorFlowEn,
                nurseTitle: 'Pemasangan NGT oleh Perawat',
                nurseP1: 'Perawat datang ke rumah dan melakukan pemeriksaan awal kondisi pasien. Hasil pemeriksaan kemudian disampaikan kepada dokter dan pasien akan melakukan konsultasi online dengan dokter.',
                nurseP2: 'Apabila dokter merekomendasikan pemasangan NGT, perawat akan melakukan tindakan sesuai rencana yang diberikan dokter.',
                nurseFlow, nurseFlowEn
            }),
            sectionHead('Bagaimana Pemasangan NGT Dilakukan?', null, e.howTitle)
            + howStepCards(howSteps, e.howSteps),
            sectionHead('Pemasangan Baru atau Penggantian Selang Makan', null, e.typesTitle)
            + iconInfoCards(typeItems, e.typeItems, typeIcons),
            sectionHead('Mengapa Pemasangan NGT dengan Dokter Panggil?', null, e.whyTitle)
            + whyCards(whyItems, e.whyItems, ['stethoscope', 'home', 'message-circle', 'clipboard-check']),
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

        const howSteps = [
            { n: '01', title: 'Pemeriksaan Kondisi Pasien', desc: 'Tenaga medis melakukan pemeriksaan kondisi pasien dan memastikan rencana tindakan sesuai dengan rekomendasi dokter.' },
            { n: '02', title: 'Persiapan Pasien & Peralatan', desc: 'Pasien dipersiapkan dan kebutuhan tindakan disiapkan dengan memperhatikan prinsip kebersihan serta pencegahan infeksi.' },
            { n: '03', title: 'Pemasangan Kateter', desc: 'Kateter dimasukkan melalui saluran kemih menuju kandung kemih menggunakan teknik yang sesuai.' },
            { n: '04', title: 'Memastikan Aliran Urin', desc: 'Setelah pemasangan, tenaga medis memastikan urin dapat mengalir melalui kateter dengan baik.' },
            { n: '05', title: 'Fiksasi & Kantong Urin', desc: 'Kateter dan kantong urin diatur serta diposisikan dengan baik untuk membantu menjaga aliran urin.' },
            { n: '06', title: 'Evaluasi & Edukasi', desc: 'Tenaga medis mengevaluasi kondisi pasien setelah tindakan dan memberikan edukasi mengenai penggunaan serta perawatan kateter di rumah.' }
        ];

        const typeItems = [
            { title: 'Pemasangan Kateter Baru', desc: 'Untuk pasien yang berdasarkan penilaian dokter membutuhkan penggunaan kateter urin.' },
            { title: 'Penggantian Kateter', desc: 'Untuk pasien yang telah menggunakan kateter dan membutuhkan penggantian sesuai kondisi kateter serta rencana perawatan.' },
            { title: 'Pemasangan Kembali', desc: 'Apabila kateter terlepas atau perlu dipasang kembali, tenaga medis akan melakukan penilaian terlebih dahulu sebelum tindakan.' }
        ];
        const typeIcons = ['clipboard-list', 'clock', 'home'];

        const whyItems = [
            { title: 'Berdasarkan Penilaian Dokter', desc: 'Kebutuhan pemasangan atau penggantian kateter ditentukan berdasarkan kondisi pasien.' },
            { title: 'Dokter atau Perawat ke Rumah', desc: 'Tindakan dapat dilakukan oleh dokter maupun perawat sesuai kebutuhan pelayanan.' },
            { title: 'Perawat Tetap Terhubung dengan Dokter', desc: 'Apabila tindakan dilakukan oleh perawat, pemeriksaan awal dilanjutkan dengan konsultasi online dokter sebelum tindakan.' },
            { title: 'Perawatan Berkelanjutan di Rumah', desc: 'Pasien yang menggunakan kateter dalam periode tertentu dapat memperoleh bantuan penggantian dan pemantauan sesuai rencana perawatan.' }
        ];

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
            sectionHead('Pilih Layanan Dokter atau Perawat', 'Pemasangan dan penggantian kateter urin dapat dilakukan oleh dokter maupun perawat. Sebelum tindakan, kondisi dan kebutuhan pasien tetap dinilai oleh dokter.', e.pathTitle, e.pathLead)
            + doctorNursePathCards({
                e,
                doctorTitle: 'Pemasangan Kateter oleh Dokter',
                doctorP1: 'Dokter datang langsung ke rumah untuk melakukan pemeriksaan kondisi pasien dan menentukan kebutuhan pemasangan atau penggantian kateter.',
                doctorP2: 'Apabila berdasarkan hasil pemeriksaan tindakan dapat dilakukan di rumah, dokter akan melakukan pemasangan kateter dan memberikan edukasi mengenai perawatan setelah tindakan.',
                doctorFlow, doctorFlowEn,
                nurseTitle: 'Pemasangan Kateter oleh Perawat',
                nurseP1: 'Perawat datang ke rumah dan melakukan pemeriksaan awal kondisi pasien. Hasil pemeriksaan kemudian disampaikan kepada dokter dan pasien melakukan konsultasi online dengan dokter.',
                nurseP2: 'Apabila dokter merekomendasikan pemasangan atau penggantian kateter, perawat akan melakukan tindakan sesuai rencana yang diberikan dokter.',
                nurseFlow, nurseFlowEn
            }),
            sectionHead('Bagaimana Pemasangan Kateter Dilakukan?', 'Proses Pemasangan Kateter di Rumah', e.howTitle, e.howLead)
            + howStepCards(howSteps, e.howSteps),
            sectionHead('Pemasangan Baru atau Penggantian Kateter', null, e.typesTitle)
            + iconInfoCards(typeItems, e.typeItems, typeIcons),
            sectionHead('Mengapa Pemasangan Kateter dengan Dokter Panggil?', null, e.whyTitle)
            + whyCards(whyItems, e.whyItems, ['stethoscope', 'home', 'message-circle', 'heart-pulse']),
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

        const howSteps = [
            { n: '01', title: 'Pemeriksaan Kondisi Pasien', desc: 'Kondisi pasien dinilai terlebih dahulu, terutama kondisi pernapasan dan kemampuan mengeluarkan sekret.' },
            { n: '02', title: 'Persiapan Pasien & Peralatan', desc: 'Tenaga medis mempersiapkan pasien dan peralatan yang diperlukan sesuai tindakan.' },
            { n: '03', title: 'Tindakan Suction', desc: 'Sekret dikeluarkan menggunakan alat suction dan teknik yang sesuai dengan kondisi serta akses jalan napas pasien.' },
            { n: '04', title: 'Pemantauan Selama Tindakan', desc: 'Kondisi pasien dipantau selama tindakan untuk menilai toleransi dan respons pasien.' },
            { n: '05', title: 'Evaluasi Setelah Suction', desc: 'Setelah tindakan, tenaga medis mengevaluasi kembali kondisi pernapasan dan respons pasien.' },
            { n: '06', title: 'Edukasi Keluarga', desc: 'Keluarga diberikan informasi mengenai kondisi pasien, perawatan selanjutnya, serta tanda-tanda yang perlu diperhatikan.' }
        ];

        const typeItems = [
            { title: 'Suction Sekret pada Mulut', desc: 'Membantu membersihkan sekret yang terkumpul di area mulut pada pasien yang mengalami kesulitan mengeluarkannya sendiri.' },
            { title: 'Suction Jalan Napas', desc: 'Dilakukan pada kondisi tertentu ketika sekret pada jalan napas perlu dikeluarkan dengan bantuan tenaga medis.' },
            { title: 'Suction pada Pasien dengan Trakeostomi', desc: 'Untuk pasien dengan trakeostomi yang membutuhkan pembersihan sekret sesuai kondisi dan rencana perawatan.' }
        ];
        const typeIcons = ['message-circle', 'wind', 'activity'];

        const whyItems = [
            { title: 'Berdasarkan Penilaian Dokter', desc: 'Tindakan dilakukan setelah dokter menilai kondisi dan kebutuhan pasien.' },
            { title: 'Dokter atau Perawat ke Rumah', desc: 'Tindakan dapat dilakukan oleh dokter maupun perawat sesuai kebutuhan pelayanan.' },
            { title: 'Perawat Tetap Terhubung dengan Dokter', desc: 'Apabila suction dilakukan oleh perawat, pemeriksaan awal dilanjutkan dengan konsultasi online dokter sebelum tindakan.' },
            { title: 'Terintegrasi dengan Perawatan Lainnya', desc: 'Apabila diperlukan, kondisi pasien dapat ditindaklanjuti dengan layanan medis dan homecare lainnya sesuai rekomendasi dokter.' }
        ];

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
            sectionHead('Pilih Layanan Dokter atau Perawat', 'Tindakan suction dapat dilakukan oleh dokter maupun perawat sesuai kondisi dan kebutuhan pasien. Setiap tindakan tetap dilakukan berdasarkan penilaian dan rekomendasi dokter.', e.pathTitle, e.pathLead)
            + doctorNursePathCards({
                e,
                doctorTitle: 'Suction oleh Dokter',
                doctorP1: 'Dokter datang langsung ke rumah untuk melakukan pemeriksaan kondisi pasien, termasuk kondisi pernapasan dan kebutuhan tindakan.',
                doctorP2: 'Apabila berdasarkan hasil pemeriksaan suction diperlukan dan sesuai dilakukan di rumah, dokter dapat melakukan tindakan serta mengevaluasi respons pasien setelahnya.',
                doctorFlow, doctorFlowEn,
                nurseTitle: 'Suction oleh Perawat',
                nurseP1: 'Perawat datang ke rumah dan melakukan pemeriksaan awal kondisi pasien. Hasil pemeriksaan disampaikan kepada dokter, kemudian pasien atau keluarga melakukan konsultasi online dengan dokter.',
                nurseP2: 'Apabila dokter merekomendasikan suction, perawat akan melakukan tindakan sesuai rencana yang diberikan dokter dan memantau kondisi pasien.',
                nurseFlow, nurseFlowEn
            }),
            sectionHead('Bagaimana Suction Dilakukan?', 'Proses Suction di Rumah', e.howTitle, e.howLead)
            + howStepCards(howSteps, e.howSteps),
            sectionHead('Jenis Kebutuhan Suction', null, e.typesTitle)
            + iconInfoCards(typeItems, e.typeItems, typeIcons),
            sectionHead('Mengapa Suction dengan Dokter Panggil?', null, e.whyTitle)
            + whyCards(whyItems, e.whyItems, ['stethoscope', 'home', 'message-circle', 'share-2']),
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
