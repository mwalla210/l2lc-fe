import { observable, action, computed, useStrict } from 'mobx'
import axios from 'axios'

useStrict(true)

/**
 * @name UserStore
 * @class UserStore
 * @description Main MobX store for website
 * @property {User[]} [users=[]]          list of users for website [observable]
 * @property {User} [selectedUser={}]     current selected user object [observable]
 * @property {String} [example=null]        example property to demonstrate nullable
 */
class UserStore {
  // Observable values can be watched by Observers
  @observable users = []
  @observable selectedUser = {}

  /**
   * @name selectedId
   * @description Provides selected user ID
   * @return {Number}
   * @memberof UserStore.prototype
   * @method
   * @mobx computed
   */
  @computed get selectedId() { return this.selectedUser.id }

  /**
   * @name getUsers
   * @description Fetches users; calls setUsers
   * @memberof UserStore.prototype
   * @method
   * @mobx action
   */
  @action getUsers() {
    // Managing Async tasks like ajax calls with Mobx actions
    axios.get('http://jsonplaceholder.typicode.com/users').then( response => {
      this.setUsers(response.data)
    })
  }

  /**
   * @name setUsers
   * @description Sets this.users
   * @param  {Array} users  array of users
   * @memberof UserStore.prototype
   * @method
   * @mobx action
   */
  @action setUsers(users) {
    this.users = [...users]
  }

  /**
   * @name selectUser
   * @description Sets this.selectedUser
   * @param  {Object} user  user to select
   * @memberof UserStore.prototype
   * @method
   * @mobx action
   */
  @action selectUser(user) {
    this.selectedUser = user
  }

  /**
   * @name clearSelectedUser
   * @description Sets this.selectedUser to empty object
   * @memberof UserStore.prototype
   * @method
   * @mobx action
   */
  @action clearSelectedUser() {
    this.selectedUser = {}
  }
}

const store = new UserStore()
export default store
export { UserStore }
