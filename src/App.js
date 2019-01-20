import React, { Component } from 'react';
import { firestore } from './firebase';
// import Screen from './components/screen'
// import Storage from './components/storage'
// import Processor from './components/processor'
import Cell from './components/cell'
import Row from './components/row'
import './App.css';

const collectIdsAndDocs = doc => {
  return { id: doc.id, ...doc.data() };
};

class App extends Component {

  state = {
    computers: []
  }

  componentDidMount = async () => {
    firestore.collection('computers').onSnapshot(snapshot => {
      const computers = snapshot.docs.map(collectIdsAndDocs);
      this.setState({ computers });
    });
  }

  handleChange = event => {
    const { name, value } = event.target;
    const firebaseid = event.target.getAttribute('firebaseid');
    let computers = [...this.state.computers];
    const index = computers.findIndex(el => el.id === firebaseid);
    computers[index][name] = value
    const postRef =  firestore.doc(`computers/${firebaseid}`);
    postRef.update({ [name]: value });
  }

  handleNewRecord = async () => {
    firestore.collection('computers').add({createdAt: new Date()});
  };

  handleRemoveComputer = (id) => {
    firestore.doc(`computers/${id}`).delete()
  }

  render() {
    const { computers } = this.state

    return (
      <main>
        <button onClick={this.handleNewRecord}>New Record</button>
        <section>
          <Row items={computers} property='id' disabled/>
          <Row items={computers} property='name'/>
          <Row items={computers} property='screenSize'/>
          <Row items={computers} property='storageSize'/>
          <div className="row">
            <Cell />
            { computers.map(item => (
              <Cell center key={item.id } item={item}>
                <button onClick={() => this.handleRemoveComputer(item.id)}>delete</button>
              </Cell>
            ))}
          </div>
        </section>
        {/* <section>
          <div style={border} />
          <Screen aspectRatio={16/10} diagonal={15.4}/>
          <div style={border} />
          <Screen diagonal={13.3}/>
          <div style={border} />
          <Storage size={128}/>
          <div style={border} />
          <Processor/>
          <div style={border} />
        </section> */}
      </main>
    );
  }
}

export default App;
