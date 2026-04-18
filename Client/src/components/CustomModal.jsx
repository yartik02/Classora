import React, { useEffect, useRef } from "react";
const ICONS = {
  close: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-x-lg"
      viewBox="0 0 16 16"
    >
      <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
    </svg>
  ),
};

export const ModalForm = ({
  isOpen,
  onClose,
  title,
  description,
  onSubmit,
  isProcessing,
  submitText,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
      style={{
        backgroundColor: "rgba(15, 23, 42, 0.5)",
        backdropFilter: "blur(4px)",
        zIndex: 1050,
      }}
    >
      {/* overflow-visible is crucial here so your CustomDropdowns can break outside the modal box if needed */}
      <div
        className="bg-white rounded-4 shadow-lg w-100 overflow-hidden fade-in border"
        style={{ maxWidth: "600px" }}
      >
        {/* Modal Header */}
        <div className="p-4 border-bottom d-flex justify-content-between align-items-center bg-light">
          <div>
            <h5 className="fw-bold text-dark mb-1">{title}</h5>
            <p className="text-muted small mb-0">{description}</p>
          </div>
          <button
            type="button"
            className="btn btn-link text-secondary p-0 align-self-start"
            onClick={onClose}
            disabled={isProcessing}
            title="Close"
          >
            {ICONS.close}
          </button>
        </div>

        {/* Modal Body & Footer */}
        <form
          id={`${title.replace(/\s+/g, "-")}-form`}
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          <div className="p-4 overflow-visible">{children}</div>

          <div className="p-4 border-top bg-light bg-opacity-50 d-flex gap-2 justify-content-end">
            <button
              type="button"
              className="btn btn-light fw-medium px-4 border text-secondary"
              onClick={onClose}
              disabled={isProcessing}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-dark fw-bold px-4 shadow-sm"
              disabled={isProcessing}
            >
              {isProcessing ? "Processing..." : submitText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
