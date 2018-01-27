import { action, computed, useStrict, extendObservable } from 'mobx'
useStrict(true)

/**
 * @name EmployeeModel
 * @class EmployeeModel
 * @classdesc Employee storage object
 * @property {Number} id Database ID of Employee
 * @property {String} fullName Name of Employee [observable]
 * @property {Boolean} [active=false] Indicator of Employee's active status [observable]
 * @property {String} [editName=null] Stores potential name changes while editing [observable]
 */
export default class EmployeeModel {
  constructor(id, fullName) {
    let addtlProps = {
      fullName,
      // Optional
      active: true,
      editName: ''
    }
    extendObservable(this, addtlProps)
    this.id = id
  }

  /**
  * @name changeName
  * @description Changes Employee's name
  * @memberof EmployeeModel.prototype
  * @method changeName
  * @return {Boolean}
  * @mobx action
  */
  @action async changeName(){
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
  @action async activate(){
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
  @action async deactivate(){
    this.active = false
    return true
  }
}
