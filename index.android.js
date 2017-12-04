/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Navigator
} from 'react-native';

import Main from './components/Main'

export default class Todos extends Component {
  render() {
    return (
      <Main/>
    );
  }
}

AppRegistry.registerComponent('Todos', () => Todos);
