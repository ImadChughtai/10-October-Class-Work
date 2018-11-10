import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import firebase from './firebase';
import Login from './login';
import Profile from './profiles';
import Routes from './routes';

// import firebase from './firebase';
// import * as firebase from 'firebase';
// import {BrowserRouter as Router,Route,Link} from "react-router-dom";
// Initialize Firebase


var provider = new firebase.auth.FacebookAuthProvider();
class App extends Component {
 
    constructor(props){

      super(props);
      this.state = {
        abc: false
      }

      // this.b = this.b.bind(this);
    }

   render() {

    return (

      
      <div className="App">
<Routes/>
      </div>
    );
  }
}

export default App;
