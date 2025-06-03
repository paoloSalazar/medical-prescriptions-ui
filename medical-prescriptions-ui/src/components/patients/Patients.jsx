import PatientDataService from '../../data/PatientsDataService.js';
import PatientDetailModal from './PatientDetailModal.jsx';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/es';
import { useTranslation } from 'react-i18next';

const Patients = () => {
    const [patients, setPatients] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [patientsPerPage] = useState(6);
    const { t, i18n } = useTranslation();
    
    var current_language = i18n.language || 'en';

    useEffect(() => {
        PatientDataService.getAll()
            .then(response => {
                setPatients(response.data);
            })
            .catch(e => {
                console.log(e);
            });
        }, []);

    const handleDelete = (id) => {
        PatientDataService.delete(id)
          .then(response => {
            console.log('Patient deleted successfully:', response.data);
            // Update the patients state to remove the deleted patient
            setPatients(patients.filter(patient => patient.id !== id));
          })
          .catch(error => {
            console.error('Error deleting patient:', error);
          });
    };

    const handleRowClick = (patient) => {
      setSelectedPatient(patient);
    };

    const handleCloseModal = () => {
      setSelectedPatient(null);
    };

    const indexOfLastPatient = currentPage * patientsPerPage;
    const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
    const currentPatients = patients.slice(indexOfFirstPatient, indexOfLastPatient);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Calculate total pages
    const totalPages = Math.ceil(patients.length / patientsPerPage);

    // Previous page
    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // Next page
    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <>  
            <div className="text-center my-4">
                <h2>{t('List', { entity: t('entities.patient') })}</h2>
            </div>
            <div className='col-md-12'>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>{t('Name')}</th>
                            <th>{t('Last Name')}</th>
                            <th>{t('Date of Birth')}</th>
                            <th>{t('Actions')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            currentPatients.map((patient, index) => (
                                <tr key={index}>
                                    <td>{patient.name}</td>
                                    <td>{patient.lastname}</td>
                                    <td>{new Date(patient.dateofbirth).toLocaleDateString(current_language, { year: 'numeric', month: 'long', day: 'numeric' })}</td>
                                    <td>
                                         <Link to={`/patients/updatePatient/${patient.id}`} className="btn btn-warning">
                                            <i className="bi bi-pencil-square" title={t('Update', { entity: t('entities.patient') })}></i> 
                                        </Link>
                                        <button className="btn btn-danger" onClick={() => handleDelete(patient.id)}>
                                            <i className="bi bi-trash" title={t('Delete', { entity: t('entities.patient') })}></i> 
                                        </button>
                                        <button className="btn btn-info" onClick={() => handleRowClick(patient)}>
                                            <i className="bi bi-eye" title={t('View Details', { entity: t('entities.patient') })}></i>
                                        </button>
                                    </td>
                                </tr>
                            ))

                        }
                    </tbody>
                </table>
            </div>
            <div className="d-flex justify-content-center mt-3">
                <nav aria-label="Page navigation">
                    <ul className="pagination">
                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                            <button 
                                className="page-link" 
                                onClick={goToPreviousPage}
                                aria-label="Previous"
                            >
                                <span aria-hidden="true">&laquo;</span>
                            </button>
                        </li>
                        {[...Array(totalPages)].map((_, index) => (
                            <li 
                                key={index + 1} 
                                className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                            >
                                <button
                                    className="page-link"
                                    onClick={() => paginate(index + 1)}
                                >
                                    {index + 1}
                                </button>
                            </li>
                        ))}
                        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                            <button 
                                className="page-link" 
                                onClick={goToNextPage}
                                aria-label="Next"
                            >
                                <span aria-hidden="true">&raquo;</span>
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className="mt-3 d-flex justify-content-center">
                   <Link to="/patients/addPatient" title={t('Add', { entity: t('entities.patient') })} className="btn btn-primary">
                    {t('Add', { entity: t('entities.patient') })}

                    </Link>
            </div>

            {selectedPatient && (
                <PatientDetailModal
                patient={selectedPatient}
                onClose={handleCloseModal}
                />
            )}
        </>
    )
};

export default Patients;