import { Row, Col, Divider } from 'antd';
import './App.css';
import * as d3 from 'd3';
import data from '../data/2019_best.csv';
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
    this.onScoreTypeChange = this.onScoreTypeChange.bind(this);
    this.onEventTypeChange = this.onEventTypeChange.bind(this);
    this.onTimeRangeChange = this.onTimeRangeChange.bind(this);
    this.onYearChange = this.onYearChange.bind(this);
    this.state = {
      year: 2021,
      score_type: 'best',
      event_type: '333',
      time_range: [0, 20],
    }
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    d3.csv(data).then(table => this.setState({
      dataAll: table,
    }));
  }

  onScoreTypeChange(e) {
    this.setState({score_type: e.target.value});
  }

  onEventTypeChange(value) {
    this.setState({event_type: value});
  }

  onTimeRangeChange(value) {
    this.setState({time_range: value});
  }

  onYearChange(value) {
    this.setState({year: value});
  }

  render() { 
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
            <ResultTimeSlider value={this.state.time_range} onChange={this.onTimeRangeChange} />
          </Col>
          <Col span={2}>
            <h4>Game Type</h4>
          </Col>
          <Col span={2}>
            <TypeSelector value={this.state.event_type} onChange={this.onEventTypeChange} />
          </Col>
          <Col span={1}>
            <h4>Year</h4>
          </Col>
          <Col span={2}>
            <YearSelector value={this.state.year} onChange={this.onYearChange} />
          </Col>
          <Col span={2}>
            <h4>Score Type</h4>
          </Col>
          <Col span={3}>
            <ABRadio value={this.state.score_type} onChange={this.onScoreTypeChange} />
          </Col>
        </Row>
        <Divider />
        <Row>
          <Col span={16}>
            <Map />
          </Col>
          <Col span={8}>
            <Bar />
          </Col>
        </Row>
        <Row>
          <Line span={24}/>
        </Row>
      </div>
    );
  }

}
 
export default App;
