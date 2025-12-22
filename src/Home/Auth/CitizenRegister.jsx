import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import "./Register.css";

export default function CitizenRegister() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");
  const [wardNumber, setWardNumber] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  const districtMunicipalityData = {
    Kathmandu: [
      { id: 1, name: "Kathmandu Metropolitan City", wards: 32 },
      { id: 2, name: "Lalitpur Metropolitan City", wards: 29 },
      { id: 3, name: "Bhaktapur Municipality", wards: 10 },
    ],
    Kaski: [{ id: 6, name: "Pokhara Metropolitan City", wards: 33 }],
    Morang: [{ id: 8, name: "Biratnagar Metropolitan City", wards: 19 }],
  };

  const districts = Object.keys(districtMunicipalityData);

  const getFilteredMunicipalities = () => {
    if (!district) return [];
    return districtMunicipalityData[district] || [];
  };

  const handleDistrictChange = (e) => {
    setDistrict(e.target.value);
    setCity("");
    setWardNumber("");
  };

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!firstName.trim()) newErrors.firstName = "First name is required!";
    if (!lastName.trim()) newErrors.lastName = "Last name is required!";
    if (!email.trim()) {
      newErrors.email = "Email is required!";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Enter a valid email address";
    }
    if (!password) {
      newErrors.password = "Password is required!";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    if (confirmPassword !== password) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    if (!termsAccepted) {
      newErrors.terms = "You must accept the Terms and Conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const userData = {
        id: Date.now(),
        email: email,
        name: `${firstName} ${lastName}`,
        role: "citizen",
        phone: contactNumber,
        ward: wardNumber,
        municipality: city || "Kathmandu Metropolitan City",
        address: `${city}, ${district}`,
        joinedDate: new Date().toLocaleDateString("en-GB"),
      };

      login(userData);
      setShowSuccess(true);

      setTimeout(() => {
        navigate("/");
      }, 1500);
    }
  };

  return (
    <div className="register-root">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
      />

      {showSuccess && (
        <div className="success-notification show">
          Registration successful!
        </div>
      )}

      <div className="register-container">
        <div className="register-header">
          <div className="role-badge citizen-badge">
            <i className="fa-solid fa-user"></i> Citizen Registration
          </div>
          <h1>Create Citizen Account</h1>
          <p>Join our community and access ward services</p>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          {/* Personal Information */}
          <div className="form-section">
            <h3 className="section-title">Personal Information</h3>
            <div className="form-row two-cols">
              <div className="form-group">
                <label htmlFor="firstName">First Name *</label>
                <input
                  type="text"
                  id="firstName"
                  className={`form-control ${errors.firstName ? "error" : ""}`}
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Enter first name"
                />
                <p
                  className={`error-message ${errors.firstName ? "show" : ""}`}
                >
                  {errors.firstName}
                </p>
              </div>

              <div className="form-group">
                <label htmlFor="lastName">Last Name *</label>
                <input
                  type="text"
                  id="lastName"
                  className={`form-control ${errors.lastName ? "error" : ""}`}
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Enter last name"
                />
                <p className={`error-message ${errors.lastName ? "show" : ""}`}>
                  {errors.lastName}
                </p>
              </div>
            </div>

            <div className="form-row two-cols">
              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <div className="input-wrapper">
                  <i className="fa-regular fa-envelope" />
                  <input
                    type="email"
                    id="email"
                    className={`form-control ${errors.email ? "error" : ""}`}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                  />
                </div>
                <p className={`error-message ${errors.email ? "show" : ""}`}>
                  {errors.email}
                </p>
              </div>

              <div className="form-group">
                <label htmlFor="contactNumber">Phone</label>
                <div className="input-wrapper">
                  <i className="fa-solid fa-phone" />
                  <input
                    type="tel"
                    id="contactNumber"
                    className="form-control"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    placeholder="98XXXXXXXX"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="form-section">
            <h3 className="section-title">Address</h3>
            <div className="form-row three-cols">
              <div className="form-group">
                <label htmlFor="district">District</label>
                <select
                  id="district"
                  className="form-control"
                  value={district}
                  onChange={handleDistrictChange}
                >
                  <option value="">Select District</option>
                  {districts.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="city">Municipality</label>
                <select
                  id="city"
                  className="form-control"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  disabled={!district}
                >
                  <option value="">
                    {district ? "Select Municipality" : "Select District First"}
                  </option>
                  {getFilteredMunicipalities().map((m) => (
                    <option key={m.id} value={m.name}>
                      {m.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="wardNumber">Ward</label>
                <input
                  type="text"
                  id="wardNumber"
                  className="form-control"
                  value={wardNumber}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (
                      val === "" ||
                      (/^\d+$/.test(val) && parseInt(val) <= 35)
                    ) {
                      setWardNumber(val);
                    }
                  }}
                  placeholder="Ward No."
                  inputMode="numeric"
                />
              </div>
            </div>
          </div>

          {/* Security */}
          <div className="form-section">
            <h3 className="section-title">Security</h3>
            <div className="form-row two-cols">
              <div className="form-group">
                <label htmlFor="password">Password *</label>
                <div className="input-wrapper">
                  <i className="fa-solid fa-lock" />
                  <input
                    type="password"
                    id="password"
                    className={`form-control ${errors.password ? "error" : ""}`}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                  />
                </div>
                <p className={`error-message ${errors.password ? "show" : ""}`}>
                  {errors.password}
                </p>
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password *</label>
                <div className="input-wrapper">
                  <i className="fa-solid fa-lock" />
                  <input
                    type="password"
                    id="confirmPassword"
                    className={`form-control ${
                      errors.confirmPassword ? "error" : ""
                    }`}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                  />
                </div>
                <p
                  className={`error-message ${
                    errors.confirmPassword ? "show" : ""
                  }`}
                >
                  {errors.confirmPassword}
                </p>
              </div>
            </div>
          </div>

          {/* Terms */}
          <div className="form-group terms-group">
            <label className="checkbox-container">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
              />
              <span className="checkmark"></span>I agree to the{" "}
              <a href="#">Terms and Conditions</a>
            </label>
            <p className={`error-message ${errors.terms ? "show" : ""}`}>
              {errors.terms}
            </p>
          </div>

          <button type="submit" className="btn-register citizen-btn">
            Register as Citizen
          </button>

          <div className="form-footer">
            <p>
              Already have an account? <Link to="/login">Login here</Link>
            </p>
            <p>
              Want to register as officer?{" "}
              <Link to="/register/officer">Click here</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
