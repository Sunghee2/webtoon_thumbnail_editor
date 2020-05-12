import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyDD_AW90cyn1jfsU4TQWmwqrgCHxiOWtJI',
  authDomain: 'webtoon-thumbnail-editor.firebaseapp.com',
  databaseURL: 'https://webtoon-thumbnail-editor.firebaseio.com',
  projectId: 'webtoon-thumbnail-editor',
  storageBucket: 'webtoon-thumbnail-editor.appspot.com',
  messagingSenderId: '385711263103',
  appId: '1:385711263103:web:338c6a98457ecfb644de4a',
  measurementId: 'G-V0979BKPDQ',
};
let database;

const initFirebase = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  database = firebase.database();
};

const getHistory = () => {
  return database.ref('/').once('value');
};

export { initFirebase, getHistory };
