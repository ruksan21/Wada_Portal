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
        // Update user reaction state
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
    <div className="work-card" style={{ position: "relative" }}>
      {/* Action Buttons and Status on Top Right */}
      <div className="work-actions">
        <button className="btn-edit-work" onClick={() => onEdit(work)}>
          <span>✏️</span> Edit
        </button>
        <button className="btn-delete-work" onClick={() => onDelete(work.id)}>
          <span>🗑️</span> Delete
        </button>
      </div>

      <div className="work-header">
        <div className="work-header-main">
          <div className="work-label-group">
            <span className="work-label">WORKS</span>
            <span
              className={`status-badge status-${work.status.toLowerCase()}`}
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
              "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80";
          }}
        />
      </div>

      <div className="work-stats-grid">
        <div className="stat-item">
          <label>Start Date</label>
          <div>{work.start_date || work.startDate || "N/A"}</div>
        </div>
        <div className="stat-item">
          <label>End Date</label>
          <div>{work.end_date || work.endDate || "N/A"}</div>
        </div>
        <div className="stat-item">
          <label>Budget</label>
          <div>
            {work.budget.startsWith("Rs.") ? work.budget : `Rs. ${work.budget}`}
          </div>
        </div>
        <div className="stat-item">
          <label>Beneficiaries</label>
          <div>{work.beneficiaries}</div>
        </div>
      </div>

      <div className="work-description">
        <p>{work.description}</p>
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

            {/* Reaction Breakdown Tooltip */}
            <div className="reaction-tooltip">
              {Object.keys(reactionBreakdown).length > 0 ? (
                Object.entries(reactionBreakdown).map(([type, count]) => {
                  const reaction = reactionTypes.find((r) => r.type === type);
                  return count > 0 && reaction ? (
                    <div key={type} className="reaction-breakdown-item">
                      <span className="reaction-icon">{reaction.icon}</span>
                      <span className="reaction-label">{reaction.label}</span>
                      <span className="reaction-count">{count}</span>
                    </div>
                  ) : null;
                })
              ) : (
                <div className="reaction-breakdown-item">
                  <span className="reaction-icon">👍</span>
                  <span className="reaction-label">Like</span>
                  <span className="reaction-count">{likes}</span>
                </div>
              )}
            </div>
          </div>
        )}
        <div className="fb-stats-summary">
          <span className="stat-text">{work.comments_count || 0} comments</span>
        </div>
      </div>

      {/* Functional Interaction Bar */}
      <div className="fb-interaction-bar">
        <div
          className="fb-interaction-wrapper"
          style={{ position: "relative" }}
        >
          <div
            className="fb-reaction-dock top-dock"
            style={{ bottom: "100%", marginBottom: "5px" }}
          >
            {reactionTypes.map((r) => (
              <span
                key={r.type}
                className="reaction-emoji"
                onClick={(e) => {
                  e.stopPropagation();
                  handleLike(r.type);
                }}
                title={r.label}
              >
                {r.icon}
              </span>
            ))}
          </div>
          <button
            className={`fb-btn like-btn ${
              isLiked ? `reacted type-${userReaction || "like"}` : ""
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

      {/* Comment Section Integration */}
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
  const [wardError, setWardError] = useState(null);

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
      const url = `${API_ENDPOINTS.works.getAll}?${params.toString()}`;
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setWorks(data.data || []);
          } else {
            setWorks([]);
          }
          setIsLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching works:", err);
          setIsLoading(false);
        });
    },
    [user?.id],
  );

  useEffect(() => {
    if (workLocation) {
      fetchWorks(workLocation);
    }
  }, [workLocation, fetchWorks]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingWork, setEditingWork] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "pending",
    fiscalYear: "",
    budget: "",
    startDate: "",
    endDate: "",
    contractorName: "",
    beneficiaries: "",
    image: "",
    imageFile: null,
  });

  const handleOpenForm = (work = null) => {
    if (work) {
      setEditingWork(work);
      setFormData({
        title: work.title,
        description: work.description,
        status: work.status,
        fiscalYear: work.fiscalYear,
        budget: work.budget,
        startDate: work.startDate,
        endDate: work.endDate,
        contractorName: work.contractorName,
        beneficiaries: work.beneficiaries,
        image: work.image,
      });
    } else {
      setEditingWork(null);
      setFormData({
        title: "",
        description: "",
        status: "pending",
        fiscalYear: "",
        budget: "",
        startDate: "",
        endDate: "",
        contractorName: "",
        beneficiaries: "",
        image: "",
      });
    }
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingWork(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData({ ...formData, image: imageUrl, imageFile: file });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("budget", formData.budget);
    formDataToSend.append("start_date", formData.startDate);
    formDataToSend.append("end_date", formData.endDate);
    formDataToSend.append("beneficiaries", formData.beneficiaries);
    formDataToSend.append("status", formData.status);
    formDataToSend.append("officer_id", user.id);

    // Add work ID for update
    if (editingWork) {
      formDataToSend.append("id", editingWork.id);
    }

    if (workLocation) {
      formDataToSend.append("work_province", workLocation.work_province || "");
      formDataToSend.append("work_district", workLocation.work_district || "");
      formDataToSend.append(
        "work_municipality",
        workLocation.work_municipality || "",
      );
      formDataToSend.append("work_ward", String(workLocation.work_ward || ""));
    }

    if (formData.imageFile) {
      formDataToSend.append("image", formData.imageFile);
    }

    try {
      const url = editingWork
        ? `${API_ENDPOINTS.works.update}`
        : `${API_ENDPOINTS.works.add}`;

      const response = await fetch(url, {
        method: "POST",
        body: formDataToSend,
      });

      const data = await response.json();

      if (response.status === 422) {
        setWardError(
          data.message || "Ward not found. Ask admin to create this ward.",
        );
        handleCloseForm();
        return;
      }

      if (data.success) {
        setWardError(null);
        toast.success(
          editingWork
            ? "Work updated successfully!"
            : "Work saved successfully!",
        );
        fetchWorks(workLocation);
        handleCloseForm();
      } else {
        toast.error("Error: " + data.message);
      }
    } catch (error) {
      console.error("Error saving work:", error);
      toast.error("Failed to save work");
    }
  };

  const handleDelete = async (id) => {
    if (
      window.confirm("Are you sure you want to delete this development work?")
    ) {
      try {
        const response = await fetch(API_ENDPOINTS.works.delete, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id, officer_id: user.id }),
        });

        const data = await response.json();
        if (data.success) {
          toast.success("Work deleted successfully!");
          fetchWorks(workLocation);
        } else {
          toast.error("Error: " + data.message);
        }
      } catch (error) {
        console.error("Error deleting work:", error);
        toast.error("Failed to delete work");
      }
    }
  };

  return (
    <OfficerLayout title="Development Works">
      <div className="officer-works-header">
        <div className="header-info">
          <p style={{ color: "#718096", margin: 0 }}>
            Manage and monitor development projects in your ward
          </p>
          {wardError && (
            <div
              className="ward-error-alert"
              style={{
                marginTop: "8px",
                color: "#e53e3e",
                fontSize: "0.875rem",
              }}
            >
              ⚠️ {wardError}
            </div>
          )}
        </div>
        <button className="btn-create-work" onClick={() => handleOpenForm()}>
          + Add New Work
        </button>
      </div>

      {isFormOpen && (
        <div className="work-form-overlay">
          <div className="work-form-modal">
            <div className="form-modal-header">
              <h2>{editingWork ? "Edit Project" : "Add New Project"}</h2>
              <button className="btn-close-modal" onClick={handleCloseForm}>
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="work-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Project Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., Ward 4 Road Maintenance"
                  />
                </div>
                <div className="form-group">
                  <label>Status *</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                  >
                    <option value="Upcoming">Upcoming</option>
                    <option value="Pending">Pending</option>
                    <option value="Ongoing">Ongoing</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  placeholder="Provide project details..."
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Budget (Rs.) *</label>
                  <input
                    type="number"
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Beneficiaries *</label>
                  <input
                    type="text"
                    name="beneficiaries"
                    value={formData.beneficiaries}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., 500+ households"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Start Date</label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>End Date</label>
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Project Image</label>
                <div className="image-upload-wrapper">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  {formData.image && (
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="image-preview"
                    />
                  )}
                </div>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={handleCloseForm}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-submit">
                  {editingWork ? "Update Project" : "Save Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="works-grid">
        {isLoading ? (
          <div className="loading-state">Loading works...</div>
        ) : works.length === 0 ? (
          <div className="empty-state">
            <p>No development works found for your ward.</p>
          </div>
        ) : (
          works.map((work) => (
            <WorkCard
              key={work.id}
              work={work}
              onEdit={handleOpenForm}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
    </OfficerLayout>
  );
}
