import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './LanguageSwitcher.css'; // Import CSS file

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language); // Initialize with current language

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setSelectedLanguage(lng); // Update selected language state
  };

  return (
    <div className="language-switcher">
      <button
        onClick={() => changeLanguage('en')}
        className={`language-button ${selectedLanguage === 'en' ? 'selected' : ''}`}
      >
        English
      </button>
      <button
        onClick={() => changeLanguage('es')}
        className={`language-button ${selectedLanguage === 'es' ? 'selected' : ''}`}
      >
        Español
      </button>
    </div>
  );
};

export default LanguageSwitcher;