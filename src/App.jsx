import React, { useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';

// Layouts
import PublicLayout from './layouts/PublicLayout';
import UserLayout from './layouts/UserLayout';
import AdminLayout from './layouts/AdminLayout';

// Public Pages
import Home from './pages/public/Home';
import About from './pages/public/About';
import Services from './pages/public/Services';
import ServiceDetails from './pages/public/ServiceDetails';
import LicenseClasses from './pages/public/LicenseClasses';
import LicenseClassDetails from './pages/public/LicenseClassDetails';
import DrivingTests from './pages/public/DrivingTests';
import News from './pages/public/News';
import NewsDetails from './pages/public/NewsDetails';
import Contact from './pages/public/Contact';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// User / Citizen Pages
import UserApply from './pages/user/UserApply';
import UserOverview from './pages/user/UserOverview';
import UserApplications from './pages/user/UserApplications';
import UserLicensesAppointments from './pages/user/UserLicensesAppointments';

// Admin Pages
import AdminOverview from './pages/admin/AdminOverview';
import AdminPeopleApplications from './pages/admin/AdminPeopleApplications';
import AdminOperations from './pages/admin/AdminOperations';

// Scroll to top helper on route change
function ScrollToTop() {
  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    } else {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [pathname, search, hash]);

  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* PUBLIC ROUTES (wrapped in PublicLayout with TopBar, Navbar, Footer, Modals) */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/index.html" element={<Home />} />

          <Route path="/about" element={<About />} />
          <Route path="/about.html" element={<About />} />

          <Route path="/services" element={<Services />} />
          <Route path="/services.html" element={<Services />} />
          <Route path="/services/:id" element={<ServiceDetails />} />
          <Route path="/service-details.html" element={<ServiceDetails />} />

          <Route path="/license-classes" element={<LicenseClasses />} />
          <Route path="/license-classes.html" element={<LicenseClasses />} />
          <Route path="/license-classes/:id" element={<LicenseClassDetails />} />
          <Route path="/license-class-details.html" element={<LicenseClassDetails />} />

          <Route path="/driving-tests" element={<DrivingTests />} />
          <Route path="/driving-tests.html" element={<DrivingTests />} />

          <Route path="/news" element={<News />} />
          <Route path="/news.html" element={<News />} />
          <Route path="/news/:id" element={<NewsDetails />} />
          <Route path="/news-details.html" element={<NewsDetails />} />

          <Route path="/contact" element={<Contact />} />
          <Route path="/contact.html" element={<Contact />} />

          {/* User Application Wizard & Self-Service within Public Layout */}
          <Route path="/apply" element={<UserApply />} />
          <Route path="/apply.html" element={<UserApply />} />
        </Route>

        {/* AUTH ROUTES */}
        <Route path="/login" element={<Login />} />
        <Route path="/login.html" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register.html" element={<Register />} />

        {/* USER / CITIZEN DASHBOARD ROUTES (Protected by UserLayout) */}
        <Route element={<UserLayout />}>
          <Route path="/user/overview" element={<UserOverview />} />
          <Route path="/user-overview.html" element={<UserOverview />} />

          <Route path="/user/applications" element={<UserApplications />} />
          <Route path="/user-applications.html" element={<UserApplications />} />

          <Route path="/user/licenses" element={<UserLicensesAppointments />} />
          <Route path="/user/appointments" element={<UserLicensesAppointments />} />
          <Route path="/user-licenses-appointments.html" element={<UserLicensesAppointments />} />
        </Route>

        {/* ADMIN DASHBOARD ROUTES (Protected by AdminLayout) */}
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<Navigate to="/admin/overview" replace />} />
          <Route path="/admin/overview" element={<AdminOverview />} />
          <Route path="/admin-overview.html" element={<AdminOverview />} />

          <Route path="/admin/people" element={<AdminPeopleApplications />} />
          <Route path="/admin/applications" element={<AdminPeopleApplications />} />
          <Route path="/admin-people-applications.html" element={<AdminPeopleApplications />} />

          <Route path="/admin/operations" element={<AdminOperations />} />
          <Route path="/admin-operations.html" element={<AdminOperations />} />
        </Route>

        {/* CATCH-ALL REDIRECT TO HOME */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

