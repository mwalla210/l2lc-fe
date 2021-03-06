import { action, useStrict, extendObservable, computed } from 'mobx'
import API from '../api'
import autoBind from 'auto-bind'
useStrict(true)

/**
 * @name Website
 * @class Website
 * @classdesc Main MobX store for website
 * @property {?Project} [currentProject=null] Current Project in state, or last focused Project. [observable]
 * @property {?Customer} [currentCustomer=null] Current Customer in state, or last focused Customer. [observable]
 * @property {?Employee} [currentEmployee=null] Current Employee in state or last focuess Employee. [observable]
 * @property {?User} [currentUser=null] Current User in state, or last focused User. [observable]
 * @property {String} [username=''] Current username field value [observable]
 * @property {String} [password=''] Current password field value [observable]
 * @property {Boolean} [logOutModalOpen=false] Logging out modal
 * @property {Boolean} [summaryMoreDropdownOpen=false] Summary pages dropdown state
 * @property {Boolean} [summaryActionsDropdownOpen=false] Summary pages dropdown state
 */
class Website {
  constructor() {
    let addtlProps = {
      currentProject: null,
      currentCustomer: null,
      currentEmployee: null,
      currentUser: null,
      currentAccount: null,
      username: '',
      password: '',
      loginerror: false,
      logOutModalOpen: false,
      summaryMoreDropdownOpen: false,
      summaryActionsDropdownOpen: false,
      taskHistory: ''
    }
    extendObservable(this, addtlProps)
    autoBind(this)
  }

  /**
   * @name addToTaskHistory
   * @description Adds entry to task history
   * @method addToTaskHistory
   * @memberof Website.prototype
   * @mobx action
   */
  @action addToTaskHistory(val){
    let tokens = this.taskHistory.split('\n')
    if (tokens.length > 20){
      delete tokens[0]
      this.taskHistory = ''
      tokens.forEach(token => {
        if (token.trim() != '')
          this.taskHistory += token+'\n'
      })
    }
    this.taskHistory += val
  }
  /**
   * @name toggleSummaryMoreDD
   * @description Toggles summary pages "More" dropdown state
   * @method toggleSummaryMoreDD
   * @memberof Website.prototype
   * @mobx action
   */
  @action toggleSummaryMoreDD(){
    this.summaryMoreDropdownOpen = !this.summaryMoreDropdownOpen
  }
  /**
   * @name toggleSummaryActionsDD
   * @description Toggles summary pages "Actions" dropdown state
   * @method toggleSummaryActionsDD
   * @memberof Website.prototype
   * @mobx action
   */
  @action toggleSummaryActionsDD(){
    this.summaryActionsDropdownOpen = !this.summaryActionsDropdownOpen
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
    // eslint-disable-next-line no-undef
    sessionStorage.setItem('username', user.username)
    // eslint-disable-next-line no-undef
    sessionStorage.setItem('admin', user.admin)
    // eslint-disable-next-line no-undef
    sessionStorage.setItem('stationID', user.stationID)
    // eslint-disable-next-line no-undef
    sessionStorage.setItem('id', user.id)
  }
  /**
   * @name setAccount
   * @description Sets current account
   * @method setAccount
   * @memberof Website.prototype
   * @param  {Account}   account  Project to set
   * @mobx action
   */
  @action setAccount(account){
    this.currentAccount = account
  }

  // Creation

  /**
   * @name createProject
   * @description Sends the formatted Project in POST to API to add entry to database; sets this.currentProject
   * @memberof Website.prototype
   * @method createProject
   * @param  {Project}      project Finalized Project to create in database
   * @return {String|null}
   * @async
   * @mobx action
   */
  @action createProject(project){
    let jsonProject = JSON.stringify(project)
    return API.createProject(jsonProject)
    .then(response => {
      if(typeof(response) === 'string'){
        return response
      } else {
        if (response.customer.id)
          response.customer = this.currentCustomer
        this.setProject(response)
        return null
      }
    })
  }
  /**
   * @name createCustomer
   * @description Sends the formatted Customer in POST to API to add entry to database; sets this.currentCustomer
   * @memberof Website.prototype
   * @method createCustomer
   * @param  {Customer}       customer Finalized Customer to create in database
   * @return {String|null}
   * @async
   * @mobx action
   */
  @action createCustomer(customer){
    let jsonCustomer = JSON.stringify(customer)
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
   * @return {String|null}
   * @async
   * @mobx action
   */
  @action createEmployee(employee){
    let jsonEmployee = JSON.stringify(employee)
    return API.createEmployee(jsonEmployee)
    .then(response => {
      if(typeof(response) === 'string'){
        return response
      }
      else {
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
   * @param {Object}   body Time Entry body for POST
   * @param {Number}   projectID ID of project time entry is for
   * @return {String|null}
   * @async
   */
  createTimeEntry(body, projectID){
    let jsonTime = JSON.stringify(body)
    return API.create(`project/${projectID}/time-entry/create`, jsonTime)
    .then(response => {
      if(response === 406){
        return 'Project or Employee does not exist'
      }
      else if(typeof(response) != 'number'){
        return null
      }
      else {
        return 'Unexpected error'
      }
    })
  }

  // Update

  /**
   * @name updateProject
   * @description Sends the formatted project props in POST to API to update entry in database
   * @memberof Website.prototype
   * @method updateProject
   * @param  {Number}       id ID of project to update
   * @param  {Object}       props Finalized prop object to update on project in database
   * @return {String|null}
   * @async
   */
  updateProject(id, props){
    let jsonprops = JSON.stringify(props)
    return API.updateProject(id, jsonprops)
    .then(response => {
      if(typeof(response) === 'string'){
        return response
      }
      this.setProject(response)
      return null
    })
  }
  /**
   * @name updateProjectStatus
   * @description Sends the id and status in POST to API to update project's status in database
   * @memberof Website.prototype
   * @method updateProjectStatus
   * @param  {Number}      id Project ID
   * @param  {String}      status Project status to POST
   * @return {Boolean}
   * @async
   * @mobx action
   */
  @action updateProjectStatus(id, status){
    return API.updateProjectStatus(id, status)
    .then(() => {
      return true
    })
  }
  /**
   * @name updateEmployee
   * @description Sends the formatted employee props in POST to API to update entry in database
   * @memberof Website.prototype
   * @method updateEmployee
   * @param  {Number}       id ID of employee to update
   * @param  {Object}       props Finalized prop object to update on employee in database
   * @return {String|null}
   * @async
   */
  updateEmployee(id, props){
    let jsonprops = JSON.stringify(props)
    return API.updateEmployee(id, jsonprops)
    .then(response => {
      if(typeof(response) === 'string'){
        return response
      }
      this.setEmployee(response)
      return null
    })
  }
  /**
   * @name updateCustomer
   * @description Sends the formatted customer props in POST to API to update entry in database
   * @memberof Website.prototype
   * @method updateCustomer
   * @param  {Number}       id ID of customer to update
   * @param  {Object}       props Finalized prop object to update on customer in database
   * @return {String|null}
   * @async
   */
  updateCustomer(id, props){
    let jsonprops = JSON.stringify(props)
    return API.updateCustomer(id, jsonprops)
    .then(response => {
      if(typeof(response) === 'string'){
        return response
      }
      this.setCustomer(response)
      return null
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
   * @async
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
   * @description Login button disabled indicator
   * @method loginButtonDisabled
   * @memberof Website.prototype
   * @return {Boolean}
   * @mobx computed
   */
  @computed get loginButtonDisabled(){
    return this.loginerror || this.username == '' || this.password == ''
  }

  /**
   * @name createAccount
   * @description Sends the formatted Account in POST to API to add entry to database
   * @memberof Website.prototype
   * @method createAccount
   * @param  {Account}       account Finalized Account to create in database
   * @return {String|null}
   * @async
   * @mobx action
   */
  @action createAccount(account){
    let jsonAccount = JSON.stringify(account)
    return API.createAccount(jsonAccount)
    .then(response => {
      if(typeof(response) === 'string'){
        return response
      } else {
        this.setAccount(response)
        return null
      }
    })
  }

}

const website = new Website()
export default website
