import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PatientDataService from '../../data/PatientsDataService';
import { useTranslation } from 'react-i18next';

const UpdatePatient = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [patient, setPatient] = useState({
    name: '',
    lastname: '',
    dateofbirth: '',
  });
  
  const [errors, setErrors] = useState({
    name: '',
    lastname: '',
    dateofbirth: ''
  });
  const [validated, setValidated] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    PatientDataService.get(id)
      .then(response => {
        setPatient(response.data);
      })
      .catch(error => {
        console.error('Error fetching patient:', error);
      });
  }, [id]);

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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPatient({ ...patient, [name]: value });
    
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

    PatientDataService.update(id, patient)
      .then(response => {
        console.log('Patient updated successfully:', response.data);
        setSuccessMessage(t('Patient updated successfully!'));
        setTimeout(() => {
          setSuccessMessage('');
          navigate('/patients');
        }, 2000);
      })
      .catch(error => {
        console.error('Error updating patient:', error);
      });
  };

  return (
    <div className="container">
      <h2>{t('Update', { entity: t('entities.patient') })}</h2>
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
            className={`form-control ${validated && errors.name ? 'is-invalid' : ''}`}
            id="name"
            name="name"
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
            className={`form-control ${validated && errors.lastname ? 'is-invalid' : ''}`}
            id="lastname"
            name="lastname"
            value={patient.lastname}
            onChange={handleChange}
            required
          />
          <div className="invalid-feedback">{errors.lastname}</div>
        </div>
        <div className="mb-3">
          <label htmlFor="dateofbirth" className="form-label">{t('Date of Birth')}:</label>
          <input
            type="date"
            className={`form-control ${validated && errors.dateofbirth ? 'is-invalid' : ''}`}
            id="dateofbirth"
            name="dateofbirth"
            value={patient.dateofbirth}
            onChange={handleChange}
            required
          />
          <div className="invalid-feedback">{errors.dateofbirth}</div>
        </div>
        <button type="submit" className="btn btn-primary">
          {t('Update', { entity: t('entities.patient') })}
        </button>
      </form>
    </div>
  );
};

export default UpdatePatient;