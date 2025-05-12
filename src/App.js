// App.jsx
import React, { useEffect, useState, useRef } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import { ScrollToTop } from './hooks';
import {
  Home, Stakeholders, TankerFreight, Tools, CargoStatistics, Publications,
  Login, Signup, ResetPassword, NotFound, WhoAreYou, EmailVerification,
  Bank, FreightRateForm, FreightRateRequest, FreightAnalysis, Profile, Settings,
  CheckValidation
} from './pages';
import {
  Navbar, Footer, SignUpLayout, ProtectedRoute, Loader
} from './components'; // Import Loader here

import './App.scss';
import ShipperDashboard from './pages/ShipperDashboard/ShipperDashboard';
import MainDashboard from './pages/ShipperDashboard/MainDashboard';

const MainLayout = ({ children }) => (
  <>
    <Navbar />
    <div className="h-[140px] bg-slate-600 lg:h-20" />
    {children}
    <Footer />
  </>
);

// ✅ Utility to get first segment of a path
const getTopSegment = (path) => path.split('/')[1] || '';

const AppRoutes = () => {
  const location = useLocation();
  const prevPathRef = useRef(location.pathname);
  const [loading, setLoading] = useState(false);
  const [fade, setFade] = useState(true);
  const [delayedLocation, setDelayedLocation] = useState(location); // Track the delayed location

  useEffect(() => {
    const prevSegment = getTopSegment(prevPathRef.current);
    const currentSegment = getTopSegment(location.pathname);

    const segmentChanged = prevSegment !== currentSegment;

    if (segmentChanged) {
      setFade(false); // Trigger fade-out
      setLoading(true);

      const timeout = setTimeout(() => {
        setDelayedLocation(location); // Update the delayed location (preserve state)
        setLoading(false);
        setFade(true); // Trigger fade-in
        prevPathRef.current = location.pathname;
      }, 2500); // Delay of 2500ms

      return () => clearTimeout(timeout);
    } else {
      setDelayedLocation(location); // Update the delayed location immediately
      prevPathRef.current = location.pathname;
    }
  }, [location]);

  return (
    <>
      {loading && <Loader />}
      <div className={`transition-opacity duration-500 ${fade && 'opacity-100'}`}>
        <div className="app__container scroll-smooth snap-none">
          <Routes location={delayedLocation}> {/* Use delayedLocation for routing */}
            {/* Top-level public routes */}
            <Route path="/" element={<MainLayout><Home /></MainLayout>} />
            <Route path="/home" element={<MainLayout><Home /></MainLayout>} />
            <Route path="/stakeholders" element={<MainLayout><Stakeholders /></MainLayout>} />
            <Route path="/tanker-freight" element={<MainLayout><TankerFreight /></MainLayout>} />
            <Route path="/tools" element={<MainLayout><Tools /></MainLayout>} />
            <Route path="/cargo-statistics" element={<MainLayout><CargoStatistics /></MainLayout>} />
            <Route path="/publications" element={<MainLayout><Publications /></MainLayout>} />

            {/* Auth Routes */}
            <Route path="/whoareyou" element={<SignUpLayout />}>
              <Route index element={<WhoAreYou />} />
              <Route path="signup" element={<Signup />} />
              <Route path="email-verification" element={<EmailVerification />} />
              <Route path="check-validation" element={<CheckValidation />} />
            </Route>

            {/* Dashboard Routes */}
            <Route path="/shipper-dashboard" element={<ProtectedRoute><ShipperDashboard /></ProtectedRoute>}>
              <Route index element={<ProtectedRoute><MainDashboard /></ProtectedRoute>} />
              <Route path="dashboard" element={<ProtectedRoute><MainDashboard /></ProtectedRoute>} />
              <Route path="bank" element={<ProtectedRoute><Bank /></ProtectedRoute>} />
              <Route path="freight-rate-form" element={<ProtectedRoute><FreightRateForm /></ProtectedRoute>} />
              <Route path="freight-rate-request" element={<ProtectedRoute><FreightRateRequest /></ProtectedRoute>} />
              <Route path="freight-analysis" element={<ProtectedRoute><FreightAnalysis /></ProtectedRoute>} />
              <Route path="profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
            </Route>

            {/* Login/Reset */}
            <Route path="/login" element={<Login />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;


