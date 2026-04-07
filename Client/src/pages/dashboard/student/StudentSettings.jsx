import React from "react";
import { Link } from "react-router-dom";
import {
    KeyRound,
MonitorSmartphone
} from "lucide-react";
import "./Settings.css";

const SettingsPage = ({ student }) => {
  return (
    <div className="settingsWrapper p-4">
      <div className="text-center mt-5 mb-5">
        <h1
          className="fw-bolder text-dark mb-2"
          style={{ letterSpacing: "-0.5px" }}
        >
          Account Settings
        </h1>
        <p className="text-muted fw-medium fs-6">
          Manage your academic profile, security preferences, and account
          details.
        </p>
      </div>
      <div className="settings-window bg-success bg-opacity-10 p-5 rounded-5">
        <div className="mx-auto" style={{ maxWidth: "900px" }}>
          {/* ACADEMIC IDENTITY CARD */}
          <div className="card settings-card bg-white border shadow-sm rounded-4 mb-4">
            <div className="card-body p-4">
              <h4 className="fw-bold mb-4 text-dark text-center">Academic Identity</h4>

              <div className="identity-grid text-center">
                <div className="info-item">
                  <label className="mb-1">Full Name</label>
                  <p>{student.name}</p>
                </div>
                <div className="info-item">
                  <label className="mb-1">Roll Number</label>
                  <p>{student.rollno}</p>
                </div>
                <div className="info-item">
                  <label className="mb-1">Department</label>
                  <p>{student.dept}</p>
                </div>
                <div className="info-item">
                  <label className="mb-1">Current Year</label>
                  <p>{student.year}</p>
                </div>
              </div>

              <div className="info-item border-top text-center mt-4 pt-3">
                <label>Verified Email Address</label>
                <p>{student.email}</p>
              </div>

              <div className="mt-4 p-3 rounded-end-5 bg-secondary bg-opacity-10 border-5 border-start  border-secondary">
                <p className="mb-0 text-muted small">
                  <strong>Note:</strong> Academic details are synced from
                  signup. Contact your coordinator for corrections.
                </p>
              </div>
            </div>
          </div>

          {/* LOGIN & SECURITY CARD */}
          <div className="card settings-card border-0 shadow-sm rounded-4">
            <div className="card-body p-4">
              <h4 className="fw-bold mb-4 text-dark text-center">Login & Security</h4>

              <div className="d-flex flex-column gap-3">
                <Link
                  to="/forgot-password"
                  title="Change Password"
                  className="security-link-item"
                >
                  <div className="d-flex align-items-center gap-3">
                    <div className="item-icon-circle ">
                        <KeyRound />
                    </div>
                    <div>
                      <h6 className="fw-bold m-0 text-dark">Change Password</h6>
                      <p className="small text-muted m-0">
                        Reset your password via OTP verification
                      </p>
                    </div>
                  </div>
                  <span className="fs-4 text-muted">›</span>
                </Link>

                <div
                  className="security-link-item opacity-75"
                  style={{ cursor: "not-allowed" }}
                >
                  <div className="d-flex align-items-center gap-3">
                    <div className="item-icon-circle">
                        <MonitorSmartphone/>
                    </div>
                    <div>
                      <h6 className="fw-bold m-0 text-dark">Login Activity</h6>
                      <p className="small text-muted m-0">
                        Check where you’re currently logged in
                      </p>
                    </div>
                  </div>
                  <span className="badge rounded-pill bg-light text-muted border small">
                    Soon
                  </span>
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
