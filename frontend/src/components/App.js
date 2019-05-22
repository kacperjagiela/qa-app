import React, { Component } from 'react';
import '../styles/App.css';
import {Link} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <h1>Let's know each other! <img src='https://via.placeholder.com/60x60.png' alt="okay"/></h1>
        <h2>Enter the best Question and Answers site</h2>
        <Link to="/register"><button>Join now</button></Link>
        <h4>or <Link to="/login">log in</Link></h4>
      </div>
    );
  }
}

export default App;
