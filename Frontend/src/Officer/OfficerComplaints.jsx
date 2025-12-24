import React, { useState, useEffect } from "react";
import OfficerLayout from "./OfficerLayout";

const OfficerComplaints = () => {
  const [complaints, setComplaints] = useState([
    {
      id: 1,
      complainant: "Krishna Thapa",
      subject: "Road Repair Needed",
      date: "2023-11-18",
      status: "Open",
    },
    {
      id: 2,
      complainant: "Maya Gurung",
      subject: "Street Light Not Working",
      date: "2023-11-17",
      status: "Open",
    },
    {
      id: 3,
      complainant: "Bikash Rai",
      subject: "Garbage Collection Issue",
      date: "2023-11-16",
      status: "Resolved",
    },
    {
      id: 4,
      complainant: "Anita Shrestha",
      subject: "Water Supply Problem",
      date: "2023-11-15",
      status: "Open",
    },
  ]);

  const handleResolve = (id) => {
    // Optimistic UI update; also attempt to notify backend to update status.
    setComplaints(
      complaints.map((complaint) =>
        complaint.id === id ? { ...complaint, status: "Resolved" } : complaint
      )
    );

    // Example API: POST /api/complaints_update.php { id, status: 'Resolved' }
    (async () => {
      try {
        await fetch("/api/complaints_update.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id, status: "Resolved" }),
        });
      } catch (err) {
        // If backend not available, we already updated UI optimistically.
        console.warn("Could not update complaint on server:", err);
      }
    })();
  };

  useEffect(() => {
    // Fetch complaints from backend if available.
    // Example endpoint: GET /api/complaints.php?ward=WARD_ID
    (async () => {
      try {
        const res = await fetch("/api/complaints.php?ward=1");
        if (!res.ok) return;
        const data = await res.json();
        if (Array.isArray(data)) setComplaints(data);
      } catch (err) {
        // ignore — keep frontend mock data
      }
    })();
  }, []);

  return (
    <OfficerLayout title="Complaints">
      <div className="recent-activity">
        <h2 className="section-title">Citizen Complaints</h2>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            textAlign: "left",
          }}
        >
          <thead>
            <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
              <th style={{ padding: "12px", color: "#718096" }}>Complainant</th>
              <th style={{ padding: "12px", color: "#718096" }}>Subject</th>
              <th style={{ padding: "12px", color: "#718096" }}>Date</th>
              <th style={{ padding: "12px", color: "#718096" }}>Status</th>
              <th style={{ padding: "12px", color: "#718096" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {complaints.map((complaint) => {
              return (
                <tr
                  key={complaint.id}
                  style={{ borderBottom: "1px solid #edf2f7" }}
                >
                  <td style={{ padding: "12px", fontWeight: "500" }}>
                    {complaint.complainant}
                  </td>
                  <td style={{ padding: "12px" }}>{complaint.subject}</td>
                  <td style={{ padding: "12px" }}>{complaint.date}</td>
                  <td style={{ padding: "12px" }}>
                    <span
                      style={{
                        padding: "4px 8px",
                        borderRadius: "12px",
                        background:
                          complaint.status === "Resolved"
                            ? "#c6f6d5"
                            : "#feebc8",
                        color:
                          complaint.status === "Resolved"
                            ? "#22543d"
                            : "#744210",
                        fontSize: "0.8rem",
                      }}
                    >
                      {complaint.status}
                    </span>
                  </td>
                  <td style={{ padding: "12px" }}>
                    {complaint.status === "Open" ? (
                      <button
                        onClick={() => handleResolve(complaint.id)}
                        style={{
                          padding: "6px 12px",
                          background: "#48bb78",
                          color: "white",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
                          fontSize: "0.85rem",
                        }}
                      >
                        Mark as Resolved
                      </button>
                    ) : (
                      <span style={{ color: "#a0aec0", fontSize: "0.9rem" }}>
                        Resolved
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </OfficerLayout>
  );
};

export default OfficerComplaints;
