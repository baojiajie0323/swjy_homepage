import React from 'react';
import { Button, Icon,QueueAnim,Row,Col,Popconfirm,Message  } from 'antd';
const Store = require('../flux/stores/vssStore');

const Deviceelement = React.createClass({
  handleClickblock(){
    Store.gotodetail(this.props.element.id);
  },
  render() {
    var pstyle={
      color:this.props.element.isalarm?'rgb(253,65,66)':'rgb(56,131,222)',
      fontSize:'13px',
      marginLeft:'20px',
      fontWeight:'bold'
    }
    var devicestyle = {
      marginLeft:'15px',
      width:'66px',
      height:'66px',
      backgroundColor:this.props.element.isalarm?'rgb(253,65,66)':'rgb(56,131,222)',
      borderRadius:'33px',
      pointerEvents:'none',
      backgroundImage: this.props.element.isalarm?'url("./img/红设备小.png")':'url("./img/蓝设备小.png")',
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
      color:this.props.element.isalarm?'rgb(253,65,66)':'rgb(56,131,222)',
      fontSize:'15px'
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
      <Row type="flex" justify="start" align="middle" onClick={this.handleClickblock} className="deviceblock">
        <p style={pstyle}>{this.props.index}</p>
        <div style={devicestyle}>
        </div>
        <div style={formstyle}>
          <p style={p1style}>{text_name}</p>
          <p style={p2style}>{text_police}</p>
          <p style={p2style}>{text_prisoner}</p>
          <p style={p2style}>{text_time}</p>
        </div>
        <p style={statestyle}>{this.props.element.isalarm?'报警中':'正常'}</p>
      </Row>
    );
  },
});

export default Deviceelement;
