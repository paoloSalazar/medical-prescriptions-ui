import MedicationsDataServices from "../../data/MedicationsDataService";
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MedicationDetailModal from "./MedicationDetailModal";
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import 'moment/locale/es';

const Medications = () => {
    const { t, i18n } = useTranslation();
    const [medications, setMedications] = useState([]);
    const [selectedMedication, setSelectedMedication] = useState(null);
    
    const MAX_DESCRIPTION_LENGTH = 50; // Define the maximum length


    useEffect(() => {
        MedicationsDataServices.getAll()
          .then(response => {
            setMedications(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      }, []);

      const handleRowClick = (medication) => {
        setSelectedMedication(medication);
      };
    
      const handleCloseModal = () => {
        setSelectedMedication(null);
      };

    return (
      <>
        <div className="text-center my-4">
                <h2>{t('List', { entity: t('entities.medication') })}</h2>
            </div>
            <div className='col-md-12'>
                <table className="table table-hover">
                  <thead>
                    <tr>
                        <th>{t('Code')}</th>
                        <th>{t('Name')}</th>
                        <th>{t('Expiration Date')}</th>
                        <th>{t('Description')}</th>
                        <th>{t('Actions')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {medications.map((medication, index) => (
                        <tr key={index} >
                          <td>{medication.code}</td>
                          <td>{medication.name}</td>
                          <td>{moment(medication.expirationdate).locale(i18n.language).format('LL')}</td>
                          <td>
                            {medication.description
                                ? medication.description.length > MAX_DESCRIPTION_LENGTH
                                  ? medication.description.substring(0, MAX_DESCRIPTION_LENGTH) + "..."
                                  : medication.description
                                : t('No description available')}
                          </td>
                        <td>
                            <Link to={`/medications/updateMedication/${medication.id}`} className="btn btn-warning">
                              <i className="bi bi-pencil-square" title={t('Update', { entity: t('entities.medication') })}></i>
                            </Link>
                            <button className="btn btn-danger" onClick={() => handleDelete(medication.id)}>
                                <i className="bi bi-trash" title={t('Delete', { entity: t('entities.medication') })}></i>
                            </button>
                            <button className="btn btn-info" onClick={() => handleRowClick(medication)}>
                                <i className="bi bi-eye" title={t('View Details', { entity: t('entities.medication') })}></i>
                            </button>
                          </td>
                        </tr>
                    ))}
                  </tbody>
                </table>
            </div>
            <div className="mt-3 d-flex justify-content-center">
                <Link to="/medications/addMedication" title={t('Add Title', { entity: t('entities.medication') })} className="btn btn-primary">
                  {t('Add Title', { entity: t('entities.medication') })}
                </Link>
            </div>
            {selectedMedication && (
            <MedicationDetailModal
                medication={selectedMedication}
                onClose={handleCloseModal}
            />
        )}
      </>
    );
};

export default Medications;