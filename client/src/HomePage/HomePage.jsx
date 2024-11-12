import React, { useState } from 'react';
import './HomePage.css';
import pubgicon from '../assets/images/pubgicon.png';
import csgoicon from '../assets/images/csgoicon.png';
import apexicon from '../assets/images/apexlegendsicon.png';
import RegistrationModal from '../Components/RegisterModal/RegisterModal';

const HomePage = () => {
  const [selectedGame, setSelectedGame] = useState(null);
  const [selectedMode, setSelectedMode] = useState(null);

  const handleRegisterClick = (game) => {
    setSelectedGame(game);
  };

  const handleModeSelect = (mode) => {
    setSelectedMode(mode);
  };

  const closeModal = () => {
    setSelectedGame(null);
    setSelectedMode(null);
  };

  return (
    <div className='home-container'>
      {[{
          name: 'PUBG MOBILE',
          icon: pubgicon,
          fee: '$20',
          bonus: '$6',
          win: '$150',
          modes: ['Erangel', 'Miramar'],
          date: '2024-02-20',
        },
        {
          name: 'CS: GO',
          icon: csgoicon,
          fee: '$15',
          bonus: '$5',
          win: '$100',
          modes: ['Bomb Defusal', 'Deathmatch'],
          date: '2024-02-25',
        },
        {
          name: 'Apex Legends',
          icon: apexicon,
          fee: '$10',
          bonus: '$4',
          win: '$120',
          modes: ['Battle Royale', 'Ranked'],
          date: '2024-03-01',
        },
      ].map((game, index) => (
        <div key={index} className='text-white home-block'>
          <div className='game-header'>
            <img src={game.icon} alt={`${game.name} Icon`} />
            <h1>{game.name}</h1>
          </div>
          <div className='info-sec'>
            <h1>Registration Fee: <span className='fee amount'>{game.fee}</span></h1>
            <h1>Opponent Elimination Bonus: <span className='elim amount'>{game.bonus}</span></h1>
            <h1>Victory Bonus: <span className='win amount'>{game.win}</span></h1>
          </div>
          <div className='game-mode'>
            <div className='gm'>
              <h1>Game Mode:</h1>
              {game.modes.map((mode, idx) => (
                <div
                  key={idx}
                  className={`mode${index * 2 + idx + 1}`}
                  onClick={() => handleModeSelect(mode)}
                >
                  {mode}
                </div>
              ))}
            </div>
          </div>
          <div className='players-joined'>
            <h1>Players Joined: <span className='player-count'>0/100</span></h1>
          </div>
          <button
            type='button'
            className='game-register-btn'
            onClick={() => handleRegisterClick(game)}
          >
            Register
          </button>
          <span className='tournament-date'>{game.date}</span>
        </div>
      ))}

      {selectedGame && (
        <RegistrationModal
          game={selectedGame}
          selectedMode={selectedMode}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default HomePage;
