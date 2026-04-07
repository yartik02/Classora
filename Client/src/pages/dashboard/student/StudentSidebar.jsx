import logo from "../../../assets/ClassoraLogoNew.svg";
import { useNotifications } from "../../../store/NotificationContext";
import "./StudentDash.css";
import { Link } from "react-router-dom";

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

const SidebarStudent = ({
  student,
  activeTab,
  setActiveTab,
  isSidebarCollapsed,
  setIsSidebarCollapsed,
}) => {
  const { openNotifications, unreadCount } = useNotifications();
  const handleNavClick = (key) => {
    if (key === "Notifications") {
      return openNotifications();
    }
    setActiveTab(key);
  };
  return (
    <aside
      className={`classora-sidebar ${isSidebarCollapsed ? "collapsed" : ""}`}
    >
      <div className="sidebar-top">
        <div className="sidebar-logo-container mb-4">
          <img src={logo} alt="Classora Logo" height={35} className="me-0" />
          {!isSidebarCollapsed && (
            <span className="brand-name fw-semibold p-0 ">Classora</span>
          )}
          <button
            className={`collapse-toggle ${isSidebarCollapsed ? "closed" : ""}`}
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            title="Toggle Sidebar"
          >
            {Icons.SidebarToggle}
          </button>
        </div>

        <div className="fade-in">
          {!isSidebarCollapsed && (
            <p className="nav-group-title  text-start fw-semibold">Main menu</p>
          )}
          <nav className="nav-group">
            {navItems.map(({ key, label, icon }) => (
              <button
                key={key}
                className={`nav-item rounded-4 ${activeTab === key ? "active" : ""} ${key === "Notifications"?"position-relative":""}`}
                onClick={() => handleNavClick(key)}
                title={label}
              >
                <span className="nav-icon">{icon}</span>
                {!isSidebarCollapsed && (
                  <span className="nav-text">{label}</span>
                )}
                {key==="Notifications" && unreadCount > 0 && (
                  <span
                    className="position-absolute translate-middle rounded-circle bg-danger"
                    style={{
                      width: "10px",
                      height: "10px",
                      top: "12px",
                      left: isSidebarCollapsed ? "70%" : "30px",
                    }}
                  ></span>
                )}
              </button>
            ))}
          </nav>

          {!isSidebarCollapsed && (
            <p className="nav-group-title mt-4 text-start fw-semibold">
              Settings
            </p>
          )}
          {/* When collapsed, we add top margin to separate settings from main menu visually */}
          <nav className={`nav-group ${isSidebarCollapsed ? "mt-4" : ""}`}>
            <button
              className={`nav-item rounded-4 ${activeTab === "Settings" ? "active" : ""}`}
              onClick={() => setActiveTab("Settings")}
              title="Settings"
            >
              <span className="nav-icon">{Icons.Settings}</span>
              {!isSidebarCollapsed && (
                <span className="nav-text">Settings</span>
              )}
            </button>
          </nav>
        </div>
      </div>

      {/* Account stays at bottom, only shows Avatar when collapsed */}
      <div className="sidebar-bottom fade-in d-flex flex-column">
        {!isSidebarCollapsed && (
          <p className="nav-group-title text-start fw-semibold">Account</p>
        )}
        <div
          className={`account-card rounded-pill ${isSidebarCollapsed ? "bg-transparent mx-auto" : "bg-white bg-opacity-75"}`}
        >
          <div className="account-avatar">{student.name.charAt(0)}</div>
          {!isSidebarCollapsed && (
            <div className="account-info d-flex flex-column align-items-start">
              <h4>{student.name}</h4>
              <p>Student</p>
            </div>
          )}
        </div>
        
        <Link
          className={`nav-item d-flex mt-3 align-items-center justify-content-center rounded-4 py-2 px-3 transition-all  ${isSidebarCollapsed ? "justify-content-center w-75 mx-auto rounded-3" : "bg-danger bg-opacity-10 gap-2"}`}
          onClick={() => {
            console.log("Logged out");
          }}
          to="/logout"
          style={{ textDecoration: "none" }}
          title="Logout"
        >
          <span className="nav-icon text-danger">
            <svg
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
          </span>
          {!isSidebarCollapsed && (
            <span className="fw-semibold text-danger">Logout</span>
          )}
        </Link>
      </div>
    </aside>
  );
};

export default SidebarStudent;
