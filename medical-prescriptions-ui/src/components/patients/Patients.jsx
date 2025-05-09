import PatientDataService from '../../data/PatientsDataService.js';
import React, { useEffect, useState } from 'react';

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
            <div className="row mb-2">
                <h5 className="themeFontColor text-center">
                    List of Patients
                </h5>
            </div>
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
                                <td>{patient.dateofbirth}</td>
                            </tr>
                        ))

                    }
                </tbody>
            </table>
        </>
    )
};

export default Patients;