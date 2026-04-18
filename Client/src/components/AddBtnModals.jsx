import React, { useState } from "react";
import CustomDropdown from "./CustomDropdown";
import { toast } from "react-toastify";
import { ModalForm } from "./CustomModal";

// ADD DEPARTMENT MODAL
const AddDepartmentModal = ({ isOpen, onClose }) => {
  const [form, setForm] = useState({ name: "", code: "" });
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = () => {
    if (!form.name || !form.code) {
      toast.error("Please fill all required fields.");
      return;
    }

    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      console.log("Department Data:", form);
      toast.success(`${form.code} Department added successfully.`);
      setForm({ name: "", code: "" }); // Reset
      onClose();
    }, 1000);
  };

  return (
    <ModalForm
      isOpen={isOpen}
      onClose={onClose}
      title="Add Department"
      description="Create a new academic department."
      onSubmit={handleSubmit}
      isProcessing={isProcessing}
      submitText="Save Department"
    >
      <div className="mb-4">
        <label
          className="form-label fw-bold text-dark small text-uppercase"
          style={{ letterSpacing: "0.5px" }}
        >
          Department Name *
        </label>
        <input
          type="text"
          className="form-control form-control-lg border bg-light fs-6"
          placeholder="e.g. Computer Science and Engineering"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          autoFocus
        />
      </div>
      <div className="mb-2">
        <label
          className="form-label fw-bold text-dark small text-uppercase"
          style={{ letterSpacing: "0.5px" }}
        >
          Department Code *
        </label>
        <input
          type="text"
          className="form-control form-control-lg border bg-light text-uppercase fs-6"
          placeholder="e.g. CSE"
          maxLength={5}
          value={form.code}
          onChange={(e) =>
            setForm({ ...form, code: e.target.value.toUpperCase() })
          }
        />
        <div className="form-text small mt-2">
          A short, unique identifier (max 5 characters).
        </div>
      </div>
    </ModalForm>
  );
};

// ADD SUBJECT MODAL
const AddSubjectModal = ({
  isOpen,
  onClose,
  deptDropdownData,
  subjectTypeDropdownData,
  semDropdownData,
}) => {
  const [form, setForm] = useState({
    name: "",
    code: "",
    deptCode: "",
    type: "",
    credits: "",
    sem: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);

  // Exclude "All Departments" and "All Types" from the form dropdowns
  const formDeptData = [
    {
      name: "Department",
      options: deptDropdownData[0].options.filter(
        (opt) => !opt.includes("All"),
      ),
    },
  ];
  const formSemData = [
    {
      name: "Semester",
      options: semDropdownData[0].options.filter(
        (opt) => !opt.includes("All"),
      ),
    },
  ];
  const formTypeData = [
    {
      name: "Type",
      options: subjectTypeDropdownData[0].options.filter(
        (opt) => !opt.includes("All"),
      ),
    },
  ];

  const handleSubmit = () => {
    if (
      !form.name ||
      !form.code ||
      !form.deptCode ||
      !form.type ||
      !form.credits
    ) {
      toast.error("Please fill all required fields.");
      return;
    }

    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      console.log("Subject Data:", form);
      toast.success(`${form.code} added to Subject Registry.`);
      setForm({ name: "", code: "", deptCode: "", type: "", credits: "" });
      onClose();
    }, 1000);
  };

  return (
    <ModalForm
      isOpen={isOpen}
      onClose={onClose}
      title="Add Subject"
      description="Register a new subject into the curriculum."
      onSubmit={handleSubmit}
      isProcessing={isProcessing}
      submitText="Register Subject"
    >
      <div className="d-flex gap-4">
        <div className="inputName col-7">
          <label
          className="form-label fw-bold text-dark small text-uppercase"
          style={{ letterSpacing: "0.5px" }}
        >
          Subject Name*
        </label>
        <input
          type="text"
          className="form-control form-control-lg border bg-light fs-6"
          placeholder="e.g. Data Structures & Algorithms"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          autoFocus
        />
        </div>
        <div className="mb-4 col position-relative" style={{ zIndex: 10 }}>
          <label
            className="form-label fw-bold text-dark small text-uppercase"
            style={{ letterSpacing: "0.5px" }}
          >
            Owning Semester*
          </label>
          <CustomDropdown
            dropdownData={formSemData}
            selectedValue={form.sem || "Select Semester"}
            onSelect={(_, val) => setForm({ ...form, sem: val })}
          />
        </div>
      </div>

      <div className="dropDowns d-flex gap-3 mb-4">
        <div className="col position-relative" style={{ zIndex: 10 }}>
          <label
            className="form-label fw-bold text-dark small text-uppercase"
            style={{ letterSpacing: "0.5px" }}
          >
            Owning Department*
          </label>
          <CustomDropdown
            dropdownData={formDeptData}
            selectedValue={form.deptCode || "Select Department"}
            onSelect={(_, val) => setForm({ ...form, deptCode: val })}
          />
        </div>

        <div className="col position-relative" style={{ zIndex: 5 }}>
          <label
            className="form-label fw-bold text-dark small text-uppercase"
            style={{ letterSpacing: "0.5px" }}
          >
            Subject Type*
          </label>
          <CustomDropdown
            dropdownData={formTypeData}
            selectedValue={form.type || "Select Type"}
            onSelect={(_, val) => setForm({ ...form, type: val })}
          />
        </div>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-8">
          <label
            className="form-label fw-bold text-dark small text-uppercase"
            style={{ letterSpacing: "0.5px" }}
          >
            Subject Code*
          </label>
          <input
            type="text"
            className="form-control form-control-lg border bg-light text-uppercase fs-6"
            placeholder="e.g. CS301"
            value={form.code}
            onChange={(e) =>
              setForm({ ...form, code: e.target.value.toUpperCase() })
            }
          />
        </div>
        <div className="col-4">
          <label
            className="form-label fw-bold text-dark small text-uppercase"
            style={{ letterSpacing: "0.5px" }}
          >
            Credits*
          </label>
          <input
            type="number"
            className="form-control form-control-lg border bg-light fs-6"
            placeholder="e.g. 4"
            min="1"
            max="6"
            value={form.credits}
            onChange={(e) => setForm({ ...form, credits: e.target.value })}
          />
        </div>
      </div>
    </ModalForm>
  );
};

// ADD BATCH & SECTIONS MODAL
const AddBatchModal = ({
  isOpen,
  onClose,
  deptDropdownData,
  semDropdownData,
}) => {
  const [form, setForm] = useState({ name: "", deptCode: "", sem: "" });
  const [sections, setSections] = useState([]);
  const [sectionInput, setSectionInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const formDeptData = [
    {
      name: "Department",
      options: deptDropdownData[0].options.filter(
        (opt) => !opt.includes("All"),
      ),
    },
  ];
  const formSemData = [
    {
      name: "Semester",
      options: semDropdownData[0].options.filter((opt) => !opt.includes("All")),
    },
  ];

  const handleAddSection = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const val = sectionInput.trim().toUpperCase();
      if (val && !sections.includes(val)) {
        setSections([...sections, val]);
      }
      setSectionInput("");
    }
  };

  const handleRemoveSection = (sectionToRemove) => {
    setSections(sections.filter((s) => s !== sectionToRemove));
  };

  const handleSubmit = () => {
    if (!form.name || !form.deptCode || !form.sem || sections.length === 0) {
      toast.error("Please fill all fields and add at least one section.");
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      console.log("Batch Data:", { ...form, sections });
      toast.success(
        `${form.name} Batch created with ${sections.length} sections.`,
      );
      setForm({ name: "", deptCode: "", sem: "" });
      setSections([]);
      onClose();
    }, 1000);
  };

  return (
    <ModalForm
      isOpen={isOpen}
      onClose={onClose}
      title="Add Batch"
      description="Register a new student batch and define its sections."
      onSubmit={handleSubmit}
      isProcessing={isProcessing}
      submitText="Create Batch"
    >
      <div className="mb-4">
        <label
          className="form-label fw-bold text-dark small text-uppercase"
          style={{ letterSpacing: "0.5px" }}
        >
          Batch Name/Year *
        </label>
        <input
          type="text"
          className="form-control form-control-lg border bg-light fs-6"
          placeholder="e.g. 2024-2028"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          autoFocus
        />
      </div>

      <div className="row g-3 mb-4 position-relative" style={{ zIndex: 10 }}>
        <div className="col-6">
          <label
            className="form-label fw-bold text-dark small text-uppercase"
            style={{ letterSpacing: "0.5px" }}
          >
            Department *
          </label>
          <CustomDropdown
            dropdownData={formDeptData}
            selectedValue={form.deptCode || "Select Dept"}
            onSelect={(_, val) => setForm({ ...form, deptCode: val })}
          />
        </div>
        <div className="col-6">
          <label
            className="form-label fw-bold text-dark small text-uppercase"
            style={{ letterSpacing: "0.5px" }}
          >
            Current Semester *
          </label>
          <CustomDropdown
            dropdownData={formSemData}
            selectedValue={form.sem || "Select Sem"}
            onSelect={(_, val) => setForm({ ...form, sem: val })}
          />
        </div>
      </div>

      <div className="mb-2">
        <label
          className="form-label fw-bold text-dark small text-uppercase"
          style={{ letterSpacing: "0.5px" }}
        >
          Sections *
        </label>
        <div className="p-3 bg-light border rounded-3 min-vh-25">
          {/* Tag Display Area */}
          <div className="d-flex flex-wrap gap-2 mb-2">
            {sections.map((sec) => (
              <span
                key={sec}
                className="badge bg-dark text-white fw-light d-flex align-items-center gap-2 px-3 py-2"
                style={{ fontSize: "0.85rem" }}
              >
                Section {sec}
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  style={{ width: "0.5em", height: "0.5em" }}
                  onClick={() => handleRemoveSection(sec)}
                ></button>
              </span>
            ))}
          </div>
          {/* Input Area */}
          <input
            type="text"
            className="form-control border-0 bg-light px-3 shadow-none"
            style={{ boxShadow: "none", outline: "none" }}
            placeholder={
              sections.length === 0
                ? "Type section letter (e.g. 'A') and press Enter..."
                : "Add another section..."
            }
            value={sectionInput}
            onChange={(e) => {
              const value = e.target.value.toUpperCase().slice(0, 1); // 👈 only 1 char
              setSectionInput(value);
            }}
            onKeyDown={handleAddSection}
          />
        </div>
      </div>
    </ModalForm>
  );
};

// ALLOCATE FACULTY MODAL
const AllocateFacultyModal = ({ isOpen, onClose }) => {
  const [form, setForm] = useState({ faculty: "", subject: "", batch: "" });
  const [isProcessing, setIsProcessing] = useState(false);

  // Mocks representing data pulled from your DB
  const facultyList = [
    {
      name: "Faculty",
      options: ["Dr. Alok Sharma", "Prof. Neha Gupta", "Dr. Sunita Verma"],
    },
  ];
  const subjectList = [
    {
      name: "Subject",
      options: [
        "Data Structures (CS301)",
        "Web Dev (IT402)",
        "Database Systems (CS305)",
      ],
    },
  ];
  const batchList = [
    {
      name: "Batch",
      options: [
        "2024-2028 CSE",
        "2025-2029 CSE",
        "2025-2029 IT",
      ],
    },
  ];

  const handleSubmit = () => {
    if (!form.faculty || !form.subject || !form.batch) {
      toast.error("Please complete the allocation matrix.");
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      toast.success(`Allocation saved successfully.`);
      setForm({ faculty: "", subject: "", batch: "" });
      onClose();
    }, 1000);
  };

  return (
    <ModalForm
      isOpen={isOpen}
      onClose={onClose}
      title="Allocate Faculty"
      description="Assign a faculty member to teach a specific subject and batch."
      onSubmit={handleSubmit}
      isProcessing={isProcessing}
      submitText="Confirm Allocation"
    >
      <div className="mb-4 position-relative" style={{ zIndex: 12 }}>
        <label
          className="form-label fw-bold text-dark small text-uppercase"
          style={{ letterSpacing: "0.5px" }}
        >
          Select Faculty*
        </label>
        <CustomDropdown
          dropdownData={facultyList}
          selectedValue={form.faculty || "Choose Faculty"}
          onSelect={(_, val) => setForm({ ...form, faculty: val })}
        />
      </div>

      <div className="mb-4 position-relative" style={{ zIndex: 11 }}>
        <label
          className="form-label fw-bold text-dark small text-uppercase"
          style={{ letterSpacing: "0.5px" }}
        >
          Assign Subject*
        </label>
        <CustomDropdown
          dropdownData={subjectList}
          selectedValue={form.subject || "Choose Subject"}
          onSelect={(_, val) => setForm({ ...form, subject: val })}
        />
      </div>

      <div className="mb-2 position-relative" style={{ zIndex: 10 }}>
        <label
          className="form-label fw-bold text-dark small text-uppercase"
          style={{ letterSpacing: "0.5px" }}
        >
          Target Batch*
        </label>
        <CustomDropdown
          dropdownData={batchList}
          selectedValue={form.batch || "Choose Batch"}
          onSelect={(_, val) => setForm({ ...form, batch: val })}
        />
      </div>
    </ModalForm>
  );
};

export {
  AddDepartmentModal,
  AddSubjectModal,
  AddBatchModal,
  AllocateFacultyModal
};
