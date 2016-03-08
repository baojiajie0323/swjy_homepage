import React from 'react';
import { Button, Icon,QueueAnim,Row,Col,Popconfirm,Message  } from 'antd';
const Store = require('../flux/stores/vssStore');

const DeviceelementBig = React.createClass({
  render() {
    var devicestyle = {
      marginLeft:'61px',
      marginTop:'25px',
      marginBottom:'15px',
      width:'112px',
      height:'112px',
      backgroundColor:'rgb(56,131,222)',
      borderRadius:'56px',
      backgroundImage:'url("./img/蓝设备大.png")',
      backgroundRepeat:'no-repeat',
      backgroundPosition:'23px 28px'
    }
    var formstyle = {
      display:'flex',
      flexDirection:'column',
      justifyContent:'center',
      marginLeft:'15px',
      width:'220px'
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
      lineHeight:'18px'
    }
    var statestyle ={
      position:'absolute',
      color:'rgb(56,131,222)',
      fontSize:'15px',
      bottom:'5px',
      right:'10px'
    }
    return (
      <div className="deviceblock_big">
        <div style={devicestyle}>
        </div>
        <div style={formstyle}>
          <p style={p1style}>江门监狱所外就医设备</p>
          <p style={p2style}>就医民警： 王申明、张林、刘涛</p>
          <p style={p2style}>在押烦人： 李玉</p>
          <p style={p2style}>运行时间： 2小时</p>
        </div>
        <p style={statestyle}>正常</p>
      </div>
    );
  },
});

export default DeviceelementBig;
