import React from "react";
import "./Dashboard.css";
import { useWard } from "../Context/WardContext";
import Navbar from "../Nav/Navbar";

const BudgetCard = ({ title, amount, color, icon }) => (
  <div className={`budget-card ${color}`}>
    <div className="budget-card-header">
      <span className="budget-title">{title}</span>
      <span className="budget-icon">{icon}</span>
    </div>
    <div className="budget-amount">Rs. {amount}</div>
  </div>
);

const ProgressBar = ({ label, value, color }) => (
  <div className="progress-row">
    <span className="progress-label">{label}</span>
    <div className="progress-track">
      <div
        className={`progress-fill ${color}`}
        style={{ width: `${value}%` }}
      />
    </div>
    <span className="progress-value">{value}%</span>
  </div>
);

const ActivityItem = ({ title, desc, date }) => (
  <div className="activity-item">
    <div className="activity-left">
      <div className="activity-texts">
        <div className="activity-title">{title}</div>
        <div className="activity-desc">{desc}</div>
      </div>
    </div>
    <div className="activity-date">{date}</div>
  </div>
);

export default function Dashboard({ embedded = false }) {
  const { municipality, ward } = useWard();
  const budget = {
    total: "3,00,00,000",
    spent: "70,00,000",
    remaining: "30,00,000",
  };

  const progress = [
    { label: "Completed", value: 33, color: "blue" },
    { label: "Ongoing", value: 33, color: "green" },
    { label: "Planned", value: 34, color: "orange" },
  ];

  const beneficiaries = { total: 15000, direct: 8000, indirect: 7000 };

  const activities = [
    {
      title: "Ward Assembly Meeting",
      desc: "General ward assembly meeting completed",
      date: "2025/11/23",
    },
    {
      title: "Road Construction Progress",
      desc: "On-site inspection of road construction",
      date: "2025/11/22",
    },
    {
      title: "Health Campaign Program",
      desc: "Health campaign organized",
      date: "2025/11/21",
    },
  ];

  return (
    <>
      {!embedded && <Navbar showHomeContent={false} />}
      <div className={`dashboard-page ${embedded ? "embedded" : ""}`}>
        {embedded && (
          <div className="embedded-header" style={{ marginBottom: 12 }}>
            <span className="embedded-pin">📍</span>
            <span className="embedded-title">
              {municipality} - Ward {ward}
            </span>
          </div>
        )}
        <div className="cards-row">
          <BudgetCard
            title="Total Budget"
            amount={budget.total}
            color="blue"
            icon="💰"
          />
          <BudgetCard
            title="Spent Amount"
            amount={budget.spent}
            color="green"
            icon="💳"
          />
          <BudgetCard
            title="Remaining Budget"
            amount={budget.remaining}
            color="purple"
            icon="🧾"
          />
        </div>

        <div className="grid-row">
          <div className="panel work-progress">
            <div className="panel-title">Work Progress</div>
            <div className="progress-list">
              {progress.map((p) => (
                <ProgressBar
                  key={p.label}
                  label={p.label}
                  value={p.value}
                  color={p.color}
                />
              ))}
            </div>
          </div>

          <div className="panel beneficiaries">
            <div className="panel-title">Beneficiary Population</div>
            <div className="beneficiary-total">
              {beneficiaries.total.toLocaleString()}
            </div>
            <div className="beneficiary-sub">
              <div>
                <div className="beneficiary-count">
                  {beneficiaries.direct.toLocaleString()}
                </div>
                <div className="beneficiary-label">Direct</div>
              </div>
              <div>
                <div className="beneficiary-count">
                  {beneficiaries.indirect.toLocaleString()}
                </div>
                <div className="beneficiary-label">Indirect</div>
              </div>
            </div>
          </div>
        </div>

        <div className="panel activities">
          <div className="panel-title">Recent Key Activities</div>
          <div className="activity-list">
            {activities.map((a, idx) => (
              <ActivityItem
                key={idx}
                title={a.title}
                desc={a.desc}
                date={a.date}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
