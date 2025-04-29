import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { ScrollToTop } from './hooks';
import { Home, Stakeholders, TankerFreight, Tools, CargoStatistics, Publications, Login, Signup, ForgotPassword, ResetPassword, NotFound, WhoAreYou } from './pages';
import { Navbar, Footer, SignUpLayout } from './components';

import './App.scss';

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
          <Route path="/freight" element={<MainLayout><TankerFreight /></MainLayout>} />
          <Route path="/tools" element={<MainLayout><Tools /></MainLayout>} />
          <Route path="/statistics" element={<MainLayout><CargoStatistics /></MainLayout>} />
          <Route path="/publications" element={<MainLayout><Publications /></MainLayout>} />

          {/* Auth Routes */}
          <Route path="/whoareyou" element={<SignUpLayout />}>
            <Route index element={<WhoAreYou />} />
            <Route path="signup" element={<Signup />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
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
