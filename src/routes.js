// import React from "react";
// import { BrowserRouter as Router, Route, Link} from "react-router-dom";
// import App from './App';
// import Profile from './profiles';
// import firebase from './firebase';
// import Login from './login';


// const Routess = a =>{
//     <Router>
//         <div>
//         <Route exact path="/" component={Login} />
//         <Route path="/profiles" component={Profile} />
//         {/* <Route path="/topic." component={Topics} /> */}

//         </div>
//     </Router>
// }

// const check = () =>{

//     firebase.auth().onAuthStateChanged((user) => {
//       if(user){
//   <Link to='/profiles'>Profiles</Link>
//       console.log("aaaaaaaaa");
//       }
//       else{
//    console.log("bbbbbbbbbb");
//       }
//     })
//   };
// export default Routess;
import React, { Component } from 'react';
import { withRouter, BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Profile from './profiles';
import Login from './login';
import firebase from './firebase';
import GoogleMaps from './googlemap';
import Dashboard from './dashboard';
import Meeting from './meeting'

const Routes = () => (
    <Router>
      <div>
        <Route exact path="/" component={Login} />
        <PrivateRoute path="/profiles" component={Profile} />
        <Route path="/googlemap" component={GoogleMaps}/>
        <Route path='/dashboard' component={Dashboard}/>
        <Route path='/meeting' component={Meeting}/>
      </div>  
    </Router>
);
const fakeAuth = {
    isAuthenticated: false,
};
// const is =  firebase.auth().onAuthStateChanged((user) => {
//     if (user) {
//         fakeAuth.isAuthenticated = true

//     }
//     else {
//         fakeAuth.isAuthenticated = false



//     }
// })

const AuthButton = withRouter(
    ({ history }) =>
      fakeAuth.isAuthenticated ? (
        <p>
          Welcome!{" "}
          <button
            onClick={() => {
              fakeAuth.signout(() => history.push("/"));
            }}
          >
            Sign out
          </button>
        </p>
      ) : (
        <p>You are not logged in.</p>
      )
  );

const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
  <Route
    {...rest}
    render={props =>
      fakeAuth.isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/",
            state: { from: props.location, fakeAuth }
          }}
        />
      )
    }
  />
)};

export default Routes;