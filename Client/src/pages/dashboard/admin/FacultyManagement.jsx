import React, { useState, useMemo } from "react";
import "./AdminDash.css";
import CustomDropdown from "../../../components/CustomDropdown";
import { toast } from "react-toastify";

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
  plus: (
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
      <path d="M5 12h14" />
      <path d="M12 5v14" />
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
  toggle: (
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
      <path d="m17 2 4 4-4 4" />
      <path d="M3 11v-1a4 4 0 0 1 4-4h14" />
      <path d="m7 22-4-4 4-4" />
      <path d="M21 13v1a4 4 0 0 1-4 4H3" />
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
  phone: (
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
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
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
  security: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 16v-2a2 2 0 0 0-4 0v2" />
      <path d="M9.5 15H7a4 4 0 0 0-4 4v2" />
      <circle cx="10" cy="7" r="4" />
      <rect x="13" y="16" width="8" height="5" rx=".899" />
    </svg>
  ),
};

const mockFaculty = [
  {
    id: "f1",
    empId: "EMP-1042",
    name: "Prof. Alok Sharma",
    email: "a.sharma@jmieti.edu.in",
    phone: "+91 98765 43210",
    deptCode: "CSE",
    isActive: true,
    activeAssignments: 4,
    totalGraded: 1250,
  },
  {
    id: "f2",
    empId: "EMP-1088",
    name: "Dr. Sunita Verma",
    email: "s.verma@jmieti.edu.in",
    phone: "+91 98765 11223",
    deptCode: "IT",
    isActive: true,
    activeAssignments: 2,
    totalGraded: 430,
  },
  {
    id: "f3",
    empId: "EMP-1105",
    name: "Prof. Raj Singh",
    email: "r.singh@jmieti.edu.in",
    phone: "+91 99887 77665",
    deptCode: "ME",
    isActive: false,
    activeAssignments: 0,
    totalGraded: 890,
  },
  {
    id: "f4",
    empId: "EMP-1201",
    name: "Ms. Neha Gupta",
    email: "n.gupta@jmieti.edu.in",
    phone: "+91 88776 66554",
    deptCode: "CSE",
    isActive: true,
    activeAssignments: 6,
    totalGraded: 2100,
  },
];

const deptDropdownData = [
  {
    name: "Department",
    options: ["All Departments", "CSE", "IT", "ME", "BCA"],
  },
];
const formDeptDropdownData = [
  { name: "Department", options: ["CSE", "IT", "ME", "BCA"] },
];

const designationList = [
  {
    name: "Designation",
    options: [
      "Assistant Professor",
      "Associate Professor",
      "Professor",
      "Guest Lecturer",
    ],
  },
];

const TABLE_HEADERS = [
  { label: "Faculty Identity", cls: "ps-4" },
  { label: "Employee ID", cls: "" },
  { label: "Department", cls: "" },
  { label: "Status", cls: "" },
  { label: "Actions", cls: "text-end pe-4" },
];

const ADD_FORM_FIELDS = [
  {
    id: "email",
    label: "Email Address *",
    type: "email",
    placeholder: "jane@institute.edu",
    col: "col-md-12",
    required: true,
  },
  {
    id: "name",
    label: "Full Name *",
    type: "text",
    placeholder: "e.g. Dr. Jane Doe",
    col: "col-6",
    required: true,
  },
  {
    id: "phone",
    label: "Phone Number *",
    type: "tel",
    placeholder: "+91 XXXXX XXXXX",
    maxLength: 10,
    col: "col-md-6",
    required: false,
  },
];

const StatusBadge = ({ isActive }) => {
  const theme = isActive ? "success" : "danger";
  return (
    <span
      className={`badge bg-${theme} bg-opacity-10 text-${theme} px-3 py-2 rounded-pill d-inline-flex align-items-center gap-2`}
    >
      <span
        className={`bg-${theme} rounded-circle`}
        style={{ width: "6px", height: "6px" }}
      ></span>
      {isActive ? "Active" : "Inactive"}
    </span>
  );
};

const ActionBtn = ({ icon, title, onClick }) => (
  <button
    onClick={onClick}
    className="btn btn-sm btn-light border-0 rounded-circle transition-hover text-secondary d-flex align-items-center justify-content-center"
    style={{ width: "36px", height: "36px" }}
    title={title}
  >
    {icon}
  </button>
);

const getInitials = (name) => {
  const parts = name
    .replace(/(Prof\.|Dr\.|Mr\.|Ms\.)\s*/g, "")
    .trim()
    .split(" ");
  return parts.length >= 2
    ? `${parts[0][0]}${parts[1][0]}`.toUpperCase()
    : name.substring(0, 2).toUpperCase();
};

const AddFacultyModal = ({
  isOpen,
  onClose,
  addForm,
  setAddForm,
  onSubmit,
}) => {
  if (!isOpen) return null;

  const handleInputChange = (id, value, isTelInput = false) => {
    setAddForm((prev) => ({
      ...prev,
      [id]:
        value && isTelInput ? value.replace(/\D/g, "").substring(0, 10) : value,
    }));
  };

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
      style={{
        backgroundColor: "rgba(15, 23, 42, 0.4)",
        backdropFilter: "blur(4px)",
        zIndex: 1050,
      }}
    >
      <div
        className="bg-white rounded-4 shadow-lg w-100 overflow-hidden fade-in"
        style={{ maxWidth: "650px" }}
      >
        <div className="d-flex justify-content-between align-items-center p-4 border-bottom bg-light">
          <h5 className="fw-bold text-dark mb-0">Onboard New Faculty</h5>
          <button className="btn btn-link text-secondary p-0" onClick={onClose}>
            {ICONS.close}
          </button>
        </div>

        <form onSubmit={onSubmit} className="p-3 px-5">
          <div className="row g-4">
            {ADD_FORM_FIELDS.map(
              ({ id, label, type, placeholder, col, required, maxLength }) => (
                <div key={id} className={col}>
                  <label className="form-label fw-bold small text-muted text-uppercase">
                    {label}
                  </label>
                  <input
                    type={type}
                    className="form-control form-control-lg bg-light border-0 fs-6"
                    placeholder={placeholder}
                    required={required}
                    maxLength={maxLength}
                    value={addForm[id]}
                    onChange={(e) =>
                      handleInputChange(
                        id,
                        e.target.value,
                        type === "tel" ? true : false,
                      )
                    }
                  />
                </div>
              ),
            )}
            <div className="col-6">
              <label className="form-label fw-bold text-muted small text-uppercase">
                Designation *
              </label>
              <CustomDropdown
                dropdownData={designationList}
                selectedValue={addForm.designation || "Select Role"}
                onSelect={(n, val) => handleInputChange("designation", val)}
              />
            </div>
            <div className="col-6 " style={{ zIndex: 5 }}>
              <label className="form-label fw-bold small text-muted text-uppercase">
                Primary Department *
              </label>
              <CustomDropdown
                dropdownData={formDeptDropdownData}
                selectedValue={addForm.dept}
                onSelect={(n, v) => handleInputChange("dept", v)}
              />
            </div>
          </div>

          <div
            className="mt-4 p-3 bg-primary bg-opacity-10 border border-primary border-opacity-25 rounded-3 row align-items-center position-relative"
            style={{ zIndex: 1 }}
          >
            <div className="col-1 text-primary">{ICONS.security}</div>
            <div className="col ">
              <h6
                className="fw-bold text-primary mb-1"
                style={{ fontSize: "0.85rem" }}
              >
                Secure Credential Generation
              </h6>
              <p className="text-muted small mb-0 lh-sm">
                A secure password will be automatically generated and sent
                directly to the faculty member's email address upon creation.
              </p>
            </div>
          </div>

          <div className="d-flex justify-content-end gap-2 my-3 mt-4">
            <button
              type="button"
              className="btn btn-light fw-medium px-4"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn text-white fw-bold px-4 bg-dark"
              style={{ backgroundColor: "var(--classora-dark-blue, #0f172a)" }}
            >
              Send Invite
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const ProfileDrawer = ({ profile, onClose }) => {
  if (!profile) return null;

  const stats = [
    {
      label: "Active Assignments",
      value: profile.activeAssignments,
      color: "primary",
    },
    { label: "Submissions Graded", value: profile.totalGraded, color: "dark" },
  ];

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
          <h5 className="fw-bold text-dark mb-0">Faculty Identity</h5>
          <button
            className="btn btn-light rounded-circle p-2 text-secondary d-flex align-items-center justify-content-center"
            onClick={onClose}
          >
            {ICONS.close}
          </button>
        </div>

        <div className="p-4 overflow-auto flex-grow-1 bg-light bg-opacity-50">
          <div className="bg-white p-4 rounded-4 border shadow-sm text-center mb-4">
            <div
              className="rounded-circle d-flex align-items-center justify-content-center fw-bold text-primary bg-primary bg-opacity-10 mx-auto mb-3"
              style={{ width: "80px", height: "80px", fontSize: "1.8rem" }}
            >
              {getInitials(profile.name)}
            </div>
            <h4 className="fw-bolder text-dark mb-1">{profile.name}</h4>
            <div className="d-flex justify-content-center align-items-center gap-2 mb-3">
              <span className="badge bg-secondary bg-opacity-10 text-dark border border-secondary border-opacity-25 px-2 py-1">
                {profile.empId}
              </span>
              <span className="text-muted small">•</span>
              <span className="fw-medium text-secondary small">
                {profile.deptCode} Department
              </span>
            </div>
            <div className="d-flex justify-content-center">
              <StatusBadge isActive={profile.isActive} />
            </div>
          </div>

          <h6
            className="fw-bold text-muted text-uppercase mb-3"
            style={{ fontSize: "0.75rem", letterSpacing: "0.5px" }}
          >
            Contact Details
          </h6>
          <div className="bg-white rounded-4 border shadow-sm mb-4 overflow-hidden">
            <div className="d-flex align-items-center gap-3 p-3 border-bottom">
              <div className="text-secondary">{ICONS.mail}</div>
              <div className="text-dark fw-medium">{profile.email}</div>
            </div>
            <div className="d-flex align-items-center gap-3 p-3">
              <div className="text-secondary">{ICONS.phone}</div>
              <div className="text-dark fw-medium">
                {profile.phone || "Not Provided"}
              </div>
            </div>
          </div>

          <h6
            className="fw-bold text-muted text-uppercase mb-3"
            style={{ fontSize: "0.75rem", letterSpacing: "0.5px" }}
          >
            Platform Activity
          </h6>
          <div className="row g-3 mb-4">
            {stats.map(({ label, value, color }) => (
              <div key={label} className="col-6">
                <div className="bg-white p-3 rounded-4 border shadow-sm">
                  <div
                    className="text-muted small fw-bold text-uppercase mb-2"
                    style={{ fontSize: "0.65rem" }}
                  >
                    {label}
                  </div>
                  <div className={`fs-3 fw-bolder text-${color}`}>{value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const FacultyManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [deptFilter, setDeptFilter] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [viewProfileId, setViewProfileId] = useState(null);
  const [addForm, setAddForm] = useState({
    name: "",
    email: "",
    dept: "",
    designation: "",
    phone: "",
  });

  const filteredFaculty = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return mockFaculty.filter(
      (f) =>
        (f.name.toLowerCase().includes(q) ||
          f.empId.toLowerCase().includes(q) ||
          f.email.toLowerCase().includes(q)) &&
        (deptFilter === "" || f.deptCode === deptFilter),
    );
  }, [searchQuery, deptFilter]);

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!addForm.name || !addForm.email || !addForm.dept) {
      toast.error("Please fill all required fields.");
      return;
    }
    setIsAddModalOpen(false);
    console.log("New Faculty Data:", addForm);
    setAddForm({ name: "", email: "", phone: "", dept: "" });
    toast.success(`Invitation sent to ${addForm.name} at ${addForm.email}`);
  };

  return (
    <div className="faculty-management-container fade-in position-relative">
      <div className="text-center mt-5 mb-4">
        <h1
          className="fw-bolder text-dark mb-2"
          style={{ letterSpacing: "-0.5px" }}
        >
          Faculty Directory
        </h1>
        <p className="text-muted fw-medium fs-6">
          Manage academic staff identities and platform access.
        </p>
      </div>

      <div className="card px-4 px-md-5 border-0 pb-5">
        <div className="bg-light rounded-4 overflow-hidden border">
          {/* TOOLBAR */}
          <div className="p-4 d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 border-bottom">
            <div
              className="d-flex flex-wrap flex-md-nowrap gap-2 w-100"
              style={{ maxWidth: "650px" }}
            >
              <div className="position-relative w-100">
                <span className="position-absolute top-50 translate-middle-y ms-3 text-secondary">
                  {ICONS.search}
                </span>
                <input
                  type="text"
                  className="w-100 bg-secondary bg-opacity-10 border rounded-3 ps-5 py-2 fw-light focus-ring focus-ring-secondary"
                  placeholder="Search by name, ID, or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div style={{ minWidth: "220px", flexShrink: 0, zIndex: 10 }}>
                <CustomDropdown
                  dropdownData={deptDropdownData}
                  selectedValue={
                    deptFilter === "" ? "All Departments" : deptFilter
                  }
                  onSelect={(_, v) =>
                    setDeptFilter(v === "All Departments" ? "" : v)
                  }
                />
              </div>
            </div>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="btn text-white bg-dark rounded-3 px-4 py-2 fw-bold d-flex align-items-center gap-2 flex-shrink-0"
              style={{
                fontSize: "0.9rem",
              }}
            >
              {ICONS.plus} Add Faculty
            </button>
          </div>

          {/* DIRECTORY TABLE */}
          <div className="table-responsive">
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
                {filteredFaculty.length > 0 ? (
                  filteredFaculty.map((faculty) => (
                    <tr
                      key={faculty.id}
                      style={{ cursor: "pointer" }}
                      onClick={() => setViewProfileId(faculty.id)}
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
                            {getInitials(faculty.name)}
                          </div>
                          <div>
                            <div className="fw-bold text-dark">
                              {faculty.name}
                            </div>
                            <div className="text-muted small">
                              {faculty.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="border-light text-dark fw-medium">
                        {faculty.empId}
                      </td>
                      <td className="border-light">
                        <span className="badge bg-secondary bg-opacity-10 text-dark border border-secondary border-opacity-25 px-2 py-1 rounded">
                          {faculty.deptCode}
                        </span>
                      </td>
                      <td className="border-light">
                        <StatusBadge isActive={faculty.isActive} />
                      </td>
                      <td
                        className="text-end pe-4 border-light"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="d-flex justify-content-end gap-2">
                          <ActionBtn
                            icon={ICONS.eye}
                            title="View Profile"
                            onClick={() => setViewProfileId(faculty.id)}
                          />
                          <ActionBtn
                            icon={ICONS.edit}
                            title="Edit"
                            onClick={() => {}}
                          />
                          <ActionBtn
                            icon={ICONS.toggle}
                            title={faculty.isActive ? "Deactivate" : "Activate"}
                            onClick={() => {}}
                          />
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-5 text-muted">
                      No faculty members found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <AddFacultyModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        addForm={addForm}
        setAddForm={setAddForm}
        onSubmit={handleAddSubmit}
      />
      <ProfileDrawer
        profile={mockFaculty.find((f) => f.id === viewProfileId)}
        onClose={() => setViewProfileId(null)}
      />

      <style>{`
        @keyframes slideInRight { from { transform: translateX(100%); } to { transform: translateX(0); } }
        .drawer-slide { animation: slideInRight 0.3s ease; }
      `}</style>
    </div>
  );
};

export default FacultyManagement;
