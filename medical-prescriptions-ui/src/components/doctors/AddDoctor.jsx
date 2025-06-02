import React, { useState } from 'react';
import DoctorsDataService from '../../data/DoctorsDataService.js';
import { useTranslation } from 'react-i18next';
    
const AddDoctor = () => {
    const { t } = useTranslation();
    const [doctor, setDoctor] = useState({
        name: '',
        lastname: '',
        specialty: '',
    });
    const [errors, setErrors] = useState({
        name: '',
        lastname: '',
        specialty: ''
    });
    const [validated, setValidated] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');


    const validateField = (name, value) => {
        const letterOnlyRegex = /^[A-Za-z\s]+$/;
        
        if (!value.trim()) {
            return t('This field is required.');
        }
        if (!letterOnlyRegex.test(value)) {
            return t('Please enter only letters.');
        }
        return '';
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDoctor({
            ...doctor,
            [name]: value,
        });
        
        // Clear error when user types
        setErrors({
            ...errors,
            [name]: ''
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validate all fields
        const newErrors = {
            name: validateField('name', doctor.name),
            lastname: validateField('lastname', doctor.lastname),
            specialty: validateField('specialty', doctor.specialty)
        };

        setErrors(newErrors);
        setValidated(true);

        // Check if there are any errors
        if (Object.values(newErrors).some(error => error !== '')) {
            return;
        }

        DoctorsDataService.create(doctor)
            .then(response => {
                console.log("Doctor added successfully:", response.data);
                setSuccessMessage(t('Doctor added successfully!'));
                setDoctor({
                    name: '',
                    lastname: '',
                    specialty: '',
                });
                setValidated(false);
                setErrors({
                    name: '',
                    lastname: '',
                    specialty: ''
                });
                // Clear success message after 3 seconds
                setTimeout(() => {
                    setSuccessMessage('');
                }, 3000);
            })
            .catch(error => {
                console.error("There was an error adding the Doctor:", error);
            });
    };

    return (
        <>
            <div className="text-center my-4">
                <h2>{t('Add Title', { entity: t('entities.doctor') })}</h2>
            </div>
            {successMessage && (
                <div className="alert alert-success fade show" role="alert">
                    {successMessage}
                </div>
            )}
            <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">{t('Name')}:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className={`form-control ${validated && errors.name ? 'is-invalid' : ''}`}
                        value={doctor.name}
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
                        value={doctor.lastname}
                        onChange={handleChange}
                        required
                    />
                    <div className="invalid-feedback">{errors.lastname}</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="specialty" className="form-label">{t('Specialty')}:</label>
                    <input
                        type="text"
                        id="specialty"
                        name="specialty"
                        className={`form-control ${validated && errors.specialty ? 'is-invalid' : ''}`}
                        value={doctor.specialty}
                        onChange={handleChange}
                        required
                    />
                    <div className="invalid-feedback">{errors.specialty}</div>
                </div>
                <button type="submit" className="btn btn-primary">{t('Add', { entity: t('entities.doctor') })}</button>
            </form>
        </>
    );
};

export default AddDoctor;