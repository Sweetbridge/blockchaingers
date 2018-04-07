import React, { Component } from 'react'
import { Route, Router, Switch } from 'react-router-dom'
import Verifier from './components/Verifier'
import Nav from './components/Nav'

import SiloManager from './components/SiloManager'
import DataAddPanel from './components/DataAddPanel'
import createHistory from 'history/createBrowserHistory'

const history = createHistory()

class AppContainer extends Component {
  render () {
    return (
      <div className='App' >
        <Nav />
        <Router history={history}>
          <Switch>
            <Route exact path='/' component={DataAddPanel} />
            <Route path='/silo' component={SiloManager} />
            <Route path='/verifier' component={Verifier} />
          </Switch>
        </Router>
      </div>
    )
  }
}
AppContainer.propTypes = {

}

export default AppContainer
