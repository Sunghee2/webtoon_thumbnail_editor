import React from 'react';
import './styles/reset.scss';
import './styles/base.scss';
import Header from './components/Header';
import Main from './components/Main';
// import Footer from './components/Footer';
import {
  AddTextProvider,
  CropperInfoProvider,
  ResizerProvider,
  AdjustProvider,
  HistoryContextProvider,
} from './context';
import History from './components/History';

const App = () => {
  return (
    <div className="App">
      <Header />
      <CropperInfoProvider>
        <ResizerProvider>
          <AdjustProvider>
            <AddTextProvider>
              <HistoryContextProvider>
                <Main />
                <History />
              </HistoryContextProvider>
            </AddTextProvider>
          </AdjustProvider>
        </ResizerProvider>
      </CropperInfoProvider>
    </div>
  );
};

export default App;
