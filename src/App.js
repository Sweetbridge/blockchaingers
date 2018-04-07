import React, { Component } from 'react';
import logo from './logo.svg';
import Upload from './Upload'
import config from './config'
import { getSilo, listDataEntries  } from './utils/idSilo'

import './App.css';

class App extends Component {
  state = {
    silo: { options: {} }
  }
  componentDidMount() {
    getSilo()
      .then(silo => { this.setState({ silo }) })
      .then(() => listDataEntries())
      .then(entries => this.setState({ entries }))
  }
  render() {
    console.log('state: ', this.state)
    const { silo } = this.state
    return (
      <div className="App">
        <header className="App-header">
          <img src={config.logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to ID Silo:{ this.state.silo.options.address}</h1>
        </header>
        {/* <RequestCertification silo={silo} />*/}
        <Upload silo={silo} entries={this.state.entries} />
      </div>
    );
  }
}

export default App;
