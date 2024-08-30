// import React from 'react';
// import './NavbarHori.css';
// import { FaFlag, FaSun, FaBars } from 'react-icons/fa';

// const NavbarHori = () => {
//   return (
//     <div className="navbar">
//         <div className="nav-buttons-right">
//       <button className="nav-button menu-button">
//         <FaBars />
//       </button>
      
//         <button className="nav-button flag-button">
//           <FaFlag />
//         </button>
//         <button className="nav-button sun-button">
//           <FaSun />
//         </button>
//         <button className="nav-button profile-button">
//           <div className="profile-picture"></div>
//           <span className="profile-label">Profile</span>
//         </button>
//       </div>
//     </div>
//   );
// }

// export default NavbarHori;

import React from 'react';
import './NavbarHori.css';
import { FaBars, FaFlag, FaMoon, FaBell } from 'react-icons/fa';
import Navbar from '../Navbaradmin/Navbar ';

const NavbarHori = () => {
  return (
    <div className="navbar1">
      
      <div className="nav-left">
        <div className='left'>
        <button className="nav-button menu-button">
          <FaBars />
        </button>
      </div>
      <div className="nav-right">
        <button className="nav-button">
          <FaFlag />
        </button>
        <button className="nav-button">
          <FaMoon />
        </button>
        <button className="nav-button notification-button">
          <FaBell />
          <span className="notification-badge">3</span>
        </button>
        <button className="nav-button profile-button">
          <img src="path/to/profile-picture.jpg" alt="Profile" className="profile-picture" />
          <span className="profile-label">Admin</span>
          <span className="dropdown-icon">&#9662;</span>
        </button>
      </div>
    </div>
    </div>
  );
}

export default NavbarHori;
