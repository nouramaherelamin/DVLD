# Licentra – Driving & Vehicle License Department (DVLD)
### Official Citizen Web Portal | React.js Enterprise Platform

![Licentra Brand](public/assets/images/brand/logo.svg)

---

## 1. Project Overview

**Licentra** is the modern, official public digital portal for the **Driving & Vehicle License Department (DVLD)**. It provides an enterprise-grade digital gateway for citizens, commercial operators, and foreign residents across Egypt to manage driver licensing, book driving examinations, review license categories, follow official road safety updates, apply for online renewals, and manage citizen appointments.

This repository features the complete **React.js (JSX + Vite)** migration of the Licentra portal. The migration adheres strictly to the **Licentra Design System** centered around **Crimson Red (`#E72F3D`)**, **Executive Navy (`#0A192F`)**, and a comprehensive **Dark / Light Mode system**, preserving 100% of the original visual design, business logic, authentication, forms, wizards, dashboards, and Supabase database integration.

---

## 2. Technology Stack

- **Framework**: React.js 19 (JavaScript JSX, NO TypeScript)
- **Build Tool**: Vite 8 (Ultra-fast HMR and optimized production bundling)
- **Routing**: React Router DOM (v7) with full support for modern routes and backward-compatible `.html` URL aliases
- **State Management**: React Hooks (`useState`, `useEffect`, `useMemo`, `useCallback`) & React Context API (`ThemeContext`, `AuthContext`)
- **UI Framework & Icons**: Bootstrap 5.3 + Bootstrap Icons 1.11
- **Database & Auth Layer**: Supabase Client (`@supabase/supabase-js`) + Enterprise client-side persistence repository (`LicentraDB` fallback)
- **Automated Testing**: Node.js Functional Audit & Security Verification Suite (107 automated checks)

---

## 3. Project Architecture

The application is structured into a clean, modular React hierarchy:

```text
licentra/
├── index.html                           # Vite application entry shell
├── package.json                         # Dependencies & run scripts
├── vite.config.mjs                      # Vite build & dev server configuration
├── README.md                            # Complete documentation & mapping
│
├── public/
│   └── assets/                          # Static images, icons, vehicle photography, brand assets
│       ├── images/
│       │   ├── brand/
│       │   ├── hero/
│       │   ├── icons/
│       │   ├── news/
│       │   ├── tests/
│       │   └── vehicles/
│
├── src/
│   ├── main.jsx                         # React root entry, mounts Providers & App
│   ├── App.jsx                          # React Router DOM configuration & route definitions
│   │
│   ├── components/
│   │   ├── common/
│   │   │   └── Toast.jsx                # Global notification toast container (window.showToast)
│   │   └── layout/
│   │       ├── TopBar.jsx               # Utility bar (contact, dark mode toggle, user menu)
│   │       ├── Navbar.jsx               # Brand header & navigation links
│   │       ├── Footer.jsx               # Portal footer & newsletter subscription
│   │       ├── SearchModal.jsx          # Ctrl+K global search dialog across services & news
│   │       ├── ChatWidgetModal.jsx      # 24/7 AI virtual assistant modal
│   │       └── BackToTop.jsx            # Smooth back-to-top floating button
│   │
│   ├── layouts/
│   │   ├── PublicLayout.jsx             # Public portal shell (TopBar, Navbar, Footer, Modals)
│   │   ├── UserLayout.jsx               # Protected Citizen portal shell & route guard
│   │   └── AdminLayout.jsx              # Protected Admin portal shell & application review drawer
│   │
│   ├── pages/
│   │   ├── public/
│   │   │   ├── Home.jsx                 # Portal homepage with services & class showcase
│   │   │   ├── About.jsx                # Department story, leadership team & facilities
│   │   │   ├── Services.jsx             # 8-service directory & interactive preview modal
│   │   │   ├── ServiceDetails.jsx       # Dynamic 8-service deep view with fee breakdown
│   │   │   ├── LicenseClasses.jsx       # 7-class reference & side-by-side comparison modal
│   │   │   ├── LicenseClassDetails.jsx  # Dedicated class specifications & vehicle details
│   │   │   ├── DrivingTests.jsx         # Theory, vision, and practical test booking center
│   │   │   ├── News.jsx                 # Media hub, live keyword search & event registration
│   │   │   ├── NewsDetails.jsx          # Dedicated article reader with social share & related links
│   │   │   └── Contact.jsx              # Inquiry desk & interactive GPS center switcher
│   │   │
│   │   ├── auth/
│   │   │   ├── Login.jsx                # Citizen & admin login with demo quick-autofill
│   │   │   └── Register.jsx             # Citizen registration with 14-digit NID validation
│   │   │
│   │   ├── user/
│   │   │   ├── UserApply.jsx            # 5-step license application wizard & test bookings manager
│   │   │   ├── UserOverview.jsx         # Citizen dashboard KPI metrics, smart card, and activities
│   │   │   ├── UserApplications.jsx     # License applications table, renewals & replacement modal
│   │   │   └── UserLicensesAppointments.jsx # Issued licenses view & driving test booking manager
│   │   │
│   │   └── admin/
│   │       ├── AdminOverview.jsx        # Executive analytics dashboard, charts, gauges, pass rates
│   │       ├── AdminPeopleApplications.jsx # License applications manager & citizens registry
│   │       └── AdminOperations.jsx      # 6 operational tabs (Tests, Issuance, Appointments, Reports)
│   │
│   ├── context/
│   │   ├── ThemeContext.jsx             # Dark / Light theme provider (persisted in localStorage)
│   │   └── AuthContext.jsx              # Authentication session, login, register, and logout
│   │
│   ├── hooks/
│   │   ├── useTheme.js                  # Custom hook for theme state & toggling
│   │   └── useAuth.js                   # Custom hook for user session & permissions
│   │
│   ├── services/
│   │   ├── supabase.js                  # Production Supabase client & environment loader
│   │   └── db.js                        # Complete LicentraDB repository API & fallback storage
│   │
│   ├── utils/
│   │   ├── validation.js                # Egyptian NID checksum parser & password policy
│   │   └── formatters.js                # Currency (EGP), date, and badge formatting utilities
│   │
│   └── styles/
│       ├── variables.css                # Primary crimson #E72F3D, navy #0A192F & dark tokens
│       ├── main.css                     # Global base styles, typography, buttons, and navigation
│       ├── pages.css                    # Public page styles, stepper, modals, test cards
│       └── dashboard.css                # Admin & citizen portal layouts, smart card, charts
│
├── supabase/
│   └── schema.sql                       # Production PostgreSQL schema, tables, and RLS policies
│
└── tests/
    ├── audit.test.js                    # HTML links, assets, and LicentraDB repository tests
    ├── auth.test.js                     # Password policy, National ID checksum & session tests
    └── react-routes.test.cjs            # React component integrity & route verification suite
```

---

## 4. Page Mapping (Original HTML to React JSX)

Every original HTML page has been mapped to its corresponding React JSX component with full backward-compatible routing:

| Original HTML Page | Migrated React Component | React Route | Legacy Route Alias |
|---|---|---|---|
| `index.html` | `src/pages/public/Home.jsx` | `/` | `/index.html` |
| `about.html` | `src/pages/public/About.jsx` | `/about` | `/about.html` |
| `services.html` | `src/pages/public/Services.jsx` | `/services` | `/services.html` |
| `service-details.html` | `src/pages/public/ServiceDetails.jsx` | `/services/:id` | `/service-details.html` |
| `license-classes.html` | `src/pages/public/LicenseClasses.jsx` | `/license-classes` | `/license-classes.html` |
| `license-class-details.html` | `src/pages/public/LicenseClassDetails.jsx` | `/license-classes/:id` | `/license-class-details.html` |
| `driving-tests.html` | `src/pages/public/DrivingTests.jsx` | `/driving-tests` | `/driving-tests.html` |
| `news.html` | `src/pages/public/News.jsx` | `/news` | `/news.html` |
| `news-details.html` | `src/pages/public/NewsDetails.jsx` | `/news/:id` | `/news-details.html` |
| `contact.html` | `src/pages/public/Contact.jsx` | `/contact` | `/contact.html` |
| `login.html` | `src/pages/auth/Login.jsx` | `/login` | `/login.html` |
| `register.html` | `src/pages/auth/Register.jsx` | `/register` | `/register.html` |
| `apply.html` | `src/pages/user/UserApply.jsx` | `/apply` | `/apply.html` |
| `user-overview.html` | `src/pages/user/UserOverview.jsx` | `/user/overview` | `/user-overview.html` |
| `user-applications.html` | `src/pages/user/UserApplications.jsx` | `/user/applications` | `/user-applications.html` |
| `user-licenses-appointments.html` | `src/pages/user/UserLicensesAppointments.jsx` | `/user/licenses` | `/user-licenses-appointments.html` |
| `admin-overview.html` | `src/pages/admin/AdminOverview.jsx` | `/admin/overview` | `/admin-overview.html` |
| `admin-people-applications.html` | `src/pages/admin/AdminPeopleApplications.jsx` | `/admin/applications` | `/admin-people-applications.html` |
| `admin-operations.html` | `src/pages/admin/AdminOperations.jsx` | `/admin/operations` | `/admin-operations.html` |

---

## 5. Installation & Execution Guide

### Prerequisites
- Node.js 18+ (tested on Node.js v20 and v26)
- npm 9+

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Vite Development Server
```bash
npm run dev
```
The application will start on `http://localhost:3000`.

### 3. Build for Production
```bash
npm run build
```
Creates an optimized, production-ready build in `dist/`.

### 4. Preview Production Build
```bash
npm run preview
```

### 5. Run Automated Tests
```bash
npm test
```
Executes all 107 test cases across three test suites:
- `tests/audit.test.js`: Link integrity, local assets existence, and DB persistence.
- `tests/auth.test.js`: National ID checksum algorithm and password policy tests.
- `tests/react-routes.test.cjs`: Component structure, layouts, contexts, and route verification.

---

## 6. Pre-seeded Demo Credentials

For quick evaluation of authenticated features, use the demo credentials pre-seeded in `LicentraDB` (or click "Autofill Demo Credentials" on the Login page):

- **Citizen Account**:
  - **Email**: `ahmed.ali@example.com`
  - **Password**: `Password123!`
  - **National ID**: `29504150102345`
  - **Access**: Citizen Portal, 5-Step Application Wizard, My Bookings, Digital Smart Card.

- **Admin Account**:
  - **Email**: `mona.ali@example.com`
  - **Password**: `Password123!`
  - **Role**: `admin`
  - **Access**: Executive Analytics Overview, Citizen Registry, Applications Queue, Smart Card Production Queue, Operations Center.

---

## 7. Supabase Database Integration

The application integrates with Supabase via `@supabase/supabase-js`.
To connect your live Supabase database instance:

1. Create a `.env` file in the project root:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```
2. Execute `supabase/schema.sql` in your Supabase SQL Editor. It establishes:
   - `public.profiles`: Citizen and administrator profiles linked to `auth.users`.
   - `public.applications`: License applications with status and JSON documents.
   - `public.test_bookings`: Driving examination schedules and centers.
   - `public.contact_messages`: Citizen inquiries and support tickets.
   - `public.newsletter_subscribers`: Newsletter subscriptions.
   - `public.event_registrations`: Workshop and event attendance records.
   - Complete Row-Level Security (RLS) policies for user data isolation.

*Note: If no Supabase environment variables are provided, the system automatically falls back to `LicentraDB` using browser `localStorage`, ensuring 100% offline functionality without any configuration.*

---

## 8. License & Credits

© 2024–2026 **Licentra – Driving & Vehicle License Department (DVLD)**.  
Engineered for public service efficiency, accessibility, and road safety excellence.
