import { Row, Col, Divider, Spin } from 'antd';
import './App.css';
import * as d3 from 'd3';
import index from '../data/index.js';
import { bests, countries_index } from '../data/index.js';
import Bar from './Bar';
import Map from './Map';
import Line from './Line';
import ResultTimeSlider from './ResultTimeSlider';
import YearSelector from './YearSelector';
import TypeSelector from './TypeSelector';
import ABRadio from './Radio';
import { Component } from 'react';

let countries = null,
    bests_data = null;
d3.dsv('\t', countries_index).then(table => countries = table);
d3.csv(bests).then(table => bests_data = table);

class App extends Component {

  constructor(props) {
    super(props);
    this.getData = this.getData.bind(this);
    this.filterData = this.filterData.bind(this);
    this.filterBestsData = this.filterBestsData.bind(this);
    this.getNumBin = this.getNumBin.bind(this);
    this.getBins = this.getBins.bind(this);
    this.onScoreTypeChange = this.onScoreTypeChange.bind(this);
    this.onEventTypeChange = this.onEventTypeChange.bind(this);
    this.onTimeRangeChange = this.onTimeRangeChange.bind(this);
    this.onYearChange = this.onYearChange.bind(this);
    this.onMouseEnterBar = this.onMouseEnterBar.bind(this);
    this.onMouseOutBar = this.onMouseOutBar.bind(this);
    this.state = {
      data: null,
      year: 2021,
      score_type: 'best',
      event_type: '333',
      filtered_bests: null,
      time_range: [4, 100],
      bin_interval: 5,
      slider_range: null,
      filtered_data: null,
      seleted_range: null,
      selected_data_aggr: null,
    }
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    const requested_name = this.state.score_type + '_' + this.state.year;
    const requested_data = index[requested_name];

    d3.csv(requested_data).then(table => {
      table.forEach(d => {
        d.eventId === '333fm' | '333mbf' | '333mbo' ? d.time = +d.time : d.time = +d.time / 100;
        d.continent = countries.filter(c => c.id === d.personCountryId)[0].continentId;
      })
      this.setState({
        data: table,
      }, () => {
        this.filterData();
        this.filterBestsData();
      })}
    );
  }

  filterData() {
    if (this.state.data != null) {
      const event_data = this.state.data
        .filter(d => d.eventId === this.state.event_type)
      const slider_min = Math.floor(d3.min(event_data, d => d.time));
      const slider_max = Math.ceil(d3.max(event_data, d => d.time));
      this.setState({slider_range: [slider_min, slider_max]})
      const filtered_data = event_data
        .filter(d => d.time <= this.state.time_range[1])
        .filter(d => d.time >= this.state.time_range[0]);
      this.setState({filtered_data: filtered_data}, () => {
        const bin = this.getBins()[0];
        this.setState({bin_interval: bin.x1 - bin.x0})
      });
    }
  }

  selectData() {
    if (this.state.data && this.state.seleted_range) {
      const selected_data = this.state.filtered_data
        .filter(d => d.time <= this.state.seleted_range[1])
        .filter(d => d.time >= this.state.seleted_range[0]);
      let aggregation = {}
      selected_data.forEach(d => {
        if (!aggregation[d.personCountryId]) {
          aggregation[d.personCountryId] = 1;
        } else {
          aggregation[d.personCountryId] += 1;
        }
      });
      aggregation.total = selected_data.length;
      this.setState({selected_data_aggr: aggregation});
    }
  }

  filterBestsData() {
    const filtered_bests = bests_data
      .filter(d => d.eventId === this.state.event_type)
    this.setState({filtered_bests: filtered_bests});
  }

  getNumBin() {
    const array = this.state.filtered_data.map(d => d.time);
    return 2 * d3.thresholdSturges(array);
  }

  getBins() {
    const array = this.state.filtered_data.map(d => d.time);
    const num_bin = this.getNumBin();
    const bins = d3.bin().thresholds(num_bin)(array);
    return bins;
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

  onMouseEnterBar(e) {
    const min = parseInt(e.target.id);
    this.setState({
      seleted_range: [min, min + this.state.bin_interval]
    }, this.selectData);
  }

  onMouseOutBar() {
    this.setState({
      selected_range: null,
      selected_data_aggr: null
    });
  }

  render() {
    const {year, time_range, event_type, score_type, filtered_data, filtered_bests, slider_range, selected_data_aggr} = {...this.state};

    if (filtered_data && countries) {
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
              <Map
                data={selected_data_aggr}
              />
            </Col>
            <Col span={8}>
              <Bar
                data={filtered_data}
                getBins={this.getBins}
                getNumBin={this.getNumBin}
                onMouseEnter={this.onMouseEnterBar}
                onMouseOut={this.onMouseOutBar}
              />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Line
                event_type={event_type}
                score_type={score_type}
                data={filtered_bests}
              />
            </Col>
          </Row>
        </div>
      );
    } else {
      return <Spin />
    }
  }
}
 
export default App;
