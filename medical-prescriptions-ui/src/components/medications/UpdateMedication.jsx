import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DatePicker from "react-datepicker";
import MedicationsDataService from '../../data/MedicationsDataService';
import MedicationTypesDataService from '../../data/MedicationTypesDataService';

const UpdateMedication = () => {
  const { id } = useParams(); // Get the medication ID from the URL
  const navigate = useNavigate(); // Get the navigate function

  const [medication, setMedication] = useState({
    code: '',
    name: '',
    expirationdate: '',
    description: '',
    medicationtype: '',
    medicationtypeid: ''
  });

  const [medicationTypes, setMedicationTypes] = useState([]); // State for medication types
  

  useEffect(() => {
    MedicationTypesDataService.getAll()
        .then(response => {
            setMedicationTypes(response.data);
        })
        .catch(error => {
            console.error("Error fetching medication types:", error);
        });
    // Fetch the medication data when the component mounts
    MedicationsDataService.get(id) // Assuming you have a get method in medicationsDataService
      .then(response => {
        setMedication(response.data);
      })
      .catch(error => {
        console.error('Error fetching medication:', error);
      });
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setMedication({ ...medication, [name]: value });
  };

  const handleDateChange = (date) => {
        setMedication({
            ...medication,
            expirationdate: date,
        });
    };

  const handleSubmit = (event) => {
    event.preventDefault();

    MedicationsDataService.update(id, medication)
      .then(response => {
        console.log('medication updated successfully:', response.data);
        navigate('/medications'); // Redirect to the medications list
      })
      .catch(error => {
        console.error('Error updating medication:', error);
      });
  };

  return (
    <div className="container">
      <h2>Update medication</h2>
      <form onSubmit={handleSubmit}>
      <div className="mb-3">
            <label htmlFor="code" className="form-label">Code:</label>
            <input
                type="text"
                id="code"
                name="code"
                className="form-control"
                value={medication.code}
                onChange={handleChange}
                required
            />
            <div className="invalid-feedback">Please provide a code.</div>
        </div>
        <div className="mb-3">
            <label htmlFor="name" className="form-label">Name:</label>
            <input
                type="text"
                id="name"
                name="name"
                className="form-control"
                value={medication.name}
                onChange={handleChange}
                required
            />
            <div className="invalid-feedback">Please provide a last name.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="expirationdate" className="form-label">Expiration Date:</label>
          <input
            type="date"
            className="form-control"
            id="expirationdate"
            name="expirationdate"
            value={medication.expirationdate}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
            <label htmlFor="description" className="form-label">Description:</label>
            <textarea
                id="description"
                name="description"
                className="form-control"
                value={medication.description}
                onChange={handleChange}
                required
            />
            <div className="invalid-feedback">Please provide a valid expiration date.</div>
        </div>
        <div className="mb-3">
        <label htmlFor="medicationtype" className="form-label">Medication Type:</label>
         <select
                  id="medicationtypeid"
                  name="medicationtypeid"
                  className="form-control"
                  value={medication.medicationtypeid}
                  onChange={handleChange}
                  required
              >
                  {/* <option value="" disabled>Select Medication Type</option> */}
                  {medicationTypes.map(type => (
                      <option key={type.id} value={type.id}>{type.name}</option>
                  ))}
              </select>
            <div className="invalid-feedback">Please select a medication type.</div>
        </div>
        <button type="submit" className="btn btn-primary">Update Medication</button>
      </form>
    </div>
  );
};

export default UpdateMedication;