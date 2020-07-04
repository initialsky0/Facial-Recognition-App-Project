import React from 'react';
import SignIn from './Components/SignIn/SignIn';
import Register from './Components/Register/Register';
import Particles from 'react-particles-js';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import Rank from './Components/Rank/Rank';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import './App.css';

const particleParems = {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

const initialState = {
  input: '',
  imgUrl: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  } 
} 

class App extends React.Component {
  constructor() {
    super();
    this.state = initialState;
  }

  // componentDidMount() {
  //   fetch('http://localhost:3000/')
  //   .then(response => response.json())
  //   .then(console.log);
  // }

  loadUser = (userData) => {
    this.setState({user: {
      id: userData.id,
      name: userData.name,
      email: userData.email,
      entries: userData.entries,
      joined: userData.joined
    }});
  }

  calcFaceLocation = (data) => {
    const clarifaiData = data.outputs[0].data.regions[0].region_info.bounding_box;
    const pic = document.getElementById('pic');
    const width = Number(pic.width);
    const height = Number(pic.height);
    return {
      leftCol: clarifaiData.left_col * width,
      topRow: clarifaiData.top_row * height,
      rightCol: width - (clarifaiData.right_col * width),
      bottomRow: height - (clarifaiData.bottom_row * height)
    };
  }

  dispFaceBox = (newBox) => {
    this.setState({box: newBox});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imgUrl: this.state.input});
    fetch('http://localhost:3000/imgURL', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        input: this.state.input
      })
    }).then(response => response.json())
    .then(response => {
      if(response) {
        fetch('http://localhost:3000/img', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
          })
        }).then(response => response.json())
          .then(newEntries => {
            this.setState(Object.assign(this.state.user, {entries: newEntries}))
            })
            .catch(console.log); 
            // Second method
            // {
            // this.setState( prevUser => {
            //   let user = {...prevUser.user};
            //   user.entries = newEntries;
            //   return {user};
            // })
          // });
      }
      this.dispFaceBox(this.calcFaceLocation(response));
    })
    .catch(err => console.log(err));
  }

  onRouteChange = (route2) => {
    if(route2 === 'home') {
      this.setState({isSignedIn: true});
    } else if(route2 === 'signin'){
      this.setState({isSignedIn: false});
      this.setState(initialState);
    }
    this.setState({route: route2});
  }

  render() {
    const {isSignedIn, route, imgUrl, box} = this.state;
    return (
        <div className="App">
          <Particles className='particles' params={particleParems} />
          <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn}/>
          { route === 'home' ?
            <div>
              <Logo />
              <Rank name={this.state.user.name} entries={this.state.user.entries}/>
              <ImageLinkForm 
                onInputChange={this.onInputChange} 
                onButtonSubmit={this.onButtonSubmit}/>
              <FaceRecognition imgUrl={imgUrl} faceBox={box}/>
            </div> :
            ( route === 'signin' ? 
            <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser}/> : 
            <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser}/> )           
          }
        </div>
      );
  }
}

export default App;
