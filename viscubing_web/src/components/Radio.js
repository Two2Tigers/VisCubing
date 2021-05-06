import React, { Component } from 'react';
import { Radio } from 'antd';

class ABRadio extends Component {
  constructor(props) {
    super(props);
  }
  
  render() { 
    return (
      <Radio.Group onChange={this.props.onChange} value={this.props.value}>
        <Radio value={"best"}>Best</Radio>
        <Radio value={"average"}>Average</Radio>
      </Radio.Group>
    );
  }
}
 
export default ABRadio;
