import React from 'react';
import '../styles/Header.scss';
import logo from '../img/logo.png';

const Header = () => {
  return (
    <header>
      <img className="logo" src={logo} alt="logo" />
      <h1>THUMBNAIL EDITOR</h1>
    </header>
  );
};

export default Header;
