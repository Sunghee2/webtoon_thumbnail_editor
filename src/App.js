import React from 'react';
import './styles/reset.scss';
import './styles/base.scss';
import Header from './components/Header';
import Main from './components/Main';
// import Footer from './components/Footer';
import History from './components/History';

const App = () => {
  return (
    <div className="App">
      <Header />
      <Main />
      <History />
    </div>
  );
};

export default App;
