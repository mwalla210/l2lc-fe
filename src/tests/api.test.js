import API from '../api'
import CustomerModel from '../models/customerModel'
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
})
