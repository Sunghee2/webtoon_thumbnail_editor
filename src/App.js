import React from 'react';
import './styles/reset.scss';
import './styles/base.scss';
import Header from './components/Header';
import Main from './components/Main';
// import Footer from './components/Footer';
import { CropperInfoProvider } from './context/CropperInfoContext';

const App = () => {
  return (
    <div className="App">
      <Header />
      <CropperInfoProvider>
        <Main />
      </CropperInfoProvider>
    </div>
  );
};

export default App;
