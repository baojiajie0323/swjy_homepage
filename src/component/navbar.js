import React from 'react';
import { Tabs, Icon,Breadcrumb,Row  } from 'antd';
const TabPane = Tabs.TabPane;
const Store = require('../flux/stores/vssStore');

const tabContent = [
  <span>总览</span>,
  <span>设备</span>
];

const Navbar = React.createClass({
  tabchange(key){
    Store.setview(Number(key));
  },
  render() {
    return (
      <Row id="navbar" type="flex" >
        <Tabs defaultActiveKey="0" onChange={this.tabchange}>
          <TabPane tab={tabContent[0]} key="0"></TabPane>
          <TabPane tab={tabContent[1]} key="1"></TabPane>
        </Tabs>
      {/*<p>在线<span id="onlinenumber">3</span>/离线<span id="offlinenumber">4</span></p>*/}
      </Row>
    );
  },
});

export default Navbar;
