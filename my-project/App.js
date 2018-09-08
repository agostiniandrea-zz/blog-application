import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
const store = createStore(reducer);

import reducer from './Redux/reducers/';
import MainView from './React/components/MainView/';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MainView />
      </Provider>
    );
  }
}