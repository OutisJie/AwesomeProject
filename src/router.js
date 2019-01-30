import { Actions, Scene } from 'react-native-router-flux'

import Home from '../src/pages/main/home'
import Login from '../src/pages/auth/login'
import Register from '../src/pages/auth/register'

const scenes = Actions.create(
  <Scene key="root">
    <Scene key="login" component={Login} title="Login"/>
    <Scene key="register" component={Register} title="Register"/>
    <Scene key="home" component={Home}/>
  </Scene>
)

export default scenes
