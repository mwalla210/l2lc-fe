import { observable, action, computed, useStrict } from 'mobx'
import axios from 'axios'

useStrict(true)

/**
 * @name UserStore
 * @class UserStore
 * @description Main MobX store for website
 * @property {Array}  users         list of users for website [observable]
 * @property {Object} selectedUser  current selected user object [observable]
 */
class UserStore {
  // Observable values can be watched by Observers
  @observable users = []
  @observable selectedUser = {}

  /**
   * @name selectedId
   * @description Provides selected user ID [computed]
   * @return {Number}
   * @memberof UserStore
   * @method
   */
  @computed get selectedId() { return this.selectedUser.id }

  /**
   * @name getUsers
   * @description Fetches users; calls setUsers [action]
   * @memberof UserStore
   * @method
   */
  @action getUsers() {
    // Managing Async tasks like ajax calls with Mobx actions
    axios.get('http://jsonplaceholder.typicode.com/users').then( response => {
      this.setUsers(response.data)
    })
  }

  /**
   * @name setUsers
   * @description Sets this.users [action]
   * @param  {Array} users  array of users
   * @memberof UserStore
   * @method
   */
  @action setUsers(users) {
    this.users = [...users]
  }

  /**
   * @name selectUser
   * @description Sets this.selectedUser [action]
   * @param  {Object} user  user to select
   * @memberof UserStore
   * @method
   */
  @action selectUser(user) {
    this.selectedUser = user
  }

  /**
   * @name clearSelectedUser
   * @description Sets this.selectedUser to empty object [action]
   * @memberof UserStore
   * @method
   */
  @action clearSelectedUser() {
    this.selectedUser = {}
  }
}

const store = new UserStore()
export default store
export { UserStore }
