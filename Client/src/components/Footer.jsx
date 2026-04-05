import React from "react";
import logo from "../assets/ClassoraLogoNew.svg";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

const contactInfo = [
  {
    label: "Email",
    name: "info@classora.com",
    value: "mailto:info@classora.com",
    path: "M125.4 128C91.5 128 64 155.5 64 189.4C64 190.3 64 191.1 64.1 192L64 192L64 448C64 483.3 92.7 512 128 512L512 512C547.3 512 576 483.3 576 448L576 192L575.9 192C575.9 191.1 576 190.3 576 189.4C576 155.5 548.5 128 514.6 128L125.4 128zM528 256.3L528 448C528 456.8 520.8 464 512 464L128 464C119.2 464 112 456.8 112 448L112 256.3L266.8 373.7C298.2 397.6 341.7 397.6 373.2 373.7L528 256.3zM112 189.4C112 182 118 176 125.4 176L514.6 176C522 176 528 182 528 189.4C528 193.6 526 197.6 522.7 200.1L344.2 335.5C329.9 346.3 310.1 346.3 295.8 335.5L117.3 200.1C114 197.6 112 193.6 112 189.4z",
  },
  {
    label: "Phone",
    name: "+91 8295905215",
    value: "tel:+918295905215",
    path: "M224.2 89C216.3 70.1 195.7 60.1 176.1 65.4L170.6 66.9C106 84.5 50.8 147.1 66.9 223.3C104 398.3 241.7 536 416.7 573.1C493 589.3 555.5 534 573.1 469.4L574.6 463.9C580 444.2 569.9 423.6 551.1 415.8L453.8 375.3C437.3 368.4 418.2 373.2 406.8 387.1L368.2 434.3C297.9 399.4 241.3 341 208.8 269.3L253 233.3C266.9 222 271.6 202.9 264.8 186.3L224.2 89z",
  },
];

const socialLinks = [
  {
    name: "Facebook",
    url: "https://www.facebook.com/jmietiinstitute",
    path: "M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951",
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/jmietiofficial/",
    path: "M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334",
  },
  {
    name: "Twitter",
    url: "https://x.com/jmietiradaur",
    path: "M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z",
  },
];

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      className="text-light mt-5 py-5 px-4"
      style={{
        backgroundColor: "#ffffff1a",
        boxShadow:
          "inset rgba(255, 255, 255, 0.33) 0px 20px 30px 0px, rgba(0, 0, 0, 0.52) 0px -20px 50px 12px",
      }}
    >
      <div className="container py-3">
        <div className="row text-start">
          {/* Logo + About */}
          <div className="col-12 col-md-6 col-lg-3 mb-4">
            <div className="fs-1 fw-bold d-flex align-items-center">
              <img
                src={logo}
                alt="Logo"
                className="me-2"
                style={{ width: "40px", height: "auto" }}
              />
              Classora
            </div>
            <p className="mt-2 fw-lighter small">
              Empowering students to voice their concerns and create positive
              change in their academic environment.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-12 col-md-6 col-lg-3 mb-4 ps-lg-5 text-start text-lg-start text-md-center">
            <h5 className="mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link
                  to="/aboutUs"
                  onClick={scrollToTop}
                  className="text-decoration-none text-light fw-lighter footer-item"
                >
                  About Classora
                </Link>
              </li>
              <li className="mb-2">
                <HashLink
                  smooth
                  to="/aboutUs#developer"
                  className="text-decoration-none text-light fw-lighter footer-item"
                >
                  About Developer
                </HashLink>
              </li>
              <li className="mb-2">
                <HashLink
                  smooth
                  to="/aboutUs#how-it-works"
                  className="text-decoration-none text-light fw-lighter footer-item"
                >
                  How it works
                </HashLink>
              </li>
              <li className="mb-2">
                <HashLink
                  smooth
                  to="/contactus#faqs"
                  className="text-decoration-none text-light fw-lighter footer-item"
                >
                  FAQs
                </HashLink>
              </li>
              <li className="mb-2">
                <Link
                  to="/contactus"
                  onClick={scrollToTop}
                  className="text-decoration-none text-light fw-lighter footer-item"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-12 col-md-6 col-lg-3 mb-4">
            <h5 className="mb-3">Contact Info</h5>
            <ul className="list-unstyled">
              {contactInfo.map((item, index) => (
                <li key={index} className="mb-2">
                  <a
                    href={item.value}
                    className="text-decoration-none text-light fw-lighter d-flex align-items-center footer-item"
                  >
                    <svg
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="me-2"
                      viewBox="0 0 640 640"
                    >
                      <path d={item.path} />
                    </svg>
                    <span>{item.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div className="col-12 col-md-6 col-lg-3 mb-4 text-lg-start text-center">
            <h5 className="mb-3">Follow Us</h5>
            <div className="d-flex justify-content-lg-start justify-content-center gap-2">
              {socialLinks.map((social, index) => (
                <Link
                  to={social.url}
                  key={index}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="d-flex align-items-center justify-content-center rounded-3 icon"
                  style={{
                    width: "40px",
                    height: "40px",
                    backgroundColor: "#ffffff1a",
                    color: "white",
                  }}
                >
                  <svg
                    width="18"
                    height="18"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d={social.path} />
                  </svg>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <hr />

        <div className="text-center small text-secondary py-2">
          <p className="mb-1">
            © {new Date().getFullYear()} Classora. All rights reserved.
          </p>
          <div className="d-flex align-items-center justify-content-center">
            Designed and Developed with
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="#ff0080"
              className="mx-1"
            >
              <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
            </svg>
            by Yartik.
          </div>

          <div className="mt-3 d-flex justify-content-center gap-3">
            <Link
              to="/privacy-policy"
              onClick={scrollToTop}
              className="text-decoration-none text-secondary"
            >
              Privacy Policies
            </Link>
            <span className="separator ">|</span>

            <Link
              to="/terms-of-service"
              onClick={scrollToTop}
              className="text-decoration-none text-secondary"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
