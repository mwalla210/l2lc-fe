import fetch from 'node-fetch'
import ProjectModel from './models/projectModel'
import CustomerModel from './models/customerModel'
import EmployeeModel from './models/employeeModel'

const api = 'http://138.197.88.198:8080/l2lc/api/'

export default class API {
  // Fetch should compose address of api variable and endpoint (and query params as needed)
  // Fetch always converts res into json, then makes use of json obj
  // Fetches for tables MUST convert their data to the proper model in the final .then statement (use fetchCustomers as an example of this)

  static fetchCustomers(){
    return fetch(`${api}customer?limit=50&offset=0`)
    .then(res => res.json())
    .then(json => {
      let customers = []
      // For each returned json object...
      json.items.forEach(item => {
        let customer = API.customerCreate(item)
        // Add to list
        customers.push(customer)
      })
      // Return list of models, not json
      return customers
    })
  }

  static customerCreate(item){
    let addrIsSame = false
    let addtl = []
    // Check if addresses match each other
    if (API.addressIsSame(item.shippingAddr, item.billingAddr))
      addrIsSame = true
    // If not, send billing info as args
    else {
      addtl = [item.billingAddr.street, null, item.billingAddr.city, item.billingAddr.state, item.billingAddr.country, item.billingAddr.zip]
    }
    // Construct model
    let customer = new CustomerModel(item.id, item.name, item.shippingAddr.street, null, item.shippingAddr.city, item.shippingAddr.state, item.shippingAddr.country, item.shippingAddr.zip, item.email, item.phoneNumber, item.website, addrIsSame, ...addtl)
    return customer
  }

  static fetchCustomer(id){
    return fetch(`${api}customer/${id}`)
    .then(res => res.json())
    .then(json => {
      let customer = null
      if (json.id == id){
        customer = API.customerCreate(json)
      }
      return customer
    })
  }

  static addressIsSame(addr1, addr2){
    return JSON.stringify(addr1) === JSON.stringify(addr2)
  }

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
        let project = new ProjectModel(item.id, item.costCenter, item.jobType, item.title, item.priority, item.projectStatus, ((item.created) ? new Date(item.created) : null), item.partCount, item.description, item.refNumber, item.customer, ((item.finished) ? new Date(item.finished) : null))
        return project
      })
      return projects
    })
  }

  static fetchEmployees(){
    return fetch(`${api}employee?limit=50&offset=0`)
    .then(res => res.json())
    .then(json => {
      console.log(json)
      let employees = []
      json.items.forEach(item => {
        let employee = new EmployeeModel(item.id, item.firstName, item.lastName)
        employees.push(employee)
      })
      return employees
    })
  }

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
