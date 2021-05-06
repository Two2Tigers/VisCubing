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
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    d3.csv(data).then(table => this.setState({
      dataAll: table,
    }));
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
            <ResultTimeSlider />
          </Col>
          <Col span={2}>
            <h4>Game Type</h4>
          </Col>
          <Col span={2}>
            <TypeSelector />
          </Col>
          <Col span={1}>
            <h4>Year</h4>
          </Col>
          <Col span={2}>
            <YearSelector />
          </Col>
          <Col span={2}>
            <h4>Score Type</h4>
          </Col>
          <Col span={3}>
            <ABRadio />
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
