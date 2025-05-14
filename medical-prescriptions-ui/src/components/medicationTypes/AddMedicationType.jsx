import React, { useState } from 'react';
import MedicationTypesDataService from '../../data/MedicationTypesDataService.js';

const AddMedicationType = () => {
    const [medicationType, setMedicationType] = useState({
        code: '',
        name: '',
        description: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMedicationType({
            ...medicationType,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        MedicationTypesDataService.create(medicationType)
            .then(response => {
                console.log("medicationType added successfully:", response.data);
                alert("medicationType added successfully!");
                setMedicationType({
                    name: '',
                    lastname: '',
                    specialty: '',
                });
            })
            .catch(error => {
                console.error("There was an error adding the medicationType:", error);
                alert("Failed to add medicationType. Please try again.");
            });
    };


    return (
        <>
            <div className="text-center my-4">
                <h2>Add a New medication Type</h2>
            </div>
            <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                <div className="mb-3">
                    <label htmlFor="code" className="form-label">Code:</label>
                    <input
                        type="text"
                        id="code"
                        name="code"
                        className="form-control"
                        value={medicationType.code}
                        onChange={handleChange}
                        required
                    />
                    <div className="invalid-feedback">Please provide a code.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className="form-control"
                        value={medicationType.name}
                        onChange={handleChange}
                        required
                    />
                    <div className="invalid-feedback">Please provide a last name.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        className="form-control"
                        value={medicationType.description}
                        onChange={handleChange}
                        required
                    />
                    <div className="invalid-feedback">Please provide a valid date of birth.</div>
                </div>
                <button type="submit" className="btn btn-primary">Add medicationType</button>
            </form>
        </>
        
    );
};

export default AddMedicationType;