import React from 'react';
import { Button, Icon,QueueAnim,Row,Col,Popconfirm,Message  } from 'antd';
const Store = require('../flux/stores/vssStore');

const Deviceelement = React.createClass({
  getInitialState(){
    return ({
      hoverstate:false
    });
  },
  handleOver(e){
    // if(e.target.className.indexOf('deviceblock') < 0){
    //   e.stopPropagation();
    //   return;
    // }
    // this.setState({
    //   hoverstate:true
    // })
    // e.stopPropagation();
  },
  handleOut(e){
    // console.log(e.target.className);
    // if(e.target.className.indexOf('deviceblock') < 0){
    //   e.stopPropagation();
    //   return;
    // }
    // this.setState({
    //   hoverstate:false
    // })
    // e.stopPropagation();
  },
  render() {
    var pstyle={
      color:'rgb(56,131,222)',
      fontSize:'13px',
      marginLeft:'20px',
      fontWeight:'bold'
    }
    var devicestyle = {
      marginLeft:'15px',
      width:'66px',
      height:'66px',
      backgroundColor:'rgb(56,131,222)',
      borderRadius:'33px',
      pointerEvents:'none',
      backgroundImage:'url("./img/蓝设备小.png")',
      backgroundRepeat:'no-repeat',
      backgroundPosition:'13px 16px'
    }
    var formstyle = {
      display:'flex',
      flexDirection:'column',
      justifyContent:'center',
      marginLeft:'15px',
      width:'190px',
      pointerEvents:'none'
    }

    var p1style={
      color:'rgb(102,137,160)',
      fontSize:'15px',
      marginBottom:'3px',
      fontWeight:'bold'
    }

    var p2style={
      color:'rgb(174,174,174)',
      fontSize:'10px',
      lineHeight:'18px',
    }
    var statestyle ={
      color:'rgb(56,131,222)',
      fontSize:'15px'
    }
    var operatestyle = {
      position:'absolute',
      display:'flex',
      flexDirection:'column',
      justifyContent:'center',
      backgroundColor:'rgb(56,131,222)',
      width:'55px',
      height:'100%',
      right:'0px',
      visibility:this.state.hoverstate?'visible':'hidden'
    }
    var iconstyle1={
      position:'absolute',
      backgroundColor:'rgb(56,131,222)',
      width:'55px',
      height:'36px',
      right:'0px',
      top:'0px',
      color:'white',
      fontSize: '25px',
      padding: '5px'
    }
    var iconstyle2={
      position:'absolute',
      backgroundColor:'rgb(56,131,222)',
      width:'55px',
      height:'36px',
      right:'0px',
      top:'36px',
      color:'white',
      fontSize: '25px',
      padding: '5px'
    }
    var iconstyle3={
      position:'absolute',
      backgroundColor:'rgb(56,131,222)',
      width:'55px',
      height:'36px',
      right:'0px',
      top:'72px',
      color:'white',
      fontSize: '25px',
      padding: '5px'
    }
    return (
      <Row type="flex" justify="start" align="middle" onMouseOver={this.handleOver} onMouseOut={this.handleOut} className="deviceblock">
        <p style={pstyle}>2</p>
        <div style={devicestyle}>
        </div>
        <div style={formstyle}>
          <p style={p1style}>江门监狱所外就医设备</p>
          <p style={p2style}>就医民警： 王申明、张林、刘涛</p>
          <p style={p2style}>在押烦人： 李玉</p>
          <p style={p2style}>运行时间： 2小时</p>
        </div>
        {/*
          {this.state.hoverstate?
            [
              <Icon style={iconstyle1} type="video-camera" />,
              <Icon style={iconstyle2} type="notification" />,
              <Icon style={iconstyle3} type="environment-o" />
            ]:
            <p style={statestyle}>正常</p>
          }
          */}

          <p style={statestyle}>正常</p>
      </Row>
    );
  },
});

export default Deviceelement;
