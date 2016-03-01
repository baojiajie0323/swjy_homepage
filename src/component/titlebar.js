import React from 'react';
import { Button, Icon,QueueAnim,Row,Col,Popconfirm,Message,Tooltip  } from 'antd';
const Store = require('../flux/stores/vssStore');

const Titlebar = React.createClass({
  logout(){
    Store.setloginsuccess(false);
  },
  render() {
    return (
      <Row id="titlebar" type="flex" justify="start" align="middle">
          <Col span="1">
            <img width={46} height={49} style={{marginTop:'5px'}} src="./img/ind_logo.png" />
          </Col>
          <Col span="6">
            <p id="title_systemname">所外就医防逃脱系统</p>
          </Col>
          <Col span="15" />
          <Col span="1">

              <Icon type="user" />
          </Col>
          <Col span="1">
            <p id="title_username">root</p>
          </Col>
          <Tooltip placement="bottom" title="退出系统">
          <Popconfirm placement="bottom" title={'确定要退出系统吗？'} onConfirm={this.logout}>
          <Icon id="btnlogout" type="logout" />
          </Popconfirm>
          </Tooltip>
      </Row>
    );
  },
});

export default Titlebar;
