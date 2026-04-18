import React from "react";
import { Link } from "react-router-dom";
import { KeyRound, MonitorSmartphone } from "lucide-react";
import "./Settings.css";

const SettingsPage = ({ student }) => {
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
    {
      label: "Full Name",
      value: student.name,
      icon: (
        <>
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </>
      ),
    },
    {
      label: "Roll Number",
      value: student.rollno,
      icon: (
        <>
          <line x1="4" x2="20" y1="9" y2="9" />
          <line x1="4" x2="20" y1="15" y2="15" />
          <line x1="10" x2="8" y1="3" y2="21" />
          <line x1="16" x2="14" y1="3" y2="21" />
        </>
      ),
    },
    {
      label: "Department",
      value: student.department.code,
      icon: (
        <>
          <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
          <path d="M9 22v-4h6v4" />
          <path d="M8 6h.01" />
          <path d="M16 6h.01" />
          <path d="M12 6h.01" />
          <path d="M12 10h.01" />
          <path d="M12 14h.01" />
          <path d="M16 10h.01" />
          <path d="M16 14h.01" />
          <path d="M8 10h.01" />
          <path d="M8 14h.01" />
        </>
      ),
    },
    {
      label: "Current Semester",
      value: student.batch.currentSemester,
      icon: (
        <>
          <path d="M8 2v4" />
          <path d="M16 2v4" />
          <rect width="18" height="18" x="3" y="4" rx="2" />
          <path d="M3 10h18" />
          <path d="M8 14h.01" />
          <path d="M12 14h.01" />
          <path d="M16 14h.01" />
          <path d="M8 18h.01" />
          <path d="M12 18h.01" />
          <path d="M16 18h.01" />
        </>
      ),
    },
    {
      label: "Course",
      value: student.batch.programName,
      icon: (
        <svg
          width="25"
          height="25"
          viewBox="0 0 20 20"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M16.3965 5.01128C16.3963 4.93399 16.3489 4.87691 16.293 4.85406L16.2354 4.84332C13.9306 4.91764 12.5622 5.32101 10.665 6.34722V16.3716C11.3851 15.9994 12.0688 15.7115 12.7861 15.5015C13.8286 15.1965 14.9113 15.0633 16.2402 15.0435L16.2979 15.0308C16.353 15.0063 16.3965 14.9483 16.3965 14.8755V5.01128ZM3.54492 14.8765C3.54492 14.9725 3.62159 15.0422 3.70117 15.0435L4.19629 15.0562C5.94062 15.1247 7.26036 15.4201 8.65918 16.0484C8.05544 15.1706 7.14706 14.436 6.17871 14.1109V14.1099C5.56757 13.9045 5.16816 13.3314 5.16797 12.6988V4.98882C4.86679 4.93786 4.60268 4.8999 4.28223 4.87457L3.72754 4.84429C3.62093 4.84079 3.54505 4.92417 3.54492 5.01226V14.8765ZM17.7266 14.8755C17.7266 15.6314 17.1607 16.2751 16.4121 16.3628L16.2598 16.3736C15.0122 16.3922 14.0555 16.5159 13.1602 16.7779C12.2629 17.0404 11.3966 17.4508 10.3369 18.0738C10.129 18.1959 9.87099 18.1958 9.66309 18.0738C7.71455 16.9283 6.31974 16.4689 4.12988 16.3853L3.68164 16.3736C2.85966 16.3614 2.21484 15.6838 2.21484 14.8765V5.01226C2.21497 4.15391 2.93263 3.4871 3.77246 3.51519L4.39844 3.54937C4.67996 3.57191 4.92258 3.60421 5.16797 3.64214V2.51031C5.16797 1.44939 6.29018 0.645615 7.31055 1.15679L7.31152 1.15582C8.78675 1.89511 10.0656 3.33006 10.5352 4.91461C12.3595 3.98907 13.8688 3.58817 16.1924 3.51324L16.3506 3.51714C17.1285 3.5741 17.7264 4.23496 17.7266 5.01128V14.8755ZM6.49805 12.6988C6.49824 12.7723 6.5442 12.8296 6.60254 12.8492L6.96289 12.9859C7.85245 13.3586 8.68125 13.9846 9.33496 14.7496V5.5816C9.08794 4.37762 8.13648 3.1566 6.95801 2.47613L6.71582 2.34527C6.67779 2.32617 6.6337 2.32502 6.58301 2.35796C6.52946 2.39279 6.49805 2.44863 6.49805 2.51031V12.6988Z"></path>
        </svg>
      ),
    },
    {
      label: "Batch",
      value: student.batch.startingYear + " - " + student.batch.endingYear,
      icon: (
        <>
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <path d="M16 3.128a4 4 0 0 1 0 7.744" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <circle cx="9" cy="7" r="4" />
        </>
      ),
    },
  ];

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
            <div className="card-body p-5">
              <h4 className="fw-bold mb-4 text-dark text-center">
                Academic Identity
              </h4>

              <div
                className="row gx-5 gy-2 mx-auto"
                style={{ maxWidth: "800px" }}
              >
                {academicDetails.map((item, index) => (
                  <div className="col-12 col-md-6" key={index}>
                    <div className="d-flex p-3 rounded-5 justify-content-start align-items-center profile-item">
                      {/* Dynamic Icon Box */}
                      <div className="icon-box d-flex align-items-center justify-content-center rounded-4 flex-shrink-0 me-3">
                        {item.label === "Course" ? (
                          item.icon
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="25"
                            height="25"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            {item.icon}
                          </svg>
                        )}
                      </div>

                      {/* Text Content */}
                      <div className="d-flex flex-column text-start w-100">
                        <span className="item-label text-uppercase text-muted fw-bold mb-1">
                          {item.label}
                        </span>
                        <span className="item-value fw-bold text-truncate">
                          {item.value || "—"}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="info-item border-top mt-4 pt-3">
                <div className="d-flex p-3 rounded-5 mx-auto align-items-center justify-content-center profile-item" style={{width:"fit-content"}}>
                  <div className="icon-box p-2 d-flex align-items-center justify-content-center rounded-4 flex-shrink-0 me-3 mt-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="25"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 .8-1.6l8-6a2 2 0 0 1 2.4 0l8 6Z" />
                      <path d="m22 10-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 10" />
                    </svg>
                  </div>

                  {/* Text Content */}
                  <div className="d-flex flex-column text-start">
                    <span className="item-label text-uppercase text-muted fw-bold mb-1">
                      Verified Email Address
                    </span>
                    <span className="item-value fw-bold text-truncate">
                      {student.email}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 p-3 rounded-end-5 bg-secondary bg-opacity-10 border-5 border-start border-secondary">
                <p className="mb-0 text-muted small">
                  <strong>Note:</strong> Academic details are synced from
                  signup. Contact your coordinator for corrections.
                </p>
              </div>
            </div>
          </div>

          {/* LOGIN & SECURITY CARD */}
          <div className="card settings-card border-0 shadow-sm rounded-4">
            <div className="card-body p-5">
              <h4 className="fw-bold mb-4 text-dark text-center">
                Login & Security
              </h4>

              <div className="d-flex flex-column gap-3">
                <Link
                  to="/forgot-password"
                  title="Change Password"
                  className="security-link-item"
                >
                  <div className="d-flex align-items-center gap-3">
                    <div className="item-icon-circle bg-primary bg-opacity-10 text-primary">
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
                      <MonitorSmartphone />
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
