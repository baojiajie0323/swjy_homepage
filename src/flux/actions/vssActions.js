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
  		timeout: AJAXTIMEOUT,
  		data:({
        'username':username,
        'password':password,
        'loginPlat':0
  		}),
  		error: function(xhr, textStatus, thrownError){
        message.error('与服务器建立连接失败');
        Store.setloginsuccess(true);
  		},
  		success: function(response) {
        var res = JSON.parse(response);
        if(res.result == "ok"){
          Store.setloginsuccess(true);
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
      timeout: AJAXTIMEOUT,
      data:'',
      error: function(xhr, textStatus, thrownError){
        message.error('与服务器建立连接失败');
      },
      success: function(response) {
        var res = JSON.parse(response);
        if(res.result == "ok"){
          var devicelist = [
            {
              id:0,
              name:'江门监狱所外就医设备1',
              police:[{name:'王申明'},{name:'张林'},{name:'刘涛'}],
              prisoner:[{name:'李玉'},{name:'王强'}],
              runtime:'2小时',
              isalarm:false,
              puid:'000000000000000000000',
              chnid:1
            },
            {
              id:1,
              name:'江门监狱所外就医设备2',
              police:[{name:'张星'},{name:'沈琳'}],
              prisoner:[{name:'王三鑫'}],
              runtime:'1小时',
              isalarm:false,
              puid:'000000000000000000000',
              chnid:1
            },
            {
              id:2,
              name:'江门监狱所外就医设备3',
              police:[{name:'李小林'}],
              prisoner:[{name:'李玉'},{name:'王强'}],
              runtime:'6小时',
              isalarm:true,
              puid:'000000000000000000000',
              chnid:1
            },
            {
              id:3,
              name:'江门监狱所外就医设备4',
              police:[{name:'李小林'}],
              prisoner:[{name:'李玉'},{name:'王强'}],
              runtime:'6小时',
              isalarm:false,
              puid:'000000000000000000000',
              chnid:1
            },
            {
              id:4,
              name:'江门监狱所外就医设备5',
              police:[{name:'李小林'}],
              prisoner:[{name:'李玉'},{name:'王强'}],
              runtime:'6小时',
              isalarm:false,
              puid:'000000000000000000000',
              chnid:1
            }
          ]
          Store.updatedevice(devicelist);
        }else{
          message.error(res.result);
        }
      }
    });
  },
  getalarmlist:function(){
    $.ajax({
      url: '../ui/warning/getwarninglist.do',
      type: 'POST',
      timeout: AJAXTIMEOUT,
      data:'',
      error: function(xhr, textStatus, thrownError){
        message.error('与服务器建立连接失败');
      },
      success: function(response) {
        var res = JSON.parse(response);
        if(res.result == "ok"){

        }else{
          message.error(res.result);
        }
      }
    });
  },
  login_platform:function(){
    $.ajax({
        url : "../../loginplatformbywj.do",
        type : 'POST',
        timeout : AJAXTIMEOUT,
        data:({
            //"startport":startport
        }),
        error: function(xhr, textStatus, thrownError){
           message.error("连接平台失败，无法连接服务器或已经超时！");
        },
        success : function(response) {
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
        url : "../video/startview.do",
        type : 'POST',
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
        url : "../video/stopview.do",
        type : 'POST',
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
            var res = JSON.parse(response);
            if (res.result == "ok") {

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
