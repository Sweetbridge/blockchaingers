import React, { Component } from 'react';
import logo from './logo.svg';
import Upload from './Upload'
import config from './config'
import './App.css';
import { BrowserRouter } from 'react-router-dom'
import AppContainer from "./Routes";

class App extends Component {
  constructor (props) {
    super(props)

  }

  render() {
    return (
      <BrowserRouter>
        <AppContainer />
      </BrowserRouter>
    );
  }
}

export default App;
