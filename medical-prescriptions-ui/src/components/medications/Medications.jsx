import MedicationsDataServices from "../../data/MedicationsDataService";
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MedicationDetailModal from "./MedicationDetailModal";

const Medications = () => {
    const [medications, setMedications] = useState([]);
    const [selectedMedication, setSelectedMedication] = useState(null);
    
    const MAX_DESCRIPTION_LENGTH = 50; // Define the maximum length


    useEffect(() => {
        MedicationsDataServices.getAll()
          .then(response => {
            setMedications(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      }, []);

      const handleRowClick = (medication) => {
        setSelectedMedication(medication);
      };
    
      const handleCloseModal = () => {
        setSelectedMedication(null);
      };

    return (
      <>
        <div className="text-center my-4">
                <h2>Medications List</h2>
            </div>
            <div className='col-md-12'>
                <table className="table table-hover">
                  <thead>
                    <tr>
                        <th>Code</th>
                        <th>Name</th>
                        <th>Expiration Date</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {medications.map((medication, index) => (
                        <tr key={index} onClick={() => handleRowClick(medication)} style={{ cursor: 'pointer' }}>
                          <td>{medication.code}</td>
                          <td>{medication.name}</td>
                          <td>{new Date(medication.expirationdate).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</td>
                          <td>
                            {medication.description
                                ? medication.description.length > MAX_DESCRIPTION_LENGTH
                                  ? medication.description.substring(0, MAX_DESCRIPTION_LENGTH) + "..."
                                  : medication.description
                                : 'No description available'}
                          </td>
                        <td>
                            <Link to={`/medications/updateMedication/${medication.id}`} className="btn btn-warning">
                              <i className="bi bi-pencil-square" title='Update Medication'></i>
                            </Link>
                            <button className="btn btn-danger" onClick={() => handleDelete(medication.id)}>
                                <i className="bi bi-trash" title='Delete Medication'></i>
                            </button>
                          </td>
                        </tr>
                    ))}
                  </tbody>
                </table>
            </div>
            <div className="mt-3 d-flex justify-content-center">
                <Link to="/medications/addMedication" title="Add a new medication" className="btn btn-primary">
                  Add a New Medication
                </Link>
            </div>
            {selectedMedication && (
            <MedicationDetailModal
                medication={selectedMedication}
                onClose={handleCloseModal}
            />
        )}
      </>
    );
};

export default Medications;