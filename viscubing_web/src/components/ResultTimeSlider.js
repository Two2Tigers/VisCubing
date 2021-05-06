import { Slider } from 'antd';
import React, { Component } from 'react';

class ResultTimeSlider extends Component {
  render() {
    return (
      <>
        <Slider range defaultValue={[0, 20]} />
      </>
    );
  }
}

export default ResultTimeSlider
