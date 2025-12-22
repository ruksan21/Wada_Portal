import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import "./Register.css";

export default function RegisterPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const API_URL = "http://localhost/api"; // Change to your PHP backend URL

  // Role selection
  const [role, setRole] = useState("citizen");

  // Common fields
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

  // Citizenship details (for all users)
  const [citizenshipNumber, setCitizenshipNumber] = useState("");
  const [citizenshipIssueDate, setCitizenshipIssueDate] = useState("");
  const [citizenshipIssueDistrict, setCitizenshipIssueDistrict] = useState("");
  const [citizenshipPhoto, setCitizenshipPhoto] = useState(null);

  // Officer-specific fields
  const [officerId, setOfficerId] = useState("");
  const [department, setDepartment] = useState("");
  const [assignedWard, setAssignedWard] = useState("");
  const [idCardPhoto, setIdCardPhoto] = useState(null);

  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  // District-Municipality mapping (same as before)
  const districtMunicipalityData = {
    Kathmandu: [
      { id: 1, name: "Kathmandu Metropolitan City", wards: 32 },
      { id: 2, name: "Lalitpur Metropolitan City", wards: 29 },
      { id: 3, name: "Bhaktapur Municipality", wards: 10 },
      { id: 4, name: "Kirtipur Municipality", wards: 10 },
      { id: 5, name: "Madhyapur Thimi Municipality", wards: 9 },
    ],
    Kaski: [
      { id: 6, name: "Pokhara Metropolitan City", wards: 33 },
      { id: 7, name: "Annapurna Rural Municipality", wards: 11 },
    ],
    Morang: [
      { id: 8, name: "Biratnagar Metropolitan City", wards: 19 },
      { id: 9, name: "Urlabari Municipality", wards: 9 },
    ],
    Chitwan: [
      { id: 10, name: "Bharatpur Metropolitan City", wards: 29 },
      { id: 11, name: "Ratnanagar Municipality", wards: 16 },
    ],
    Lalitpur: [
      { id: 12, name: "Godawari Municipality", wards: 14 },
      { id: 13, name: "Mahalaxmi Municipality", wards: 10 },
    ],
  };

  const districts = Object.keys(districtMunicipalityData);

  const getFilteredMunicipalities = () => {
    if (!district) return [];
    return districtMunicipalityData[district] || [];
  };

  const handleDistrictChange = (e) => {
    const selectedDistrict = e.target.value;
    setDistrict(selectedDistrict);
    setCity("");
    setWardNumber("");
  };

  const handleCitizenshipPhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) setCitizenshipPhoto(file);
  };

  const handleIdCardPhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) setIdCardPhoto(file);
  };

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    // Common validations
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

    // Citizenship details validations
    if (!citizenshipNumber.trim()) {
      newErrors.citizenshipNumber = "Citizenship number is required!";
    }
    if (!citizenshipIssueDate) {
      newErrors.citizenshipIssueDate = "Issue date is required!";
    }
    if (!citizenshipIssueDistrict) {
      newErrors.citizenshipIssueDistrict = "Issue district is required!";
    }
    if (!citizenshipPhoto) {
      newErrors.citizenshipPhoto = "Citizenship photo is required";
    }

    // Officer-specific validations
    if (role === "officer") {
      if (!officerId.trim()) newErrors.officerId = "Officer ID is required!";
      if (!department) newErrors.department = "Department is required!";
      if (!assignedWard)
        newErrors.assignedWard = "Ward assignment is required!";
      if (!idCardPhoto) newErrors.idCardPhoto = "ID card photo is required!";
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
      /*
       * BACKEND INTEGRATION:
       * ====================
       * Endpoint: POST /api/register.php
       *
       * Use FormData for file uploads:
       * const formData = new FormData();
       * formData.append('role', role);
       * formData.append('firstName', firstName);
       * formData.append('lastName', lastName);
       * formData.append('email', email);
       * formData.append('password', password);
       * formData.append('citizenshipNumber', citizenshipNumber);
       * formData.append('citizenshipIssueDate', citizenshipIssueDate);
       * formData.append('citizenshipIssueDistrict', citizenshipIssueDistrict);
       * formData.append('citizenshipPhoto', citizenshipPhoto);
       *
       * if (role === 'officer') {
       *   formData.append('officerId', officerId);
       *   formData.append('department', department);
       *   formData.append('assignedWard', assignedWard);
       *   formData.append('idCardPhoto', idCardPhoto);
       * }
       *
       * fetch('/api/register.php', {
       *   method: 'POST',
       *   body: formData
       * })
       * .then(res => res.json())
       * .then(data => {
       *   if (data.success) {
       *     login(data.user);
       *     navigate('/');
       *   }
       * });
       */

      const userData = {
        id: Date.now(),
        email: email,
        name: `${firstName} ${middleName ? middleName + " " : ""}${lastName}`,
        role: role,
        phone: contactNumber,
        dob: dob,
        gender: gender,
        ward: role === "officer" ? assignedWard : wardNumber,
        municipality: city || "Kathmandu Metropolitan City",
        address: `${city}, ${district}`,
        joinedDate: new Date().toLocaleDateString("en-GB"),
        citizenshipNumber: citizenshipNumber,
        citizenshipIssueDate: citizenshipIssueDate,
        citizenshipIssueDistrict: citizenshipIssueDistrict,
        citizenshipPhotoUrl: URL.createObjectURL(citizenshipPhoto),
        ...(role === "officer" && {
          officerId: officerId,
          department: department,
          idCardPhotoUrl: URL.createObjectURL(idCardPhoto),
        }),
      };

      login(userData);
      setShowSuccess(true);
      console.log("Registration successful", userData);

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
          {/* Role Selection */}
          <div className="role-selector">
            <label className="role-label">Register as:</label>
            <div className="role-options">
              <label
                className={`role-option ${role === "citizen" ? "active" : ""}`}
              >
                <input
                  type="radio"
                  name="role"
                  value="citizen"
                  checked={role === "citizen"}
                  onChange={(e) => setRole(e.target.value)}
                />
                <span className="role-icon">👤</span>
                <span className="role-text">Citizen</span>
              </label>
              <label
                className={`role-option ${role === "officer" ? "active" : ""}`}
              >
                <input
                  type="radio"
                  name="role"
                  value="officer"
                  checked={role === "officer"}
                  onChange={(e) => setRole(e.target.value)}
                />
                <span className="role-icon">👮</span>
                <span className="role-text">Ward Officer</span>
              </label>
            </div>
          </div>

          {/* Names */}
          <div className="form-row three-cols">
            <div className="form-group">
              <label htmlFor="firstName">First Name *</label>
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
              <label htmlFor="lastName">Last Name *</label>
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

          {/* Contact Info */}
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

          {/* Personal Details */}
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

          {/* Address */}
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
            {role === "citizen" && (
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
                  placeholder="Ward No. (1-35)"
                  inputMode="numeric"
                />
              </div>
            )}
          </div>

          {/* Citizenship Details Section */}
          <div className="section-divider">
            <h3>Citizenship Details</h3>
          </div>

          <div className="form-row three-cols">
            <div className="form-group">
              <label htmlFor="citizenshipNumber">Citizenship Number *</label>
              <input
                type="text"
                id="citizenshipNumber"
                className={`form-control ${
                  errors.citizenshipNumber ? "error" : ""
                }`}
                value={citizenshipNumber}
                onChange={(e) => setCitizenshipNumber(e.target.value)}
                placeholder="XX-XX-XX-XXXXX"
              />
              <p
                className={`error-message ${
                  errors.citizenshipNumber ? "show" : ""
                }`}
              >
                {errors.citizenshipNumber}
              </p>
            </div>

            <div className="form-group">
              <label htmlFor="citizenshipIssueDate">Issue Date *</label>
              <input
                type="date"
                id="citizenshipIssueDate"
                className={`form-control ${
                  errors.citizenshipIssueDate ? "error" : ""
                }`}
                value={citizenshipIssueDate}
                onChange={(e) => setCitizenshipIssueDate(e.target.value)}
              />
              <p
                className={`error-message ${
                  errors.citizenshipIssueDate ? "show" : ""
                }`}
              >
                {errors.citizenshipIssueDate}
              </p>
            </div>

            <div className="form-group">
              <label htmlFor="citizenshipIssueDistrict">Issue District *</label>
              <select
                id="citizenshipIssueDistrict"
                className={`form-control ${
                  errors.citizenshipIssueDistrict ? "error" : ""
                }`}
                value={citizenshipIssueDistrict}
                onChange={(e) => setCitizenshipIssueDistrict(e.target.value)}
              >
                <option value="">Select District</option>
                {districts.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
              <p
                className={`error-message ${
                  errors.citizenshipIssueDistrict ? "show" : ""
                }`}
              >
                {errors.citizenshipIssueDistrict}
              </p>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="citizenshipPhoto">
                Citizenship Front Page Photo *
              </label>
              <div className="file-upload-wrapper">
                <input
                  type="file"
                  id="citizenshipPhoto"
                  accept="image/*"
                  onChange={handleCitizenshipPhotoChange}
                  className={`form-control file-input ${
                    errors.citizenshipPhoto ? "error" : ""
                  }`}
                />
                <div className="file-upload-icon">
                  <i className="fa-solid fa-cloud-arrow-up"></i>
                  <span>
                    {citizenshipPhoto
                      ? citizenshipPhoto.name
                      : "Click to upload photo"}
                  </span>
                </div>
              </div>
              <p
                className={`error-message ${
                  errors.citizenshipPhoto ? "show" : ""
                }`}
              >
                {errors.citizenshipPhoto}
              </p>
            </div>
          </div>

          {/* Officer-Specific Section */}
          {role === "officer" && (
            <>
              <div className="section-divider">
                <h3>Officer Information</h3>
              </div>

              <div className="form-row three-cols">
                <div className="form-group">
                  <label htmlFor="officerId">Officer ID *</label>
                  <input
                    type="text"
                    id="officerId"
                    className={`form-control ${
                      errors.officerId ? "error" : ""
                    }`}
                    value={officerId}
                    onChange={(e) => setOfficerId(e.target.value)}
                    placeholder="OFF-XXXX"
                  />
                  <p
                    className={`error-message ${
                      errors.officerId ? "show" : ""
                    }`}
                  >
                    {errors.officerId}
                  </p>
                </div>

                <div className="form-group">
                  <label htmlFor="department">Department *</label>
                  <select
                    id="department"
                    className={`form-control ${
                      errors.department ? "error" : ""
                    }`}
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                  >
                    <option value="">Select Department</option>
                    <option value="Administration">Administration</option>
                    <option value="Planning & Development">
                      Planning & Development
                    </option>
                    <option value="Social Development">
                      Social Development
                    </option>
                    <option value="Financial Administration">
                      Financial Administration
                    </option>
                  </select>
                  <p
                    className={`error-message ${
                      errors.department ? "show" : ""
                    }`}
                  >
                    {errors.department}
                  </p>
                </div>

                <div className="form-group">
                  <label htmlFor="assignedWard">Assigned Ward *</label>
                  <input
                    type="text"
                    id="assignedWard"
                    className={`form-control ${
                      errors.assignedWard ? "error" : ""
                    }`}
                    value={assignedWard}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (
                        val === "" ||
                        (/^\d+$/.test(val) && parseInt(val) <= 35)
                      ) {
                        setAssignedWard(val);
                      }
                    }}
                    placeholder="Ward No. (1-35)"
                    inputMode="numeric"
                  />
                  <p
                    className={`error-message ${
                      errors.assignedWard ? "show" : ""
                    }`}
                  >
                    {errors.assignedWard}
                  </p>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="idCardPhoto">ID Card Photo *</label>
                  <div className="file-upload-wrapper">
                    <input
                      type="file"
                      id="idCardPhoto"
                      accept="image/*"
                      onChange={handleIdCardPhotoChange}
                      className={`form-control file-input ${
                        errors.idCardPhoto ? "error" : ""
                      }`}
                    />
                    <div className="file-upload-icon">
                      <i className="fa-solid fa-cloud-arrow-up"></i>
                      <span>
                        {idCardPhoto
                          ? idCardPhoto.name
                          : "Click to upload ID card"}
                      </span>
                    </div>
                  </div>
                  <p
                    className={`error-message ${
                      errors.idCardPhoto ? "show" : ""
                    }`}
                  >
                    {errors.idCardPhoto}
                  </p>
                </div>
              </div>
            </>
          )}

          {/* Security */}
          <div className="section-divider">
            <h3>Security</h3>
          </div>

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

          {/* Terms and Conditions */}
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

          <button type="submit" className="btn-login">
            Register as {role === "citizen" ? "Citizen" : "Officer"}
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
