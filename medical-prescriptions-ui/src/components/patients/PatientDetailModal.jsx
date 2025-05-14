import React from 'react';
import '../assets/ModalDescription.css';

const PatientDetailModal = ({ patient, onClose }) => {
  if (!patient) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Patient Details</h2>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          <p><strong>Name:</strong> {patient.name}</p>
          <p><strong>Last Name:</strong> {patient.lastname}</p>
          <p><strong>Date of Birth:</strong> {patient.dateofbirth}</p>
          {/* Add more patient details here */}
        </div>
      </div>
    </div>
  );
};

export default PatientDetailModal;