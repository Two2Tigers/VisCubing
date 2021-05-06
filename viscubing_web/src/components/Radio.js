import React, { Component } from 'react';
import { Radio } from 'antd';

class ABRadio extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.state = {
      value: "best",
    }
  }

  onChange(e) {
    console.log('radio checked', e.target.value);
    this.setState({
      value: e.target.value,
    })
  };
  
  render() { 
    return (
      <Radio.Group onChange={this.onChange} value={this.state.value}>
        <Radio value={"best"}>Best</Radio>
        <Radio value={"average"}>Average</Radio>
      </Radio.Group>
    );
  }
}
 
export default ABRadio;
