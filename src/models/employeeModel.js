import { action, computed, useStrict, extendObservable } from 'mobx'
import autoBind from 'auto-bind'
useStrict(true)

/**
 * @name EmployeeModel
 * @class EmployeeModel
 * @classdesc Employee storage object
 * @param {Number} id Database ID of Employee
 * @param {String} firstName First name of Employee [observable]
 * @param {String} lastName Last name of Employee [observable]
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

  /**
   * @name barcodeDomID
   * @description Return the DOM computed ID for a barcode field, specific to the employee
   * @return {String}
   * @memberof EmployeeModel.prototype
   * @method barcodeDomID
   * @mobx computed
   */
  @computed get barcodeDomID(){
    return `${this.firstName}${this.id}`
  }

  /**
   * @name barcodeScanID
   * @description Returns the ID to encode in the barcode for scanning purposes
   * @return {String}
   * @memberof EmployeeModel.prototype
   * @method barcodeScanID
   * @mobx computed
   */
  @computed get barcodeScanID(){
    return `e${this.id}%`
  }

  /**
   * @name fullName
   * @description Returns employee full name
   * @return {String}
   * @memberof EmployeeModel.prototype
   * @method fullName
   * @mobx computed
   */
  @computed get fullName(){
    return `${this.firstName} ${this.lastName}`
  }
}
