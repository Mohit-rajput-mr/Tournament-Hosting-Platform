import React, { useState } from 'react';
import './Register.css';
import closeicon from '../../assets/images/closeicon.png';
import emailjs from 'emailjs-com';

const Register = ({ isVisible, onLoginClick, onCloseClick }) => {
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [alertMessage, setAlertMessage] = useState('');
    const [showAlert, setShowAlert] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Function to send email using EmailJS
    const sendEmail = () => {
        const templateParams = {
            to_name: formData.name,
            to_email: formData.email,
            from_name: 'Blooper Zone Team',
            message: 'Thank you for registering with us!',
        };

        emailjs.send('service_i7snbid', 'template_sk4zsal', templateParams, 'EqdTxbt9OSnEteq3y')
            .then((response) => {
                console.log('SUCCESS! Email sent:', response.status, response.text);
            }, (err) => {
                console.log('FAILED to send email...', err);
            });
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        // Simple password match validation
        if (formData.password !== formData.confirmPassword) {
            setAlertMessage("Passwords do not match");
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 3000);
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (response.ok) {
                setAlertMessage(data.message || 'Registration successful');
                setShowAlert(true);
                sendEmail(); // Send email notification after successful registration
                setTimeout(() => {
                    setShowAlert(false);
                    onCloseClick();
                    onLoginClick(); // Redirect to login modal after successful registration
                }, 3000);
            } else {
                setAlertMessage(data.error || 'Registration failed');
                setShowAlert(true);
                setTimeout(() => setShowAlert(false), 3000);
            }
        } catch (error) {
            console.error('Error:', error);
            setAlertMessage('Registration error');
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 3000);
        }
    };

    return (
        <div className={`register-modal ${isVisible ? 'show' : ''}`}>
            <div className="register-container">
                <img src={closeicon} alt="Close" className="close-icon" onClick={onCloseClick} />
                <h1 className="register-title">Register</h1>
                <form onSubmit={handleRegister} className="register-form">
                    {['name', 'surname', 'username', 'email', 'password', 'confirmPassword'].map((field, index) => (
                        <div className="form-group" key={index}>
                            <label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                            <input 
                                type={field.includes("password") ? "password" : "text"} 
                                id={field} 
                                name={field} 
                                value={formData[field]} 
                                onChange={handleChange} 
                                required 
                                placeholder={`Enter ${field.charAt(0).toUpperCase() + field.slice(1)}`} 
                            />
                        </div>
                    ))}
                    <button type="submit" className="register-button">Register</button>
                    <div className="login-prompt">
                        <span>Already have an account?</span>
                        <button type="button" className="login-button" onClick={onLoginClick}>Login</button>
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

export default Register;
