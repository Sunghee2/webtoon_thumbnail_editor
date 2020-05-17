import React, { useState, useEffect, useContext } from 'react';
import * as firebase from 'firebase';
import { TextField } from '@material-ui/core';
import TrieSearch from 'trie-search';
import firebaseConfig from './FirebaseConfig';
import Thumbnail from './Thumbnail';
import { HistoryContext } from '../context/HistoryContext';
import '../styles/History.scss';

const History = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  const [selectedThumbnails, setSelectedThumbnails] = useState([]);
  const database = firebase.database();
  const { state, dispatch } = useContext(HistoryContext);
  const tsObj = new TrieSearch();

  const getHistory = () => {
    database
      .ref(`/`)
      .once(`value`)
      .then(result => {
        if (result.val()) {
          dispatch({ type: 'update', data: result.val() });
        }
      });
  };

  useEffect(getHistory, []);
  useEffect(() => {
    tsObj.addFromObject(state.thumbnails);
  });

  const filterThumbnail = evt => {
    const name = evt.target.value.trim();
    const arr = tsObj.get(name);

    if (!name.length) {
      setSelectedThumbnails([]);
    } else if (arr.length) {
      setSelectedThumbnails(arr);
    }
  };

  return (
    <section className="history-container">
      <div className="title">이미지 목록</div>
      <TextField label="웹툰 제목" margin="dense" variant="outlined" onChange={filterThumbnail} />
      <ul>
        {selectedThumbnails.length
          ? selectedThumbnails.map(item => (
              // eslint-disable-next-line
              <Thumbnail key={item._key_} name={item._key_} src={item.value} />
            ))
          : Object.entries(state.thumbnails).map(([key, value]) => (
              // eslint-disable-next-line
              <Thumbnail key={key} name={key} src={value} />
            ))}
      </ul>
    </section>
  );
};

export default History;
