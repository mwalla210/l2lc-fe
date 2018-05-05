import { action, useStrict, extendObservable } from 'mobx'
import autoBind from 'auto-bind'
import API from '../api'
import PageStore from '../store/page'
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
    PageStore.accountManagementMenuItem()
    PageStore.accountManagementMenuItem()    //weird but works dont judge me
  }

 }
