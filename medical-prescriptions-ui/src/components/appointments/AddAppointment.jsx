import React, { useEffect, useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AppointmentsDataService from '../../data/AppointmentsDataService';
import DoctorsDataService from '../../data/DoctorsDataService';
import PatientsDataService from '../../data/PatientsDataService';

const AddAppointment = () => {
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
            
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAppointment({
            ...appointment,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
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
        AppointmentsDataService.create(formattedAppointment)
            .then(response => {
                console.log("appointment added successfully:", response.data);
                alert("appointment added successfully!");
                setAppointment({
                    doctorid: '',
                    patientid: '',
                    appointmentdate: '',
                    reason: ''
                });
            })
            .catch(error => {
                console.error("There was an error adding the appointment:", error);
                alert("Failed to add appointment. Please try again.");
            });
    };

    const handleDateChange = (date) => {
        setAppointment({
            ...appointment,
            appointmentdate: date,
        });
    };

    return (
        <>
            <div className="text-center my-4">
                <h2>Add a New appointment</h2>
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
                            <option value="" disabled>Select Patient</option>
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
                            <option value="" disabled>Select Doctor</option>
                            {doctors.map(doctor => (
                                <option key={doctor.id} value={doctor.id}>{doctor.name} {doctor.lastname} <span style={{color: 'blue'}}>({doctor.specialty})</span></option>
                            ))}
                        </select>
                    <div className="invalid-feedback">Please select a Doctor.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="appointmentdate" className="form-label">Date of Birth:</label>
                    <br/>
                    <DatePicker
                        id="appointmentdate"
                        name="appointmentdate"
                        className="form-control"
                        selected={appointment.appointmentdate}
                        onChange={handleDateChange}
                        dateFormat="yyyy-MM-dd hh:mm:ss aa"
                        placeholderText="Select appointment date"
                        showYearDropdown
                        scrollableYearDropdown
                        yearDropdownItemNumber={100}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        
                    />
                    <div className="invalid-feedback">Please provide a valid appointment date.</div>
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
                <button type="submit" className="btn btn-primary">Add Appointment</button>
            </form>
        </>
        
    );
};

export default AddAppointment;