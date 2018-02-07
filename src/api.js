import fetch from 'node-fetch'
import ProjectModel from './models/projectModel'

const api = 'http://138.197.88.198:8080/l2lc/api/'

export default class API {
  // Return your fetch statement
  // Fetch should compose address of api variable and endpoint (and query params as needed)
  // Fetch always converts res into json, then makes use of json obj
  // Fetches for tables MUST convert their data to the proper model in the final .then statement (use fetchCustomers as an example of this)

  static fetchCustomers(){
    return fetch(`${api}customer?limit=50&offset=0`)
    .then(res => res.json())
    .then(json => {return json})
  }

  static fetchProjects(){
    return fetch(`${api}customer?limit=50&offset=0`)
    .then(res => res.json())
    .then(json => {return json})
  }

  static fetchEmployees(){
    return fetch(`${api}employee?limit=50&offset=0`)
    .then(res => res.json())
    .then(json => {return json})
  }

}
