import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  FileText,
  UserCheck,
  ShieldAlert,
  Copyright,
  Bot,
  Eye,
  Lock,
  Clock,
  Ban,
  Scale,
  Gavel,
  Mail,
  Download,
} from "lucide-react";
import "./privacy.css";
import { moon, sun } from "../store/Icons";
import { useTheme } from "../store/useTheme";

const TermsOfService = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  // --- TERMS SECTIONS DATA ARRAY ---
  const termsSections = [
    {
      id: "purpose",
      icon: <FileText size={24} />,
      title: "1. Acceptance of Terms",
      content: (
        <>
          <p className="fw-light mb-0" style={{ color: "var(--text-muted)" }}>
            By registering for, logging into, or using Classora, you acknowledge
            that you have read, understood, and agree to be bound by these
            Terms, as well as our Privacy Policy. If you do not agree, you must
            not access or use the platform.
          </p>
        </>
      ),
    },
    {
      id: "accounts",
      icon: <UserCheck size={24} />,
      title: "2. User Accounts & Security",
      content: (
        <>
          <ul className="custom-bullet-list fw-light mb-0">
            <li>
              <strong style={{ color: "var(--text-main)" }}>
                Account Creation:
              </strong>{" "}
              Faculty accounts are provisioned by institutional administrators.
              Student accounts require registration and verification using an
              authorized institutional email address.
            </li>
            <li>
              <strong style={{ color: "var(--text-main)" }}>
                Account Security:
              </strong>{" "}
              You are responsible for maintaining the confidentiality of your
              login credentials (passwords, OTPs). Classora is not liable for
              any loss or damage arising from unauthorized access to your
              account due to your failure to secure your credentials.
            </li>
            <li>
              <strong style={{ color: "var(--text-main)" }}>
                Role Limitations:
              </strong>{" "}
              You agree to use only the account type (Student, Faculty, or
              Admin) explicitly authorized for you by your institution.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "acceptable-use",
      icon: <ShieldAlert size={24} />,
      title: "3. Acceptable Use Policy",
      content: (
        <>
          <p className="fw-light mb-3" style={{ color: "var(--text-muted)" }}>
            Classora is built strictly for academic and educational purposes.
            While using the platform, you agree{" "}
            <strong style={{ color: "var(--text-main)" }}>NOT</strong> to:
          </p>
          <div className="bg-danger bg-opacity-10 fw-light p-3 rounded-end-5 border-start border-danger border-4">
            <ul
              className="mb-0 opacity-75"
              style={{ color: "var(--text-main)" }}
            >
              <li>
                Upload malware, viruses, or any code that disrupts platform
                functionality.
              </li>
              <li>
                Attempt to bypass, hack, or circumvent role-based access
                controls or grading visibility restrictions.
              </li>
              <li>
                Use the platform to facilitate academic dishonesty, cheating, or
                unauthorized sharing of proprietary assignment solutions.
              </li>
              <li>
                Upload illegal, offensive, or highly sensitive non-academic
                material.
              </li>
            </ul>
          </div>
        </>
      ),
    },
    {
      id: "intellectual-property",
      icon: <Copyright size={24} />,
      title: "4. Intellectual Property & Content Ownership",
      content: (
        <>
          <ul className="custom-bullet-list fw-light mb-0">
            <li>
              <strong style={{ color: "var(--text-main)" }}>
                Your Content:
              </strong>{" "}
              Educational institutions, faculty, and students retain all
              ownership rights to the assignments, grading rubrics, and
              submission files uploaded to Classora.
            </li>
            <li>
              <strong style={{ color: "var(--text-main)" }}>
                Classora's IP:
              </strong>{" "}
              Classora retains all rights, title, and interest in the platform
              itself, including its source code, UI/UX design, logos, and
              proprietary algorithms. You may not copy, reverse-engineer, or
              resell any part of the Classora software.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "ai-grading",
      icon: <Bot size={24} />,
      title: "5. AI Assistance & Academic Grading",
      content: (
        <>
          <p className="fw-light mb-3" style={{ color: "var(--text-muted)" }}>
            Classora utilizes automated tools and AI assistance to flag late
            submissions, check for formatting compliance, and identify potential
            text similarity.
          </p>
          <div className="bg-light p-3 rounded-end-5 border-start border-primary border-4">
            <p
              className="fw-light mb-0"
              style={{ color: "var(--text-main)", fontSize: "0.9rem" }}
            >
              <strong className="fw-normal">Disclaimer:</strong> These tools are
              strictly assistive. Classora does not make final academic
              decisions. All final grading, plagiarism determinations, and
              academic consequences remain the sole responsibility of the
              faculty members and the institution.
            </p>
          </div>
        </>
      ),
    },
    {
      id: "oversight",
      icon: <Eye size={24} />,
      title: "6. Institutional Oversight & Administration",
      content: (
        <>
          <p className="fw-light mb-0" style={{ color: "var(--text-muted)" }}>
            Classora acts as a service provider to your educational institution.
            Institutional administrators hold the ultimate authority over user
            accounts. We reserve the right to suspend, modify, or delete
            accounts, or export data, strictly upon the verified request of your
            institution's administration.
          </p>
        </>
      ),
    },
    {
      id: "privacy",
      icon: <Lock size={24} />,
      title: "7. Privacy & Data Protection",
      content: (
        <>
          <p className="fw-light mb-0" style={{ color: "var(--text-muted)" }}>
            Your privacy is critical to us. The collection, storage, and
            processing of your personal and academic data are governed by our
            Privacy Policy. By agreeing to these Terms, you also consent to our
            data practices as outlined in that policy.
          </p>
        </>
      ),
    },
    {
      id: "availability",
      icon: <Clock size={24} />,
      title: "8. Service Availability & Modifications",
      content: (
        <>
          <p className="fw-light mb-2" style={{ color: "var(--text-muted)" }}>
            We strive to ensure Classora is available 24/7 to support assignment
            deadlines. However:
          </p>
          <ul className="custom-bullet-list fw-light mb-0">
            <li>We do not guarantee uninterrupted or error-free operation.</li>
            <li>
              We reserve the right to perform scheduled maintenance, which will
              be communicated in advance whenever possible.
            </li>
            <li>
              We may continuously update, modify, or deprecate features to
              improve the platform's educational utility.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "termination",
      icon: <Ban size={24} />,
      title: "9. Termination & Account Suspension",
      content: (
        <>
          <p className="fw-light mb-0" style={{ color: "var(--text-muted)" }}>
            Classora reserves the right to suspend or terminate your access to
            the platform immediately, without prior notice, if you violate these
            Terms, engage in malicious technical behavior, or upon the direct
            instruction of your affiliated institution.
          </p>
        </>
      ),
    },
    {
      id: "liability",
      icon: <Scale size={24} />,
      title: "10. Limitation of Liability",
      content: (
        <>
          <p
            className="fw-light fst-italic mb-0"
            style={{ color: "var(--text-muted)" }}
          >
            To the maximum extent permitted by law, Classora and its creators
            shall not be liable for any indirect, incidental, special, or
            consequential damages, including but not limited to loss of data,
            missed academic deadlines, or academic penalties resulting from
            platform use or downtime. The platform is provided on an "AS-IS" and
            "AS-AVAILABLE" basis.
          </p>
        </>
      ),
    },
    {
      id: "governing-law",
      icon: <Gavel size={24} />,
      title: "11. Governing Law & Dispute Resolution",
      content: (
        <>
          <p className="fw-light mb-0" style={{ color: "var(--text-muted)" }}>
            These Terms shall be governed by and construed in accordance with
            the laws of India. Any disputes arising out of or relating to these
            Terms or the use of the platform shall be subject to the exclusive
            jurisdiction of the courts located in Haryana, India.
          </p>
        </>
      ),
    },
    {
      id: "contact",
      icon: <Mail size={24} />,
      title: "12. Contact Information",
      content: (
        <>
          <p className="fw-light mb-4" style={{ color: "var(--text-muted)" }}>
            If you have any questions, concerns, or technical issues regarding
            these Terms of Service, please contact us:
          </p>
          <div className="d-flex flex-column flex-sm-row gap-3">
            <Link
              to="mailto:info@classora.com"
              className="btn smallText text-white fw-normal px-4 py-2"
              style={{ backgroundColor: "var(--btn-bg-blue)" }}
            >
              <Mail size={18} className="me-2 mb-1 fs-6" />
              info@classora.com
            </Link>
            <button
              onClick={() => {
                setTimeout(() => {
                  window.scrollTo(0, 0);
                }, 50);
                navigate("/contactUs");
              }}
              className="btn smallText btn-outline-secondary fw-normal px-4 py-2 fs-6"
            >
              Visit Contact Us
            </button>
          </div>
        </>
      ),
    },
  ];

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Dynamically generate sidebar links from the sections array
  const navLinks = termsSections.map((section) => ({
    id: section.id,
    title: section.title,
  }));

  return (
    <div className="PP policy-page" data-theme={theme}>
      <div
        className="PPBackgroundGradient min-vh-100 pb-5 border-light"
        style={{ backgroundColor: "var(--bg-main)" }}
      >
        {/* --- HERO HEADER --- */}
        <div
          className="text-white py-5 position-relative overflow-hidden"
          style={{ backgroundColor: "#001b4c" }}
        >
          <div className="container d-flex flex-column align-items-lg-start align-items-center text-lg-start text-center position-relative z-1 py-4">
            <button
              onClick={() => navigate(-1)}
              className="btn btn-link text-white-50 text-decoration-none p-0 mb-4 d-flex align-items-center gap-2 back-btn-hover"
            >
              <ArrowLeft size={18} /> Back
            </button>
            <div className="d-flex align-items-center text-start gap-3 mb-2">
              <div className="p-3 bg-white bg-opacity-25 rounded-4">
                <FileText size={40} className="text-white" />
              </div>
              <div>
                <h1 className="display-5 fw-bold mb-0">Terms of Service</h1>
                <p className="opacity-75 mb-0 fs-6 fw-lighter">
                  Last Updated: February 24, 2026
                </p>
              </div>
            </div>
            <p className="opacity-75 headText mt-0 max-w-700 fw-light px-lg-0 px-4">
              Welcome to Classora. These Terms govern your access to and use of
              the Classora digital assignment management platform. If you are
              using Classora on behalf of an educational institution, you
              represent that you have the authority to bind that institution to
              these Terms.
            </p>
          </div>
          {/* Background decorative element */}
          <FileText
            size={400}
            className="position-absolute big-shield end-0 top-0 d-none d-lg-block opacity-10"
            style={{ color: "var(--bg-main)", transform: "translate(10%, 3%)" }}
          />
        </div>

        <div className="container">
          <div className="row text-start g-4 g-xl-5 mt-3">
            {/* --- LEFT SIDEBAR (STICKY NAV) --- */}
            <div className="col-lg-4 d-none d-lg-block text-start">
              <div className="sticky-top z-1" style={{ top: "20px" }}>
                <div
                  className="rounded-4 shadow-sm border p-4"
                  style={{
                    backgroundColor: "var(--bg-surface)",
                    maxHeight: "100vh",
                    overflowY: "auto",
                    scrollbarWidth: "none",
                  }}
                >
                  <h6
                    className="fw-semibold small"
                    style={{ color: "var(--text-main)" }}
                  >
                    Table of Contents
                  </h6>
                  <div className="d-flex flex-column policy-nav">
                    {navLinks.map((link) => (
                      <a
                        key={link.id}
                        href={`#${link.id}`}
                        className="text-decoration-none policy-nav-links fw-light p-2 rounded-end-4 transition-all text-nowrap"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {link.title}
                      </a>
                    ))}
                  </div>
                  <div className="mt-2 pt-2 border-top text-center">
                    <p
                      className="small mb-3"
                      style={{ color: "var(--text-muted)" }}
                    >
                      Need a copy for your institution?
                    </p>
                    <a
                      href="./public/Terms_of_service_Classora.pdf"
                      download="Classora_Terms_of_Service.pdf"
                      className={`btn ${
                        theme === "dark"
                          ? "btn-outline-light"
                          : "btn-outline-dark "
                      } btn-sm w-100 fw-bold rounded-pill`}
                    >
                      <Download size={16} className="me-2 mb-1" />
                      Download PDF Version
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* --- RIGHT PANEL (CONTENT) --- */}
            <div className="col-lg-8 policy-content">
              {termsSections.map((section) => (
                <div
                  key={section.id}
                  id={section.id}
                  className="text-start bodyText rounded-4 shadow-sm border pt-3 pb-5 px-3 p-lg-5 mb-4 scroll-mt"
                  style={{ backgroundColor: "var(--bg-surface)" }}
                >
                  <div className="d-flex align-items-center gap-3 mb-2">
                    <div
                      className="col-2 col-md-1 icon-box"
                      style={{
                        backgroundColor: "var(--btn-bg-blue)",
                        color: "var(--text-white)",
                      }}
                    >
                      {section.icon}
                    </div>
                    <h3
                      className="fw-bold m-0 bodyTitle"
                      style={{ color: "var(--text-main)" }}
                    >
                      {section.title}
                    </h3>
                  </div>

                  {/* Section Content */}
                  <div className="policy-text pt-2">{section.content}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* --- FLOATING THEME TOGGLE --- */}
      <span
        className="position-fixed shadow-lg z-3 p-1 rounded-circle"
        style={{
          bottom: "2rem",
          right: "2rem",
          width: "56px",
          height: "56px",
          zIndex: 1000,
          backgroundColor: "var(--bg-surface)",
        }}
      >
        <button
          onClick={toggleTheme}
          className="theme-toggle-btn w-100 h-100 rounded-circle btn-click-animation d-flex align-items-center justify-content-center"
          style={{ color: "var(--text-main)" }}
          aria-label="Toggle Theme"
          title="Toggle Theme"
        >
          <svg
            width="28"
            height="28"
            fill="currentColor"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {theme === "light" ? moon : sun}
          </svg>
        </button>
      </span>
    </div>
  );
};

export default TermsOfService;
