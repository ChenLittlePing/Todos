/**
 * 已完成完成列表
 * @author Chen Xiaoping
 */
import React, {Component} from 'react'

import {
  View,
  Text,
  StyleSheet,
  ListView
} from 'react-native'

import {connect} from 'react-redux';

import ListViewCell from '../common/ListViewCell'
import {changeTodo, deleteTodo} from '../data/Actions'

class DoneListPage extends Component {

  constructor(props) {
    super(props);
    this.undolist = [];
    this.ds = new ListView.DataSource({rowHasChanged:(r1, r2)=>r1 !== r2});
  }

  render() {
    return(
      <View style={{flex:1}}>
        {this.renderList()}
      </View>
    );
  }

  renderList() {
    this.getUndoItem();
    if (this.props.todoList && this.props.todoList.length != 0) {
      if (this.undolist.length > 0) {
        return (
          <ListView
            dataSource={this.ds.cloneWithRows(this.undolist)}
            renderRow={(rowData) =>
              <ListViewCell
              data={rowData}
              index={rowData.index}
              navigator={this.props.navigator}
              changeItem={(item) => this.updateList(item)}
              deleteItem={(item) => this.deleteItem(item)}
              />}
            enableEmptySections={true}
          />
        );
      } else {
        return (
          <View style={{flex:1, flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
            <Text style={{color:'black', fontSize:16, marginBottom: 100}}>还没有完成的任务哦！</Text>
          </View>
        );
      }
    } else {
      return (
        <View style={{flex:1, flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
          <Text style={{color:'black', fontSize:16, marginBottom: 100}}>没有备忘录哦，快去添加吧！</Text>
        </View>
      );
    }
  }

  getUndoItem() {
    if (this.undolist) {
      this.undolist.splice(0, this.undolist.length);
    }
    for (var i = 0; i < this.props.todoList.length; i++) {
      if (this.props.todoList[i].status === 'done') {
        this.undolist.push(this.props.todoList[i]);
      }
    }
  }

  updateList(item) {
    this.props.dispatch(changeTodo(item));
  }

  deleteItem(item) {
    this.props.dispatch(deleteTodo(item));
  }

}

const styles = StyleSheet.create(

);

function update(store) {
  return {
    todoList: store.changeTodoList.todoList
  }
}

export default connect(update)(DoneListPage);
