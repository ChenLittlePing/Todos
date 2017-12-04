/**
 * 启动页
 * @author ChenXiaoping
 */
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Navigator,
  Animated
} from 'react-native';

import MainPage from './MainPage'

export default class Welcome extends Component {

  constructor(props) {
    super(props);
    this.state = {
      animatedValue: new Animated.Value(1)
    }
  }

  render() {
    return (
      <Animated.View style={[{flex:1, alignItems: 'center', justifyContent: 'center'}, {opacity: this.state.animatedValue}]}>
        {this.renderStatusBar()}
        {this.renderHeader()}
      </Animated.View>
    );
  }

  renderStatusBar() {
    return(
      <StatusBar
        barStyle="light-content"
        translucent={true}
        hidden={true}
        backgroundColor='#fff'/>
    );
  }

  renderHeader() {
    return(
      <View>
        <Text style={styles.headerText}>Todos</Text>
      </View>
    );
  }


  componentDidMount() {
    Animated.timing(this.state.animatedValue, {
      toValue: 0,
      duration: 500,
      delay:1000
    }).start()

    setTimeout(()=> {
      this.props.navigator.replacePrevious({
        name: '主页面',
        component: MainPage,
        params: {
          navigator: this.props.navigator
        }
      });
    }, 1500);
  }
}

const styles = StyleSheet.create({
  headerText : {
    fontSize: 80,
    color: 'orange'
  }
});
