import React, { Component } from 'react'
import { observer } from 'mobx-react'
import Page from './components/page'

@observer
class App extends Component {
  render() {
    return (
      <Page/>
    )
  }
}

export default App
