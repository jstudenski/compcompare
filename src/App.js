import React, { Fragment, Component } from 'react';
import { firestore } from './firebase';
import Screen from './components/screen'
// import Storage from './components/storage'
// import Processor from './components/processor'
import NewProperty from './components/newProperty'
import Cell from './components/cell'
import Row from './components/row'
import './App.css';

const collectIdsAndDocs = doc => {
  return { id: doc.id, ...doc.data() };
};

class App extends Component {

  state = {
    computers: [],
    rows: [],
    inputValue: '',
  }

  componentDidMount = async () => {
    firestore.collection('computers').onSnapshot(snapshot => {
      const computers = snapshot.docs.map(collectIdsAndDocs);
      this.setState({ computers });
    });
    firestore.collection('rows').orderBy('displayOrder').onSnapshot(snapshot => {
      const rows = snapshot.docs.map(collectIdsAndDocs);
      this.setState({ rows });
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

  handleRemoveComputer = (collection, id) => {
    firestore.doc(`${collection}/${id}`).delete()
  }

  render() {
    const { computers, rows } = this.state
    console.log(rows)
    return (
      <main>
        <button onClick={this.handleNewRecord}>New Record</button>
        <section>
          <Row items={computers} property='id' disabled/>
          <Row items={computers} property='name'/>
          <Row items={computers} property='screenSize' type='number'/>
          <Row items={computers} property='storageSize'/>
          <div className="row">
            <Cell />
            { computers.map(item => (
              <Cell center key={item.id } item={item}>
                <button onClick={() => this.handleRemoveComputer('computers', item.id)}>delete</button>
              </Cell>
            ))}
          </div>
          <div className="row">
            <Cell />
            { computers.map(item => (
              <Cell center key={item.id} item={item}>
                <Screen diagonal={item.screenSize}/>
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
        <hr />

        { rows.map(row => (
          <Fragment key={row.id}>
            {/* {row.displayName} */}
            {/* <Cell>{row.displayName}</Cell> */}
            <Row items={computers} property={ row.displayName }/>
          </Fragment>
        ))}
        <hr />
        <h4>Rows</h4>
        <NewProperty rows={rows}/>
        <Row items={rows} property='id' disabled/>
        <Row items={rows} property='displayName'/>
        <Row disabled items={rows} property='displayOrder'/>
        <div className="row">
          <Cell />
          { rows.map(item => (
              <Cell center key={item.id } item={item}>
                <button onClick={() => this.handleRemoveComputer('rows', item.id)}>delete</button>
              </Cell>
          ))}
        </div>
        {/* <Row items={rows} property='displayName'/>
        <Row items={rows} property='id'/> */}
      </main>
    );
  }
}

export default App;
