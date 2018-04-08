import React, { Component } from 'react'
import { Route, Router, Switch } from 'react-router-dom'
import Nav from './components/Nav'
import DataAddPanel from './components/DataAddPanel'
import createHistory from 'history/createBrowserHistory'
import DataVerificationPanel from "./components/DataVerificationPanel";

const history = createHistory()

class AppContainer extends Component {
  render () {
    return (
      <div className='App' >
        <Nav />
        <Router history={history}>
          <Switch>
            <Route path='/silo' component={DataAddPanel} />
            <Route path='/verifier' component={DataVerificationPanel} />
          </Switch>
        </Router>
      </div>
    )
  }
}

export default AppContainer
