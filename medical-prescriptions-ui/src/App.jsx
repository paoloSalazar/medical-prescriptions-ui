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
import Medications from './components/medications/Medications.jsx';
import AddMedication from './components/medications/AddMedication.jsx';
import UpdateMedication from './components/medications/UpdateMedication.jsx';
import Appointments from './components/appointments/Appointments.jsx';
import AddAppointment from './components/appointments/AddAppointment.jsx';
import UpdateAppointment from './components/appointments/UpdateAppointment.jsx';
// import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
// import './App.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import AppointmentDetail from './components/appointments/AppointmentDetail.jsx';

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
          
          <Route path="/medications" element={<Medications />} />
          <Route path="/medications/addMedication" element={<AddMedication />} />
          <Route path="/medications/updateMedication/:id" element={<UpdateMedication />} />

          <Route path="/appointments" element={<Appointments />} />
          <Route path="/appointments/addAppointment" element={<AddAppointment />} />
          <Route path="/appointments/updateAppointment/:id" element={<UpdateAppointment />} />
          <Route path="/appointments/detail/:id" element={<AppointmentDetail />} />
          
          
        </Routes>
    </Router>
  );
}

export default App;