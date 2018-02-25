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
   * @param  {Customer}   customer  Cs to set
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
   * @param  {Employee}   employee  Cs to set
   * @mobx action
   */
  @action setEmployee(employee){
    this.currentEmployee = employee
  }

  // Fetches

  /**
   * @name getProject
   * @description Sets this.currentProject as Project instantiated returned data
   * @memberof Website.prototype
   * @method getProject
   * @param  {Number}   id Database ID of project to fetch
   * @return {Promise}
   * @mobx action
   * @todo Implement function
   */
  @action getProject(id){
    console.log(`Fetch project from API with ID: ${id}`)
  }

  /**
   * @name getAccounts
   * @description Instantiates returned collection as User(s) and sets this.accounts
   * @memberof Website.prototype
   * @method getAccounts
   * @return {Promise}
   * @mobx action
   * @todo Implement function
   */
  @action getAccounts(){
    console.log('Fetch accounts from API')
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
    console.log(`Create project entry in API with: ${project}`)
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
  @action async createCustomer(customer){
    let jsonCustomer = JSON.stringify(customer)
    console.log('Create customer entry in API with:', jsonCustomer)
    return API.createCustomer(jsonCustomer)
    .then(response => {
      this.setCustomer(response)
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
  @action async createTimeEntry(){
    let timeEnter = {
      employeeId: 1,
      station: 'Receiving'
    }
    let jsonTime = JSON.stringify(timeEnter)
    let response = await API.create('project/1/time-entry/create', jsonTime)
    console.log(response)
  }
  // Utilities

  /**
   * @name generateBarcode
   * @description TBD
   * @memberof Website.prototype
   * @method generateBarcode
   * @param  {Number}        id Barcode ID
   * @return {Object}
   * @todo Implement function
   */
  generateBarcode(id){
    console.log(`Generate barcode with ID: ${id}`)
  }

}

const website = new Website()
export default website
