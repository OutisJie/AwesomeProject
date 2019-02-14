import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Provider } from 'react-redux'
import Home from './src/pages/main/home'
import createStore from './src/createStore'

const store = createStore()

export default class App extends Component<{}> {
  render() {
    return (
      <Provider store={store}>
        <Home></Home>
      </Provider>
    );
  }
}