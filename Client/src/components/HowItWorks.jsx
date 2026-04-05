import React from "react";

const HowItWorks = () => {
  const steps = [
    {
      stepLabel: "Step 01",
      title: "Create & Distribute",
      desc: "Educators set up assignments with specific deadlines, submission formats, and institutional rules in just a few clicks.",
      role: "Faculty Action",
    },
    {
      stepLabel: "Step 02",
      title: "Submit & Track",
      desc: "Students upload their work securely. Classora generates a timestamped record and updates their tracking dashboard in real time.",
      role: "Student Action",
    },
    {
      stepLabel: "Step 03",
      title: "Intelligent Pre-Screening",
      desc: "Before evaluation begins, the system automatically flags late submissions, identifies duplicate content, and checks keyword relevance.",
      role: "System Automation",
    },
    {
      stepLabel: "Step 04",
      title: "Evaluate & Publish",
      desc: "Faculty review the generated insights, apply their academic judgment to finalize grades, and publish transparent feedback instantly.",
      role: "Faculty Action",
    },
  ];

  return (
    <section className="timeline-section-bg py-5" id="how-it-works">
      <div className="container py-5">
        {/* Section Header */}
        <div className="text-center mb-5 pb-3">
          <span
            className="badge bg-white bg-opacity-50 fw-normal mx-auto mb-4 p-2 px-3 rounded-pill fs-6 d-flex align-items-center justify-content-center"
            style={{ width: "fit-content", color: "rgb(26, 54, 155)" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="me-2"
            >
              <path d="m10.586 5.414-5.172 5.172" />
              <path d="m18.586 13.414-5.172 5.172" />
              <path d="M6 12h12" />
              <circle cx="12" cy="20" r="2" />
              <circle cx="12" cy="4" r="2" />
              <circle cx="20" cy="12" r="2" />
              <circle cx="4" cy="12" r="2" />
            </svg>
            <p className="m-0">The Workflow</p>
          </span>
          <h2 className="fw-bold text-primary-custom mb-3">
            How Classora <span className="text-gradient">Works</span>
          </h2>
          <p className="text-muted mx-auto" style={{ maxWidth: "650px" }}>
            A seamless, end-to-end lifecycle that brings structure to the chaos
            of assignment management without removing human oversight.
          </p>
        </div>

        {/* The Timeline */}
        <div className="timeline-container">
          {steps.map((step, index) => {
            const isEven = index % 2 !== 0; 

            return (
              <div className="timeline-step" key={index}>
                <div className="timeline-content rounded-4 bg-white">
                  {/* Badges - Dynamically aligned */}
                  <div
                    className={`d-flex flex-wrap gap-2 mb-3 ${isEven ? "justify-content-md-start" : "justify-content-md-end text-md-end"}`}
                  >
                    <span className="badge text-dark px-3 py-2 fw-bolder rounded shadow-sm" style={{backgroundColor:"#ffd52d"}}>
                      {step.stepLabel}
                    </span>
                    <span className="badge bg-light text-secondary border px-3 py-2 rounded">
                      {step.role}
                    </span>
                  </div>

                  {/* Text alignment flips based on side */}
                  <div className={isEven ? "text-md-start" : "text-md-end"}>
                    <p className="fw-bold text-dark mb-0 fs-4">{step.title}</p>
                    <p
                      className="text-muted mb-0 fw-light"
                    >
                      {step.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
