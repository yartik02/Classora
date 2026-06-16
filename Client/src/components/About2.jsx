import visionImg from "../assets/meetingScene1.png";
import { useTheme } from "../store/useTheme.jsx";
import { useNavigate } from "react-router-dom";

function About2() {
  const { theme } = useTheme();
  const navigate = useNavigate();

  return (
    <section className="About2">
      {/* 6. Vision */}
      <section
        className="py-5"
        style={{ backgroundColor: "var(--bg-main)" }}
        id="developer"
      >
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-lg-5 col-12 fade-in-up">
              <img
                src={visionImg}
                alt="Our Vision"
                className="visionImg w-75"
              />
            </div>
            <div className="col-lg-7 col-12 fade-in-up">
              <h2 className="fw-bold mb-3">
                Our <span className="text-gradient">Vision</span>
              </h2>
              <p
                className="fs-6 fw-light mb-0"
                style={{ color: "var(--text-muted)" }}
              >
                CLASSORA aims to evolve as a trusted academic system that
                institutions can adopt, adapt, and grow with—without losing
                control over their academic processes. The vision is to create a
                stable, dependable platform that supports education through
                thoughtful use of technology.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Call to Action */}
      <section className="premium-cta-section py-5">
        <div
          className={`container ${theme === "light" ? "bg-light bg-opacity-75" : ""} p-0 mt-5 fade-in-up position-relative overflow-hidden`}
          style={{
            borderRadius: "40px",
            background: "var(--bg-surface)",
          }}
        >
          <div className="cta-ambient-glow cta-glow1"></div>
          <div className="cta-ambient-glow cta-glow2"></div>
          <div className="cta-ambient-glow cta-glow3"></div>
          <div className="cta-ambient-glow cta-glow4"></div>

          <div className="cta-glass-wrapper text-center">
            {/* Ambient Lighting inside the dark card */}

            <div className="cta-content position-relative z-1">
              <h2 className="display-4 fw-bold mb-4 cta-heading">
                Ready to bring order to <br />
                <span className="text-gradient">your workflows?</span>
              </h2>

              <p
                className="cta-subtitle mx-auto mb-4 px-3"
                style={{ color: "var(--text-muted)" }}
              >
                CLASSORA is not about adding more software to education. It is
                about bringing order, transparency, and purpose to one of its
                most important academic processes.
              </p>

              <div className="d-flex flex-column align-items-center">
                <button
                  className="premium-cta-btn text-light border-0 fw-semibold rounded-pill d-flex align-items-center justify-content-center"
                  onClick={() => {
                    setTimeout(() => {
                      window.scrollTo(0, 0);
                    }, 50);
                    navigate("/contactUs");
                  }}
                >
                  Contact Now
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="ms-2 cta-btn-icon"
                  >
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}

export default About2;
