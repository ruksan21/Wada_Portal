import React, { useState, useEffect } from "react";
import { useAuth } from "../Context/AuthContext";
import "./MyProfile.css";
import Works from "./Works";
import Assets from "./Assets";
import Activities from "./Activities";
import Dashboard from "./Dashboard";
// Assuming CommentSection exists in Component folder based on user history context
import CommentSection from "../../Component/CommentSection";

const MyProfile = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("details");
  const [profile, setProfile] = useState({});

  // Initialize profile from logged-in user
  useEffect(() => {
    if (user) {
      const initialProfile = {
        name: user.name || "Ram Shrestha",
        email: user.email || "ram.shrestha@ktm.gov.np",
        phone: user.phone || "9841234567",
        address: user.address || "वडा नं. १, काठमाडौँ", // Ward No. 1, Kathmandu in Nepali
        role: user.role || "Ward Chairperson",
        ward: user.ward || "1",
        municipality: user.municipality || "Kathmandu Metropolitan City",

        // New fields for the design (Hardcoded Nepali as per image for demo)
        education: "स्नातकोत्तर (राजनीति विज्ञान)", // Master's Degree (Political Science)
        experience: "१५ वर्ष स्थानीय राजनीतिमा", // 15 years in local politics
        politicalParty: "नेपाली कांग्रेस", // Nepali Congress
        appointmentDate: "२०७९/०५/१५", // 2022/08/31
      };
      setProfile(initialProfile);
    }
  }, [user]);

  const tabs = [
    { id: "details", label: "Details", icon: "👤" },
    { id: "works", label: "Works", icon: "💼" },
    { id: "assets", label: "Assets", icon: "🏠" },
    { id: "activities", label: "Activities", icon: "📅" },
    { id: "reviews", label: "Reviews", icon: "⭐" },
    { id: "dashboard", label: "Dashboard", icon: "🎛️" },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "details":
        return (
          <div className="profile-details-grid">
            {/* Left Column - Personal Information */}
            <div className="details-section">
              <h2 className="section-title">Personal Information</h2>
              <div className="info-list">
                <div className="info-block">
                  <label>Address</label>
                  <p>{profile.address}</p>
                </div>
                <div className="info-block">
                  <label>Education</label>
                  <p>{profile.education}</p>
                </div>
                <div className="info-block">
                  <label>Experience</label>
                  <p>{profile.experience}</p>
                </div>
                <div className="info-block">
                  <label>Political Party</label>
                  <p>{profile.politicalParty}</p>
                </div>
                <div className="info-block">
                  <label>Appointment Date</label>
                  <p>{profile.appointmentDate}</p>
                </div>
              </div>
            </div>

            {/* Right Column - Contact Details */}
            <div className="contact-section">
              <h2 className="section-title">Contact Details</h2>
              <div className="contact-list">
                <div className="contact-item">
                  <span className="contact-icon">📞</span>
                  <span>{profile.phone}</span>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">✉️</span>
                  <span>{profile.email}</span>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">📍</span>
                  <span>{profile.address}</span>
                </div>
              </div>

              <button className="download-btn">
                <span>⬇️</span> Download Details
              </button>
            </div>
          </div>
        );
      case "works":
        return <Works embedded={true} />;
      case "assets":
        return <Assets embedded={true} />;
      case "activities":
        return <Activities embedded={true} />;
      case "reviews":
        // Fallback if CommentSection isn't widely available or needs props
        return (
          <div className="p-4 bg-white rounded-lg shadow-sm">
            Reviews Component Placeholder
          </div>
        );
      case "dashboard":
        return <Dashboard embedded={true} />;
      default:
        return null;
    }
  };

  return (
    <div className="profile-page-v3">
      <div className="profile-container-v3">
        {/* Tabs */}
        <div className="profile-tabs-v3">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`tab-btn-v3 ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="tab-icon">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="profile-content-v3">{renderTabContent()}</div>
      </div>
    </div>
  );
};

export default MyProfile;
