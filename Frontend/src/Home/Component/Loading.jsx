import React from "react";
import "./Loading.css";

const Loading = () => {
  return (
    <div className="app-splash-screen">
      <div className="splash-content">
        <div className="splash-logo">🏛️</div>
        <h1 className="splash-title">हाम्रो वडा</h1>
        <p className="splash-subtitle">समृद्ध समुदायको लागि डिजिटल पाइला</p>

        <div className="loader-container">
          <div className="premium-loader"></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
