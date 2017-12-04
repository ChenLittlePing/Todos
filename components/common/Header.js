/**
 * 页面头部
 * @author ChenXiaoping
 */

import React, {Component} from 'react'
import{
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native'

export default class Header extends Component {

  static defaultProps = {
    onLeftClick: null,
    onRightClick: null
  }

  render() {
    return(
      <View>
        <View style={styles.content}>
          <TouchableOpacity
            onPress={() => this.onLeftPress()}
            activeOpacity={0.5}>
            <View style={{height:50, width:50, borderRadius:50, justifyContent:'center', alignItems:'center'}}>
              <Text style={{fontSize:14, color:'tomato', fontWeight:'500'}}>{this.props.leftText}</Text>
            </View>
          </TouchableOpacity>

          <Text style={{fontSize:16, color:'#000', fontWeight:'500'}}>{this.props.titleText}</Text>

          <TouchableOpacity
            onPress={() => this.onRightPrss()}
            activeOpacity={0.5}>
            <View style={{height:50, width:50, borderRadius:50, justifyContent:'center', alignItems:'center'}}>
              <Text style={{fontSize:14, color:'tomato', fontWeight:'500'}}>{this.props.rightText}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{height:0.5, backgroundColor:'#ddd'}}/>
      </View>
    );
  }

  onLeftPress() {
    if (this.props.onLeftClick != null) {
      this.props.onLeftClick();
    }
  }

  onRightPrss() {
    if (this.props.onRightClick != null) {
      this.props.onRightClick();
    }
  }
}

const styles = StyleSheet.create({
  content: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff'
  }
});
