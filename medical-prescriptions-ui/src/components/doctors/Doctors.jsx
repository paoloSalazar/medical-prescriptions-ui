import DoctorsDataService from '../../data/DoctorsDataService.js';
import DoctorDetailModal from './DoctorDetailModal.jsx';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


const Doctors = () => {
    const [doctors, setDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState(null);

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
                <h2>Doctors List</h2>
            </div>
            <div className='col-md-12'>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Last Name</th>
                            <th>Specialty</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            doctors.map((doctor, index) => (
                                <tr key={index} onClick={() => handleRowClick(doctor)} style={{ cursor: 'pointer' }}>
                                    <td>{doctor.name}</td>
                                    <td>{doctor.lastname}</td>
                                    <td>{doctor.specialty}</td>
                                    <td>
                                         <Link to={`/doctors/updateDoctor/${doctor.id}`} className="btn btn-warning">
                                            <i className="bi bi-pencil-square" title='Update Doctor'></i>
                                        </Link>
                                        <button className="btn btn-danger" onClick={() => handleDelete(doctor.id)}>
                                            <i className="bi bi-trash" title='Delete Doctor'></i> 
                                        </button>
                                    </td>
                                </tr>
                            ))

                        }
                    </tbody>
                </table>
            </div>
            <div className="mt-3 d-flex justify-content-center">
                <Link to="/doctors/addDoctor" title="Add a new doctor" className="btn btn-primary">
                    Add a New Doctor
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