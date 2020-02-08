import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyCD_G7Jq-RlQn2MoBo1A-w7HWvX0UyTlCk',
  authDomain: 'express-traderr.firebaseapp.com',
  databaseURL: 'https://express-traderr.firebaseio.com',
  projectId: 'express-traderr',
  storageBucket: 'express-traderr.appspot.com',
  messagingSenderId: '863679935424',
  appId: '1:863679935424:web:a5b83bebf05d0902b64e25',
  measurementId: 'G-PE85HH8YW7',
};

firebase.initializeApp(firebaseConfig);

const dbrefObject = firebase
  .database()
  .ref()
  .child('object');

dbrefObject.on('value', snap => console.log(snap.val()));
