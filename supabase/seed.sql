-- =============================================================================
-- LICENTRA - Development Seed Data
-- =============================================================================

-- Seed License Classes
INSERT INTO public.license_classes (id, code, name, arabic_name, category, min_age, validity_years, statutory_fee, cc_limit, description) VALUES
  ('class-1', 'Class 1', 'Light Motorcycle', 'دراجة آلية خفيفة', 'Two-Wheeled Vehicles', 18, 5, 515.00, 'Up to 125 cc', 'Light motorized two-wheelers, scooters, and mopeds.'),
  ('class-2', 'Class 2', 'Heavy Motorcycle', 'دراجة آلية ثقيلة', 'Two-Wheeled Vehicles', 21, 10, 830.00, 'Over 125 cc', 'High-displacement sports motorcycles, touring bikes, and trikes.'),
  ('class-3', 'Class 3', 'Private Car', 'مركبة خاصة ملاكي', 'Passenger Vehicles', 18, 10, 830.00, 'No CC Limit', 'Private passenger automobiles, SUVs, sedans, and light vans.'),
  ('class-4', 'Class 4', 'Taxi / Limousine', 'أجرة / ليموزين', 'Commercial Passenger', 21, 10, 920.00, 'Commercial', 'Commercial metered taxis, ride-hailing vehicles, and luxury limousines.'),
  ('class-5', 'Class 5', 'Agricultural Tractor', 'جرار زراعي', 'Specialized Machinery', 21, 10, 650.00, 'Agricultural', 'Agricultural tractors, harvesters, and specialized farming transport.'),
  ('class-6', 'Class 6', 'Passenger Bus', 'حافلة ركاب', 'Public & Heavy Transport', 21, 10, 850.00, 'Heavy Bus', 'Commercial passenger buses, microbuses, and tour coaches.'),
  ('class-7', 'Class 7', 'Heavy Truck / Articulated', 'نقل ثقيل ومقطورة', 'Public & Heavy Transport', 21, 10, 1300.00, 'Heavy Haulage', 'Heavy freight trucks, articulated multi-axle trailers, and tankers.')
ON CONFLICT (id) DO NOTHING;

-- Seed Test Centers
INSERT INTO public.test_centers (id, name, city, address, phone, operating_hours, theory_rooms, practical_tracks, is_open) VALUES
  ('cairo', 'Cairo Main Center', 'Cairo', '123 El Tayaran St., Nasr City, Cairo', '+20 123 456 7890', '08:00 AM – 04:00 PM', 6, 4, true),
  ('giza', 'Giza Center', 'Giza', 'Central Axis Road, 6th of October City, Giza', '+20 123 456 7891', '08:00 AM – 04:00 PM', 4, 3, true),
  ('alexandria', 'Alexandria Center', 'Alexandria', '45 Victor Emmanuel Sq., Smouha, Alexandria', '+20 123 456 7892', '08:00 AM – 04:00 PM', 4, 2, true),
  ('mansoura', 'Mansoura Center', 'Mansoura', 'El-Gomhoria St., Mansoura, Dakahlia', '+20 123 456 7893', '08:30 AM – 03:30 PM', 3, 2, true)
ON CONFLICT (id) DO NOTHING;

-- Seed Driving Tests
INSERT INTO public.driving_tests (id, name, description, test_format, duration_minutes, passing_score, standard_fee) VALUES
  ('theory', 'Computerized Theory Examination', 'Interactive touchscreen examination covering Egyptian traffic laws, highway code, and hazard perception.', 'Computerized Lab Exam', 30, '32/40 (80%)', 150.00),
  ('vision', 'Vision & Medical Screening', 'Clinical optometry and visual acuity screening conducted by accredited Ministry of Interior optometrists.', 'Clinical Screening', 10, '6/9 or better', 120.00),
  ('practical', 'Practical Track Evaluation', 'Sensor-monitored closed obstacle track evaluating parallel parking, S-curve, hill start, and emergency braking.', 'In-Vehicle Track Test', 20, 'Pass / Fail Criteria', 150.00)
ON CONFLICT (id) DO NOTHING;

