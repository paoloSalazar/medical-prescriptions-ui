// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
// import Patients from './components/patients/Patients.jsx'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <Patients></Patients>
//     </>
//   )
// }

// export default App

// filepath: d:\PROJECTS\React\medical-prescriptions-ui\medical-prescriptions-ui\src\App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Navbar from './components/patients/Navbar';
import Patients from './components/patients/Patients.jsx';
import Doctors from './components/patients/Doctors.jsx';
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
          <Route path="/doctors" element={<Doctors />} />
        </Routes>
    </Router>
  );
}

export default App;