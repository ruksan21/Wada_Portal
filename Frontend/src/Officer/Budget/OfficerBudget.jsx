import React, { useEffect, useState } from "react";
import "./Budget.css";
import OfficerLayout from "../Layout/OfficerLayout";
import { useAuth } from "../../Home/Context/AuthContext";
import { useWard } from "../../Home/Context/WardContext";
import { API_ENDPOINTS } from "../../config/api";

export default function OfficerBudget() {
  const { user } = useAuth();
  const { wardId } = useWard();

  // Beneficiary form state
  const [benTotal, setBenTotal] = useState("");
  const [benDirect, setBenDirect] = useState("");
  const [benIndirect, setBenIndirect] = useState("");

  // Budget summary form state
  const [budgetAllocated, setBudgetAllocated] = useState("");
  const [budgetSpent, setBudgetSpent] = useState("");

  // Latest fetched record to preserve data
  const [latestRecord, setLatestRecord] = useState(null);

  // Toast notification state
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  // Budget history state
  const [budgetHistory, setBudgetHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(false);

  // Load budget data from backend
  const fetchBudgetData = React.useCallback(async (currentWardId) => {
    if (!currentWardId) return;
    try {
      const params = new URLSearchParams();
      params.append("ward_id", currentWardId);

      // Fetch latest for summary cards
      const response = await fetch(
        `${API_ENDPOINTS.assets.manageBudgets}?${params.toString()}`,
      );
      const result = await response.json();

      if (result.success && result.data) {
        const data = result.data;
        setLatestRecord(data);
        setBudgetAllocated(data.total_allocated || "");
        setBudgetSpent(data.total_spent || "");
        setBenTotal(data.total_beneficiaries || "");
        setBenDirect(data.direct_beneficiaries || "");
        setBenIndirect(data.indirect_beneficiaries || "");
      } else {
        setLatestRecord(null);
      }

      // Fetch history for the table
      setHistoryLoading(true);
      params.append("history", "true");
      const historyRes = await fetch(
        `${API_ENDPOINTS.assets.manageBudgets}?${params.toString()}`,
      );
      const historyResult = await historyRes.json();
      if (historyResult.success) {
        setBudgetHistory(historyResult.data || []);
      }
    } catch (error) {
      console.error("Error fetching budget data:", error);
    } finally {
      setHistoryLoading(false);
    }
  }, []);

  useEffect(() => {
    if (wardId) {
      fetchBudgetData(wardId);
    }
  }, [wardId, fetchBudgetData]);

  // Auto-hide toast after 3 seconds
  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast({ show: false, message: "", type: "success" });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast.show]);

  // Handle beneficiary form submission
  async function handleBeneficiarySubmit(e) {
    e.preventDefault();

    if (benTotal === "" || benDirect === "" || benIndirect === "") {
      setToast({
        show: true,
        message: "⚠️ Please fill all beneficiary fields!",
        type: "error",
      });
      return;
    }

    await saveBudgetData("Beneficiary details saved successfully!");
  }

  async function handleBudgetSummarySubmit(e) {
    e.preventDefault();

    if (budgetAllocated === "" || budgetSpent === "") {
      setToast({
        show: true,
        message: "⚠️ Please fill all budget fields!",
        type: "error",
      });
      return;
    }

    await saveBudgetData("Budget allocations saved successfully!");
  }

  const saveBudgetData = async (successMsg = "Data saved successfully!") => {
    if (!wardId) return;
    try {
      const response = await fetch(API_ENDPOINTS.assets.manageBudgets, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ward_id: wardId,
          officer_id: user.id,
          // If a field is empty, fallback to latest fetched value to prevent zeroing
          total_allocated:
            budgetAllocated !== ""
              ? Number(budgetAllocated)
              : Number(latestRecord?.total_allocated || 0),
          total_spent:
            budgetSpent !== ""
              ? Number(budgetSpent)
              : Number(latestRecord?.total_spent || 0),
          total_beneficiaries:
            benTotal !== ""
              ? Number(benTotal)
              : Number(latestRecord?.total_beneficiaries || 0),
          direct_beneficiaries:
            benDirect !== ""
              ? Number(benDirect)
              : Number(latestRecord?.direct_beneficiaries || 0),
          indirect_beneficiaries:
            benIndirect !== ""
              ? Number(benIndirect)
              : Number(latestRecord?.indirect_beneficiaries || 0),
          fiscal_year: "2023/24",
        }),
      });

      const result = await response.json();
      if (result.success) {
        setToast({
          show: true,
          message: successMsg,
          type: "success",
        });
        fetchBudgetData(wardId); // Refresh data
      } else {
        setToast({
          show: true,
          message: "Error: " + result.message,
          type: "error",
        });
      }
    } catch (error) {
      console.error("Error saving budget:", error);
      setToast({
        show: true,
        message: "Failed to save budget data",
        type: "error",
      });
    }
  };

  function clearBeneficiaryForm() {
    setBenTotal("");
    setBenDirect("");
    setBenIndirect("");
  }

  function clearBudgetSummaryForm() {
    setBudgetAllocated("");
    setBudgetSpent("");
  }

  const remaining = Number(budgetAllocated) - Number(budgetSpent) || 0;
  const isNegative = remaining < 0;

  return (
    <OfficerLayout title="Budgets">
      <div className="budget-container">
        <h2 className="budget-title">💰 Budget Management</h2>
        <p className="budget-subtitle">
          Track and manage your ward's financial allocations and beneficiaries
        </p>

        {toast.show && (
          <div className={`toast toast-${toast.type}`}>
            {toast.type === "success" && <span className="toast-icon">✓</span>}
            {toast.message}
          </div>
        )}

        <div className="summary">
          <div className="summary-card allocated">
            <div className="summary-icon">💵</div>
            <div className="summary-label">Total Allocated</div>
            <div className="summary-value">
              Rs {Number(budgetAllocated || 0).toLocaleString()}
            </div>
          </div>
          <div className="summary-card spent">
            <div className="summary-icon">📊</div>
            <div className="summary-label">Total Spent</div>
            <div className="summary-value">
              Rs {Number(budgetSpent || 0).toLocaleString()}
            </div>
          </div>
          <div
            className={`summary-card remaining ${isNegative ? "negative" : ""}`}
          >
            <div className="summary-icon">{isNegative ? "⚠️" : "✨"}</div>
            <div className="summary-label">Remaining Balance</div>
            <div className="summary-value">Rs {remaining.toLocaleString()}</div>
          </div>
        </div>

        <div className="forms-row">
          <div className="form-card">
            <div className="form-header">
              <div className="form-icon budget">💳</div>
              <div>
                <h3 className="form-title">Budget Allocation</h3>
                <p className="form-subtitle">
                  Set your ward's financial targets
                </p>
              </div>
            </div>
            <form onSubmit={handleBudgetSummarySubmit}>
              <div className="form-group">
                <label className="label">Total Allocated Amount</label>
                <div className="input-with-icon">
                  <span className="input-prefix">Rs</span>
                  <input
                    className="input"
                    type="number"
                    placeholder="0.00"
                    value={budgetAllocated}
                    onChange={(e) => setBudgetAllocated(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="label">Total Spent Amount</label>
                <div className="input-with-icon">
                  <span className="input-prefix">Rs</span>
                  <input
                    className="input"
                    type="number"
                    placeholder="0.00"
                    value={budgetSpent}
                    onChange={(e) => setBudgetSpent(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-actions">
                <button className="btn primary" type="submit">
                  💾 Save Budget
                </button>
                <button
                  className="btn"
                  type="button"
                  onClick={clearBudgetSummaryForm}
                >
                  ↺ Clear
                </button>
              </div>
            </form>
          </div>

          <div className="form-card">
            <div className="form-header">
              <div className="form-icon beneficiary">👥</div>
              <div>
                <h3 className="form-title">Beneficiary Details</h3>
                <p className="form-subtitle">
                  Track the impact of your programs
                </p>
              </div>
            </div>
            <form onSubmit={handleBeneficiarySubmit}>
              <div className="form-group">
                <label className="label">Total Beneficiaries</label>
                <input
                  className="input"
                  type="number"
                  placeholder="Enter total beneficiaries..."
                  value={benTotal}
                  onChange={(e) => setBenTotal(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="label">Direct Beneficiaries</label>
                <input
                  className="input"
                  type="number"
                  placeholder="Enter direct beneficiaries..."
                  value={benDirect}
                  onChange={(e) => setBenDirect(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="label">Indirect Beneficiaries</label>
                <input
                  className="input"
                  type="number"
                  placeholder="Enter indirect beneficiaries..."
                  value={benIndirect}
                  onChange={(e) => setBenIndirect(e.target.value)}
                />
              </div>

              <div className="form-actions">
                <button className="btn primary" type="submit">
                  💾 Save Details
                </button>
                <button
                  className="btn"
                  type="button"
                  onClick={clearBeneficiaryForm}
                >
                  ↺ Clear
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="current-data-section">
          <h3 className="section-title">📊 Current Ward Records</h3>
          <div className="data-grid">
            <div className="data-card">
              <h4>Financial Details</h4>
              <div className="data-item">
                <span>Total Allocated:</span>
                <strong>
                  Rs {Number(budgetAllocated || 0).toLocaleString()}
                </strong>
              </div>
              <div className="data-item">
                <span>Total Spent:</span>
                <strong>Rs {Number(budgetSpent || 0).toLocaleString()}</strong>
              </div>
              <div className="data-item">
                <span>Balance:</span>
                <strong className={isNegative ? "text-danger" : "text-success"}>
                  Rs {remaining.toLocaleString()}
                </strong>
              </div>
            </div>

            <div className="data-card">
              <h4>Beneficiary Demographics</h4>
              <div className="data-item">
                <span>Total Beneficiaries:</span>
                <strong>{Number(benTotal || 0).toLocaleString()}</strong>
              </div>
              <div className="data-item">
                <span>Direct Impact:</span>
                <strong>{Number(benDirect || 0).toLocaleString()}</strong>
              </div>
              <div className="data-item">
                <span>Indirect Impact:</span>
                <strong>{Number(benIndirect || 0).toLocaleString()}</strong>
              </div>
            </div>
          </div>
        </div>
        <div className="current-data-section">
          <h3 className="section-title">🕒 Budget Adjustment History</h3>
          <div className="history-table-container">
            {historyLoading ? (
              <div className="loading-state">Loading history...</div>
            ) : budgetHistory.length === 0 ? (
              <div className="empty-state">No historical records found.</div>
            ) : (
              <table className="history-table">
                <thead>
                  <tr>
                    <th>Fiscal Year</th>
                    <th>Allocated Amount</th>
                    <th>Spent Amount</th>
                    <th>Balance</th>
                    <th>Beneficiaries</th>
                    <th>Entry Date</th>
                  </tr>
                </thead>
                <tbody>
                  {budgetHistory.map((entry) => {
                    const bal =
                      Number(entry.total_allocated) - Number(entry.total_spent);
                    return (
                      <tr key={entry.id}>
                        <td>{entry.fiscal_year}</td>
                        <td className="text-primary">
                          Rs {Number(entry.total_allocated).toLocaleString()}
                        </td>
                        <td className="text-warning">
                          Rs {Number(entry.total_spent).toLocaleString()}
                        </td>
                        <td
                          className={bal < 0 ? "text-danger" : "text-success"}
                        >
                          Rs {bal.toLocaleString()}
                        </td>
                        <td>
                          <div className="ben-chip">
                            {entry.total_beneficiaries} Total
                          </div>
                        </td>
                        <td className="text-muted">
                          {new Date(entry.created_at).toLocaleDateString(
                            "en-GB",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            },
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </OfficerLayout>
  );
}
