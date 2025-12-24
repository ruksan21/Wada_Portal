import React from "react";
import Navbar from "../Nav/Navbar";
import { useWard } from "../Context/WardContext";
import "./Works.css";

const WorkCard = ({ work }) => {
  return (
    <div className="work-card">
      <div className="work-header">
        <div>
          <div className="work-label">WORKS</div>
          <h3 className="work-title">{work.title}</h3>
          <p className="work-location">
            {work.ward}, {work.municipality}
          </p>
        </div>
        <span className={`work-status status-${work.status.toLowerCase()}`}>
          {work.status}
        </span>
      </div>

      <div className="work-image-container">
        <img
          src={work.image}
          alt={work.title}
          className="work-image"
          onError={(e) => {
            e.target.src =
              "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80"; // Fallback
          }}
        />
      </div>

      <div className="work-stats-grid">
        <div className="stat-item">
          <label>Start Date</label>
          <div>{work.startDate}</div>
        </div>
        <div className="stat-item">
          <label>End Date</label>
          <div>{work.endDate}</div>
        </div>
        <div className="stat-item">
          <label>Budget</label>
          <div>Rs. {work.budget}</div>
        </div>
        <div className="stat-item">
          <label>Beneficiaries</label>
          <div>{work.beneficiaries}</div>
        </div>
      </div>

      <div className="work-description">
        <p>{work.description}</p>
      </div>
    </div>
  );
};

export default function Works({ embedded = false }) {
  const { municipality, ward } = useWard();

  // Mock Data matching the user's image
  const works = [
    {
      id: 1,
      title: "Road Repair Work",
      municipality: municipality || "Kathmandu",
      ward: ward ? `Ward No. ${ward}` : "Ward No. 1",
      status: "completed",
      image:
        "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1000&q=80", // Construction image
      startDate: "2022/08/17",
      endDate: "2022/12/11",
      budget: "20,00,000",
      beneficiaries: "5,000",
      description:
        "Main road repair and improvement, including road cleaning and asphalt refinement.",
    },
    {
      id: 2,
      title: "Park Renovation",
      municipality: municipality || "Kathmandu",
      ward: ward ? `Ward No. ${ward}` : "Ward No. 1",
      status: "ongoing",
      image:
        "https://images.unsplash.com/photo-1596230529625-7ee54135a963?auto=format&fit=crop&w=1000&q=80", // Park image
      startDate: "2023/01/15",
      endDate: "2023/06/30",
      budget: "15,00,000",
      beneficiaries: "2,500",
      description:
        "Renovation of community park including new benches, planting trees, and installing playground equipment.",
    },
  ];

  return (
    <>
      {!embedded && <Navbar showHomeContent={false} />}
      <div className={`works-page ${embedded ? "embedded" : ""}`}>
        {embedded && (
          <div className="embedded-header" style={{ marginBottom: 12 }}>
            <span className="embedded-pin">📍</span>
            <span className="embedded-title">
              {municipality} - Ward {ward}
            </span>
          </div>
        )}

        {!embedded && (
          <div className="section-header">
            <span className="section-pin">🏗️</span>
            <span className="section-title">Development Works</span>
          </div>
        )}

        <div className="works-list">
          {works.map((work) => (
            <WorkCard key={work.id} work={work} />
          ))}
        </div>
        <div className="works-note">
          These work details are officially created and managed by Ward
          Officers.
        </div>
      </div>
    </>
  );
}
