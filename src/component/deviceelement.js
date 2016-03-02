import React from 'react';
import { Button, Icon,QueueAnim,Row,Col,Popconfirm,Message  } from 'antd';
const Store = require('../flux/stores/vssStore');

const Deviceelement = React.createClass({
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
      //backgroundImage:'url("./img/device.png")',
    }
    var formstyle = {
      display:'flex',
      flexDirection:'column',
      justifyContent:'center',
      marginLeft:'15px'
    }
    return (
      <Row type="flex" justify="start" align="middle" className="deviceblock">
        <p style={pstyle}>2</p>
        <div style={devicestyle}>
        </div>
        <div style={formstyle}>
          <p>3243243</p>
          <p>3243243</p>
          <p>3243243</p>
        </div>
      </Row>
    );
  },
});

export default Deviceelement;
