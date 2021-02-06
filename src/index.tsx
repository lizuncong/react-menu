import React from 'react';
import ReactDOM from 'react-dom';
import Tree from './components/tree';
import data from './data';

ReactDOM.render(<Tree data={data} />, document.getElementById('root'));
