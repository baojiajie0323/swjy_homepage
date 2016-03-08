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
  },
  getInitialState(){
    return (
      {
        showalarm:false,
        value: ['0-0-0']
      }
    )
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
    return (
      <div type='right' id="alarminfo">
        <Row style={style}>
          <RangePicker style={{width:'500px'}} showTime format="yyyy/MM/dd HH:mm:ss" />
          <TreeSelect {...tProps} />
          <Button type="primary">刷新</Button>
        </Row>
        <QueueAnim duration={[300,0]} interval={[60,0]} >
        {this.state.showalarm?[
          <Alert key="1" message="逃脱报警"
            description="调试设备，属于误报 ————时间：2016-02-15 14:22:33"
            type="success" />,
          <Alert key="2" message="逃脱报警"
            description="调试设备，属于误报 ————时间：2016-02-15 14:22:33"
            type="info" />,
          <Alert key="3" message="防拆报警"
            description="调试设备，属于误报 ————时间：2016-02-15 14:22:33"
            type="warn" />,
          <Alert key="4"
            message="防拆报警"
            description="犯人A将设备手环拆除，企图逃跑，被及时追回 ————时间：2016-02-15 14:22:33"
            type="error" />,
            <Alert key="5" message="逃脱报警"
              description="犯人A将设备手环拆除，企图逃跑，被及时追回 ————时间：2016-02-15 14:22:33"
              type="info" />,
            <Alert key="6" message="逃脱报警"
              description="犯人A将设备手环拆除，企图逃跑，被及时追回 ————时间：2016-02-15 14:22:33"
              type="warn" />,
            <Alert key="7"
              message="防拆报警"
              description="犯人A将设备手环拆除，企图逃跑，被及时追回 ————时间：2016-02-15 14:22:33"
              type="error" />
        ]:null}
        </QueueAnim>

      </div>
    );
  },
});

export default Alarminfo;
