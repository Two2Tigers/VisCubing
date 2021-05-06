import { Slider } from 'antd';
import React, { Component } from 'react';

class ResultTimeSlider extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <Slider range value={this.props.value} onChange={this.props.onChange} />
    );
  }
}

export default ResultTimeSlider
