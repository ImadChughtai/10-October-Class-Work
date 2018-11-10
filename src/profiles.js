
import React, { Component } from 'react';
import './App.css';
import firebase from './firebase';
import Routes from './routes';
import Login from './login';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import GoogleMaps from './googlemap';
// import {BrowserRouter as Router,Route,Link} from "react-router-dom";
import bgimage from './bgimage.jpg'
var storage = firebase.storage();
// var i=0;
class Profile extends Component {

  constructor(props) {

    super(props);
    this.state = {
      image: null,
      progress: null,
      urls1: [],
      currentUserid: null,
      formno: 0,      
      profileDetails: {
        nickName: null,
        number: null,
        images: null,
        beverage1: null,
        beverage2: null,
        beverage3: null,
        time20: null,
        time60: null,
        time120: null,
        location: {}
      }
    }
    this.nameandphone = this.nameandphone.bind(this);
    this.set = this.set.bind(this);
    this.uploadingimages = this.uploadingimages.bind(this);
    this.selectbeverages = this.selectbeverages.bind(this);
    this.savingdata = this.savingdata.bind(this);
  }
  set() {
    const { formno } = this.state;
    this.setState({
      formno: formno + 1
    })
  }
  savingdata(name, e) {
    let statusCopy = Object.assign({}, this.state);
    statusCopy.profileDetails[name] = e.target.value;
    this.setState(statusCopy);
    console.log(statusCopy);

    var a = localStorage.getItem('userId');
    console.log(a);
    firebase.database().ref("users/" + a + '/').set(statusCopy)
      .then(() => {
        console.log(a);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  handleChange = e => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      this.setState(() => ({ image }));
    }
  }


  handleUpload = () => {
    const { image } = this.state;
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on('state_changed',
      (snapshot) => {
        // progrss function ....
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        this.setState({ progress });
      },
      (error) => {
        // error function ....
        console.log(error);
      },
      () => {
        // complete function ....
        storage.ref('images').child(image.name).getDownloadURL().then(url1 => {
          // let i = i +1;
          this.setState({ urls1: [...this.state.urls1, url1] });
          console.log(this.state.urls1);
        })

        var a = localStorage.getItem('userId');
        var b = this.state.urls1;
        console.log('line 95', b);
        firebase.database().ref("users/" + a + '/' + 'profileDetails' + '/' + 'images').set(b)
          .then(() => {
            console.log(b);
          })
          .catch((error) => {
            console.log(error);
          });

      });


  }
  nameandphone() {
    let statusCopy = Object.assign({}, this.state);
    return (
      <div>
        <label>Enter Nick Name:</label>
        <input type="text" placeholder="Enter NickName" name='nickName' onChange={(e) => this.savingdata('nickName', e)} /><br />
        <label>Enter Phone Number:</label>
        <input type="number" placeholder="Enter Phone Number" name="number" onChange={(e) => this.savingdata('number', e)} /><br />
        <button onClick={this.set}>Next</button>
      </div>
    );

  }
  uploadingimages() {
    return (
      <div>
        <img src={this.state.urls1[0] || 'http://via.placeholder.com/400x300'} alt="Uploaded images" height="300" width="400" />
        <input type="file" placeholder="uploadimage" onChange={this.handleChange} />
        <button onClick={this.handleUpload}>Upload</button>

        <img src={this.state.urls1[1] || 'http://via.placeholder.com/400x300'} alt="Uploaded images" height="300" width="400" />
        <input type="file" placeholder="uploadimage" onChange={this.handleChange} />
        <button onClick={this.handleUpload}>Upload</button>


        <img src={this.state.urls1[2] || 'http://via.placeholder.com/400x300'} alt="Uploaded images" height="300" width="400" />
        <input type="file" placeholder="uploadimage" onChange={this.handleChange} />
        <button onClick={this.handleUpload}>Upload</button>


        {/* <input type="file" placeholder="uploadimage" />
        <input type="image" placeholder="uploadimage" />*/}
        <button onClick={this.set}>Next</button>
      </div>
    )
  }
  selectbeverages() {
    return (
      <div>
        <h1>Select Beverages</h1>
        <input type="checkbox" value="Coffee" name="beverage1" onChange={(e) => this.savingdata('beverage1', e)} /><label>Coffee</label><br />
        <input type="checkbox" value="Juice" name="beverage2" onChange={(e) => this.savingdata('beverage2', e)} /><label>Juice</label><br />
        <input type="checkbox" value="Cocktail" name="beverage3" onChange={(e) => this.savingdata('beverage3', e)} /><label>Cocktail</label>
        <h1>Duration Of Meeting</h1>

        <input type="checkbox" value="20" name="time120" onChange={(e) => this.savingdata('time20', e)} /><label>20</label><br />
        <input type="checkbox" value="60" name="time120" onChange={(e) => this.savingdata('time60', e)} /><label>60</label><br />
        <input type="checkbox" value="120" name="time120" onChange={(e) => this.savingdata('time120', e)} /><label>120</label>

        <br />
        <button onClick={this.set}>Next</button>
      </div>
    );
  }
  // componentDidMount() {
  //   console.log(this.state.url1)
  // }
  // googlemappaths(){
  //   this.props.history.push(`/googlemap`);
  // }
  render() {
    const { formno } = this.state;
    return (


      <div className="App">
        <h1>Login Form</h1>
        {formno == 0 && this.nameandphone()}
        {formno == 1 && this.uploadingimages()}
        {formno == 2 && this.selectbeverages()}
        {formno == 3 && <GoogleMaps/>}
        {/* {console.log(this.state.nickName)} */}
        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
      </div>
    );
  }
}

export default Profile;
