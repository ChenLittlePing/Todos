/**
 * 事件详情页
 */
import React, {Component} from 'react'
import {
  StyleSheet,
  View,
  Text,
  BackAndroid
} from 'react-native'

import Header from '../common/Header'
import Icomoon from 'react-native-vector-icons/Icomoon'

import NewTodoPage from './NewTodoPage'

export default class DetailPage extends Component {

  render() {
    return(
      <View style={{flex:1, backgroundColor:'#fff'}}>
        {this.renderHeader()}
        {this.renderMemoTitle(true)}
        {this.renderMemoTitle(false)}
        {this.renderDate()}
      </View>
    );
  }

  renderHeader() {
    return(
      <Header
        leftText={'返回'}
        titleText={'详情'}
        rightText={'编辑'}
        onLeftClick={this.onCancleClick.bind(this)}
        onRightClick={this.onEditClick.bind(this)}/>
    );
  }

  renderMemoTitle(isTitle) {
    if (isTitle) {
      text = '日程';
      size = 25;
      iconName = 'bookmark';
      iconColor = 'steelblue';
      lineColor = '#ddd';
      text = this.props.data.title;
      style = styles.titleText;
    } else {
      text = '详情';
      size = 20;
      iconName = 'align-left';
      iconColor = 'royalblue';
      lineColor = '#ddd';
      text = this.props.data.detail;
      style = styles.detailText;
    }
    return(
      <View style={styles.row}>
        <View style={{height:60, width:50, alignItems:'center', justifyContent:'center'}}>
          <Icomoon
            name={iconName}
            size={size}
            color={iconColor}
          />
        </View>
        <View style={{flex:1, marginLeft:10, marginRight: 10, flexDirection: 'column'}}>
          <View style={{flex:1, flexDirection: 'row', alignItems:'center', justifyContent: 'center'}}>
            <Text style={style}>{text}</Text>
          </View>
          <View style={{height:0.5, marginBottom:2, backgroundColor:lineColor}}>
          </View>
        </View>
      </View>
    );
  }

  renderDate() {
    return(
      <View style={styles.row}>
        <View style={{height:60, width:50, alignItems:'center', justifyContent:'center'}}>
          <Icomoon
            name='clock'
            size={23}
            color='orange'
          />
        </View>
        <View style={{flex:1, marginLeft:10, marginRight: 10, flexDirection: 'row', alignItems:'center'}}>
          <Text style={{fontSize:16, color:'#000'}}>{this.props.data.arrivedDate}</Text>

          <Icomoon
            name='caret-down'
            size={15}
            color='#ddd'
            style={{marginLeft:50}}/>

          <Text style={{fontSize:16, marginLeft:20, color:'#000'}}>{this.props.data.arrivedTime}</Text>

          <Icomoon
            name='caret-down'
            size={15}
            color='#ddd'
            style={{marginLeft:20}}/>
        </View>
      </View>
    );
  }

  componentWillMount() {
    BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid);
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', this.onBackAndroid);
  }

  onBackAndroid=()=> {
      this.onCancleClick();
      return true;
  }

  onCancleClick() {
    this.props.navigator.pop();
  }

  onEditClick() {
    this.props.navigator.push({
      name:'NewTodoPage',
      component: NewTodoPage,
      params: {
        data: this.props.data,
        isNew: false,
        saveTodo: (item) => this.saveTodo(item)
      }
    });
  }

  saveTodo(item) {
    if (this.props.updateItem) {
      this.props.updateItem(item);
    }
  }
}

const styles = StyleSheet.create({
  row: {
    height: 63,
    flexDirection: 'row',
    backgroundColor: '#fff'
  },
  titleText: {
    flex: 1,
    fontSize: 16,
    color: 'crimson',
    fontWeight:'500',
    marginTop: 5,
    marginBottom: 5,
  },
  detailText: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    marginTop: 5,
    marginBottom: 5,
  }
});
