import React, { Component} from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Navigation from './components/Navigation/Navigation.js';
import Signin from './components/Signin/Signin.js';
import Register from './components/Register/Register.js';
import FoodRecognition from './components/FoodRecognition/FoodRecognition.js';
import Logo from './components/Logo/Logo.js';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js';
import Rank from './components/Rank/Rank.js';
import './App.css';

const app = new Clarifai.App({
 apiKey: '70f5b5e032cb4b30a343beadd241fdcb'
});

const particlesOptions = {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageURL: '',
      ingredients: [],
      route: 'signin',
      isSignedIn: false
    }
  }

  calculateImageLocation = (data) => {
    const clarifaiFood = data.outputs[0].data.concepts;
    let ingredients = [];
    clarifaiFood.forEach(function (item) {
      ingredients.push(item.name);
    })

    return ingredients;
  }

  displayFoodBox = (ingredients) => {
    this.setState({ingredients:ingredients});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageURL: this.state.input});
    app.models
      .predict(
        Clarifai.FOOD_MODEL, 
        this.state.input
      )
    .then(response => this.displayFoodBox(this.calculateImageLocation(response)))
      .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({isSignedIn:false})
    } else if (route === 'home') {
      this.setState({isSignedIn:true})
    }
    this.setState({route: route});
  }

  render() {
    const { isSignedIn, imageURL, route, ingredients } = this.state;
    return (
      <div className="App">
        <Particles 
          className = 'particles'
          params={particlesOptions}
        />
        <Navigation 
          isSignedIn={isSignedIn} 
          onRouteChange={this.onRouteChange}/>
          { route === 'home' 
            ? <div>
                <Logo/>
                <Rank/>
                <ImageLinkForm onInputChange = {this.onInputChange} onButtonSubmit = {this.onButtonSubmit}/>
                <FoodRecognition ingredients={ingredients} imageURL={imageURL}/>
              </div>
            : (
                route === 'signin' 
                ? <Signin onRouteChange={this.onRouteChange}/>
                : <Register onRouteChange={this.onRouteChange}/>
              )
          }
      </div>
    );
  }
}
export default App;
