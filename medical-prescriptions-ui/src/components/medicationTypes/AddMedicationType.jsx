import React, { useState } from 'react';
import MedicationTypesDataService from '../../data/MedicationTypesDataService.js';
import { useTranslation } from 'react-i18next';

const AddMedicationType = () => {
    const { t } = useTranslation();
    const [medicationType, setMedicationType] = useState({
        code: '',
        name: '',
        description: '',
    });
    const [errors, setErrors] = useState({
        code: '',
        name: '',
        description: ''
    });
    const [validated, setValidated] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const validateField = (name, value) => {
        const alphanumericRegex = /^[A-Za-z0-9\s]+$/;
        
        if (name === 'description') {
            return ''; // No validation for description
        }

        if (!value || !value.trim()) {
            return t('This field is required.');
        }
        if (!alphanumericRegex.test(value)) {
            return t('Please enter only letters and numbers.');
        }
        return '';
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMedicationType({
            ...medicationType,
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
            code: validateField('code', medicationType.code),
            name: validateField('name', medicationType.name),
            description: validateField('description', medicationType.description)
        };

        setErrors(newErrors);
        setValidated(true);

        // Check if there are any errors
        if (Object.values(newErrors).some(error => error !== '')) {
            return;
        }

        MedicationTypesDataService.create(medicationType)
            .then(response => {
                console.log("Medication Type added successfully:", response.data);
                setSuccessMessage(t('Added Success', { entity: t('entities.medicationType') }));
                setMedicationType({
                    code: '',
                    name: '',
                    description: '',
                });
                setValidated(false);
                setErrors({
                    code: '',
                    name: '',
                    description: ''
                });
                setTimeout(() => {
                    setSuccessMessage('');
                }, 3000);
            })
            .catch(error => {
                console.error("There was an error adding the Medication Type:", error);
            });
    };

    return (
        <>
            <div className="text-center my-4">
                <h2>{t('Add Title', { entity: t('entities.medicationType') })}</h2>
            </div>
            {successMessage && (
                <div className="alert alert-success fade show" role="alert">
                    {successMessage}
                </div>
            )}
            <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                <div className="mb-3">
                    <label htmlFor="code" className="form-label">{t('Code')}:</label>
                    <input
                        type="text"
                        id="code"
                        name="code"
                        className={`form-control ${validated && errors.code ? 'is-invalid' : ''}`}
                        value={medicationType.code}
                        onChange={handleChange}
                        required
                    />
                    <div className="invalid-feedback">{errors.code}</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">{t('Name')}:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className={`form-control ${validated && errors.name ? 'is-invalid' : ''}`}
                        value={medicationType.name}
                        onChange={handleChange}
                        required
                    />
                    <div className="invalid-feedback">{errors.name}</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">{t('Description')}:</label>
                    <textarea
                        id="description"
                        name="description"
                        className="form-control"
                        value={medicationType.description}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    {t('Add', { entity: t('entities.medicationType') })}
                </button>
            </form>
        </>
    );
};

export default AddMedicationType;