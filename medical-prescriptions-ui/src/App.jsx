import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Navbar from './components/patients/Navbar';
import Patients from './components/patients/Patients.jsx';
import AddPatients from './components/patients/AddPatient.jsx';
import Doctors from './components/doctors/Doctors.jsx';
import AddDoctor from './components/doctors/AddDoctor.jsx';
import UpdatePatient from './components/patients/UpdatePatient.jsx';
import UpdateDoctor from './components/doctors/UpdateDoctor.jsx';
import MedicationTypes from './components/medicationTypes/MedicationTypes.jsx';
import AddMedicationType from './components/medicationTypes/AddMedicationType.jsx';
// import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
// import './App.css';

function Home() {
  return <h2>Home</h2>;
}

function App() {
  return (
    <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/patients" element={<Patients />} />
          <Route path="/patients/addPatient" element={<AddPatients />} />
          <Route path="/patients/updatePatient/:id" element={<UpdatePatient />} />
          

          <Route path="/doctors" element={<Doctors />} />
          <Route path="/doctors/addDoctor" element={<AddDoctor />} />
          <Route path="/doctors/updateDoctor/:id" element={<UpdateDoctor />} />
          
          <Route path="/medicationTypes" element={<MedicationTypes />} />
          <Route path="/medicationTypes/addMedicationType" element={<AddMedicationType />} />
          
        </Routes>
    </Router>
  );
}

export default App;