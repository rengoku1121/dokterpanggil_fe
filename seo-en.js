/**
 * English UI copy for SEO landing pages.
 * Keys align with seo-data.js SERVICE_SEO / DOCTOR_PAGES (minus meta/related).
 * metaTitle, metaDesc, and related stay Indonesian for SEO.
 */
module.exports = {
    services: {
        'kunjungan-dokter': {
            h1: 'GP Visit 24 Hours at Home',
            lead: 'Need a doctor’s exam without going to a hospital or clinic? A GP is ready to come to your home for an examination, initial care, and to help decide next steps based on the patient’s condition.',
            chips: [
                'Available 24 Hours',
                'Doctor Comes to Your Home',
                'For Children, Adults, and Elderly'
            ],
            ctaBook: 'Call a Doctor Now',
            ctaAsk: 'Ask via WhatsApp',
            d1: {
                whenTitle: 'When Should You Call a Doctor to Your Home?',
                whenCards: [
                    { title: 'Feeling Unwell and Need a Doctor’s Exam', desc: 'Fever, cough, cold, sore throat, dizziness, nausea, vomiting, diarrhea, pain, fatigue, or other concerns that need an in-person check' },
                    { title: 'Patient Finds Travel Difficult or Uncomfortable', desc: 'Suitable for older adults, patients who feel weak, are recovering, or have limited mobility and are more comfortable being examined at home' },
                    { title: 'A Child Is Unwell', desc: 'When a child has a fever or feels unwell and parents want a doctor’s exam without taking the child out or waiting in line' },
                    { title: 'Need an Assessment Before Further Care', desc: 'A doctor can examine first to decide whether the patient needs medicine, lab tests, medical procedures, nursing care, a specialist consult, or further care at a healthcare facility.' }
                ],
                doubtTitle: 'Still unsure whether the patient’s condition can be handled at home?',
                doubtBody: 'Tell the Dokter Panggil team about the patient’s symptoms. We will help direct you to the right service.',
                doubtCta: 'Ask via WhatsApp',
                symptomsTitle: 'Conditions a GP Can Handle',
                symptomsLead: 'A GP can examine and provide initial care for a wide range of health concerns in children, adults, and older adults.',
                symptoms: ['Diarrhea', 'Abdominal Pain', 'Fatigue', 'Muscle & Joint Pain', 'Mild Allergy', 'Mild Skin Concerns', 'Blood Pressure', 'Blood Sugar', 'Elderly Concerns', 'Other General Concerns'],
                symptomsMissPrefix: 'Can’t find your concern? ',
                symptomsMissLink: 'Tell our team about the patient’s condition via WhatsApp. We will help direct you to the right service.',
                visitTitle: 'What the Doctor Does During the Visit',
                visitLead: 'An exam at home — the doctor examines based on symptoms and the patient’s condition to decide the care needed.',
                visitSteps: [
                    { title: 'Symptom Evaluation', desc: 'The doctor asks about symptoms, medical history, current medicines, and other health information.' },
                    { title: 'Physical Exam', desc: 'Vital signs and a physical exam are done based on the patient’s condition. Standard medical equipment is brought to the visit.' },
                    { title: 'Assessment & Initial Care', desc: 'The doctor explains findings and provides therapy or initial treatment if needed.' },
                    { title: 'Next Care Plan', desc: 'If needed, the doctor may recommend medicine, lab tests, procedures, a specialist consult, or referral to a healthcare facility.' }
                ],
                followTitle: 'Care Does Not Stop After the Consultation',
                followLead: 'When needed based on the exam, the Dokter Panggil team can help coordinate follow-up care at home:',
                followUps: [
                    { title: 'Medicine & Pharmacy', desc: 'Helps with medicine needs according to the doctor’s prescription or advice.' },
                    { title: 'Laboratory Tests', desc: 'Sample collection can be done directly at home.' },
                    { title: 'Medical Procedures', desc: 'Infusion, nebulizer, wound care, catheter placement, and other procedures as indicated.' },
                    { title: 'Homecare Nursing to Home Inpatient Care', desc: 'Companionship and monitoring for ongoing care needs.' }
                ],
                nightTitle: 'Need a Doctor at Night? We are still ready.',
                nightBody: 'GP visits are available 24 hours, including nights, weekends, and holidays.',
                howTitle: 'How to Call a Doctor',
                howSteps: [
                    { title: 'Contact Us 24 Hours', desc: 'WhatsApp or call the Dokter Panggil Call Centre.' },
                    { title: 'Share the Patient’s Condition', desc: 'Share symptoms, the patient’s ID card details, and the visit location.' },
                    { title: 'Confirm Service & Cost', desc: 'The team will explain the service and estimated cost before the visit.' },
                    { title: 'The Doctor Contacts You', desc: 'After confirmation, the assigned doctor will contact you for preparation and the visit.' }
                ],
                whyTitle: 'Why Call a GP from Dokter Panggil?',
                whyItems: [
                    { title: 'Available 24 Hours', desc: 'Access a GP whenever needed, including at night.' },
                    { title: 'Exam Directly at Home', desc: 'Patients do not need to queue or travel when feeling unwell.' },
                    { title: 'Coordinated Care', desc: 'Medicine, lab, procedures, and nursing can be coordinated after the exam.' },
                    { title: 'For the Whole Family', desc: 'Care is available for children, adults, and older adults.' }
                ],
                areaLabel: 'Service Area',
                areaTitle: 'GP Home Visits in Makassar',
                areaBody: 'Service is available in Makassar City, Gowa, and Maros within Dokter Panggil’s operating coverage.',
                areaCta: 'Ask About Coverage',
                faqTitle: 'FAQ',
                faqs: [
                    { q: 'How long until the doctor arrives?', a: 'Arrival time depends on the patient’s location, traffic, and where the doctor is when you book. After confirmation, the medical team will share an estimated visit time.' },
                    { q: 'How much does a GP home visit cost?', a: 'A GP visit is Rp220,000 per visit, plus doctor transport of Rp10,000/km from Dokter Panggil’s location. Outside working hours, an extra 50% of the visit fee applies. Fees exclude extras if needed, such as medicine, disposable medical supplies, procedures, lab tests, nursing fees and transport, and admin.' },
                    { q: 'Can one doctor visit cover several family members?', a: 'Yes. One visit can serve more than one family member. Tell us how many patients when booking so we can prepare exam time and medical needs. The doctor visit fee applies per patient, while doctor transport is charged once for the same visit.' },
                    { q: 'Does the doctor come alone?', a: 'No. Every doctor visit is accompanied by a nurse to support the exam and care during the visit. Nurse accompaniment has no extra fee unless nursing or medical procedures are performed.' },
                    { q: 'Is medicine provided during the visit?', a: 'Yes. Before the visit, the doctor does an initial triage to understand symptoms and condition. Based on that, the doctor coordinates with the nursing team to prepare medicine and possible medical supplies and bring them to the visit. Medicine and supplies are given based on the on-site exam and charged according to use.' },
                    { q: 'Can the doctor provide a prescription, medicine, or lab recommendations after the exam?', a: 'Yes. If needed, the doctor can provide a prescription, medicine, and lab recommendations based on the exam. Next steps are coordinated by the Dokter Panggil team.' },
                    { q: 'Can the doctor do infusion or other medical procedures at home?', a: 'Yes. Medical procedures can be done at home by the medical team based on patient needs and the doctor’s exam findings.' },
                    { q: 'Can the doctor issue a sick leave letter?', a: 'The doctor can issue a sick leave letter when the exam findings support it under applicable rules.' }
                ],
                ctaTitle: 'Need a Doctor to Come to Your Home?',
                ctaBody: 'No need to wait or leave home when you are unwell. Contact Dokter Panggil and share the patient’s condition. Our team is ready to arrange a GP home visit for you 24 hours a day.',
                ctaAskChat: 'Chat WhatsApp'
            },
        },

        'perawatan-rumah': {
            h1: 'Professional Nursing Care Directly at Home',
            lead: 'Professional nurses provide accompaniment, observation, and nursing care based on the doctor’s recommendation and supervision, so patients receive continuous care at home.',
            chips: [
                'Professional Nurses',
                'Under Doctor Supervision',
                'Care Matched to Your Needs'
            ],
            ctaBook: 'Discuss Patient Needs',
            ctaAsk: 'Chat WhatsApp',
            d3: {
                whenTitle: 'When Do You Need Homecare Nursing at Home?',
                whenLead: 'Nursing support at home is provided based on the doctor’s examination and recommendation, according to each patient’s condition and care needs.',
                whenCards: [
                    { title: 'Needs Condition Monitoring', desc: 'For patients who need regular or continuous health monitoring while receiving care at home.' },
                    { title: 'After Hospital Care', desc: 'For patients who still need monitoring and support during recovery at home according to the doctor’s care plan.' },
                    { title: 'Needs Care Assistance', desc: 'For patients with certain conditions or limited activity who need nursing help with day-to-day care.' },
                    { title: 'Needs Ongoing Care', desc: 'For patients who need nursing support over a set period as part of the doctor’s care plan.' }
                ],
                doubtTitle: 'Does the patient need nursing support?',
                doubtBody: 'A doctor will assess first to determine the need and the right form of support for the patient’s condition.',
                doubtCta: 'Consult a Doctor',
                tasksTitle: 'What Does the Nurse Do During Care?',
                tasksLead: 'Care follows the doctor’s plan — the nurse helps carry out monitoring and the patient’s care needs at home under the supervising doctor’s direction.',
                tasks: [
                    { title: 'Condition Monitoring', desc: 'Monitors the patient’s progress and changes during the care period.' },
                    { title: 'Vital Signs Monitoring', desc: 'Checks blood pressure, pulse, temperature, breathing, and other parameters as needed.' },
                    { title: 'Medication Support', desc: 'Helps give medicines according to the prescription and medical instructions.' },
                    { title: 'Basic Patient Care', desc: 'Helps with hygiene, comfort, and day-to-day care needs.' },
                    { title: 'Patient Mobilization', desc: 'Helps with mobilization and activity according to the patient’s condition and ability.' },
                    { title: 'Intake & Elimination Monitoring', desc: 'Monitors food and fluid intake and elimination when needed.' },
                    { title: 'Nursing Procedures', desc: 'Performs nursing procedures as needed according to medical instructions and the care plan.' },
                    { title: 'Coordination with the Doctor', desc: 'Communicates progress or changes in condition to the supervising doctor.' }
                ],
                superTitle: 'Care Under Doctor Supervision',
                superHeadline: 'Nurses Do Not Work Alone',
                superBody: 'Every Dokter Panggil Homecare Nursing assignment is under doctor supervision. The nurse monitors and carries out the care plan at home, while the patient’s progress can be coordinated with the doctor throughout the care period.',
                flowSteps: [
                    { title: 'Doctor Examination', desc: 'The doctor assesses the patient’s condition and care needs.' },
                    { title: 'Care Plan', desc: 'The doctor sets the care plan and form of nursing support.' },
                    { title: 'Nursing Care at Home', desc: 'The nurse carries out monitoring and care according to the plan.' },
                    { title: 'Monitoring & Coordination', desc: 'Patient progress is communicated to the supervising doctor.' },
                    { title: 'Evaluation / Adjustment', desc: 'The doctor may adjust care based on the patient’s progress.' }
                ],
                durationTitle: 'Care Duration Matched to Patient Needs',
                durationLead: 'Nursing duration is based on the patient’s condition, monitoring needs, and the doctor’s recommendation.',
                durations: [
                    { title: 'Daily Support', desc: 'Support for a set period according to the patient’s needs.' },
                    { title: '24-Hour Support', desc: 'Monitoring and care around the clock based on the doctor’s recommendation.' },
                    { title: 'Ongoing Support', desc: 'Support over several days or a set period, with evaluation based on how the patient progresses.' }
                ],
                startTitle: 'How Does Nursing Support Begin?',
                startSteps: [
                    { title: 'Consultation & Doctor Exam', desc: 'The doctor assesses the patient’s condition and care needs.' },
                    { title: 'Care Recommendation', desc: 'The doctor determines the need for support, the care plan, and the duration based on the patient’s condition.' },
                    { title: 'Cost Confirmation', desc: 'The Dokter Panggil team shares a cost estimate with the family.' },
                    { title: 'Care Begins', desc: 'The nurse carries out support according to the care plan under doctor supervision.' }
                ],
                changeTitle: 'When the Patient’s Condition Changes',
                changeLead: 'Care stays connected — during support, the nurse monitors progress and can coordinate with the doctor if the condition changes. The doctor can evaluate and recommend next services based on patient needs.',
                linkedLabel: 'Connected services:',
                whyTitle: 'Why Homecare Nursing with Dokter Panggil?',
                whyItems: [
                    { title: 'Based on Doctor Recommendation', desc: 'Support is given based on the doctor’s assessment and the patient’s care needs.' },
                    { title: 'Professional Nurses', desc: 'Care and monitoring are provided by nursing professionals according to patient needs.' },
                    { title: 'Under Doctor Supervision', desc: 'Patient progress can be coordinated with the doctor throughout the care period.' },
                    { title: 'Connected to Medical Services', desc: 'Specialists, lab tests, pharmacy, procedures, and other services can be coordinated when needed.' }
                ],
                faqTitle: 'FAQ',
                faqs: [
                    { q: 'Can I book a homecare nurse directly?', a: 'Nursing support is based on a doctor’s recommendation. The doctor assesses the patient first to determine the need and the right form of support.' },
                    { q: 'Are nurses always under doctor supervision?', a: 'Yes. During the care period, nurses follow the care plan and coordinate with the supervising doctor regarding the patient’s progress.' },
                    { q: 'Can a nurse support a patient for 24 hours?', a: 'Yes. 24-hour support is provided when it fits the patient’s needs and the doctor’s recommendation. Nurse scheduling is coordinated by the Dokter Panggil team.' },
                    { q: 'Can we choose a male or female nurse?', a: 'Preferences can be shared with our team and will be matched to nurse availability.' },
                    { q: 'Can nurses perform medical procedures at home?', a: 'Nurses can perform nursing procedures according to their competence, patient needs, and the medical instructions or care plan in place.' },
                    { q: 'What if the patient’s condition changes during care?', a: 'The nurse monitors and coordinates with the doctor if changes need evaluation or care adjustments.' },
                    { q: 'How much does Homecare Nursing cost?', a: 'Fees depend on patient needs, care duration, and services required. A cost estimate is shared before care begins.' },
                    { q: 'Can a patient be cared for by more than one specialist?', a: 'Yes. If the condition needs several specialties, specialists can coordinate care together as medically needed. The Dokter Panggil team helps coordinate doctors and visit schedules.' }
                ],
                ctaTitle: 'Does Your Family Need Nursing Support at Home?',
                ctaBody: 'Discuss the patient’s condition with the Dokter Panggil team. A doctor will help assess care needs and determine the right support.',
                ctaBook: 'Discuss Patient Needs',
                ctaAskChat: 'Chat WhatsApp'
            }
        },

        'tes-laboratorium': {
            h1: '24-Hour Laboratory at Home',
            lead: 'Lab testing with sample collection at home through Dokter Panggil partner laboratories. Testing needs can be discussed via online doctor consultation or a doctor home visit.',
            chips: [
                '24-Hour Service',
                'Sample Collection at Home',
                'Connected to a Doctor'
            ],
            ctaBook: 'Book Lab Test',
            ctaAsk: 'Consult with a Doctor',
            lab: {
                introTitle: 'Laboratory Testing from Home',
                introLead: 'No Need to Visit the Lab',
                introP1: 'Dokter Panggil helps coordinate the patient’s laboratory testing needs directly from home.',
                introP2: 'A doctor can assess via online consultation or a home visit to determine which tests are needed for the patient’s condition.',
                introP3: 'After tests are chosen, sample collection is coordinated with a partner laboratory and done at the patient’s location.',
                introP4: 'From doctor consultation and sample collection through result review, everything can be coordinated from home.',
                pathTitle: 'Choose Online Consultation or a Home Doctor Visit',
                pathLead: 'Patients can choose online consultation or a doctor home visit based on condition and needs.',
                onlineTitle: 'Online Doctor Consultation',
                onlineP1: 'Patients share symptoms and health information online. The doctor assesses and recommends laboratory tests when needed.',
                onlineP2: 'The Dokter Panggil team then coordinates sample collection at home.',
                homeTitle: 'Doctor Comes to Your Home',
                homeP1: 'The doctor visits for history-taking and a physical exam. When needed, the doctor selects laboratory tests that fit the patient’s condition.',
                homeP2: 'The team then coordinates sample collection at home.',
                onlineFlow: ['Online Consultation', 'Test Recommendation', 'Home Sample Collection', 'Lab Results'],
                homeFlow: ['Doctor Visit', 'Patient Exam', 'Test Recommendation', 'Home Sample Collection', 'Lab Results'],
                examTitle: 'Laboratory Test Options',
                examLead: 'A Range of Lab Tests from Home',
                examCats: [
                    { title: 'Routine Blood Work', desc: 'Complete blood count • Hemoglobin • Leukocytes • Platelets • and more' },
                    { title: 'Blood Sugar & Diabetes', desc: 'Blood glucose • HbA1c • and related tests' },
                    { title: 'Liver & Kidney Function', desc: 'SGOT • SGPT • Urea • Creatinine • and more' },
                    { title: 'Cholesterol & Blood Lipids', desc: 'Total cholesterol • LDL • HDL • Triglycerides' },
                    { title: 'Electrolytes & Metabolic', desc: 'Sodium • Potassium • Chloride • and related tests' },
                    { title: 'Infection & Special Tests', desc: 'Specific tests based on patient condition and the doctor’s recommendation.' }
                ],
                sampleTitle: 'Various Sample Types',
                sampleLead: 'Not Only Blood Tests',
                sampleP1: 'Depending on the tests needed, laboratory testing may use sample types such as:',
                sampleTypes: ['Blood', 'Urine', 'Stool', 'Sputum'],
                sampleP2: 'Sample type, collection method, and patient preparation are matched to the tests being done.',
                howTitle: 'How Does It Work?',
                howLead: 'From Consultation to Lab Results',
                howSteps: [
                    { title: 'Doctor Consultation', desc: 'The patient’s condition is assessed via online consultation or a doctor home visit.' },
                    { title: 'Test Recommendation', desc: 'The doctor selects the laboratory tests needed based on the patient’s condition.' },
                    { title: 'Test Confirmation', desc: 'The Dokter Panggil team shares the test types, fees, preparation needed, and sample-collection plan.' },
                    { title: 'Home Sample Collection', desc: 'Partner laboratory staff come to the patient to collect samples for the confirmed tests.' },
                    { title: 'Laboratory Processing', desc: 'Samples are processed by the laboratory according to the tests ordered.' },
                    { title: 'Lab Results', desc: 'Results are available based on the estimated turnaround for each test type.' },
                    { title: 'Doctor Review', desc: 'Results can be reviewed with a doctor to help interpret findings and decide next steps.' }
                ],
                prepTitle: 'Preparation Before Testing',
                prepLead: 'Is Fasting Required?',
                prepBullets: [
                    'Not every laboratory test requires fasting or special preparation.',
                    'If specific preparation is needed, the team will inform you before sample collection.',
                    'Patients should share information about medicines or supplements they take and any relevant health conditions.',
                    'Do not stop routine medicines before testing unless a doctor advises it.'
                ],
                resultsTitle: 'When Are Lab Results Ready?',
                resultsLead: 'Turnaround Depends on the Test',
                resultsP1: 'Result turnaround can differ by test. Some results are available sooner, while others need longer processing.',
                resultsP2: 'An estimated result time is shared based on the test type and partner laboratory.',
                audienceTitle: 'Home Laboratory for Many Needs',
                audience: [
                    { title: 'Children & Adults', desc: 'Laboratory testing matched to health condition and needs.' },
                    { title: 'Older Adults', desc: 'Makes testing easier without traveling to a laboratory.' },
                    { title: 'Homecare Patients', desc: 'Supports monitoring and evaluation during care at home.' },
                    { title: 'Medical Check Up', desc: 'Laboratory tests as part of a broader health evaluation.' }
                ],
                whyTitle: 'Why Laboratory Testing through Dokter Panggil?',
                whyItems: [
                    { title: 'Tests Matched to Needs', desc: 'A doctor helps choose tests based on the patient’s condition.' },
                    { title: 'Sample Collection at Home', desc: 'Patients do not need to visit the lab for tests that can be done from home.' },
                    { title: 'Connected to a Doctor', desc: 'Results can continue with doctor review when needed.' },
                    { title: 'Integrated with Homecare', desc: 'If further care is needed, services can be coordinated with other medical care.' }
                ],
                faqTitle: 'FAQ',
                faqs: [
                    { q: 'Can every laboratory test be done from home?', a: 'Not every test can be done via home sample collection. Availability depends on the test type, sample required, and partner laboratory services.' },
                    { q: 'Do laboratory tests always require fasting?', a: 'Not every test requires fasting. The team will inform you if special preparation is needed before sample collection.' },
                    { q: 'Can laboratory testing be done for children?', a: 'Yes, based on the tests needed and service availability.' },
                    { q: 'Can several family members be tested at once?', a: 'Yes. Share how many patients and which tests are needed so the team can coordinate the service.' }
                ],
                ctaTitle: 'Need Laboratory Testing from Home?',
                ctaBody: 'Tell the Dokter Panggil team about the patient’s condition or the tests needed. A doctor can help choose suitable tests, and the team will coordinate sample collection at home.',
                ctaBook: 'Book Lab Test',
                ctaAskChat: 'Consult with a Doctor'
            }
        },

        
        'vaksinasi': {
            h1: 'Vaccination at Home',
            lead: 'Vaccination at home for children and adults, with a health exam before vaccination and monitoring after the vaccine is given.',
            chips: [
                'Exam Before Vaccination',
                'Vaccination by a Doctor',
                'Children & Adults'
            ],
            ctaBook: 'Book Vaccination',
            ctaAsk: 'Ask via WhatsApp',
            vax: {
                bookingNote: 'Vaccination requires booking first to confirm vaccine availability and prepare the service.',
                catTitle: 'Vaccination Options',
                catLead: 'Vaccines for a range of needs.',
                modalUi: {
                    examplesTitle: 'Vaccines often discussed',
                    pointsTitle: 'What to know',
                    book: 'Book Now',
                    ask: 'Chat WhatsApp',
                    close: 'Close',
                    temp: 'Temporary copy — full schedule & list coming soon.',
                    downloadPdf: 'Download Schedule PDF'
                },
                categories: [
                    {
                        title: 'Child Vaccination Matched to Age & Immunization History',
                        cardTitle: 'Child Vaccination',
                        desc: 'Vaccination for babies and children based on age, immunization schedule, and prior vaccination history.',
                        cta: 'View Child Vaccines',
                        badge: 'Babies & Children',
                        lead: 'Complete your child’s immunization needs based on age and prior vaccination history, from infancy through school age. Child vaccination is provided at home — immunization history and the child’s health are reviewed to help determine suitable vaccines.',
                        examplesTitle: 'Child vaccination schedule',
                        examples: [],
                        pointsTitle: 'What to know',
                        points: [
                            'Use the age tabs to see vaccines that may be recommended on the immunization schedule.',
                            'Prepare the immunization book or vaccination notes if available.',
                            'Final recommendations follow the doctor’s assessment, immunization history, and vaccine availability.'
                        ],
                        note: 'This schedule is a guide. Final recommendations follow the doctor’s assessment, immunization history, and vaccine availability.',
                        bookLabel: 'Book Now'
                    },
                    {
                        title: 'Adult Vaccination',
                        desc: 'Vaccination for adults based on age, vaccination history, health condition, occupation, and certain risk factors.',
                        cta: 'View Adult Vaccines',
                        badge: 'Adults',
                        lead: 'Adult vaccination may be considered based on age, vaccine history, health, occupation, or risk factors — including boosters that may have been missed.',
                        examplesTitle: 'Adult vaccination schedule',
                        examples: [],
                        pointsTitle: 'What to know',
                        points: [
                            'Select a vaccination group to see vaccines that may be considered.',
                            'Share vaccine history, allergies, and current medicines when booking.',
                            'The doctor examines health before the vaccine is given.'
                        ],
                        note: 'This schedule is a guide. Final recommendations follow the doctor’s assessment, vaccination history, and vaccine availability.',
                        bookLabel: 'Book Now'
                    },
                    {
                        title: 'Travel Vaccination',
                        desc: 'Vaccination for domestic or international travel, including vaccines recommended or required for certain destinations.',
                        cta: 'View Travel Vaccines',
                        badge: 'Travel',
                        lead: 'Travel vaccination helps prepare protection based on destination, length of stay, and activities — for domestic or international trips.',
                        examplesTitle: 'Travel vaccination schedule',
                        examples: [],
                        pointsTitle: 'What to know',
                        points: [
                            'Select the travel need to see vaccines that may be considered.',
                            'Ideally book well before departure so dose schedules can be planned.',
                            'Travel vaccine certificates can be discussed when a destination requires them.'
                        ],
                        note: 'This schedule is a guide. Destination requirements and vaccine availability are confirmed when booking.',
                        bookLabel: 'Book Now'
                    },
                    {
                        title: 'Elderly Vaccination',
                        desc: 'Vaccination that may be considered later in life to help protect against certain diseases whose risk can rise with age.',
                        cta: 'View Elderly Vaccines',
                        badge: 'Older Adults',
                        lead: 'Later in life, some vaccines may be considered to help protect against diseases whose risk often rises with age.',
                        examplesTitle: 'Elderly vaccination schedule',
                        examples: [],
                        pointsTitle: 'What to know',
                        points: [
                            'Select the age group to see vaccines that may be considered.',
                            'A doctor exam still happens before the vaccine is given at home.',
                            'Elderly vaccination can be combined with other family members in one visit.'
                        ],
                        note: 'This schedule is a guide. Final recommendations follow the doctor’s assessment, medical history, and current medicines.',
                        bookLabel: 'Book Now'
                    }
                ],
                helpTitle: 'Not Sure Which Vaccine You Need?',
                helpLead: 'We help determine vaccination needs.',
                helpTips: [
                    { title: 'It’s Fine If You’re Not Sure Yet', desc: 'It is fine if the patient or family does not yet know which vaccine or next dose is needed.' },
                    { title: 'Share Details When Booking', desc: 'When booking, share age, vaccination history, and the purpose or need for vaccination with the Dokter Panggil team.' },
                    { title: 'Prepare Immunization Records', desc: 'If available, prepare the immunization book, certificate, or prior vaccination notes to help evaluate the patient’s history.' }
                ],
                howTitle: 'How Does Home Vaccination Work?',
                howSteps: [
                    { title: 'Book Vaccination', desc: 'Contact Dokter Panggil and share vaccination needs, patient details, and vaccine type if already known.' },
                    { title: 'Confirm Vaccine, Schedule & Deposit', desc: 'The team confirms vaccine type and availability, service schedule, and the doctor visit plan. After confirmation, a service deposit is requested as part of booking.' },
                    { title: 'Vaccine Preparation', desc: 'After booking and deposit are confirmed, the team prepares the vaccine and medical supplies needed for the visit.' },
                    { title: 'Doctor Arrives for Exam', desc: 'The doctor comes to the home and examines the patient’s health before vaccination to decide whether the vaccine can be given that visit.' },
                    { title: 'Vaccination by the Doctor', desc: 'If the exam finds the patient is fit to receive the vaccine, it is given directly by the doctor.' }
                ],
                checkTitle: 'Already Booked? The Condition Is Still Checked First',
                checkLead: 'Booking prepares the vaccine — the doctor still assesses the patient before it is given.',
                checkPoints: [
                    { title: 'Exam Still Happens', desc: 'Even if the vaccine has been ordered and prepared, the doctor still examines the patient before it is given.' },
                    { title: 'Condition at the Visit', desc: 'The exam confirms the patient’s condition at the visit and whether vaccination can proceed then.' },
                    { title: 'May Be Delayed If Needed', desc: 'If the doctor finds vaccination should be delayed for a certain condition, recommendations are given accordingly.' }
                ],
                checkP4: 'Booking ensures service preparation and vaccine availability — it does not mean the vaccine is given automatically without a doctor exam.',
                storageTitle: 'Vaccine Preparation & Storage',
                storageP1: 'Vaccination requires booking so the Dokter Panggil team can confirm vaccine availability and prepare the service before the doctor arrives.',
                storagePoints: [
                    { title: 'Prepared After Booking', desc: 'After booking is confirmed, vaccines are prepared by type and quantity needed.' },
                    { title: 'Storage & Cold Chain', desc: 'Vaccines are stored and transported according to temperature and storage requirements until they are given.' }
                ],
                familyTitle: 'Vaccinate Several Family Members in One Visit',
                familyP1: 'Vaccination can be scheduled for several family members at one location.',
                familyP2: 'When booking, share the number of patients, ages, and each vaccine need so the team can prepare vaccines and supplies before the doctor visit.',
                familyCta: 'Book Now',
                whyTitle: 'Why Vaccination with Dokter Panggil?',
                whyItems: [
                    { title: 'Vaccination by a Doctor', desc: 'Exam and vaccine delivery are done directly by a doctor at home.' },
                    { title: 'Exam Before Vaccination', desc: 'The patient’s health is checked before the vaccine is given.' },
                    { title: 'Vaccine Prepared Before the Visit', desc: 'Vaccine availability and service needs are confirmed through booking.' },
                    { title: 'Observation After Vaccination', desc: 'The patient is monitored and the doctor provides guidance after vaccination.' }
                ],
                faqTitle: 'FAQ',
                faqs: [
                    { q: 'Can someone be vaccinated while having a cough or cold?', a: 'Whether vaccination can proceed depends on the patient’s condition at the time. Mild symptoms do not always mean vaccination must be delayed. The doctor assesses before deciding.' },
                    { q: 'Can vaccination still be given with a fever?', a: 'It depends on the patient’s condition. Fever or mild symptoms do not always require delaying vaccination. For moderate to severe acute illness, the doctor may recommend delaying until the patient improves.' },
                    { q: 'Can more than one vaccine be given at the same time?', a: 'In certain cases, several vaccines can be given in one visit. The doctor considers vaccine types, age, vaccination history, and health condition before giving them.' },
                    { q: 'What should be prepared before the doctor arrives?', a: 'If available, prepare the immunization book or prior vaccination notes, a list of current medicines, and information about allergies or previous vaccine reactions.' },
                    { q: 'Can someone bathe and resume normal activities after vaccination?', a: 'In general, patients can bathe and do daily activities after vaccination if they feel well enough. The doctor gives extra guidance if anything special needs attention.' },
                    { q: 'Can several family members be vaccinated together?', a: 'Yes. Several family members can be vaccinated in one visit with prior booking. Share the number of patients and each vaccine need so supplies can be prepared.' }
                ],
                ctaTitle: 'Vaccination Directly at Your Home',
                ctaBody: 'Book vaccination for children or adults. A doctor comes to the home, examines health first, and gives the vaccine if the patient is fit for vaccination.',
                ctaBook: 'Book Vaccination',
                ctaAskChat: 'Ask via WhatsApp'
            }
        },

        'perawatan-lansia': {
            h1: 'More Complete Care, Directly at Home',
            lead: 'Medical care at home for patients who need ongoing monitoring and treatment, with doctors, nurses, medicine, tests, and other medical needs coordinated according to the patient’s condition.',
            chips: [
                'Based on Doctor Assessment',
                'Monitored by Medical Team',
                'Coordinated Care at Home'
            ],
            ctaBook: 'Discuss Patient Condition',
            ctaAsk: 'Chat WhatsApp',
            ri: {
                whenTitle: 'When Can a Patient Be Cared for at Home?',
                whenLead: 'Home inpatient care may be considered for patients who need ongoing treatment and monitoring, when a doctor assesses that care at home is appropriate.',
                whenCards: [
                    { title: 'After Hospital Discharge', desc: 'For patients who still need treatment, monitoring, or further therapy during recovery at home.' },
                    { title: 'Needs Ongoing Care', desc: 'For certain conditions that need therapy and monitoring over several days or according to the doctor’s plan.' },
                    { title: 'Limited Mobility', desc: 'For patients who need medical care but have difficulty traveling to a healthcare facility.' },
                    { title: 'Needs Continuous Monitoring', desc: 'For patients who need condition monitoring and nursing support on a regular or continuous basis according to the care plan and doctor’s recommendation.' }
                ],
                includesTitle: 'What Is Included in Care?',
                includesHeadline: 'Care Matched to Each Patient’s Condition',
                includesLead: 'Not every patient receives the same components. The medical team builds the care plan based on the patient’s condition and the doctor’s orders.',
                includes: [
                    { title: 'Doctor', desc: 'Assesses the patient, sets the care plan, and evaluates how the condition progresses.' },
                    { title: 'Homecare Nursing', desc: 'Supports the patient, monitors progress, carries out the care plan, and coordinates with the doctor.' },
                    { title: 'Medicine & Therapy', desc: 'Medicines and therapy are given according to the prescription and medical instructions.' },
                    { title: 'Laboratory Tests', desc: 'Sample collection can be done at home when needed to monitor the patient’s condition.' },
                    { title: 'Medical Procedures', desc: 'Infusion, nebulizer, wound care, catheter, suction, or other procedures can be done based on need and medical indication.' },
                    { title: 'Medical Equipment', desc: 'Equipment to support monitoring and care can be prepared according to the patient’s condition.' }
                ],
                coordHeadline: 'One Patient, One Coordinated Care Plan',
                coordBody: 'Doctors, nurses, and support services work within the same care plan. Patient progress is monitored and can be shared with the doctor to decide next care needs.',
                flowSteps: [
                    { title: 'Doctor', desc: 'Assessment and care plan.' },
                    { title: 'Care Plan', desc: 'Built around the patient’s condition.' },
                    { title: 'Nurse + Monitoring', desc: 'Home support according to the plan.' },
                    { title: 'Medicine · Lab · Procedures · Equipment', desc: 'Coordinated as needed.' },
                    { title: 'Doctor Evaluation', desc: 'Progress is reviewed again.' },
                    { title: 'Continue / Adjust / Refer', desc: 'Decision based on the patient’s condition.' }
                ],
                startTitle: 'How Does Home Inpatient Care Begin?',
                startHeadline: 'It Starts with a Doctor Assessment',
                startSteps: [
                    { title: 'Patient Condition Exam', desc: 'The doctor examines the patient to understand the condition and medical needs.' },
                    { title: 'Home Care Suitability Assessment', desc: 'The doctor decides whether care can safely continue at home or needs a healthcare facility.' },
                    { title: 'Confirm Service & Cost', desc: 'The care plan and cost estimate are shared with the patient or family before care begins.' },
                    { title: 'Recommended Care Plan', desc: 'The doctor recommends nursing, medicine, procedures, tests, equipment, and monitoring needs.' },
                    { title: 'Care Begins at Home', desc: 'The medical team carries out the care plan, monitors the patient, and coordinates with the attending doctor.' }
                ],
                monitorTitle: 'Monitoring During Care',
                monitorHeadline: 'The Patient’s Condition Is Monitored Throughout Care',
                monitorBody: 'Nurses monitor according to the care plan and communicate progress to the doctor. When needed, the doctor can reassess and adjust the care plan based on how the patient progresses.',
                worseTitle: 'What If the Patient’s Condition Worsens?',
                worseHeadline: 'Patient Safety Remains the Priority',
                worseBody: 'The patient’s condition is evaluated throughout care. If changes require exams, procedures, or facilities that cannot be provided at home, the doctor will recommend further care at a healthcare facility.',
                whyTitle: 'Why Home Inpatient Care with Dokter Panggil?',
                whyItems: [
                    { title: 'Care Based on Doctor Assessment', desc: 'The care plan is built around the patient’s condition and medical needs.' },
                    { title: 'Coordinated Medical Team', desc: 'Doctors, nurses, and support services work within one care plan.' },
                    { title: 'Ongoing Monitoring', desc: 'Patient progress is monitored during care and can be reassessed by the doctor.' },
                    { title: 'Medical Services at Home', desc: 'Medicine, lab tests, procedures, and other medical needs can be coordinated at home as needed.' }
                ],
                faqTitle: 'FAQ',
                faqs: [
                    { q: 'What patient conditions can be treated at home?', a: 'Home inpatient care may be considered for patients who need ongoing treatment, therapy, and monitoring, when a doctor’s exam finds that home care is still appropriate. Each patient’s needs are assessed before care begins.' },
                    { q: 'Can every patient receive home inpatient care?', a: 'No. A doctor examines and assesses the patient first to decide whether care can be provided safely at home. If the patient needs exams, monitoring, procedures, or facilities not available at home, the doctor will recommend care at a healthcare facility.' },
                    { q: 'Will the patient have a nurse for 24 hours?', a: 'Nursing support follows the patient’s condition and care needs based on the doctor’s recommendation. If 24-hour support is needed, the Dokter Panggil team arranges nurse schedules and handovers accordingly.' },
                    { q: 'Who is the attending doctor during home care?', a: 'Every patient is under doctor supervision while receiving care at home. The doctor visits daily to evaluate progress, set and adjust the care plan, and coordinate with the supporting nurse. If a specialist is needed, the Dokter Panggil team can help coordinate specialist consultation and shared care.' },
                    { q: 'Can medicine, lab tests, and medical equipment be provided at home?', a: 'Yes, according to the patient’s needs and care plan. The Dokter Panggil team provides medicine and medical supplies, coordinates home lab testing, and prepares available medical equipment when needed. Patient monitors and syringe pumps are currently available based on need and doctor recommendation.' },
                    { q: 'How much does home inpatient care cost?', a: 'Fees depend on each patient’s condition and needs. Cost components may include doctor services, nursing support, medicine and supplies, procedures, lab tests, medical equipment use, and other care needs. After care needs are set, the Dokter Panggil team shares a cost estimate before care begins.' },
                    { q: 'What if the patient’s condition worsens during care?', a: 'During care, nurses monitor the patient and can coordinate progress with the supervising doctor. If the condition changes, the doctor reassesses and decides next steps. If exams, procedures, or facilities that cannot be provided at home are needed, the doctor will recommend further care at a healthcare facility.' }
                ],
                ctaTitle: 'Can the Patient Be Cared for at Home?',
                ctaBody: 'Discuss the patient’s condition with the Dokter Panggil team. A doctor will assess whether care can be done at home and what medical needs should be prepared.',
                ctaBook: 'Discuss Patient Condition',
                ctaAskChat: 'Chat WhatsApp'
            }
        },

        'perawatan-luka': {
            h1: 'Wound Care',
            lead: 'Wound care at home by a doctor or nurse, with wound assessment and a care plan based on the doctor’s recommendation.',
            chips: [
                'Care Based on Doctor Recommendation',
                'Doctor or Nurse to Your Home',
                'Wound Progress Monitoring'
            ],
            ctaBook: 'Book Wound Care',
            ctaAsk: 'Discuss Wound Condition',
            pl: {
                aboutTitle: 'What Is Wound Care?',
                aboutHeadline: 'Care Matched to the Wound Condition',
                aboutP1: 'Wound care cleans, treats, and protects the wound while monitoring progress during healing.',
                aboutP2: 'Every wound may need different handling. The wound is assessed to decide care method, dressing type, visit frequency, and any other therapy needed.',
                typesTitle: 'Wound Types That Can Be Treated at Home',
                typesLead: 'Care for a range of wound conditions.',
                woundTypes: [
                    { title: 'Post-Surgery Wound', desc: 'Care, dressing changes, and suture removal after surgery based on the patient’s condition and care instructions.' },
                    { title: 'Diabetic Wound', desc: 'Wound care for patients with diabetes who need periodic monitoring and treatment.' },
                    { title: 'Pressure Sore / Decubitus', desc: 'Care for wounds from prolonged pressure, often in patients with limited mobility or bed rest.' },
                    { title: 'Chronic Wound', desc: 'Care for wounds that need a longer healing time and periodic monitoring.' },
                    { title: 'Injury Wound', desc: 'Care for certain injury-related wounds after the patient’s condition is assessed by medical staff.' },
                    { title: 'Other Wounds', desc: 'Other wound conditions can be discussed first with the Dokter Panggil team to determine the right service.' }
                ],
                pathTitle: 'Choose Care by a Doctor or a Nurse',
                pathHeadline: 'Choose the Service That Fits Patient Needs',
                pathLead: 'Patients can book Wound Care with a doctor or Wound Care with a nurse. In both options, the wound is examined and the care plan stays under the doctor’s recommendation.',
                nurseTitle: 'Wound Care with a Nurse',
                nurseP1: 'A nurse comes to the home for an initial check of the wound and related patient condition.',
                nurseP2: 'Findings are shared with the doctor and the patient has an online consultation. The doctor assesses the patient and provides the wound care recommendation and plan.',
                nurseP3: 'After the doctor’s recommendation, the nurse provides wound care according to the plan.',
                nurseFlow: ['Booking', 'Nurse Arrives', 'Wound Exam', 'Online Doctor Consult', 'Care Recommendation', 'Wound Care'],
                doctorTitle: 'Wound Care with a Doctor',
                doctorP1: 'A doctor comes to the home to examine the wound and evaluate health factors that may affect healing.',
                doctorP2: 'Based on the exam, the doctor sets the care plan and therapy. Wound care can be done during that visit.',
                doctorP3: 'If periodic care is needed, the doctor can set a follow-up plan that a nurse can continue.',
                doctorFlow: ['Booking', 'Doctor Arrives', 'Wound & Patient Exam', 'Recommendation', 'Wound Care', 'Follow-up Plan'],
                monitorTitle: 'Care & Monitoring of Wound Progress',
                monitorP1: 'Some wounds are not finished in one visit and need periodic home visits.',
                monitorP2: 'The doctor sets the care plan based on the patient’s condition. A nurse can then provide periodic care at home according to that plan.',
                monitorP3: 'At each visit, wound progress is monitored. If changes or unexpected progress appear, the nurse coordinates again with the doctor for further evaluation.',
                monitorFlow: ['Doctor Plan', 'Periodic Care', 'Wound Monitoring', 'Progress Evaluation', 'Doctor Coordination If Needed'],
                whyTitle: 'Why Wound Care with Dokter Panggil?',
                whyItems: [
                    { title: 'Doctor or Nurse to Your Home', desc: 'Patients can choose the service that fits their condition and care needs.' },
                    { title: 'Integrated with the Doctor', desc: 'Nurse-led wound care still goes through doctor consultation and a doctor care plan.' },
                    { title: 'Care Matched to the Wound', desc: 'Care methods and dressings are matched to the wound’s character and progress.' },
                    { title: 'Periodic Monitoring', desc: 'Care can be done periodically with wound progress monitored from visit to visit.' }
                ],
                faqTitle: 'FAQ',
                faqs: [
                    { q: 'Is wound care at home painful?', a: 'Discomfort can vary by wound type, location, and condition. Medical staff provide care with the patient’s condition in mind. If pain is significant or needs extra handling, it can be discussed with the doctor.' },
                    { q: 'Can surgical stitches be removed at home?', a: 'In certain cases, stitch removal can be done at home after the wound is assessed and the timing is appropriate. Medical staff check the wound first before the procedure.' },
                    { q: 'Does the family need to prepare wound care supplies?', a: 'Usually not, unless informed beforehand. The Dokter Panggil team can prepare basic care needs based on initial patient information. If special needs appear after the exam, staff will inform the patient or family.' },
                    { q: 'Can wound progress be documented at each visit?', a: 'For periodic wound care, wound progress is documented as needed to track changes over time and support the next care evaluation.' },
                    { q: 'Does wound care have to be done every day?', a: 'Not always. Frequency depends on wound type, condition, dressing type, and progress. The schedule is matched to patient needs.' },
                    { q: 'Are dressings and care supplies provided?', a: 'Wound care supplies are prepared based on the patient’s condition and care plan. Extra needs and costs are shared with the patient or family.' }
                ],
                ctaTitle: 'Need Wound Care at Home?',
                ctaBody: 'Wound care can be done at home by a doctor or nurse, with a care plan based on the doctor’s recommendation and periodic monitoring of wound progress.',
                ctaBook: 'Book Wound Care',
                ctaAskChat: 'Discuss Wound Condition'
            }
        },

        'pemeriksaan-kesehatan': {
            h1: 'Medical Check Up at Home',
            lead: 'A health check at home with a GP or specialist, plus laboratory and supporting tests based on the chosen package.',
            chips: [
                'Exam by a Doctor',
                'GP & Specialists',
                'Supporting Tests at Home'
            ],
            ctaBook: 'View MCU Packages',
            ctaAsk: 'Ask About Packages',
            mcu: {
                introTitle: 'Medical Check Up Directly at Home',
                introLead: 'More Than Just Laboratory Testing',
                introP1: 'Dokter Panggil Medical Check Up starts with a doctor home visit for a medical interview and health assessment.',
                introP2: 'The visit is completed with laboratory and supporting tests based on the chosen package.',
                introP3: 'Results can be reviewed with the doctor to help understand health status and decide next steps when needed.',
                introP4: 'The doctor comes. Testing is done from home. Results are reviewed medically.',
                doctorTitle: 'Choose a Doctor for Medical Check Up',
                doctorLead: 'Choose an Exam with a GP or a Specialist',
                gpTitle: 'General Practitioner',
                gpDesc: 'A health check at home with a GP for general and periodic health evaluation.',
                gpPrice: 'From Rp1,000,000*',
                gpCta: 'Choose GP',
                spTitle: 'Internal Medicine Specialist',
                spDesc: 'A health check at home with a specialist for a deeper health evaluation.',
                spPrice: 'From Rp1,230,000*',
                spCta: 'Choose Specialist',
                priceNoteShort: '*Package prices do not include transportation.',
                pkgTitle: 'Medical Check Up Packages',
                pkgLead: 'Choose the panel that fits your needs.',
                packages: [
                    {
                        name: 'PANEL FIT',
                        prices: [
                            { label: 'General Practitioner', value: 'Rp1,000,000*' },
                            { label: 'Internal Medicine Specialist', value: 'Rp1,230,000*' }
                        ],
                        items: ['Home Visit & Doctor Exam', 'Uric Acid', 'Fasting Blood Glucose', 'Total Cholesterol', 'LDL Cholesterol', 'Triglycerides'],
                        cta: 'Choose Panel FIT'
                    },
                    {
                        name: 'PANEL PRIMA',
                        badge: 'More Complete Testing',
                        prices: [
                            { label: 'General Practitioner', value: 'Rp1,350,000*' },
                            { label: 'Internal Medicine Specialist', value: 'Rp1,600,000*' }
                        ],
                        items: ['Home Visit & Doctor Exam', 'Complete Blood Count', 'HbA1c', 'Uric Acid', 'Total Cholesterol', 'LDL Cholesterol', 'Triglycerides'],
                        cta: 'Choose Panel PRIMA'
                    },
                    {
                        name: 'PANEL JANTUNG SEHAT',
                        badge: 'Includes ECG',
                        prices: [
                            { label: 'General Practitioner', value: 'Rp1,750,000*' },
                            { label: 'Cardiologist', value: 'Rp1,990,000*' }
                        ],
                        items: ['Home Visit & Doctor Exam', 'ECG', 'Complete Blood Count', 'HbA1c', 'Uric Acid', 'Total Cholesterol', 'LDL Cholesterol', 'Triglycerides'],
                        cta: 'Choose Heart Health Panel'
                    },
                    {
                        name: 'PANEL HEALTHY LIFE',
                        badge: 'Most Complete Testing',
                        prices: [
                            { label: 'General Practitioner', value: 'Rp2,090,000*' },
                            { label: 'Internal Medicine Specialist', value: 'Rp2,350,000*' }
                        ],
                        items: [
                            'Home Visit & Doctor Exam', 'ECG', 'Complete Hematology', 'Fasting Blood Glucose',
                            'Total Cholesterol', 'HDL Cholesterol', 'LDL Cholesterol', 'Triglycerides',
                            'SGOT (AST)', 'SGPT (ALT)', 'Creatinine', 'Routine Urinalysis', 'Uric Acid'
                        ],
                        cta: 'Choose Healthy Life Panel'
                    }
                ],
                priceNote: '*Package prices do not include transportation. Transport fees are shared based on exam location before booking is confirmed.',
                unsureTitle: 'Not Sure Which Package Fits?',
                unsureBody: 'Tell the Dokter Panggil team about your health-check needs. The team will help explain available Medical Check Up package options.',
                unsureCta: 'Ask About Packages',
                howTitle: 'How Does a Home Medical Check Up Work?',
                howLead: 'From Booking to Result Review',
                howSteps: [
                    { title: 'Choose Doctor & MCU Package', desc: 'Choose an exam with a GP or specialist, then select the MCU package you want.' },
                    { title: 'Confirm Schedule & Fees', desc: 'The team confirms the exam schedule, patient location, transport fee, and total service cost before booking is confirmed.' },
                    { title: 'MCU Preparation', desc: 'The team shares preparation steps before the exam, including fasting when required by the package.' },
                    { title: 'Doctor Comes Home', desc: 'The doctor visits for a medical interview and health assessment.' },
                    { title: 'Supporting Tests', desc: 'Laboratory and supporting tests such as ECG are done based on the chosen package.' },
                    { title: 'Test Results', desc: 'Lab and supporting-test results are available based on each test’s processing time.' },
                    { title: 'Result Review', desc: 'Results can be reviewed with the doctor to help understand health status and decide follow-up when needed.' }
                ],
                prepTitle: 'Preparation Before Medical Check Up',
                prepLead: 'What Should You Prepare?',
                prepBullets: [
                    'Some Medical Check Up packages include fasting blood glucose, so preparation may be required before the exam.',
                    'The Dokter Panggil team will share preparation details for the chosen package before the visit.',
                    'Patients should also prepare information about current medicines and supplements, medical history, allergies, and prior health-check results if available.',
                    'Do not stop routine medicines before the exam unless a doctor advises it.'
                ],
                hoursTitle: '24-Hour Medical Check Up',
                hoursLead: 'Home Medical Check Up on Your Schedule',
                hoursP1: 'The Dokter Panggil team can be contacted 24 hours to help with home Medical Check Up needs.',
                hoursP2: 'Exam schedules are confirmed based on doctor choice, MCU package, patient location, and service availability.',
                whyTitle: 'Why MCU with Dokter Panggil?',
                whyItems: [
                    { title: 'Doctor Comes Home', desc: 'No need to visit a clinic or hospital to start the exam.' },
                    { title: 'Choose Your Doctor', desc: 'Choose an exam with a GP or a specialist.' },
                    { title: 'Complete Test Packages', desc: 'Choose FIT, PRIMA, Heart Health, or Healthy Life based on testing needs.' },
                    { title: 'Integrated Medical Services', desc: 'If follow-up is needed, patients can connect with other Dokter Panggil medical services.' }
                ],
                faqTitle: 'FAQ',
                faqs: [
                    { q: 'Can Medical Check Up be done without a doctor visit?', a: 'No. Every Dokter Panggil Medical Check Up package includes a doctor home visit and in-person exam.' },
                    { q: 'What is the difference between GP and specialist MCU?', a: 'The test components in each package are the same. The difference is who performs the exam and review — a GP or an Internal Medicine specialist.' },
                    { q: 'Do package prices include transportation?', a: 'Not yet. Package prices do not include transportation. The transport fee is shared based on exam location before booking is confirmed.' },
                    { q: 'Do I need to fast before Medical Check Up?', a: 'It depends on the package or tests included. The team will share required preparation before the visit.' },
                    { q: 'Is ECG available in every package?', a: 'No. ECG is included in the Heart Health Panel and Healthy Life Panel.' },
                    { q: 'Can MCU results be discussed with a doctor?', a: 'Yes. Results are reviewed with the doctor to help interpret findings and decide follow-up when needed.' }
                ],
                ctaTitle: 'Medical Check Up Without Leaving Home',
                ctaBody: 'Choose a doctor and Medical Check Up package that fits your needs. The doctor comes to your home for the exam, with laboratory and supporting tests based on the chosen package.',
                ctaBook: 'Book Medical Check Up',
                ctaAskChat: 'View MCU Packages'
            }
        },
        'kunjungan-dokter-spesialis': {
            h1: 'Specialist Doctor at Home',
            lead: 'Get an examination and consultation with a specialist suited to the patient’s needs without going to the hospital. The Dokter Panggil team helps coordinate the doctor’s home-visit schedule.',
            chips: [
                'Multiple Specialists',
                'Home Visit',
                'Schedule Coordinated for You'
            ],
            ctaBook: 'Find a Specialist',
            ctaAsk: 'Discuss Your Needs',
            d2: {
                findTitle: 'Find a Specialist',
                findLead: 'Search by name, specialty, or medical condition.',
                findCta: 'Browse Specialists',
                whenTitle: 'When Should You Call a Specialist to Your Home?',
                whenCards: [
                    { title: 'Need a More Specific Examination', desc: 'When the patient’s condition needs further assessment by a specialist in the relevant field.' },
                    { title: 'Need Follow-up Control or Evaluation', desc: 'For patients who need condition monitoring, treatment evaluation, or further consultation after a previous exam or care.' },
                    { title: 'Patient Finds Travel Difficult or Uncomfortable', desc: 'Suitable for older adults, patients with limited mobility, those recovering, or other situations that make travel to a facility harder.' },
                    { title: 'Need Ongoing Care at Home', desc: 'A specialist can evaluate the patient and recommend next care that can be coordinated with the homecare team as needed.' }
                ],
                doubtTitle: 'Not sure which specialist is right?',
                doubtBody: 'Tell the Dokter Panggil team about the patient’s condition or needs. We will help direct you to the right specialist.',
                doubtCta: 'Find a Specialist',
                flowTitle: 'How Does a Specialist Visit Work?',
                flowSteps: [
                    { title: 'Share the Patient’s Needs', desc: 'Tell us the patient’s condition or which specialist is needed.' },
                    { title: 'Choose a Specialist', desc: 'The team helps find a doctor that fits the patient’s needs.' },
                    { title: 'Schedule the Visit', desc: 'Visit time is coordinated in advance with the specialist.' },
                    { title: 'Doctor Comes Home', desc: 'After the schedule is confirmed, the specialist examines and consults at home.' }
                ],
                getTitle: 'What Do You Get During the Visit?',
                getItems: [
                    { title: 'Medical Consultation', desc: 'Evaluation of symptoms and health history.' },
                    { title: 'In-Person Examination', desc: 'Exam based on the specialty field and patient condition.' },
                    { title: 'Care Plan', desc: 'The doctor recommends therapy and next steps.' },
                    { title: 'Follow-up Coordination', desc: 'Lab tests, medicine, nursing, or other services can be arranged based on the doctor’s recommendations.' }
                ],
                followTitle: 'Care Does Not Stop After the Consultation',
                followLead: 'The Dokter Panggil team can help coordinate follow-up care based on the specialist’s recommendations.',
                followUps: [
                    { title: 'Medicine & Pharmacy', desc: 'Helps with medicine needs according to the doctor’s prescription or advice.' },
                    { title: 'Laboratory Tests', desc: 'Sample collection can be done directly at home.' },
                    { title: 'Medical Procedures', desc: 'Infusion, nebulizer, wound care, catheter placement, and other procedures as indicated.' },
                    { title: 'Homecare Nursing to Home Inpatient Care', desc: 'Companionship and monitoring for ongoing care needs.' }
                ],
                howTitle: 'How to Call a Doctor',
                howSteps: [
                    { title: 'Contact Us 24 Hours', desc: 'WhatsApp or call the Dokter Panggil Call Centre.' },
                    { title: 'Share the Patient’s Condition', desc: 'Share symptoms, the patient’s ID card details, and the visit location.' },
                    { title: 'Confirm Service & Cost', desc: 'The team will explain the service and estimated cost before the visit.' },
                    { title: 'The Doctor Contacts You', desc: 'After confirmation, the assigned doctor will contact you for preparation and the visit.' }
                ],
                whyTitle: 'Why Choose a Specialist with Dokter Panggil?',
                whyItems: [
                    { title: 'Doctor Matched to Your Needs', desc: 'Find specialists by field of expertise or patient condition.' },
                    { title: 'Comfortable Consultation at Home', desc: 'Patients do not need to travel or wait at a healthcare facility.' },
                    { title: 'Coordinated Scheduling', desc: 'The team helps coordinate the visit schedule with the specialist.' },
                    { title: 'Integrated Follow-up Care', desc: 'Needs after the consultation can be coordinated through Dokter Panggil services.' }
                ],
                faqTitle: 'FAQ',
                faqs: [
                    { q: 'Can I choose the specialist I want?', a: 'Yes. You can choose a specialist by field or by preferred doctor. The Dokter Panggil team will contact the doctor and coordinate visit availability.' },
                    { q: 'How long does it take to get a specialist appointment?', a: 'Visit timing depends on specialist availability. After receiving your request, our team coordinates with the doctor and promptly shares available visit times with the patient or family.' },
                    { q: 'How much does a specialist home visit cost?', a: 'A specialist visit is Rp450,000 per visit, plus doctor transport of Rp10,000/km from Dokter Panggil’s location. Outside working hours, an extra 50% of the visit fee applies. Fees exclude extras if needed, such as medicine, disposable medical supplies, procedures, lab tests, nursing fees and transport, and admin.' },
                    { q: 'Can a specialist do routine follow-up at home?', a: 'Yes. When appropriate, follow-up consultation and control can be done at home based on patient needs. The next visit schedule is coordinated again by the Dokter Panggil team.' },
                    { q: 'What if after the specialist exam the patient needs medicine, lab tests, or further care?', a: 'The Dokter Panggil team can help coordinate follow-up needs based on the doctor’s recommendations, such as medicine, lab tests, procedures, physiotherapy, or nursing support at home.' }
                ],
                ctaTitle: 'Need a Specialist at Home?',
                ctaBody: 'Tell us the patient’s condition or which specialist you need. The Dokter Panggil team will help find a doctor and coordinate the visit schedule.',
                ctaBook: 'Call a Specialist',
                ctaFind: 'Find a Doctor'
            }
        },
        'konsultasi-online': {
            h1: 'Doctor Consultation, From Anywhere',
            lead: 'Consult a GP or specialist without visiting a healthcare facility. Choose Chat/Phone or Video Call based on your needs.',
            chips: [
                'GP & Specialists',
                'Chat, Phone & Video Call',
                'No Need to Leave Home'
            ],
            ctaBook: 'Start Consultation',
            ctaAsk: 'Chat WhatsApp',
            ko: {
                introTitle: 'Doctor Consultation From Anywhere',
                introLead: 'Easier Access to a Doctor’s Opinion',
                introP1: 'Online consultation lets patients discuss symptoms, health conditions, test results, or other medical needs with a doctor without an in-person visit.',
                introP2: 'The doctor assesses based on information shared during the consultation and gives recommendations matched to the patient’s condition.',
                introP3: 'In some cases, the doctor may recommend an in-person exam when the condition cannot be assessed adequately online.',
                sessionNote: 'The consultation session starts after doctor selection, consultation method, schedule confirmation, and payment are confirmed.',
                doctorTitle: 'Choose Your Doctor',
                doctorLead: 'Consult a GP or a Specialist',
                gpTitle: 'General Practitioner',
                gpP1: 'Discuss a wide range of symptoms and health conditions with a GP online.',
                gpP2: 'The doctor explores symptoms, health history, and other information needed to help assess the patient’s condition.',
                gpCta: 'Choose GP',
                spTitle: 'Specialist Doctor',
                spP1: 'Online consultation with a specialist when the condition needs evaluation in a specific specialty field.',
                spP2: 'Patients can choose a specialist based on needs and schedule availability.',
                spFieldsLead: 'You can choose directly by field:',
                specialties: [
                    'Internal Medicine', 'Neurology', 'Cardiology', 'Pediatrics', 'Clinical Nutrition',
                    'Psychiatry', 'ENT', 'Ophthalmology', 'Lactation Counselor', 'Pulmonology'
                ],
                spCta: 'Choose Specialist',
                methodTitle: 'Choose How to Consult',
                methodLead: 'Chat/Phone or Video Call',
                methodSub: 'Choose the consultation method that feels most comfortable for your needs.',
                chatTitle: 'Chat / Phone',
                chatP1: 'Consult a doctor by chat or phone to discuss the patient’s condition and health needs.',
                chatP2: 'Suitable for: symptoms that can be explained in conversation, discussing test results, therapy questions, or follow-up on certain conditions.',
                chatPrice: 'From Rp60,000',
                chatCta: 'Choose Chat / Phone',
                videoTitle: 'Video Call',
                videoP1: 'Consult live by video with a doctor so communication can be visual and more interactive.',
                videoPrice: 'From Rp100,000',
                videoCta: 'Choose Video Call',
                tariffTitle: 'Online Consultation Fees',
                tariffLead: 'Consultation Options',
                tariffChatLabel: 'Chat / Phone',
                tariffVideoLabel: 'Video Call',
                tariffRows: [
                    { role: 'General Practitioner', chat: 'Rp60,000', video: 'Rp100,000' },
                    { role: 'Specialist Doctor', chat: 'Rp125,000', video: 'Rp200,000' }
                ],
                paymentNote: 'Payment is made before the consultation session starts.',
                howTitle: 'How Does Online Consultation Work?',
                howLead: 'Consultation in a Few Steps',
                howSteps: [
                    { title: 'Choose a Doctor', desc: 'Choose a GP or specialist consultation based on your needs.' },
                    { title: 'Choose Consultation Method', desc: 'Choose Chat/Phone or Video Call.' },
                    { title: 'Confirm Doctor, Schedule & Fee', desc: 'The team confirms the chosen doctor, schedule availability, consultation method, and service fee.' },
                    { title: 'Make Payment', desc: 'The patient pays for the confirmed service.' },
                    { title: 'Consultation Starts', desc: 'After payment is confirmed, the patient is connected with the doctor to start the session using the chosen method.' },
                    { title: 'Doctor Recommendation', desc: 'The doctor explains and recommends next steps based on the consultation and patient condition.' }
                ],
                topicsTitle: 'What Can Be Discussed?',
                topicsLead: 'Consult on a Range of Health Needs',
                topics: [
                    { title: 'Health Concerns', desc: 'Discuss current symptoms or concerns with a doctor.' },
                    { title: 'Test Results', desc: 'Discuss laboratory or health-check results you already have.' },
                    { title: 'Treatment & Therapy', desc: 'Discuss medicine use, therapy progress, or follow-up needs based on the doctor’s assessment.' },
                    { title: 'Second Opinion', desc: 'Discuss a condition or test results for an additional medical assessment.' },
                    { title: 'Condition Follow-up', desc: 'Continue evaluating a condition after a previous consultation or care.' }
                ],
                prepTitle: 'Prepare Before Consultation',
                prepLead: 'For a More Effective Session',
                prepP1: 'Before the session starts, patients should prepare information about the main concern, when it started, medical history, current medicines and supplements, drug allergies, and prior test results if available.',
                prepP2: 'For Video Call, patients should be in a place with adequate lighting and internet connection.',
                followTitle: 'If the Doctor Needs an In-Person Exam',
                followLead: 'Need Further Examination?',
                followP1: 'Not every condition can be assessed or managed through online consultation alone.',
                followP2: 'If the doctor judges that the patient needs a physical exam, laboratory testing, a medical procedure, or further evaluation, the doctor can recommend a suitable service.',
                followP3: 'When needed, the Dokter Panggil team can help coordinate a doctor home visit, laboratory testing, medicine, or other homecare services.',
                followP4: 'From online consultation through in-home care, patient needs can be coordinated in one service.',
                followLinks: [
                    { title: 'Doctor Visit', desc: 'In-person exam at home when needed.' },
                    { title: 'Laboratory', desc: 'Sample collection and testing from home.' },
                    { title: 'Pharmacy', desc: 'Medicine prepared and delivered home.' }
                ],
                rxTitle: 'What About Prescriptions & Medicine?',
                rxLead: 'If the Doctor Prescribes Medicine',
                rxP1: 'If the doctor issues a prescription or recommends medicine after consultation, patients can continue medicine needs through Dokter Panggil pharmacy service.',
                rxP2: 'Medicine can be prepared and delivered to the patient’s home based on availability and service terms.',
                rxFlow: 'Online Consultation → Prescription → Pharmacy → Medicine Delivered Home.',
                rxCta: 'View Pharmacy Service',
                whyTitle: 'Why Online Consultation through Dokter Panggil?',
                whyItems: [
                    { title: 'GP & Specialists', desc: 'Choose a doctor based on consultation needs.' },
                    { title: 'Choose How to Consult', desc: 'Chat/Phone or Video Call available.' },
                    { title: 'Connected to Homecare', desc: 'If an in-person exam is needed, care can continue with a home visit.' },
                    { title: 'Medicine Can Be Delivered', desc: 'Medicine needs from a doctor’s prescription can be coordinated for home delivery.' }
                ],
                faqTitle: 'FAQ',
                faqs: [
                    { q: 'What is the difference between Chat/Phone and Video Call?', a: 'Chat/Phone allows written or voice consultation, while Video Call lets patient and doctor communicate visually during the session. Fees differ by method.' },
                    { q: 'Do I need to pay before consultation?', a: 'Yes. After doctor, method, schedule, and fee are confirmed, payment is made before the consultation session starts.' },
                    { q: 'Can I choose a specialist?', a: 'Yes. Specialist options and consultation schedules are matched to patient needs and doctor availability.' },
                    { q: 'Can a doctor issue a prescription after online consultation?', a: 'A doctor may issue a prescription when the consultation indicates medicine therapy is appropriate for the patient’s condition.' },
                    { q: 'What if the doctor asks for an in-person exam?', a: 'When needed, patients can continue with a doctor home visit or other tests based on the doctor’s recommendation.' }
                ],
                ctaTitle: 'Need a Doctor Consultation Without Leaving Home?',
                ctaBody: 'Choose a GP or specialist and the consultation method that feels most comfortable for you.',
                ctaBook: 'GP Consultation',
                ctaAskChat: 'Specialist Consultation'
            }
        },
        'tindakan-medis': {
            h1: 'Medical Procedures, Directly at Your Home',
            lead: 'Various medical and nursing procedures can be done at home by a doctor or nurse, based on the doctor’s recommendation and the patient’s condition and needs.',
            chips: [
                'Based on Doctor Recommendation',
                'Professional Doctors & Nurses',
                'Procedures at Home'
            ],
            ctaBook: 'Choose a Procedure',
            ctaAsk: 'Discuss Your Needs',
            d4: {
                pickTitle: 'Choose the Medical Procedure You Need',
                pickLead: 'Find the medical procedure that fits the patient’s needs. Every procedure is based on a doctor’s recommendation after assessing the patient’s condition.',
                procedures: [
                    { title: 'Infusion Therapy', desc: 'IV fluids and therapy based on indication and the doctor’s recommendation.', cta: 'View details →' },
                    { title: 'Vitamin Infusion', desc: 'Vitamin infusion based on condition assessment and the doctor’s recommendation.', cta: 'View details →' },
                    { title: 'Oxygen Therapy', desc: 'Oxygen therapy based on the patient’s condition and medical needs.', cta: 'View details →' },
                    { title: 'Nebulizer Therapy', desc: 'Nebulizer therapy based on indication and the doctor’s recommendation.', cta: 'View details →' },
                    { title: 'Wound Care', desc: 'Wound care and dressing changes matched to the wound type, condition, and care needs.', cta: 'View details →' },
                    { title: 'Home Vaccination', desc: 'Vaccination at home based on vaccine type and patient condition.', cta: 'View details →' },
                    { title: 'Feeding Tube (NGT)', desc: 'Feeding tube placement or change based on need and medical recommendation.', cta: 'View details →' },
                    { title: 'Urinary Catheter', desc: 'Urinary catheter placement or change based on indication and the doctor’s recommendation.', cta: 'View details →' },
                    { title: 'Suction', desc: 'Helps clear secretions or phlegm based on the patient’s condition and medical needs.', cta: 'View details →' }
                ],
                assessTitle: 'Every Procedure Starts with a Doctor Assessment',
                assessLead: 'To ensure the procedure fits the patient’s condition and needs, every medical procedure is based on a doctor’s recommendation. Assessment can be done via online consultation or a doctor home visit, depending on the patient’s condition.',
                assessSteps: [
                    { title: 'Patient Condition', desc: 'Share symptoms or the procedure needed.' },
                    { title: 'Doctor Assessment', desc: 'Online consult or home visit.' },
                    { title: 'Procedure Recommendation', desc: 'The doctor chooses the right procedure.' },
                    { title: 'Staff & Supplies Prep', desc: 'Doctor/nurse, medicine, tools, and supplies are prepared.' },
                    { title: 'Procedure at Home', desc: 'Done based on the recommendation and patient condition.' }
                ],
                whoTitle: 'Who Performs the Procedure?',
                whoHeadline: 'Done by a Doctor or Nurse',
                whoBody: 'Medical procedures can be done by a doctor or nurse depending on the procedure type, staff competence, and patient condition. Every procedure follows the doctor’s recommendation and medical plan.',
                whoNurse: 'For nurse-led procedures: the nurse carries out the procedure according to the doctor’s recommendation and medical plan, and monitors the patient as needed.',
                howTitle: 'How Are Medical Procedures Done?',
                howHeadline: 'From Assessment to Care at Home',
                howSteps: [
                    { title: 'Share the Patient’s Condition', desc: 'Tell Dokter Panggil admin about symptoms, condition, or the procedure needed.' },
                    { title: 'Doctor Assessment', desc: 'The doctor can assess via online consultation or an in-person home exam based on the patient’s condition.' },
                    { title: 'Procedure Recommendation', desc: 'The doctor determines which procedure fits the patient’s condition.' },
                    { title: 'Procedure Preparation', desc: 'The team prepares the doctor or nurse, medicine, tools, and medical supplies needed.' },
                    { title: 'Procedure Done at Home', desc: 'The procedure is done based on the doctor’s recommendation and patient condition, with monitoring as needed.' }
                ],
                doubtTitle: 'Not Sure Which Procedure Is Needed?',
                doubtLead: 'You do not need to choose the medical procedure yourself.',
                doubtBody: 'Tell the Dokter Panggil team about the patient’s symptoms and condition. A doctor will assess and decide the right procedure.',
                doubtCta: 'Discuss Patient Condition',
                whyTitle: 'Why Medical Procedures with Dokter Panggil?',
                whyItems: [
                    { title: 'Based on Doctor Assessment', desc: 'Every procedure follows the doctor’s assessment and recommendation for the patient’s condition.' },
                    { title: 'Staff Matched to Competence', desc: 'Procedures are done by a doctor or nurse matched to the procedure type and professional competence.' },
                    { title: 'Needs Prepared Before the Visit', desc: 'Medicine, tools, and supplies are prepared based on the recommended procedure before staff arrive.' },
                    { title: 'Connected to Other Medical Services', desc: 'When needed, doctor visits, lab tests, medicine, homecare nursing, or further care can be coordinated.' }
                ],
                faqTitle: 'FAQ',
                faqs: [
                    { q: 'Can a medical procedure be booked without a doctor exam?', a: 'No. Every medical procedure at Dokter Panggil requires a doctor’s recommendation. Assessment can be done via online consultation or a doctor home visit based on the patient’s condition.' },
                    { q: 'Do I always need to call a doctor to the home before a procedure?', a: 'Not always. When appropriate, an initial assessment can be done via online consultation. The doctor decides whether the procedure can proceed from that consult or whether an in-person exam is needed first.' },
                    { q: 'Who performs medical procedures at home?', a: 'Procedures can be done by a doctor or nurse, depending on the procedure type, staff competence, patient condition, and the medical plan set by the doctor.' },
                    { q: 'Are medicine, tools, and medical supplies provided?', a: 'Yes. The Dokter Panggil team prepares the medicine, tools, and supplies needed for the procedure recommended by the doctor.' },
                    { q: 'How much does a home medical procedure cost?', a: 'Fees depend on the procedure type, medicine and supplies used, the healthcare professional performing it, and the patient’s location. A cost estimate is shared before the service is confirmed.' },
                    { q: 'What if after the exam the procedure cannot be done at home?', a: 'The doctor will explain the patient’s condition and recommend appropriate next steps. If exams, procedures, or facilities not available at home are needed, the doctor will suggest further care at a healthcare facility.' }
                ],
                ctaTitle: 'Need a Medical Procedure at Home?',
                ctaBody: 'Tell the Dokter Panggil team about the patient’s condition and needs. A doctor will assess and decide the right procedure before care is provided at home.',
                ctaBook: 'Discuss Patient Condition',
                ctaAskChat: 'Chat WhatsApp'
            }
        },
        'terapi-nebulizer': {
            h1: 'Nebulizer Therapy at Home',
            lead: 'Nebulizer therapy at home to deliver medicine through the airways, based on the doctor’s assessment and recommendation for the patient’s condition.',
            chips: [
                'Based on Doctor Recommendation',
                'Medicine Matched to Patient Needs',
                'Doctor or Nurse to Your Home'
            ],
            ctaBook: 'Discuss Patient Condition',
            ctaAsk: 'Contact Dokter Panggil',
            d8: {
                aboutTitle: 'Breathing Therapy Using a Nebulizer',
                aboutP1: 'A nebulizer turns liquid medicine into a fine aerosol or mist so it can be inhaled through a mask or mouthpiece into the airways.',
                aboutP2: 'Nebulizer therapy can be used for certain breathing conditions when a doctor’s exam indicates medicine should be given by nebulizer.',
                aboutP3: 'Medicine type, dose, and nebulizer frequency are based on the doctor’s recommendation and the patient’s condition.',
                whenTitle: 'When Can a Doctor Recommend a Nebulizer?',
                whenLead: 'The doctor considers therapy based on symptoms, exam findings, medical history, and the patient’s breathing condition.',
                whenCards: [
                    { title: 'Wheezing or Certain Breath Sounds', desc: 'When the exam shows an airway problem that may need medicine through a nebulizer.' },
                    { title: 'Airway Narrowing', desc: 'When the doctor finds medicine is needed to help address airway narrowing.' },
                    { title: 'Certain Breathing Conditions', desc: 'A nebulizer can be part of therapy for certain breathing diseases or disorders based on the doctor’s exam.' },
                    { title: 'Continuing Recommended Therapy', desc: 'For patients who already have a nebulizer therapy plan and still need medicine according to the doctor’s recommendation.' }
                ],
                medTitle: 'Nebulizer Medicine Is Determined by the Doctor',
                medBody: 'Before therapy is given, the doctor assesses the patient to decide whether a nebulizer is needed and to set medicine type, dose, combination, and frequency based on patient needs.',
                howTitle: 'How Nebulizer Therapy Works at Home',
                howSteps: [
                    { title: 'Condition Triage', desc: 'The patient’s breathing condition and symptoms are assessed first through triage based on service needs.' },
                    { title: 'Medicine & Nebulizer Prep', desc: 'Medicine and nebulizer devices are prepared according to the doctor’s therapy plan to bring to the patient.' },
                    { title: 'Therapy Determination', desc: 'The doctor decides nebulizer needs and which medicine to give based on the patient’s condition.' },
                    { title: 'Nebulizer Delivery', desc: 'The patient inhales the medicine aerosol through a mask or mouthpiece during therapy.' },
                    { title: 'Monitoring & Evaluation', desc: 'The patient’s condition and response to therapy are monitored and evaluated as needed.' }
                ],
                whoTitle: 'Who Performs the Nebulizer?',
                whoHeadline: 'A Doctor or Nurse Comes to Your Home',
                whoBody: 'Nebulizer therapy can be given by a doctor or nurse based on service needs.',
                whoNurse: 'If done by a nurse, medicine delivery still follows the doctor’s recommendation and therapy plan.',
                monitorTitle: 'Monitoring After Nebulizer Therapy',
                monitorHeadline: 'Patient Response Is Evaluated After Therapy',
                monitorLead: 'After the nebulizer is given, medical staff may evaluate:',
                monitorItems: [
                    { title: 'Breathing Symptoms', desc: 'Assesses changes in symptoms after therapy.' },
                    { title: 'Breathing Rate & Pattern', desc: 'Monitors the patient’s breathing condition as needed.' },
                    { title: 'Oxygen Saturation (SpO₂)', desc: 'Can be checked before and after therapy based on the patient’s condition.' },
                    { title: 'Response to Medicine', desc: 'Monitors effectiveness and possible reactions after medicine is given.' }
                ],
                whyTitle: 'Why Nebulizer Therapy with Dokter Panggil?',
                whyItems: [
                    { title: 'Based on Doctor Assessment', desc: 'Nebulizer needs are based on the patient’s condition and the doctor’s recommendation.' },
                    { title: 'Medicine Matched to Patient Needs', desc: 'Medicine type and dose are based on the patient’s medical needs.' },
                    { title: 'Professional Doctors & Nurses', desc: 'Therapy is done by healthcare professionals matched to competence and the therapy plan.' },
                    { title: 'Monitoring After Therapy', desc: 'Patient response can be evaluated after nebulizer delivery based on the patient’s condition.' }
                ],
                faqTitle: 'FAQ',
                faqs: [
                    { q: 'Do cough or cold symptoms need a nebulizer?', a: 'Not always. Nebulizer needs depend on the cause of symptoms and airway condition. A doctor assesses first.' },
                    { q: 'Is a nebulizer only steam?', a: 'No. A nebulizer turns liquid medicine into a fine aerosol or mist that can be inhaled into the airways.' },
                    { q: 'Can nebulizer medicine be chosen freely?', a: 'No. Medicine type, dose, and combination are based on the doctor’s recommendation.' },
                    { q: 'Who performs nebulizer therapy at home?', a: 'Therapy can be done by a doctor or nurse based on service needs and the doctor’s therapy plan.' },
                    { q: 'Can children get nebulizer therapy at home?', a: 'Yes, when a doctor’s assessment finds nebulizer therapy is needed. Medicine type and dose are matched to the patient’s condition.' },
                    { q: 'How long does nebulizer therapy take?', a: 'Duration can vary by device, medicine, and therapy given. Medical staff follow the doctor’s plan.' },
                    { q: 'What if shortness of breath does not improve after nebulizer therapy?', a: 'The patient’s condition needs to be reassessed. If further care is needed, the doctor may recommend treatment at a healthcare facility.' }
                ],
                ctaTitle: 'Need Nebulizer Therapy at Home?',
                ctaBody: 'Tell the Dokter Panggil team about the patient’s symptoms and condition. A doctor will assess whether a nebulizer is needed and which therapy fits.',
                ctaBook: 'Discuss Patient Condition',
                ctaAskChat: 'Contact Dokter Panggil'
            }
        },

        'pemasangan-ngt': {
            h1: 'Feeding Tube Placement',
            lead: 'Nasogastric tube (NGT) placement at home by a doctor or nurse, based on the doctor’s assessment and recommendation for the patient’s condition and needs.',
            chips: [
                'Based on Doctor Recommendation',
                'Doctor or Nurse to Your Home',
                'Exam Before Procedure'
            ],
            ctaBook: 'Book NGT Placement',
            ctaAsk: 'Discuss Patient Condition',
            ngt: {
                aboutTitle: 'What Is a Feeding Tube / Nasogastric Tube?',
                aboutHeadline: 'Helps Deliver Nutrition and Medicine in Certain Conditions',
                aboutP1: 'A nasogastric tube (NGT), or feeding tube, is a flexible tube inserted through the nose into the stomach.',
                aboutP2: 'In certain conditions, an NGT can help deliver nutrition, fluids, or medicine when the patient cannot meet needs adequately by mouth.',
                aboutP3: 'NGT placement must be based on patient assessment and a doctor’s recommendation.',
                whenTitle: 'When Can a Doctor Recommend an NGT?',
                whenItems: [
                    { title: 'Difficulty Swallowing', desc: 'In certain conditions that impair swallowing so oral intake is insufficient or unsuitable as usual.' },
                    { title: 'Inadequate Nutrition Intake', desc: 'When the patient cannot meet nutrition needs through eating and drinking by mouth.' },
                    { title: 'Reduced Consciousness or Certain Neurological Conditions', desc: 'For certain patients with impaired eating or swallowing ability who have been assessed by a doctor.' },
                    { title: 'Continuing NGT Use', desc: 'For patients who previously used an NGT and need replacement or reinsertion based on the care plan.' }
                ],
                pathTitle: 'Choose Doctor or Nurse Service',
                doctorTitle: 'NGT Placement by a Doctor',
                doctorP1: 'A doctor comes to the home to examine the patient and decide whether NGT placement is appropriate.',
                doctorP2: 'If the exam shows placement can be done at home, the doctor performs the procedure and gives guidance on NGT use and care.',
                nurseTitle: 'NGT Placement by a Nurse',
                nurseP1: 'A nurse comes to the home for an initial exam. Findings are shared with a doctor, and the patient has an online doctor consultation.',
                nurseP2: 'If the doctor recommends NGT placement, the nurse performs the procedure according to the doctor’s plan.',
                doctorFlow: ['Booking', 'Doctor Arrives', 'Patient Exam', 'Recommendation', 'NGT Placement', 'Evaluation & Education'],
                nurseFlow: ['Booking', 'Nurse Arrives', 'Initial Exam', 'Online Doctor Consult', 'Recommendation', 'NGT Placement', 'Evaluation & Education'],
                howTitle: 'How Is NGT Placement Done?',
                howSteps: [
                    { title: 'Patient Condition Exam', desc: 'Medical staff examine the patient and confirm the placement plan fits the condition.' },
                    { title: 'Patient & Equipment Prep', desc: 'Equipment and procedure needs are prepared before placement.' },
                    { title: 'NGT Placement', desc: 'The tube is inserted through the nose into the stomach using the appropriate technique.' },
                    { title: 'Confirm Tube Position', desc: 'After placement, NGT position is checked and confirmed before use for nutrition or medicine.' },
                    { title: 'Tube Fixation', desc: 'Once position is correct, the tube is secured to help keep it in place.' },
                    { title: 'Patient & Family Education', desc: 'The family receives guidance on use, care, and what to watch for while the NGT is in place.' }
                ],
                typesTitle: 'New Placement or Feeding Tube Replacement',
                typeItems: [
                    { title: 'New NGT Placement', desc: 'For patients who, based on doctor assessment, need an NGT.' },
                    { title: 'NGT Replacement', desc: 'For patients already using an NGT who need replacement per the care plan.' },
                    { title: 'Reinsertion', desc: 'If the NGT comes out or needs reinsertion, the patient’s condition and placement needs are assessed first.' }
                ],
                whyTitle: 'Why NGT Placement with Dokter Panggil?',
                whyItems: [
                    { title: 'Based on Doctor Assessment', desc: 'NGT needs are determined by the patient’s condition and needs.' },
                    { title: 'Doctor or Nurse to Your Home', desc: 'Patients can choose doctor or nurse service based on care needs.' },
                    { title: 'Nurse Stays Connected to the Doctor', desc: 'If a nurse performs the procedure, the initial exam is followed by an online doctor consult before the procedure.' },
                    { title: 'NGT Use Education', desc: 'Patients and families get guidance on use and what to watch after placement.' }
                ],
                faqTitle: 'FAQ',
                faqs: [
                    { q: 'Does NGT placement hurt?', a: 'Placement can cause discomfort in the nose and throat. Medical staff help position the patient and follow procedure to support placement.' },
                    { q: 'How long can an NGT be used before it needs changing?', a: 'Duration and replacement needs depend on tube type, tube condition, patient condition, and the care plan. Staff give guidance for the NGT in use.' },
                    { q: 'Can medicine be given through an NGT?', a: 'Some medicines can be given through an NGT, but not all are suitable to crush or deliver by tube. Medicine delivery must follow doctor or healthcare instructions.' },
                    { q: 'What if the NGT comes out at home?', a: 'Do not reinsert the tube yourself unless the patient or family has the competence and specific instructions. Contact medical staff for evaluation and reinsertion if needed.' }
                ],
                ctaTitle: 'Need Feeding Tube Placement or Replacement at Home?',
                ctaBody: 'Tell the Dokter Panggil team about the patient’s condition and NGT needs. A doctor will assess whether placement can be done at home and which action fits.',
                ctaBook: 'Book NGT Placement',
                ctaAskChat: 'Discuss Patient Condition'
            }
        },

        'pemasangan-kateter': {
            h1: 'Urinary Catheter Placement at Home',
            lead: 'Urinary catheter placement and change at home by a doctor or nurse, based on the doctor’s assessment and recommendation for the patient’s condition and needs.',
            chips: [
                'Based on Doctor Recommendation',
                'Doctor or Nurse to Your Home',
                'Exam Before Procedure'
            ],
            ctaBook: 'Book Catheter Placement',
            ctaAsk: 'Discuss Patient Condition',
            kateter: {
                aboutTitle: 'What Is a Urinary Catheter?',
                aboutHeadline: 'Helps Drain Urine from the Bladder',
                aboutP1: 'A urinary catheter is a tube used to help drain urine from the bladder into a collection bag.',
                aboutP2: 'A catheter may be needed in certain medical conditions, either temporarily or for a period based on patient needs.',
                whenTitle: 'When Can a Doctor Recommend a Urinary Catheter?',
                whenItems: [
                    { title: 'Difficulty Passing Urine', desc: 'In certain conditions when the patient cannot empty the bladder well.' },
                    { title: 'Urinary Retention', desc: 'When urine is retained in the bladder and the doctor finds catheter placement is needed to help drain it.' },
                    { title: 'Certain Medical or Care Conditions', desc: 'For certain patients who need a catheter as part of a care plan or medical monitoring.' },
                    { title: 'Continuing Catheter Use', desc: 'For patients who previously used a catheter and need replacement or reinsertion per the care plan.' }
                ],
                pathTitle: 'Choose Doctor or Nurse Service',
                pathLead: 'Urinary catheter placement and change can be done by a doctor or nurse. Before the procedure, the patient’s condition and needs are still assessed by a doctor.',
                doctorTitle: 'Catheter Placement by a Doctor',
                doctorP1: 'A doctor comes to the home to examine the patient and determine the need for catheter placement or change.',
                doctorP2: 'If the exam shows the procedure can be done at home, the doctor places the catheter and educates on aftercare.',
                nurseTitle: 'Catheter Placement by a Nurse',
                nurseP1: 'A nurse comes to the home for an initial exam. Findings are shared with a doctor, and the patient has an online doctor consultation.',
                nurseP2: 'If the doctor recommends catheter placement or change, the nurse performs the procedure according to the doctor’s plan.',
                doctorFlow: ['Booking', 'Doctor Arrives', 'Exam', 'Recommendation', 'Catheter Placement/Change', 'Evaluation & Education'],
                nurseFlow: ['Booking', 'Nurse Arrives', 'Initial Exam', 'Online Doctor Consult', 'Recommendation', 'Catheter Placement/Change', 'Evaluation & Education'],
                howTitle: 'How Is Catheter Placement Done?',
                howLead: 'Catheter Placement Process at Home',
                howSteps: [
                    { title: 'Patient Condition Exam', desc: 'Medical staff examine the patient and confirm the plan matches the doctor’s recommendation.' },
                    { title: 'Patient & Equipment Prep', desc: 'The patient and procedure needs are prepared with attention to hygiene and infection prevention.' },
                    { title: 'Catheter Placement', desc: 'The catheter is inserted through the urinary tract into the bladder using the appropriate technique.' },
                    { title: 'Confirm Urine Flow', desc: 'After placement, staff confirm urine can flow through the catheter properly.' },
                    { title: 'Fixation & Urine Bag', desc: 'The catheter and urine bag are positioned to help maintain urine flow.' },
                    { title: 'Evaluation & Education', desc: 'Staff evaluate the patient after the procedure and educate on catheter use and home care.' }
                ],
                typesTitle: 'New Placement or Catheter Replacement',
                typeItems: [
                    { title: 'New Catheter Placement', desc: 'For patients who, based on doctor assessment, need a urinary catheter.' },
                    { title: 'Catheter Replacement', desc: 'For patients already using a catheter who need replacement based on catheter condition and the care plan.' },
                    { title: 'Reinsertion', desc: 'If the catheter comes out or needs reinsertion, medical staff assess first before the procedure.' }
                ],
                whyTitle: 'Why Catheter Placement with Dokter Panggil?',
                whyItems: [
                    { title: 'Based on Doctor Assessment', desc: 'Catheter placement or change needs are based on the patient’s condition.' },
                    { title: 'Doctor or Nurse to Your Home', desc: 'The procedure can be done by a doctor or nurse based on service needs.' },
                    { title: 'Nurse Stays Connected to the Doctor', desc: 'If a nurse performs the procedure, the initial exam is followed by an online doctor consult before the procedure.' },
                    { title: 'Ongoing Care at Home', desc: 'Patients using a catheter for a period can get replacement help and monitoring per the care plan.' }
                ],
                faqTitle: 'FAQ',
                faqs: [
                    { q: 'Does catheter placement hurt?', a: 'Placement can cause discomfort. Medical staff work carefully and monitor the patient during placement.' },
                    { q: 'Can a catheter be used long term?', a: 'In certain conditions, a catheter may be used for a longer period when medically needed. Use and evaluation follow the patient’s condition.' },
                    { q: 'Can the family empty the urine bag themselves?', a: 'Yes, after education on emptying the bag and keeping hygiene during the process.' },
                    { q: 'What if urine does not flow after catheter placement?', a: 'Do not try to fix or push the catheter deeper yourself. Check whether the tubing is kinked or the bag position blocks flow, then contact medical staff if urine still does not flow or the patient has symptoms.' },
                    { q: 'Must a catheter be changed on a fixed schedule?', a: 'Replacement timing is not the same for every patient. Catheter type, patient condition, catheter function, and the care plan guide when to change it.' }
                ],
                ctaTitle: 'Need Catheter Placement or Replacement at Home?',
                ctaBody: 'Tell the Dokter Panggil team about the patient’s condition and catheter needs. A doctor will assess what is needed and whether placement or change can be done at home.',
                ctaBook: 'Book Catheter Placement',
                ctaAskChat: 'Discuss Patient Condition'
            }
        },

        'suction': {
            h1: 'Suction / Phlegm Clearance at Home',
            lead: 'Suction or phlegm clearance at home by a doctor or nurse to help clear airway secretions in certain conditions, based on the doctor’s assessment and recommendation.',
            chips: [
                'Based on Doctor Recommendation',
                'Doctor or Nurse to Your Home',
                'Patient Condition Monitoring'
            ],
            ctaBook: 'Book Suction Service',
            ctaAsk: 'Discuss Patient Condition',
            suction: {
                aboutTitle: 'What Is Suction / Phlegm Clearance?',
                aboutHeadline: 'Helps Clear Secretions from the Airway',
                aboutP1: 'Suction or phlegm clearance helps remove mucus or secretions from the airway using a medical suction device.',
                aboutP2: 'This procedure may be considered for certain patients with secretion buildup who cannot clear it effectively, based on breathing condition assessment.',
                whenTitle: 'When Can Suction Be Considered?',
                whenItems: [
                    { title: 'Phlegm Hard to Clear', desc: 'For patients who have trouble coughing or cannot clear secretions effectively.' },
                    { title: 'Secretion Buildup in the Airway', desc: 'When the exam shows signs of secretions that need help to be cleared.' },
                    { title: 'Reduced Cough Ability', desc: 'In certain conditions such as reduced consciousness, weakness, or neurological issues that lower the ability to clear the airway.' },
                    { title: 'Patients with a Tracheostomy', desc: 'For certain tracheostomy patients who need suction as part of airway care per the care plan.' },
                    { title: 'Continuing Care at Home', desc: 'For patients who previously received care and still need suction per the doctor’s recommendation.' }
                ],
                pathTitle: 'Choose Doctor or Nurse Service',
                pathLead: 'Suction can be done by a doctor or nurse based on the patient’s condition and needs. Every procedure still follows doctor assessment and recommendation.',
                doctorTitle: 'Suction by a Doctor',
                doctorP1: 'A doctor comes to the home to examine the patient, including breathing condition and procedure needs.',
                doctorP2: 'If the exam shows suction is needed and suitable at home, the doctor can perform it and evaluate the patient’s response afterward.',
                nurseTitle: 'Suction by a Nurse',
                nurseP1: 'A nurse comes to the home for an initial exam. Findings are shared with a doctor, then the patient or family has an online doctor consultation.',
                nurseP2: 'If the doctor recommends suction, the nurse performs it according to the doctor’s plan and monitors the patient.',
                doctorFlow: ['Booking', 'Doctor Arrives', 'Exam', 'Recommendation', 'Suction', 'Evaluation'],
                nurseFlow: ['Booking', 'Nurse Arrives', 'Initial Exam', 'Online Doctor Consult', 'Recommendation', 'Suction', 'Evaluation'],
                howTitle: 'How Is Suction Done?',
                howLead: 'Suction Process at Home',
                howSteps: [
                    { title: 'Patient Condition Exam', desc: 'The patient is assessed first, especially breathing condition and ability to clear secretions.' },
                    { title: 'Patient & Equipment Prep', desc: 'Medical staff prepare the patient and equipment needed for the procedure.' },
                    { title: 'Suction Procedure', desc: 'Secretions are cleared with suction equipment and technique matched to the patient’s condition and airway access.' },
                    { title: 'Monitoring During the Procedure', desc: 'The patient is monitored during suction to assess tolerance and response.' },
                    { title: 'Evaluation After Suction', desc: 'After the procedure, staff reassess breathing condition and patient response.' },
                    { title: 'Family Education', desc: 'The family receives information on the patient’s condition, next care, and warning signs to watch.' }
                ],
                typesTitle: 'Types of Suction Needs',
                typeItems: [
                    { title: 'Oral Secretion Suction', desc: 'Helps clear secretions collected in the mouth for patients who cannot clear them on their own.' },
                    { title: 'Airway Suction', desc: 'Done in certain conditions when airway secretions need to be cleared with medical staff help.' },
                    { title: 'Suction for Tracheostomy Patients', desc: 'For tracheostomy patients who need secretion clearance based on condition and the care plan.' }
                ],
                whyTitle: 'Why Suction with Dokter Panggil?',
                whyItems: [
                    { title: 'Based on Doctor Assessment', desc: 'The procedure is done after a doctor assesses the patient’s condition and needs.' },
                    { title: 'Doctor or Nurse to Your Home', desc: 'The procedure can be done by a doctor or nurse based on service needs.' },
                    { title: 'Nurse Stays Connected to the Doctor', desc: 'If a nurse performs suction, the initial exam is followed by an online doctor consult before the procedure.' },
                    { title: 'Integrated with Other Care', desc: 'When needed, the patient’s condition can be followed up with other medical and homecare services per the doctor’s recommendation.' }
                ],
                faqTitle: 'FAQ',
                faqs: [
                    { q: 'Does every patient with a lot of phlegm need suction?', a: 'No. Some patients can still clear phlegm effectively by coughing. Suction needs depend on patient condition, ability to clear secretions, and doctor assessment.' },
                    { q: 'Does suction hurt?', a: 'Suction can feel uncomfortable and trigger coughing. Medical staff match the procedure to patient needs and monitor response during it.' },
                    { q: 'How many times may suction be done?', a: 'There is no single number for all patients. Frequency follows condition, secretion amount, airway-clearing ability, and the care plan.' },
                    { q: 'Can tracheostomy patients get suction at home?', a: 'In certain conditions, yes. Medical staff assess the patient, tracheostomy, secretions, and care needs before the procedure.' },
                    { q: 'May the family do suction themselves?', a: 'For certain patients who need repeated suction, family or caregivers may need special education and training from healthcare staff. Do not suction independently without understanding technique, equipment, and what to watch in the patient’s condition.' }
                ],
                ctaTitle: 'Is the Patient Having Trouble Clearing Phlegm?',
                ctaBody: 'Tell the Dokter Panggil team about the patient’s condition. A doctor will assess whether suction is needed and whether it is suitable at home.',
                ctaBook: 'Book Suction Service',
                ctaAskChat: 'Discuss Patient Condition'
            }
        },

        'terapi-oksigen': {
            h1: 'Oxygen Therapy at Home',
            lead: 'Oxygen therapy at home based on the doctor’s assessment and recommendation, matched to the patient’s condition and oxygen needs.',
            chips: [
                'Based on Doctor Recommendation',
                'Patient Condition Monitoring',
                'Medical Staff Come to Your Home'
            ],
            ctaBook: 'Discuss Patient Condition',
            ctaAsk: 'Contact Dokter Panggil',
            d7: {
                aboutTitle: 'What Is Oxygen Therapy?',
                aboutHeadline: 'Oxygen Therapy Matched to Patient Needs',
                aboutP1: 'Oxygen therapy provides supplemental oxygen to help meet the body’s oxygen needs in certain patient conditions.',
                aboutP2: 'At Dokter Panggil, oxygen therapy is given based on the doctor’s assessment and recommendation, including needs, delivery method, and monitoring required during therapy.',
                aboutP3: 'Not every shortness of breath needs oxygen therapy. The cause and patient condition must be assessed by a doctor first.',
                whenTitle: 'When Can a Doctor Recommend Oxygen Therapy?',
                whenLead: 'A doctor may consider oxygen therapy when the exam shows a condition that means the patient needs supplemental oxygen.',
                whenCards: [
                    { title: 'Low Blood Oxygen Level', desc: 'When exam findings show an oxygen level that does not match the target set by the doctor.' },
                    { title: 'Certain Breathing Problems', desc: 'For certain breathing conditions that, based on the doctor’s exam, need supplemental oxygen.' },
                    { title: 'During Care or Recovery', desc: 'For certain patients who still need oxygen therapy as part of a home care plan.' },
                    { title: 'Continuing Oxygen Therapy', desc: 'For patients previously recommended oxygen therapy who need to continue it at home according to the doctor’s plan.' }
                ],
                assessTitle: 'Oxygen Therapy Based on Doctor Recommendation',
                assessP1: 'Before therapy is given, the doctor assesses the patient to decide whether oxygen is needed, the therapy target, delivery method, and monitoring needs.',
                assessP2: 'For oxygen therapy, the doctor’s assessment is done at minimum through an in-person home exam based on the patient’s condition.',
                howHeadline: 'Oxygen Therapy at Home',
                howSteps: [
                    { title: 'Patient Condition Assessment via Triage', desc: 'The doctor reviews symptoms, breathing condition, oxygen saturation, and medical needs.' },
                    { title: 'Equipment Preparation', desc: 'The team prepares the oxygen source and delivery devices needed based on the doctor’s recommendation to bring to the location.' },
                    { title: 'Therapy Determination', desc: 'The doctor examines the patient in person and sets oxygen therapy needs and the delivery plan.' },
                    { title: 'Oxygen Therapy Delivery', desc: 'Oxygen is given according to the therapy plan that has been set.' },
                    { title: 'Monitoring & Evaluation', desc: 'The patient’s response to therapy is monitored and coordinated with the doctor when needed.' }
                ],
                monitorTitle: 'The Patient Is Monitored During Therapy',
                monitorLead: 'Monitoring follows the patient’s condition and therapy plan, and may include:',
                monitorItems: [
                    { title: 'Oxygen Saturation (SpO₂)', desc: 'Helps assess the patient’s oxygen level and response to therapy.' },
                    { title: 'Respiratory Rate', desc: 'Helps monitor breathing patterns and changes.' },
                    { title: 'Vital Signs', desc: 'General condition monitoring as needed.' },
                    { title: 'Response to Therapy', desc: 'Assesses how the patient’s condition progresses after oxygen therapy.' }
                ],
                equipTitle: 'Equipment Matched to Therapy Needs',
                equipLead: 'Oxygen therapy equipment is prepared based on the doctor’s recommendation and patient needs.',
                equipment: [
                    { title: 'Pure Oxygen Cylinder' },
                    { title: 'Nasal Cannula' },
                    { title: 'Simple Face Mask' },
                    { title: 'Non-Rebreathing Mask' },
                    { title: 'Pulse Oximeter or Patient Monitor' }
                ],
                whyTitle: 'Why Oxygen Therapy with Dokter Panggil?',
                whyItems: [
                    { title: 'Based on Doctor Assessment', desc: 'Oxygen therapy needs are based on the patient’s condition and assessment findings.' },
                    { title: 'Therapy Matched to Patient Needs', desc: 'Delivery method and therapy plan follow the patient’s medical condition.' },
                    { title: 'Condition Monitoring', desc: 'Oxygen saturation and patient condition can be monitored as needed during therapy.' },
                    { title: 'Connected to the Medical Team', desc: 'When needed, doctors, nurses, lab tests, or further medical services can be coordinated through Dokter Panggil.' }
                ],
                faqTitle: 'FAQ',
                faqs: [
                    { q: 'Can I order oxygen without consulting a doctor?', a: 'Oxygen therapy is given based on a doctor’s recommendation. The doctor assesses and examines the patient first to determine needs and the therapy plan for the patient’s condition.' },
                    { q: 'Do patients with shortness of breath always need oxygen?', a: 'Not always. Shortness of breath can have many causes and not all need oxygen therapy. A doctor assesses to find the cause and the right care.' },
                    { q: 'What oxygen saturation level needs oxygen therapy?', a: 'Therapy needs are not based on one saturation number alone. The doctor considers the reading along with symptoms, medical condition, and the right saturation target for the patient.' },
                    { q: 'Who provides oxygen therapy at home?', a: 'Therapy can be supported by a doctor or nurse based on the patient’s condition and the therapy plan set by the doctor.' },
                    { q: 'Is oxygen equipment provided?', a: 'The equipment needed is prepared according to the therapy plan.' },
                    { q: 'Can oxygen therapy be done long term?', a: 'In certain conditions, oxygen therapy can be part of ongoing care. Needs, duration, and monitoring must follow the doctor’s plan.' },
                    { q: 'What if saturation stays low even after oxygen is given?', a: 'The patient’s condition needs to be reassessed. If exams or facilities not available at home are needed, the doctor will recommend further care at a healthcare facility.' }
                ],
                ctaTitle: 'Need Oxygen Therapy at Home?',
                ctaBody: 'Tell the Dokter Panggil team about the patient’s condition. A doctor will assess to determine oxygen therapy needs and the right service.',
                ctaBook: 'Discuss Patient Condition',
                ctaAskChat: 'Contact Dokter Panggil'
            }
        },
        'terapi-infus': {
            h1: 'Infusion Therapy at Home',
            lead: 'Infusion therapy at home by a doctor or nurse, based on the doctor’s assessment and recommendation according to the patient’s condition and medical needs.',
            chips: [
                'Based on Doctor Recommendation',
                'Professional Doctors & Nurses',
                'Medicine & Supplies Prepared'
            ],
            ctaBook: 'Discuss Patient Condition',
            ctaAsk: 'Chat WhatsApp',
            d5: {
                aboutTitle: 'About Infusion Therapy at Home',
                aboutP1: 'Infusion therapy is the delivery of fluids, medicine, or certain therapies through a vein based on the patient’s medical needs.',
                aboutP2: 'At Dokter Panggil, infusion therapy is done after a doctor assesses the patient and gives a recommendation, to ensure the therapy fits the patient’s condition and can be provided safely at home.',
                whenTitle: 'When Is This Procedure Needed?',
                whenLead: 'A doctor considers infusion therapy based on the exam findings, the patient’s condition, and fluid or therapy needs.',
                whenSub: 'A doctor may consider infusion therapy in these situations:',
                whenCards: [
                    { title: 'Fluid Deficit', desc: 'When the patient lacks fluids and oral intake is not enough to meet the body’s fluid needs.' },
                    { title: 'Difficulty Eating or Drinking', desc: 'For example with nausea, vomiting, or other conditions that make it hard to meet or keep up oral fluid intake.' },
                    { title: 'Needs Medicine Through a Vein', desc: 'When the doctor decides medicine or therapy should be given directly through a vein.' },
                    { title: 'Continuing Recommended Therapy', desc: 'For patients who still need IV therapy as part of a care plan already set by the doctor.' }
                ],
                assessTitle: 'Every Infusion Starts with a Doctor Assessment',
                assessHeadline: 'Infusion Based on Doctor Recommendation',
                assessBody1: 'Before infusion therapy is given, the doctor assesses the patient first to decide whether an infusion is needed and which therapy is appropriate.',
                assessBody2: 'Assessment can be done via online consultation or a doctor home visit, depending on the patient’s condition.',
                assessSteps: [
                    { title: 'Share the Patient’s Condition', desc: 'Tell the Dokter Panggil team about symptoms and condition.' },
                    { title: 'Doctor Assessment', desc: 'Online consult or direct home visit.' },
                    { title: 'Therapy Recommendation', desc: 'The doctor decides if an infusion is needed and which type.' },
                    { title: 'Infusion at Home', desc: 'Provided based on the recommendation and patient condition.' }
                ],
                howTitle: 'How Is Infusion Therapy Done?',
                howHeadline: 'Home Infusion Therapy in 5 Steps',
                howSteps: [
                    { title: 'Patient Condition Assessment', desc: 'The doctor assesses and determines therapy needs based on the patient’s condition.' },
                    { title: 'Therapy Preparation', desc: 'The nurse prepares IV fluids, medicine, tools, and supplies based on the doctor’s recommendation.' },
                    { title: 'IV Access Placement', desc: 'A doctor or nurse places the IV access for the patient.' },
                    { title: 'Therapy Delivery & Monitoring', desc: 'Therapy is given according to the doctor’s plan while the patient is monitored during the infusion.' },
                    { title: 'Evaluation After Therapy', desc: 'After therapy, the patient’s condition is evaluated as needed and the patient or family receives guidance on next care.' }
                ],
                whoTitle: 'Who Performs Infusion Therapy?',
                whoHeadline: 'Done by a Doctor or Nurse',
                whoBody: 'IV placement and therapy can be done by a doctor or nurse according to the care plan, based on the recommendation of the doctor who assessed the patient.',
                whoNurse: 'If done by a nurse, the procedure follows the therapy plan set by the doctor.',
                prepTitle: 'What Is Prepared Before the Visit?',
                prepLead: 'Before medical staff arrive, the doctor does an initial triage to understand the patient’s condition and estimate possible therapy needs. The doctor then coordinates with the nurse so the right medicine, IV fluids, and medical supplies are prepared and brought to the visit.',
                prepLead2: 'Besides supplies prepared from triage, the Dokter Panggil team also brings a standard medical kit to support examination and care at home.',
                prepItems: [
                    { title: 'Initial Triage by the Doctor', desc: 'The doctor reviews symptoms and condition before the visit to help determine which exam and therapy needs to prepare.' },
                    { title: 'Therapy Needs Prepared', desc: 'The doctor coordinates with the nurse to prepare IV fluids, medicine, tools, and supplies that may be needed based on triage.' },
                    { title: 'Standard Medical Kit Always Brought', desc: 'The team brings a standard medical kit to support examination and procedures during the home visit.' }
                ],
                prepNote: 'The therapy given is still determined by the doctor’s assessment and the patient’s condition at the time of care.',
                monitorTitle: 'Monitoring During Therapy',
                monitorHeadline: 'The Patient Is Monitored During the Infusion',
                monitorBody: 'During therapy, the doctor or nurse monitors based on the patient’s condition and the type of therapy given. If there are symptoms or changes, therapy can be reassessed and coordinated with the doctor.',
                whyTitle: 'Why Infusion Therapy with Dokter Panggil?',
                whyItems: [
                    { title: 'Based on Doctor Assessment', desc: 'Infusion is given based on the patient’s condition and medical needs, not only on request.' },
                    { title: 'Therapy Prepared to Match Needs', desc: 'Fluids, medicine, tools, and supplies are prepared according to the doctor’s therapy plan.' },
                    { title: 'Professional Doctors & Nurses', desc: 'Placement and therapy are done by healthcare professionals matched to competence and the care plan.' },
                    { title: 'Connected to Medical Services', desc: 'When needed, doctor exams, lab tests, medicine, or further care can be coordinated through the Dokter Panggil team.' }
                ],
                faqTitle: 'FAQ',
                faqs: [
                    { q: 'Can I request an infusion without consulting a doctor?', a: 'No. Infusion therapy at Dokter Panggil is based on a doctor’s recommendation after assessing the patient. Assessment can be done via online consultation or a doctor home visit depending on the patient’s condition.' },
                    { q: 'Does feeling weak mean I need an infusion?', a: 'Not always. Weakness can have many causes and not all need infusion therapy. A doctor assesses first to find the cause and the right therapy.' },
                    { q: 'Who places the IV at home?', a: 'IV placement can be done by a nurse or doctor according to the care plan and based on the doctor’s recommendation.' },
                    { q: 'Are IV fluids and medicine provided?', a: 'Yes. IV fluids, medicine, tools, and supplies are prepared based on the doctor’s triage before the visit.' },
                    { q: 'How long does infusion therapy take?', a: 'Duration depends on the type and amount of fluid or medicine given, and the patient’s condition. The doctor shares an estimated duration based on the therapy plan.' },
                    { q: 'How much does home infusion therapy cost?', a: 'Fees depend on therapy type, fluids and medicine used, medical supplies, healthcare staff, and patient location. A cost estimate is shared before the service is confirmed.' }
                ],
                ctaTitle: 'Need an Exam or Infusion Therapy at Home?',
                ctaBody: 'Tell the Dokter Panggil team about the patient’s condition. A doctor will assess first to decide whether infusion therapy is needed and appropriate at home.',
                ctaBook: 'Discuss Patient Condition',
                ctaAskChat: 'Chat WhatsApp'
            }
        },
        'infus-vitamin': {
            h1: 'Vitamin Infusion at Home',
            lead: 'Vitamin infusion at home with a choice of doctor or nurse visit, including an exam before therapy and a doctor’s vitamin recommendation based on the patient’s condition and needs.',
            chips: [
                'Exam Before Therapy',
                'Doctor Recommendation',
                'Doctor or Nurse to Your Home'
            ],
            ctaBook: 'Book Vitamin Infusion',
            ctaAsk: 'Ask the Dokter Panggil Team',
            iv: {
                aboutTitle: 'Vitamin Infusion Matched to Your Needs',
                aboutP1: 'Vitamin infusion delivers vitamins through a vein as one form of supplementation.',
                aboutP2: 'Vitamin infusion is provided at home after the patient’s condition is examined first. Based on the exam, the doctor chooses the right vitamin option before therapy is given.',
                aboutP3: 'Patients can choose a doctor or nurse visit. The vitamin given still follows the doctor’s recommendation.',
                vitTitle: 'Vitamin Infusion Options',
                vitLead: 'Each option has different contents and supplementation goals. A doctor helps choose the therapy that fits your condition and needs.',
                vitamins: [
                    {
                        title: 'Vitamin C',
                        content: 'Vitamin C (Ascorbic Acid)',
                        roleTitle: 'Role of Vitamin C',
                        role: 'Vitamin C acts as an antioxidant and supports normal immune function and various metabolic processes.',
                        whenTitle: 'When It May Be Considered',
                        when: 'As vitamin C supplementation when a doctor finds a need for extra vitamin C, including when intake is not enough or during certain recovery periods.'
                    },
                    {
                        title: 'Multivitamin',
                        content: 'B-Complex Vitamins + Vitamin C',
                        roleTitle: 'Role of the Contents',
                        role: 'B-complex vitamins plus vitamin C support energy metabolism, nervous system function, blood cell formation, and help meet vitamin needs.',
                        whenTitle: 'When It May Be Considered',
                        when: 'As supplementation when a doctor finds a need for extra B-complex vitamins and vitamin C, including when daily intake is not enough.'
                    },
                    {
                        title: 'Immunobooster',
                        content: 'A parenteral multivitamin with 12 nutrients: 9 water-soluble vitamins (B1, B2, B3, B5, B6, B7/biotin, B9/folic acid, B12, C) and 3 fat-soluble vitamins (A, D, E).',
                        roleTitle: 'Role of the Contents',
                        role: 'Used to help meet multiple vitamin needs when parenteral vitamin supplementation is considered necessary.',
                        whenTitle: 'When It May Be Considered',
                        when: 'When a doctor finds the patient needs a more complete multivitamin supplementation through an intravenous route.'
                    }
                ],
                vitNote: 'Vitamin infusion choice and delivery are matched to the patient’s condition and needs based on the doctor’s assessment via online consultation or a home visit.',
                whenTitle: 'When Can Vitamin Infusion Be Considered?',
                whenLead: 'Vitamin needs differ for everyone. A doctor considers vitamin infusion based on health condition, medical history, patient needs, and exam findings.',
                whenCards: [
                    { title: 'Needs Specific Vitamin Supplementation', desc: 'When a doctor’s assessment finds a need for certain additional vitamins.' },
                    { title: 'Vitamin Intake Is Not Enough', desc: 'When vitamin needs are not met optimally through daily intake.' },
                    { title: 'Certain Conditions or Recovery Periods', desc: 'A doctor may consider vitamin supplementation as part of patient needs during recovery.' }
                ],
                pathTitle: 'Two Service Options, Still with Doctor Recommendation',
                pathLead: 'Patients can choose a vitamin infusion visit with a doctor or with a nurse. The difference is in the exam and consultation process before therapy is given.',
                nurseTitle: 'Vitamin Infusion with a Nurse',
                nurseP1: 'A nurse comes to the home and does an initial check of the patient’s condition.',
                nurseP2: 'Exam findings are shared with the doctor. The doctor then holds an online consultation with the patient to assess and choose the right vitamin option.',
                nurseP3: 'After the doctor’s recommendation, the nurse gives the therapy and monitors the patient during the infusion.',
                nurseFlow: ['Booking', 'Nurse Arrives', 'Exam', 'Online Doctor Consult', 'Vitamin Recommendation', 'Infusion & Monitoring'],
                doctorTitle: 'Vitamin Infusion with a Doctor',
                doctorP1: 'A doctor comes to the home and examines the patient’s health.',
                doctorP2: 'Based on the exam, the doctor chooses the vitamin option that fits the patient’s condition and needs. Therapy can then be given according to the doctor’s recommendation.',
                doctorFlow: ['Booking', 'Doctor Arrives', 'Health Exam', 'Vitamin Recommendation', 'Infusion & Monitoring'],
                prepTitle: 'The Team Arrives with Supplies Already Prepared',
                prepP1: 'Before the visit, the Dokter Panggil team prepares service needs based on the initial information shared at booking.',
                prepP2: 'Medical staff also bring Dokter Panggil’s standard medical kit to support examination, therapy, and monitoring at home.',
                healthTitle: 'Share Your Health Condition',
                healthHeadline: 'Tell Us Your Health History Before Therapy',
                healthBody: 'Before vitamin infusion is given, tell the doctor or nurse if you have certain medical history, allergies, are taking medicine or supplements, are pregnant or breastfeeding, or are receiving other medical therapy.',
                healthNote: 'That information is part of the doctor’s assessment in deciding whether therapy is appropriate.',
                whyTitle: 'Why Vitamin Infusion with Dokter Panggil?',
                whyItems: [
                    { title: 'Exam Before Therapy', desc: 'The patient’s condition is checked before vitamin infusion is given.' },
                    { title: 'Vitamin Recommended by a Doctor', desc: 'The vitamin option is based on the patient’s condition and the doctor’s assessment.' },
                    { title: 'Doctor or Nurse Option', desc: 'Patients can choose a direct visit by a doctor or a nurse based on service needs.' },
                    { title: 'Monitoring During Therapy', desc: 'Infusion is given by healthcare professionals with monitoring throughout therapy.' }
                ],
                faqTitle: 'FAQ',
                faqs: [
                    { q: 'What vitamin infusion options are available?', a: 'Dokter Panggil offers three options: Vitamin C, Multivitamin with B-Complex + Vitamin C, and Immunobooster. The option given is matched to the patient’s condition based on the doctor’s recommendation.' },
                    { q: 'Can I choose vitamin infusion with a doctor or a nurse?', a: 'Yes. When booking, patients can choose a doctor or nurse service. Both still include a patient condition exam and a doctor’s recommendation before vitamins are given.' },
                    { q: 'What if I choose the nurse service?', a: 'A nurse comes to the home and does an initial exam. Findings are shared with the doctor and the patient has an online consultation with the doctor. After the doctor’s recommendation, the nurse gives the vitamin infusion according to the prescribed therapy.' },
                    { q: 'What if I choose the doctor service?', a: 'A doctor comes to the home to examine the patient. Based on the exam, the doctor chooses the right vitamin option before therapy is given.' },
                    { q: 'Can patients choose the vitamin type themselves?', a: 'Patients can share preferences or needs when booking. The vitamin given still follows the exam findings and doctor’s recommendation to ensure it fits the patient’s condition.' },
                    { q: 'How long does vitamin infusion take?', a: 'Delivery usually takes about 30 minutes and may vary by therapy type, fluid volume, and patient condition. An estimated duration is shared based on the therapy given.' },
                    { q: 'Does vitamin infusion have side effects?', a: 'Like other intravenous therapies, vitamin infusion can cause side effects or certain reactions. That is why the patient is examined before therapy and monitored during the infusion.' },
                    { q: 'How much does home vitamin infusion cost?', a: 'Fees depend on the vitamin option, doctor or nurse service choice, and patient location. Details and a cost estimate are shared before the service is confirmed.' }
                ],
                ctaTitle: 'Vitamin Infusion, Directly at Your Home',
                ctaBody: 'Choose a doctor or nurse service and book with the Dokter Panggil team. Your condition will be checked first before the doctor chooses the right vitamin option.',
                ctaBook: 'Book Vitamin Infusion',
                ctaAskChat: 'Ask the Dokter Panggil Team'
            }
        },
        'farmasi': {
            h1: '24-Hour Pharmacy Service at Home',
            lead: 'Medicine needs can be handled from home after online consultation or a doctor visit. Prescribed medicine is prepared and delivered to the patient.',
            chips: [
                '24-Hour Service',
                'Based on Prescription & Doctor Advice',
                'Medicine Delivered Home'
            ],
            ctaBook: 'Discuss Medicine Needs',
            ctaAsk: 'Chat WhatsApp',
            farmasi: {
                introTitle: 'From Consultation to Medicine at Home',
                introLead: 'No Need to Leave Home to Find Medicine',
                introP1: 'Dokter Panggil helps patients get needed medicine after a doctor assesses their condition.',
                introP2: 'Consultation can be online or via a doctor home visit. After the doctor chooses suitable therapy, medicine needs are prepared and delivered to the patient.',
                introP3: 'From doctor consultation through medicine delivery, treatment needs can be coordinated in one service.',
                pathTitle: 'Choose Online Consultation or a Home Doctor Visit',
                pathLead: 'Choose the Service That Fits the Patient’s Condition',
                onlineTitle: 'Online Doctor Consultation',
                onlineP1: 'Patients can consult a doctor online about symptoms and health conditions.',
                onlineP2: 'If the doctor recommends therapy or prescribes medicine, it is prepared and delivered to the patient.',
                homeTitle: 'Doctor Comes to Your Home',
                homeP1: 'The doctor visits for history-taking and assessment of the patient’s condition.',
                homeP2: 'If medicine is needed, the doctor chooses therapy based on the exam. Medicine is then prepared and delivered to the patient.',
                pathNote: 'In some cases, the doctor may recommend an in-person exam when the condition cannot be assessed adequately online.',
                onlineFlow: ['Online Consultation', 'Prescription / Doctor Recommendation', 'Medicine Prepared', 'Delivered Home'],
                homeFlow: ['Doctor Visit', 'Patient Exam', 'Prescription / Doctor Recommendation', 'Medicine Prepared', 'Delivered Home'],
                howTitle: 'How Does Pharmacy Service Work?',
                howLead: 'From Exam to Medicine Delivery',
                howSteps: [
                    { title: 'Doctor Consultation', desc: 'The patient’s condition is assessed via online consultation or a doctor home visit.' },
                    { title: 'Doctor Chooses Therapy', desc: 'The doctor selects therapy and medicine based on the assessment.' },
                    { title: 'Medicine Confirmation', desc: 'The team confirms medicine needs, availability, fees, and information required before delivery.' },
                    { title: 'Medicine Prepared', desc: 'Medicine is prepared according to the prescription or doctor’s recommendation.' },
                    { title: 'Medicine Delivered Home', desc: 'Medicine is then sent directly to the patient.' },
                    { title: 'Use as Directed', desc: 'Patients take medicine according to the dose, method, and instructions given.' }
                ],
                noRxTitle: 'Don’t Have a Prescription Yet?',
                noRxLead: 'Discuss Your Condition with a Doctor',
                noRxP1: 'You do not need to choose medicine yourself.',
                noRxP2: 'Tell the doctor about symptoms, health history, and medicines currently used. The doctor will assess and choose suitable therapy when needed.',
                noRxP3: 'Patients can choose online consultation or a doctor home visit.',
                noRxCtaOnline: 'Online Consultation',
                noRxCtaWa: 'Consult with a Doctor',
                whyTitle: 'Why Pharmacy Service through Dokter Panggil?',
                whyItems: [
                    { title: 'Connected to a Doctor', desc: 'Medicine needs can be determined after a doctor assesses the patient’s condition.' },
                    { title: 'Online or Home Consultation', desc: 'Patients can choose consultation based on needs and condition.' },
                    { title: 'Medicine Delivered Home', desc: 'Medicine is prepared and sent directly to the patient.' },
                    { title: 'Integrated with Homecare', desc: 'Treatment can be coordinated with medical care and nursing at home.' }
                ],
                faqTitle: 'FAQ',
                faqs: [
                    { q: 'Can I order medicine without a doctor consultation?', a: 'No. Patients can consult a doctor online or through a home visit.' },
                    { q: 'Is every medicine available 24 hours?', a: 'Availability can differ by medicine. The team checks and shares availability and delivery estimates before the service is confirmed.' },
                    { q: 'How long until medicine arrives home?', a: 'Delivery time depends on patient location, medicine availability, and service conditions at the time of ordering. An estimate is shared after medicine needs are confirmed.' },
                    { q: 'Can children’s medicine also be delivered?', a: 'Yes, based on the prescription or doctor’s recommendation and medicine availability.' },
                    { q: 'What if the prescribed medicine is unavailable?', a: 'The team will share availability. If therapy needs to change or an alternative is needed, that decision is still consulted with the doctor.' }
                ],
                ctaTitle: 'Need Medicine Without Leaving Home?',
                ctaBody: 'Discuss the patient’s condition with a doctor or send an existing prescription. The Dokter Panggil team will help coordinate medicine needs through home delivery.',
                ctaBook: 'Consult with a Doctor',
                ctaAskChat: 'Chat WhatsApp'
            }
        },
    },

    doctors: {
        'dokter-umum': {
            h1: 'General Practitioner Home Visit',
            lead: 'A general practitioner handles everyday complaints and is the first point of assessment before deciding whether further tests are needed.',
            intro: [
                'A general practitioner assesses symptoms comprehensively before deciding whether care at home is enough or further evaluation is needed. That assessment includes a health history, physical exam, and vital-sign check.',
                'For many everyday complaints, GP care is sufficient. If something needs more specialized expertise, the doctor explains why and directs you to the appropriate specialist or facility.'
            ],
            scopeTitle: 'Complaints Commonly Handled',
            scope: [
                'Fever, cough, flu, and sore throat',
                'Digestive complaints such as nausea, diarrhea, or mild abdominal pain',
                'Headache and body symptoms without a clear cause yet',
                'Follow-up after hospital discharge or after symptoms have improved'
            ],
            limitTitle: 'Conditions That Need a Healthcare Facility',
            limits: [
                'Severe chest pain or marked shortness of breath',
                'Bleeding that will not stop or serious injury',
                'Loss of consciousness or seizures',
                'Complaints that need imaging or immediate procedures'
            ],
            faq: [
                { q: 'How is this different from calling a specialist first?', a: 'A GP assesses the complaint comprehensively first. When the direction is unclear, that assessment helps identify which tests are actually needed.' },
                { q: 'Can a GP prescribe medicine?', a: 'Yes, based on the examination. The doctor also explains how to use it and what to watch for during treatment.' },
                { q: 'What if the condition worsens after the visit?', a: 'The doctor explains warning signs. If those appear, contact us right away or take the patient to the nearest emergency department.' }
            ]
        },

        'perawat-home-care': {
            h1: 'Home Care Nurse',
            lead: 'A home care nurse carries out doctor-ordered nursing procedures and monitors the patient during recovery.',
            intro: [
                'The home care nurse’s role centers on nursing procedures and monitoring the patient at home. The nurse follows the attending doctor’s instructions, records progress, and explains what the family should watch for.',
                'Beyond technical care, the nurse helps the family understand day-to-day caregiving. That education matters so care stays consistent between visits.'
            ],
            scopeTitle: 'Procedures That Can Be Performed',
            scope: [
                'IV insertion and monitoring as ordered by a doctor',
                'Giving injectable medicines as prescribed',
                'Wound, catheter, and feeding-tube care',
                'Vital-sign monitoring and documenting patient progress'
            ],
            limitTitle: 'Outside a Nurse’s Authority',
            limits: [
                'Making a diagnosis or changing therapy without a doctor’s order',
                'Prescribing new medicines',
                'Procedures that must be done in an inpatient facility',
                'Managing emergency conditions'
            ],
            faq: [
                { q: 'Is a doctor’s order required before the nurse arrives?', a: 'For procedures such as IV therapy, injections, and certain medicines, a prescription or written doctor’s order is required. For monitoring and basic care, our team discusses needs first.' },
                { q: 'Can a nurse provide longer accompaniment?', a: 'Both single visits and longer accompaniment options are available. Share the hours you need when booking.' },
                { q: 'Does the family still need to be involved?', a: 'Family involvement helps a great deal. The nurse provides education so care stays consistent between visits.' }
            ]
        },

        'fisioterapis': {
            h1: 'Physiotherapist Home Visit',
            lead: 'A physiotherapist designs and guides an exercise program matched to the patient’s condition and the home environment.',
            intro: [
                'Physiotherapists work from an assessment of the patient’s physical condition — not a one-size-fits-all program. That assessment sets the exercise type, starting intensity, and realistic goals to reach step by step.',
                'Because therapy happens at home, the physiotherapist can train movements in real daily situations — moving from bed, walking the hallway, or climbing stairs.'
            ],
            scopeTitle: 'Treatment Focus',
            scope: [
                'Restoring strength and range of motion after surgery or injury',
                'Mobility and balance training after stroke',
                'Managing back, neck, and joint pain that limits activity',
                'Programs to maintain muscle strength in older adults'
            ],
            limitTitle: 'What Is Not Included',
            limits: [
                'Surgery or invasive medical procedures',
                'Prescribing pain medicines',
                'Therapy that requires large clinic-only equipment',
                'Managing emergency conditions'
            ],
            faq: [
                { q: 'Is a doctor’s referral required before physiotherapy?', a: 'For post-surgical or certain medical conditions, information from a doctor greatly helps program design. If you do not have one yet, our team will guide you to the right assessment first.' },
                { q: 'How long does a therapy program usually run?', a: 'Program length depends on condition and recovery goals. The physiotherapist shares an estimate after the initial assessment and reviews it periodically.' },
                { q: 'Should the patient exercise between sessions?', a: 'Yes. The physiotherapist provides a home exercise guide because consistency between sessions has a major effect on recovery progress.' }
            ]
        },

        'anak': {
            h1: 'Pediatrician Home Visit',
            lead: 'A pediatric specialist consultation at home helps children be examined in a calmer, more familiar setting.',
            intro: [
                'Children are often more cooperative when examined in a familiar environment. A home visit also reduces waiting time among other patients, which is usually tiring for a child who already feels unwell.',
                'The consultation covers symptom assessment, a physical exam, and discussion of the child’s eating, sleep, and activity patterns. Parents receive an explanation of findings and what to monitor at home.'
            ],
            scopeTitle: 'Topics Commonly Discussed',
            scope: [
                'Fever, cough, and mild infections in children',
                'Digestive complaints such as diarrhea or poor appetite',
                'Growth and development monitoring',
                'Planning and adjusting immunization schedules'
            ],
            limitTitle: 'Conditions That Need Hospital Care Immediately',
            limits: [
                'Shortness of breath, rapid breathing, or a child who appears very weak',
                'Seizures or loss of consciousness',
                'Severe dehydration and complete refusal to drink',
                'Serious injury or complaints that need immediate procedures'
            ],
            faq: [
                { q: 'Can immunization be done in the same visit?', a: 'Mention that plan when booking. Vaccines still depend on the child’s screening results at the visit.' },
                { q: 'Do parents need to prepare anything?', a: 'Have the child’s health record or immunization history, a list of symptoms, and any medicines currently given.' },
                { q: 'What if the child refuses to be examined?', a: 'The exam is adapted to help the child feel more comfortable, and parents are asked to stay throughout.' }
            ]
        },

        'jantung': {
            h1: 'Cardiologist Home Visit',
            lead: 'A cardiology consultation at home is for monitoring stable conditions — not for emergency symptoms.',
            intro: [
                'Cardiovascular monitoring is usually long-term and needs periodic review. A home consultation makes this easier for patients who find routine travel to a facility burdensome, especially older adults.',
                'During the visit, the doctor reviews symptoms, blood pressure, current medicines, and any existing test results. If further tests are only available at a facility, the doctor explains that and outlines next steps.'
            ],
            scopeTitle: 'What Can Be Discussed at Home',
            scope: [
                'Blood-pressure control and symptoms in stable conditions',
                'Review of current medicines',
                'Discussion of test results already available',
                'Advice on activity, diet, and lifestyle adjustments'
            ],
            limitTitle: 'Go to Emergency Care Immediately If',
            limits: [
                'Severe chest pain, especially radiating to the arm, neck, or back',
                'Marked shortness of breath or breathlessness when lying flat',
                'Heart palpitations with severe dizziness or near-fainting',
                'Loss of consciousness'
            ],
            faq: [
                { q: 'Can an ECG be done at home?', a: 'Availability of supporting tests varies by area and equipment. Tell us your needs when booking so we can confirm first.' },
                { q: 'Does this replace hospital follow-up?', a: 'Not always. Some tests and procedures can only be done at a healthcare facility. The doctor will explain if an in-facility visit is still needed.' },
                { q: 'What should I prepare before the consultation?', a: 'Have blood-pressure notes if you monitor at home, a medicine list, and your latest cardiac test results.' }
            ]
        },

        'penyakit-dalam': {
            h1: 'Internal Medicine Specialist Home Visit',
            lead: 'An internal medicine consultation at home supports monitoring of chronic conditions that need regular follow-up.',
            intro: [
                'Chronic conditions such as diabetes and hypertension need ongoing monitoring, not one-off care. A home consultation helps patients keep follow-up regular without the burden of repeated travel.',
                'The doctor reviews symptoms, recent lab results, and current medicines, then discusses needed adjustments with the patient and family. Supporting tests can be scheduled through the at-home laboratory service.'
            ],
            scopeTitle: 'Conditions Commonly Monitored',
            scope: [
                'Diabetes and blood-sugar monitoring',
                'Hypertension and related blood-pressure complaints',
                'Recurring digestive complaints',
                'Review of lab results and adjustment of the treatment plan'
            ],
            limitTitle: 'Conditions That Need Facility-Based Care',
            limits: [
                'Marked shortness of breath or chest pain',
                'Very high or very low blood sugar with reduced consciousness',
                'Severe dehydration or persistent vomiting',
                'Conditions that need imaging or inpatient care'
            ],
            faq: [
                { q: 'Can lab samples be taken in the same arrangement?', a: 'Mention that need when booking so the doctor visit and sample collection can be planned close together.' },
                { q: 'Can the doctor adjust medicine doses?', a: 'Therapy adjustments are made by the doctor based on the exam and your condition at the consultation, and are explained before they are applied.' },
                { q: 'How often should follow-up be done?', a: 'The interval depends on how stable the condition is and on test results. The doctor advises a suitable schedule after the consultation.' }
            ]
        }
    },

    hubs: {
        layanan: {
            h1: 'Home Health Services',
            chips: [
                'Verified Medical Professionals',
                'Come Directly to Your Home',
                'Coordinated Care'
            ],
            catalogTitle: 'Choose the Service That Fits Your Needs',
            catalogSub: 'Find the right home healthcare service for you and your family.',
            whyTitle: 'Why Families Choose Home Care',
            why: [
                'Care happens at home, so patients stay comfortable in a familiar environment',
                'Licensed healthcare professionals are verified before assignment',
                'An approach tailored for children, adults, and older adults',
                'Fees and schedules are confirmed before the visit is finalized'
            ],
            chooseTitle: 'How to Choose the Right Service',
            choose: [
                'If the cause of symptoms is still unclear, start with a doctor visit. The doctor assesses the condition first, then directs tests or care that are actually needed so you do not book a service that may not fit.',
                'If a doctor has already ordered a procedure — for example injectable medicine or a wound dressing change — you can go straight to the matching care service. For periodic monitoring without a specific complaint, a health check or laboratory test is usually the right choice.'
            ],
            beforeTitle: 'Before You Book',
            ctaTitle: 'Not sure which service you need?',
            ctaBody: 'Tell our team about the patient’s condition or needs. We will help direct you to the right service.',
            relatedTitle: 'Related Services',
            relatedSub: 'Families who book this service often also need one of the following.',
            allServices: 'See all services →'
        },

        dokter: {
            h1: 'Doctors, Nurses, and Physiotherapists at Home',
            lead: 'Learn each healthcare role, browse the medical team directory, and book the service that best fits the patient’s needs in Makassar.',
            rolesTitle: 'Healthcare Roles',
            chooseTitle: 'Choosing the Right Professional',
            intro: [
                'Each role has a different scope of authority. Doctors assess and determine diagnosis and therapy, nurses carry out nursing care as ordered by a doctor, and physiotherapists focus on restoring movement function.',
                'Understanding this division helps you book the right service from the start, so the patient’s needs are not delayed by rearranging visit schedules.'
            ],
            beforeTitle: 'Before You Book',
            ctaTitle: 'Not sure who should come?',
            ctaBody: 'Tell our team about the patient’s condition. We help direct you to the right healthcare professional for your needs in Makassar.',
            crossSpecialists: 'See specialist doctor pages →'
        },

        spesialis: {
            h1: 'Specialist Doctors at Home',
            lead: 'Specialist consultations at home in Makassar for stable conditions that need periodic follow-up.',
            rolesTitle: 'Specialties',
            chooseTitle: 'When a Specialist Home Consultation Fits',
            intro: [
                'A specialist home consultation is best for conditions that are already diagnosed and need regular follow-up. For unclear symptoms, a general practitioner assessment first is usually more efficient because it identifies which tests are actually needed.',
                'Keep in mind that some supporting tests and procedures can only be done at a healthcare facility. If the consultation shows those are needed, the doctor will explain and outline the next steps.'
            ],
            beforeTitle: 'Before You Book',
            ctaTitle: 'Not sure who should come?',
            ctaBody: 'Tell our team about the patient’s condition. We help direct you to the right healthcare professional for your needs in Makassar.',
            crossGeneral: 'See general practitioners, nurses, and physiotherapists →'
        }
    },

    commonUi: {
        aboutRole: 'About This Role',
        scopeLimitsTitle: 'Scope and Limits',
        scopeLimitsSub: 'So you understand what can and cannot be handled during a home visit.',
        relatedServicesTitle: 'Related Services',
        relatedServicesSub: 'Service pages most often booked alongside this role.',
        beforeBooking: 'Before You Book',
        trust: ['Verified professionals', 'Home visits', 'Fees confirmed first'],
        relatedServicesHubTitle: 'Related Services',
        relatedServicesHubSub: 'Families who book this service often also need one of the following.',
        seeAllServices: 'See all services →'
    }
};
