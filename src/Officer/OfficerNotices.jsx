import React, { useState } from "react";
import OfficerLayout from "./OfficerLayout";

const OfficerNotices = () => {
  const [notices, setNotices] = useState([
    {
      id: 1,
      title: "Ward Meeting Announcement",
      content: "Monthly ward meeting scheduled for November 25th at 2 PM",
      date: "2023-11-10",
      active: true,
    },
    {
      id: 2,
      title: "Tax Collection Notice",
      content: "Property tax collection will begin from December 1st",
      date: "2023-11-08",
      active: true,
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: "", content: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newNotice = {
      id: notices.length + 1,
      title: formData.title,
      content: formData.content,
      date: new Date().toISOString().split("T")[0],
      active: true,
    };
    setNotices([newNotice, ...notices]);
    setFormData({ title: "", content: "" });
    setShowForm(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this notice?")) {
      setNotices(notices.filter((notice) => notice.id !== id));
    }
  };

  return (
    <OfficerLayout title="Notices">
      <div className="recent-activity">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <h2 className="section-title" style={{ marginBottom: 0 }}>
            Ward Notices
          </h2>
          <button
            onClick={() => setShowForm(!showForm)}
            style={{
              padding: "8px 16px",
              background: "#3182ce",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span>{showForm ? "✕" : "+"}</span>{" "}
            {showForm ? "Cancel" : "Create Notice"}
          </button>
        </div>

        {showForm && (
          <div
            style={{
              background: "#f7fafc",
              padding: "20px",
              borderRadius: "8px",
              marginBottom: "20px",
              border: "1px solid #e2e8f0",
            }}
          >
            <h3
              style={{ marginTop: 0, marginBottom: "15px", color: "#2d3748" }}
            >
              New Notice
            </h3>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: "15px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "5px",
                    color: "#4a5568",
                    fontWeight: "500",
                  }}
                >
                  Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    border: "1px solid #cbd5e0",
                    borderRadius: "4px",
                    fontSize: "1rem",
                  }}
                  placeholder="Enter notice title"
                />
              </div>
              <div style={{ marginBottom: "15px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "5px",
                    color: "#4a5568",
                    fontWeight: "500",
                  }}
                >
                  Content *
                </label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  required
                  rows="4"
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    border: "1px solid #cbd5e0",
                    borderRadius: "4px",
                    fontSize: "1rem",
                    resize: "vertical",
                  }}
                  placeholder="Enter notice content"
                />
              </div>
              <button
                type="submit"
                style={{
                  padding: "8px 16px",
                  background: "#48bb78",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "0.95rem",
                }}
              >
                Publish Notice
              </button>
            </form>
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          {notices.map((notice) => (
            <div
              key={notice.id}
              style={{
                padding: "20px",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                background: "#ffffff",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "start",
                  marginBottom: "10px",
                }}
              >
                <div>
                  <h3 style={{ margin: "0 0 8px 0", color: "#2d3748" }}>
                    {notice.title}
                  </h3>
                  <p
                    style={{ margin: 0, fontSize: "0.85rem", color: "#718096" }}
                  >
                    📅 Published on {notice.date}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(notice.id)}
                  style={{
                    padding: "6px 12px",
                    background: "#fc8181",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "0.85rem",
                  }}
                >
                  Delete
                </button>
              </div>
              <p
                style={{
                  margin: "10px 0 0 0",
                  color: "#4a5568",
                  lineHeight: "1.6",
                }}
              >
                {notice.content}
              </p>
            </div>
          ))}
        </div>

        {notices.length === 0 && (
          <div
            style={{ padding: "40px", textAlign: "center", color: "#718096" }}
          >
            No notices published yet. Click "Create Notice" to add one.
          </div>
        )}
      </div>
    </OfficerLayout>
  );
};

export default OfficerNotices;
