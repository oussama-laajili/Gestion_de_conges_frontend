// import React, { useState } from 'react';
// import { Carousel } from 'react-responsive-carousel';
// import 'react-responsive-carousel/lib/styles/carousel.min.css';
// import './AddUser.css';
// import Navbar from '../Navbaradmin/Navbar ';

// const AddUser = () => {
//   const [user, setUser] = useState({
//     fullName: '',
//     dob: '',
//     gender: '',
//     idNumber: '',
//     phone: '',
//     email: '',
//     address: '',
//     street: '',
//     city: '',
//     zipCode: '',
//     state: '',
//     country: '',
//   });
//   const [carouselIndex, setCarouselIndex] = useState(0);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUser({ ...user, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(user);
//     // Assuming you want to advance to the next carousel page on form submission
//     setCarouselIndex(carouselIndex + 1);
//   };

//   const handleReset = () => {
//     setUser({
//       fullName: '',
//       dob: '',
//       gender: '',
//       idNumber: '',
//       phone: '',
//       email: '',
//       address: '',
//       street: '',
//       city: '',
//       zipCode: '',
//       state: '',
//       country: '',
//     });
//   };

//   return (
//     <div>
//       <Navbar />
//       <div className='adduser'>
//         <h1 className='dashboard-title'>Create profile</h1>
        
//         <Carousel selectedItem={carouselIndex} onChange={setCarouselIndex} showThumbs={false} showStatus={false} swipeable={false}>
//           <div className="create-profile-container">
//             <h1 className='dashboard-title'>Profile detail</h1>
//             <form onSubmit={handleSubmit}>
//               <div className="employment-type">
//                 <label>
//                   <input type="radio" name="employmentType" value="Full-time" /> Full-time
//                 </label>
//                 <label>
//                   <input type="radio" name="employmentType" value="Part-time" /> Part-time
//                 </label>
//                 <label>
//                   <input type="radio" name="employmentType" value="Internship" /> Internship
//                 </label>
//               </div>
//               <div className="form-group">
//                 <input
//                   type="text"
//                   name="fullName"
//                   placeholder="Full name"
//                   value={user.fullName}
//                   onChange={handleChange}
//                 />
//                 <input
//                   type="date"
//                   name="dob"
//                   placeholder="DOB"
//                   value={user.dob}
//                   onChange={handleChange}
//                 />
//                 <div className="gender">
//                   <label>
//                     <input
//                       type="radio"
//                       name="gender"
//                       value="Male"
//                       checked={user.gender === 'Male'}
//                       onChange={handleChange}
//                     />{' '}
//                     Male
//                   </label>
//                   <label>
//                     <input
//                       type="radio"
//                       name="gender"
//                       value="Female"
//                       checked={user.gender === 'Female'}
//                       onChange={handleChange}
//                     />{' '}
//                     Female
//                   </label>
//                 </div>
//                 <input
//                   type="text"
//                   name="idNumber"
//                   placeholder="ID number"
//                   value={user.idNumber}
//                   onChange={handleChange}
//                 />
//                 <input
//                   type="text"
//                   name="phone"
//                   placeholder="Phone"
//                   value={user.phone}
//                   onChange={handleChange}
//                 />
//                 <input
//                   type="email"
//                   name="email"
//                   placeholder="Email"
//                   value={user.email}
//                   onChange={handleChange}
//                 />
//                 <input
//                   type="text"
//                   name="address"
//                   placeholder="Address"
//                   value={user.address}
//                   onChange={handleChange}
//                 />
//                 <input
//                   type="text"
//                   name="street"
//                   placeholder="Street"
//                   value={user.street}
//                   onChange={handleChange}
//                 />
//                 <input
//                   type="text"
//                   name="city"
//                   placeholder="City"
//                   value={user.city}
//                   onChange={handleChange}
//                 />
//                 <input
//                   type="text"
//                   name="zipCode"
//                   placeholder="Zip / Postal Code"
//                   value={user.zipCode}
//                   onChange={handleChange}
//                 />
//                 <input
//                   type="text"
//                   name="state"
//                   placeholder="State / Province"
//                   value={user.state}
//                   onChange={handleChange}
//                 />
//                 <input
//                   type="text"
//                   name="country"
//                   placeholder="Country / Region"
//                   value={user.country}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div className="file-upload">
//                 <div className="upload-avatar">+ Avatar</div>
//                 <div className="upload-id">+ ID image</div>
//               </div>
//               <div className="form-actions">
//                 <button type="button" className="restart-btn" onClick={handleReset}>Reset</button>
//                 <button type="submit" className="continue-btn">Continue</button>
//               </div>
//             </form>
//           </div>
          
//           {/* Placeholder for the second and third forms */}
//           <div className="create-profile-container">
//             <h1 className='dashboard-title'>Education detail</h1>
//             <form onSubmit={handleSubmit}>
//               <div className="form-group">
//                 <input
//                   type="text"
//                   name="fullName"
//                   placeholder="Full name"
//                   value={user.fullName}
//                   onChange={handleChange}
//                 />
//                 <input
//                   type="date"
//                   name="dob"
//                   placeholder="DOB"
//                   value={user.dob}
//                   onChange={handleChange}
//                 />
//                 <input
//                   type="email"
//                   name="email"
//                   placeholder="Email"
//                   value={user.email}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div className="file-upload">
//                 <div className="upload-avatar">+ Avatar</div>
//                 <div className="upload-id">+ ID image</div>
//               </div>
//               <h1 className='dashboard-title'>Job detail</h1>
//               <div className="form-group">
//                 <input
//                   type="text"
//                   name="jobTitle"
//                   placeholder="Job title"
//                   value={user.jobTitle}
//                   onChange={handleChange}
//                 />
//                 <input
//                   type="text"
//                   name="department"
//                   placeholder="Department"
//                   value={user.department}
//                   onChange={handleChange}
//                 />
//                 <input
//                   type="text"
//                   name="manager"
//                   placeholder="Manager"
//                   value={user.manager}
//                   onChange={handleChange}
//                 />
//                 <input
//                   type="date"
//                   name="startDate"
//                   placeholder="Start date"
//                   value={user.startDate}
//                   onChange={handleChange}
//                 />
//                 <input
//                   type="date"
//                   name="startDate"
//                   placeholder="Start date"
//                   value={user.startDate}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div className="form-actions">
//                 <button type="button" className="restart-btn" onClick={() => setCarouselIndex(0)}>Return</button>
//                 <button type="submit" className="continue-btn" onClick={(e) => e.preventDefault()}>Add</button>
//               </div>
//             </form> 
//           </div>
//         </Carousel>
//       </div>
//     </div>
//   );
// };

// export default AddUser;


import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './AddUser.css';
import axios from 'axios';
import Copyright from '../copyright/Copyright';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faIdCard } from '@fortawesome/free-solid-svg-icons';


const AddUser = ({ isCollapsed, isDarkMode, setNotificationCount, setNotifications }) => {
  const [userr, setUserr] = useState({ linemanager: '' });
  const [teamLeaders, setTeamLeaders] = useState([]);
  useEffect(() => {
    const fetchTeamLeaders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/users/team-leaders');
        setTeamLeaders(response.data);
      } catch (error) {
        console.error('Error fetching team leaders:', error);
      }
    };

    fetchTeamLeaders();
  }, []);

  const handleChanges = (event) => {
    const { name, value } = event.target;
    setUserr((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const [user, setUser] = useState({
    fullname: '',
    dob: '',
    gender: '',
    cin: '',
    phone: '',
    email: '',
    adresse: '',
    street: '',
    state: '',
    city: '',
    postalcode: '',
    country: '',
    typeofdegree: '',
    speciality: '',
    dateofdegree: '',
    jobtitle: '',
    departement: '',
    linemanager: '',
    startdate: '',
    enddate: '',
    avatar: '',
    status: '',
    id2: '',
    degree: ''
  });

  const [avatar, setAvatar] = useState(null);
  const [idImage, setIdImage] = useState(null);
  const [degreeFile, setDegreeFile] = useState(null);
  const [carouselIndex, setCarouselIndex] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === 'avatar') {
      setAvatar(files[0]);
    } else if (name === 'id2') {
      setIdImage(files[0]);
    } else if (name === 'degree') {
      setDegreeFile(files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = ['fullname', 'dob', 'gender', 'cin', 'phone', 'email', 'adresse', 'street', 'state', 'city', 'postalcode', 'country', 'typeofdegree', 'speciality', 'dateofdegree', 'jobtitle', 'departement', 'linemanager', 'startdate', 'enddate', 'status'];
    const incompleteFields = requiredFields.filter(field => !user[field]);

    if (incompleteFields.length > 0) {
      alert('Fill all the fields');
      return;
    }

    const formData = new FormData();
    Object.keys(user).forEach(key => {
      formData.append(key, user[key]);
    });
    if (avatar) formData.append('avatar', avatar);
    if (idImage) formData.append('id2', idImage);
    if (degreeFile) formData.append('degree', degreeFile);

    try {
      const response = await fetch('http://localhost:5000/users', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log('User added successfully:', data);
        setCarouselIndex(carouselIndex + 1);
        alert('User added successfully. Check your email for the password.');
        // Create an Employee instance
        const employeeResponse = await fetch('http://localhost:5000/employees', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: user.email,
            congemaladierestant: 0,
            congeannuelrestant: 0,
            congepersonellerestant: 0,
            congehistorique: [],
          }),
        });

        if (employeeResponse.ok) {
          console.log('Employee created successfully');
        } else {
          console.error('Failed to create employee:', employeeResponse.statusText);
        }
        // Create a new notification
        const notificationResponse = await fetch('http://localhost:5000/notifications', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: user.email,
            title: 'adding a new user',
          }),
        });

        if (notificationResponse.ok) {
          console.log('Notification created successfully');
          setNotificationCount(prevCount => prevCount + 1);
          setNotifications(prevNotifications => [...prevNotifications, `New user ${user.fullname} added`]);
        } else {
          console.error('Failed to create notification:', notificationResponse.statusText);
        }
      } else if (response.status === 409) {
        alert('User already exists');
      } else {
        console.error('Failed to add user:', response.statusText);
        alert('Error in back server');
      }
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const handleReset = () => {
    setUser({
      fullname: '',
      dob: '',
      gender: '',
      cin: '',
      phone: '',
      email: '',
      adresse: '',
      street: '',
      state: '',
      city: '',
      postalcode: '',
      country: '',
      typeofdegree: '',
      speciality: '',
      dateofdegree: '',
      jobtitle: '',
      departement: '',
      linemanager: '',
      startdate: '',
      enddate: '',
      avatar: '',
      status: '',
      id2: '',
      degree: ''
    });
    setAvatar(null);
    setIdImage(null);
    setDegreeFile(null);
  };

  const handleContinue = (e) => {
    e.preventDefault();
    setCarouselIndex(carouselIndex + 1);
  };

  const handleReturn = (e) => {
    e.preventDefault();
    setCarouselIndex(carouselIndex - 1);
  };

  return (
    <div className={`adduser ${isCollapsed ? 'collapsed' : ''}${isDarkMode ? 'dark-mode' : ''} `}>
    <h1 className='title'>Create profile</h1>
        
        <Carousel selectedItem={carouselIndex} onChange={setCarouselIndex} showThumbs={false} showStatus={false} swipeable={false}>
          <div className={`create-profile-container ${isDarkMode ? 'dark-mode' : ''}`}>
            <h1 className={`dashboard-title ${isDarkMode ? 'dark-mode' : ''}`}>Profile detail</h1>
            <form onSubmit={handleContinue}>
              <div className={`form-group ${isDarkMode ? 'dark-mode' : ''}`}>
                <div className='st'>
                <input
                  type="text"
                  name="fullname"
                  placeholder="Full name"
                  value={user.fullname}
                  onChange={handleChange}
                />
                <input
                  type="date"
                  name="dob"
                  placeholder="DOB"
                  value={user.dob}
                  onChange={handleChange}
                />
                </div>
                <div className='st'>
                <div className={`gender ${isDarkMode ? 'dark-mode' : ''}`}>
                  <label className={`male ${isDarkMode ? 'dark-mode' : ''}`}>
                  Male
                    <input
                      type="radio"
                      name="gender"
                      value="Male"
                      checked={user.gender === 'Male'}
                      onChange={handleChange}
                    />{' '}
                    
                  </label>
                  <label className={`male ${isDarkMode ? 'dark-mode' : ''}`}>
                  Female 
                    <input
                      type="radio"
                      name="gender"
                      value="Female"
                      checked={user.gender === 'Female'}
                      onChange={handleChange}
                    />{' '}
                    
                  </label>
                </div>
                <input
                  type="text"
                  name="cin"
                  placeholder="ID number"
                  value={user.cin}
                  onChange={handleChange}
                />
                </div>
                <div className='st'>
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone"
                  value={user.phone}
                  onChange={handleChange}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={user.email}
                  onChange={handleChange}
                />
                </div>
                <div className='st'>
                <input
                  type="text"
                  name="adresse"
                  placeholder="Address"
                  value={user.adresse}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="street"
                  placeholder="Street"
                  value={user.street}
                  onChange={handleChange}
                />
                </div>
                <div className='st'>
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={user.city}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="postalcode"
                  placeholder="Zip / Postal Code"
                  value={user.postalcode}
                  onChange={handleChange}
                />
                </div>
                <div className='st'>
                <input
                  type="text"
                  name="state"
                  placeholder="State / Province"
                  value={user.state}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="country"
                  placeholder="Country / Region"
                  value={user.country}
                  onChange={handleChange}
                />
                </div>
              </div>
              <div className="file-upload">
                <label className="upload-avatar" style={{ cursor: 'pointer' }}>
                  <FontAwesomeIcon icon={faUser} size="2x" />
                  <input
                    type="file"
                    name="avatar"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                  />
                </label>
                <label className="upload-id" style={{ cursor: 'pointer' }}>
                  <FontAwesomeIcon icon={faIdCard} size="2x" />
                  <input
                    type="file"
                    name="id2"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                  />
                </label>
              </div>
              <div className="form-actions">
                <button type="button" className={`restart-btn ${isDarkMode ? 'dark-mode' : ''}`} onClick={handleReset}>Reset</button>
                <button type="submit" className={`continue-btn ${isDarkMode ? 'dark-mode' : ''}`}>Continue</button>
              </div>
            </form>
          </div>
          
          <div className={`create-profile-container ${isDarkMode ? 'dark-mode' : ''}`}>
            <h1 className={`dashboard-title ${isDarkMode ? 'dark-mode' : ''}`}>Education detail</h1>
            <form onSubmit={handleContinue}>
              <div  className={`form-group ${isDarkMode ? 'dark-mode' : ''}`}>
              <select
                name="typeofdegree"
                value={user.typeofdegree}
                onChange={handleChange}
              >
                <option value="">Select Type of Degree</option>
                <option value="Licence Degree">Licence Degree</option>
                <option value="Engineering Degree">Engineering Degree</option>
                <option value="Master Degree">Master Degree</option>
              </select>

                <input
                  type="text"
                  name="speciality"
                  placeholder="Speciality"
                  value={user.speciality}
                  onChange={handleChange}
                />
                <input
                  type="date"
                  name="dateofdegree"
                  placeholder="Date of Degree"
                  value={user.dateofdegree}
                  onChange={handleChange}
                />
              </div>
             
              <div className="form-actions">
                <button type="button" className={`continue-btn ${isDarkMode ? 'dark-mode' : ''}`} onClick={handleReturn}>Return</button>
                <button type="submit" className={`continue-btn ${isDarkMode ? 'dark-mode' : ''}`}>Continue</button>
              </div>
            </form>
          </div>

          <div className={`create-profile-container ${isDarkMode ? 'dark-mode' : ''}`}>
            <h1 className={`dashboard-title ${isDarkMode ? 'dark-mode' : ''}`}>Job detail</h1>
            <form onSubmit={handleSubmit}>
              <div  className={`form-group ${isDarkMode ? 'dark-mode' : ''}`}>
              <select
                name="jobtitle"
                value={user.jobtitle}
                onChange={handleChange}
              >
                <option value="">Select Job Title</option>
                <option value="Team Leader">Team Leader</option>
                <option value="RH">RH</option>
                <option value="Normal Employee">Normal Employee</option>
              </select>

                <select
                    name="departement"
                    value={user.departement}
                    onChange={handleChange}
                  >
                    <option value="">Select Department</option>
                    <option value="Marketing">Marketing</option>
                    <option value="IT">IT</option>
                    <option value="Sales">Sales</option>
                    <option value="Data Science">Data Science</option>
                  </select>
                  <select
                    name="linemanager"
                    value={userr.linemanager}
                    onChange={handleChange}
                  >
                    <option value="" disabled>Select Team Leader</option>
                    {teamLeaders.map((leader) => (
                      <option key={leader.id} value={leader.id}>
                        {leader.email}
                      </option>
                    ))}
                  </select>
                <input
                  type="date"
                  name="startdate"
                  placeholder="Start Date"
                  value={user.startdate}
                  onChange={handleChange}
                />
                <input
                  type="date"
                  name="enddate"
                  placeholder="End Date"
                  value={user.enddate}
                  onChange={handleChange}
                />
                <select
                  name="status"
                  value={user.status}
                  onChange={handleChange}
                >
                  <option value="">Select Status</option>
                  <option value="Permanent">Permanent</option>
                  <option value="Contract">Contract</option>
                  <option value="Freelance">Freelance</option>
                  <option value="Intern">Intern</option>
                </select>

              </div>
              <div className="form-actions">
                <button type="button" className={`continue-btn ${isDarkMode ? 'dark-mode' : ''}`} onClick={handleReturn}>Return</button>
                <button type="submit" className={`continue-btn ${isDarkMode ? 'dark-mode' : ''}`}>Submit</button>
              </div>
            </form>
          </div>
        </Carousel>
        <br></br>
        <Copyright></Copyright>

      </div>

  );
};

export default AddUser;
