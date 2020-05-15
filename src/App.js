import React from 'react';
import './styles/reset.scss';
import './styles/base.scss';
import Header from './components/Header';
import Main from './components/Main';
// import Footer from './components/Footer';
import { CropperInfoProvider } from './context/CropperInfoContext';
import { ResizerProvider } from './context/ResizerContext';
import History from './components/History';
import { HistoryContextProvider } from './context/HistoryContext';

const App = () => {
  return (
    <div className="App">
      <Header />
      <CropperInfoProvider>
        <ResizerProvider>
          <HistoryContextProvider>
            <Main />
            <History />
          </HistoryContextProvider>
        </ResizerProvider>
      </CropperInfoProvider>
    </div>
  );
};

export default App;
