import { action, computed, useStrict, extendObservable } from 'mobx'
import autoBind from 'auto-bind'
useStrict(true)

/**
 * @name EmployeeModel
 * @class EmployeeModel
 * @classdesc Employee storage object
 * @property {Number} id Database ID of Employee
 * @property {String} firstName First name of Employee [observable]
 * @property {String} lastName Last name of Employee [observable]
 * @property {Boolean} [active=false] Indicator of Employee's active status [observable]
 * @property {?String} [editName=null] Stores potential name changes while editing [observable]
 */
export default class EmployeeModel {
  constructor(id, firstName, lastName) {
    let addtlProps = {
      firstName,
      lastName,
      // Optional
      active: true,
      editName: ''
    }
    extendObservable(this, addtlProps)
    this.id = id
    autoBind(this)
  }

  /**
  * @name changeName
  * @description Changes Employee's name
  * @memberof EmployeeModel.prototype
  * @method changeName
  * @return {Boolean}
  * @mobx action
  */
  @action changeName(){
    // TODO: changes Employee's name
    return true
  }

  /**
  * @name activate
  * @description Activates an active Employee
  * @memberof EmployeeModel.prototype
  * @method activate
  * @return {Boolean}
  * @mobx action
  */
  @action activate(){
    this.active = true
    return true
  }

  /**
  * @name deactivate
  * @description Deactivates an active Employee
  * @memberof EmployeeModel.prototype
  * @method deactivate
  * @return {Boolean}
  * @mobx action
  */
  @action deactivate(){
    this.active = false
    return true
  }
}
