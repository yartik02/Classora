import React, { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Register.css";
import CustomDropdown from "../components/CustomDropdown";
// --- Data Structures for Clean Mapping ---
const stepperData = [
  { stepNum: 1, title: "Account Details", desc: "Basic information" },
  { stepNum: 2, title: "Academic Profile", desc: "University & Department" },
  { stepNum: 3, title: "Verification", desc: "Email confirmation" },
];
const step1Fields = [
  {
    id: "firstName",
    label: "First name",
    type: "text",
    placeholder: "e.g. Jane",
    colClass: "col-md-6",
  },
  {
    id: "lastName",
    label: "Last name",
    type: "text",
    placeholder: "e.g. Doe",
    colClass: "col-md-6",
  },
  {
    id: "email",
    label: "University email address",
    type: "email",
    placeholder: "janedoe@university.edu",
    colClass: "col-12",
  },
  {
    id: "password",
    label: "Password",
    type: "password",
    placeholder: "Create a secure password",
    colClass: "col-12",
    isPassword: true,
  },
  {
    id: "confirmPassword",
    label: "Confirm Password",
    type: "password",
    placeholder: "Re-enter your password",
    colClass: "col-12",
    isPassword: true,
  },
];

const dropdownData1 = [
  {
    name: "Department",
    value: "department",
    options: [
      "Computer Science & Engineering",
      "Civil Engineering",
      "Artificial Intelligence & Machine Learning",
      "Bachelor of Computer Applications",
    ],
  },
];

const dropdownData2 = [
  {
    name: "Year",
    value: "year",
    options: ["1st Year", "2nd Year", "3rd Year", "4th Year"],
  },
];

const Register = () => {
  const [step, setStep] = useState(1);

  const navigate = useNavigate();

  // --- CENTRALIZED FORM STATE ---

  const [formData, setFormData] = useState({
    firstName: "",

    lastName: "",

    email: "",

    password: "",

    confirmPassword: "",

    studentId: "",

    department: "",

    year: "",
  });

  const [formError, setFormError] = useState(""); // State to hold validation errors

  // Handle standard text inputs

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    setFormError(""); // Clear errors when user types
  };

  // Handle Custom Dropdown selections

  const handleDropdownSelect = (name, value) => {
    const key = name === "Department" ? "department" : "year";

    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const otpRefs = useRef([]);

  const [isAnimating, setIsAnimating] = useState(false);

  // --- PASSWORD STRENGTH LOGIC ---

  const checkPasswordStrength = (password) => {
    if (!password) return { label: "", color: "" };

    let score = 0;

    if (password.length >= 8) score += 1; // Length check

    if (/[A-Z]/.test(password)) score += 1; // Uppercase check

    if (/[0-9]/.test(password)) score += 1; // Number check

    if (/[^A-Za-z0-9]/.test(password)) score += 1; // Special character check

    if (score <= 1) return { label: "Weak", color: "text-danger" };

    if (score === 2 || score === 3)
      return { label: "Fair", color: "text-warning" };

    return { label: "Strong", color: "text-success" };
  };

  const passwordStrength = checkPasswordStrength(formData.password);

  // --- Step Navigation Logic ---

  const handleNextStep = () => {
    // Validation before moving to Step 2

    if (step === 1) {
      if (!formData.password || !formData.confirmPassword) {
        setFormError("Please fill in both password fields.");

        return;
      }

      if (formData.password !== formData.confirmPassword) {
        setFormError("Passwords do not match.");

        return;
      }

      if (passwordStrength.label === "Weak") {
        setFormError("Please choose a stronger password.");

        return;
      }
    }

    setFormError(""); // Clear any existing errors

    setIsAnimating(true);

    setTimeout(() => {
      setStep((prev) => prev + 1);

      setIsAnimating(false);
    }, 300);
  };

  const handlePrevStep = () => {
    setFormError(""); // Clear errors when going back

    setIsAnimating(true);

    setTimeout(() => {
      setStep((prev) => prev - 1);

      setIsAnimating(false);
    }, 300);
  };

  const [showPasswords, setShowPasswords] = useState({});

  const togglePasswordVisibility = (fieldId) => {
    setShowPasswords((prev) => ({
      ...prev,

      [fieldId]: !prev[fieldId],
    }));
  };

  const getStepClass = (stepNumber) => {
    if (step > stepNumber) return "step-item completed";

    if (step === stepNumber) return "step-item active";

    return "step-item";
  };

  // --- OTP Logic ---

  const handleOtpChange = (index, e) => {
    const value = e.target.value;

    if (isNaN(value)) return;

    const digit = value.slice(-1);

    const newOtp = [...otp];

    newOtp[index] = digit;

    setOtp(newOtp);

    if (digit !== "" && index < 5) {
      otpRefs.current[index + 1].focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      otpRefs.current[index - 1].focus();
    }
  };

  return (
    <div
      className="signup-wrapper position-relative d-flex align-items-center justify-content-center p-4"
      style={{ height: "fit-content" }}
    >
      {/* Global Back Button */}
      <button
        className="global-back-btn"
        onClick={() => navigate(-1)}
        aria-label="Go back"
      >
        <svg width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
          <path
            fillRule="evenodd"
            d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
          />
        </svg>
      </button>

      <div
        className="signup-container d-flex flex-column flex-lg-row bg-white rounded-5 overflow-hidden w-100"
        style={{ maxWidth: "1100px", minHeight: "600px" }}
      >
        {/* --- LEFT SIDEBAR: Stepper --- */}
        <div
          className="signup-sidebar position-relative d-flex flex-column p-5 text-white"
          style={{ width: "35%", backgroundColor: "var(--classora-dark-blue)" }}
        >
          <div
            className="brand-header d-flex align-items-center mb-5 fw-bold z-1"
            style={{ fontSize: "2rem" }}
          >
            <span
              className="border rounded-3 me-2 bg-light bg-opacity-25 d-flex justify-content-center align-items-center"
              style={{ width: "35px", height: "35px", padding: "0px" }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <line x1="19" x2="19" y1="8" y2="14" />
                <line x1="22" x2="16" y1="11" y2="11" />
              </svg>
            </span>
            Classora
          </div>

          <div className="stepper-container mt-4 z-1">
            {stepperData.map((s) => (
              <div
                key={s.stepNum}
                className={`${getStepClass(s.stepNum)} d-flex`}
              >
                <div className="step-circle flex-shrink-0 d-flex align-items-center justify-content-center fw-semibold">
                  {step > s.stepNum ? (
                    <svg width="22" height="22" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
                    </svg>
                  ) : (
                    s.stepNum
                  )}
                </div>
                <div className="step-content d-none text-start d-lg-block">
                  <h4 className="fs-6 fw-bold mb-0">{s.title}</h4>
                  <p className="small fw-light text-white-50 mb-4">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-auto d-none text-start d-lg-block z-1">
            <p className="text-white-50 mb-0" style={{ fontSize: "0.8rem" }}>
              Need Help?{" "}
              <Link to="/contactUs" className="needSupport">
                Contact Support
              </Link>
            </p>
          </div>
        </div>

        {/* --- RIGHT PANEL: Form Content --- */}
        <div
          className="signup-content d-flex flex-column p-5"
          style={{ width: "65%" }}
        >
          <div className="form-header mb-5">
            {step === 1 && (
              <div className="fade-enter-active">
                <h2 className="fw-bold mb-2" style={{ color: "var(--classora-dark-blue)" }}>
                  Create your <span className="text-gradient">account</span>
                </h2>
                <p className="text-muted" style={{ fontSize: "0.9rem" }}>
                  Enter your details to access the academic dashboard.
                </p>
              </div>
            )}
            {step === 2 && (
              <div className="fade-enter-active">
                <h2 className="fw-bold mb-2" style={{ color: "var(--classora-dark-blue)" }}>
                  Academic <span className="text-gradient">profile</span>
                </h2>
                <p className="text-muted" style={{ fontSize: "0.9rem" }}>
                  Help us link your account to the correct institutional workflows.
                </p>
              </div>
            )}
            {step === 3 && (
              <div className="fade-enter-active">
                <h2 className="fw-bold mb-2" style={{ color: "var(--classora-dark-blue)" }}>
                  Verify your <span className="text-gradient">identity</span>
                </h2>
                <p className="text-muted" style={{ fontSize: "0.9rem" }}>
                  Enter the code sent to your email to complete registration.
                </p>
              </div>
            )}
          </div>

          <div className={`form-body flex-grow-1 ${isAnimating ? "fade-exit" : "fade-enter-active"}`}>
            
            {/* --- STEP 1 FORM --- */}
            {step === 1 && (
              <div className="row g-3 text-start mb-3">
                {step1Fields.map((field) => (
                  <div className={field.colClass} key={field.id}>
                    <label className="form-label fw-bold small">
                      {field.label}
                    </label>
                    {field.isPassword ? (
                      <div>
                        {/* Wrapper strictly for Input + Icon */}
                        <div className="position-relative">
                          <input
                            type={showPasswords[field.id] ? "text" : "password"}
                            className={`form-control form-control-lg fs-6 bg-light shadow-none pe-5 ${
                              field.id === "confirmPassword" && formData.confirmPassword.length > 0
                                ? formData.password === formData.confirmPassword
                                  ? "border border-success"
                                  : "border border-danger"
                                : "border-0"
                            }`}
                            placeholder={field.placeholder}
                            name={field.id}
                            value={formData[field.id]}
                            onChange={handleInputChange}
                          />
                          <button
                            type="button"
                            className="btn btn-link position-absolute end-0 top-50 translate-middle-y text-muted text-decoration-none shadow-none"
                            onClick={() => togglePasswordVisibility(field.id)}
                            tabIndex="-1"
                          >
                            {showPasswords[field.id] ? (
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye-icon lucide-eye">
                                <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
                                <circle cx="12" cy="12" r="3" />
                              </svg>
                            ) : (
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye-closed-icon lucide-eye-closed">
                                <path d="m15 18-.722-3.25" />
                                <path d="M2 8a10.645 10.645 0 0 0 20 0" />
                                <path d="m20 15-1.726-2.05" />
                                <path d="m4 15 1.726-2.05" />
                                <path d="m9 18 .722-3.25" />
                              </svg>
                            )}
                          </button>
                        </div>

                        {/* PASSWORD STRENGTH UI */}
                        {field.id === "password" && formData.password.length > 0 && (
                          <div className={`mt-2 ps-1 small fw-bold ${passwordStrength.color}`}>
                            Strength: {passwordStrength.label}
                          </div>
                        )}

                        {/* PASSWORD MATCH UI */}
                        {field.id === "confirmPassword" && formData.confirmPassword.length > 0 && (
                          <div className={`mt-2 ps-1 small fw-bold ${formData.password === formData.confirmPassword ? "text-success" : "text-danger"}`}>
                            {formData.password === formData.confirmPassword ? "Passwords match" : "Passwords do not match"}
                          </div>
                        )}
                      </div>
                    ) : (
                      <input
                        type={field.type}
                        className="form-control form-control-lg fs-6 bg-light border-0 shadow-none"
                        placeholder={field.placeholder}
                        name={field.id}
                        value={formData[field.id]}
                        onChange={handleInputChange}
                      />
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* --- STEP 2 FORM --- */}
            {step === 2 && (
              <div className="text-start">
                <div className="mb-3">
                  <label className="form-label fw-bold small">
                    Student ID / Roll Number
                  </label>
                  <input
                    type="text"
                    name="studentId"
                    value={formData.studentId}
                    onChange={handleInputChange}
                    className="form-control form-control-lg fs-6 bg-light border-0 shadow-none"
                    placeholder="e.g. 852XXXX"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold small">Department</label>
                  <CustomDropdown
                    dropdownData={dropdownData1}
                    onSelect={handleDropdownSelect}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold small">
                    Current Year
                  </label>
                  <CustomDropdown
                    dropdownData={dropdownData2}
                    onSelect={handleDropdownSelect}
                  />
                </div>
              </div>
            )}

            {/* --- STEP 3 FORM: OTP Verification --- */}
            {step === 3 && (
              <div className="d-flex flex-column h-100">
                <div className="text-center mt-2">
                  <div
                    className="bg-primary bg-opacity-25 shadow-40 rounded-circle d-inline-flex align-items-center justify-content-center mb-4"
                    style={{ width: "74px", height: "74px", color: "var(--classora-accent-blue)" }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                      <path d="m16 19 2 2 4-4" />
                    </svg>
                  </div>
                  <p className="text-muted" style={{ fontSize: "1.1rem" }}>
                    We've sent a 6-digit code to <br />
                    <strong className="text-dark">
                      {formData.email || "student@university.edu"}
                    </strong>
                  </p>
                </div>

                <div className="d-flex mx-auto rounded-4 justify-content-center gap-2 my-3">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      type="text"
                      inputMode="numeric"
                      className="form-control otpInputs form-control-lg text-center fw-bold fs-4 bg-dark bg-opacity-10 border-0 rounded-4"
                      style={{ width: "55px", height: "60px", caretColor: "#6085ff" }}
                      maxLength="1"
                      value={digit}
                      ref={(el) => (otpRefs.current[index] = el)}
                      onChange={(e) => handleOtpChange(index, e)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      autoComplete="off"
                    />
                  ))}
                </div>

                <div className="text-center">
                  <span className="text-muted small me-2">
                    Didn't receive the code?
                  </span>
                  <button className="btn btn-link p-0 fw-bold text-decoration-none small" style={{ color: "var(--classora-accent-blue)" }}>
                    Resend Code
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Validation Error Message */}
          {formError && (
            <div className="text-danger fw-bold small text-end mt-2 mb-2">
              {formError}
            </div>
          )}

          {/* Form Actions (Buttons) */}
          <div className="d-flex align-items-center justify-content-between border-top border-2 pt-4 mt-auto">
            {step > 1 ? (
              <button
                className="backBtn rounded-3 px-3 py-2 fw-bold border-0"
                onClick={handlePrevStep}
                disabled={isAnimating}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="me-2">
                  <path d="M6 8L2 12L6 16" />
                  <path d="M2 12H22" />
                </svg>
                Back
              </button>
            ) : (
              <div></div>
            )}

            <button
              className="btn text-white px-4 py-2 fw-bold d-flex align-items-center"
              style={{ backgroundColor: "var(--classora-dark-blue)" }}
              onClick={
                step < 3
                  ? handleNextStep
                  : () => alert(`Submitting Data:\nEmail: ${formData.email}\nOTP: ${otp.join("")}`)
              }
              disabled={isAnimating}
            >
              {step === 3 ? "Complete Registration" : "Continue"}
              {step < 3 && (
                <svg className="ms-2" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;