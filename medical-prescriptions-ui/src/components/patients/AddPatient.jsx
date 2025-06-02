import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PatientsDataService from '../../data/PatientsDataService';
import { useTranslation } from 'react-i18next';

const AddPatient = () => {
    const { t } = useTranslation();
    const [patient, setPatient] = useState({
        name: '',
        lastname: '',
        dateofbirth: null,
    });
    const [errors, setErrors] = useState({
        name: '',
        lastname: '',
        dateofbirth: ''
    });
    const [validated, setValidated] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const validateField = (name, value) => {
        const letterOnlyRegex = /^[A-Za-z\s]+$/;
        
        if (name === 'dateofbirth') {
            if (!value) {
                return t('Please provide a valid date of birth.');
            }
            return '';
        }

        if (!value || !value.trim()) {
            return t('This field is required.');
        }
        if (!letterOnlyRegex.test(value)) {
            return t('Please enter only letters.');
        }
        return '';
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPatient({
            ...patient,
            [name]: value,
        });
        
        // Clear error when user types
        setErrors({
            ...errors,
            [name]: ''
        });
    };

    const handleDateChange = (date) => {
        setPatient({
            ...patient,
            dateofbirth: date,
        });
        setErrors({
            ...errors,
            dateofbirth: ''
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validate all fields
        const newErrors = {
            name: validateField('name', patient.name),
            lastname: validateField('lastname', patient.lastname),
            dateofbirth: validateField('dateofbirth', patient.dateofbirth)
        };

        setErrors(newErrors);
        setValidated(true);

        // Check if there are any errors
        if (Object.values(newErrors).some(error => error !== '')) {
            return;
        }

        const formattedPatient = {
            ...patient,
            dateofbirth: patient.dateofbirth ?
                new Date(patient.dateofbirth).toISOString().split('T')[0] : ''
        };

        PatientsDataService.create(formattedPatient)
            .then(response => {
                console.log("Patient added successfully:", response.data);
                setSuccessMessage(t('Patient added successfully!'));
                setPatient({
                    name: '',
                    lastname: '',
                    dateofbirth: null,
                });
                setValidated(false);
                setErrors({
                    name: '',
                    lastname: '',
                    dateofbirth: ''
                });
            })
            .catch(error => {
                console.error("There was an error adding the patient:", error);
            });
            setTimeout(() => {
                setSuccessMessage('');
            }, 3000);
    };

    return (
        <>
            <div className="text-center my-4">
                <h2>{t('Add Title', { entity: t('entities.patient') })}</h2>
            </div>
            {successMessage && (
                <div className="alert alert-success fade show" role="alert">
                    {successMessage}
                </div>
            )}
            <form noValidate validated={validated} onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">{t('Name')}:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className={`form-control ${validated && errors.name ? 'is-invalid' : ''}`}
                        value={patient.name}
                        onChange={handleChange}
                        required
                    />
                    <div className="invalid-feedback">{errors.name}</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="lastname" className="form-label">{t('Last Name')}:</label>
                    <input
                        type="text"
                        id="lastname"
                        name="lastname"
                        className={`form-control ${validated && errors.lastname ? 'is-invalid' : ''}`}
                        value={patient.lastname}
                        onChange={handleChange}
                        required
                    />
                    <div className="invalid-feedback">{errors.lastname}</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="dateofbirth" className="form-label">{t('Date of Birth')}:</label>
                    <br />
                    <DatePicker
                        id="dateofbirth"
                        name="dateofbirth"
                        className={`form-control ${validated && errors.dateofbirth ? 'is-invalid' : ''}`}
                        selected={patient.dateofbirth}
                        onChange={handleDateChange}
                        dateFormat="yyyy-MM-dd"
                        placeholderText={t('Select date of birth')}
                        showYearDropdown
                        scrollableYearDropdown
                        yearDropdownItemNumber={100}
                    />
                    <div className="invalid-feedback">{errors.dateofbirth}</div>
                </div>
                <button type="submit" className="btn btn-primary">{t('Add', { entity: t('entities.patient') })}</button>
            </form>
        </>
    );
};

export default AddPatient;