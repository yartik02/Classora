import React, { useState } from "react";
import { Search, Clock, FileText } from "lucide-react";
import "./StudentDash.css";
import CustomDropdown from "../../../components/CustomDropdown";
import { useTheme } from "../../../store/useTheme";
import { filter } from "../../../store/Icons";

const AssignmentsTab = ({ student }) => {
  const [activeSubTab, setActiveSubTab] = useState("new");
  const [searchQuery, setSearchQuery] = useState("");
  const [courseFilter, setCourseFilter] = useState("All Courses");

  const { theme } = useTheme();

  if (!student) {
    return (
      <div
        className="mt-5 d-flex flex-column p-5 align-items-center justify-content-center w-100"
        style={{ color: "var(--text-main)" }}
      >
        <div
          className="spinner-border border-2 opacity-75 spinner-border-lg"
          role="status"
        >
          <span className="visually-hidden bg-dark"></span>
        </div>
        <span className="mt-2">Loading your assignments...</span>
      </div>
    );
  }

  // --- MOCK DATA ---
  const newAssignments = [
    {
      id: 1,
      title: "React Context API Project",
      course: "Web Dev",
      code: "CS301",
      professor: "Dr. Sharma",
      dueDate: "Today",
      time: "11:59 PM",
      status: "urgent",
      color: "danger",
    },
    {
      id: 2,
      title: "Database Normalization",
      course: "DBMS",
      code: "CS305",
      professor: "Prof. Gupta",
      dueDate: "Tomorrow",
      time: "10:00 AM",
      status: "pending",
      color: "warning",
    },
    {
      id: 3,
      title: "Network Topologies Report",
      course: "Computer Networks",
      code: "CS310",
      professor: "Dr. Ali",
      dueDate: "Mar 5",
      time: "05:00 PM",
      status: "pending",
      color: "primary",
    },
  ];

  const allAssignments = [
    ...newAssignments,
    {
      id: 4,
      title: "Binary Trees Implementation",
      course: "Data Structures",
      code: "CS201",
      professor: "Prof. Singh",
      dueDate: "Feb 25",
      time: "Submitted",
      status: "graded",
      score: "9.5/10",
      color: "success",
    },
    {
      id: 5,
      title: "Agile Case Study",
      course: "Software Eng",
      code: "CS302",
      professor: "Dr. Mehta",
      dueDate: "Feb 20",
      time: "Submitted",
      status: "submitted",
      color: "success",
    },
  ];

  const courseDropdownData = [
    {
      name: "Courses",
      value: "courseFilter",
      options: [
        "All Courses",
        "DBMS",
        "Web Dev",
        "Computer Networks",
        "Data Structures",
      ],
      defaultValue: "All Courses",
    },
  ];

  // --- CONFIG OBJECTS FOR CLEAN UI RENDERING ---
  const actionBtnConfig = {
    urgent: {
      text: "Submit",
      css: `btn ${theme === "dark" ? "btn-outline-light" : "btn-outline-dark"}`,
    },
    pending: {
      text: "Submit",
      css: `btn ${theme === "dark" ? "btn-outline-light" : "btn-outline-dark"}`,
    },
    submitted: {
      text: "View Work",
      css: "btn btn-outline-secondary",
    },
    graded: {
      text: "View Work",
      css: "btn btn-outline-secondary",
    },
  };

  // --- FILTER LOGIC ---
  const filteredData = (
    activeSubTab === "new" ? newAssignments : allAssignments
  ).filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.course.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCourse =
      courseFilter === "All Courses" || item.course === courseFilter;
    return matchesSearch && matchesCourse;
  });

  return (
    <div
      className="assignments-container fade-in"
      style={{ color: "var(--text-main)" }}
    >
      {/* 1. PAGE HEADER */}
      <div className="text-center mt-5 mb-4">
        <h1 className="fw-bolder mb-2" style={{ letterSpacing: "-0.5px" }}>
          Your Assignments
        </h1>
        <p className="fw-medium fs-6" style={{ color: "var(--text-muted)" }}>
          Track your pending tasks, submit work, and review past grades.
        </p>
      </div>

      {/* 2. THE 2-PILL TABS */}
      <div className="d-flex justify-content-center mb-5">
        <div
          className="p-1 rounded-pill d-inline-flex shadow-sm"
          style={{
            backgroundColor: "var(--login-tab)",
            border: "1px solid var(--border-login)",
          }}
        >
          <button
            className={`btn rounded-pill fw-bold px-5 py-2 transition-all ${activeSubTab === "new" ? `${theme === "dark" ? "btn-light" : "btn-dark"} shadow-sm` : "bg-transparent"}`}
            style={activeSubTab === "new" ? {} : { color: "var(--text-muted)" }}
            onClick={() => setActiveSubTab("new")}
          >
            New Assignments
          </button>
          <button
            className={`btn rounded-pill fw-bold px-5 py-2 transition-all ${activeSubTab === "all" ? `${theme === "dark" ? "btn-light" : "btn-dark"} shadow-sm` : "bg-transparent"}`}
            style={activeSubTab === "all" ? {} : { color: "var(--text-muted)" }}
            onClick={() => setActiveSubTab("all")}
          >
            All Assignments
          </button>
        </div>
      </div>

      {/* 3. MAIN "CANVAS" CONTAINER */}
      <div
        className="p-4 p-md-5 rounded-5"
        style={{
          backgroundColor: "var(--bg-main)",
          border: "1px solid var(--border-login)",
        }}
      >
        {/* Search & Filter Row */}
        <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3 mb-4">
          <h5 className="fw-bold m-0 d-none d-md-block">
            {activeSubTab === "new" ? "Pending Tasks" : "Assignment History"}
          </h5>

          <div className="d-flex flex-column flex-sm-row gap-3 flex-grow-1 justify-content-lg-end align-items-center">
            <div
              className="position-relative flex-grow-1 w-100"
              style={{
                maxWidth: "350px",
              }}
            >
              <Search
                size={18}
                className="position-absolute"
                style={{
                  left: "16px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--text-muted)",
                }}
              />
              <input
                type="text"
                className="rounded-pill ps-5 py-2 fw-normal w-100 focus-ring"
                placeholder="Search assignments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  color: "var(--text-main)",
                  backgroundColor: "var(--bg-surface)",
                  border: "1px solid var(--border-login)",
                }}
              />
            </div>

            <div
              className="d-flex align-items-center justify-content-around rounded-4 gap-2 p-2"
              style={{
                backgroundColor: "var(--bg-surface)",
                color: "var(--text-muted)",
                border: "1px solid var(--light-hover)",
              }}
              title="Filter"
            >
              <div
                className="d-flex align-items-center justify-content-center flex-shrink-0"
                style={{
                  width: "40px",
                  height: "40px",
                }}
              >
                {filter}
              </div>

              <div style={{ minWidth: "250px" }} className="flex-grow-1">
                <CustomDropdown
                  dropdownData={courseDropdownData}
                  onSelect={(name, value) => setCourseFilter(value)}
                  selectedValue={courseFilter}
                />
              </div>
            </div>
          </div>
        </div>

        {/* 4. ASSIGNMENTS LIST */}
        <div className="d-flex flex-column gap-3">
          {filteredData.length > 0 ? (
            filteredData.map((task) => (
              <div
                key={task.id}
                className="row align-items-center p-4 rounded-4 shadow-sm hover-lift transition-all"
                style={{
                  backgroundColor: "var(--bg-surface)",
                  border: "1px solid var(--light-hover)",
                }}
              >
                {/* 1. Icon Column (Fixed Width) */}
                <div className="col-auto p-0">
                  <div
                    className={`bg-${task.color} bg-opacity-10 text-${task.color} rounded-4 d-flex align-items-center justify-content-center`}
                    style={{ width: "56px", height: "56px" }}
                  >
                    <FileText size={24} />
                  </div>
                </div>

                {/* 2. Text Content Column (Fluid Width) */}
                <div className="col" style={{ minWidth: 0 }}>
                  <div className="d-flex align-items-center gap-2 mb-1 flex-wrap">
                    <h5 className="m-0 fw-bold text-truncate">{task.title}</h5>
                    <div className="d-flex gap-1 flex-shrink-0">
                      {task.status === "urgent" && (
                        <span
                          className={`badge rounded-pill px-2 py-1 ${theme === "dark" ? "bg-danger bg-opacity-75 text-light" : "bg-danger"}`}
                          style={{ fontSize: "0.65rem" }}
                        >
                          Urgent
                        </span>
                      )}
                      {task.score && (
                        <span
                          className="badge bg-success rounded-pill px-2 py-1"
                          style={{ fontSize: "0.7rem" }}
                        >
                          {task.score}
                        </span>
                      )}
                    </div>
                  </div>
                  <p
                    className="m-0 fw-medium fs-6 text-truncate"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {task.course} <span className="opacity-50 mx-1">•</span>{" "}
                    {task.code} <span className="opacity-50 mx-1">•</span>{" "}
                    {task.professor}
                  </p>
                </div>

                <div className="col-12 col-lg-auto p-0  pt-3 pt-lg-0 mt-2 mt-lg-0">
                  <div className="d-flex align-items-center justify-content-between justify-content-lg-end gap-4">
                    <div className="text-start text-lg-end">
                      <p
                        className={`m-0 fw-bold fs-6 ${task.status === "urgent" ? "text-danger" : ""}`}
                        style={{ color: "var(--text-muted)" }}
                      >
                        {["graded", "submitted"].includes(task.status)
                          ? "Submitted"
                          : "Due"}
                        : {task.dueDate}
                      </p>
                      <p
                        className="m-0 small fw-medium d-flex align-items-center justify-content-start justify-content-lg-end gap-1 mt-1"
                        style={{ color: "var(--text-muted)" }}
                      >
                        <Clock size={14} /> {task.time}
                      </p>
                    </div>

                    <div
                      style={{ minWidth: "120px" }}
                      className="text-end flex-shrink-0"
                    >
                      <button
                        className={`btn rounded-pill fw-bold w-100 ${actionBtnConfig[task.status]?.css}`}
                      >
                        {actionBtnConfig[task.status]?.text}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            /* Empty State */
            <div className="bg-white p-5 rounded-4 border border-light text-center d-flex flex-column align-items-center justify-content-center py-5 my-3 shadow-sm">
              <div
                className="bg-secondary-subtle text-muted rounded-circle d-flex align-items-center justify-content-center mb-3"
                style={{ width: "70px", height: "70px" }}
              >
                <Search size={30} />
              </div>
              <h5 className="fw-bold text-dark">No assignments found</h5>
              <p className="text-muted mb-0">
                Try adjusting your search or course filters.
              </p>
            </div>
          )}
        </div>

        {/* Load More Button */}
        {activeSubTab === "all" && filteredData.length > 0 && (
          <div className="text-center mt-5">
            <button
              className="btn rounded-pill px-5 py-2 fw-bold text-dark shadow-sm hover-lift transition-all"
              style={{ backgroundColor: "var(--text-muted)" }}
            >
              Load More History
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssignmentsTab;
