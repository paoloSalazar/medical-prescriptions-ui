import React, { useState } from 'react';
import DoctorsDataService from '../../data/DoctorsDataService.js';

const AddDoctor = () => {
    const [doctor, setDoctor] = useState({
        name: '',
        lastname: '',
        specialty: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDoctor({
            ...doctor,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        DoctorsDataService.create(doctor)
            .then(response => {
                console.log("Doctor added successfully:", response.data);
                alert("Doctor added successfully!");
                setDoctor({
                    name: '',
                    lastname: '',
                    specialty: '',
                });
            })
            .catch(error => {
                console.error("There was an error adding the Doctor:", error);
                alert("Failed to add Doctor. Please try again.");
            });
    };


    return (
        <>
            <div className="text-center my-4">
                <h2>Add a New Doctor</h2>
            </div>
            <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className="form-control"
                        value={doctor.name}
                        onChange={handleChange}
                        required
                    />
                    <div className="invalid-feedback">Please provide a name.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="lastname" className="form-label">Last Name:</label>
                    <input
                        type="text"
                        id="lastname"
                        name="lastname"
                        className="form-control"
                        value={doctor.lastname}
                        onChange={handleChange}
                        required
                    />
                    <div className="invalid-feedback">Please provide a last name.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="specialty" className="form-label">Specialty:</label>
                    <input
                        type="text"
                        id="specialty"
                        name="specialty"
                        className="form-control"
                        value={doctor.specialty}
                        onChange={handleChange}
                        required
                    />
                    <div className="invalid-feedback">Please provide a valid date of birth.</div>
                </div>
                <button type="submit" className="btn btn-primary">Add Doctor</button>
            </form>
        </>
        
    );
};

export default AddDoctor;