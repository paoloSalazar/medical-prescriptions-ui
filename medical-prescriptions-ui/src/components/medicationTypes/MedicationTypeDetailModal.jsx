import React from 'react';
import '../assets/ModalDescription.css'; // Create this file for styling

const MedicationTypeDetailModal = ({ medicationType, onClose }) => {
  if (!medicationType) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Medication Type Details</h2>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          <p><strong>Code:</strong> {medicationType.code}</p>
          <p><strong>Name:</strong> {medicationType.name}</p>
          <p><strong>Description:</strong> {medicationType.description}</p>
          {/* Add more details as needed */}
        </div>
      </div>
    </div>
  );
};

export default MedicationTypeDetailModal;