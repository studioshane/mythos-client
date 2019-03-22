import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import './App.css'
import CharacterIndex from './components/CharacterIndex'
import Navbar from './components/Navbar'
import CharacterDetailsContainer from './containers/CharacterDetailsContainer'

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={Navbar} />
        <Route exact path='/characters' component={CharacterIndex} />
        <Route
          path='/characters/:id'
          component={routerProps => {
            return (
              <CharacterDetailsContainer id={routerProps.match.params.id} />
            )
          }}
        />
      </Switch>
    )
  }
}

export default App
