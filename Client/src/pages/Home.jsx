import bannerlgLight from "../assets/classoraBannerLg.png";
import bannersmLight from "../assets/newPhoneBanner.png";
import bannerlgDark from "../assets/classoraBannerNewDarkLg2.png";
import bannersmDark from "../assets/newPhoneBannerDark2.png";
import Main1 from "../components/Main1";
import Main2 from "../components/Main2";
import { useTheme } from "../store/useTheme.jsx";
import { useAuth } from "../store/auth.jsx";
import { useNavigate } from "react-router-dom";

function Home() {
  const { theme } = useTheme();
  const { isLoggedIn, userRole, user } = useAuth();
  const navigate = useNavigate();

  const handleClick = () => {
    console.log(
      "isLoggedIn: ",
      isLoggedIn,
      "\nuserRole: ",
      userRole,
      "\nuser: ",
      user,
    );

    if (isLoggedIn) {
      if (userRole === "Student") {
        navigate(`/dashboard/student/${user.rollno}`);
        // } else if (userRole === "faculty") {
        //   navigate(`/dashboard/faculty/${user.employeeId}`);
      } else if (userRole === "admin") {
        navigate(`/dashboard/admin/${user.employeeId}`);
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <section className="Home">
      <picture className="position-relative">
        <source
          media="(min-width: 900px)"
          srcSet={theme === "light" ? bannerlgLight : bannerlgDark}
          className="w-100"
        />

        <img
          src={theme === "light" ? bannersmLight : bannersmDark}
          alt="Banner"
          className="w-100"
        />
      </picture>

      <button
        className="d-flex align-items-center justify-content-center login_btn2 px-3 rounded-1 py-1 fw-light getStartedBtn position-absolute btn-click-animation"
        onClick={handleClick}
      >
        Get Started
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          className="ms-2 getStartedArrow"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
          />
        </svg>
      </button>

      <Main1 />
      <Main2 />
    </section>
  );
}

export default Home;
