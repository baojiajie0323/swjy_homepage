import React from 'react';
import { Button, Icon,QueueAnim,Row,Col,Popconfirm,Message,Tooltip,Alert,DatePicker,Select,TreeSelect     } from 'antd';
const Store = require('../flux/stores/vssStore');
const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;

const treeData = [{
  label: '未处理',
  value: '0-0',
  key: '0-0',
}, {
  label: '已处理',
  value: '0-1',
  key: '0-1',
  children: [{
    label: '设备调试',
    value: '0-1-0',
    key: '0-1-0',
  }, {
    label: '误报',
    value: '0-1-1',
    key: '0-1-1',
  }, {
    label: '超时',
    value: '0-1-2',
    key: '0-1-2',
  }, {
    label: '接处警',
    value: '0-1-3',
    key: '0-1-3',
  }],
}];

const Alarminfo = React.createClass({
  componentDidMount(){
    Store.addChangeListener(Store.notifytype.viewstate,this.handleviewstate);
    Store.addChangeListener(Store.notifytype.alarmchange,this.handlealarmchange);
  },
  getInitialState(){
    return (
      {
        showalarm:false,
        value: ['0-0-0'],
        alarmlist:Store.getalarmlist()
      }
    )
  },
  handlealarmchange(){
    this.setState({
      alarmlist:Store.getalarmlist()
    })
  },
  onChange(value) {
    console.log('onChange ', value, arguments);
    this.setState({ value });
  },
  handleviewstate(){
    if(Store.getview() == 2 && Store.getdeviceview() == 1){
      this.setState({showalarm:true});
      return;
    }
    this.setState({showalarm:false});

  },
  render() {
    var style = {
      marginBottom:'20px'
    }
    const tProps = {
      treeData,
      value: this.state.value,
      onChange: this.onChange,
      multiple: true,
      treeCheckable: true,
      searchPlaceholder: '过滤报警状态',
      treeDefaultExpandAll: true,
      style: {
        marginLeft:10,
        marginRight:20,
        width: 360,
      },
    };

    var alarm = null;
    if(this.state.showalarm){
      alarm = this.state.alarmlist.map(function(data){
        var key = data.id;
        return <Alert key={key} message={data.name}
          description={data.description + ' ————时间：' + data.serverTimeS}
          type="info" />
      });
    }
    return (
      <div type='right' id="alarminfo">
        <Row style={style}>
          <RangePicker style={{width:'500px'}} showTime format="yyyy/MM/dd HH:mm:ss" />
          <TreeSelect {...tProps} />
          <Button type="primary">刷新</Button>
        </Row>
        <QueueAnim duration={[300,0]} interval={[60,0]} >
        {alarm}
        </QueueAnim>

      </div>
    );
  },
});

export default Alarminfo;
