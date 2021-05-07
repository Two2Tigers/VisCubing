import React, { Component } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import { Spin } from 'antd';
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

const colors = ["#fff1f0", "#ffccc7", "#ffa39e", "#ff7875", "#ff4d4f", "#f5222d", "#cf1322", "#a8071a", "#820014", "#5c0011"];


class Map extends Component {

  constructor(props) {
    super(props);
    this.getColoredPath = this.getColoredPath.bind(this);
  }

  getColor(ratio) {
    return colors[Math.floor(ratio / 0.1)];
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
    
    if (map) {
      return (
        <div>
          <svg width={width + 2 * padding} height={height + padding}>
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
