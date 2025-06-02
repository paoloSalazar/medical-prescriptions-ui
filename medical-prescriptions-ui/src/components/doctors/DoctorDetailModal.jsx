import React from 'react';
import '../assets/ModalDescription.css'; // Create this file for styling
import { useTranslation } from 'react-i18next';

const DoctorDetailModal = ({ doctor, onClose }) => {
  const { t, i18n } = useTranslation();
  if (!doctor) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{t('Details', { entity: t('entities.doctor') })}</h2>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          <p><strong>{t('Name')}:</strong> {doctor.name}</p>
          <p><strong>{t('Last Name')}:</strong> {doctor.lastname}</p>
          <p><strong>{t('Specialty')}:</strong> {doctor.specialty}</p>
          {/* Add more doctor details here */}
        </div>
      </div>
    </div>
  );
};

export default DoctorDetailModal;