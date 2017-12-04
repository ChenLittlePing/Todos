/**
 * 新建备忘录页面
 * @author ChenXiaoping
 */

import React, {Component} from 'react'
import{
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  BackAndroid,
  ToastAndroid,
  DatePickerAndroid,
  TimePickerAndroid
} from 'react-native'

import Header from '../common/Header'
import Icomoon from 'react-native-vector-icons/Icomoon'

export default class NewRecordPage extends Component {

  static defaultProps = {
    saveTodo : null
  }

  constructor(props) {
    super(props);
    this.titleText = this.getDefaultTitle();
    this.detailText = this.getDefaultDetail();
    this.state = {
      arrivedDate : this.getDate(),
      arrivedTime : this.getTime()
    }
  }

  render() {
    return(
      <View style={{flex:1, backgroundColor:'#fff'}}>
        {this.renderHeader()}
        {this.renderTodoTitle(true)}
        {this.renderTodoTitle(false)}
        {this.renderDatePicker()}
      </View>
    );
  }

  renderHeader() {
    return(
      <Header
        leftText={'取消'}
        titleText={'新建备忘录'}
        rightText={'保存'}
        onLeftClick={this.onCancleClick.bind(this)}
        onRightClick={this.onSaveClick.bind(this)}/>
    );
  }

  renderTodoTitle(isTitle) {
    if (isTitle) {
      autoFocus = true;
      text = '日程';
      size = 25;
      iconName = 'bookmark';
      iconColor = 'steelblue';
      lineColor = '#ddd';
      text = this.getDefaultTitle();
    } else {
      autoFocus = false;
      text = '详情';
      size = 20;
      iconName = 'align-left';
      iconColor = 'royalblue';
      lineColor = '#ddd';
      text = this.getDefaultDetail();
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
          <TextInput
            defaultValue={text}
            underlineColorAndroid="#fff0"
            blurOnSubmit={true}
            returnKeyType="next"
            autoFocus={autoFocus}
            onChangeText={(text) =>
              {if (isTitle) {
                this.titleText = text;
              } else {
                this.detailText = text;
              }}
            }
            placeholder={text}/>
          <View style={{height:0.5, marginBottom:2, backgroundColor:lineColor}}>
          </View>
        </View>
      </View>
    );
  }

  renderDatePicker() {
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
          <TouchableOpacity
            onPress={()=> this.openDatePicker()}
            activeOpacity={0.5}>
            <Text style={{fontSize:16, color:'#000'}}>{this.state.arrivedDate}</Text>
          </TouchableOpacity>
          <Icomoon
            name='caret-down'
            size={15}
            color='#ddd'
            style={{marginLeft:50}}/>
          <TouchableOpacity
            onPress={()=> this.openTimePicker()}
            activeOpacity={0.5}>
            <Text style={{fontSize:16, marginLeft:20, color:'#000'}}>{this.state.arrivedTime}</Text>
          </TouchableOpacity>
          <Icomoon
            name='caret-down'
            size={15}
            color='#ddd'
            style={{marginLeft:20}}/>
        </View>
      </View>
    );
  }

  async openDatePicker() {
    try {
      const {action, year, month, day} = await DatePickerAndroid.open({
        // 要设置默认值为今天的话，使用`new Date()`即可。
        // 下面显示的会是2020年5月25日。月份是从0开始算的。
        date: new Date()
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        // 这里开始可以处理用户选好的年月日三个参数：year, month (0-11), day
        if (month + 1 < 10) {
          month = '0'+(month+1);
        }
        if (day < 10) {
          day = '0'+day;
        }
        this.setState({
          arrivedDate : year+'/'+(month)+'/'+day
        });
      }
    } catch ({code, message}) {
      ToastAndroid.show('无法打开日期选择器', ToastAndroid.SHORT);
    }
  }

  async openTimePicker() {
    var date = new Date();
    try {
      const {action, hour, minute} = await TimePickerAndroid.open({
        hour: date.getHours(),
        minute: date.getMinutes(),
        is24Hour: true, // 会显示为'2 PM'
      });
      if (action !== TimePickerAndroid.dismissedAction) {
        // 这里开始可以处理用户选好的时分两个参数：hour (0-23), minute (0-59)
        if (hour<10) {
          hour = '0'+hour;
        }
        if (minute<10) {
          minute = '0'+minute;
        }
        this.setState({
          arrivedTime : hour+':'+minute
        });
      }
    } catch ({code, message}) {
      ToastAndroid.show('无法打开时间选择器', ToastAndroid.SHORT);
    }
  }

  getDate() {
    if (this.props.data && this.props.data.arrivedDate) {
      return this.props.data.arrivedDate
    } else {
      var date = new Date();
      month = date.getMonth() + 1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1;
      day = date.getDate() < 10 ? '0'+date.getDate() : date.getDate();
      return (1990+date.getYear())+'/'+month+'/'+day;
    }
  }

  getTime() {
    if (this.props.data && this.props.data.arrivedTime) {
      return this.props.data.arrivedTime;
    } else {
      var date = new Date();
      hours = date.getHours() < 10 ? '0'+date.getHours() : date.getHours();
      mins = date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getHours();
      return hours+':'+mins;
    }
  }

  getDefaultTitle() {
    if (this.props.data && this.props.data.title) {
      return this.props.data.title;
    } else {
      return '';
    }
  }

  getDefaultDetail() {
    if (this.props.data && this.props.data.detail) {
      return this.props.data.detail;
    } else {
      return '';
    }
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

  onSaveClick() {
    if (this.titleText != '') {
      item = {
        title: this.titleText,
        detail: this.detailText,
        date: this.state.arrivedDate,
        time: this.state.arrivedTime
      }
      this.props.saveTodo(item);
      this.props.navigator.popToTop();
    } else {
      ToastAndroid.show('请先添加备忘录~', ToastAndroid.SHORT);
    }
  }
}

const styles = StyleSheet.create({
  row: {
    height: 63,
    flexDirection: 'row',
    backgroundColor: '#fff'
  }
});
