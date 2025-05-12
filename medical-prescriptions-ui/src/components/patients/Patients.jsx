import PatientDataService from '../../data/PatientsDataService.js';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Patients = () => {
    const [patients, setPatients] = useState([]);
    useEffect(() => {
        PatientDataService.getAll()
            .then(response => {
                setPatients(response.data);
            })
            .catch(e => {
                console.log(e);
            });
        }, []);

    return (
        <>  
            <div className="text-center my-4">
                <h2>Patients List</h2>
            </div>
            <div className='col-md-12'>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Last Name</th>
                            <th>Date of Birth</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            patients.map((patient, index) => (
                                <tr key={index}>
                                    <td>{patient.name}</td>
                                    <td>{patient.lastname}</td>
                                    <td>{new Date(patient.dateofbirth).toDateString()}</td>
                                </tr>
                            ))

                        }
                    </tbody>
                </table>
            </div>
            <div className="mt-3 d-flex justify-content-center">
                   <Link to="/patients/addPatient" title="Add a new patient" className="btn btn-primary">
                    Add a New Patient
                    </Link>
            </div>
        </>
    )
};

export default Patients;