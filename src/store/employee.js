import { action, useStrict, extendObservable } from 'mobx'

useStrict(true)

/**
 * @name Employee
 * @class Employee
 * @description Employee storage object
 * @property {Number} id Database ID of Employee
 * @property {String} fullName Name of Employee [observable]
 * @property {Boolean} [active=false] Indicator of Employee's active status [observable]
 * @property {String} [editName=null] Stores potential name changes while editing [observable]
 */
class Employee {
  constructor(id, fullName) {
    let addtlProps = {}
    addtlProps.fullName = fullName
    // Optional
    addtlProps.active = true
    addtlProps.editName = ''
    extendObservable(this, addtlProps)
    this.id = id
  }

  /**
  * @name changeName
  * @description Changes Employee's name
  * @memberof Employee.prototype
  * @method changeName
  * @return {boolean}
  * @mobx action
  */
  @action async changeName(){
    // TODO: changes Employee's name
    return true
  }

  /**
  * @name activate
  * @description Activates an active Employee
  * @memberof Employee.prototype
  * @method activate
  * @return {boolean}
  * @mobx action
  */
  @action async activate(){
    this.active = true
    return true
  }

  /**
  * @name deactivate
  * @description Deactivates an active Employee
  * @memberof Employee.prototype
  * @method deactivate
  * @return {boolean}
  * @mobx action
  */
  @action async deactivate(){
    this.active = false
    return true
  }

}

const employee = new Employee()
export default employee
