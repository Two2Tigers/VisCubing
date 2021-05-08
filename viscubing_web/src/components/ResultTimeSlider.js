import { Slider } from 'antd';
import React, { Component } from 'react';

class ResultTimeSlider extends Component {
  render() {
    const {value, min, max, onChange} = {...this.props} 
    return (
        <Slider range value={value} onChange={onChange} min={min} max={max} />
    );
  }
}

export default ResultTimeSlider
