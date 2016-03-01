import React from 'react';
import { Button, Icon,QueueAnim,Row,Col,Popconfirm,Message  } from 'antd';
const Store = require('../flux/stores/vssStore');

const Deviceinfo = React.createClass({
  handleReturn(){
    Store.setview(0);
  },
  render() {
    return (
      <QueueAnim id="deviceinfo">
        <div id="detailreturn">
          <Button onClick={this.handleReturn} id="btnrollback">
          <Icon type="bars" />
          返回设备列表
          </Button>
        </div>
        <div className="deviceline" ></div>
        <div key="devicedetail" className="devicedetailblock">
        </div>
        <div key="devicebtnblock1" className="devicebtnblock">
        </div>
        <div key="devicebtnblock2" className="devicebtnblock">
        </div>
        <div key="devicebtnblock3" className="devicebtnblock">
        </div>
        <div key="devicebtnblock4" className="devicebtnblock">
        </div>
        <div key="devicebtnblock5" className="devicebtnblock">
        </div>
      </QueueAnim>
    );
  },
});

export default Deviceinfo;
