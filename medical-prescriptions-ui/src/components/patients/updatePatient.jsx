import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PatientDataService from '../../data/PatientsDataService';

const UpdatePatient = () => {
  const { id } = useParams(); // Get the patient ID from the URL
  const navigate = useNavigate(); // Get the navigate function

  const [patient, setPatient] = useState({
    name: '',
    lastname: '',
    dateofbirth: '',
  });

  useEffect(() => {
    // Fetch the patient data when the component mounts
    PatientDataService.get(id) // Assuming you have a get method in PatientsDataService
      .then(response => {
        setPatient(response.data);
      })
      .catch(error => {
        console.error('Error fetching patient:', error);
      });
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPatient({ ...patient, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    PatientDataService.update(id, patient)
      .then(response => {
        console.log('Patient updated successfully:', response.data);
        navigate('/patients'); // Redirect to the patients list
      })
      .catch(error => {
        console.error('Error updating patient:', error);
      });
  };

  return (
    <div className="container">
      <h2>Update Patient</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name:</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={patient.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="lastname" className="form-label">Last Name:</label>
          <input
            type="text"
            className="form-control"
            id="lastname"
            name="lastname"
            value={patient.lastname}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="dateofbirth" className="form-label">Date of Birth:</label>
          <input
            type="date"
            className="form-control"
            id="dateofbirth"
            name="dateofbirth"
            value={patient.dateofbirth}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">Update Patient</button>
      </form>
    </div>
  );
};

export default UpdatePatient;