import React, { Component } from 'react';
import Header from './components/Header';
import Graph from './components/Graph';
import './App.css';

class App extends Component {

  render() {

    return (
      <div className="main-container">
        <Header />
        <div className="graph">
          <Graph />
        </div>
      </div>
    );
  }
}

export default App;
