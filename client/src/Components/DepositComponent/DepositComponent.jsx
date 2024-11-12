import React, { useState } from 'react';
import './DepositComponent.css';
import mastercard from '../../assets/images/mastercard.webp';
import paypal from '../../assets/images/paypal.png';

const DepositComponent = ({ onClose }) => {
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (amount === '' || amount <= 0) {
      setError('Please enter a valid amount.');
    } else if (selectedMethod === '') {
      setError('Please select a payment method.');
    } else {
      setError('');
      setLoading(true);
      // Simulate loading
      setTimeout(() => {
        setLoading(false);
        alert(`Deposit Successful via ${selectedMethod}`);
      }, 2000);
    }
  };

  const selectPaymentMethod = (method) => {
    setSelectedMethod(method);
  };

  return (
    <div className="deposit-container">
      <div className="deposit-content">
        <h2>Deposit Funds</h2>
        <button className="close-btn" onClick={onClose}>X</button>
        <form onSubmit={handleSubmit}>
          <div className="deposit-form">
            <label htmlFor="" className='currency'>EUR</label>
            <h1>Payment Method</h1>
            <div className="pay-met">
              <div 
                className={`card hover-effect ${selectedMethod === 'MasterCard' ? 'selected' : ''}`}
                onClick={() => selectPaymentMethod('MasterCard')}
              >
                 <img src={mastercard} alt="MasterCard" className='pay-img' />
              </div>
              <div 
                className={`paypal hover-effect ${selectedMethod === 'PayPal' ? 'selected' : ''}`}
                onClick={() => selectPaymentMethod('PayPal')}
              >
                <img src={paypal} alt="PayPal" className='pay-img' />
              </div>
            </div>
            {selectedMethod && <p className="selected-msg">You have selected: {selectedMethod}</p>}
          </div>

          <input 
            type="number" 
            placeholder="Enter amount" 
            value={amount} 
            onChange={(e) => setAmount(e.target.value)} 
          />
          {error && <p className="error-msg">{error}</p>}
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? <div className="loading-spinner"></div> : 'Deposit'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default DepositComponent;
