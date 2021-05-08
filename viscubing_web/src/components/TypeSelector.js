import React, { Component } from 'react';
import { Select } from 'antd';

const { Option } = Select;

const events = ['222', '333', '333bf', '333fm', '333oh', '444', '444bf', '555', '555bf', '666', '777', 'clock', 'magic', 'minx', 'mmagic', 'pyram', 'skewb', 'sq1']

const event_index ={
  "222": "2x2x2 cube",
  "333": "3x3x3 cube",
  "333bf": "3x3x3 blind folded",
  "333fm": "3x3x3 fewest moves",
  "333oh": "3x3x3 one-handed",
  "444": "4x4x4 cube",
  "444bf": "4x4x4 blind folded",
  "555": "5x5x5 cube",
  "555bf": "5x5x5 blind folded",
  "666": "6x6x6 cube",
  "777": "7x7x7 cube",
  "clock": "clock",
  "magic": "magic",
  "minx": "megaminx",
  "mmagic": "mmagic",
  "pyram": "pyramic",
  "skewb": "skewb",
  "sq1": "square-1",
}

class TypeSelector extends Component {
  render() { 
    return (
      <Select value={this.props.value} style={{ width: 160 }} onChange={this.props.onChange}>
        {events.map(event => <Option value={event} key={event}>{event_index[event]}</Option>)}
    </Select>
    );
  }
}
 
export default TypeSelector;
