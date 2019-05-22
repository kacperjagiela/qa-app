import React, { Component } from 'react';
import '../styles/App.css';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <h1>Let's know each other</h1>
        <h2>Question and Answers</h2>
        <button>Join now</button>
        <h4>or <a href="#">log in</a></h4>
      </div>
    );
  }
}

export default App;
