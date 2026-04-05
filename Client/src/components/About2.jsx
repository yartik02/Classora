import React, { useState, useEffect, useRef } from "react";
import DevIllustration from "./DevIllustration.jsx";
import visionImg from "../assets/meetingScene1.png";

function About2() {
  // 1. Create a state to track if the div is on screen
  const [isVisible, setIsVisible] = useState(false);

  // 2. Create a reference to attach to the div you want to watch
  const domRef = useRef(null);

  useEffect(() => {
    // 3. Set up the Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        // entries[0] is the div we are watching
        if (entries[0].isIntersecting) {
          setIsVisible(true);

          // Optional: Once it loads, stop watching it so it doesn't re-trigger
          if (domRef.current) observer.unobserve(domRef.current);
        }
      },
      {
        threshold: 0.2, // Triggers when 20% of the div is ghgyvisible on screen. You can tweak this!
      },
    );
    // Start watching the div
    const currentElement = domRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    // Cleanup function when component unmounts
    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, []);
  return (
    <section className="About2">
      {/* 6. Developer & Vision */}

      <section className="py-5 bg-white" id="developer">
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-lg-6 col-12 fade-in-up">
              <h2 className="fw-bold text-primary-custom mb-4">
                About the <span className="text-gradient">Developer</span>
              </h2>
              <p className="text-muted fs-6 fw-light">
                CLASSORA is designed and fully developed by Yartik, with a
                strong focus on academic responsibility and institutional
                workflows. The platform is built to address real challenges in
                assignment management by prioritizing structure, clarity, and
                reliability.
              </p>
              <p className="text-muted fs-6 fw-light">
                Every aspect is developed with educational environments in mind,
                ensuring that institutions, faculty, and students benefit from a
                system that supports accountability and long-term usability.
              </p>
            </div>
            <div
              className="col-lg-6 col-12 align-items-center justify-content-end"
              ref={domRef}
            >
              <div className="illustration w-75 ms-lg-auto mx-auto mx-lg-0">
                {isVisible ? <DevIllustration /> : null}
              </div>
            </div>
          </div>
          <div className="row align-items-center">
            <div className="col-lg-5 col-12 fade-in-up">
              <img
                src={visionImg}
                alt="Our Vision"
                className="visionImg w-75"
              />
            </div>
            <div className="col-lg-7 col-12 fade-in-up">
              <h3 className="fw-bold mb-3">
                Our <span className="text-gradient">Vision</span>
              </h3>
              <p className="fs-6 text-muted fw-light mb-0">
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
          className="container bg-light p-0 mt-5 fade-in-up position-relative overflow-hidden"
          style={{
            borderRadius: "40px",
          }}
        >
            <div className="cta-ambient-glow cta-glow1"></div>
            <div className="cta-ambient-glow cta-glow2"></div>
            <div className="cta-ambient-glow cta-glow3"></div>
            <div className="cta-ambient-glow cta-glow4"></div>

          <div className="cta-glass-wrapper text-center">
            {/* Ambient Lighting inside the dark card */}

            <div className="cta-content position-relative z-1">
              <h2 className="display-4 fw-bold text-dark mb-4 cta-heading">
                Ready to bring order to <br />
                <span className="text-gradient">your workflows?</span>
              </h2>

              <p className="cta-subtitle text-muted mx-auto mb-4 px-3">
                CLASSORA is not about adding more software to education. It is
                about bringing order, transparency, and purpose to one of its
                most important academic processes.
              </p>

              <div className="d-flex flex-column align-items-center">
                <button className="premium-cta-btn text-light border-0 fw-semibold rounded-pill d-flex align-items-center justify-content-center">
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
