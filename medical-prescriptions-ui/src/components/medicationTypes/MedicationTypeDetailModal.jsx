import React from 'react';
import '../assets/ModalDescription.css'; // Create this file for styling
import { useTranslation } from 'react-i18next';

const MedicationTypeDetailModal = ({ medicationType, onClose }) => {
  const { t } = useTranslation();

  if (!medicationType) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{t('Details', { entity: t('entities.medicationType') })}</h2>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          <p><strong>{t('Code')}:</strong> {medicationType.code}</p>
          <p><strong>{t('Name')}:</strong> {medicationType.name}</p>
          <p><strong>{t('Description')}:</strong> {medicationType.description}</p>
          {/* Add more details as needed */}
        </div>
      </div>
    </div>
  );
};

export default MedicationTypeDetailModal;