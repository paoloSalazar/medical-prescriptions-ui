import AppointmentsDataService from '../../data/AppointmentsDataService.js';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Appointments = () => {
  const { t, i18n } = useTranslation();
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate(); // Use useNavigate hook

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
    navigate(`/appointments/detail/${appointment.id}`); // Navigate to a new route
  };

  return (
    <>
      <div className="text-center my-4">
        <h2>{t('List', { entity: t('entities.appointment') })}</h2>
      </div>
      <div className='col-md-12'>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>{t('Patient')}</th>
              <th>{t('Doctor')}</th>
              <th>{t('Reason')}</th>
              <th>{t('Appointment Date')}</th>
              <th>{t('Actions')}</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment, index) => (
              <tr key={index}>
                <td>{appointment.patientname}</td>
                <td>{appointment.doctorname} {appointment.doctorSpecialty}</td>
                <td>
                  {appointment.reason
                    ? appointment.reason.length > MAX_DESCRIPTION_LENGTH
                      ? appointment.reason.substring(0, MAX_DESCRIPTION_LENGTH) + "..."
                      : appointment.reason
                    : 'No description available'}
                </td>
                <td>{new Date(appointment.appointmentdate).toLocaleDateString(i18n.language || 'en', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  weekday: 'long',
                  hour: '2-digit',
                  minute: '2-digit'
                })}</td>
                <td>
                  <Link to={`/appointments/updateAppointment/${appointment.id}`} className="btn btn-warning">
                    <i className="bi bi-pencil-square" title={t('Update', { entity: t('entities.appointment') })}></i>
                  </Link>
                  <button className="btn btn-danger" onClick={() => handleDelete(appointment.id)}>
                    <i className="bi bi-trash" title={t('Delete', { entity: t('entities.appointment') })}></i>
                  </button>
                  <Link to={`/appointments/detail/${appointment.id}`} className="btn btn-info">
                    <i className="bi bi-info-circle" title={t('View Details', { entity: t('entities.appointment') })}></i>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-3 d-flex justify-content-center">
        <Link to="/appointments/addAppointment" title="Add a new Appointment" className="btn btn-primary">
          {t('Add Title', { entity: t('entities.appointment') })}
        </Link>
      </div>
    </>
  );
};

export default Appointments;