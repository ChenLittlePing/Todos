
/**
 * 所有备忘录
 * @author ChenXiaoping
 */
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  StatusBar,
  Navigator,
  ListView,
  ScrollView,
  Animated,
  TouchableOpacity,
  ToastAndroid,
  DatePickerAndroid,
  TimePickerAndroid,
  BackAndroid
} from 'react-native';
import {connect} from 'react-redux';

import Header from '../common/Header'
import ListViewCell from '../common/ListViewCell'
import NewTodoPage from '../editpage/NewTodoPage'
import { SwipeListView } from 'react-native-swipe-list-view'
import Icomoon from 'react-native-vector-icons/Icomoon'
import {PagerTabIndicator, IndicatorViewPager, PagerTitleIndicator, PagerDotIndicator} from 'rn-viewpager';

import {addTodo, deleteTodo, changeTodo} from '../data/Actions'

class AllTodosPage extends Component {
  constructor(props) {
    super(props);
    this.offset = 0;
    this.direction = 'up';
    this.text = '';
    this.detail = '';
    this.isAnimated = false;
    this.listRecource = [];
    this.ds = new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});
    this.state = {
      // ds: ds,
      hasItem: false,
      scrollEnable: true,
      addItemVisiable: true,
      animatedValue: new Animated.Value(0),
      animatedAddBtn: new Animated.Value(1)
    }
  }

  render() {
    return(
      <View style={{flex:1}}>
        {this.renderInput()}
        {this.renderList()}
        {this.renderAddBtn()}
      </View>
    );
  }

  renderInput() {
    return(
      <View style={{flexDirection:'row', alignItems:'center'}}>
        <TextInput
          ref='textInput'
          style={{flex:1, height: 50, borderColor:'#eee', borderWidth:1, borderRadius:4, marginLeft:5, marginRight:5, marginBottom:5}}
          underlineColorAndroid="#fff0"
          blurOnSubmit={true}
          returnKeyType="join"
          clearButtonMode="always"
          onChangeText={(text) => this.text = text}
          onSubmitEditing={(event) => {
            this.text=event.nativeEvent.text;
            this.openDatePicker()}}
          placeholder={'快速添加备忘录~'}
        />
        <TouchableOpacity activeOpacity={0.5} onPress={() => this.openDatePicker()}>
          <View style={{height:40, width:40, marginRight:10, alignItems:'center'}}>
            <Icomoon
              name='record'
              size={35}
              color='orange'
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  renderList() {
    if (this.state.addItemVisiable) {
      marginBottom = -80;
    } else {
      marginBottom = 0;
    }
      // alert('renderList:  ' + this.props.todoList[this.props.todoList.length-1].title);
    return (
      <ListView
        dataSource={this.ds.cloneWithRows(this.props.todoList)}
        renderRow={(rowData, sectionID, rowID) =>
          <ListViewCell
          data={rowData}
          index={rowID}
          navigator={this.props.navigator}
          changeItem={(item) => this.updateList(item)}
          deleteItem={(item) => (this.deleteItem(item))}
          />}
          onScroll={(e) => {this.onScroll(e); }}
        enableEmptySections={true}
        style={{marginBottom:marginBottom}}
      />
    );
  }

  onScroll(event) {
    var currentOffset = event.nativeEvent.contentOffset.y;
    if(currentOffset <= 5) return;
    var direction = currentOffset > this.offset ? 'down' : 'up';
    this.offset = currentOffset;
    if (!this.isAnimated && this.direction !== direction) {
      this.direction = direction;
      this.isAnimated = true;
      if (direction == 'down') {
        this.state.animatedAddBtn.setValue(1);
        Animated.timing(this.state.animatedAddBtn, {
          toValue: 0,
          duration: 400
        }).start(()=> {
          this.isAnimated = false;
          this.setState({
            addItemVisiable: false
          })
        })
      } else {
        this.state.animatedAddBtn.setValue(0);
        this.state.addItemVisiable = true;
        this.setState({
          addItemVisiable: true
        })
        Animated.timing(this.state.animatedAddBtn, {
          toValue: 1,
          duration: 400
        }).start(()=> {
          this.isAnimated = false
        })
      }
    }
  }

  renderAddBtn() {
    if (!this.state.addItemVisiable) {
      return null;
    }
    return(
      <View style={{alignItems:'flex-end', marginBottom:30}}>
        <TouchableOpacity
          onPress={() => this.onAddPress()}
          activeOpacity={0.5}>
          <Animated.View style={[
            style=styles.addBtn,
            {
              opacity:this.state.animatedAddBtn,
              transform: [{scale: this.state.animatedAddBtn}]
            }
            ]}>
            <Icomoon
              name='plus'
              size={10}
              color='#fff'
            />
          </Animated.View>
        </TouchableOpacity>
      </View>
    )
  }

  addItem() {
    if (this.text != '') {
      item = {
        index: this.props.todoList.length,
        status: 'undo',
        title: this.text,
        detail: this.detail,
        arrivedDate: this.arrivedDate,
        arrivedTime: this.arrivedTime
      }
      this.clean();

      this.props.dispatch(addTodo(item));

      // this.listRecource.push(item);
      // this.setState({
      //   ds: this.state.ds.cloneWithRows(this.listRecource),
      //   hasItem: true
      // })
    } else {
      ToastAndroid.show('请输入要记录的备忘录~', ToastAndroid.SHORT);
    }
  }

  async openDatePicker() {
    if (this.text == '') {
        ToastAndroid.show('请输入要记录的备忘录~', ToastAndroid.SHORT);
        return;
    }
    try {
      const {action, year, month, day} = await DatePickerAndroid.open({
        // 要设置默认值为今天的话，使用`new Date()`即可。
        // 下面显示的会是2020年5月25日。月份是从0开始算的。
        date: new Date()
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        // 这里开始可以处理用户选好的年月日三个参数：year, month (0-11), day
        this.arrivedDate = year+'年'+(month+1)+'月'+day+'日';
        this.openTimerPicker();
      }
    } catch ({code, message}) {
      ToastAndroid.show('无法打开日期选择器', ToastAndroid.SHORT);
    }
  }

  async openTimerPicker() {
    try {
      const {action, hour, minute} = await TimePickerAndroid.open({
        hour: 14,
        minute: 0,
        is24Hour: false, // 会显示为'2 PM'
      });
      if (action !== TimePickerAndroid.dismissedAction) {
        // 这里开始可以处理用户选好的时分两个参数：hour (0-23), minute (0-59)
        this.arrivedTime = hour+':'+minute;
        this.addItem();
      }
    } catch ({code, message}) {
      ToastAndroid.show('无法打开时间选择器', ToastAndroid.SHORT);
    }
  }

  getDate() {
    var date = new Date();
    return (1990+date.getYear())+'年'+(date.getMonth()+1)+'月'+date.getDate()+'日 '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
  }

  updateList(item) {
    // this.listRecource.splice(item.index, 1, item);
    // this.setState({
    //   ds: this.state.ds.cloneWithRows(this.listRecource),
    //   hasItem: true
    // })
    this.props.dispatch(changeTodo(item));
  }

  deleteItem(item) {
    // this.listRecource.splice(item.index, 1);
    // delete this.listRecource[item.index];
    // this.setState({
    //   ds: this.state.ds.cloneWithRows(this.listRecource),
    //   hasItem: true
    // })

    this.props.dispatch(deleteTodo(item));
  }

  onAddPress() {
    this.props.navigator.push({
      name: '新建备忘录',
      component: NewTodoPage,
      params: {
        navigator: this.props.navigator,
        isNew: true,
        saveTodo:(item)=> this.addNewTodo(item)
      }
    });
  }

  addNewTodo(item) {
      this.text = item.title;
      this.detail = item.detail;
      this.arrivedDate = item.date;
      this.arrivedTime = item.time;
      this.addItem();
  }

  clean() {
    this.refs.textInput.clear();
    this.text = '';
    this.arrivedDate = '';
    this.detail = item.detailText;
  }
}

const styles = StyleSheet.create({
  content: {
    flex:1,
    backgroundColor:'#fff',
    marginTop:10,
    marginLeft:10,
    marginRight:10,
    marginBottom: 10,
    borderRadius:4
  },
  headerText : {
    fontSize: 80,
    color: 'orange',
    alignItems: 'center',
    marginTop: 20
  },
  textInput : {
    height: 50,
    fontSize: 300
  },
  addBtn: {
    elevation: 1,
    height: 50,
    width: 50,
    marginRight: 30,
    justifyContent:'center',
    alignItems: 'center',
    backgroundColor:'orange',
    borderRadius:25,
  }
})

function update(state) {
  // alert('update state.changeTodoList.todoList = '+state.changeTodoList.todoList.length)
  // if(state.changeTodoList.todoList.length>0)
  // if (state.changeTodoList.todoList[0].title) {
  //   alert("update"+state.changeTodoList.todoList[state.changeTodoList.todoList.length-1].title)
  // }
  return {
    todoList: state.changeTodoList.todoList
  }
}

export default connect(update)(AllTodosPage);
