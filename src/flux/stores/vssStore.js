'use strict';

var AppDispatcher = require('../AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var EventConst = require('../event-const');
var ActionEvent = EventConst.ActionEvent;
var StoreEvent = EventConst.StoreEvent;

var _loginsuccess = false;
var _view = 0; // 0--总览    1--设备    2--单个详情
var _lastview = 0;
var _deviceview = 2; //0--视频   1--报警    2--地图
 /**
 * store
 */
var VssStore = assign({}, EventEmitter.prototype, {
  notifytype:{
    loginstate:1,
    viewstate:2,
    devicechange:3,

  },

  setloginsuccess: function(bsuccess){
    _loginsuccess = bsuccess;
    this.emit(this.notifytype.loginstate);
  },

  getloginsuccess: function(){
    return _loginsuccess;
  },

  setview: function(curview){
    if(curview != 2){
      _lastview = curview;
    }
    _view = curview;
    this.emit(this.notifytype.viewstate);
  },

  getview: function(){
    return _view;
  },

  restoreview : function(){
    _view = _lastview;
    this.emit(this.notifytype.viewstate);
  },

  setdeviceview: function(curview){
    _deviceview = curview;
    this.emit(this.notifytype.viewstate);
  },

  getdeviceview: function(){
    return _deviceview;
  },

  updatedevice:function(deviceinfo){
    
  },

   /**
   * @param {function} callback
   */
  addChangeListener: function(eventtype,callback) {
    this.on(eventtype, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(eventtype,callback) {
    this.removeListener(eventtype, callback);
  }
});

// Register callback to handle all updates
AppDispatcher.register(function(action) {

  switch(action.eventName) {

  case 1:
    VssStore.emitChange(1);
    break;



  default:
    break;
  }
});

module.exports = VssStore;
