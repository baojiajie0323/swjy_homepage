import React from 'react';
import { Button, Icon,QueueAnim,Row,Col,Popconfirm,Message  } from 'antd';
const Store = require('../flux/stores/vssStore');

const Devicelist_big = React.createClass({
  handleClickblock(e){
    Store.setview(2);
  },
  handleshrink(e){
    Store.setview(0);
    e.stopPropagation();
  },
  render() {
    return (
      <div onClick={this.handleClickblock} id="devicelist_big">
        <QueueAnim type="bottom" style={{width:'100%'}}>
        <div key="devicecount_big" id="devicecount_big">
          <p>设备列表</p>
          <p>4个设备</p>
        </div>
        </QueueAnim>
        <Button id="btnshrink" onClick={this.handleshrink} type="primary">
          <Icon type="left" />
        </Button>
        <div className="deviceline" ></div>
        <QueueAnim delay={20} type="scale" >
        <div key='deviceblock_big1' className="deviceblock_big"></div>
        </QueueAnim>
        <QueueAnim delay={40} type="scale" >
        <div key='deviceblock_big2' className="deviceblock_big"></div>
        </QueueAnim>
        <QueueAnim delay={60} type="scale" >
        <div key='deviceblock_big3' className="deviceblock_big"></div>
        </QueueAnim>
        <QueueAnim delay={80} type="scale" >
        <div key='deviceblock_big4' className="deviceblock_big"></div>
        </QueueAnim>
        <QueueAnim delay={100} type="scale" >
        <div key='deviceblock_big5' className="deviceblock_big"></div>
        </QueueAnim>
        <QueueAnim delay={120} type="scale" >
        <div key='deviceblock_big6' className="deviceblock_big"></div>
        </QueueAnim>
      </div>
    );
  },
});

export default Devicelist_big;
