import { action, computed, useStrict, extendObservable } from 'mobx'
import autoBind from 'auto-bind'
useStrict(true)

/**
 * @name AccountModel
 * @class AccountModel
 * @classdesc Account storage object
 * @property {Number} id Database ID of Account
 * @property {String} username Username of Account [observable]
 * @property {String} password Password of Account [observable]
 * @property {Boolean} [admin=false] Indicator of Account's admin status [observable]
 * @property {?String} [editUsername=null] Stores potential username changes while editing [observable]
 * * @property {?String} [editPassword=null] Stores potential password changes while editing [observable]
 */
export default class AccountModel {
  constructor(id, username, password, admin) {
    let addtlProps = {
      username,
      password,
      admin: admin,
      //Optional
      editUsername: '',
      editPassword: ''
    }
    extendObservable(this, addtlProps)
    this.id = id
    autoBind(this)
  }

  /**
  * @name changeUsername
  * @description Changes Account's username
  * @memberof AccountModel.prototype
  * @method changeUsername
  * @return {Boolean}
  * @mobx action
  */
  @action changeUsername(){
    // TODO: changes Employee's name
    return true
  }

  /**
  * @name setAdmin
  * @description Sets Account to be admin
  * @memberof AccountModel.prototype
  * @method setAdmin
  * @return {Boolean}
  * @mobx action
  */
  @action setAdmin(){
    this.admin = true
    return true
  }

  /**
  * @name removeAdmin
  * @description Removes Admin permissons from Account
  * @memberof accountModel.prototype
  * @method removeAdmin
  * @return {Boolean}
  * @mobx action
  */
  @action removeAdmin(){
    this.admin = false
    return true
  }
}
