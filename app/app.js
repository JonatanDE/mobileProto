// @flow
/* global XMLHttpRequest */
import React, {Component} from 'react';
import {Provider} from 'react-redux';
import store from "./store";
import MobileProtoApp from './screens/MobileProtoApp';

// DEV
// This is used in order to see requests on the Chrome DevTools
XMLHttpRequest = GLOBAL.originalXMLHttpRequest
  ? GLOBAL.originalXMLHttpRequest
  : GLOBAL.XMLHttpRequest;

/**
 * Entry point for app via Redux
 */
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MobileProtoApp/>
      </Provider>
    );
  }
}

export default App;
