import React, { useState, useEffect } from 'react';
import './RegisterModal.css';
import sloticon from '../../assets/images/sloticon.jpg';

const RegisterModal = ({ onClose, selectedMode: initialMode }) => {
  const [email, setEmail] = useState('');
  const [selectedMode, setSelectedMode] = useState(initialMode || null);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const slots = Array.from({ length: 100 }, (_, index) => index + 1);

  useEffect(() => {
    if (initialMode) {
      setSelectedMode(initialMode);
    }
  }, [initialMode]);

  const handleRegister = (e) => {
    e.preventDefault();
    if (!email || !selectedMode || selectedSlots.length === 0) {
      alert('Please fill all the details before registering!');
      return;
    }
    console.log('User Registered:', { email, selectedMode, selectedSlots });
    alert('Registration successful!');
    onClose();
  };

  const handleSlotSelect = (slot) => {
    setSelectedSlots((prev) => {
      if (prev.includes(slot)) {
        return prev.filter((s) => s !== slot);
      } else {
        return [...prev, slot];
      }
    });
  };

  const handleModeSelect = (mode) => {
    setSelectedMode(mode);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>X</button>
        <h2>Register for Game</h2>
        <input
          type="email"
          className="email-input"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        
        <div className="mode-selection">
          {['Mode 1', 'Mode 2'].map((mode) => (
            <div
              key={mode}
              className={`mode ${selectedMode === mode ? 'selected' : ''}`}
              onClick={() => handleModeSelect(mode)}
            >
              {mode}
            </div>
          ))}
        </div>

        <div className="team-selection">
          <div className="column-container">
            {slots.map((slot) => (
              <div
                key={slot}
                className={`slot ${selectedSlots.includes(slot) ? 'selected' : ''}`}
                onClick={() => handleSlotSelect(slot)}
              >
                Slot {slot}
              </div>
            ))}
          </div>
        </div>

        <button className="game-register-btn max-sm:top-[97px] max-sm:absolute max-sm:w-[30%]" onClick={handleRegister}>
          Register
        </button>
      </div>
    </div>
  );
};

export default RegisterModal;
