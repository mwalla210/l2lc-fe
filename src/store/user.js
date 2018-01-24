import { action, useStrict, extendObservable } from 'mobx'
useStrict(true)

/**
 * @name User
 * @class User
 * @description Main MobX store for user
 * @property {Number} id Database ID of the user [observable]
 * @property {String} username Username of the user [observable] //KEEP AS OBJECT????????
 * @property {String} [stationID=null] Station name of the user, if any [observable]
 * @property {Boolean} [admin=false] Admin indicator of user [observable]
 */
class User {
  constructor(id, username, stationID) {
    let addtlProps = {}
    addtlProps.id = id
    addtlProps.username = username
    addtlProps.stationID = stationID
    addtlProps.admin = false
    extendObservable(this, addtlProps)
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
    console.log(`Logging in ${this.username} via API. Returns boolean success.`)
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
     console.log(`Logging out ${this.username} via API. Returns boolean success.`)
  }

/**
 * @name toggleAdmin
 * @description Calls API to change the admin status of user
 * @memberof User.prototype
 * @method toggleAdmin
 * @return {Promise}
 * @mobx action
 */
  @action async toggleAdmin() {
     console.log(`Update admin status for ${this.username} via API. Returns boolean success.`)
   }

/**
 * @name changePassword
 * @description Calls API to change the password for the username
 * @memberof User.prototype
 * @method changePassword
 * @param  {String} newPassword New password
 * @return {Promise}
 * @mobx action
 */
    @action async changePassword(newPassword) {
       console.log(`Updated password for ${this.username}.`)
     }
 }

const user = new User()
export default user
