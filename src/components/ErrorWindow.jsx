import React, { useState } from "react";
import "../styles/ErrorWindow.css";

const ErrorPopup = ({ errorMessage, onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-box">
        <button className="close-btn" onClick={onClose}>
          ×
        </button>
        <p className="error-message">{errorMessage}</p>
      </div>
    </div>
  );
};

export default ErrorPopup;