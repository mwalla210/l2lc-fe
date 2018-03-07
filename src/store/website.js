import { action, useStrict, extendObservable } from 'mobx'
import API from '../api'
import autoBind from 'auto-bind'
useStrict(true)

/**
 * @name Website
 * @class Website
 * @classdesc Main MobX store for website
 * @todo Add Analytic models & reference
 * @property {?Project} [currentProject=null] Current Project in state, or last focused Project. [observable]
 * @property {?Customer} [currentCustomer=null] Current Customer in state, or last focused Customer. [observable]
 * @property {?Employee} [currentEmployee=null] Current Employee in state or last focuess Employee. [observable]
 * @property {?User} [currentUser=null] Current User in state, or last focused User. [observable]
 * @property {?Analytic} [ccAnalytic=null] Analytic model in state. May be default model if not fetched yet. [observable]
 * @property {?Analytic} [eAnalytic=null] Analytic model in state. May be default model if not fetched yet. [observable]
 * @property {?Analytic} [paAnalytic=null] Analytic model in state. May be default model if not fetched yet. [observable]
 * @property {?Analytic} [jtAnalytic=null] Analytic model in state. May be default model if not fetched yet. [observable]
 * @property {Object} [logOutModalOpen=false] Logging out modal
 */
class Website {
  constructor() {
    let addtlProps = {
      currentProject: null,
      currentCustomer: null,
      currentEmployee: null,
      currentUser: null,
      // TODO Analytic models
      ccAnalytic: null,
      eAnalytic: null,
      paAnalytic: null,
      jtAnalytic: null,
      logOutModalOpen: false,
    }
    extendObservable(this, addtlProps)
    autoBind(this)
  }

  /**
   * @name setProject
   * @description Sets current project
   * @method setProject
   * @memberof Website.prototype
   * @param  {Project}   project  Project to set
   * @mobx action
   */
  @action setProject(project){
    this.currentProject = project
  }

  /**
   * @name setCustomer
   * @description Sets current customer
   * @method setCustomer
   * @memberof Website.prototype
   * @param  {Customer}   customer  Customer to set
   * @mobx action
   */
  @action setCustomer(customer){
    this.currentCustomer = customer
  }

  /**
   * @name setEmployee
   * @description Sets current employee
   * @method setEmployee
   * @memberof Website.prototype
   * @param  {Employee}   employee  Employee to set
   * @mobx action
   */
  @action setEmployee(employee){
    this.currentEmployee = employee
  }

  /**
   * @name setUser
   * @description Sets current user
   * @method setUser
   * @memberof Website.prototype
   * @param  {User}   user  User to set
   * @mobx action
   */
  @action setUser(user){
    this.currentUser = user
  }

  // Creation

  /**
   * @name createProject
   * @description Sends the formatted Project in POST to API to add entry to database; sets this.currentProject
   * @memberof Website.prototype
   * @method createProject
   * @param  {Project}      project Finalized Project to create in database
   * @mobx action
   * @todo Implement function
   */
   @action createProject(project){
     let jsonProject = JSON.stringify(project)
     console.log('Create project entry in API with:', jsonProject)
     return API.createProject(jsonProject)
     .then(response => {
       this.setProject(response)
       if(response){
         return true
       }
       return false
     })
   }
  /**
   * @name createCustomer
   * @description Sends the formatted Customer in POST to API to add entry to database; sets this.currentCustomer
   * @memberof Website.prototype
   * @method createCustomer
   * @param  {Customer}       customer Finalized Customer to create in database
   * @mobx action
   * @todo Implement function
   */
  @action createCustomer(customer){
    let jsonCustomer = JSON.stringify(customer)
    console.log('Create customer entry in API with:', jsonCustomer)
    return API.createCustomer(jsonCustomer)
    .then(response => {
      this.setCustomer(response)
      if(response){
        return true
      }
      return false
    })
  }
  /**
   * @name createEmployee
   * @description Sends the formatted Employee in POST to API to add entry to database; updates this.employees
   * @memberof Website.prototype
   * @method createEmployee
   * @param  {Employee}       employee Finalized Employee to create in database
   * @mobx action
   */
  @action createEmployee(employee){
    let jsonEmployee = JSON.stringify(employee)
    console.log('Create employee entry in API with:', jsonEmployee)
    return API.createEmployee(jsonEmployee)
    .then(response => {
      this.setEmployee(response)
      if(response){
        return true
      }
      return false
    })
  }
  /**
   * @name createTimeEntry
   * @description Sends the formatted time entry in POST to API to add entry to database
   * @memberof Website.prototype
   * @method createTimeEntry
   * @mobx action
   * @todo Implement function; pass/format input
   */
  @action createTimeEntry(){
    let timeEnter = {
      employeeId: 1,
      station: 'Receiving'
    }
    let jsonTime = JSON.stringify(timeEnter)
    return API.create('project/1/time-entry/create', jsonTime)
    .then(response => console.log(response))
  }

  // Utilities

  /**
   * @name logOutAlert
   * @description Opens log out modal
   * @method logOutAlert
   * @memberof Website.prototype
   * @mobx action
   */
  @action logOutAlert(){
    this.logOutModalOpen = true
  }

  /**
   * @name logOutDismiss
   * @description Closes log out modal
   * @method logOutDismiss
   * @memberof Website.prototype
   * @mobx action
   */
  @action logOutDismiss(){
    this.logOutModalOpen = false
  }


}

const website = new Website()
export default website
