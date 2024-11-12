import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navline from './Components/Navline/Navline';
import Bgimg from './Components/Bgimg/Bgimg';
import LgSg from './Components/LgSg/LgSg';
import Register from './Components/Register/Register';
import Menu from './Components/Menu/Menu';
import ZeroTrnmt from './TournamentPage/ZeroTrnmt/ZeroTrnmt';
import HomePage from './HomePage/HomePage';
import DashBoard from './DashBoardPage/DashBoard';
import LiveSupportPage from './LiveSupportPage/LiveSupport';

const App = () => {
    const [showLogin, setShowLogin] = useState(null);
    const [username, setUsername] = useState(null); // New state to store logged-in username

    const handleRegisterClick = () => {
        setShowLogin(false);
    };

    const handleLoginClick = () => {
        setShowLogin(true);
    };

    const handleCloseClick = () => {
        setShowLogin(null);
    };

    // Function to handle successful login and set username
    const handleLoginSuccess = (loggedInUsername) => {
        setUsername(loggedInUsername);
        setShowLogin(null); // Close login modal after successful login
    };

    return (
        <Router>
            <div className='w-full mx-auto overflow-hidden'>
                <Bgimg />
                {/* Fixed Header containing Navline and Menu */}
                <div>
                    <Navline 
                        onLoginClick={handleLoginClick} 
                        onTournamentClick={() => window.location.href = '/TournamentPage'}
                        onDashboardClick={() => window.location.href = '/dashboard'}
                        username={username} // Passing username to Navline component
                    />
                    <Menu />
                </div>
                {/* Additional padding for the content below to ensure it starts below the fixed header */}
                <div style={{ paddingTop: '100px' }}>
                    {/* Conditional Login/Register Modal */}
                    {showLogin === true && (
                        <LgSg 
                            isVisible={showLogin} 
                            onRegisterClick={handleRegisterClick} 
                            onCloseClick={handleCloseClick} 
                            onLoginSuccess={handleLoginSuccess} // Pass login success handler to LgSg
                        />
                    )}
                    {showLogin === false && (
                        <Register 
                            isVisible={!showLogin} 
                            onLoginClick={handleLoginClick} 
                            onCloseClick={handleCloseClick} 
                        />
                    )}

                    {/* Route-based Rendering */}
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/dashboard" element={<DashBoard />} />
                        <Route path="/TournamentPage" element={<ZeroTrnmt />} />
                        <Route path="/live-support" element={<LiveSupportPage />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;
