// import React, { useState, useContext } from 'react';
// import './Navbar.css';
// import Logo from './logo.png';
// import ChartBarIcon from './une-analyse (1).png';
// import UsersIcon from './team-building.png';
// import UserPlusIcon from './ajouter-un-utilisateur.png';
// import LeftArrowIcon from './left-arrow.png';
// import LogOut from './se-deconnecter.png';
// import { useNavigate } from 'react-router-dom';
// import { UserContext } from './UserProvider ';

// const Navbar = () => {
//     const navigate = useNavigate();

   

    
//     const handleLogout = () => {
//         // Clear the token from local storage
//         localStorage.removeItem('token');
        
//         // Navigate to the root route
//         navigate('/');
//     };
//     const [activeItem, setActiveItem] = useState(null);
//     const { user } = useContext(UserContext);

//     const handleItemClick = (itemName) => {
//         setActiveItem(itemName);
//     };

//     return (
//         <div className="navbar">
//             <div className="logo-container">
//                 <img src={Logo} alt="Logo" className="logo" />
//                 <div className="title-container">
//                     <div className="title">Visto Consulting</div>
//                     <div className="subtitle">RH platform</div>
//                 </div>
//             </div>
//             <div className={`nav-item ${activeItem === 'Dashboard' ? 'active' : ''}`} onClick={() => handleItemClick('Dashboard')}>
//                 <img src={ChartBarIcon} alt="Dashboard Icon" className="icon" />
//                 Dashboard {activeItem === 'Dashboard' && <img src={LeftArrowIcon} alt="Left Arrow Icon" className="arrow-icon" />}
//             </div>
//             <div className={`nav-item ${activeItem === 'Team' ? 'active' : ''}`} onClick={() => handleItemClick('Team')}>
//                 <img src={UsersIcon} alt="Team Icon" className="icon" />
//                 Team {activeItem === 'Team' && <img src={LeftArrowIcon} alt="Left Arrow Icon" className="arrow-icon" />}
//             </div>
//             <div className={`nav-item ${activeItem === 'Add Employee' ? 'active' : ''}`} onClick={() => handleItemClick('Add Employee')}>
//                 <img src={UserPlusIcon} alt="Add Employee Icon" className="icon" />
//                 + Employee {activeItem === 'Add Employee' && <img src={LeftArrowIcon} alt="Left Arrow Icon" className="arrow-icon" />}
//             </div>
//             {user.isLoggedIn && (
//                 <div className="user-info">
//                     <p> {user.email}</p>
//                     <p> {user.fullname}</p>
//                 </div>
//             )}
//             <button className='logout' onClick={handleLogout}><img src={LogOut} /> </button>
//             <h2>Log Out</h2>
//         </div>
//     );
// };

// export default Navbar;



// import React, { useState, useContext, useEffect } from 'react';
// import './Navbar.css';
// import Logo from './logo.png';
// import ChartBarIcon from './une-analyse (1).png';
// import UsersIcon from './team-building.png';
// import UserPlusIcon from './ajouter-un-utilisateur.png';
// import LeftArrowIcon from './left-arrow.png';
// import LogOut from './se-deconnecter.png';
// import { useNavigate } from 'react-router-dom';
// import { UserContext } from './UserProvider ';
// import Dashboard from '../Administrateur/Dashboard';

// const Navbar = () => {
//     const navigate = useNavigate();
//     const [activeItem, setActiveItem] = useState('Dashboard'); // Initially set to 'Dashboard'
//     const { user } = useContext(UserContext);

//     useEffect(() => {
//         if (user.isLoggedIn) {
//             navigate('/administrateur/dashboard');
//         }
//     }, [user, navigate]);

//     const handleLogout = () => {
//         // Clear the token from local storage
//         localStorage.removeItem('token');
        
//         // Navigate to the root route
//         navigate('/');
//     };

//     const handleItemClick = (itemName, path) => {
//         setActiveItem(itemName);
//         navigate(path);
//     };

//     return (
//         <div className="navbar">
//             <div className="logo-container">
//                 <img src={Logo} alt="Logo" className="logo" />
//                 <div className="title-container">
//                     <div className="title">Visto Consulting</div>
//                     <div className="subtitle">RH platform</div>
//                 </div>
//             </div>
//             <div 
//                 className={`nav-item ${activeItem === 'Dashboard' ? 'active' : ''}`} 
//                 onClick={() => handleItemClick('Dashboard', '/administrateur/dashboard')}
//             >
//                 <img src={ChartBarIcon} alt="Dashboard Icon" className="icon" />
//                 Dashboard {activeItem === 'Dashboard' && <img src={LeftArrowIcon} alt="Left Arrow Icon" className="arrow-icon" />}
//             </div>
//             <div 
//                 className={`nav-item ${activeItem === 'Team' ? 'active' : ''}`} 
//                 onClick={() => handleItemClick('Team', '/administrateur/team')}
//             >
//                 <img src={UsersIcon} alt="Team Icon" className="icon" />
//                 Team {activeItem === 'Team' && <img src={LeftArrowIcon} alt="Left Arrow Icon" className="arrow-icon" />}
//             </div>
//             <div 
//                 className={`nav-item ${activeItem === 'Add Employee' ? 'active' : ''}`} 
//                 onClick={() => handleItemClick('Add Employee', '/administrateur/add')}
//             >
//                 <img src={UserPlusIcon} alt="Add Employee Icon" className="icon" />
//                 + Employee {activeItem === 'Add Employee' && <img src={LeftArrowIcon} alt="Left Arrow Icon" className="arrow-icon" />}
//             </div>
//             {user.isLoggedIn && (
//                 <div className="user-info">
//                     <p>{user.email}</p>
//                     <p>{user.fullname}</p>
//                 </div>
//             )}
//             <button className='logout' onClick={handleLogout}><img src={LogOut} alt="Logout Icon" /></button>
//             <h2>Log Out</h2>
//             <Dashboard></Dashboard>
//         </div>
//     );
// };

// export default Navbar;






// import React, { useState, useContext } from 'react';
// import './Navbar.css';
// import Logo from './logo.png';
// import ChartBarIcon from './une-analyse (1).png';
// import UsersIcon from './team-building.png';
// import UserPlusIcon from './ajouter-un-utilisateur.png';
// import LeftArrowIcon from './left-arrow.png';
// import LogOut from './se-deconnecter.png';
// import { useNavigate } from 'react-router-dom';
// import { UserContext } from './UserProvider ';
// import Dashboard from '../Administrateur/Dashboard';
// import Team from '../Administrateur/Team';
// import AddUser from '../Administrateur/AddUser';

// const Navbar = () => {
//     const navigate = useNavigate();
//     const [activeItem, setActiveItem] = useState('Dashboard'); // Initially set to 'Dashboard'
//     const { user } = useContext(UserContext);

//     const handleLogout = () => {
//         // Clear the token from local storage
//         localStorage.removeItem('token');
        
//         // Navigate to the root route
//         navigate('/');
//     };

//     const handleItemClick = (itemName) => {
//         setActiveItem(itemName);
//     };

//     return (
//         <div className="navbar">
//             <div className="logo-container">
//                 <img src={Logo} alt="Logo" className="logo" />
//                 <div className="title-container">
              
//                 </div>
//             </div>
//             <div 
//                 className={`nav-item ${activeItem === 'Dashboard' ? 'active' : ''}`} 
//                 onClick={() => handleItemClick('Dashboard')}
//             >
//                 <img src={ChartBarIcon} alt="Dashboard Icon" className="icon" />
//                 Dashboard {activeItem === 'Dashboard' && <img src={LeftArrowIcon} alt="Left Arrow Icon" className="arrow-icon" />}
//             </div>
//             <div 
//                 className={`nav-item ${activeItem === 'Team' ? 'active' : ''}`} 
//                 onClick={() => handleItemClick('Team')}
//             >
//                 <img src={UsersIcon} alt="Team Icon" className="icon" />
//                 Team {activeItem === 'Team' && <img src={LeftArrowIcon} alt="Left Arrow Icon" className="arrow-icon" />}
//             </div>
//             <div 
//                 className={`nav-item ${activeItem === 'Add Employee' ? 'active' : ''}`} 
//                 onClick={() => handleItemClick('Add Employee')}
//             >
//                 <img src={UserPlusIcon} alt="Add Employee Icon" className="icon" />
//                 + Employee {activeItem === 'Add Employee' && <img src={LeftArrowIcon} alt="Left Arrow Icon" className="arrow-icon" />}
//             </div>
//             {user.isLoggedIn && (
//                 <div className="user-info">
//                     <p>{user.email}</p>
//                     <p>{user.fullname}</p>
//                     <button className='logout' onClick={handleLogout}><img src={LogOut} alt="Logout Icon" /></button>
//                    <h2>Log Out</h2>
//                 </div>
//             )}

//             {/* Conditionally render components based on activeItem */}
//             {activeItem === 'Dashboard' && <Dashboard />}
//             {activeItem === 'Team' && <Team />}
//             {activeItem === 'Add Employee' && <AddUser />}
//         </div>
//     );
// };

// export default Navbar;






// import React, { useState, useContext } from 'react';
// import './Navbar.css';
// import Logo from './logo.png';
// import ChartBarIcon from './une-analyse (1).png';
// import UsersIcon from './team-building.png';
// import UserPlusIcon from './ajouter-un-utilisateur.png';
// import LeftArrowIcon from './left-arrow.png';
// import LogOut from './se-deconnecter.png';
// import { useNavigate } from 'react-router-dom';
// import { UserContext } from './UserProvider ';
// import Dashboard from '../Administrateur/Dashboard';
// import Team from '../Administrateur/Team';
// import AddUser from '../Administrateur/AddUser';

// const Navbar = () => {
//     const navigate = useNavigate();
//     const [activeItem, setActiveItem] = useState('Dashboard'); // Initially set to 'Dashboard'
//     const { user } = useContext(UserContext);

//     const handleLogout = () => {
//         // Clear the token from local storage
//         localStorage.removeItem('token');
        
//         // Navigate to the root route
//         navigate('/');
//     };

//     const handleItemClick = (itemName) => {
//         setActiveItem(itemName);
//     };

//     return (
//         <div className="navbar">
            
//             <div className="logo-container">
//                 <img src={Logo} alt="Logo" className="logo" />
//                 <div className="title-container">
              
//                 </div>
//             </div>
//             <div 
//                 className={`nav-item ${activeItem === 'Dashboard' ? 'active' : ''}`} 
//                 onClick={() => handleItemClick('Dashboard')}
//             >
//                 <img src={ChartBarIcon} alt="Dashboard Icon" className="icon" />
//                 Dashboard {activeItem === 'Dashboard'  }
//             </div>
//             <div 
//                 className={`nav-item ${activeItem === 'Team' ? 'active' : ''}`} 
//                 onClick={() => handleItemClick('Team')}
//             >
//                 <img src={UsersIcon} alt="Team Icon" className="icon" />
//                 Team {activeItem === 'Team' }
//             </div>
//             <div 
//                 className={`nav-item ${activeItem === 'Add Employee' ? 'active' : ''}`} 
//                 onClick={() => handleItemClick('Add Employee')}
//             >
//                 <img src={UserPlusIcon} alt="Add Employee Icon" className="icon" />
//                 + Employee {activeItem === 'Add Employee'}
//             </div>
//             {user.isLoggedIn && (
//                 <div className="user-info">
//                     <p className='email'>{user.email}</p>
//                     <p className='fullname'>{user.fullname}</p>
//                     <button className='logout' onClick={handleLogout}><img src={LogOut} alt="Logout Icon" /></button>
//                    <h2>Log Out</h2>
//                 </div>
//             )}

//             {/* Conditionally render components based on activeItem */}
//             {activeItem === 'Dashboard' && <Dashboard />}
//             {activeItem === 'Team' && <Team />}
//             {activeItem === 'Add Employee' && <AddUser />}
//         </div>
//     );
// };



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

const Navbar = () => {
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
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  useEffect(() => {
    // Retrieve the fullname from local storage
    const storedFullname = localStorage.getItem('fullname');
    if (storedFullname) {
      setFullname(storedFullname);
    }
  }, []);
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
      setNotifications(response.data);
      setNotificationCount(response.data.length);
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
              <span className="profile-label">{fullname}</span>              <span className="dropdown-icon">&#9662;</span>
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
      <div className='shadowww'>
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
      <div className={`nav-item ${activeItem === 'Add Employee' ? 'active' : ''}`} onClick={() => handleItemClick('Add Employee')}>
        <FaUserPlus className="icon" />
        {!isCollapsed && '+ Employee'}
      </div>
      
      <div className={`nav-item ${activeItem === 'Calendar' ? 'active' : ''}`} onClick={() => handleItemClick('Calendar')}>
        <FaCalendarAlt className="icon" />
        {!isCollapsed && 'Year calendar'}
      </div>
      
      <div className={`nav-item ${activeItem === 'AllLeaveRequest' ? 'active' : ''}`} onClick={() => handleItemClick('AllLeaveRequest')}>
        <FaClipboardList  className="icon" />
        {!isCollapsed && 'All leave requests'}
      </div>
      <div className={`nav-item ${activeItem === 'Historie' ? 'active' : ''}`} onClick={() => handleItemClick('Historie')}>
        <FaUserAlt  className="icon" />
        {!isCollapsed && 'Historie'}
      </div>
      </div>
      {activeItem === 'Dashboard' && <Dashboard isCollapsed={isCollapsed} isDarkMode={isDarkMode} />}
      {activeItem === 'Team' && <Team isCollapsed={isCollapsed} isDarkMode={isDarkMode} />}
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

export default Navbar;






// import React, { useState, useContext, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import './Navbar.css';
// import Logo from './logo.png';
// import darkcollapsedlogo from './output-onlinepngtools (2).png';
// import CollapsedLogo from './collapsed-logo.png';
// import darklogo from './output-onlinepngtools (1).png';
// import { UserContext } from './UserProvider ';
// import {
//   FaBars, FaUserAlt, FaMoon, FaClipboardList , FaSun, FaBell, FaCalendarCheck, FaTachometerAlt , FaArrowRight, FaUser, FaSignOutAlt, FaChartBar, FaUsers, FaUserPlus, FaCalendarAlt, FaPlane, FaTrash
// } from 'react-icons/fa';
// import Select from 'react-select';
// import Flag from 'react-world-flags';
// import Dashboard from '../Administrateur/Dashboard';
// import Team from '../Administrateur/Team';
// import AddUser from '../Administrateur/AddUser';
// import Calendaar from '../calender/Calendaar';
// import DashboardVac from '../Administrateur/DashboardVac';
// import Calendar from '../calender/Calendar';
// import LeaveRequestForm from '../Administrateur/LeaveRequestForm';
// import AllLeave from '../Administrateur/AllLeave';
// import CalendarExample from '../Administrateur/schdule';
// import Historie from '../Administrateur/Historie';
// import Profile from './Profile';
// import Copyright from '../copyright/Copyright';

// const Navbar = () => {
//   const navigate = useNavigate();
//   const [activeItem, setActiveItem] = useState('Dashboard');
//   const [isCollapsed, setIsCollapsed] = useState(false);
//   const [isDarkMode, setIsDarkMode] = useState(false);
//   const [dropdownVisible, setDropdownVisible] = useState(false);
//   const { user } = useContext(UserContext);
//   const [notificationCount, setNotificationCount] = useState(0);
//   const [notifications, setNotifications] = useState([]);
//   const [showNotifications, setShowNotifications] = useState(false);
//   const [avatar, setAvatar] = useState('');
//   const [email, setEmail] = useState('');
//   const [fullname, setFullname] = useState('');
//   const [viewProfileEmail, setViewProfileEmail] = useState(null);
//   const [activeComponent, setActiveComponent] = useState(null);
//   const [employees, setEmployees] = useState([]);

//   useEffect(() => {
//     if (isDarkMode) {
//       document.body.classList.add('dark-mode');
//     } else {
//       document.body.classList.remove('dark-mode');
//     }
//   }, [isDarkMode]);

//   useEffect(() => {
//     // Retrieve the fullname from local storage
//     const storedFullname = localStorage.getItem('fullname');
//     if (storedFullname) {
//       setFullname(storedFullname);
//     }
//   }, []);
//   useEffect(() => {
//     const storedEmail = localStorage.getItem('email');
//     if (storedEmail) {
//       setEmail(storedEmail);
//     } else if (user && user.email) {
//       setEmail(user.email);
//       localStorage.setItem('email', user.email);
//     }
  
//     if (storedEmail) {
//       fetchUserDetails(storedEmail);
//     }
//   }, [user]);

//   const fetchUserDetails = async (email) => {
//     try {
//       const response = await axios.get(`http://localhost:5000/users/${email}`);
//       setAvatar(response.data.avatar || 'path/to/default-profile-picture.jpg');
//     } catch (error) {
//       console.error('Error fetching user details:', error);
//     }
//   };

//   const fetchNotifications = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/notifications');
//       setNotifications(response.data);
//       setNotificationCount(response.data.length);
//     } catch (error) {
//       console.error('Error fetching notifications:', error);
//     }
//   };

//   const deleteNotification = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/notifications/${id}`);
//       setNotifications(notifications.filter(notification => notification._id !== id));
//       setNotificationCount(notificationCount - 1);
//     } catch (error) {
//       console.error('Error deleting notification:', error);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('email');
//     navigate('/');
//   };

//   const handleItemClick = (itemName) => {
//     setActiveItem(itemName);
//   };

//   const toggleCollapse = () => {
//     setIsCollapsed(!isCollapsed);
//   };

//   const toggleDarkMode = () => {
//     setIsDarkMode(!isDarkMode);
//   };

//   const toggleNotifications = () => {
//     setShowNotifications(!showNotifications);
//     if (!showNotifications) {
//       setNotificationCount(0);
//       fetchNotifications();
//     }
//   };

//   const flagOptions = [
//     { value: 'uk', label: <Flag code="GB" height="20" />, country: 'UK' },
//     { value: 'saudi-arabia', label: <Flag code="SA" height="20" />, country: 'Saudi Arabia' },
//     { value: 'france', label: <Flag code="FR" height="20" />, country: 'France' },
//     { value: 'spain', label: <Flag code="ES" height="20" />, country: 'Spain' }
//   ];

//   const customStyles = {
//     control: (base) => ({
//       ...base,
//       width: '100px',
//       minHeight: 'auto',
//       height: 'auto'
//     }),
//     dropdownIndicator: (base) => ({
//       ...base,
//       padding: 0
//     }),
//     indicatorsContainer: (base) => ({
//       ...base,
//       padding: 0
//     }),
//     valueContainer: (base) => ({
//       ...base,
//       padding: '0 8px'
//     }),
//     singleValue: (base) => ({
//       ...base,
//       display: 'flex',
//       alignItems: 'center'
//     })
//   };

//   const handleProfileButtonClick = () => {
//     setDropdownVisible(!dropdownVisible);
//   };

//   const navigateToProfile = () => {
//     navigate(`/profile/${email}`);
//   };
//   const handleViewProfile = (email) => {
//     setViewProfileEmail(email);
//   };

//   const handleReturnToTeam = () => {
//     setViewProfileEmail(null);
//     setActiveComponent('Team');
//   };
//   if (viewProfileEmail) {
//     const user = employees.find(employee => employee.email === viewProfileEmail);

//     return (
//       <div className={`team-container ${isCollapsed ? 'collapsed' : ''} ${isDarkMode ? 'dark-mode' : ''}`}>
//         <h1 className='title'>
//           <span onClick={handleReturnToTeam} style={{ cursor: 'pointer' }}>Employee Management</span> 
//         </h1>
//         <Profile
//           profileData={user}
//           setViewProfileEmail={setViewProfileEmail}
//           isDarkMode={isDarkMode}
//         />
//         <Copyright />
//       </div>
//     );
//   }
//   return (
//     <div className={`navbar ${isCollapsed ? 'collapsed' : ''}`}>
//       <div className="navbar1">
//         <div className="nav-left">
//           <button className="nav-button menu-button" onClick={toggleCollapse}>
//             {isCollapsed ? <FaArrowRight /> : <FaBars />}
//           </button>
//         </div>
//         <div className="nav-right">
//           <Select options={flagOptions} defaultValue={flagOptions[0]} styles={customStyles} />
//           <button className="nav-button" onClick={toggleDarkMode}>
//             {isDarkMode ? <FaSun /> : <FaMoon />}
//           </button>
//           <div className="notification-container">
//             <button className="nav-button notification-button" onClick={toggleNotifications}>
//               <FaBell />
//               {notificationCount > 0 && <span className="notification-badge">{notificationCount}</span>}
//             </button>
//             {showNotifications && (
//               <div className={`notifications-box ${isCollapsed ? 'collapsed' : ''} ${isDarkMode ? 'dark-mode' : ''}`}>
//                 <h4>Notifications</h4>
//                 <ul>
//                   {notifications.map((notification) => (
//                     <li key={notification._id}>
//                       <p><strong>{notification.title}</strong> - {notification.email} ({notification.createdAt})</p>
//                       <button className={`delete-button ${isDarkMode ? 'dark-mode' : ''}`} onClick={() => deleteNotification(notification._id)}>
//                         <FaTrash style={{color:'red'}}/>
//                       </button>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//           </div>
//           <div className="dropdown-container">
//             <button className="nav-button profile-button" onClick={handleProfileButtonClick}>
//               <img src={avatar || 'path/to/default-profile-picture.jpg'} alt="Profile" className="profile-picture" />
//               <span className="profile-label">{fullname}</span>              <span className="dropdown-icon">&#9662;</span>
//             </button>
//             {dropdownVisible && (
//               <div className={`dropdown-menu ${isDarkMode ? 'dark-mode' : ''}`}>
//                 <button className={`dropdown-item ${isCollapsed ? 'collapsed' : ''} ${isDarkMode ? 'dark-mode' : ''}`} onClick={() => handleViewProfile(user.email)}>
//                   <FaUser /> Profile
//                 </button>
//                 <button className={`dropdown-item ${isCollapsed ? 'collapsed' : ''} ${isDarkMode ? 'dark-mode' : ''}`} onClick={handleLogout}>
//                   <FaSignOutAlt /> Log Out
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//       <div className='shadowww'>
//       <div className="logo-container">
//         <img 
//           src={isDarkMode ? (isCollapsed ? darkcollapsedlogo : darklogo) : (isCollapsed ? CollapsedLogo : Logo)} 
//           alt="Logo" 
//           className="logo" 
//         />
//       </div>
//       <div className={`nav-item ${activeItem === 'Dashboard' ? 'active' : ''}`} onClick={() => handleItemClick('Dashboard')}>
//         <FaTachometerAlt className="icon" />
//         {!isCollapsed && 'Dashboard team'}
//       </div>
//       <div className={`nav-item ${activeItem === 'DashboardVac' ? 'active' : ''}`} onClick={() => handleItemClick('DashboardVac')}>
//         <FaChartBar className="icon" />
//         {!isCollapsed && 'Dashboard Vacation'}
//       </div>
//       <div className={`nav-item ${activeItem === 'Team' ? 'active' : ''}`} onClick={() => handleItemClick('Team')}>
//         <FaUsers className="icon" />
//         {!isCollapsed && 'Team'}
//       </div>
//       <div className={`nav-item ${activeItem === 'Add Employee' ? 'active' : ''}`} onClick={() => handleItemClick('Add Employee')}>
//         <FaUserPlus className="icon" />
//         {!isCollapsed && '+ Employee'}
//       </div>
      
//       <div className={`nav-item ${activeItem === 'Calendar' ? 'active' : ''}`} onClick={() => handleItemClick('Calendar')}>
//         <FaCalendarAlt className="icon" />
//         {!isCollapsed && 'Year calendar'}
//       </div>
      
//       <div className={`nav-item ${activeItem === 'AllLeaveRequest' ? 'active' : ''}`} onClick={() => handleItemClick('AllLeaveRequest')}>
//         <FaClipboardList  className="icon" />
//         {!isCollapsed && 'All leave requests'}
//       </div>
//       <div className={`nav-item ${activeItem === 'Historie' ? 'active' : ''}`} onClick={() => handleItemClick('Historie')}>
//         <FaUserAlt  className="icon" />
//         {!isCollapsed && 'Historie'}
//       </div>
//       </div>
//       {activeItem === 'Dashboard' && <Dashboard isCollapsed={isCollapsed} isDarkMode={isDarkMode} />}
//       {activeItem === 'Team' && <Team isCollapsed={isCollapsed} isDarkMode={isDarkMode} />}
//       {activeItem === 'Add Employee' && <AddUser isCollapsed={isCollapsed} isDarkMode={isDarkMode} />}
//       {activeItem === 'Calendaar' && <Calendaar isCollapsed={isCollapsed} isDarkMode={isDarkMode} />}
//       {activeItem === 'DashboardVac' && <DashboardVac isCollapsed={isCollapsed} isDarkMode={isDarkMode} />}
//       {activeItem === 'Calendar' && <CalendarExample isCollapsed={isCollapsed} isDarkMode={isDarkMode} />}
//       {activeItem === 'LeaveRequest' && <LeaveRequestForm isCollapsed={isCollapsed} isDarkMode={isDarkMode} />}
//       {activeItem === 'AllLeaveRequest' && <AllLeave isCollapsed={isCollapsed} isDarkMode={isDarkMode} />}
//       {activeItem === 'Historie' && <Historie    isCollapsed={isCollapsed} isDarkMode={isDarkMode} />}

//     </div>
//   );
// };

// export default Navbar;

 


 







