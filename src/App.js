import React from 'react';
import './styles/reset.scss';
import './styles/base.scss';
import Header from './components/Header';
import Main from './components/Main';
// import Footer from './components/Footer';
import {
  AddTextProvider,
  CropperInfoProvider,
  AdjustProvider,
  HistoryContextProvider,
} from './context';
import History from './components/History';

const App = () => {
  return (
    <div className="App">
      <Header />
      <CropperInfoProvider>
        <AdjustProvider>
          <AddTextProvider>
            <HistoryContextProvider>
              <Main />
              <History />
            </HistoryContextProvider>
          </AddTextProvider>
        </AdjustProvider>
      </CropperInfoProvider>
    </div>
  );
};

export default App;
