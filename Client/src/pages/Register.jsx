import React, { useState, useRef, useEffect, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Register.css";
import CustomDropdown from "../components/CustomDropdown";
import { toast } from "react-toastify";
import { useTheme } from "../store/useTheme";
import { moon, sun, eyeClosed, eyeOpened } from "../store/Icons";

// --- Data Structures for Clean Mapping ---
const stepperData = [
  { stepNum: 1, title: "Account Details", desc: "Basic information" },
  { stepNum: 2, title: "Academic Profile", desc: "Department & Batch" },
  { stepNum: 3, title: "Verification", desc: "Email confirmation" },
];

const step1Fields = [
  {
    id: "name",
    label: "Full Name",
    type: "text",
    placeholder: "e.g. Jane Doe",
    colClass: "col-md-6",
  },
  {
    id: "email",
    label: "College Email",
    type: "email",
    placeholder: "example@jmieti.edu.in",
    colClass: "col-6",
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

const sectionDropdownData = [
  {
    name: "Section",
    value: "section",
    options: ["Section A", "Section B", "Section C"],
  },
];

const Register = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  // --- CENTRALIZED FORM STATE ---
  // UPDATED: Replaced 'year' with 'batch' and 'section'
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    rollno: "",
    department: "",
    batch: "",
    section: "",
  });

  const [formError, setFormError] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const otpRefs = useRef([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showPasswords, setShowPasswords] = useState({});
  const [resendTimer, setResendTimer] = useState(0);

  // UPDATED: Dynamic Batch generation based on Department duration
  const dynamicBatchData = useMemo(
    () => [
      {
        name: "Batch",
        value: "batch",
        options:
          formData.department === "Bachelor of Computer Applications"
            ? ["Batch 2024-2027", "Batch 2023-2026", "Batch 2022-2025"]
            : [
                "Batch 2024-2028",
                "Batch 2023-2027",
                "Batch 2022-2026",
                "Batch 2021-2025",
              ],
      },
    ],
    [formData.department],
  );

  // --- TIMER LOGIC ---
  useEffect(() => {
    let interval;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  // --- AUTO-FOCUS OTP ---
  useEffect(() => {
    if (step === 3 && otpRefs.current[0]) {
      otpRefs.current[0].focus();
    }
  }, [step]);

  // --- HANDLERS ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormError("");
  };

  // UPDATED: Handles Department, Batch, and Section dynamic updates
  const handleDropdownSelect = (name, value) => {
    const key = name.toLowerCase(); // 'department', 'batch', or 'section'

    setFormData((prev) => {
      const updatedData = { ...prev, [key]: value };

      // Auto-clear invalid batches if they switch from a 4-year to a 3-year program
      if (
        key === "department" &&
        value === "Bachelor of Computer Applications" &&
        prev.batch.includes("2028")
      ) {
        updatedData.batch = "";
        setFormError("BCA is a 3-year program. Please re-select your batch.");
      }

      return updatedData;
    });

    setFormError("");
  };

  const togglePasswordVisibility = (fieldId) => {
    setShowPasswords((prev) => ({
      ...prev,
      [fieldId]: !prev[fieldId],
    }));
  };

  // --- PASSWORD STRENGTH LOGIC ---
  const checkPasswordStrength = (password) => {
    if (!password) return { label: "", color: "" };
    let score = 0;
    if (password.length >= 8) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    if (score <= 1) return { label: "Weak", color: "text-danger" };
    if (score === 2 || score === 3)
      return { label: "Fair", color: "text-warning" };
    return { label: "Strong", color: "text-success" };
  };

  const passwordStrength = checkPasswordStrength(formData.password);

  // --- VALIDATION FOR DISABLING BUTTON ---
  const isCurrentStepValid = () => {
    if (step === 1) {
      return (
        formData.name.trim() !== "" &&
        formData.email.trim() !== "" &&
        formData.password !== "" &&
        formData.confirmPassword !== ""
      );
    }
    if (step === 2) {
      // UPDATED: Require department, batch, and section
      return (
        formData.rollno.trim() !== "" &&
        formData.department !== "" &&
        formData.batch !== "" &&
        formData.section !== ""
      );
    }
    if (step === 3) {
      return otp.join("").length === 6;
    }
    return false;
  };

  // --- NAVIGATION & API LOGIC ---
  const handleNextStep = () => {
    if (step >= 3) return;
    if (step === 1) {
      if (!/^[A-Za-z0-9.]+@jmieti\.edu\.in$/.test(formData.email)) {
        setFormError("Please enter a valid college email.");
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
    setFormError("");
    setIsAnimating(true);
    setTimeout(() => {
      setStep((prev) => Math.min(prev + 1, 3));
      setIsAnimating(false);
    }, 300);
  };

  const handlePrevStep = () => {
    if (step <= 1) return;
    setFormError("");
    setIsAnimating(true);
    setTimeout(() => {
      setStep((prev) => Math.max(prev - 1, 1));
      setIsAnimating(false);
    }, 300);
  };

  const sendOtpToEmail = async () => {
    setFormError("");
    setIsSendingOtp(true);

    try {
      const response = await fetch(
        "http://localhost:4000/api/v1/auth/sendOtpToMail",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: formData.email, name: formData.name }),
        },
      );
      const data = await response.json();

      if (response.ok) {
        toast.success("OTP sent to your email!");
        setResendTimer(90);
        if (step !== 3) handleNextStep();
      } else {
        setFormError(data.msg || "Failed to send OTP. Please try again.");
        toast.error(data.msg || "Failed to send OTP. Please try again.");
      }
    } catch (error) {
      setFormError("A network error occurred while sending OTP.");
      toast.error("A network error occurred while sending OTP.");
      console.log(error);
    } finally {
      setIsSendingOtp(false);
    }
  };

  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");

    if (enteredOtp.length !== 6) {
      setFormError("Please enter the complete 6-digit OTP.");
      return;
    }

    try {
      setIsVerifying(true);

      const verifyRes = await fetch(
        `http://localhost:4000/api/v1/auth/verifyOtp`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: formData.email, otp: enteredOtp }),
        },
      );

      if (!verifyRes.ok) {
        const verifyData = await verifyRes.json();
        toast.error(verifyData.msg || "Invalid OTP");
        throw new Error(verifyData.msg || "Invalid OTP");
      }

      // CRITICAL UPDATE: Payload exactly matches Mongoose Schema requirements
      const response = await fetch(
        `http://localhost:4000/api/v1/auth/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
            role: "Student", // Drives the Discriminator logic on the backend
            rollno: formData.rollno,
            department: formData.department,
            batch: formData.batch,
            section: formData.section,
          }),
        },
      );

      if (response.ok) {
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          rollno: "",
          department: "",
          batch: "",
          section: "",
        });
        setOtp(["", "", "", "", "", ""]);
        toast.success("Registration successful! Please log in.");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        const errorData = await response.json();
        setFormError(
          errorData.msg || "Sign up failed. Please check your details.",
        );
      }
    } catch (err) {
      setFormError(err.message || "Sign up failed. A network error occurred.");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleClick = (e) => {
    if (step === 1) handleNextStep();
    else if (step === 2) sendOtpToEmail();
    else handleFinalSubmit(e);
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

  const getStepClass = (stepNumber) => {
    if (step > stepNumber) return "step-item completed";
    if (step === stepNumber) return "step-item active";
    return "step-item";
  };

  return (
    <div
      className="signup-wrapper position-relative d-flex align-items-center justify-content-center p-4 m-0"
      data-theme={theme}
    >
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

      <span className="signup-theme-toggle-wrapper position-absolute p-1 d-flex align-items-center justify-content-center rounded-circle">
        <button
          className="signup-theme-toggle w-100 h-100 rounded-circle btn-click-animation"
          onClick={toggleTheme}
          aria-label="Toggle Theme"
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

      <div
        className="signup-container d-flex flex-column flex-lg-row rounded-5 overflow-hidden w-100"
        style={{ maxWidth: "1100px", minHeight: "600px" }}
      >
        {/* --- LEFT SIDEBAR: Stepper --- */}
        <div
          className="signup-sidebar position-relative d-flex flex-column p-5"
          style={{
            width: "35%",
            backgroundColor: "var(--bg-darkBlue)",
            color: "#fff",
          }}
        >
          <div
            className="brand-header d-flex align-items-center mb-5 fw-bold z-1"
            style={{ fontSize: "2rem" }}
          >
            <span
              className="border rounded-3 me-2 bg-light bg-opacity-25 d-flex justify-content-center align-items-center"
              style={{ width: "35px", height: "35px", padding: "0px" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
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
                    <svg
                      width="22"
                      height="22"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
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
                <h2 className="fw-bold mb-2">
                  Create your <span className="text-gradient">account</span>
                </h2>
                <p style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>
                  Enter your details to access the academic dashboard.
                </p>
              </div>
            )}
            {step === 2 && (
              <div className="fade-enter-active">
                <h2 className="fw-bold mb-2">
                  Academic <span className="text-gradient">profile</span>
                </h2>
                <p style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>
                  Help us link your account to the correct institutional
                  workflows.
                </p>
              </div>
            )}
            {step === 3 && (
              <div className="fade-enter-active">
                <h2 className="fw-bold mb-2">
                  Verify your <span className="text-gradient">identity</span>
                </h2>
                <p style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>
                  Enter the code sent to your email to complete registration.
                </p>
              </div>
            )}
          </div>

          <div
            className={`form-body flex-grow-1 ${isAnimating ? "fade-exit" : "fade-enter-active"}`}
            style={{ position: "relative", zIndex: 10 }}
          >
            {/* --- STEP 1 FORM --- */}
            {step === 1 && (
              <div className="row g-3 text-start mb-3">
                {step1Fields.map((field) => (
                  <div className={field.colClass} key={field.id}>
                    <label
                      className="form-label fw-bold small"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {field.label}
                    </label>
                    {field.isPassword ? (
                      <div>
                        <div className="position-relative">
                          <input
                            type={showPasswords[field.id] ? "text" : "password"}
                            className={`form-control form-control-lg fs-6 shadow-none pe-5 ${
                              field.id === "confirmPassword" &&
                              formData.confirmPassword.length > 0
                                ? formData.password === formData.confirmPassword
                                  ? "border border-success"
                                  : "border border-danger"
                                : ""
                            }`}
                            placeholder={field.placeholder}
                            name={field.id}
                            value={formData[field.id]}
                            onChange={handleInputChange}
                          />
                          <button
                            type="button"
                            className="btn btn-link position-absolute end-0 top-50 translate-middle-y text-decoration-none shadow-none"
                            style={{ color: "var(--main-text)" }}
                            onClick={() => togglePasswordVisibility(field.id)}
                            tabIndex="-1"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="var(--text-muted)"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              {showPasswords[field.id] ? eyeClosed : eyeOpened}
                            </svg>
                          </button>
                        </div>
                        {field.id === "password" &&
                          formData.password.length > 0 && (
                            <div
                              className={`mt-2 ps-1 small fw-bold ${passwordStrength.color}`}
                            >
                              Strength: {passwordStrength.label}
                            </div>
                          )}
                        {field.id === "confirmPassword" &&
                          formData.confirmPassword.length > 0 && (
                            <div
                              className={`mt-2 ps-1 small fw-bold ${formData.password === formData.confirmPassword ? "text-success" : "text-danger"}`}
                            >
                              {formData.password === formData.confirmPassword
                                ? "Passwords match"
                                : "Passwords do not match"}
                            </div>
                          )}
                      </div>
                    ) : (
                      <input
                        type={field.type}
                        className="form-control form-control-lg fs-6 shadow-none"
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
                  <label
                    className="form-label fw-bold small"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Roll Number
                  </label>
                  <input
                    type="text"
                    name="rollno"
                    value={formData.rollno}
                    onChange={handleInputChange}
                    className="form-control form-control-lg fs-6 shadow-none"
                    placeholder="e.g. 852XXXX"
                  />
                </div>
                <div className="mb-3">
                  <label
                    className="form-label fw-bold small"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Department
                  </label>
                  <CustomDropdown
                    dropdownData={dropdownData1}
                    onSelect={handleDropdownSelect}
                    selectedValue={formData.department}
                  />
                </div>

                {/* NEW: Batch and Section placed side-by-side using Bootstrap Row */}
                <div className="row g-3 mb-3">
                  <div className="col-md-6">
                    <label
                      className="form-label fw-bold small"
                      style={{ color: "var(--text-muted)" }}
                    >
                      Academic Batch
                    </label>
                    <CustomDropdown
                      dropdownData={dynamicBatchData}
                      onSelect={handleDropdownSelect}
                      selectedValue={formData.batch}
                    />
                  </div>
                  <div className="col-md-6">
                    <label
                      className="form-label fw-bold small"
                      style={{ color: "var(--text-muted)" }}
                    >
                      Section
                    </label>
                    <CustomDropdown
                      dropdownData={sectionDropdownData}
                      onSelect={handleDropdownSelect}
                      selectedValue={formData.section}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* --- STEP 3 FORM --- */}
            {step === 3 && (
              <div className="d-flex flex-column h-100">
                <div className="text-center">
                  <div
                    className="bg-primary bg-opacity-25 shadow-40 rounded-circle d-inline-flex align-items-center justify-content-center mb-4"
                    style={{
                      width: "74px",
                      height: "74px",
                      color: "var(--classora-accent-blue)",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="40"
                      height="40"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                      <path d="m16 19 2 2 4-4" />
                    </svg>
                  </div>
                  <p style={{ fontSize: "1.1rem", color: "var(--text-muted)" }}>
                    We've sent a 6-digit code to <br />
                    <strong style={{ color: "var(--text-main)" }}>
                      {formData.email || "student@university.edu"}
                    </strong>
                  </p>
                </div>

                <div className="d-flex mx-auto justify-content-center gap-2 my-3">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      type="text"
                      inputMode="numeric"
                      className="form-control otpInputs form-control-lg text-center fw-bold fs-4 shadow-none rounded-4"
                      style={{
                        width: "55px",
                        height: "60px",
                        caretColor: "var(--color-secondary)",
                      }}
                      maxLength="1"
                      value={digit}
                      ref={(el) => (otpRefs.current[index] = el)}
                      onChange={(e) => handleOtpChange(index, e)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      autoComplete="off"
                    />
                  ))}
                </div>

                <div className="text-center mb-5">
                  <span
                    className="small me-2"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Didn't receive the code?
                  </span>
                  <button
                    className="btn btn-link p-0 fw-bold underlineTextOnHover small"
                    style={{
                      color:
                        resendTimer > 0
                          ? "var(--text-muted)"
                          : "var(--color-secondary)",
                      cursor: resendTimer > 0 ? "not-allowed" : "pointer",
                    }}
                    onClick={() => {
                      sendOtpToEmail();
                      setOtp(["", "", "", "", "", ""]);
                    }}
                    disabled={isVerifying || isSendingOtp || resendTimer > 0}
                  >
                    {resendTimer > 0
                      ? `Resend Code in ${formatTime(resendTimer)}`
                      : "Resend Code"}
                  </button>
                </div>
              </div>
            )}
          </div>

          {formError && (
            <div className="text-danger fw-bold small text-end mt-2 mb-2">
              {formError}
            </div>
          )}

          <div
            className="d-flex align-items-center justify-content-between pt-4 mt-auto"
            style={{ borderTop: "1px solid var(--text-muted)" }}
          >
            {step > 1 ? (
              <button
                className="backBtn rounded-3 px-3 py-2 fw-bold border-0 btn-click-animation"
                onClick={handlePrevStep}
                disabled={isAnimating || isVerifying || isSendingOtp}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="me-2"
                >
                  <path d="M6 8L2 12L6 16" />
                  <path d="M2 12H22" />
                </svg>
                Back
              </button>
            ) : (
              <div></div>
            )}

            <button
              className="btn text-white btn-click-animation border-0 px-4 py-2 fw-bold d-flex align-items-center"
              style={{ backgroundColor: "var(--btn-bg-blue)", zIndex: 0 }}
              onClick={handleClick}
              disabled={
                isAnimating ||
                isVerifying ||
                isSendingOtp ||
                !isCurrentStepValid()
              }
            >
              {step === 1 && "Continue"}
              {step === 2 && (isSendingOtp ? "Sending OTP..." : "Send OTP")}
              {step === 3 &&
                (isVerifying
                  ? "Verifying and Registering..."
                  : "Complete Registration")}

              {step < 3 && !isSendingOtp && (
                <svg
                  className="ms-2"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                  />
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
