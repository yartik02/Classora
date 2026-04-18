import React, { useState, useMemo } from "react";
import "./AdminDash.css";
import CustomDropdown from "../../../components/CustomDropdown";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ICONS = {
  search: (
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
    >
      <path d="m21 21-4.34-4.34" />
      <circle cx="11" cy="11" r="8" />
    </svg>
  ),
  edit: (
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
    >
      <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
      <path d="m15 5 4 4" />
    </svg>
  ),
  ban: (
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
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m4.9 4.9 14.2 14.2" />
    </svg>
  ),
  close: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
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
  mail: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  ),
  eye: (
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
    >
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  chevronLeft: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  ),
  chevronRight: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  ),
};

// Simulated "Page 1" response from backend
const mockStudents = [
  {
    id: "st1",
    rollNo: "21CS042",
    name: "Rahul Sharma",
    email: "rahul.21cs@jmieti.edu.in",
    dept: "CSE",
    sem: "6th Sem",
    status: "Active",
    pendingAssign: 2,
    completedAssign: 34,
  },
  {
    id: "st2",
    rollNo: "21IT018",
    name: "Priya Verma",
    email: "priya.21it@jmieti.edu.in",
    dept: "IT",
    sem: "6th Sem",
    status: "Active",
    pendingAssign: 0,
    completedAssign: 38,
  },
  {
    id: "st3",
    rollNo: "22ME105",
    name: "Amit Singh",
    email: "amit.22me@jmieti.edu.in",
    dept: "ME",
    sem: "4th Sem",
    status: "Suspended",
    pendingAssign: 5,
    completedAssign: 12,
  },
  {
    id: "st4",
    rollNo: "23CS001",
    name: "Kavita Das",
    email: "kavita.23cs@jmieti.edu.in",
    dept: "CSE",
    sem: "2nd Sem",
    status: "Active",
    pendingAssign: 1,
    completedAssign: 14,
  },
  {
    id: "st5",
    rollNo: "21CS099",
    name: "Vikram Kumar",
    email: "vikram.21cs@jmieti.edu.in",
    dept: "CSE",
    sem: "6th Sem",
    status: "Suspended",
    pendingAssign: 8,
    completedAssign: 20,
  },
];

const FILTERS = {
  dept: [
    {
      name: "Department",
      options: ["All Departments", "CSE", "IT", "ME", "BCA"],
    },
  ],
  sem: [
    {
      name: "Semester",
      options: [
        "All Semesters",
        "1st Sem",
        "2nd Sem",
        "3rd Sem",
        "4th Sem",
        "5th Sem",
        "6th Sem",
        "7th Sem",
        "8th Sem",
      ],
    },
  ],
  status: [
    {
      name: "Status",
      options: ["All Statuses", "Active", "Suspended", "Pending Verification"],
    },
  ],
};

const TABLE_HEADERS = [
  { label: "Student Identity", cls: "ps-4" },
  { label: "Roll Number", cls: "" },
  { label: "Academic Map", cls: "" },
  { label: "Status", cls: "" },
  { label: "Actions", cls: "text-end pe-4" },
];

const StatusBadge = ({ status }) => {
  const theme =
    status === "Active"
      ? "success"
      : status === "Suspended"
        ? "danger"
        : "warning";
  return (
    <span
      className={`badge bg-${theme} bg-opacity-10 text-${theme} px-3 py-2 rounded-pill d-inline-flex align-items-center gap-2`}
    >
      <span
        className={`bg-${theme} rounded-circle`}
        style={{ width: "6px", height: "6px" }}
      ></span>
      {status}
    </span>
  );
};

const ActionBtn = ({ icon, title, onClick, colorClass = "text-secondary" }) => (
  <button
    onClick={onClick}
    className={`btn btn-sm btn-light border-0 rounded-circle transition-hover ${colorClass} d-flex align-items-center justify-content-center`}
    style={{ width: "36px", height: "36px" }}
    title={title}
  >
    {icon}
  </button>
);

const getInitials = (name) => {
  const parts = name.trim().split(" ");
  return parts.length >= 2
    ? `${parts[0][0]}${parts[1][0]}`.toUpperCase()
    : name.substring(0, 2).toUpperCase();
};

const ServerPaginationFooter = () => (
  <div className="bg-light p-3 border-top d-flex justify-content-between align-items-center mt-auto">
    <span className="text-muted small fw-medium">
      Showing <span className="text-dark fw-bold">1 - 5</span> of{" "}
      <span className="text-dark fw-bold">4,102</span> Students
    </span>
    <div className="d-flex align-items-center gap-2">
      <button
        className="btn btn-sm btn-outline-secondary d-flex align-items-center justify-content-center disabled"
        style={{ width: "32px", height: "32px" }}
      >
        {ICONS.chevronLeft}
      </button>
      <span className="text-dark small fw-bold px-2">Page 1 of 821</span>
      <button
        className="btn btn-sm btn-outline-secondary d-flex align-items-center justify-content-center"
        style={{ width: "32px", height: "32px" }}
      >
        {ICONS.chevronRight}
      </button>
    </div>
  </div>
);

const SuspendModal = ({ student, onClose, onSuspend }) => {
  const [duration, setDuration] = useState("1 Week");
  const [reason, setReason] = useState("");

  if (!student) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!reason.trim()) {
      toast.error("A suspension reason is required for the audit log.");
      return;
    }
    onSuspend(student.id, duration, reason);
  };

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
      style={{
        backgroundColor: "rgba(15, 23, 42, 0.6)",
        backdropFilter: "blur(4px)",
        zIndex: 1050,
      }}
    >
      <div
        className="bg-white rounded-4 shadow-lg w-100 overflow-hidden fade-in"
        style={{ maxWidth: "500px" }}
      >
        <div className="bg-danger bg-opacity-10 p-4 border-bottom border-danger border-opacity-25 d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-3">
            <div
              className="bg-danger text-white rounded-circle d-flex align-items-center justify-content-center"
              style={{ width: "40px", height: "40px" }}
            >
              {ICONS.ban}
            </div>
            <div>
              <h5 className="fw-bold text-danger mb-0">Suspend Student</h5>
              <span className="text-danger small opacity-75">
                {student.name} ({student.rollNo})
              </span>
            </div>
          </div>
          <button className="btn btn-link text-danger p-0" onClick={onClose}>
            {ICONS.close}
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 p-md-5">
          <div className="mb-4">
            <label className="form-label fw-bold small text-muted">
              Suspension Duration *
            </label>
            <select
              className="form-select form-select-lg bg-light border-0 fs-6 text-dark"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            >
              <option value="3 Days">3 Days</option>
              <option value="1 Week">1 Week</option>
              <option value="1 Month">1 Month</option>
              <option value="Permanent">Permanent (Expulsion)</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="form-label fw-bold small text-muted">
              Reason for Suspension *
            </label>
            <textarea
              className="form-control bg-light border-0 fs-6"
              rows="4"
              placeholder="State the policy violation. This will be recorded in the audit log."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="d-flex justify-content-end gap-2 mt-4">
            <button
              type="button"
              className="btn btn-light fw-medium px-4"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-danger fw-bold px-4">
              Confirm Suspension
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const ProfileDrawer = ({ student, onClose }) => {
  if (!student) return null;

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-end"
      style={{
        backgroundColor: "rgba(15, 23, 42, 0.4)",
        backdropFilter: "blur(2px)",
        zIndex: 1050,
      }}
    >
      <div
        className="bg-white h-100 shadow-lg d-flex flex-column drawer-slide"
        style={{ width: "100%", maxWidth: "450px" }}
      >
        <div className="p-4 d-flex justify-content-between align-items-center border-bottom">
          <h5 className="fw-bold text-dark mb-0">Student Profile</h5>
          <button
            className="btn btn-light rounded-circle p-2 text-secondary d-flex align-items-center justify-content-center"
            onClick={onClose}
          >
            {ICONS.close}
          </button>
        </div>

        <div className="p-4 overflow-auto flex-grow-1 bg-light bg-opacity-50">
          <div className="bg-white p-4 rounded-4 border shadow-sm text-center mb-4">
            <div className="header mb-2 d-flex align-items-center justify-content-between text-start">
              <div
                className="rounded-circle col-3 k d-flex align-items-center justify-content-center fw-bold text-primary bg-primary bg-opacity-10 "
                style={{ width: "80px", height: "80px", fontSize: "1.8rem" }}
              >
                {getInitials(student.name)}
              </div>
              <div className="nameDetails col-9">
                <div className="name d-flex align-items-center justify-content-between">
                  <h4 className="fw-bolder text-dark mb-1">{student.name}</h4>
                  <div className="d-flex justify-content-center">
                    <StatusBadge status={student.status} />
                  </div>
                </div>
                <div className="d-flex justify-content-start align-items-center gap-2">
                  <span className="badge bg-secondary bg-opacity-10 text-dark border border-secondary border-opacity-25 px-2 py-1">
                    {student.rollNo}
                  </span>
                  <span className="text-muted small">•</span>
                  <span className="fw-medium text-secondary small">
                    {student.dept} • {student.sem}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <h6
            className="fw-bold text-muted text-uppercase mb-3"
            style={{ fontSize: "0.75rem", letterSpacing: "0.5px" }}
          >
            Contact Details
          </h6>
          <div className="bg-white rounded-4 border shadow-sm mb-4 overflow-hidden">
            <div className="d-flex align-items-center gap-3 p-3">
              <div className="text-secondary">{ICONS.mail}</div>
              <div className="text-dark fw-medium">{student.email}</div>
            </div>
          </div>

          <h6
            className="fw-bold text-muted text-uppercase mb-3"
            style={{ fontSize: "0.75rem", letterSpacing: "0.5px" }}
          >
            Assignment Engagement
          </h6>
          <div className="row g-3 mb-4">
            <div className="col-6">
              <div className="bg-white p-3 rounded-4 border shadow-sm">
                <div
                  className="text-muted small fw-bold text-uppercase mb-2"
                  style={{ fontSize: "0.65rem" }}
                >
                  Pending
                </div>
                <div className="fs-3 fw-bolder text-warning">
                  {student.pendingAssign}
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="bg-white p-3 rounded-4 border shadow-sm">
                <div
                  className="text-muted small fw-bold text-uppercase mb-2"
                  style={{ fontSize: "0.65rem" }}
                >
                  Completed
                </div>
                <div className="fs-3 fw-bolder text-success">
                  {student.completedAssign}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StudentManagement = () => {
  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({ dept: "", sem: "", status: "" });

  // Overlays
  const [viewProfileId, setViewProfileId] = useState(null);
  const [suspendStudentId, setSuspendStudentId] = useState(null);

  // Local State (Simulating DB)
  const [studentData, setStudentData] = useState(mockStudents);

  const updateFilter = (key, value) => {
    // Reset to empty string if "All X" is selected
    setFilters((prev) => ({
      ...prev,
      [key]: value.startsWith("All") ? "" : value,
    }));
  };

  const filteredStudents = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return studentData.filter(
      (s) =>
        (s.name.toLowerCase().includes(q) ||
          s.rollNo.toLowerCase().includes(q)) &&
        (filters.dept === "" || s.dept === filters.dept) &&
        (filters.sem === "" || s.sem === filters.sem) &&
        (filters.status === "" || s.status === filters.status),
    );
  }, [searchQuery, filters, studentData]);

  const handleSuspend = (id, duration, reason) => {
    setStudentData((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: "Suspended" } : s)),
    );
    setSuspendStudentId(null);
    toast.success(
      "Student successfully suspended. They have been moved to the Appeals queue.",
    );
  };

  return (
    <div className="student-management-container fade-in position-relative">

      {/* HEADER */}
      <div className="text-center mt-5 mb-4">
        <h1
          className="fw-bolder text-dark mb-2"
          style={{ letterSpacing: "-0.5px" }}
        >
          Student Directory
        </h1>
        <p className="text-muted fw-medium fs-6">
          Monitor student engagement and manage academic access.
        </p>
      </div>

      {/* MAIN CARD */}
      <div className="card px-4 px-md-5 border-0 pb-5">
        <div
          className="bg-light rounded-4 overflow-hidden border d-flex flex-column"
        >
          {/* TOOLBAR */}
          <div className="p-4 d-flex flex-column flex-xl-row justify-content-between align-items-xl-center gap-3 border-bottom">
            <div className="d-flex flex-wrap flex-md-nowrap gap-2 w-100">
              <div
                className="position-relative w-100"
                style={{ minWidth: "250px", maxWidth: "350px" }}
              >
                <span className="position-absolute top-50 translate-middle-y ms-3 text-secondary">
                  {ICONS.search}
                </span>
                <input
                  type="text"
                  className="w-100 bg-secondary bg-opacity-10 border rounded-3 ps-5 py-2 fw-light focus-ring focus-ring-secondary"
                  placeholder="Search by Name or Roll No..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Dynamic Dropdowns */}
              <div
                className="d-flex gap-2 flex-grow-1 overflow-visible pe-2"
                style={{ zIndex: 10 }}
              >
                <div style={{ width: "205px" }}>
                  <CustomDropdown
                    dropdownData={FILTERS.dept}
                    selectedValue={filters.dept || "All Departments"}
                    onSelect={(_, v) => updateFilter("dept", v)}
                  />
                </div>
                <div style={{ width: "185px" }}>
                  <CustomDropdown
                    dropdownData={FILTERS.sem}
                    selectedValue={filters.sem || "All Semesters"}
                    onSelect={(_, v) => updateFilter("sem", v)}
                  />
                </div>
                <div style={{ width: "170px" }}>
                  <CustomDropdown
                    dropdownData={FILTERS.status}
                    selectedValue={filters.status || "All Statuses"}
                    onSelect={(_, v) => updateFilter("status", v)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* DIRECTORY TABLE */}
          <div className="table-responsive flex-grow-1">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  {TABLE_HEADERS.map(({ label, cls }, idx) => (
                    <th
                      key={idx}
                      className={`text-uppercase text-muted py-3 border-bottom-0 ${cls}`}
                      style={{ fontSize: "0.75rem", letterSpacing: "0.08em" }}
                    >
                      {label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((student) => (
                    <tr
                      key={student.id}
                      style={{ cursor: "pointer" }}
                      onClick={() => setViewProfileId(student.id)}
                    >
                      <td className="ps-4 py-3 border-light">
                        <div className="d-flex align-items-center gap-3">
                          <div
                            className="rounded-circle d-flex align-items-center justify-content-center fw-bold text-primary bg-primary bg-opacity-10"
                            style={{
                              width: "42px",
                              height: "42px",
                              fontSize: "0.9rem",
                            }}
                          >
                            {getInitials(student.name)}
                          </div>
                          <div>
                            <div className="fw-bold text-dark">
                              {student.name}
                            </div>
                            <div className="text-muted small">
                              {student.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="border-light text-dark fw-medium">
                        {student.rollNo}
                      </td>
                      <td className="border-light">
                        <div className="text-dark fw-medium mb-1">
                          {student.dept}
                        </div>
                        <span className="badge bg-secondary bg-opacity-10 text-dark border border-secondary border-opacity-25 px-2 py-1 rounded">
                          {student.sem}
                        </span>
                      </td>
                      <td className="border-light">
                        <StatusBadge status={student.status} />
                      </td>
                      <td
                        className="text-end pe-4 border-light"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="d-flex justify-content-end gap-2">
                          <ActionBtn
                            icon={ICONS.eye}
                            title="View Profile"
                            onClick={() => setViewProfileId(student.id)}
                          />
                          <ActionBtn
                            icon={ICONS.edit}
                            title="Edit Student Profile"
                            onClick={() => {}}
                          />
                          {student.status === "Active" && (
                            <ActionBtn
                              icon={ICONS.ban}
                              title="Suspend Student"
                              colorClass="text-danger"
                              onClick={() => setSuspendStudentId(student.id)}
                            />
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-5 text-muted">
                      No students match your filter criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <ServerPaginationFooter />
        </div>
      </div>

      <SuspendModal
        student={studentData.find((s) => s.id === suspendStudentId)}
        onClose={() => setSuspendStudentId(null)}
        onSuspend={handleSuspend}
      />
      <ProfileDrawer
        student={studentData.find((s) => s.id === viewProfileId)}
        onClose={() => setViewProfileId(null)}
      />

      <style>{`
        @keyframes slideInRight { from { transform: translateX(100%); } to { transform: translateX(0); } }
        .drawer-slide { animation: slideInRight 0.3s ease; }
      `}</style>
    </div>
  );
};

export default StudentManagement;
