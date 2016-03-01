import React from 'react';
import { Button, Icon,QueueAnim,message  } from 'antd';
const Store = require('../flux/stores/vssStore');

const Login = React.createClass({
  componentDidMount(){
    setTimeout(function(){
      $('#login_bk').css({
        "-webkit-filter":"blur(16px)"
      });
    },100)
    setTimeout(function(){initinput();},800);

    Store.addChangeListener(Store.notifytype.loginstate,this.handleloginstate);
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
  },
  handleLogin(){
    Store.setloginsuccess(true);
  },
  render() {
    return (
      <div id="loginpanel"  >
          <div id="login_bk">
          </div>
          <QueueAnim id="loginform" type={['right','left']} delay={[800,0]} duration={[1000,500]} interval={[200,100]} >
            {this.state.loginsuccess ? null:[
              <div key='login_logo' id="login_logo">
              </div>,
              <p key='login_title' id="login_title">所外就医防逃脱后台配置管理系统</p>,
              <span key='input-username' className="input input--hoshi">
                <input className="input__field input__field--hoshi" type="text" id="input-username" />
                <label className="input__label input__label--hoshi input__label--hoshi-color-1" htmlFor="input-username">
                  <span className="input__label-content input__label-content--hoshi">请输入用户名</span>
                </label>
              </span>,
              <span key='input-password' className="input input--hoshi">
                <input className="input__field input__field--hoshi" type="password" id="input-password" />
                <label className="input__label input__label--hoshi input__label--hoshi-color-1" htmlFor="input-password">
                  <span className="input__label-content input__label-content--hoshi">请输入密码</span>
                </label>
              </span>,
              <Button key='login_btnlogin' id="login_btnlogin" onClick={this.handleLogin} type="primary">
                登录
              </Button>
            ]}
          </QueueAnim>
      </div>
    );
  },
});

export default Login;
