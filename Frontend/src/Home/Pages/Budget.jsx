import React, { useState, useEffect } from "react";
import Navbar from "../Nav/Navbar";
import { useWard } from "../Context/WardContext";
import { API_ENDPOINTS } from "../../config/api";
import "./Budget.css";

export default function Budget() {
  const { municipality, ward, wardId } = useWard();
  const [budgetData, setBudgetData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBudget = async () => {
      if (!wardId) return;

      setLoading(true);
      try {
        const response = await fetch(
          `${API_ENDPOINTS.assets.manageBudgets}?ward_id=${wardId}`
        );
        const result = await response.json();

        if (result.success && result.data) {
          setBudgetData(result.data);
        } else {
          setBudgetData(null);
        }
      } catch (err) {
        console.error("Failed to fetch budget:", err);
        setError("Unable to load budget information.");
      } finally {
        setLoading(false);
      }
    };

    fetchBudget();
  }, [wardId]);

  const formatCurrency = (amount) => {
    return Number(amount || 0).toLocaleString();
  };

  const remaining =
    (Number(budgetData?.total_allocated) || 0) -
    (Number(budgetData?.total_spent) || 0);
  const isNegative = remaining < 0;

  return (
    <>
      <Navbar showHomeContent={false} />
      <div className="public-budget-container">
        <div className="budget-page-header">
          <h1 className="budget-page-title">Ward Budget & Finance</h1>
          <p className="budget-page-subtitle">
            Transparent financial reporting for {municipality} - Ward {ward}.
            Review allocations, expenditures, and beneficiary statistics.
          </p>
        </div>

        {loading ? (
          <div className="loading-state">
            <span className="spinner-small"></span> Loading budget details...
          </div>
        ) : error ? (
          <div className="error-state">{error}</div>
        ) : !budgetData ? (
          <div className="empty-state">
            <div style={{ fontSize: "3rem", marginBottom: "16px" }}>📭</div>
            <h3>No Budget Data Available</h3>
            <p>
              The budget details for Ward {ward} have not been published yet.
              Please check back later.
            </p>
          </div>
        ) : (
          <>
            {/* Summary Cards */}
            <div className="budget-summary-grid">
              <div className="budget-card allocated">
                <div className="card-icon-wrapper">
                  <i className="fa-solid fa-money-bill-wave"></i>
                </div>
                <div className="card-label">Total Allocated</div>
                <h2 className="card-value">
                  Rs {formatCurrency(budgetData.total_allocated)}
                </h2>
              </div>

              <div className="budget-card spent">
                <div className="card-icon-wrapper">
                  <i className="fa-solid fa-chart-pie"></i>
                </div>
                <div className="card-label">Total Spent</div>
                <h2 className="card-value">
                  Rs {formatCurrency(budgetData.total_spent)}
                </h2>
              </div>

              <div
                className={`budget-card remaining ${
                  isNegative ? "negative" : ""
                }`}
              >
                <div className="card-icon-wrapper">
                  {isNegative ? (
                    <i className="fa-solid fa-triangle-exclamation"></i>
                  ) : (
                    <i className="fa-solid fa-piggy-bank"></i>
                  )}
                </div>
                <div className="card-label">Remaining Balance</div>
                <h2 className="card-value">Rs {formatCurrency(remaining)}</h2>
              </div>
            </div>

            {/* Beneficiaries Section */}
            <div className="beneficiaries-section">
              <div className="section-header">
                <div className="section-icon">
                  <i className="fa-solid fa-users"></i>
                </div>
                <div className="section-title">
                  <h3>Beneficiary Impact</h3>
                  <p>
                    Overview of citizens directly and indirectly benefiting from
                    ward programs.
                  </p>
                </div>
              </div>

              <div className="beneficiary-stats">
                <div className="stat-item">
                  <span className="stat-value total">
                    {formatCurrency(budgetData.total_beneficiaries)}
                  </span>
                  <span className="stat-label">Total Beneficiaries</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value direct">
                    {formatCurrency(budgetData.direct_beneficiaries)}
                  </span>
                  <span className="stat-label">Direct Beneficiaries</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value indirect">
                    {formatCurrency(budgetData.indirect_beneficiaries)}
                  </span>
                  <span className="stat-label">Indirect Beneficiaries</span>
                </div>
              </div>
            </div>

            <div
              style={{
                textAlign: "center",
                marginTop: "30px",
                color: "#94a3b8",
                fontSize: "0.9rem",
              }}
            >
              <p>Fiscal Year: {budgetData.fiscal_year || "Current"}</p>
              <p>
                Last Updated:{" "}
                {new Date(budgetData.created_at).toLocaleDateString()}
              </p>
            </div>
          </>
        )}
      </div>
    </>
  );
}
