/**
 * 列表子项
 */
import React, {Component} from 'react'
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableNativeFeedback,
  TouchableHighlight,
  Alert
} from 'react-native'

import SwipeitemView from 'react-native-swipe-left'
import Icomoon from 'react-native-vector-icons/Icomoon'
import DetailPage from '../editpage/DetailPage'


class ListViewCell extends React.Component {

  static defaultProps = {
    changeItem: null
  }

  constructor(props) {
    super(props);
    this._dataRow = {};
    this.openRowId = '';
    this.state = {
      isShowToTop: true,
      isReFresh: false,
      scrollEnable: true,
      hasIdOpen: false
    };
  }

  render() {
    return (
      <View style={{flex:1, backgroundColor: '#fff'}}>
        {this.renderCell()}
      </View>
    );
  }

  renderCell() {
    let data = this.props.data;
    this.props.data.index = this.props.index;
    if(data.status==='done') {
      iconName='check-square-o';
      iconColor='mediumseagreen';
      textColor='#bbb';
    } else {
      iconName='bell';
      iconColor='orange';
      textColor='#000';
    }
    let rightBtn = this.getButtons();
    let id = '' + this.props.rowID + this.props.sectionID;
    return (
      <View>
        <SwipeitemView
          root={this}
          ref={(row)=>this._dataRow[id] = row}
          id={id}
          data={this.props.content}
          rightBtn={rightBtn}>
            <TouchableNativeFeedback
              onPress={(e) => this.gotoDetailPage()}
              background={TouchableNativeFeedback.Ripple('#ddd', false)}>
              <View style={[styles.listStyle, {flexDirection: 'row', alignItems: 'center'}]}>
                {this.renderRowHeader()}
                {this.renderRowContent(data)}
              </View>
            </TouchableNativeFeedback>
        </SwipeitemView>
        <View style={{height:0.5, backgroundColor:'#ddd'}}>
        </View>
      </View>
    );
  }

  renderRowHeader() {
    return(
      <View style={{flexDirection:'row', alignItems:'center'}}>
        <Icomoon
          name={iconName}
          size={25}
          color={iconColor}
          style={{width:25, marginLeft:5}}
        />
        <View style={{backgroundColor:iconColor, height:80, width: 5, marginLeft:5}}>
        </View>
      </View>
    );
  }

  renderRowContent(data) {
    if (data.status === 'done') {
      titleTextStyle = styles.titleTextDone;
      detailTextStyle = styles.titleDetailDone;
    } else {
      titleTextStyle = styles.titleText;
      detailTextStyle = styles.titleDetail;
    }
    return(
      <View style={styles.textContent}>
        <View style={{flexDirection:'row', alignItems:'center'}}>
          <View style={{backgroundColor:textColor,width:6,height:6,borderRadius:3, marginTop:5}}/>
          <Text style={titleTextStyle} numberOfLines={1}>{data.title}</Text>
        </View>

        <Text style={detailTextStyle} numberOfLines={1}>{data.detail}</Text>

        <View style={{flexDirection:'row', alignItems:'center', marginBottom:10}}>
          <Icomoon
            name='clock'
            size={15}
            color={iconColor}
          />
          <Text style={{color:'#bbb', marginLeft:5}}>{data.arrivedDate+' '+data.arrivedTime}</Text>
        </View>
      </View>
    );
  }

  getButtons() {
    if (this.props.data.status ==='done') {
        text = '恢复'
        color = 'orange'
        underlayColor='#FF8C00'
    } else {
        text = '完成'
        color = 'mediumseagreen'
        underlayColor='#00CD66'
    }
    return [
      {
        id:1,
        text: '删除',
        fontSize: 20,
        width: 80,
        bgColor: 'red',
        underlayColor: '#CC0000',
        onPress: ()=> {
          Alert.alert('提示','确定要删除吗?',
                    [
                      {text:'取消'},
                      {text:'确定',onPress:()=> {
                        let id = '' + this.props.rowID + this.props.sectionID;
                        this._dataRow[id].closeRow();
                        this.props.deleteItem(this.props.data)
                      }}
                    ])
            }
      },
      {
        id: 2,
        text: text,
        width: 80,
        fontSize: 20,
        bgColor: color,
        underlayColor: underlayColor,
        onPress: ()=> {
          let id = '' + this.props.rowID + this.props.sectionID;
          this._dataRow[id].closeRow();
          if (this.props.data.status ==='done') {
              this.props.data.status='undo'
          } else {
            this.props.data.status='done'
          }
          this.props.changeItem(this.props.data)
          this.setState({
            isReFresh:true
          })
        }
      }
    ]
  }

  renderCell1() {
    // Buttons
    var swipeoutBtns = [
      {
        text: '完成',
        backgroundColor: 'orange'
      },
      {
        text: '删除',
        backgroundColor: 'red'
      }
    ];

    return (
      <TouchableNativeFeedback
          style={{flex:1}}
          onPress={(e) => this.gotoDetailPage()}
          background={TouchableNativeFeedback.Ripple('#ddd', false)}>
            <View style={{flex:1, backgroundColor:'#fff'}}>
              <Swipeout left={swipeoutBtns} backgroundColor={'#fff'} sensitivity={-10}>
                <View style={styles.listStyle}>
                  <Text style={{color:'#000'}}>{this.props.content}</Text>
                </View>
              </Swipeout>
              <View style={{height:0.5, backgroundColor:'#ddd'}}>
              </View>
            </View>
      </TouchableNativeFeedback>
    );
  }

  gotoDetailPage() {
      this.props.navigator.push({
        name: 'DetailPage',
        component: DetailPage,
        params: {
          data: this.props.data,
          updateItem: (item) => this.updateItem(item)
        }
      }
    )
  }

  updateItem(item) {
    this.props.data.title = item.title;
    this.props.data.detail = item.detail;
    this.props.data.arrivedDate = item.date;
    this.props.data.arrivedTime = item.time;
    this.props.changeItem(this.props.data)
    this.setState({
      isReFresh:true
    })
  }
}

const styles = StyleSheet.create({
  listStyle: {
    flex: 1,
    height:100,
  },
  textContent: {
    flex:1,
    height: 100,
    marginLeft: 10,
    marginTop:10,
    marginBottom:10,
    justifyContent:'space-between'
  },
  text: {
    fontSize:18,
    color: '#000'
  },
  titleText: {
    fontSize: 18,
    color:'#000',
    marginTop:5,
    marginRight:10,
    marginLeft:3,
    fontWeight :'400'
  },
  titleTextDone: {
    fontSize: 18,
    color:'#bbb',
    marginTop:5,
    marginRight:10,
    marginLeft:3,
    fontWeight :'400',
    textDecorationLine:'line-through'
  },
  titleDetail: {
    fontSize: 15,
    color:'#000',
    marginRight:15,
    marginLeft:10,
    fontWeight :'400'
  },
  titleDetailDone: {
    fontSize: 15,
    color:'#bbb',
    marginRight:15,
    marginLeft:10,
    fontWeight :'400',
    textDecorationLine:'line-through'
  }
});

export default ListViewCell
