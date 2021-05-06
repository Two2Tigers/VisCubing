import React, { Component } from 'react';
import { Select } from 'antd';

const { Option } = Select;

let years = [];
for (let y = 2003; y < 2022; y++) {
  years.push(y);
}

class YearSelector extends Component {
  render() { 
    return (
      <Select value={this.props.value} style={{ width: 80 }} onChange={this.props.onChange}>
        {years.map(year => <Option value={year} key={year}>{year}</Option>)}
    </Select>
    );
  }
}
 
export default YearSelector;
