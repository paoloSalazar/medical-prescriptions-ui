import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DatePicker from "react-datepicker";
import AppointmentsDataService from '../../data/AppointmentsDataService';
import PatientsDataService from '../../data/PatientsDataService';
import DoctorsDataService from '../../data/DoctorsDataService';

const UpdateAppointment = () => {
  const { id } = useParams(); // Get the medication ID from the URL
  const navigate = useNavigate(); // Get the navigate function

  const [appointment, setAppointment] = useState({
    doctorid: '',
    patientid: '',
    appointmentdate: '',
    reason: ''
  });

  const [doctors, setDoctors] = useState([]); 
  const [patients, setPatients] = useState([]);

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
        navigate('/appointments'); // Redirect to the appointments list
      })
      .catch(error => {
        console.error('Error updating appointment:', error);
      });
  };

  return (
    <div className="container">
      <div className="text-center my-4">
            <h2>Update Appointment</h2>
        </div>
        <form onSubmit={handleSubmit} className="needs-validation" noValidate>
            <div className="mb-3">
                <label htmlFor="patientid" className="form-label">Patient:</label>
                    <select
                        id="patientid"
                        name="patientid"
                        className="form-control"
                        value={appointment.patientid}
                        onChange={handleChange}
                        required
                    >
                        {/* <option value="" disabled>Select Patient</option> */}
                        {patients.map(patient => (
                            <option key={patient.id} value={patient.id}>{patient.name} {patient.lastname}</option>
                        ))}
                    </select>
                <div className="invalid-feedback">Please select a patient.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="doctorid" className="form-label">Doctor:</label>
                    <select
                        id="doctorid"
                        name="doctorid"
                        className="form-control"
                        value={appointment.doctorid}
                        onChange={handleChange}
                        required
                    >
                        {/* <option value="" disabled>Select Doctor</option> */}
                        {doctors.map(doctor => (
                            <option key={doctor.id} value={doctor.id}>{doctor.name} {doctor.lastname} <span style={{color: 'blue'}}>({doctor.specialty})</span></option>
                        ))}
                    </select>
                <div className="invalid-feedback">Please select a Doctor.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="appointmentdate" className="form-label">Appointment Date:</label>
                <input
                    type="datetime-local"
                    className="form-control"
                    id="appointmentdate"
                    name="appointmentdate"
                    value={appointment.appointmentdate}
                    onChange={handleChange}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="reason" className="form-label">Reason:</label>
                <textarea
                    id="reason"
                    name="reason"
                    className="form-control"
                    value={appointment.reason}
                    onChange={handleChange}
                    required
                />
                <div className="invalid-feedback">Please provide a valid reason.</div>
            </div>
            <button type="submit" className="btn btn-primary">Update Appointment</button>
        </form>
    </div>
  );
};

export default UpdateAppointment;