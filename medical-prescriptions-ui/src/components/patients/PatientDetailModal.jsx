import React from 'react';
import '../assets/ModalDescription.css';
import moment from 'moment';
import { useTranslation } from 'react-i18next';


const PatientDetailModal = ({ patient, onClose }) => {
  const { t, i18n } = useTranslation();

  if (!patient) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{t('Details', { entity: t('entities.patient') })}</h2>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          <p><strong>{t('Name')}:</strong> {patient.name}</p>
          <p><strong>{t('Last Name')}:</strong> {patient.lastname}</p>
          <p><strong>{t('Date of Birth')}:</strong> {moment.utc(patient.dateofbirth).format('MMMM D, YYYY')}</p>
          {/* Add more patient details here */}
        </div>
      </div>
    </div>
  );
};

export default PatientDetailModal;