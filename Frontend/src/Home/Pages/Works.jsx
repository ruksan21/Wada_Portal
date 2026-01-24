import React, { useState, useEffect } from "react";
import Navbar from "../Nav/Navbar";
import { useWard } from "../Context/WardContext";
import CommentSection from "../Component/CommentSection";
import "./Works.css";
import { API_ENDPOINTS, API_BASE_URL } from "../../config/api";
import { useAuth } from "../Context/AuthContext";
import { toast } from "react-toastify";

const WorkCard = ({ work }) => {
  const { user } = useAuth();
  const [likes, setLikes] = useState(parseInt(work.likes_count) || 0);
  const [isLiked, setIsLiked] = useState(work.user_liked > 0);
  const [userReaction, setUserReaction] = useState(work.user_reaction);
  const [reactionBreakdown, setReactionBreakdown] = useState(
    work.reaction_breakdown || {},
  );
  const [showComments, setShowComments] = useState(false);

  // Sync props to state (crucial for when list refreshes or component is reused)
  useEffect(() => {
    setLikes(parseInt(work.likes_count) || 0);
    setIsLiked(work.user_liked > 0);
    setUserReaction(work.user_reaction);
    setReactionBreakdown(work.reaction_breakdown || {});
  }, [work]);

  // Reaction Types
  const reactionTypes = [
    { type: "like", icon: "👍", label: "Like", color: "#dab748ff" },
    { type: "love", icon: "❤️", label: "Love", color: "#f33e58" },
    { type: "care", icon: "🥰", label: "Care", color: "#f7b125" },
    { type: "haha", icon: "😆", label: "Haha", color: "#f7b125" },
    { type: "wow", icon: "😮", label: "Wow", color: "#f7b125" },
    { type: "sad", icon: "😢", label: "Sad", color: "#f7b125" },
    { type: "angry", icon: "😡", label: "Angry", color: "#e9710f" },
  ];

  // Format budget to ensure it's displayed properly
  const formatBudget = (budget) => {
    if (!budget) return "N/A";
    const budgetStr = String(budget);
    if (budgetStr.startsWith("Rs.")) return budgetStr;
    // Add commas for readability
    const num = parseFloat(budgetStr.replace(/[^0-9.]/g, ""));
    if (isNaN(num)) return budgetStr;
    return `Rs. ${num.toLocaleString("en-IN")}`;
  };

  const handleLike = async (reactionType = "like") => {
    if (!user) return toast.info("Please login to like.");
    try {
      const res = await fetch(API_ENDPOINTS.works.toggleLike, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          work_id: work.id,
          user_id: user.id,
          reaction_type: reactionType,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setLikes(data.likes);
        setIsLiked(data.liked);
        setUserReaction(data.user_reaction);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="work-card">
      <div className="work-header">
        <div className="work-header-main">
          <div className="work-label-group">
            <span className="work-label">DEVELOPMENT WORK</span>
            <span
              className={`work-status-tag status-${work.status.toLowerCase()}`}
            >
              {work.status}
            </span>
          </div>
          <h3 className="work-title">{work.title}</h3>

          <div className="work-location-pill">
            <span className="pill-icon">📍</span>
            <span className="pill-text">
              {work.province}, {work.district_name}, {work.municipality}, Ward{" "}
              {work.ward_number}
            </span>
          </div>
        </div>
      </div>

      <div className="work-image-container">
        <img
          src={
            work.image
              ? `${API_BASE_URL}/${work.image}`
              : "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80"
          }
          alt={work.title}
          className="work-image"
          onError={(e) => {
            e.target.src =
              "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80"; // Fallback
          }}
        />
      </div>

      {/* Budget Highlight Section */}
      <div className="work-budget-highlight">
        <div className="budget-icon">💰</div>
        <div className="budget-details">
          <div className="budget-label">Project Budget</div>
          <div className="budget-amount">{formatBudget(work.budget)}</div>
        </div>
      </div>

      <div className="work-stats-grid">
        <div className="stat-item">
          <label>📅 Start Date</label>
          <div>{work.start_date || work.startDate || "Not specified"}</div>
        </div>
        <div className="stat-item">
          <label>📅 End Date</label>
          <div>{work.end_date || work.endDate || "Not specified"}</div>
        </div>
        <div className="stat-item">
          <label>👥 Beneficiaries</label>
          <div>{work.beneficiaries || "N/A"}</div>
        </div>
        <div className="stat-item">
          <label>📊 Status</label>
          <div className="status-text">{work.status}</div>
        </div>
      </div>

      <div className="work-description">
        <h4 className="description-title">Project Details</h4>
        <p>{work.description}</p>
      </div>

      {/* Notice Section */}
      <div className="work-notice-section">
        <div className="notice-icon">📢</div>
        <div className="notice-text">
          For official notices and updates related to this project, check the
          Ward Notices section.
        </div>
      </div>

      <div className="fb-feedback-summary">
        {likes > 0 && (
          <div className="fb-reaction-icons">
            {Object.keys(reactionBreakdown).length > 0 ? (
              Object.entries(reactionBreakdown)
                .filter(([, count]) => count > 0)
                .slice(0, 3)
                .map(([rt]) => {
                  const r = reactionTypes.find((item) => item.type === rt);
                  return r ? (
                    <span
                      key={rt}
                      className={`reaction-icon type-${rt}`}
                      style={{ fontSize: "20px" }}
                    >
                      {r.icon}
                    </span>
                  ) : null;
                })
            ) : (
              <span className="reaction-icon like" style={{ fontSize: "20px" }}>
                <i className="fa-solid fa-thumbs-up"></i>
              </span>
            )}
            <span className="reaction-count">{likes}</span>
          </div>
        )}
        <div className="fb-stats-summary">
          <span className="stat-text">{work.comments_count || 0} comments</span>
        </div>
      </div>

      {/* Interaction Bar */}
      {/* Interaction Bar */}
      <div className="work-interaction-bar">
        <div
          className="fb-interaction-wrapper"
          style={{ position: "relative" }}
        >
          <div
            className="fb-reaction-dock top-dock"
            style={{ bottom: "100%", marginBottom: "5px" }}
          >
            {" "}
            {/* Inline style for quick fix, prefer CSS class */}
            {reactionTypes.map((r) => (
              <span
                key={r.type}
                className="reaction-emoji"
                onClick={(e) => {
                  e.stopPropagation();
                  // Check if handleLike expects args
                  handleLike(r.type);
                }}
                data-label={r.label}
              >
                {r.icon}
              </span>
            ))}
          </div>
          <button
            className={`interaction-btn like-btn ${
              isLiked ? `liked type-${userReaction || "like"}` : ""
            }`}
            onClick={() =>
              handleLike(
                isLiked && userReaction === "like"
                  ? "like"
                  : userReaction || "like",
              )
            }
          >
            {userReaction &&
            reactionTypes.find((r) => r.type === userReaction) ? (
              <>
                <span className="current-reaction-icon">
                  {reactionTypes.find((r) => r.type === userReaction).icon}
                </span>
                <span
                  className="reaction-label"
                  style={{
                    color: reactionTypes.find((r) => r.type === userReaction)
                      .color,
                    fontWeight: "700",
                  }}
                >
                  {reactionTypes.find((r) => r.type === userReaction).label}
                </span>
              </>
            ) : (
              <>
                <i className="fa-regular fa-thumbs-up"></i>
                <span className="reaction-label">Like</span>
              </>
            )}
          </button>
        </div>

        <button
          className={`interaction-btn ${showComments ? "active" : ""}`}
          onClick={() => setShowComments(!showComments)}
        >
          <i className="fa-regular fa-comment"></i>
          <span>Comment</span>
        </button>

        <button
          className="interaction-btn share-btn"
          onClick={() => {
            const shareUrl = `${window.location.origin}/works?id=${work.id}`;
            navigator.clipboard.writeText(shareUrl);
            toast.success("Work details link copied to clipboard!");
          }}
        >
          <i className="fa-solid fa-share-nodes"></i>
          <span>Share</span>
        </button>
      </div>

      {/* Comment Section - Toggled by interaction bar */}
      <div
        className={`work-comments-container ${showComments ? "visible" : ""}`}
      >
        <CommentSection
          workId={work.id}
          initialExpanded={true}
          hideToggle={true}
        />
      </div>
    </div>
  );
};

export default function Works({ embedded = false, wardId }) {
  const { municipality, ward } = useWard();
  const { user } = useAuth();
  const [works, setWorks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    let url = API_ENDPOINTS.works.getAll;

    const params = new URLSearchParams();
    const searchParams = new URLSearchParams(window.location.search);
    const workId = searchParams.get("id");

    // Add current_user_id to check likes
    if (user?.id) params.append("current_user_id", user.id);

    if (workId) {
      params.append("id", workId);
    } else if (wardId) {
      // If specific ward ID provided (e.g. Profile page), use strict ID filter
      params.append("ward_id", wardId);
    } else {
      // Otherwise use Global Context filters
      if (ward) params.append("ward_number", ward);
      if (municipality) params.append("municipality", municipality);
    }

    const queryString = params.toString();
    if (queryString) {
      url += "?" + queryString;
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        // Support both direct array and {success, data} formats
        const worksList = data.data || (Array.isArray(data) ? data : []);
        setWorks(worksList);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching works:", err);
        setWorks([]);
        setIsLoading(false);
      });
  }, [ward, municipality, wardId, user?.id]); // Re-fetch when dependencies change

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
          {isLoading ? (
            <div className="loading-state">Loading works...</div>
          ) : works.length === 0 ? (
            <div className="empty-state">
              No development works found for this ward.
            </div>
          ) : (
            works.map((work) => <WorkCard key={work.id} work={work} />)
          )}
        </div>
        <div className="works-note">
          These work details are officially created and managed by Ward
          Officers.
        </div>
      </div>
    </>
  );
}
