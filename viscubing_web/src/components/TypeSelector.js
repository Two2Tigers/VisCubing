import React, { Component } from 'react';
import { Select } from 'antd';

const { Option } = Select;

const events = ['222', '333', '333bf', '333fm', '333ft', '333mbf', '333mbo', '333oh', '444', '444bf', '555', '555bf', '666', '777', 'clock', 'magic', 'minx', 'mmagic', 'pyram', 'skewb', 'sq1']

class TypeSelector extends Component {
  render() { 
    return (
      <Select value={this.props.value} style={{ width: 80 }} onChange={this.props.onChange}>
        {events.map(event => <Option value={event} key={event}>{event}</Option>)}
    </Select>
    );
  }
}
 
export default TypeSelector;
