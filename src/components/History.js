import React, { useState, useRef, useEffect } from 'react';
import * as firebase from 'firebase';
import firebaseConfig from './FirebaseConfig';
import Thumbnail from './Thumbnail';
import '../styles/History.scss';

const History = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  const [thumbnail, setThumbnail] = useState({});
  const [selectedThumbnail, setSelectedThumbnail] = useState({});
  const database = firebase.database();
  const nameRef = useRef(null);

  const getHistory = () => {
    database
      .ref(`/`)
      .once(`value`)
      .then(result => {
        setThumbnail(result.val());
      });
  };

  // const setHistory = (name, file) => {
  //   const storageRef = firebase.storage().ref();
  //   const imageRef = storageRef.child(`${name}`);
  //   const firebaseUrl = `https://firebasestorage.googleapis.com/v0/b/webtoon-thumbnail-editor.appspot.com/o/${name}?alt=media`;
  //   const date = `&date=${new Date().toString().slice(0, 24)}`;
  //   const url = firebaseUrl + date;

  //   imageRef.put(file).then(() => {
  //     firebase.database().ref(`/${name}`).set(url, getHistory);
  //   });
  // };

  useEffect(() => {
    getHistory();
  }, []);

  const filterThumbnail = evt => {
    const name = nameRef.current.value.trim();
    const hasThumbnail = thumbnail[name];

    evt.preventDefault();
    if (hasThumbnail) {
      setSelectedThumbnail(name);
    } else {
      setSelectedThumbnail({});
      nameRef.current.value = ``;
    }
  };

  return (
    <section className="history-container">
      <div className="title">이미지 목록</div>
      <form onSubmit={filterThumbnail}>
        <input type="text" ref={nameRef} placeholder="Search Thumbnail..." />
      </form>
      <ul>
        {thumbnail && selectedThumbnail.length ? (
          <Thumbnail name={selectedThumbnail} src={thumbnail[selectedThumbnail]} />
        ) : (
          Object.keys(thumbnail).map(key => <Thumbnail key={key} name={key} src={thumbnail[key]} />)
        )}
      </ul>
    </section>
  );
};

export default History;
