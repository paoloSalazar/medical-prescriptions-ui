import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Navbar() {
    const { t, i18n } = useTranslation();
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div className="container-fluid"> {/* Use container-fluid for full width */}
          <Link className="navbar-brand" to="/">Medical Prescriptions</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/">{t('Home')}</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/patients">{t('Patients')}</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/doctors">{t('Doctors')}</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/medicationTypes">{t('Medication Types')}</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/medications">{t('Medications')}</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/appointments">{t('Appointments')}</Link>
              </li>
              {/* Add more navigation items as needed */}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
  

export default Navbar;