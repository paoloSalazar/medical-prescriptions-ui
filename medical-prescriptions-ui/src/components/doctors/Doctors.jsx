import DoctorsDataService from '../../data/DoctorsDataService.js';
import DoctorDetailModal from './DoctorDetailModal.jsx';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';


const Doctors = () => {
    const [doctors, setDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const { t, i18n } = useTranslation();

    useEffect(() => {
        DoctorsDataService.getAll()
            .then(response => {
                setDoctors(response.data);
            })
            .catch(e => {
                console.log(e);
            });
        }, []);
    
    const handleRowClick = (doctor) => {
      setSelectedDoctor(doctor);
    };
    
    const handleCloseModal = () => {
      setSelectedDoctor(null);
    };
    
    const handleDelete = (id) => {
        DoctorsDataService.delete(id)
          .then(response => {
            console.log('Doctor deleted successfully:', response.data);
            // Update the patients state to remove the deleted patient
            setDoctors(doctors.filter(doctor => doctor.id !== id));
          })
          .catch(error => {
            console.error('Error deleting doctor:', error);
          });
    };

    return (
        <>  
            <div className="text-center my-4">
                <h2>{t('Doctors List')}</h2>
            </div>
            <div className='col-md-12'>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>{t('Name')}</th>
                            <th>{t('Last Name')}</th>
                            <th>{t('Specialty')}</th>
                            <th>{t('Actions')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            doctors.map((doctor, index) => (
                                <tr key={index}>
                                    <td>{doctor.name}</td>
                                    <td>{doctor.lastname}</td>
                                    <td>{doctor.specialty}</td>
                                    <td>
                                         <Link to={`/doctors/updateDoctor/${doctor.id}`} className="btn btn-warning">
                                            <i className="bi bi-pencil-square" title={t('Update', { entity: t('entities.doctor') })}></i>
                                        </Link>
                                        <button className="btn btn-danger" onClick={() => handleDelete(doctor.id)}>
                                            <i className="bi bi-trash" title={t('Delete', { entity: t('entities.doctor') })}></i> 
                                        </button>
                                        <button className="btn btn-info" onClick={() => handleRowClick(doctor)}>
                                            <i className="bi bi-eye" title={t('View Details', { entity: t('entities.doctor') })}></i>
                                        </button>
                                    </td>
                                </tr>
                            ))

                        }
                    </tbody>
                </table>
            </div>
            <div className="mt-3 d-flex justify-content-center">
                <Link to="/doctors/addDoctor" title={t('Add a New Doctor')} className="btn btn-primary">
                    {t('Add a New Doctor')}
                </Link>
            </div>

            {selectedDoctor && (
                <DoctorDetailModal
                     doctor={selectedDoctor}
                     onClose={handleCloseModal}
                />
            )}
        </>
    )
};

export default Doctors;