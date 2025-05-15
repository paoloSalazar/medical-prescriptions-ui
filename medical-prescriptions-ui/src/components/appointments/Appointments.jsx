import AppointmentsDataService from '../../data/AppointmentsDataService.js';
// import PatientDetailModal from './PatientDetailModal.jsx';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AppointmentDetailModal from './AppointmentDetailModal.jsx';

const Appointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [selectedAppointment, setSelectedAppointment] = useState(null);

    const MAX_DESCRIPTION_LENGTH = 50; // Define the maximum length


    useEffect(() => {
        AppointmentsDataService.getAll()
            .then(response => {
                setAppointments(response.data);
            })
            .catch(e => {
                console.log(e);
            });
        }, []);

    const handleDelete = (id) => {
        AppointmentsDataService.delete(id)
          .then(response => {
            console.log('appointment deleted successfully:', response.data);
            // Update the appointments state to remove the deleted appointment
            setAppointments(appointments.filter(appointment => appointment.id !== id));
          })
          .catch(error => {
            console.error('Error deleting appointment:', error);
          });
    };

    const handleRowClick = (appointment) => {
      setSelectedAppointment(appointment);
    };

    const handleCloseModal = () => {
      setSelectedAppointment(null);
    };

    return (
        <>  
            <div className="text-center my-4">
                <h2>Appointments List</h2>
            </div>
            <div className='col-md-12'>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Patient</th>
                            <th>Doctor</th>
                            <th>Reason</th>
                            <th>Appointment Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            appointments.map((appointment, index) => (
                                <tr key={index} onClick={() => handleRowClick(appointment)} style={{ cursor: 'pointer' }}>
                                    <td>{appointment.patientname}</td>
                                    <td>{appointment.doctorname}</td>
                                    <td>
                                        {appointment.reason
                                            ? appointment.reason.length > MAX_DESCRIPTION_LENGTH
                                            ? appointment.reason.substring(0, MAX_DESCRIPTION_LENGTH) + "..."
                                            : appointment.reason
                                            : 'No description available'}
                                    </td>
                                    <td>{new Date(appointment.appointmentdate).toDateString()} {new Date(appointment.appointmentdate).toLocaleTimeString()}</td>
                                    <td>
                                         <Link to={`/appointments/updateAppointment/${appointment.id}`} className="btn btn-warning">
                                            Update
                                        </Link>
                                        <button className="btn btn-danger" onClick={() => handleDelete(appointment.id)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))

                        }
                    </tbody>
                </table>
            </div>
            <div className="mt-3 d-flex justify-content-center">
                   <Link to="/appointments/addAppointment" title="Add a new Appointment" className="btn btn-primary">
                    Add a New Appointment
                    </Link>
            </div>

            {selectedAppointment && (
                <AppointmentDetailModal
                appointment={selectedAppointment}
                onClose={handleCloseModal}
                />
            )}
        </>
    )
};

export default Appointments;