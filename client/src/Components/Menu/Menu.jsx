import React from 'react';
import { Link } from 'react-router-dom';
import hiicon from '../../assets/images/hiiicon.webp';
import linkicon from '../../assets/images/linkicon.png';
import notificationicon from '../../assets/images/notificon.png';
import filtericon from '../../assets/images/filtericon.png';
import calendericon from '../../assets/images/calendericon.png';
import supporticon from '../../assets/images/supporticon.png';
import settingsicon from '../../assets/images/settingsicon.png';
import promoicon from '../../assets/images/promoicon.png';
import './Menu.css';

const Menu = () => {
    return (
        <div className="hidden menu-container lg:block">
            <ul className="menu-ul">
                <li className="menu-li">
                    <Link to="/" className="menu-a">
                        <img src={hiicon} alt="" className="menu-icon" /> Hi, User
                    </Link>
                </li>
                <li className="menu-li">
                    <Link to="/quick-links" className="menu-a">
                        <img src={linkicon} alt="" className="menu-icon" /> Quick Links
                    </Link>
                </li>
                <li className="menu-li">
                    <Link to="/notifications" className="menu-a">
                        <img src={notificationicon} alt="" className="menu-icon" /> Notification
                    </Link>
                </li>
                <li className="menu-li">
                    <Link to="/game-filters" className="menu-a">
                        <img src={filtericon} alt="" className="menu-icon" /> Game Filters
                    </Link>
                </li>
                <li className="menu-li">
                    <Link to="/event-calendar" className="menu-a">
                        <img src={calendericon} alt="" className="menu-icon" /> Event Calendar
                    </Link>
                </li>
                <li className="menu-li">
                    <Link to="/live-support" className="menu-a">
                        <img src={supporticon} alt="" className="menu-icon" /> Support (Live Chat)
                    </Link>
                </li>
                <li className="menu-li">
                    <Link to="/settings" className="menu-a">
                        <img src={settingsicon} alt="" className="menu-icon" /> Settings
                    </Link>
                </li>
                <li className="menu-li">
                    <Link to="/promotions" className="menu-a">
                        <img src={promoicon} alt="" className="menu-icon" /> Promotions
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Menu;
