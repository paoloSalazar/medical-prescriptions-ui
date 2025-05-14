import React, { useState, useEffect } from 'react';
import MedicationsDataService from '../../data/MedicationsDataService.js';
import DatePicker from "react-datepicker";
import MedicationTypesDataService from '../../data/MedicationTypesDataService.js';
  
  const AddMedication = () => {
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
        // Fetch medication types on component mount
            MedicationTypesDataService.getAll()
                .then(response => {
                    setMedicationTypes(response.data);
                })
                .catch(error => {
                    console.error("Error fetching medication types:", error);
                });
        }, []);
  
      const handleChange = (e) => {
          const { name, value } = e.target;
          setMedication({
              ...medication,
              [name]: value,
          });
      };
  
      const handleSubmit = (e) => {
          e.preventDefault();
          const formattedMedication = {
                ...medication,
                medicationtype: parseInt(medication.medicationtype, 10),
                expirationdate: medication.expirationdate ? 
                    new Date(medication.expirationdate).toISOString().split('T')[0] : ''
            };
          MedicationsDataService.create(formattedMedication)
              .then(response => {
                  console.log("medication added successfully:", response.data);
                  alert("medication added successfully!");
                  setMedication({
                    code: '',
                    name: '',
                    expirationdate: '',
                    description: '',
                    medicationtype: ''
                  });
              })
              .catch(error => {
                  console.error("There was an error adding the medication:", error);
                  alert("Failed to add medication. Please try again.");
              });
      };

      const handleDateChange = (date) => {
            setMedication({
                ...medication,
                expirationdate: date,
            });
        };
  
  
      return (
          <>
              <div className="text-center my-4">
                  <h2>Add a New medication</h2>
              </div>
              <form onSubmit={handleSubmit} className="needs-validation" noValidate>
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
                        <br/>
                        <DatePicker
                            id="expirationdate"
                            name="expirationdate"
                            className="form-control"
                            selected={medication.expirationdate}
                            onChange={handleDateChange}
                            dateFormat="yyyy-MM-dd"
                            placeholderText="Select expiration date"
                            showYearDropdown
                            scrollableYearDropdown
                            yearDropdownItemNumber={100}
                            
                        />
                        <div className="invalid-feedback">Please provide a valid expiration date.</div>
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
                    <label htmlFor="medicationtypeid" className="form-label">Medication Type:</label>
                        <select
                            id="medicationtypeid"
                            name="medicationtypeid"
                            className="form-control"
                            value={medication.medicationtypeid}
                            onChange={handleChange}
                            required
                        >
                            <option value="" disabled>Select Medication Type</option>
                            {medicationTypes.map(type => (
                                <option key={type.id} value={type.id}>{type.name}</option>
                            ))}
                        </select>
                        <div className="invalid-feedback">Please select a medication type.</div>
                  </div>
                  <button type="submit" className="btn btn-primary">Add Medication</button>
              </form>
          </>
          
      );
  };
  
  export default AddMedication;