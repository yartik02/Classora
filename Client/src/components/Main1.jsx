import image2 from "../assets/classScene1.png";
import { useTheme } from "../store/useTheme.jsx";
import { useNavigate } from "react-router-dom";

function Main1() {
  const { theme } = useTheme();
  const navigate = useNavigate();

  return (
    <section
      className="main py-5 px-lg-5 px-0 position-relative overflow-hidden"
      style={{ backgroundColor: "var(--bg-main)" }}
    >
      <div
        className="row rounded-5 align-items-center p-0 mx-lg-5 mx-0 my-5"
        style={{ backgroundColor: "rgba(35, 73, 207, 0.34)" }}
      >
        <div className="col-lg-6 order-lg-1 order-1 p-5">
          <div className="mb-sm-0 mb-lg-0 d-flex flex-column justify-content-center align-items-lg-start align-items-center ">
            <span
              className={`badge ${theme === "light" ? "bg-primary-subtle" : "bg-info text-info"} mx-lg-0 mx-auto bg-opacity-10 fw-normal d-flex align-items-center align-self-start mb-4 p-2 px-3 rounded-pill`}
              style={{ color: "rgb(26, 54, 155)", width: "fit-content" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-workflow-icon lucide-workflow me-2"
              >
                <rect width="8" height="8" x="3" y="3" rx="2" />
                <path d="M7 11v4a2 2 0 0 0 2 2h4" />
                <rect width="8" height="8" x="13" y="13" rx="2" />
              </svg>
              Intelligent Academic Workflow Platform
            </span>
            {/* Heading */}
            <h1 className="display-5 heading fw-bold mb-3 text-lg-start text-center">
              Where Academic Efficiency Meets
              <span className="text-gradient"> Intelligent Simplicity</span>
            </h1>

            {/* Description */}
            <p
              className="fs-6 mb-lg-4 mb-0 text-lg-start text-center"
              style={{ color: "var(--text-muted)" }}
            >
              CLASSORA transforms traditional assignment management into a
              smart, organized, and transparent digital experience by empowering
              institutions with structured automation and complete academic
              oversight.
            </p>

            <button
              className="learnMoreBtn px-3 py-2 btn mt-3 mt-lg-0 btn-click-animation"
              onClick={() => {
                navigate("/aboutUs");
                window.scrollTo(0, 0);
              }}
            >
              Learn More...
            </button>
          </div>
        </div>
        <div className="col-lg-6 order-lg-2 order-2 p-0">
          <div className="d-inline-block">
            <img
              src={image2}
              alt="class Scene"
              className="img-fluid mx-auto MainImage1"
              style={
                theme === "dark"
                  ? { opacity: "0.89" }
                  : {
                      opacity: "1",
                    }
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Main1;
