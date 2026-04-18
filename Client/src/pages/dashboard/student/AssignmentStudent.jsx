import React, { useState } from "react";
import { Search, Filter, Clock, FileText } from "lucide-react";
import "./StudentDash.css";
import CustomDropdown from "../../../components/CustomDropdown";

const AssignmentsTab = ({student}) => {
  const [activeSubTab, setActiveSubTab] = useState("new");
  const [searchQuery, setSearchQuery] = useState("");
  const [courseFilter, setCourseFilter] = useState("All Courses");
  
  if (!student) {
    return (
      <div
        className="mt-5 d-flex flex-column text-dark p-5 align-items-center justify-content-center w-100"
      >
        <div
          className="spinner-border border-2 text-dark opacity-75 spinner-border-lg"
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

  const courseList = [
    "All Courses",
    "DBMS",
    "Web Dev",
    "Computer Networks",
    "Data Structures",
  ];
  
  const courseDropdownData = [
    {
      name: "Courses",
      value: "courseFilter",
      options: ["All Courses", "DBMS", "Web Dev", "Computer Networks", "Data Structures"],
      defaultValue: "All Courses",
    },
  ];

  // --- CONFIG OBJECTS FOR CLEAN UI RENDERING ---
  const actionBtnConfig = {
    urgent: { text: "Submit", css: "btn-dark shadow-sm text-white" },
    pending: { text: "Submit", css: "btn-dark shadow-sm text-white" },
    submitted: {
      text: "View Work",
      css: "btn-outline-secondary bg-white text-dark border",
    },
    graded: {
      text: "Feedback",
      css: "bg-success bg-opacity-10 text-success border-0",
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
    <div className="assignments-container fade-in">
      {/* 1. PAGE HEADER */}
      <div className="text-center mt-5 mb-4">
        <h1
          className="fw-bolder text-dark mb-2"
          style={{ letterSpacing: "-0.5px" }}
        >
          Your Assignments
        </h1>
        <p className="text-muted fw-medium fs-6">
          Track your pending tasks, submit work, and review past grades.
        </p>
      </div>

      {/* 2. THE 2-PILL TABS */}
      <div className="d-flex justify-content-center mb-5">
        <div className="bg-secondary bg-opacity-10 p-1 rounded-pill d-inline-flex shadow-sm border border-white">
          <button
            className={`btn rounded-pill fw-bold px-5 py-2 transition-all ${activeSubTab === "new" ? "btn-dark shadow-sm" : "btn-light text-muted border-0 bg-transparent"}`}
            onClick={() => setActiveSubTab("new")}
          >
            New Assignments
          </button>
          <button
            className={`btn rounded-pill fw-bold px-5 py-2 transition-all ${activeSubTab === "all" ? "btn-dark shadow-sm" : "btn-light text-muted border-0 bg-transparent"}`}
            onClick={() => setActiveSubTab("all")}
          >
            All Assignments
          </button>
        </div>
      </div>

      {/* 3. MAIN "CANVAS" CONTAINER */}
      <div
        className="p-4 p-md-5 rounded-5"
        style={{ backgroundColor: "#f8fafc", border: "1px solid #f1f5f9" }}
      >
        {/* Search & Filter Row */}
        <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3 mb-4">
          {/* Title - Visible on medium screens and up */}
          <h5 className="fw-bold text-dark m-0 d-none d-md-block">
            {activeSubTab === "new" ? "Pending Tasks" : "Assignment History"}
          </h5>

          {/* Search & Filter Controls Container */}
          <div className="d-flex flex-column flex-sm-row gap-3 flex-grow-1 justify-content-lg-end">
            <div
              className="position-relative flex-grow-1 w-100"
              style={{ maxWidth: "350px" }}
            >
              <Search
                size={18}
                className="position-absolute text-muted"
                style={{
                  left: "16px",
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              />
              <input
                type="text"
                className="form-control rounded-pill ps-5 py-2 border-0 shadow-sm fw-medium w-100"
                placeholder="Search assignments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Filter Dropdown */}
            <div className="d-flex align-items-center justify-content-center gap-2 p-0">
              <div 
                className="d-flex align-items-center justify-content-center bg-white rounded-circle shadow-sm flex-shrink-0" 
                style={{ width: "40px", height: "40px" }}
              >
                <Filter size={18} className="text-muted" />
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
                className="bg-white row align-items-center p-4 rounded-4 border border-light shadow-sm hover-lift transition-all"
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
                      <h5 className="m-0 fw-bold text-dark text-truncate">
                        {task.title}
                      </h5>
                      <div className="d-flex gap-1 flex-shrink-0">
                        {task.status === "urgent" && (
                          <span className="badge bg-danger rounded-pill px-2 py-1" style={{ fontSize: "0.65rem" }}>
                            Urgent
                          </span>
                        )}
                        {task.score && (
                          <span className="badge bg-success rounded-pill px-2 py-1" style={{ fontSize: "0.7rem" }}>
                            {task.score}
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="m-0 text-muted fw-medium fs-6 text-truncate">
                      {task.course} <span className="opacity-50 mx-1">•</span>{" "}
                      {task.code} <span className="opacity-50 mx-1">•</span>{" "}
                      {task.professor}
                    </p>
                  </div>

                  <div className="col-12 col-lg-auto p-0  pt-3 pt-lg-0 mt-2 mt-lg-0">
                    <div className="d-flex align-items-center justify-content-between justify-content-lg-end gap-4">
                      
                      <div className="text-start text-lg-end">
                        <p className={`m-0 fw-bold fs-6 ${task.status === "urgent" ? "text-danger" : "text-dark"}`}>
                          {["graded", "submitted"].includes(task.status) ? "Submitted" : "Due"}: {task.dueDate}
                        </p>
                        <p className="m-0 text-muted small fw-medium d-flex align-items-center justify-content-start justify-content-lg-end gap-1 mt-1">
                          <Clock size={14} /> {task.time}
                        </p>
                      </div>

                      <div style={{ minWidth: "120px" }} className="text-end flex-shrink-0">
                        <button className={`btn rounded-pill fw-bold w-100 ${actionBtnConfig[task.status]?.css}`}>
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
            <button className="btn btn-white bg-white border rounded-pill px-5 py-2 fw-bold text-dark shadow-sm hover-lift transition-all">
              Load More History
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssignmentsTab;
