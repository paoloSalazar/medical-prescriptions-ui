import React, { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PatientsDataService from '../../data/PatientsDataService';

const AddPatient = () => {
    const [patient, setPatient] = useState({
        name: '',
        lastname: '',
        dateofbirth: null,
    });
    const [validated, setValidated] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [dateOfBirthError, setDateOfBirthError] = useState('');

    const handleChange = (event) => {
        const { name, value } = event.target;
        setPatient({
            ...patient,
            [name]: value,
        });
    };

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();

        if (form.checkValidity() === false || !patient.dateofbirth) {
            event.stopPropagation();
            setValidated(true);
            if (!patient.dateofbirth) {
                setDateOfBirthError('Please provide a valid date of birth.');
            }
        } else {
            setValidated(true);
            setDateOfBirthError('');

            const formattedPatient = {
                ...patient,
                dateofbirth: patient.dateofbirth ?
                    new Date(patient.dateofbirth).toISOString().split('T')[0] : ''
            };
            PatientsDataService.create(formattedPatient)
                .then(response => {
                    console.log("Patient added successfully:", response.data);
                    setSuccessMessage("Patient added successfully!");

                    setPatient({
                        name: '',
                        lastname: '',
                        dateofbirth: null,
                    });
                    setValidated(false);

                    // Set a timeout to clear the success message after 3 seconds
                    setTimeout(() => {
                        setSuccessMessage('');
                    }, 3000);
                })
                .catch(error => {
                    console.error("There was an error adding the patient:", error);
                    alert("Failed to add patient. Please try again.");
                });
        }
    };

    const handleDateChange = (date) => {
        setPatient({
            ...patient,
            dateofbirth: date,
        });
        setDateOfBirthError('');
    };

    return (
        <>
            <div className="text-center my-4">
                <h2>Add a New Patient</h2>
            </div>
            {successMessage && (
                <div className="alert alert-success fade show" role="alert">
                    {successMessage}
                </div>
            )}
            <form noValidate onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className={`form-control ${validated && !patient.name ? 'is-invalid' : ''}`}
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
                        className={`form-control ${validated && !patient.lastname ? 'is-invalid' : ''}`}
                        value={patient.lastname}
                        onChange={handleChange}
                        required
                    />
                    <div className="invalid-feedback">Please provide a last name.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="dateofbirth" className="form-label">Date of Birth:</label>
                    <br />
                    <DatePicker
                        id="dateofbirth"
                        name="dateofbirth"
                        className={`form-control ${validated && !patient.dateofbirth ? 'is-invalid' : ''}`}
                        selected={patient.dateofbirth}
                        onChange={handleDateChange}
                        dateFormat="yyyy-MM-dd"
                        placeholderText="Select date of birth"
                        showYearDropdown
                        scrollableYearDropdown
                        yearDropdownItemNumber={100}
                    />
                    {dateOfBirthError && <div className="invalid-feedback">{dateOfBirthError}</div>}
                </div>
                <button type="submit" className="btn btn-primary">Add Patient</button>
            </form>
        </>
    );
};

export default AddPatient;