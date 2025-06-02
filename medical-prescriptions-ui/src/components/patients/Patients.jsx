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
    const { t, i18n } = useTranslation();

    useEffect(() => {
        moment.locale(i18n.language);
    }, [i18n.language]);

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
                            patients.map((patient, index) => (
                                <tr key={index}>
                                    <td>{patient.name}</td>
                                    <td>{patient.lastname}</td>
                                    <td>{moment(patient.dateofbirth).locale('es').format('LL')}</td>
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