import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'antd/dist/antd.css';
import App from './components/App';

const csv_file = './data/data.csv';

ReactDOM.render(
  <React.StrictMode>
    <App csv_file={csv_file}/>
  </React.StrictMode>,
  document.getElementById('root')
);
