import React, { Component } from 'react'
import { observer } from 'mobx-react'
import Page from './components/page'
import Website from './store/website'
import PageStore from './store/page'
import UserModel from './models/userModel'

@observer
class App extends Component {
  constructor(){
    super()
     let username = sessionStorage.getItem('username')
     let admin = sessionStorage.getItem('admin')
     let stationID = sessionStorage.getItem('stationID')
     let id = sessionStorage.getItem('id')
    if (username){
      let user = new UserModel(id, username, stationID, admin)
      Website.setUser(user)
      PageStore.createNewProjMenuItem()
    }
  }

  render() {
    return (
      <Page/>
    )
  }
}

export default App
