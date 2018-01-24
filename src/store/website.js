import { action, useStrict, extendObservable } from 'mobx'
useStrict(true)

/**
 * @name Website
 * @class Website
 * @description Main MobX store for website
 * @todo Add Analytic models & reference
 * @property {Project} [currentProject=null] Current Project in state, or last focused Project. [observable]
 * @property {Customer} [currentCustomer=null] Current Customer in state, or last focused Customer. [observable]
 * @property {User} [currentUser=null] Current User in state, or last focused User. [observable]
 * @property {Project[]} [openProjects=[]] Current array of Project(s) in state, if any, that are not marked as closed in database. [observable]
 * @property {Project[]} [closedProjects=[]] Current array of Project(s) in state, if any, that are marked as closed in database. [observable]
 * @property {User[]} [accounts=[]] Current array of User(s) in state, if any. [observable]
 * @property {Employee[]} [employees=[]] Current array of Employee(s) in state, if any. [observable]
 * @property {Customer[]} [customers=[]] Current array of Customer(s) in state, if any. [observable]
 * @property {Analytic} [ccAnalytic=null] Analytic model in state. May be default model if not fetched yet. [observable]
 * @property {Analytic} [eAnalytic=null] Analytic model in state. May be default model if not fetched yet. [observable]
 * @property {Analytic} [paAnalytic=null] Analytic model in state. May be default model if not fetched yet. [observable]
 * @property {Analytic} [jtAnalytic=null] Analytic model in state. May be default model if not fetched yet. [observable]
 * @property {Boolean} [login=true]
 * @property {String} [pageTitle='Default Title']
 * @property {String} [navHighlight='']
 * @property {Object} [pageContent=null]
 * @property {Array} [pageContent=[]]
 * @mobx store
 */
class Website {
  constructor() {
    let addtlProps = {}
    addtlProps.currentProject = null
    addtlProps.currentCustomer = null
    addtlProps.currentUser = null
    addtlProps.openProjects = []
    addtlProps.closedProjects = []
    addtlProps.accounts = []
    addtlProps.employees = []
    addtlProps.customers = []
    // TODO Analytic models
    addtlProps.ccAnalytic = null
    addtlProps.eAnalytic = null
    addtlProps.paAnalytic = null
    addtlProps.jtAnalytic = null
    // Page props
    addtlProps.login = true
    addtlProps.pageTitle = 'Default Title'
    addtlProps.navHighlight = ''
    addtlProps.pageContent = null
    addtlProps.pageButtons = []
    extendObservable(this, addtlProps)
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
   * @name getProjects
   * @description Instantiates returned collection as Project(s) and sets this.openProjects or this.closedProjects, dependent on input
   * @memberof Website.prototype
   * @method getProjects
   * @param  {Boolean}   [open=true] Fetch either open or closed projects
   * @return {Promise}
   * @mobx action
   * @todo Implement function
   */
  @action getProjects(open=true){
    console.log(`Fetch projects from API with open status: ${open}`)
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

  /**
   * @name getEmployees
   * @description Instantiates returned collection as Employee(s) and sets this.employees
   * @memberof Website.prototype
   * @method getEmployees
   * @return {Promise}
   * @mobx action
   * @todo Implement function
   */
  @action getEmployees(){
    console.log('Fetch employees from API')
  }

  /**
   * @name getCustomers
   * @description Instantiates returned collection as Customer(s) and sets this.customers
   * @memberof Website.prototype
   * @method getCustomers
   * @return {Promise}
   * @mobx action
   * @todo Implement function
   */
  @action getCustomers(){
    console.log('Fetch customers from API')
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
  @action createCustomer(customer){
    console.log(`Create project entry in API with: ${customer}`)
  }
  /**
   * @name createEmployee
   * @description Sends the formatted Employee in POST to API to add entry to database; updates this.employees
   * @memberof Website.prototype
   * @method createEmployee
   * @param  {Employee}       employee Finalized Employee to create in database
   * @mobx action
   * @todo Implement function
   */
  @action createEmployee(employee){
    console.log(`Create project entry in API with: ${employee}`)
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

  // TODO remove
  @action changeLogin(){
    console.log(this.login)
    this.login = !this.login
    console.log(this.login)
  }
}

const website = new Website()
export default website
