import fetch from 'node-fetch'
import TimeEntryModel from './models/timeEntryModel'
import ProjectModel from './models/projectModel'
import CustomerModel from './models/customerModel'
import EmployeeModel from './models/employeeModel'
import UserModel from './models/userModel'

const api = 'http://138.197.88.198:8080/l2lc/api/'

/**
 * @namespace API
 * @classdesc API functions for interaction with database
 */
export default class API {
  // Customers

  /**
   * @name fetchCustomers
   * @description Fetches all customers and modelizes
   * @method fetchCustomers
   * @memberof API
   * @return {Promise}
   * @async
   */
  static fetchCustomers(){
    return fetch(`${api}customer?limit=50&offset=0`)
    .then(res => res.json())
    .then(json => {
      let customers = []
      // For each returned json object...
      json.items.forEach(item => {
        let customer = API.customerModelize(item)
        // Add to list
        customers.push(customer)
      })
      // Return list of models, not json
      return customers
    })
  }

  /**
   * @name fetchCustomer
   * @description Fetches customer and modelizes
   * @method fetchCustomer
   * @memberof API
   * @param  {Number}      id ID of customer to fetch
   * @return {Promise}
   * @async
   */
  static fetchCustomer(id){
    return fetch(`${api}customer/${id}`)
    .then(res => res.json())
    .then(json => {
      let customer = null
      if (json.id == id){
        customer = API.customerModelize(json)
      }
      return customer
    })
  }

  /**
   * @name createCustomer
   * @description Creates a customer and modelizes
   * @method createCustomer
   * @memberof API
   * @param  {Object}       customer Customer object (JSON)
   * @return {Promise}
   * @async
   */
  static createCustomer(customer){
    return API.create('customer/create', customer)
    .then(response => {
      if(response === 406){
        return 'Duplicate entry exists'
      } else if(typeof(response) != 'number'){
        return API.customerModelize(response)
      } else {
        return 'Unexpected error'
      }
    })
  }

  /**
   * @name customerModelize
   * @description Modelizes a database customer
   * @method customerModelize
   * @memberof API
   * @param  {Object}         item Customer database object
   * @return {CustomerModel}
   */
  static customerModelize(item){
    let addrIsSame = false
    let addtl = []
    // Check if addresses match each other
    if (item.billingAddr){
      addrIsSame = API.addressIsSame(item.shippingAddr, item.billingAddr)
      if (!addrIsSame)
        addtl = [item.billingAddr.street, null, item.billingAddr.city, item.billingAddr.state, item.billingAddr.country, item.billingAddr.zip]
    }
    else
      addrIsSame = true
    // Construct model
    let customer = new CustomerModel(item.id, item.name, item.shippingAddr.street, null, item.shippingAddr.city, item.shippingAddr.state, item.shippingAddr.country, item.shippingAddr.zip, item.email, item.phoneNumber, item.website, item.isPastDue, addrIsSame, ...addtl)
    return customer
  }

  /**
   * @name addressIsSame
   * @description Compares two address objects to check for equality
   * @method addressIsSame
   * @memberof API
   * @param  {Object}      addr1 Address object for comparison
   * @param  {Object}      addr2 Address object for comparison
   * @return {Boolean}
   */
  static addressIsSame(addr1, addr2){
    return JSON.stringify(addr1) === JSON.stringify(addr2)
  }

  // Projects

  /**
   * @name fetchProjects
   * @description Fetches all projects and modelizes
   * @method fetchProjects
   * @memberof API
   * @return {Promise}
   * @async
   */
  static fetchProjects(){
    return fetch(`${api}project?limit=50&offset=0`)
    .then(res => res.json())
    .then(json => {
      let projects = []
      json.items.forEach(item => {
        if (item.projectStatus != 'Dropped')
          projects.push(item)
      })
      projects = projects.map(item => {
        if (item.customer)
          item.customer.companyName = item.customer.name
        let project = API.projectModelize(item)
        return project
      })
      return projects
    })
  }

  /**
   * @name fetchProject
   * @description Fetches project and modelizes
   * @method fetchProject
   * @memberof API
   * @param  {Number}     id ID of project to fetch
   * @return {Promise}
   * @async
   */
  static fetchProject(id){
    return fetch(`${api}project/${id}`)
    .then(res => res.json())
    .then(json => {
      let project = null
      if (json.id == id){
        project = API.projectModelize(json)
      }
      return project
    })
  }

  /**
   * @name createProject
   * @description Creates a project and modelizes
   * @method createProject
   * @memberof API
   * @param  {Object}      project Project object (JSON)
   * @return {Promise}
   */
  static createProject(project){
    return API.create('project/create', project)
    .then(response => {
      if(response === 406){
        return 'Duplicate entry exists'
      } else if(typeof(response) != 'number'){
        return API.projectModelize(response)
      } else {
        return 'Unexpected error'
      }
    })
  }

  /**
   * @name projectModelize
   * @description Modelizes a database project model
   * @method projectModelize
   * @memberof API
   * @param  {Object}        item Database project object
   * @return {ProjectModel}
   */
  static projectModelize(item){
    console.log(item)
    // Modelize customer object before providing to project
    return new ProjectModel(item.id, item.costCenter, item.jobType, item.title, item.priority, item.projectStatus, ((item.created) ? new Date(item.created) : null), item.partCount, item.description, item.refNumber, item.customer, ((item.finished) ? new Date(item.finished) : null))
  }

  // Employees

  /**
   * @name employeeModelize
   * @description Modelizes a database employee model
   * @method employeeModelize
   * @memberof API
   * @param  {Object}         item Database employee object
   * @return {EmployeeModel}
   */
  static employeeModelize(item){
    return new EmployeeModel(item.id, item.firstName, item.lastName)
  }

  /**
   * @name fetchEmployees
   * @description Fetches all employees and modelizes
   * @method fetchEmployees
   * @memberof API
   * @return {Promise}
   */
  static fetchEmployees(){
    return fetch(`${api}employee?limit=50&offset=0`)
    .then(res => res.json())
    .then(json => {
      let employees = []
      json.items.forEach(item => {
        employees.push(API.employeeModelize(item))
      })
      return employees
    })
  }

  /**
   * @name createEmployee
   * @description Creates an employee and modelizes
   * @method createEmployee
   * @memberof API
   * @param  {Object}       employee Employee object (JSON)
   * @return {Promise}
   */
  static createEmployee(employee){
    return API.create('employee/create', employee)
    .then(response => {
      if(response === 406){
        return 'Duplicate entry exists'
      } else if(typeof(response) != 'number'){
        return API.employeeModelize(response)
      } else {
        return 'Unexpected error'
      }
    })
  }

  // Users

  /**
   * @name userModelize
   * @description Modelizes a database user model
   * @method userModelize
   * @memberof API
   * @param  {Object}         item Database user object
   * @return {UserModel}
   */
  static userModelize(item){
    return new UserModel(item.id, item.username, item.station, item.admin)
  }

  /**
   * @name login
   * @description POSTs to user/login with body provided, then returns modelized user
   * @method login
   * @memberof API
   * @param  {JSON} body       JSON body for POST
   * @return {Promise}
   */
  static login(body){
    return fetch(`${api}user/login`, {
      method: 'POST',
      body,
      headers: { 'Content-Type': 'application/json' }
    })
    .then(res => {
      // If not null (successful login)
      if (res.status == 200)
        return res.json()
      else
        return null
    })
    .then(json => {
      // If not null (successful login)
      if (json)
        return API.userModelize(json)
      else
        return null
    })
  }

  // Generic

  /**
   * @name create
   * @description POSTs to endpoint with body provided, then returns
   * @method create
   * @memberof API
   * @param  {String} endpoint API endpoint name
   * @param  {JSON} body       JSON body for POST
   * @return {Promise}
   */
  static create(endpoint, body){
    return fetch(`${api}${endpoint}`, {
      method: 'POST',
      body,
      headers: { 'Content-Type': 'application/json' }
    })
    .then(res => {
      if(res.status === 200 || res.status === 201){
        return res.json()
      }
      else {
        return res.status
      }
    })
  }

  /**
   * @name updateProjectStatus
   * @description POSTs to endpoint with status provided, then returns
   * @method updateProjectStatus
   * @memberof API
   * @param  {Integer} id      Project ID
   * @param  {String} status   New project status
   * @return {Promise}
   */
  static updateProjectStatus(id, status){
    return fetch(`${api}project/${id}/status?status=${status}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    })
    .then(() => {
      return true
    })
  }

  /**
   * @name updateProject
   * @description POSTs to endpoint with body provided, then returns
   * @method updateProject
   * @memberof API
   * @param  {Integer} id      Project ID
   * @param  {JSON} body       JSON body for POST
   * @return {Promise}
   */
  static updateProject(id, body){
    return fetch(`${api}project/${id}/update`, {
      method: 'POST',
      body,
      headers: { 'Content-Type': 'application/json' }
    })
    .then(res => {
      console.log(res.status)
      return true
    })
  }

  /**
   * @name createAccount
   * @description Creates an account and modelizes
   * @method createAccount
   * @memberof API
   * @param  {Object}       account Account object (JSON)
   * @return {Promise}
   */
  static createAccount(account){
    return API.create('user/create', account)
    .then(response => {
      if(response === 406){
        return 'Duplicate entry exists'
      } else if(typeof(response) != 'number'){
        return API.userModelize(response)
      } else {
        return 'Unexpected error'
      }
    })
  }

  /**
   * @name fetchAccounts
   * @description Fetches all accounts and modelizes
   * @method fetchAccounts
   * @memberof API
   * @return {Promise}
   */
  static fetchAccounts(){
    return fetch(`${api}user?limit=50&offset=0`)
    .then(res => res.json())
    .then(json => {
      console.log(json)
      let accounts = []
      json.items.forEach(item => {
        accounts.push(API.userModelize(item))
      })
      console.log(accounts)
      return accounts
    })
  }

  /**
   * @name fetchCustomerProjects
   * @description Fetches all projects and modelizes
   * @method fetchCustomerProjects
   * @memberof API
   * @return {Promise}
   * @async
   */
  static fetchCustomerProjects(id){
    return fetch(`${api}project?limit=50&offset=0&customerId=${id}`)
    .then(res => res.json())
    .then(json => {
      let projects = []
      json.items.forEach(item => {
        if (item.projectStatus != 'Dropped')
          projects.push(item)
      })
      projects = projects.map(item => {
        if (item.customer)
          item.customer.companyName = item.customer.name
        let project = API.projectModelize(item)
        return project
      })
      return projects
    })
  }

  /**
   * @name fetchTimeEntries
   * @description Fetches all time entries
   * @method fetchTimeEntries
   * @memberof API
   * @return {Promise}
   * @async
   */
  static fetchTimeEntries(id){
    return fetch(`${api}project/${id}/time-entry`)
    .then(res => res.json())
    .then(json => {
      let entries = []
      // For each returned json object...
      json.forEach(item => {
        let entry = API.timeEntryModelize(item)
        // Add to list
        entries.push(entry)
      })
      // Return list of models, not json
      return entries
    })
  }

  /**
   * @name timeEntryModelize
   * @description Modelizes a database time entry
   * @method timeEntryModelize
   * @memberof API
   * @param  {Object}         item time entry database object
   * @return {CustomerModel}
   */
  static timeEntryModelize(item){
    // Construct model
    let dateItem = new Date(item.created)
    let date = dateItem.toString()
    let timeEntry = new TimeEntryModel(item.id, item.projectId, item.employeeId, item.station, date )
    return timeEntry
  }

  /**
   * @name updateUserAdmin
   * @description POSTs to endpoint with body provided, then returns
   * @method updateUserAdmin
   * @memberof API
   * @param  {Integer} id      USer ID
   * @param  {JSON} bool       boolean for POST
   * @return {Promise}
   */
  static updateUserAdmin(id, bool){
    console.log('Passed: ' + id + 'Bool: ' + bool)
    return fetch(`${api}user/${id}/update`, {
      method: 'POST',
      body: {
        'admin': bool
      },
      headers: { 'Content-Type': 'application/json' }
    })
    .then(res => {
      console.log(res.status)
      return true
    })
  }

}
