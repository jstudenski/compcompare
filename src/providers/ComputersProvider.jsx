import React, { Component, createContext } from 'react'
import { firestore } from '../firebase'

export const ComputersContext = createContext({ user: null })

class ComputersProvider extends Component {
  // state = { computers: ['1','2'] }
  state = {
    number : 10,
  }

  unsubscribeFromFirestore = null;

  componentDidMount = () => {
    this.unsubscribeFromFirestore = firestore.collection('computers').onSnapshot(snapshot => {
      const computers = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      this.setState({ computers })

    })
  }

  componentWillUnmount = () => {
    this.unsubscribeFromFirestore();
  }

  render(){
    const { computers } = this.state
    const { children } = this.props

    return <ComputersContext.Provider value={computers}>{ children }</ComputersContext.Provider>
  }
}

export default ComputersProvider
