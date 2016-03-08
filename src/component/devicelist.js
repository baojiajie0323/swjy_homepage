import React from 'react';
import { Button, Icon,QueueAnim,Row,Col,Popconfirm,Message  } from 'antd';
const Store = require('../flux/stores/vssStore');
const DivceEle = require('./deviceelement');

const Devicelist = React.createClass({
  componentDidMount(){
    Store.addChangeListener(Store.notifytype.devicechange,this.handledevicelist);
  },
  getInitialState(){
    return ({
      devicelist:Store.getdevicelist()
    });
  },
  handledevicelist(){
    this.setState({
      devicelist:Store.getdevicelist()
    })
  },
  handleexpand(e){
    Store.setview(1);
    e.stopPropagation();
  },
  render() {
    var devicecount = this.state.devicelist.length + '个设备';
    var deviceElement = [];
    var nindex = 1;
    this.state.devicelist.forEach(function(data){
      var keyline = 'deviceline' + data.id;
      var keyele = 'deviceele' + data.id;
      deviceElement.push(<DivceEle index={nindex} element={data} key={keyele} />);
      deviceElement.push(<div key={keyline} className="deviceline" ></div>);
      nindex ++;
    });

    return (
      <QueueAnim type="bottom" duration={500} interval={50} id="devicelist">
        <div key="devicecount" id="devicecount">
          <p>设备列表</p>
          <p>{devicecount}</p>
        </div>
        <Button id="btnexpand" onClick={this.handleexpand} type="primary">
          <Icon type="right" />
        </Button>
        <div key="devicelinecount" className="deviceline" ></div>
        {deviceElement}
      </QueueAnim>
    );
  },
});

export default Devicelist;
