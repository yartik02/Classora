import React, { useState, useMemo } from "react";
import "./AdminDash.css"; 
import CustomDropdown from "../../../components/CustomDropdown";
import { AddDepartmentModal, AddSubjectModal, AddBatchModal, AllocateFacultyModal } from "../../../components/AddBtnModals.jsx";

const ICONS = {
  departments: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M12 6h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M16 6h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/><path d="M8 6h.01"/><path d="M9 22v-3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3"/><rect x="4" y="2" width="16" height="20" rx="2"/></svg>,
  batches: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M16 2v4"/><path d="M3 10h18"/><path d="M8 2v4"/><path d="M17 14h-6"/><path d="M13 18H7"/><path d="M7 14h.01"/><path d="M17 18h.01"/></svg>,
  subjects: <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M16.3965 5.01128C16.3963 4.93399 16.3489 4.87691 16.293 4.85406L16.2354 4.84332C13.9306 4.91764 12.5622 5.32101 10.665 6.34722V16.3716C11.3851 15.9994 12.0688 15.7115 12.7861 15.5015C13.8286 15.1965 14.9113 15.0633 16.2402 15.0435L16.2979 15.0308C16.353 15.0063 16.3965 14.9483 16.3965 14.8755V5.01128ZM3.54492 14.8765C3.54492 14.9725 3.62159 15.0422 3.70117 15.0435L4.19629 15.0562C5.94062 15.1247 7.26036 15.4201 8.65918 16.0484C8.05544 15.1706 7.14706 14.436 6.17871 14.1109V14.1099C5.56757 13.9045 5.16816 13.3314 5.16797 12.6988V4.98882C4.86679 4.93786 4.60268 4.8999 4.28223 4.87457L3.72754 4.84429C3.62093 4.84079 3.54505 4.92417 3.54492 5.01226V14.8765ZM17.7266 14.8755C17.7266 15.6314 17.1607 16.2751 16.4121 16.3628L16.2598 16.3736C15.0122 16.3922 14.0555 16.5159 13.1602 16.7779C12.2629 17.0404 11.3966 17.4508 10.3369 18.0738C10.129 18.1959 9.87099 18.1958 9.66309 18.0738C7.71455 16.9283 6.31974 16.4689 4.12988 16.3853L3.68164 16.3736C2.85966 16.3614 2.21484 15.6838 2.21484 14.8765V5.01226C2.21497 4.15391 2.93263 3.4871 3.77246 3.51519L4.39844 3.54937C4.67996 3.57191 4.92258 3.60421 5.16797 3.64214V2.51031C5.16797 1.44939 6.29018 0.645615 7.31055 1.15679L7.31152 1.15582C8.78675 1.89511 10.0656 3.33006 10.5352 4.91461C12.3595 3.98907 13.8688 3.58817 16.1924 3.51324L16.3506 3.51714C17.1285 3.5741 17.7264 4.23496 17.7266 5.01128V14.8755ZM6.49805 12.6988C6.49824 12.7723 6.5442 12.8296 6.60254 12.8492L6.96289 12.9859C7.85245 13.3586 8.68125 13.9846 9.33496 14.7496V5.5816C9.08794 4.37762 8.13648 3.1566 6.95801 2.47613L6.71582 2.34527C6.67779 2.32617 6.6337 2.32502 6.58301 2.35796C6.52946 2.39279 6.49805 2.44863 6.49805 2.51031V12.6988Z"></path></svg>,
  allocations: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16"><path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5m.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1z"/></svg>,
  plus: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>,
  search: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/></svg>,
  edit: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/></svg>,
  toggle: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m17 2 4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14"/><path d="m7 22-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/></svg>,
  chevronDown: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>,
  trash: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>,
};

const tabBtns = [
  { id: "departments", label: "Departments", icon: ICONS.departments },
  { id: "batches", label: "Batches & Sections", icon: ICONS.batches },
  { id: "subjects", label: "Subjects Registry", icon: ICONS.subjects },
  { id: "allocations", label: "Faculty Allocations", icon: ICONS.allocations },
];

const mockDepartments = [
  { id: "d1", name: "Computer Science and Engineering", code: "CSE", hod: "Prof. Sharma", isActive: true },
  { id: "d2", name: "Information Technology", code: "IT", hod: "Dr. Verma", isActive: true },
  { id: "d3", name: "Mechanical Engineering", code: "ME", hod: "Prof. Singh", isActive: false },
  { id: "d4", name: "Civil Engineering", code: "CE", hod: "Dr. Gupta", isActive: true },
];

const mockBatches = [
  { id: "b1", name: "Batch 2021-2025", deptCode: "CSE", sem: "3rd Sem", sections: ["A", "B", "C"], isActive: true },
  { id: "b2", name: "Batch 2022-2026", deptCode: "CSE", sem: "2nd Sem", sections: ["A", "B"], isActive: true },
  { id: "b3", name: "Batch 2021-2025", deptCode: "IT", sem: "3rd Sem", sections: ["A"], isActive: true },
  { id: "b4", name: "Batch 2020-2024", deptCode: "ME", sem: "4th Sem", sections: ["A", "B", "C", "D"], isActive: false },
];

const mockSubjects = [
  { id: "s1", name: "Data Structures & Algorithms", code: "CS301", deptCode: "CSE", type: "Core", credits: 4, isActive: true },
  { id: "s2", name: "Database Management Systems", code: "CS302", deptCode: "CSE", type: "Core", credits: 4, isActive: true },
  { id: "s3", name: "Cloud Computing", code: "IT405", deptCode: "IT", type: "Elective", credits: 3, isActive: true },
  { id: "s4", name: "Engineering Physics", code: "ME101", deptCode: "ME", type: "Core", credits: 3, isActive: false },
  { id: "s5", name: "Web Development Lab", code: "IT201", deptCode: "IT", type: "Lab", credits: 2, isActive: true },
];

const mockFacultyAllocations = [
  {
    id: "f1", facultyName: "Prof. Sharma", deptCode: "CSE", isActive: true,
    allocations: [
      { id: "a1", subjectName: "Data Structures & Algorithms", subjectCode: "CS301", batchName: "Batch 2021-2025 (Sec A)" },
      { id: "a2", subjectName: "Advanced Databases", subjectCode: "CS505", batchName: "Batch 2020-2024 (Sec B)" }
    ]
  },
  {
    id: "f2", facultyName: "Dr. Verma", deptCode: "IT", isActive: true,
    allocations: [
      { id: "a3", subjectName: "Cloud Computing", subjectCode: "IT405", batchName: "Batch 2021-2025 (Sec A)" }
    ]
  },
  {
    id: "f3", facultyName: "Prof. Singh", deptCode: "ME", isActive: false,
    allocations: []
  },
];

const deptDropdownData = [{ name: "Department", options: ["All Departments", ...mockDepartments.map(dept => dept.code)] }];
const subjectTypeDropdownData = [{ name: "Type", options: ["All Types", "Core", "Elective"] }];
const semDropdownData = [{ name: "Semester", options: ["All Semesters", "1st Sem", "2nd Sem", "3rd Sem", "4th Sem", "5th Sem", "6th Sem", "7th Sem", "8th Sem"] }];

const StatusBadge = ({ isActive }) => {
  const theme = isActive ? "success" : "danger";
  return (
    <span className={`badge bg-${theme} bg-opacity-10 text-${theme} px-3 py-2 rounded-pill d-inline-flex align-items-center gap-2`}>
      <span className={`bg-${theme} rounded-circle`} style={{ width: "6px", height: "6px" }}></span>
      {isActive ? "Active" : "Inactive"}
    </span>
  );
};

const SubjectTypeBadge = ({ type }) => {
  const theme = type === "Core" ? "primary" : type === "Elective" ? "info" : "warning";
  return (
    <span className={`badge bg-${theme} bg-opacity-10 text-${theme} border border-${theme} border-opacity-25 px-2 py-1 rounded-2`}>
      {type}
    </span>
  );
};

const ActionBtn = ({ icon, title }) => (
  <button className="btn btn-sm btn-light border-0 rounded-circle transition-hover text-secondary d-flex align-items-center justify-content-center" style={{ width: "36px", height: "36px" }} title={title}>
    {icon}
  </button>
);

const Toolbar = ({ searchQuery, setSearchQuery, placeholder, dropdowns, primaryActionText, onPrimaryAction }) => (
  <div className="p-4 d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
    <div className="d-flex flex-wrap flex-md-nowrap gap-2 w-100" style={{ maxWidth: dropdowns ? "800px" : "400px" }}>
      <div className="position-relative w-100">
        <span className="position-absolute top-50 translate-middle-y ms-3 text-secondary">{ICONS.search}</span>
        <input 
          type="text" 
          className="w-100 bg-secondary bg-opacity-10 border rounded-3 ps-5 py-2 fw-light focus-ring focus-ring-secondary" 
          placeholder={placeholder} 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      {dropdowns && dropdowns.map((props, idx) => (
        <div key={idx} style={{ minWidth: "220px", flexShrink: 0, zIndex: 10 }}>
          <CustomDropdown {...props} />
        </div>
      ))}
    </div>
    <button className="btn btn-outline-dark rounded-3 px-3 py-2 fw-medium d-flex align-items-center gap-1 flex-shrink-0" style={{ fontSize: "0.875rem" }}
      onClick={onPrimaryAction}
    >
      {ICONS.plus} {primaryActionText}
    </button>
  </div>
);


const DepartmentsTab = ({ isAddDeptOpen, setIsAddDeptOpen }) => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filtered = useMemo(() => mockDepartments.filter(d => 
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    d.code.toLowerCase().includes(searchQuery.toLowerCase())
  ), [searchQuery]);

  return (
    <>
      <Toolbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} placeholder="Search departments by name or code..." primaryActionText="Add Department" onPrimaryAction={() => setIsAddDeptOpen(true)} />
      <div className="table-responsive">
        <table className="table table-hover align-middle mb-0 border-top">
          <thead className="table-light" style={{fontSize:"0.875rem"}}>
            <tr>
              <th className="text-uppercase text-dark ps-4 py-3 border-bottom-0">Department Name</th>
              <th className="text-uppercase text-dark py-3 border-bottom-0">Code</th>
              <th className="text-uppercase text-dark py-3 border-bottom-0">Head of Dept.</th>
              <th className="text-uppercase text-dark py-3 border-bottom-0">Status</th>
              <th className="text-uppercase text-dark text-end pe-4 py-3 border-bottom-0">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(dept => (
              <tr key={dept.id}>
                <td className="ps-4 fw-bold text-dark border-light">{dept.name}</td>
                <td className="border-light"><span className="badge bg-secondary bg-opacity-10 text-dark border border-secondary border-opacity-25 px-2 py-1 rounded">{dept.code}</span></td>
                <td className="text-secondary fw-medium border-light">{dept.hod || "Not Assigned"}</td>
                <td className="border-light"><StatusBadge isActive={dept.isActive} /></td>
                <td className="text-end pe-4 border-light">
                  <div className="d-flex justify-content-end gap-2">
                    <ActionBtn icon={ICONS.edit} title="Edit" />
                    <ActionBtn icon={ICONS.toggle} title={dept.isActive ? "Deactivate" : "Activate"} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

const BatchesTab = ({ isAddBatchOpen, setIsAddBatchOpen }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [deptFilter, setDeptFilter] = useState("");

  const filtered = useMemo(() => mockBatches.filter(b => 
    b.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
    (deptFilter === "" || b.deptCode === deptFilter)
  ), [searchQuery, deptFilter]);

  return (
    <>
      <Toolbar 
        searchQuery={searchQuery} setSearchQuery={setSearchQuery} placeholder="Search batches..." primaryActionText="Add Batch"
        dropdowns={[{ dropdownData: deptDropdownData, selectedValue: deptFilter || "All Departments", onSelect: (_, v) => setDeptFilter(v === "All Departments" ? "" : v) }] }
        onPrimaryAction={() => setIsAddBatchOpen(true)}
      />
      <div className="table-responsive">
        <table className="table table-hover align-middle mb-0 border-top">
          <thead className="table-light" style={{fontSize:"0.875rem"}}>
            <tr>
              <th className="text-uppercase text-dark ps-4 py-3 border-bottom-0">Batch Name</th>
              <th className="text-uppercase text-dark py-3 border-bottom-0">Department</th>
              <th className="text-uppercase text-dark py-3 border-bottom-0">Current Semester</th>
              <th className="text-uppercase text-dark py-3 border-bottom-0">Sections</th>
              <th className="text-uppercase text-dark py-3 border-bottom-0">Status</th>
              <th className="text-uppercase text-dark text-end pe-4 py-3 border-bottom-0">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(batch => (
              <tr key={batch.id}>
                <td className="ps-4 fw-bold text-dark border-light">{batch.name}</td>
                <td className="border-light text-secondary fw-medium">{batch.deptCode}</td>
                <td className="border-light text-secondary fw-medium">{batch.sem}</td>
                <td className="border-light">
                  <div className="d-flex flex-wrap gap-1">
                    {batch.sections.map(sec => <span key={sec} className="badge bg-secondary bg-opacity-10 text-dark border border-secondary border-opacity-25 px-2 py-1 rounded-2">{sec}</span>)}
                  </div>
                </td>
                <td className="border-light"><StatusBadge isActive={batch.isActive} /></td>
                <td className="text-end pe-4 border-light">
                  <div className="d-flex justify-content-end gap-2">
                    <ActionBtn icon={ICONS.edit} title="Edit" />
                    <ActionBtn icon={ICONS.toggle} title={batch.isActive ? "Deactivate" : "Activate"} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

const SubjectsTab = ({ isAddSubjectOpen, setIsAddSubjectOpen }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [deptFilter, setDeptFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  const filtered = useMemo(() => mockSubjects.filter(s => 
    (s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.code.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (deptFilter === "" || s.deptCode === deptFilter) &&
    (typeFilter === "" || s.type === typeFilter)
  ), [searchQuery, deptFilter, typeFilter]);

  return (
    <>
      <Toolbar 
        searchQuery={searchQuery} setSearchQuery={setSearchQuery} placeholder="Search subjects..." primaryActionText="Add Subject"
        dropdowns={[
          { dropdownData: deptDropdownData, selectedValue: deptFilter || "All Departments", onSelect: (_, v) => setDeptFilter(v === "All Departments" ? "" : v) },
          { dropdownData: subjectTypeDropdownData, selectedValue: typeFilter || "All Types", onSelect: (_, v) => setTypeFilter(v === "All Types" ? "" : v) }
        ]}
        onPrimaryAction={() => setIsAddSubjectOpen(true)}
      />
      <div className="table-responsive">
        <table className="table table-hover align-middle mb-0 border-top">
          <thead className="table-light" style={{fontSize:"0.875rem"}}>
            <tr>
              <th className="text-uppercase text-dark ps-4 py-3 border-bottom-0">Subject Name</th>
              <th className="text-uppercase text-dark py-3 border-bottom-0">Code</th>
              <th className="text-uppercase text-dark py-3 border-bottom-0">Department</th>
              <th className="text-uppercase text-dark py-3 border-bottom-0">Type & Credits</th>
              <th className="text-uppercase text-dark py-3 border-bottom-0">Status</th>
              <th className="text-uppercase text-dark text-end pe-4 py-3 border-bottom-0">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(sub => (
              <tr key={sub.id}>
                <td className="ps-4 fw-bold text-dark border-light">{sub.name}</td>
                <td className="border-light text-secondary fw-medium">{sub.code}</td>
                <td className="border-light text-secondary fw-medium">{sub.deptCode}</td>
                <td className="border-light">
                  <div className="d-flex align-items-center gap-2">
                    <SubjectTypeBadge type={sub.type} />
                    <span className="text-secondary small fw-medium">{sub.credits} Credits</span>
                  </div>
                </td>
                <td className="border-light"><StatusBadge isActive={sub.isActive} /></td>
                <td className="text-end pe-4 border-light">
                  <div className="d-flex justify-content-end gap-2">
                    <ActionBtn icon={ICONS.edit} title="Edit" />
                    <ActionBtn icon={ICONS.toggle} title={sub.isActive ? "Deactivate" : "Activate"} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

const AllocationsTab = ({isAllocateFacultyOpen, setIsAllocateFacultyOpen}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [deptFilter, setDeptFilter] = useState("");
  const [expandedRowId, setExpandedRowId] = useState(null);

  const filtered = useMemo(() => mockFacultyAllocations.filter(f => {
    const matchesSearch = f.facultyName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          f.allocations.some(a => a.subjectName.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesDept = deptFilter === "" || f.deptCode === deptFilter;
    return matchesSearch && matchesDept;
  }), [searchQuery, deptFilter]);

  return (
    <>
      <Toolbar 
        searchQuery={searchQuery} setSearchQuery={setSearchQuery} placeholder="Search faculty or subject..." primaryActionText="Allocate Faculty"
        dropdowns={[{ dropdownData: deptDropdownData, selectedValue: deptFilter || "All Departments", onSelect: (_, v) => setDeptFilter(v === "All Departments" ? "" : v) }]}
        onPrimaryAction={() => setIsAllocateFacultyOpen(true)}
      />
      <div className="table-responsive">
        <table className="table table-hover align-middle mb-0 border-top">
          <thead className="table-light" style={{fontSize:"0.875rem"}}>
            <tr>
              <th className="ps-4 py-3 border-bottom-0"></th>
              <th className="text-uppercase text-dark py-3 border-bottom-0">Faculty Name</th>
              <th className="text-uppercase text-dark py-3 border-bottom-0">Primary Dept.</th>
              <th className="text-uppercase text-dark py-3 border-bottom-0 text-center">Assignments</th>
              <th className="text-uppercase text-dark py-3 border-bottom-0">Status</th>
              <th className="text-uppercase text-dark text-end pe-4 py-3 border-bottom-0">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(faculty => {
              const isExpanded = expandedRowId === faculty.id;
              return (
                <React.Fragment key={faculty.id}>
                  <tr onClick={() => setExpandedRowId(isExpanded ? null : faculty.id)} style={{ cursor: "pointer" }} className={isExpanded ? "bg-light" : ""}>
                    <td className="ps-4 text-secondary border-0" style={{ width: "40px" }}>
                      <div className="d-flex align-items-center justify-content-center bg-white border rounded-circle shadow-sm" style={{ width: "24px", height: "24px", transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>
                        {ICONS.chevronDown}
                      </div>
                    </td>
                    <td className="fw-bold text-dark border-light">{faculty.facultyName}</td>
                    <td className="border-light"><span className="badge bg-secondary bg-opacity-10 text-dark border border-secondary border-opacity-25 px-2 py-1 rounded">{faculty.deptCode}</span></td>
                    <td className="text-center border-light"><span className="badge bg-dark rounded-pill px-2 py-1">{faculty.allocations.length}</span></td>
                    <td className="border-light"><StatusBadge isActive={faculty.isActive} /></td>
                    <td className="text-end pe-4 border-light" onClick={e => e.stopPropagation()}>
                      <div className="d-flex justify-content-end gap-2">
                        <ActionBtn icon={ICONS.edit} title="Edit" />
                        <ActionBtn icon={ICONS.toggle} title={faculty.isActive ? "Deactivate" : "Activate"} />
                      </div>
                    </td>
                  </tr>
                  {isExpanded && (
                    <tr>
                      <td colSpan="6" className="p-0 border-bottom-0">
                        <div className="bg-secondary bg-opacity-10 px-4 py-4 border-start border-4 border-dark" style={{ boxShadow: "inset 0 4px 6px -4px rgba(0,0,0,0.05)" }}>
                          <div className="d-flex justify-content-between align-items-center mb-3 px-1">
                            <h6 className="fw-bold mb-0 text-dark text-uppercase" style={{ fontSize: "0.85rem", letterSpacing: "0.5px" }}>Current Assignments</h6>
                            <button className="btn btn-sm btn-dark hover-lift py-1 px-3 d-flex align-items-center gap-1">{ICONS.plus} Quick Allocate</button>
                          </div>
                          {faculty.allocations.length > 0 ? (
                            <div className="d-flex flex-column gap-2">
                              {faculty.allocations.map(alloc => (
                                <div key={alloc.id} className="d-flex align-items-center justify-content-between bg-white p-3 rounded-3 border shadow-sm" style={{ borderColor: "#e2e8f0" }}>
                                  <div className="d-flex align-items-center gap-3">
                                    <div className="bg-primary bg-opacity-10 text-primary rounded p-2">{ICONS.subjects}</div>
                                    <div>
                                      <div className="fw-bold text-dark mb-1">{alloc.subjectName}</div>
                                      <div className="text-muted small">Code: <span className="fw-medium text-dark">{alloc.subjectCode}</span></div>
                                    </div>
                                  </div>
                                  <div className="d-flex align-items-center gap-4">
                                    <div className="text-end d-none d-sm-block">
                                      <div className="text-muted text-uppercase" style={{ fontSize: "0.75rem" }}>Assigned To</div>
                                      <span className="fw-medium text-dark">{alloc.batchName}</span>
                                    </div>
                                    <button className="btn btn-sm btn-light text-danger border-0 rounded-circle" title="Remove Allocation">{ICONS.trash}</button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="text-center py-4 bg-white rounded-3 border" style={{ borderStyle: "dashed !important" }}>
                              <div className="text-muted fw-medium small">No subjects allocated to this faculty member yet.</div>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

const AcademicStructure = () => {
  const [activeTab, setActiveTab] = useState("departments");
  const [isAddDeptOpen, setIsAddDeptOpen] = useState(false);
  const [isAddSubjectOpen, setIsAddSubjectOpen] = useState(false);
  const [isAddBatchOpen, setIsAddBatchOpen] = useState(false);
  const [isAllocateFacultyOpen, setIsAllocateFacultyOpen] = useState(false);

  const tabContent = {
    departments: <DepartmentsTab isAddDeptOpen={isAddDeptOpen} setIsAddDeptOpen={setIsAddDeptOpen} />,
    batches: <BatchesTab isAddBatchOpen={isAddBatchOpen} setIsAddBatchOpen={setIsAddBatchOpen} />,
    subjects: <SubjectsTab isAddSubjectOpen={isAddSubjectOpen} setIsAddSubjectOpen={setIsAddSubjectOpen} />,
    allocations: <AllocationsTab isAllocateFacultyOpen={isAllocateFacultyOpen} setIsAllocateFacultyOpen={setIsAllocateFacultyOpen} />
  };

  return (
    <div className="academic-structure-container fade-in">
      <div className="text-center mt-5 mb-5">
        <h1 className="fw-bolder text-dark mb-2" style={{ letterSpacing: "-0.5px" }}>Academic Structure</h1>
        <p className="text-muted fw-medium fs-6">Manage departments, curriculum, and faculty allocations.</p>
      </div>

      <div className="card px-5 border-0">
        <div>
          <ul className="border border-secondary-subtle gap-1 bg-secondary-subtle mx-auto rounded-pill d-flex flex-row align-items-center p-1 list-unstyled" style={{ width: "fit-content" }}>
            {tabBtns.map(({ id, icon, label }) => (
              <li
                key={id}
                onClick={() => setActiveTab(id)}
                className={`px-4 py-2 rounded-pill d-flex align-items-center gap-2 ${activeTab === id ? "bg-dark text-white" : "bg-transparent text-dark hover-bg-light"}`}
                style={{ cursor: "pointer", transition: "background-color 0.3s" }}
              >
                {icon} {label}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-light rounded-4 overflow-hidden mt-3">
          {tabContent[activeTab]}
        </div>
      </div>
      <AddDepartmentModal isOpen={isAddDeptOpen} onClose={() => setIsAddDeptOpen(false)} />
      <AddSubjectModal 
        isOpen={isAddSubjectOpen} 
        onClose={() => setIsAddSubjectOpen(false)} 
        deptDropdownData={deptDropdownData} 
        subjectTypeDropdownData={subjectTypeDropdownData} 
        semDropdownData={semDropdownData}
      />
      <AddBatchModal isOpen={isAddBatchOpen} onClose={() => setIsAddBatchOpen(false)} deptDropdownData={deptDropdownData} semDropdownData={semDropdownData}/>
      <AllocateFacultyModal isOpen={isAllocateFacultyOpen} onClose={() => setIsAllocateFacultyOpen(false)} />

    </div>
  );
};

export default AcademicStructure;