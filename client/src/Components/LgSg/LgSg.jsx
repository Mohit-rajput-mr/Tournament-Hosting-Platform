import React, { useState } from 'react';
import './LgSg.css';
import closeicon from '../../assets/images/closeicon.png';

const LgSg = ({ isVisible, onRegisterClick, onCloseClick, onLoginSuccess }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [showAlert, setShowAlert] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();
            if (response.ok) {
                setAlertMessage(data.message || 'Login successful');
                setShowAlert(true);
                localStorage.setItem('token', data.token);
                onLoginSuccess(username);
                setTimeout(() => {
                    setShowAlert(false);
                    onCloseClick();
                }, 3000);
            } else {
                setAlertMessage(data.error || 'Login failed');
                setShowAlert(true);
                setTimeout(() => setShowAlert(false), 3000);
            }
        } catch (error) {
            console.error('Error:', error);
            setAlertMessage('Login error');
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 3000);
        }
    };

    return (
        <div className={`login-modal ${isVisible ? 'show' : ''}`}>
            <div className="login-container">
                <img src={closeicon} alt="Close" className="close-icon" onClick={onCloseClick} />
                <h1 className="login-title">Login</h1>
                <form onSubmit={handleLogin} className="login-form">
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input 
                            type="text" 
                            id="username" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                            required 
                            placeholder="Enter Username" 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            id="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                            placeholder="Enter Password" 
                        />
                    </div>
                    <button type="submit" className="login-button">Login</button>
                    <div className="register-prompt">
                        <span>New? Create an account!</span>
                        <button type="button" className="register-button" onClick={onRegisterClick}>Register</button>
                    </div>
                </form>
                {showAlert && (
                    <div className="alert-box">
                        <p>{alertMessage}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LgSg;
