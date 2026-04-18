import React, { useState, useEffect } from "react";
import "./AdminDash.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ICONS = {
  user: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  cycle: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
    </svg>
  ),
  shield: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    </svg>
  ),
  close: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  ),
};

const MOCK_ADMIN_PROFILE = {
  name: "System Administrator",
  email: "admin@jmieti.edu.in",
  role: "Super Admin",
  lastLogin: "Today, 09:42 AM",
  status: "Active",
};

const ProfileTab = () => {
  return (
    <div className="fade-in">
      <div className="border-bottom pb-3 mb-4">
        <h4 className="fw-bold text-dark mb-1">Admin Profile</h4>
        <p className="text-secondary small mb-0">
          View your system identity and session details.
        </p>
      </div>

      <div className="border rounded-4 p-4 bg-white mb-4">
        <div className="d-flex align-items-center gap-4">
          <div
            className="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center flex-shrink-0"
            style={{ width: "64px", height: "64px" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <div>
            <h5 className="fw-bold text-dark mb-1">
              {MOCK_ADMIN_PROFILE.name}
            </h5>
            <p className="text-secondary mb-0" style={{ fontSize: "0.9rem" }}>
              {MOCK_ADMIN_PROFILE.email}
            </p>
          </div>
        </div>
      </div>

      <h6
        className="fw-bold text-dark mb-3 mt-5"
        style={{
          fontSize: "0.85rem",
          textTransform: "uppercase",
          letterSpacing: "0.5px",
        }}
      >
        Session & Role Info
      </h6>
      <div className="border rounded-4 bg-white">
        <div className="d-flex justify-content-between p-3 px-4 border-bottom">
          <span
            className="text-secondary fw-medium"
            style={{ fontSize: "0.9rem" }}
          >
            System Role
          </span>
          <span className="text-dark fw-bold" style={{ fontSize: "0.9rem" }}>
            {MOCK_ADMIN_PROFILE.role}
          </span>
        </div>
        <div className="d-flex justify-content-between p-3 px-4 border-bottom">
          <span
            className="text-secondary fw-medium"
            style={{ fontSize: "0.9rem" }}
          >
            Account Status
          </span>
          <span
            className="text-success fw-bold d-flex align-items-center gap-2"
            style={{ fontSize: "0.9rem" }}
          >
            <span
              className="bg-success rounded-circle"
              style={{ width: "6px", height: "6px" }}
            ></span>
            {MOCK_ADMIN_PROFILE.status}
          </span>
        </div>
        <div className="d-flex justify-content-between p-3 px-4">
          <span
            className="text-secondary fw-medium"
            style={{ fontSize: "0.9rem" }}
          >
            Last Login
          </span>
          <span className="text-dark fw-medium" style={{ fontSize: "0.9rem" }}>
            {MOCK_ADMIN_PROFILE.lastLogin}
          </span>
        </div>
      </div>

      <p className="text-muted small mt-4">
        * Administrative credentials are provisioned directly via the database.
        Contact IT Support for modifications.
      </p>
    </div>
  );
};

const AcademicCycleTab = ({ onOpenTransitionModal }) => {
  return (
    <div className="fade-in">
      <div className="border-bottom pb-3 mb-4">
        <h4 className="fw-bold text-dark mb-1">Academic Transitions</h4>
        <p className="text-secondary small mb-0">
          Manage global semester shifts and cohort promotions.
        </p>
      </div>

      {/* GitHub-Style Danger Zone */}
      <h6
        className="fw-bold text-danger mb-3 mt-5 d-flex align-items-center"
        style={{
          fontSize: "0.85rem",
          textTransform: "uppercase",
          letterSpacing: "0.5px",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="me-2"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" x2="12" y1="8" y2="12" />
          <line x1="12" x2="12.01" y1="16" y2="16" />
        </svg>
        Danger Zone
      </h6>
      <div className="border border-danger-subtle rounded-3 bg-danger bg-opacity-10 p-4">
        <div className="mb-3">
            <h6 className="fw-bold text-dark mb-1">Start New Semester</h6>
            <p className="text-secondary small mb-0">
              Archive current assignments, promote all active student cohorts to
              the next semester, and clear faculty allocations.{" "}
              <strong>This action cannot be undone.</strong> This should only be
              done at the official conclusion of the academic term.
            </p>
        </div>
        <div className="mt-4">
          <h6
            className="fw-bold text-dark mb-2"
            style={{ fontSize: "0.95rem" }}
          >
            Action Summary:
          </h6>
          <ul
            className="text-muted small mb-0 ps-3"
            style={{ lineHeight: "1.8" }}
          >
            <li>
              <strong>Archive:</strong> Active assignments are locked and
              archived.
            </li>
            <li>
              <strong>Promotion:</strong> Students are shifted to their next
              semester.
            </li>
            <li>
              <strong>Graduation:</strong> Final semester students are marked as
              Alumni.
            </li>
            <li>
              <strong>Reset:</strong> All Faculty-to-Subject allocations are
              cleared.
            </li>
          </ul>
        </div>
        
        <button
          className="btn btn-outline-danger mt-4 fw-bold flex-shrink-0 transition-hover"
          onClick={onOpenTransitionModal}
        >
          Initiate Transition
        </button>
      </div>
    </div>
  );
};

const PoliciesTab = () => {
  const [isStrict, setIsStrict] = useState(false);
  const [maintenance, setMaintenance] = useState(false);
  const [maxSize, setMaxSize] = useState("10MB");

  const handleToggle = (setter, stateName) => {
    setter((prev) => !prev);
    toast.success(`${stateName} policy updated.`);
  };

  const handleSelectChange = (e) => {
    setMaxSize(e.target.value);
    toast.success(`Max file size updated to ${e.target.value}.`);
  };

  return (
    <div className="fade-in">
      <div className="border-bottom pb-3 mb-4">
        <h4 className="fw-bold text-dark mb-1">Global Policies</h4>
        <p className="text-secondary small mb-0">
          Configure system-wide rules and operational constraints.
        </p>
      </div>

      <div className="border rounded-4 bg-white">
        {/* Policy Row */}
        <div className="d-flex justify-content-between align-items-center p-4 border-bottom">
          <div>
            <h6
              className="fw-bold text-dark mb-1"
              style={{ fontSize: "0.95rem" }}
            >
              Strict Late Submissions
            </h6>
            <p className="text-secondary small mb-0 pe-4">
              Physically block file uploads after the assignment deadline
              expires.
            </p>
          </div>
          <div className="form-check form-switch fs-4 m-0 flex-shrink-0">
            <input
              className="form-check-input cursor-pointer shadow-none"
              type="checkbox"
              checked={isStrict}
              onChange={() => handleToggle(setIsStrict, "Late Submission")}
            />
          </div>
        </div>

        {/* Policy Row */}
        <div className="d-flex justify-content-between align-items-center p-4 border-bottom">
          <div>
            <h6
              className="fw-bold text-dark mb-1"
              style={{ fontSize: "0.95rem" }}
            >
              Maximum Upload Size
            </h6>
            <p className="text-secondary small mb-0 pe-4">
              Set the global limit for student assignment uploads.
            </p>
          </div>
          <div className="flex-shrink-0">
            <select
              className="form-select form-select-sm border text-dark py-1 px-2 cursor-pointer shadow-none"
              style={{ width: "90px", fontSize: "0.85rem" }}
              value={maxSize}
              onChange={handleSelectChange}
            >
              <option value="5MB">5 MB</option>
              <option value="10MB">10 MB</option>
              <option value="25MB">25 MB</option>
            </select>
          </div>
        </div>

        {/* Policy Row */}
        <div className="d-flex justify-content-between align-items-center p-4">
          <div>
            <h6
              className={`fw-bold mb-1 ${maintenance ? "text-warning" : "text-dark"}`}
              style={{ fontSize: "0.95rem" }}
            >
              System Maintenance Mode
            </h6>
            <p className="text-secondary small mb-0 pe-4">
              Temporarily suspend all student and faculty logins.
            </p>
          </div>
          <div className="form-check form-switch fs-4 m-0 flex-shrink-0">
            <input
              className={`form-check-input shadow-none cursor-pointer ${maintenance ? "bg-warning border-warning" : ""}`}
              type="checkbox"
              checked={maintenance}
              onChange={() => handleToggle(setMaintenance, "Maintenance Mode")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const TransitionModal = ({ isOpen, onClose }) => {
  // Wizard Steps: 0: Checking, 1: Checklist, 2: Phrase, 3: Password, 4: Processing
  const [step, setStep] = useState(0);
  
  // Form States
  const [checks, setChecks] = useState({ archive: false, allocations: false, alumni: false });
  const [phraseInput, setPhraseInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const EXPECTED_PHRASE = "ARCHIVE SPRING 2026";
  const MOCK_ADMIN_PASSWORD = "admin";

  useEffect(() => {
    if (isOpen) {
      setStep(0); // Start at checking
      setChecks({ archive: false, allocations: false, alumni: false });
      setPhraseInput("");
      setPasswordInput("");
      
      // Simulating backend check for pending appeals/assignments
      const timer = setTimeout(() => {
        setStep(1); // Move to Checklist
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Validation Logic per step
  const allChecked = checks.archive && checks.allocations && checks.alumni;
  const phraseMatched = phraseInput === EXPECTED_PHRASE;

  const handleNextStep = (e) => {
    e.preventDefault();
    if (step === 1 && allChecked) setStep(2);
    else if (step === 2 && phraseMatched) setStep(3);
  };

  const handleExecute = (e) => {
    e.preventDefault();
    
    // Task 4: Verify Admin Password
    if (passwordInput !== MOCK_ADMIN_PASSWORD) {
      toast.error("Authentication failed: Incorrect admin password.");
      return;
    }

    setStep(4); // Processing Step

    // Simulate Heavy Backend Transition
    setTimeout(() => {
      onClose();
      toast.success("Semester Transition executed successfully. The platform has been reset.");
    }, 2500);
  };

  return (
    <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: "rgba(15, 23, 42, 0.6)", zIndex: 1050 }}>
      <div className="bg-white rounded-4 shadow-lg w-100 overflow-hidden fade-in border" style={{ maxWidth: "500px" }}>
        
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center p-3 border-bottom bg-light">
          <h6 className="fw-bold mb-0 text-dark">
            Confirm Critical Action <span className="text-muted fw-normal ms-1">{step > 0 && step < 4 ? `(Step ${step} of 3)` : ""}</span>
          </h6>
          <button className="btn btn-link text-secondary p-0" onClick={onClose} disabled={step === 4}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>

        <div className="p-4">
          
          {/* STEP 0: Prerequisite Check */}
          {step === 0 && (
            <div className="text-center py-5 fade-in">
              <div className="spinner-border text-primary mb-3" role="status" style={{ width: "1.5rem", height: "1.5rem" }}></div>
              <h6 className="fw-bold text-dark">Checking Prerequisites...</h6>
              <p className="text-secondary small mb-0">Verifying all assignments and appeals are closed.</p>
            </div>
          )}

          {/* STEP 1: Acknowledgment Checklist */}
          {step === 1 && (
            <form onSubmit={handleNextStep} className="fade-in">
              <div className="d-flex align-items-center gap-2 text-success bg-success bg-opacity-10 p-2 px-3 rounded-2 border border-success border-opacity-25 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                <span className="small fw-bold">System Ready: 0 Pending Appeals, 0 Active Assignments.</span>
              </div>

              <div className="mb-4">
                <label className="form-label fw-bold text-dark small text-uppercase" style={{ letterSpacing: "0.5px" }}>Acknowledgment</label>
                <div className="d-flex flex-column gap-3 bg-light p-3 rounded-2 border">
                  <label className="form-check d-flex align-items-start gap-2 mb-0 cursor-pointer">
                    <input className="form-check-input flex-shrink-0 mt-1" type="checkbox" checked={checks.archive} onChange={(e) => setChecks({...checks, archive: e.target.checked})} />
                    <span className="text-dark small">I understand that all active assignments will be permanently archived.</span>
                  </label>
                  <label className="form-check d-flex align-items-start gap-2 mb-0 cursor-pointer">
                    <input className="form-check-input flex-shrink-0 mt-1" type="checkbox" checked={checks.allocations} onChange={(e) => setChecks({...checks, allocations: e.target.checked})} />
                    <span className="text-dark small">I understand that all faculty-to-class allocations will be deleted.</span>
                  </label>
                  <label className="form-check d-flex align-items-start gap-2 mb-0 cursor-pointer">
                    <input className="form-check-input flex-shrink-0 mt-1" type="checkbox" checked={checks.alumni} onChange={(e) => setChecks({...checks, alumni: e.target.checked})} />
                    <span className="text-dark small">I understand that final-year students will be marked as Alumni and lose portal access.</span>
                  </label>
                </div>
              </div>

              <button type="submit" className="btn btn-dark fw-bold w-100 py-2" disabled={!allChecked}>
                Acknowledge and Continue
              </button>
            </form>
          )}

          {/* STEP 2: Dynamic Input */}
          {step === 2 && (
            <form onSubmit={handleNextStep} className="fade-in">
              <div className="mb-4">
                <label className="form-label fw-bold text-dark small text-uppercase" style={{ letterSpacing: "0.5px" }}>
                  Confirm Intent
                </label>
                <p className="text-secondary small mb-3">To ensure this is intentional, please type <span className="text-danger fw-bold user-select-all">{EXPECTED_PHRASE}</span> below.</p>
                <input 
                  type="text" 
                  className={`form-control border fw-bold text-danger ${phraseMatched ? 'border-success bg-success bg-opacity-10' : 'bg-light'}`} 
                  value={phraseInput}
                  onChange={e => setPhraseInput(e.target.value)}
                  onPaste={(e) => {
                    e.preventDefault();
                    toast.warning("Pasting is disabled. Please type the phrase manually.");
                  }}
                  onDrop={(e) => e.preventDefault()}
                  autoComplete="off"
                  placeholder=""
                  autoFocus
                />
              </div>

              <div className="d-flex gap-2">
                <button type="button" className="btn btn-light fw-medium px-4 border" onClick={() => setStep(1)}>Back</button>
                <button type="submit" className="btn btn-dark fw-bold flex-grow-1" disabled={!phraseMatched}>Continue to Authentication</button>
              </div>
            </form>
          )}

          {/* STEP 3: Password Authentication */}
          {step === 3 && (
            <form onSubmit={handleExecute} className="fade-in">
              <div className="mb-4">
                <label className="form-label fw-bold text-dark small text-uppercase" style={{ letterSpacing: "0.5px" }}>Admin Authorization</label>
                <p className="text-secondary small mb-3">Enter your administrator password to authorize this destructive action.</p>
                <input 
                  type="password" 
                  className="form-control border bg-light" 
                  placeholder="Enter your password" 
                  value={passwordInput}
                  onChange={e => setPasswordInput(e.target.value)}
                  onPaste={(e) => {
                    e.preventDefault();
                    toast.warning("Pasting is disabled. Please type the phrase manually.");
                  }}
                  onDrop={(e) => e.preventDefault()}
                  autoFocus
                />
              </div>

              <div className="d-flex gap-2">
                <button type="button" className="btn btn-light fw-medium px-4 border" onClick={() => setStep(2)}>Back</button>
                <button type="submit" className="btn btn-danger fw-bold flex-grow-1 d-flex justify-content-center align-items-center gap-2" disabled={passwordInput.length === 0}>
                  Execute Semester Transition
                </button>
              </div>
            </form>
          )}

          {/* STEP 4: Processing */}
          {step === 4 && (
            <div className="text-center py-5 fade-in">
              <div className="spinner-border text-danger mb-3" role="status" style={{ width: "1.5rem", height: "1.5rem" }}></div>
              <h6 className="fw-bold text-danger">Executing Transition...</h6>
              <p className="text-secondary small mb-0">Archiving data and promoting students. Do not close this window.</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [isTransitionModalOpen, setIsTransitionModalOpen] = useState(false);

  const TABS = [
    { id: "profile", label: "Admin Profile", icon: ICONS.user },
    { id: "policies", label: "Global Policies", icon: ICONS.shield },
    { id: "cycle", label: "Academic Transitions", icon: ICONS.cycle },
  ];

  return (
    <div className="settings-container bg-white fade-in pb-5">

      {/* HEADER */}
      <div className="text-center mt-5 mb-4">
        <h1
          className="fw-bolder text-dark mb-2"
          style={{ letterSpacing: "-0.5px" }}
        >
          Settings
        </h1>
        <p className="text-muted fw-medium fs-6">
          Manage your system preferences and policies.
        </p>
      </div>

      {/* MINIMALIST SPLIT LAYOUT */}
      <div className="card px-4 px-md-5 border-0">
        <div className="row m-0 rounded-4 overflow-hidden bg-light border shadow-sm">
          {/* LEFT SIDEBAR */}
          <div className="col-12 col-md-3 p-0 bg-secondary p-4 pe-0">
            <nav className="nav flex-column gap-1">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  className={`btn text-start px-4 py-3 rounded-4 rounded-end-0 d-flex align-items-center gap-2 border-0 ${activeTab === tab.id ? "bg-light text-dark fw-bolder" : "bg-transparent text-light fw-light hover-bg-light"}`}
                  onClick={() => setActiveTab(tab.id)}
                  style={{ fontSize: "1rem" }}
                >
                  <span
                    className={
                      activeTab === tab.id ? "text-dark" : "text-light"
                    }
                  >
                    {tab.icon}
                  </span>
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* RIGHT CONTENT PANE */}
          <div className="col-12 col-md-9 p-5">
            {activeTab === "profile" && <ProfileTab />}
            {activeTab === "policies" && <PoliciesTab />}
            {activeTab === "cycle" && (
              <AcademicCycleTab
                onOpenTransitionModal={() => setIsTransitionModalOpen(true)}
              />
            )}
          </div>
        </div>
      </div>

      <TransitionModal
        isOpen={isTransitionModalOpen}
        onClose={() => setIsTransitionModalOpen(false)}
      />
    </div>
  );
};

export default AdminSettings;