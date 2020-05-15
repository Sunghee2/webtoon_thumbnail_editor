import React from 'react';
import './styles/reset.scss';
import './styles/base.scss';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import { AddTextProvider } from './context/AddTextContext';

const App = () => {
  return (
    <div className="App">
      <Header />
      <AddTextProvider>
        <Main />
      </AddTextProvider>
    </div>
  );
};

export default App;
