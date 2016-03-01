import React from 'react';
const Titlebar = require('./titlebar');
const Content = require('./content');
import { QueueAnim } from 'antd';
const Store = require('../flux/stores/vssStore');

const Main = React.createClass({
  componentDidMount(){
    Store.addChangeListener(Store.notifytype.loginstate,this.handleloginstate);
  },
  getInitialState() {
    return {
      loginsuccess: Store.getloginsuccess(),
    };
  },
  handleloginstate(bsuccess){
    this.setState({
      loginsuccess: Store.getloginsuccess(),
    });
  },
  render() {
    return (
      <div id="mainpanel">
        <QueueAnim type={['bottom','top']} style={{height:'60px'}} delay={100} >
          {this.state.loginsuccess?[
            <Titlebar key='titlebar' />
          ]:null}
        </QueueAnim>
        <QueueAnim type={['right','left']} style={{height:'calc(100% - 60px)'}} >
          {this.state.loginsuccess?[
            <Content key='Content'/>
          ]:null}
        </QueueAnim>
        Footbar
      </div>
    );
  },
});

export default Main;
