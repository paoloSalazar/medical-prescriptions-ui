import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DoctorsDataService from '../../data/DoctorsDataService';

const UpdateDoctor = () => {
  const { id } = useParams(); // Get the patient ID from the URL
  const navigate = useNavigate(); // Get the navigate function

  const [doctor, setDoctor] = useState({
    name: '',
    lastname: '',
    specialty: '',
  });

  useEffect(() => {
    // Fetch the patient data when the component mounts
    DoctorsDataService.get(id) // Assuming you have a get method in DoctorsDataService
      .then(response => {
        setDoctor(response.data);
      })
      .catch(error => {
        console.error('Error fetching doctor:', error);
      });
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDoctor({ ...doctor, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    DoctorsDataService.update(id, doctor)
      .then(response => {
        console.log('Doctor updated successfully:', response.data);
        navigate('/doctors'); // Redirect to the patients list
      })
      .catch(error => {
        console.error('Error updating patient:', error);
      });
  };

  return (
    <div className="container">
      <h2>Update Doctor</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name:</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={doctor.name}
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
            value={doctor.lastname}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="specialty" className="form-label">Specialty:</label>
          <input
            type="text"
            className="form-control"
            id="specialty"
            name="specialty"
            value={doctor.specialty}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">Update Doctor</button>
      </form>
    </div>
  );
};

export default UpdateDoctor;