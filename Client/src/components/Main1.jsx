import React, { useEffect, useState } from "react";
import image2 from "../assets/classScene1.png";

// const statsData = [
//   {
//     title: "100%",
//     desc: "Digital Submission",
//     color: "text-primary",
//   },
//   {
//     title: "Role-Based",
//     desc: "Access control",
//     color: "text-success",
//   },
//   {
//     title: "End-to-End",
//     desc: "Workflow",
//     color: "text-danger",
//   },
//   {
//     title: "Smart Process",
//     desc: "Automation",
//     color: "text-warning",
//   },
// ];

const floatingInfo = [
  {
    id: 1,
    title: "100%",
    desc: "Digital Submission",
    path: "M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0 M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z", // can replace with a real icon later
    color: "success",
    position: { top: "12px", left: "9px" },
    name: "bi bi-check2-circle",
  },
  {
    id: 2,
    title: "Role-Based",
    desc: "Access control",
    path: "M5.338 1.59a61 61 0 0 0-2.837.856.48.48 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.7 10.7 0 0 0 2.287 2.233c.346.244.652.42.893.533q.18.085.293.118a1 1 0 0 0 .101.025 1 1 0 0 0 .1-.025q.114-.034.294-.118c.24-.113.547-.29.893-.533a10.7 10.7 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.8 11.8 0 0 1-2.517 2.453 7 7 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7 7 0 0 1-1.048-.625 11.8 11.8 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 63 63 0 0 1 5.072.56",
    color: "primary",
    position: { bottom: "13px", right: "20px" },
    name: "bi bi-shield",
  },
  {
    id: 3,
    title: "End-to-End",
    desc: "Workflow",
    path: "M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41m-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9 M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5 5 0 0 0 8 3M3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9z",
    color: "warning",
    position: { top: "38px", right: "41px" },
    name: "bi bi-check2-circle",
  },
  {
    id: 4,
    title: "Smart Process",
    desc: "Automation",
    path: "M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492M5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0 M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115z",
    color: "danger",
    position: { bottom: "33px", left: "30px" },
    name: "bi bi-shield",
  },
];
function Main1() {
  return (
    <section
      className="main py-5 px-lg-5 px-0 position-relative overflow-hidden"
      style={{ backgroundColor: "#fafbff" }}
    >
      <div
        className="row rounded-5 align-items-center p-0 mx-lg-5 mx-0 my-5"
        style={{ backgroundColor: "rgba(35, 73, 207, 0.34)" }}
      >
        <div className="col-lg-6 order-lg-1 order-1 p-5">
          <div className="mb-sm-0 mb-lg-0 d-flex flex-column justify-content-center align-items-lg-start align-items-center ">
            <span
              className="badge bg-primary-subtle mx-lg-0 mx-auto bg-opacity-10 fw-normal d-flex align-items-center align-self-start mb-4 p-2 px-3 rounded-pill"
              style={{ color: "rgb(26, 54, 155)", width: "fit-content" }}
            >
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
                className="lucide lucide-workflow-icon lucide-workflow me-2"
              >
                <rect width="8" height="8" x="3" y="3" rx="2" />
                <path d="M7 11v4a2 2 0 0 0 2 2h4" />
                <rect width="8" height="8" x="13" y="13" rx="2" />
              </svg>
              Intelligent Academic Workflow Platform
            </span>
            {/* Heading */}
            <h1 className="display-5 heading fw-bold mb-3 text-lg-start text-center">
              Where Academic Efficiency Meets{" "}
              <span className="text-gradient">Intelligent Simplicity</span>
            </h1>

            {/* Description */}
            <p className="fs-6 text-muted opacity-75 mb-lg-4 mb-0 text-lg-start text-center">
              CLASSORA transforms traditional assignment management into a
              smart, organized, and transparent digital experience by empowering
              institutions with structured automation and complete academic
              oversight.
            </p>

            <button className="learnMoreBtn px-3 py-2 btn mt-3 mt-lg-0">
              Learn More...
            </button>
          </div>
        </div>
        <div className="col-lg-6 order-lg-2 order-2 p-0">
          <div className="d-inline-block">
            <img
              src={image2}
              alt="class Scene"
              className="img-fluid mx-auto MainImage1"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Main1;
