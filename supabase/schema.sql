-- =============================================================================
-- LICENTRA - Driving & Vehicle License Department (DVLD)
-- Comprehensive Supabase / PostgreSQL Production Database Schema
-- =============================================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =============================================================================
-- 1. ROLES & PERMISSIONS
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.roles (
  id VARCHAR(20) PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO public.roles (id, name, description) VALUES
  ('guest', 'Public Guest', 'Unauthenticated visitor with read-only access to public pages'),
  ('citizen', 'Registered Citizen', 'Verified citizen with access to citizen dashboard, applications, and test bookings'),
  ('admin', 'System Administrator', 'Full operational, user, and administrative control over department records')
ON CONFLICT (id) DO NOTHING;

-- =============================================================================
-- 2. USER PROFILES (Linked with Supabase auth.users)
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name VARCHAR(150) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  phone VARCHAR(20),
  national_id VARCHAR(14) UNIQUE NOT NULL,
  role_id VARCHAR(20) REFERENCES public.roles(id) DEFAULT 'citizen',
  avatar_url TEXT,
  gender VARCHAR(10) CHECK (gender IN ('male', 'female', 'other')),
  date_of_birth DATE,
  address TEXT,
  governorate VARCHAR(50) DEFAULT 'Cairo',
  is_verified BOOLEAN DEFAULT TRUE,
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'suspended', 'pending')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================================
-- 3. LICENSE CLASSES CATALOG
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.license_classes (
  id VARCHAR(30) PRIMARY KEY,
  code VARCHAR(20) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  arabic_name VARCHAR(100),
  category VARCHAR(50) NOT NULL,
  min_age INTEGER NOT NULL,
  validity_years INTEGER NOT NULL,
  statutory_fee NUMERIC(10, 2) NOT NULL,
  cc_limit VARCHAR(50),
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================================
-- 4. SERVICES CATALOG
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.services (
  id VARCHAR(50) PRIMARY KEY,
  code VARCHAR(20) UNIQUE NOT NULL,
  title VARCHAR(150) NOT NULL,
  category VARCHAR(50) NOT NULL,
  summary TEXT,
  total_fee NUMERIC(10, 2) NOT NULL,
  processing_time VARCHAR(100),
  validity_period VARCHAR(100),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================================
-- 5. TEST CENTERS
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.test_centers (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  city VARCHAR(50) NOT NULL,
  address TEXT NOT NULL,
  phone VARCHAR(30),
  operating_hours VARCHAR(100) DEFAULT '08:00 AM – 04:00 PM',
  theory_rooms INTEGER DEFAULT 6,
  practical_tracks INTEGER DEFAULT 4,
  is_open BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================================
-- 6. LICENSE APPLICATIONS
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.applications (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  reference_number VARCHAR(30) UNIQUE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  service_id VARCHAR(50) REFERENCES public.services(id),
  license_class_id VARCHAR(30) REFERENCES public.license_classes(id),
  application_type VARCHAR(30) DEFAULT 'New License' CHECK (application_type IN ('New License', 'Renewal', 'Replacement', 'International', 'Upgrade')),
  applicant_name VARCHAR(150) NOT NULL,
  national_id VARCHAR(14) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  status VARCHAR(30) DEFAULT 'Under Review' CHECK (status IN ('New', 'Under Review', 'Pending Payment', 'Approved', 'Rejected', 'Completed')),
  rejection_reason TEXT,
  fee_amount NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
  payment_status VARCHAR(30) DEFAULT 'Paid Online' CHECK (payment_status IN ('Pending', 'Paid Online', 'Refunded', 'Exempted')),
  payment_method VARCHAR(50) DEFAULT 'Credit / Debit Card',
  documents JSONB DEFAULT '[]'::jsonb,
  submission_date TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================================
-- 7. DRIVING LICENSES
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.driving_licenses (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  license_number VARCHAR(30) UNIQUE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  application_id UUID REFERENCES public.applications(id) ON DELETE SET NULL,
  license_class_id VARCHAR(30) REFERENCES public.license_classes(id),
  license_type VARCHAR(30) DEFAULT 'Personal',
  issuing_authority VARCHAR(100) DEFAULT 'Egyptian Traffic Directorate',
  issue_date DATE NOT NULL,
  expiry_date DATE NOT NULL,
  status VARCHAR(20) DEFAULT 'Active' CHECK (status IN ('Active', 'Expiring Soon', 'Expired', 'Suspended', 'Revoked')),
  blood_group VARCHAR(5) DEFAULT 'A+',
  barcode_data VARCHAR(100),
  qr_code_hash VARCHAR(150),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================================
-- 8. LICENSE RENEWALS & REPLACEMENTS
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.license_renewals (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  reference_number VARCHAR(30) UNIQUE NOT NULL,
  license_id UUID REFERENCES public.driving_licenses(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  renewal_period_years INTEGER DEFAULT 10,
  prosecution_clearance_number VARCHAR(50),
  medical_clearance_verified BOOLEAN DEFAULT TRUE,
  fee_amount NUMERIC(10, 2) NOT NULL,
  status VARCHAR(30) DEFAULT 'Under Review' CHECK (status IN ('Submitted', 'Under Review', 'Approved', 'Card Printed', 'Dispatched')),
  requested_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS public.replacement_requests (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  reference_number VARCHAR(30) UNIQUE NOT NULL,
  license_id UUID REFERENCES public.driving_licenses(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  reason VARCHAR(30) NOT NULL CHECK (reason IN ('Lost', 'Damaged', 'Stolen', 'Detail Update')),
  police_report_number VARCHAR(50),
  fee_amount NUMERIC(10, 2) NOT NULL,
  status VARCHAR(30) DEFAULT 'Under Review' CHECK (status IN ('Submitted', 'Under Review', 'Approved', 'Card Printed', 'Delivered')),
  requested_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

-- =============================================================================
-- 9. DRIVING TESTS & APPOINTMENTS
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.driving_tests (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  test_format VARCHAR(100),
  duration_minutes INTEGER,
  passing_score VARCHAR(50),
  standard_fee NUMERIC(10, 2) DEFAULT 0.00,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.test_bookings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  reference_number VARCHAR(30) UNIQUE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  application_id UUID REFERENCES public.applications(id) ON DELETE SET NULL,
  test_type VARCHAR(50) NOT NULL CHECK (test_type IN ('Theory Test', 'Vision Test', 'Practical Test', 'Retake Test')),
  license_class_id VARCHAR(30) REFERENCES public.license_classes(id),
  center_id VARCHAR(50) REFERENCES public.test_centers(id),
  appointment_date DATE NOT NULL,
  time_slot VARCHAR(50) NOT NULL,
  status VARCHAR(30) DEFAULT 'Confirmed' CHECK (status IN ('Scheduled', 'Confirmed', 'In Progress', 'Completed', 'Rescheduled', 'Cancelled', 'No Show')),
  score INTEGER,
  passed BOOLEAN,
  examiner_notes TEXT,
  booked_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Alias view for appointments
CREATE TABLE IF NOT EXISTS public.test_appointments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  reference_number VARCHAR(30) UNIQUE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  application_id UUID REFERENCES public.applications(id) ON DELETE SET NULL,
  test_type VARCHAR(50) NOT NULL,
  license_class_id VARCHAR(30) REFERENCES public.license_classes(id),
  center_id VARCHAR(50) REFERENCES public.test_centers(id),
  appointment_date DATE NOT NULL,
  time_slot VARCHAR(50) NOT NULL,
  status VARCHAR(30) DEFAULT 'Confirmed',
  score INTEGER,
  passed BOOLEAN,
  examiner_notes TEXT,
  booked_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.test_results (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  appointment_id UUID REFERENCES public.test_appointments(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  test_type VARCHAR(50) NOT NULL,
  score_achieved INTEGER,
  max_score INTEGER DEFAULT 40,
  is_pass BOOLEAN NOT NULL,
  examiner_name VARCHAR(100),
  evaluation_details JSONB,
  certified_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================================
-- 10. NOTIFICATIONS
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  title VARCHAR(150) NOT NULL,
  message TEXT NOT NULL,
  type VARCHAR(30) DEFAULT 'system' CHECK (type IN ('application', 'appointment', 'license', 'payment', 'system')),
  reference_id VARCHAR(50),
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================================
-- 11. NEWS, ANNOUNCEMENTS & EVENTS
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.news_articles (
  id VARCHAR(50) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  category VARCHAR(50) NOT NULL,
  category_label VARCHAR(50) NOT NULL,
  date_published DATE NOT NULL,
  author VARCHAR(100) NOT NULL,
  read_time VARCHAR(30),
  image_url TEXT,
  summary TEXT,
  content TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.contact_messages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  reference_number VARCHAR(30) UNIQUE NOT NULL,
  full_name VARCHAR(150) NOT NULL,
  email VARCHAR(150) NOT NULL,
  phone VARCHAR(30),
  subject VARCHAR(200) NOT NULL,
  message TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'New' CHECK (status IN ('New', 'In Progress', 'Resolved')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email VARCHAR(150) UNIQUE NOT NULL,
  subscribed_at TIMESTAMPTZ DEFAULT NOW(),
  active BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS public.event_registrations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  reference_number VARCHAR(30) UNIQUE NOT NULL,
  event_id VARCHAR(50) NOT NULL,
  event_title VARCHAR(200) NOT NULL,
  full_name VARCHAR(150) NOT NULL,
  email VARCHAR(150) NOT NULL,
  phone VARCHAR(30),
  seats INTEGER DEFAULT 1,
  registered_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================================
-- 12. AUDIT & ACTIVITY LOGS
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.activity_logs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  action VARCHAR(100) NOT NULL,
  entity_type VARCHAR(50) NOT NULL,
  entity_id VARCHAR(50),
  details JSONB,
  ip_address VARCHAR(50),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================================
-- INDEXES FOR PERFORMANCE
-- =============================================================================
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);
CREATE INDEX IF NOT EXISTS idx_profiles_national_id ON public.profiles(national_id);
CREATE INDEX IF NOT EXISTS idx_applications_user_id ON public.applications(user_id);
CREATE INDEX IF NOT EXISTS idx_applications_status ON public.applications(status);
CREATE INDEX IF NOT EXISTS idx_licenses_user_id ON public.driving_licenses(user_id);
CREATE INDEX IF NOT EXISTS idx_appointments_user_id ON public.test_appointments(user_id);
CREATE INDEX IF NOT EXISTS idx_appointments_date ON public.test_appointments(appointment_date);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON public.notifications(user_id);

-- =============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =============================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.driving_licenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.license_renewals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.replacement_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.test_appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.test_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

-- Profiles RLS
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Admins have full profile access"
  ON public.profiles FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.role_id = 'admin'
    )
  );

-- Applications RLS
CREATE POLICY "Citizens can view their own applications"
  ON public.applications FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Citizens can submit applications"
  ON public.applications FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins have full applications access"
  ON public.applications FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.role_id = 'admin'
    )
  );

-- Driving Licenses RLS
CREATE POLICY "Citizens can view their own licenses"
  ON public.driving_licenses FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins have full driving licenses access"
  ON public.driving_licenses FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.role_id = 'admin'
    )
  );

-- Appointments RLS
CREATE POLICY "Citizens can view own appointments"
  ON public.test_appointments FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Citizens can create appointments"
  ON public.test_appointments FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Citizens can reschedule own appointment"
  ON public.test_appointments FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Admins have full appointments access"
  ON public.test_appointments FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.role_id = 'admin'
    )
  );

-- Notifications RLS
CREATE POLICY "Citizens can view own notifications"
  ON public.notifications FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Citizens can update own notifications"
  ON public.notifications FOR UPDATE
  USING (auth.uid() = user_id);
