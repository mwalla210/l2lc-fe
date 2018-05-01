import API from '../api'
import CustomerModel from '../models/customerModel'
import ProjectModel from '../models/projectModel'
import EmployeeModel from '../models/employeeModel'
import UserModel from '../models/userModel'
import nock from 'nock'

nock('http://138.197.88.198:8080/l2lc/api')
  .get('/customer')
  .query({limit: 50, offset: 0})
  .reply(200, {
    items: [
      {
        id: '1',
        shippingAddr: {
          city: 'city',
          state: 'state',
          country: 'country',
          zip: 'zip',
          street: 'street',
        }
      },
      {
        id: '2',
        shippingAddr: {
          city: 'city',
          state: 'state',
          country: 'country',
          zip: 'zip',
          street: 'street',
        },
        billingAddr: {
          city: 'city',
          state: 'state',
          country: 'country',
          zip: 'zip',
          street: 'street, apartment',
        }
      },
    ]
  })
  .get('/customer/1')
  .reply(200, {
    id: '1',
    shippingAddr: {
      city: 'city',
      state: 'state',
      country: 'country',
      zip: 'zip',
      street: 'street',
    },
    billingAddr: {
      city: 'city',
      state: 'state',
      country: 'country',
      zip: 'zip',
      street: 'street',
    }
  })
  .get('/customer/2')
  .reply(200, {
    id: '1',
    shippingAddr: {
      city: 'city',
      state: 'state',
      country: 'country',
      zip: 'zip',
      street: 'street',
    }
  })
  .post('/customer/create', body => {return body.duplicate})
  .reply(406)
  .post('/customer/create', body => {return body.unexpected})
  .reply(500)
  .post('/customer/create', body => {return body.success})
  .reply(201, {
    id: '1',
    shippingAddr: {
      city: 'city',
      state: 'state',
      country: 'country',
      zip: 'zip',
      street: 'street, apartment',
    },
    billingAddr: {
      city: 'city',
      state: 'state',
      country: 'country',
      zip: 'zip',
      street: 'billstreet',
    }
  })
  .post('/customer/1/update', () => {return true})
  .reply(406)
  .post('/customer/2/update', () => {return true})
  .reply(200, {
    id: '1',
    shippingAddr: {
      city: 'city',
      state: 'state',
      country: 'country',
      zip: 'zip',
      street: 'street',
    }
  })
  .post('/customer/3/update', () => {return true})
  .reply(500)
  .get('/project')
  .query({limit: 50, offset: 0})
  .reply(200, {
    items: [
      {
        id: '1',
        costCenter: 'costCenter',
        jobType: 'jobType',
        priority: 'priority',
        title: 'title',
        projectStatus: 'projectStatus',
        partCount: 'partCount',
        description: 'description',
        refNumber: 'refNumber',
        created: '1995-12-17T03:24:00',
        finished: '1996-12-17T03:24:00',
      },
      {
        id: '2',
        costCenter: 'costCenter',
        jobType: 'jobType',
        priority: 'priority',
        title: 'title',
        projectStatus: 'projectStatus',
        partCount: 'partCount',
        description: 'description',
        refNumber: 'refNumber',
        customer: {
          name: 'companyName'
        },
      },
      {
        id: '3',
        costCenter: 'costCenter',
        jobType: 'jobType',
        priority: 'priority',
        title: 'title',
        projectStatus: 'Dropped',
        partCount: 'partCount',
        description: 'description',
        refNumber: 'refNumber',
        created: '1995-12-17T03:24:00',
        finished: '1996-12-17T03:24:00',
      },
    ]
  })
  .get('/project/1')
  .reply(200, {
    id: '1',
    costCenter: 'costCenter',
    jobType: 'jobType',
    priority: 'priority',
    title: 'title',
    projectStatus: 'projectStatus',
    partCount: 'partCount',
    description: 'description',
    refNumber: 'refNumber',
  })
  .get('/project/2')
  .reply(200, {
    id: '1',
    costCenter: 'costCenter',
    jobType: 'jobType',
    priority: 'priority',
    title: 'title',
    projectStatus: 'projectStatus',
    partCount: 'partCount',
    description: 'description',
    refNumber: 'refNumber',
  })
  .post('/project/create', body => {return body.duplicate})
  .reply(406)
  .post('/project/create', body => {return body.unexpected})
  .reply(500)
  .post('/project/create', body => {return body.success})
  .reply(201, {
    id: '1',
    costCenter: 'costCenter',
    jobType: 'jobType',
    priority: 'priority',
    title: 'title',
    projectStatus: 'projectStatus',
    partCount: 'partCount',
    description: 'description',
    refNumber: 'refNumber',
  })
  .post('/project/1/update', () => {return true})
  .reply(406)
  .post('/project/2/update', () => {return true})
  .reply(200, {
    id: '1',
    costCenter: 'costCenter',
    jobType: 'jobType',
    priority: 'priority',
    title: 'title',
    projectStatus: 'projectStatus',
    partCount: 'partCount',
    description: 'description',
    refNumber: 'refNumber',
  })
  .post('/project/3/update', () => {return true})
  .reply(500)
  .post('/project/1/status', () => {return true})
  .query({status: 'Completed'})
  .reply(200)
  .get('/employee')
  .query({limit: 50, offset: 0})
  .reply(200, {
    items: [
      {
        id: '1',
        firstName: 'firstName',
        lastName: 'lastName'
      },
      {
        id: '2',
        firstName: 'firstName',
        lastName: 'lastName'
      },
    ]
  })
  .post('/employee/create', body => {return body.duplicate})
  .reply(406)
  .post('/employee/create', body => {return body.unexpected})
  .reply(500)
  .post('/employee/create', body => {return body.success})
  .reply(201, {
    id: '1',
    firstName: 'firstName',
    lastName: 'lastName'
  })
  .post('/employee/1/update', () => {return true})
  .reply(406)
  .post('/employee/2/update', () => {return true})
  .reply(200, {
    id: '1',
    firstName: 'firstName',
    lastName: 'lastName'
  })
  .post('/employee/3/update', () => {return true})
  .reply(500)
  .post('/user/login', body => {return body.success})
  .reply(200, {
    id: 'id',
    username: 'username',
    station: 'station',
    admin: true,
  })
  .post('/user/login', body => {return !body.success})
  .reply(404)

describe('API', () => {
  it ('Tests fetchCustomers', async function() {
    let response = await API.fetchCustomers()
    expect(response).toHaveLength(2)
    response.forEach(item => {
      expect(item).toBeInstanceOf(CustomerModel)
    })
  })
  it ('Tests fetchCustomer (matching ID)', async function() {
    let response = await API.fetchCustomer(1)
    expect(response).toBeInstanceOf(CustomerModel)
  })
  it ('Tests fetchCustomer (non-matching ID)', async function() {
    let response = await API.fetchCustomer(2)
    expect(response).toBeNull()
  })
  it ('Tests createCustomer (duplicate)', async function() {
    let response = await API.createCustomer(JSON.stringify({
      duplicate: true
    }))
    expect(response).toBe('Duplicate entry exists')
  })
  it ('Tests createCustomer (success)', async function() {
    let response = await API.createCustomer(JSON.stringify({
      success: true
    }))
    expect(response).toBeInstanceOf(CustomerModel)
  })
  it ('Tests createCustomer (unexpected error)', async function() {
    let response = await API.createCustomer(JSON.stringify({
      unexpected: true
    }))
    expect(response).toBe('Unexpected error 500')
  })
  it ('Tests updateCustomer (duplicate)', async function() {
    let response = await API.updateCustomer(1,JSON.stringify({
      duplicate: true
    }))
    expect(response).toBe('Duplicate entry exists')
  })
  it ('Tests updateCustomer (success)', async function() {
    let response = await API.updateCustomer(2,JSON.stringify({
      success: true
    }))
    expect(response).toBeInstanceOf(CustomerModel)
  })
  it ('Tests updateCustomer (unexpected error)', async function() {
    let response = await API.updateCustomer(3,JSON.stringify({
      unexpected: true
    }))
    expect(response).toBe('Unexpected error 500')
  })
  it ('Tests fetchProjects', async function() {
    let response = await API.fetchProjects()
    expect(response).toHaveLength(2)
    response.forEach(item => {
      expect(item).toBeInstanceOf(ProjectModel)
    })
  })
  it ('Tests fetchProject (matching ID)', async function() {
    let response = await API.fetchProject(1)
    expect(response).toBeInstanceOf(ProjectModel)
  })
  it ('Tests fetchProject (non-matching ID)', async function() {
    let response = await API.fetchProject(2)
    expect(response).toBeNull()
  })
  it ('Tests createProject (duplicate)', async function() {
    let response = await API.createProject(JSON.stringify({
      duplicate: true
    }))
    expect(response).toBe('Duplicate entry exists')
  })
  it ('Tests createProject (success)', async function() {
    let response = await API.createProject(JSON.stringify({
      success: true
    }))
    expect(response).toBeInstanceOf(ProjectModel)
  })
  it ('Tests createProject (unexpected error)', async function() {
    let response = await API.createProject(JSON.stringify({
      unexpected: true
    }))
    expect(response).toBe('Unexpected error 500')
  })
  it ('Tests updateProject (duplicate)', async function() {
    let response = await API.updateProject(1,JSON.stringify({
      duplicate: true
    }))
    expect(response).toBe('Duplicate entry exists')
  })
  it ('Tests updateProject (success)', async function() {
    let response = await API.updateProject(2,JSON.stringify({
      success: true
    }))
    expect(response).toBeInstanceOf(ProjectModel)
  })
  it ('Tests updateProject (unexpected error)', async function() {
    let response = await API.updateProject(3,JSON.stringify({
      unexpected: true
    }))
    expect(response).toBe('Unexpected error 500')
  })
  it ('Tests updateProjectStatus', async function() {
    let response = await API.updateProjectStatus(1,'Completed')
    expect(response).toBe(true)
  })
  it ('Tests fetchEmployees', async function() {
    let response = await API.fetchEmployees()
    expect(response).toHaveLength(2)
    response.forEach(item => {
      expect(item).toBeInstanceOf(EmployeeModel)
    })
  })
  it ('Tests createEmployee (duplicate)', async function() {
    let response = await API.createEmployee(JSON.stringify({
      duplicate: true
    }))
    expect(response).toBe('Duplicate entry exists')
  })
  it ('Tests createEmployee (success)', async function() {
    let response = await API.createEmployee(JSON.stringify({
      success: true
    }))
    expect(response).toBeInstanceOf(EmployeeModel)
  })
  it ('Tests createEmployee (unexpected error)', async function() {
    let response = await API.createEmployee(JSON.stringify({
      unexpected: true
    }))
    expect(response).toBe('Unexpected error 500')
  })
  it ('Tests updateEmployee (duplicate)', async function() {
    let response = await API.updateEmployee(1,JSON.stringify({
      duplicate: true
    }))
    expect(response).toBe('Duplicate entry exists')
  })
  it ('Tests updateEmployee (success)', async function() {
    let response = await API.updateEmployee(2,JSON.stringify({
      success: true
    }))
    expect(response).toBeInstanceOf(EmployeeModel)
  })
  it ('Tests updateEmployee (unexpected error)', async function() {
    let response = await API.updateEmployee(3,JSON.stringify({
      unexpected: true
    }))
    expect(response).toBe('Unexpected error 500')
  })
  it ('Tests login (success)', async function() {
    let response = await API.login(JSON.stringify({
      success: true
    }))
    expect(response).toBeInstanceOf(UserModel)
  })
  it ('Tests login (failure)', async function() {
    let response = await API.login(JSON.stringify({
      success: false
    }))
    expect(response).toBeNull()
  })
})
