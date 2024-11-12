import React from 'react';
import './ZeroTrnmt.css';
import unavailable from '../../assets/images/unavailableicon2.png';


const ZeroTrnmt = () => {
  return (
    <div className='zerot-container'>


        <img src={unavailable} alt="" className='un-img' />
        <div className="zero-message">
            <h1>No Tournaments Registered</h1>
        </div>
      
    </div>
  )
}

export default ZeroTrnmt
