import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faTrashAlt, faFilter } from '@fortawesome/free-solid-svg-icons';
import { jwtDecode } from 'jwt-decode';
import './Team1.css';
import Profile from './Profile';
import Copyright from '../copyright/Copyright';

const TeamLeader = ({ isCollapsed, isDarkMode, setNotificationCount, setNotifications }) => {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [viewProfileEmail, setViewProfileEmail] = useState(null);
  const [showOptions, setShowOptions] = useState(false);
  const employeesPerPage = 6;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const decodedToken = jwtDecode(token);
          const lineManagerEmail = decodedToken.email;

          const response = await axios.get(`http://localhost:5000/users/linemanager/${lineManagerEmail}`);
          setEmployees(response.data);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleDepartmentChange = (department) => {
    setSelectedDepartment(department);
    setShowOptions(false); // Hide options after selecting one
  };

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const handleOptionChange = (e) => {
    const department = e.target.getAttribute('value');
    handleDepartmentChange(department);
  };

  const filteredEmployees = employees.filter((employee) =>
    employee.fullname.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (selectedDepartment === 'all' || (employee.departement && employee.departement.toLowerCase() === selectedDepartment))
  );

  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDeleteUser = async (email) => {
    try {
      await axios.delete(`http://localhost:5000/users/email/${email}`);
      setEmployees(employees.filter(employee => employee.email !== email));

      await axios.delete(`http://localhost:5000/employees/email/${email}`);
      setEmployees(employees.filter(employee => employee.email !== email));

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

  return (
    <div className={`team-container ${isCollapsed ? 'collapsed' : ''} ${isDarkMode ? 'dark-mode' : ''}`}>
      <h1 className='title'>
        <span onClick={handleReturnToTeam} style={{ cursor: 'pointer' }}>Employee Management</span>
      </h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by name"
          className={`search-input ${isDarkMode ? 'dark-mode' : ''}`}
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button className={`filter-button ${isDarkMode ? 'dark-mode' : ''}`} onClick={toggleOptions}>
          <FontAwesomeIcon icon={faFilter} />
        </button>
        {showOptions && (
          <div className={`options-box ${isDarkMode ? 'dark-mode' : ''}`}>
            <div onClick={handleOptionChange} value="all">All Departments</div>
            <div onClick={handleOptionChange} value="marketing">Marketing</div>
            <div onClick={handleOptionChange} value="it">IT</div>
            <div onClick={handleOptionChange} value="sales">Sales</div>
            <div onClick={handleOptionChange} value="data-science">Data Science</div>
          </div>
        )}
      </div>
      <table className={`employee-table ${isDarkMode ? 'dark-mode' : ''}`}>
        <thead>
          <tr>
            <th style={{ backgroundColor: "#9fbbf1" }}></th>
            <th style={{ backgroundColor: "#9fbbf1" }}>Name</th>
            <th style={{ backgroundColor: "#9fbbf1" }}>Job Title</th>
            <th style={{ backgroundColor: "#9fbbf1" }}>Department</th>
            <th style={{ backgroundColor: "#9fbbf1" }}>Phone</th>
            <th style={{ backgroundColor: "#9fbbf1" }}>Email</th>
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
      <div className="pagination">
        {Array.from({ length: Math.ceil(filteredEmployees.length / employeesPerPage) }, (_, i) => (
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
    </div>
  );
};

export default TeamLeader;
