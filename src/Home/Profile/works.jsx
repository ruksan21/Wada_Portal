import "./works.css";
import CommentSection from "../Component/CommentSection";

const mockWorks = [
  {
    id: 1,
    title: "Road Repair Work",
    subtitle: "Ward No. 1, Kathmandu",
    description:
      "Main road repair and improvement, including road cleaning and asphalt refinement.",
    imageUrl:
      "https://sewellbeard.com/wp-content/uploads/2021/02/us-72-west-road-project.jpeg",
    startDate: "2022/08/17",
    endDate: "2022/12/11",
    budget: "Rs. 20,00,000",
    beneficiaries: "5,000",
    status: "completed",
  },
];

const Works = () => {
  const work = mockWorks[0];

  return (
    <section className="works-section">
      <div className="works-card">
        <div className="works-card-header">
          <div>
            <p className="works-label">Works</p>
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
      </div>

      {/* Integrated Comment Section */}
      <CommentSection workId={work.id} />
    </section>
  );
};

export default Works;
