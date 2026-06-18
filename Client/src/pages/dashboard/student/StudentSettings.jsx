import React from "react";
import { Link } from "react-router-dom";
import {
  KeyRound,
  MonitorSmartphone,
  Sun,
  Moon,
  Monitor,
  User,
  Hash,
  Building,
  Calendar,
  GraduationCap,
  Users,
  Mail,
} from "lucide-react";
import { useTheme } from "../../../store/useTheme";
import "./Settings.css";

const SettingsPage = ({ student }) => {
  const { themePreference, setThemePreference, theme } = useTheme();
  if (!student) {
    return (
      <div className="mt-5 d-flex flex-column text-dark p-5 align-items-center justify-content-center w-100">
        <div
          className="spinner-border border-2 text-dark opacity-75 spinner-border-lg"
          role="status"
        >
          <span className="visually-hidden bg-dark"></span>
        </div>
        <span className="mt-2">Loading...</span>
      </div>
    );
  }

  const academicDetails = [
    { label: "Full Name", value: student.name, icon: User },
    { label: "Roll Number", value: student.rollno, icon: Hash },
    { label: "Department", value: student.department.code, icon: Building },
    {
      label: "Current Semester",
      value: student.batch.currentSemester,
      icon: Calendar,
    },
    { label: "Course", value: student.batch.programName, icon: GraduationCap },
    {
      label: "Batch",
      value: student.batch.startingYear + " - " + student.batch.endingYear,
      icon: Users,
    },
  ];

  return (
    <div className="settingsWrapper p-4" style={{ color: "var(--text-main)" }}>
      <div className="text-center mt-5 mb-5">
        <h1 className="fw-bolder mb-2" style={{ letterSpacing: "-0.5px" }}>
          Account Settings
        </h1>
        <p className="fw-medium fs-6" style={{ color: "var(--text-muted)" }}>
          Manage your academic profile, security preferences, and account
          details.
        </p>
      </div>
      <div className="settings-window p-5 rounded-5">
        <div className="mx-auto">
          {/* ACADEMIC IDENTITY CARD */}
          <div className="card settings-card shadow-sm rounded-4 mb-4">
            <div className="card-body p-5">
              <h4 className="fw-bold mb-4 text-center">Academic Identity</h4>

              <div className="row gx-5 gy-2 mx-auto">
                {academicDetails.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div className="col-12 col-md-6" key={index}>
                      <div className="d-flex p-3 rounded-5 justify-content-start align-items-center profile-item">
                        {/* Dynamic Icon Box */}
                        <div className="icon-box d-flex align-items-center justify-content-center rounded-4 flex-shrink-0 me-3">
                          <Icon size={25} />
                        </div>

                        {/* Text Content */}
                        <div className="d-flex flex-column text-start w-100">
                          <span className="item-label text-uppercase fw-bold mb-1">
                            {item.label}
                          </span>
                          <span className="item-value fw-bold text-truncate">
                            {item.value || "—"}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div
                className="info-item mt-4 pt-3"
                style={{ borderTop: "1px solid var(--text-muted)" }}
              >
                <div
                  className="d-flex p-3 rounded-5 mx-auto align-items-center justify-content-center profile-item"
                  style={{ width: "fit-content" }}
                >
                  <div className="icon-box p-2 d-flex align-items-center justify-content-center rounded-4 flex-shrink-0 me-3 mt-1">
                    <Mail size={25} />
                  </div>

                  {/* Text Content */}
                  <div className="d-flex flex-column text-start">
                    <span className="item-label text-uppercase fw-bold mb-1">
                      Verified Email Address
                    </span>
                    <span
                      className="item-value fw-bold text-truncate"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {student.email}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 p-3 rounded-end-5 bg-secondary bg-opacity-10 border-5 border-start border-secondary">
                <p
                  className="mb-0 small"
                  style={{ color: "var(--text-muted)" }}
                >
                  <strong>Note:</strong> Academic details are synced from
                  signup. Contact your coordinator for corrections.
                </p>
              </div>
            </div>
          </div>

          {/* LOGIN & SECURITY CARD */}
          <div className="card settings-card shadow-sm rounded-4">
            <div className="card-body p-5">
              <h4 className="fw-bold mb-4 text-center">Login & Security</h4>

              <div className="d-flex flex-column gap-3">
                <Link
                  to="/forgot-password"
                  title="Change Password"
                  className="security-link-item"
                >
                  <div className="d-flex align-items-center gap-3">
                    <div className="item-icon-circle bg-primary bg-opacity-10">
                      <KeyRound />
                    </div>
                    <div>
                      <h6
                        className="fw-bold m-0"
                        style={{ color: "var(--text-main)" }}
                      >
                        Change Password
                      </h6>
                      <p
                        className="small m-0"
                        style={{ color: "var(--text-muted)" }}
                      >
                        Reset your password via OTP verification
                      </p>
                    </div>
                  </div>
                  <span className="fs-4" style={{ color: "var(--text-muted)" }}>
                    ›
                  </span>
                </Link>

                <div
                  className="security-link-item opacity-75"
                  style={{ cursor: "not-allowed" }}
                >
                  <div className="d-flex align-items-center gap-3">
                    <div className="item-icon-circle">
                      <MonitorSmartphone />
                    </div>
                    <div>
                      <h6 className="fw-bold m-0">Login Activity</h6>
                      <p
                        className="small m-0"
                        style={{ color: "var(--text-muted)" }}
                      >
                        Check where you’re currently logged in
                      </p>
                    </div>
                  </div>
                  <span
                    className={`badge rounded-pill border small ${theme === "dark" ? "bg-light text-dark" : "bg-dark text-light"}`}
                  >
                    Soon
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* APPEARANCE CARD */}
          <div className="card settings-card shadow-sm rounded-4 mt-4">
            <div className="card-body p-5">
              <h4 className="fw-bold text-center">Appearance & Preferences</h4>
              <p
                className="text-center mb-4"
                style={{ color: "var(--text-muted)" }}
              >
                Customize how Classora looks on your device
              </p>

              <div className="row g-3 mt-2">
                {/* Light Theme */}
                <div className="col-4">
                  <div
                    onClick={() => setThemePreference("light")}
                    className={`p-4 rounded-4 d-flex flex-column themeCards align-items-center justify-content-center transition-all ${themePreference === "light" ? "border-primary bg-primary bg-opacity-10" : ""}`}
                    style={{ cursor: "pointer" }}
                  >
                    <Sun
                      className={
                        themePreference === "light" ? "text-primary" : ""
                      }
                      size={32}
                    />
                    <span
                      className={`mt-3 fw-bold ${themePreference === "light" ? "text-primary" : ""}`}
                    >
                      Light
                    </span>
                  </div>
                </div>

                {/* Dark Theme */}
                <div className="col-4">
                  <div
                    onClick={() => setThemePreference("dark")}
                    className={`p-4 rounded-4 themeCards d-flex flex-column align-items-center justify-content-center transition-all ${themePreference === "dark" ? "border-primary bg-primary bg-opacity-10" : ""}`}
                    style={{ cursor: "pointer" }}
                  >
                    <Moon
                      className={
                        themePreference === "dark" ? "text-primary" : ""
                      }
                      size={32}
                    />
                    <span
                      className={`mt-3 fw-bold ${themePreference === "dark" ? "text-primary" : ""}`}
                    >
                      Dark
                    </span>
                  </div>
                </div>

                {/* System Theme */}
                <div className="col-4">
                  <div
                    onClick={() => setThemePreference("system")}
                    className={`p-4 rounded-4 themeCards d-flex flex-column align-items-center justify-content-center transition-all ${themePreference === "system" ? "border-primary bg-primary bg-opacity-10" : ""}`}
                    style={{ cursor: "pointer" }}
                  >
                    <Monitor
                      className={
                        themePreference === "system" ? "text-primary" : ""
                      }
                      size={32}
                    />
                    <span
                      className={`mt-3 fw-bold ${themePreference === "system" ? "text-primary" : ""}`}
                    >
                      System
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
