import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'antd/dist/antd.css';
import App from './components/App';

const csv_file = './data/data.csv';

ReactDOM.render(<App csv_file={csv_file}/>, document.getElementById('root'));
