import DoctorsDataService from '../../data/DoctorsDataService.js';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


const Doctors = () => {
    const [doctors, setDoctors] = useState([]);
    useEffect(() => {
        DoctorsDataService.getAll()
            .then(response => {
                setDoctors(response.data);
            })
            .catch(e => {
                console.log(e);
            });
        }, []);

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
                        </tr>
                    </thead>
                    <tbody>
                        {
                            doctors.map((doctor, index) => (
                                <tr key={index}>
                                    <td>{doctor.name}</td>
                                    <td>{doctor.lastname}</td>
                                    <td>{doctor.specialty}</td>
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
        </>
    )
};

export default Doctors;