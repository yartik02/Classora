import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Register.css"; 

const Login = () => {
  const navigate = useNavigate();
  const [loginType, setLoginType] = useState("student"); // 'student' or 'teacher'
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormError(""); // Clear errors when typing
  };

  const handleTabSwitch = (type) => {
    setLoginType(type);
    setFormError("");
    // Optionally clear form data when switching tabs
    // setFormData({ email: "", password: "" }); 
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setFormError("Please fill in both email and password.");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API Call
    setTimeout(() => {
      alert(`Logging in as ${loginType.toUpperCase()} with ${formData.email}`);
      console.log("Login Payload:", { role: loginType, ...formData });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div
      className="signup-wrapper position-relative d-flex align-items-center justify-content-center p-4"
    >
      {/* Global Back Button */}
      <button
        className="global-back-btn z-3"
        onClick={() => navigate("/")}
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
        className="signup-container d-flex flex-column-reverse flex-lg-row bg-white rounded-5 overflow-hidden w-100 shadow-lg"
        style={{ maxWidth: "1100px", minHeight: "600px" }}
      >
        
        {/* --- LEFT PANEL: Login Form --- */}
        <div
          className="signup-content d-flex flex-column p-4 p-md-5"
          style={{ width: "100%", lg: { width: "65%" } }} // CSS handles responsive width, inline style is fallback
        >
          <div className="form-header mb-4 mt-2">
            <h2 className="fw-bold mb-2" style={{ color: "var(--classora-dark-blue)" }}>
              Welcome <span className="text-gradient">back</span>
            </h2>
            <p className="text-muted" style={{ fontSize: "0.9rem" }}>
              Please enter your details to access your dashboard.
            </p>
          </div>

          {/* --- TAB SWITCHER --- */}
          <div className="d-flex bg-light rounded-pill p-1 mb-4 border shadow-sm">
            <button
              className={`btn flex-grow-1 rounded-pill fw-bold transition-all ${
                loginType === "student" ? "btn-white shadow-sm" : "btn-link text-muted text-decoration-none"
              }`}
              style={{ backgroundColor: loginType === "student" ? "white" : "transparent" }}
              onClick={() => handleTabSwitch("student")}
            >
              Student Login
            </button>
            <button
              className={`btn flex-grow-1 rounded-pill fw-bold transition-all ${
                loginType === "teacher" ? "btn-white shadow-sm" : "btn-link text-muted text-decoration-none"
              }`}
              style={{ backgroundColor: loginType === "teacher" ? "white" : "transparent" }}
              onClick={() => handleTabSwitch("teacher")}
            >
              Faculty Login
            </button>
          </div>

          <form className="form-body flex-grow-1 d-flex flex-column" onSubmit={handleLogin}>
            
            <div className="mb-3 text-start">
              <label className="form-label fw-bold small">
                {loginType === "student" ? "Student Email" : "Institutional Email"}
              </label>
              <input
                type="text" // Type text allows either email or roll number
                className="form-control form-control-lg fs-6 bg-light border-0 shadow-none"
                placeholder={loginType === "student" ? "e.g. student@uni.edu" : "faculty@university.edu"}
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                autoComplete="username"
              />
            </div>

            <div className="mb-3 text-start position-relative">
              <div className="d-flex justify-content-between align-items-center mb-1">
                <label className="form-label fw-bold small m-0">Password</label>
                <Link to="/forgot-password" className="small fw-bold text-decoration-none" style={{ color: "var(--classora-accent-blue)" }}>
                  Forgot password?
                </Link>
              </div>
              <div className="position-relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control form-control-lg fs-6 bg-light border-0 shadow-none pe-5"
                  placeholder="Enter your password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="btn btn-link position-absolute end-0 top-50 translate-middle-y text-muted text-decoration-none shadow-none"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex="-1"
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m15 18-.722-3.25" />
                      <path d="M2 8a10.645 10.645 0 0 0 20 0" />
                      <path d="m20 15-1.726-2.05" />
                      <path d="m4 15 1.726-2.05" />
                      <path d="m9 18 .722-3.25" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Validation Error Message */}
            {formError && (
              <div className="text-danger fw-bold small text-start mb-3">
                {formError}
              </div>
            )}

            {/* Info text specific to teachers based on your previous requirements */}
            {loginType === "teacher" && (
              <div className="bg-primary bg-opacity-10 rounded-end-5 p-3 mb-3 border-start border-primary border-3 text-start">
                <p className="small m-0 text-muted">
                  <span className="fw-bold text-dark">First time here?</span> Faculty accounts are provisioned by the institution. Use the credentials sent to your email.
                </p>
              </div>
            )}

            {/* Form Actions (Buttons) */}
            <div className="mt-auto pt-4 border-top border-2">
              <button
                type="submit"
                className="btn text-white w-100 py-2 fw-medium d-flex align-items-center justify-content-center fs-5"
                style={{ backgroundColor: "#001b4c" }}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Authenticating..." : "Sign In"}
                {!isSubmitting && (
                  <svg className="ms-2" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                  </svg>
                )}
              </button>
              
              {/* Optional: Signup redirect for students only */}
              {loginType === "student" && (
                <p className="text-center mt-4 mb-0 text-muted small">
                  Don't have an account? <Link to="/signup" className="fw-bold text-decoration-none" style={{ color: "var(--classora-accent-blue)" }}>Register here</Link>
                </p>
              )}
            </div>
          </form>
        </div>

        {/* --- RIGHT SIDEBAR: Branding (Flipped from Signup) --- */}
        <div
          className="signup-sidebar position-relative d-flex flex-column p-5 text-white justify-content-between"
          style={{ width: "100%", lg: { width: "35%" }, backgroundColor: "var(--classora-dark-blue)" }}
        >
          {/* Top Section */}
          <div>
            <div className="brand-header d-flex align-items-center fw-bold z-1 mb-4" style={{ fontSize: "2rem" }}>
              <span className="border rounded-3 me-2 bg-light bg-opacity-25 d-flex justify-content-center align-items-center" style={{ width: "35px", height: "35px", padding: "0px" }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <line x1="19" x2="19" y1="8" y2="14" />
                  <line x1="22" x2="16" y1="11" y2="11" />
                </svg>
              </span>
              Classora
            </div>
            
            {/* Dynamic Welcome Text based on Tab */}
            <div className="z-1 position-relative mt-5">
              <h3 className="fw-bold mb-3">
                {loginType === "student" ? "Your Academic Hub" : "Faculty Portal"}
              </h3>
              <p className="fw-light opacity-75 lh-lg" style={{ fontSize: "0.95rem" }}>
                {loginType === "student" 
                  ? "Access your assignments, track your deadlines, and view your evaluation rubrics all in one secure place." 
                  : "Manage course assignments, evaluate submissions efficiently, and communicate with your students seamlessly."}
              </p>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="d-none text-start d-lg-block z-1">
            <p className="text-primary-50 mb-0" style={{ fontSize: "0.8rem" }}>
              Need Help?{" "}
              <Link to="/contactUs" className="text-primary text-decoration-none border-bottom border-primary">
                Contact Support
              </Link>
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Login;