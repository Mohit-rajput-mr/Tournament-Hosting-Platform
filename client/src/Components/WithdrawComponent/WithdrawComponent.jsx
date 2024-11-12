import React, { useState } from 'react';
import './WithdrawComponent.css';
import paypal from '../../assets/images/paypal.png';
import banktrf from '../../assets/images/banktransfer.png';

const WithdrawComponent = ({ onClose }) => {
  const [selectedMethod, setSelectedMethod] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedMethod) {
      setError('Please select a withdrawal method.');
    } else if (!amount || amount <= 0) {
      setError('Please enter a valid amount.');
    } else {
      setError('');
      setLoading(true);
      // Simulate backend call
      setTimeout(() => {
        setLoading(false);
        alert(`Withdrawal of ${amount} via ${selectedMethod} successful!`);
      }, 2000);
    }
  };

  const selectWithdrawalMethod = (method) => {
    setSelectedMethod(method);
    setError(''); // Clear error when method is selected
  };

  return (
    <div className="withdraw-container">
      <div className="withdraw-content">
        <h2>Withdraw Funds</h2>
        <button className="close-btn" onClick={onClose}>X</button>

        <h1>Select Withdrawal Method</h1>
        <div className="withdrawal-option">
          <div 
            className={`withdraw-method ${selectedMethod === 'Bank Transfer' ? 'selected' : ''}`} 
            onClick={() => selectWithdrawalMethod('Bank Transfer')}
          >
            <img src={banktrf} alt="Bank Transfer" className='withdraw-img' />
          </div>
          <div 
            className={`withdraw-method ${selectedMethod === 'PayPal' ? 'selected' : ''}`} 
            onClick={() => selectWithdrawalMethod('PayPal')}
          >
            <img src={paypal} alt="PayPal" className='withdraw-img' />
          </div>
        </div>

        {selectedMethod && <p className="selected-msg">You have selected: {selectedMethod}</p>}

        <form onSubmit={handleSubmit}>
          <label>Amount:</label>
          <input 
            type="number" 
            placeholder="Enter amount" 
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          {error && <p className="error-msg">{error}</p>}
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? <div className="loading-spinner"></div> : 'Withdraw'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default WithdrawComponent;
