import React, { useState, useEffect } from 'react';
import MedicationsDataService from '../../data/MedicationsDataService.js';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import MedicationTypesDataService from '../../data/MedicationTypesDataService.js';
import { useTranslation } from 'react-i18next';
  
const AddMedication = () => {
    const { t } = useTranslation();
    const [medication, setMedication] = useState({
        code: '',
        name: '',
        expirationdate: null,
        description: '',
        medicationtype: '',
        medicationtypeid: ''
    });

    const [errors, setErrors] = useState({
        code: '',
        name: '',
        expirationdate: '',
        description: '',
        medicationtypeid: ''
    });
    const [validated, setValidated] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [medicationTypes, setMedicationTypes] = useState([]);

    useEffect(() => {
        MedicationTypesDataService.getAll()
            .then(response => {
                setMedicationTypes(response.data);
            })
            .catch(error => {
                console.error("Error fetching medication types:", error);
            });
    }, []);

    const validateField = (name, value) => {
        const alphanumericRegex = /^[A-Za-z0-9\s]+$/;
        
        switch(name) {
            case 'code':
            case 'name':
                if (!value || !value.trim()) {
                    return t('This field is required.');
                }
                if (!alphanumericRegex.test(value)) {
                    return t('Please enter only letters and numbers.');
                }
                return '';
            
            case 'expirationdate':
                if (!value) {
                    return t('Please provide a valid expiration date.');
                }
                return '';
            
            case 'medicationtypeid':
                if (!value) {
                    return t('Please select a medication type.');
                }
                return '';

            default:
                return '';
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMedication({
            ...medication,
            [name]: value,
        });
        
        // Clear error when user types
        setErrors({
            ...errors,
            [name]: ''
        });
    };

    const handleDateChange = (date) => {
        setMedication({
            ...medication,
            expirationdate: date,
        });
        setErrors({
            ...errors,
            expirationdate: ''
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validate all fields
        const newErrors = {
            code: validateField('code', medication.code),
            name: validateField('name', medication.name),
            expirationdate: validateField('expirationdate', medication.expirationdate),
            medicationtypeid: validateField('medicationtypeid', medication.medicationtypeid)
        };

        setErrors(newErrors);
        setValidated(true);

        // Check if there are any errors
        if (Object.values(newErrors).some(error => error !== '')) {
            return;
        }

        const formattedMedication = {
            ...medication,
            medicationtype: parseInt(medication.medicationtype, 10),
            expirationdate: medication.expirationdate ? 
                new Date(medication.expirationdate).toISOString().split('T')[0] : ''
        };

        MedicationsDataService.create(formattedMedication)
            .then(response => {
                console.log("Medication added successfully:", response.data);
                setSuccessMessage(t('Added Success', { entity: t('entities.medication') }));
                setMedication({
                    code: '',
                    name: '',
                    expirationdate: null,
                    description: '',
                    medicationtype: '',
                    medicationtypeid: ''
                });
                setValidated(false);
                setErrors({
                    code: '',
                    name: '',
                    expirationdate: '',
                    description: '',
                    medicationtypeid: ''
                });
                setTimeout(() => {
                    setSuccessMessage('');
                }, 3000);
            })
            .catch(error => {
                console.error("There was an error adding the medication:", error);
            });
    };

    return (
        <>
            <div className="text-center my-4">
                <h2>{t('Add Title', { entity: t('entities.medication') })}</h2>
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
                        value={medication.code}
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
                        value={medication.name}
                        onChange={handleChange}
                        required
                    />
                    <div className="invalid-feedback">{errors.name}</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="expirationdate" className="form-label">{t('Expiration Date')}:</label>
                    <br/>
                    <DatePicker
                        id="expirationdate"
                        name="expirationdate"
                        className={`form-control ${validated && errors.expirationdate ? 'is-invalid' : ''}`}
                        selected={medication.expirationdate}
                        onChange={handleDateChange}
                        dateFormat="yyyy-MM-dd"
                        placeholderText={t('Select expiration date')}
                        showYearDropdown
                        scrollableYearDropdown
                        yearDropdownItemNumber={100}
                    />
                    <div className="invalid-feedback">{errors.expirationdate}</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">{t('Description')}:</label>
                    <textarea
                        id="description"
                        name="description"
                        className="form-control"
                        value={medication.description}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">  
                <label htmlFor="medicationtypeid" className="form-label">{t('Medication Type')}:</label>
                <select
                    id="medicationtypeid"
                    name="medicationtypeid"
                    className={`form-control ${validated && errors.medicationtypeid ? 'is-invalid' : ''}`}
                    value={medication.medicationtypeid}
                    onChange={handleChange}
                    required
                >
                    <option value="" disabled>{t('Select Medication Type')}</option>
                    {medicationTypes.map(type => (
                        <option key={type.id} value={type.id}>{type.name}</option>
                    ))}
                </select>
                <div className="invalid-feedback">{errors.medicationtypeid}</div>
            </div>
                <button type="submit" className="btn btn-primary">
                    {t('Add', { entity: t('entities.medication') })}
                </button>
            </form>
        </>
    );
};

export default AddMedication;