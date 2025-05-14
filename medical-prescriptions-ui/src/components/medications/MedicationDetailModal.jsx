import React from 'react';
import '../assets/ModalDescription.css';

const MedicationDetailModal = ({ medication, onClose }) => {
  if (!medication) {
    return null;
  }

return (
    <div className="modal">
        <div className="modal-content">
            <div className="modal-header">
                <h2>Medication Details</h2>
                <button className="close-button" onClick={onClose}>
                    &times;
                </button>
            </div>
            <div className="modal-body">
                <p><strong>Code:</strong> {medication.code}</p>
                <p><strong>Name:</strong> {medication.name}</p>
                <p><strong>Expiration Date:</strong> {new Date(medication.expirationdate).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                <p><strong>Description:</strong> {medication.description}</p>
                <p><strong>Medication Type:</strong> {medication.medicationtypename}</p>
                
                {/* Add more medication details here */}
            </div>
        </div>
    </div>
);
};

export default MedicationDetailModal;