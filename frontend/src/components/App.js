import React, { Component } from 'react';
import '../styles/App.css';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <h1>Let's know each other! <img src='https://via.placeholder.com/60x60.png' alt="okay"/></h1>
        <h2>Enter the best Question and Answers site</h2>
        <button>Join now</button>
        <h4>or <a href="#">log in</a></h4>
      </div>
    );
  }
}

export default App;
