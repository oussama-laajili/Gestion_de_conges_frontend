import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './Navbaradmin/UserProvider '; // Ensure the correct path to UserContext
import Login from './Login/Login';
import Loginspec from './Login/Loginspec'; // Example protected route
import ProtectedRoute from './utils/ProtectedRoute'; // Import the ProtectedRoute HOC
import Dashboard from './Administrateur/Dashboard';
import AddUser from './Administrateur/AddUser';
import Team from './Administrateur/Team';
import Navbar from './Navbaradmin/Navbar ';
import Profile from '../src/Navbaradmin/Profile';
import NavbarHori from './NavbarHori/NavbarHori';
import Calender from './calender/Calender';
import Calendar from './calender/Calendar';
import LeaveRequestForm from './Administrateur/LeaveRequestForm';
import Calendaar from './calender/Calendaar';
import CalendarExample from './Administrateur/schdule';
import Historie from './Administrateur/Historie';
import Navbar1 from './Navbaradmin/Navbar1';
import Navbar2 from './Navbaradmin/Navbar2';
import Navbar3 from './Navbaradmin/Navbar3';

function App() {
    return (
        <UserProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/special" element={<ProtectedRoute><Loginspec /></ProtectedRoute>} />
                    <Route path="/administrateur/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                    <Route path="/administrateur/add" element={<AddUser />} />
                    <Route path="/administrateur/team" element={<Team />} />
                    <Route path="/profile/:email" element={<Profile />} />
                    <Route path="/administrateur" element={<ProtectedRoute><Navbar /></ProtectedRoute>} />
                    <Route path="/teamleader" element={<ProtectedRoute><Navbar1 /></ProtectedRoute>} />
                    <Route path="/rh" element={<ProtectedRoute><Navbar2 /></ProtectedRoute>} />
                    <Route path="/employee" element={<ProtectedRoute><Navbar3 /></ProtectedRoute>} />

                    {/* Add more protected routes as needed */}
                </Routes>
            </Router>
        </UserProvider>
    );
}

export default App;







