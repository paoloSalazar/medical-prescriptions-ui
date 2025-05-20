import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AppointmentsDataService from '../../data/AppointmentsDataService';
import MedicationsDataService from '../../data/MedicationsDataService';
import PrescriptionsDataService from '../../data/PrescriptionsDataService'; // Import PrescriptionsDataService
import Select from 'react-select';
// import '../assets/ModalDescription.css';

const AppointmentDetail = () => {
  const { id } = useParams(); // Get the appointment ID from the URL
  const [appointment, setAppointment] = useState(null);
  const [medications, setMedications] = useState([]); // State for medications
  const [selectedMedication, setSelectedMedication] = useState(null); // State for selected medication
  const [instructions, setInstructions] = useState(''); // State for instructions
  const [prescriptions, setPrescriptions] = useState([]); // State for prescriptions

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
  };

  const handleInstructionsChange = (event) => {
    setInstructions(event.target.value);
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

    const prescriptionData = {
      appointmentid: id,
      medicationid: selectedMedication.value,
      instructions: instructions
    };

    PrescriptionsDataService.create(prescriptionData)
      .then(response => {
        console.log('Prescription created successfully:', response.data);
        alert('Prescription created successfully!');
        // Clear the form
        setSelectedMedication(null);
        setInstructions('');
        // Refresh prescriptions list
        PrescriptionsDataService.getByAppointmentId(id)
          .then(response => {
            setPrescriptions(response.data);
          })
          .catch(error => {
            console.error('Error fetching prescriptions:', error);
          });
      })
      .catch(error => {
        console.error('Error creating prescription:', error);
        alert('Error creating prescription. Please try again.');
      });
  };

  return (
    <div className="container d-flex justify-content-center"> {/* Center the content */}
      <div className="card col-md-8"> {/* Use a Bootstrap card for styling */}
        <div className="card-body">
          <h2 className="card-title text-center">Appointment Details</h2> {/* Center the title */}
          <p className="card-text"><strong>Doctor:</strong> {appointment.doctorname}</p>
          <p className="card-text"><strong>Patient:</strong> {appointment.patientname}</p>
          <p className="card-text">
            <strong>Appointment Date:</strong> {new Date(appointment.appointmentdate).toDateString()} {new Date(appointment.appointmentdate).toLocaleTimeString()}
          </p>
          <p className="card-text"><strong>Reason:</strong> {appointment.reason}</p>
          {/* Add more appointment details here */}

          <div className="row justify-content-center"> {/* Center the form horizontally */}
            <div className="col-md-8"> {/* Limit the form width */}
              <h5 className="text-center mb-3">Add Medication and Instructions</h5> {/* Center the form title */}
              <form onSubmit={handleSubmit}> {/* Handle form submission */}
                <div className="mb-3">
                  <label htmlFor="medicationName" className="form-label">Medication</label>
                  <Select
                    options={medications}
                    value={selectedMedication}
                    onChange={handleMedicationChange}
                    placeholder="Type to search medications..."
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="instructions" className="form-label">Instructions</label>
                  <textarea
                    className="form-control"
                    id="instructions"
                    rows="3"
                    placeholder="Enter instructions"
                    value={instructions}
                    onChange={handleInstructionsChange}
                  />
                </div>
                <button type="submit" className="btn btn-primary">Add Medication and instructions</button>
              </form>
            </div>
          </div>

          <div className="row justify-content-center mt-4"> {/* Center the table horizontally */}
            <div className="col-md-12"> {/* Limit the table width */}
              <h5 className="text-center mb-3">Medications for this Appointment</h5> {/* Center the table title */}
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Medication</th>
                    <th>Instructions</th>
                    <th>Actions</th>
                    
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