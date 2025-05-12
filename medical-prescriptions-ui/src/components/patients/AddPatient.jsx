import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PatientsDataService from '../../data/PatientsDataService';

const AddPatient = () => {
    const [patient, setPatient] = useState({
        name: '',
        lastname: '',
        dateofbirth: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPatient({
            ...patient,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formattedPatient = {
            ...patient,
            dateofbirth: patient.dateofbirth ? 
                new Date(patient.dateofbirth).toISOString().split('T')[0] : ''
        };
        PatientsDataService.create(formattedPatient)
            .then(response => {
                console.log("Patient added successfully:", response.data);
                alert("Patient added successfully!");
                setPatient({
                    name: '',
                    lastname: '',
                    dateofbirth: '',
                });
            })
            .catch(error => {
                console.error("There was an error adding the patient:", error);
                alert("Failed to add patient. Please try again.");
            });
    };

    const handleDateChange = (date) => {
        setPatient({
            ...patient,
            dateofbirth: date,
        });
    };

    return (
        <>
            <div className="text-center my-4">
                <h2>Add a New Patient</h2>
            </div>
            <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className="form-control"
                        value={patient.name}
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
                        value={patient.lastname}
                        onChange={handleChange}
                        required
                    />
                    <div className="invalid-feedback">Please provide a last name.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="dateofbirth" className="form-label">Date of Birth:</label>
                    <br/>
                    <DatePicker
                        id="dateofbirth"
                        name="dateofbirth"
                        className="form-control"
                        selected={patient.dateofbirth}
                        onChange={handleDateChange}
                        dateFormat="yyyy-MM-dd"
                        placeholderText="Select date of birth"
                        showYearDropdown
                        scrollableYearDropdown
                        yearDropdownItemNumber={100}
                        
                    />
                    <div className="invalid-feedback">Please provide a valid date of birth.</div>
                </div>
                <button type="submit" className="btn btn-primary">Add Patient</button>
            </form>
        </>
        
    );
};

export default AddPatient;