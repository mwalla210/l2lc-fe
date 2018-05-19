import { action, useStrict, extendObservable } from 'mobx'
import autoBind from 'auto-bind'
import API from '../api'
useStrict(true)

/**
 * @name UserModel
 * @class UserModel
 * @classdesc User storage object
 * @param {Number} id Database ID of the user
 * @param {String} username Username of the user [observable]
 * @param {?String} [stationID] Station name of the user, if any [observable]
 * @param {Boolean} [admin=false] Admin indicator of user [observable]
 * @property {String} editUsername Empty field for editing username [observable]
 * @property {String} editPassword Empty field for editing password [observable]
 * @property {Number} id Database ID of the user
 * @property {String} username Username of the user [observable]
 * @property {?String} [stationID] Station name of the user, if any [observable]
 * @property {Boolean} [admin=false] Admin indicator of user [observable]
 */
export default class UserModel {
  constructor(id, username, stationID, admin=false) {
    let addtlProps = {
      username,
      stationID,
      admin,
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
   * @name toggleAdmin
   * @description Calls API to change the admin status of user
   * @memberof UserModel.prototype
   * @method toggleAdmin
   * @return {Promise}
   * @mobx action
   */
  @action toggleAdmin() {
    let body = {admin: !this.admin}
    let jsonBody = JSON.stringify(body)
    this.admin = !this.admin
    API.updateUserAdmin(this.id, jsonBody)
  }

 }
