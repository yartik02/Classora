import React, { useState, useEffect, use } from "react";
import { NotificationProvider } from "../../../store/NotificationContext.jsx";
import Sidemenu from "../Sidemenu";
import AcademicStructure from "./AcademicStructure";
import { useAuth } from "../../../store/auth.jsx";
import FacultyManagement from "./FacultyManagement.jsx";
import StudentManagement from "./StudentManagement.jsx";
import AdminOverview from "./AdminOverview";
import SuspensionAppeals from "./Appeals.jsx";
import AdminSettings from "./AdimnSettings.jsx";
import ReportedRequests from "./ReportedRequests.jsx";
// import "./AdminDashboard.css";

const Icons = {
  SidebarToggle: (
    <svg
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <line x1="9" y1="3" x2="9" y2="21" />
    </svg>
  ),
  Overview: (
    <svg
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  Academics: (
    <svg
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
    >
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  ),
  Faculty: (
    <svg
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
    >
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  ),
  Students: (
    <svg
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
    >
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  Settings: (
    <svg
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  ),
  ChevronRight: (
    <svg
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  ),
  Appeals: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
      <path d="M12 8v4" />
      <path d="M12 16h.01" />
    </svg>
  ),
  Reported: (
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
      <path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719" />
      <path d="M12 8v4" />
      <path d="M12 16h.01" />
    </svg>
  ),
};

const navItems = [
  {
    key: "Overview",
    label: "Overview",
    icon: Icons.Overview,
  },
  {
    key: "Academics",
    label: "Academics",
    icon: Icons.Academics,
  },
  {
    key: "Faculty",
    label: "Faculty",
    icon: Icons.Faculty,
  },
  {
    key: "Students",
    label: "Students",
    icon: Icons.Students,
  },
  {
    key: "Appeals",
    label: "Suspension Appeals",
    icon: Icons.Appeals,
  },
  {
    key: "ReportedRequests",
    label: "Reported Requests",
    icon: Icons.Reported,
  },
];

const AdminDashboard = () => {
  const [activePage, setActivePage] = useState("Overview");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const [adminData, setAdminData] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    if (user && !adminData) {
      setAdminData({
        name: user.name,
        roleId: user.roleID,
        role: user.role,
        email: user.email,
      });
    }
  }, [user, adminData]);

  const formattedDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  if (!adminData) {
    return (
      <div className="mt-5 d-flex flex-column text-white p-5 align-items-center justify-content-center w-100">
        <div
          className="spinner-border text-white spinner-border-lg"
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
        <span className="mt-2">Loading...</span>
      </div>
    );
  }

  return (
    <NotificationProvider>
      <div
        className="classora-wrapper d-flex"
        style={{
          backgroundColor: " #cdd8e2",
        }}
      >
        {/* --- FIXED SIDEBAR --- */}
        <Sidemenu
          navItems={navItems}
          user={adminData}
          activeTab={activePage}
          setActiveTab={setActivePage}
          isSidebarCollapsed={isSidebarCollapsed}
          setIsSidebarCollapsed={setIsSidebarCollapsed}
        />

        {/* --- DYNAMIC MAIN CONTENT --- */}
        <main className="classora-main">
          <div className="main-content-window shadow">
            {/* Breadcrumb Header */}
            <header className="content-header mb-4">
              <div className="breadcrumbs">
                <span className="bc-parent">Classora</span>
                <span className="bc-separator">{Icons.ChevronRight}</span>
                <span className="bc-parent">Admin</span>
                <span className="bc-separator">{Icons.ChevronRight}</span>
                <span className="bc-current">{activePage}</span>
              </div>
              <div className="admin-status d-flex align-items-center gap-3">
                <span className="badge bg-success-subtle text-success border border-success-subtle px-3 rounded-pill">
                  System Live
                </span>
                <span
                  className="text-uppercase border-start border-2 fw-bold text-primary ps-3"
                  style={{ letterSpacing: "1px", fontSize: "0.85rem" }}
                >
                  {formattedDate}
                </span>
              </div>
            </header>

            {/* PAGE ROUTING LOGIC */}
            {activePage === "Overview" && <AdminOverview />}
            {activePage === "Faculty" && <FacultyManagement />}
            {activePage === "Students" && <StudentManagement />}
            {activePage === "Academics" && <AcademicStructure />}
            {activePage === "Appeals" && <SuspensionAppeals />}
            {activePage === "ReportedRequests" && <ReportedRequests />}
            {activePage === "Settings" && <AdminSettings />}
          </div>
        </main>
      </div>
    </NotificationProvider>
  );
};

export default AdminDashboard;
