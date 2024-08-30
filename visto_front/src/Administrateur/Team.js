
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import './Team.css';
// import Copyright from '../copyright/Copyright';

// const Team = ({ isCollapsed, isDarkMode }) => {
//   const [employees, setEmployees] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedDepartment, setSelectedDepartment] = useState('all');
//   const employeesPerPage = 6;
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/users');
//         setEmployees(response.data);
//       } catch (error) {
//         console.error('Error fetching users:', error);
//       }
//     };

//     fetchUsers();
//   }, []);

//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   const filteredEmployees = employees.filter((employee) =>
//     employee.fullname.toLowerCase().includes(searchQuery.toLowerCase()) &&
//     (selectedDepartment === 'all' || (employee.department && employee.department.toLowerCase() === selectedDepartment))
//   );

//   const indexOfLastEmployee = currentPage * employeesPerPage;
//   const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
//   const currentEmployees = filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   const handleDeleteUser = async (email) => {
//     try {
//       await axios.delete(`http://localhost:5000/users/email/${email}`);
//       setEmployees(employees.filter(employee => employee.email !== email));
//     } catch (error) {
//       console.error('Error deleting user:', error);
//     }
//   };

//   const handleDepartmentChange = (e) => {
//     setSelectedDepartment(e.target.value);
//   };

//   const handleViewProfile = (email) => {
//     navigate(`/profile/${email}`);
//   };

//   return (
//     <div className={`team-container ${isCollapsed ? 'collapsed' : ''} ${isDarkMode ? 'dark-mode' : ''}`}>
//       <h1 className='title'>Employee Management</h1>
//       <div className="search-container">
//         <input
//           type="text"
//           placeholder="Search by name"
//           className={`search-input ${isDarkMode ? 'dark-mode' : ''}`}
//           value={searchQuery}
//           onChange={handleSearchChange}
//         />
//         <select
//           className={`department-select ${isDarkMode ? 'dark-mode' : ''}`}
//           value={selectedDepartment}
//           onChange={handleDepartmentChange}
//         >
//           <option value="all">All Departments</option>
//           <option value="marketing">Marketing</option>
//           <option value="it">IT</option>
//           <option value="sales">Sales</option>
//           <option value="data-science">Data Science</option>
//         </select>
//       </div>
//       <div className={`employee-cards ${isDarkMode ? 'dark-mode' : ''}`}>
//         {currentEmployees.map((employee, index) => (
//           <div key={index} className={`employee-card ${isDarkMode ? 'dark-mode' : ''}`}>
//             <img src={employee.avatar} alt={employee.fullname} className="employee-photo" />
//             <h3 className={`name ${isDarkMode ? 'dark-mode' : ''}`}>{employee.fullname}</h3>
//             <h2 className={`job ${isDarkMode ? 'dark-mode' : ''}`}>{employee.jobtitle}</h2>
//             <p className={`pp ${isDarkMode ? 'dark-mode' : ''}`}>{employee.phone}</p>
//             <p className={`pp ${isDarkMode ? 'dark-mode' : ''}`}>{employee.email}</p>
//             <div className="buttons">
//               <button
//                 className={`view-profile-btn ${isDarkMode ? 'dark-mode' : ''}`}
//                 onClick={() => handleViewProfile(employee.email)}
//               >
//                 View profile
//               </button>
//               <button
//                 className={`delete-profile-btn ${isDarkMode ? 'dark-mode' : ''}`}
//                 onClick={() => handleDeleteUser(employee.email)}
//               >
//                 Supprimer profile
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//       <div className="pagination">
//         {Array.from({ length: Math.ceil(filteredEmployees.length / employeesPerPage) }, (_, i) => (
//           <button
//             key={i + 1}
//             onClick={() => paginate(i + 1)}
//             className={`page-btn ${currentPage === i + 1 ? 'active' : ''}`}
//           >
//             {i + 1}
//           </button>
//         ))}
//       </div>
//       <br></br>
//       <Copyright />
//     </div>
//   );
// };

// export default Team;











// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import './Team.css';
// import Profile from './Profile'; // Import the Profile component
// import Copyright from '../copyright/Copyright';

// const Team = ({ isCollapsed, isDarkMode, setNotificationCount, setNotifications }) => {
  
//   const [employees, setEmployees] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedDepartment, setSelectedDepartment] = useState('all');
//   const [viewProfileEmail, setViewProfileEmail] = useState(null); // Track the profile to view
//   const employeesPerPage = 6;
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/users');
//         setEmployees(response.data);
//       } catch (error) {
//         console.error('Error fetching users:', error);
//       }
//     };

//     fetchUsers();
//   }, []);

//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   const filteredEmployees = employees.filter((employee) =>
//     employee.fullname.toLowerCase().includes(searchQuery.toLowerCase()) &&
//     (selectedDepartment === 'all' || (employee.department && employee.department.toLowerCase() === selectedDepartment))
//   );

//   const indexOfLastEmployee = currentPage * employeesPerPage;
//   const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
//   const currentEmployees = filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   const handleDeleteUser = async (email) => {
//     try {
//       await axios.delete(`http://localhost:5000/users/email/${email}`);
//       setEmployees(employees.filter(employee => employee.email !== email));

//       await axios.delete(`http://localhost:5000/employees/email/${email}`);
//       setEmployees(employees.filter(employee => employee.email !== email));

//       const notificationResponse = await axios.post('http://localhost:5000/notifications', {
//         email: email,
//         title: 'deleting a user',
//       });

//       if (notificationResponse.status === 200) {
//         console.log('Notification created successfully');
//         setNotificationCount(prevCount => prevCount + 1);
//         setNotifications(prevNotifications => [...prevNotifications, `User ${email} deleted`]);
//       } else {
//         console.error('Failed to create notification:', notificationResponse.statusText);
//       }
//     } catch (error) {
//       console.error('Error deleting user or creating notification:', error);
//     }
//   };

//   const handleDepartmentChange = (e) => {
//     setSelectedDepartment(e.target.value);
//   };

//   const handleViewProfile = (email) => {
//     setViewProfileEmail(email); // Set the email of the profile to view
//   };

//   const handleReturnToTeam = () => {
//     setViewProfileEmail(null); // Reset the viewProfileEmail to return to team list
//   };

//   // If viewProfileEmail is set, show detailed profile instead of the team list
//   if (viewProfileEmail) {
//     const user = employees.find(employee => employee.email === viewProfileEmail);

//     return (
//       <div className={`team-container ${isCollapsed ? 'collapsed' : ''} ${isDarkMode ? 'dark-mode' : ''}`}>
//         <h1 className='title'>
//           <span onClick={handleReturnToTeam} style={{ cursor: 'pointer' }}>Employee Management</span> / {user.fullname}
//         </h1>
//         <Profile
//           profileData={user} // Pass the user's profile data to the Profile component
//           setViewProfileEmail={setViewProfileEmail} // Pass the function to reset viewProfileEmail
//           isDarkMode={isDarkMode} // Pass isDarkMode to Profile component if needed
//         />
        
//         <Copyright />
//       </div>
//     );
//   }

//   // Render team list by default
//   return (
//     <div className={`team-container ${isCollapsed ? 'collapsed' : ''} ${isDarkMode ? 'dark-mode' : ''}`}>
//       <h1 className='title'>
//         <span onClick={handleReturnToTeam} style={{ cursor: 'pointer' }}>Employee Management</span>
//       </h1>
//       <div className="search-container">
//         <input
//           type="text"
//           placeholder="Search by name"
//           className={`search-input ${isDarkMode ? 'dark-mode' : ''}`}
//           value={searchQuery}
//           onChange={handleSearchChange}
//         />
//         <select
//           className={`department-select ${isDarkMode ? 'dark-mode' : ''}`}
//           value={selectedDepartment}
//           onChange={handleDepartmentChange}
//         >
//           <option value="all">All Departments</option>
//           <option value="marketing">Marketing</option>
//           <option value="it">IT</option>
//           <option value="sales">Sales</option>
//           <option value="data-science">Data Science</option>
//         </select>
//       </div>
//       <div className={`employee-cards ${isDarkMode ? 'dark-mode' : ''}`}>
//         {currentEmployees.map((employee, index) => (
//           <div key={index} className={`employee-card ${isDarkMode ? 'dark-mode' : ''}`}>
//             <img src={employee.avatar} alt={employee.fullname} className="employee-photo" />
//             <h3 className={`name ${isDarkMode ? 'dark-mode' : ''}`}>{employee.fullname}</h3>
//             <h2 className={`job ${isDarkMode ? 'dark-mode' : ''}`}>{employee.jobtitle}</h2>
//             <p className={`pp ${isDarkMode ? 'dark-mode' : ''}`}>{employee.phone}</p>
//             <p className={`pp ${isDarkMode ? 'dark-mode' : ''}`}>{employee.email}</p>
//             <div className="buttons">
//               <button
//                 className={`view-profile-btn ${isDarkMode ? 'dark-mode' : ''}`}
//                 onClick={() => handleViewProfile(employee.email)}
//               >
//                 View profile
//               </button>
//               <button
//                 className={`delete-profile-btn ${isDarkMode ? 'dark-mode' : ''}`}
//                 onClick={() => handleDeleteUser(employee.email)}
//               >
//                 delete profile
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//       <div className="pagination">
//         {Array.from({ length: Math.ceil(filteredEmployees.length / employeesPerPage) }, (_, i) => (
//           <button
//             key={i + 1}
//             onClick={() => paginate(i + 1)}
//             className={`page-btn ${currentPage === i + 1 ? 'active' : ''}`}
//           >
//             {i + 1}
//           </button>
//         ))}
//       </div>
//       <br></br>
//       <Copyright />
//     </div>
//   );
// };

// export default Team;



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEye, faTrashAlt, faChevronDown, faSearch, faFilter, faPlus } from '@fortawesome/free-solid-svg-icons';
// import './Team1.css';
// import Profile from './Profile';
// import Copyright from '../copyright/Copyright';

// const Team = ({ isCollapsed, isDarkMode, setNotificationCount, setNotifications }) => {
//   const [employees, setEmployees] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
//   const [viewProfileEmail, setViewProfileEmail] = useState(null);
//   const [departmentFilter, setDepartmentFilter] = useState('');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filteredEmployees, setFilteredEmployees] = useState([]);
//   const [showDepartmentFilter, setShowDepartmentFilter] = useState(false);
//   const employeesPerPage = 9;
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/users');
//         setEmployees(response.data);
//         setFilteredEmployees(response.data);
//       } catch (error) {
//         console.error('Error fetching users:', error);
//       }
//     };

//     fetchUsers();
//   }, []);

//   const handleSort = (key) => {
//     let direction = 'ascending';
//     if (sortConfig.key === key && sortConfig.direction === 'ascending') {
//       direction = 'descending';
//     }
//     setSortConfig({ key, direction });
//   };

//   const applyFilters = () => {
//     const newFilteredEmployees = employees.filter(employee =>
//       (departmentFilter === '' || employee.departement === departmentFilter) &&
//       (searchTerm === '' || employee.fullname.toLowerCase().includes(searchTerm.toLowerCase()))
//     );
//     setFilteredEmployees(newFilteredEmployees);
//     setCurrentPage(1);
//   };

//   const sortedEmployees = React.useMemo(() => {
//     if (sortConfig.key) {
//       return [...filteredEmployees].sort((a, b) => {
//         if (a[sortConfig.key] < b[sortConfig.key]) {
//           return sortConfig.direction === 'ascending' ? -1 : 1;
//         }
//         if (a[sortConfig.key] > b[sortConfig.key]) {
//           return sortConfig.direction === 'ascending' ? 1 : -1;
//         }
//         return 0;
//       });
//     }
//     return filteredEmployees;
//   }, [filteredEmployees, sortConfig]);

//   const indexOfLastEmployee = currentPage * employeesPerPage;
//   const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
//   const currentEmployees = sortedEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   const handleDeleteUser = async (email) => {
//     try {
//       await axios.delete(`http://localhost:5000/users/email/${email}`);
//       setEmployees(employees.filter(employee => employee.email !== email));
//       setFilteredEmployees(filteredEmployees.filter(employee => employee.email !== email));

//       await axios.delete(`http://localhost:5000/employees/email/${email}`);
//       setEmployees(employees.filter(employee => employee.email !== email));
//       setFilteredEmployees(filteredEmployees.filter(employee => employee.email !== email));

//       const notificationResponse = await axios.post('http://localhost:5000/notifications', {
//         email: email,
//         title: 'deleting a user',
//       });

//       if (notificationResponse.status === 200) {
//         console.log('Notification created successfully');
//         setNotificationCount(prevCount => prevCount + 1);
//         setNotifications(prevNotifications => [...prevNotifications, `User ${email} deleted`]);
//       } else {
//         console.error('Failed to create notification:', notificationResponse.statusText);
//       }
//     } catch (error) {
//       console.error('Error deleting user or creating notification:', error);
//     }
//   };

//   const handleViewProfile = (email) => {
//     setViewProfileEmail(email);
//   };

//   const handleReturnToTeam = () => {
//     setViewProfileEmail(null);
//   };

//   const handleSearch = () => {
//     applyFilters();
//   };

//   const handleFilterToggle = () => {
//     setShowDepartmentFilter(!showDepartmentFilter);
//   };

//   if (viewProfileEmail) {
//     const user = employees.find(employee => employee.email === viewProfileEmail);

//     return (
//       <div className={`team-container ${isCollapsed ? 'collapsed' : ''} ${isDarkMode ? 'dark-mode' : ''}`}>
//         <h1 className='title'>
//           <span onClick={handleReturnToTeam} style={{ cursor: 'pointer' }}>Employee Management</span> / {user.fullname}
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
//     <div className={`team-container ${isCollapsed ? 'collapsed' : ''} ${isDarkMode ? 'dark-mode' : ''}`}>
//       <h1 className='title'>
//         <span onClick={handleReturnToTeam} style={{ cursor: 'pointer' }}>Employee Management</span>
//       </h1>
      
//       <div className="search-container">
//         <button className={`icon-button4 ${isDarkMode ? 'dark-mode' : ''}`}>
//           <FontAwesomeIcon className='plusicon' icon={faPlus} />
//            Add a new Employee
//         </button>
//         <input
//           className="search-container1"
//           type="text"
//           placeholder="Search by name"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//         <button onClick={handleSearch} className={`icon-button ${isDarkMode ? 'dark-mode' : ''}`}>
//           <FontAwesomeIcon icon={faSearch} />
//         </button>
//         <button onClick={handleFilterToggle} className={`icon-button ${isDarkMode ? 'dark-mode' : ''}`}>
//           <FontAwesomeIcon icon={faFilter} />
//         </button>
//         {showDepartmentFilter && (
//           <div className="filter-dropdown">
//             <button onClick={() => setDepartmentFilter('')}>All Departments</button>
//             <button onClick={() => setDepartmentFilter('Marketing')}>Marketing</button>
//             <button onClick={() => setDepartmentFilter('IT')}>IT</button>
//             <button onClick={() => setDepartmentFilter('Sales')}>Sales</button>
//             <button onClick={() => setDepartmentFilter('Data Science')}>Data Science</button>
//           </div>
//         )}
//       </div>

//       <table className={`employee-table ${isDarkMode ? 'dark-mode' : ''}`}>
//         <thead>
//           <tr>
//             <th style={{ backgroundColor: "#9fbbf1" }}></th>
//             <th style={{ backgroundColor: "#9fbbf1" }} onClick={() => handleSort('fullname')}>
//               Name <FontAwesomeIcon icon={faChevronDown} />
//             </th>
//             <th style={{ backgroundColor: "#9fbbf1" }} onClick={() => handleSort('jobtitle')}>
//               Job Title <FontAwesomeIcon icon={faChevronDown} />
//             </th>
//             <th style={{ backgroundColor: "#9fbbf1" }} onClick={() => handleSort('departement')}>
//               Department <FontAwesomeIcon icon={faChevronDown} />
//             </th>
//             <th style={{ backgroundColor: "#9fbbf1" }} onClick={() => handleSort('phone')}>
//               Phone <FontAwesomeIcon icon={faChevronDown} />
//             </th>
//             <th style={{ backgroundColor: "#9fbbf1" }} onClick={() => handleSort('email')}>
//               Email <FontAwesomeIcon icon={faChevronDown} />
//             </th>
//             <th style={{ backgroundColor: "#9fbbf1" }}>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {currentEmployees.map((employee, index) => (
//             <tr key={index}>
//               <td><img src={employee.avatar} alt={employee.fullname} className="employee-photo" /></td>
//               <td>{employee.fullname}</td>
//               <td>{employee.jobtitle}</td>
//               <td>{employee.departement}</td>
//               <td>{employee.phone}</td>
//               <td>{employee.email}</td>
//               <td>
//                 <button
//                   className={`icon-button1 ${isDarkMode ? 'dark-mode' : ''}`}
//                   onClick={() => handleViewProfile(employee.email)}
//                 >
//                   <FontAwesomeIcon icon={faEye} />
//                 </button>
//                 <button
//                   className={`icon-button ${isDarkMode ? 'dark-mode' : ''}`}
//                   onClick={() => handleDeleteUser(employee.email)}
//                 >
//                   <FontAwesomeIcon icon={faTrashAlt} />
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <br />
//       <div className="pagination">
//         {Array.from({ length: Math.ceil(sortedEmployees.length / employeesPerPage) }, (_, i) => (
//           <button
//             key={i + 1}
//             onClick={() => paginate(i + 1)}
//             className={`page-btn ${currentPage === i + 1 ? 'active' : ''}`}
//           >
//             {i + 1}
//           </button>
//         ))}
//       </div>
//       <br />


//       <Copyright />
//     </div>
//   );
// };

// export default Team;







import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faTrashAlt, faChevronDown, faSearch, faFilter, faPlus } from '@fortawesome/free-solid-svg-icons';
import './Team1.css';
import Profile from './Profile';
import Copyright from '../copyright/Copyright';
import AddUser from './AddUser';

const Team = ({ isCollapsed, isDarkMode, setNotificationCount, setNotifications }) => {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [viewProfileEmail, setViewProfileEmail] = useState(null);
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [showDepartmentFilter, setShowDepartmentFilter] = useState(false);
  const [activeComponent, setActiveComponent] = useState('Team');

  const employeesPerPage = 9;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/users');
        setEmployees(response.data);
        setFilteredEmployees(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const applyFilters = () => {
    const newFilteredEmployees = employees.filter(employee =>
      (departmentFilter === '' || employee.departement === departmentFilter) &&
      (searchTerm === '' || employee.fullname.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredEmployees(newFilteredEmployees);
    setCurrentPage(1);
  };

  const sortedEmployees = React.useMemo(() => {
    if (sortConfig.key) {
      return [...filteredEmployees].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return filteredEmployees;
  }, [filteredEmployees, sortConfig]);

  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = sortedEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDeleteUser = async (email) => {
    try {
      await axios.delete(`http://localhost:5000/users/email/${email}`);
      setEmployees(employees.filter(employee => employee.email !== email));
      setFilteredEmployees(filteredEmployees.filter(employee => employee.email !== email));

      await axios.delete(`http://localhost:5000/employees/email/${email}`);
      setEmployees(employees.filter(employee => employee.email !== email));
      setFilteredEmployees(filteredEmployees.filter(employee => employee.email !== email));

      const notificationResponse = await axios.post('http://localhost:5000/notifications', {
        email: email,
        title: 'deleting a user',
      });

      if (notificationResponse.status === 200) {
        console.log('Notification created successfully');
        setNotificationCount(prevCount => prevCount + 1);
        setNotifications(prevNotifications => [...prevNotifications, `User ${email} deleted`]);
      } else {
        console.error('Failed to create notification:', notificationResponse.statusText);
      }
    } catch (error) {
      console.error('Error deleting user or creating notification:', error);
    }
  };

  const handleViewProfile = (email) => {
    setViewProfileEmail(email);
  };

  const handleReturnToTeam = () => {
    setViewProfileEmail(null);
    setActiveComponent('Team');
  };

  const handleSearch = () => {
    applyFilters();
  };

  const handleFilterToggle = () => {
    setShowDepartmentFilter(!showDepartmentFilter);
  };

  const handleAddUserClick = () => {
    setActiveComponent('AddUser');
  };

  if (viewProfileEmail) {
    const user = employees.find(employee => employee.email === viewProfileEmail);

    return (
      <div className={`team-container ${isCollapsed ? 'collapsed' : ''} ${isDarkMode ? 'dark-mode' : ''}`}>
        <h1 className='title'>
          <span onClick={handleReturnToTeam} style={{ cursor: 'pointer' }}>Employee Management</span> / {user.fullname}
        </h1>
        <Profile
          profileData={user}
          setViewProfileEmail={setViewProfileEmail}
          isDarkMode={isDarkMode}
        />
        <Copyright />
      </div>
    );
  }

  if (activeComponent === 'AddUser') {
    return (
      <div className={`team-container ${isCollapsed ? 'collapsed' : ''} ${isDarkMode ? 'dark-mode' : ''}`}>
        <AddUser isCollapsed={isCollapsed} isDarkMode={isDarkMode} />
        <Copyright />
      </div>
    );
  }

  return (
    <div className={`team-container ${isCollapsed ? 'collapsed' : ''} ${isDarkMode ? 'dark-mode' : ''}`}>
      <h1 className='title'>
        <span onClick={handleReturnToTeam} style={{ cursor: 'pointer' }}>Employee Management</span>
      </h1>
  
      <div className="search-container">
        <button className={`icon-button4 ${isDarkMode ? 'dark-mode' : ''}`} onClick={handleAddUserClick}>
          <FontAwesomeIcon className='plusicon' icon={faPlus} />
          Add a new Employee
        </button>
        <input
          className="search-container1"
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch} className={`icon-button ${isDarkMode ? 'dark-mode' : ''}`}>
          <FontAwesomeIcon icon={faSearch} />
        </button>
        <button onClick={handleFilterToggle} className={`icon-button ${isDarkMode ? 'dark-mode' : ''}`}>
          <FontAwesomeIcon icon={faFilter} />
        </button>
        {showDepartmentFilter && (
          <div className="filter-dropdown">
            <button onClick={() => setDepartmentFilter('')}>All Departments</button>
            <button onClick={() => setDepartmentFilter('Marketing')}>Marketing</button>
            <button onClick={() => setDepartmentFilter('IT')}>IT</button>
            <button onClick={() => setDepartmentFilter('Sales')}>Sales</button>
            <button onClick={() => setDepartmentFilter('Data Science')}>Data Science</button>
          </div>
        )}
      </div>
  
      <div className="table-wrapper">
        <table className={`employee-table ${isDarkMode ? 'dark-mode' : ''}`}>
          <thead>
            <tr>
              <th style={{ backgroundColor: "#9fbbf1" }}></th>
              <th style={{ backgroundColor: "#9fbbf1" }} onClick={() => handleSort('fullname')}>
                Name <FontAwesomeIcon icon={faChevronDown} />
              </th>
              <th style={{ backgroundColor: "#9fbbf1" }} onClick={() => handleSort('jobtitle')}>
                Job Title <FontAwesomeIcon icon={faChevronDown} />
              </th>
              <th style={{ backgroundColor: "#9fbbf1" }} onClick={() => handleSort('departement')}>
                Department <FontAwesomeIcon icon={faChevronDown} />
              </th>
              <th style={{ backgroundColor: "#9fbbf1" }} onClick={() => handleSort('phone')}>
                Phone <FontAwesomeIcon icon={faChevronDown} />
              </th>
              <th style={{ backgroundColor: "#9fbbf1" }} onClick={() => handleSort('email')}>
                Email <FontAwesomeIcon icon={faChevronDown} />
              </th>
              <th style={{ backgroundColor: "#9fbbf1" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentEmployees.map((employee, index) => (
              <tr key={index}>
                <td><img src={employee.avatar} alt={employee.fullname} className="employee-photo" /></td>
                <td>{employee.fullname}</td>
                <td>{employee.jobtitle}</td>
                <td>{employee.departement}</td>
                <td>{employee.phone}</td>
                <td>{employee.email}</td>
                <td>
                  <button
                    className={`icon-button1 ${isDarkMode ? 'dark-mode' : ''}`}
                    onClick={() => handleViewProfile(employee.email)}
                  >
                    <FontAwesomeIcon icon={faEye} />
                  </button>
                  <button
                    className={`icon-button ${isDarkMode ? 'dark-mode' : ''}`}
                    onClick={() => handleDeleteUser(employee.email)}
                  >
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <br />
      <div className="pagination">
        {Array.from({ length: Math.ceil(sortedEmployees.length / employeesPerPage) }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => paginate(i + 1)}
            className={`page-btn ${currentPage === i + 1 ? 'active' : ''}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
      <br />
  
      <Copyright />
    </div>
  );
};

export default Team;




