import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { PropTypes } from 'mobx-react'
import _ from 'lodash'
import Selection from './selection'
import Profile from './profile'

// const propTypes = {
//   store: PropTypes.object
// }

 /**
  * @name App
  * @class App
  * @description Overarching class for website
  * @extends Component
  * @mobx observer
  */
@observer
class App extends Component {
  componentWillMount() {
    this.props.store.getUsers()
  }

   /**
    * @name renderSelection
    * @description Renders a selected user
    * @return {div}
    * @memberof App
    * @method
    */
  renderSelection(){
    if (_.isEmpty(this.props.store.selectedUser)) return <noscript />
    return (
      <div className='selection'>
        <Selection user={this.props.store.selectedUser}/>
        <button onClick={this.props.store.clearSelectedUser}>Close Profile</button>
      </div>
    )
  }

   /**
    * @name renderProfiles
    * @description Renders a selected user profile
    * @return {Profile}
    * @memberof App
    * @method
    */
  renderProfiles(){
    return this.props.store.users.map((user) => {
      return (
        <Profile
          selected = {user.id === this.props.store.selectedId}
          key = {user.id}
          label = {user.name}
          onClick = { () => {this.props.store.selectUser(user)} }
          />
      )
    })
  }

  /**
   * @name render
   * @description App render function
   * @return {div}
   * @memberof App
   * @method
   */
  render(){
    return (
      <div>
        <h3>Employee Directory</h3>
        {this.renderSelection()}
        {this.renderProfiles()}
      </div>
    )
  }
}

App.propTypes = propTypes
export default App
