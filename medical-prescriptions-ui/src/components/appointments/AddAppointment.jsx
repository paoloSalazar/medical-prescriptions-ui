import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../assets/searchable-select.css";
import AppointmentsDataService from '../../data/AppointmentsDataService';
import DoctorsDataService from '../../data/DoctorsDataService';
import PatientsDataService from '../../data/PatientsDataService';
import { useTranslation } from 'react-i18next';

const AddAppointment = () => {
    const { t } = useTranslation();
    const [appointment, setAppointment] = useState({
        doctorid: '',
        patientid: '',
        appointmentdate: '',
        reason: ''
    });

    const [errors, setErrors] = useState({
        doctorid: '',
        patientid: '',
        appointmentdate: '',
        reason: ''
    });
    
    const [validated, setValidated] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [doctors, setDoctors] = useState([]); 
    const [patients, setPatients] = useState([]);

    const patientOptions = patients.map(patient => ({
        value: patient.id,
        label: `${patient.name} ${patient.lastname}`
    }));

    const doctorOptions = doctors.map(doctor => ({
        value: doctor.id,
        label: `${doctor.name} ${doctor.lastname} (${doctor.specialty})`
    }));

    const handleSelectChange = (selectedOption, { name }) => {
        setAppointment({
            ...appointment,
            [name]: selectedOption ? selectedOption.value : ''
        });
        
        setErrors({
            ...errors,
            [name]: ''
        });
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
            
    }, []);

    // ...existing useEffect code...

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAppointment({
            ...appointment,
            [name]: value,
        });
        
        // Clear error when user types
        setErrors({
            ...errors,
            [name]: ''
        });
    };

    const handleDateChange = (date) => {
        setAppointment({
            ...appointment,
            appointmentdate: date,
        });
        setErrors({
            ...errors,
            appointmentdate: ''
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
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

        AppointmentsDataService.create(formattedAppointment)
            .then(response => {
                console.log("Appointment added successfully:", response.data);
                setSuccessMessage(t('Added Success', { entity: t('entities.appointment') }));
                setAppointment({
                    doctorid: '',
                    patientid: '',
                    appointmentdate: '',
                    reason: ''
                });
                setValidated(false);
                setErrors({
                    doctorid: '',
                    patientid: '',
                    appointmentdate: '',
                    reason: ''
                });
                setTimeout(() => {
                    setSuccessMessage('');
                }, 3000);
            })
            .catch(error => {
                console.error("Error adding appointment:", error);
            });
    };

    return (
        <>
            <div className="text-center my-4">
                <h2>{t('Add Title', { entity: t('entities.appointment') })}</h2>
            </div>
            {successMessage && (
                <div className="alert alert-success fade show" role="alert">
                    {successMessage}
                </div>
            )}
            <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                <div className="mb-3">
                    <label htmlFor="patientid" className="form-label">{t('Patient')}:</label>
                    <Select
                        id="patientid"
                        name="patientid"
                        options={patientOptions}
                        value={patientOptions.find(option => option.value === appointment.patientid) || null}
                        onChange={(option) => handleSelectChange(option, { name: 'patientid' })}
                        placeholder={t('Select Patient')}
                        isClearable
                        isSearchable
                        className={validated && errors.patientid ? 'is-invalid' : ''}
                        classNamePrefix="react-select"
                    />
                    <div className="invalid-feedback" style={{ display: validated && errors.patientid ? 'block' : 'none' }}>
                        {errors.patientid}
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="doctorid" className="form-label">{t('Doctor')}:</label>
                    <Select
                        id="doctorid"
                        name="doctorid"
                        options={doctorOptions}
                        value={doctorOptions.find(option => option.value === appointment.doctorid) || null}
                        onChange={(option) => handleSelectChange(option, { name: 'doctorid' })}
                        placeholder={t('Select Doctor')}
                        isClearable
                        isSearchable
                        className={validated && errors.doctorid ? 'is-invalid' : ''}
                        classNamePrefix="react-select"
                    />
                    <div className="invalid-feedback" style={{ display: validated && errors.doctorid ? 'block' : 'none' }}>
                        {errors.doctorid}
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="appointmentdate" className="form-label">{t('Appointment Date')}:</label>
                    <br/>
                    <DatePicker
                        id="appointmentdate"
                        name="appointmentdate"
                        className={`form-control ${validated && errors.appointmentdate ? 'is-invalid' : ''}`}
                        selected={appointment.appointmentdate}
                        onChange={handleDateChange}
                        dateFormat="yyyy-MM-dd HH:mm"
                        placeholderText={t('Select appointment date')}
                        showYearDropdown
                        scrollableYearDropdown
                        yearDropdownItemNumber={100}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
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
                    {t('Add', { entity: t('entities.appointment') })}
                </button>
            </form>
        </>
    );
};

export default AddAppointment;