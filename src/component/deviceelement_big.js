import React from 'react';
import { Button, Icon,QueueAnim,Row,Col,Popconfirm,Message  } from 'antd';
const Store = require('../flux/stores/vssStore');

const DeviceelementBig = React.createClass({
  handleClickblock(){
    Store.gotodetail(this.props.element.id);
  },
  render() {
    var devicestyle = {
      marginLeft:'61px',
      marginTop:'25px',
      marginBottom:'15px',
      width:'112px',
      height:'112px',
      backgroundColor:this.props.element.isalarm?'rgb(253,65,66)':'rgb(56,131,222)',
      borderRadius:'56px',
      backgroundImage:this.props.element.isalarm?'url("./img/红设备大.png")':'url("./img/蓝设备大.png")',
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
      color:this.props.element.isalarm?'rgb(253,65,66)':'rgb(56,131,222)',
      fontSize:'15px',
      bottom:'5px',
      right:'10px'
    }
    var text_name = this.props.element.name;
    var text_police = '就医民警： ';
    this.props.element.police.forEach(function(police){
      text_police += police.name + ' ';
    });
    var text_prisoner = '在押犯人： ';
    this.props.element.prisoner.forEach(function(prisoner){
      text_prisoner += prisoner.name + ' ';
    });
    var text_time = '运行时间： ' + this.props.element.runtime;

    return (
      <div onClick={this.handleClickblock} className="deviceblock_big">
        <div style={devicestyle}>
        </div>
        <div style={formstyle}>
          <p style={p1style}>{text_name}</p>
          <p style={p2style}>{text_police}</p>
          <p style={p2style}>{text_prisoner}</p>
          <p style={p2style}>{text_time}</p>
        </div>
        <p style={statestyle}>{this.props.element.isalarm?'报警中':'正常'}</p>
      </div>
    );
  },
});

export default DeviceelementBig;
