import MedicationTypesDataService from '../../data/MedicationTypesDataService.js';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MedicationTypeDetailModal from './MedicationTypeDetailModal';

const MedicationTypes = () => {
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
            <h2>Medication Types List</h2>
        </div>
        <div className='col-md-12'>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Code</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {medicationTypes.map((medicationType, index) => (
                        <tr key={index} onClick={() => handleRowClick(medicationType)} style={{ cursor: 'pointer' }}>
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
                                    Update
                                </Link>
                                <button className="btn btn-danger" onClick={() => handleDelete(medicationType.id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <div className="mt-3 d-flex justify-content-center">
            <Link to="/medicationTypes/addMedicationType" title="Add a new medication type" className="btn btn-primary">
                Add a New Medication Type
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