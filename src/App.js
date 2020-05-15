import React from 'react';
import './styles/reset.scss';
import './styles/base.scss';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import { AddTextProvider } from './context/AddTextContext';
import { CropperInfoProvider } from './context/CropperInfoContext';
import { ResizerProvider } from './context/ResizerContext';

const App = () => {
  return (
    <div className="App">
      <Header />
      <CropperInfoProvider>
        <ResizerProvider>
          <AddTextProvider>
            <Main />
          </AddTextProvider>
        </ResizerProvider>
      </CropperInfoProvider>
    </div>
  );
};

export default App;
