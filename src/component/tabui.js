import React from 'react';
import { Button, Icon,QueueAnim,Row,Col,Popconfirm,Message  } from 'antd';
const Store = require('../flux/stores/vssStore');

const Tabui = React.createClass({
  render() {
    var uistyle = {
        width:'100%',
        height:'90px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'white'
    }
    var _borderRadius = '0px';
    var _left = '-100%';
    var _top = '0px';
    var _width = '200%';
    var _height = '100%';
    if(!this.props.selected){
      _borderRadius = '27px';
      _left = '18px';
      _top = '18px';
      _width = '54px';
      _height = '54px';
    }
    var animatebkstyle = {
      position: 'absolute',
      width: _width,
      height: _height,
      borderRadius: _borderRadius,
      left: _left,
      top: _top,
      backgroundColor: 'rgb(56,131,222)',
      transition: 'all 0.2s ease',
      zIndex: '-1'
    }
    var iconstyle = {
      fontSize: '27px',
      color: 'white',
      marginLeft: '32px'
    }
    var pstyle = {
      marginLeft:'30px',
      color:this.props.selected?'white':'rgb(56,131,222)',
      fontSize:'18px'
    }
    return (
      <div onClick={this.props.clickcb} style={uistyle} >
        <div style={animatebkstyle} >
        </div>
        <Icon style={iconstyle} type={this.props.icontype} />
        <p style={pstyle}>{this.props.title}</p>
      </div>
    );
  },
});

export default Tabui;
