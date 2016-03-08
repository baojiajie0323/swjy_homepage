'use script';
import { Message  } from 'antd';

var _startport = 0;
var _hasinit = false;

function PostCmd(cmd){
  return JSON.parse(document.getElementById('plugin_video').PostCmd(JSON.stringify(cmd)));
}

var Multiwnd = {
  init(){
    if(_hasinit == true)
      return;
    var _this2 = this;
    _hasinit = true;
    setTimeout(this.getstartport, 500);
    this.setplaywindowcount(1);
    this.addEvent(document.getElementById('plugin_video'), 'PluginNotify', function(notify) {
        var notifyJson = JSON.parse(notify);
        if (notifyJson.notify == "lbuttondblclk") {
            var fullscreen = _this2.ispluginfull();
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
    console.log('ispluginfull :' + JSON.stringify(result))
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
    var code = response.code;
    if(code == 0){
        _startport = response.data.startport;
        //login_platform();  //暂时注释
    }else{
        Message.error("获取起始端口失败");
    }
  },
  setstartport(){
    var cmd = {"cmd": "setstartport", "data":{"startport": _startport}};
    PostCmd(cmd);
  },
  getlocalip(){
    var localip = '';
    var cmd = {"cmd": "getlocalip"};
    var response =  PostCmd(cmd);
    if(response.code == 0)
    {
        localip = response.data.ip1;
    }
    return localip;
  },
  setnatinfo(natip,natport,session,userkdmno){
    var cmd = {"cmd": "setnatinfo", "data":{"enablenat":  30,
                                            "natip":natip,
                                            "natport":natport,
                                            "session":session,
                                            "userkdmno":userkdmno,
                                            "localip":this.getlocalip()
                                           }};
    PostCmd(cmd);
  },
  getplayid(index){
    var cmd = { "cmd": "getplayidbyindex", "data":{"index": index}};
    var response =  PostCmd(cmd);
    if(response.code == 0)
    {
        return response.data.playid;
    }
    return 0;
  },
  setplayinfo(index, playInfo){
    var cmd = {"cmd" : "setplayinfo",
               "data" : {
                   "index" : index,
                   "videortcpip" : playInfo.videortcpip,
                   "videortcpport" : playInfo.videortcpport,
                   "audiortcpip" : playInfo.audiortcpip,
                   "audiortcpport" : playInfo.audiortcpport
               }
              };
    PostCmd(cmd);
  },
  startplay(index,pufactroy){
     var cmd = {"cmd" : "startplay",
               "data" : {
                   "index" : index,
                   "vendor" : pufactroy,
                   "videorecv" : 1,
                   "audiorecv" : 1,
                   "videodec" : 1,
                   "audiodec" : 1,
                   "usetimer" : 0,
                   "videoframebuf" : 0,
                   "audioframebuf" : 0
               }
              };
    PostCmd(cmd);
    this.getvideoresolution(index);
  },
  getvideoresolution(index){
    var cmd = {"cmd" : "getvideoresolution","data" : {
                                        "index":index
                                        }
              };
    PostCmd(cmd);
  },
  stopplay(index){
    var playid = this.getplayid(index);
    var cmd = { "cmd": "stopplay","data": {"index": playid,"videorecv":"1","audiorecv": "1","videodec": "1","audiodec": "1"}};
    PostCmd(cmd);
  },
}

module.exports = Multiwnd;
