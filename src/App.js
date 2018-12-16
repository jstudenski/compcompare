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
    const sidebar = {
      backgroundColor: '#f7f7f7',
      width: 200,
    }

    return (
      <main>
        <aside style={sidebar} />
        <div style={border} />
        <Screen aspectRatio={16/10} diagonal={15.4}/>
        <Screen diagonal={13.3}/>
        <Storage size={128}/>
        <div style={border} />
        <Processor/>
        <div style={ border } />
      </main>
    );
  }
}

export default App;
