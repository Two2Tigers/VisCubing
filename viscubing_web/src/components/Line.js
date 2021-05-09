import * as d3 from "d3";
import './Line.css';
import React, { Component } from 'react';
import {Axis, axisPropsFromTickScale, LEFT, BOTTOM} from 'react-d3-axis';

const width = 1200;
const height = 180;
const padding = 55;

class Line extends Component {
  constructor(props) {
    super(props);
    this.getRenderedData = this.getRenderedData.bind(this);
    this.getXScale = this.getXScale.bind(this);
    this.getYScale = this.getYScale.bind(this);
    this.getXAxis = this.getXAxis.bind(this);
    this.getYAxis = this.getYAxis.bind(this);
    this.showTip = this.showTip.bind(this);
    this.hideTip = this.hideTip.bind(this);
    this.getTip = this.getTip.bind(this);
    this.state = {
      tooltipY: null,
    }
  }

  getRenderedData() {
    const score_type = this.props.score_type;
    const data = this.props.data.map(d => {
      return {
        year: d3.timeParse("%Y")(d.year),
        score: parseInt(d[score_type] / 100),
      }
    })
    return data;
  }

  getXScale() {
    const data = this.getRenderedData();
    const x = d3.scaleTime()
      .domain(d3.extent(data, function(d) { return d.year }))
      .range([ 0, width ])
      .nice();
    return x;
  }

  getYScale() {
    const data = this.getRenderedData();
    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.score)]).nice()
      .range([height, 0]);
    return y;
  }

  getXAxis() {
    const x = this.getXScale();

    return (
      <g transform={`translate(${padding}, ${30 + height})`}>
        <Axis 
          className="axis-bottom"
          {...axisPropsFromTickScale(x, x.ticks().length)}
          style={{orient: BOTTOM}}
        />
      </g>
    )
  }

  getYAxis() {
    const y = this.getYScale();

    return (
      <g transform={`translate(${padding}, ${30})`} >
        <Axis
          className="axis-left"
          {...axisPropsFromTickScale(y, y.ticks().length)}
          style={{orient: LEFT}}
        />
      </g>
    )
  }

  getLine() {
    const data = this.getRenderedData();
    const x = this.getXScale();
    const y = this.getYScale();

    const line = d3.line()
      .x(d => x(d.year))
      .y(d => y(d.score))
    return line(data);
  }

  showTip(e) {
    const event = e.nativeEvent;

    if (event.layerY > 30 && event.layerY < 30 + height) {
      this.setState({tooltipY: event.layerY});
    } else {
      this.hideTip();
    }
  }

  hideTip() {
    this.setState({tooltipY: null});
  }

  getTip() {
    const y = this.getYScale();

    if (this.state.tooltipY) {
      return (<g>
        <line x1={0} y1={this.state.tooltipY} x2={width + 2 * padding} y2={this.state.tooltipY} className="tooltip"/>
        <text x={width - 20} y={this.state.tooltipY - 8} className="tip-label">{d3.format(".4f")(y.invert(this.state.tooltipY - 30))}</text>
      </g>)
    } else {
      return <g></g>
    }
  }

  render() {
    const data = this.getRenderedData();
    const line = this.getLine();
    const xAxis = this.getXAxis();
    const yAxis = this.getYAxis();
    const tip = this.getTip();

    return (
      <div className="line-chart">
        <svg width={width + 2 * padding} height={height + padding + 30} onMouseMove={this.showTip} onMouseOut={this.hideTip} style={{position: "relative", top: "-40"}}>
          <path 
            transform={`translate(${padding + 10}, ${30})`}
            datum={data}
            d={line}
            className="line"
          />
          {tip}
          {xAxis}
          {yAxis}
          <text x={width / 2 + 60} y={height + 60} className="axis-label">Year</text>
          <text x="0" y="0" transform="rotate(-90) translate(-165, 30)" className="axis-label">Best Completion Time</text>
        </svg>
      </div>
    );
  }
}
 
export default Line;
