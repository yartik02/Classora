import { Routes, Route, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import AboutUs from "./pages/AboutUs";
import Home from "./pages/Home";
import ContactUs from "./pages/ContactUs";
import Register from "./pages/Register";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";


function app() {
  const location = useLocation();
  const hideNavbarAndFooter =
    location.pathname === "/register" ||
    location.pathname === "/login" ||
    location.pathname === "/complaintSubmission" ||
    location.pathname.includes("/dashboard") ||
    location.pathname.includes("/suspended-account") ||
    location.pathname === "/forgot-password" ||
    location.pathname === "/terms-of-service" ||
    location.pathname === "/privacy-policy";
  return (
    <>
      {!hideNavbarAndFooter && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/contactUs" element={<ContactUs />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
      </Routes>
      {!hideNavbarAndFooter && <Footer/>}
    </>
  );
}

export default app;
