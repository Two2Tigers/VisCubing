import './Bar.css';
import * as d3 from "d3";
import React, { Component } from 'react';
import {Axis, axisPropsFromTickScale, LEFT, BOTTOM} from 'react-d3-axis';

const height = 400,
      width = 400,
      padding = 30;

class Barchart extends Component {
  constructor(props) {
    super(props);
    this.getNumBin = this.getNumBin.bind(this);
    this.getBins = this.getBins.bind(this);
    this.getXScale = this.getXScale.bind(this);
    this.getYScale = this.getYScale.bind(this);
    this.getXAxis = this.getXAxis.bind(this);
    this.getYTicks = this.getYTicks.bind(this);
  }

  getNumBin() {
    const array = this.props.data.map(d => d.time);
    return 2 * d3.thresholdSturges(array);
  }

  getBins() {
    const array = this.props.data.map(d => d.time);
    const num_bin = this.getNumBin();
    const bins = d3.bin().thresholds(num_bin)(array);
    return bins;
  }

  getXScale() {
    const bins = this.getBins();
    const x = d3.scaleLinear()
      .domain([bins[0].x0, bins[bins.length - 1].x1])
      .range([0, width]);
    return x;
  }

  getYScale() {
    const bins = this.getBins();
    const y = d3.scaleLinear()
      .domain([0, d3.max(bins, d => d.length)]).nice()
      .range([height, 0]);
    return y;
  }

  getXAxis() {
    const num_bin = this.getNumBin();
    const x = this.getXScale();

    return (
      <g transform={`translate(${padding}, ${height + padding})`}>
        <Axis 
          className="axis-bottom"
          {...axisPropsFromTickScale(x, num_bin)}
          style={{orient: BOTTOM}}
        />
      </g>
    )
  }

  getYTicks() {
    const y = this.getYScale();

    return (
      <g transform={`translate(${padding}, ${padding})`} >
        <Axis
          className="axis-left"
          {...axisPropsFromTickScale(y, y.ticks().length)}
          style={{orient: LEFT}}
        />
      </g>
    )
  }

  render() {
    const bins = this.getBins();
    const x = this.getXScale();
    const y = this.getYScale();
    const xTicks = this.getXAxis();
    const yTicks = this.getYTicks();

    return (
      <svg width={width + 2 * padding} height={height + 2 * padding}>
        <g>
          {bins.map(d => (
            <g key={d.x0} >
              <rect
                x={x(d.x0)}
                y={y(d.length)}
                width={Math.max(0, x(d.x1) - x(d.x0))}
                height={y(0) - y(d.length)}
                fill={'#69c0ff'}
                stroke={'#f0f0f0'}
                transform={`translate(${padding + 1}, ${padding})`}
              />
            </g>))}
            {xTicks}
            {yTicks}
        </g>
      </svg>
    );
  }
}

class Bar extends Component {
  render() {
    const {score_type, year, event_type, time_range, data} = {...this.props};

    return (
      <div className="bar">
        <Barchart year={year} score_type={score_type} event_type={event_type} time_range={time_range} data={data}/>
      </div>
    );
  }
}
  
export default Bar;
