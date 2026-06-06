-- ============================================================
--  DCAP — Seed Data  (Real scheme data from Excel sheets)
--  File: 03_seed.sql
--  Run AFTER 01_schema.sql
--  Schemes: 112 real entries  (General=46, Student=34, Farmer=32)
-- ============================================================

-- ── SCHEMES : General (46 schemes) ──────────────────────────────────────────
INSERT INTO schemes (scheme_name, category, eligibility, required_documents, benefits, department) VALUES
  ('Pradhan Mantri Awas Yojana - Urban (PMAY-U)', 'General', 'EWS/LIG families, urban areas, no pucca house', 'Aadhaar, Income certificate, Land documents, Bank account, PAN', '', 'Housing Schemes'),
  ('Pradhan Mantri Awas Yojana - Gramin (PMAY-G)', 'General', 'Rural BPL families, no pucca house', 'Aadhaar, BPL card, Land records, Bank account, SECC data', '', 'Housing Schemes'),
  ('Pradhan Mantri Awas Yojana - Housing for All', 'General', 'All income groups, no home owner', 'Aadhaar, Income proof, Property proof, Bank account', '', 'Housing Schemes'),
  ('Ayushman Bharat (PM-JAY)', 'General', 'BPL families, Ration card holders, ₹5L coverage', 'Aadhaar, Ration card, BPL certificate, Photo, Bank account', '', 'Health Schemes'),
  ('Pradhan Mantri Bharatiya Janaushadhi Pariyojana', 'General', 'All citizens', 'Aadhaar, Prescription, Bank account, Photo', '', 'Health Schemes'),
  ('National Health Mission (NHM)', 'General', 'All citizens, especially rural', 'Aadhaar, Address proof, Ration card', '', 'Health Schemes'),
  ('Pradhan Mantri Ayushman Bharat Health Infrastructure Mission', 'General', 'All citizens', 'Aadhaar, Bank account, Photo', '', 'Health Schemes'),
  ('Atal Pension Yojana (APY)', 'General', '18-40 years, bank account holder', 'Aadhaar, Bank account, PAN, Mobile number, Photo', '', 'Pension Schemes'),
  ('Pradhan Mantri Kisan Maan Dhan Yojana (PM-KMY)', 'General', 'Small/marginal farmers, 18-40 years', 'Land records, Aadhaar, Bank account, Age proof', '', 'Pension Schemes'),
  ('Senior Citizen Savings Scheme (SCSS)', 'General', '60+ years (55+ for retired)', 'Aadhaar, PAN, Age proof, Bank account, Pension book', '', 'Pension Schemes'),
  ('Atal Vayo Abhyuday Yojana (AVYAY)', 'General', '60+ years, BPL preferred', 'Aadhaar, Age proof, Income certificate, Bank account', '', 'Pension Schemes'),
  ('NPS Vatsalya', 'General', 'Parents for children below 18 years', 'Child''s birth certificate, Aadhaar (parent & child), Bank account, PAN', '', 'Pension Schemes'),
  ('Beti Bachao Beti Padhao', 'General', 'Families with girl child', 'Aadhaar, Birth certificate, Ration card, School admission proof', '', 'Women Welfare Schemes'),
  ('Pradhan Mantri Matru Vandana Yojana (PMMVY)', 'General', 'Pregnant/lactating women, 19+ years', 'Aadhaar, Pregnancy proof, Bank account, Ration card', '', 'Women Welfare Schemes'),
  ('Mission Shakti', 'General', 'Women SHGs, self-help groups', 'Aadhaar, SHG registration, Bank account, Photo', '', 'Women Welfare Schemes'),
  ('One Stop Centre (OSC) Scheme', 'General', 'All women in distress', 'Aadhaar, Phone number, Address proof', '', 'Women Welfare Schemes'),
  ('Working Women Hostel', 'General', 'Working women, no accommodation', 'Aadhaar, Employment proof, Income certificate, Photo', '', 'Women Welfare Schemes'),
  ('Echelon (E-Challan) Relief Fund', 'General', 'Defence personnel, veterans', 'Service book, Aadhaar, Pension book, Bank account', '', 'Defence Welfare Schemes'),
  ('Ambulance Service for Defence Veterans', 'General', 'Defence veterans, 60+ years', 'Pension book, Aadhaar, Age proof, Medical certificate', '', 'Defence Welfare Schemes'),
  ('Pradhan Mantri Swasthya Suraksha Yojana (Defence)', 'General', 'Defence personnel, families', 'Service card, Aadhaar, Family proof, Bank account', '', 'Defence Welfare Schemes'),
  ('Pradhan Mantri Kaushal Vikas Yojana (PMKVY)', 'General', 'Youth 18-35 years, 8th pass minimum', 'Aadhaar, Educational certificates, Photo, Mobile number', '', 'Skill Development Schemes'),
  ('Jan Shikshan Sansthan (JSS)', 'General', 'Non-literate, neo-literate, school dropouts', 'Aadhaar, Age proof, Photo, Address proof', '', 'Skill Development Schemes'),
  ('National Apprenticeship Promotion Scheme (NAPS)', 'General', 'Youth 16+ years, employers', 'Aadhaar, Educational certificates, Bank account', '', 'Skill Development Schemes'),
  ('Pradhan Mantri Vishwakarma Kaushal Samman', 'General', 'Traditional artisans, craftspeople', 'Aadhaar, PAN, Artisan certificate, Bank account', '', 'Skill Development Schemes'),
  ('PM YASASVI', 'General', 'OBCs, Class 11+ entrance', 'Aadhaar, Caste certificate, Educational certificates, Photo', '', 'Skill Development Schemes'),
  ('Pradhan Mantri Virasat Ka Samvardhan (PM VIKAS)', 'General', 'Minorities, skill development focus', 'Aadhaar, Minority certificate, Photo, Bank account', '', 'Minority Welfare Schemes'),
  ('Nai Manzil Scheme', 'General', 'Minority school dropouts', 'Aadhaar, Minority certificate, Education proof, Income certificate', '', 'Minority Welfare Schemes'),
  ('Seekho Aur Kamao (Learn & Earn)', 'General', 'Minorities 16-35 years', 'Aadhaar, Minority certificate, Photo, Bank account', '', 'Minority Welfare Schemes'),
  ('Padho Pardesh', 'General', 'Minorities for overseas education', 'Aadhaar, Minority certificate, Admission proof, Income certificate', '', 'Minority Welfare Schemes'),
  ('Pradhan Mantri Anusuchit Jaati Abhyuday Yojana (PM-AJAY)', 'General', 'SC students, post-matric level', 'Aadhaar, Caste certificate, Educational certificates, Income certificate', '', 'SC/ST/OBC Welfare Schemes'),
  ('Post-Matric Scholarship for SC Students', 'General', 'SC students, income < ₹2.5L', 'Aadhaar, Caste certificate, Income certificate, School/College ID', '', 'SC/ST/OBC Welfare Schemes'),
  ('Post-Matric Scholarship for OBC Students', 'General', 'OBC students, income < ₹2.5L', 'Aadhaar, Caste certificate, Income certificate, School/College ID', '', 'SC/ST/OBC Welfare Schemes'),
  ('National Overseas Scholarship (NOS)', 'General', 'SC students for overseas PhD/Masters', 'Aadhaar, Caste certificate, Admission proof, Income certificate', '', 'SC/ST/OBC Welfare Schemes'),
  ('Credit Enhancement Guarantee Scheme for SCs', 'General', 'SC entrepreneurs', 'Aadhaar, Caste certificate, Business plan, Bank account', '', 'SC/ST/OBC Welfare Schemes'),
  ('Scheme for Economic Empowerment of DNTs (SEED)', 'General', 'Denotified Tribes', 'Aadhaar, Caste certificate, Photo, Address proof', '', 'SC/ST/OBC Welfare Schemes'),
  ('Pradhan Mantri Dakshta Aur Kushalta Sampann Hitgrahi (PM-DAKSH)', 'General', 'SC/OBC/EWS/differently-abled', 'Aadhaar, Caste certificate, Income certificate, Photo', '', 'SC/ST/OBC Welfare Schemes'),
  ('National Action for Mechanised Sanitation Ecosystem (NAMASTE)', 'General', 'Sanitation workers, sweepers', 'Aadhaar, Caste certificate, Employment proof, Bank account', '', 'SC/ST/OBC Welfare Schemes'),
  ('Assistive Devices for Differently Abled', 'General', '50%+ disability, BPL', 'Aadhaar, Disability certificate, BPL card, Photo', '', 'Disability Welfare Schemes'),
  ('Mahatma Gandhi National Rural Employment Guarantee Act (MGNREGA)', 'General', 'Rural adults, 18+ years', 'Aadhaar, Job card, Bank account, Photo', '', 'Rural Development Schemes'),
  ('Mudra Yojana', 'General', 'Small businesses, startups', 'Aadhaar, PAN, Business proof, Bank statement', '', 'MSME Schemes'),
  ('Stand Up India', 'General', 'SC/ST/Women entrepreneurs', 'Aadhaar, PAN, Caste certificate, Business plan', '', 'MSME Schemes'),
  ('Employment Linked Incentive (ELI) Scheme', 'General', 'Manufacturing sector youth', 'Aadhaar, Employment proof, Bank account, PAN', '', 'Youth Empowerment Schemes'),
  ('Pradhan Mantri Surya Ghar Yojana', 'General', 'Households with roof space', 'Aadhaar, Electricity bill, Bank account, Property proof', '', 'Digital India Schemes'),
  ('PM Jan Dhan Yojana', 'General', 'All Indian citizens above 10 years', 'Aadhaar, PAN, Address proof, Photo', '', 'Digital India Schemes'),
  ('Digital India', 'General', 'All citizens', 'Aadhaar, Mobile number, Email, Bank account', '', 'Digital India Schemes'),
  ('Ujala Yojana', 'General', 'All households with electricity', 'Aadhaar, Electricity bill, Bank account, Address proof', '', 'Digital India Schemes');

-- ── SCHEMES : Student (34 schemes) ──────────────────────────────────────────
INSERT INTO schemes (scheme_name, category, eligibility, required_documents, benefits, department) VALUES
  ('Central Sector Scheme of Scholarships for College and University Students (PM-USP / CSSS)', 'Student', 'Indian students who passed Class 12 with high merit and are studying in regular UG/PG courses, subject to income rules.', 'Class 12 mark sheet, income certificate, admission proof, Aadhaar, bank account details.', '', 'Education'),
  ('National Means-cum-Merit Scholarship (NMMS)', 'Student', 'Students selected in Class 8, based on merit and income criteria. dsel.education+1', 'Previous class mark sheet, income certificate, school bonafide, Aadhaar, bank details. dsel.education', '', 'Education'),
  ('PM YASASVI Scholarship for OBC, EBC and DNT students', 'Student', 'Students of OBC, EBC and DNT categories studying in Classes 9 and 11 with income and marks conditions.', 'Aadhaar, caste/category certificate, income certificate, previous marksheet, school bonafide, bank details.', '', 'Education'),
  ('AICTE Pragati Scholarship Scheme for Girl Students (Technical Degree)', 'Student', 'Girl students in AICTE-approved technical degree courses.', 'Aadhaar, income certificate, admission proof, bank details, previous marksheet.', '', 'Education'),
  ('AICTE Pragati Scholarship Scheme for Girl Students (Technical Diploma)', 'Student', 'Girl students in AICTE-approved technical diploma courses.', 'Aadhaar, income certificate, admission proof, bank details, previous marksheet.', '', 'Education'),
  ('AICTE Saksham Scholarship Scheme for Specially Abled Student (Technical Degree)', 'Student', 'Students with benchmark disability in AICTE-approved technical degree courses.', 'Disability certificate, Aadhaar, income certificate, admission proof, bank details.', '', 'Education'),
  ('AICTE Saksham Scholarship Scheme for Specially Abled Student (Technical Diploma)', 'Student', 'Students with benchmark disability in AICTE-approved technical diploma courses.', 'Disability certificate, Aadhaar, income certificate, admission proof, bank details.', '', 'Education'),
  ('AICTE Swanath Scholarship Scheme (Technical Degree)', 'Student', 'Orphans, children of martyrs, or COVID-affected/other eligible vulnerable students in technical degree courses.', 'Relevant certificate, income certificate, admission proof, Aadhaar, bank details.', '', 'Education'),
  ('AICTE Swanath Scholarship Scheme (Technical Diploma)', 'Student', 'Orphans, children of martyrs, or COVID-affected/other eligible vulnerable students in technical diploma courses.', 'Relevant certificate, income certificate, admission proof, Aadhaar, bank details.', '', 'Education'),
  ('PM-USP Special Scholarship Scheme for Jammu, Kashmir and Ladakh', 'Student', 'Students from Jammu, Kashmir and Ladakh meeting scheme conditions.', 'Domicile proof, admission proof, Aadhaar, income certificate, bank details.', '', 'Education'),
  ('National Fellowship and Scholarship for Higher Education of ST Students', 'Student', 'ST students pursuing higher education under scheme norms.', 'ST certificate, income certificate, admission proof, Aadhaar, bank details.', '', 'Education'),
  ('Central Sector Scholarship of Top Class Education for SC Students', 'Student', 'SC students admitted to top institutions under scheme conditions.', 'SC certificate, income certificate, admission proof, Aadhaar, bank details.', '', 'Education'),
  ('Top Class Education Scheme for Students with Disabilities', 'Student', 'Students with disabilities admitted to top institutions.', 'Disability certificate, income certificate, admission proof, Aadhaar, bank details.', '', 'Education'),
  ('Top Class Education Scheme for OBC, EBC and DNT Students', 'Student', 'OBC, EBC and DNT students admitted to top institutions.', 'Category certificate, income certificate, admission proof, Aadhaar, bank details.', '', 'Education'),
  ('Post Matric Scholarship for Students with Disabilities', 'Student', 'Students with disabilities studying after Class 10.', 'Disability certificate, income certificate, previous marksheet, admission proof, bank details.', '', 'Education'),
  ('Pre Matric Scholarship for Students with Disabilities', 'Student', 'Students with disabilities studying in school classes.', 'Disability certificate, income certificate, school certificate, Aadhaar, bank details.', '', 'Education'),
  ('Scholarship for Top Class Education for Students with Disabilities', 'Student', 'Students with benchmark disability in top institutions.', 'Disability certificate, income certificate, admission proof, Aadhaar, bank details.', '', 'Education'),
  ('Merit-cum-Means Scholarship for Professional and Technical Courses', 'Student', 'Students from minority communities in professional/technical courses under scheme rules.', 'Minority certificate, income certificate, marksheet, admission proof, bank details.', '', 'Education'),
  ('Pre Matric Scholarships for Minority', 'Student', 'Minority community students in school classes under income rules.', 'Minority certificate, income certificate, school certificate, Aadhaar, bank details.', '', 'Education'),
  ('Post Matric Scholarship Schemes for Minorities', 'Student', 'Minority students studying after Class 10 under scheme rules.', 'Minority certificate, income certificate, previous marksheet, admission proof, bank details.', '', 'Education'),
  ('National Scholarship for Post Graduate Studies', 'Student', 'Meritorious students pursuing postgraduate studies as per UGC norms.', 'UG marksheet, admission proof, Aadhaar, bank details, income certificate if required.', '', 'Education'),
  ('Ishan Uday Special Scholarship Scheme for NER', 'Student', 'Students from the North Eastern Region enrolled in eligible higher education courses.', 'Domicile proof, marksheet, admission proof, Aadhaar, bank details.', '', 'Education'),
  ('NEC Merit Scholarship', 'Student', 'Students from the North Eastern Region in higher professional courses.', 'Domicile proof, marksheet, admission proof, Aadhaar, bank details.', '', 'Education'),
  ('Prime Ministerâ€™s Scholarship Scheme for Wards of CAPFs and Assam Rifles', 'Student', 'Wards of serving/ex-servicemen personnel of CAPFs and Assam Rifles.', 'Service certificate, relationship proof, admission proof, marksheet, bank details.', '', 'Education'),
  ('Prime Ministerâ€™s Scholarship Scheme for Wards of States/UTs Police Personnel Martyred During Terror/Naxal Attacks', 'Student', 'Wards of police personnel martyred in terror or Naxal incidents.', 'Death/martyr certificate, relationship proof, admission proof, bank details.', '', 'Education'),
  ('Prime Ministerâ€™s Scholarship Scheme for Ministry of Railways', 'Student', 'Wards/widows of railway employees as per scheme rules.', 'Service/dependant proof, admission proof, marksheet, bank details.', '', 'Education'),
  ('Financial Assistance for Education to the Wards of Beedi/Cine/IOMC/LSDM Workers â€“ Pre Matric', 'Student', 'Children of eligible workers studying in pre-matric classes.', 'Worker identity proof, income proof, school certificate, Aadhaar, bank details.', '', 'Education'),
  ('Financial Assistance for Education to the Wards of Beedi/Cine/IOMC/LSDM Workers â€“ Post Matric', 'Student', 'Children of eligible workers studying after Class 10.', 'Worker identity proof, income proof, admission proof, Aadhaar, bank details.', '', 'Education'),
  ('National Fellowship for SC Students', 'Student', 'SC students pursuing MPhil/PhD under scheme norms.', 'SC certificate, admission proof, academic records, Aadhaar, bank details.', '', 'Education'),
  ('National Fellowship for OBC Students', 'Student', 'OBC students pursuing MPhil/PhD under scheme norms.', 'OBC certificate, admission proof, academic records, Aadhaar, bank details.', '', 'Education'),
  ('Thalliki Vandanam', 'Student', 'AP students from Classes 1 to 12 in recognised schools/junior colleges, subject to income, landholding, electricity-use, and attendance rules.', 'Aadhaar, student ID, bank account details, income proof, residence proof, attendance proof.', '', 'Education'),
  ('AP Pre-Matric Scholarship for SC/ST/BC/Disabled students', 'Student', 'Eligible AP school students from notified communities and categories.', 'Caste/category certificate, income certificate, school bonafide, Aadhaar, bank details.', '', 'Education'),
  ('AP Post-Matric Scholarship for SC/ST/BC/Minority/Disabled students', 'Student', 'Eligible AP students studying after Class 10 under state rules.', 'Caste/category certificate, income certificate, previous marksheet, admission proof, Aadhaar, bank details.', '', 'Education'),
  ('AP Merit & other', 'Student', 'Students meeting course- and category-specific rules in AP.', 'Academic records, income certificate, admission proof, Aadhaar, bank details.', '', 'Education');

-- ── SCHEMES : Farmer (32 schemes) ──────────────────────────────────────────
INSERT INTO schemes (scheme_name, category, eligibility, required_documents, benefits, department) VALUES
  ('PM-KISAN Samman Nidhi', 'Farmer', 'Small & marginal landholding farmers', 'Aadhaar, land records, bank passbook, mobile number', '', 'Agriculture'),
  ('Kisan Credit Card (KCC)', 'Farmer', 'Farmers, dairy & fisheries farmers', 'Aadhaar, land proof, bank account, photos', '', 'Agriculture'),
  ('Pradhan Mantri Fasal Bima Yojana (PMFBY)', 'Farmer', 'Farmers growing notified crops', 'Aadhaar, land records, sowing proof, bank account', '', 'Agriculture'),
  ('PM Krishi Sinchai Yojana (PMKSY)', 'Farmer', 'Farmers with cultivable land', 'Aadhaar, land documents, bank details', '', 'Agriculture'),
  ('Soil Health Card Scheme', 'Farmer', 'All farmers', 'Aadhaar, land details', '', 'Agriculture'),
  ('Paramparagat Krishi Vikas Yojana (PKVY)', 'Farmer', 'Farmers practicing organic farming', 'Aadhaar, land proof, farmer group details', '', 'Agriculture'),
  ('National Agriculture Market (e-NAM)', 'Farmer', 'Registered farmers & traders', 'Aadhaar, bank account, mobile number', '', 'Agriculture'),
  ('Agriculture Infrastructure Fund (AIF)', 'Farmer', 'Farmers, FPOs, PACS, agri entrepreneurs', 'Project report, Aadhaar, PAN, bank documents', '', 'Agriculture'),
  ('PM Kisan Maandhan Yojana', 'Farmer', 'Small & marginal farmers aged 18–40', 'Aadhaar, bank account, land records', '', 'Agriculture'),
  ('Rashtriya Krishi Vikas Yojana (RKVY)', 'Farmer', 'Farmers & agri entrepreneurs', 'Aadhaar, project details, land proof', '', 'Agriculture'),
  ('Sub-Mission on Agricultural Mechanization (SMAM)', 'Farmer', 'Farmers purchasing equipment', 'Aadhaar, quotation, land proof, bank details', '', 'Agriculture'),
  ('National Food Security Mission (NFSM)', 'Farmer', 'Farmers cultivating pulses, rice, wheat', 'Aadhaar, land records', '', 'Agriculture'),
  ('Mission for Integrated Development of Horticulture (MIDH)', 'Farmer', 'Fruit, vegetable & flower growers', 'Aadhaar, land proof, bank passbook', '', 'Agriculture'),
  ('National Mission on Oilseeds & Oil Palm (NMOOP)', 'Farmer', 'Oilseed & oil palm farmers', 'Aadhaar, land documents', '', 'Agriculture'),
  ('National Bamboo Mission', 'Farmer', 'Farmers interested in bamboo farming', 'Aadhaar, land proof', '', 'Agriculture'),
  ('Bee Keeping Development Scheme', 'Farmer', 'Beekeepers & farmers', 'Aadhaar, bank details, training certificate', '', 'Agriculture'),
  ('Dairy Entrepreneurship Development Scheme', 'Farmer', 'Dairy farmers & entrepreneurs', 'Aadhaar, dairy unit details, bank documents', '', 'Agriculture'),
  ('Livestock Health & Disease Control Scheme', 'Farmer', 'Cattle, goat & poultry farmers', 'Aadhaar, livestock details', '', 'Agriculture'),
  ('Blue Revolution Scheme', 'Farmer', 'Fish farmers & fisheries sector', 'Aadhaar, pond/farm proof, bank details', '', 'Agriculture'),
  ('PM Matsya Sampada Yojana (PMMSY)', 'Farmer', 'Fish farmers, hatcheries, entrepreneurs', 'Aadhaar, project report, bank details', '', 'Agriculture'),
  ('Formation & Promotion of FPOs', 'Farmer', 'Farmer groups/FPOs', 'Registration documents, Aadhaar, PAN', '', 'Agriculture'),
  ('Seed Village Programme', 'Farmer', 'Seed-producing farmers', 'Aadhaar, land details', '', 'Agriculture'),
  ('Rainfed Area Development Programme', 'Farmer', 'Rainfed area farmers', 'Aadhaar, land proof', '', 'Agriculture'),
  ('National Mission for Sustainable Agriculture (NMSA)', 'Farmer', 'Farmers adopting sustainable methods', 'Aadhaar, land proof', '', 'Agriculture'),
  ('Gramin Bhandaran Yojana', 'Farmer', 'Farmers & agri entrepreneurs', 'Project report, land proof, Aadhaar', '', 'Agriculture'),
  ('Integrated Scheme on Agriculture Marketing (ISAM)', 'Farmer', 'Farmers & agri traders', 'Aadhaar, business/farm details', '', 'Agriculture'),
  ('Agri Clinics & Agri Business Centres Scheme', 'Farmer', 'Agriculture graduates', 'Degree certificate, Aadhaar, bank details', '', 'Agriculture'),
  ('Custom Hiring Centres Scheme', 'Farmer', 'Farmers groups/FPOs', 'Aadhaar, project details, land proof', '', 'Agriculture'),
  ('Per Drop More Crop Scheme', 'Farmer', 'Farmers using drip/sprinkler irrigation', 'Aadhaar, land proof, irrigation details', '', 'Agriculture'),
  ('National Livestock Mission (NLM)', 'Farmer', 'Poultry, sheep, goat & pig farmers', 'Aadhaar, livestock proof, bank details', '', 'Agriculture'),
  ('Crop Diversification Programme (CDP)', 'Farmer', '(horticulture, pulses, oilseeds).(horticulture, pulses, oilseeds).', 'Land record, Aadhaar, bank account, crop‑diversification plan.', '', 'Agriculture'),
  ('Sub‑Mission on Plant Protection & Plant Quarantine', 'Farmer', 'Farmers under notified pest/ disease control programmes.', 'Land record, Aadhaar, crop‑area details, spraying/inspection records.', '', 'Agriculture');


-- ── NOTIFICATIONS ────────────────────────────────────────────
INSERT INTO notifications (title, body, type) VALUES
(
    'New Scheme Alert: Rythu Bandhu Kharif 2024',
    'Applications for Rythu Bandhu investment support (Kharif 2024 season) are now open. Eligible farmers must update their Pattadar Passbook at the nearest Sachivalayam before 30 July 2024.',
    'alert'
),
(
    'Office Timing Change — Revenue Department',
    'Revenue Department counters at all Sachivalayams will operate from 9:00 AM to 4:00 PM effective 1 July 2024. Saturday services will be available 9:00 AM to 1:00 PM.',
    'update'
),
(
    'Aarogyasri Card Renewal Drive',
    'Citizens whose Aarogyasri cards expired before March 2024 can renew at their nearest Sachivalayam. Bring White Ration Card and Aadhaar. Camp held every Tuesday and Thursday.',
    'info'
),
(
    'Important: Scholarship Deadline — Vidya Deevena',
    'Last date for Vidya Deevena fee reimbursement applications for Academic Year 2023-24 is 15 August 2024. Students must submit verified documents through the college principal.',
    'alert'
),
(
    'Digital Services Now Available',
    'Citizens can now apply for Income, Caste, and Residence certificates online via the Meeseva portal. Doorstep delivery available through Sachivalayam staff on request.',
    'info'
);


-- ── CONTACTS ─────────────────────────────────────────────────
INSERT INTO contacts (department, officer_name, designation, phone, email, address, timings) VALUES
(
    'Revenue Department',
    'Sri K. Venkaiah',
    'Tahsildar',
    '040-27654321',
    'revenue.hyd@telangana.gov.in',
    'Collectorate Building, Nampally, Hyderabad - 500001',
    'Mon–Sat: 10:00 AM – 5:00 PM'
),
(
    'Agriculture Department',
    'Dr. B. Padmavathi',
    'District Agriculture Officer',
    '040-23456789',
    'dao.ranga.reddy@telangana.gov.in',
    'Agriculture Office, Rajendra Nagar, Hyderabad - 500030',
    'Mon–Fri: 10:00 AM – 5:00 PM'
),
(
    'Social Welfare Department',
    'Sri M. Ravi Kumar',
    'District Social Welfare Officer',
    '040-24567890',
    'dswo.hyd@telangana.gov.in',
    'Social Welfare Bhavan, Masab Tank, Hyderabad - 500028',
    'Mon–Sat: 10:00 AM – 5:00 PM'
),
(
    'Health Department',
    'Dr. S. Nagamani',
    'District Medical & Health Officer',
    '040-25678901',
    'dmho.hyd@telangana.gov.in',
    'DMHO Office, Koti, Hyderabad - 500095',
    'Mon–Fri: 9:00 AM – 5:00 PM'
),
(
    'BC Welfare Department',
    'Sri P. Anjaneyulu',
    'District BC Welfare Officer',
    '040-26789012',
    'dbcwo.hyd@telangana.gov.in',
    'BC Welfare Office, Basheerbagh, Hyderabad - 500029',
    'Mon–Sat: 10:00 AM – 5:00 PM'
),
(
    'Education Department',
    'Sri T. Srikanth',
    'District Education Officer',
    '040-27890123',
    'deo.hyd@telangana.gov.in',
    'DEO Office, Liberty X Roads, Hyderabad - 500003',
    'Mon–Fri: 10:00 AM – 5:00 PM'
),
(
    'Civil Supplies Department',
    'Sri G. Laxmi Narayana',
    'District Supply Officer',
    '040-28901234',
    'dso.hyd@telangana.gov.in',
    'Civil Supplies Office, Himayatnagar, Hyderabad - 500029',
    'Mon–Sat: 10:00 AM – 5:00 PM'
);


-- ── SAMPLE COMPLAINTS (for testing) ──────────────────────────
INSERT INTO complaints (tracking_token, citizen_name, mobile, email, department, subject, description, address, status) VALUES
(
    'CMP-TEST0001',
    'Suresh Babu',
    '9876500001',
    'suresh@email.com',
    'Revenue Department',
    'Land Record Correction',
    'My Pattadar Passbook shows incorrect survey number. I need correction in my land records.',
    'Village: Shamshabad, Mandal: Rajendranagar, Dist: Hyderabad',
    'In Progress'
),
(
    'CMP-TEST0002',
    'Anitha Reddy',
    '9876500002',
    NULL,
    'Civil Supplies Department',
    'Ration Card Name Correction',
    'My daughter''s name is misspelled in the ration card. Actual name: Preethi, Ration card shows: Preethu.',
    'H.No 12-3-45, Malakpet, Hyderabad - 500036',
    'Registered'
);


-- ── SAMPLE APPOINTMENTS (for testing) ────────────────────────
INSERT INTO appointments (booking_token, citizen_name, mobile, department, purpose, preferred_date, preferred_slot, status) VALUES
(
    'APT-TEST0001',
    'Ravi Shankar',
    '9123400001',
    'Revenue Department',
    'Income Certificate Application',
    CURRENT_DATE + INTERVAL '7 days',
    '10:00 AM - 11:00 AM',
    'Confirmed'
),
(
    'APT-TEST0002',
    'Fatima Begum',
    '9123400002',
    'BC Welfare Department',
    'Kalyana Lakshmi Application Status',
    CURRENT_DATE + INTERVAL '10 days',
    '2:00 PM - 3:00 PM',
    'Pending'
);
