import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import firebase from './firebase';
import Login from './login';
import Profile from './profiles';
import Routes from './routes';
import Dashboard from './dashboard';
import Cards, { Card } from 'react-swipe-deck';


var provider = new firebase.auth.FacebookAuthProvider();
class Meeting extends Component {

  constructor(props) {

    super(props);
    this.state = {
      myLocation: [],
      myOptions: {}
    }
    // this.getallusers = this.getallusers.bind(this);
    // this.getttingmylocation = this.getttingmylocation.bind(this);
  }
  getttingmylocation() {
    //     let { myLocation, myOptions } = this.state
    //     // let allUsers = this.state;
    //     var myuserid = localStorage.getItem('userId');
    //     firebase.database().ref('/users').on("child_added", data => {
    //       var user = data.val();
    //       if (user.uid !== useruidss) {
    // let beverage1s = user.uid.profileDetails.beverage1;
    // let bbb = useruidss.profileDetails.beverage1;

    // let timess1 = user.uid.profileDetails.time60;
    // let timess2 = useruidss.profileDetails.time60;


    //         let compareBeverages = beverage1s.some(value => bbb.includes(value))
    //         let compareTime = timess1.some(value => timess2.includes(value))
    // if(compareBeverages && compareTime){
    //   allUsers.push(user)
    //   this.setState({ allUsers })
    // }
    //         // myLocation.push(user.location.latitude);
    //         // myLocation.push(user.location.longitude);

    //         // myOptions.beverages = user.beverages;
    //         // myOptions.time = user.time;

    //         // this.setState({ myLocation, myOptions })
    //         console.log('sssssssssssss',allUsers);
    //       }
    //     })
    let { myLocation, myOptions } = this.state
    let myuserid = localStorage.getItem('userId');


    firebase.database().ref('users/').on("child_added", data => {
      let user = data.key;
      console.log(user);
      console.log(data.val().location.latitude);
      // console.log("user.uid hai", user.uid);
      console.log('myuserid hai', myuserid);
      if (user === myuserid) {
        console.log(data.val().location.latitude);
        myLocation.push(data.val().location.latitude);
        myLocation.push(data.val().location.longitude);
        console.log('abcdef');
      }
        // myOptions.beverages = user.beverages;
        // myOptions.time = user.time;

      this.setState({ myLocation })
      console.log(this.state.myLocation);
      // }
    })

    

  }
  action = msg => {
    // console.log(msg);
  };


  componentDidMount() {
    this.getttingmylocation();
  }



  render() {
    const data = ['Alexandre', 'Thomas', 'Lucien']

    return (


      // <div className="App">
      /* <h1>Meeting ki JS</h1> */
      <Cards onEnd={this.action('end')} className='master-root'>
        {data.map(item =>
          <Card
            onSwipeLeft={() => this.action('swipe left')}
            onSwipeRight={() => this.action('swipe right')}>
            <h2>{item}</h2>
          </Card>
        )}
      </Cards>

      // </div>
    );
  }
};

export default Meeting;
