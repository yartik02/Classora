import React, { useState, useEffect } from "react";
import logo from "../assets/ClassoraLogoNew.svg";
import Menu from "./Menu";
import { Link, useLocation } from "react-router-dom";

const navData = [
  { name: "Home", path: "/" },
  { name: "About", path: "/aboutUs" },
  { name: "Contact Us", path: "/contactUs" },
];

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation(); 

  useEffect(() => {
    const handleScroll = () => {
      // Triggering at 600px is quite late for a navbar, consider 50px-100px.
      setIsScrolled(window.scrollY > 600);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`py-2 w-100 py-3 ${isScrolled ? "navbarScrolled" : "navbarNotScrolled"}`}>
      <div className="container d-flex align-items-center justify-content-between">
        
        {/* BRAND SECTION (Left Side) */}
        <div className="d-flex align-items-center me-auto">
          <img
            src={logo}
            alt="Classora Logo"
            className="logoimg me-2"
          />
          <p className={`mb-0 fw-light fs-4 ${isScrolled ? "navLinkTextScrolled" : "navLinkTextNotScrolled"}`}>
            Classora
          </p>
        </div>

        {/* NAVIGATION LINKS (Right Side) */}
        <ul
          className="d-flex p-0 mb-0 align-items-center"
          style={{ listStyleType: "none" }}
        >
          {navData.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li className="mx-2" key={item.name}>
                <Link
                  to={item.path}
                  className={`text-decoration-none nav-items fs-5 ${isActive ? "activePageColor" : ""} ${isScrolled ? "navLinkTextScrolled" : "navLinkTextNotScrolled"}`}
                >
                  {item.name}
                </Link>
              </li>
            );
          })}

          <li className="mx-2">
            <Link to="/register" className="login_btn2 px-2 py-1 rounded-1 text-decoration-none">
              Register
            </Link>
          </li>
          <li className="ms-2">
            {/* Fixed the route to point to /login instead of /signup */}
            <Link to="/login" className="login_btn2 px-2 py-1 rounded-1 text-decoration-none">
              Login
            </Link>
          </li>

          {/* Off-canvas Menu Icon */}
          <li className="fs-5 ms-3 my-auto menu align-items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 640"
            width="30"
            height="30"
            role="button"
            className={`${isScrolled ? "navLinkTextScrolled" : "navLinkTextNotScrolled"}`}
            onClick={() => setIsMenuOpen(true)} 
          >
            <path d="M96 160C96 142.3 110.3 128 128 128L512 128C529.7 128 544 142.3 544 160C544 177.7 529.7 192 512 192L128 192C110.3 192 96 177.7 96 160zM96 320C96 302.3 110.3 288 128 288L512 288C529.7 288 544 302.3 544 320C544 337.7 529.7 352 512 352L128 352C110.3 352 96 337.7 96 320zM544 480C544 497.7 529.7 512 512 512L128 512C110.3 512 96 497.7 96 480C96 462.3 110.3 448 128 448L512 448C529.7 448 544 462.3 544 480z" />
          </svg>
          
          <Menu 
            isOpen={isMenuOpen} 
            onClose={() => setIsMenuOpen(false)} 
          />
        </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;