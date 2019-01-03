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
    console.log(computers)
    this.setState({ computers });
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { computers } = this.state
    const grey = '1px solid hsl(202,10%,88%)'
    const border = {
      borderTop: '1px solid #d6d6d6',
      marginBottom: 20,
      marginTop: 20,
      width: 400,
    }
    const grid = {
      display: 'flex',
    }
    const cell = {
      borderBottom: grey,
      borderLeft: grey,
      height: 200,
      overflow: 'hidden',
      padding: 6,
    }
    const section = {
      borderRight: grey,
      borderTop: grey,
      overflow: 'hidden',
    }
    const row = {
      border: '1px solid pink',
    }

    const container = {
      borderTop: '1px solid hsl(202,10%,88%)',
      borderRight: '1px solid hsl(202,10%,88%)',
      display: 'flex',
      flexWrap: 'wrap',
      boxSizing: 'border-box'
    }

    return (
      <main>
        <section>
          <article className="container-test">
          <div className="row-test" style={{fontSize: 10, height: 'auto'}}>
              { computers.map(comp =>
                <div style={{flexBasis: 200}}>{ comp.id }</div>
              )}
            </div>
            <div className="row-test" style={{fontSize: 10, height: 'auto'}}>
              { computers.map(comp =>
                <div style={{flexBasis: 200}}>{ comp.name }</div>
              )}
            </div>
            <div className="row-test" style={{fontSize: 10 }}>
              { computers.map(comp =>
                <div style={{flexBasis: 200}}>{ comp.model }</div>
              )}
            </div>
            <div className="row-test" style={{fontSize: 15 }}>
              { computers.map((comp, index) => {
                const current = computers[index].storage;
                let flex = 200;
                let next;
                if (index + 1 < computers.length) {
                  next = computers[index+1].storage;
                  // if ( current === next) { flex += 200 }
                }
                return (
                  <div style={{flexBasis: flex}}>
                    <input
                      name="storage"
                      onChange={this.handleChange}
                      type="text"
                      value={current}
                    />
                  </div>
                )
              })}
            </div>
          </article>
        </section>
        <section>
          <div style={border} />
          <Screen aspectRatio={16/10} diagonal={15.4}/>
          <div style={border} />
          <Screen diagonal={13.3}/>
          <div style={border} />
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
