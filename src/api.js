import fetch from 'node-fetch'
import ProjectModel from './models/projectModel'
import CustomerModel from './models/customerModel'
import EmployeeModel from './models/employeeModel'

const api = 'http://138.197.88.198:8080/l2lc/api/'

/**
 * @name API
 * @class API
 * @classdesc API functions for interaction with database
 */
export default class API {
  // Fetch should compose address of api variable and endpoint (and query params as needed)
  // Fetch always converts res into json, then makes use of json obj
  // Fetches for tables MUST convert their data to the proper model in the final .then statement (use fetchCustomers as an example of this)

  // Customers

  /**
   * @name fetchCustomers
   * @description Fetches all customers and modelizes
   * @method fetchCustomers
   * @memberof API
   * @return {Promise}
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
   */
  static createCustomer(customer){
    return API.create('customer/create', customer)
    .then(response => {
      return API.customerModelize(response)
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
      return API.projectModelize(response)
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
      return API.employeeModelize(response)
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
    }).then(res => res.json())
    .then(json => {
      console.log('json',json)
      return json
    })
  }

}
