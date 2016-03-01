import React from 'react';
import { Button, Icon,QueueAnim,Row,Col,Popconfirm,Message  } from 'antd';
const Store = require('../flux/stores/vssStore');

const Devicelist_big = React.createClass({
  handleClickblock(e){
    Store.setview(2);
  },
  render() {
    return (
      <div onClick={this.handleClickblock} id="devicelist_big">
        <QueueAnim>
        <div key='deviceblock_big1' className="deviceblock_big"></div>
        </QueueAnim>
        <QueueAnim>
        <div key='deviceblock_big2' className="deviceblock_big"></div>
        </QueueAnim>
        <QueueAnim>
        <div key='deviceblock_big3' className="deviceblock_big"></div>
        </QueueAnim>
        <QueueAnim>
        <div key='deviceblock_big4' className="deviceblock_big"></div>
        </QueueAnim>
        <QueueAnim>
        <div key='deviceblock_big5' className="deviceblock_big"></div>
        </QueueAnim>
        <QueueAnim>
        <div key='deviceblock_big6' className="deviceblock_big"></div>
        </QueueAnim>
      </div>
    );
  },
});

export default Devicelist_big;
