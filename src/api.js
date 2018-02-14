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
      let custIds = []
      json.items.forEach(item => {
        if (item.customerId && !custIds.includes(item.customerId)){
          custIds.push(item.customerId)
        }
      })
      let promises = []
      custIds.forEach(id => {
        promises.push(API.fetchCustomer(id))
      })
      // If promises empty, this code is executed immediately
      // Return end result of Promise.all
      return Promise.all(promises)
      .then(customers => {
        console.log('customers', customers)
        json.items.forEach(item => {
          let customer = null
          if (item.customerId){
            customer = customers.find(element => {
              return element.id == item.customerId
            })
          }
          // Not used: projectStatus
          let project = new ProjectModel(item.id, item.costCenter, item.jobType, item.title, item.priority, ((item.created) ? new Date(item.created) : null), item.partCount, item.description, item.refNumber, customer, ((item.finished) ? new Date(item.finished) : null))
          projects.push(project)
        })
        console.log(json, projects)
        // let model = new ProjectModel(1, {id: 1, title: 'cctitle'}, {id: 1, title: 'jttitle'}, 'title', 'priority')
        return projects
      })
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

}
