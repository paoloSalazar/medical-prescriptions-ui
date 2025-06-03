import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DatePicker from "react-datepicker";
import MedicationsDataService from '../../data/MedicationsDataService';
import MedicationTypesDataService from '../../data/MedicationTypesDataService';
import { useTranslation } from 'react-i18next';

const UpdateMedication = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [medication, setMedication] = useState({
    code: '',
    name: '',
    expirationdate: '',
    description: '',
    medicationtype: '',
    medicationtypeid: ''
  });

  const [errors, setErrors] = useState({
    code: '',
    name: '',
    expirationdate: '',
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

    MedicationsDataService.get(id)
      .then(response => {
        setMedication(response.data);
      })
      .catch(error => {
        console.error('Error fetching medication:', error);
      });
  }, [id]);

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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setMedication({ ...medication, [name]: value });
    
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

  const handleSubmit = (event) => {
    event.preventDefault();
    
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

    MedicationsDataService.update(id, medication)
      .then(response => {
        console.log('Medication updated successfully:', response.data);
        setSuccessMessage(t('Updated Success', { entity: t('entities.medication') }));
        setTimeout(() => {
          setSuccessMessage('');
          navigate('/medications');
        }, 2000);
      })
      .catch(error => {
        console.error('Error updating medication:', error);
      });
  };

  return (
    <div className="container">
      <div className="text-center my-4">
        <h2>{t('Update', { entity: t('entities.medication') })}</h2>
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
          <br />
          <DatePicker
            id="expirationdate"
            name="expirationdate"
            className={`form-control ${validated && errors.expirationdate ? 'is-invalid' : ''}`}
            selected={medication.expirationdate ? new Date(medication.expirationdate) : null}
            onChange={handleDateChange}
            dateFormat="yyyy-MM-dd"
            required
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
          {t('Update', { entity: t('entities.medication') })}
        </button>
      </form>
    </div>
  );
};

export default UpdateMedication;