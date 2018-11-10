// import React, { Component } from 'react';
// import './App.css';
// import firebase from './firebase';
// import Routes from './routes';
// import Profile from './profiles';

// // import {BrowserRouter as Router,Route,Link} from "react-router-dom";


// var provider = new firebase.auth.FacebookAuthProvider();
// class Login extends Component {
 
//     constructor(props){

//       super(props);
//       this.state = {
//         abc: false
//       }
//       this.check = this.check.bind(this);
//       this.a = this.a.bind(this);

//     }
    
// a(){
//   firebase.auth().signInWithPopup(provider).then((result)=> {
//     // This gives you a Facebook Access Token. You can use it to access the Facebook API.
//     var token = result.credential.accessToken;
//     // The signed-in user info.
//     var user = result.user;
// this.setState({
//   abc: true
// })
//     // console.log("abc",this.state.abc);

//     // ...
//   }).catch(function(error) {
//     // Handle Errors here.
//     var errorCode = error.code;
//     var errorMessage = error.message;
//     // The email of the user's account used.
//     var email = error.email;

//     // The firebase.auth.AuthCredential type that was used.
//     var credential = error.credential;
//     // ...
// console.log(error);
//   });
// } 

// check(){

//   firebase.auth().onAuthStateChanged((user) => {
//     if(user){
//     console.log("aaaaaaaaa");
//   }
//     else{

//       console.log("bbbbbbbbbb");
//     }
//   })
// }
// // componentDidMount(){
// //   this.check()
// // }
//    render() {

// const {abc}  = this.state;
//     return (

      
//       <div className="App">
// <button onClick={this.a}>Login with Facebook</button>



// {abc && <Profile/>}
//       {console.log("abc",this.state)}
//       {/* {abc ? this.check(): <button onClick={this.a}>Login with Facebook</button>} */}
      
     
//       </div>
//     );
//   }
// }

// export default Login;
import React, { Component } from 'react';
// import Container from '../../components/Container/Container'
import Profile from './profiles';
import './App.css';
import { Link, Redirect } from "react-router-dom";
import firebase from './firebase';
import Routes from './routes';
// import {fakeAuth} from './routes';
// this.props.location.state.fakeAuth.isAuthenticated = true

var provider = new firebase.auth.FacebookAuthProvider();

class Login extends Component {
  constructor(props) {
    super();
    this.state = {
      userName: false
    }
    this.login = this.login.bind(this);
  }

  login() {
    // this.props.location.state.fakeAuth.isAuthenticated = true
    // this.props.history.push(`/profiles`)
     firebase.auth().signInWithPopup(provider).then(result=> {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        this.props.location.state.fakeAuth.isAuthenticated = true
        this.props.history.push(`/profiles`);
        console.log(provider);
        console.log(token);
        console.log(result.user.displayName);
        localStorage.setItem("profileImage", result.user.providerData[0].photoURL);
        localStorage.setItem("userFacebookname",result.user.displayName);
        localStorage.setItem("userId", result.user.uid);        
        console.log(result.user.uid);

        console.log(result.user.providerData[0].photoURL);
        // this.setState({
        //   userName: true
        // })
        // this.getUserProfilePicture();

    
        // ...
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
    
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // this.props.location.state.fakeAuth.isAuthenticated = false
        // ...
    console.log('creating error',error);
      });

  }

  render() {
    const userId = "sdfjkalskdfjsak343";
    const {userName} = this.state;

    return (
      <div className="mainlogin">
          {/* <h1>Login</h1>
          <input placeholder="Email" />
          <input placeholder="Password" />
          <Link to={{
            pathname: "/profiles/abcd",
            search: "?firstLogin=true",
            state: {user: {name: 'xuz', age: 34}}
          }} >Go to Dashboard </Link> */}
          <div className="mainheadings">
          <h1 className="appnameheading">Tinder Pro</h1>
          <button onClick={this.login} className="loginbutton">Login From Facebook</button>
          </div>
          {/* {console.log(userName)} */}
          {/* <Profile abcd={this.state.userName}/> */}
          <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
      </div>
    );
  }
}

export default Login;