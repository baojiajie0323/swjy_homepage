'use strict';

const AJAXTIMEOUT = 10*1000;
var AppDispatcher = require('../AppDispatcher');
var Store = require('../stores/vssStore');
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
  		},
  		success: function(response) {
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
