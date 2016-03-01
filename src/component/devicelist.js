import React from 'react';
import { Button, Icon,QueueAnim,Row,Col,Popconfirm,Message  } from 'antd';
const Store = require('../flux/stores/vssStore');

const Devicelist = React.createClass({
  handleClickblock(e){
    Store.setview(2);
  },
  render() {
    return (
      <QueueAnim onClick={this.handleClickblock} id="devicelist">
        <div key='deviceblock1' className="deviceblock"></div>
        <div key='deviceblock2' className="deviceblock"></div>
        <div key='deviceblock3' className="deviceblock"></div>
        <div key='deviceblock4' className="deviceblock"></div>
        <div key='deviceblock5' className="deviceblock"></div>
        <div key='deviceblock6' className="deviceblock"></div>
      </QueueAnim>
    );
  },
});

export default Devicelist;
