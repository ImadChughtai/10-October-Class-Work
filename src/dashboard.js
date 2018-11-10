import React, { Component } from 'react';
import './App.css';
import firebase from './firebase';
import Login from './login';
import Profile from './profiles';
import Routes from './routes';
import GoogleMaps from './googlemap';

var provider = new firebase.auth.FacebookAuthProvider();
class Dashboard extends Component {

  constructor(props) {

    super(props);
    this.state = {
      meetingDone: null
    }
    this.click = this.click.bind(this);
  }
   click() {
  //   //create meeting
  this.props.history.push(`/meeting`);
   }
// componentWillMount(){
//   // this.props.location.state.fakeAuth.isAuthenticated = true;
//   console.log('component will mount')

// }
  render() {

    return (


      <div className="App">
        {/* <Routes /> */}
        <img src={localStorage.getItem('profileImage')} alt='profileimage'/>
        <h3>Welcome! {localStorage.getItem('userFacebookname')}</h3>
        <h1>You Haven't Done Any Meeting </h1>
        <button onClick={this.click}>Set A Meeting!</button>
      </div>
    );
  }
}

export default Dashboard;