import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");
  const [wardNumber, setWardNumber] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const resetErrors = () => {
    setErrors({
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
    });
  };

  const validate = () => {
    const newErrors = {
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
    };
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!firstName.trim()) {
      newErrors.firstName = "First name is required!";
    }
    if (!lastName.trim()) {
      newErrors.lastName = "Last name is required!";
    }
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

    setErrors(newErrors);
    return (
      !newErrors.email &&
      !newErrors.password &&
      !newErrors.confirmPassword &&
      !newErrors.firstName &&
      !newErrors.lastName
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    resetErrors();
    if (validate()) {
      setShowSuccess(true);
      console.log("Registration successful", {
        email,
        password,
        firstName,
        middleName,
        lastName,
        contactNumber,
        dob,
        gender,
        district,
        city,
        wardNumber,
      });
      setTimeout(() => {
        navigate("/");
      }, 1500);
    }
  };

  return (
    <div className="login-root">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
      />

      {showSuccess && (
        <div className="success-notification show">
          Registration successful!
        </div>
      )}
      {Object.values(errors).some((error) => error) && (
        <div className="error-notification show">
          Please fix the errors above.
        </div>
      )}

      <div className="login-container">
        <div className="login-header">
          <h1>Create Account</h1>
          <p>Join us today! It takes only few steps</p>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          {/* Row 1: Names */}
          <div className="form-row three-cols">
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                className={`form-control ${errors.firstName ? "error" : ""}`}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First"
              />
              <p className={`error-message ${errors.firstName ? "show" : ""}`}>
                {errors.firstName}
              </p>
            </div>

            <div className="form-group">
              <label htmlFor="middleName">Middle Name</label>
              <input
                type="text"
                id="middleName"
                className="form-control"
                value={middleName}
                onChange={(e) => setMiddleName(e.target.value)}
                placeholder="Middle"
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                className={`form-control ${errors.lastName ? "error" : ""}`}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last"
              />
              <p className={`error-message ${errors.lastName ? "show" : ""}`}>
                {errors.lastName}
              </p>
            </div>
          </div>

          {/* Row 2: Contact Info */}
          <div className="form-row two-cols">
            <div className="form-group">
              <label htmlFor="email">Email</label>
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

          {/* Row 3: Personal Details */}
          <div className="form-row two-cols">
            <div className="form-group">
              <label htmlFor="dob">Date of Birth</label>
              <div className="input-wrapper">
                <i className="fa-solid fa-calendar" />
                <input
                  type="date"
                  id="dob"
                  className="form-control"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="gender">Gender</label>
              <div className="input-wrapper">
                <i className="fa-solid fa-venus-mars" />
                <select
                  id="gender"
                  className="form-control"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* Row 4: Address */}
          <div className="form-row three-cols">
            <div className="form-group">
              <label htmlFor="district">District</label>
              <input
                type="text"
                id="district"
                className="form-control"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                placeholder="District"
              />
            </div>
            <div className="form-group">
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                className="form-control"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="City"
              />
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
                  // Allow only numbers and max value 35
                  if (
                    val === "" ||
                    (/^\d+$/.test(val) && parseInt(val) <= 35)
                  ) {
                    setWardNumber(val);
                  }
                }}
                placeholder="Ward No. (1-35)"
                inputMode="numeric"
              />
            </div>
          </div>

          {/* Row 5: Security */}
          <div className="form-row two-cols">
            <div className="form-group">
              <label htmlFor="password">Password</label>
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
              <label htmlFor="confirmPassword">Confirm</label>
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

          <button type="submit" className="btn-login">
            Register Now
          </button>

          <div className="already-account">
            <p>
              Already have an account? <Link to="/login">Login here</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
