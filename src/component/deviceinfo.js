import React from 'react';
import { Button, Icon,QueueAnim,Row,Col,Popconfirm,Message  } from 'antd';
const Store = require('../flux/stores/vssStore');
const Tabui = require('./tabui');
const Deviceinfo = React.createClass({
  getInitialState(){
    return ({
      curseltab:3,
      curmovtab:0
    });
  },
  handleReturn(){
    Store.setview(0);
  },
  onClickTab1(){
    this.setState({
      curseltab:1
    });
  },
  onClickTab2(){
    this.setState({
      curseltab:2
    });
  },
  onClickTab3(){
    this.setState({
      curseltab:3
    });
  },
  onMoveTab1(){
    this.setState({
      curmovtab:1
    });
  },
  onMoveTab2(){
    this.setState({
      curmovtab:2
    });
  },
  onMoveTab3(){
    this.setState({
      curmovtab:3
    });
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
        <QueueAnim type="scale">
          <div key="devicedetail" className="devicedetailblock">
          </div>
        </QueueAnim>
        <div className="deviceline" ></div>
        <Tabui key="tab1" clickcb={this.onClickTab1} movecb={this.onMoveTab1} icontype="video-camera"
         title="实时视频" selected={this.state.curseltab == 1} hover={this.state.curmovtab == 1} />
        <div className="deviceline" ></div>
        <Tabui key="tab2" clickcb={this.onClickTab2} movecb={this.onMoveTab2} icontype="notification"
         title="最近报警" selected={this.state.curseltab == 2} hover={this.state.curmovtab == 2} />
        <div className="deviceline" ></div>
        <Tabui key="tab3" clickcb={this.onClickTab3} movecb={this.onMoveTab3} icontype="environment-o"
         title="地图定位" selected={this.state.curseltab == 3} hover={this.state.curmovtab == 3} />
      </QueueAnim>
    );
  },
});

export default Deviceinfo;
