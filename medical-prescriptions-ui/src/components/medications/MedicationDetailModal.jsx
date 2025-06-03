import React from 'react';
import '../assets/ModalDescription.css';
import moment from 'moment';
import { useTranslation } from 'react-i18next';

const MedicationDetailModal = ({ medication, onClose }) => {
  const { t, i18n } = useTranslation();
  var current_language = i18n.language || 'en';

  if (!medication) {
    return null;
  }

return (
    <div className="modal">
        <div className="modal-content">
            <div className="modal-header">
                <h2>{t('Details', { entity: t('entities.medication') })}</h2>
                <button className="close-button" onClick={onClose}>
                    &times;
                </button>
            </div>
            <div className="modal-body">
                <p><strong>{t('Code')}:</strong> {medication.code}</p>
                <p><strong>{t('Name')}:</strong> {medication.name}</p>
                <p><strong>{t('Expiration Date')}:</strong> {new Date(medication.expirationdate).toLocaleDateString(current_language, { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                <p><strong>{t('Description')}:</strong> {medication.description}</p>
                <p><strong>{t('Medication Type')}:</strong> {medication.medicationtypename}</p>
                
                {/* Add more medication details here */}
            </div>
        </div>
    </div>
);
};

export default MedicationDetailModal;