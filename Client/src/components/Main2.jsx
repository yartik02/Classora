import React from "react";

const Main2 = () => {
 const gridMap = [
    {
      id: 1,
      area: "1 / 1 / span 3 / span 2",
      title: "Structured Digital Submission",
      desc: "Eliminate paperwork. Submit, organize, and securely store timestamped assignments in one place.",
      path: "M8.5 11.5a.5.5 0 0 1-1 0V7.707L6.354 8.854a.5.5 0 1 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 7.707z M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2M9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z",
      color: "#3838ff",
      name: "bi bi-file-earmark-arrow-up",
    },
    {
      id: 2,
      area: "1 / 3 / span 3 / span 1",
      title: "Role-Based Dashboards",
      desc: "Customized, secure access for Admins, Faculty, and Students to streamline academic control.",
      path: "M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1zm-7.978-1L7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002-.014.002zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0M6.936 9.28a6 6 0 0 0-1.23-.247A7 7 0 0 0 5 9c-4 0-5 3-5 4q0 1 1 1h4.216A2.24 2.24 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816M4.92 10A5.5 5.5 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4",
      color: "#f10000de",
      name: "bi bi-people",
    },
    {
      id: 3,
      area: "1 / 4 / span 3 / span 1",
      title: "Smart Process Automation",
      desc: "Automate reminders, deadlines, and file handling to support educators without replacing them.",
      path: "M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492M5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0 M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115z",
      color: "#a700a7",
      name: "bi bi-gear",
    },
    {
      id: 4,
      area: "4 / 1 / span 3 / span 1",
      title: "Secure Academic Data",
      desc: "Institution-level protection ensuring safe storage and controlled access to all evaluations.",
      path: "M5.338 1.59a61 61 0 0 0-2.837.856.48.48 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.7 10.7 0 0 0 2.287 2.233c.346.244.652.42.893.533q.18.085.293.118a1 1 0 0 0 .101.025 1 1 0 0 0 .1-.025q.114-.034.294-.118c.24-.113.547-.29.893-.533a10.7 10.7 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.8 11.8 0 0 1-2.517 2.453 7 7 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7 7 0 0 1-1.048-.625 11.8 11.8 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 63 63 0 0 1 5.072.56",
      color: "#0d6b0d",
      name: "bi bi-shield",
    },
    {
      id: 5,
      area: "4 / 2 / span 3 / span 1",
      title: "Centralized Management",
      desc: "Effortlessly manage multiple classes, courses, and assignments from a single, unified platform.",
      path: "M6 1v3H1V1zM1 0a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1zm14 12v3h-5v-3zm-5-1a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1zM6 8v7H1V8zM1 7a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1zm14-6v7h-5V1zm-5-1a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1z",
      color: "#ff7a00",
      name: "bi bi-columns-gap",
    },
    {
      id: 6,
      area: "4 / 3 / span 3 / span 2",
      title: "Transparent Workflow",
      desc: "Track progress from submission to grading with real-time updates and clear status indicators.",
      path: "M9.5 0a.5.5 0 0 1 .5.5.5.5 0 0 0 .5.5.5.5 0 0 1 .5.5V2a.5.5 0 0 1-.5.5h-5A.5.5 0 0 1 5 2v-.5a.5.5 0 0 1 .5-.5.5.5 0 0 0 .5-.5.5.5 0 0 1 .5-.5z M3 2.5a.5.5 0 0 1 .5-.5H4a.5.5 0 0 0 0-1h-.5A1.5 1.5 0 0 0 2 2.5v12A1.5 1.5 0 0 0 3.5 16h9a1.5 1.5 0 0 0 1.5-1.5v-12A1.5 1.5 0 0 0 12.5 1H12a.5.5 0 0 0 0 1h.5a.5.5 0 0 1 .5.5v12a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5z M10.854 7.854a.5.5 0 0 0-.708-.708L7.5 9.793 6.354 8.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0z",
      color: "#ed657d",
      name: "bi bi-clipboard2-check",
    },
  ];

  return (
    <>
      <style>{`
        /* MOBILE: Horizontal Carousel */
        @media (max-width: 767px) {
          .responsive-grid {
            grid-template-columns: repeat(${gridMap.length}, 85%); /* Cards take 85% width */
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            padding-bottom: 30px; /* Space for scrollbar */
            scrollbar-width: none; /* Hide scrollbar for Chrome/Safari/Firefox */
          }
          .responsive-grid::-webkit-scrollbar { display: none; }
          
          .grid-item {
            scroll-snap-align: center;
            min-height: 300px;
          }
        }
      `}</style>

      <section className="Main2 p-5" style={{backgroundColor:"#001b4c"}}>
        <div className="header mt-5 text-center d-flex flex-column align-items-center justify-content-center">
          <p className="fs-3 fw-bold text-light">
            Why Institutes Choose{" "}
            <span className="text-gradient">Classora</span> ?
          </p>
          <p className="fw-light text-light text-center opacity-75 hearderText">
            A structured, intelligent platform designed to simplify assignment
            workflows, enhance tranceparency, and strengthen academic efficiency
            accross departments.
          </p>
        </div>
        <div className="responsive-grid mx-auto mt-2 py-3" style={{width:"90%"}}>
          {gridMap.map(( box ) => (
            <div
              key={box.id}
              className="grid-item d-flex flex-column align-items-center justify-content-center"
              style={{
                "--area": box.area,
              }}
            >
              <span
                className="p-3 rounded-4 d-inline-block"
                style={{ backgroundColor: box.color }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  // height="20"
                  fill="#ede9edff"
                  className={`${box.name}`}
                  viewBox={`0 0 16 16`}
                >
                  <path d={box.path} />
                </svg>
              </span>
              <span
                className="fw-semibold text-center mt-3 mb-1 mx-0"
                style={{ color: "#ede9edff" }}
              >
                {box.title}
              </span>
              <span
                className="fw-light text-center"
                style={{
                  fontSize: "0.8rem",
                  maxWidth:"90%",
                  color: "rgba(237, 233, 237, 0.88)",
                }}
              >
                {box.desc}
              </span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Main2;
