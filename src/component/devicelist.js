import React from 'react';
import { Button, Icon,QueueAnim,Row,Col,Popconfirm,Message  } from 'antd';
const Store = require('../flux/stores/vssStore');
const DivceEle = require('./deviceelement');
const Devicelist = React.createClass({
  handleClickblock(e){
    Store.setview(2);
  },
  handleexpand(e){
    Store.setview(1);
    e.stopPropagation();
  },
  render() {
    return (
      <QueueAnim type="bottom" onClick={this.handleClickblock} id="devicelist">
        <div key="devicecount" id="devicecount">
          <p>设备列表</p>
          <p>4个设备</p>
        </div>
        <Button id="btnexpand" onClick={this.handleexpand} type="primary">
          <Icon type="right" />
        </Button>
        <div className="deviceline" ></div>
        <DivceEle key='deviceblock1' />
        <div className="deviceline" ></div>
        <DivceEle key='deviceblock2' />
        <div className="deviceline" ></div>
        <DivceEle key='deviceblock3' />
        <div className="deviceline" ></div>
        <DivceEle key='deviceblock4' />
        <div className="deviceline" ></div>
        <DivceEle key='deviceblock5' />

      </QueueAnim>
    );
  },
});

export default Devicelist;
