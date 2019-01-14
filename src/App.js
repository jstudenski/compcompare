import React, { Component, useContext } from 'react';
import { firestore } from './firebase';
// import Screen from './components/screen'
// import Storage from './components/storage'
// import Processor from './components/processor'
import Cell from './components/cell'
import './App.css';
import { ComputersContext } from './providers/ComputersProvider';

const collectIdsAndDocs = doc => {
  return { id: doc.id, ...doc.data() };
};

class App extends Component {

  state = {
    computers: []
  }

  componentDidMount = async () => {
  //   const snapshot = await firestore.collection('computers').get();
   //  const computers = snapshot.docs.map(computer => ({ id: computer.id, ...computer.data() }));

    firestore.collection('computers').onSnapshot(snapshot => {
      const computers = snapshot.docs.map(collectIdsAndDocs);
      this.setState({ computers });
    });

   //  this.setState({ computers });
  }

  handleChange = event => {
    const { name, value } = event.target;
    const firebaseid = event.target.getAttribute('firebaseid');
    let computers = [...this.state.computers];
    const index = computers.findIndex(el => el.id == firebaseid);
    computers[index][name] = value

    const postRef =  firestore.doc(`computers/${firebaseid}`);
    postRef.update({ [name]: value });
    this.setState({ computers });
  }

  handleNewRecord = async () => {
    firestore.collection('computers').add({createdAt: new Date()});
    // remove
    const snapshot = await firestore.collection('computers').get();
    const computers = snapshot.docs.map(computer => ({ id: computer.id, ...computer.data() }));
    this.setState({ computers });
  };

  handleRemoveComputer = (id) => {
    // console.log(id)
    firestore.doc(`computers/${id}`).delete()
  }

  renderCell = (comp, name, value) => {
    const cellStyle = {
      borderBottom: '1px solid hsl(202,10%,88%)',
      borderLeft: '1px solid hsl(202,10%,88%)',
      boxSizing: 'border-box',
      flexBasis: 200,
    }
    return (
      <form autocomplete="off" style={ cellStyle }>
        <input
          firebaseid={comp.id}
          name={name}
          onChange={this.handleChange}
          type="text"
          value={value}
        />
      </form>
    )
  }


  render() {
    const { computers } = this.state
    // const temp = useContext(ComputersContext);
    // console.log(temp)
    // const posts = useContext(ComputersContext);

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

    const container = {
      borderTop: '1px solid hsl(202,10%,88%)',
      borderRight: '1px solid hsl(202,10%,88%)',
      display: 'flex',
      flexWrap: 'wrap',
      boxSizing: 'border-box'
    }
    // console.log('state:',this.state)
    // console.log('props:',this.props)
    return (
      <main>
        <button onClick={this.handleNewRecord}>New Record</button>
        <section>
            <div className="row" style={{fontSize: 10, height: 'auto'}}>
              { computers.map(comp => <div style={{flexBasis: 200}}>{ comp.id }</div> )}
            </div>
            {/* <div className="row">
              { computers.map(comp => <Cell computers={computers} comp={comp} name={'name'} value={comp.name} /> )}
            </div> */}
            <div className="row">
              { computers.map(comp => this.renderCell(comp, 'screenSize', comp.screenSize)) }
            </div>
            <div className="row">
              { computers.map(comp => this.renderCell(comp, 'storageSize', comp.storageSize)) }
            </div>
            <div className="row">
              { computers.map(comp => (
                <div style={{flexBasis: 200}}>
                  <button onClick={() => this.handleRemoveComputer(comp.id)}>delete</button>
                </div>
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
