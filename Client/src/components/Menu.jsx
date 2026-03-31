import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import LogoImg from "../assets/ClassoraLogoNew.svg";
import "./Menu.css";

// Configuration arrays placed outside the component to prevent reallocation on every re-render
const NAV_LINKS = [
  { path: "/", label: "Home" },
  { path: "/aboutUs", label: "About Us" },
  { path: "/contactUs", label: "Contact Us" },
];

const AUTH_BUTTONS = [
  { label: "Sign Up", className: "w-100 py-2 d-flex justify-content-center align-items-center rounded-3 login_btn2" },
  { label: "Login", className: "w-100 mt-3 py-2 d-flex justify-content-center align-items-center rounded-3 login_btn2" },
];

const Menu = ({ isOpen, onClose }) => {
  // Prevent background scrolling when the menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleOnClick = (e) => {
    if (e.target.innerText === "Login") {
      // Handle login logic here
      console.log("Login button clicked");
    } else if (e.target.innerText === "Sign Up") {
      // Handle sign-up logic here
      console.log("Sign Up button clicked");
    }
  };


  return (
    <>
      <div
        className={`offcanvas-backdrop ${isOpen ? "open" : ""}`}
        onClick={onClose}
      ></div>

      {/* The Sliding Panel */}
      <div className={`offcanvas-panel d-flex flex-column ${isOpen ? "open" : ""}`}>
        
        {/* HEADER */}
        <div className="d-flex justify-content-between align-items-center p-4 border-bottom border-light border-opacity-50">
          <div className="d-flex justify-content-center align-items-center">
            {/* Logo */}
            <div
              className="rounded d-flex justify-content-center align-items-center text-white shadow-sm p-1"
              style={{ width: "42px", height: "42px", backgroundColor: "#3648cf" }}
            >
              <img src={LogoImg} alt="Logo" className="w-100" />
            </div>
            <p className="fw-medium ms-2 text-light fs-2 m-0">
              Classora
            </p>
          </div>

          <button className="btn-close-custom p-1" onClick={onClose} aria-label="Close">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
              <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
            </svg>
          </button>
        </div>

        {/* NAVIGATION LINKS */}
        <div className="flex-grow-1 overflow-auto py-3">
          {NAV_LINKS.map(({ path, label }) => (
            <Link key={path} to={path} className="offcanvas-nav-item" onClick={onClose}>
              {label}
            </Link>
          ))}
        </div>

        {/* FOOTER AREA */}
        <div className="p-4">
          {AUTH_BUTTONS.map(({ label, className }, index) => (
            <button
              key={index}
              className={className}
              onClick={(e) => {
                onClose();
                handleOnClick(e);
              }}
            >
              {label}
            </button>
          ))}
        </div>

      </div>
    </>
  );
};

export default Menu;