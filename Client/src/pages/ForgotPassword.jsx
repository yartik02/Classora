import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../store/useTheme";
import { moon, sun } from "../store/Icons";
import "./ForgetPassword.css";
// import { toast } from "react-toastify";

// const API_BASE = `${import.meta.env.VITE_API_BASE_URL}/api/auth`;

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const resetMessages = () => {
    setError("");
    setMessage("");
  };

  /* ---------- STEP 1: SEND OTP ---------- */
  const handleSendOTP = async (e) => {
    e.preventDefault();
    resetMessages();

    if (!email) {
      setError("Please enter your email.");
      return;
    }

    try {
      //   setLoading(true);
      //   console.log("student's mail:", email);

      //   const res = await fetch(`${API_BASE}/sendOtpToMail`, {
      //     method: "POST",
      //     headers: { "Content-Type": "application/json" },
      //     body: JSON.stringify({ email: email, name:"Student" }),
      //   });

      //   // const data = await res.json();
      //   if (!res.ok) return toast.error(data.msg || "Failed to send OTP");

      //   setMessage("OTP sent successfully!");
      //   // console.log("data of otp generation",data);
      //   console.log("data of otp mail", res);

      setStep(2);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  /* ---------- STEP 2: VERIFY OTP ---------- */
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    resetMessages();

    if (!otp) {
      setError("Please enter the OTP.");
      return;
    }

    try {
      //   setLoading(true);

      //   const res = await fetch(`${API_BASE}/verifyOtp`, {
      //     method: "POST",
      //     headers: { "Content-Type": "application/json" },
      //     body: JSON.stringify({ email: email, otp: otp }),
      //   });

      //   const data = await res.json();
      //   if (!res.ok) throw new Error(data.msg || "Invalid OTP");

      //   setMessage("OTP verified successfully.");
      setStep(3);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  /* ---------- STEP 3: RESET PASSWORD ---------- */
  const handleResetPassword = async (e) => {
    e.preventDefault();
    resetMessages();

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      //   setLoading(true);

      //   const res = await fetch(`${API_BASE}/forgot-password/reset-password`, {
      //     method: "POST",
      //     headers: { "Content-Type": "application/json" },
      //     body: JSON.stringify({ email, newPassword }),
      //   });

      //   const data = await res.json();
      //   if (!res.ok) throw new Error(data.msg || "Password reset failed");

      //   ("Password updated successfully!");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-password-container" data-theme={theme}>
      {/* backbtn */}
      <button
        className="back-btn shadow-lg z-3 rounded-circle border-0 d-flex align-items-center justify-content-center"
        onClick={() => navigate(-1)}
        aria-label="Go back"
        style={{ width: "48px", height: "48px" }}
      >
        <svg width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
          <path
            fillRule="evenodd"
            d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
          />
        </svg>
      </button>

      <span
        className="position-absolute shadow-lg z-3 p-1 rounded-circle"
        style={{
          top: "10%",
          right: "10%",
          width: "48px",
          height: "48px",
          backgroundColor: "var(--bg-surface)",
        }}
      >
        <button
          className="theme-toggle-btn w-100 h-100 rounded-circle btn-click-animation d-flex align-items-center justify-content-center"
          onClick={toggleTheme}
          aria-label="Toggle Theme"
        >
          <svg
            width="24"
            height="24"
            fill="var(--text-main)"
            viewBox="0 0 24 24"
            stroke="var(--text-main)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {theme === "light" ? moon : sun}
          </svg>
        </button>
      </span>

      <div className="forgot-password-card">
        <h3 className="text-dark fw-bolder mb-0" >
          Reset Your Password
        </h3>
        <p
          className="mb-4"
          style={{
            fontSize: "0.9rem",
          }}
        >
          Classora Account Recovery
        </p>

        {error && <div className="error-message">{error}</div>}
        {message && <div className="success-message">{message}</div>}

        {/* STEP 1 */}
        {step === 1 && (
          <form onSubmit={handleSendOTP}>
            <div className="form-floating text-start mb-4">
              <input
                type="email"
                className="text-dark rounded-3 form-control shadow-0"
                style={{ backgroundColor: "var(--bg-main)", borderColor: "var(--border-color)", }} 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="floatingInput"
                placeholder=" "
              />
              <label for="floatingInput"  className="text-muted">
                Email Address
              </label>
            </div>

            <button
              type="submit"
              className="btn text-white border-0 w-100 py-2 fw-bold d-flex align-items-center justify-content-center btn-click-animation"
              style={{ backgroundColor: "var(--btn-bg-blue)" }}
              disabled={loading}
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </form>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <form onSubmit={handleVerifyOTP}>
            <div className="mb-3 form-floating text-start">
              <input
                type="text"
                id="floatingOtp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="rounded-3 form-control shadow-0 w-100"
                maxLength="6"
                placeholder=" "
                style={{
                  backgroundColor: "var(--bg-main)",
                  color: "var(--text-main)",
                  borderColor: "var(--border-color)",
                }}
              />
              <label for="floatingOtp"  className="text-muted">
                Enter OTP
              </label>
            </div>

            <button
              className="btn text-white border-0 w-100 py-2 fw-bold d-flex align-items-center justify-content-center btn-click-animation"
              style={{ backgroundColor: "var(--btn-bg-blue)" }}
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>

            <button
              type="button"
              className="text-dark btn w-100 mt-2 rounded-3 btn-click-animation"
              style={{ border: "1px solid var(--border-color)",
                backgroundColor: "transparent", }} 
              onClick={() => setStep(1)}
            >
              Back to Email
            </button>
          </form>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <form onSubmit={handleResetPassword}>
            <div className="form-floating text-start mb-3">
              <input
                type="password"
                value={newPassword}
                className="text-dark rounded-3 form-control shadow-0"
                style={{ backgroundColor: "var(--bg-main)", borderColor: "var(--border-color)", }} 
                onChange={(e) => setNewPassword(e.target.value)}
                id="floatingInput1"
                placeholder=" "
              />
              <label
                for="floatingInput1"
                
               className="text-muted">
                New Password
              </label>
            </div>

            <div className="form-floating text-start mb-4">
              <input
                type="password"
                value={confirmPassword}
                className="text-dark rounded-3 form-control shadow-0"
                style={{ backgroundColor: "var(--bg-main)", borderColor: "var(--border-color)", }} 
                id="floatingInput2"
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder=" "
                // required
              />
              <label
                for="floatingInput2"
                
               className="text-muted">
                Confirm Password
              </label>
            </div>

            <button
              className="btn text-white border-0 w-100 py-2 fw-bold d-flex align-items-center justify-content-center btn-click-animation"
              style={{ backgroundColor: "var(--btn-bg-blue)" }}
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Password"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
