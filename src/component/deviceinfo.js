import React from 'react';
import { Button, Icon,QueueAnim,Row,Col,Popconfirm,Message  } from 'antd';
const Store = require('../flux/stores/vssStore');
const Tabui = require('./tabui');
const Action = require('../flux/actions/vssActions');
const Multiwnd = require('./multiwnd');

const Deviceinfo = React.createClass({
  getInitialState(){
    return ({
      curseltab:Store.getdeviceview()+1,
      curmovtab:0
    });
  },
  handleReturn(){
    var device = Store.getdevice(this.props.deviceid);
    Action.stopplay(Multiwnd.getplayid('0'),device.puid,device.chnid);
    Store.restoreview();
  },
  onClickTab1(){
    this.setState({
      curseltab:1
    });
    Store.setdeviceview(0);
  },
  onClickTab2(){
    this.setState({
      curseltab:2
    });
    Store.setdeviceview(1);
  },
  onClickTab3(){
    this.setState({
      curseltab:3
    });
    Store.setdeviceview(2);
  },
  render() {
    var deviceinfo = Store.getdevice(this.props.deviceid);
    if(window.frames["mapiframe"] != undefined && window.frames["mapiframe"].contentWindow.selectMarker1 != undefined){
        window.frames["mapiframe"].contentWindow.selectMarker1(deviceinfo.id);
    }
    var isalarm = false;

    var bkcolor = 'rgb(39,104,184)';
    var bkimage = 'url("./img/blue.png")';
    var statusText = '正常';
    var p2color = 'rgb(151,198,254)';
    if(isalarm){
      bkcolor = 'rgb(253,65,66)';
      bkimage = 'url("./img/red.png")';
      statusText = '报警';
      p2color = 'rgb(253,209,208)';
    }else if(!deviceinfo.isonline){
      bkcolor = '#919398';
      bkimage = 'url("./img/gray.png")';
      statusText = '离线';
      p2color = 'white';
    }

    var detailstyle = {
      width: '100%',
      height: '188px',
      backgroundColor: bkcolor,
      backgroundImage: bkimage,
      backgroundRepeat:'no-repeat',
      backgroundPosition:'232px 100px',
      padding:'18px 18px'
    }
    var p1style = {
      color:'white',
      marginBottom:'5px'
    }
    var p2style = {
      color:p2color,
      fontSize:'15px'
    }
    var p3style = {
      color:'white',
      position:'absolute',
      right:'18px',
      top:'18px',
    }
    var text_name = deviceinfo.name;
    var text_police = '就医民警： ';
    deviceinfo.police.forEach(function(police){
      text_police += police.name + ' ';
    });
    var text_prisoner = '在押犯人： ';
    deviceinfo.prisoner.forEach(function(prisoner){
      text_prisoner += prisoner.name + ' ';
    });
    var text_time = '运行时间： ' + deviceinfo.runtime;
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
          <div key="devicedetail" style={detailstyle} >
            <p style={p1style}>{text_name}</p>
            <p style={p2style}>{text_police}</p>
            <p style={p2style}>{text_prisoner}</p>
            <p style={p2style}>{text_time}</p>
            <p style={p3style}>{statusText}</p>
          </div>
        </QueueAnim>
        <QueueAnim type="bottom">
        <Tabui key="tab1" clickcb={this.onClickTab1} icontype="video-camera"
         title="实时视频" selected={this.state.curseltab == 1} />
        <div className="deviceline" ></div>
        <Tabui key="tab2" clickcb={this.onClickTab2} icontype="notification"
         title="最近报警" selected={this.state.curseltab == 2} />
        <div className="deviceline" ></div>
        <Tabui key="tab3" clickcb={this.onClickTab3} icontype="environment-o"
         title="地图定位" selected={this.state.curseltab == 3} />
         <div className="deviceline" ></div>
         </QueueAnim>
      </QueueAnim>
    );
  },
});

export default Deviceinfo;
