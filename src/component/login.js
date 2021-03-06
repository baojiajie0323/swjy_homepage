import React from 'react';
import { Button, Icon,QueueAnim,message,Spin  } from 'antd';
const Store = require('../flux/stores/vssStore');
const Action = require('../flux/actions/vssActions');
const Multiwnd = require('./multiwnd');


var isStartSEEvent = false;

const Login = React.createClass({
  componentDidMount(){
    var _this2 = this;
    setTimeout(function(){
      $('#login_bk').css({
        "-webkit-filter":"blur(16px)"
      });
      $('#login_logo').css({
        "-webkit-filter":"blur(0px)",
        'transition': 'all 2s ease'
      });
    },400)
    setTimeout(function(){_this2.initinput();},800);

    Store.addChangeListener(Store.notifytype.loginstate,this.handleloginstate);
  },
  initinput() {
    if (!String.prototype.trim) {
      (function() {
        // Make sure we trim BOM and NBSP
        var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
        String.prototype.trim = function() {
          return this.replace(rtrim, '');
        };
      })();
    }

    [].slice.call( document.querySelectorAll( 'input.input__field' ) ).forEach( function( inputEl ) {
      // in case the input is already filled..
      if( inputEl.value.trim() !== '' ) {
        classie.add( inputEl.parentNode, 'input--filled' );
      }

      // events:
      inputEl.addEventListener( 'focus', onInputFocus );
      inputEl.addEventListener( 'blur', onInputBlur );
    } );

    function onInputFocus( ev ) {
      classie.add( ev.target.parentNode, 'input--filled' );
    }

    function onInputBlur( ev ) {
      if( ev.target.value.trim() === '' ) {
        classie.remove( ev.target.parentNode, 'input--filled' );
      }
    }
  },
  getInitialState() {
    return {
      loginsuccess: Store.getloginsuccess(),
    };
  },
  handleloginstate(){
    var bsuccess = Store.getloginsuccess();
    this.setState({
      loginsuccess: bsuccess,
    });
    setTimeout(function(){
      $('#mainpanel').css({
        opacity:bsuccess?1:0,
        zIndex:bsuccess?2:1
      })
      $('#loginpanel').css({
        opacity:bsuccess?0:1,
        zIndex:bsuccess?1:2
      })
    },300)
    message.success(bsuccess?'登录成功':"您已退出登录");
    if(bsuccess){
      this.startSystemEvent();
      if(!Multiwnd.init(function(startport){
        Action.login_platform(startport,Multiwnd.getlocalip());
      })){
        //如果已经初始化过了。直接登录平台
        Multiwnd.getstartport(function(startport){
            Action.login_platform(startport,Multiwnd.getlocalip());
        })
      }
      Action.getdevicelist();
    }
  },
  handleLogin(){
    Action.login($('#input-username').val(),$('#input-password').val());
  },
  startSystemEvent(){
  	if(!isStartSEEvent){
      if(typeof(SystemEventAPIProxy) == "undefined"){
        return;
      }
  		SystemEventAPIProxy.setURL("./sysevent.do");
  		SystemEventAPIProxy.setSourcePage("homepage_index.jsp");
  		SystemEventAPIProxy.addListener("homepage_index_jsp",this.systemEventListener);
  		SystemEventAPIProxy.setLoginURL("./swjyweb/homepage/index.html");
  		isStartSEEvent = true;
  	}
  },
  systemEventListener(){
    if(e == "15015"){ //告警上报
      if(data != null){
			  console.log('systemevent:',JSON.stringify(data));
		  }
    }
  },
  render() {
    return (
      <div id="loginpanel"  >
          <div id="login_bk">
          </div>
          <QueueAnim id="loginform" type={['right','left']} >
            <div key='login_logo' id="login_logo">
            </div>
              <p key='login_title' id="login_title">所外就医防逃脱后台配置管理系统</p>
            <span key='input-username' className="input input--hoshi">
              <input className="input__field input__field--hoshi" type="text" id="input-username" />

              <label className="input__label input__label--hoshi input__label--hoshi-color-1" htmlFor="input-username">
                <span className="input__label-content input__label-content--hoshi">账号</span>
              </label>
              <Icon className="inputIcon" type="user" />
            </span>
            <span key='input-password' className="input input--hoshi">
              <input className="input__field input__field--hoshi" type="password" id="input-password" />

              <label className="input__label input__label--hoshi input__label--hoshi-color-1" htmlFor="input-password">
                <span className="input__label-content input__label-content--hoshi">密码</span>
              </label>
              <Icon className="inputIcon" type="lock" />
            </span>
            <Button key='login_btnlogin' id="login_btnlogin" onClick={this.handleLogin} type="primary">
              登录
            </Button>
          </QueueAnim>
      </div>
    );
  },
});

export default Login;
