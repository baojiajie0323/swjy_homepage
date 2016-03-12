'use strict';

const AJAXTIMEOUT = 10*1000;
var AppDispatcher = require('../AppDispatcher');
var Store = require('../stores/vssStore');
var Multiwnd = require('../../component/multiwnd');
import { message } from 'antd';

var VssActions = {
  login:function(username,password){
    $.ajax({
  		url: '../login.do',
  		type: 'POST',
      dataType : 'html',
  		timeout: AJAXTIMEOUT,
  		data:({
        'username':username,
        'password':password,
        'loginPlat':0
  		}),
  		error: function(xhr, textStatus, thrownError){
        message.error('与服务器建立连接失败[login]');
        Store.setloginsuccess(true);
  		},
  		success: function(response) {
        console.log('login:' +  response);
        var res = JSON.parse(response);
        if(res.result == "ok"){
          Store.setloginsuccess(true);
        }else{
          message.error(res.result);
        }
  		}
  	});
  },
  logout:function(){
    $.ajax({
  		url: '../logout.do',
  		type: 'POST',
      dataType : 'html',
  		timeout: AJAXTIMEOUT,
  		error: function(xhr, textStatus, thrownError){
        message.error('与服务器建立连接失败[logout]');
  		},
  		success: function(response) {
        console.log('login:' +  response);
        var res = JSON.parse(response);
        if(res.result == "ok"){
          Store.setloginsuccess(false);
        }else{
          message.error(res.result);
        }
  		}
  	});
  },
  getdevicelist:function(){
    $.ajax({
      url: '../ui/device/getdevicelist.do',
      type: 'POST',
      dataType : 'html',
      timeout: AJAXTIMEOUT,
      data:'',
      error: function(xhr, textStatus, thrownError){
        message.error('与服务器建立连接失败[getdevicelist]');
        //Store.setloginsuccess(true);

        var devicelist = [];
        var posx = 121.764145;
        var posy = 31.039909;
        for(var i = 1; i < 100; i++){
          var deviceinfo = {};
          deviceinfo.id = i.toString();
          deviceinfo.chnid = 0;
          deviceinfo.puid = i.toString();
          deviceinfo.name = "监狱就医设备" + i;
          deviceinfo.police = [{name:'王申明'},{name:'张林'},{name:'刘涛'}];
          deviceinfo.prisoner = [{name:'李玉'},{name:'王强'}];
          deviceinfo.runtime = '2小时';
          deviceinfo.isonline = i%5 == 0?false:true;
          deviceinfo.posx = posx;
          deviceinfo.posy = posy;
          devicelist.push(deviceinfo);
          posx -= 0.1;
          posy -= 0.1;
        }
        Store.updatedevice(devicelist);

      },
      success: function(response){
        console.log('getdevicelist:' +  response);
        var res = JSON.parse(response);
        if(res.result == "ok"){
          var devicelist = [];
          var posx = 121.764145;
          var posy = 31.039909;
          res.data.rows.forEach(function(info){
            var deviceinfo = {};
            deviceinfo.id = info.puid + '_' + info.chnid;
            deviceinfo.chnid = info.chnid;
            deviceinfo.puid = info.puid;
            deviceinfo.name = info.name;
            deviceinfo.police = [{name:'王申明'},{name:'张林'},{name:'刘涛'}];
            deviceinfo.prisoner = [{name:'李玉'},{name:'王强'}];
            deviceinfo.runtime = '2小时';
            deviceinfo.isonline = info.statusName != '离线';
            deviceinfo.posx = posx;
            deviceinfo.posy = posy;
            devicelist.push(deviceinfo);
            posx -= 0.05;
            //posy -= 0.05;
          });
          Store.updatedevice(devicelist);
        }else{
          message.error(res.result);
        }
      }
    });
  },
  getalarmlist:function(puid,begintime,endtime){
    $.ajax({
      url: '../ui/warning/getwarninglist.do',
      type: 'POST',
      dataType : 'html',
      timeout: AJAXTIMEOUT,
      data:({
  			'selectInfo.deviceId':puid
		  }),
      error: function(xhr, textStatus, thrownError){
        message.error('与服务器建立连接失败');
      },
      success: function(response) {
        console.log('getalarmlist:' +  response);
        var res = JSON.parse(response);
        if(res.result == "ok"){
            Store.updatealarmlist(res.data.rows);
        }else{
          message.error(res.result);
        }
      }
    });
  },
  login_platform:function(startport,ip){
    $.ajax({
        url : "../loginplatformbywj.do",
        type : 'POST',
        dataType : 'html',
        timeout : AJAXTIMEOUT,
        data:({
            "startport":startport,
            "localIp":ip
        }),
        error: function(xhr, textStatus, thrownError){
           message.error("连接平台失败，无法连接服务器或已经超时！");
        },
        success : function(response) {
            console.log('login_platform:' +  response);
            var res = JSON.parse(response);
            if (res.result == "ok") {
              Multiwnd.setstartport();
            	var pltSession = res.data.pltSession;
            	if(pltSession != null && typeof(pltSession) != "undefined"){
                  Multiwnd.setnatinfo(pltSession.serverNatIp,pltSession.serverNatPort,pltSession.platSSID,pltSession.kdmno);
            	}
            }else{
              message.error(res.result);
            }
        }
    });
  },
  startplay:function(playid,puid,chnid){
    $.ajax({
        url : "../ui/video/startview.do",
        type : 'POST',
        dataType : 'html',
        timeout : AJAXTIMEOUT,
        async : true,//必须设定为同步
    		data : ({
    			"viewRequest.puid" : puid,
    			"viewRequest.puchlId" : chnid,
    			"viewRequest.playId" : playid
    		}),
        error: function(xhr, textStatus, thrownError){
        	message.error("浏览视频失败，无法连接服务器或已经超时！");
        },
        success : function(response) {
            console.log('startplay:' +  response);
            var res = JSON.parse(response);
            if (res.result == "ok") {
                var playInfo = {};
                var _rPi = res.data.playInfo;
                playInfo.videortcpip = _rPi.videortcp;
                playInfo.videortcpport = _rPi.videortcpport;
                playInfo.audiortcpip = _rPi.audiortcp;
                playInfo.audiortcpport = _rPi.audiortcpport;
                playInfo.pufactory = _rPi.pufactory;
                playInfo.videoIndex = _rPi.videoid;
					      //设置播放信息
                Multiwnd.setplayinfo(0, playInfo);
					      //开始播放
                Multiwnd.startplay(0,playInfo.pufactory);
            }else{
              message.error(res.result);
            }
        }
    });
  },
  stopplay:function(playid,puid,chnid){
    $.ajax({
        url : "../ui/video/stopview.do",
        type : 'POST',
        dataType : 'html',
        timeout : AJAXTIMEOUT,
        async : false,// 必须设定为同步
    		data : ({
    			"viewRequest.puid" : puid,
    			"viewRequest.puchlId" : chnid,
    			"viewRequest.playId" : playid
    		}),
        error: function(xhr, textStatus, thrownError){
        	message.error("停止浏览视频失败，无法连接服务器或已经超时！");
        },
        success : function(response) {
            console.log('stopplay:' +  response);
            var res = JSON.parse(response);
            if (res.result == "ok") {
               Multiwnd.stopplay('0');
            }
            else
            {
               message.error(res.result);
            }
        }
    });
  },
  dispatch:function(funname,value){
    AppDispatcher.dispatch({
      eventName: funname,
      value:value
    });
  }
};

module.exports = VssActions;
