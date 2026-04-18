import React, { useState, useEffect } from "react";
import "./StudentDash.css";
import OverviewTab from "./OverviewStudent";
import AssignmentsTab from "./AssignmentStudent.jsx";
import { toast } from "react-toastify";
import { useAuth } from "../../../store/auth.jsx";
import NotificationsDrawer from "./NotificationsDrawer.jsx";
// import Error from "../../Error.jsx";
import { NotificationProvider } from "../../../store/NotificationContext.jsx";
import SettingsPage from "./StudentSettings.jsx";
import Sidemenu from "../Sidemenu.jsx";

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
  Home: (
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
  BookOpen: (
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
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  ),
  CheckSquare: (
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
      <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <path d="M12 11h4" />
      <path d="M12 16h4" />
      <path d="M8 11h.01" />
      <path d="M8 16h.01" />
    </svg>
  ),
  Message: (
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
      <path d="M10.268 21a2 2 0 0 0 3.464 0" />
      <path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326" />
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
  Bell: (
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
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  ),
  Search: (
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
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
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
  Check: (
    <svg
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  X: (
    <svg
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  Clock: (
    <svg
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
};


const navItems = [
  {
    key: "Overview",
    label: "Overview",
    icon: Icons.Home,
  },
  {
    key: "Assignments",
    label: "Assignments",
    icon: Icons.CheckSquare,
  },
  {
    key: "Notifications",
    label: "Notifications",
    icon: Icons.Message,
  },
];


const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState("Overview");
  const [student, setStudent] = useState(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user && !student) {
      setStudent({
        name: user.name,
        rollNo: user.rollno,
        department: user.department,
        batch: user.batch,
        email: user.email,
      });
    }
    console.log("Student data in dashboard:", student);
  }, [user, student]);
  

  if (!student) {
    return (
      <div
        className="mt-5 d-flex flex-column text-white p-5 align-items-center justify-content-center w-100"
      >
        <div
          className="spinner-border border-2 opacity-75 text-white spinner-border-lg"
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
        <span className="mt-2">Loading...</span>
      </div>
    );
  }

  const date = new Date();

  const formattedDate = date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
  return (
    <NotificationProvider>
      <div className="classora-wrapper d-flex">
        {/* --- FIXED SIDEBAR --- */}
        <Sidemenu
          navItems={navItems}
          user={student}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isSidebarCollapsed={isSidebarCollapsed}
          setIsSidebarCollapsed={setIsSidebarCollapsed}
        />

        {/* --- SCROLLABLE MAIN CONTENT (NO SCROLLBAR) --- */}
        <main className="classora-main p-3">
          <div className="main-content-window bg-white p-5 shadow">
            <header className="content-header mt-0 mb-4">
              <div className="breadcrumbs">
                <span className="bc-parent">Classora</span>
                <span className="bc-separator">{Icons.ChevronRight}</span>
                <span className="bc-parent">Student</span>
                <span className="bc-separator">{Icons.ChevronRight}</span>
                <span className="bc-current">{activeTab}</span>
              </div>
              <div className="d-flex flex-row align-items-center">
                <p
                  className="text-uppercase fw-bold border-end border-2 d-flex align-items-center text-secondary m-0 pe-3 border-dark-subtle"
                  style={{ letterSpacing: "1px", fontSize: "0.85rem" }}
                >
                  {student.batch.programName} &nbsp;{student.department.code}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="19"
                    height="19"
                    fill="currentColor"
                    className="bi bi-dot"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3" />
                  </svg>
                   {student.batch.currentSemester} Sem
                </p>
                <p
                  className="text-uppercase fw-bold text-primary m-0 ps-3"
                  style={{ letterSpacing: "1px", fontSize: "0.85rem" }}
                >
                  {formattedDate}
                </p>
              </div>
            </header>
            {activeTab === "Overview" && (
              <OverviewTab setActiveTab={setActiveTab} />
            )}
            {activeTab === "Assignments" && <AssignmentsTab student={user}/>}
            {activeTab === "Settings" && <SettingsPage student={user}/>}
            <NotificationsDrawer />
          </div>
        </main>
      </div>
    </NotificationProvider>
  );
};

export default StudentDashboard;
