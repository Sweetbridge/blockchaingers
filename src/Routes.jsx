import React, { Component } from 'react'
import { Route, Router, Switch } from 'react-router-dom'
import Verifier from './components/Verifier'
import Nav from './components/Nav'
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
            <Route path='/silo' component={DataAddPanel} />
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
