import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import './LiveSupport.css';

const LiveSupportPage = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    const handleInputChange = (e) => {
        setInput(e.target.value);
        setIsTyping(true);
        setTimeout(() => setIsTyping(false), 1000); // Typing indicator ke liye
    };

    const handleSendMessage = async () => {
        if (input.trim()) {
            const newMessage = {
                user: 'User',
                text: input,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages([...messages, newMessage]);

            // EmailJS notification bhejne ka code
            emailjs.send(
                'service_qfd5c85', // Tera Service ID
                'template_8y1i7ry', // Tera Template ID
                { message: input }, // Yeh input message pass karega
                'EqdTxbt90SnEteq3y' // Tera Public Key
            ).then((response) => {
                console.log('Notification sent:', response.status, response.text);
                alert("Email notification sent successfully!");
            }).catch((error) => {
                console.error('Failed to send notification:', error);
                alert('Error in sending notification. Please check your EmailJS settings.');
            });

            setInput('');
            setIsTyping(false);
        }
    };

    return (
        <div className="live-chat-container">
            {/* Notification for API use */}
            <div className="api-notification">
                This live chat system is powered by EmailJS API to deliver real-time email notifications to the developer for every user query.
            </div>
            
            <h2>Live Support Chat</h2>
            <div className="chat-box">
                {messages.map((msg, index) => (
                    <div key={index} className={msg.user === 'User' ? 'user-message' : 'admin-message'}>
                        <div className="message-bubble">
                            <strong>{msg.user}</strong>
                            <p>{msg.text}</p>
                            <span className="timestamp">{msg.timestamp}</span>
                        </div>
                    </div>
                ))}
                {isTyping && <div className="typing-indicator">User is typing...</div>}
            </div>
            <div className="chat-input">
                <input
                    type="text"
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Type a message..."
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
};

export default LiveSupportPage;
