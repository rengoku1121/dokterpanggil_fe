/**
 * Single source of truth for every service on the site.
 *
 * TO ADD A NEW SERVICE:
 *   1. Copy any entry in SERVICES below and change its content.
 *      Only `slug` must be unique.
 *   2. Run:  node tools/build-services.js
 *      (refreshes homepage cards/footer; cards still open the detail modal)
 *   3. Optional SEO landing page: add a SERVICE_SEO entry in seo-data.js,
 *      then run node tools/build-seo.js
 *
 * Loads both in the browser (as globals) and in Node (module.exports).
 */
(function (root, factory) {
    const api = factory();
    if (typeof module === 'object' && module.exports) module.exports = api;
    else Object.keys(api).forEach(k => { root[k] = api[k]; });
})(typeof self !== 'undefined' ? self : this, function () {

    const WA_NUMBER = '628114677700';

    /** UI labels for the service detail modal. */
    const COMMON = {
        'sec.forWho': { id: 'Cocok untuk Siapa', en: 'Who This Is For' },
        'sec.includes': { id: 'Yang Termasuk', en: "What's Included" },
        'sec.excludes': { id: 'Yang Tidak Termasuk', en: "What's Not Included" },
        'sec.steps': { id: 'Alur Pemesanan', en: 'How It Works' },
        'sec.team': { id: 'Standar Tenaga Kesehatan', en: 'Our Care Standards' },
        'sec.cost': { id: 'Informasi Biaya', en: 'Pricing Information' },
        'sec.faq': { id: 'Pertanyaan Umum', en: 'FAQ' },
        'cost.body': {
            id: 'Biaya menyesuaikan jenis tindakan, kebutuhan pasien, dan lokasi. Estimasi dikonfirmasi sebelum kunjungan dijadwalkan.',
            en: 'Costs depend on the procedure, patient needs, and location. An estimate is confirmed before the visit is scheduled.'
        },
        'trust.1': { id: 'Tenaga terverifikasi', en: 'Verified professionals' },
        'trust.2': { id: 'Datang ke rumah', en: 'At your home' },
        'trust.3': { id: 'Biaya dikonfirmasi dulu', en: 'Cost confirmed first' },
        'cta.book': { id: 'Pesan Sekarang', en: 'Book Now' },
        'cta.ask': { id: 'Chat WhatsApp', en: 'Chat WhatsApp' },
        'emergency.title': { id: 'Untuk kondisi gawat darurat', en: 'For medical emergencies' },
        'emergency.body': {
            id: 'Layanan ini untuk kebutuhan non-darurat. Bila nyeri dada hebat, sesak napas berat, perdarahan yang tidak berhenti, atau penurunan kesadaran, segera hubungi 119 atau ke IGD terdekat.',
            en: 'This service is for non-emergency care. For severe chest pain, serious breathing difficulty, uncontrolled bleeding, or loss of consciousness, call 119 or go to the nearest ER.'
        }
    };

    const SERVICES = [
        {
                    slug: "kunjungan-dokter",
                    icon: "stethoscope",
                    image: "photo-1758691462321-9b6c98c40f7e",
                    imageAlt: {
                        id: "Dokter berkonsultasi dengan pasien lansia di rumah",
                        en: "A doctor consulting an elderly patient at home"
                    },
                    name: {
                        id: "Dokter Umum 24 Jam",
                        en: "GP Visit 24 Hours"
                    },
                    short: {
                        id: "Dokter Umum 24 Jam",
                        en: "GP Visit 24 Hours"
                    },
                    tagline: {
                        id: "Dokter umum siap datang ke rumah Anda untuk pemeriksaan, diagnosis, pengobatan, dan tindakan medis ringan sehingga Anda memperoleh pelayanan kesehatan tanpa perlu keluar rumah.",
                        en: "A GP is ready to come to your home for examination, diagnosis, treatment, and minor procedures so you get care without leaving home."
                    },
                    summary: {
                        id: "Dokter umum siap datang ke rumah Anda untuk pemeriksaan, diagnosis, pengobatan, dan tindakan medis ringan sehingga Anda memperoleh pelayanan kesehatan tanpa perlu keluar rumah.",
                        en: "A GP is ready to come to your home for examination, diagnosis, treatment, and minor procedures so you get care without leaving home."
                    },
                    forWho: {
                        id: [
                            "Demam, batuk, atau keluhan harian yang perlu diperiksa",
                            "Pasien lansia yang sulit bepergian ke klinik",
                            "Kontrol lanjutan pascarawat inap",
                            "Keluarga yang ingin menghindari antre"
                        ],
                        en: [
                            "Fever, cough, or everyday complaints needing a check",
                            "Elderly patients who find clinic travel difficult",
                            "Follow-up after a hospital stay",
                            "Families who prefer to avoid queues"
                        ]
                    },
                    includes: {
                        id: [
                            "Wawancara riwayat & pemeriksaan fisik",
                            "Pemeriksaan tanda vital",
                            "Penjelasan diagnosis awal & rencana",
                            "Resep obat bila diperlukan",
                            "Surat rujukan bila dibutuhkan",
                            "Edukasi perawatan untuk keluarga"
                        ],
                        en: [
                            "History review & physical exam",
                            "Vital signs check",
                            "Initial diagnosis & plan explained",
                            "Prescription when needed",
                            "Referral letter if required",
                            "Care guidance for the family"
                        ]
                    },
                    excludes: {
                        id: [
                            "Tindakan gawat darurat & resusitasi",
                            "Pemeriksaan radiologi (rontgen, USG, CT)",
                            "Obat di luar yang disepakati"
                        ],
                        en: [
                            "Emergency care & resuscitation",
                            "Imaging (X-ray, ultrasound, CT)",
                            "Medication beyond what was agreed"
                        ]
                    },
                    team: {
                        id: "Ditangani dokter berlisensi dengan STR aktif. Kami mencocokkan dokter umum atau spesialis sesuai keluhan saat pemesanan.",
                        en: "Handled by licensed doctors with active registration. We match a GP or specialist to the symptoms you describe when booking."
                    },
                    faq: [
                        {
                            q: {
                                id: "Berapa lama satu kali kunjungan?",
                                en: "How long does a visit take?"
                            },
                            a: {
                                id: "Biasanya sekitar 30â€“60 menit, termasuk pemeriksaan dan penjelasan rencana.",
                                en: "Usually about 30â€“60 minutes, including the exam and treatment plan."
                            }
                        },
                        {
                            q: {
                                id: "Bisa minta dokter spesialis tertentu?",
                                en: "Can I request a specialist?"
                            },
                            a: {
                                id: "Bisa. Sampaikan saat pemesanan; tim mengonfirmasi ketersediaan di area Anda.",
                                en: "Yes. Mention it when booking; we confirm availability in your area."
                            }
                        },
                        {
                            q: {
                                id: "Apakah obat disediakan saat kunjungan?",
                                en: "Is medication provided?"
                            },
                            a: {
                                id: "Dokter membawa obat dasar. Untuk obat tertentu, diberikan resep atau dibantu pengadaannya bila memungkinkan.",
                                en: "Basic medicines are carried. Specific drugs get a prescription, or we help arrange them where possible."
                            }
                        },
                        {
                            q: {
                                id: "Bagaimana jika pasien perlu dirujuk?",
                                en: "What if a referral is needed?"
                            },
                            a: {
                                id: "Dokter menjelaskan alasannya, menerbitkan surat rujukan, dan membantu langkah berikutnya.",
                                en: "The doctor explains why, issues a referral, and helps with next steps."
                            }
                        }
                    ]
                },
        {
                    slug: "kunjungan-dokter-spesialis",
                    icon: "heart-pulse",
                    image: "photo-1758691462321-9b6c98c40f7e",
                    imageAlt: {
                        id: "Layanan Dokter Spesialis Dokter Panggil",
                        en: "Specialist Doctor service by Dokter Panggil"
                    },
                    name: {
                        id: "Dokter Spesialis",
                        en: "Specialist Doctor"
                    },
                    short: {
                        id: "Dokter Spesialis",
                        en: "Specialist Doctor"
                    },
                    tagline: {
                        id: "Dokter spesialis profesional siap memberikan konsultasi, pemeriksaan, dan penanganan sesuai bidang keahlian sehingga Anda mendapatkan pelayanan medis yang tepat langsung di rumah.",
                        en: "Specialist doctors are ready for consultation, examination, and care in their field of expertise so you get the right medical care at home."
                    },
                    summary: {
                        id: "Dokter spesialis profesional siap memberikan konsultasi, pemeriksaan, dan penanganan sesuai bidang keahlian sehingga Anda mendapatkan pelayanan medis yang tepat langsung di rumah.",
                        en: "Specialist doctors are ready for consultation, examination, and care in their field of expertise so you get the right medical care at home."
                    },
                    forWho: {
                        id: [
                            "Pasien yang membutuhkan layanan ini di rumah",
                            "Keluarga yang ingin perawatan lebih nyaman tanpa ke fasilitas kesehatan",
                            "Kondisi non-darurat sesuai indikasi medis"
                        ],
                        en: [
                            "Patients who need this service at home",
                            "Families who prefer comfortable care without visiting a facility",
                            "Non-emergency needs with medical indication"
                        ]
                    },
                    includes: {
                        id: [
                            "Penilaian kebutuhan oleh tim Dokter Panggil",
                            "Pelayanan sesuai indikasi medis",
                            "Koordinasi jadwal dan biaya sebelum kunjungan",
                            "Edukasi untuk pasien dan keluarga"
                        ],
                        en: [
                            "Needs assessment by the Dokter Panggil team",
                            "Care based on medical indication",
                            "Schedule and fee coordination before the visit",
                            "Guidance for patient and family"
                        ]
                    },
                    excludes: {
                        id: [
                            "Kondisi gawat darurat yang membutuhkan IGD",
                            "Tindakan di luar indikasi medis",
                            "Layanan di luar jangkauan operasional"
                        ],
                        en: [
                            "Emergencies that need an ER",
                            "Procedures without medical indication",
                            "Services outside the operating area"
                        ]
                    },
                    team: {
                        id: "Ditangani tenaga kesehatan profesional Dokter Panggil sesuai kompetensi dan kebutuhan pasien.",
                        en: "Handled by Dokter Panggil healthcare professionals matched to competence and patient needs."
                    },
                    faq: [
                        {
                            q: {
                                id: "Bagaimana cara memesan layanan ini?",
                                en: "How do I book this service?"
                            },
                            a: {
                                id: "Hubungi Call Centre Dokter Panggil 24 jam via WhatsApp atau telepon, sampaikan kebutuhan dan lokasi pasien.",
                                en: "Contact the Dokter Panggil 24-hour call centre via WhatsApp or phone and share the patient needs and location."
                            }
                        },
                        {
                            q: {
                                id: "Apakah biaya dikonfirmasi dulu?",
                                en: "Are fees confirmed first?"
                            },
                            a: {
                                id: "Ya. Tim kami menginformasikan estimasi biaya sebelum layanan dikonfirmasi.",
                                en: "Yes. Our team shares a fee estimate before the service is confirmed."
                            }
                        },
                        {
                            q: {
                                id: "Wilayah mana yang dilayani?",
                                en: "Which areas are served?"
                            },
                            a: {
                                id: "Makassar, Gowa, dan Maros dalam jangkauan operasional sekitar 20 km dari lokasi klinik.",
                                en: "Makassar, Gowa, and Maros within about a 20 km operating radius from the clinic."
                            }
                        }
                    ]
                },
        {
                    slug: "perawatan-lansia",
                    icon: "helping-hand",
                    image: "photo-1765896387387-0538bc9f997e",
                    imageAlt: {
                        id: "Perawat mendampingi pasien lansia",
                        en: "A nurse supporting an elderly patient"
                    },
                    name: {
                        id: "Rawat Inap di Rumah",
                        en: "Home Inpatient Care"
                    },
                    short: {
                        id: "Rawat Inap di Rumah",
                        en: "Home Inpatient Care"
                    },
                    tagline: {
                        id: "Layanan rawat inap dengan pemantauan dokter dan perawat sehingga pasien dapat menjalani perawatan secara nyaman, aman, dan terpantau di rumah.",
                        en: "Inpatient-style care with doctor and nurse monitoring so patients can recover comfortably, safely, and under observation at home."
                    },
                    summary: {
                        id: "Layanan rawat inap dengan pemantauan dokter dan perawat sehingga pasien dapat menjalani perawatan secara nyaman, aman, dan terpantau di rumah.",
                        en: "Inpatient-style care with doctor and nurse monitoring so patients can recover comfortably, safely, and under observation at home."
                    },
                    forWho: {
                        id: [
                            "Lansia dengan penyakit kronis",
                            "Keterbatasan mobilitas",
                            "Keluarga yang bekerja (pendampingan siang)",
                            "Pengawasan jadwal obat"
                        ],
                        en: [
                            "Seniors with chronic conditions",
                            "Limited mobility",
                            "Working families needing daytime support",
                            "Medication schedule support"
                        ]
                    },
                    includes: {
                        id: [
                            "Pemantauan tanda vital berkala",
                            "Pendampingan minum obat",
                            "Bantuan kebersihan & aktivitas harian",
                            "Mobilisasi & latihan ringan",
                            "Pemantauan makan & cairan",
                            "Laporan berkala ke keluarga"
                        ],
                        en: [
                            "Regular vital signs",
                            "Medication support",
                            "Hygiene & daily activities",
                            "Mobility & light exercise",
                            "Meal & fluid monitoring",
                            "Regular family reports"
                        ]
                    },
                    excludes: {
                        id: [
                            "Tindakan medis tanpa instruksi dokter",
                            "Perawatan intensif rumah sakit",
                            "Pekerjaan rumah tangga umum"
                        ],
                        en: [
                            "Medical procedures without a doctor’s order",
                            "Hospital-level intensive care",
                            "General housework"
                        ]
                    },
                    team: {
                        id: "Perawat dan caregiver terlatih yang terbiasa dengan pasien lansia. Laporan kondisi dikirim berkala ke keluarga.",
                        en: "Trained nurses and caregivers experienced with older patients. Condition reports go to the family regularly."
                    },
                    faq: [
                        {
                            q: {
                                id: "Jadwal bisa disesuaikan?",
                                en: "Flexible schedule?"
                            },
                            a: {
                                id: "Bisa â€” per kunjungan, harian, atau mengikuti pola keluarga.",
                                en: "Yes â€” per visit, daily, or around your family’s routine."
                            }
                        },
                        {
                            q: {
                                id: "Membantu pekerjaan rumah?",
                                en: "Help with housework?"
                            },
                            a: {
                                id: "Fokus pada kebutuhan perawatan pasien, bukan pekerjaan rumah tangga umum.",
                                en: "Focus is patient care needs, not general housework."
                            }
                        },
                        {
                            q: {
                                id: "Bagaimana keluarga memantau?",
                                en: "How does the family stay informed?"
                            },
                            a: {
                                id: "Tim mencatat kondisi penting dan melaporkannya secara berkala.",
                                en: "Key conditions are recorded and shared regularly."
                            }
                        },
                        {
                            q: {
                                id: "Bisa merawat pasien demensia?",
                                en: "Dementia care?"
                            },
                            a: {
                                id: "Sampaikan kondisi secara rinci saat pemesanan agar pendamping yang tepat dicocokkan.",
                                en: "Describe the condition in detail when booking so we match the right caregiver."
                            }
                        }
                    ]
                },
        {
                    slug: "konsultasi-online",
                    icon: "monitor-smartphone",
                    image: "photo-1576091160399-112ba8d25d1d",
                    imageAlt: {
                        id: "Layanan Konsultasi Online Dokter Panggil",
                        en: "Online Consultation service by Dokter Panggil"
                    },
                    name: {
                        id: "Konsultasi Online",
                        en: "Online Consultation"
                    },
                    short: {
                        id: "Konsultasi Online",
                        en: "Online Consultation"
                    },
                    tagline: {
                        id: "Konsultasikan keluhan kesehatan Anda dengan dokter secara daring sehingga Anda memperoleh saran medis dengan cepat tanpa harus datang ke fasilitas kesehatan.",
                        en: "Consult a doctor online about your health concerns to get medical advice quickly without visiting a healthcare facility."
                    },
                    summary: {
                        id: "Konsultasikan keluhan kesehatan Anda dengan dokter secara daring sehingga Anda memperoleh saran medis dengan cepat tanpa harus datang ke fasilitas kesehatan.",
                        en: "Consult a doctor online about your health concerns to get medical advice quickly without visiting a healthcare facility."
                    },
                    forWho: {
                        id: [
                            "Pasien yang membutuhkan layanan ini di rumah",
                            "Keluarga yang ingin perawatan lebih nyaman tanpa ke fasilitas kesehatan",
                            "Kondisi non-darurat sesuai indikasi medis"
                        ],
                        en: [
                            "Patients who need this service at home",
                            "Families who prefer comfortable care without visiting a facility",
                            "Non-emergency needs with medical indication"
                        ]
                    },
                    includes: {
                        id: [
                            "Penilaian kebutuhan oleh tim Dokter Panggil",
                            "Pelayanan sesuai indikasi medis",
                            "Koordinasi jadwal dan biaya sebelum kunjungan",
                            "Edukasi untuk pasien dan keluarga"
                        ],
                        en: [
                            "Needs assessment by the Dokter Panggil team",
                            "Care based on medical indication",
                            "Schedule and fee coordination before the visit",
                            "Guidance for patient and family"
                        ]
                    },
                    excludes: {
                        id: [
                            "Kondisi gawat darurat yang membutuhkan IGD",
                            "Tindakan di luar indikasi medis",
                            "Layanan di luar jangkauan operasional"
                        ],
                        en: [
                            "Emergencies that need an ER",
                            "Procedures without medical indication",
                            "Services outside the operating area"
                        ]
                    },
                    team: {
                        id: "Ditangani tenaga kesehatan profesional Dokter Panggil sesuai kompetensi dan kebutuhan pasien.",
                        en: "Handled by Dokter Panggil healthcare professionals matched to competence and patient needs."
                    },
                    faq: [
                        {
                            q: {
                                id: "Bagaimana cara memesan layanan ini?",
                                en: "How do I book this service?"
                            },
                            a: {
                                id: "Hubungi Call Centre Dokter Panggil 24 jam via WhatsApp atau telepon, sampaikan kebutuhan dan lokasi pasien.",
                                en: "Contact the Dokter Panggil 24-hour call centre via WhatsApp or phone and share the patient needs and location."
                            }
                        },
                        {
                            q: {
                                id: "Apakah biaya dikonfirmasi dulu?",
                                en: "Are fees confirmed first?"
                            },
                            a: {
                                id: "Ya. Tim kami menginformasikan estimasi biaya sebelum layanan dikonfirmasi.",
                                en: "Yes. Our team shares a fee estimate before the service is confirmed."
                            }
                        },
                        {
                            q: {
                                id: "Wilayah mana yang dilayani?",
                                en: "Which areas are served?"
                            },
                            a: {
                                id: "Makassar, Gowa, dan Maros dalam jangkauan operasional sekitar 20 km dari lokasi klinik.",
                                en: "Makassar, Gowa, and Maros within about a 20 km operating radius from the clinic."
                            }
                        }
                    ]
                },
        {
                    slug: "tindakan-medis",
                    icon: "syringe",
                    image: "photo-1749065312519-1902cb8431ae",
                    imageAlt: {
                        id: "Tindakan medis di rumah oleh tenaga kesehatan Dokter Panggil",
                        en: "Medical procedure at home by Dokter Panggil healthcare staff"
                    },
                    name: {
                        id: "Tindakan Medis",
                        en: "Medical Procedures"
                    },
                    short: {
                        id: "Tindakan Medis",
                        en: "Medical Procedures"
                    },
                    tagline: {
                        id: "Berbagai tindakan medis dan keperawatan langsung di rumah berdasarkan rekomendasi dokter.",
                        en: "Various medical and nursing procedures at home based on a doctor’s recommendation."
                    },
                    summary: {
                        id: "Berbagai tindakan medis dan keperawatan dapat dilakukan langsung di rumah oleh dokter maupun perawat, berdasarkan rekomendasi dokter serta sesuai kondisi dan kebutuhan pasien.",
                        en: "Various medical and nursing procedures can be done at home by a doctor or nurse, based on the doctor’s recommendation and the patient’s condition and needs."
                    },
                    forWho: {
                        id: [
                            "Pasien yang membutuhkan tindakan medis di rumah",
                            "Keluarga yang ingin perawatan lebih nyaman tanpa ke fasilitas kesehatan",
                            "Kondisi non-darurat sesuai indikasi medis"
                        ],
                        en: [
                            "Patients who need a medical procedure at home",
                            "Families who prefer comfortable care without visiting a facility",
                            "Non-emergency needs with medical indication"
                        ]
                    },
                    includes: {
                        id: [
                            "Penilaian dan rekomendasi dokter",
                            "Persiapan tenaga, obat, alat, dan bahan medis",
                            "Tindakan di rumah sesuai rencana medis",
                            "Pemantauan sesuai kebutuhan"
                        ],
                        en: [
                            "Doctor assessment and recommendation",
                            "Preparation of staff, medicine, tools, and supplies",
                            "Procedure at home according to the medical plan",
                            "Monitoring as needed"
                        ]
                    },
                    excludes: {
                        id: [
                            "Kondisi gawat darurat yang membutuhkan IGD",
                            "Tindakan tanpa rekomendasi dokter",
                            "Layanan di luar jangkauan operasional"
                        ],
                        en: [
                            "Emergencies that need an ER",
                            "Procedures without a doctor’s recommendation",
                            "Services outside the operating area"
                        ]
                    },
                    team: {
                        id: "Ditangani dokter atau perawat Dokter Panggil sesuai jenis tindakan, kompetensi, dan kondisi pasien.",
                        en: "Handled by a Dokter Panggil doctor or nurse matched to the procedure type, competence, and patient condition."
                    },
                    faq: [
                        {
                            q: {
                                id: "Bagaimana cara memesan layanan ini?",
                                en: "How do I book this service?"
                            },
                            a: {
                                id: "Hubungi Call Centre Dokter Panggil 24 jam via WhatsApp atau telepon, sampaikan kebutuhan dan lokasi pasien.",
                                en: "Contact the Dokter Panggil 24-hour call centre via WhatsApp or phone and share the patient needs and location."
                            }
                        },
                        {
                            q: {
                                id: "Apakah biaya dikonfirmasi dulu?",
                                en: "Are fees confirmed first?"
                            },
                            a: {
                                id: "Ya. Tim kami menginformasikan estimasi biaya sebelum layanan dikonfirmasi.",
                                en: "Yes. Our team shares a fee estimate before the service is confirmed."
                            }
                        },
                        {
                            q: {
                                id: "Wilayah mana yang dilayani?",
                                en: "Which areas are served?"
                            },
                            a: {
                                id: "Makassar, Gowa, dan Maros dalam jangkauan operasional sekitar 20 km dari lokasi klinik.",
                                en: "Makassar, Gowa, and Maros within about a 20 km operating radius from the clinic."
                            }
                        }
                    ]
                },
        {
                    slug: "terapi-nebulizer",
                    icon: "cloud",
                    image: "photo-1749065312519-1902cb8431ae",
                    imageAlt: {
                        id: "Terapi nebulizer di rumah oleh Tim Dokter Panggil",
                        en: "Nebulizer therapy at home by the Dokter Panggil team"
                    },
                    name: {
                        id: "Terapi Nebulizer",
                        en: "Nebulizer Therapy"
                    },
                    short: {
                        id: "Terapi Nebulizer",
                        en: "Nebulizer Therapy"
                    },
                    tagline: {
                        id: "Pemberian obat melalui nebulizer di rumah berdasarkan rekomendasi dokter.",
                        en: "Medication via nebulizer at home based on a doctor’s recommendation."
                    },
                    summary: {
                        id: "Layanan terapi nebulizer langsung di rumah untuk membantu pemberian obat melalui saluran pernapasan, berdasarkan hasil penilaian dan rekomendasi dokter sesuai kondisi pasien.",
                        en: "Nebulizer therapy at home to deliver medicine through the airways, based on the doctor’s assessment and recommendation for the patient’s condition."
                    },
                    forWho: {
                        id: [
                            "Pasien dengan kondisi pernapasan tertentu sesuai indikasi dokter",
                            "Pasien yang melanjutkan terapi nebulizer sesuai rencana dokter",
                            "Anak maupun dewasa sesuai penilaian dokter"
                        ],
                        en: [
                            "Patients with certain breathing conditions per doctor indication",
                            "Patients continuing nebulizer therapy under a doctor’s plan",
                            "Children or adults based on doctor assessment"
                        ]
                    },
                    includes: {
                        id: [
                            "Penilaian dan rekomendasi dokter",
                            "Persiapan obat dan perangkat nebulizer",
                            "Pemberian terapi nebulizer di rumah",
                            "Pemantauan dan evaluasi respons pasien"
                        ],
                        en: [
                            "Doctor assessment and recommendation",
                            "Medicine and nebulizer device preparation",
                            "Nebulizer therapy at home",
                            "Monitoring and response evaluation"
                        ]
                    },
                    excludes: {
                        id: [
                            "Kondisi gawat darurat yang membutuhkan IGD",
                            "Terapi tanpa rekomendasi dokter",
                            "Layanan di luar jangkauan operasional"
                        ],
                        en: [
                            "Emergencies that need an ER",
                            "Therapy without a doctor’s recommendation",
                            "Services outside the operating area"
                        ]
                    },
                    team: {
                        id: "Ditangani dokter atau perawat Dokter Panggil sesuai kebutuhan pelayanan dan rencana terapi dokter.",
                        en: "Handled by a Dokter Panggil doctor or nurse according to service needs and the doctor’s therapy plan."
                    },
                    faq: [
                        {
                            q: {
                                id: "Bagaimana cara memesan layanan ini?",
                                en: "How do I book this service?"
                            },
                            a: {
                                id: "Hubungi Call Centre Dokter Panggil 24 jam via WhatsApp atau telepon, sampaikan kebutuhan dan lokasi pasien.",
                                en: "Contact the Dokter Panggil 24-hour call centre via WhatsApp or phone and share the patient needs and location."
                            }
                        },
                        {
                            q: {
                                id: "Apakah biaya dikonfirmasi dulu?",
                                en: "Are fees confirmed first?"
                            },
                            a: {
                                id: "Ya. Tim kami menginformasikan estimasi biaya sebelum layanan dikonfirmasi.",
                                en: "Yes. Our team shares a fee estimate before the service is confirmed."
                            }
                        },
                        {
                            q: {
                                id: "Wilayah mana yang dilayani?",
                                en: "Which areas are served?"
                            },
                            a: {
                                id: "Makassar, Gowa, dan Maros dalam jangkauan operasional sekitar 20 km dari lokasi klinik.",
                                en: "Makassar, Gowa, and Maros within about a 20 km operating radius from the clinic."
                            }
                        }
                    ]
                },
        {
                    slug: "terapi-oksigen",
                    icon: "wind",
                    image: "photo-1749065312519-1902cb8431ae",
                    imageAlt: {
                        id: "Terapi oksigen di rumah oleh Tim Dokter Panggil",
                        en: "Oxygen therapy at home by the Dokter Panggil team"
                    },
                    name: {
                        id: "Terapi Oksigen",
                        en: "Oxygen Therapy"
                    },
                    short: {
                        id: "Terapi Oksigen",
                        en: "Oxygen Therapy"
                    },
                    tagline: {
                        id: "Pemberian terapi oksigen di rumah berdasarkan penilaian dan rekomendasi dokter.",
                        en: "Oxygen therapy at home based on a doctor’s assessment and recommendation."
                    },
                    summary: {
                        id: "Layanan pemberian terapi oksigen langsung di rumah berdasarkan hasil penilaian dan rekomendasi dokter, sesuai kondisi serta kebutuhan oksigen pasien.",
                        en: "Oxygen therapy at home based on the doctor’s assessment and recommendation, matched to the patient’s condition and oxygen needs."
                    },
                    forWho: {
                        id: [
                            "Pasien yang membutuhkan tambahan oksigen di rumah",
                            "Pasien dalam perawatan atau pemulihan sesuai rencana dokter",
                            "Kondisi non-darurat sesuai indikasi medis"
                        ],
                        en: [
                            "Patients who need supplemental oxygen at home",
                            "Patients in care or recovery under a doctor’s plan",
                            "Non-emergency needs with medical indication"
                        ]
                    },
                    includes: {
                        id: [
                            "Penilaian dan rekomendasi dokter",
                            "Persiapan peralatan oksigen sesuai kebutuhan",
                            "Pemberian terapi oksigen di rumah",
                            "Pemantauan kondisi selama terapi"
                        ],
                        en: [
                            "Doctor assessment and recommendation",
                            "Oxygen equipment prepared as needed",
                            "Oxygen therapy at home",
                            "Condition monitoring during therapy"
                        ]
                    },
                    excludes: {
                        id: [
                            "Kondisi gawat darurat yang membutuhkan IGD",
                            "Terapi tanpa rekomendasi dokter",
                            "Layanan di luar jangkauan operasional"
                        ],
                        en: [
                            "Emergencies that need an ER",
                            "Therapy without a doctor’s recommendation",
                            "Services outside the operating area"
                        ]
                    },
                    team: {
                        id: "Ditangani dokter atau perawat Dokter Panggil sesuai kondisi pasien dan rencana terapi.",
                        en: "Handled by a Dokter Panggil doctor or nurse according to patient condition and the therapy plan."
                    },
                    faq: [
                        {
                            q: {
                                id: "Bagaimana cara memesan layanan ini?",
                                en: "How do I book this service?"
                            },
                            a: {
                                id: "Hubungi Call Centre Dokter Panggil 24 jam via WhatsApp atau telepon, sampaikan kebutuhan dan lokasi pasien.",
                                en: "Contact the Dokter Panggil 24-hour call centre via WhatsApp or phone and share the patient needs and location."
                            }
                        },
                        {
                            q: {
                                id: "Apakah biaya dikonfirmasi dulu?",
                                en: "Are fees confirmed first?"
                            },
                            a: {
                                id: "Ya. Tim kami menginformasikan estimasi biaya sebelum layanan dikonfirmasi.",
                                en: "Yes. Our team shares a fee estimate before the service is confirmed."
                            }
                        },
                        {
                            q: {
                                id: "Wilayah mana yang dilayani?",
                                en: "Which areas are served?"
                            },
                            a: {
                                id: "Makassar, Gowa, dan Maros dalam jangkauan operasional sekitar 20 km dari lokasi klinik.",
                                en: "Makassar, Gowa, and Maros within about a 20 km operating radius from the clinic."
                            }
                        }
                    ]
                },
        {
                    slug: "terapi-infus",
                    icon: "syringe",
                    image: "photo-1749065312519-1902cb8431ae",
                    imageAlt: {
                        id: "Layanan Terapi Infus Dokter Panggil",
                        en: "Infusion Therapy service by Dokter Panggil"
                    },
                    name: {
                        id: "Terapi Infus",
                        en: "Infusion Therapy"
                    },
                    short: {
                        id: "Terapi Infus",
                        en: "Infusion Therapy"
                    },
                    tagline: {
                        id: "Terapi infus dan pemberian cairan intravena sesuai indikasi medis sehingga membantu memenuhi kebutuhan cairan, obat, maupun terapi selama perawatan di rumah.",
                        en: "Infusion and IV fluid therapy based on medical indication to meet fluid, medication, or therapy needs during home care."
                    },
                    summary: {
                        id: "Terapi infus dan pemberian cairan intravena sesuai indikasi medis sehingga membantu memenuhi kebutuhan cairan, obat, maupun terapi selama perawatan di rumah.",
                        en: "Infusion and IV fluid therapy based on medical indication to meet fluid, medication, or therapy needs during home care."
                    },
                    forWho: {
                        id: [
                            "Pasien yang membutuhkan layanan ini di rumah",
                            "Keluarga yang ingin perawatan lebih nyaman tanpa ke fasilitas kesehatan",
                            "Kondisi non-darurat sesuai indikasi medis"
                        ],
                        en: [
                            "Patients who need this service at home",
                            "Families who prefer comfortable care without visiting a facility",
                            "Non-emergency needs with medical indication"
                        ]
                    },
                    includes: {
                        id: [
                            "Penilaian kebutuhan oleh tim Dokter Panggil",
                            "Pelayanan sesuai indikasi medis",
                            "Koordinasi jadwal dan biaya sebelum kunjungan",
                            "Edukasi untuk pasien dan keluarga"
                        ],
                        en: [
                            "Needs assessment by the Dokter Panggil team",
                            "Care based on medical indication",
                            "Schedule and fee coordination before the visit",
                            "Guidance for patient and family"
                        ]
                    },
                    excludes: {
                        id: [
                            "Kondisi gawat darurat yang membutuhkan IGD",
                            "Tindakan di luar indikasi medis",
                            "Layanan di luar jangkauan operasional"
                        ],
                        en: [
                            "Emergencies that need an ER",
                            "Procedures without medical indication",
                            "Services outside the operating area"
                        ]
                    },
                    team: {
                        id: "Ditangani tenaga kesehatan profesional Dokter Panggil sesuai kompetensi dan kebutuhan pasien.",
                        en: "Handled by Dokter Panggil healthcare professionals matched to competence and patient needs."
                    },
                    faq: [
                        {
                            q: {
                                id: "Bagaimana cara memesan layanan ini?",
                                en: "How do I book this service?"
                            },
                            a: {
                                id: "Hubungi Call Centre Dokter Panggil 24 jam via WhatsApp atau telepon, sampaikan kebutuhan dan lokasi pasien.",
                                en: "Contact the Dokter Panggil 24-hour call centre via WhatsApp or phone and share the patient needs and location."
                            }
                        },
                        {
                            q: {
                                id: "Apakah biaya dikonfirmasi dulu?",
                                en: "Are fees confirmed first?"
                            },
                            a: {
                                id: "Ya. Tim kami menginformasikan estimasi biaya sebelum layanan dikonfirmasi.",
                                en: "Yes. Our team shares a fee estimate before the service is confirmed."
                            }
                        },
                        {
                            q: {
                                id: "Wilayah mana yang dilayani?",
                                en: "Which areas are served?"
                            },
                            a: {
                                id: "Makassar, Gowa, dan Maros dalam jangkauan operasional sekitar 20 km dari lokasi klinik.",
                                en: "Makassar, Gowa, and Maros within about a 20 km operating radius from the clinic."
                            }
                        }
                    ]
                },
        {
                    slug: "infus-vitamin",
                    icon: "droplets",
                    image: "photo-1749065312519-1902cb8431ae",
                    imageAlt: {
                        id: "Layanan Infus Vitamin Dokter Panggil",
                        en: "Vitamin Infusion service by Dokter Panggil"
                    },
                    name: {
                        id: "Infus Vitamin",
                        en: "Vitamin Infusion"
                    },
                    short: {
                        id: "Infus Vitamin",
                        en: "Vitamin Infusion"
                    },
                    tagline: {
                        id: "Layanan infus vitamin sesuai indikasi medis sehingga membantu memenuhi kebutuhan nutrisi tubuh dengan pelayanan yang nyaman di rumah.",
                        en: "Vitamin infusion based on medical indication to support nutritional needs with comfortable care at home."
                    },
                    summary: {
                        id: "Layanan infus vitamin sesuai indikasi medis sehingga membantu memenuhi kebutuhan nutrisi tubuh dengan pelayanan yang nyaman di rumah.",
                        en: "Vitamin infusion based on medical indication to support nutritional needs with comfortable care at home."
                    },
                    forWho: {
                        id: [
                            "Pasien yang membutuhkan layanan ini di rumah",
                            "Keluarga yang ingin perawatan lebih nyaman tanpa ke fasilitas kesehatan",
                            "Kondisi non-darurat sesuai indikasi medis"
                        ],
                        en: [
                            "Patients who need this service at home",
                            "Families who prefer comfortable care without visiting a facility",
                            "Non-emergency needs with medical indication"
                        ]
                    },
                    includes: {
                        id: [
                            "Penilaian kebutuhan oleh tim Dokter Panggil",
                            "Pelayanan sesuai indikasi medis",
                            "Koordinasi jadwal dan biaya sebelum kunjungan",
                            "Edukasi untuk pasien dan keluarga"
                        ],
                        en: [
                            "Needs assessment by the Dokter Panggil team",
                            "Care based on medical indication",
                            "Schedule and fee coordination before the visit",
                            "Guidance for patient and family"
                        ]
                    },
                    excludes: {
                        id: [
                            "Kondisi gawat darurat yang membutuhkan IGD",
                            "Tindakan di luar indikasi medis",
                            "Layanan di luar jangkauan operasional"
                        ],
                        en: [
                            "Emergencies that need an ER",
                            "Procedures without medical indication",
                            "Services outside the operating area"
                        ]
                    },
                    team: {
                        id: "Ditangani tenaga kesehatan profesional Dokter Panggil sesuai kompetensi dan kebutuhan pasien.",
                        en: "Handled by Dokter Panggil healthcare professionals matched to competence and patient needs."
                    },
                    faq: [
                        {
                            q: {
                                id: "Bagaimana cara memesan layanan ini?",
                                en: "How do I book this service?"
                            },
                            a: {
                                id: "Hubungi Call Centre Dokter Panggil 24 jam via WhatsApp atau telepon, sampaikan kebutuhan dan lokasi pasien.",
                                en: "Contact the Dokter Panggil 24-hour call centre via WhatsApp or phone and share the patient needs and location."
                            }
                        },
                        {
                            q: {
                                id: "Apakah biaya dikonfirmasi dulu?",
                                en: "Are fees confirmed first?"
                            },
                            a: {
                                id: "Ya. Tim kami menginformasikan estimasi biaya sebelum layanan dikonfirmasi.",
                                en: "Yes. Our team shares a fee estimate before the service is confirmed."
                            }
                        },
                        {
                            q: {
                                id: "Wilayah mana yang dilayani?",
                                en: "Which areas are served?"
                            },
                            a: {
                                id: "Makassar, Gowa, dan Maros dalam jangkauan operasional sekitar 20 km dari lokasi klinik.",
                                en: "Makassar, Gowa, and Maros within about a 20 km operating radius from the clinic."
                            }
                        }
                    ]
                },
        {
                    slug: "perawatan-luka",
                    icon: "plus-square",
                    image: "photo-1559123633-d373e3384f08",
                    imageAlt: {
                        id: "Petugas memasang balutan pada luka",
                        en: "A health worker applying a wound dressing"
                    },
                    name: {
                        id: "Perawatan Luka",
                        en: "Wound Care"
                    },
                    short: {
                        id: "Perawatan Luka",
                        en: "Wound Care"
                    },
                    tagline: {
                        id: "Perawatan luka akut maupun kronis dilakukan oleh tenaga kesehatan profesional sehingga proses penyembuhan berlangsung lebih aman dan optimal di rumah.",
                        en: "Acute and chronic wound care by healthcare professionals for safer, more optimal healing at home."
                    },
                    summary: {
                        id: "Perawatan luka akut maupun kronis dilakukan oleh tenaga kesehatan profesional sehingga proses penyembuhan berlangsung lebih aman dan optimal di rumah.",
                        en: "Acute and chronic wound care by healthcare professionals for safer, more optimal healing at home."
                    },
                    forWho: {
                        id: [
                            "Luka pascaoperasi (ganti balutan)",
                            "Luka diabetes",
                            "Luka tekan / tirah baring",
                            "Cedera atau luka lambat sembuh"
                        ],
                        en: [
                            "Post-surgical dressing changes",
                            "Diabetic wounds",
                            "Pressure sores / bed rest",
                            "Slow-healing injuries"
                        ]
                    },
                    includes: {
                        id: [
                            "Penilaian luka & tanda infeksi",
                            "Pembersihan steril",
                            "Ganti balutan sesuai jenis luka",
                            "Dokumentasi penyembuhan",
                            "Edukasi kebersihan luka",
                            "Rekomendasi rujukan bila perlu"
                        ],
                        en: [
                            "Wound & infection assessment",
                            "Sterile cleaning",
                            "Dressing suited to wound type",
                            "Healing documentation",
                            "Wound hygiene guidance",
                            "Referral if further care needed"
                        ]
                    },
                    excludes: {
                        id: [
                            "Bedah / jahit luka besar",
                            "Luka bakar luas & luka darurat",
                            "Antibiotik tanpa pemeriksaan dokter"
                        ],
                        en: [
                            "Surgery / major suturing",
                            "Extensive burns & emergency wounds",
                            "Antibiotics without a doctor’s exam"
                        ]
                    },
                    team: {
                        id: "Perawat berlisensi yang terbiasa berbagai jenis luka. Perlengkapan steril; kondisi didokumentasikan dari waktu ke waktu.",
                        en: "Licensed nurses experienced with many wound types. Sterile supplies; healing is documented over time."
                    },
                    faq: [
                        {
                            q: {
                                id: "Seberapa sering ganti balutan?",
                                en: "How often to change dressings?"
                            },
                            a: {
                                id: "Tergantung jenis dan kondisi luka. Jadwal dianjurkan setelah penilaian.",
                                en: "Depends on wound type and healing. A schedule follows assessment."
                            }
                        },
                        {
                            q: {
                                id: "Perlengkapan disediakan?",
                                en: "Supplies provided?"
                            },
                            a: {
                                id: "Perlengkapan steril dasar dibawa. Bahan khusus diinformasikan lebih dulu.",
                                en: "Basic sterile supplies are brought. Special materials are flagged in advance."
                            }
                        },
                        {
                            q: {
                                id: "Tanda infeksi?",
                                en: "Signs of infection?"
                            },
                            a: {
                                id: "Kemerahan meluas, bengkak, nyeri bertambah, cairan berbau, atau demam â€” hubungi tim/dokter.",
                                en: "Spreading redness, swelling, rising pain, foul discharge, or fever â€” contact us or a doctor."
                            }
                        },
                        {
                            q: {
                                id: "Luka diabetes bisa di rumah?",
                                en: "Diabetic wounds at home?"
                            },
                            a: {
                                id: "Banyak bisa dirawat rutin dengan pemantauan ketat. Jika memburuk, disarankan ke dokter.",
                                en: "Many can be managed at home with close monitoring. If it worsens, see a doctor."
                            }
                        }
                    ]
                },
        {
                    slug: "vaksinasi",
                    icon: "syringe",
                    image: "photo-1576765608622-067973a79f53",
                    imageAlt: {
                        id: "Tenaga kesehatan memberikan vaksin",
                        en: "A health worker giving a vaccine"
                    },
                    name: {
                        id: "Vaksinasi",
                        en: "Vaccination"
                    },
                    short: {
                        id: "Vaksinasi",
                        en: "Vaccination"
                    },
                    tagline: {
                        id: "Layanan vaksinasi untuk anak maupun dewasa sehingga imunisasi dapat dilakukan dengan aman, nyaman, dan praktis di rumah.",
                        en: "Vaccination for children and adults—safe, comfortable, and practical at home."
                    },
                    summary: {
                        id: "Layanan vaksinasi untuk anak maupun dewasa sehingga imunisasi dapat dilakukan dengan aman, nyaman, dan praktis di rumah.",
                        en: "Vaccination for children and adults—safe, comfortable, and practical at home."
                    },
                    forWho: {
                        id: [
                            "Imunisasi anak sesuai jadwal",
                            "Vaksin dewasa (influenza, hepatitis, dll.)",
                            "Lansia yang sulit ke fasilitas kesehatan",
                            "Vaksinasi keluarga dalam satu kunjungan"
                        ],
                        en: [
                            "Childhood immunisation on schedule",
                            "Adult vaccines (flu, hepatitis, etc.)",
                            "Older adults who struggle to reach a clinic",
                            "Family vaccination in one visit"
                        ]
                    },
                    includes: {
                        id: [
                            "Skrining sebelum vaksinasi",
                            "Rantai dingin terjaga",
                            "Penyuntikan oleh tenaga terlatih",
                            "Observasi pasca-suntik",
                            "Pencatatan riwayat imunisasi",
                            "Edukasi efek samping ringan"
                        ],
                        en: [
                            "Pre-vaccination screening",
                            "Maintained cold chain",
                            "Injection by trained staff",
                            "Post-injection observation",
                            "Immunisation record",
                            "Mild side-effect guidance"
                        ]
                    },
                    excludes: {
                        id: [
                            "Vaksin yang butuh fasilitas khusus",
                            "Vaksinasi saat demam / sakit akut",
                            "Reaksi alergi berat yang butuh IGD"
                        ],
                        en: [
                            "Vaccines needing special facilities",
                            "Vaccination during fever / acute illness",
                            "Severe allergic reactions needing ER"
                        ]
                    },
                    team: {
                        id: "Tenaga terlatih melakukan skrining dulu. Vaksin dalam wadah bersuhu terjaga; penerima diobservasi setelah suntik.",
                        en: "Trained staff screen first. Vaccines travel in temperature-controlled boxes; recipients are observed after injection."
                    },
                    faq: [
                        {
                            q: {
                                id: "Vaksin apa saja tersedia?",
                                en: "Which vaccines are available?"
                            },
                            a: {
                                id: "Tergantung jenis dan area. Sampaikan kebutuhan saat pemesanan untuk konfirmasi.",
                                en: "Depends on type and area. Tell us what you need when booking so we can confirm."
                            }
                        },
                        {
                            q: {
                                id: "Bagaimana kualitas vaksin dijaga?",
                                en: "How is quality maintained?"
                            },
                            a: {
                                id: "Dalam cool box khusus; kondisi dicek sebelum digunakan.",
                                en: "In dedicated cool boxes; storage is checked before use."
                            }
                        },
                        {
                            q: {
                                id: "Berapa lama observasi?",
                                en: "How long is observation?"
                            },
                            a: {
                                id: "Beberapa saat setelah suntik, plus penjelasan tanda yang perlu diwaspadai.",
                                en: "A period after the injection, plus guidance on warning signs."
                            }
                        },
                        {
                            q: {
                                id: "Jika sedang sakit?",
                                en: "If the recipient is unwell?"
                            },
                            a: {
                                id: "Vaksinasi ditunda dan dijadwalkan ulang demi keamanan.",
                                en: "Vaccination is postponed and rescheduled for safety."
                            }
                        }
                    ]
                },
        {
                    slug: "pemasangan-ngt",
                    icon: "clipboard-list",
                    image: "photo-1749065312519-1902cb8431ae",
                    imageAlt: {
                        id: "Pemasangan selang makan (NGT) di rumah oleh Tim Dokter Panggil",
                        en: "Feeding tube (NGT) placement at home by the Dokter Panggil team"
                    },
                    name: {
                        id: "Pemasangan Selang Makan",
                        en: "Feeding Tube Placement"
                    },
                    short: {
                        id: "Pemasangan NGT",
                        en: "NGT Placement"
                    },
                    tagline: {
                        id: "Pemasangan atau penggantian selang makan di rumah berdasarkan rekomendasi dokter.",
                        en: "Feeding tube placement or change at home based on a doctor’s recommendation."
                    },
                    summary: {
                        id: "Layanan pemasangan selang makan atau Nasogastric Tube (NGT) langsung di rumah oleh dokter atau perawat, berdasarkan hasil penilaian dan rekomendasi dokter sesuai kondisi serta kebutuhan pasien.",
                        en: "Nasogastric tube (NGT) placement at home by a doctor or nurse, based on the doctor’s assessment and recommendation for the patient’s condition and needs."
                    },
                    forWho: {
                        id: [
                            "Pasien yang membutuhkan NGT berdasarkan rekomendasi dokter",
                            "Pasien yang membutuhkan penggantian atau pemasangan kembali NGT",
                            "Keluarga yang membutuhkan edukasi penggunaan NGT di rumah"
                        ],
                        en: [
                            "Patients who need an NGT based on a doctor’s recommendation",
                            "Patients who need NGT replacement or reinsertion",
                            "Families who need guidance on NGT use at home"
                        ]
                    },
                    includes: {
                        id: [
                            "Penilaian dan rekomendasi dokter",
                            "Pemasangan, penggantian, atau pemasangan kembali NGT",
                            "Konfirmasi posisi dan fiksasi selang",
                            "Edukasi penggunaan dan perawatan NGT"
                        ],
                        en: [
                            "Doctor assessment and recommendation",
                            "NGT placement, change, or reinsertion",
                            "Tube position confirmation and fixation",
                            "Education on NGT use and care"
                        ]
                    },
                    excludes: {
                        id: [
                            "Kondisi gawat darurat yang membutuhkan IGD",
                            "Tindakan tanpa rekomendasi dokter",
                            "Layanan di luar jangkauan operasional"
                        ],
                        en: [
                            "Emergencies that need an ER",
                            "Procedures without a doctor’s recommendation",
                            "Services outside the operating area"
                        ]
                    },
                    team: {
                        id: "Ditangani dokter atau perawat Dokter Panggil sesuai kebutuhan pelayanan dan rekomendasi dokter.",
                        en: "Handled by a Dokter Panggil doctor or nurse according to service needs and the doctor’s recommendation."
                    },
                    faq: [
                        {
                            q: { id: "Bagaimana cara memesan layanan ini?", en: "How do I book this service?" },
                            a: {
                                id: "Hubungi Call Centre Dokter Panggil 24 jam via WhatsApp atau telepon, sampaikan kebutuhan dan lokasi pasien.",
                                en: "Contact the Dokter Panggil 24-hour call centre via WhatsApp or phone and share the patient needs and location."
                            }
                        },
                        {
                            q: { id: "Apakah biaya dikonfirmasi dulu?", en: "Are fees confirmed first?" },
                            a: {
                                id: "Ya. Tim kami menginformasikan estimasi biaya sebelum layanan dikonfirmasi.",
                                en: "Yes. Our team shares a fee estimate before the service is confirmed."
                            }
                        },
                        {
                            q: { id: "Wilayah mana yang dilayani?", en: "Which areas are served?" },
                            a: {
                                id: "Makassar, Gowa, dan Maros dalam jangkauan operasional sekitar 20 km dari lokasi klinik.",
                                en: "Makassar, Gowa, and Maros within about a 20 km operating radius from the clinic."
                            }
                        }
                    ]
                },
        {
                    slug: "pemasangan-kateter",
                    icon: "droplets",
                    image: "photo-1749065312519-1902cb8431ae",
                    imageAlt: {
                        id: "Pemasangan kateter urin di rumah oleh Tim Dokter Panggil",
                        en: "Urinary catheter placement at home by the Dokter Panggil team"
                    },
                    name: {
                        id: "Pemasangan Kateter Urin",
                        en: "Urinary Catheter Placement"
                    },
                    short: {
                        id: "Pemasangan Kateter",
                        en: "Catheter Placement"
                    },
                    tagline: {
                        id: "Pemasangan atau penggantian kateter urin di rumah berdasarkan rekomendasi dokter.",
                        en: "Urinary catheter placement or change at home based on a doctor’s recommendation."
                    },
                    summary: {
                        id: "Layanan pemasangan dan penggantian kateter urin langsung di rumah oleh dokter atau perawat, berdasarkan hasil penilaian dan rekomendasi dokter sesuai kondisi serta kebutuhan pasien.",
                        en: "Urinary catheter placement and change at home by a doctor or nurse, based on the doctor’s assessment and recommendation for the patient’s condition and needs."
                    },
                    forWho: {
                        id: [
                            "Pasien yang membutuhkan kateter berdasarkan rekomendasi dokter",
                            "Pasien yang membutuhkan penggantian atau pemasangan kembali kateter",
                            "Pasien dengan rencana perawatan berkelanjutan di rumah"
                        ],
                        en: [
                            "Patients who need a catheter based on a doctor’s recommendation",
                            "Patients who need catheter replacement or reinsertion",
                            "Patients with an ongoing home care plan"
                        ]
                    },
                    includes: {
                        id: [
                            "Penilaian dan rekomendasi dokter",
                            "Pemasangan, penggantian, atau pemasangan kembali kateter",
                            "Pengaturan fiksasi dan kantong urin",
                            "Edukasi perawatan kateter di rumah"
                        ],
                        en: [
                            "Doctor assessment and recommendation",
                            "Catheter placement, change, or reinsertion",
                            "Fixation and urine bag setup",
                            "Education on catheter care at home"
                        ]
                    },
                    excludes: {
                        id: [
                            "Kondisi gawat darurat yang membutuhkan IGD",
                            "Tindakan tanpa rekomendasi dokter",
                            "Layanan di luar jangkauan operasional"
                        ],
                        en: [
                            "Emergencies that need an ER",
                            "Procedures without a doctor’s recommendation",
                            "Services outside the operating area"
                        ]
                    },
                    team: {
                        id: "Ditangani dokter atau perawat Dokter Panggil sesuai kebutuhan pelayanan dan rekomendasi dokter.",
                        en: "Handled by a Dokter Panggil doctor or nurse according to service needs and the doctor’s recommendation."
                    },
                    faq: [
                        {
                            q: { id: "Bagaimana cara memesan layanan ini?", en: "How do I book this service?" },
                            a: {
                                id: "Hubungi Call Centre Dokter Panggil 24 jam via WhatsApp atau telepon, sampaikan kebutuhan dan lokasi pasien.",
                                en: "Contact the Dokter Panggil 24-hour call centre via WhatsApp or phone and share the patient needs and location."
                            }
                        },
                        {
                            q: { id: "Apakah biaya dikonfirmasi dulu?", en: "Are fees confirmed first?" },
                            a: {
                                id: "Ya. Tim kami menginformasikan estimasi biaya sebelum layanan dikonfirmasi.",
                                en: "Yes. Our team shares a fee estimate before the service is confirmed."
                            }
                        },
                        {
                            q: { id: "Wilayah mana yang dilayani?", en: "Which areas are served?" },
                            a: {
                                id: "Makassar, Gowa, dan Maros dalam jangkauan operasional sekitar 20 km dari lokasi klinik.",
                                en: "Makassar, Gowa, and Maros within about a 20 km operating radius from the clinic."
                            }
                        }
                    ]
                },
        {
                    slug: "suction",
                    icon: "activity",
                    image: "photo-1749065312519-1902cb8431ae",
                    imageAlt: {
                        id: "Suction / sedot dahak di rumah oleh Tim Dokter Panggil",
                        en: "Suction / phlegm clearance at home by the Dokter Panggil team"
                    },
                    name: {
                        id: "Suction / Sedot Dahak",
                        en: "Suction / Phlegm Clearance"
                    },
                    short: {
                        id: "Suction",
                        en: "Suction"
                    },
                    tagline: {
                        id: "Suction atau sedot dahak di rumah berdasarkan rekomendasi dokter.",
                        en: "Suction or phlegm clearance at home based on a doctor’s recommendation."
                    },
                    summary: {
                        id: "Layanan suction atau sedot dahak langsung di rumah oleh dokter atau perawat untuk membantu mengeluarkan sekret dari jalan napas pada kondisi tertentu, berdasarkan hasil penilaian dan rekomendasi dokter.",
                        en: "Suction or phlegm clearance at home by a doctor or nurse to help clear airway secretions in certain conditions, based on the doctor’s assessment and recommendation."
                    },
                    forWho: {
                        id: [
                            "Pasien dengan sekret yang sulit dikeluarkan",
                            "Pasien dengan kemampuan batuk menurun",
                            "Pasien dengan trakeostomi yang membutuhkan suction"
                        ],
                        en: [
                            "Patients with secretions that are hard to clear",
                            "Patients with reduced cough ability",
                            "Patients with a tracheostomy who need suction"
                        ]
                    },
                    includes: {
                        id: [
                            "Penilaian dan rekomendasi dokter",
                            "Tindakan suction sesuai kondisi pasien",
                            "Pemantauan selama dan setelah tindakan",
                            "Edukasi keluarga mengenai perawatan lanjutan"
                        ],
                        en: [
                            "Doctor assessment and recommendation",
                            "Suction matched to the patient’s condition",
                            "Monitoring during and after the procedure",
                            "Family education on follow-up care"
                        ]
                    },
                    excludes: {
                        id: [
                            "Kondisi gawat darurat yang membutuhkan IGD",
                            "Tindakan tanpa rekomendasi dokter",
                            "Layanan di luar jangkauan operasional"
                        ],
                        en: [
                            "Emergencies that need an ER",
                            "Procedures without a doctor’s recommendation",
                            "Services outside the operating area"
                        ]
                    },
                    team: {
                        id: "Ditangani dokter atau perawat Dokter Panggil sesuai kebutuhan pelayanan dan rekomendasi dokter.",
                        en: "Handled by a Dokter Panggil doctor or nurse according to service needs and the doctor’s recommendation."
                    },
                    faq: [
                        {
                            q: { id: "Bagaimana cara memesan layanan ini?", en: "How do I book this service?" },
                            a: {
                                id: "Hubungi Call Centre Dokter Panggil 24 jam via WhatsApp atau telepon, sampaikan kebutuhan dan lokasi pasien.",
                                en: "Contact the Dokter Panggil 24-hour call centre via WhatsApp or phone and share the patient needs and location."
                            }
                        },
                        {
                            q: { id: "Apakah biaya dikonfirmasi dulu?", en: "Are fees confirmed first?" },
                            a: {
                                id: "Ya. Tim kami menginformasikan estimasi biaya sebelum layanan dikonfirmasi.",
                                en: "Yes. Our team shares a fee estimate before the service is confirmed."
                            }
                        },
                        {
                            q: { id: "Wilayah mana yang dilayani?", en: "Which areas are served?" },
                            a: {
                                id: "Makassar, Gowa, dan Maros dalam jangkauan operasional sekitar 20 km dari lokasi klinik.",
                                en: "Makassar, Gowa, and Maros within about a 20 km operating radius from the clinic."
                            }
                        }
                    ]
                },
        {
                    slug: "pemeriksaan-kesehatan",
                    icon: "clipboard-check",
                    image: "photo-1631815590058-860e4f83c1e8",
                    imageAlt: {
                        id: "Dokter memeriksa pasien dengan stetoskop",
                        en: "A doctor examining a patient with a stethoscope"
                    },
                    name: {
                        id: "Medical Check-Up di Rumah",
                        en: "Medical Check-Up at Home"
                    },
                    short: {
                        id: "Medical Check-Up di Rumah",
                        en: "Medical Check-Up at Home"
                    },
                    tagline: {
                        id: "Pemeriksaan kesehatan menyeluruh sehingga kondisi kesehatan dapat dievaluasi dan dideteksi lebih dini tanpa perlu datang ke fasilitas kesehatan.",
                        en: "A comprehensive health check so conditions can be evaluated and detected earlier without visiting a healthcare facility."
                    },
                    summary: {
                        id: "Pemeriksaan kesehatan menyeluruh sehingga kondisi kesehatan dapat dievaluasi dan dideteksi lebih dini tanpa perlu datang ke fasilitas kesehatan.",
                        en: "A comprehensive health check so conditions can be evaluated and detected earlier without visiting a healthcare facility."
                    },
                    forWho: {
                        id: [
                            "Skrining tahunan rutin",
                            "Pemantauan hipertensi / diabetes",
                            "Persiapan program kebugaran",
                            "Pemeriksaan beberapa anggota keluarga"
                        ],
                        en: [
                            "Routine annual screening",
                            "Monitoring hypertension / diabetes",
                            "Pre-fitness programme prep",
                            "Several family members in one visit"
                        ]
                    },
                    includes: {
                        id: [
                            "Wawancara riwayat & gaya hidup",
                            "Pemeriksaan fisik & tanda vital",
                            "Sampel untuk tes relevan",
                            "Ringkasan hasil",
                            "Penjelasan temuan & rekomendasi",
                            "Saran jadwal cek berikutnya"
                        ],
                        en: [
                            "History & lifestyle review",
                            "Physical exam & vitals",
                            "Samples for relevant tests",
                            "Results summary",
                            "Findings & recommendations",
                            "Advice on next check-up timing"
                        ]
                    },
                    excludes: {
                        id: [
                            "Pencitraan (rontgen, USG, CT)",
                            "Tes khusus hanya di fasilitas",
                            "Surat sehat untuk keperluan hukum tertentu"
                        ],
                        en: [
                            "Imaging (X-ray, US, CT)",
                            "Facility-only specialised tests",
                            "Medical certificates for specific legal uses"
                        ]
                    },
                    team: {
                        id: "Tenaga berlisensi; hasil ditinjau dokter. Anda mendapat penjelasan temuan dan rekomendasi yang sesuai.",
                        en: "Licensed professionals; results reviewed by a doctor. You get an explanation of findings and fitting recommendations."
                    },
                    faq: [
                        {
                            q: {
                                id: "Persiapan sebelum cek?",
                                en: "Prep before the check-up?"
                            },
                            a: {
                                id: "Tergantung tes (mis. puasa). Detail disampaikan saat konfirmasi jadwal.",
                                en: "Depends on the tests (e.g. fasting). Details come when confirming."
                            }
                        },
                        {
                            q: {
                                id: "Paket bisa disesuaikan?",
                                en: "Customisable package?"
                            },
                            a: {
                                id: "Bisa â€” disesuaikan usia, keluhan, dan riwayat setelah dibahas bersama.",
                                en: "Yes â€” adjusted to age, symptoms, and history after discussion."
                            }
                        },
                        {
                            q: {
                                id: "Berapa lama di rumah?",
                                en: "How long at home?"
                            },
                            a: {
                                id: "Pemeriksaan fisik & sampel biasanya singkat; hasil lab menyusul.",
                                en: "Physical exam & sampling are usually brief; lab results follow."
                            }
                        },
                        {
                            q: {
                                id: "Hasil untuk kontrol dokter?",
                                en: "Use results with my doctor?"
                            },
                            a: {
                                id: "Ya. Ringkasan bisa dibawa, dan kami bisa bantu jadwalkan konsultasi.",
                                en: "Yes. Bring the summary, and we can help schedule a consult."
                            }
                        }
                    ]
                },
        {
                    slug: "farmasi",
                    icon: "pill",
                    image: "photo-1584308666744-24d5c474f2ae",
                    imageAlt: {
                        id: "Layanan Farmasi Dokter Panggil",
                        en: "Pharmacy service by Dokter Panggil"
                    },
                    name: {
                        id: "Farmasi",
                        en: "Pharmacy"
                    },
                    short: {
                        id: "Farmasi",
                        en: "Pharmacy"
                    },
                    tagline: {
                        id: "Penyediaan dan pengantaran obat sesuai resep dokter sehingga kebutuhan terapi pasien dapat dipenuhi dengan cepat dan tepat hingga ke rumah.",
                        en: "Supply and delivery of medicines according to a doctor’s prescription so therapy needs are met quickly and accurately at home."
                    },
                    summary: {
                        id: "Penyediaan dan pengantaran obat sesuai resep dokter sehingga kebutuhan terapi pasien dapat dipenuhi dengan cepat dan tepat hingga ke rumah.",
                        en: "Supply and delivery of medicines according to a doctor’s prescription so therapy needs are met quickly and accurately at home."
                    },
                    forWho: {
                        id: [
                            "Pasien yang membutuhkan layanan ini di rumah",
                            "Keluarga yang ingin perawatan lebih nyaman tanpa ke fasilitas kesehatan",
                            "Kondisi non-darurat sesuai indikasi medis"
                        ],
                        en: [
                            "Patients who need this service at home",
                            "Families who prefer comfortable care without visiting a facility",
                            "Non-emergency needs with medical indication"
                        ]
                    },
                    includes: {
                        id: [
                            "Penilaian kebutuhan oleh tim Dokter Panggil",
                            "Pelayanan sesuai indikasi medis",
                            "Koordinasi jadwal dan biaya sebelum kunjungan",
                            "Edukasi untuk pasien dan keluarga"
                        ],
                        en: [
                            "Needs assessment by the Dokter Panggil team",
                            "Care based on medical indication",
                            "Schedule and fee coordination before the visit",
                            "Guidance for patient and family"
                        ]
                    },
                    excludes: {
                        id: [
                            "Kondisi gawat darurat yang membutuhkan IGD",
                            "Tindakan di luar indikasi medis",
                            "Layanan di luar jangkauan operasional"
                        ],
                        en: [
                            "Emergencies that need an ER",
                            "Procedures without medical indication",
                            "Services outside the operating area"
                        ]
                    },
                    team: {
                        id: "Ditangani tenaga kesehatan profesional Dokter Panggil sesuai kompetensi dan kebutuhan pasien.",
                        en: "Handled by Dokter Panggil healthcare professionals matched to competence and patient needs."
                    },
                    faq: [
                        {
                            q: {
                                id: "Bagaimana cara memesan layanan ini?",
                                en: "How do I book this service?"
                            },
                            a: {
                                id: "Hubungi Call Centre Dokter Panggil 24 jam via WhatsApp atau telepon, sampaikan kebutuhan dan lokasi pasien.",
                                en: "Contact the Dokter Panggil 24-hour call centre via WhatsApp or phone and share the patient needs and location."
                            }
                        },
                        {
                            q: {
                                id: "Apakah biaya dikonfirmasi dulu?",
                                en: "Are fees confirmed first?"
                            },
                            a: {
                                id: "Ya. Tim kami menginformasikan estimasi biaya sebelum layanan dikonfirmasi.",
                                en: "Yes. Our team shares a fee estimate before the service is confirmed."
                            }
                        },
                        {
                            q: {
                                id: "Wilayah mana yang dilayani?",
                                en: "Which areas are served?"
                            },
                            a: {
                                id: "Makassar, Gowa, dan Maros dalam jangkauan operasional sekitar 20 km dari lokasi klinik.",
                                en: "Makassar, Gowa, and Maros within about a 20 km operating radius from the clinic."
                            }
                        }
                    ]
                },
        {
                    slug: "tes-laboratorium",
                    icon: "test-tubes",
                    image: "photo-1631815588090-d4bfec5b1ccb",
                    imageAlt: {
                        id: "Petugas mengambil sampel darah pasien",
                        en: "A health worker collecting a blood sample"
                    },
                    name: {
                        id: "Laboratorium",
                        en: "Laboratory"
                    },
                    short: {
                        id: "Laboratorium",
                        en: "Laboratory"
                    },
                    tagline: {
                        id: "Pengambilan sampel dan pemeriksaan laboratorium dilakukan di rumah sehingga proses pemeriksaan menjadi lebih praktis tanpa mengurangi akurasi hasil.",
                        en: "Sample collection and lab tests at home—more practical without reducing result accuracy."
                    },
                    summary: {
                        id: "Pengambilan sampel dan pemeriksaan laboratorium dilakukan di rumah sehingga proses pemeriksaan menjadi lebih praktis tanpa mengurangi akurasi hasil.",
                        en: "Sample collection and lab tests at home—more practical without reducing result accuracy."
                    },
                    forWho: {
                        id: [
                            "Pemeriksaan rutin (gula, kolesterol, fungsi organ)",
                            "Pemantauan lab berkala",
                            "Lansia / mobilitas terbatas",
                            "Skrining tanpa ke laboratorium"
                        ],
                        en: [
                            "Routine checks (sugar, cholesterol, organ function)",
                            "Regular lab monitoring",
                            "Elderly / limited mobility",
                            "Screening without visiting a lab"
                        ]
                    },
                    includes: {
                        id: [
                            "Pengambilan darah atau urine",
                            "Alat steril sekali pakai",
                            "Pengiriman sampel sesuai prosedur",
                            "Hasil digital",
                            "Bantuan jadwal konsultasi hasil"
                        ],
                        en: [
                            "Blood or urine collection",
                            "Sterile single-use equipment",
                            "Sample transport by procedure",
                            "Digital results",
                            "Help scheduling a results consult"
                        ]
                    },
                    excludes: {
                        id: [
                            "Pencitraan (rontgen, USG, CT)",
                            "Tes yang butuh alat khusus di lab",
                            "Interpretasi tanpa konsultasi dokter"
                        ],
                        en: [
                            "Imaging (X-ray, US, CT)",
                            "Tests needing specialised lab gear",
                            "Interpretation without a doctor"
                        ]
                    },
                    team: {
                        id: "Petugas lab terlatih memakai prosedur steril dan alat sekali pakai. Sampel dikemas agar kualitas tetap terjaga.",
                        en: "Trained lab staff use sterile, single-use equipment. Samples are packed so quality is preserved."
                    },
                    faq: [
                        {
                            q: {
                                id: "Perlu puasa?",
                                en: "Do I need to fast?"
                            },
                            a: {
                                id: "Sebagian tes (gula puasa, lipid) perlu puasa. Persiapan diinformasikan saat konfirmasi jadwal.",
                                en: "Some tests (fasting glucose, lipids) require fasting. Prep is explained when confirming."
                            }
                        },
                        {
                            q: {
                                id: "Berapa lama hasil keluar?",
                                en: "How long for results?"
                            },
                            a: {
                                id: "Berbeda per jenis tes. Estimasi disampaikan saat pemesanan.",
                                en: "Varies by test. We give an estimate when you book."
                            }
                        },
                        {
                            q: {
                                id: "Hasil bisa dibahas dengan dokter?",
                                en: "Can a doctor review results?"
                            },
                            a: {
                                id: "Bisa. Jadwalkan konsultasi untuk penjelasan dan rekomendasi.",
                                en: "Yes. Schedule a consult for explanation and next steps."
                            }
                        },
                        {
                            q: {
                                id: "Kerahasiaan hasil?",
                                en: "Result confidentiality?"
                            },
                            a: {
                                id: "Hanya dibagikan ke pasien atau pihak yang Anda tunjuk.",
                                en: "Shared only with the patient or someone you nominate."
                            }
                        }
                    ]
                },
        {
                    slug: "perawatan-rumah",
                    icon: "heart-handshake",
                    image: "photo-1749065312519-1902cb8431ae",
                    imageAlt: {
                        id: "Perawat mendampingi pasien di rumah",
                        en: "A nurse caring for a patient at home"
                    },
                    name: {
                        id: "Perawat Homecare",
                        en: "Homecare Nursing"
                    },
                    short: {
                        id: "Perawat Homecare",
                        en: "Homecare Nursing"
                    },
                    tagline: {
                        id: "Perawat profesional siap memberikan pendampingan, observasi, dan tindakan keperawatan sehingga pasien memperoleh perawatan yang berkesinambungan di rumah.",
                        en: "Professional nurses provide accompaniment, observation, and nursing procedures for continuous care at home."
                    },
                    summary: {
                        id: "Perawat profesional siap memberikan pendampingan, observasi, dan tindakan keperawatan sehingga pasien memperoleh perawatan yang berkesinambungan di rumah.",
                        en: "Professional nurses provide accompaniment, observation, and nursing procedures for continuous care at home."
                    },
                    forWho: {
                        id: [
                            "Pasien pascaoperasi",
                            "Terapi infus atau injeksi rutin",
                            "Mobilitas terbatas / tirah baring",
                            "Keluarga yang butuh pendampingan harian"
                        ],
                        en: [
                            "Post-surgery patients",
                            "Regular infusion or injection therapy",
                            "Limited mobility / bed rest",
                            "Families needing daily nursing support"
                        ]
                    },
                    includes: {
                        id: [
                            "Infus sesuai instruksi dokter",
                            "Obat injeksi sesuai resep",
                            "Pemantauan tanda vital",
                            "Perawatan kateter & selang makan",
                            "Bantuan kebersihan & mobilisasi",
                            "Edukasi perawatan mandiri"
                        ],
                        en: [
                            "Infusions as directed",
                            "Injectable meds as prescribed",
                            "Vital signs monitoring",
                            "Catheter & feeding tube care",
                            "Hygiene & mobility help",
                            "Self-care education"
                        ]
                    },
                    excludes: {
                        id: [
                            "Tindakan yang harus di fasilitas rawat inap",
                            "Peresepan obat baru tanpa dokter",
                            "Penanganan gawat darurat"
                        ],
                        en: [
                            "Inpatient-only procedures",
                            "Prescribing without a doctor",
                            "Emergency handling"
                        ]
                    },
                    team: {
                        id: "Perawat berlisensi dengan STR aktif dan pengalaman klinis. Setiap tindakan mengikuti instruksi dokter dan dicatat untuk keluarga.",
                        en: "Licensed nurses with active registration and clinical experience. Every procedure follows the doctor’s orders and is documented for the family."
                    },
                    faq: [
                        {
                            q: {
                                id: "Bisa pendampingan durasi panjang?",
                                en: "Can a nurse stay longer?"
                            },
                            a: {
                                id: "Ada pilihan per kunjungan maupun durasi lebih panjang. Sampaikan kebutuhan jam saat pemesanan.",
                                en: "Single visits or longer accompaniment are available. Tell us the hours needed when booking."
                            }
                        },
                        {
                            q: {
                                id: "Perlu resep untuk injeksi/infus?",
                                en: "Is a prescription required?"
                            },
                            a: {
                                id: "Ya. Injeksi, infus, dan obat tertentu hanya berdasarkan resep atau instruksi tertulis dokter.",
                                en: "Yes. Injections, infusions, and certain meds require a prescription or written order."
                            }
                        },
                        {
                            q: {
                                id: "Alat dan bahan disediakan?",
                                en: "Are supplies provided?"
                            },
                            a: {
                                id: "Perlengkapan dasar dibawa perawat. Kebutuhan khusus diinformasikan sebelumnya.",
                                en: "Basic supplies are brought. Special needs are communicated in advance."
                            }
                        },
                        {
                            q: {
                                id: "Jika kondisi memburuk?",
                                en: "If the condition worsens?"
                            },
                            a: {
                                id: "Perawat menstabilkan sesuai kompetensi, menghubungi dokter, dan mengarahkan ke IGD bila perlu.",
                                en: "The nurse stabilises within scope, contacts the doctor, and directs to the ER if needed."
                            }
                        }
                    ]
                }
    ]

    function pick(obj, lang) {
        if (!obj) return '';
        if (typeof obj === 'string') return obj;
        return obj[lang] !== undefined ? obj[lang] : obj.id;
    }

    return {
        WA_NUMBER: WA_NUMBER,
        COMMON: COMMON,
        SERVICES: SERVICES,
        pick: pick
    };
});
