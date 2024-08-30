import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import CountUp from 'react-countup';
import { Pie, Line } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title } from 'chart.js';
import axios from 'axios';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title);

const DashboardVac = ({ isCollapsed, isDarkMode }) => {
  const [genderData, setGenderData] = useState({ labels: [], datasets: [] });
  const [ageData, setAgeData] = useState({ labels: [], datasets: [] });
  const [degreeData, setDegreeData] = useState({ labels: [], datasets: [] });
  const [employeeCounts, setEmployeeCounts] = useState({});
  const [degreeCountsByDepartment, setDegreeCountsByDepartment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [genderRes, ageRes, degreeRes, employeeRes, degreeByDeptRes] = await Promise.all([
          axios.get('http://localhost:5000/conges/count-by-type'),
          axios.get('http://localhost:5000/conges/count-by-status'),
          axios.get('http://localhost:5000/users/degree-count'),
          axios.get('http://localhost:5000/conges/count-special-types'),
          axios.get('http://localhost:5000/conges/conge-status-by-type')
        ]);

        setGenderData({
          labels: genderRes.data.labels,
          datasets: [{ label: 'Type Distribution', data: genderRes.data.data, backgroundColor: ['#4069E5', '#C5D1F7','#98AFF2'] }]
        });

        setAgeData({
          labels: ageRes.data.labels,
          datasets: [{ label: 'Status Distribution', data: ageRes.data.data, backgroundColor: ['#4069E5', '#C5D1F7', '#98AFF2'] }]
        });

        setDegreeData({
          labels: degreeRes.data.labels,
          datasets: [{ label: 'Degree Distribution', data: degreeRes.data.data, backgroundColor: ['#4069E5', '#C5D1F7', '#98AFF2'] }]
        });

        setEmployeeCounts(employeeRes.data);
        setDegreeCountsByDepartment(degreeByDeptRes.data);
        
        setError(null);
      } catch (err) {
        setError('Failed to fetch data');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const data = {
    labels: ['Accepted', 'Refused'],
    datasets: degreeCountsByDepartment.map((item, index) => ({
      label: item.congeType,
      data: item.data,
      fill: false,
      borderColor: ['#c4d5f9', '#9cb9f4', '#6d95ed', '#4069e5'][index % 4],
    })),
  };

  const options = {
    scales: {
      y: { beginAtZero: true },
    },
  };
  const totalLeaves = Object.values(employeeCounts).reduce((sum, count) => sum + count, 0);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={`dashboard ${isCollapsed ? 'collapsed' : ''} ${isDarkMode ? 'dark-mode' : ''} `}>
      <h1 className="title">Administrateur Dashboard of vacations</h1>

      {/* Employee Counts */}
      {Object.entries(employeeCounts).map(([key, count]) => (
        <div key={key} className={`dashboard-section5 ${isCollapsed ? 'collapsed' : ''} ${isDarkMode ? 'dark-mode' : ''}`}>
          <div className='inlinesss'>
          <h2 className={`color ${isDarkMode ? 'dark-mode' : ''}`}>{key}</h2>
          <p className="employee-number">
            <CountUp end={count} duration={2} style={{ color: '#4069E5' }} />
          </p>
          </div>
          
        </div>
      ))}
<div className={`dashboard-section6 ${isCollapsed ? 'collapsed' : ''} ${isDarkMode ? 'dark-mode' : ''}`}>
        <div className='inlinesss'>
          <h2 className={`color ${isDarkMode ? 'dark-mode' : ''}`}>Total Leaves</h2>
          <p className="employee-number">
            <CountUp end={totalLeaves} duration={2} style={{ color: '#4069E5' }} />
          </p>
        </div>
      </div>




      <div className='as'>
      <div className='asz'>
      {/* Line Chart */}
      <div className={`dashboard-section2 ${isCollapsed ? 'collapsed' : ''} ${isDarkMode ? 'dark-mode' : ''} `}>
        <h2 className={`color ${isDarkMode ? 'dark-mode' : ''}`}>Status Distribution by Type</h2>
        <Line data={data} options={options} />
      </div>
      {/* Degree Distribution Chart */}
      <div className={`dashboard-section3 ${isCollapsed ? 'collapsed' : ''} ${isDarkMode ? 'dark-mode' : ''}`}>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>

      </div>
      </div>

      <div className='asz'>
      {/* Gender Chart */}
      <div className={`dashboard-section1 ${isCollapsed ? 'collapsed' : ''} ${isDarkMode ? 'dark-mode' : ''}`}>
        <h2  className={`color ${isDarkMode ? 'dark-mode' : ''}`}>Type Distribution</h2>
        <Pie data={genderData} />
      </div>

      {/* Age Distribution Chart */}
      <div className={`dashboard-section1 ${isCollapsed ? 'collapsed' : ''} ${isDarkMode ? 'dark-mode' : ''}`}>
        <h2  className={`color ${isDarkMode ? 'dark-mode' : ''}`}>Status Distribution</h2>
        <Pie data={ageData} />
      </div>
      </div>
      </div>
      </div>  
  );
};

export default DashboardVac;