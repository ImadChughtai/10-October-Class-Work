import React, { Component } from 'react';
import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyB97g3UFv3axjmtEPBsC2MagIECUdnpGeU",
    authDomain: "to-do-app-react.firebaseapp.com",
    databaseURL: "https://to-do-app-react.firebaseio.com",
    projectId: "to-do-app-react",
    storageBucket: "to-do-app-react.appspot.com",
    messagingSenderId: "487571299233"
  };
  firebase.initializeApp(config);

  export default firebase;