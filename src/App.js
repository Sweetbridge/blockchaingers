import React, { Component } from 'react';
import logo from './logo.svg';
import Upload from './Upload'
import './App.css';

class App extends Component {
  constructor (props) {
    super(props)

  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to ID Silo</h1>
        </header>
        <Upload />
        <p className="App-intro">
        </p>
      </div>
    );
  }
}

export default App;
