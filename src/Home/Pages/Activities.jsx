import React from "react";
import Navbar from "../Nav/Navbar";
import "./Activities.css";
import { useWard } from "../Context/WardContext";

export default function Activities({ embedded = false }) {
  const { municipality, ward } = useWard();

  const activities = [
    {
      icon: "🏛️",
      iconBg: "#E3F2FD",
      title: "Ward Assembly Meeting",
      subtitle: "Monthly ward assembly meeting completed",
      date: "2024/11/15",
      time: "10:00",
    },
    {
      icon: "📍",
      iconBg: "#F3E5F5",
      title: "Field Visit",
      subtitle: "Road construction site inspection",
      date: "2024/11/12",
      time: "14:00",
    },
    {
      icon: "📅",
      iconBg: "#E8F5E9",
      title: "Community Program",
      subtitle: "Participation in cleanliness campaign",
      date: "2024/11/10",
      time: "09:00",
    },
  ];

  return (
    <>
      {!embedded && <Navbar showHomeContent={false} />}
      <div className={`activities-page ${embedded ? "embedded" : ""}`}>
        {embedded && (
          <div className="embedded-header" style={{ marginBottom: 12 }}>
            <span className="embedded-pin">📍</span>
            <span className="embedded-title">
              {municipality} - Ward {ward}
            </span>
          </div>
        )}
        <div className="section-header">
          <span className="section-pin">🗂️</span>
          <span className="section-title">Recent Activities</span>
        </div>
        <div className="activities-list">
          {activities.map((act, idx) => (
            <div key={idx} className="activity-item">
              <span
                className="activity-icon"
                style={{ background: act.iconBg }}
              >
                {act.icon}
              </span>
              <div className="activity-content">
                <div className="activity-title">{act.title}</div>
                <div className="activity-subtitle">{act.subtitle}</div>
                <div className="activity-footer">
                  <span className="activity-date">📅 {act.date}</span>
                  <span className="activity-time">🕐 {act.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="activities-note">These activity details are demo.</div>
      </div>
    </>
  );
}
