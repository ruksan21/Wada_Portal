import React from 'react';
import './profile.css';

// Data for the profile, which you can later fetch from a backend.
const profileData = {
    name: "Ram Bahadur Shrestha",
    role: "wardChairperson - Kathmandu Metropolitan City, wardNumber 1",
    phone: "9841234567",
    email: "ram.shrestha@ktm.gov.np",
    imageUrl: "https://i.imgur.com/JQrOMa7.png", // Using a placeholder image URL
    rating: 4.2,
    reviews: 89,
    followers: 1250,
    personalInfo: {
        address: "वडा नं. १, काठमाडौं",
        education: "स्नातकोत्तर (राजनीति विज्ञान)",
        experience: "१५ वर्ष स्थानीय राजनीतिमा",
        politicalParty: "नेपाली कांग्रेस",
        appointmentDate: "२०७९/०५/१५"
    },
    contactDetails: {
        phone: "9841234567",
        email: "ram.shrestha@ktm.gov.np",
        address: "वडा नं. १, काठमाडौं"
    }
};

// Star rating component
const StarRating = ({ rating, reviews }) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
        <div className="star-rating">
            {[...Array(fullStars)].map((_, i) => <span key={`full-${i}`}>&#9733;</span>)}
            {halfStar && <span>&#9734;</span>} {/* Using an empty star for half, can be improved with better icons */}
            {[...Array(emptyStars)].map((_, i) => <span key={`empty-${i}`}>&#9734;</span>)}
            <span className="reviews-text">{rating} ({reviews} reviews)</span>
        </div>
    );
};

const Profile = () => {
    return (
        <div className="profile-container">
            {/* Profile Header */}
            <div className="profile-header">
                <div className="profile-header-left">
                    <img src={profileData.imageUrl} alt="Ram Bahadur Shrestha" className="profile-picture" />
                    <div className="profile-name-role">
                        <h1>{profileData.name}</h1>
                        <p>{profileData.role}</p>
                        <div className="profile-header-contact">
                            <span>&#9742; {profileData.phone}</span>
                            <span>&#9993; {profileData.email}</span>
                        </div>
                    </div>
                </div>
                <div className="profile-header-right">
                    <StarRating rating={profileData.rating} reviews={profileData.reviews} />
                    <div className="followers-section">
                        <span>&#128100; {profileData.followers} followers</span>
                        <button className="follow-button">Follow</button>
                    </div>
                </div>
            </div>

            {/* Profile Body */}
            <div className="profile-body">
                <div className="tabs">
                    <button className="tab-item active">Details</button>
                    <button className="tab-item">Works</button>
                    <button className="tab-item">Assets</button>
                    <button className="tab-item">Activities</button>
                    <button className="tab-item">Reviews</button>
                    <button className="tab-item">Dashboard</button>
                </div>

                <div className="tab-content">
                    <div className="info-section">
                        <div className="personal-info">
                            <h2>Personal Information</h2>
                            <div className="info-item">
                                <label>Address</label>
                                <p>{profileData.personalInfo.address}</p>
                            </div>
                            <div className="info-item">
                                <label>Education</label>
                                <p>{profileData.personalInfo.education}</p>
                            </div>
                            <div className="info-item">
                                <label>Experience</label>
                                <p>{profileData.personalInfo.experience}</p>
                            </div>
                            <div className="info-item">
                                <label>Political Party</label>
                                <p>{profileData.personalInfo.politicalParty}</p>
                            </div>
                             <div className="info-item">
                                <label>Appointment Date</label>
                                <p>{profileData.personalInfo.appointmentDate}</p>
                            </div>
                        </div>

                        <div className="contact-details">
                            <h2>Contact Details</h2>
                            <div className="contact-item">
                                <span>&#9742; {profileData.contactDetails.phone}</span>
                            </div>
                             <div className="contact-item">
                                <span>&#9993; {profileData.contactDetails.email}</span>
                            </div>
                             <div className="contact-item">
                                <span>&#128205; {profileData.contactDetails.address}</span>
                            </div>
                            <button className="download-button">Download Details</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;