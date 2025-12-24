import React, { useState } from "react";
import Navbar from "../Nav/Navbar";
import "./Documents.css";

export default function Documents() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedCards, setExpandedCards] = useState({});
  const [selectedService, setSelectedService] = useState(null);

  // Service categories with labels from image
  const categories = [
    { id: "all", name: "All Services", icon: "⊞" },
    { id: "certificates", name: "Certificates", icon: "📜" },
    { id: "registration", name: "Registration", icon: "📋" },
    { id: "tax", name: "Tax & Revenue", icon: "💰" },
    { id: "social", name: "Social Welfare", icon: "❤️" },
    { id: "other", name: "Other Services", icon: "⋯" },
  ];

  // Complete service catalog
  const documents = [
    {
      id: 1,
      title: "Citizenship Certificate",
      category: "certificates",
      categoryLabel: "certificate",
      description:
        "Apply for Nepali citizenship certificate for eligible citizens",
      time: "7-15 working days",
      fee: "Rs. 100",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      icon: "👤",
      requiredDocs: [
        "Birth certificate",
        "Parents' citizenship certificates",
        "Passport size photos (2 copies)",
        "Recommendation letter from ward office",
        "Proof of residence",
      ],
    },
    {
      id: 2,
      title: "Birth Certificate",
      category: "certificates",
      categoryLabel: "certificate",
      description: "Register birth and obtain birth certificate",
      time: "1-3 working days",
      fee: "Rs. 50",
      gradient: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
      icon: "👶",
      requiredDocs: [
        "Hospital birth certificate",
        "Parents' citizenship certificates",
        "Parents' marriage certificate",
        "Passport size photo of child",
        "Application form",
      ],
    },
    {
      id: 3,
      title: "Marriage Certificate",
      category: "certificates",
      categoryLabel: "certificate",
      description: "Register marriage and obtain marriage certificate",
      time: "1-2 working days",
      fee: "Rs. 100",
      gradient: "linear-gradient(135deg, #ee0979 0%, #ff6a00 100%)",
      icon: "💑",
      requiredDocs: [
        "Both parties' citizenship certificates",
        "Passport size photos (2 copies each)",
        "Two witnesses with citizenship",
        "Age verification documents",
        "Divorce decree (if applicable)",
      ],
    },
    {
      id: 4,
      title: "Death Certificate",
      category: "certificates",
      categoryLabel: "certificate",
      description: "Register death and obtain death certificate",
      time: "1-2 working days",
      fee: "Rs. 50",
      gradient: "linear-gradient(135deg, #434343 0%, #000000 100%)",
      icon: "🕊️",
      requiredDocs: [
        "Hospital death certificate or police report",
        "Deceased's citizenship certificate",
        "Applicant's citizenship certificate",
        "Passport size photos (2 copies)",
        "Relationship proof document",
      ],
    },
    {
      id: 5,
      title: "Business Registration",
      category: "registration",
      categoryLabel: "registration",
      description: "Register new business or company",
      time: "5-10 working days",
      fee: "Rs. 500-2000 (based on type)",
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      icon: "🏢",
      requiredDocs: [
        "Owner's citizenship certificate",
        "PAN certificate",
        "Business location proof",
        "Business plan document",
        "Partnership agreement (if applicable)",
        "Passport size photos",
      ],
    },
    {
      id: 6,
      title: "Land Tax Payment",
      category: "tax",
      categoryLabel: "tax",
      description: "Pay annual land tax and property tax",
      time: "Same day",
      fee: "Based on land value",
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      icon: "🏞️",
      requiredDocs: [
        "Land ownership certificate",
        "Previous year tax receipt",
        "Citizenship certificate",
        "Land survey document",
      ],
    },
    {
      id: 7,
      title: "House Tax Payment",
      category: "tax",
      categoryLabel: "tax",
      description: "Pay annual house and building tax",
      time: "Same day",
      fee: "Based on house value",
      gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
      icon: "🏠",
      requiredDocs: [
        "House ownership certificate",
        "Previous year tax receipt",
        "Citizenship certificate",
        "Building completion certificate",
      ],
    },
    {
      id: 8,
      title: "Senior Citizen Allowance",
      category: "social",
      categoryLabel: "social welfare",
      description: "Apply for senior citizen monthly allowance",
      time: "15-30 working days",
      fee: "Free",
      gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
      icon: "👴",
      requiredDocs: [
        "Citizenship certificate (age 70+)",
        "Bank account details",
        "Passport size photos (2 copies)",
        "Age verification document",
        "Recommendation letter from ward",
      ],
    },
    {
      id: 9,
      title: "Disability ID Card",
      category: "social",
      categoryLabel: "social welfare",
      description: "Apply for disability identification card",
      time: "10-20 working days",
      fee: "Free",
      gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
      icon: "♿",
      requiredDocs: [
        "Citizenship certificate",
        "Medical certificate from authorized hospital",
        "Passport size photos (3 copies)",
        "Guardian's citizenship (if minor)",
        "Disability assessment report",
      ],
    },
    {
      id: 10,
      title: "Ward Recommendation",
      category: "other",
      categoryLabel: "recommendation",
      description: "Get ward recommendation letter for various purposes",
      time: "1-2 working days",
      fee: "Rs. 50-100",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      icon: "📝",
      requiredDocs: [
        "Citizenship certificate",
        "Passport size photos (2 copies)",
        "Purpose description letter",
        "Supporting documents for purpose",
      ],
    },
    {
      id: 11,
      title: "Income Certificate",
      category: "other",
      categoryLabel: "certificate",
      description: "Get income verification certificate",
      time: "3-5 working days",
      fee: "Rs. 100",
      gradient: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
      icon: "💵",
      requiredDocs: [
        "Citizenship certificate",
        "Income source documents",
        "Tax clearance certificate",
        "Bank statements (6 months)",
        "Employer letter (if employed)",
      ],
    },
    {
      id: 12,
      title: "Building Permit",
      category: "other",
      categoryLabel: "permit",
      description: "Get permission for building construction",
      time: "15-30 working days",
      fee: "Rs. 2000-10000 (based on size)",
      gradient: "linear-gradient(135deg, #ff9a56 0%, #ff6a88 100%)",
      icon: "🏗️",
      requiredDocs: [
        "Land ownership certificate",
        "Building design and map",
        "Engineer's certificate",
        "Environmental clearance",
        "Neighbor's no objection",
        "Citizenship certificate",
      ],
    },
  ];

  const filteredDocuments = documents.filter((doc) => {
    const matchesCategory =
      activeCategory === "all" || doc.category === activeCategory;
    const matchesSearch = doc.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleExpand = (docId) => {
    setExpandedCards((prev) => ({
      ...prev,
      [docId]: !prev[docId],
    }));
  };

  const openModal = (service) => {
    setSelectedService(service);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedService(null);
    document.body.style.overflow = "unset";
  };

  return (
    <>
      <Navbar showHomeContent={false} />
      <div className="documents-page">
        {/* Hero Section */}
        <div className="documents-hero">
          <div className="hero-content">
            <div className="hero-icon">📄</div>
            <h1>Required Documents</h1>
            <p>
              Complete information about documents required for various services
            </p>

            <div className="hero-search">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search for services or documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="documents-container">
          {/* Filter Section - Matching Image exactly */}
          <div className="filter-section">
            <div className="filter-header">
              <span className="filter-toggle-icon">≡</span>
              <h2>Filter by Category</h2>
            </div>

            <div className="category-grid">
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  className={`category-card ${
                    activeCategory === cat.id ? "active" : ""
                  }`}
                  onClick={() => setActiveCategory(cat.id)}
                >
                  <div className="category-icon-wrapper">
                    <span className="category-icon">{cat.icon}</span>
                  </div>
                  <span className="category-name">{cat.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="services-count">
            <span className="count-bar">|</span> {filteredDocuments.length}{" "}
            services found
          </div>

          {/* Services Grid */}
          <div className="services-grid">
            {filteredDocuments.map((doc) => {
              const isExpanded = expandedCards[doc.id];
              const visibleDocs = isExpanded
                ? doc.requiredDocs
                : doc.requiredDocs.slice(0, 3);
              const hasMore = doc.requiredDocs.length > 3;

              return (
                <div key={doc.id} className="service-card">
                  <div
                    className="service-card-header"
                    style={{ background: doc.gradient }}
                  >
                    <div className="service-icon-badge">{doc.icon}</div>
                    <h3>{doc.title}</h3>
                    <p className="service-desc">{doc.description}</p>
                  </div>

                  <div className="service-card-body">
                    <div className="service-info-row">
                      <div className="info-item time">
                        <span className="info-icon">🕐</span>
                        <div className="info-text">
                          <span className="info-label">Time</span>
                          <span className="info-value">{doc.time}</span>
                        </div>
                      </div>
                      <div className="info-item fee">
                        <span className="info-icon">✓</span>
                        <div className="info-text">
                          <span className="info-label">Fee</span>
                          <span className="info-value">{doc.fee}</span>
                        </div>
                      </div>
                    </div>

                    <div className="required-docs-section">
                      <div className="docs-header">
                        <span className="docs-icon">📋</span>
                        <strong>Required Documents</strong>
                      </div>
                      <ul className="docs-list">
                        {visibleDocs.map((reqDoc, index) => (
                          <li key={index}>
                            <span className="bullet">•</span> {reqDoc}
                          </li>
                        ))}
                      </ul>
                      {hasMore && (
                        <button
                          className="show-more-btn"
                          onClick={() => toggleExpand(doc.id)}
                        >
                          {isExpanded
                            ? "Show less"
                            : `${doc.requiredDocs.length - 3} more...`}
                        </button>
                      )}
                    </div>

                    <button
                      className="view-details-btn"
                      onClick={() => openModal(doc)}
                    >
                      View Full Details
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Popup */}
        {selectedService && (
          <div className="documents-modal-overlay" onClick={closeModal}>
            <div
              className="documents-modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="documents-modal-header"
                style={{ background: selectedService.gradient }}
              >
                <div className="documents-modal-icon-badge">
                  {selectedService.icon}
                </div>
                <div className="documents-modal-title-info">
                  <h2>{selectedService.title}</h2>
                  <p>{selectedService.description}</p>
                </div>
                <button
                  className="documents-modal-close-btn"
                  onClick={closeModal}
                >
                  ✕
                </button>
              </div>

              <div className="documents-modal-body">
                <div className="documents-modal-info-row">
                  <div className="documents-modal-info-card time">
                    <span className="documents-modal-info-icon">🕐</span>
                    <div className="documents-modal-info-text">
                      <span className="documents-modal-label">
                        Processing Time
                      </span>
                      <span className="documents-modal-value">
                        {selectedService.time}
                      </span>
                    </div>
                  </div>
                  <div className="documents-modal-info-card fee">
                    <span className="documents-modal-info-icon">💰</span>
                    <div className="documents-modal-info-text">
                      <span className="documents-modal-label">Fee</span>
                      <span className="documents-modal-value">
                        {selectedService.fee}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="documents-modal-docs-section">
                  <h3>Required Documents</h3>
                  <ul className="documents-modal-docs-list">
                    {selectedService.requiredDocs.map((doc, index) => (
                      <li key={index}>
                        <div className="documents-modal-doc-num">
                          {index + 1}
                        </div>
                        <span className="documents-modal-doc-name">{doc}</span>
                        <span className="documents-modal-doc-check">✓</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
