import fetch from 'node-fetch'
import ProjectModel from './models/projectModel'
import CustomerModel from './models/customerModel'
import EmployeeModel from './models/employeeModel'
import TaskModel from './models/taskModel'
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
      }
      else if(typeof(response) != 'number'){
        return API.customerModelize(response)
      }
      else {
        return `Unexpected error ${response}`
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
      if (!addrIsSame){
        let split = item.billingAddr.street.indexOf(',')
        let street1 = item.billingAddr.street
        let street2 = null
        if (split != -1){
          street1 = item.billingAddr.street.slice(0,split)
          street2 = item.billingAddr.street.slice(split+2,item.billingAddr.street.length)
        }
        addtl = [street1, street2, item.billingAddr.city, item.billingAddr.state, item.billingAddr.country, item.billingAddr.zip]
      }
    }
    else
      addrIsSame = true
    // Construct model
    let split = item.shippingAddr.street.indexOf(',')
    let street1 = item.shippingAddr.street
    let street2 = null
    if (split != -1){
      street1 = item.shippingAddr.street.slice(0,split)
      street2 = item.shippingAddr.street.slice(split+2,item.billingAddr.street.length)
    }
    let customer = new CustomerModel(item.id, item.name, street1, street2, item.shippingAddr.city, item.shippingAddr.state, item.shippingAddr.country, item.shippingAddr.zip, item.email, item.phoneNumber, item.website, item.isPastDue, addrIsSame, ...addtl)
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
  /**
   * @name updateCustomer
   * @description POSTs to endpoint with body provided, then returns
   * @method updateCustomer
   * @memberof API
   * @param  {Integer} id      Customer ID
   * @param  {JSON} body       JSON body for POST
   * @return {Promise}
   */
  static updateCustomer(id, body){
    return API.update(`customer/${id}/update`, body)
    .then(response => {
      if(response === 406){
        return 'Duplicate entry exists'
      }
      else if(typeof(response) != 'number'){
        return API.customerModelize(response)
      }
      else {
        return `Unexpected error ${response}`
      }
    })
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
   * @name fetchProjectTasks
   * @description Fetches project and modelizes
   * @method fetchProjectTasks
   * @memberof API
   * @param  {Number}     id ID of project to fetch
   * @return {Promise}
   * @async
   */
  static fetchProjectTasks(id){
    return fetch(`${api}project/${id}/tasks`)
    .then(res => res.json())
    .then(json => {
      let tasks = []
      json.forEach(task => tasks.push(API.taskModelize(task)))
      return tasks
    })
  }
  /**
   * @name createTask
   * @description POSTs a task to API, modelizes return
   * @method createTask
   * @param  {Number}   projectID  Related project
   * @param  {Object}       task Task object (JSON)
   * @return {Promise}
   */
  static createTask(projectID, task){
    return API.create(`project/${projectID}/task/create`, task)
    .then(response => {
      if(response === 406){
        return 'Duplicate entry exists'
      }
      else if(typeof(response) != 'number'){
        return API.taskModelize(response)
      }
      else {
        return `Unexpected error ${response}`
      }
    })
  }
  /**
   * @name taskModelize
   * @description Modelizes a database task model
   * @method taskModelize
   * @memberof API
   * @param  {Object}        item Database task object
   * @return {TaskModel}
   */
  static taskModelize(item){
    return new TaskModel(item.required, item.title, item.station, item.status)
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
      }
      else if(typeof(response) != 'number'){
        return API.projectModelize(response)
      }
      else {
        return `Unexpected error ${response}`
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
    // Modelize customer object before providing to project
    return new ProjectModel(item.id, item.costCenter, item.jobType, item.title, item.priority, item.projectStatus, ((item.created) ? new Date(item.created) : null), item.partCount, item.description, item.refNumber, item.customer, ((item.finished) ? new Date(item.finished) : null))
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
    return API.update(`project/${id}/update`, body)
    .then(response => {
      if(response === 406){
        return 'Duplicate entry exists'
      }
      else if(typeof(response) != 'number'){
        return API.projectModelize(response)
      }
      else {
        return `Unexpected error ${response}`
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
      }
      else if(typeof(response) != 'number'){
        return API.employeeModelize(response)
      }
      else {
        return `Unexpected error ${response}`
      }
    })
  }
  /**
   * @name updateEmployee
   * @description POSTs to endpoint with body provided, then returns
   * @method updateEmployee
   * @memberof API
   * @param  {Integer} id      Employee ID
   * @param  {JSON} body       JSON body for POST
   * @return {Promise}
   */
  static updateEmployee(id, body){
    return API.update(`employee/${id}/update`, body)
    .then(response => {
      if(response === 406){
        return 'Duplicate entry exists'
      }
      else if(typeof(response) != 'number'){
        return API.employeeModelize(response)
      }
      else {
        return `Unexpected error ${response}`
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
   * @name update
   * @description POSTs to endpoint with body provided, then returns
   * @method update
   * @memberof API
   * @param  {String} endpoint API endpoint name
   * @param  {JSON} body       JSON body for POST
   * @return {Promise}
   */
  static update(endpoint, body){
    return fetch(`${api}${endpoint}`, {
      method: 'POST',
      body,
      headers: { 'Content-Type': 'application/json' }
    })
    .then(res => {
      if(res.status === 200 || res.status === 202){
        return res.json()
      }
      else {
        return res.status
      }
    })
  }

}
