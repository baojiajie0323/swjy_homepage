'use script';
import { Message  } from 'antd';

var _startport = 0;
var _hasinit = false;

function PostCmd(cmd){
  return document.getElementById('plugin_video').PostCmd(JSON.stringify(cmd));
}

var Multiwnd = {
  init(){
    if(_hasinit == true)
      return;
    _hasinit = true;
    setTimeout(this.getstartport, 500);
    this.setplaywindowcount(1);
    this.addEvent(document.getElementById('plugin_video'), 'PluginNotify', function(notify) {
        var notifyJson = JSON.parse(notify);
        if (notifyJson.notify == "lbuttondblclk") {
            var fullscreen = this.ispluginfull();
            var cmd = {
                "cmd": "pluginfullscreen",
                "data": {
                    "fullscreen": fullscreen ? 0 : 1
                }
            };
            PostCmd(cmd);
        }
    });
  },
  show(bvisible){
    $('#plugin_video').css({
      "visibility":bvisible?"visible":"hidden"
    });
  },
  addEvent(obj, name, func){
    if (obj.attachEvent) {
        obj.attachEvent("on"+name, func);
    } else {
        obj.addEventListener(name, func, false);
    }
  },
  ispluginfull(){
    var cmd = { "cmd": "ispluginfullscreen"};
    var result = PostCmd(cmd);
    return result.data.fullscreen;
  },
  setplaywindowcount(windowcount){
    var cmd = {"cmd": "setplaywindowcount", "data":{"count": windowcount}};
    PostCmd(cmd);

    cmd = {"cmd": "setplaywindowpos","data":{"index": "0", "left": "0", "top": "0", "width": "1", "height": "1"}};
    PostCmd(cmd);
  },
  //发送 getstartport 给插件
  getstartport(){
    var cmd = {"cmd": "getstartport"};
    var response =  PostCmd(cmd);
    var ret = eval('('+response+')');
    var code = ret.code;
    if(code == 0){
        _startport = ret.data.startport;
        //login_platform();  //暂时注释
    }else{
        Message.error("获取起始端口失败");
    }
  },

}

module.exports = Multiwnd;
