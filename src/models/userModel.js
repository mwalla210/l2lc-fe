import { action, useStrict, extendObservable } from 'mobx'
import autoBind from 'auto-bind'
useStrict(true)

/**
 * @name UserModel
 * @class UserModel
 * @classdesc User storage object
 * @property {Number} id Database ID of the user
 * @property {String} username Username of the user [observable]
 * @property {?String} [stationID=null] Station name of the user, if any [observable]
 * @property {Boolean} [admin=false] Admin indicator of user [observable]
 */
export default class UserModel {
  constructor(id, username, stationID, admin=false) {
    let addtlProps = {
      username, // changeable?
      stationID, // changeable?
      admin,
      // may need token or other form of login item for authorization
      //Optional
      editUsername: '',
      editPassword: ''
    }
    extendObservable(this, addtlProps)
    this.id = id
    autoBind(this)
  }

  // Actions

  /**
  * @name changeUsername
  * @description Changes Account's username
  * @memberof UserModel.prototype
  * @method changeUsername
  * @return {Boolean}
  * @mobx action
  */
  @action changePassword(){
    // TODO: changes User's password
    return true
  }

  /**
   * @name toggleAdmin
   * @description Calls API to change the admin status of user
   * @memberof UserModel.prototype
   * @method toggleAdmin
   * @return {Promise}
   * @mobx action
   */
  @action toggleAdmin() {
    console.log(`Update admin status for ${this.username} via API. Returns boolean success.`)
  }

  /**
   * @name changePassword
   * @description Calls API to change the password for the username
   * @memberof UserModel.prototype
   * @method changePassword
   * @param  {String} newPassword New password
   * @return {Promise}
   * @mobx action
   */
  @action changePassword(newPassword) {
    console.log(`Updated password for ${this.username}.`)
  }
 }
