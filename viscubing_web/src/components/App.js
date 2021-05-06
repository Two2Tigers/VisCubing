import { Row, Col, Divider, Spin } from 'antd';
import './App.css';
import * as d3 from 'd3';
import index from '../data/index.js';
import Bar from './Bar';
import Map from './Map';
import Line from './Line';
import ResultTimeSlider from './ResultTimeSlider';
import YearSelector from './YearSelector';
import TypeSelector from './TypeSelector';
import ABRadio from './Radio';
import { Component } from 'react';

class App extends Component {

  constructor(props) {
    super(props);
    this.getData = this.getData.bind(this);
    this.filterData = this.filterData.bind(this);
    this.onScoreTypeChange = this.onScoreTypeChange.bind(this);
    this.onEventTypeChange = this.onEventTypeChange.bind(this);
    this.onTimeRangeChange = this.onTimeRangeChange.bind(this);
    this.onYearChange = this.onYearChange.bind(this);
    this.state = {
      year: 2021,
      score_type: 'best',
      event_type: '333',
      time_range: [4, 100],
      slider_range: null,
      data: null,
      filtered_data: null,
    }
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    const requested_name = this.state.score_type + '_' + this.state.year;
    const requested_data = index[requested_name];
    console.log(requested_data);

    d3.csv(requested_data).then(table => {
      table.forEach(d => {
        d.eventId === '333fm' | '333mbf' | '333mbo' ? d.time = +d.time : d.time = +d.time / 100;
      })
      this.setState({
        data: table,
      }, this.filterData)}
    );
  }

  filterData() {
    if (this.state.data != null) {
      const event_data = this.state.data
        .filter(d => d.eventId === this.state.event_type)
      const slider_min = d3.min(event_data, d => d.time);
      const slider_max = d3.max(event_data, d => d.time);
      this.setState({slider_range: [slider_min, slider_max]})
      const filtered_data = event_data
        .filter(d => d.time <= this.state.time_range[1])
        .filter(d => d.time >= this.state.time_range[0]);
      this.setState({filtered_data: filtered_data});
    }
  }

  onScoreTypeChange(e) {
    this.setState({score_type: e.target.value}, this.getData);
  }

  onEventTypeChange(value) {
    this.setState({event_type: value}, this.getData);
  }

  onTimeRangeChange(value) {
    this.setState({time_range: value}, this.getData);
  }

  onYearChange(value) {
    this.setState({year: value}, this.getData);
  }

  render() {
    const {year, time_range, event_type, score_type, filtered_data, slider_range} = {...this.state};


    if (filtered_data != null) {
      return (
        <div className="app">
  
          <Row className="header">
            <Col span={6}>
              <h1>VisCubing</h1>
            </Col>
            <Col span={2}>
              <h4>Time Range</h4>
            </Col>
            <Col span={4}>
              <ResultTimeSlider value={time_range} onChange={this.onTimeRangeChange} min={slider_range[0]} max={slider_range[1]} />
            </Col>
            <Col span={2}>
              <h4>Game Type</h4>
            </Col>
            <Col span={2}>
              <TypeSelector value={event_type} onChange={this.onEventTypeChange} />
            </Col>
            <Col span={1}>
              <h4>Year</h4>
            </Col>
            <Col span={2}>
              <YearSelector value={year} onChange={this.onYearChange} />
            </Col>
            <Col span={2}>
              <h4>Score Type</h4>
            </Col>
            <Col span={3}>
              <ABRadio value={score_type} onChange={this.onScoreTypeChange} />
            </Col>
          </Row>
          <Divider />
  
          <Row>
            <Col span={16}>
              <Map year={year} score_type={score_type} event_type={event_type} data={filtered_data}/>
            </Col>
            <Col span={8}>
              <Bar year={year} score_type={score_type} event_type={event_type} time_range={time_range} data={filtered_data}/>
            </Col>
          </Row>
          <Row>
            <Line span={24} event_type={event_type} data={filtered_data}/>
          </Row>
        </div>
      );
    } else {
      return <Spin />
    }
  }
}
 
export default App;
