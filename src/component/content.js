import React from 'react';

const Navbar = require('./navbar');
const Devicelist = require('./devicelist');
const Devicelist_big = require('./devicelist_big');
const Deviceinfo = require('./deviceinfo');
const Store = require('../flux/stores/vssStore');

const Content = React.createClass({
  componentDidMount(){
    Store.addChangeListener(Store.notifytype.viewstate,this.handleviewstate);
  },
  handleviewstate(){
    this.setState({
      view: Store.getview()
    },function(){
      $('#mapcontainer').css({
        'visibility':this.state.view == 1?'hidden':'visible'
      })
    });
  },
  getInitialState() {
    return {
      view: Store.getview()
    };
  },
  render() {
    var realcontent;
    if(this.state.view == 0){ //总览
      realcontent = <Devicelist />
    }else if(this.state.view == 1){ //设备
      realcontent = <Devicelist_big />
    }else if(this.state.view == 2){ //详情
      realcontent = <Deviceinfo />
    }else{
      realcontent = <Devicelist />
    }
    return (
      <div id="content">
        <Navbar />
        {realcontent}
        <div key="mapcontainer" id="mapcontainer">
          <iframe id="mapiframe" frameBorder={0} src="http://ditu.baidu.com"></iframe>
        </div>
      </div>
    );
  },
});

export default Content;
