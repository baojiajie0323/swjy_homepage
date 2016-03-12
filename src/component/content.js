import React from 'react';
import { Button, Icon } from 'antd';
const Devicelist = require('./devicelist');
const Devicelist_big = require('./devicelist_big');
const Deviceinfo = require('./deviceinfo');
const Store = require('../flux/stores/vssStore');
const Multiwnd = require('./multiwnd');
const Alarmpanel = require('./alarminfo');

const Content = React.createClass({
  componentDidMount(){
    Store.addChangeListener(Store.notifytype.viewstate,this.handleviewstate);
    Store.addChangeListener(Store.notifytype.devicechange,this.handledevicelist);
  },
  handledevicelist(){
    setTimeout(function(){
      Store.getdevicelist().forEach(function(data){
        var obj = new Object();
        obj.id = data.id;
        obj.name = data.name;
        obj.x = data.posx;
        obj.y = data.posy;
        obj.image = "images/point2.png";
        window.frames["mapiframe"].contentWindow.addMarker(obj);
      });
    },2000);
  },
  handleviewstate(){
    this.setState({
      view: Store.getview()
    },function(){
      if(this.state.view != 2){
        $('#mapcontainer').css({'visibility':'visible'});
        $('#alarminfo').css({'visibility':'hidden'});
        Multiwnd.show(false);
      }else {
        if(Store.getdeviceview() == 0){
          $('#mapcontainer').css({'visibility':'hidden'});
          $('#alarminfo').css({'visibility':'hidden'});
          Multiwnd.show(true);
        }else if(Store.getdeviceview() == 1){
          $('#mapcontainer').css({'visibility':'hidden'});
          $('#alarminfo').css({'visibility':'visible'});
          Multiwnd.show(false);
        }else if(Store.getdeviceview() == 2){
          $('#mapcontainer').css({'visibility':'visible'});
          $('#alarminfo').css({'visibility':'hidden'});
          Multiwnd.show(false);
        }
      }
    });
  },
  getInitialState() {
    return {
      view: Store.getview()
    };
  },
  render() {
    var realcontent;
    if(this.state.view == 0){ //总览
      realcontent = <Devicelist />
    }else if(this.state.view == 1){ //设备
      realcontent = <Devicelist_big />
    }else if(this.state.view == 2){ //详情
      realcontent = <Deviceinfo deviceid={Store.getcurdeviceid()} />
    }else{
      realcontent = <Devicelist />
    }

    var pstyle = {
      position: 'absolute',
      left: '600px',
      top: '43%',
      fontSize: '42px',
      zIndex:'-2'
    }
    return (
      <div id="content">
        {realcontent}
        <div key="mapcontainer" id="mapcontainer">
          <iframe id="mapiframe" frameBorder={0} src="../gmap/v-common/index.jsp?showBorder=0"></iframe>
        </div>
        <Alarmpanel />
        <p style={pstyle}>无法浏览视频，请安装视频浏览插件</p>
      </div>
    );
  },
});

export default Content;
