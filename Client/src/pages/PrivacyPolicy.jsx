import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import {
  ArrowLeft,
  ShieldCheck,
  Database,
  ListChecks,
  Server,
  Users,
  Lock,
  Bot,
  Clock,
  Link2,
  UserCog,
  RefreshCw,
  Mail,
  Download
} from "lucide-react";
import "./privacy.css";

const policySections = [
    {
      id: "purpose",
      icon: <Database size={24} />,
      title: "1. Purpose of Data Collection",
      content: (
        <>
          <p className="text-muted lh-lg">
            Classora collects information only to support academic workflows. We do not collect personal data for advertising, profiling, or social networking purposes.
          </p>
          <p className="fw-bold text-dark mb-2">All data processing is performed to:</p>
          <ul className="custom-bullet-list mb-0">
            <li>Enable assignment creation, submission, evaluation, and result publication</li>
            <li>Ensure accountability, transparency, and academic integrity</li>
            <li>Support institutional administration and compliance</li>
          </ul>
        </>
      ),
    },
    {
      id: "info-collected",
      icon: <ListChecks size={24} />,
      title: "2. Information We Collect",
      content: (
        <>
          <h5 className="fw-bold text-primary-custom mb-2">a) Institutional & User Information</h5>
          <p className="text-muted mb-2">Classora may collect:</p>
          <ul className="custom-bullet-list mb-4">
            <li>Name, institutional email ID, and role (Student, Faculty, Admin)</li>
            <li>Academic identifiers (roll number, course, class, department)</li>
            <li>Login credentials (securely encrypted)</li>
          </ul>
          <h5 className="fw-bold text-primary-custom mb-2">b) Academic Content</h5>
          <ul className="custom-bullet-list mb-4">
            <li>Assignment files uploaded by students</li>
            <li>Submission timestamps and status</li>
            <li>Faculty feedback, remarks, and grades</li>
          </ul>
          <h5 className="fw-bold text-primary-custom mb-2">c) Technical & Usage Data</h5>
          <ul className="custom-bullet-list mb-0">
            <li>Login timestamps and activity logs</li>
            <li>Device and browser information (for security and performance only)</li>
            <li>Essential cookies used solely for maintaining secure login sessions.</li>
          </ul>
        </>
      ),
    },
    {
      id: "how-used",
      icon: <Server size={24} />,
      title: "3. How Information Is Used",
      content: (
        <>
          <p className="fw-bold text-dark mb-2">Collected data is used strictly to:</p>
          <ul className="custom-bullet-list mb-4">
            <li>Manage academic assignments and evaluations</li>
            <li>Track submission deadlines and status</li>
            <li>Enable faculty feedback and grade publication</li>
            <li>Maintain platform security and system integrity</li>
          </ul>
          <div className="bg-danger bg-opacity-10 p-3 rounded-end-5 border-start border-danger border-4">
            <p className="fw-bold text-danger mb-2">Classora does NOT:</p>
            <ul className="mb-0 text-danger opacity-75">
              <li className="mb-1">Sell or rent user data</li>
              <li className="mb-1">Use data for marketing or advertising</li>
              <li>Share data with unauthorized third parties</li>
            </ul>
          </div>
        </>
      ),
    },
    {
      id: "ownership",
      icon: <ShieldCheck size={24} />,
      title: "4. Data Ownership & Institutional Control",
      content: (
        <>
          <p className="text-muted lh-lg fw-bold text-dark">
            All academic and user data stored on Classora is the exclusive property of the institution.
          </p>
          <p className="text-muted mb-2">Classora acts only as a secure digital facilitator, providing:</p>
          <ul className="custom-bullet-list mb-4">
            <li>Centralized storage</li>
            <li>Role-based access control</li>
            <li>Institutional visibility and oversight</li>
          </ul>
          <p className="text-muted lh-lg mb-0">
            Institutions may request data export, archival, or removal in accordance with their academic policies.
          </p>
        </>
      ),
    },
    {
      id: "access",
      icon: <Users size={24} />,
      title: "5. Data Access & Role-Based Permissions",
      content: (
        <>
          <p className="text-muted mb-2">Access to data is strictly controlled based on user roles:</p>
          <ul className="custom-bullet-list mb-4">
            <li><strong>Students</strong> can view only their own submissions, grades, and feedback</li>
            <li><strong>Faculty</strong> can access submissions related to their assigned courses</li>
            <li><strong>Administrators</strong> have institution-level oversight based on permissions</li>
          </ul>
          <p className="text-muted mb-0 border-top pt-3">
            Unauthorized access is actively prevented through access controls and authentication mechanisms.
          </p>
        </>
      ),
    },
    {
      id: "security",
      icon: <Lock size={24} />,
      title: "6. Data Security Measures",
      content: (
        <>
          <p className="text-muted mb-2">Classora implements industry-standard security practices, including:</p>
          <ul className="custom-bullet-list mb-4">
            <li>Secure APIs and encrypted communication</li>
            <li>Controlled database access</li>
            <li>Regular system monitoring and integrity checks</li>
          </ul>
          <p className="text-muted mb-0 fst-italic">
            While no digital platform can guarantee absolute security, Classora continuously works to protect academic data against unauthorized access, misuse, or loss.
          </p>
        </>
      ),
    },
    {
      id: "ai",
      icon: <Bot size={24} />,
      title: "7. Use of Automation & AI Assistance",
      content: (
        <>
          <p className="text-muted mb-2">Classora may use limited automation to:</p>
          <ul className="custom-bullet-list mb-4">
            <li>Flag late submissions</li>
            <li>Identify highly similar content</li>
            <li>Assist with keyword relevance checks</li>
          </ul>
          <div className="bg-light p-3 rounded-end-5 border-start border-primary border-4">
            <p className="text-dark fw-medium mb-0">
              These features are supportive only and never replace human academic judgment. All final grading and academic decisions remain with faculty members.
            </p>
          </div>
        </>
      ),
    },
    {
      id: "retention",
      icon: <Clock size={24} />,
      title: "8. Data Retention",
      content: (
        <>
          <p className="text-muted mb-2">Data is retained only for the duration required by:</p>
          <ul className="custom-bullet-list mb-3">
            <li>Institutional academic policies</li>
            <li>Legal or administrative obligations</li>
          </ul>
          <p className="text-muted mb-0">
            Upon institutional request, data may be archived or securely deleted as per agreed procedures.
          </p>
        </>
      ),
    },
    {
      id: "third-party",
      icon: <Link2 size={24} />,
      title: "9. Third-Party Services",
      content: (
        <>
          <p className="text-muted lh-lg mb-2">
            Classora does not integrate with third-party advertising or social media platforms.
          </p>
          <p className="text-muted lh-lg mb-0">
            Any essential third-party services (such as hosting or infrastructure) are used strictly to support platform functionality and are bound by confidentiality and security obligations.
          </p>
        </>
      ),
    },
    {
      id: "rights",
      icon: <UserCog size={24} />,
      title: "10. User Rights & Responsibilities",
      content: (
        <>
          <p className="text-dark fw-bold mb-2">Users are responsible for:</p>
          <ul className="custom-bullet-list mb-4">
            <li>Maintaining the confidentiality of their login credentials</li>
            <li>Ensuring uploaded content complies with institutional rules</li>
          </ul>
          <p className="text-dark fw-bold mb-2">Users may request:</p>
          <ul className="custom-bullet-list mb-0">
            <li>Access to their stored information</li>
            <li>Correction of inaccurate data through institutional administrators</li>
          </ul>
        </>
      ),
    },
    {
      id: "updates",
      icon: <RefreshCw size={24} />,
      title: "11. Policy Updates",
      content: (
        <>
          <p className="text-muted mb-2">Classora may update this Privacy Policy to reflect:</p>
          <ul className="custom-bullet-list mb-3">
            <li>Platform enhancements</li>
            <li>Regulatory or institutional requirements</li>
          </ul>
          <p className="text-muted mb-0">
            Any significant changes will be clearly communicated through the platform.
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
          <p className="text-muted lh-lg mb-4">
            For privacy-related questions, data concerns, or compliance inquiries, please contact our support team.
          </p>
          <div className="d-flex flex-column flex-sm-row gap-3">
            <a
              href="mailto:info@classora.com"
              className="btn text-white fw-bold px-4 py-2"
              style={{ backgroundColor: "#001b4c" }}
            >
              <Mail size={18} className="me-2 mb-1 smallText" />
              info@classora.com
            </a>
            <button
              onClick={() => navigate("/contactUs")}
              className="btn btn-outline-secondary fw-bold px-4 py-2 smallText"
            >
              Visit Contact Us
            </button>
          </div>
        </>
      ),
    },
  ];

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navLinks = [
    { id: "purpose", title: "1. Purpose of Data Collection" },
    { id: "info-collected", title: "2. Information We Collect" },
    { id: "how-used", title: "3. How Information Is Used" },
    { id: "ownership", title: "4. Data Ownership & Control" },
    { id: "access", title: "5. Role-Based Permissions" },
    { id: "security", title: "6. Data Security Measures" },
    { id: "ai", title: "7. Automation & AI Assistance" },
    { id: "retention", title: "8. Data Retention" },
    { id: "third-party", title: "9. Third-Party Services" },
    { id: "rights", title: "10. User Rights & Responsibilities" },
    { id: "updates", title: "11. Policy Updates" },
    { id: "contact", title: "12. Contact Information" },
  ];

  return (
    <div className="bg-light pb-5">
      {/* --- HERO HEADER --- */}
      <div
        className="text-white py-5 mb-5 position-relative overflow-hidden"
        style={{ backgroundColor: "#001b4c" }}
      >
        <div className="container position-relative z-1 py-4">
          <button
            onClick={() => navigate(-1)}
            className="btn btn-link text-white-50 text-decoration-none p-0 mb-4 d-flex align-items-center gap-2 back-btn-hover"
          >
            <ArrowLeft size={18} /> Back
          </button>
          <div className="d-flex align-items-center gap-3 mb-3">
            <div className="p-3 bg-white bg-opacity-10 rounded-4">
              <ShieldCheck size={40} className="text-white" />
            </div>
            <div>
              <h1 className="display-5 fw-bold mb-0">Privacy Policy</h1>
              <p className="opacity-75 mb-0 fs-6 fw-light">
                <span className="fw-semibold">Last Updated:</span> April 5, 2026
              </p>
            </div>
          </div>
          <p className="fw-light text-light opacity-75 mt-0 max-w-700">
            Classora respects the privacy of educational institutions, faculty
            members, and students. By accessing or using Classora, you agree to
            the practices described in this policy.
          </p>
        </div>
        {/* Background decorative element */}
        <ShieldCheck
          size={400}
          className="position-absolute text-light big-shield d-none d-lg-block"
          style={{ transform: "translate(20%, -20%)", top: 72, right: 27 }}
        />
      </div>

      <div className="container">
        <div className="row g-4 g-xl-5">
          {/* --- LEFT SIDEBAR (STICKY NAV) --- */}
          <div className="col-lg-4 d-none d-lg-block">
            <div className="sticky-top" style={{ top: "20px" }}>
              <div className="bg-white rounded-4 shadow-sm border p-4" style={{maxHeight: "100%", overflowY: "auto", scrollbarWidth:"none" }}>
                <h6 className="fw-bold text-dark text-uppercase small tracking-widest">
                  Table of Contents
                </h6>
                <div className="d-flex flex-column policy-nav">
                  {navLinks.map((link) => (
                    <HashLink
                      smooth
                      key={link.id}
                      to={`#${link.id}`}
                      className="text-decoration-none policy-nav-links text-muted fw-light p-2 rounded-end-4 transition-all"
                    >
                      {link.title}
                    </HashLink>
                  ))}
                </div>
                <div className="mt-1 pt-2 border-top text-center">
                  <p className="small text-muted mb-3">
                    Need a copy for your institution?
                  </p>
                  <a
                    href="Privacy_Policy_Classora_2026.pdf"
                    download="Privacy_Policy_Classora_2026.pdf"
                    className="btn btn-outline-dark btn-sm w-100 fw-bold rounded-pill"
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
            {policySections.map((section) => (
              <div
                key={section.id}
                id={section.id}
                className="bg-white text-start rounded-4 shadow-sm border p-4 p-md-5 mb-4 scroll-mt"
              >
                {/* Section Header (Icon + Title) */}
                <div className="row align-items-center gap-4 mb-4 justify-content-lg-start justify-content-center">
                  <div className="col-4 icon-box">
                    {section.icon}
                  </div>
                  <p className="col-8 fw-bold fs-4 m-0 text-dark smallHeading">
                    {section.title}
                  </p>
                </div>

                {/* Section Content */}
                <div className="policy-text">
                  {section.content}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
