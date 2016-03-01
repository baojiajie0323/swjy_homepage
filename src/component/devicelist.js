import React from 'react';
import { Button, Icon,QueueAnim,Row,Col,Popconfirm,Message  } from 'antd';
const Store = require('../flux/stores/vssStore');

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
        <div key='deviceblock1' className="deviceblock"></div>
        <div className="deviceline" ></div>
        <div key='deviceblock2' className="deviceblock"></div>
        <div className="deviceline" ></div>
        <div key='deviceblock3' className="deviceblock"></div>
        <div className="deviceline" ></div>
        <div key='deviceblock4' className="deviceblock"></div>
        <div className="deviceline" ></div>
        <div key='deviceblock5' className="deviceblock"></div>
        <div className="deviceline" ></div>
        <div key='deviceblock6' className="deviceblock"></div>
      </QueueAnim>
    );
  },
});

export default Devicelist;
