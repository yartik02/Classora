import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../store/auth.jsx";
import { useTheme } from "../store/useTheme.jsx";
import logo from "../assets/ClassoraLogoNew.svg";
import Menu from "./Menu";
import { moon, sun, menu } from "../store/Icons.jsx";

const NAV_DATA = [
  { name: "Home", path: "/" },
  { name: "About", path: "/aboutUs" },
  { name: "Contact Us", path: "/contactUs" },
];

function Navbar() {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isLoggedIn = !!user;
  const isAdmin = user?.email === "admin@classora.com";
  const isDashboardActive = location.pathname.includes("dashboard");

  const textClass = isScrolled
    ? "navLinkTextScrolled"
    : "navLinkTextNotScrolled";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getDashboardPath = () => {
    if (!user) return "/";
    return isAdmin
      ? `/dashboard/${user.role?.toLowerCase()}`
      : `/dashboard/student/${user.rollno}`;
  };

  return (
    <nav
      className={`py-3 navBar w-100 ${isScrolled ? "navbarScrolled" : "navbarNotScrolled"}`}
    >
      <div className="container d-flex align-items-center justify-content-between">
        {/* BRAND SECTION */}
        <div className="d-flex align-items-center">
          <img src={logo} alt="Classora Logo" className="logoimg me-2" />
          <p className={`mb-0 fw-light fs-4 ${textClass}`}>Classora</p>
        </div>

        {/* NAVIGATION LINKS */}
        <div className="pages d-flex align-items-center">
          <ul className="d-flex p-0 mb-0 align-items-center justify-content-between gap-4 list-unstyled">
            {NAV_DATA.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={`text-decoration-none nav-items fs-5 ${
                    location.pathname === item.path ? "activePageColor" : ""
                  } ${textClass}`}
                >
                  {item.name}
                </Link>
              </li>
            ))}

            {isLoggedIn && (
              <li>
                <Link
                  to={getDashboardPath()}
                  className={`text-decoration-none nav-items fs-5 ${
                    isDashboardActive ? "activePageColor" : ""
                  } ${textClass}`}
                >
                  Dashboard
                </Link>
              </li>
            )}
          </ul>
        </div>

        {/* ACTIONS */}
        <div className="actions d-flex align-items-center">
          <ul className="d-flex p-0 mb-0 align-items-center justify-content-between gap-3 list-unstyled">
            {!isLoggedIn && (
              <>
                <li>
                  <Link
                    to="/register"
                    className="login_btn2 px-2 py-1 rounded-1 text-decoration-none btn-click-animation"
                  >
                    Register
                  </Link>
                </li>
                <li>
                  <Link
                    to="/login"
                    className="login_btn2 px-2 py-1 rounded-1 text-decoration-none btn-click-animation"
                  >
                    Login
                  </Link>
                </li>
              </>
            )}

            {/* THEME TOGGLE */}
            <li className="my-auto btn-click-animation">
              <button
                onClick={toggleTheme}
                aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
                className={`theme-toggle-btn border-0 p-2 d-flex align-items-center justify-content-center ${textClass}`}
                style={{
                  cursor: "pointer",
                  borderRadius: "50%",
                  transition: "transform 0.2s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "rotate(20deg)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "rotate(0deg)")
                }
              >
                <ThemeIcon theme={theme} />
              </button>
            </li>

            {/* OFF-CANVAS MENU */}
            <li className="fs-5 ms-3 my-auto menu align-items-center">
              <button
                onClick={() => setIsMenuOpen(true)}
                aria-label="Open Menu"
                className={`border-0 bg-transparent p-0 ${textClass}`}
                style={{ cursor: "pointer" }}
              >
                <MenuIcon />
              </button>
            </li>
          </ul>
        </div>

        <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      </div>
    </nav>
  );
}

export default Navbar;

function ThemeIcon({ theme }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      {theme === "light" ? moon : sun}
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 640 640"
      width="30"
      height="30"
      fill="currentColor"
    >
      {menu}
    </svg>
  );
}
