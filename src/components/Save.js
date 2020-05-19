import React, { useContext, useState, useRef } from 'react';
import { Button, TextField } from '@material-ui/core';
import propTypes from 'prop-types';
import * as firebase from 'firebase';
import firebaseConfig from './FirebaseConfig';
import { HistoryContext } from '../context/HistoryContext';

const Save = () => {
  const { dispatch } = useContext(HistoryContext);
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  const database = firebase.database();
  const [name, setName] = useState('');

  const getHistory = () => {
    database
      .ref(`/`)
      .once(`value`)
      .then(result => {
        dispatch({ type: 'update', data: result.val() });
      });
  };

  const setHistory = (_name, file) => {
    const storageRef = firebase.storage().ref();
    const imageRef = storageRef.child(`${name}`);
    const firebaseUrl = `https://firebasestorage.googleapis.com/v0/b/webtoon-thumbnail-editor.appspot.com/o/${name}?alt=media`;
    const date = `&date=${new Date().toString().slice(0, 24)}`;
    const url = firebaseUrl + date;

    imageRef.put(file).then(() => {
      firebase.database().ref(`/${_name}`).set(url, getHistory);
    });
  };

  const handleClick = e => {
    e.preventDefault();
    if (name.trim().length === 0) {
      window.alert('파일 이름을 확인해주세요');
      return;
    }
    const canvasEl = document.getElementById('editor');
    const blankCanvas = document.createElement('canvas');
    const canvasData = canvasEl.toDataURL();

    if (canvasData === blankCanvas.toDataURL()) {
      window.alert('이미지가 없습니다');
      return;
    }

    const link = document.getElementById('link');

    link.setAttribute('download', `${name}.png`);
    link.setAttribute('href', canvasData.replace('image/png', 'image/octet-stream'));
    link.click();

    canvasEl.toBlob(blob => {
      setHistory(name, blob);
    });
  };

  const handleNameChange = e => {
    e.preventDefault();
    setName(e.target.value);
  };

  return (
    <>
      <div className="save-container">
        <TextField
          className="naver-colored-text"
          label="파일 제목"
          margin="dense"
          variant="outlined"
          onChange={handleNameChange}
        />
        <Button className="open-btn" variant="contained" color="primary" onClick={handleClick}>
          SAVE
        </Button>
        <a id="link" href="default">
          {undefined}
        </a>
      </div>
    </>
  );
};

export default Save;
