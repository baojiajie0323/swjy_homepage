import React from 'react';
import { Button, Icon,QueueAnim,Row,Col,Popconfirm,Message,Pagination} from 'antd';
const Store = require('../flux/stores/vssStore');
const DivceEle = require('./deviceelement');

const Devicelist = React.createClass({
  componentDidMount(){
    Store.addChangeListener(Store.notifytype.devicechange,this.handledevicelist);
  },
  getInitialState(){
    return ({
      devicelist:Store.getdevicelist(),
      current: Store.getCurrentPage()
    });
  },
  handledevicelist(){
    var _this2 = this;
    setTimeout(function(){
      _this2.setState({
        devicelist:Store.getdevicelist()
      })
    },3000);
  },
  handleexpand(e){
    Store.setview(1);
    e.stopPropagation();
  }, 
  onChange(page) {
    Store.setCurrentPage(page);
    this.setState({
      current: Store.getCurrentPage()
    });
  },
  render() {
    var devicecount = this.state.devicelist.length + '个设备';
    var deviceElement = [];
    var nindex = 1;
    var curindex = (this.state.current - 1)*5;
    var bigicon = [];
    for (var i = curindex; i < curindex + 5; i++) {
      if(i >= this.state.devicelist.length){
        break;
      }
      var data = this.state.devicelist[i];
      var keyline = 'deviceline' + data.id;
      var keyele = 'deviceele' + data.id;
      deviceElement.push(<DivceEle index={nindex} element={data} key={keyele} />);
      deviceElement.push(<div key={keyline} className="deviceline" ></div>);
      bigicon.push(data.id);
      nindex ++;
    }
    if(window.frames["mapiframe"] != undefined && window.frames["mapiframe"].contentWindow.setbigIcon != undefined){
        window.frames["mapiframe"].contentWindow.setbigIcon(bigicon);
    }


    return (
      <QueueAnim type="left" duration={[500,0]} interval={0} id="devicelist">
        <div key="devicecount" id="devicecount">
          <p>设备列表</p>
          <p>{devicecount}</p>
        </div>
        <Button id="btnexpand" onClick={this.handleexpand} type="primary">
          <Icon type="right" />
        </Button>
        <div key="devicelinecount" className="deviceline" ></div>
        {deviceElement}
        <div key="pageinfo" id="pageinfo">
          <Pagination current={this.state.current} onChange={this.onChange} total={this.state.devicelist.length * 2} />
        </div>
      </QueueAnim>
    );
  },
});

export default Devicelist;
