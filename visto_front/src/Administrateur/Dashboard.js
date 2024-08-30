import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import CountUp from 'react-countup';
import { Pie, Line } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title } from 'chart.js';
import axios from 'axios';
import Copyright from '../copyright/Copyright';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title);

const Dashboard = ({ isCollapsed, isDarkMode }) => {
  const [genderData, setGenderData] = useState({ labels: [], datasets: [] });
  const [ageData, setAgeData] = useState({ labels: [], datasets: [] });
  const [degreeData, setDegreeData] = useState({ labels: [], datasets: [] });
  const [employeeCounts, setEmployeeCounts] = useState({
    Permanent: 0,
    Contract: 0,
    Freelance: 0,
    Intern: 0,
  });
  const [degreeCountsByDepartment, setDegreeCountsByDepartment] = useState([]);

  useEffect(() => {
    const fetchGenderData = async () => {
      const response = await axios.get('http://localhost:5000/users/gender-count');
      setGenderData({
        labels: response.data.labels,
        datasets: [
          {
            label: 'Gender Distribution',
            data: response.data.data,
            backgroundColor: ['#4069E5', '#C5D1F7'],
          },
        ],
      });
    };

    const fetchAgeData = async () => {
      const response = await axios.get('http://localhost:5000/users/age-count');
      setAgeData({
        labels: response.data.labels,
        datasets: [
          {
            label: 'Age Distribution',
            data: response.data.data,
            backgroundColor: ['#4069E5', '#C5D1F7', '#98AFF2'],
          },
        ],
      });
    };

    const fetchDegreeData = async () => {
      const response = await axios.get('http://localhost:5000/users/degree-count');
      setDegreeData({
        labels: response.data.labels,
        datasets: [
          {
            label: 'Degree Distribution',
            data: response.data.data,
            backgroundColor: ['#4069E5', '#C5D1F7', '#98AFF2'],
          },
        ],
      });
    };

    const fetchDegreeCountsByDepartment = async () => {
      try {
        const response = await axios.get('http://localhost:5000/users/degree-count-by-department');
        setDegreeCountsByDepartment(response.data);
      } catch (error) {
        console.error('Error fetching degree counts by department:', error);
      }
    };

    fetchGenderData();
    fetchAgeData();
    fetchDegreeData();
    fetchDegreeCountsByDepartment();
  }, []);

  useEffect(() => {
    fetchEmployeeCounts();
  }, []);

  const fetchEmployeeCounts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/users/count-by-state');
      const { Permanent, Contract, Freelance, Intern } = response.data;
      setEmployeeCounts({ Permanent, Contract, Freelance, Intern });
    } catch (error) {
      console.error('Error fetching employee counts:', error);
    }
  };

  // Prepare data for Line chart
  const data = {
    labels: ['Licence Degree', 'Engineering Degree', 'Master Degree'],
    datasets: degreeCountsByDepartment.map((item, index) => ({
      label: item.department,
      data: item.data,
      fill: false,
      borderColor: ['#c4d5f9', '#9cb9f4', '#6d95ed', '#4069e5'][index % 4], // Use specific colors directly
    })),
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className={`dashboard ${isCollapsed ? 'collapsed' : ''} ${isDarkMode ? 'dark-mode' : ''} `}>
      <h1 className="title">Administrateur Dashboard</h1>

      {/* Employee Counts */}
      <div className={`dashboard-section ${isDarkMode ? 'dark-mode' : ''}`}>
        <div className='inlinesss'>
        <h2 className={`color ${isDarkMode ? 'dark-mode' : ''}`}>Permanent Employees</h2>
        <p className="employee-number">
          <CountUp end={employeeCounts.Permanent} duration={2} style={{ color: '#4069E5' }} />
        </p>
        </div>
      </div>
      <div className={`dashboard-section ${isDarkMode ? 'dark-mode' : ''}`}>
      <div className='inlinesss'>
        <h2 className={`color ${isDarkMode ? 'dark-mode' : ''}`}>Contract Employees</h2>
        <p className="employee-number">
          <CountUp end={employeeCounts.Contract} duration={2} style={{ color: '#4069E5' }} />
        </p>
      </div>
      </div>

      <div className={`dashboard-section ${isDarkMode ? 'dark-mode' : ''}`}>
      <div className='inlinesss'>
        <h2 className={`color ${isDarkMode ? 'dark-mode' : ''}`}>Freelance Employees</h2>
        <p className="employee-number">
          <CountUp end={employeeCounts.Freelance} duration={2} style={{ color: '#4069E5' }} />
        </p>
      </div>
      </div>

      <div className={`dashboard-section ${isDarkMode ? 'dark-mode' : ''}`}>
      <div className='inlinesss'>
        <h2 className={`color ${isDarkMode ? 'dark-mode' : ''}`}>Intern Employees</h2>
        <p className="employee-number">
          <CountUp end={employeeCounts.Intern} duration={2} style={{ color: '#4069E5' }} />
        </p>
        </div>

      </div>
      <div className='as'>
      <div className='asz'>
      <div className={`dashboard-section2 ${isCollapsed ? 'collapsed' : ''} ${isDarkMode ? 'dark-mode' : ''} `}>
        <h2 className={`color ${isDarkMode ? 'dark-mode' : ''}`}>Degree Distribution by Department</h2>
        <Line data={data} options={options} />
      </div>
      {/* Degree Distribution Chart */}
      <div className={`dashboard-section3 ${isDarkMode ? 'dark-mode' : ''}`}>
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
        <h2 className={`color ${isDarkMode ? 'dark-mode' : ''}`}>Gender Distribution</h2>
        <Pie data={genderData} />
      </div>

      {/* Age Distribution Chart */}
      <div className={`dashboard-section1 ${isCollapsed ? 'collapsed' : ''} ${isDarkMode ? 'dark-mode' : ''}`}>
        <h2 className={`color ${isDarkMode ? 'dark-mode' : ''}`}>Age Distribution</h2>
        <Pie data={ageData} />
      </div>
      </div>
      </div>
      

      

      <Copyright />
    </div>
  );
};

export default Dashboard;








// import React, { useState, useEffect } from 'react';
// import './Dashboard.css';
// import Navbar from '../Navbaradmin/Navbar ';
// import CountUp from 'react-countup';
// import { Pie, Line } from 'react-chartjs-2';
// import axios from 'axios';

// const Dashboard = () => {
//     const [employeeCounts, setEmployeeCounts] = useState({
//         permanent: 0,
//         contract: 0,
//         freelance: 0,
//         intern: 0,
//     });

//     const [genderData, setGenderData] = useState({ labels: [], datasets: [] });
//     const [ageData, setAgeData] = useState({ labels: [], datasets: [] });
//     const [degreeData, setDegreeData] = useState({ labels: [], datasets: [] });

//     useEffect(() => {
//         // Fetch employee counts by type (permanent, contract, freelance, intern)
//         const fetchEmployeeCounts = async () => {
//             try {
//                 const response = await axios.get('http://localhost:5000/users/count-by-type');
//                 const { permanent, contract, freelance, intern } = response.data;
//                 setEmployeeCounts({ permanent, contract, freelance, intern });
//             } catch (error) {
//                 console.error('Error fetching employee counts:', error);
//             }
//         };

//         // Fetch gender distribution data
//         const fetchGenderData = async () => {
//             try {
//                 const response = await axios.get('http://localhost:5000/users/gender-distribution');
//                 setGenderData({
//                     labels: response.data.labels,
//                     datasets: [
//                         {
//                             label: 'Gender Distribution',
//                             data: response.data.data,
//                             backgroundColor: ['#4069E5', '#C5D1F7'],
//                         },
//                     ],
//                 });
//             } catch (error) {
//                 console.error('Error fetching gender data:', error);
//             }
//         };

//         // Fetch age distribution data
//         const fetchAgeData = async () => {
//             try {
//                 const response = await axios.get('http://localhost:5000/users/age-distribution');
//                 setAgeData({
//                     labels: response.data.labels,
//                     datasets: [
//                         {
//                             label: 'Age Distribution',
//                             data: response.data.data,
//                             backgroundColor: ['#4069E5', '#C5D1F7', '#98AFF2'],
//                         },
//                     ],
//                 });
//             } catch (error) {
//                 console.error('Error fetching age data:', error);
//             }
//         };

//         // Fetch degree distribution data
//         const fetchDegreeData = async () => {
//             try {
//                 const response = await axios.get('http://localhost:5000/users/degree-distribution');
//                 setDegreeData({
//                     labels: response.data.labels,
//                     datasets: [
//                         {
//                             label: 'Degree Distribution',
//                             data: response.data.data,
//                             backgroundColor: ['#4069E5', '#C5D1F7', '#98AFF2'],
//                         },
//                     ],
//                 });
//             } catch (error) {
//                 console.error('Error fetching degree data:', error);
//             }
//         };

//         // Execute all data fetching functions
//         fetchEmployeeCounts();
//         fetchGenderData();
//         fetchAgeData();
//         fetchDegreeData();
//     }, []);

//     const data = {
//         labels: ['Licence Degree', 'Engineering Degree', 'Master Degree'],
//         datasets: [
//             {
//                 label: 'Employee Numbers by Department',
//                 data: [12, 19, 3],
//                 fill: false,
//                 backgroundColor: 'rgba(0,0,0,0)',
//                 borderColor: '#4069E5',
//             },
//             {
//                 label: 'Department B',
//                 data: [2, 3, 20],
//                 fill: false,
//                 backgroundColor: 'rgba(0,0,0,0)',
//                 borderColor: '#C5D1F7',
//             },
//             {
//                 label: 'Department C',
//                 data: [3, 10, 13],
//                 fill: false,
//                 backgroundColor: 'rgba(0,0,0,0)',
//                 borderColor: '#98AFF2',
//             },
//         ],
//     };

//     // Options for the line chart
//     const options = {
//         scales: {
//             y: {
//                 beginAtZero: true,
//             },
//         },
//     };

//     return (
//         <div>
//             <Navbar /> {/* Ensure your Navbar component is correctly imported and placed */}
//             <div className="dashboard">
//                 <h1 className="dashboard-title">Administrateur Dashboard</h1>

//                 {/* Employee Counts */}
//                 <div className="dashboard-section">
//                     <h2>Permanent Employees</h2>
//                     <p className="employee-number">
//                         <CountUp end={employeeCounts.permanent} duration={2} style={{ color: 'black' }} />
//                     </p>
//                 </div>
//                 <div className="dashboard-section">
//                     <h2>Contract Employees</h2>
//                     <p className="employee-number">
//                         <CountUp end={employeeCounts.contract} duration={2} style={{ color: 'black' }} />
//                     </p>
//                 </div>
//                 <div className="dashboard-section">
//                     <h2>Freelance Employees</h2>
//                     <p className="employee-number">
//                         <CountUp end={employeeCounts.freelance} duration={2} style={{ color: 'black' }} />
//                     </p>
//                 </div>
//                 <div className="dashboard-section">
//                     <h2>Intern Employees</h2>
//                     <p className="employee-number">
//                         <CountUp end={employeeCounts.intern} duration={2} style={{ color: 'black' }} />
//                     </p>
//                 </div>

//                 {/* Gender Distribution Chart */}
//                 <div className="dashboard-section1">
//                     <h2>Gender Distribution</h2>
//                     <Pie data={genderData} />
//                 </div>

//                 {/* Age Distribution Chart */}
//                 <div className="dashboard-section1">
//                     <h2>Age Distribution</h2>
//                     <Pie data={ageData} />
//                 </div>

//                 {/* Degree Distribution Chart */}
//                 <div className="dashboard-section1">
//                     <h2>Degree Distribution</h2>
//                     <Pie data={degreeData} />
//                 </div>

//                 {/* Employee Numbers by Department Chart */}
//                 <div className="dashboard-section2">
//                     <h2>Employee Numbers by Department</h2>
//                     <Line data={data} options={options} />
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Dashboard;
