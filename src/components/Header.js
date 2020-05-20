import React from 'react';
import '../styles/Header.scss';
import logo from '../img/logo.png';
import Save from './Save';

const Header = () => {
  return (
    <header>
      <div className="logo-container">
        <img className="logo" src={logo} alt="logo" />
        <h1>THUMBNAIL EDITOR</h1>
      </div>
      <Save />
    </header>
  );
};

export default Header;
