import React from 'react';
import { Button, Icon,QueueAnim  } from 'antd';

const Login = React.createClass({
  componentDidMount(){
    setTimeout(function(){
      $('#login_bk').css({
        "-webkit-filter":"blur(16px)"
      });
    },100)
    setTimeout(function(){initinput();},800);
  },
  render() {
    return (
      <QueueAnim id="loginpanel" delay={500} >
          <div id="login_bk">
          </div>
          <div key='login_logo' id="login_logo">
          </div>
          <p key='login_title' id="login_title">所外就医防逃脱后台配置管理系统</p>
          <span key='input-username' className="input input--hoshi">
            <input className="input__field input__field--hoshi" type="text" id="input-username" />
            <label className="input__label input__label--hoshi input__label--hoshi-color-1" htmlFor="input-username">
              <span className="input__label-content input__label-content--hoshi">请输入用户名</span>
            </label>
          </span>
          <span key='input-password' className="input input--hoshi">
            <input className="input__field input__field--hoshi" type="password" id="input-password" />
            <label className="input__label input__label--hoshi input__label--hoshi-color-1" htmlFor="input-password">
              <span className="input__label-content input__label-content--hoshi">请输入密码</span>
            </label>
          </span>
          <QueueAnim delay={950} animConfig={[
            { opacity: [1, 0], translateY: [0, 50] },
            { opacity: [1, 0], translateY: [0, -50] }
          ]}>
          <Button key='login_btnlogin' id="login_btnlogin" type="primary">
          登录
          </Button>
          </QueueAnim>
      </QueueAnim>
    );
  },
});

export default Login;
