import LogoImg from "../assets/ClassoraLogoNew.svg";
import { Link } from "react-router-dom";

const quickLinks = [
  { id: 1, text: "About Classora", url: "/about" },
  { id: 2, text: "About Developer", url: "/developer" },
  { id: 3, text: "How it works", url: "/how-it-works" },
  { id: 4, text: "FAQs", url: "/faqs" },
  { id: 5, text: "Contact Us", url: "/contact" },
];

const contactInfo = [
  {
    id: 1,
    path: (
      <>
        <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
        <rect x="2" y="4" width="20" height="16" rx="2" />
      </>
    ),
    text: "info@classora.com",
    link: "mailto:info@classora.com",
  },
  {
    id: 2,
    path: (
      <>
        <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" />
      </>
    ),
    text: "+91 987654321",
    link: "tel:+91987654321",
  },
];

const socialLinks = [
  {
    name: "Facebook",
    url: "https://www.facebook.com/jmietiinstitute",
    classn: "bi bi-facebook",
    path: "M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951",
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/jmietiofficial/",
    classn: "bi bi-instagram",
    path: "M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334",
  },
  {
    name: "Twitter / X",
    url: "https://x.com/jmietiradaur",
    classn: "bi bi-twitter-x",
    path: "M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/jmieti-radaur-b10943301/",
    classn: "bi bi-linkedin",
    path: "M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z",
  },
  {
    name: "Youtube",
    url: "https://www.youtube.com/@JmietiCollege",
    classn: "bi bi-youtube",
    wid: "25",
    path: "M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.01 2.01 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.01 2.01 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31 31 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.01 2.01 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A100 100 0 0 1 7.858 2zM6.4 5.209v4.818l4.157-2.408z",
  },
];

const legalLinks = [
  { id: 1, text: "Privacy Policies", url: "/privacy" },
  { id: 2, text: "Terms", url: "/terms" },
];

function Footer() {
  return (
    <footer className="footerMain text-white p-5 mt-5">
      <div className="footerWrapper container">
        <div className="row p-0">
          <div className="col-lg-4 col-12 logoHeader p-0">
            <div className="header1 d-flex align-items-center">
              <img src={LogoImg} alt="Logo" className="footerLogoImg" />
              <span className="LogoName fw-light fs-2 ms-2">Classora</span>
            </div>
            <p
              className="ms-2 fw-lighter lh-sm opacity-75 mt-3 w-75"
              style={{ fontSize: "0.9rem" }}
            >
              Empowering students to voice their concerns and create positive
              change in their academic environment.
            </p>
          </div>
          <div className="col-lg-2 col-12 col-md-6 quickLinks">
            <p className="fw-light m-0">Quick Links</p>
            <ul className="p-0" style={{ listStyleType: "none" }}>
              {quickLinks.map((link) => (
                <li key={link.id} className="p-0 ">
                  <Link
                    to={link.url}
                    className="text-decoration-none footer-item m-0 text-light fw-lighter"
                    style={{ fontSize: "0.9rem" }}
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-lg-3 col-12 col-md-6">
            <p className="m-0 fw-light">Contact Info</p>
            <ul className="p-0" style={{ listStyleType: "none" }}>
              {contactInfo.map((info) => (
                <li key={info.id} className="footer-item">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    //   height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {info.path}
                  </svg>
                  <Link
                    to={info.link}
                    className="text-decoration-none ms-2 fw-lighter text-light"
                    style={{ fontSize: "0.9rem" }}
                  >
                    {info.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-lg-3 col-12 d-flex flex-column align-items-center align-items-lg-start">
            <p className="fw-light">Follow Us</p>
            <ul
              className="text-lg-start p-0 text-center d-flex justify-content-start"
              style={{ listStyleType: "none" }}
            >
              {socialLinks.map((social, index) => (
                <li
                  key={index}
                  className="icon rounded-3 mx-1 d-flex align-items-center justify-content-center p-1 px-2"
                >
                  <Link
                    to={social.url}
                    target="_blank"
                    title={social.name}
                    className="d-flex align-items-center justify-content-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={social.wid || "18"}
                      fill="rgba(255, 255, 255, 0.8)"
                      className={`${social.classn}`}
                      viewBox="0 0 16 16"
                    >
                      <path d={social.path} />
                    </svg>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <hr className="mx-auto my-2" />
        <div className="footerBottom fw-light">
          <p
            className="copyright text-secondary m-0 text-center"
            style={{ fontSize: "0.9rem" }}
          >
            © {new Date().getFullYear()} Classora. All rights reserved.
          </p>
          <p
            className="credit text-secondary m-0 text-center"
            style={{ fontSize: "0.9rem" }}
          >
            Designed and Developed with{" "}
            <span className="heart">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="rgb(255, 20, 20)"
                stroke="rgb(255, 20, 20)"
                strokeWidth="0"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
              </svg>
            </span>{" "}
            by Yartik.
          </p>
          <div className="legal-links-container text-center">
            {legalLinks.map((link, index) => (
              <span key={link.id}>
                <Link
                  to={link.url}
                  style={{ fontSize: "0.8rem" }}
                  className="text-decoration-none text-light fw-light footer-item"
                >
                  {link.text}
                </Link>
                {index < legalLinks.length - 1 && (
                  <span className="separator mx-2 opacity-75">|</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
