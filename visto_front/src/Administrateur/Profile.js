import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faBriefcase, faBuilding, faEdit } from '@fortawesome/free-solid-svg-icons';
import './Profile.css';
import Copyright from '../copyright/Copyright';

const Profile = ({ profileData, setViewProfileEmail, isCollapsed, isDarkMode }) => {
  const navigate = useNavigate();

  // State variables for editing mode and edited profile data
  const [editMode, setEditMode] = useState(false);
  const [editedProfile, setEditedProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Initialize editedProfile with profileData on component mount
    setEditedProfile(profileData);
  }, [profileData]);

  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile({
      ...editedProfile,
      [name]: value
    });
  };

  // Function to submit edited profile data
  const handleSubmit = async () => {
    try {
      await axios.put(`http://localhost:5000/users/${editedProfile.email}`, editedProfile);
      setViewProfileEmail(null); // Reset viewProfileEmail to exit profile view
      // Handle any additional logic after successful update
    } catch (err) {
      setError(err);
    }
  };

  // Function to cancel editing and revert changes
  const cancelEdit = () => {
    setEditedProfile(profileData); // Reset editedProfile to current profileData
    setEditMode(false); // Exit edit mode
  };

  if (!profileData) {
    return <div>No profile data available</div>;
  }

  const profile = editMode ? editedProfile : profileData;

  return (
    <div className={`profile-container ${isCollapsed ? 'collapsed' : ''} ${isDarkMode ? 'dark-mode' : ''}`}>
      <div className={`profile-header ${isCollapsed ? 'collapsed' : ''} ${isDarkMode ? 'dark-mode' : ''}`} >
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
              </div>
            </div>
          </div>
          <div className="section-title-line"></div>

          <div className="profile-subsection">
            <div className="subtitle">
              <h4 className={`pppp ${isCollapsed ? 'collapsed' : ''} ${isDarkMode ? 'dark-mode' : ''}`}>Work Information</h4>
            </div>
            <div className="info-grid">
              <div className="info-left">
                <p className={`pppp ${isCollapsed ? 'collapsed' : ''} ${isDarkMode ? 'dark-mode' : ''}`}><strong>Title:</strong>
                  {editMode ? (
                    <input
                      type="text"
                      name="jobtitle"
                      placeholder={profile.jobtitle}
                      value={editedProfile.jobtitle}
                      onChange={handleInputChange}
                      className="edit-input"
                    />
                  ) : (
                    profile.jobtitle
                  )}
                </p>
                <p className={`pppp ${isCollapsed ? 'collapsed' : ''} ${isDarkMode ? 'dark-mode' : ''}`}><strong>Department:</strong>
                  {editMode ? (
                    <input
                      type="text"
                      name="departement"
                      placeholder={profile.departement}
                      value={editedProfile.departement}
                      onChange={handleInputChange}
                      className="edit-input"
                    />
                  ) : (
                    profile.departement
                  )}
                </p>
                <p className={`pppp ${isCollapsed ? 'collapsed' : ''} ${isDarkMode ? 'dark-mode' : ''}`}><strong>Start Date:</strong>
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
              </div>
              <div className="info-right">
                <p className={`pppp ${isCollapsed ? 'collapsed' : ''} ${isDarkMode ? 'dark-mode' : ''}`}><strong>Contract End Date:</strong>
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
                <p className={`pppp ${isCollapsed ? 'collapsed' : ''} ${isDarkMode ? 'dark-mode' : ''}`}><strong>Line Manager:</strong>
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
              </div>
            </div>
          </div>

          <div className="section-title-line"></div>

          <div className="profile-subsection">
            <div className="subtitle">
              <h4 className={`pppp ${isCollapsed ? 'collapsed' : ''} ${isDarkMode ? 'dark-mode' : ''}`}>Education Information</h4>
            </div>
            <div className="info-grid">
              <div className="info-left">
                <p className={`pppp ${isCollapsed ? 'collapsed' : ''} ${isDarkMode ? 'dark-mode' : ''}`}><strong>Type of Degree:</strong>
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
              </div>
              <div className="info-right">
                <p className={`pppp ${isCollapsed ? 'collapsed' : ''} ${isDarkMode ? 'dark-mode' : ''}`}><strong>Date of Degree:</strong>
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
            </div>
          </div>

          {editMode && (
            <div className="edit-buttons">
              <button onClick={handleSubmit} className="save-button">Save</button>
              <button onClick={cancelEdit} className="cancel-button">Cancel</button>
            </div>
          )}
        </div>
      </div>
      <Copyright isDarkMode={isDarkMode} />
    </div>
  );
};

export default Profile;

















                
