import React, { useState } from "react";
import OfficerLayout from "./OfficerLayout";
import "./OfficerDepartments.css";

const DepartmentCard = ({ department, onEdit, onDelete }) => {
  return (
    <div className="department-card">
      {/* Action Buttons */}
      <div className="dept-actions">
        <button className="btn-edit-dept" onClick={() => onEdit(department)}>
          <span>✏️</span> Edit
        </button>
        <button
          className="btn-delete-dept"
          onClick={() => onDelete(department.id)}
        >
          <span>🗑️</span> Delete
        </button>
      </div>

      <div className="dept-icon">{department.icon}</div>
      <h3 className="dept-name">
        <button
          type="button"
          className="dept-name-btn"
          onClick={() => onEdit(department)}
          aria-label={`Edit ${department.name}`}
        >
          {department.name}
        </button>
      </h3>

      <div className="dept-info">
        <div className="dept-info-item">
          <span className="info-icon">👤</span>
          <span>{department.headName}</span>
        </div>
        <div className="dept-info-item">
          <span className="info-icon">📞</span>
          <span>{department.phone}</span>
        </div>
        <div className="dept-info-item">
          <span className="info-icon">✉️</span>
          <span>{department.email}</span>
        </div>
      </div>
    </div>
  );
};

export default function OfficerDepartments() {
  const [departments, setDepartments] = useState([
    {
      id: 1,
      name: "Administration Department",
      headName: "Mr. Ram Bahadur Shrestha",
      phone: "01-4234567",
      email: "admin@wardportal.gov.np",
      icon: "🏢",
    },
    {
      id: 2,
      name: "Planning & Development Department",
      headName: "Mrs. Sita Devi Poudel",
      phone: "01-4234568",
      email: "planning@wardportal.gov.np",
      icon: "🏗️",
    },
    {
      id: 3,
      name: "Social Development Department",
      headName: "Mr. Hari Prasad Gurung",
      phone: "01-4234569",
      email: "social@wardportal.gov.np",
      icon: "👥",
    },
    {
      id: 4,
      name: "Financial Administration Department",
      headName: "Mrs. Geeta Kumari Tamang",
      phone: "01-4234570",
      email: "finance@wardportal.gov.np",
      icon: "💰",
    },
  ]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingDept, setEditingDept] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    headName: "",
    phone: "",
    email: "",
    icon: "🏢",
  });

  const handleOpenForm = (dept = null) => {
    if (dept) {
      setEditingDept(dept);
      setFormData({
        name: dept.name,
        headName: dept.headName,
        phone: dept.phone,
        email: dept.email,
        icon: dept.icon,
      });
    } else {
      setEditingDept(null);
      setFormData({
        name: "",
        headName: "",
        phone: "",
        email: "",
        icon: "🏢",
      });
    }
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingDept(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newDept = {
      id: editingDept ? editingDept.id : Date.now(),
      ...formData,
    };

    if (editingDept) {
      setDepartments(
        departments.map((d) => (d.id === editingDept.id ? newDept : d))
      );
    } else {
      setDepartments([...departments, newDept]);
    }

    handleCloseForm();
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this department?")) {
      setDepartments(departments.filter((d) => d.id !== id));
    }
  };

  const iconOptions = [
    "🏢",
    "🏗️",
    "👥",
    "💰",
    "📚",
    "🏥",
    "🚓",
    "🌳",
    "⚖️",
    "🔧",
  ];

  return (
    <OfficerLayout title="Department Contacts">
      <div className="officer-depts-header">
        <p style={{ color: "#718096", margin: 0 }}>
          Manage department contact information for your ward
        </p>
        <button className="btn-create-dept" onClick={() => handleOpenForm()}>
          + Add Department
        </button>
      </div>

      {/* Form Modal */}
      {isFormOpen && (
        <div className="dept-form-overlay">
          <div className="dept-form-modal">
            <div className="form-modal-header">
              <h2>{editingDept ? "Edit Department" : "Add Department"}</h2>
              <button className="btn-close-modal" onClick={handleCloseForm}>
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="dept-form">
              <div className="form-row">
                <div className="form-group">
                  <label>
                    Department Name <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., Administration Department"
                  />
                </div>

                <div className="form-group">
                  <label>
                    Department Head <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    name="headName"
                    value={formData.headName}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., Mr. Ram Bahadur Shrestha"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>
                    Phone <span className="required">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., 01-4234567"
                  />
                </div>

                <div className="form-group">
                  <label>
                    Email <span className="required">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., admin@wardportal.gov.np"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>
                  Icon <span className="required">*</span>
                </label>
                <div className="icon-selector">
                  {iconOptions.map((icon) => (
                    <button
                      key={icon}
                      type="button"
                      className={`icon-option ${
                        formData.icon === icon ? "selected" : ""
                      }`}
                      onClick={() => setFormData({ ...formData, icon })}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={handleCloseForm}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-submit">
                  {editingDept ? "Update Department" : "Add Department"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Departments Grid */}
      <div className="departments-grid">
        {departments.length === 0 ? (
          <div className="empty-state">
            <p>
              No departments added yet. Click "Add Department" to get started.
            </p>
          </div>
        ) : (
          departments.map((dept) => (
            <DepartmentCard
              key={dept.id}
              department={dept}
              onEdit={handleOpenForm}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
    </OfficerLayout>
  );
}
