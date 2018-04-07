import React, { Component } from 'react'
import { Route, Router, Switch } from 'react-router-dom'
import Verifier from './components/Verifier'
import createHistory from 'history/createBrowserHistory'

const history = createHistory()

class AppContainer extends Component {
  render () {
    return (
      <div className='App' >
        <Router history={history}>
          <Switch>
            <Route exact path='/verifier' component={Verifier} />
          </Switch>
        </Router>
      </div>
    )
  }
}
AppContainer.propTypes = {

}

export default AppContainer
