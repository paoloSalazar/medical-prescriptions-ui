import React from 'react';
import '../assets/ModalDescription.css'; // Create this file for styling

const DoctorDetailModal = ({ doctor, onClose }) => {
  if (!doctor) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Doctor Details</h2>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          <p><strong>Name:</strong> {doctor.name}</p>
          <p><strong>Specialty:</strong> {doctor.specialty}</p>
          {/* Add more doctor details here */}
        </div>
      </div>
    </div>
  );
};

export default DoctorDetailModal;