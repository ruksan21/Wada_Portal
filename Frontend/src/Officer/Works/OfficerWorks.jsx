import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import OfficerLayout from "../Layout/OfficerLayout";
import "../../Home/Pages/Works.css";
import "./OfficerWorks.css";
import { useAuth } from "../../Home/Context/AuthContext";
import { API_ENDPOINTS, API_BASE_URL } from "../../config/api";
import CommentSection from "../../Home/Component/CommentSection";

const WorkCard = ({ work, onEdit, onDelete }) => {
  const { user } = useAuth();
  const [likes, setLikes] = useState(parseInt(work.likes_count) || 0);
  const [isLiked, setIsLiked] = useState(work.user_liked > 0);
  const [userReaction, setUserReaction] = useState(work.user_reaction);
  const [reactionBreakdown, setReactionBreakdown] = useState(
    work.reaction_breakdown || {},
  );
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    setLikes(parseInt(work.likes_count) || 0);
    setIsLiked(work.user_liked > 0);
    setUserReaction(work.user_reaction);
    setReactionBreakdown(work.reaction_breakdown || {});
  }, [work]);

  const reactionTypes = [
    { type: "like", icon: "👍", label: "Like", color: "#dab748ff" },
    { type: "love", icon: "❤️", label: "Love", color: "#f33e58" },
    { type: "care", icon: "🥰", label: "Care", color: "#f7b125" },
    { type: "haha", icon: "😆", label: "Haha", color: "#f7b125" },
    { type: "wow", icon: "😮", label: "Wow", color: "#f7b125" },
    { type: "sad", icon: "😢", label: "Sad", color: "#f7b125" },
    { type: "angry", icon: "😡", label: "Angry", color: "#e9710f" },
  ];

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
        if (data.reaction_breakdown) {
          setReactionBreakdown(data.reaction_breakdown);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="work-card">
      <div className="work-card-header">
        <div className="work-info-section">
          <div className="work-label-group">
            <span className="work-label">WORKS</span>
            <span
              className={`status-badge status-${work.status.replace(/\s+/g, "-").toLowerCase()}`}
            >
              {work.status}
            </span>
          </div>
          <h3 className="work-title">{work.title}</h3>
          <div className="work-location-text">
            {work.ward_number ? `Ward ${work.ward_number}, ` : ""}
            {work.municipality || work.district_name || work.province}
          </div>
        </div>

        <div className="work-card-actions">
          <button className="btn-edit-work-glass" onClick={() => onEdit(work)}>
            <span>✏️</span> Edit
          </button>
          <button
            className="btn-delete-work-glass"
            onClick={() => onDelete(work.id)}
          >
            <span>🗑️</span> Delete
          </button>
        </div>
      </div>

      <div className="work-image-container">
        <img
          src={
            work.image
              ? `${API_BASE_URL}/${work.image}`
              : "https://placehold.co/800x400?text=No+Image"
          }
          alt={work.title}
          className="work-image"
        />
      </div>

      <div className="work-stats-grid">
        <div className="stat-item">
          <label>Start Date</label>
          <div>{work.start_date || "N/A"}</div>
        </div>
        <div className="stat-item">
          <label>End Date</label>
          <div>{work.end_date || "N/A"}</div>
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

      {/* Facebook Style Feedback Bar */}
      <div className="fb-feedback-summary">
        {(likes > 0 || work.comments_count > 0) && (
          <>
            <div
              className="fb-reaction-icons"
              style={{ cursor: "pointer", position: "relative" }}
            >
              {likes > 0 && (
                <>
                  <div className="reaction-badges">
                    {Object.keys(reactionBreakdown).length > 0 ? (
                      Object.entries(reactionBreakdown)
                        .filter(([, count]) => count > 0)
                        .slice(0, 3)
                        .map(([rt]) => {
                          const icon = reactionTypes.find(
                            (r) => r.type === rt,
                          )?.icon;
                          return icon ? (
                            <span
                              key={rt}
                              className={`summary-icon badge-${rt}`}
                            >
                              {icon}
                            </span>
                          ) : null;
                        })
                    ) : (
                      <span className="summary-icon badge-like">👍</span>
                    )}
                  </div>
                  <span className="reaction-count">{likes}</span>
                </>
              )}
            </div>
            {work.comments_count > 0 && (
              <div
                className="fb-stats-summary"
                onClick={() => setShowComments(!showComments)}
              >
                <span className="stat-text">
                  {work.comments_count} comments
                </span>
              </div>
            )}
          </>
        )}
      </div>

      {/* Functional Interaction Bar */}
      <div className="fb-interaction-bar">
        <div className="fb-interaction-wrapper">
          <div className="fb-reaction-dock top-dock">
            {reactionTypes.map((r) => (
              <span
                key={r.type}
                className="reaction-emoji"
                onClick={(e) => {
                  e.stopPropagation();
                  handleLike(r.type);
                }}
                data-label={r.label}
              >
                {r.icon}
              </span>
            ))}
          </div>
          <button
            className={`fb-btn like-btn ${isLiked ? `reacted type-${userReaction || "like"}` : ""}`}
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
          className={`fb-btn ${showComments ? "active" : ""}`}
          onClick={() => setShowComments(!showComments)}
        >
          <i className="fa-regular fa-comment"></i>
          <span>Comment</span>
        </button>

        <button
          className="fb-btn"
          onClick={() => {
            const shareUrl = `${window.location.origin}/works?id=${work.id}`;
            navigator.clipboard.writeText(shareUrl);
            toast.success("Work link copied to clipboard!");
          }}
        >
          <i className="fa-solid fa-share-nodes"></i>
          <span>Share</span>
        </button>
      </div>

      {showComments && (
        <div className="fb-comments-section-container">
          <CommentSection
            workId={work.id}
            initialExpanded={true}
            hideToggle={true}
          />
        </div>
      )}
    </div>
  );
};

export default function OfficerWorks() {
  const { getOfficerWorkLocation, user } = useAuth();
  const workLocation = getOfficerWorkLocation();
  const [works, setWorks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchWorks = React.useCallback(
    (loc) => {
      setIsLoading(true);
      const params = new URLSearchParams({
        work_province: loc.work_province,
        work_district: loc.work_district,
        work_municipality: loc.work_municipality,
        work_ward: String(loc.work_ward || ""),
        current_user_id: user?.id || "",
      });
      fetch(`${API_ENDPOINTS.works.getAll}?${params.toString()}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) setWorks(data.data || []);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setIsLoading(false);
        });
    },
    [user?.id],
  );

  useEffect(() => {
    if (workLocation) fetchWorks(workLocation);
  }, [workLocation, fetchWorks]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingWork, setEditingWork] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "pending",
    budget: "",
    startDate: "",
    endDate: "",
    beneficiaries: "",
    imageFile: null,
  });

  const handleOpenForm = (work = null) => {
    if (work) {
      setEditingWork(work);
      setFormData({
        ...work,
        startDate: work.start_date,
        endDate: work.end_date,
      });
    } else {
      setEditingWork(null);
      setFormData({
        title: "",
        description: "",
        status: "pending",
        budget: "",
        startDate: "",
        endDate: "",
        beneficiaries: "",
        imageFile: null,
      });
    }
    setIsFormOpen(true);
  };

  const handleDeleteWork = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?"))
      return;
    try {
      const res = await fetch(`${API_ENDPOINTS.works.delete}?id=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Project deleted successfully");
        fetchWorks(workLocation);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete project");
    }
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingWork(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();

    // Explicit mapping to match backend expectations
    fd.append("title", formData.title);
    fd.append("description", formData.description);
    fd.append("status", formData.status);
    fd.append("budget", formData.budget);
    fd.append("start_date", formData.startDate);
    fd.append("end_date", formData.endDate);
    fd.append("beneficiaries", formData.beneficiaries || "");
    fd.append("officer_id", user.id);

    if (formData.imageFile) {
      fd.append("image", formData.imageFile);
    }

    if (editingWork) fd.append("id", editingWork.id);

    if (workLocation) {
      fd.append("work_province", workLocation.work_province);
      fd.append("work_district", workLocation.work_district || "");
      fd.append("work_municipality", workLocation.work_municipality);
      fd.append("work_ward", String(workLocation.work_ward));
    }

    try {
      const url = editingWork
        ? API_ENDPOINTS.works.update
        : API_ENDPOINTS.works.add;
      const res = await fetch(url, { method: "POST", body: fd });
      const data = await res.json();
      if (data.success) {
        toast.success(editingWork ? "Work updated!" : "Work added!");
        fetchWorks(workLocation);
        handleCloseForm();
      } else {
        toast.error(data.message || "Failed to save work");
      }
    } catch (err) {
      console.error(err);
      toast.error("Network error");
    }
  };

  return (
    <OfficerLayout title="Development Works">
      <div className="officer-works-page-header">
        <div className="header-text-group">
          <p className="header-subtitle">
            Manage and monitor development projects in your ward
          </p>
        </div>
        <button
          className="btn-add-work-primary"
          onClick={() => handleOpenForm()}
        >
          + Add New Work
        </button>
      </div>

      {isFormOpen && (
        <div className="work-form-overlay">
          <form onSubmit={handleSubmit} className="work-form-modal">
            <h3>{editingWork ? "Edit Work" : "Add New Work"}</h3>
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="Project Title"
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                required
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Project Description"
              />
            </div>
            <div
              className="form-row"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "15px",
              }}
            >
              <div className="form-group">
                <label>Budget (Rs.)</label>
                <input
                  type="number"
                  required
                  value={formData.budget}
                  onChange={(e) =>
                    setFormData({ ...formData, budget: e.target.value })
                  }
                  placeholder="e.g. 500000"
                />
              </div>
              <div className="form-group">
                <label>Status</label>
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                >
                  <option value="pending">Pending</option>
                  <option value="on-going">On-Going</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>
            <div
              className="form-row"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "15px",
              }}
            >
              <div className="form-group">
                <label>Start Date</label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) =>
                    setFormData({ ...formData, startDate: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label>End Date</label>
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) =>
                    setFormData({ ...formData, endDate: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="form-group">
              <label>Beneficiaries</label>
              <input
                type="text"
                value={formData.beneficiaries}
                onChange={(e) =>
                  setFormData({ ...formData, beneficiaries: e.target.value })
                }
                placeholder="e.g. 500 Households"
              />
            </div>
            <div className="form-group">
              <label>Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setFormData({ ...formData, imageFile: e.target.files[0] })
                }
              />
            </div>
            <div
              className="form-actions"
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "10px",
                marginTop: "20px",
              }}
            >
              <button
                type="button"
                onClick={handleCloseForm}
                className="fb-btn-cancel-edit"
              >
                Cancel
              </button>
              <button type="submit" className="fb-btn-save-edit">
                {editingWork ? "Update Work" : "Save Project"}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="works-grid">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          works.map((work) => (
            <WorkCard
              key={work.id}
              work={work}
              onEdit={handleOpenForm}
              onDelete={handleDeleteWork}
            />
          ))
        )}
      </div>
    </OfficerLayout>
  );
}
