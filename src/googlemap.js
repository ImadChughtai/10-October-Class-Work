// import React, { Component } from 'react';
// import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
// import firebase from './firebase';
// import './App.css';
// import Routes from './routes';


// class GoogleMap extends Component {

//     constructor(props){
//       super(props);
//       this.state = {
//         coords: null
//       }
//     }
// setPosition(){
//     navigator.geolocation.getCurrentPosition(position => {
//         this.setState({ coords: position.coords })
//     });
// }
// componentDidMount(){
//     this.setPosition();
// }
//    render() {
// const {coords} = this.state;
// const style = {
//     width: '100%',
//     height: '100%'
//   }
//     return (


//       <div className="App">
//        <Map google={this.props.google}
//         zoom={14} 
//         style={style}
//         initialCenter={{
//             lat: 40.854885,
//             lng: -88.081807
//           }}
//           center={{
//             lat: 40.854885,
//             lng: -88.081807
//           }}
//           onClick={this.onMapClicked}>

//  <Marker onClick={this.onMarkerClick}
//          name={'Current location'} 
//          />

//  <InfoWindow onClose={this.onInfoWindowClose}>
//      <div>
//        {/* <h1>{this.state.selectedPlace.name}</h1> */}
//      </div>
//  </InfoWindow>
// </Map>
//        </div>
//     );
//   }
// }

// // export default GoogleMap;
// export default GoogleApiWrapper({
//     // apiKey: ("YOUR_GOOGLE_API_KEY_GOES_HERE")
//   })(GoogleMap)



import React, { Component } from 'react';
import './App.css';
import firebase from './firebase'
import Dashboard from './dashboard';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import Routes from './routes';

class GoogleMaps extends Component {
  constructor(props) {
    super()

    this.state = {
      coords: null,
      showComponent: false
    };
    // this.aa = this.aa.bind(this);

    this.updateCoords = this.updateCoords.bind(this);
    this.submit = this.submit.bind(this);
    this.abc = this.abc.bind(this);
  }
  // aa() {
  //   this.setState({
  //     showComponent: true,
  //   });
  //   this.props.history.push(`/dashboard`);
    
  // }
  abc(){
    var a = localStorage.getItem('userId');
    var b= this.state.coords;
    firebase.database().ref("users/" + a + '/' + 'location'+'/').set(b)
          .then(() => {
            console.log(b);
          })
          .catch((error) => {
            console.log(error);
          });
  }

  componentDidMount() {
    this.setPosition();
  }
  componentDidUpdate(prevProps) {
    
  }
  setPosition() {
    navigator.geolocation.getCurrentPosition(position => {
      this.setState({ coords: position.coords })
    });
  }

  updateCoords({ latitude, longitude }) {
    this.setState({ coords: { latitude, longitude } })
  }
  submit() {
    // this.props.history.push(`/dashboard`);
    var a = localStorage.getItem('userId');
    const { coords } = this.state;
    // let b = coords.longitude
    // let c = coords.latitude
   
    var b= {
      longitude: this.state.coords.longitude,
      latitude: this.state.coords.latitude
    };
    
   
    firebase.database().ref("users/" + a +'/'+'location').set(b)
      .then(() => {
        console.log(b);
      })
      .catch((error) => {
        console.log(error);
      });
      // firebase.database().ref("users/" + a +'/'+'location'+ '/'+'latitude').push(c)
      // .then(() => {
      //   console.log(c);
      // })
      // .catch((error) => {
      //   console.log(error);
      // });
  }
  render() {
    const { coords } = this.state;

    return (
      <div>
        <Routes/>
        {coords && <MyMapComponent
          isMarkerShown
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100vh` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          coords={coords}
          updateCoords={this.updateCoords}
        />}
        {/* {console.log(coords)} */}
        <br /><br />
        <button onClick={this.submit}>Submit</button>
        <br /><br /><br /><br /><br /><br /><br /><br />
        {/* <button onClick={this.aa}>Button</button>
        {this.state.showComponent ?
           <Dashboard /> :
           null
        } */}
      </div>
    )
  }

}

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={14}
    center={{ lat: props.coords.latitude, lng: props.coords.longitude }}
  >
    {props.isMarkerShown &&
      <Marker
        position={{ lat: props.coords.latitude, lng: props.coords.longitude }}
        draggable={true}
        onDragEnd={position => {
          props.updateCoords({ latitude: position.latLng.lat(), longitude: position.latLng.lng() })
        }}
      />}
  </GoogleMap>
))

export default GoogleMaps;