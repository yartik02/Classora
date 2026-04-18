import React from "react";
import "./AdminDash.css";

// 1. EXTRACT SVGS: Keep your data arrays clean by storing messy SVG paths in a dictionary
const ICONS = {
  faculty: (
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
      <path d="M12 12h.01" />
      <path d="M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
      <path d="M22 13a18.15 18.15 0 0 1-20 0" />
      <rect width="20" height="14" x="2" y="6" rx="2" />
    </svg>
  ),
  departments: (
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
      <path d="M14 21v-3a2 2 0 0 0-4 0v3" />
      <path d="M18 12h.01" />
      <path d="M18 16h.01" />
      <path d="M22 7a1 1 0 0 0-1-1h-2a2 2 0 0 1-1.143-.359L13.143 2.36a2 2 0 0 0-2.286-.001L6.143 5.64A2 2 0 0 1 5 6H3a1 1 0 0 0-1 1v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2z" />
      <path d="M6 12h.01" />
      <path d="M6 16h.01" />
      <circle cx="12" cy="10" r="2" />
    </svg>
  ),
  students: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="25"
      fill="currentColor"
      viewBox="0 0 16 16"
    >
      <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
      <path
        fillRule="evenodd"
        d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5"
      />
    </svg>
  ),
  suspended: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="25"
      fill="currentColor"
      viewBox="0 0 16 16"
    >
      <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5" />
    </svg>
  ),
  appeals: (
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
      <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" x2="12.01" y1="17" y2="17" />
    </svg>
  ),
  subjects: (
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
  update: (
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
      <path d="M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4" />
      <path d="M2 6h4" />
      <path d="M2 10h4" />
      <path d="M2 14h4" />
      <path d="M2 18h4" />
      <path d="M21.378 5.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z" />
    </svg>
  ),
  maintenance: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="25"
      fill="currentColor"
      viewBox="0 0 16 16"
    >
      <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
    </svg>
  ),
};

const MetricCard = ({ metric, className = "" }) => (
  <div
    className={`card metric-card bg-light gap-0 border border-secondary-50 d-flex flex-row justify-content-between align-items-center p-4 shadow-sm rounded-4 transition-hover ${className}`}
  >
    <div
      className={`bg-${metric.theme} bg-opacity-10 text-${metric.theme} rounded-4 d-flex align-items-center justify-content-center`}
      style={{
        width: "54px",
        height: "54px",
        fontSize: "1.75rem",
        flexShrink: 0,
      }}
    >
      {ICONS[metric.iconKey]}
    </div>
    <div className="d-flex flex-column align-items-end text-end">
      <h3
        className="fw-bolder m-0 text-dark"
        style={{ fontSize: "2.2rem", lineHeight: "1" }}
      >
        {metric.value}
      </h3>
      <p
        className="text-muted text-truncate w-100 fw-bold text-uppercase m-0 mt-1"
        style={{ fontSize: "0.75rem", letterSpacing: "0.08em" }}
      >
        {metric.label}
      </p>
    </div>
  </div>
);

const AdminOverview = () => {
  // Look how much cleaner the data is now without the raw HTML.
  const rightColumnMetrics = [
    {
      id: 1,
      label: "Active Faculty",
      value: "84",
      iconKey: "faculty",
      theme: "warning",
    },
    {
      id: 2,
      label: "Departments",
      value: "6",
      iconKey: "departments",
      theme: "success",
    },
  ];

  const bottomRowMetrics = [
    {
      id: 1,
      label: "Verified Students",
      value: "1,248",
      iconKey: "students",
      theme: "primary",
    },
    {
      id: 2,
      label: "Suspended Studs",
      value: "12",
      iconKey: "suspended",
      theme: "danger",
    },
    {
      id: 3,
      label: "Active Appeals",
      value: "8",
      iconKey: "appeals",
      theme: "info",
    },
    {
      id: 4,
      label: "Active Subjects",
      value: "42",
      iconKey: "subjects",
      theme: "dark",
    },
  ];

  const recentActivity = [
    {
      id: 1,
      action: "New Faculty Onboarded",
      details: "Prof. Sharma assigned to CSE",
      time: "2 hours ago",
      iconKey: "faculty",
      theme: "success",
    },
    {
      id: 2,
      action: "Student Verification",
      details: "14 new signups auto-verified via @jmieti.edu.in",
      time: "5 hours ago",
      iconKey: "students",
      theme: "primary",
    },
    {
      id: 3,
      action: "Curriculum Update",
      details: "Subject 'Cloud Computing' added to IT - 4th Year",
      time: "1 day ago",
      iconKey: "update",
      theme: "warning",
    },
    {
      id: 4,
      action: "System Maintenance",
      details: "Old semester tasks archived successfully",
      time: "3 days ago",
      iconKey: "maintenance",
      theme: "secondary",
    },
  ];

  return (
    <div className="admin-overview-container fade-in">
      {/* Top Split Section */}
      <div className="row g-4 mb-4 align-items-stretch">
        {/* LEFT: Hero Banner */}
        <div className="col-12 col-lg-9">
          <div
            className="card rounded-4 overflow-hidden position-relative h-100 w-100"
            style={{
              background: "linear-gradient(135deg, #f0f4ff 0%, #ffffff 100%)",
              border: "1px solid rgba(13, 110, 253, 0.08)",
              minHeight: "220px",
            }}
          >
            <div
              className="position-absolute Adminblobs rounded-circle"
              style={{ right: "-80px", top: "-10%" }}
            ></div>
            <div
              className="position-absolute Adminblobs rounded-circle"
              style={{ left: "-80px", bottom: "-10%" }}
            ></div>

            <div className="card-body z-1 p-4 p-lg-5 d-flex flex-column justify-content-center align-items-center h-100">
              <span
                className="badge bg-secondary bg-opacity-10 text-secondary mb-3 px-3 py-2 rounded-pill fw-medium border border-secondary border-opacity-10 d-flex align-items-center gap-1"
                style={{ fontSize: "0.85rem" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className=""
                >
                  <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
                  <path d="M6.376 18.91a6 6 0 0 1 11.249.003" />
                  <circle cx="12" cy="11" r="4" />
                </svg>{" "}
                Admin Workspace
              </span>
              <h2
                className="fw-bolder text-dark mb-2"
                style={{ letterSpacing: "-0.5px", fontSize: "2.5rem" }}
              >
                Welcome back, Admin!
              </h2>
              <p
                className="text-secondary mb-0 fw-light"
                style={{ fontSize: "0.98rem" }}
              >
                Your institutional overview and control center.
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT: Stacked Cards */}
        <div className="col-12 col-lg-3 d-flex flex-column gap-4">
          {rightColumnMetrics.map((metric) => (
            <MetricCard
              key={metric.id}
              metric={metric}
              className="flex-grow-1"
            />
          ))}
        </div>
      </div>

      {/* BOTTOM METRICS GRID */}
      <div className="row g-4 mb-5">
        {bottomRowMetrics.map((metric) => (
          <div className="col-12 col-md-6 col-lg-3" key={metric.id}>
            <MetricCard metric={metric} className="h-100" />
          </div>
        ))}
      </div>

      {/* RECENT ACTIVITY TABLE */}
      <div className="card bg-light shadow-sm rounded-4 border overflow-hidden">
        <div className="card-header border-0 bg-white pt-4 px-4 pb-2 d-flex justify-content-between align-items-center">
          <h5 className="fw-bold text-dark mb-0">Recent System Activities</h5>
          <button className="btn btn-sm btn-link text-decoration-none fw-semibold">
            View All
          </button>
        </div>
        <div className="card-body border-top p-0">
          <div className="table-responsive px-4">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th
                    className="text-uppercase text-muted ps-4 py-3"
                    style={{ fontSize: "0.75rem", letterSpacing: "0.05em" }}
                  >
                    Event
                  </th>
                  <th
                    className="text-uppercase text-muted py-3"
                    style={{ fontSize: "0.75rem", letterSpacing: "0.05em" }}
                  >
                    Details
                  </th>
                  <th
                    className="text-uppercase text-muted text-end pe-4 py-3"
                    style={{ fontSize: "0.75rem", letterSpacing: "0.05em" }}
                  >
                    Timestamp
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentActivity.map((log, index) => (
                  <tr
                    key={log.id}
                    className={
                      index === recentActivity.length - 1
                        ? "border-transparent"
                        : ""
                    }
                  >
                    <td className="ps-4 py-3 border-light">
                      <div className="d-flex align-items-center gap-3">
                        <div
                          className={`bg-${log.theme} bg-opacity-10 text-${log.theme} rounded d-flex align-items-center justify-content-center`}
                          style={{ width: "36px", height: "36px" }}
                        >
                          {/* Re-using icons from map, sizing down slightly via CSS/container */}
                          <div style={{ transform: "scale(0.8)" }}>
                            {ICONS[log.iconKey]}
                          </div>
                        </div>
                        <span className="fw-bold text-dark">{log.action}</span>
                      </div>
                    </td>
                    <td className="py-3 text-secondary border-light">
                      {log.details}
                    </td>
                    <td className="py-3 text-end text-muted small pe-4 border-light fw-medium">
                      {log.time}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;