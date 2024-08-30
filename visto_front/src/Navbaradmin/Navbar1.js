
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Navbar.css';
import Logo from './logo.png';
import darkcollapsedlogo from './output-onlinepngtools (2).png';
import CollapsedLogo from './collapsed-logo.png';
import darklogo from './output-onlinepngtools (1).png';
import { UserContext } from './UserProvider ';
import {
  FaBars, FaUserAlt, FaMoon, FaClipboardList , FaSun, FaBell, FaCalendarCheck, FaTachometerAlt , FaArrowRight, FaUser, FaSignOutAlt, FaChartBar, FaUsers, FaUserPlus, FaCalendarAlt, FaPlane, FaTrash
} from 'react-icons/fa';
import Select from 'react-select';
import Flag from 'react-world-flags';
import Dashboard from '../Administrateur/Dashboard';
import Team from '../Administrateur/Team';
import AddUser from '../Administrateur/AddUser';
import Calendaar from '../calender/Calendaar';
import DashboardVac from '../Administrateur/DashboardVac';
import Calendar from '../calender/Calendar';
import LeaveRequestForm from '../Administrateur/LeaveRequestForm';
import AllLeave from '../Administrateur/AllLeave';
import CalendarExample from '../Administrateur/schdule';
import Historie from '../Administrateur/Historie';
import TeamLeader from '../Administrateur/TeamTeamLeader';

const Navbar1 = () => {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState('Dashboard');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const { user } = useContext(UserContext);
  const [notificationCount, setNotificationCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [avatar, setAvatar] = useState('');
  const [email, setEmail] = useState('');
  const [fullname, setFullname] = useState('');
  useEffect(() => {
    // Retrieve the fullname from local storage
    const storedFullname = localStorage.getItem('fullname');
    if (storedFullname) {
      setFullname(storedFullname);
    }
  }, []);
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    if (storedEmail) {
      setEmail(storedEmail);
    } else if (user && user.email) {
      setEmail(user.email);
      localStorage.setItem('email', user.email);
    }
  
    if (storedEmail) {
      fetchUserDetails(storedEmail);
    }
  }, [user]);

  const fetchUserDetails = async (email) => {
    try {
      const response = await axios.get(`http://localhost:5000/users/${email}`);
      setAvatar(response.data.avatar || 'path/to/default-profile-picture.jpg');
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const fetchNotifications = async () => {
    try {
      const response = await axios.get('http://localhost:5000/notifications');
      const email = localStorage.getItem('email'); // Retrieve the email from local storage
      const filteredNotifications = response.data.filter(notification => 
        notification.email === email && 
        (notification.title === 'Congé refusé' || notification.title === 'Congé accepté')
      );
      setNotifications(filteredNotifications);
      setNotificationCount(filteredNotifications.length);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };
  

  const deleteNotification = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/notifications/${id}`);
      setNotifications(notifications.filter(notification => notification._id !== id));
      setNotificationCount(notificationCount - 1);
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    navigate('/');
  };

  const handleItemClick = (itemName) => {
    setActiveItem(itemName);
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    if (!showNotifications) {
      setNotificationCount(0);
      fetchNotifications();
    }
  };

  const flagOptions = [
    { value: 'uk', label: <Flag code="GB" height="20" />, country: 'UK' },
    { value: 'saudi-arabia', label: <Flag code="SA" height="20" />, country: 'Saudi Arabia' },
    { value: 'france', label: <Flag code="FR" height="20" />, country: 'France' },
    { value: 'spain', label: <Flag code="ES" height="20" />, country: 'Spain' }
  ];

  const customStyles = {
    control: (base) => ({
      ...base,
      width: '100px',
      minHeight: 'auto',
      height: 'auto'
    }),
    dropdownIndicator: (base) => ({
      ...base,
      padding: 0
    }),
    indicatorsContainer: (base) => ({
      ...base,
      padding: 0
    }),
    valueContainer: (base) => ({
      ...base,
      padding: '0 8px'
    }),
    singleValue: (base) => ({
      ...base,
      display: 'flex',
      alignItems: 'center'
    })
  };

  const handleProfileButtonClick = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const navigateToProfile = () => {
    navigate(`/profile/${email}`);
  };

  return (
    <div className={`navbar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="navbar1">
        <div className="nav-left">
          <button className="nav-button menu-button" onClick={toggleCollapse}>
            {isCollapsed ? <FaArrowRight /> : <FaBars />}
          </button>
        </div>
        <div className="nav-right">
          <Select options={flagOptions} defaultValue={flagOptions[0]} styles={customStyles} />
          <button className="nav-button" onClick={toggleDarkMode}>
            {isDarkMode ? <FaSun /> : <FaMoon />}
          </button>
          <div className="notification-container">
            <button className="nav-button notification-button" onClick={toggleNotifications}>
              <FaBell />
              {notificationCount > 0 && <span className="notification-badge">{notificationCount}</span>}
            </button>
            {showNotifications && (
              <div className={`notifications-box ${isCollapsed ? 'collapsed' : ''} ${isDarkMode ? 'dark-mode' : ''}`}>
                <h4>Notifications</h4>
                <ul>
                  {notifications.map((notification) => (
                    <li key={notification._id}>
                      <p><strong>{notification.title}</strong> - {notification.email} ({notification.createdAt})</p>
                      <button className={`delete-button ${isDarkMode ? 'dark-mode' : ''}`} onClick={() => deleteNotification(notification._id)}>
                        <FaTrash style={{color:'red'}}/>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="dropdown-container">
            <button className="nav-button profile-button" onClick={handleProfileButtonClick}>
              <img src={avatar || 'path/to/default-profile-picture.jpg'} alt="Profile" className="profile-picture" />
              <span className="profile-label">{fullname}</span>
              <span className="dropdown-icon">&#9662;</span>
            </button>
            {dropdownVisible && (
              <div className={`dropdown-menu ${isDarkMode ? 'dark-mode' : ''}`}>
                <button className={`dropdown-item ${isCollapsed ? 'collapsed' : ''} ${isDarkMode ? 'dark-mode' : ''}`} onClick={navigateToProfile}>
                  <FaUser /> Profile
                </button>
                <button className={`dropdown-item ${isCollapsed ? 'collapsed' : ''} ${isDarkMode ? 'dark-mode' : ''}`} onClick={handleLogout}>
                  <FaSignOutAlt /> Log Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="logo-container">
        <img 
          src={isDarkMode ? (isCollapsed ? darkcollapsedlogo : darklogo) : (isCollapsed ? CollapsedLogo : Logo)} 
          alt="Logo" 
          className="logo" 
        />
      </div>
      <div className={`nav-item ${activeItem === 'Dashboard' ? 'active' : ''}`} onClick={() => handleItemClick('Dashboard')}>
        <FaTachometerAlt className="icon" />
        {!isCollapsed && 'Dashboard team'}
      </div>
      <div className={`nav-item ${activeItem === 'DashboardVac' ? 'active' : ''}`} onClick={() => handleItemClick('DashboardVac')}>
        <FaChartBar className="icon" />
        {!isCollapsed && 'Dashboard Vacation'}
      </div>
      <div className={`nav-item ${activeItem === 'Team' ? 'active' : ''}`} onClick={() => handleItemClick('Team')}>
        <FaUsers className="icon" />
        {!isCollapsed && 'Team'}
      </div>
     
     
      <div className={`nav-item ${activeItem === 'Calendar' ? 'active' : ''}`} onClick={() => handleItemClick('Calendar')}>
        <FaCalendarAlt className="icon" />
        {!isCollapsed && 'Year calendar'}
      </div>
      <div className={`nav-item ${activeItem === 'LeaveRequest' ? 'active' : ''}`} onClick={() => handleItemClick('LeaveRequest')}>
        <FaPlane className="icon" />
        {!isCollapsed && 'Leave request form'}
      </div>
      <div className={`nav-item ${activeItem === 'AllLeaveRequest' ? 'active' : ''}`} onClick={() => handleItemClick('AllLeaveRequest')}>
        <FaClipboardList  className="icon" />
        {!isCollapsed && 'All leave requests'}
      </div>
      <div className={`nav-item ${activeItem === 'Historie' ? 'active' : ''}`} onClick={() => handleItemClick('Historie')}>
        <FaUserAlt  className="icon" />
        {!isCollapsed && 'Historie'}
      </div>
      {activeItem === 'Dashboard' && <Dashboard isCollapsed={isCollapsed} isDarkMode={isDarkMode} />}
      {activeItem === 'Team' && <TeamLeader isCollapsed={isCollapsed} isDarkMode={isDarkMode} />}
      {activeItem === 'Add Employee' && <AddUser isCollapsed={isCollapsed} isDarkMode={isDarkMode} />}
      {activeItem === 'Calendaar' && <Calendaar isCollapsed={isCollapsed} isDarkMode={isDarkMode} />}
      {activeItem === 'DashboardVac' && <DashboardVac isCollapsed={isCollapsed} isDarkMode={isDarkMode} />}
      {activeItem === 'Calendar' && <CalendarExample isCollapsed={isCollapsed} isDarkMode={isDarkMode} />}
      {activeItem === 'LeaveRequest' && <LeaveRequestForm isCollapsed={isCollapsed} isDarkMode={isDarkMode} />}
      {activeItem === 'AllLeaveRequest' && <AllLeave isCollapsed={isCollapsed} isDarkMode={isDarkMode} />}
      {activeItem === 'Historie' && <Historie    isCollapsed={isCollapsed} isDarkMode={isDarkMode} />}

    </div>
  );
};

export default Navbar1;