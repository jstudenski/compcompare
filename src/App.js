import React, { Component } from 'react';
import { firestore } from './firebase';
import Screen from './components/screen'
import Storage from './components/storage'
import Processor from './components/processor'
import './App.css';

class App extends Component {
  constructor ( props ) {
    super(props);
    this.state = {computers: []}
  }
  componentDidMount = async () => {
    const snapshot = await firestore.collection('data').get();
    const computers = snapshot.docs.map(computer => ({ id: computer.id, ...computer.data() }));
    this.setState({ computers });
  }

  render() {
    const { computers } = this.state

    const grey = '1px solid hsl(202,10%,88%)'
    const border = {
      borderTop: '1px solid #d6d6d6',
      width: 400,
    }

    const grid = {
      display: 'flex',
    }

    const cell = {
      borderBottom: grey,
      borderLeft: grey,
      padding: 6,
    }
    const section = {
      borderTop: grey,
      borderRight: grey,
      overflow: 'hidden',
    }
    const row = {
      border: '1px solid pink',
    }

    console.log(computers)
    return (
      <main>
        <section style={section}>
          <div style={grid}>
            { computers.map(comp =>
              <div style={row}>
                <div style={cell}>{ comp.name }</div>
                <div style={cell}>{ comp.model }</div>
              </div>
            )}
          </div>
        </section>
        <section>
          <div style={border} />
          <Screen aspectRatio={16/10} diagonal={15.4}/>
          <Screen diagonal={13.3}/>
          <Storage size={128}/>
          <div style={border} />
          <Processor/>
          <div style={border} />
        </section>
      </main>
    );
  }
}

export default App;
