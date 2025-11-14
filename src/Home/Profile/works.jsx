import './works.css';

const mockWorks = [
  {
    id: 1,
    title: 'सडक मर्मत कार्य',
    subtitle: 'वडा नं. १, काठमाडौं',
    description: 'मुख्य सडकको मरम्मत तथा सुधार, सडक पखाल र डाम शुद्धीकरण सहित।',
    imageUrl: 'https://sewellbeard.com/wp-content/uploads/2021/02/us-72-west-road-project.jpeg',
    startDate: '२०७९/०५/०१',
    endDate: '२०७९/०८/२५',
    budget: 'रु. २०,००,०००',
    beneficiaries: '5,000',
    status: 'completed'
  }
];

const Works = () => {
  const work = mockWorks[0];
  const isLoggedIn = false;
  const placeholderText = isLoggedIn
    ? 'Share your thoughts about this work...'
    : 'Login to comment...';

  return (
    <section className="works-section">
      <div className="works-card">
        <div className="works-card-header">
          <div>
            <p className="works-label">कार्य</p>
            <h3>{work.title}</h3>
            <p className="works-subtitle">{work.subtitle}</p>
          </div>
          <span className="status-pill">{work.status}</span>
        </div>

        <img src={work.imageUrl} alt={work.title} className="works-image" />

        <div className="works-details">
          <div>
            <strong>Start Date</strong>
            <p>{work.startDate}</p>
          </div>
          <div>
            <strong>End Date</strong>
            <p>{work.endDate}</p>
          </div>
          <div>
            <strong>Budget</strong>
            <p>{work.budget}</p>
          </div>
          <div>
            <strong>Beneficiaries</strong>
            <p>{work.beneficiaries}</p>
          </div>
        </div>

        <p className="works-description">{work.description}</p>

        <div className="comments-panel">
          <div className="comments-header">
            <h4>Comments & Feedback</h4>
            <span>0 comments</span>
          </div>
          <textarea
            className="comments-input"
            placeholder={placeholderText}
            maxLength={500}
            disabled={!isLoggedIn}
          />
          <div className="comments-footer">
            <div className="rating-controls">
              <span>Rating:</span>
              <div className="stars">☆☆☆☆☆</div>
            </div>
            <button className="login-comment" disabled={!isLoggedIn}>
              {isLoggedIn ? 'Comment' : 'Login to Comment'}
            </button>
          </div>
          {!isLoggedIn && (
            <p className="comments-helper">Please log in first to leave feedback.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Works;
