import * as d3 from "d3";
import React, { Component } from 'react';
import {Axis, axisPropsFromTickScale, LEFT, BOTTOM} from 'react-d3-axis';

const height = 400,
      width = 400,
      padding = 50;

class Barchart extends Component {
  constructor(props) {
    super(props);
    this.getXScale = this.getXScale.bind(this);
    this.getYScale = this.getYScale.bind(this);
    this.getXAxis = this.getXAxis.bind(this);
    this.getYAxis = this.getYAxis.bind(this);
  }

  getXScale() {
    const bins = this.props.getBins();
    const x = d3.scaleLinear()
      .domain([bins[0].x0, bins[bins.length - 1].x1])
      .range([0, width]);
    return x;
  }

  getYScale() {
    const bins = this.props.getBins();
    const y = d3.scaleLinear()
      .domain([0, d3.max(bins, d => d.length)]).nice()
      .range([height, 0]);
    return y;
  }

  getXAxis() {
    const num_bin = this.props.getNumBin();
    const x = this.getXScale();

    return (
      <g transform={`translate(${padding}, ${10 + height})`}>
        <Axis 
          className="axis-bottom"
          {...axisPropsFromTickScale(x, num_bin)}
          style={{orient: BOTTOM}}
        />
      </g>
    )
  }

  getYAxis() {
    const y = this.getYScale();

    return (
      <g transform={`translate(${padding}, ${10})`} >
        <Axis
          className="axis-left"
          {...axisPropsFromTickScale(y, y.ticks().length)}
          style={{orient: LEFT}}
        />
      </g>
    )
  }

  render() {
    const bins = this.props.getBins();
    const x = this.getXScale();
    const y = this.getYScale();
    const xAxis = this.getXAxis();
    const yAxis = this.getYAxis();

    return (
      <svg width={width + 2 * padding} height={height + padding + 20}>
        <g>
          {bins.map(d => (
            <rect
              key={d.x0}
              id={d.x0}
              x={x(d.x0)}
              y={y(d.length)}
              width={Math.max(0, x(d.x1) - x(d.x0))}
              height={y(0) - y(d.length)}
              fill={'#69c0ff'}
              stroke={'#f0f0f0'}
              transform={`translate(${padding + 1}, ${10})`}
              onMouseEnter={this.props.onMouseEnter}
              onMouseOut={this.props.onMouseOut}
            />
          ))}
          {xAxis}
          {yAxis}
          <text x={width / 2} y={height + 45} className="axis-label">Complete Time (s)</text>
          <text x="0" y="0" transform="rotate(-90) translate(-250, 10)" className="axis-label">Number of Competitors</text>
        </g>
      </svg>
    );
  }
}

class Bar extends Component {
  render() {
    const {data, getBins, getNumBin, onMouseEnter, onMouseOut} = {...this.props};

    return (
      <div className="bar">
        <Barchart
          data={data}
          getBins={getBins}
          getNumBin={getNumBin}
          onMouseEnter={onMouseEnter}
          onMouseOut={onMouseOut}
        />
      </div>
    );
  }
}
  
export default Bar;
