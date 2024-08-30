import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaCheckCircle, FaTimesCircle, FaFileAlt } from 'react-icons/fa';
import './Historie.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faTrashAlt, faChevronDown, faSearch, faFilter, faPlus } from '@fortawesome/free-solid-svg-icons';

const Historie = ({ isCollapsed, isDarkMode }) => {
  const [userData, setUserData] = useState({});
  const [leaveHistory, setLeaveHistory] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'ascending' });

  const [leaveBalance, setLeaveBalance] = useState({
    congeannuelrestant: 'N/A',
    congemaladierestant: 'N/A',
    congepersonellerestant: 'N/A'
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const email = localStorage.getItem('email');
        if (!email) {
          throw new Error('No email found in local storage');
        }

        const userResponse = await axios.get(`http://localhost:5000/users/${email}`);
        setUserData(userResponse.data);

        const leaveResponse = await axios.get(`http://localhost:5000/conges/${email}`);
        setLeaveHistory(leaveResponse.data);

        const balanceResponse = await axios.get(`http://localhost:5000/employees/${email}`);
        console.log('API Response for Leave Balance:', balanceResponse.data);
        setLeaveBalance(balanceResponse.data);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const handleFilterSelect = (filter) => {
    setSelectedFilter(filter);
    setFilterOpen(false);
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
  const annualLeave = typeof leaveBalance.congeannuelrestant === 'number' ? leaveBalance.congeannuelrestant : 'N/A';
  const sickLeave = typeof leaveBalance.congemaladierestant === 'number' ? leaveBalance.congemaladierestant : 'N/A';
  const personalLeave = typeof leaveBalance.congepersonellerestant === 'number' ? leaveBalance.congepersonellerestant : 'N/A';

  if (!userData || !leaveBalance) {
    return <div>Loading...</div>;
  }

  return (
    <div className={`team-container ${isCollapsed ? 'collapsed' : ''} ${isDarkMode ? 'dark-mode' : ''}`}>
      <h1 className='title'>Leave Requests</h1>
      <div className="search-container">
        <button className={`icon-button4 ${isDarkMode ? 'dark-mode' : ''}`} >
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
      <div className="table-wrapper1">
        
      <table className={`employee-table ${isDarkMode ? 'dark-mode' : ''}`}>
      <thead>
            <tr>
            <th style={{ backgroundColor: "#9fbbf1" }} onClick={() => handleSort('start')}>
                Start Date 
                <FontAwesomeIcon icon={getSortIcon('name')} className="sort-icon" />
              </th>              
              <th style={{ backgroundColor: "#9fbbf1" }} onClick={() => handleSort('end')}>
              End Date 
                <FontAwesomeIcon icon={getSortIcon('name')} className="sort-icon" />
              </th>
<th style={{ backgroundColor: "#9fbbf1" }} onClick={() => handleSort('start')}>
                Start Date 
                <FontAwesomeIcon icon={getSortIcon('name')} className="sort-icon" />
              </th>              <th>Status</th>
              <th>Supporting Doc</th>
            </tr>
          </thead>
          <tbody>
            {leaveHistory.length > 0 ? (
              leaveHistory.map((record, index) => (
                <tr key={index}>
                  <td>{record.start}</td>
                  <td>{record.end}</td>
                  <td>{record.type}</td>
                  <td>
                    {record.statut === 'accepte' ? (
                      <FaCheckCircle style={{ color: 'green' }} />
                    ) : record.statut === 'refuse' ? (
                      <FaTimesCircle style={{ color: 'red' }} />
                    ) : (
                      'N/A'
                    )}
                  </td>
                  <td>
                    {record.supportingdoc ? (
                      <a href={record.supportingdoc} target="_blank" rel="noopener noreferrer">
                        <FaFileAlt />
                      </a>
                    ) : (
                      'N/A'
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No leave history available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="leave-balance">
      <h1 className='title'>Remaining Leave Balance</h1>
        <div className="balance-grid">
          <div className="balance-item">Annual Leave<br />Remaining: {annualLeave} days</div>
          <div className="balance-item">Sick Leave<br />Remaining: {sickLeave} days</div>
          <div className="balance-item">Personal Leave<br />Remaining: {personalLeave} days</div>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />

    </div>
  );
};

export default Historie;
