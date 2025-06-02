import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MedicationTypesDataService from '../../data/MedicationTypesDataService';
import { useTranslation } from 'react-i18next';

const UpdateMedicationType = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [medicationType, setMedicationType] = useState({
    code: '',
    name: '',
    description: ''
  });
  
  const [errors, setErrors] = useState({
    code: '',
    name: '',
    description: ''
  });
  const [validated, setValidated] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    MedicationTypesDataService.get(id)
      .then(response => {
        setMedicationType(response.data);
      })
      .catch(error => {
        console.error('Error fetching medication type:', error);
      });
  }, [id]);

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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setMedicationType({ ...medicationType, [name]: value });
    
    // Clear error when user types
    setErrors({
      ...errors,
      [name]: ''
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
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

    MedicationTypesDataService.update(id, medicationType)
      .then(response => {
        console.log('Medication Type updated successfully:', response.data);
        setSuccessMessage(t('Updated Success', { entity: t('entities.medicationType') }));
        setTimeout(() => {
          setSuccessMessage('');
          navigate('/medicationTypes');
        }, 2000);
      })
      .catch(error => {
        console.error('Error updating medication type:', error);
      });
  };

  return (
    <div className="container">
      <div className="text-center my-4">
        <h2>{t('Update', { entity: t('entities.medicationType') })}</h2>
      </div>
      {successMessage && (
        <div className="alert alert-success fade show" role="alert">
          {successMessage}
        </div>
      )}
      <form noValidate validated={validated} onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="code" className="form-label">{t('Code')}:</label>
          <input
            type="text"
            className={`form-control ${validated && errors.code ? 'is-invalid' : ''}`}
            id="code"
            name="code"
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
            className={`form-control ${validated && errors.name ? 'is-invalid' : ''}`}
            id="name"
            name="name"
            value={medicationType.name}
            onChange={handleChange}
            required
          />
          <div className="invalid-feedback">{errors.name}</div>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">{t('Description')}:</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={medicationType.description}
            onChange={handleChange}
            rows="3"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {t('Update', { entity: t('entities.medicationType') })}
        </button>
      </form>
    </div>
  );
};

export default UpdateMedicationType;