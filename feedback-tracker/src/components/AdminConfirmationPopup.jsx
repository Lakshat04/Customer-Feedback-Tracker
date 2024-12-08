import React from "react";
import './AdminConfirmationPopup.css';

const AdminConfirmationPopup = ({ onConfirm }) => {
  return (
    <div className="popup-overlay">
      <div className="popup">
        <h2>Admin Access Confirmation</h2>
        <p>Are you sure you are an Admin?</p>
        <button className="confirm" onClick={() => onConfirm(true)}>
          Yes, I am Admin
        </button>
        <button className="cancel" onClick={() => onConfirm(false)}>
          No, Cancel
        </button>
      </div>
    </div>
  );
};

export default AdminConfirmationPopup;
