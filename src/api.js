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
        let customer = new CustomerModel(item.id, item.name, item.shippingAddr.street, null, item.shippingAddr.city, item.shippingAddr.state, item.shippingAddr.county, item.shippingAddr.zip, item.email, item.phoneNumber, item.website, addrIsSame, ...addtl)
        // Add to list
        customers.push(customer)
      })
      // Return list of models, not json
      return customers
    })
  }

  static fetchProjects(){
    return fetch(`${api}project?limit=50&offset=0`)
    .then(res => res.json())
    .then(json => {
      console.log(json)
      let model = new ProjectModel(1, {id: 1, title: 'cctitle'}, {id: 1, title: 'jttitle'}, 'title', 'priority')
      return [model]
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

  static addressIsSame(addr1, addr2){
    return JSON.stringify(addr1) === JSON.stringify(addr2)
  }

}
