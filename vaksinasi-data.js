/** Auto-generated from Excel — run: python tools/build-vaksinasi-data.py */
(function (root, factory) {
    const api = factory();
    if (typeof module === "object" && module.exports) module.exports = api;
    else root.VAKSINASI_DATA = api;
})(typeof self !== "undefined" ? self : this, function () {
    return {
    "source": "assets/JADWAL VAKSINASI ANAK DAN DEWASA .xlsx",
    "anak": {
        "title": "Jadwal Vaksinasi Anak",
        "titleEn": "Child Vaccination Schedule",
        "lead": "Kebutuhan vaksinasi anak berubah seiring bertambahnya usia. Pilih usia anak untuk melihat vaksin yang dapat direkomendasikan sesuai jadwal imunisasi.",
        "leadEn": "Child vaccination needs change with age. Select the child’s age to see vaccines that may be recommended on the immunization schedule.",
        "note": "Jadwal bersifat panduan. Rekomendasi final mengikuti penilaian dokter, riwayat imunisasi, dan ketersediaan vaksin.",
        "noteEn": "This schedule is a guide. Final recommendations follow the doctor’s assessment, immunization history, and vaccine availability.",
        "tabsLabel": "Usia anak",
        "tabsLabelEn": "Child age",
        "tabs": [
            {
                "id": "0-2",
                "label": "0–2 tahun",
                "labelEn": "0–2 years",
                "lead": "Masa imunisasi dasar dan beberapa dosis lanjutan untuk membangun perlindungan sejak awal kehidupan.",
                "leadEn": "Primary immunization and some follow-up doses to build protection from early life.",
                "groups": [
                    {
                        "age": "Lahir",
                        "vaccines": [
                            {
                                "name": "Hepatitis B",
                                "benefit": "Melindungi dari infeksi Hepatitis B dan komplikasinya",
                                "schedule": "Hep B 0",
                                "brand": "Engerix-B 10 MCG atau Euvax B 10 MCG",
                                "brandPending": false
                            },
                            {
                                "name": "Polio",
                                "benefit": "Melindungi dari poliomielitis yang dapat menyebabkan kelumpuhan",
                                "schedule": "Polio 0",
                                "brand": "",
                                "brandPending": true
                            }
                        ]
                    },
                    {
                        "age": "0–1 bulan",
                        "vaccines": [
                            {
                                "name": "BCG",
                                "benefit": "Melindungi terutama dari bentuk berat tuberkulosis pada anak",
                                "schedule": "BCG",
                                "brand": "",
                                "brandPending": true
                            }
                        ]
                    },
                    {
                        "age": "2 bulan",
                        "vaccines": [
                            {
                                "name": "Hepatitis B",
                                "benefit": "Melindungi dari infeksi Hepatitis B dan komplikasinya",
                                "schedule": "Combo DPT 1",
                                "brand": "Infanrix Hexa atau Hexaxim",
                                "brandPending": false
                            },
                            {
                                "name": "Polio",
                                "benefit": "Melindungi dari poliomielitis yang dapat menyebabkan kelumpuhan",
                                "schedule": "",
                                "brand": "",
                                "brandPending": false
                            },
                            {
                                "name": "DTP",
                                "benefit": "Melindungi dari difteri, tetanus, dan pertusis",
                                "schedule": "",
                                "brand": "",
                                "brandPending": false
                            },
                            {
                                "name": "Hib",
                                "benefit": "Melindungi dari penyakit invasif akibat Haemophilus influenzae tipe b",
                                "schedule": "",
                                "brand": "",
                                "brandPending": false
                            },
                            {
                                "name": "Pneumokokus (PCV)",
                                "benefit": "Melindungi dari penyakit pneumokokus seperti pneumonia dan meningitis",
                                "schedule": "PCV 1",
                                "brand": "Prevenar atau Synflorix",
                                "brandPending": false
                            },
                            {
                                "name": "Rotavirus",
                                "benefit": "Melindungi dari gastroenteritis berat akibat rotavirus",
                                "schedule": "Rotavirus 1",
                                "brand": "Rotarix (Monovalen), RotaTeq (Pentavalen)",
                                "brandPending": false
                            }
                        ]
                    },
                    {
                        "age": "3 bulan",
                        "vaccines": [
                            {
                                "name": "Hepatitis B",
                                "benefit": "Melindungi dari infeksi Hepatitis B dan komplikasinya",
                                "schedule": "Combo DPT 2",
                                "brand": "Infanrix Hexa atau Hexaxim",
                                "brandPending": false
                            },
                            {
                                "name": "Polio",
                                "benefit": "Melindungi dari poliomielitis yang dapat menyebabkan kelumpuhan",
                                "schedule": "",
                                "brand": "",
                                "brandPending": false
                            },
                            {
                                "name": "DTP",
                                "benefit": "Melindungi dari difteri, tetanus, dan pertusis",
                                "schedule": "",
                                "brand": "",
                                "brandPending": false
                            },
                            {
                                "name": "Hib",
                                "benefit": "Melindungi dari penyakit invasif akibat Haemophilus influenzae tipe b",
                                "schedule": "",
                                "brand": "",
                                "brandPending": false
                            }
                        ]
                    },
                    {
                        "age": "4 bulan",
                        "vaccines": [
                            {
                                "name": "Hepatitis B",
                                "benefit": "Melindungi dari infeksi Hepatitis B dan komplikasinya",
                                "schedule": "Combo DPT 3",
                                "brand": "Infanrix Hexa atau Hexaxim",
                                "brandPending": false
                            },
                            {
                                "name": "Polio",
                                "benefit": "Melindungi dari poliomielitis yang dapat menyebabkan kelumpuhan",
                                "schedule": "",
                                "brand": "",
                                "brandPending": false
                            },
                            {
                                "name": "DTP",
                                "benefit": "Melindungi dari difteri, tetanus, dan pertusis",
                                "schedule": "",
                                "brand": "",
                                "brandPending": false
                            },
                            {
                                "name": "Hib",
                                "benefit": "Melindungi dari penyakit invasif akibat Haemophilus influenzae tipe b",
                                "schedule": "",
                                "brand": "",
                                "brandPending": false
                            },
                            {
                                "name": "Pneumokokus (PCV)",
                                "benefit": "Melindungi dari penyakit pneumokokus seperti pneumonia dan meningitis",
                                "schedule": "PCV 2",
                                "brand": "Prevenar atau Synflorix",
                                "brandPending": false
                            },
                            {
                                "name": "Rotavirus",
                                "benefit": "Melindungi dari gastroenteritis berat akibat rotavirus",
                                "schedule": "Rotavirus 2",
                                "brand": "Rotarix (Monovalen), RotaTeq (Pentavalen)",
                                "brandPending": false
                            }
                        ]
                    },
                    {
                        "age": "6 bulan",
                        "vaccines": [
                            {
                                "name": "Pneumokokus (PCV)",
                                "benefit": "Melindungi dari penyakit pneumokokus seperti pneumonia dan meningitis",
                                "schedule": "PCV 3",
                                "brand": "Prevenar atau Synflorix",
                                "brandPending": false
                            },
                            {
                                "name": "Rotavirus",
                                "benefit": "Melindungi dari gastroenteritis berat akibat rotavirus",
                                "schedule": "Rotavirus 3",
                                "brand": "Rotarix (Monovalen), RotaTeq (Pentavalen)",
                                "brandPending": false
                            },
                            {
                                "name": "Influenza",
                                "benefit": "Melindungi dari influenza dan mengurangi risiko komplikasinya",
                                "schedule": "Inflluenza 1",
                                "brand": "Vaxigrip Tetra, Fluarix",
                                "brandPending": false
                            },
                            {
                                "name": "HMFD",
                                "benefit": "Melindungi anak dari Hand, Foot and Mouth Disease (HFMD) yang disebabkan oleh Enterovirus 71 (EV71)",
                                "schedule": "HMFD 1",
                                "brand": "Inlive",
                                "brandPending": false
                            }
                        ]
                    },
                    {
                        "age": "7 bulan",
                        "vaccines": [
                            {
                                "name": "Influenza",
                                "benefit": "Melindungi dari influenza dan mengurangi risiko komplikasinya",
                                "schedule": "Inflluenza 2",
                                "brand": "Vaxigrip Tetra, Fluarix",
                                "brandPending": false
                            },
                            {
                                "name": "HMFD",
                                "benefit": "Melindungi anak dari Hand, Foot and Mouth Disease (HFMD) yang disebabkan oleh Enterovirus 71 (EV71)",
                                "schedule": "HMFD 2",
                                "brand": "Inlive",
                                "brandPending": false
                            }
                        ]
                    },
                    {
                        "age": "9 bulan",
                        "vaccines": [
                            {
                                "name": "MR",
                                "benefit": "Melindungi penyakit campak dan rubella",
                                "schedule": "MR 1",
                                "brand": "MR Bio Farma",
                                "brandPending": false
                            },
                            {
                                "name": "Japanese Encephalitis",
                                "benefit": "Melindungi dari Japanese encephalitis",
                                "schedule": "JE 1",
                                "brand": "Imojev",
                                "brandPending": false
                            }
                        ]
                    },
                    {
                        "age": "12 bulan",
                        "vaccines": [
                            {
                                "name": "Pneumokokus (PCV)",
                                "benefit": "Melindungi dari penyakit pneumokokus seperti pneumonia dan meningitis",
                                "schedule": "PCV 4",
                                "brand": "Prevenar atau Synflorix",
                                "brandPending": false
                            },
                            {
                                "name": "Varicella",
                                "benefit": "Melindungi dari penyakit Cacar Air",
                                "schedule": "Varicella 1",
                                "brand": "Varivax",
                                "brandPending": false
                            },
                            {
                                "name": "Hepatitis A",
                                "benefit": "Melindungi dari penyakit Hepatitis A",
                                "schedule": "Hepatitis A 1",
                                "brand": "Avaxim 80; Havrix Junior; Healive",
                                "brandPending": false
                            }
                        ]
                    },
                    {
                        "age": "14 bulan",
                        "vaccines": [
                            {
                                "name": "Varicella",
                                "benefit": "Melindungi dari penyakit Cacar Air",
                                "schedule": "Varicella 2",
                                "brand": "Varivax",
                                "brandPending": false
                            }
                        ]
                    },
                    {
                        "age": "18 bulan",
                        "vaccines": [
                            {
                                "name": "Hepatitis B",
                                "benefit": "Melindungi dari infeksi Hepatitis B dan komplikasinya",
                                "schedule": "Combo DPT 4",
                                "brand": "Infanrix Hexa atau Hexaxim",
                                "brandPending": false
                            },
                            {
                                "name": "Polio",
                                "benefit": "Melindungi dari poliomielitis yang dapat menyebabkan kelumpuhan",
                                "schedule": "",
                                "brand": "",
                                "brandPending": false
                            },
                            {
                                "name": "DTP",
                                "benefit": "Melindungi dari difteri, tetanus, dan pertusis",
                                "schedule": "",
                                "brand": "",
                                "brandPending": false
                            },
                            {
                                "name": "Hib",
                                "benefit": "Melindungi dari penyakit invasif akibat Haemophilus influenzae tipe b",
                                "schedule": "",
                                "brand": "",
                                "brandPending": false
                            },
                            {
                                "name": "MMR",
                                "benefit": "Membantu melindungi dari Campak (Measles), Gondongan (Mumps), dan Rubella",
                                "schedule": "MMR 1",
                                "brand": "MMR II, Priorix",
                                "brandPending": false
                            },
                            {
                                "name": "Hepatitis A",
                                "benefit": "Melindungi dari penyakit Hepatitis A",
                                "schedule": "Hepatitis A 2",
                                "brand": "Avaxim 80; Havrix Junior; Healive",
                                "brandPending": false
                            }
                        ]
                    },
                    {
                        "age": "24 bulan",
                        "vaccines": [
                            {
                                "name": "Japanese Encephalitis",
                                "benefit": "Melindungi dari Japanese encephalitis",
                                "schedule": "JE 2",
                                "brand": "Imojev",
                                "brandPending": false
                            },
                            {
                                "name": "Tifoid",
                                "benefit": "Membantu melindungi dari demam tifoid (tipes) akibat Salmonella Typhi",
                                "schedule": "Tifoid 1",
                                "brand": "Typhim VI",
                                "brandPending": false
                            },
                            {
                                "name": "Influenza",
                                "benefit": "Melindungi dari influenza dan mengurangi risiko komplikasinya",
                                "schedule": "Setiap tahun 1 dosis",
                                "brand": "Vaxigrip Tetra, Fluarix",
                                "brandPending": false
                            }
                        ]
                    }
                ]
            },
            {
                "id": "2-5",
                "label": "2–5 tahun",
                "labelEn": "2–5 years",
                "lead": "Booster dan vaksin lanjutan sesuai usia prasekolah serta pemantauan imunisasi tahunan.",
                "leadEn": "Boosters and follow-up vaccines for preschool age, plus annual immunization where relevant.",
                "groups": [
                    {
                        "age": "3 tahun",
                        "vaccines": [
                            {
                                "name": "Influenza",
                                "benefit": "Melindungi dari influenza dan mengurangi risiko komplikasinya",
                                "schedule": "Setiap tahun 1 dosis",
                                "brand": "Vaxigrip Tetra, Fluarix",
                                "brandPending": false
                            }
                        ]
                    },
                    {
                        "age": "4 tahun",
                        "vaccines": [
                            {
                                "name": "Influenza",
                                "benefit": "Melindungi dari influenza dan mengurangi risiko komplikasinya",
                                "schedule": "Setiap tahun 1 dosis",
                                "brand": "Vaxigrip Tetra, Fluarix",
                                "brandPending": false
                            }
                        ]
                    },
                    {
                        "age": "5 tahun",
                        "vaccines": [
                            {
                                "name": "Hepatitis B",
                                "benefit": "Melindungi dari infeksi Hepatitis B dan komplikasinya",
                                "schedule": "Combo DPT 5",
                                "brand": "Infanrix Hexa atau Hexaxim",
                                "brandPending": false
                            },
                            {
                                "name": "Polio",
                                "benefit": "Melindungi dari poliomielitis yang dapat menyebabkan kelumpuhan",
                                "schedule": "",
                                "brand": "",
                                "brandPending": false
                            },
                            {
                                "name": "DTP",
                                "benefit": "Melindungi dari difteri, tetanus, dan pertusis",
                                "schedule": "",
                                "brand": "",
                                "brandPending": false
                            },
                            {
                                "name": "Hib",
                                "benefit": "Melindungi dari penyakit invasif akibat Haemophilus influenzae tipe b",
                                "schedule": "",
                                "brand": "",
                                "brandPending": false
                            },
                            {
                                "name": "MMR",
                                "benefit": "Membantu melindungi dari Campak (Measles), Gondongan (Mumps), dan Rubella",
                                "schedule": "MMR 2",
                                "brand": "MMR II, Priorix",
                                "brandPending": false
                            },
                            {
                                "name": "Influenza",
                                "benefit": "Melindungi dari influenza dan mengurangi risiko komplikasinya",
                                "schedule": "Setiap tahun 1 dosis",
                                "brand": "Vaxigrip Tetra, Fluarix",
                                "brandPending": false
                            },
                            {
                                "name": "Tifoid",
                                "benefit": "Membantu melindungi dari demam tifoid (tipes) akibat Salmonella Typhi",
                                "schedule": "Setiap 3 tahun 1 dosis",
                                "brand": "Typhim VI",
                                "brandPending": false
                            }
                        ]
                    }
                ]
            },
            {
                "id": "6-12",
                "label": "6–12 tahun",
                "labelEn": "6–12 years",
                "lead": "Vaksin usia sekolah termasuk booster, influenza, dan vaksin yang mulai relevan pada usia ini.",
                "leadEn": "School-age vaccines including boosters, influenza, and vaccines that become relevant at this age.",
                "groups": [
                    {
                        "age": "6 tahun",
                        "vaccines": [
                            {
                                "name": "Influenza",
                                "benefit": "Melindungi dari influenza dan mengurangi risiko komplikasinya",
                                "schedule": "Setiap tahun 1 dosis",
                                "brand": "Vaxigrip Tetra, Fluarix",
                                "brandPending": false
                            },
                            {
                                "name": "Dengue",
                                "benefit": "Melindungi dari Virus Demam Berdarah",
                                "schedule": "2 dosis (0 dan 3 bulan)",
                                "brand": "Qdenga",
                                "brandPending": false
                            }
                        ]
                    },
                    {
                        "age": "7 tahun",
                        "vaccines": [
                            {
                                "name": "Influenza",
                                "benefit": "Melindungi dari influenza dan mengurangi risiko komplikasinya",
                                "schedule": "Setiap tahun 1 dosis",
                                "brand": "Vaxigrip Tetra, Fluarix",
                                "brandPending": false
                            }
                        ]
                    },
                    {
                        "age": "8 tahun",
                        "vaccines": [
                            {
                                "name": "Tifoid",
                                "benefit": "Membantu melindungi dari demam tifoid (tipes) akibat Salmonella Typhi",
                                "schedule": "Setiap 3 tahun 1 dosis",
                                "brand": "Typhim VI",
                                "brandPending": false
                            },
                            {
                                "name": "Influenza",
                                "benefit": "Melindungi dari influenza dan mengurangi risiko komplikasinya",
                                "schedule": "Setiap tahun 1 dosis",
                                "brand": "Vaxigrip Tetra, Fluarix",
                                "brandPending": false
                            }
                        ]
                    },
                    {
                        "age": "9 tahun",
                        "vaccines": [
                            {
                                "name": "Influenza",
                                "benefit": "Melindungi dari influenza dan mengurangi risiko komplikasinya",
                                "schedule": "Setiap tahun 1 dosis",
                                "brand": "Vaxigrip Tetra, Fluarix",
                                "brandPending": false
                            },
                            {
                                "name": "HPV",
                                "benefit": "Melindungi dari kanker serviks atay kanker leher rahim pada wanita",
                                "schedule": "2 dosis (0 dan 6 bulan)",
                                "brand": "Gardasil atau Cervarix",
                                "brandPending": false
                            }
                        ]
                    },
                    {
                        "age": "10 tahun",
                        "vaccines": [
                            {
                                "name": "DTP",
                                "benefit": "Melindungi dari difteri, tetanus, dan pertusis",
                                "schedule": "Booster DPT (Tdap)",
                                "brand": "Boostrix",
                                "brandPending": false
                            },
                            {
                                "name": "Influenza",
                                "benefit": "Melindungi dari influenza dan mengurangi risiko komplikasinya",
                                "schedule": "Setiap tahun 1 dosis",
                                "brand": "Vaxigrip Tetra, Fluarix",
                                "brandPending": false
                            }
                        ]
                    },
                    {
                        "age": "11 tahun",
                        "vaccines": [
                            {
                                "name": "Tifoid",
                                "benefit": "Membantu melindungi dari demam tifoid (tipes) akibat Salmonella Typhi",
                                "schedule": "Setiap 3 tahun 1 dosis",
                                "brand": "Typhim VI",
                                "brandPending": false
                            },
                            {
                                "name": "Influenza",
                                "benefit": "Melindungi dari influenza dan mengurangi risiko komplikasinya",
                                "schedule": "Setiap tahun 1 dosis",
                                "brand": "Vaxigrip Tetra, Fluarix",
                                "brandPending": false
                            }
                        ]
                    },
                    {
                        "age": "12 tahun",
                        "vaccines": [
                            {
                                "name": "Influenza",
                                "benefit": "Melindungi dari influenza dan mengurangi risiko komplikasinya",
                                "schedule": "Setiap tahun 1 dosis",
                                "brand": "Vaxigrip Tetra, Fluarix",
                                "brandPending": false
                            }
                        ]
                    }
                ]
            },
            {
                "id": "remaja",
                "label": "Remaja",
                "labelEn": "Teens",
                "lead": "Vaksinasi remaja termasuk booster dan vaksin sesuai kebutuhan usia remaja.",
                "leadEn": "Adolescent vaccination including boosters and age-appropriate vaccines.",
                "groups": [
                    {
                        "age": "13 tahun",
                        "vaccines": [
                            {
                                "name": "Influenza",
                                "benefit": "Melindungi dari influenza dan mengurangi risiko komplikasinya",
                                "schedule": "Setiap tahun 1 dosis",
                                "brand": "Vaxigrip Tetra, Fluarix",
                                "brandPending": false
                            }
                        ]
                    },
                    {
                        "age": "14 tahun",
                        "vaccines": [
                            {
                                "name": "Tifoid",
                                "benefit": "Membantu melindungi dari demam tifoid (tipes) akibat Salmonella Typhi",
                                "schedule": "Setiap 3 tahun 1 dosis",
                                "brand": "Typhim VI",
                                "brandPending": false
                            },
                            {
                                "name": "Influenza",
                                "benefit": "Melindungi dari influenza dan mengurangi risiko komplikasinya",
                                "schedule": "Setiap tahun 1 dosis",
                                "brand": "Vaxigrip Tetra, Fluarix",
                                "brandPending": false
                            }
                        ]
                    },
                    {
                        "age": "15 tahun",
                        "vaccines": [
                            {
                                "name": "Influenza",
                                "benefit": "Melindungi dari influenza dan mengurangi risiko komplikasinya",
                                "schedule": "Setiap tahun 1 dosis",
                                "brand": "Vaxigrip Tetra, Fluarix",
                                "brandPending": false
                            }
                        ]
                    },
                    {
                        "age": "16 tahun",
                        "vaccines": [
                            {
                                "name": "Influenza",
                                "benefit": "Melindungi dari influenza dan mengurangi risiko komplikasinya",
                                "schedule": "Setiap tahun 1 dosis",
                                "brand": "Vaxigrip Tetra, Fluarix",
                                "brandPending": false
                            }
                        ]
                    },
                    {
                        "age": "17 tahun",
                        "vaccines": [
                            {
                                "name": "Tifoid",
                                "benefit": "Membantu melindungi dari demam tifoid (tipes) akibat Salmonella Typhi",
                                "schedule": "Setiap 3 tahun 1 dosis",
                                "brand": "Typhim VI",
                                "brandPending": false
                            },
                            {
                                "name": "Influenza",
                                "benefit": "Melindungi dari influenza dan mengurangi risiko komplikasinya",
                                "schedule": "Setiap tahun 1 dosis",
                                "brand": "Vaxigrip Tetra, Fluarix",
                                "brandPending": false
                            }
                        ]
                    },
                    {
                        "age": "18 tahun",
                        "vaccines": [
                            {
                                "name": "Influenza",
                                "benefit": "Melindungi dari influenza dan mengurangi risiko komplikasinya",
                                "schedule": "Setiap tahun 1 dosis",
                                "brand": "Vaxigrip Tetra, Fluarix",
                                "brandPending": false
                            }
                        ]
                    }
                ]
            }
        ]
    },
    "dewasa": {
        "title": "Jadwal Vaksinasi Dewasa",
        "titleEn": "Adult Vaccination Schedule",
        "lead": "Kebutuhan vaksin dewasa berbeda untuk setiap orang. Pilih kelompok yang sesuai untuk melihat vaksin yang dapat dipertimbangkan.",
        "leadEn": "Adult vaccine needs differ from person to person. Select the relevant group to see vaccines that may be considered.",
        "note": "Jadwal bersifat panduan. Rekomendasi final mengikuti penilaian dokter, riwayat vaksinasi, dan ketersediaan vaksin.",
        "noteEn": "This schedule is a guide. Final recommendations follow the doctor’s assessment, vaccination history, and vaccine availability.",
        "tabsLabel": "Kelompok vaksinasi dewasa",
        "tabsLabelEn": "Adult vaccination groups",
        "tabs": [
            {
                "id": "dewasa",
                "label": "Dewasa",
                "labelEn": "Adults",
                "lead": "Vaksin yang umum dipertimbangkan pada usia dewasa, termasuk booster yang mungkin sudah terlewat.",
                "leadEn": "Vaccines commonly considered in adulthood, including boosters that may have been missed.",
                "groups": [
                    {
                        "age": "",
                        "vaccines": [
                            {
                                "name": "Influenza",
                                "benefit": "Melindungi dari influenza dan mengurangi risiko komplikasinya",
                                "schedule": "Setiap tahun 1 dosis",
                                "brand": "Vaxigrip Tetra, Fluarix",
                                "brandPending": false
                            },
                            {
                                "name": "Tetanus, Difteri, Pertusis",
                                "benefit": "Melindungi dari difteri, tetanus, dan pertusis",
                                "schedule": "1 dosis booster Tdap seumur hidup",
                                "brand": "Boostrix",
                                "brandPending": false
                            },
                            {
                                "name": "Cacar Air",
                                "benefit": "Melindungi dari cacar air",
                                "schedule": "2 dosis (0, 1-2 bulan) seumur hidup",
                                "brand": "Varivax",
                                "brandPending": false
                            },
                            {
                                "name": "HPV Perempuan",
                                "benefit": "Melindungi dari virus HPV penyebab HPV dan Kutil Kelamin",
                                "schedule": "3 dosis (0, 1 atau 2, 6 bulan)",
                                "brand": "Gardasil 9",
                                "brandPending": false
                            },
                            {
                                "name": "HPV Laki-laki",
                                "benefit": "Melindungi dari virus HPV menyebab Kutil Kelamin",
                                "schedule": "3 dosis (0, 2, 6 bulan)",
                                "brand": "Gardasil 9 atau Gardasil",
                                "brandPending": false
                            },
                            {
                                "name": "Hepatitis A dan B",
                                "benefit": "Melindungi dari hepatitis A dan B",
                                "schedule": "3 dosis (0, 1, 6 bulan)",
                                "brand": "Twinrix",
                                "brandPending": false
                            },
                            {
                                "name": "Tifoid",
                                "benefit": "Melindungi dari Demam Tifoid",
                                "schedule": "1 dosis tiap 3 tahun",
                                "brand": "Typhim VI",
                                "brandPending": false,
                                "schedules": [
                                    "1 dosis tiap 3 tahun",
                                    "1 dosis seumur hidup"
                                ],
                                "brands": [
                                    "Typhim VI",
                                    "Bio TCV Biofarma"
                                ]
                            },
                            {
                                "name": "Dengue",
                                "benefit": "Melindungi dari Demam Berdarah Dengue",
                                "schedule": "2 dosis (0, 3 bulan)",
                                "brand": "Qdenga",
                                "brandPending": false
                            },
                            {
                                "name": "Pneumonia",
                                "benefit": "Melindungi dari Pneumonia",
                                "schedule": "1 dosis seumur hidup",
                                "brand": "Prevenar 20",
                                "brandPending": false
                            }
                        ]
                    }
                ]
            },
            {
                "id": "premarital",
                "label": "Premarital",
                "labelEn": "Premarital",
                "lead": "Vaksin yang dapat dipertimbangkan sebelum menikah atau saat merencanakan kehamilan.",
                "leadEn": "Vaccines that may be considered before marriage or when planning a pregnancy.",
                "groups": [
                    {
                        "age": "",
                        "vaccines": [
                            {
                                "name": "Tetanus, Difteri, Pertusis",
                                "benefit": "Melindungi dari difteri, tetanus, dan pertusis",
                                "schedule": "1 dosis booster Tdap",
                                "brand": "Boostrix",
                                "brandPending": false
                            },
                            {
                                "name": "MMR",
                                "benefit": "Melindungi dari Measles (Campak), Mumps (Gondongan), Rubella/ Campak Jerman (MMR)",
                                "schedule": "2 dosis (Jeda 28 hari)",
                                "brand": "MMR II, Priorix",
                                "brandPending": false
                            },
                            {
                                "name": "HPV Perempuan",
                                "benefit": "Melindungi dari virus HPV penyebab HPV dan Kutil Kelamin",
                                "schedule": "3 dosis (0, 1 atau 2, 6 bulan)",
                                "brand": "Gardasil 9",
                                "brandPending": false
                            }
                        ]
                    }
                ]
            },
            {
                "id": "hamil",
                "label": "Ibu Hamil",
                "labelEn": "Pregnancy",
                "lead": "Vaksin yang dapat dipertimbangkan selama kehamilan sesuai penilaian dokter dan usia kehamilan.",
                "leadEn": "Vaccines that may be considered during pregnancy based on the doctor’s assessment and gestational age.",
                "groups": [
                    {
                        "age": "",
                        "vaccines": [
                            {
                                "name": "RSV",
                                "benefit": "Melindungi dari Respiratory Syncytial Virus (RSV) (Bivalen)",
                                "schedule": "1 dosis",
                                "brand": "Abrysvo",
                                "brandPending": false,
                                "schedules": [
                                    "1 dosis",
                                    "1 dosis diulang tiap tahun"
                                ]
                            },
                            {
                                "name": "Tetanus, Difteri, Pertusis",
                                "benefit": "Melindungi dari difteri, tetanus, dan pertusis",
                                "schedule": "1 dosis setiap kehamilan",
                                "brand": "Boostrix",
                                "brandPending": false
                            },
                            {
                                "name": "Influenza",
                                "benefit": "Melindungi dari influenza dan mengurangi risiko komplikasinya",
                                "schedule": "Setiap tahun 1 dosis",
                                "brand": "Vaxigrip Tetra, Fluarix",
                                "brandPending": false
                            }
                        ]
                    }
                ]
            },
            {
                "id": "nakes",
                "label": "Tenaga Kesehatan",
                "labelEn": "Healthcare Workers",
                "lead": "Vaksin yang dapat dipertimbangkan karena risiko paparan di lingkungan kerja kesehatan.",
                "leadEn": "Vaccines that may be considered because of exposure risk in healthcare settings.",
                "groups": [
                    {
                        "age": "",
                        "vaccines": [
                            {
                                "name": "Hepatitis B",
                                "benefit": "Melindungi dari infeksi Hepatitis B dan komplikasinya",
                                "schedule": "3 dosis (0, 1, 6 bulan) seumur hidup",
                                "brand": "Engerix-B 20 MCG atau Euvax B 20 MCG",
                                "brandPending": false
                            },
                            {
                                "name": "Influenza",
                                "benefit": "Melindungi dari influenza dan mengurangi risiko komplikasinya",
                                "schedule": "1 dosis diulang setiap tahun",
                                "brand": "Vaxigrip Tetra, Fluarix",
                                "brandPending": false
                            },
                            {
                                "name": "Varicella",
                                "benefit": "Melindungi dari penyakit Cacar Air",
                                "schedule": "Varicella 1",
                                "brand": "Varivax",
                                "brandPending": false
                            }
                        ]
                    }
                ]
            },
            {
                "id": "rabies",
                "label": "Pasca Gigitan Hewan",
                "labelEn": "After Animal Bite",
                "lead": "Setelah gigitan hewan yang dicurigai rabies, penanganan perlu dilakukan sesegera mungkin. Hubungi tim untuk arahan lebih lanjut.",
                "leadEn": "After a bite from an animal suspected of rabies, handling should not be delayed. Contact the team for further guidance.",
                "groups": [
                    {
                        "age": "",
                        "vaccines": [
                            {
                                "name": "Rabies",
                                "benefit": "Melindungi dari Rabies",
                                "schedule": "4 dosis (Hari 0 (2 dosis), Hari 7 (1 dosis), dan Hari 21 (1dosis)",
                                "brand": "Verorab",
                                "brandPending": false
                            }
                        ]
                    }
                ]
            }
        ]
    },
    "perjalanan": {
        "title": "Jadwal Vaksinasi Perjalanan",
        "titleEn": "Travel Vaccination Schedule",
        "lead": "Vaksin perjalanan menyesuaikan tujuan dan persyaratan masuk. Pilih kebutuhan perjalanan untuk melihat vaksin yang dapat dipertimbangkan.",
        "leadEn": "Travel vaccines depend on destination and entry requirements. Select the travel need to see vaccines that may be considered.",
        "note": "Jadwal bersifat panduan. Persyaratan negara tujuan dan ketersediaan vaksin dikonfirmasi saat booking.",
        "noteEn": "This schedule is a guide. Destination requirements and vaccine availability are confirmed when booking.",
        "tabsLabel": "Kebutuhan perjalanan",
        "tabsLabelEn": "Travel needs",
        "tabs": [
            {
                "id": "travelling",
                "label": "Negara Tertentu",
                "labelEn": "Certain Countries",
                "lead": "Vaksin yang dapat dipertimbangkan atau dipersyaratkan untuk perjalanan ke negara tertentu.",
                "leadEn": "Vaccines that may be considered or required for travel to certain countries.",
                "groups": [
                    {
                        "age": "",
                        "vaccines": [
                            {
                                "name": "Yellow Fever",
                                "benefit": "Melindungi dari Demam Kuning",
                                "schedule": "1 dosis seumur hidup",
                                "brand": "Stamaril",
                                "brandPending": false
                            },
                            {
                                "name": "Japanese Encephalitis",
                                "benefit": "Melindungi dari Ensefalitis",
                                "schedule": "1 dosis seumur hidup",
                                "brand": "Imojev",
                                "brandPending": false
                            },
                            {
                                "name": "Influenza",
                                "benefit": "Melindungi dari influenza dan mengurangi risiko komplikasinya",
                                "schedule": "1 dosis diulang setiap tahun",
                                "brand": "Vaxigrip Tetra, Fluarix",
                                "brandPending": false
                            },
                            {
                                "name": "Tifoid",
                                "benefit": "Membantu melindungi dari demam tifoid (tipes) akibat Salmonella Typhi",
                                "schedule": "Setiap 3 tahun 1 dosis",
                                "brand": "Typhim VI",
                                "brandPending": false
                            }
                        ]
                    }
                ]
            },
            {
                "id": "haji",
                "label": "Haji & Umroh",
                "labelEn": "Hajj & Umrah",
                "lead": "Vaksin yang umum dibutuhkan jemaah haji dan umroh, termasuk yang menjadi persyaratan keberangkatan.",
                "leadEn": "Vaccines commonly needed by Hajj and Umrah pilgrims, including those required for departure.",
                "groups": [
                    {
                        "age": "",
                        "vaccines": [
                            {
                                "name": "Pneumonia",
                                "benefit": "Melindungi dari Pneumonia",
                                "schedule": "1 dosis seumur hidup",
                                "brand": "Prevenar 20",
                                "brandPending": false
                            },
                            {
                                "name": "Meningitis",
                                "benefit": "Melindungi dari Meningitis",
                                "schedule": "1 dosis tiap akan berangkat haji dan umroh",
                                "brand": "Menivax, Menquadfi",
                                "brandPending": false
                            },
                            {
                                "name": "Polio IPV",
                                "benefit": "Melindungi dari Polio",
                                "schedule": "1 dosis, wajib untuk jemaah umroh dan haji dari Indonesia",
                                "brand": "Polio IPV Biofarma",
                                "brandPending": false
                            },
                            {
                                "name": "Influenza",
                                "benefit": "Melindungi dari influenza dan mengurangi risiko komplikasinya",
                                "schedule": "1 dosis diulang setiap tahun",
                                "brand": "Vaxigrip Tetra, Fluarix",
                                "brandPending": false
                            }
                        ]
                    }
                ]
            }
        ]
    },
    "lansia": {
        "title": "Jadwal Vaksinasi Lansia",
        "titleEn": "Elderly Vaccination Schedule",
        "lead": "Beberapa vaksin dapat dipertimbangkan seiring bertambahnya usia. Pilih kelompok usia untuk melihat vaksin yang dapat dipertimbangkan.",
        "leadEn": "Some vaccines may be considered as age increases. Select the age group to see vaccines that may be considered.",
        "note": "Jadwal bersifat panduan. Rekomendasi final mengikuti penilaian dokter, riwayat penyakit, dan obat yang dikonsumsi.",
        "noteEn": "This schedule is a guide. Final recommendations follow the doctor’s assessment, medical history, and current medicines.",
        "tabsLabel": "Kelompok usia lansia",
        "tabsLabelEn": "Older adult age groups",
        "tabs": [
            {
                "id": "50",
                "label": "Di atas 50 tahun",
                "labelEn": "Over 50",
                "lead": "Vaksin yang dapat dipertimbangkan mulai usia 50 tahun ke atas.",
                "leadEn": "Vaccines that may be considered from age 50 onwards.",
                "groups": [
                    {
                        "age": "",
                        "vaccines": [
                            {
                                "name": "Herpes Zoster",
                                "benefit": "Melindungi dari Herpes Zoster, Cacar Ular / Cacar Api",
                                "schedule": "2 dosis (0, 2-6 bulan)",
                                "brand": "Shingrix",
                                "brandPending": false
                            },
                            {
                                "name": "Pneumonia",
                                "benefit": "Melindungi dari Pneumonia",
                                "schedule": "1 dosis seumur hidup",
                                "brand": "Prevenar 20",
                                "brandPending": false
                            },
                            {
                                "name": "Influenza",
                                "benefit": "Melindungi dari influenza dan mengurangi risiko komplikasinya",
                                "schedule": "Setiap tahun 1 dosis",
                                "brand": "Vaxigrip Tetra, Fluarix",
                                "brandPending": false
                            }
                        ]
                    }
                ]
            },
            {
                "id": "60",
                "label": "Di atas 60 tahun",
                "labelEn": "Over 60",
                "lead": "Vaksin tambahan yang dapat dipertimbangkan mulai usia 60 tahun ke atas, selain vaksin di atas 50 tahun.",
                "leadEn": "Additional vaccines that may be considered from age 60 onwards, alongside the over-50 vaccines.",
                "groups": [
                    {
                        "age": "",
                        "vaccines": [
                            {
                                "name": "RSV",
                                "benefit": "Melindungi dari Respiratory Syncytial Virus (RSV) Beradjuvan",
                                "schedule": "1 dosis diulang tiap tahun",
                                "brand": "Avevxy",
                                "brandPending": false,
                                "brands": [
                                    "Avevxy",
                                    "Abrysvo"
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }
};
});
