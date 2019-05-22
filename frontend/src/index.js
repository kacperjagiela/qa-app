import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import Switcher from './components/Switcher';
import './styles/index.css';

ReactDOM.render(
  <BrowserRouter><Switcher/></BrowserRouter>,
  document.getElementById('root')
);
