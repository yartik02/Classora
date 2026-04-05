import React, { useState } from "react";
// import CoreValues from "./CoreValues";
// import AestheticMissionSection from "./About2.jsx";
import "./AboutUs.css";
import About1 from "../components/About1";
import About2 from "../components/About2";
import HowItWorks from "../components/HowItWorks";

const tabContent = {
  institutional: {
    title: "Institutional",
    highlight: "Control",
    cards: [
      {
        id: 1,
        icon: (
          <>
            <rect width="8" height="8" x="3" y="3" rx="2" />
            <path d="M7 11v4a2 2 0 0 0 2 2h4" />
            <rect width="8" height="8" x="13" y="13" rx="2" />
          </>
        ),
        title: "Centralized Oversight",
        text: "Seamlessly manage and monitor all academic workflows from one place.",
      },
      {
        id: 2,
        icon: (
          <>
            <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
            <path d="M9 12h6" />
            <path d="M12 9v6" />
          </>
        ),
        title: "Secure Ownership",
        text: "Ensure your data and process controls remain strictly protected.",
      },
      {
        id: 3,
        icon: (
          <>
            <path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z" />
            <path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12" />
            <path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17" />
          </>
        ),
        title: "Aligned Structure",
        text: "Maintain a clear hierarchy that perfectly matches institutional policies.",
      },
    ],
  },
  faculty: {
    title: "Faculty",
    highlight: "Responsibility",
    cards: [
      {
        id: 1,
        icon: (
          <>
            <path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" />
            <path d="M14 2v5a1 1 0 0 0 1 1h5" />
            <path d="m9 15 2 2 4-4" />
          </>
        ),
        title: "Simplified Grading",
        text: "Streamline how you distribute assignments and evaluate student work.",
      },
      {
        id: 2,
        icon: (
          <>
            <path d="M16 17h6v-6" />
            <path d="m22 17-8.5-8.5-5 5L2 7" />
          </>
        ),
        title: "Reduced Burden",
        text: "Cut down on administrative tasks so you can focus on teaching.",
      },
      {
        id: 3,
        icon: (
          <>
            <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
            <path d="M9 13a4.5 4.5 0 0 0 3-4" />
            <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5" />
            <path d="M3.477 10.896a4 4 0 0 1 .585-.396" />
            <path d="M6 18a4 4 0 0 1-1.967-.516" />
            <path d="M12 13h4" />
            <path d="M12 18h6a2 2 0 0 1 2 2v1" />
            <path d="M12 8h8" />
            <path d="M16 8V5a2 2 0 0 1 2-2" />
            <circle cx="16" cy="13" r=".5" />
            <circle cx="18" cy="3" r=".5" />
            <circle cx="20" cy="21" r=".5" />
            <circle cx="20" cy="8" r=".5" />
          </>
        ),
        title: "Smart Tools",
        text: "Leverage intelligent features designed to support your academic judgment.",
      },
    ],
  },
  student: {
    title: "Student",
    highlight: "Clarity",
    cards: [
      {
        id: 1,
        icon: (
          <>
            <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
            <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09" />
            <path d="M9 12a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.4 22.4 0 0 1-4 2z" />
            <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 .05 5 .05" />
          </>
        ),
        title: "Clear Guidelines",
        text: "Access straightforward submission instructions and track your progress.",
      },
      {
        id: 2,
        icon: (
          <>
            <path d="M10.268 21a2 2 0 0 0 3.464 0" />
            <path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326" />
          </>
        ),
        title: "Real-Time Status",
        text: "Stay updated with transparent, instant notifications on your evaluations.",
      },
      {
        id: 3,
        icon: (
          <>
            <path d="M12 13V2l8 4-8 4" />
            <path d="M20.561 10.222a9 9 0 1 1-12.55-5.29" />
            <path d="M8.002 9.997a5 5 0 1 0 8.9 2.02" />
          </>
        ),
        title: "Zero Uncertainty",
        text: "Enjoy a structured, predictable experience from start to finish.",
      },
    ],
  },
};

const btns = [
  {
    name: "institution",
    key: "institutional",
    title: "Institutional",
    highlight: "Control",
    iconPath: (
      <>
        <path d="M14 21v-3a2 2 0 0 0-4 0v3" />
        <path d="M18 12h.01" />
        <path d="M18 16h.01" />
        <path d="M22 7a1 1 0 0 0-1-1h-2a2 2 0 0 1-1.143-.359L13.143 2.36a2 2 0 0 0-2.286-.001L6.143 5.64A2 2 0 0 1 5 6H3a1 1 0 0 0-1 1v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2z" />
        <path d="M6 12h.01" />
        <path d="M6 16h.01" />
        <circle cx="12" cy="10" r="2" />
      </>
    ),
  },
  {
    name: "faculty",
    key: "faculty",
    title: "Faculty",
    highlight: "Responsibility",
    iconPath: (
      <>
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" />
        <path d="M8 11h8" />
        <path d="M8 7h6" />
      </>
    ),
  },
  {
    name: "student",
    key: "student",
    title: "Student",
    highlight: "Clarity",
    iconPath: (
      <>
        <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
        <path d="M22 10v6" />
        <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
      </>
    ),
  },
];

const AboutUs = () => {
  const [activeTab, setActiveTab] = useState("institutional");
  const currentView = tabContent[activeTab];

  return (
    <div className="aboutMain mt-5 pt-4">
      <section
        className="my-5 d-flex flex-column align-items-center"
        style={{
          position: "sticky",
          top: "7.5rem",
          left: 0,
          zIndex: -1,
        }}
      >
        <span
          className="badge bg-light text-light bg-opacity-10 fw-normal mb-lg-5 mb-4 p-2 px-3 rounded-pill fs-6"
          style={{ width: "fit-content" }}
        >
          <svg
            width="25"
            height="25"
            viewBox="0 0 20 20"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            className="me-2"
          >
            <path d="M16.3965 5.01128C16.3963 4.93399 16.3489 4.87691 16.293 4.85406L16.2354 4.84332C13.9306 4.91764 12.5622 5.32101 10.665 6.34722V16.3716C11.3851 15.9994 12.0688 15.7115 12.7861 15.5015C13.8286 15.1965 14.9113 15.0633 16.2402 15.0435L16.2979 15.0308C16.353 15.0063 16.3965 14.9483 16.3965 14.8755V5.01128ZM3.54492 14.8765C3.54492 14.9725 3.62159 15.0422 3.70117 15.0435L4.19629 15.0562C5.94062 15.1247 7.26036 15.4201 8.65918 16.0484C8.05544 15.1706 7.14706 14.436 6.17871 14.1109V14.1099C5.56757 13.9045 5.16816 13.3314 5.16797 12.6988V4.98882C4.86679 4.93786 4.60268 4.8999 4.28223 4.87457L3.72754 4.84429C3.62093 4.84079 3.54505 4.92417 3.54492 5.01226V14.8765ZM17.7266 14.8755C17.7266 15.6314 17.1607 16.2751 16.4121 16.3628L16.2598 16.3736C15.0122 16.3922 14.0555 16.5159 13.1602 16.7779C12.2629 17.0404 11.3966 17.4508 10.3369 18.0738C10.129 18.1959 9.87099 18.1958 9.66309 18.0738C7.71455 16.9283 6.31974 16.4689 4.12988 16.3853L3.68164 16.3736C2.85966 16.3614 2.21484 15.6838 2.21484 14.8765V5.01226C2.21497 4.15391 2.93263 3.4871 3.77246 3.51519L4.39844 3.54937C4.67996 3.57191 4.92258 3.60421 5.16797 3.64214V2.51031C5.16797 1.44939 6.29018 0.645615 7.31055 1.15679L7.31152 1.15582C8.78675 1.89511 10.0656 3.33006 10.5352 4.91461C12.3595 3.98907 13.8688 3.58817 16.1924 3.51324L16.3506 3.51714C17.1285 3.5741 17.7264 4.23496 17.7266 5.01128V14.8755ZM6.49805 12.6988C6.49824 12.7723 6.5442 12.8296 6.60254 12.8492L6.96289 12.9859C7.85245 13.3586 8.68125 13.9846 9.33496 14.7496V5.5816C9.08794 4.37762 8.13648 3.1566 6.95801 2.47613L6.71582 2.34527C6.67779 2.32617 6.6337 2.32502 6.58301 2.35796C6.52946 2.39279 6.49805 2.44863 6.49805 2.51031V12.6988Z"></path>
          </svg>
          About Classsora
        </span>

        <div className="texts mx-auto text-light">
          <h1 className="display-lg-6 fw-bold mb-4 text-center">
            Empowering Institutes for a{" "}
            <span className="text-gradient">Better Campus</span>
          </h1>
          <p
            className="fs-6 fw-lighter px-3 px-lg-0 opacity-75 mb-4 text-center mx-auto"
            style={{ maxWidth: "1100px" }}
          >
            <strong className="fs-5 fw-light">Classora</strong> is a smart and
            institution focused digital platform designed to manage academic
            assignments, submissions and evaluations in a structured, reliable,
            and transparent manner. It streamlines academic workflows while
            respecting institutional policies and human oversight.
          </p>
        </div>
      </section>

      {/* 2. Why Classora was created */}
      <div className="wrapperClip pt-4 m-0">
        <section
          className="py-5 whyClassoraCreated m-0"
          style={{ backgroundColor: "var(--classora-light)" }}
        >
          <div className="container d-flex flex-column align-items-center justify-content-center">
            <div className="bagdeContainer">
              <span
                className="badge bg-primary-subtle bg-opacity-10 fw-normal d-flex align-items-center mb-4 p-2 px-3 rounded-pill"
                style={{ color: "rgb(26, 54, 155)", fontSize: "0.9rem" }}
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
                  className="me-1"
                >
                  <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
                  <line x1="12" x2="12" y1="8" y2="16" />
                  <line x1="8" x2="16" y1="12" y2="12" />
                </svg>
                Why Classora Was Created
              </span>
            </div>
            <div
              className="textContainer text-muted text-center px-lg-0 px-3"
              style={{ maxWidth: "900px" }}
            >
              <p className="lead">
                Academic assignments management is a critical part of the
                education system, yet it often suffers from scattered
                submissions, unclear evaluation processes, manual tracking and
                avoidable administrative stress.
              </p>
              <p className="lead">
                CLASSORA was created to address these challenges at their core:
                bringing structure, clarity and reliability into the academic
                assignment lifecycle, without disrupting existing institutional
                practices.
              </p>
            </div>
          </div>
        </section>
        {/* 3. How It Supports Institutions (Interactive Tabs) */}

        <section className="py-5 m-0 bg-light" style={{ zIndex: 1000 }}>
          <h2 className="text-center mt-5 fw-bold text-primary-custom mb-5 px-3 px-lg-0">
            How We Support the <span className="text-gradient">Ecosystem</span>
          </h2>

          <div className="container mb-5">
            <div
              className="btnGrp border bg-secondary-subtle p-1 rounded mx-auto d-flex justify-content-center gap-2 mb-4"
              style={{ width: "fit-content" }}
            >
              {btns.map((btn) => (
                <button
                  className={`btn ${activeTab === btn.key ? "active" : ""} border-0 bg-white d-flex align-items-center justify-content-center`}
                  key={btn.name}
                  onClick={() => setActiveTab(btn.key)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="me-1"
                  >
                    {btn.iconPath}
                  </svg>
                  <p className="m-0 btnText">{btn.name}</p>
                </button>
              ))}
            </div>
            <div className="clay-stage fade-in" key={activeTab}>
              <h4 className="unified-heading mb-4 text-center">
                {currentView.title}
                <span className="text-primary-glow ms-2">
                  {currentView.highlight}
                </span>
              </h4>

              <div className="clay-grid">
                {currentView.cards.map((card) => (
                  <div
                    className="clay-card rounded-5 p-5 text-center d-flex flex-column align-items-center justify-content-center"
                    key={card.id}
                  >
                    <div className="clay-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="44"
                        height="44"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        {card.icon}
                      </svg>
                    </div>
                    <h5 className="clay-card-title text-light fw-semibold">
                      {card.title}
                    </h5>
                    <p className="m-0 fw-light">{card.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <HowItWorks/>
        <About1 />
        <About2 />
      </div>
    </div>
  );
};

export default AboutUs;
