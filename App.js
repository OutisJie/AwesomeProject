import React, { Component } from "react";
import { Provider } from "react-redux";
import Main from "./src/main";
import createStore from "./src/createStore";

const store = createStore();

export default class App extends Component<{}> {
  render() {
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    );
  }
}
