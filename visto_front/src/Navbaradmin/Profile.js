import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faBriefcase, faBuilding, faEdit } from '@fortawesome/free-solid-svg-icons';
import './Profile.css';
import Copyright from '../copyright/Copyright';

const Profile = ({isCollapsed, isDarkMode }) => {
    const { email } = useParams();
    const [profile, setProfile] = useState({});
    const [editMode, setEditMode] = useState(false);
    const [editedProfile, setEditedProfile] = useState({});
  
    useEffect(() => {
      const fetchProfile = async () => {
        if (email) {
          try {
            const response = await axios.get(`http://localhost:5000/users/${email}`);
            setProfile(response.data);
          } catch (error) {
            console.error('Error fetching profile data:', error);
          }
        }
      };
      fetchProfile();
    }, [email]);
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setEditedProfile((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    };
  
    const handleSubmit = async () => {
      try {
        await axios.put(`http://localhost:5000/users/${email}`, editedProfile);
        setProfile(editedProfile);
        setEditMode(false);
      } catch (error) {
        console.error('Error updating profile data:', error);
      }
    };
  
    const cancelEdit = () => {
      setEditMode(false);
    };


  return (
    <div className={`profile-container ${isCollapsed ? 'collapsed' : ''} ${isDarkMode ? 'dark-mode' : ''}`}>
      <div className={`profile-header ${isCollapsed ? 'collapsed' : ''} ${isDarkMode ? 'dark-mode' : ''}`}>
        <img src={profile.avatar} alt="Profile" className="profile-pic" />
        <div className="profile-header-info">
          <div className="name-status">
            <h1>{profile.fullname}</h1>
            <span className="status">{profile.status}</span>
          </div>
          <div className="title">
            <FontAwesomeIcon icon={faBriefcase} className="profile-icon" />
            <span>{profile.jobtitle}</span>
            <span className="department-dot">•</span>
            <FontAwesomeIcon icon={faBuilding} className="profile-icon" />
            <span className="department"> {profile.departement}</span>
          </div>
        </div>
      </div>

      <div className="profile-content">
        <div className={`profile-section ${isCollapsed ? 'collapsed' : ''} ${isDarkMode ? 'dark-mode' : ''}`}>
          <div className="section-header">
            <div className="subtitle">
              <FontAwesomeIcon icon={faInfoCircle} className="info-icon" />
              <h3 className={`pppp ${isCollapsed ? 'collapsed' : ''} ${isDarkMode ? 'dark-mode' : ''}`}>General information</h3>
              {!editMode && (
                <div className="edit-button" onClick={() => setEditMode(true)}>
                  <FontAwesomeIcon icon={faEdit} className="edit-icon" /> edit
                </div>
              )}
            </div>
          </div>
          <div className="section-title-line"></div>
          <div className="profile-subsection">
            <div className="subtitle">
              <h4 className={`pppp ${isCollapsed ? 'collapsed' : ''} ${isDarkMode ? 'dark-mode' : ''}`}>Personal information</h4>
            </div>
            <div className="info-grid">
              <div className="info-left">
                <p className={`pppp ${isCollapsed ? 'collapsed' : ''} ${isDarkMode ? 'dark-mode' : ''}`}><strong>Birthday:</strong>
                  {editMode ? (
                    <input
                      type="date"
                      name="dob"
                      value={editedProfile.dob}
                      onChange={handleInputChange}
                      className="edit-input"
                    />
                  ) : (
                    new Date(profile.dob).toLocaleDateString()
                  )}
                </p>
                <p className={`pppp ${isCollapsed ? 'collapsed' : ''} ${isDarkMode ? 'dark-mode' : ''}`}><strong>Gender:</strong>
                  {editMode ? (
                    <input
                      type="text"
                      name="gender"
                      placeholder={profile.gender}
                      value={editedProfile.gender}
                      onChange={handleInputChange}
                      className="edit-input"
                    />
                  ) : (
                    profile.gender
                  )}
                </p>
                <p className={`pppp ${isCollapsed ? 'collapsed' : ''} ${isDarkMode ? 'dark-mode' : ''}`}><strong>Nationality:</strong>
                  {editMode ? (
                    <input
                      type="text"
                      name="country"
                      placeholder={profile.country}
                      value={editedProfile.country}
                      onChange={handleInputChange}
                      className="edit-input"
                    />
                  ) : (
                    profile.country
                  )}
                </p>
              </div>
              <div className="info-right">
                <p className={`pppp ${isCollapsed ? 'collapsed' : ''} ${isDarkMode ? 'dark-mode' : ''}`}><strong>ID Number:</strong>
                  {editMode ? (
                    <input
                      type="text"
                      name="cin"
                      placeholder={profile.cin}
                      value={editedProfile.cin}
                      onChange={handleInputChange}
                      className="edit-input"
                    />
                  ) : (
                    profile.cin
                  )}
                </p>
                <p className={`pppp ${isCollapsed ? 'collapsed' : ''} ${isDarkMode ? 'dark-mode' : ''}`}><strong>Phone:</strong>
                  {editMode ? (
                    <input
                      type="text"
                      name="phone"
                      placeholder={profile.phone}
                      value={editedProfile.phone}
                      onChange={handleInputChange}
                      className="edit-input"
                    />
                  ) : (
                    profile.phone
                  )}
                </p>
                <p className={`pppp ${isCollapsed ? 'collapsed' : ''} ${isDarkMode ? 'dark-mode' : ''}`}><strong>Email:</strong>
                  {editMode ? (
                    <input
                      type="email"
                      name="email"
                      placeholder={profile.email}
                      value={editedProfile.email}
                      onChange={handleInputChange}
                      className="edit-input"
                    />
                  ) : (
                    profile.email
                  )}
                </p>
              </div>
            </div>
          </div>
          <div className="section-title-line"></div>

          <div className="profile-subsection">
            <div className="subtitle">
              <h4 className={`pppp ${isCollapsed ? 'collapsed' : ''} ${isDarkMode ? 'dark-mode' : ''}`}>Address Information</h4>
            </div>
            <div className="info-grid">
              <div className="info-left">
                <p className={`pppp ${isCollapsed ? 'collapsed' : ''} ${isDarkMode ? 'dark-mode' : ''}`}><strong>Address:</strong>
                  {editMode ? (
                    <input
                      type="text"
                      name="adresse"
                      placeholder={profile.adresse}
                      value={editedProfile.adresse}
                      onChange={handleInputChange}
                      className="edit-input"
                    />
                  ) : (
                    profile.adresse
                  )}
                </p>
                <p className={`pppp ${isCollapsed ? 'collapsed' : ''} ${isDarkMode ? 'dark-mode' : ''}`}><strong>City:</strong>
                  {editMode ? (
                    <input
                      type="text"
                      name="city"
                      placeholder={profile.city}
                      value={editedProfile.city}
                      onChange={handleInputChange}
                      className="edit-input"
                    />
                  ) : (
                    profile.city
                  )}
                </p>
              </div>
              <div className="info-right">
                <p className={`pppp ${isCollapsed ? 'collapsed' : ''} ${isDarkMode ? 'dark-mode' : ''}`}><strong>Country:</strong>
                  {editMode ? (
                    <input
                      type="text"
                      name="country"
                      placeholder={profile.country}
                      value={editedProfile.country}
                      onChange={handleInputChange}
                      className="edit-input"
                    />
                  ) : (
                    profile.country
                  )}
                </p>
                <p className={`pppp ${isCollapsed ? 'collapsed' : ''} ${isDarkMode ? 'dark-mode' : ''}`}><strong>Postal code:</strong>
                  {editMode ? (
                    <input
                      type="text"
                      name="postalcode"
                      placeholder={profile.postalcode}
                      value={editedProfile.postalcode}
                      onChange={handleInputChange}
                      className="edit-input"
                    />
                  ) : (
                    profile.postalcode
                  )}
                </p>
              </div>
            </div>
          </div>
          <div className="section-title-line"></div>

          <div className="profile-subsection">
            <div className="subtitle">
              <h4 className={`pppp ${isCollapsed ? 'collapsed' : ''} ${isDarkMode ? 'dark-mode' : ''}`}>Other Information</h4>
            </div>
            <div className="info-grid">
              <div className="info-left">
                <p className={`pppp ${isCollapsed ? 'collapsed' : ''} ${isDarkMode ? 'dark-mode' : ''}`}><strong>Degree:</strong>
                  {editMode ? (
                    <input
                      type="text"
                      name="typeofdegree"
                      placeholder={profile.typeofdegree}
                      value={editedProfile.typeofdegree}
                      onChange={handleInputChange}
                      className="edit-input"
                    />
                  ) : (
                    profile.typeofdegree
                  )}
                </p>
                <p className={`pppp ${isCollapsed ? 'collapsed' : ''} ${isDarkMode ? 'dark-mode' : ''}`}><strong>Speciality:</strong>
                  {editMode ? (
                    <input
                      type="text"
                      name="speciality"
                      placeholder={profile.speciality}
                      value={editedProfile.speciality}
                      onChange={handleInputChange}
                      className="edit-input"
                    />
                  ) : (
                    profile.speciality
                  )}
                </p>
                <p className={`pppp ${isCollapsed ? 'collapsed' : ''} ${isDarkMode ? 'dark-mode' : ''}`}><strong>Date of degree:</strong>
                  {editMode ? (
                    <input
                      type="date"
                      name="dateofdegree"
                      value={editedProfile.dateofdegree}
                      onChange={handleInputChange}
                      className="edit-input"
                    />
                  ) : (
                    new Date(profile.dateofdegree).toLocaleDateString()
                  )}
                </p>
              </div>
              <div className="info-right">
                <p className={`pppp ${isCollapsed ? 'collapsed' : ''} ${isDarkMode ? 'dark-mode' : ''}`}><strong>Line manager:</strong>
                  {editMode ? (
                    <input
                      type="text"
                      name="linemanager"
                      placeholder={profile.linemanager}
                      value={editedProfile.linemanager}
                      onChange={handleInputChange}
                      className="edit-input"
                    />
                  ) : (
                    profile.linemanager
                  )}
                </p>
                <p className={`pppp ${isCollapsed ? 'collapsed' : ''} ${isDarkMode ? 'dark-mode' : ''}`}><strong>Start date:</strong>
                  {editMode ? (
                    <input
                      type="date"
                      name="startdate"
                      value={editedProfile.startdate}
                      onChange={handleInputChange}
                      className="edit-input"
                    />
                  ) : (
                    new Date(profile.startdate).toLocaleDateString()
                  )}
                </p>
                <p className={`pppp ${isCollapsed ? 'collapsed' : ''} ${isDarkMode ? 'dark-mode' : ''}`}><strong>Contract end date:</strong>
                  {editMode ? (
                    <input
                      type="date"
                      name="enddate"
                      value={editedProfile.enddate}
                      onChange={handleInputChange}
                      className="edit-input"
                    />
                  ) : (
                    new Date(profile.enddate).toLocaleDateString()
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>

        {editMode && (
          <div className="edit-buttons">
            <button className="save-button" onClick={handleSubmit}>Save</button>
            <button className="cancel-button" onClick={cancelEdit}>Cancel</button>
          </div>
        )}
      </div>
      <Copyright />
    </div>
  );
};

export default Profile;
