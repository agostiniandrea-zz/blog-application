import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore, compose } from 'redux';
import { getPosts } from './Redux/reducers/posts';
import thunk from 'redux-thunk';

if (module.hot) {
  module.hot.accept();
}

const store = createStore(
  reducer, compose(
      applyMiddleware(
          thunk
      ),
      window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

import reducer from './Redux/reducers/';
import MainView from './React/components/MainView/';

store.dispatch(getPosts());

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MainView />
      </Provider>
    );
  }
}