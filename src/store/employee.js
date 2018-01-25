import { observable, action, computed, useStrict } from 'mobx'

useStrict(true)

/**
 * @name Employee
 * @class Customer
 * @description Customer storage object
 * @property {id}  [id=null]
 * @property {fullName} [fullName='']
 * @property {active} [active='']
 * @property {editName} [editName='']
 */


class Employee {
  constructor(id, fullName) {
    this.id = id
    this.fullName = fullName
    this.active = true
    this.editName = ''
    extendObservable(this)
    return this
  }

  // Observable values can be watched by Observers
  @observable id = null
  @observable fullName = ''
  @observable active = null
  @observable editname = ''

  @action async changeName(){
    // TODO: changes Employee's name
    return true
  }

  @action async activate(){
    this.active = true
    return true
  }

  @action async deactivate(){
    this.active = false
    return true
  }

}

const employee = new Employee()
export default employee
export { Employee }
