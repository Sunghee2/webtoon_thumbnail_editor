import React, { useContext } from 'react';
import { Button } from '@material-ui/core';
import propTypes from 'prop-types';
import * as firebase from 'firebase';
import firebaseConfig from './FirebaseConfig';
import { HistoryContext } from '../context/HistoryContext';

const Save = props => {
  const { canvasRef } = props;
  const { dispatch } = useContext(HistoryContext);
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  const database = firebase.database();

  const getHistory = () => {
    database
      .ref(`/`)
      .once(`value`)
      .then(result => {
        dispatch({ type: 'update', data: result.val() });
      });
  };

  const setHistory = (name, file) => {
    const storageRef = firebase.storage().ref();
    const imageRef = storageRef.child(`${name}`);
    const firebaseUrl = `https://firebasestorage.googleapis.com/v0/b/webtoon-thumbnail-editor.appspot.com/o/${name}?alt=media`;
    const date = `&date=${new Date().toString().slice(0, 24)}`;
    const url = firebaseUrl + date;

    imageRef.put(file);

    imageRef.put(file).then(() => {
      firebase.database().ref(`/${name}`).set(url, getHistory);
    });
  };

  const handleClick = e => {
    e.preventDefault();

    if (canvasRef.current) {
      const canvasEl = canvasRef.current;
      const canvasData = canvasEl.toDataURL();
      const link = document.getElementById('link');

      link.setAttribute('download', 'download.png');
      link.setAttribute('href', canvasData.replace('image/png', 'image/octet-stream'));
      link.click();

      canvasRef.current.toBlob(blob => {
        setHistory('test', blob);
      });
    }
  };

  return (
    <>
      <Button className="open-btn" variant="contained" color="primary" onClick={handleClick}>
        저장
      </Button>
      <a id="link" href="default">
        {undefined}
      </a>
    </>
  );
};

Save.propTypes = {
  canvasRef: propTypes.oneOfType([propTypes.func, propTypes.shape({ current: propTypes.any })])
    .isRequired,
};

export default Save;
