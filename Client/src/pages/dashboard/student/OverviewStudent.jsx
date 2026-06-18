import React from "react";
import {
  AlertCircle,
  Clock,
  CheckCircle,
  ArrowUpRight,
  Star,
} from "lucide-react";
import "./StudentDash.css";
import { useTheme } from "../../../store/useTheme";

const OverviewTab = ({ setActiveTab }) => {
  const { theme } = useTheme();
  const studentName = "Yartik";

  // Data State
  const stats = { urgent: 2, pending: 4, completion: 78, submitted: 15 };

  // Circular Progress Math
  const circleRadius = 40;
  const circumference = 2 * Math.PI * circleRadius;
  const strokeDashoffset =
    circumference - (stats.completion / 100) * circumference;

  // --- DATA ARRAYS FOR CLEAN MAPPING ---

  const statCards = [
    {
      id: 1,
      label: "Active Tasks",
      value: stats.pending,
      icon: <Clock size={28} />,
      color: "warning",
    },
    {
      id: 2,
      label: "Due in 48h",
      value: stats.urgent,
      icon: <AlertCircle size={28} />,
      color: "danger",
    },
    {
      id: 3,
      label: "Submitted Tasks",
      value: stats.submitted,
      icon: <CheckCircle size={28} />,
      color: "success",
    },
    {
      id: 4,
      label: "view All",
      value: "Assignments",
      icon: <ArrowUpRight size={28} />,
      color: "white",
    },
  ];

  const priorityTasks = [
    {
      id: 1,
      title: "React Context API Project",
      course: "Web Dev",
      type: "WD",
      due: "Tomorrow",
      time: "11:59 PM",
      color: "#ef4444",
    },
    {
      id: 2,
      title: "Database Normalization",
      course: "DBMS",
      type: "DB",
      due: "Mar 2",
      time: "10:00 AM",
      color: "#f59e0b",
    },
  ];

  const recentFeedback = [
    {
      id: 3,
      title: "Binary Trees Assignment",
      course: "Data Structures",
      score: "9.5/10",
      comment: "Excellent logic implementation.",
    },
    {
      id: 4,
      title: "Agile Case Study",
      course: "Software Eng",
      score: "8/10",
      comment: "Good points, but needs more citations.",
    },
  ];

  return (
    <div
      className="overview-container fade-in"
      style={{ color: "var(--text-main)" }}
    >
      {/* 1. TOP BENTO ROW */}
      <div className="row g-4 mb-4">
        <div className="col-lg-8">
          <div className="bento-card rounded-5 welcome-card h-100 p-5 d-flex flex-column justify-content-center align-items-center position-relative overflow-hidden">
            <div
              className="position-relative text-center"
              style={{ zIndex: 2 }}
            >
              <h1
                className="fw-bolder mb-0"
                style={{ fontSize: "2.5rem", letterSpacing: "-1px" }}
              >
                Welcome, {studentName} !
              </h1>
              <p
                className="fw-medium fs-6 mb-0"
                style={{ maxWidth: "500px", color: "var(--text-muted)" }}
              >
                You have <strong>{stats.urgent} urgent</strong> assignments to
                focus on today. Let's get them cleared out.
              </p>
            </div>
            {/* Decorative abstract shapes */}
            <div
              className="blobs rounded-circle bg-primary position-absolute"
              style={{ right: "-50px", top: "-100px" }}
            ></div>
            <div
              className="blobs rounded-circle bg-primary position-absolute"
              style={{ left: "-50px", bottom: "-100px" }}
            ></div>
          </div>
        </div>

        {/* Circular Progress Card */}
        <div className="col-lg-4">
          <div className="bento-card rounded-5 bg-primary bg-opacity-25 h-100 p-4 d-flex flex-column align-items-center justify-content-center text-center">
            <h6 className="fw-bold mb-3 w-100 text-start">Weekly Completion</h6>
            <div className="position-relative d-inline-flex align-items-center justify-content-center mb-2">
              <svg
                width="120"
                height="120"
                className="transform-rotate"
                style={{ transform: "rotate(-90deg)" }}
              >
                <circle
                  cx="60"
                  cy="60"
                  r={circleRadius}
                  fill="none"
                  stroke={theme === "dark" ? "#1a1a1a" : "#f1f5f9"}
                  strokeWidth="12"
                />
                <circle
                  cx="60"
                  cy="60"
                  r={circleRadius}
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="12"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  style={{ transition: "stroke-dashoffset 1.5s ease-out" }}
                />
              </svg>
              <span className="position-absolute fw-bolder fs-5">
                {stats.completion}%
              </span>
            </div>
            <p
              className="tsmall fw-semibold mt-2 mb-0"
              style={{ color: "var(--text-muted)" }}
            >
              You're on track! Keep it up.
            </p>
          </div>
        </div>
      </div>

      {/* 2. STATS & ACTION ROW */}
      <div className="row g-4 mb-4">
        {statCards.map((card) => (
          <div key={card.id} className="col-12 col-md-6 col-xl-3">
            <div
              className={`bento-card rounded-4 p-4 d-flex justify-content-between align-items-center h-100 transition-all ${
                card.id === 4 ? "bg-dark cursor-pointer hover-lift shadow" : ""
              }`}
              style={{ backgroundColor: "var(--bg-glass)" }}
              onClick={() => {
                if (card.id === 4) setActiveTab("Assignments");
              }}
            >
              {/* Left Side: Text Content */}
              <div className="d-flex flex-column text-start">
                <p
                  className={`fw-bold text-uppercase mb-1 text-truncate`}
                  style={{
                    fontSize: "0.75rem",
                    letterSpacing: "0.5px",
                    color: "var(--text-muted)",
                  }}
                >
                  {card.label}
                </p>
                <h2
                  className={`fw-bolder m-0 ${
                    card.id === 4
                      ? "text-white fs-5 mt-1"
                      : `text-${card.color}`
                  }`}
                >
                  {card.value}
                </h2>
              </div>

              {/* Right Side: Icon Content */}
              <div className="flex-shrink-0 ms-2">
                {card.id === 4 ? (
                  <div className="text-white opacity-75">{card.icon}</div>
                ) : (
                  <div
                    className={`bg-${card.color} bg-opacity-10 text-${card.color} rounded-4 d-flex align-items-center justify-content-center`}
                    style={{ width: "58px", height: "58px" }}
                  >
                    {card.icon}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 3. CONTENT SPLIT */}
      <div className="row g-4">
        {/* LEFT: Priority Tasks */}
        <div className="col-lg-7">
          <div
            className={`bento-card shadow-sm rounded-5 p-4 h-100 ${theme === "light" ? "" : ""}`}
            style={{ backgroundColor: "var(--bg-upNext)" }}
          >
            <h5 className="mb-4 fw-bold">Up Next</h5>
            <div className="d-flex flex-column gap-3">
              {priorityTasks.map((task) => (
                <div
                  key={task.id}
                  className="priority-task-item hover-lift transition-all p-3 rounded-4 d-flex align-items-center justify-content-between transition-all"
                >
                  <div className="d-flex align-items-center gap-3">
                    <div
                      className="fw-bolder d-flex align-items-center justify-content-center rounded-3 flex-shrink-0 shadow-sm"
                      style={{
                        width: "45px",
                        height: "45px",
                        color: task.color,
                        fontSize: "0.9rem",
                        backgroundColor: "var(--bg-glass)",
                      }}
                    >
                      {task.type}
                    </div>
                    <div>
                      <h6
                        className="m-0 fw-bold mb-1"
                        style={{ fontSize: "0.95rem" }}
                      >
                        {task.title}
                      </h6>
                      <p
                        className="m-0 small fw-medium"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {task.course}
                      </p>
                    </div>
                  </div>
                  <div className="d-flex align-items-center gap-3">
                    <div className="text-end d-none d-sm-block">
                      <p
                        className="m-0 fw-bold"
                        style={{ color: task.color, fontSize: "0.85rem" }}
                      >
                        {task.due}
                      </p>
                      <p
                        className="m-0 small"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {task.time}
                      </p>
                    </div>
                    <button
                      className={`btn ${theme === "light" ? "btn-outline-dark" : "btn-outline-light"} rounded-pill fw-bold btn-sm px-3 py-2`}
                    >
                      Open
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: Recent Feedback */}
        <div className="col-lg-5">
          <div
            className={`bento-card rounded-5 p-4 h-100 bg-light ${theme === "light" ? " border border-secondary border-opacity-10" : "bg-opacity-10 "}`}
            style={{ backgroundColor: "var(--bg-main)" }}
          >
            <h5 className="fw-bold mb-4">Latest Feedback</h5>
            <div className="d-flex flex-column gap-3">
              {recentFeedback.map((fb) => (
                <div
                  key={fb.id}
                  className="p-3 rounded-4 shadow-sm transition-all hover-lift"
                  style={{ backgroundColor: "var(--bg-glass)" }}
                >
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <div className="d-flex align-items-center gap-2">
                      <div className="text-warning">
                        <Star size={16} fill="currentColor" />
                      </div>
                      <h6
                        className="m-0 fw-bold"
                        style={{ fontSize: "0.9rem" }}
                      >
                        {fb.title}
                      </h6>
                    </div>
                    <span className="badge bg-success bg-opacity-10 text-success rounded-pill fw-semibold px-2 py-1">
                      {fb.score}
                    </span>
                  </div>
                  <p
                    className="m-0 fw-medium mb-2"
                    style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}
                  >
                    {fb.course}
                  </p>
                  <div
                    className={`bg-light p-2 rounded-3 ${theme === "light" ? "" : "bg-opacity-50 "}`}
                  >
                    <p className="m-0 small fst-italic">"{fb.comment}"</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;
