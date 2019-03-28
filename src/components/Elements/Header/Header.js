import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import Logo from '../../../assets/images/popcorn.png';
import logoC from '../../../assets/images/tmdb_logo.png';

const Header = () => {
    return (
        <div className="rmdb-header">
            <div className="rmdb-header-content">
                <Link to="/">
                    <img className="rmdb-logo" src={Logo} alt="logo" style={{height: '50px', width: '50px'}}/>
                </Link>
                <img className="rmdb-tmdb-logo" src={logoC} alt="alogo" />
            </div>
        </div>
    )
}

export default Header;