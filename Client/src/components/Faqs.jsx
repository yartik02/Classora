import React, { useState } from "react";

const faqData = [
  {
    id: "general",
    iconPath: (
      <>
        <path d="M14 21v-3a2 2 0 0 0-4 0v3" />
        <path d="M18 12h.01" />
        <path d="M18 16h.01" />
        <path d="M22 7a1 1 0 0 0-1-1h-2a2 2 0 0 1-1.143-.359L13.143 2.36a2 2 0 0 0-2.286-.001L6.143 5.64A2 2 0 0 1 5 6H3a1 1 0 0 0-1 1v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2z" />
        <path d="M6 12h.01" />
        <path d="M6 16h.01" />
        <circle cx="12" cy="10" r="2" />
      </>
    ),
    title: "General",
    questions: [
      {
        q: "What exactly is Classora?",
        a: "Classora is a digital assignment management platform designed to streamline the complete academic assignment lifecycle. It centralizes assignment creation, submission, evaluation, and result publication - eliminating paper-based processes and scattered email workflows.",
      },
      {
        q: "Will Classora replace our institution’s grading policies?",
        a: "No. Classora is built to adapt to your institution’s existing academic framework.\nIt provides structure, automation, and oversight - such as deadline tracking and rule-based penalty suggestions - while ensuring all grading authority and academic decisions remain entirely with faculty and the institution.",
      },
      {
        q: "Who owns the data submitted on Classora?",
        a: "Your institution retains full ownership and control of all academic and user data.\nClassora only provides secure, centralized storage with role-based access to ensure data safety, integrity, and organized management.",
      },
      {
        q: "Is Classora a social networking or communication platform?",
        a: "No. Classora is strictly focused on academic workflows.\nTo reduce administrative noise and maintain clarity, it avoids chat-heavy or social features and functions solely to structure and manage the assignment lifecycle.",
      },
    ],
  },
  {
    id: "faculty",
    iconPath: (
      <>
        <path d="M10 2v8l3-3 3 3V2" />
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" />
      </>
    ),
    title: "Faculty",
    questions: [
      {
        q: "Does Classora use AI to grade assignments automatically?",
        a: "No. Classora follows a semi-automated, educator-first approach.\nIt assists faculty by flagging late submissions, identifying highly similar content, and checking keyword relevance - but all grading, feedback, and final academic judgments remain fully under faculty control.",
      },
      {
        q: "How does Classora reduce faculty workload?",
        a: "Classora eliminates manual administrative tracking.\nIt automatically organizes submissions by status and timestamp, flags missed deadlines, and highlights potential duplicate content - allowing educators to focus on evaluating academic quality rather than managing logistics.",
      },
      {
        q: "Can faculty define strict rules and deadlines for assignments?",
        a: "Yes. Faculty members have complete control over assignment setup, including deadlines, submission formats, evaluation guidelines, and institutional rules applicable to each assignment.",
      },
    ],
  },
  {
    id: "students",
    iconPath: (
      <>
        <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
        <path d="M22 10v6" />
        <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
      </>
    ),
    title: "Students",
    questions: [
      {
        q: "How do I know my assignment was successfully submitted?",
        a: "Once your assignment is uploaded, Classora generates a timestamped submission record.\nYou can track submission status in real time through your personalized student dashboard.",
      },
      {
        q: "What happens if I submit an assignment late?",
        a: "Late submissions are still accepted but automatically flagged with an exact timestamp.\nAny penalties applied depend solely on the rules defined by your faculty or institution.",
      },
      {
        q: "Where can I view my marks and faculty feedback?",
        a: "After evaluation, your grades and any written feedback are published directly to your student dashboard for immediate and transparent access.",
      },
    ],
  },
  {
    id: "technical",
    iconPath: (
      <>
        <path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915" />
        <circle cx="12" cy="12" r="3" />
      </>
    ),
    title: "Technical",
    questions: [
      {
        q: "Is Classora secure and reliable for institutional use?",
        a: "Absolutely. Classora is built on a modern three-tier architecture using secure APIs and a structured database layer.\nThis ensures strong data protection, system stability, scalability, and performance for institutions of varying sizes.",
      },
      {
        q: "Can Classora align with institutional compliance and data policies?",
        a: "Yes. Classora is designed to adapt to institutional policies regarding data access, retention, and academic governance - supporting compliance without disrupting existing systems or rules.",
      },
      {
        q: "How can our institution request a demo or discuss custom features?",
        a: "You can reach out directly through the contact form on this page. Our team will schedule a walkthrough to demonstrate how Classora aligns with your academic workflows.",
      },
    ],
  },
];

const FaqSection = () => {
  const [activeCategory, setActiveCategory] = useState(faqData[0].id);

  const activeFaqs =
    faqData.find((cat) => cat.id === activeCategory)?.questions || [];

  return (
    <section className="faq-section-bg py-5" id="faqs">
      <div className="container py-5">
        {/* Sleek Header */}
        <div className="text-center mb-4">
          <span
            className="bg-white bg-opacity-25 text-white mx-auto fw-normal mb-5 p-2 px-3 rounded-pill fs-6 d-flex align-items-center justify-content-center"
            style={{ width: "fit-content" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="me-2"
            >
              <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
              <line x1="12" x2="12.01" y1="17" y2="17" />
            </svg>
            Got Questions?
          </span>
          <h2 className="fw-bold mb-3 display-6 text-light">
            Frequently Asked Questions
          </h2>
          <p
            className="mx-auto fw-light opacity-75 fs-6 text-light"
            style={{ maxWidth: "650px" }}
          >
            Find answers to common questions about how Classora integrates with
            your institution, supports educators, and protects your data.
          </p>
        </div>

        {/* Premium Segmented Tabs */}
        <div className="text-center rounded-5 p-5" style={{backgroundColor:"#0066ff2c"}}>
          <div
            className="btnGrp border bg-secondary-subtle p-1 rounded mx-auto d-flex justify-content-center gap-2 mb-5"
            style={{ width: "fit-content" }}
          >
            {faqData.map((category) => (
              <button
                className={`btn ${activeCategory === category.id ? "active" : ""} border-0 bg-white d-flex align-items-center justify-content-center`}
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="me-1"
                >
                  {category.iconPath}
                </svg>
                <p className="m-0 btnText">{category.title}</p>
              </button>
            ))}
          </div>

        {/* Floating Card Accordion Content */}
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10">
            <div className="accordion faq-accordion" id="classoraFaqAccordion">
              {activeFaqs.map((faq, index) => (
                <div className="accordion-item rounded-4 bg-white mb-3" key={index}>
                  <h2 className="accordion-header" id={`heading${index}`}>
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#collapse${index}`}
                      aria-expanded="false"
                      aria-controls={`collapse${index}`}
                    >
                      {faq.q}
                    </button>
                  </h2>
                  <div
                    id={`collapse${index}`}
                    className="accordion-collapse collapse"
                    aria-labelledby={`heading${index}`}
                    data-bs-parent="#classoraFaqAccordion"
                  >
                    <div className="accordion-body text-start fs-6 fw-light text-muted">
                      {/* Properly renders line breaks from the data array */}
                      {faq.a.split("\n").map((line, i) => (
                        <span key={i} className="d-block mb-2">
                          {line}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
        </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
