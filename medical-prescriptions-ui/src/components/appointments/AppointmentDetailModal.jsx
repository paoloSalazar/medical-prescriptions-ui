import React from 'react';
import '../assets/ModalDescription.css';

const AppointmentDetailModal = ({ appointment, onClose }) => {
  if (!appointment) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Appointment Details</h2>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          <p><strong>Doctor:</strong> {appointment.doctorname}</p>
          <p><strong>Patient:</strong> {appointment.patientname}</p>
          <p><strong>Appointment Date:</strong> {new Date(appointment.appointmentdate).toDateString()} {new Date(appointment.appointmentdate).toLocaleTimeString()}</p>
          <p><strong>Reason:</strong> {appointment.reason}</p>
          {/* Add more appointment details here */}
        </div>
      </div>
    </div>
  );
};

export default AppointmentDetailModal;