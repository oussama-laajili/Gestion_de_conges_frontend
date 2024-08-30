// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './AllLeave.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

// const AllLeave = () => {
//     const [leaveRequests, setLeaveRequests] = useState([]);
//     const [employees, setEmployees] = useState({});
//     const [displayCount, setDisplayCount] = useState(6);

//     useEffect(() => {
//         const fetchLeaveRequests = async () => {
//             try {
//                 const response = await axios.get('http://localhost:5000/conges/pending');
//                 const requests = response.data;
//                 setLeaveRequests(requests);

//                 const emailPromises = requests.map(request => 
//                     axios.get(`http://localhost:5000/users/?email=${request.email}`)
//                 );

//                 const emailResponses = await Promise.all(emailPromises);

//                 const employeeData = {};
//                 emailResponses.forEach(response => {
//                     const employeesArray = response.data;
//                     employeesArray.forEach(employee => {
//                         if (employee && employee.email) {
//                             employeeData[employee.email] = {
//                                 name: employee.fullname,
//                                 avatar: employee.avatar,
//                             };
//                         }
//                     });
//                 });

//                 setEmployees(employeeData);

//             } catch (error) {
//                 console.error('Error fetching leave requests or employee data:', error);
//             }
//         };

//         fetchLeaveRequests();
//     }, []);

//     const loadMoreCards = () => {
//         setDisplayCount(prevCount => prevCount + 6);
//     };

//     return (
//         <div className="all-leave-container">
//             <h1 className='title'>Leave Requests</h1>
         
//             <div className="leave-cards">
//                 {leaveRequests.slice(0, displayCount).map((request, index) => (
//                     <div className="leave-card" key={index}>
//                         <div className="card-content">
//                             <img src={employees[request.email]?.avatar || 'default-avatar.png'} alt="Employee" className="employee-image" />
//                             <div className="card-details">
//                                 <h2>{employees[request.email]?.name || 'Unknown'}</h2>
//                                 <p>Leave Type: {request.type}</p>
//                                 <p>Start Date: {new Date(request.start).toLocaleDateString()}</p>
//                                 <p>End Date: {new Date(request.end).toLocaleDateString()}</p>
//                                 <p>Certificate/Other: 
//                                     <a href={`${request.supportingdoc}`} target="_blank" rel="noopener noreferrer">
//                                         {request.supportingdoc}
//                                     </a>
//                                 </p>
//                             </div>
//                         </div>
//                         <div className="card-actions">
//                             <button>Approve</button>
//                             <button>Reject</button>
//                             <button>Report</button>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//             {displayCount < leaveRequests.length && (
//                 <div className="load-more">
//                     <FontAwesomeIcon icon={faChevronDown} onClick={loadMoreCards} className="load-more-icon" />
//                 </div>
//             )}
//         </div>
//     );
// };

// export default AllLeave;










import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp, faFilter, faFile, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FaCheck, FaTimes } from 'react-icons/fa';
import './Team1.css';
import Copyright from '../copyright/Copyright';
import CalendarExample from './schdule';

const AllLeave = ({ isCollapsed, isDarkMode }) => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [employees, setEmployees] = useState({});
  const [displayCount, setDisplayCount] = useState(6);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [filterOpen, setFilterOpen] = useState(false);
  const [activeComponent, setActiveComponent] = useState('Team');
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'ascending' });

  useEffect(() => {
    const fetchLeaveRequests = async () => {
      try {
        const response = await axios.get('http://localhost:5000/conges/pending');
        const requests = response.data.filter(request => request.statut === "en attente");
        setLeaveRequests(requests);

        const emailPromises = requests.map(request => 
          axios.get(`http://localhost:5000/users/?email=${request.email}`)
        );

        const emailResponses = await Promise.all(emailPromises);

        const employeeData = {};
        emailResponses.forEach(response => {
          const employeesArray = response.data;
          employeesArray.forEach(employee => {
            if (employee && employee.email) {
              employeeData[employee.email] = {
                name: employee.fullname,
                avatar: employee.avatar,
              };
            }
          });
        });

        setEmployees(employeeData);
      } catch (error) {
        console.error('Error fetching leave requests or employee data:', error);
      }
    };

    fetchLeaveRequests();
  }, []);

  const loadMoreCards = () => {
    setDisplayCount(prevCount => prevCount + 6);
  };

  const handleAddUserClick = () => {
    setActiveComponent('Calendar');
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterSelect = (filter) => {
    setSelectedFilter(filter);
    setFilterOpen(false);
  };

  const filteredLeaveRequests = leaveRequests.filter(request => {
    const employee = employees[request.email];
    const nameMatch = employee && employee.name.toLowerCase().includes(searchTerm.toLowerCase());
    const filterMatch = selectedFilter === 'all' || request.type === selectedFilter;

    return nameMatch && filterMatch;
  });

  const sortedLeaveRequests = filteredLeaveRequests.sort((a, b) => {
    const employeeA = employees[a.email] || {};
    const employeeB = employees[b.email] || {};
    const keyA = sortConfig.key === 'name' ? employeeA.name : a[sortConfig.key];
    const keyB = sortConfig.key === 'name' ? employeeB.name : b[sortConfig.key];

    if (keyA < keyB) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (keyA > keyB) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  const updateLeaveStatus = async (id, status) => {
    try {
      // Update the leave status
      await axios.put(`http://localhost:5000/conges/${id}/status`, { status });
  
      // Find the corresponding leave request
      const leaveRequest = leaveRequests.find(request => request._id === id);
      if (leaveRequest && status === 'accepte') {
        // Create a calendar event
        await axios.post('http://localhost:5000/calendar', {
          title: `${employees[leaveRequest.email]?.name || 'Unknown'} - ${leaveRequest.type}`,
          startDate: leaveRequest.start,
          endDate: leaveRequest.end,
          recurrence: "accepted",
        });
  
        // Create a notification
        await axios.post('http://localhost:5000/notifications', {
          email: leaveRequest.email,
          title: 'Congé accepté',
        });
      }
  
      // Remove the processed leave request from the list
      setLeaveRequests(prevRequests => prevRequests.filter(request => request._id !== id));
    } catch (error) {
      console.error('Error updating leave status, creating calendar event, or sending notification:', error);
    }
  };
  




  const updateLeaveStatus2 = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/conges/${id}/status`, { status });

      const leaveRequest = leaveRequests.find(request => request._id === id);
      if (leaveRequest && status === 'refuse') {
        await axios.post('http://localhost:5000/calendar', {
          title: `${employees[leaveRequest.email]?.name || 'Unknown'} - ${leaveRequest.type}`,
          startDate: leaveRequest.start,
          endDate: leaveRequest.end,
          recurrence: "refused",
        });

        // Create a notification
        await axios.post('http://localhost:5000/notifications', {
          email: leaveRequest.email,
          title: 'Congé refusé',
        });
      }

      setLeaveRequests(prevRequests => prevRequests.filter(request => request._id !== id));
    } catch (error) {
      console.error('Error updating leave status or creating calendar event:', error);
    }
  };



  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'ascending' ? faChevronDown : faChevronDown;
    }
    return faChevronDown; // Default icon
  };

  if (activeComponent === 'Calendar') {
    return (
      <div className={`team-container ${isCollapsed ? 'collapsed' : ''} ${isDarkMode ? 'dark-mode' : ''}`}>
        <CalendarExample isCollapsed={isCollapsed} isDarkMode={isDarkMode} />
      </div>
    );
  }

  return (
    <div className={`team-container ${isCollapsed ? 'collapsed' : ''} ${isDarkMode ? 'dark-mode' : ''}`}>
      <h1 className='title'>Leave Requests</h1>

      <div className="search-container">
        <button className={`icon-button4 ${isDarkMode ? 'dark-mode' : ''}`} onClick={handleAddUserClick}>
          <FontAwesomeIcon className='plusicon' icon={faPlus} />
          View calendar
        </button>   
        <input
          type="text"
          placeholder="Search by name"
          className="search-container1"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button className={`icon-button ${isDarkMode ? 'dark-mode' : ''}`} onClick={() => setFilterOpen(!filterOpen)}>
          <FontAwesomeIcon icon={faFilter} />
        </button>
        {filterOpen && (
          <div className="filter-dropdown">
            <button onClick={() => handleFilterSelect('all')}>All</button>
            <button onClick={() => handleFilterSelect('Congés spéciaux pour raison de famille')}>Congés spéciaux pour raison de famille</button>
            <button onClick={() => handleFilterSelect('Congés de Maternité')}>Congés de Maternité</button>
            <button onClick={() => handleFilterSelect('Congés exceptionnels')}>Congés exceptionnels</button>
            <button onClick={() => handleFilterSelect('Congés de maladie')}>Congés de maladie</button>
            <button onClick={() => handleFilterSelect('Congés pour obligations militaires')}>Congés pour obligations militaires</button>
            <button onClick={() => handleFilterSelect('Congés sans solde')}>Congés sans solde</button>
            <button onClick={() => handleFilterSelect('Congés payés')}>Congés payés</button>
          </div>
        )}
      </div>

      <div className="table-wrapper">
        <table className={`employee-table ${isDarkMode ? 'dark-mode' : ''}`}>
          <thead>
            <tr>
              <th style={{ backgroundColor: "#9fbbf1" }} onClick={() => handleSort('name')}>
                Employee 
                <FontAwesomeIcon icon={getSortIcon('name')} className="sort-icon" />
              </th>
              <th style={{ backgroundColor: "#9fbbf1" }} onClick={() => handleSort('type')}>
                Leave Type
                <FontAwesomeIcon icon={getSortIcon('type')} className="sort-icon" />
              </th>
              <th style={{ backgroundColor: "#9fbbf1" }} onClick={() => handleSort('start')}>
                Start Date
                <FontAwesomeIcon icon={getSortIcon('start')} className="sort-icon" />
              </th>
              <th style={{ backgroundColor: "#9fbbf1" }} onClick={() => handleSort('end')}>
                End Date
                <FontAwesomeIcon icon={getSortIcon('end')} className="sort-icon" />
              </th>
              <th style={{ backgroundColor: "#9fbbf1" }}>Certificate/Other</th>
              <th style={{ backgroundColor: "#9fbbf1" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedLeaveRequests.slice(0, displayCount).map((request, index) => (
              <tr key={index}>
                <td>
                  <img src={employees[request.email]?.avatar || 'default-avatar.png'} alt="Employee" className="employee-photo" />
                  {employees[request.email]?.name || 'Unknown'}
                </td>
                <td>{request.type}</td>
                <td>{new Date(request.start).toLocaleDateString()}</td>
                <td>{new Date(request.end).toLocaleDateString()}</td>
                <td>
                  {request.supportingdoc && (
                    <a href={`${request.supportingdoc}`} target="_blank" rel="noopener noreferrer">
                      <FontAwesomeIcon icon={faFile} />
                    </a>
                  )}
                </td>
                <td>
                  <button className={`icon-button1 ${isDarkMode ? 'dark-mode' : ''}`} onClick={() => updateLeaveStatus(request._id, 'accepte')}>
                    <FaCheck /> Approve
                  </button>
                  <button className={`icon-button ${isDarkMode ? 'dark-mode' : ''}`} onClick={() => updateLeaveStatus2(request._id, 'refuse')}>
                    <FaTimes /> Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {displayCount < sortedLeaveRequests.length && (
        <div className="load-more">
          <FontAwesomeIcon icon={faChevronDown} onClick={loadMoreCards} className="load-more-icon" />
        </div>
      )}

      <Copyright />
    </div>
  );
};

export default AllLeave;





