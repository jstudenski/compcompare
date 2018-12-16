import React, { Component } from 'react';
import { firestore } from './firebase';
import Screen from './components/screen'
import Storage from './components/storage'
import Processor from './components/processor'
import './App.css';

class App extends Component {

  componentDidMount = async () => {
    const snapshot = await firestore.collection('computers').get();
    // console.log(computers);
    // computers.forEach(doc => {
    //   const id = doc.id;
    //   const data = doc.data();
    //   console.log({ id, data });
    // });

    const computers = snapshot.docs.map(computer => ({ id: computer.id, ...computer.data() }));
    this.setState({ computers });
  }

  render() {
    const border = {
      borderTop: '1px solid #d6d6d6',
      width: 400,
    }

    console.log(this.state)
    // const sidebar = {
    //   backgroundColor: '#f7f7f7',
    //   width: 200,
    // }

    return (
      <main>
        {/* <aside style={sidebar} /> */}
        <section>
          Hello
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
