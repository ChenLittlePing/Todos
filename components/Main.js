/**
 * 程序入口
 */

import React, { Component } from 'react';
import {Provider} from 'react-redux';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Navigator
} from 'react-native';

import WelcomePage from './WelcomePage'
import configureStore from './data/Store'

const store = configureStore();

export default class Main extends Component {
  render() {
    return (
      <Provider store={store}>
        <Navigator
          initialRoute={{name:'主页面', component: WelcomePage}}
          configureScene={() => {
            return Navigator.SceneConfigs.FloatFromBottom
          }}
          renderScene={(route, navigator) => {
            let Component = route.component;
            return <Component {...route.params} navigator={navigator} />
          }}
        />
      </Provider>
    );
  }
}
