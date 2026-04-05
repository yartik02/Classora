import React, { useEffect, useState } from "react";
import "./ContactUs.css";
import FaqSection from "../components/Faqs";
// import { toast } from "react-toastify";
// import { useAuth } from "../store/auth";

const contactInfo = [
  {
    path: "M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z",
    classValue: "bi bi-telephone",
    color: "#155dfc",
    backcolor: "#dbeafe",
    title: "Phone",
    details: ["+91 9876543210", "Mon - Fri , 9AM - 5PM"],
  },
  {
    path: "M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z",
    color: "#ae00ff",
    backcolor: "#ae00ff2d",
    classValue: "bi bi-envelope",
    title: "Email",
    details: ["info@classora.in", "We'll respond within 24 hours"],
  },
  {
    path: "M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0",
    classValue: "bi bi-clock",
    color: "#f54a00",
    backcolor: "#ffedd4",
    title: "Office Hours",
    details: [
      "Mon - Friday: 9:50 AM - 5:00 PM",
      "Working Saturday: 10:00 AM - 5:00 PM",
    ],
  },
];

const socialLinks = [
  {
    path: "M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951",
    label: "Facebook",
    claavalue: "bi bi-facebook",
    color: "#4f46e5",
    url: "https://www.facebook.com/jmietiinstitute",
  },
  {
    path: "M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z",
    label: "Twitter or X",
    classValue: "bi bi-twitter-x",
    color: "#050a2b",
    url: "https://x.com/jmietiradaur",
  },
  {
    path: "M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334",
    label: "Instagram",
    classValue: "bi bi-instagram",
    color: "rgb(255, 48, 245)",
    url: "https://www.instagram.com/jmietiofficial/",
  }
];

const inputFields1 = [
  {
    id: "name",
    type: "text",
    name: "name",
    placeholder: "Enter your name...",
  },
  {
    id: "email",
    type: "email",
    name: "email",
    placeholder: "Enter your Email...",
  },
];

const messageFields = [
  {
    id: "subject",
    type: "text",
    name: "subject",
    placeholder: "Enter your title of inquiry...",
    divClass: "mb-3 text-start",
    element: "input",
  },
  {
    id: "message",
    name: "message",
    placeholder: "Enter your message...",
    divClass: "mb-4 text-start",
    element: "textarea",
    rows: 1,
  },
];

function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  //   const {user} = useAuth();

  const handleClick = (url) => {
    window.open(url, "_blank");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  //   useEffect(() => {
  //   if (user) {
  //     setFormData((prev) => ({
  //       ...prev,
  //       name: user.name,
  //       email: user.email,
  //     }));
  //   }
  // }, [user]);

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     // console.log(formData);

  //     if (!formData.name || !formData.email || !formData.subject || !formData.message) {
  //       toast.error("Can’t submit empty fields, fill all!");
  //       return;
  //     }

  //         try {
  //           const response = await fetch(
  //             `${import.meta.env.VITE_API_BASE_URL}/api/auth/contactUs`,
  //             {
  //               method: "POST",
  //               headers: { "Content-Type": "application/json" },
  //               body: JSON.stringify({
  //                 name: formData.name,
  //                 email: formData.email,
  //                 subject: formData.subject,
  //                 message: formData.message,
  //               }),
  //             },
  //           );

  //           if (response.ok) {
  //             const res_Data = await response.json(); // Parse success data

  //             setFormData({ name: "", email: "", subject: "", message: "" });
  //             toast.success("Message sent successfully!", { autoClose: 2000 });
  //             // console.log(res_Data);
  //           } else {
  //             // If the response was not ok, parse the error message from the body.
  //             const errorData = await response.json();
  //             toast.error(errorData.msg || "Message not sent, please try again!");
  //           }
  //         } catch (err) {
  //         console.error("Error during contactUs:", err);
  //           toast.error("Message not sent, Network error occurred!");
  //         }

  //   };

  return (
    <section className="ContactUs mt-5 pt-5">
      <div
        className="bg-white bg-opacity-25 text-white mx-auto fw-normal mb-5 p-2 px-3 rounded-pill fs-6 d-flex align-items-center justify-content-center"
        style={{ width: "fit-content" }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width={24}
          className="me-2"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          stroke="currentColor"
        >
          <path d="M16 2v2" />
          <path d="M7 22v-2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2" />
          <path d="M8 2v2" />
          <circle cx="12" cy="11" r="3" />
          <rect x="3" y="4" width="18" height="18" rx="2" />
        </svg>
        Contact Us
      </div>

      <div className="texts mb-5 mx-auto text-light">
        <h6 className="display-6 heading fw-bold text-center">
          Let's get in <span className="text-gradient">Touch</span>
        </h6>
        <p className="fs-6 fw-light opacity-75 mb-4 text-center mx-auto w-50">
          Have questions about Classora? Need assistance with your
          account? We're here to help! Reach out to us through any of the
          channels below.
        </p>
      </div>

      <section className="contact-section" style={{ width: "100%" }}>
        <div className="border bg-light slantedSection pb-5">
          <div className="row container g-5 my-5 py-4 mx-auto" style={{ width: "100%" }}>
            {/* --- Left Column (Sticky Form) --- */}
            <div className="col-lg-6">
              <div className="sticky-form-wrapper bg-white">
                <h3 className="fw-bold mb-2">Send us a Message</h3>
                <p className="form-subtitle mb-4 text-muted fw-light mx-auto lh-0">
                  Fill out the form below and we'll get back to you as soon as
                  possible.
                </p>
                <form>
                  <div className="row text-start">
                    {inputFields1.map((field, index) => (
                      <div className="col-md-6 mb-3" key={index}>
                        <input
                          id={field.id}
                          type={field.type}
                          placeholder={field.placeholder}
                          // required
                          name={field.name}
                          value={formData[field.name]}
                          onChange={handleChange}
                          className="form-control p-3"
                          style={{ backgroundColor: "#fafaff" }}
                        />
                      </div>
                    ))}
                  </div>
                  {messageFields.map((field, index) => (
                    <div className={field.divClass} key={index}>
                      {field.element === "input" ? (
                        <input
                          id={field.id}
                          type={field.type}
                          placeholder={field.placeholder}
                          name={field.name}
                          value={formData[field.name]}
                          onChange={handleChange}
                          className="form-control p-3"
                          style={{ backgroundColor: "#fafaff" }}
                        />
                      ) : (
                        <textarea
                          id={field.id}
                          placeholder={field.placeholder}
                          name={field.name}
                          rows={field.rows}
                          value={formData[field.name]}
                          onChange={handleChange}
                          className="form-control p-3"
                          style={{ backgroundColor: "#fafaff" }}
                        />
                      )}
                    </div>
                  ))}
                  <button type="submit" className="login_btn2 py-2 rounded w-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      width="18"
                      height="18"
                      className="bi bi-send me-2"
                    >
                      <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z"></path>
                    </svg>
                    Send Message
                  </button>
                </form>
              </div>
            </div>

            {/* --- Right Column (Scrollable Info) --- */}
            <div className="col-lg-6">
              <div className="scrollable-info-wrapper ms-lg-5 ps-lg-5">
                {/* Contact Info Section */}
                <div className="info-section shadow-sm mb-5 text-start bg-white p-5 rounded-5">
                  <h4 className="text-start mb-4">Contact Information</h4>
                  {contactInfo.map((item, index) => (
                    <div className="contact-item mb-4" key={index}>
                      <div
                        className="contact-icon rounded-4 p-3"
                        style={{ backgroundColor: item.backcolor }}
                      >
                        <svg
                          viewBox="0 0 16 16"
                          className={item.classValue}
                          fill={item.color}
                          width="22"
                          height="22"
                        >
                          <path d={item.path}></path>
                        </svg>
                      </div>
                      <div className="contact-details">
                        <p className="mb-0" style={{ fontWeight: "600" }}>
                          {item.title}
                        </p>
                        {item.details.map((line, i) => (
                          <span className="text-muted fw-light" key={i}>
                            {line}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                {/* Immediate Help Section */}
                <div className="info-card rounded-end-5 mb-5 text-start">
                  <h5 className="fw-normal d-flex align-items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="25"
                      fill="currentColor"
                      className="bi bi-headphones me-1 mb-1"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 3a5 5 0 0 0-5 5v1h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V8a6 6 0 1 1 12 0v5a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1V8a5 5 0 0 0-5-5" />
                    </svg>
                    Need Immediate Help?
                  </h5>
                  <p className="text-muted">
                    For urgent issues or technical problems, you can:
                  </p>
                  <ul>
                    <li>Call our emergency hotline: +91 9876543210</li>
                    <li>Visit our FAQ section for common questions</li>
                  </ul>
                </div>
                {/* Follow Us Section */}
                <div className="info-section shadow-lg text-start p-5 bg-white rounded-5">
                  <h5
                    className="d-flex align-items-center fw-normal p-2 px-3 rounded-5 "
                    style={{
                      width: "fit-content",
                      backgroundColor: "#eef2ffcb",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      fill="currentColor"
                      className="bi bi-globe2 me-2 "
                      viewBox="0 0 16 16"
                    >
                      <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m7.5-6.923c-.67.204-1.335.82-1.887 1.855q-.215.403-.395.872c.705.157 1.472.257 2.282.287zM4.249 3.539q.214-.577.481-1.078a7 7 0 0 1 .597-.933A7 7 0 0 0 3.051 3.05q.544.277 1.198.49zM3.509 7.5c.036-1.07.188-2.087.436-3.008a9 9 0 0 1-1.565-.667A6.96 6.96 0 0 0 1.018 7.5zm1.4-2.741a12.3 12.3 0 0 0-.4 2.741H7.5V5.091c-.91-.03-1.783-.145-2.591-.332M8.5 5.09V7.5h2.99a12.3 12.3 0 0 0-.399-2.741c-.808.187-1.681.301-2.591.332zM4.51 8.5c.035.987.176 1.914.399 2.741A13.6 13.6 0 0 1 7.5 10.91V8.5zm3.99 0v2.409c.91.03 1.783.145 2.591.332.223-.827.364-1.754.4-2.741zm-3.282 3.696q.18.469.395.872c.552 1.035 1.218 1.65 1.887 1.855V11.91c-.81.03-1.577.13-2.282.287zm.11 2.276a7 7 0 0 1-.598-.933 9 9 0 0 1-.481-1.079 8.4 8.4 0 0 0-1.198.49 7 7 0 0 0 2.276 1.522zm-1.383-2.964A13.4 13.4 0 0 1 3.508 8.5h-2.49a6.96 6.96 0 0 0 1.362 3.675c.47-.258.995-.482 1.565-.667m6.728 2.964a7 7 0 0 0 2.275-1.521 8.4 8.4 0 0 0-1.197-.49 9 9 0 0 1-.481 1.078 7 7 0 0 1-.597.933M8.5 11.909v3.014c.67-.204 1.335-.82 1.887-1.855q.216-.403.395-.872A12.6 12.6 0 0 0 8.5 11.91zm3.555-.401c.57.185 1.095.409 1.565.667A6.96 6.96 0 0 0 14.982 8.5h-2.49a13.4 13.4 0 0 1-.437 3.008M14.982 7.5a6.96 6.96 0 0 0-1.362-3.675c-.47.258-.995.482-1.565.667.248.92.4 1.938.437 3.008zM11.27 2.461q.266.502.482 1.078a8.4 8.4 0 0 0 1.196-.49 7 7 0 0 0-2.275-1.52c.218.283.418.597.597.932m-.488 1.343a8 8 0 0 0-.395-.872C9.835 1.897 9.17 1.282 8.5 1.077V4.09c.81-.03 1.577-.13 2.282-.287z" />
                    </svg>
                    Follow Us
                  </h5>
                  <p className="text-muted">
                    Stay updated with the latest news and announcements:
                  </p>
                  <div className="social-links p-auto">
                    {socialLinks.map((link, index) => (
                      <p
                        aria-label={link.label}
                        title={link.label}
                        className="social-icon"
                        key={index}
                        onClick={() => handleClick(link.url)}
                      >
                        <svg
                          viewBox="0 0 16 16"
                          fill={link.color}
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          className={link.classValue}
                        >
                          <path d={link.path} />
                        </svg>
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    <FaqSection/>
      </section>

      {/* <section className="FAQ">
      </section> */}
    </section>
  );
}

export default ContactUs;
