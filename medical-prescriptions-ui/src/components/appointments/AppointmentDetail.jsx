import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AppointmentsDataService from '../../data/AppointmentsDataService';
import MedicationsDataService from '../../data/MedicationsDataService';
import PrescriptionsDataService from '../../data/PrescriptionsDataService'; // Import PrescriptionsDataService
import Select from 'react-select';
import { useTranslation } from 'react-i18next';
// import '../assets/ModalDescription.css';

const AppointmentDetail = () => {
  const { id } = useParams(); // Get the appointment ID from the URL
  const [appointment, setAppointment] = useState(null);
  const [medications, setMedications] = useState([]); // State for medications
  const [selectedMedication, setSelectedMedication] = useState(null); // State for selected medication
  const [instructions, setInstructions] = useState(''); // State for instructions
  const [prescriptions, setPrescriptions] = useState([]); // State for prescriptions

  const [errors, setErrors] = useState({
    medication: '',
    instructions: ''
  });
  const [validated, setValidated] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const { t, i18n } = useTranslation();

  const validateField = (name, value) => {
    switch(name) {
      case 'medication':
        if (!value) {
          return t('Please select a medication.');
        }
        return '';
      
      case 'instructions':
        if (!value || !value.trim()) {
          return t('Please provide instructions for the medication.');
        }
        return '';

      default:
        return '';
    }
  };

  useEffect(() => {
    // Fetch the appointment data when the component mounts
    AppointmentsDataService.get(id)
      .then(response => {
        setAppointment(response.data);
      })
      .catch(error => {
        console.error('Error fetching appointment:', error);
      });

    // Fetch all medications
    MedicationsDataService.getAll()
      .then(response => {
        // Map the medications to the format required by react-select
        const options = response.data.map(medication => ({
          value: medication.id,
          label: medication.name
        }));
        setMedications(options);
      })
      .catch(error => {
        console.error('Error fetching medications:', error);
      });

    // Fetch prescriptions by appointment ID
    PrescriptionsDataService.getByAppointmentId(id)
      .then(response => {
        setPrescriptions(response.data);
      })
      .catch(error => {
        console.error('Error fetching prescriptions:', error);
      });
  }, [id]);

  if (!appointment) {
    return <div>Loading...</div>;
  }

  const handleMedicationChange = (selectedOption) => {
    setSelectedMedication(selectedOption);
    setErrors({
      ...errors,
      medication: ''
    });
  };

  const handleInstructionsChange = (event) => {
    setInstructions(event.target.value);
    setErrors({
      ...errors,
      instructions: ''
    });
  };

  const handleDelete = (id) => {
      PrescriptionsDataService.delete(id)
        .then(response => {
          console.log('Patient deleted successfully:', response.data);
          // Update the patients state to remove the deleted patient
          setPrescriptions(prescriptions.filter(prescription => prescription.id !== id));
        })
        .catch(error => {
          console.error('Error deleting prescription:', error);
        });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate all fields
    const newErrors = {
      medication: validateField('medication', selectedMedication),
      instructions: validateField('instructions', instructions)
    };

    setErrors(newErrors);
    setValidated(true);

    // Check if there are any errors
    if (Object.values(newErrors).some(error => error !== '')) {
      return;
    }

    const prescriptionData = {
      appointmentid: id,
      medicationid: selectedMedication.value,
      instructions: instructions
    };

    PrescriptionsDataService.create(prescriptionData)
      .then(response => {
        console.log('Prescription created successfully:', response.data);
        setSuccessMessage(t('Added Success', { entity: t('entities.prescription') }));
        // Clear the form
        setSelectedMedication(null);
        setInstructions('');
        setValidated(false);
        setErrors({
          medication: '',
          instructions: ''
        });
        // Refresh prescriptions list
        PrescriptionsDataService.getByAppointmentId(id)
          .then(response => {
            setPrescriptions(response.data);
          })
          .catch(error => {
            console.error('Error fetching prescriptions:', error);
          });
        
        setTimeout(() => {
          setSuccessMessage('');
        }, 3000);
      })
      .catch(error => {
        console.error('Error creating prescription:', error);
      });
  };

  return (
    <div className="container d-flex justify-content-center"> {/* Center the content */}
      <div className="card col-md-8"> {/* Use a Bootstrap card for styling */}
        <div className="card-body">
          <h2 className="card-title text-center">{t('Details', {entity: t('entities.appointment')})}</h2> {/* Center the title */}
          <p className="card-text"><strong>{t('Doctor')}:</strong> {appointment.doctorname}</p>
          <p className="card-text"><strong>{t('Patient')}:</strong> {appointment.patientname}</p>
          <p className="card-text">
            <strong>{t('Appointment Date')}:</strong> {new Date(appointment.appointmentdate).toLocaleDateString(i18n.language || 'en', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  weekday: 'long',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
          </p>
          <p className="card-text"><strong>{t('Reason')}:</strong> {appointment.reason}</p>
          {/* Add more appointment details here */}

          <div className="row justify-content-center">
          <div className="col-md-8">
            <h5 className="text-center mb-3">{t('Add Medication and Instructions')}</h5>
            {successMessage && (
              <div className="alert alert-success fade show" role="alert">
                {successMessage}
              </div>
            )}
            <form onSubmit={handleSubmit} className="needs-validation" noValidate>
              <div className="mb-3">
                <label htmlFor="medicationName" className="form-label">{t('Medication')}</label>
                <Select
                  options={medications}
                  value={selectedMedication}
                  onChange={handleMedicationChange}
                  placeholder={t('Type to search medications...')}
                  className={validated && errors.medication ? 'is-invalid' : ''}
                  classNamePrefix="react-select"
                />
                <div className="invalid-feedback" style={{ display: validated && errors.medication ? 'block' : 'none' }}>
                  {errors.medication}
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="instructions" className="form-label">{t('Instructions')}</label>
                <textarea
                  className={`form-control ${validated && errors.instructions ? 'is-invalid' : ''}`}
                  id="instructions"
                  rows="3"
                  placeholder={t('Enter instructions')}
                  value={instructions}
                  onChange={handleInstructionsChange}
                />
                <div className="invalid-feedback">
                  {errors.instructions}
                </div>
              </div>
              <button type="submit" className="btn btn-primary">
                {t('Add Medication and Instructions')}
              </button>
            </form>
          </div>
        </div>

          <div className="row justify-content-center mt-4"> {/* Center the table horizontally */}
            <div className="col-md-12"> {/* Limit the table width */}
              <h5 className="text-center mb-3">Medications for this Appointment</h5> {/* Center the table title */}
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>{t('Medication')}</th>
                    <th>{t('Instructions')}</th>
                    <th>{t('Actions')}</th>
                  </tr>
                </thead>
                <tbody>
                  {prescriptions.map(prescription => (
                    <tr key={prescription.id}>
                      <td>{prescription.medicationname}</td>
                      <td>{prescription.instructions}</td>
                      <td>
                        <button className="btn btn-danger" onClick={() => handleDelete(prescription.id)}>
                          <i className="bi bi-trash" title='Delete Medication'></i> 
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentDetail;