import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">

        <header className="App-header">
          <h1>Bitcoin Script Console</h1>
        </header>

        <div class="main">
          <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, textAlign: 'center' }}>
            <h2>Queue</h2>
            <div class="container" id="queue"></div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, textAlign: 'center' }}>
            <h2>Stack</h2>
            <div class="container" id="stack"></div>
          </div>
        </div>

        <div class="console" style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, textAlign: 'center' }}>
          <h2>Console</h2>
          <span style={{ marginRight: 12 }}>></span>
          <input />
        </div>


      </div>
    );
  }
}

export default App;
