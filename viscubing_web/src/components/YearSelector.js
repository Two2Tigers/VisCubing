import React, { Component } from 'react';
import { Select } from 'antd';

const { Option } = Select;

let years = [];
for (let y = 2003; y < 2022; y++) {
  years.push(y);
}

class YearSelector extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value) {
    console.log(`selected ${value}`);
  }

  render() { 
    return (
      <Select defaultValue="2021" style={{ width: 120 }} onChange={this.handleChange}>
        {years.map(year => <Option value={year} key={year}>{year}</Option>)}
    </Select>
    );
  }
}
 
export default YearSelector;
