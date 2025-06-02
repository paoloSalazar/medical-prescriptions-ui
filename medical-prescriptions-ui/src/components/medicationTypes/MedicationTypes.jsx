import MedicationTypesDataService from '../../data/MedicationTypesDataService.js';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MedicationTypeDetailModal from './MedicationTypeDetailModal';
import { useTranslation } from 'react-i18next';

const MedicationTypes = () => {
  const { t } = useTranslation();
  const [medicationTypes, setMedicationTypes] = useState([]);
  const [selectedMedicationType, setSelectedMedicationType] = useState(null);
  const MAX_DESCRIPTION_LENGTH = 50;

  useEffect(() => {
    MedicationTypesDataService.getAll()
      .then(response => {
        setMedicationTypes(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }, []);

  const handleDelete = (id) => {
    MedicationTypesDataService.delete(id)
      .then(response => {
        console.log('MedicationType deleted successfully:', response.data);
        setMedicationTypes(medicationTypes.filter(medicationType => medicationType.id !== id));
      })
      .catch(error => {
        console.error('Error deleting medicatonType:', error);
      });
  };

  const handleRowClick = (medicationType) => {
    setSelectedMedicationType(medicationType);
  };

  const handleCloseModal = () => {
    setSelectedMedicationType(null);
  };

return (
    <>
        <div className="text-center my-4">
            <h2>{t('List', { entity: t('entities.medicationType') })}</h2>
        </div>
        <div className='col-md-12'>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>{t('Code')}</th>
                        <th>{t('Name')}</th>
                        <th>{t('Description')}</th>
                        <th>{t('Actions')}</th>
                    </tr>
                </thead>
                <tbody>
                    {medicationTypes.map((medicationType, index) => (
                        <tr key={index} >
                            <td>{medicationType.code}</td>
                            <td>{medicationType.name}</td>
                            <td>
                                {medicationType.description
                                    ? medicationType.description.length > MAX_DESCRIPTION_LENGTH
                                        ? medicationType.description.substring(0, MAX_DESCRIPTION_LENGTH) + "..."
                                        : medicationType.description
                                    : 'No description available'}
                            </td>
                        <td>
                                <Link to={`/medicationTypes/updateMedicationType/${medicationType.id}`} className="btn btn-warning">
                                    <i className="bi bi-pencil-square" title='Update Medication Type'></i>
                                </Link>
                                <button className="btn btn-danger" onClick={() => handleDelete(medicationType.id)}>
                                     <i className="bi bi-trash" title='Delete Medication Type'></i> 
                                </button>
                                <button className="btn btn-info" onClick={() => handleRowClick(medicationType)}>
                                    <i className="bi bi-eye" title='View Medication Type Details'></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <div className="mt-3 d-flex justify-content-center">
            <Link to="/medicationTypes/addMedicationType" title="Add a new medication type" className="btn btn-primary">
                {t('Add Title', { entity: t('entities.medicationType') })}
            </Link>
        </div>

        {selectedMedicationType && (
            <MedicationTypeDetailModal
                medicationType={selectedMedicationType}
                onClose={handleCloseModal}
            />
        )}
    </>
);
};

export default MedicationTypes;