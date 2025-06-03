import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DatePicker from "react-datepicker";
import AppointmentsDataService from '../../data/AppointmentsDataService';
import PatientsDataService from '../../data/PatientsDataService';
import DoctorsDataService from '../../data/DoctorsDataService';
import { useTranslation } from 'react-i18next';

const UpdateAppointment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [appointment, setAppointment] = useState({
    doctorid: '',
    patientid: '',
    appointmentdate: '',
    reason: ''
  });

  const [doctors, setDoctors] = useState([]); 
  const [patients, setPatients] = useState([]);

  const [errors, setErrors] = useState({
    doctorid: '',
    patientid: '',
    appointmentdate: '',
    reason: ''
  });
  const [validated, setValidated] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const validateField = (name, value) => {
    switch(name) {
      case 'doctorid':
      case 'patientid':
        if (!value) {
          return t('This field is required.');
        }
        return '';
      
      case 'appointmentdate':
        if (!value) {
          return t('Please provide a valid appointment date.');
        }
        return '';

      case 'reason':
        if (!value || !value.trim()) {
          return t('Please provide a reason for the appointment.');
        }
        return '';

      default:
        return '';
    }
  };


  useEffect(() => {
    DoctorsDataService.getAll()
        .then(response => {
            setDoctors(response.data);
        })
        .catch(error => {
            console.error("Error fetching doctors:", error);
        });
    
    PatientsDataService.getAll()
        .then(response => {
            setPatients(response.data);
        })
        .catch(error => {
            console.error("Error fetching patients:", error);
        });

    AppointmentsDataService.get(id) // Assuming you have a get method in 
      .then(response => {
        setAppointment(response.data);
      })
      .catch(error => {
        console.error('Error fetching appointment:', error);
      });
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setAppointment({ ...appointment, [name]: value });
    
    // Clear error when user types
    setErrors({
      ...errors,
      [name]: ''
    });
  };

  const handleDateChange = (date) => {
        const formattedDate = date.toISOString().slice(0, 16);
        setAppointment({
            ...appointment,
            appointmentdate: formattedDate,
        });

    };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Validate all fields
    const newErrors = {
      doctorid: validateField('doctorid', appointment.doctorid),
      patientid: validateField('patientid', appointment.patientid),
      appointmentdate: validateField('appointmentdate', appointment.appointmentdate),
      reason: validateField('reason', appointment.reason)
    };

    setErrors(newErrors);
    setValidated(true);

    // Check if there are any errors
    if (Object.values(newErrors).some(error => error !== '')) {
      return;
    }

    const formattedAppointment = {
      ...appointment,
      appointmentdate: appointment.appointmentdate ?
        new Date(appointment.appointmentdate).toLocaleString('en-CA', {
          year: 'numeric',
          month: '2-digit',   
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        }).replace(',', '') : ''
    };

    AppointmentsDataService.update(id, formattedAppointment)
      .then(response => {
        console.log('appointment updated successfully:', response.data);
        setSuccessMessage(t('Updated Success', { entity: t('entities.appointment') }));
        setTimeout(() => {
          setSuccessMessage('');
          navigate('/appointments');
        }, 3000);
      })
      .catch(error => {
        console.error('Error updating appointment:', error);
      });
  };

  return (
    <div className="container">
      <div className="text-center my-4">
        <h2>{t('Update', { entity: t('entities.appointment') })}</h2>
      </div>
      {successMessage && (
        <div className="alert alert-success fade show" role="alert">
          {successMessage}
        </div>
      )}
      <form onSubmit={handleSubmit} className="needs-validation" noValidate>
        <div className="mb-3">
          <label htmlFor="patientid" className="form-label">{t('Patient')}:</label>
          <select
            id="patientid"
            name="patientid"
            className={`form-control ${validated && errors.patientid ? 'is-invalid' : ''}`}
            value={appointment.patientid}
            onChange={handleChange}
            required
          >
            <option value="" disabled>{t('Select Patient')}</option>
            {patients.map(patient => (
              <option key={patient.id} value={patient.id}>
                {patient.name} {patient.lastname}
              </option>
            ))}
          </select>
          <div className="invalid-feedback">{errors.patientid}</div>
        </div>
        <div className="mb-3">
          <label htmlFor="doctorid" className="form-label">{t('Doctor')}:</label>
          <select
            id="doctorid"
            name="doctorid"
            className={`form-control ${validated && errors.doctorid ? 'is-invalid' : ''}`}
            value={appointment.doctorid}
            onChange={handleChange}
            required
          >
            <option value="" disabled>{t('Select Doctor')}</option>
            {doctors.map(doctor => (
              <option key={doctor.id} value={doctor.id}>
                {doctor.name} {doctor.lastname} ({doctor.specialty})
              </option>
            ))}
          </select>
          <div className="invalid-feedback">{errors.doctorid}</div>
        </div>
        <div className="mb-3">
          <label htmlFor="appointmentdate" className="form-label">{t('Appointment Date')}:</label>
          <input
            type="datetime-local"
            className={`form-control ${validated && errors.appointmentdate ? 'is-invalid' : ''}`}
            id="appointmentdate"
            name="appointmentdate"
            value={appointment.appointmentdate}
            onChange={handleChange}
            required
          />
          <div className="invalid-feedback">{errors.appointmentdate}</div>
        </div>
        <div className="mb-3">
          <label htmlFor="reason" className="form-label">{t('Reason')}:</label>
          <textarea
            id="reason"
            name="reason"
            className={`form-control ${validated && errors.reason ? 'is-invalid' : ''}`}
            value={appointment.reason}
            onChange={handleChange}
            required
          />
          <div className="invalid-feedback">{errors.reason}</div>
        </div>
        <button type="submit" className="btn btn-primary">
          {t('Update', { entity: t('entities.appointment') })}
        </button>
      </form>
    </div>
  );
};

export default UpdateAppointment;