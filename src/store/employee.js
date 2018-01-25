import { observable, action, computed, useStrict } from 'mobx'

useStrict(true)

/**
 * @name Employee
 * @class Customer
 * @description Customer storage object
 * @property {Number}  [id=null] database ID of Employee
 * @property {String} [fullName=''] name of Employee
 * @property {Boolean} [active=false] indicator of Employee's active status
 * @property {Object} [editName=null] stores potential name changes while editing
 */


class Employee {
  constructor(id, fullName) {

    this.fullName = fullName
    this.active = true
    this.editName = ''
    extendObservable(this)
    this.id = id
  }

  // Observable values can be watched by Observers
  @observable id = null
  @observable fullName = ''
  @observable active = null
  @observable editname = null

  /**
  * @name changeName
  * @description changes Employee's name
  * @memberof
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
  * @description activates an active Employee
  * @memberof
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
  * @description deactivates an active Employee
  * @memberof
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
export { Employee }
