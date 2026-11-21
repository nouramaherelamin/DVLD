/**
 * Licentra Driving & Vehicle License Department
 * Data Repository & State Persistence Layer
 * 
 * Supports both standalone persistent browser storage (localStorage)
 * and optional Supabase PostgreSQL sync when credentials are provided.
 */
// Licentra Database Module


  // Storage Keys
  const KEYS = {
    USERS: 'licentra_db_users',
    SESSION: 'licentra_db_session',
    APPLICATIONS: 'licentra_db_applications',
    BOOKINGS: 'licentra_db_bookings',
    INQUIRIES: 'licentra_db_inquiries',
    NEWSLETTER: 'licentra_db_newsletter',
    EVENT_REGS: 'licentra_db_event_registrations',
    LICENSES: 'licentra_db_licenses',
    NOTIFICATIONS: 'licentra_db_notifications',
    RENEWALS: 'licentra_db_renewals',
    REPLACEMENTS: 'licentra_db_replacements',
    ACTIVITIES: 'licentra_db_activities'
  };

  /* --------------------------------------------------------------------------
     1. CATALOG DATA (Services, Classes, Tests, News, Events)
     -------------------------------------------------------------------------- */
  const SERVICES = [
    {
      id: 'first-license',
      code: 'SRV-01',
      title: 'First Driving License',
      category: 'Driver Licensing',
      icon: 'assets/images/icons/icon_09_first_driving_license.svg',
      badge: 'Most Requested',
      summary: 'Apply for your first official Egyptian driving license. Complete your vision, computerized theory, and practical driving evaluations.',
      description: 'The First Driving License service is designed for citizens and legal residents applying for an official Egyptian driving credential for the first time. Through our digitized portal, applicants can register their personal records, upload mandatory medical certifications, pay statutory government issuance fees, and reserve appointments for computerized theoretical exams and closed-course practical evaluations.',
      eligibility: [
        'Must be at least 18 years of age for private vehicles (Class 3) or 21 years for commercial classes.',
        'Egyptian citizenship or a valid legal residency permit for foreign nationals.',
        'Pass clinical vision acuity test (6/9 or better with or without corrective lenses).',
        'Hold minimum basic primary education degree or certified literacy equivalence.',
        'Clean criminal record certificate issued within the last 30 days.'
      ],
      documents: [
        { name: 'National ID Card', note: 'Original + 2 clear copies (must be valid for at least 6 months)' },
        { name: 'Recent Passport Photographs', note: '4 color photos (4x6 cm) with pure white background' },
        { name: 'Certified Medical Screening Certificate', note: 'Form 287-B issued by an accredited traffic medical unit' },
        { name: 'Educational Certificate', note: 'Original diploma, university degree, or accredited literacy certificate' },
        { name: 'Criminal Background Check (Fish & Tashbih)', note: 'Original clearance directed to Licentra Traffic Directorate' }
      ],
      fees: [
        { item: 'Official State Stamp & Issue Fee', amount: 350 },
        { item: 'Smart Chip License Card Production', amount: 180 },
        { item: 'Computer Theory Examination Fee', amount: 150 },
        { item: 'Practical Maneuver Track Assessment', amount: 150 }
      ],
      totalFee: 'EGP 830',
      processingTime: '3 – 5 Business Days after test clearance',
      validity: '10 Years for Egyptian Citizens',
      steps: [
        { num: 1, title: 'Submit Digital Application', desc: 'Complete applicant profile, select license class, and upload verification documents.' },
        { num: 2, title: 'Medical & Optometry Screening', desc: 'Visit an accredited center for visual acuity and general fitness examination.' },
        { num: 3, title: 'Computer Theory Exam', desc: 'Attend the 40-question computerized exam covering Egyptian road signs and traffic safety.' },
        { num: 4, title: 'Practical Track Evaluation', desc: 'Demonstrate vehicle handling, parking maneuvers, and safe road operation.' },
        { num: 5, title: 'Smart Card Issuance', desc: 'Receive your high-security biometric driving license card.' }
      ],
      faqs: [
        { q: 'Can I reschedule my practical test if I cannot attend?', a: 'Yes, appointments may be rescheduled free of charge up to 48 hours prior to the slot through your citizen dashboard.' },
        { q: 'What happens if I fail the theory exam?', a: 'You may retake the exam after a mandatory 14-day study period by paying the nominal EGP 150 re-test fee.' }
      ]
    },
    {
      id: 'renewal',
      code: 'SRV-02',
      title: 'License Renewal',
      category: 'Driver Licensing',
      icon: 'assets/images/icons/icon_10_license_renewal.svg',
      badge: 'Instant Online',
      summary: 'Renew your active or recently expired driver license with digital fine clearance and express home delivery.',
      description: 'The License Renewal service enables licensed motorists to renew their credentials without long bureaucratic queues. By connecting directly with the Public Prosecution digital traffic fines gateway, motorists can verify violations, submit updated eye test reports, and obtain a refreshed 10-year credential.',
      eligibility: [
        'Holding an existing Egyptian driving license (active or expired within 30 days grace period).',
        'No active judicial suspension or court-mandated license revocation.',
        'Satisfactory visual acuity verification from an accredited optometry clinic.'
      ],
      documents: [
        { name: 'Original Expired Driving License', note: 'Must be surrendered upon issuance of the new smart card' },
        { name: 'Valid Egyptian National ID', note: 'Must reflect current residential address' },
        { name: 'Prosecution Fine Clearance (Baraa)', note: 'Digital certificate proving all traffic penalties are settled' },
        { name: 'Updated Medical Fitness Report', note: 'Form 287-B completed within the last 90 days' }
      ],
      fees: [
        { item: 'Statutory License Renewal Fee', amount: 420 },
        { item: 'Biometric Card Production Fee', amount: 180 },
        { item: 'Fine Clearance Certificate Processing', amount: 50 }
      ],
      totalFee: 'EGP 650',
      processingTime: 'Same-day counter issuance or 48h courier dispatch',
      validity: '10 Years (Private) / 3-5 Years (Commercial)',
      steps: [
        { num: 1, title: 'Fine Verification & Clearance', desc: 'System automatically checks traffic violations via the Public Prosecution API.' },
        { num: 2, title: 'Submit Renewal Form', desc: 'Confirm national ID information, residential address, and preferred delivery method.' },
        { num: 3, title: 'Settle Renewal Fees', desc: 'Pay the statutory renewal fees securely via credit card or digital wallet.' },
        { num: 4, title: 'Receive New License', desc: 'Pick up your card at the regional center or receive it via express courier delivery.' }
      ],
      faqs: [
        { q: 'Is there a penalty for late renewal?', a: 'A standard late renewal fee is applied if renewal is requested after the 30-day post-expiry grace period.' },
        { q: 'Can I change my registered address during renewal?', a: 'Yes, provided you upload an updated National ID card reflecting your new address.' }
      ]
    },
    {
      id: 'replacement',
      code: 'SRV-03',
      title: 'Replacement License',
      category: 'Driver Licensing',
      icon: 'assets/images/icons/icon_11_replacement_license.svg',
      badge: '24h Processing',
      summary: 'Apply for an urgent official replacement of a damaged, lost, or stolen driving license card.',
      description: 'The Replacement of Lost/Damaged License service provides an expedited pathway for drivers who have suffered physical card damage, theft, or accidental misplacement. With automated identity verification, your driving record is validated in real time and a replacement smart chip card is issued immediately.',
      eligibility: [
        'Registered owner of an active, unexpired Egyptian driving license.',
        'Police record memorandum in case of stolen or lost cards.',
        'Physical surrender of damaged card remnants in case of replacement for damage.'
      ],
      documents: [
        { name: 'Official Police Report', note: 'Required for lost or stolen credentials (Mahdar)' },
        { name: 'Valid Egyptian National ID', note: 'Original + 1 clear copy' },
        { name: 'Recent 4x6 Photo', note: '1 color photo with white background' },
        { name: 'Previous License Copy (Optional)', note: 'Facilitates accelerated record lookup' }
      ],
      fees: [
        { item: 'Replacement Card Issuance Fee', amount: 270 },
        { item: 'Biometric Smart Card Media', amount: 180 }
      ],
      totalFee: 'EGP 450',
      processingTime: '24 Hours',
      validity: 'Preserves previous license expiration date',
      steps: [
        { num: 1, title: 'Report Loss / Damage', desc: 'Select reason for replacement and upload police memorandum if lost.' },
        { num: 2, title: 'Identity Verification', desc: 'Automated verification against Central Traffic Department database.' },
        { num: 3, title: 'Card Manufacturing', desc: 'High-security laser engraving of replacement credential.' },
        { num: 4, title: 'Card Collection', desc: 'Collect your replacement card at your registered regional branch.' }
      ],
      faqs: [
        { q: 'Does a replacement extend my license expiration date?', a: 'No, the replacement card inherits the identical expiration date of your original credential.' }
      ]
    },
    {
      id: 'detailed-license',
      code: 'SRV-04',
      title: 'Release Detailed License Record',
      category: 'Legal & Records',
      icon: 'assets/images/icons/icon_13_release_detailed_license.svg',
      badge: 'Instant Digital PDF',
      summary: 'Obtain an official certified transcript of your driving history, vehicle classes, and point deductions for legal or embassy use.',
      description: 'This administrative service generates a comprehensive certified statement of driver records (Bayān Halā). Essential for foreign visa applications, commercial fleet employment, or legal proceedings, the transcript is cryptographically signed with an official QR code for instant authentication by embassies and judicial bodies.',
      eligibility: [
        'Current or past holder of an Egyptian driver license in good standing.',
        'Valid identification matching department records.'
      ],
      documents: [
        { name: 'Valid National ID or Passport', note: 'For foreign applicants' },
        { name: 'Formal Request Application Form', note: 'Filled digitally on portal' },
        { name: 'Requesting Authority Letter (Optional)', note: 'If designated specifically for a foreign embassy' }
      ],
      fees: [
        { item: 'Administrative Records Search', amount: 170 },
        { item: 'Official Hologram Stamp & QR Seal', amount: 150 }
      ],
      totalFee: 'EGP 320',
      processingTime: 'Instant Digital Certificate / 24h Paper Transcript',
      validity: '3 Months from Date of Issuance',
      steps: [
        { num: 1, title: 'Specify Purpose', desc: 'Indicate whether record is for local employment, foreign embassy, or court submission.' },
        { num: 2, title: 'Data Compilation', desc: 'System compiles licensing history, class certifications, and penalty history.' },
        { num: 3, title: 'Seal & Encryption', desc: 'Digital QR certificate is generated and verified with government cryptostamp.' },
        { num: 4, title: 'Download or Stamp', desc: 'Download instantly as authenticated PDF or collect embossed print from headquarters.' }
      ],
      faqs: [
        { q: 'Is the digital PDF accepted by foreign embassies?', a: 'Yes, the document includes a Ministry of Foreign Affairs verifiable QR signature.' }
      ]
    },
    {
      id: 'international',
      code: 'SRV-05',
      title: 'International Driving Permit (IDP)',
      category: 'International Travel',
      icon: 'assets/images/icons/icon_12_international_license.svg',
      badge: 'Recognized in 150+ Countries',
      summary: 'Drive legally across Europe, the Americas, Asia, and the Middle East with an official UN Convention international permit.',
      description: 'Issued in accordance with the United Nations Geneva Convention on Road Traffic (1949), the International Driving Permit allows Egyptian license holders to operate passenger vehicles legally when traveling abroad for tourism, business, or temporary residency.',
      eligibility: [
        'Holder of a valid Egyptian Private Driving License (Class 3) with at least 1 year validity remaining.',
        'Egyptian national or foreign resident with valid Egyptian permanent residency.',
        'Minimum age of 18 years.'
      ],
      documents: [
        { name: 'Valid Egyptian Driving License', note: 'Must have at least 12 months remaining' },
        { name: 'Egyptian Passport or National ID', note: 'Original + copy of biographical page' },
        { name: 'Passport Photos', note: '2 recent photos (4x6 cm) with light background' }
      ],
      fees: [
        { item: 'International Permit Issuance', amount: 750 },
        { item: 'Automobile & Touring Club of Egypt Stamp', amount: 200 }
      ],
      totalFee: 'EGP 950',
      processingTime: 'Same-day issuance at Cairo Main & Alexandria Centers',
      validity: '1 Year from Issuance Date',
      steps: [
        { num: 1, title: 'Verify National License', desc: 'Ensure your domestic license has at least 12 months remaining validity.' },
        { num: 2, title: 'Submit Travel Information', desc: 'Provide destination countries and passport details.' },
        { num: 3, title: 'Payment & Authentication', desc: 'Complete payment and automated cross-verification with Automobile Club.' },
        { num: 4, title: 'Collect International Booklet', desc: 'Receive your multi-lingual UN standard booklet.' }
      ],
      faqs: [
        { q: 'Can I drive commercially abroad with an IDP?', a: 'No, the international permit is strictly for tourism and non-commercial temporary travel.' }
      ]
    },
    {
      id: 'class-upgrade',
      code: 'SRV-06',
      title: 'License Class Upgrade',
      category: 'Professional Drivers',
      icon: 'assets/images/icons/icon_02_license_classes_shield.svg',
      badge: 'Career Elevation',
      summary: 'Upgrade your existing private license to commercial categories, passenger buses, or heavy articulated trucks.',
      description: 'The Class Upgrade pathway allows experienced drivers to transition from Private Vehicle credentials (Class 3) to commercial transport licenses (Classes 4, 6, and 7). Requires prerequisite holding periods, professional medical clearance, and vehicle-specific maneuvering examinations.',
      eligibility: [
        'Minimum holding period of 3 consecutive years with Private License (Class 3).',
        'Minimum age of 21 years.',
        'Pass comprehensive professional health, drug, and psychiatric screening.',
        'Clean record with no fatal traffic infractions.'
      ],
      documents: [
        { name: 'Existing Valid Driving License', note: 'Minimum 3 years active record' },
        { name: 'Accredited Toxicological & Drug Screening Report', note: 'Issued by Ministry of Health hospital' },
        { name: 'Military Service Clearance Certificate', note: 'Exempted, completed, or deferred status' },
        { name: 'National ID Card', note: 'Must state occupation or professional status' }
      ],
      fees: [
        { item: 'Upgrade Application & Records Audit', amount: 380 },
        { item: 'Professional Maneuver Examination', amount: 350 },
        { item: 'Class Smart Card Media', amount: 190 }
      ],
      totalFee: 'EGP 920 – 1,300',
      processingTime: '5 – 7 Business Days',
      validity: '3 to 5 Years depending on targeted commercial class',
      steps: [
        { num: 1, title: 'Eligibility Verification', desc: 'Verify 3-year holding tenure and age prerequisites.' },
        { num: 2, title: 'Specialized Medical Screening', desc: 'Complete toxicology, cardiac, and visual screening at traffic health unit.' },
        { num: 3, title: 'Heavy Vehicle Practical Test', desc: 'Demonstrate articulated maneuvering, reverse docking, and emergency braking.' },
        { num: 4, title: 'Endorsement & Issue', desc: 'Obtain your updated commercial license endorsement.' }
      ],
      faqs: [
        { q: 'Can I skip straight from Class 3 to Class 7 Heavy Truck?', a: 'Under Egyptian traffic regulations, you must first hold Class 3 for 3 years before qualifying for heavy commercial test tracks.' }
      ]
    },
    {
      id: 'driving-tests',
      code: 'SRV-07',
      title: 'Driving Tests Booking & Management',
      category: 'Examinations',
      icon: 'assets/images/icons/icon_03_test_types_calendar.svg',
      badge: 'Smart Scheduling',
      summary: 'Reserve, reschedule, or review computerized theory exams, optometry screenings, and practical track tests.',
      description: 'Manage all mandatory examination milestones online. Choose your preferred test center, pick an open date, select a convenient morning or afternoon time slot, and receive automated SMS and email appointment vouchers.',
      eligibility: [
        'Active application file registered with Licentra.',
        'Settled statutory examination fees.'
      ],
      documents: [
        { name: 'National ID Card', note: 'Must be presented physically at the test center entrance' },
        { name: 'Digital Booking Confirmation Voucher', note: 'Printed QR pass or digital wallet barcode' },
        { name: 'Application Receipt / Reference ID', note: 'Proof of fee settlement' }
      ],
      fees: [
        { item: 'Initial Examination Package', amount: 0, note: 'Included with license application' },
        { item: 'Re-Test Examination Fee (if needed)', amount: 200 }
      ],
      totalFee: 'Included or EGP 200 per retake',
      processingTime: 'Instant Appointment Reservation',
      validity: 'Appointment valid for selected slot',
      steps: [
        { num: 1, title: 'Select Test Type', desc: 'Choose Theory Computer Exam, Vision Screening, or Practical Track.' },
        { num: 2, title: 'Pick Center & Date', desc: 'Choose from Cairo Main, Giza, Alexandria, or Mansoura centers.' },
        { num: 3, title: 'Pick Convenient Time Slot', desc: 'Select from available morning or afternoon test sessions.' },
        { num: 4, title: 'Receive Digital Pass', desc: 'Download your QR-enabled appointment voucher instantly.' }
      ],
      faqs: [
        { q: 'What is the passing score for the computer theory exam?', a: 'Candidates must achieve at least 32 correct answers out of 40 (80%) within 30 minutes.' }
      ]
    },
    {
      id: 'vehicle-licensing',
      code: 'SRV-08',
      title: 'Vehicle Licensing Services',
      category: 'Vehicles & Inspection',
      icon: 'assets/images/icons/08_modern_systems_gear.svg',
      badge: 'Comprehensive Fleet',
      summary: 'Mandatory technical vehicle safety inspections, initial vehicle registration, ownership transfer, and plate renewal.',
      description: 'Complete digital and center-based administrative services for privately owned and commercial motor vehicles. Submit chassis verification records, schedule automated technical safety tests, verify compulsory third-party insurance, and obtain electronic license plates.',
      eligibility: [
        'Registered owner or authorized representative with notarized power of attorney.',
        'Vehicle passed certified technical emissions and safety inspection.'
      ],
      documents: [
        { name: 'Original Vehicle Ownership Deed / Invoice', note: 'Or previous registration booklet (Rokhsa)' },
        { name: 'Compulsory Third-Party Motor Insurance', note: 'Valid for the full requested licensing period' },
        { name: 'Technical Inspection Clearance (Form 101)', note: 'Completed at accredited inspection bay' },
        { name: 'National ID of Registered Owner', note: 'Original + 2 copies' }
      ],
      fees: [
        { item: 'Annual Road Development Tax', amount: 550 },
        { item: 'Electronic Plate & Smart Sticker', amount: 320 },
        { item: 'Technical Safety Bay Inspection', amount: 230 }
      ],
      totalFee: 'EGP 1,100 – 2,400 (Based on CC & Year)',
      processingTime: '1 – 2 Business Days',
      validity: '1, 2, or 3 Years as selected by owner',
      steps: [
        { num: 1, title: 'Technical Inspection', desc: 'Drive through automated chassis, brake, and emissions diagnostic bay.' },
        { num: 2, title: 'Insurance Verification', desc: 'Electronic confirmation of third-party motor insurance coverage.' },
        { num: 3, title: 'Tax & Fee Assessment', desc: 'Calculate vehicle tax based on engine cubic centimeters and model year.' },
        { num: 4, title: 'Electronic Sticker & Card', desc: 'Receive your vehicle registration smart card and RFID windshield tag.' }
      ],
      faqs: [
        { q: 'Is the electronic RFID sticker mandatory?', a: 'Yes, all motorized vehicles in Egypt are legally required to carry the RFID windshield sticker.' }
      ]
    }
  ];

  /* --------------------------------------------------------------------------
     2. LICENSE CLASSES CATALOG (7 Classes)
     -------------------------------------------------------------------------- */
  const CLASSES = [
    {
      id: 'class-1',
      code: 'Class 1',
      name: 'Light Motorcycle',
      arabicName: 'دراجة آلية خفيفة',
      category: 'Two-Wheeled Vehicles',
      image: 'assets/images/classes/class1_motorcycle.png',
      minAge: 18,
      validity: '5 Years',
      fee: 'EGP 515',
      ccLimit: 'Up to 125 cc',
      allowedVehicles: 'Light motorized two-wheelers, scooters, and mopeds with engine displacement not exceeding 125 cc and maximum design speed under 90 km/h.',
      requirements: [
        'Minimum age of 18 years on date of application',
        'Valid Egyptian National ID or resident passport',
        'Certified medical fitness certificate (Form 287-B)',
        'Pass computerized road signs theory test',
        'Pass motorcycle slalom and balance track test'
      ],
      testsRequired: ['Vision Screening', 'Theory Exam', 'Motorcycle Track Test']
    },
    {
      id: 'class-2',
      code: 'Class 2',
      name: 'Heavy Motorcycle',
      arabicName: 'دراجة آلية ثقيلة',
      category: 'Two-Wheeled Vehicles',
      image: 'assets/images/classes/class2_heavy_motorcycle.png',
      minAge: 21,
      validity: '10 Years',
      fee: 'EGP 830',
      ccLimit: 'Exceeding 125 cc (Unlimited)',
      allowedVehicles: 'High-displacement sports motorcycles, cruisers, heavy touring bikes, and motor tricycles without displacement restriction.',
      requirements: [
        'Minimum age of 21 years',
        'Valid Egyptian National ID',
        'Satisfactory hearing and optical examination',
        'Passing advanced high-speed maneuvering test',
        'Proof of primary education certificate'
      ],
      testsRequired: ['Vision Screening', 'Theory Exam', 'Advanced Slalom & Emergency Braking']
    },
    {
      id: 'class-3',
      code: 'Class 3',
      name: 'Private Vehicle',
      arabicName: 'مركبة خاصة (ملاكي)',
      category: 'Passenger Vehicles',
      image: 'assets/images/classes/class3_private_car.png',
      minAge: 18,
      validity: '10 Years',
      fee: 'EGP 830',
      ccLimit: 'Passenger Cars (up to 8 seats)',
      allowedVehicles: 'Sedans, hatchbacks, SUVs, pickups, and multi-purpose vehicles designed for private personal transport with maximum 8 passenger seats.',
      requirements: [
        'Minimum age of 18 years',
        'Egyptian National ID Card or legal resident visa',
        'Medical screening certificate for eyesight and general health',
        'Pass computerized theory exam (32/40)',
        'Pass practical parallel parking and on-road test'
      ],
      testsRequired: ['Vision Screening', 'Computer Theory Exam', 'Closed Track & S-Curve Test']
    },
    {
      id: 'class-4',
      code: 'Class 4',
      name: 'Taxi / Limousine',
      arabicName: 'مركبة أجرة وليموزين',
      category: 'Commercial Passenger',
      image: 'assets/images/classes/class4_taxi.png',
      minAge: 21,
      validity: '10 Years',
      fee: 'EGP 920',
      ccLimit: 'Licensed Public Hire Cabs',
      allowedVehicles: 'Commercial taxicabs, ride-hailing chauffeur sedans, and contracted tourism limousines carrying paying passengers.',
      requirements: [
        'Minimum age of 21 years',
        'Clean criminal background certificate (Fish & Tashbih)',
        'Official toxicological drug clearance certificate',
        'Prior holding of Class 3 license for at least 1 year',
        'Commercial driver passenger safety evaluation'
      ],
      testsRequired: ['Vision Screening', 'Theory Exam', 'Commercial Road Safety Exam']
    },
    {
      id: 'class-5',
      code: 'Class 5',
      name: 'Agricultural Vehicle',
      arabicName: 'جرارات ومعدات زراعية',
      category: 'Agricultural & Special Machinery',
      image: 'assets/images/classes/class5_tractor.png',
      minAge: 21,
      validity: '10 Years',
      fee: 'EGP 650',
      ccLimit: 'Agricultural Tractors & Harvesters',
      allowedVehicles: 'Agricultural tractors, motorized tillers, combines, and special farm equipment operated on rural and regional roads.',
      requirements: [
        'Minimum age of 21 years',
        'National ID Card',
        'Basic literacy and road signs comprehension test',
        'Practical tractor hitching and trailer maneuvering test'
      ],
      testsRequired: ['Vision Screening', 'Basic Theory Exam', 'Tractor Reversing Test']
    },
    {
      id: 'class-6',
      code: 'Class 6',
      name: 'Passenger Bus',
      arabicName: 'حافلة ركاب (أتوبيس)',
      category: 'Mass Transit',
      image: 'assets/images/classes/class6_bus.png',
      minAge: 21,
      validity: '10 Years',
      fee: 'EGP 850',
      ccLimit: 'Coaches Exceeding 16 Passengers',
      allowedVehicles: 'Public transport buses, school coaches, microbuses, and tourism chartered coaches exceeding 16 passenger seats.',
      requirements: [
        'Minimum age of 21 years',
        'Hold Class 3 or 4 for at least 3 years',
        'Pass heavy passenger medical & cardiovascular screening',
        'Negative drug screening from accredited hospital',
        'Bus turning radius, dock parking, and passenger safety test'
      ],
      testsRequired: ['Specialized Optometry', 'Drug Panel', 'Practical Bus Track Exam']
    },
    {
      id: 'class-7',
      code: 'Class 7',
      name: 'Heavy Vehicle',
      arabicName: 'مركبة نقل ثقيل وتريلا',
      category: 'Heavy Freight Transport',
      image: 'assets/images/classes/class7_truck.png',
      minAge: 21,
      validity: '10 Years',
      fee: 'EGP 1,300',
      ccLimit: 'Articulated Trucks & Trailers (> 3.5 Tons)',
      allowedVehicles: 'Heavy articulated lorries, semi-trailers, hazardous freight transports, and multi-axle freight vehicles exceeding 3.5 tons gross vehicle mass.',
      requirements: [
        'Minimum age of 21 years',
        'Hold Class 3 for at least 3 years',
        'Full medical clearance, ECG, and toxicology panel',
        'Articulated trailer coupling, reverse docking, and hill-start test'
      ],
      testsRequired: ['Vision & Reflex Test', 'Toxicology Screening', 'Articulated Maneuver Track']
    }
  ];

  /* --------------------------------------------------------------------------
     3. DRIVING TESTS CATALOG
     -------------------------------------------------------------------------- */
  const DRIVING_TESTS = {
    theory: {
      id: 'theory',
      name: 'Theory Computerized Exam',
      badge: 'Step 1 Exam',
      description: 'A 30-minute touchscreen computer assessment testing your understanding of Egyptian road traffic laws, priority rules, speed limits, mandatory road signs, and hazard perception.',
      format: '40 Multiple Choice Questions (Touchscreen Lab)',
      duration: '30 Minutes',
      passingScore: '32 / 40 (80%)',
      fee: 'EGP 150 (Included in first license application)',
      locations: ['Cairo Main Center (Lab 1 & 2)', 'Giza Center Hall', 'Alexandria Smouha Lab', 'Mansoura Lab'],
      sampleTopics: [
        'Priority at Roundabouts and Intersections',
        'Maximum Speed Limits on Highways vs Urban Centers',
        'Prohibitory, Mandatory, and Warning Road Signs',
        'Emergency Stopping Distances and Rain Driving Rules'
      ]
    },
    vision: {
      id: 'vision',
      name: 'Vision & Medical Screening',
      badge: 'Pre-Test Clearance',
      description: 'Conducted on-site by accredited Ministry of Interior optometrists to verify visual acuity, field of vision, color distinction (traffic lights), and night vision.',
      format: 'Clinical Optometry Screening',
      duration: '10 Minutes',
      passingScore: 'Visual Acuity 6/9 or better (with or without corrective glasses)',
      fee: 'EGP 120 (Standard medical stamp)',
      locations: ['All Regional Licentra Centers'],
      sampleTopics: [
        'Standard Snellen Acuity Chart Assessment',
        'Ishihara Color Blindness Screening',
        'Peripheral Visual Field Examination'
      ]
    },
    practical: {
      id: 'practical',
      name: 'Practical Driving Evaluation',
      badge: 'Final Stage',
      description: 'Conducted on automated sensor-equipped closed test tracks and supervised by certified police driving examiners. Assesses parallel parking, 90-degree reverse docking, hill start, and emergency stopping.',
      format: 'In-Vehicle Track Test (Dual-Control Car Provided or Own Vehicle)',
      duration: '20 Minutes',
      passingScore: 'Pass / Fail evaluation on statutory safety criteria',
      fee: 'EGP 150',
      locations: ['Cairo Nasr City Closed Track', 'Giza 6th of October Track', 'Alexandria Smouha Track'],
      sampleTopics: [
        'Reverse Parallel Parking between Sensor Markers',
        'S-Curve Forward & Reverse Maneuver without touching cones',
        'Smooth Hill Stop and Restart without rollback',
        'Safe Intersection Turn and Blind Spot Verification'
      ]
    }
  };

  const TEST_CENTERS = [
    { id: 'cairo', name: 'Cairo Main Center', address: '123 El Tayaran St., Nasr City, Cairo', phone: '+20 123 456 7890' },
    { id: 'giza', name: 'Giza Center', address: 'Central Axis Road, 6th of October City, Giza', phone: '+20 123 456 7891' },
    { id: 'alexandria', name: 'Alexandria Center', address: '45 Victor Emmanuel Sq., Smouha, Alexandria', phone: '+20 123 456 7892' },
    { id: 'mansoura', name: 'Mansoura Center', address: 'El-Gomhoria St., Mansoura, Dakahlia', phone: '+20 123 456 7893' }
  ];

  const TIME_SLOTS = [
    '08:30 AM – 10:00 AM',
    '10:30 AM – 12:00 PM',
    '12:30 PM – 02:00 PM',
    '02:30 PM – 04:00 PM'
  ];

  /* --------------------------------------------------------------------------
     4. NEWS & ARTICLES CATALOG
     -------------------------------------------------------------------------- */
  const NEWS_ARTICLES = [
    {
      id: 'article-1',
      title: 'New Traffic Regulations & Smart Points System Effective This Month',
      category: 'regulations',
      categoryLabel: 'New Regulations',
      date: '15 Oct 2024',
      author: 'Department of Public Safety',
      readTime: '4 min read',
      image: 'assets/images/news/updated_fees.png',
      summary: 'The Ministry of Interior announces the nationwide rollout of the digitized driving license points deduction framework.',
      content: `
        <p>The Driving & Vehicle License Department (Licentra) has officially inaugurated the unified digital points enforcement system across all governorates in Egypt. Under the amended executive regulations, every newly issued smart driving license starts with an allocation of 50 digital merit points.</p>
        <h3>Key Pillars of the Unified Points System</h3>
        <p>The revised framework categorizes moving violations into five statutory grades, ranging from simple administrative lapses to serious public safety hazards:</p>
        <ul>
          <li><strong>Grade 1 (Minor Infractions):</strong> Deducts 1 point for non-functioning indicator lamps or parking in non-designated spots.</li>
          <li><strong>Grade 2 (Moving Violations):</strong> Deducts 2 points for failure to fasten seatbelts or handheld mobile telephone operation while moving.</li>
          <li><strong>Grade 3 (Safety Hazards):</strong> Deducts 3 points for exceeding posted speed limits by more than 20 km/h.</li>
          <li><strong>Grade 4 & 5 (Critical Violations):</strong> Deducts 4 to 5 points for reckless lane weaving, driving under the influence, or driving against traffic flow (Aks El-Ettegah).</li>
        </ul>
        <div class="article-quote-box">
          "The objective of our modernization roadmap is not punitive, but educational. By giving drivers clear visibility over their record via the Licentra citizen portal, we foster a culture of voluntary compliance and mutual respect on Egyptian roads."
          <div class="mt-2 text-red fw-bold">— General Directorate of Traffic Engineering</div>
        </div>
        <p>Citizens can monitor their active point balance, review citations, and schedule mandatory remedial safety refresher courses directly through the newly launched Licentra online portal.</p>
      `,
      relatedIds: ['article-2', 'article-3']
    },
    {
      id: 'article-2',
      title: '10 Essential Driving Safety Tips for New and Novice Drivers',
      category: 'safety',
      categoryLabel: 'Road Safety',
      date: '10 Oct 2024',
      author: 'Licentra Driver Training Academy',
      readTime: '5 min read',
      image: 'assets/images/news/safety_tips.png',
      summary: 'Practical guidance for newly licensed drivers on highway navigation, defensive driving techniques, and weather hazards.',
      content: `
        <p>Transitioning from a supervised learner permit to independent driving is a significant milestone. To assist novice motorists in navigating Cairo's busy thoroughfares and intercity highways safely, Licentra instructors have assembled ten indispensable rules of defensive road craft.</p>
        <h3>1. Master the 3-Second Following Rule</h3>
        <p>Always maintain a minimum of three seconds of buffer distance behind the vehicle ahead. In adverse weather such as seasonal winter rains or desert fog on the Cairo-Alexandria Desert Road, increase this buffer to five seconds.</p>
        <h3>2. Adjust Your Side Mirrors Correctly</h3>
        <p>Eliminate blind spots by positioning side mirrors so you only see the rear edge of your vehicle when you lean slightly. Glance over your shoulder before executing any lane maneuver.</p>
        <h3>3. Avoid Aggressive Braking at High Speeds</h3>
        <p>Look two to three vehicles ahead rather than fixating solely on the bumper in front of you. Anticipating slowing traffic allows you to apply progressive, gentle braking, preventing rear-end collisions.</p>
      `,
      relatedIds: ['article-1', 'article-4']
    },
    {
      id: 'article-3',
      title: 'Upcoming Streamlining of Online License Renewal Procedures',
      category: 'service',
      categoryLabel: 'Service Updates',
      date: '05 Oct 2024',
      author: 'Digital Transformation Bureau',
      readTime: '3 min read',
      image: 'assets/images/news/renewal_online.png',
      summary: 'License renewal is now 100% contactless with automatic prosecution fine clearance and doorstep smart card delivery.',
      content: `
        <p>As part of Egypt's comprehensive Vision 2030 digital government transformation, Licentra has upgraded its end-to-end online renewal gateway. Drivers holding Class 3 private licenses can now conclude their renewal in under five minutes from home.</p>
        <p>The upgraded infrastructure links directly with the Public Prosecution database to retrieve digital clearance certificates (Shahadet Baraa) without requiring a visit to local court offices. Furthermore, partnerships with Egypt Post enable secure doorstep delivery within 48 hours of application submission.</p>
      `,
      relatedIds: ['article-1', 'article-5']
    },
    {
      id: 'article-4',
      title: 'Road Safety Awareness Campaign Launched for National Secondary Schools',
      category: 'events',
      categoryLabel: 'Events',
      date: '28 Sep 2024',
      author: 'Public Relations Directorate',
      readTime: '4 min read',
      image: 'assets/images/news/practical_tracks.png',
      summary: 'Interactive workshops and driving simulator sessions hosted across governorates to educate young upcoming drivers.',
      content: `
        <p>Licentra, in collaboration with the Ministry of Education, has initiated a nationwide outreach initiative targeted at high school and university students preparing to reach the legal driving age of 18.</p>
        <p>The campaign features virtual reality driving simulators replicating complex traffic scenarios, hazard perception workshops, and live demonstrations on the importance of seatbelts and speed compliance.</p>
      `,
      relatedIds: ['article-2', 'article-6']
    },
    {
      id: 'article-5',
      title: 'Extended Operating Hours Announced for Regional Test Centers',
      category: 'announcement',
      categoryLabel: 'Announcements',
      date: '20 Sep 2024',
      author: 'Operations Command',
      readTime: '2 min read',
      image: 'assets/images/news/extended_hours.png',
      summary: 'Cairo Main Center and Giza October Center will now operate evening shifts from 4:00 PM to 8:00 PM to accommodate working citizens.',
      content: `
        <p>To reduce wait times and better serve working professionals, Licentra executive management has authorized extended evening operations across primary testing facilities in Cairo and Giza.</p>
        <p>Evening sessions will handle computer theory examinations, vision screening, and license card pickup. Citizens can reserve evening slots through the Licentra booking calendar.</p>
      `,
      relatedIds: ['article-3', 'article-1']
    },
    {
      id: 'article-6',
      title: 'Comprehensive Guide: Applying for an International Driving Permit',
      category: 'regulations',
      categoryLabel: 'Regulations',
      date: '12 Sep 2024',
      author: 'International Relations Section',
      readTime: '4 min read',
      image: 'assets/images/news/international_license.png',
      summary: 'Everything travelers need to know before driving abroad: UN Geneva conventions, accepted destinations, and required paperwork.',
      content: `
        <p>Planning an overseas vacation or international business trip? Holding an official International Driving Permit (IDP) is essential for renting motor vehicles and staying compliant with local laws in more than 150 foreign jurisdictions.</p>
        <p>The IDP translates your Egyptian driver license into ten international languages (English, French, Spanish, Russian, Chinese, German, Italian, Arabic, Portuguese, and Scandinavian). Permits are issued on the same day at accredited Licentra centers.</p>
      `,
      relatedIds: ['article-1', 'article-3']
    }
  ];

  /* --------------------------------------------------------------------------
     5. EVENTS CATALOG
     -------------------------------------------------------------------------- */
  const EVENTS = [
    {
      id: 'event-1',
      title: 'Road Safety Awareness Workshop',
      date: '25 Oct 2024',
      dateNum: '25',
      dateMonth: 'Oct 2024',
      time: '10:00 AM – 01:00 PM',
      location: 'Cairo Main Center Auditorium, Nasr City',
      totalSeats: 120,
      description: 'An interactive 3-hour seminar led by senior traffic engineers and emergency medical personnel. Covers hazard anticipation, high-speed highway maneuvering, and practical vehicle inspection tips.',
      speaker: 'Brigadier Gen. Tarek El-Sayed & Eng. Mona Mansour'
    },
    {
      id: 'event-2',
      title: 'Free Vision & Medical Screening Campaign',
      date: '10 Nov 2024',
      dateNum: '10',
      dateMonth: 'Nov 2024',
      time: '09:00 AM – 03:00 PM',
      location: 'Giza 6th of October Center Clinic',
      totalSeats: 250,
      description: 'Comprehensive complimentary visual acuity, color perception, and optical health screenings for all license applicants and renewing drivers.',
      speaker: 'Consultant Dr. Ahmed Khaled, Head of Traffic Medical Unit'
    },
    {
      id: 'event-3',
      title: 'New Drivers Orientation & Track Demonstration',
      date: '20 Nov 2024',
      dateNum: '20',
      dateMonth: 'Nov 2024',
      time: '11:00 AM – 02:00 PM',
      location: 'Alexandria Smouha Driving Academy',
      totalSeats: 80,
      description: 'Hands-on track demonstration showing candidates exactly how parallel parking and S-curve sensors evaluate practical driving examinations.',
      speaker: 'Chief Examiner Karim Tarek'
    }
  ];

  /* --------------------------------------------------------------------------
     6. PERSISTENCE HELPERS
     -------------------------------------------------------------------------- */
  function loadJSON(key, defaultVal) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultVal;
    } catch (e) {
      console.warn(`[Licentra DB] Failed reading ${key}:`, e);
      return defaultVal;
    }
  }

  function saveJSON(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      return true;
    } catch (e) {
      console.error(`[Licentra DB] Failed saving ${key}:`, e);
      return false;
    }
  }

  // Pre-seed Demo Users & State if empty
  function initPreSeededData() {
    let users = loadJSON(KEYS.USERS, []);
    const demoUsers = [
      {
        id: 'usr_admin',
        fullName: 'Eng. Mona Ali',
        email: 'admin@licentra.gov.eg',
        phone: '+20 100 000 0001',
        nationalId: '28001010100001',
        passwordHash: 'AdminPassword123!',
        role: 'admin',
        title: 'System Administrator',
        governorate: 'Cairo',
        address: 'Licentra HQ, Nasr City, Cairo',
        createdAt: '2024-01-01T08:00:00.000Z'
      },
      {
        id: 'usr_001',
        fullName: 'Ahmed Ali Hassan',
        email: 'ahmed.ali@example.com',
        phone: '+20 101 234 5678',
        nationalId: '29504150102345',
        passwordHash: 'Password123!',
        role: 'citizen',
        governorate: 'Cairo',
        address: '15 El-Tayaran St., Nasr City, Cairo',
        dateOfBirth: '1995-04-15',
        gender: 'male',
        status: 'active',
        createdAt: '2024-01-15T10:00:00.000Z'
      },
      {
        id: 'usr_002',
        fullName: 'Noura Mohamed Ahmed',
        email: 'noura.m@gmail.com',
        phone: '+20 123 456 7890',
        alternatePhone: '+20 112 345 6789',
        nationalId: '2987654321',
        passwordHash: 'Password123!',
        role: 'citizen',
        governorate: 'Cairo',
        address: 'Nasr City, Cairo, Egypt',
        dateOfBirth: '2000-01-12',
        gender: 'female',
        nationality: 'Egyptian',
        status: 'active',
        createdAt: '2024-02-10T11:00:00.000Z'
      },
      {
        id: 'usr_003',
        fullName: 'Sara Mohamed Tarek',
        email: 'sara.mohamed@example.com',
        phone: '+20 112 345 6789',
        nationalId: '29808200109876',
        passwordHash: 'Licentra2024!',
        role: 'citizen',
        governorate: 'Giza',
        address: '6th of October City, Giza',
        dateOfBirth: '1998-08-20',
        gender: 'female',
        status: 'active',
        createdAt: '2024-02-20T12:00:00.000Z'
      }
    ];

    if (!users || users.length === 0) {
      users = demoUsers;
      saveJSON(KEYS.USERS, users);
    } else {
      // Ensure admin and demo accounts always exist
      demoUsers.forEach(du => {
        if (!users.find(u => u.email.toLowerCase() === du.email.toLowerCase())) {
          users.push(du);
        }
      });
      saveJSON(KEYS.USERS, users);
    }

    // Seed Applications
    let apps = loadJSON(KEYS.APPLICATIONS, []);
    const demoApps = [
      // Applications for Noura Mohamed
      {
        id: 'APP-2024-001',
        userEmail: 'noura.m@gmail.com',
        serviceId: 'first-license',
        serviceName: 'First Driving License',
        licenseClass: 'Class 3 - Private Car',
        licenseClassCode: 'Class 3',
        applicationType: 'New License',
        applicantName: 'Noura Mohamed Ahmed',
        nationalId: '2987654321',
        phone: '+20 123 456 7890',
        dateOfBirth: '12 Jan 2000',
        address: 'Nasr City, Cairo',
        status: 'Under Review',
        submittedAt: '2024-10-15T10:30:00.000Z',
        submissionDate: '15 Oct 2024',
        feePaid: 'EGP 830',
        documents: ['National_ID.pdf', 'Medical_Report.pdf', 'Personal_Photo.jpg']
      },
      {
        id: 'APP-2024-002',
        userEmail: 'noura.m@gmail.com',
        serviceId: 'first-license',
        serviceName: 'Light Motorcycle License',
        licenseClass: 'Class 1 - Motorcycle',
        licenseClassCode: 'Class 1',
        applicationType: 'New License',
        applicantName: 'Noura Mohamed Ahmed',
        nationalId: '2987654321',
        phone: '+20 123 456 7890',
        status: 'Approved',
        submittedAt: '2024-10-02T09:15:00.000Z',
        submissionDate: '02 Oct 2024',
        feePaid: 'EGP 515',
        documents: ['National_ID.pdf', 'Medical_Report.pdf']
      },
      {
        id: 'APP-2024-003',
        userEmail: 'noura.m@gmail.com',
        serviceId: 'renewal',
        serviceName: 'License Renewal',
        licenseClass: 'Class 6 - Bus',
        licenseClassCode: 'Class 6',
        applicationType: 'Renewal',
        applicantName: 'Noura Mohamed Ahmed',
        nationalId: '2987654321',
        phone: '+20 123 456 7890',
        status: 'In Progress',
        submittedAt: '2024-09-18T14:20:00.000Z',
        submissionDate: '18 Sep 2024',
        feePaid: 'EGP 850',
        documents: ['Expired_License.pdf', 'Fine_Clearance.pdf']
      },
      {
        id: 'APP-2024-004',
        userEmail: 'noura.m@gmail.com',
        serviceId: 'class-upgrade',
        serviceName: 'License Upgrade',
        licenseClass: 'Class 7 - Heavy Vehicle',
        licenseClassCode: 'Class 7',
        applicationType: 'New License',
        applicantName: 'Noura Mohamed Ahmed',
        nationalId: '2987654321',
        phone: '+20 123 456 7890',
        status: 'Rejected',
        rejectionReason: 'Prerequisite holding period of 3 years on Class 3 not yet satisfied.',
        submittedAt: '2024-09-10T11:00:00.000Z',
        submissionDate: '10 Sep 2024',
        feePaid: 'EGP 1300',
        documents: ['National_ID.pdf']
      },
      {
        id: 'APP-2024-005',
        userEmail: 'noura.m@gmail.com',
        serviceId: 'replacement',
        serviceName: 'Replacement of Damaged License',
        licenseClass: 'Class 4 - Taxi / Limousine',
        licenseClassCode: 'Class 4',
        applicationType: 'Replacement',
        applicantName: 'Noura Mohamed Ahmed',
        nationalId: '2987654321',
        phone: '+20 123 456 7890',
        status: 'Approved',
        submittedAt: '2024-08-25T16:45:00.000Z',
        submissionDate: '25 Aug 2024',
        feePaid: 'EGP 450',
        documents: ['Damaged_Card_Scan.pdf', 'National_ID.pdf']
      },
      // Applications for Ahmed Ali
      {
        id: 'LIC-APP-84920',
        userEmail: 'ahmed.ali@example.com',
        serviceId: 'first-license',
        serviceName: 'First Driving License',
        licenseClass: 'Class 3 - Private Vehicle',
        licenseClassCode: 'Class 3',
        applicationType: 'New License',
        applicantName: 'Ahmed Ali Hassan',
        nationalId: '29504150102345',
        phone: '+20 101 234 5678',
        status: 'Under Review',
        submittedAt: '2024-10-18T10:30:00.000Z',
        submissionDate: '18 Oct 2024',
        feePaid: 'EGP 830',
        documents: ['National_ID.pdf', 'Medical_Report_287B.pdf', 'Personal_Photo.jpg']
      },
      // System & Admin Demo Applications (matching UI reference screens)
      {
        id: 'LIC-APP-1258',
        userEmail: 'ahmed.m@gmail.com',
        serviceId: 'first-license',
        serviceName: 'First Driving License',
        licenseClass: 'Class 3 - Private Car',
        licenseClassCode: 'Class 3',
        applicationType: 'New License',
        applicantName: 'Ahmed Mohamed',
        nationalId: '2987654321',
        phone: '+20 12 3456 7890',
        dateOfBirth: '12 Jan 2000',
        address: 'Nasr City, Cairo',
        status: 'Under Review',
        submittedAt: '2024-10-15T10:30:00.000Z',
        submissionDate: '15 Oct 2024',
        feePaid: 'EGP 830',
        documents: ['National_ID.pdf', 'Medical_Certificate.pdf', 'Personal_Photo.jpg']
      },
      {
        id: 'LIC-APP-1257',
        userEmail: 'sara.ali@gmail.com',
        serviceId: 'renewal',
        serviceName: 'License Renewal',
        licenseClass: 'Class 1 - Motorcycle',
        licenseClassCode: 'Class 1',
        applicationType: 'Renewal',
        applicantName: 'Sara Ali',
        nationalId: '3012345678',
        phone: '+20 10 9876 5432',
        status: 'Approved',
        submittedAt: '2024-10-15T09:00:00.000Z',
        submissionDate: '15 Oct 2024',
        feePaid: 'EGP 515',
        documents: ['Expired_License.pdf', 'Medical_Report.pdf']
      },
      {
        id: 'LIC-APP-1256',
        userEmail: 'omar.k@gmail.com',
        serviceId: 'first-license',
        serviceName: 'Bus Driver License',
        licenseClass: 'Class 6 - Passenger Bus',
        licenseClassCode: 'Class 6',
        applicationType: 'New License',
        applicantName: 'Omar Khaled',
        nationalId: '2876543210',
        phone: '+20 11 2233 4455',
        status: 'Pending Payment',
        submittedAt: '2024-10-14T15:20:00.000Z',
        submissionDate: '14 Oct 2024',
        feePaid: 'Pending',
        documents: ['National_ID.pdf', 'Background_Check.pdf']
      },
      {
        id: 'LIC-APP-1255',
        userEmail: 'nourhan.m@gmail.com',
        serviceId: 'replacement',
        serviceName: 'Replacement License',
        licenseClass: 'Class 3 - Private Car',
        licenseClassCode: 'Class 3',
        applicationType: 'Replacement',
        applicantName: 'Nourhan Mostafa',
        nationalId: '3123456789',
        phone: '+20 12 8899 0011',
        status: 'Approved',
        submittedAt: '2024-10-14T11:45:00.000Z',
        submissionDate: '14 Oct 2024',
        feePaid: 'EGP 450',
        documents: ['Police_Report.pdf', 'National_ID.pdf']
      },
      {
        id: 'LIC-APP-1254',
        userEmail: 'm.hassan@gmail.com',
        serviceId: 'international',
        serviceName: 'International Permit',
        licenseClass: 'Class 7 - Heavy Vehicle',
        licenseClassCode: 'Class 7',
        applicationType: 'International',
        applicantName: 'Mohamed Hassan',
        nationalId: '2987654098',
        phone: '+20 10 5544 3322',
        status: 'Rejected',
        rejectionReason: 'Invalid passport expiration date or incomplete visa documents.',
        submittedAt: '2024-10-13T16:10:00.000Z',
        submissionDate: '13 Oct 2024',
        feePaid: 'EGP 950',
        documents: ['Passport_Scan.pdf', 'National_License.pdf']
      },
      {
        id: 'LIC-APP-1253',
        userEmail: 'laila.h@gmail.com',
        serviceId: 'renewal',
        serviceName: 'License Renewal',
        licenseClass: 'Class 1 - Motorcycle',
        licenseClassCode: 'Class 1',
        applicationType: 'Renewal',
        applicantName: 'Laila Hassan',
        nationalId: '3056781234',
        phone: '+20 15 6677 8899',
        status: 'Under Review',
        submittedAt: '2024-10-13T14:30:00.000Z',
        submissionDate: '13 Oct 2024',
        feePaid: 'EGP 515',
        documents: ['Medical_Report.pdf', 'National_ID.pdf']
      },
      {
        id: 'LIC-APP-1252',
        userEmail: 'youssef.a@gmail.com',
        serviceId: 'first-license',
        serviceName: 'Tractor Driver License',
        licenseClass: 'Class 5 - Agricultural',
        licenseClassCode: 'Class 5',
        applicationType: 'New License',
        applicantName: 'Youssef Ali',
        nationalId: '3120987654',
        phone: '+20 11 4455 6677',
        status: 'Approved',
        submittedAt: '2024-10-12T13:00:00.000Z',
        submissionDate: '12 Oct 2024',
        feePaid: 'EGP 650',
        documents: ['Agricultural_Clearance.pdf', 'National_ID.pdf']
      },
      {
        id: 'LIC-APP-1251',
        userEmail: 'menna.k@gmail.com',
        serviceId: 'replacement',
        serviceName: 'Replacement License',
        licenseClass: 'Class 3 - Private Car',
        licenseClassCode: 'Class 3',
        applicationType: 'Replacement',
        applicantName: 'Menna Khaled',
        nationalId: '2876509876',
        phone: '+20 12 3344 5566',
        status: 'Pending Payment',
        submittedAt: '2024-10-12T10:15:00.000Z',
        submissionDate: '12 Oct 2024',
        feePaid: 'Pending',
        documents: ['Declaration_Lost_Card.pdf']
      }
    ];

    if (!apps || apps.length === 0) {
      apps = demoApps;
      saveJSON(KEYS.APPLICATIONS, apps);
    } else {
      demoApps.forEach(da => {
        if (!apps.find(a => a.id === da.id)) {
          apps.push(da);
        }
      });
      saveJSON(KEYS.APPLICATIONS, apps);
    }

    // Seed Driving Licenses
    let licenses = loadJSON(KEYS.LICENSES, []);
    const demoLicenses = [
      {
        id: 'LIC-EG-2987654321',
        userEmail: 'noura.m@gmail.com',
        licenseNumber: 'EG-2987654321',
        holderName: 'Noura Mohamed Ahmed',
        nationalId: '2987654321',
        licenseClassId: 'class-3',
        licenseClass: 'Class 3 - Private Car',
        licenseCategory: 'Personal Car',
        issueDate: '2023-03-15',
        expiryDate: '2033-03-15',
        issuingAuthority: 'Egyptian Traffic Department (Nasr City Unit)',
        status: 'Active',
        bloodGroup: 'O+',
        qrCode: 'LIC-EG-2987654321-2033-CLASS3',
        daysToExpiry: 3050
      },
      {
        id: 'LIC-EG-1122334455',
        userEmail: 'noura.m@gmail.com',
        licenseNumber: 'EG-1122334455',
        holderName: 'Noura Mohamed Ahmed',
        nationalId: '2987654321',
        licenseClassId: 'class-1',
        licenseClass: 'Class 1 - Light Motorcycle',
        licenseCategory: 'Personal Motorcycle',
        issueDate: '2020-01-10',
        expiryDate: '2030-01-10',
        issuingAuthority: 'Egyptian Traffic Department',
        status: 'Active',
        bloodGroup: 'O+',
        qrCode: 'LIC-EG-1122334455-2030-CLASS1',
        daysToExpiry: 1160
      },
      {
        id: 'LIC-EG-2950415010',
        userEmail: 'ahmed.ali@example.com',
        licenseNumber: 'EG-2950415010',
        holderName: 'Ahmed Ali Hassan',
        nationalId: '29504150102345',
        licenseClassId: 'class-3',
        licenseClass: 'Class 3 - Private Car',
        licenseCategory: 'Personal Car',
        issueDate: '2022-02-01',
        expiryDate: '2032-02-01',
        issuingAuthority: 'Egyptian Traffic Department',
        status: 'Active',
        bloodGroup: 'A+',
        qrCode: 'LIC-EG-2950415010-2032-CLASS3',
        daysToExpiry: 2275
      }
    ];

    if (!licenses || licenses.length === 0) {
      licenses = demoLicenses;
      saveJSON(KEYS.LICENSES, licenses);
    } else {
      demoLicenses.forEach(dl => {
        if (!licenses.find(l => l.id === dl.id)) {
          licenses.push(dl);
        }
      });
      saveJSON(KEYS.LICENSES, licenses);
    }

    // Seed Test Bookings
    let bookings = loadJSON(KEYS.BOOKINGS, []);
    const demoBookings = [
      // Noura Mohamed's bookings
      {
        id: 'BK-OCT-2024-01',
        userEmail: 'noura.m@gmail.com',
        applicantName: 'Noura Mohamed Ahmed',
        nationalId: '2987654321',
        testType: 'Practical Test',
        licenseClass: 'Class 3 - Private Car',
        center: 'Nasr City Test Center',
        date: '2024-10-20',
        timeSlot: '09:00 AM - 10:30 AM',
        status: 'Confirmed',
        bookedAt: '2024-10-14T14:15:00.000Z'
      },
      {
        id: 'BK-SEP-2024-02',
        userEmail: 'noura.m@gmail.com',
        applicantName: 'Noura Mohamed Ahmed',
        nationalId: '2987654321',
        testType: 'Theory Test',
        licenseClass: 'Class 3 - Private Car',
        center: 'Nasr City Test Center',
        date: '2024-09-15',
        timeSlot: '10:00 AM - 11:00 AM',
        status: 'Completed',
        score: '36/40',
        passed: true,
        bookedAt: '2024-09-01T10:00:00.000Z'
      },
      {
        id: 'BK-AUG-2024-03',
        userEmail: 'noura.m@gmail.com',
        applicantName: 'Noura Mohamed Ahmed',
        nationalId: '2987654321',
        testType: 'Practical Test',
        licenseClass: 'Class 3 - Private Car',
        center: '6th October Test Center',
        date: '2024-08-10',
        timeSlot: '01:00 PM - 02:30 PM',
        status: 'Cancelled',
        bookedAt: '2024-08-01T09:30:00.000Z'
      },
      {
        id: 'BK-JUL-2024-04',
        userEmail: 'noura.m@gmail.com',
        applicantName: 'Noura Mohamed Ahmed',
        nationalId: '2987654321',
        testType: 'Theory Test',
        licenseClass: 'Class 3 - Private Car',
        center: 'Alexandria Test Center',
        date: '2024-07-12',
        timeSlot: '10:00 AM - 11:00 AM',
        status: 'Completed',
        score: '34/40',
        passed: true,
        bookedAt: '2024-07-01T11:00:00.000Z'
      },
      // Ahmed Ali Hassan booking
      {
        id: 'BK-74829',
        userEmail: 'ahmed.ali@example.com',
        applicantName: 'Ahmed Ali Hassan',
        nationalId: '29504150102345',
        testType: 'Theory Test',
        licenseClass: 'Class 3 (Private Vehicle)',
        center: 'Cairo Main Center',
        date: '2024-11-20',
        timeSlot: '10:30 AM – 12:00 PM',
        status: 'Confirmed',
        bookedAt: '2024-10-19T14:15:00.000Z'
      },
      // System & Admin appointments
      {
        id: 'BK-T458',
        userEmail: 'ahmed.m@gmail.com',
        applicantName: 'Ahmed Mohamed',
        nationalId: '2987654321',
        testType: 'Theory',
        licenseClass: 'Class 3',
        center: 'Cairo Main Test Center',
        date: '2024-10-15',
        timeSlot: '08:00 AM - 09:30 AM',
        status: 'Scheduled',
        bookedAt: '2024-10-01T08:00:00.000Z'
      },
      {
        id: 'BK-T457',
        userEmail: 'sara.ali@gmail.com',
        applicantName: 'Sara Ali',
        nationalId: '3012345678',
        testType: 'Practical',
        licenseClass: 'Class 1',
        center: 'Cairo Main Test Center',
        date: '2024-10-15',
        timeSlot: '09:30 AM - 11:00 AM',
        status: 'In Progress',
        bookedAt: '2024-10-02T09:00:00.000Z'
      },
      {
        id: 'BK-T456',
        userEmail: 'omar.k@gmail.com',
        applicantName: 'Omar Khaled',
        nationalId: '2876543210',
        testType: 'Practical',
        licenseClass: 'Class 3',
        center: 'Cairo Main Test Center',
        date: '2024-10-15',
        timeSlot: '11:00 AM - 12:30 PM',
        status: 'Scheduled',
        bookedAt: '2024-10-03T10:00:00.000Z'
      },
      {
        id: 'BK-T455',
        userEmail: 'nourhan.m@gmail.com',
        applicantName: 'Nourhan Mostafa',
        nationalId: '3123456789',
        testType: 'Theory',
        licenseClass: 'Class 5',
        center: 'Cairo Main Test Center',
        date: '2024-10-15',
        timeSlot: '01:00 PM - 02:30 PM',
        status: 'Completed',
        score: '38/40',
        passed: true,
        bookedAt: '2024-10-04T11:00:00.000Z'
      },
      {
        id: 'BK-T454',
        userEmail: 'm.hassan@gmail.com',
        applicantName: 'Mohamed Hassan',
        nationalId: '2987654098',
        testType: 'Practical',
        licenseClass: 'Class 3',
        center: 'Cairo Main Test Center',
        date: '2024-10-15',
        timeSlot: '02:30 PM - 04:00 PM',
        status: 'Scheduled',
        bookedAt: '2024-10-05T12:00:00.000Z'
      }
    ];

    if (!bookings || bookings.length === 0) {
      bookings = demoBookings;
      saveJSON(KEYS.BOOKINGS, bookings);
    } else {
      demoBookings.forEach(dbk => {
        if (!bookings.find(b => b.id === dbk.id)) {
          bookings.push(dbk);
        }
      });
      saveJSON(KEYS.BOOKINGS, bookings);
    }

    // Seed Notifications
    let notifs = loadJSON(KEYS.NOTIFICATIONS, []);
    const demoNotifs = [
      {
        id: 'NOTIF-01',
        userEmail: 'noura.m@gmail.com',
        title: 'Application Approved',
        message: 'Your application for Class 3 - Private Car has been approved by the department.',
        type: 'application',
        timeAgo: '2 hours ago',
        isNew: true,
        isRead: false,
        createdAt: '2024-10-15T08:00:00.000Z'
      },
      {
        id: 'NOTIF-02',
        userEmail: 'noura.m@gmail.com',
        title: 'Test Appointment Reminder',
        message: 'You have a practical track test scheduled tomorrow at 09:00 AM at Nasr City Center.',
        type: 'appointment',
        timeAgo: '5 hours ago',
        isNew: true,
        isRead: false,
        createdAt: '2024-10-15T05:00:00.000Z'
      },
      {
        id: 'NOTIF-03',
        userEmail: 'noura.m@gmail.com',
        title: 'License Ready for Collection',
        message: 'Your official driving license card is ready for collection at the Nasr City Branch.',
        type: 'license',
        timeAgo: '1 day ago',
        isNew: false,
        isRead: false,
        createdAt: '2024-10-14T09:00:00.000Z'
      },
      {
        id: 'NOTIF-04',
        userEmail: 'noura.m@gmail.com',
        title: 'Payment Confirmation',
        message: 'Your statutory fee payment of EGP 600 has been received and verified successfully.',
        type: 'payment',
        timeAgo: '2 days ago',
        isNew: false,
        isRead: true,
        createdAt: '2024-10-13T10:00:00.000Z'
      },
      {
        id: 'NOTIF-05',
        userEmail: 'noura.m@gmail.com',
        title: 'System Maintenance Notice',
        message: 'Licentra portal will undergo scheduled database maintenance on 28 Oct from 12:00 AM to 4:00 AM.',
        type: 'system',
        timeAgo: '1 week ago',
        isNew: false,
        isRead: true,
        createdAt: '2024-10-08T12:00:00.000Z'
      }
    ];

    if (!notifs || notifs.length === 0) {
      notifs = demoNotifs;
      saveJSON(KEYS.NOTIFICATIONS, notifs);
    } else {
      demoNotifs.forEach(dn => {
        if (!notifs.find(n => n.id === dn.id)) {
          notifs.push(dn);
        }
      });
      saveJSON(KEYS.NOTIFICATIONS, notifs);
    }

    // Seed Recent Activities
    let activities = loadJSON(KEYS.ACTIVITIES, []);
    const demoActivities = [
      {
        id: 'ACT-01',
        userEmail: 'noura.m@gmail.com',
        title: 'Application submitted',
        subtitle: 'Class 3 - Private Car',
        dateText: '15 Oct 2024, 10:30 AM',
        icon: 'bi-car-front-fill',
        color: 'text-primary'
      },
      {
        id: 'ACT-02',
        userEmail: 'noura.m@gmail.com',
        title: 'Payment completed',
        subtitle: 'EGP 830 – Statutory Licensing Fee',
        dateText: '15 Oct 2024, 10:25 AM',
        icon: 'bi-credit-card-fill',
        color: 'text-success'
      },
      {
        id: 'ACT-03',
        userEmail: 'noura.m@gmail.com',
        title: 'Test appointment booked',
        subtitle: 'Nasr City Test Center – 20 Oct 2024',
        dateText: '14 Oct 2024, 02:15 PM',
        icon: 'bi-calendar-check-fill',
        color: 'text-danger'
      },
      {
        id: 'ACT-04',
        userEmail: 'noura.m@gmail.com',
        title: 'Document verified',
        subtitle: 'National ID & Medical Certificate 287-B',
        dateText: '14 Oct 2024, 11:20 AM',
        icon: 'bi-file-earmark-check-fill',
        color: 'text-success'
      }
    ];

    if (!activities || activities.length === 0) {
      activities = demoActivities;
      saveJSON(KEYS.ACTIVITIES, activities);
    } else {
      demoActivities.forEach(da => {
        if (!activities.find(a => a.id === da.id)) {
          activities.push(da);
        }
      });
      saveJSON(KEYS.ACTIVITIES, activities);
    }
  }

  initPreSeededData();

  /* --------------------------------------------------------------------------
     7. PUBLIC REPOSITORY API
     -------------------------------------------------------------------------- */
  const db = {
    // Catalogs
    getServices: () => SERVICES,
    getServiceById: (id) => SERVICES.find(s => s.id === id) || null,
    getClasses: () => CLASSES,
    getClassById: (id) => CLASSES.find(c => c.id === id) || null,
    getDrivingTests: () => DRIVING_TESTS,
    getDrivingTestById: (id) => DRIVING_TESTS[id] || null,
    getTestCenters: () => TEST_CENTERS,
    getTimeSlots: () => TIME_SLOTS,
    getNews: () => NEWS_ARTICLES,
    getNewsById: (id) => NEWS_ARTICLES.find(n => n.id === id) || null,
    getEvents: () => EVENTS,
    getEventById: (id) => EVENTS.find(e => e.id === id) || null,

    // Users & Auth
    getUsers: () => loadJSON(KEYS.USERS, []),
    findUserByEmail: (email) => {
      if (!email) return null;
      const clean = email.trim().toLowerCase();
      return loadJSON(KEYS.USERS, []).find(u => u.email.toLowerCase() === clean) || null;
    },
    findUserByNationalId: (nid) => {
      if (!nid) return null;
      const clean = nid.trim();
      return loadJSON(KEYS.USERS, []).find(u => u.nationalId === clean) || null;
    },
    createUser: (userData) => {
      const users = loadJSON(KEYS.USERS, []);
      const newUser = {
        id: 'usr_' + Date.now(),
        fullName: userData.fullName.trim(),
        email: userData.email.trim().toLowerCase(),
        phone: userData.phone.trim(),
        nationalId: userData.nationalId.trim(),
        passwordHash: userData.password,
        role: 'citizen',
        createdAt: new Date().toISOString()
      };
      users.push(newUser);
      saveJSON(KEYS.USERS, users);
      return newUser;
    },
    updateUserPassword: (email, newPassword) => {
      const users = loadJSON(KEYS.USERS, []);
      const user = users.find(u => u.email.toLowerCase() === email.trim().toLowerCase());
      if (user) {
        user.passwordHash = newPassword;
        saveJSON(KEYS.USERS, users);
        return true;
      }
      return false;
    },

    // Session State
    getCurrentUser: () => {
      try {
        const local = localStorage.getItem(KEYS.SESSION);
        if (local) return JSON.parse(local);
        const session = sessionStorage.getItem(KEYS.SESSION);
        if (session) return JSON.parse(session);
      } catch (e) {}
      return null;
    },
    setCurrentUser: (user, rememberMe = true) => {
      const data = JSON.stringify(user);
      if (rememberMe) {
        localStorage.setItem(KEYS.SESSION, data);
        sessionStorage.removeItem(KEYS.SESSION);
      } else {
        sessionStorage.setItem(KEYS.SESSION, data);
        localStorage.removeItem(KEYS.SESSION);
      }
      window.dispatchEvent(new CustomEvent('licentra:authstate', { detail: { user } }));
    },
    clearCurrentUser: () => {
      localStorage.removeItem(KEYS.SESSION);
      sessionStorage.removeItem(KEYS.SESSION);
      window.dispatchEvent(new CustomEvent('licentra:authstate', { detail: { user: null } }));
    },

    // Applications
    getApplications: (userEmail) => {
      const all = loadJSON(KEYS.APPLICATIONS, []);
      if (!userEmail) return all;
      return all.filter(a => a.userEmail.toLowerCase() === userEmail.toLowerCase());
    },
    getApplicationById: (appId) => {
      return loadJSON(KEYS.APPLICATIONS, []).find(a => a.id === appId) || null;
    },
    submitApplication: (appData) => {
      const all = loadJSON(KEYS.APPLICATIONS, []);
      const newApp = {
        id: 'LIC-APP-' + Math.floor(10000 + Math.random() * 90000),
        userEmail: appData.userEmail || '',
        serviceId: appData.serviceId,
        serviceName: appData.serviceName,
        licenseClass: appData.licenseClass,
        applicantName: appData.applicantName,
        nationalId: appData.nationalId,
        phone: appData.phone,
        status: 'Under Review',
        submittedAt: new Date().toISOString(),
        feePaid: appData.feePaid || 'Paid Online',
        documents: appData.documents || ['National_ID.pdf', 'Medical_Report.pdf']
      };
      all.unshift(newApp);
      saveJSON(KEYS.APPLICATIONS, all);
      return newApp;
    },

    // Test Bookings
    getBookings: (userEmail) => {
      const all = loadJSON(KEYS.BOOKINGS, []);
      if (!userEmail) return all;
      return all.filter(b => b.userEmail && b.userEmail.toLowerCase() === userEmail.toLowerCase());
    },
    getBookingById: (id) => {
      return loadJSON(KEYS.BOOKINGS, []).find(b => b.id === id) || null;
    },
    createBooking: (bookingData) => {
      const all = loadJSON(KEYS.BOOKINGS, []);
      const newBooking = {
        id: 'BK-' + Math.floor(10000 + Math.random() * 90000),
        userEmail: bookingData.userEmail || '',
        applicantName: bookingData.applicantName || 'Citizen Applicant',
        nationalId: bookingData.nationalId || '',
        testType: bookingData.testType,
        licenseClass: bookingData.licenseClass || 'Class 3 (Private Vehicle)',
        center: bookingData.center,
        date: bookingData.date,
        timeSlot: bookingData.timeSlot,
        status: 'Confirmed',
        bookedAt: new Date().toISOString()
      };
      all.unshift(newBooking);
      saveJSON(KEYS.BOOKINGS, all);
      return newBooking;
    },
    rescheduleBooking: (id, newDate, newSlot) => {
      const all = loadJSON(KEYS.BOOKINGS, []);
      const booking = all.find(b => b.id === id);
      if (booking) {
        booking.date = newDate;
        booking.timeSlot = newSlot;
        booking.status = 'Rescheduled';
        booking.updatedAt = new Date().toISOString();
        saveJSON(KEYS.BOOKINGS, all);
        return booking;
      }
      return null;
    },
    cancelBooking: (id) => {
      const all = loadJSON(KEYS.BOOKINGS, []);
      const booking = all.find(b => b.id === id);
      if (booking) {
        booking.status = 'Cancelled';
        booking.cancelledAt = new Date().toISOString();
        saveJSON(KEYS.BOOKINGS, all);
        return booking;
      }
      return null;
    },

    // Contact Messages
    saveContactMessage: (msg) => {
      const all = loadJSON(KEYS.INQUIRIES, []);
      const newMsg = {
        id: 'TKT-' + Math.floor(100000 + Math.random() * 900000),
        name: msg.name,
        email: msg.email,
        phone: msg.phone || '',
        subject: msg.subject,
        message: msg.message,
        createdAt: new Date().toISOString()
      };
      all.unshift(newMsg);
      saveJSON(KEYS.INQUIRIES, all);
      return newMsg;
    },

    // Newsletter
    subscribeNewsletter: (email) => {
      const clean = email.trim().toLowerCase();
      const subs = loadJSON(KEYS.NEWSLETTER, []);
      if (!subs.includes(clean)) {
        subs.push(clean);
        saveJSON(KEYS.NEWSLETTER, subs);
      }
      return true;
    },

    // Event Registrations
    registerForEvent: (reg) => {
      const all = loadJSON(KEYS.EVENT_REGS, []);
      const newReg = {
        id: 'EVT-REG-' + Math.floor(1000 + Math.random() * 9000),
        eventId: reg.eventId,
        eventTitle: reg.eventTitle,
        name: reg.name,
        email: reg.email,
        phone: reg.phone,
        seats: reg.seats || 1,
        registeredAt: new Date().toISOString()
      };
      all.unshift(newReg);
      saveJSON(KEYS.EVENT_REGS, all);
      return newReg;
    },

    // Driving Licenses
    getLicenses: (userEmail) => {
      const all = loadJSON(KEYS.LICENSES, []);
      if (!userEmail) return all;
      return all.filter(l => l.userEmail && l.userEmail.toLowerCase() === userEmail.toLowerCase());
    },
    getLicenseById: (id) => {
      return loadJSON(KEYS.LICENSES, []).find(l => l.id === id || l.licenseNumber === id) || null;
    },
    issueLicense: (licData) => {
      const all = loadJSON(KEYS.LICENSES, []);
      const newLic = {
        id: 'LIC-EG-' + Math.floor(1000000000 + Math.random() * 9000000000),
        userEmail: licData.userEmail,
        licenseNumber: 'EG-' + Math.floor(1000000000 + Math.random() * 9000000000),
        holderName: licData.holderName,
        nationalId: licData.nationalId,
        licenseClassId: licData.licenseClassId || 'class-3',
        licenseClass: licData.licenseClass || 'Class 3 - Private Car',
        licenseCategory: licData.licenseCategory || 'Personal Car',
        issueDate: new Date().toISOString().split('T')[0],
        expiryDate: new Date(Date.now() + 10 * 365.25 * 86400000).toISOString().split('T')[0],
        issuingAuthority: 'Egyptian Traffic Department (Nasr City Unit)',
        status: 'Active',
        bloodGroup: licData.bloodGroup || 'A+',
        qrCode: 'LIC-EG-ISSUED-' + Date.now(),
        daysToExpiry: 3650
      };
      all.unshift(newLic);
      saveJSON(KEYS.LICENSES, all);
      return newLic;
    },
    renewLicense: (renewalData) => {
      const all = loadJSON(KEYS.LICENSES, []);
      const lic = all.find(l => l.id === renewalData.licenseId || l.licenseNumber === renewalData.licenseNumber);
      if (lic) {
        lic.issueDate = new Date().toISOString().split('T')[0];
        lic.expiryDate = new Date(Date.now() + 10 * 365.25 * 86400000).toISOString().split('T')[0];
        lic.status = 'Active';
        lic.daysToExpiry = 3650;
        saveJSON(KEYS.LICENSES, all);
      }
      return lic;
    },
    requestReplacement: (repData) => {
      const all = loadJSON(KEYS.REPLACEMENTS, []);
      const newRep = {
        id: 'REP-' + Math.floor(10000 + Math.random() * 90000),
        userEmail: repData.userEmail,
        licenseNumber: repData.licenseNumber,
        reason: repData.reason || 'Damaged',
        policeReport: repData.policeReport || 'N/A',
        status: 'Under Review',
        requestedAt: new Date().toISOString()
      };
      all.unshift(newRep);
      saveJSON(KEYS.REPLACEMENTS, all);
      return newRep;
    },

    // Application Status Modification (Admin action)
    updateApplicationStatus: (appId, newStatus, reason = '') => {
      const all = loadJSON(KEYS.APPLICATIONS, []);
      const app = all.find(a => a.id === appId);
      if (app) {
        app.status = newStatus;
        if (reason) app.rejectionReason = reason;
        app.updatedAt = new Date().toISOString();
        saveJSON(KEYS.APPLICATIONS, all);

        // Also create a notification for the applicant
        if (app.userEmail) {
          db.addNotification({
            userEmail: app.userEmail,
            title: `Application ${newStatus}`,
            message: `Your application (${app.id} - ${app.licenseClass}) status has been updated to "${newStatus}".`,
            type: 'application',
            timeAgo: 'Just now'
          });
        }
        return app;
      }
      return null;
    },

    // Notifications
    getNotifications: (userEmail) => {
      const all = loadJSON(KEYS.NOTIFICATIONS, []);
      if (!userEmail) return all;
      return all.filter(n => !n.userEmail || n.userEmail.toLowerCase() === userEmail.toLowerCase());
    },
    addNotification: (notif) => {
      const all = loadJSON(KEYS.NOTIFICATIONS, []);
      const newNotif = {
        id: 'NOTIF-' + Date.now(),
        userEmail: notif.userEmail || '',
        title: notif.title,
        message: notif.message,
        type: notif.type || 'system',
        timeAgo: notif.timeAgo || 'Just now',
        isNew: true,
        isRead: false,
        createdAt: new Date().toISOString()
      };
      all.unshift(newNotif);
      saveJSON(KEYS.NOTIFICATIONS, all);
      return newNotif;
    },
    markNotificationRead: (id) => {
      const all = loadJSON(KEYS.NOTIFICATIONS, []);
      const notif = all.find(n => n.id === id);
      if (notif) {
        notif.isRead = true;
        notif.isNew = false;
        saveJSON(KEYS.NOTIFICATIONS, all);
        return true;
      }
      return false;
    },
    markAllNotificationsRead: (userEmail) => {
      const all = loadJSON(KEYS.NOTIFICATIONS, []);
      all.forEach(n => {
        if (!userEmail || (n.userEmail && n.userEmail.toLowerCase() === userEmail.toLowerCase())) {
          n.isRead = true;
          n.isNew = false;
        }
      });
      saveJSON(KEYS.NOTIFICATIONS, all);
      return true;
    },

    // Recent Activities
    getRecentActivities: (userEmail = null) => {
      const all = loadJSON(KEYS.ACTIVITIES, []);
      if (!userEmail) return all;
      return all.filter(a => !a.userEmail || a.userEmail.toLowerCase() === userEmail.toLowerCase());
    },
    addActivity: (act) => {
      const all = loadJSON(KEYS.ACTIVITIES, []);
      const newAct = {
        id: 'ACT-' + Date.now(),
        userEmail: act.userEmail || '',
        title: act.title,
        subtitle: act.subtitle || '',
        dateText: act.dateText || 'Just now',
        icon: act.icon || 'bi-info-circle-fill',
        color: act.color || 'text-primary'
      };
      all.unshift(newAct);
      saveJSON(KEYS.ACTIVITIES, all);
      return newAct;
    },

    // User Management (Admin)
    getAllUsers: () => loadJSON(KEYS.USERS, []),
    updateUser: (userId, updates) => {
      const users = loadJSON(KEYS.USERS, []);
      const user = users.find(u => u.id === userId || u.email.toLowerCase() === userId.toLowerCase());
      if (user) {
        Object.assign(user, updates);
        saveJSON(KEYS.USERS, users);
        return user;
      }
      return null;
    },

    // Aggregated Stats
    getAdminStats: () => {
      const users = loadJSON(KEYS.USERS, []);
      const apps = loadJSON(KEYS.APPLICATIONS, []);
      const licenses = loadJSON(KEYS.LICENSES, []);
      const bookings = loadJSON(KEYS.BOOKINGS, []);

      const pending = apps.filter(a => a.status === 'Under Review' || a.status === 'New').length;
      const approved = apps.filter(a => a.status === 'Approved').length;
      const rejected = apps.filter(a => a.status === 'Rejected').length;
      const upcomingTests = bookings.filter(b => b.status === 'Confirmed' || b.status === 'Scheduled').length;

      return {
        totalUsers: users.length + 500000,
        registeredUsersCount: users.length,
        totalApplications: apps.length + 2570,
        pendingApplications: pending + 735,
        approvedApplications: approved + 1415,
        rejectedApplications: rejected + 310,
        issuedLicenses: licenses.length + 1960,
        upcomingTests: upcomingTests + 480,
        passRate: 81
      };
    },

    getUserStats: (userEmail) => {
      const apps = db.getApplications(userEmail);
      const licenses = db.getLicenses(userEmail);
      const bookings = db.getBookings(userEmail);
      const notifs = db.getNotifications(userEmail);

      return {
        totalApplications: apps.length,
        approvedApplications: apps.filter(a => a.status === 'Approved').length,
        inProgressApplications: apps.filter(a => a.status === 'Under Review' || a.status === 'In Progress').length,
        rejectedApplications: apps.filter(a => a.status === 'Rejected').length,
        totalLicenses: licenses.length,
        activeLicenses: licenses.filter(l => l.status === 'Active').length,
        expiringSoonLicenses: licenses.filter(l => l.daysToExpiry < 365).length,
        totalAppointments: bookings.length,
        upcomingAppointments: bookings.filter(b => b.status === 'Confirmed' || b.status === 'Scheduled').length,
        completedAppointments: bookings.filter(b => b.status === 'Completed').length,
        unreadNotifications: notifs.filter(n => !n.isRead).length
      };
    }
  };

  // Expose to window
  if (typeof window !== 'undefined') {
  window.LicentraDB = db;
}

export { SERVICES, CLASSES, DRIVING_TESTS, TEST_CENTERS, NEWS_ARTICLES, EVENTS };
export const LicentraDB = db;
export default LicentraDB;


