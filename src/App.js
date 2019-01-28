import React, { Fragment, Component } from 'react';
import { firestore } from './firebase';
import Screen from './components/screen'
// import Storage from './components/storage'
// import Processor from './components/processor'
import NewProperty from './components/newProperty'
import Cell from './components/cell'
import Row from './components/row'
import './App.css';
import {
  addItem,
  collectIdsAndDocs,
  removeItem,
} from './utils/functions'

// const Row = styled.section`
//   padding: 4em;
//   background: papayawhip;
// `;

class App extends Component {
  state = {
    computers: [],
    rows: [],
    inputValue: '',
  }

  componentDidMount = async () => {
    firestore.collection('computers').orderBy('displayOrder').onSnapshot(snapshot => {
      const computers = snapshot.docs.map(collectIdsAndDocs);
      this.setState({ computers });
      console.log('1')
    });
    console.log('2')
    firestore.collection('rows').orderBy('displayOrder').onSnapshot(snapshot => {
      const rows = snapshot.docs.map(collectIdsAndDocs);
      this.setState({ rows });
      console.log('3')
    });
    console.log('4')
  }

  handleChange = event => {
    const { name, value } = event.target;
    const firebaseid = event.target.getAttribute('firebaseid');
    let computers = [...this.state.computers];
    const index = computers.findIndex(el => el.id === firebaseid);
    computers[index][name] = value
    const postRef = firestore.doc(`computers/${firebaseid}`);
    postRef.update({ [name]: value });
  }

  render() {
    const { computers, rows } = this.state

    return (
      <main>
        {/* <section>
          <Row collection={'computers'} items={computers} property='id' disabled/>
          <Row collection={'computers'} items={computers} property='name'/>
          <Row collection={'computers'} items={computers} property='screenSize' type='number'/>
          <Row collection={'computers'} items={computers} property='storageSize'/>
          <div className="row">
            <Cell />
            { computers.map(item => (
              <Cell center key={item.id } item={item}>
                <button onClick={() => removeItem('computers', item.id)}>delete</button>
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
        </section> */}

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
        <h4>Edit Title</h4>
        <button onClick={() => addItem('computers')}>New Record</button>
        <section>
        <Row items={computers} property='id' disabled/>
        <Row items={computers} property='displayOrder' disabled/>
        { rows.map(row => (
          <Fragment key={row.id}>
            <Row
              collection={'row'}
              items={computers}
              property={ row.displayName }
            />
          </Fragment>
        ))}
        <div className="row">
          <Cell />
          { computers.map(item => (
            <Cell center key={item.id } item={item}>
              <button onClick={() => removeItem('computers', item.id)}>delete</button>
            </Cell>
          ))}
        </div>
        </section>
        <hr />
        <h4>Rows</h4>
        <NewProperty rows={rows}/>
        <section>
        <Row items={rows} collection={'rows'} property='id' disabled/>
        <Row items={rows} collection={'rows'} property='displayName'/>
        <Row disabled items={rows} property='displayOrder'/>
        <div className="row">
          <Cell />
          { rows.map(item => (
              <Cell center key={item.id } item={item}>
                <button onClick={() => removeItem('rows', item.id)}>delete</button>
              </Cell>
          ))}
        </div>
        </section>
        {/* <Row items={rows} property='displayName'/>
        <Row items={rows} property='id'/> */}
      </main>
    );
  }
}

export default App;
