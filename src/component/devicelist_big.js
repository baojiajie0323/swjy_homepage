import React from 'react';
import { Button, Icon,QueueAnim,Row,Col,Popconfirm,Message  } from 'antd';
const Store = require('../flux/stores/vssStore');
const DeviceElement = require('./deviceelement_big');

const Devicelist_big = React.createClass({
  componentDidMount(){
    Store.addChangeListener(Store.notifytype.devicechange,this.handledevicelist);
  },
  getInitialState(){
    return ({
      devicelist:Store.getdevicelist()
    });
  },
  handleshrink(e){
    Store.setview(0);
    e.stopPropagation();
  },
  render() {
    var devicecount = this.state.devicelist.length + '个设备';
    var deviceelement = this.state.devicelist.map(function(data){
      return <QueueAnim type="scale" >
        <DeviceElement element={data} key='deviceblock_big' />
      </QueueAnim>
    })
    return (
      <div id="devicelist_big">
        <QueueAnim type="bottom" style={{width:'100%'}}>
          <div key="devicecount_big" id="devicecount_big">
            <p>设备列表</p>
            <p>{devicecount}</p>
          </div>
        </QueueAnim>
        <Button id="btnshrink" onClick={this.handleshrink} type="primary">
          <Icon type="left" />
        </Button>
        <div className="deviceline" ></div>

        <div id="devicegrid">
          {deviceelement}
        </div>
      </div>
    );
  },
});

export default Devicelist_big;
