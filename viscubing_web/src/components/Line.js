import * as d3 from "d3";
import './Line.css';
import React, { Component } from 'react';
import {Axis, axisPropsFromTickScale, LEFT, BOTTOM} from 'react-d3-axis';

const width = 1200;
const height = 160;
const padding = 40;

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
        score: parseInt(d[score_type]),
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
      <g transform={`translate(${padding}, ${10 + height})`}>
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
      <g transform={`translate(${padding}, ${10})`} >
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
    this.setState({tooltipY: e.nativeEvent.layerY});
  }

  hideTip() {
    this.setState({tooltipY: null});
  }

  getTip() {
    if (this.state.tooltipY) {
      return <line x1={0} y1={this.state.tooltipY} x2={width + 2 * padding} y2={this.state.tooltipY} className="tooltip"/>
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
        <svg width={width + 2 * padding} height={height + padding + 10} onMouseMove={this.showTip} onMouseOut={this.hideTip}>
          <path 
            transform={`translate(${padding}, ${10})`}
            datum={data}
            d={line}
            className="line"
          />
          {tip}
          {xAxis}
          {yAxis}
        </svg>
      </div>
    );
  }
}
 
export default Line;
