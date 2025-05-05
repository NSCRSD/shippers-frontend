import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { ScrollToTop } from './hooks';
import { Home, Stakeholders, TankerFreight, Tools, CargoStatistics, Publications, Login, Signup, ResetPassword, NotFound, WhoAreYou, Department, EmailVerification, Bank, FreightRateForm, FreightRateRequest, Profile, Settings } from './pages';
import { Navbar, Footer, SignUpLayout } from './components';

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

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="app__container scroll-smooth snap-none">
        <Routes>
          {/* Routes with Navbar and Footer */}
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
            <Route path="department" element={<Department />} />
            <Route path="email-verification" element={<EmailVerification />} />
          </Route>

          {/* Shipper Dashboard Routes */}
          <Route path="/shipper-dashboard" element={<ShipperDashboard />} >
            <Route index element={<MainDashboard />} />
            <Route path="main-dashboard" element={<MainDashboard />} />
            <Route path="bank" element={<Bank />} />
            <Route path="freight-rate-form" element={<FreightRateForm />} />
            <Route path="freight-rate-request" element={<FreightRateRequest />} />
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          {/* Route without Navbar and Footer */}
          <Route path="/login" element={<Login />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
