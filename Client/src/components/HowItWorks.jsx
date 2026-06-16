import React, { useEffect, useRef } from "react";
import { useTheme } from "../store/useTheme";

const HowItWorks = () => {
  const { theme } = useTheme();
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

  const timelineRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;
      const rect = timelineRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate how much of the timeline has scrolled past the middle of the screen
      const start = rect.top - windowHeight / 2;
      const end = rect.bottom - windowHeight / 2;
      const total = end - start;

      let progress = 0;
      if (start < 0) {
        progress = Math.min(100, Math.max(0, (Math.abs(start) / total) * 100));
      }

      // Update CSS variable directly to avoid React re-renders wiping out classes
      timelineRef.current.style.setProperty(
        "--scroll-progress",
        `${progress}%`,
      );

      // Update active dots directly
      const stepsList = timelineRef.current.querySelectorAll(".timeline-step");
      stepsList.forEach((step, index) => {
        if (progress > (index / stepsList.length) * 100) {
          step.classList.add("active-dot");
        } else {
          step.classList.remove("active-dot");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // init
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Make it visible if it's intersecting OR if it's already scrolled past (above viewport)
          if (
            entry.isIntersecting ||
            entry.boundingClientRect.top < window.innerHeight / 2
          ) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px 0px 0px" },
    );

    const steps = document.querySelectorAll(".timeline-step");
    steps.forEach((step) => observer.observe(step));

    return () => observer.disconnect();
  }, []);

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
          <h2 className="fw-bold mb-3">
            How Classora <span className="text-gradient">Works</span>
          </h2>
          <p
            className="mx-auto"
            style={{ maxWidth: "650px", color: "var(--text-muted)" }}
          >
            A seamless, end-to-end lifecycle that brings structure to the chaos
            of assignment management without removing human oversight.
          </p>
        </div>

        {/* The Timeline */}
        <div className="timeline-container" ref={timelineRef}>
          {steps.map((step, index) => {
            const isEven = index % 2 !== 0;

            return (
              <div className="timeline-step" key={index}>
                <div
                  className="timeline-content rounded-4"
                  style={{ backgroundColor: "var(--bg-surface)" }}
                >
                  {/* Badges - Dynamically aligned */}
                  <div
                    className={`d-flex flex-wrap gap-2 mb-3 ${isEven ? "justify-content-md-start" : "justify-content-md-end text-md-end"}`}
                  >
                    <span
                      className="badge text-dark px-3 py-2 fw-bolder rounded shadow-sm"
                      style={{ backgroundColor: "#ffd52d" }}
                    >
                      {step.stepLabel}
                    </span>
                    <span
                      className={`badge px-3 py-2 rounded border border-secondary ${theme === "light" ? "bg-light text-secondary border-opacity-25" : "bg-secondary text-black"}`}
                    >
                      {step.role}
                    </span>
                  </div>

                  {/* Text alignment flips based on side */}
                  <div className={isEven ? "text-md-start" : "text-md-end"}>
                    <p className="fw-bold mb-0 fs-4">{step.title}</p>
                    <p
                      className="mb-0 fw-light"
                      style={{ color: "var(--text-muted)" }}
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
