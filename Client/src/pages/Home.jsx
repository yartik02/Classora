import bannerlg from "../assets/classoraBannerLg.png";
import bannersm from "../assets/classoraBannerPhoneNew.png";
import Main1 from "../components/Main1";
import Main2 from "../components/Main2";

function Home() {
  return (
    <section className="Home">
      <picture className="position-relative">
        <source
          media="(min-width: 900px)"
          srcSet={bannerlg}
          className="w-100"
        />

        <img src={bannersm} alt="Banner" className="w-100" />
      </picture>

      <button
        className="d-flex align-items-center justify-content-center login_btn2 px-3 rounded-1 py-1 fw-light getStartedBtn position-absolute"
      >
        {" "}
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

      <Main1/>
      <Main2/>
    </section>
  );
}

export default Home;
