import React from "react";
import "./Assets.css";
import { useWard } from "../Context/WardContext";
import Navbar from "../Nav/Navbar";

const AssetCard = ({ icon, title, subtitle, value, description }) => (
  <div className="asset-card">
    <div className="asset-header">
      <span className="asset-icon">{icon}</span>
      <div>
        <div className="asset-title">{title}</div>
        <div className="asset-subtitle">{subtitle}</div>
      </div>
    </div>
    <div className="asset-body">
      <div className="asset-label">Value</div>
      <div className="asset-value">Rs. {value}</div>
      <div className="asset-label">Description</div>
      <div className="asset-desc">{description}</div>
    </div>
  </div>
);

export default function Assets({ embedded = false }) {
  const { municipality, ward } = useWard();

  const assets = [
    {
      icon: "🏠",
      title: "House",
      subtitle: municipality,
      value: "50,00,000",
      description: "Own house",
    },
    {
      icon: "⛏️",
      title: "Land",
      subtitle: "Kagaje",
      value: "25,00,000",
      description: "Agricultural land",
    },
    {
      icon: "🚗",
      title: "Vehicle",
      subtitle: municipality,
      value: "15,00,000",
      description: "Private vehicle",
    },
  ];

  return (
    <>
      {!embedded && <Navbar showHomeContent={false} />}
      <div className={`assets-page ${embedded ? "embedded" : ""}`}>
        {embedded && (
          <div className="embedded-header" style={{ marginBottom: 12 }}>
            <span className="embedded-pin">📍</span>
            <span className="embedded-title">
              {municipality} - Ward {ward}
            </span>
          </div>
        )}
        <div className="assets-grid">
          {assets.map((a, i) => (
            <AssetCard
              key={i}
              icon={a.icon}
              title={a.title}
              subtitle={a.subtitle}
              value={a.value}
              description={a.description}
            />
          ))}
        </div>
        <div className="assets-note">
          These asset details apply to all ward chairpersons (demo).
        </div>
      </div>
    </>
  );
}
