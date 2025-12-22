import React from "react";
import "./About.css";
import missionImage from "../../Image/Home.png";
import Navbar from "../Nav/Navbar";

const OBJECTIVES = [
  { icon: "🎯", text: "Bridge the gap between citizens and local government" },
  { icon: "📢", text: "Promote transparency in decision-making processes" },
  { icon: "🤝", text: "Foster community engagement and participation" },
  { icon: "💡", text: "Enable data-driven governance at ward level" },
];

const STATS = [
  { number: "753", label: "Wards", icon: "🏘️" },
  { number: "100K+", label: "Citizens Reached", icon: "👥" },
  { number: "24/7", label: "Service Available", icon: "⏰" },
  { number: "5★", label: "User Rating", icon: "⭐" },
];

const FEATURES = [
  {
    title: "Transparency",
    icon: "📊",
    color: "#3b82f6",
    description: "Real-time access to ward activities and budgets",
  },
  {
    title: "Participation",
    icon: "👥",
    color: "#16a34a",
    description: "Engage citizens in decision-making processes",
  },
  {
    title: "Progress Tracking",
    icon: "📈",
    color: "#9333ea",
    description: "Monitor development projects and milestones",
  },
  {
    title: "Accountability",
    icon: "⚖️",
    color: "#ef4444",
    description: "Hold local leaders responsible for their actions",
  },
  {
    title: "Digital Access",
    icon: "💻",
    color: "#f59e0b",
    description: "Easy online access to government services",
  },
  {
    title: "Smart Governance",
    icon: "🏛️",
    color: "#8b5cf6",
    description: "Modern tools for efficient local administration",
  },
  {
    title: "Feedback System",
    icon: "💬",
    color: "#ec4899",
    description: "Share concerns and suggestions directly",
  },
  {
    title: "Budget Monitoring",
    icon: "💰",
    color: "#84cc16",
    description: "Track how public funds are being utilized",
  },
];

export default function About() {
  return (
    <>
      {/* Navigation Bar */}
      <Navbar />
      {/* About Page Content */}
      <div className="about-container">
        <div className="about-hero">
          <div className="about-hero-content">
            <h1>About Us</h1>
            <p>For Transparent and Accountable Local Governance</p>
          </div>
        </div>

        <div className="about-content">
          <section className="mission-section">
            <div className="mission-text">
              <h2>Our Mission</h2>
              <p>
                Ward Chairperson Portal is a digital platform built to bring
                transparency and accountability to local governance in Nepal.
              </p>
              <p>
                We believe that access to information and citizen participation
                are the foundations of strong democracy.
              </p>

              <div className="objectives-list">
                <h3>Key Objectives</h3>
                {OBJECTIVES.map((obj, i) => (
                  <div key={i} className="objective-item">
                    <span className="obj-icon">{obj.icon}</span>
                    <span>{obj.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mission-image">
              <img src={missionImage} alt="Mission" />
            </div>
          </section>

          <section className="features-section">
            <h2>Key Features</h2>
            <div className="features-grid">
              {FEATURES.map((item, i) => (
                <div className="feature-card" key={i}>
                  <div className="feature-icon" style={{ color: item.color }}>
                    <span>{item.icon}</span>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="vision-card">
            <h3>Our Vision</h3>
            <p>
              To establish transparent, accountable, and effective local
              governance in every ward of Nepal. Where citizens can actively
              participate in their elected representatives' activities and
              democratic values remain vibrant.
            </p>

            <div className="vision-stats">
              <div className="v-stat">
                <span className="v-number">753</span>
                <span className="v-label">Local Levels</span>
              </div>
              <div className="v-stat">
                <span className="v-number">6,743</span>
                <span className="v-label">Wards</span>
              </div>
              <div className="v-stat">
                <span className="v-number">30M+</span>
                <span className="v-label">Citizens</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
