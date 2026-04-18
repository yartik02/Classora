import React, { useState } from "react";
import "./AdminDash.css"; 
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ICONS = {
  chevronDown: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>,
  close: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>,
  check: <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-badge-check-icon lucide-badge-check"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><path d="m9 12 2 2 4-4"/></svg>,
  ban: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m4.9 4.9 14.2 14.2"/></svg>,
  shield: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="M8 12h.01"/><path d="M12 12h.01"/><path d="M16 12h.01"/></svg>
};

const MOCK_APPEALS = [
  {
    _id: "ap1",
    name: "Rahul Sharma",
    rollno: "21CS042",
    className: "B.Tech",
    branch: "CSE",
    email: "rahul.21cs@jmieti.edu.in",
    suspensionDetails: {
      reason: "Repeated submission of plagiarized code in Data Structures (CS301). Ignored two previous warnings.",
      appeal: {
        appealText: "I deeply apologize for my actions. I was overwhelmed with family issues and made a terrible decision to copy the assignment. I understand the severity of this and promise it will never happen again. Please allow me to submit my own work."
      }
    }
  },
  {
    _id: "ap2",
    name: "Priya Verma",
    rollno: "22IT018",
    className: "B.Tech",
    branch: "IT",
    email: "priya.22it@jmieti.edu.in",
    suspensionDetails: {
      reason: "Inappropriate and abusive language used in the assignment peer-review comments.",
      appeal: {
        appealText: "I am writing to sincerely apologize for my unprofessional behavior in the review section. I lost my temper over a misunderstanding. I have reached out to apologize to the student personally. I request you to restore my access."
      }
    }
  },
];

const TABLE_HEADERS = [
  { label: "", cls: "ps-4" },
  { label: "Student Identity", cls: "" },
  { label: "Academic Info", cls: "" },
  { label: "Status", cls: "text-center" },
  { label: "Review", cls: "text-end pe-4" }
];

const getInitials = (name) => {
  const parts = name.trim().split(" ");
  return parts.length >= 2 ? `${parts[0][0]}${parts[1][0]}`.toUpperCase() : name.substring(0, 2).toUpperCase();
};

const SuspensionAppeals = () => {
  const [appeals, setAppeals] = useState(MOCK_APPEALS);
  const [expandedId, setExpandedId] = useState(null);
  
  const [modalConfig, setModalConfig] = useState({ isOpen: false, type: "", studentId: null });
  const [adminRemarks, setAdminRemarks] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const toggleRow = (id) => {
    setExpandedId((prevId) => (prevId === id ? null : id));
  };

  const closeActionModal = () => {
    setModalConfig({ isOpen: false, type: "", studentId: null });
    setAdminRemarks("");
  };

  const handleProcessAppeal = (e) => {
    e.preventDefault();
    if (!adminRemarks.trim()) {
      toast.error("Please provide remarks for this decision.");
      return;
    }

    setIsProcessing(true);

    // Simulate API Delay
    setTimeout(() => {
      setAppeals(prev => prev.filter(student => student._id !== modalConfig.studentId));
      toast.success(`Appeal ${modalConfig.type === "Approve" ? "approved" : "rejected"} successfully.`);
      setIsProcessing(false);
      closeActionModal();
    }, 800);
  };

  return (
    <div className="appeals-container fade-in position-relative">

      {/* HEADER */}
      <div className="text-center mt-5 mb-4">
        <h1 className="fw-bolder text-dark mb-2" style={{ letterSpacing: "-0.5px" }}>Suspension Appeals</h1>
        <p className="text-muted fw-medium fs-6">Review and process student appeals for account unsuspension.</p>
      </div>

      {/* MAIN CARD */}
      <div className="card px-4 px-md-5 border-0 pb-5">
        
        {appeals.length > 0 && (
          <div className="d-flex justify-content-between align-items-end mb-3 px-1">
            <span className="text-secondary fw-bold text-uppercase" style={{ fontSize: "0.8rem", letterSpacing: "0.5px" }}>
              Pending Queue
            </span>
            <span className="badge bg-danger bg-opacity-25 fw-semibold text-danger rounded-pill px-3 py-2">{appeals.length} Action(s) Required</span>
          </div>
        )}

        <div className="bg-light rounded-4 overflow-hidden border">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  {TABLE_HEADERS.map(({ label, cls }, idx) => (
                    <th key={idx} className={`text-uppercase text-muted py-3 border-bottom-0 ${cls}`} style={{ fontSize: "0.75rem", letterSpacing: "0.08em" }}>{label}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {appeals.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-5">
                      <div className="text-success mb-2">{ICONS.check}</div>
                      <p className="text-muted m-0 fw-medium">The queue is empty. No pending appeals to review.</p>
                    </td>
                  </tr>
                ) : (
                  appeals.map((student) => {
                    const isExpanded = expandedId === student._id;

                    return (
                      <React.Fragment key={student._id}>
                        {/* Parent Row */}
                        <tr 
                          onClick={() => toggleRow(student._id)} 
                          style={{ cursor: "pointer" }}
                          className={isExpanded ? "bg-light" : ""}
                        >
                          <td className="ps-4 text-secondary border-0" style={{ width: "40px" }}>
                            <div className="d-flex align-items-center justify-content-center bg-white border rounded-circle shadow-sm" style={{ width: "24px", height: "24px", transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>
                              {ICONS.chevronDown}
                            </div>
                          </td>
                          <td className="py-3 border-light">
                            <div className="d-flex align-items-center gap-3">
                              <div className="rounded-circle d-flex align-items-center justify-content-center fw-bold text-primary bg-primary bg-opacity-10" style={{ width: "42px", height: "42px", fontSize: "0.9rem" }}>
                                {getInitials(student.name)}
                              </div>
                              <div>
                                <div className="fw-bold text-dark">{student.name}</div>
                                <div className="text-muted small">{student.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="border-light">
                            <div className="fw-medium text-dark">{student.rollno}</div>
                            <div className="text-muted small">{student.className} • {student.branch}</div>
                          </td>
                          <td className="text-center border-light">
                            <span className="badge bg-warning bg-opacity-10 text-warning border border-warning border-opacity-25 px-3 py-1 rounded-pill">
                              Review Pending
                            </span>
                          </td>
                          <td className="text-end pe-4 border-light text-primary fw-medium small">
                            {isExpanded ? "Close" : "Review Appeal"}
                          </td>
                        </tr>

                        {/* Expanded Drawer Row */}
                        {isExpanded && (
                          <tr>
                            <td colSpan="5" className="p-0 border-bottom-0">
                              <div className="bg-white px-4 py-4 border-start border-4 border-warning">
                                
                                <div className="row g-4 mb-4">
                                  {/* Left Col: Reason */}
                                  <div className="col-md-5">
                                    <h6 className="fw-bold text-muted text-uppercase mb-2" style={{ fontSize: "0.75rem", letterSpacing: "0.5px" }}>Original Suspension Reason</h6>
                                    <div className="p-3 bg-danger bg-opacity-10 border border-danger border-opacity-25 rounded-3 text-danger" style={{ fontSize: "0.9rem" }}>
                                      {student.suspensionDetails.reason}
                                    </div>
                                  </div>
                                  
                                  {/* Right Col: Appeal */}
                                  <div className="col-md-7">
                                    <h6 className="fw-bold text-muted text-uppercase mb-2" style={{ fontSize: "0.75rem", letterSpacing: "0.5px" }}>Student's Appeal Statement</h6>
                                    <div className="p-3 bg-light border rounded-3 shadow-sm fst-italic text-dark" style={{ fontSize: "0.95rem" }}>
                                      "{student.suspensionDetails.appeal.appealText}"
                                    </div>
                                  </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="d-flex justify-content-end align-items-center gap-2 pt-3 border-top border-secondary border-opacity-25">
                                  <button
                                    className="btn btn-outline-danger px-4 d-flex align-items-center gap-2 fw-medium"
                                    onClick={() => setModalConfig({ isOpen: true, type: "Reject", studentId: student._id })}
                                  >
                                    Reject Appeal
                                  </button>
                                  <button
                                    className="btn btn-success px-4 d-flex align-items-center gap-2 fw-medium shadow-sm"
                                    onClick={() => setModalConfig({ isOpen: true, type: "Approve", studentId: student._id })}
                                  >
                                    Approve & Restore
                                  </button>
                                </div>

                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {modalConfig.isOpen && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: "rgba(15, 23, 42, 0.6)", backdropFilter: "blur(4px)", zIndex: 1050 }}>
          <div className="bg-white rounded-4 shadow-lg w-100 overflow-hidden fade-in" style={{ maxWidth: "500px" }}>
            
            <div className={`p-4 py-3 border-bottom d-flex justify-content-between align-items-center ${modalConfig.type === "Approve" ? "bg-success bg-opacity-10 border-success border-opacity-25" : "bg-danger bg-opacity-10 border-danger border-opacity-25"}`}>
              <div className="d-flex align-items-center gap-3">
                <div className={`rounded-circle d-flex align-items-center justify-content-center text-white ${modalConfig.type === "Approve" ? "bg-success" : "bg-danger"}`} style={{ width: "40px", height: "40px" }}>
                  {modalConfig.type === "Approve" ? ICONS.check : ICONS.ban}
                </div>
                <div>
                  <h5 className={`fw-bold mb-0 ${modalConfig.type === "Approve" ? "text-success" : "text-danger"}`}>
                    {modalConfig.type === "Approve" ? "Approve Appeal" : "Reject Appeal"}
                  </h5>
                </div>
              </div>
              <button className={`btn btn-link p-0 ${modalConfig.type === "Approve" ? "text-success" : "text-danger"}`} onClick={closeActionModal} disabled={isProcessing}>{ICONS.close}</button>
            </div>
            
            <form onSubmit={handleProcessAppeal} className="p-4">
              <p className="text-muted mb-4" style={{ fontSize: "0.95rem" }}>
                {modalConfig.type === "Approve" 
                  ? "You are about to lift this student's suspension. Please provide a closing remark that will be sent to the student."
                  : "You are about to permanently reject this appeal. The student will remain suspended. Provide a reason below."}
              </p>

              <div className="mb-4">
                <label className="form-label fw-bold small text-dark">Admin Remarks (Sent to Student) *</label>
                <textarea
                  className="form-control bg-light border-0 fs-6"
                  rows="4"
                  placeholder={modalConfig.type === "Approve" ? "e.g., Your appeal has been reviewed and accepted. Please ensure..." : "e.g., Your appeal does not adequately address the policy violation..."}
                  value={adminRemarks}
                  onChange={(e) => setAdminRemarks(e.target.value)}
                  required
                  disabled={isProcessing}
                ></textarea>
              </div>

              <div className="d-flex justify-content-end gap-2">
                <button type="button" className="btn btn-light fw-medium px-4 border" onClick={closeActionModal} disabled={isProcessing}>Cancel</button>
                <button type="submit" className={`btn px-4 text-white fw-bold shadow-sm ${modalConfig.type === "Approve" ? "btn-success" : "btn-danger"}`} disabled={isProcessing || !adminRemarks.trim()}>
                  {isProcessing ? "Processing..." : `Confirm ${modalConfig.type}`}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};

export default SuspensionAppeals;