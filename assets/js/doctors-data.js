/**
 * Shared doctor directory data. Used by doctors-directory.js on dokter/index.html.
 * Source: Form Wording DRP — daftar dokter (Wording dari Client).
 * Keep bios factual; do not invent ratings, years, or photos.
 */
(function (global) {
    const DOC_CATEGORIES = [
        { key: 'all', id: 'Semua', en: 'All' },
        { key: 'umum', id: 'Dokter Umum', en: 'General Practitioner' },
        { key: 'spesialis', id: 'Dokter Spesialis', en: 'Specialist' },
        { key: 'perawat', id: 'Perawat', en: 'Nurse' },
        { key: 'fisio', id: 'Fisioterapis', en: 'Physiotherapist' }
    ];

    const SPECIALTIES = {
        saraf: { id: 'Saraf', en: 'Neurology', icon: 'brain' },
        'penyakit-dalam': { id: 'Penyakit Dalam', en: 'Internal Medicine', icon: 'stethoscope' },
        paru: { id: 'Paru', en: 'Pulmonology', icon: 'wind' },
        anestesi: { id: 'Anestesi & Nyeri', en: 'Anesthesia & Pain', icon: 'activity' },
        mata: { id: 'Mata', en: 'Ophthalmology', icon: 'eye' },
        tht: { id: 'THT', en: 'ENT', icon: 'ear' },
        laktasi: { id: 'Konselor Laktasi', en: 'Lactation Counselor', icon: 'heart' },
        gizi: { id: 'Gizi Klinik', en: 'Clinical Nutrition', icon: 'utensils' },
        jantung: { id: 'Jantung', en: 'Cardiology', icon: 'heart' },
        anak: { id: 'Anak', en: 'Pediatrics', icon: 'baby' },
        jiwa: { id: 'Kedokteran Jiwa', en: 'Psychiatry', icon: 'smile' }
    };

    const TINTS = [
        '#D83030', '#B45309', '#0F766E', '#1D4ED8',
        '#7C3AED', '#BE185D', '#047857', '#C2410C'
    ];

    function doc(partial) {
        return Object.assign({
            category: 'spesialis',
            photo: ''
        }, partial);
    }

    const DOCTORS = [
        doc({
            id: 'fransiska',
            name: 'dr. Fransiska Carmelia Subeno, Sp.N',
            initials: 'FS',
            tint: TINTS[0],
            specialty: 'saraf',
            role: { id: 'Dokter Spesialis Saraf', en: 'Neurologist' },
            bio: {
                id: 'Menangani berbagai gangguan pada otak, saraf, tulang belakang, dan sistem saraf, termasuk evaluasi pasien dengan gangguan gerak, sensasi, keseimbangan, maupun kondisi neurologis yang membutuhkan pemantauan di rumah.',
                en: 'Treats disorders of the brain, nerves, spine, and nervous system, including evaluation of movement, sensation, balance, and neurological conditions that need monitoring at home.'
            },
            conditions: {
                id: ['Sakit Kepala & Migrain', 'Vertigo', 'Kesemutan & Kebas', 'Nyeri Saraf', 'Tremor', 'Gangguan Gerak', 'Epilepsi & Kejang', 'Stroke & Pasca-Stroke', 'Gangguan Memori', 'Pemantauan Kondisi Neurologis'],
                en: ['Headache & Migraine', 'Vertigo', 'Tingling & Numbness', 'Nerve Pain', 'Tremor', 'Movement Disorders', 'Epilepsy & Seizures', 'Stroke & Post-Stroke', 'Memory Problems', 'Neurological Monitoring']
            },
            alumni: 'Universitas Hasanuddin',
            practice: ['RS Siloam Makassar', 'RS Wahidin Sudirohusodo']
        }),
        doc({
            id: 'leonard',
            name: 'dr. Leonard Prawiharjo, Sp.PD',
            initials: 'LP',
            tint: TINTS[1],
            specialty: 'penyakit-dalam',
            role: { id: 'Dokter Spesialis Penyakit Dalam', en: 'Internal Medicine Specialist' },
            bio: {
                id: 'Menangani berbagai keluhan dan penyakit pada pasien dewasa, mulai dari gangguan kesehatan akut hingga penyakit kronis yang membutuhkan evaluasi, pengobatan, dan pemantauan secara berkala.',
                en: 'Treats a range of adult conditions, from acute illness to chronic disease that needs evaluation, treatment, and regular monitoring.'
            },
            conditions: {
                id: ['Diabetes', 'Hipertensi', 'Kolesterol', 'Asam Urat', 'Gangguan Lambung & Pencernaan', 'Gangguan Hati', 'Gangguan Ginjal', 'Penyakit Infeksi pada Dewasa', 'Gangguan Metabolik', 'Penyakit Kronis', 'Evaluasi Hasil Laboratorium & Medical Check Up'],
                en: ['Diabetes', 'Hypertension', 'Cholesterol', 'Gout', 'Stomach & Digestive Issues', 'Liver Disorders', 'Kidney Disorders', 'Adult Infections', 'Metabolic Disorders', 'Chronic Disease', 'Lab Results & Medical Check-up Review']
            },
            alumni: 'Universitas Hasanuddin',
            practice: ['RS Grestelina']
        }),
        doc({
            id: 'late-reza',
            name: 'dr. Andi Muhammad Late Reza, Sp.P, AIFO-K',
            initials: 'AR',
            tint: TINTS[2],
            specialty: 'paru',
            role: { id: 'Dokter Spesialis Paru', en: 'Pulmonologist' },
            bio: {
                id: 'Menangani berbagai keluhan dan penyakit pada paru serta sistem pernapasan, termasuk gangguan pernapasan akut maupun kronis yang membutuhkan evaluasi, pengobatan, atau pemantauan di rumah.',
                en: 'Treats lung and respiratory conditions, including acute or chronic breathing problems that need evaluation, treatment, or monitoring at home.'
            },
            conditions: {
                id: ['Batuk Berkepanjangan', 'Sesak Napas', 'Asma', 'PPOK', 'Infeksi Saluran Pernapasan', 'Pneumonia', 'Tuberkulosis', 'Gangguan Pernapasan Berulang', 'Evaluasi Hasil Pemeriksaan Paru', 'Pemantauan Penyakit Paru'],
                en: ['Prolonged Cough', 'Shortness of Breath', 'Asthma', 'COPD', 'Respiratory Infections', 'Pneumonia', 'Tuberculosis', 'Recurrent Breathing Problems', 'Lung Test Review', 'Lung Disease Monitoring']
            },
            alumni: 'Universitas Hasanuddin',
            practice: ['RS Faisal', 'RS Universitas Indonesia Timur']
        }),
        doc({
            id: 'remo',
            name: 'dr. Muhammad Remo Lingga Riesta Armyda, Sp.An',
            initials: 'RA',
            tint: TINTS[3],
            specialty: 'anestesi',
            role: { id: 'Dokter Spesialis Anestesi', en: 'Anesthesiologist' },
            bio: {
                id: 'Berperan dalam evaluasi dan pengelolaan nyeri serta dukungan perawatan paliatif pada pasien dengan kondisi tertentu yang membutuhkan penanganan di rumah.',
                en: 'Focuses on pain evaluation and management, plus palliative support for patients who need care at home.'
            },
            conditions: {
                id: ['Nyeri Akut', 'Nyeri Kronis', 'Nyeri Kanker', 'Nyeri Pascaoperasi', 'Nyeri Neuropatik', 'Manajemen Nyeri pada Penyakit Kronis', 'Perawatan Paliatif', 'Evaluasi Terapi Nyeri', 'Pemantauan Kenyamanan Pasien'],
                en: ['Acute Pain', 'Chronic Pain', 'Cancer Pain', 'Post-operative Pain', 'Neuropathic Pain', 'Pain Management in Chronic Disease', 'Palliative Care', 'Pain Therapy Review', 'Comfort Monitoring']
            },
            alumni: 'Universitas Udayana',
            practice: ['RS Kemenkes CPI']
        }),
        doc({
            id: 'nurul',
            name: 'dr. Nurul Rezqi Amaliah, Sp.M',
            initials: 'NA',
            tint: TINTS[4],
            specialty: 'mata',
            role: { id: 'Dokter Spesialis Mata', en: 'Ophthalmologist' },
            bio: {
                id: 'Menangani berbagai keluhan dan gangguan kesehatan mata serta penglihatan yang dapat dievaluasi melalui pemeriksaan dokter di rumah.',
                en: 'Treats eye and vision complaints that can be evaluated through a doctor exam at home.'
            },
            conditions: {
                id: ['Mata Merah', 'Mata Kering', 'Iritasi Mata', 'Nyeri Mata', 'Penglihatan Kabur', 'Infeksi Mata', 'Katarak', 'Glaukoma', 'Gangguan Penglihatan', 'Pemantauan Kondisi Mata'],
                en: ['Red Eye', 'Dry Eye', 'Eye Irritation', 'Eye Pain', 'Blurred Vision', 'Eye Infection', 'Cataract', 'Glaucoma', 'Vision Problems', 'Eye Condition Monitoring']
            },
            alumni: 'Universitas Hasanuddin',
            practice: ['RS Hermina Makassar', 'RS Mata Makassar']
        }),
        doc({
            id: 'emil',
            name: 'dr. Emil Kardani Murdiyanto, Sp.THT-BKL',
            initials: 'EM',
            tint: TINTS[5],
            specialty: 'tht',
            role: { id: 'Dokter Spesialis THT', en: 'ENT Specialist' },
            bio: {
                id: 'Menangani berbagai keluhan dan penyakit pada telinga, hidung, tenggorokan, serta area kepala dan leher yang berkaitan dengan bidang THT melalui pemeriksaan langsung di rumah sesuai kondisi pasien.',
                en: 'Treats ear, nose, throat, and related head-and-neck complaints through a home exam matched to the patient’s condition.'
            },
            conditions: {
                id: ['Nyeri Telinga', 'Infeksi Telinga', 'Telinga Berdenging', 'Gangguan Pendengaran', 'Hidung Tersumbat', 'Alergi Hidung', 'Sinusitis', 'Mimisan', 'Nyeri Tenggorokan', 'Gangguan Amandel', 'Suara Serak'],
                en: ['Ear Pain', 'Ear Infection', 'Tinnitus', 'Hearing Problems', 'Nasal Congestion', 'Nasal Allergy', 'Sinusitis', 'Nosebleed', 'Sore Throat', 'Tonsil Problems', 'Hoarseness']
            },
            alumni: 'Universitas Hasanuddin',
            practice: ['RS Sandi Karsa', 'RS Islam Faisal']
        }),
        doc({
            id: 'muchlisah',
            name: 'dr. Muchlisah Suci Chumaira',
            initials: 'MC',
            tint: TINTS[6],
            specialty: 'laktasi',
            role: { id: 'Dokter Konselor Laktasi', en: 'Lactation Counselor' },
            bio: {
                id: 'Membantu ibu dan keluarga dalam berbagai kebutuhan dan permasalahan menyusui, mulai dari persiapan menyusui hingga mengatasi tantangan selama proses pemberian ASI.',
                en: 'Helps mothers and families with breastfeeding needs, from preparation through challenges during breastfeeding.'
            },
            conditions: {
                id: ['Persiapan Menyusui', 'Posisi & Perlekatan', 'Produksi ASI', 'ASI Terasa Kurang', 'Payudara Bengkak', 'Nyeri saat Menyusui', 'Pumping ASI', 'Penyimpanan ASI', 'Menyusui pada Ibu Bekerja', 'Relaktasi', 'Persiapan Menyapih'],
                en: ['Breastfeeding Preparation', 'Latch & Positioning', 'Milk Supply', 'Low Milk Supply', 'Breast Engorgement', 'Pain While Breastfeeding', 'Pumping', 'Breast Milk Storage', 'Breastfeeding for Working Mothers', 'Relactation', 'Weaning Preparation']
            },
            alumni: 'Universitas Hasanuddin',
            practice: []
        }),
        doc({
            id: 'caroline',
            name: 'dr. Caroline, Sp.GK',
            initials: 'CA',
            tint: TINTS[7],
            specialty: 'gizi',
            role: { id: 'Dokter Spesialis Gizi Klinik', en: 'Clinical Nutrition Specialist' },
            bio: {
                id: 'Menangani berbagai masalah nutrisi dan kondisi medis yang membutuhkan pengaturan gizi, termasuk pasien dengan penyakit kronis, gangguan berat badan, maupun kebutuhan nutrisi selama proses pemulihan.',
                en: 'Treats nutrition problems and medical conditions that need dietary management, including chronic disease, weight issues, and nutrition during recovery.'
            },
            conditions: {
                id: ['Obesitas', 'Berat Badan Kurang', 'Malnutrisi', 'Diabetes', 'Gangguan Metabolik', 'Nutrisi pada Penyakit Ginjal', 'Nutrisi pada Penyakit Hati', 'Nutrisi pada Penyakit Kronis', 'Nutrisi Lansia', 'Nutrisi selama Pemulihan'],
                en: ['Obesity', 'Underweight', 'Malnutrition', 'Diabetes', 'Metabolic Disorders', 'Nutrition in Kidney Disease', 'Nutrition in Liver Disease', 'Nutrition in Chronic Disease', 'Elderly Nutrition', 'Nutrition During Recovery']
            },
            alumni: 'Universitas Hasanuddin',
            practice: ['RS Hermina Makassar']
        }),
        doc({
            id: 'grace',
            name: "dr. Grace Musu'Tombilayuk, Sp.GK",
            initials: 'GM',
            tint: TINTS[0],
            specialty: 'gizi',
            role: { id: 'Dokter Spesialis Gizi Klinik', en: 'Clinical Nutrition Specialist' },
            bio: {
                id: 'Menangani berbagai masalah nutrisi dan kondisi medis yang membutuhkan pengaturan gizi, termasuk pasien dengan penyakit kronis, gangguan berat badan, maupun kebutuhan nutrisi selama proses pemulihan.',
                en: 'Treats nutrition problems and medical conditions that need dietary management, including chronic disease, weight issues, and nutrition during recovery.'
            },
            conditions: {
                id: ['Obesitas', 'Berat Badan Kurang', 'Malnutrisi', 'Diabetes', 'Gangguan Metabolik', 'Nutrisi pada Penyakit Ginjal', 'Nutrisi pada Penyakit Hati', 'Nutrisi pada Penyakit Kronis', 'Nutrisi Lansia', 'Nutrisi selama Pemulihan'],
                en: ['Obesity', 'Underweight', 'Malnutrition', 'Diabetes', 'Metabolic Disorders', 'Nutrition in Kidney Disease', 'Nutrition in Liver Disease', 'Nutrition in Chronic Disease', 'Elderly Nutrition', 'Nutrition During Recovery']
            },
            alumni: 'Universitas Hasanuddin',
            practice: ['RS Kemenkes CPI']
        }),
        doc({
            id: 'daniel',
            name: 'dr. Daniel S Lawrence, Sp.JP, FIHA',
            initials: 'DL',
            tint: TINTS[1],
            specialty: 'jantung',
            role: { id: 'Dokter Spesialis Jantung', en: 'Cardiologist' },
            bio: {
                id: 'Menangani berbagai keluhan dan penyakit pada jantung serta pembuluh darah, termasuk evaluasi faktor risiko dan pemantauan pasien dengan penyakit kardiovaskular.',
                en: 'Treats heart and blood-vessel conditions, including risk-factor evaluation and monitoring of cardiovascular disease.'
            },
            conditions: {
                id: ['Hipertensi', 'Jantung Berdebar', 'Gangguan Irama Jantung', 'Penyakit Jantung Koroner', 'Gagal Jantung', 'Kolesterol & Risiko Kardiovaskular', 'Evaluasi EKG', 'Pemantauan Tekanan Darah', 'Pemantauan Penyakit Jantung'],
                en: ['Hypertension', 'Palpitations', 'Heart Rhythm Disorders', 'Coronary Heart Disease', 'Heart Failure', 'Cholesterol & Cardiovascular Risk', 'ECG Review', 'Blood Pressure Monitoring', 'Heart Disease Monitoring']
            },
            alumni: 'Universitas Hasanuddin',
            practice: ['RS dr. La Palaloi']
        }),
        doc({
            id: 'usman',
            name: 'dr. Usman Darwis, Sp.A',
            initials: 'UD',
            tint: TINTS[2],
            specialty: 'anak',
            role: { id: 'Dokter Spesialis Anak', en: 'Pediatrician' },
            bio: {
                id: 'Menangani berbagai keluhan dan kondisi kesehatan pada bayi, anak, dan remaja, termasuk penyakit umum pada anak, masalah pertumbuhan dan perkembangan, nutrisi, serta pemantauan kondisi kesehatan anak.',
                en: 'Treats health concerns in infants, children, and adolescents, including common childhood illness, growth and development, nutrition, and ongoing child health monitoring.'
            },
            conditions: {
                id: ['Demam', 'Batuk & Pilek', 'Gangguan Pernapasan', 'Gangguan Pencernaan', 'Alergi pada Anak', 'Masalah Makan', 'Pertumbuhan & Berat Badan', 'Tumbuh Kembang', 'Imunisasi', 'Pemantauan Kesehatan Anak'],
                en: ['Fever', 'Cough & Cold', 'Breathing Problems', 'Digestive Problems', 'Allergies in Children', 'Feeding Issues', 'Growth & Weight', 'Development', 'Immunization', 'Child Health Monitoring']
            },
            alumni: 'Universitas Hasanuddin',
            practice: ['RS Hermina Makassar']
        }),
        doc({
            id: 'dessy',
            name: 'dr. Dessy Natalia, Sp.KJ',
            initials: 'DN',
            tint: TINTS[3],
            specialty: 'jiwa',
            role: { id: 'Dokter Spesialis Kedokteran Jiwa', en: 'Psychiatrist' },
            bio: {
                id: 'Menangani berbagai gangguan kesehatan mental, emosional, perilaku, dan kondisi psikiatri, termasuk evaluasi, pengobatan, serta pemantauan pasien di lingkungan rumah.',
                en: 'Treats mental, emotional, behavioral, and psychiatric conditions, including evaluation, treatment, and monitoring at home.'
            },
            conditions: {
                id: ['Kecemasan', 'Depresi', 'Gangguan Mood', 'Serangan Panik', 'Gangguan Tidur', 'Stres & Gangguan Penyesuaian', 'Gangguan Perilaku', 'Gangguan Psikiatri', 'Evaluasi Kondisi Mental', 'Pemantauan Pengobatan'],
                en: ['Anxiety', 'Depression', 'Mood Disorders', 'Panic Attacks', 'Sleep Problems', 'Stress & Adjustment Disorders', 'Behavioral Disorders', 'Psychiatric Conditions', 'Mental Health Evaluation', 'Medication Monitoring']
            },
            alumni: 'Universitas Hasanuddin',
            practice: ['RS Hermina Makassar']
        })
    ];

    global.DOC_CATEGORIES = DOC_CATEGORIES;
    global.SPECIALTIES = SPECIALTIES;
    global.DOCTORS = DOCTORS;
})(typeof window !== 'undefined' ? window : global);
