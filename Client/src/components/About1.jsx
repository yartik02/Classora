const boundaries = [
  { text: "A social networking platform", delay: "0.1s" },
  { text: "A chat-heavy communication tool", delay: "0.2s" },
  { text: "A fully AI-driven black-box system", delay: "0.3s" },
  { text: "A replacement for educators or academic judgment", delay: "0.4s" },
];

const beliefs = [
  {
    icon: (
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
    title: "Education deserves structure, not chaos",
    text: "Academic processes should be organized, predictable, and dependable.",
    span: "col-span-4", // Takes 1/3 of the row
    delay: "0.1s",
  },
  {
    icon: (
      <>
        <path d="m11 17 2 2a1 1 0 1 0 3-3" />
        <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4" />
        <path d="m21 3 1 11h-2" />
        <path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3" />
        <path d="M3 4h8" />
      </>
    ),
    title: "Technology should assist, not replace",
    text: "Systems must support faculty responsibility, not override it.",
    span: "col-span-4", // Takes 1/3 of the row
    delay: "0.2s",
  },
  {
    icon: (
      <>
        <path d="m8 11 2 2 4-4" />
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </>
    ),
    title: "Transparency builds trust",
    text: "Clear workflows and visible progress strengthen confidence for all stakeholders.",
    span: "col-span-4", // Takes 1/3 of the row
    delay: "0.3s",
  },
  {
    icon: (
      <>
        <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
      </>
    ),
    title: "Simplicity improves adoption",
    text: "Tools should be intuitive and usable without extensive training.",
    span: "col-span-6", // Takes 1/2 of the row
    delay: "0.4s",
  },
  {
    icon: (
      <>
        <path d="M12 3v18" />
        <path d="m19 8 3 8a5 5 0 0 1-6 0zV7" />
        <path d="M3 7h1a17 17 0 0 0 8-2 17 17 0 0 0 8 2h1" />
        <path d="m5 8 3 8a5 5 0 0 1-6 0zV7" />
        <path d="M7 21h10" />
      </>
    ),
    title: "Institutions must stay in control",
    text: "Academic authority and decision-making should always remain with the institution.",
    span: "col-span-6", // Takes 1/2 of the row
    delay: "0.5s",
  },
];

function About1() {
  return (
    <section className="About1">
      {/* 4. Boundaries (What it is NOT) */}
      <section className="premium-boundaries-section py-5">
        <div className="ambient-glow glow-red"></div>
        <div className="ambient-glow glow-blue"></div>

        <div className="container py-5 position-relative z-index-1">
          <div className="row align-items-center">
            {/* Left Column: Context */}
            <div className="col-lg-5 mb-5 mb-lg-0 text-center text-lg-start pe-lg-5">
              <span
                className="badge bg-danger text-danger bg-opacity-10 fw-normal mx-lg-0 mx-auto mb-lg-5 mb-4 p-2 px-3 rounded-pill fs-6 d-flex align-items-center justify-content-center"
                style={{ width: "fit-content" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="me-2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="m15 9-6 6" />
                  <path d="m9 9 6 6" />
                </svg>
                <p className="m-0">Our Boundaries</p>
              </span>

              <h2 className="display-5 fw-bold premium-heading mb-4">
                What CLASSORA <br />
                <span className="text-danger-gradient">Is Not</span>
              </h2>
              <p className="premium-text-muted fs-6 fw-normal">
                To maintain clarity and trust, it is equally important to define
                our boundaries. We prioritize responsibility, control, and
                clarity over unnecessary automation.
              </p>
            </div>

            {/* Right Column: Premium Bento Grid */}
            <div className="col-lg-7">
              <div className="premium-bento-grid">
                {boundaries.map((item, index) => (
                  <div
                    className="premium-bento-card fade-in-up"
                    key={index}
                    style={{ animationDelay: item.delay }}
                  >
                    {/* Custom Styled SVG Icon */}
                    <div className="bento-icon-wrapper">
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </div>
                    <p className="bento-text">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Philosophy (Grid of Cards) */}
      <section className="premium-beliefs-section py-5 bg-primary-subtle ">
        <div className="container py-5">
          {/* Section Header */}
          <div className="text-center mb-5 fade-in-up">
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
                <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z" />
                <path d="M20 2v4" />
                <path d="M22 4h-4" />
                <circle cx="4" cy="20" r="2" />
              </svg>
              <p className="m-0">Core Values</p>
            </span>
            <h2 className="fw-bold text-primary-custom mt-2">
              What We <span className="text-gradient">Believe In</span>
            </h2>
          </div>

          {/* Custom Bento Grid */}
          <div className="belief-bento-grid">
            {beliefs.map((belief, index) => (
              <div
                className={`premium-glass-card fade-in-up rounded-5 ${belief.span}`}
                key={index}
                style={{ animationDelay: belief.delay }}
              >
                <div className="row gap-3 align-items-center mb-3">
                  <div className="col-3 belief-icon-wrapper d-flex align-items-center justify-content-center rounded-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="34"
                      height="34"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {belief.icon}
                    </svg>
                  </div>
                  <h5 className="col fw-semibold m-0">{belief.title}</h5>
                </div>
                <p className="belief-text text-muted fw-normal m-0">
                  {belief.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </section>
  );
}

export default About1;
