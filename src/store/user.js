import { action, computed, useStrict, extendObservable } from 'mobx'
useStrict(true)

/**
 * @name User
 * @class User
 * @description Main MobX store for user
 * @property {Object} id Database ID of the user [observable]
 * @property {Object} username Username of the user [observable] //KEEP AS OBJECT????????
 * @property {String} [stationID=null] Station name of the user, if any [observable]
 * @property {Boolean} [admin=false] Admin indicator of user [observable]
 */
class User {
  constructor() {
    this.id = id
    this.username = username
    this.stationID = stationID
    this.admin = false
  }

//MW ON TRELLO CARD: token?
//DP: not quite sure what your train of thought is here

// Actions

/**
* @name login
* @description Calls API to attempt the login of a user
* @memberof User.prototype
* @method login
* @return {Promise}
* @mobx action
*/
  @action async login() {
    console.log(`Logging in ${username} via API. Returns boolean success.`)
  }

 /**
 * @name logout
 * @description Calls API to logout the current user
 * @memberof User.prototype
 * @method logout
 * @return {Promise}
 * @mobx action
 */
   @action async logout() {
     console.log(`Logging out ${username} via API. Returns boolean success.`)
  }

/**
 * @name toggleAdmin
 * @description Calls API to change the admin status of user
 * @memberof User.prototype
 * @method toggleAdmin
 * @param  {Object} username Username of the user to change admin status [observable]
 * @return {Promise}
 * @mobx action
 */
  @action async toggleAdmin(username) {
     console.log(`Update admin status for ${username} via API. Returns boolean success.`)
   }

/**
 * @name changePassword
 * @description Calls API to change the password for the username
 * @memberof User.prototype
 * @method changePassword
 * @param  {Object} username Username of the user to change admin status [observable]
 * @param  {String} newPassword New password [observable]
 * @return {Promise}
 * @mobx action
 */
    @action async changePassword(username, newPassword) {
       console.log(`Updated password for ${username}.`)
     }

const user = new User()
export default user
export { User }
