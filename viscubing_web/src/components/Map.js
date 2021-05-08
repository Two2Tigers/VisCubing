import React, { Component } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import { Spin } from 'antd';
import * as legend from 'd3-svg-legend';
import './Map.css';

let height = 400;
let width = 800;
let padding = 40;

let map = null,
    projection = null,
    path = null;
d3.json("https://unpkg.com/world-atlas@2.0.2/countries-110m.json").then(topoData => {
  map = topojson.feature(topoData, topoData.objects.countries);

  projection = d3.geoEqualEarth()
    .fitExtent([[padding, 10], [padding + width, 10 + height]], map)
  path = d3.geoPath(projection);
});

const colorMap = d3.interpolateReds;
const scale = d3.scaleQuantize()
  .domain([0, 1])
  .range([colorMap(0), colorMap(0.2), colorMap(0.4), colorMap(0.6), colorMap(0.8), colorMap(1)]);

const color_legend = legend.legendColor()
  .labelFormat(d3.format(".2f"))
  .title("% of competitors")
  .titleWidth(130)
  .scale(scale);


class Map extends Component {

  constructor(props) {
    super(props);
    this.getColoredPath = this.getColoredPath.bind(this);
    this.ref = React.createRef();
  }

  getColor(ratio) {
    return colorMap(ratio / 0.1);
  }

  getColoredPath(feature) {
    if (this.props.data && this.props.data[feature.properties.name]) {
      const ratio = parseInt(this.props.data[feature.properties.name]) / this.props.data.total;
      return <path 
        id={feature.properties.name}
        key={feature.properties.name}
        d={path(feature)}
        fill = {this.getColor(ratio)}
      />
    } else {
      return <path 
        id={feature.properties.name}
        key={feature.properties.name}
        d={path(feature)}
        className={"country"} 
      />
    }
  }

  render() { 

    const host = d3.select(this.ref.current);
    host.append("g")
      .call(color_legend)
      .attr("transform", `translate(${padding}, ${20})`);
    
    if (map) {
      return (
        <div>
          <svg width={width + 2 * padding} height={height + padding} ref={this.ref}>
              <path className="sphere shadow" d={path({type: "Sphere"})} />
              {
                map.features.map( feature => this.getColoredPath(feature))
              }
          </svg>
        </div>
      );
    } else {
      return <Spin />
    }
  }
}
 
export default Map;
