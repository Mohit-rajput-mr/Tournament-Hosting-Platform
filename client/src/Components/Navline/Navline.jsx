import React, { useState } from 'react';
import './Navline.css';
import Logo from '../../assets/images/logo.png';
import hamburger from '../../assets/images/menuicon.png';
import closeIcon from '../../assets/images/closeicon.png';
import profile from '../../assets/images/profile.png';
import searchicon from '../../assets/images/searchicon.webp';
import WithdrawComponent from '../WithdrawComponent/WithdrawComponent';
import DepositComponent from '../DepositComponent/DepositComponent';

const Navline = ({ onLoginClick, onTournamentClick, onDashboardClick, username }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [showBalanceOptions, setShowBalanceOptions] = useState(false);
    const [showWithdraw, setShowWithdraw] = useState(false);
    const [showDeposit, setShowDeposit] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        alert('Searching for: ' + searchTerm);
        setSearchTerm('');
    };

    const handleWithdrawClick = () => {
        setShowWithdraw(true);
        setShowDeposit(false);
    };

    const handleDepositClick = () => {
        setShowDeposit(true);
        setShowWithdraw(false);
    };

    return (
        <div className="Nav-wrapper">
            <div className='Nav-container'>
                <img src={Logo} alt="Logo" className='logo' />

                {/* Search Section for tablets */}
                <div className="tablet-search">
                    <form onSubmit={handleSearch} className="search-section">
                        <input
                            type="text"
                            className='search-input'
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button type="submit" className='search-btn'>
                            <img src={searchicon} alt="Search" className='menu-icon' />
                        </button>
                    </form>
                </div>

                {/* Hamburger Menu */}
                <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
                    <img src={isOpen ? closeIcon : hamburger} alt="Menu" />
                </div>

                <div className={`navline ${isOpen ? 'open' : ''}`}>
                    <ul>
                        {/* Search Section for mobile inside navline */}
                        <li className="nav-item mobile-search">
                            <form onSubmit={handleSearch} className="search-section">
                                <input
                                    type="text"
                                    className='search-input'
                                    placeholder="Search..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <button type="submit" className='search-btn'>
                                    <img src={searchicon} alt="Search" className='menu-icon' />
                                </button>
                            </form>
                        </li>

                        <li className="nav-item" onClick={() => window.location.href = '/'}>Home</li>
                        <li className="nav-item" onClick={onDashboardClick}>Dashboard</li>
                        <li className="nav-item" onClick={onTournamentClick}>Tournaments</li>
                        <li className="nav-item">Payments</li>
                        <li className="nav-item">Support</li>
                        <li className="nav-item">About</li>
                        <li
                            className="nav-item balance-nav"
                            onMouseEnter={() => setShowBalanceOptions(true)}
                            onMouseLeave={() => setShowBalanceOptions(false)}
                        >
                            <div className="user-balance">
                                Balance: <span className='user-balance-count'>0$</span>
                                <div className={`balance-options ${showBalanceOptions ? 'show' : ''}`}>
                                    <div className="balance-subsec">
                                        <button className='balance-btn' onClick={handleWithdrawClick}>Withdraw</button>
                                        <button className='balance-btn' onClick={handleDepositClick}>Deposit</button>
                                    </div>
                                </div>
                            </div>
                        </li>

                        {/* Show username if logged in, else show Login/Signup */}
                        {username ? (
                            <li className="nav-item user-info">
                                Welcome, {username} <img src={profile} alt="Profile" className="profile" />
                            </li>
                        ) : (
                            <li className="nav-item login-signup" onClick={onLoginClick}>
                                Login/Signup <img src={profile} alt="Profile" className="profile" />
                            </li>
                        )}
                    </ul>
                </div>

                {/* Show Withdraw or Deposit component */}
                {showWithdraw && <WithdrawComponent onClose={() => setShowWithdraw(false)} />}
                {showDeposit && <DepositComponent onClose={() => setShowDeposit(false)} />}
            </div>
        </div>
    );
};

export default Navline;
