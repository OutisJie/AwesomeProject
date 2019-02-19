import React from 'react'
import { Router, Scene } from 'react-native-router-flux'
import Login from './pages/auth/login'
import Home from './pages/home/home'

export default class Main extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Router>
        <Scene key="root">
	        <Scene key="login"
	          component={Login}
	        	animation='fade'
	          hideNavBar={true}
	          initial={true}
	        />
	        <Scene key="home"
	          component={Home}
	          animation='fade'
	          hideNavBar={true}
	        />
	      </Scene>
      </Router>
    )
  }
}