import React from "react";
import Navbar from "../Nav/Navbar";
import "./HelpSupport.css";

const HelpSupport = () => {
  const faqs = [
    {
      id: 1,
      question: "How do I register on the portal?",
      answer:
        'Click on the "Register" button at the top right corner, fill in your details including name, email, phone number, and create a password. You will receive a confirmation email after successful registration.',
    },
    {
      id: 2,
      question: "How can I view ward chairperson information?",
      answer:
        'Select your municipality and ward number from the dropdown menu on the home page. The ward chairperson\'s profile, works, and ratings will be displayed.',
    },
    {
      id: 3,
      question: "How do I rate and comment on works?",
      answer:
        "Login to your account, navigate to the works section under the ward chairperson's profile, select a star rating (1-5), write your comment, and click submit. You must be logged in to leave feedback.",
    },
    {
      id: 4,
      question: "Can I edit my profile information?",
      answer:
        'Yes, go to "My Profile" from the user menu, click the "Edit Profile" button, make your changes, and click "Save" to update your information.',
    },
    {
      id: 5,
      question: "How do I reset my password?",
      answer:
        'Click on "Forgot Password" on the login page, enter your registered email address, and you will receive instructions to reset your password.',
    },
    {
      id: 6,
      question: "What types of work information can I see?",
      answer:
        "You can view details about infrastructure projects, development works, budget allocation, beneficiaries, completion status, timelines, and photos of ongoing and completed works in your ward.",
    },
  ];

  const contactInfo = [
    {
      icon: "📧",
      title: "Email Support",
      detail: "support@wadaportal.gov.np",
      description: "Get response within 24 hours",
    },
    {
      icon: "📞",
      title: "Phone Support",
      detail: "+977-1-4211234",
      description: "Mon-Fri, 10:00 AM - 5:00 PM",
    },
    {
      icon: "📍",
      title: "Office Address",
      detail: "Kathmandu Metropolitan City",
      description: "Ward Office, Kathmandu",
    },
  ];

  const quickLinks = [
    { icon: "📖", title: "User Guide", link: "#" },
    { icon: "🎥", title: "Video Tutorials", link: "#" },
    { icon: "📄", title: "Terms & Conditions", link: "#" },
    { icon: "🔒", title: "Privacy Policy", link: "#" },
  ];

  return (
    <>
      <Navbar showHomeContent={false} />
      <div className="help-support-page">
        <div className="help-container">
          {/* Header */}
          <div className="help-header">
            <h1>Help & Support Center</h1>
            <p>Find answers to common questions and get assistance</p>
          </div>

        {/* Contact Cards */}
        <div className="contact-section">
          <h2>Contact Us</h2>
          <div className="contact-grid">
            {contactInfo.map((contact, index) => (
              <div key={index} className="contact-card">
                <div className="contact-icon">{contact.icon}</div>
                <h3>{contact.title}</h3>
                <p className="contact-detail">{contact.detail}</p>
                <p className="contact-description">{contact.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div className="faq-section">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-list">
            {faqs.map((faq) => (
              <details key={faq.id} className="faq-item">
                <summary className="faq-question">
                  <span>{faq.question}</span>
                  <span className="faq-arrow">▼</span>
                </summary>
                <div className="faq-answer">{faq.answer}</div>
              </details>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="quick-links-section">
          <h2>Quick Links</h2>
          <div className="quick-links-grid">
            {quickLinks.map((link, index) => (
              <a key={index} href={link.link} className="quick-link-card">
                <span className="quick-link-icon">{link.icon}</span>
                <span>{link.title}</span>
              </a>
            ))}
          </div>
        </div>

        
      </div>
    </div>
    </>
  );
};

export default HelpSupport;
