import React from 'react';
import ReactDOM from 'react-dom';
import '../public/css/styles.css';
import WorldTotals from './WorldTotals';
import Table from './table';

ReactDOM.render(
  <React.StrictMode>
    <WorldTotals />
  </React.StrictMode>,
  document.getElementById('worldTotals'),
);

ReactDOM.render(
  <React.StrictMode>
    <Table />
  </React.StrictMode>,
  document.getElementById('table'),
);
