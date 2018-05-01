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

describe('API', () => {
  it ('Tests fetchCustomers (matching ID)', async function() {
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
})
