import React, { useState, useEffect } from "react";
import { useAuth } from "../Context/AuthContext";
import "./CommentSection.css";

const CommentSection = ({ workId }) => {
  const { user } = useAuth();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Frontend-only: initialize with empty comments per workId
    setComments([]);
  }, [workId]);

  // Show notification
  const showNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  // Removed backend/localStorage fetch — comments live in memory for this session

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    if (!user) {
      showNotification('error', 'Please log in to submit a comment');
      return;
    }

    // Validation
    const newErrors = {};
    if (rating === 0) {
      newErrors.rating = "Please select a rating";
    }
    if (comment.trim() === "") {
      newErrors.comment = "Please write a comment";
    }
    if (comment.trim().length < 10) {
      newErrors.comment = "Comment must be at least 10 characters";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      showNotification('error', 'Please fix the errors before submitting');
      return;
    }

    setLoading(true);

    // Frontend-only submission: add to in-memory list
    const newComment = {
      id: Date.now(),
      user_name: user.name || "Anonymous",
      user_photo: user.photoUrl || "/default-avatar.png",
      rating: rating,
      comment: comment,
      created_at: new Date().toISOString(),
    };

    const updatedComments = [newComment, ...comments];
    setComments(updatedComments);

    setRating(0);
    setComment("");
    setErrors({});
    showNotification('success', '✓ Comment submitted (session-only)');
    setLoading(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString("en-GB");
  };

  const renderStars = (currentRating, isInteractive = false) => {
    return (
      <div className="star-rating">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`star ${
              star <= (isInteractive ? hoverRating || rating : currentRating)
                ? "filled"
                : ""
            }`}
            onClick={() => isInteractive && setRating(star)}
            onMouseEnter={() => isInteractive && setHoverRating(star)}
            onMouseLeave={() => isInteractive && setHoverRating(0)}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="comment-section">
      {/* Notification Toast */}
      {notification && (
        <div className={`notification-toast ${notification.type}`}>
          <span>{notification.message}</span>
          <button onClick={() => setNotification(null)} className="close-toast">×</button>
        </div>
      )}

      <div className="comment-header">
        <h3>Comments & Feedback</h3>
        <span className="comment-count">{comments.length} comments</span>
      </div>

      {/* Comment Form */}
      <div className="comment-form-container">
        {!user ? (
          <div className="login-prompt">
            <p>Login to comment...</p>
            <div className="rating-preview">
              Rating: {renderStars(0, false)}
            </div>
            <p className="login-message">
              Please log in first to save feedback.
            </p>
          </div>
        ) : (
          <form className="comment-form" onSubmit={handleSubmit}>
            <div className="user-info">
              <img
                src={user.photoUrl || "/default-avatar.png"}
                alt={user.name}
                className="user-avatar"
              />
              <span className="user-name">{user.name}</span>
            </div>

            <div className="rating-input">
              <label>Rating: {rating > 0 && <span className="rating-value">({rating}/5)</span>}</label>
              {renderStars(rating, true)}
              {errors.rating && <span className="error-message">{errors.rating}</span>}
            </div>

            <div className="textarea-wrapper">
              <textarea
                className={`comment-textarea ${errors.comment ? 'error' : ''}`}
                placeholder="Write your comment (minimum 10 characters)..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows="4"
                maxLength="500"
              />
              <div className="textarea-footer">
                {errors.comment && <span className="error-message">{errors.comment}</span>}
                <span className="char-counter">{comment.length}/500</span>
              </div>
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? (
                <><span className="spinner"></span> Submitting...</>
              ) : (
                'Submit Comment'
              )}
            </button>
          </form>
        )}
      </div>

      {/* Comments List */}
      <div className="comments-list">
        {comments.length === 0 ? (
          <p className="no-comments">
            No comments yet. Be the first to comment!
          </p>
        ) : (
          comments.map((c) => (
            <div key={c.id} className="comment-card">
              <div className="comment-user">
                <img
                  src={c.user_photo}
                  alt={c.user_name}
                  className="comment-avatar"
                />
                <div className="comment-user-info">
                  <span className="comment-user-name">{c.user_name}</span>
                  <span className="comment-date">
                    {formatDate(c.created_at)}
                  </span>
                </div>
              </div>
              <div className="comment-rating">
                {renderStars(c.rating, false)}
              </div>
              <p className="comment-text">{c.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CommentSection;
