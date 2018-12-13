import React, { Component } from 'react';
import Screen from './components/screen'
import Storage from './components/storage'
import Processor from './components/processor'
import './App.css';

class App extends Component {

  render() {
    const border = {
      borderTop: '1px solid #d6d6d6',
      width: 400,
      margin: '20px 5px',
    }
    return (
      <div className="App">
        <div style={border} />
        <Screen aspectRatio={16/10} diagonal={15.4}></Screen>
        <Screen diagonal={13.3}></Screen>
        <Storage size={128}></Storage>
        <div style={border} />
        <Processor></Processor>
        <div style={border} />
      </div>
    );
  }
}

export default App;
