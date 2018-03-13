import { action, useStrict, extendObservable, computed } from 'mobx'
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
 * @property {String} [username=''] Current username field value [observable]
 * @property {String} [password=''] Current password field value [observable]
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
      username: '',
      password: '',
      loginerror: false,
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
   */
  @action createProject(project){
     let jsonProject = JSON.stringify(project)
     console.log('Create project entry in API with:', jsonProject)
     return API.createProject(jsonProject)
     .then(response => {
       if(typeof(response) === 'string'){
         return response
       } else {
         this.setProject(response)
         return null
       }
     })
   }
   /**
    * @name updateProjectStatus
    * @description Sends the id and status in POST to API to update project's status in database
    * @memberof Website.prototype
    * @method createProject
    * @param  {Project}      project Finalized Project to create in database
    * @mobx action
    */
    @action updateProjectStatus(id, status){
      return API.updateProjectStatus(id, status)
      .then(() => {
        return true
      })
    }
  /**
   * @name createCustomer
   * @description Sends the formatted Customer in POST to API to add entry to database; sets this.currentCustomer
   * @memberof Website.prototype
   * @method createCustomer
   * @param  {Customer}       customer Finalized Customer to create in database
   * @mobx action
   */
  @action createCustomer(customer){
    let jsonCustomer = JSON.stringify(customer)
    console.log('Create customer entry in API with:', jsonCustomer)
    return API.createCustomer(jsonCustomer)
    .then(response => {
      if(typeof(response) === 'string'){
        return response
      } else {
        this.setCustomer(response)
        return null
      }
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
      if(typeof(response) === 'string'){
        return response
      } else {
        this.setEmployee(response)
        return null
      }
    })
  }
  /**
   * @name createTimeEntry
   * @description Sends the formatted time entry in POST to API to add entry to database
   * @memberof Website.prototype
   * @method createTimeEntry
   * @mobx action
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

  // Update

  updateProject(id, props){
    let jsonprops = JSON.stringify(props)
    console.log('Create project entry in API with:', jsonprops)
    return API.updateProject(id, jsonprops)
    .then(response => {
      if(response){
        return true
      }
      return false
    })
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
  /**
   * @name updateUsername
   * @description OnChange function for login username field
   * @method updateUsername
   * @param  {String}       val Username field content
   * @memberof Website.prototype
   * @mobx action
   */
  @action updateUsername(val){
    this.username = val
    this.loginerror = false
  }
  /**
   * @name updatePassword
   * @description OnChange function for login password field
   * @method updatePassword
   * @param  {String}       val Password field content
   * @memberof Website.prototype
   * @mobx action
   */
  @action updatePassword(val){
    this.password = val
    this.loginerror = false
  }
  /**
   * @name login
   * @description Login function, calls API
   * @method login
   * @param  {Function}       onSuccess Successful login page nav function
   * @memberof Website.prototype
   * @mobx action
   */
  @action login(onSuccess){
    let body = {
      username: this.username,
      password: this.password
    }
    let json = JSON.stringify(body)
    API.login(json)
    .then(action('loginSuccess', response => {
      // If not null (successful login)
      if (response){
        this.setUser(response)
        this.loginerror = false
        this.username = ''
        this.password = ''
        onSuccess()
      }
      else
        this.loginerror = true
    }))
  }
  /**
   * @name loginButtonDisabled
   * @description Login button disabled propertys
   * @method loginButtonDisabled
   * @memberof Website.prototype
   * @return {Boolean}
   * @mobx computed
   */
  @computed get loginButtonDisabled(){
    return this.loginerror || this.username == '' || this.password == ''
  }

}

const website = new Website()
export default website
