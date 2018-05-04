import CustomerModel from '../../models/customerModel'


describe('CustomerModel', () => {
  it ('Tests constructor', () => {
    let customer = new CustomerModel(1, 'companyName', 'shipAddr1', 'shipAddr2', 'shipCity', 'shipState', 'shipCountry', 19104, 'email', 'phone', 'website', false, false, 'billAddr1', 'billAddr2', 'billCity', 'billState', 'billCountry', 19601)
    expect(customer).toHaveProperty('companyName')
    expect(customer).toHaveProperty('pastDue')
    expect(customer).toHaveProperty('billAddr.billZip')
  })
  it ('Tests setBillIsSame', () => {
    let customer = new CustomerModel(1, 'companyName', 'shipAddr1', 'shipAddr2', 'shipCity', 'shipState', 'shipCountry', 19104, 'email', 'phone', 'website', false, false, 'billAddr1', 'billAddr2', 'billCity', 'billState', 'billCountry', 19601)
    customer.setBillIsSame()
    expect(customer.billIsSame).toBe(true)
  })
  it ('Tests getProjects', () => {
    let customer = new CustomerModel(1, 'companyName', 'shipAddr1', 'shipAddr2', 'shipCity', 'shipState', 'shipCountry', 19104, 'email', 'phone', 'website', false, false, 'billAddr1', 'billAddr2', 'billCity', 'billState', 'billCountry', 19601)
    customer.getProjects() //function does nothing
  })
  it ('Tests get formattedShipAddress', () => {
    let customer = new CustomerModel()
    customer.shipAddr.shipAddr1 = 'a'
    customer.shipAddr.shipAddr2 = 'b'
    customer.shipAddr.shipCity = 'c'
    customer.shipAddr.shipState = 'd'
    customer.shipAddr.shipZip = 'e'
    customer.shipAddr.shipCountry = 'f'
    expect(customer.formattedShipAddress).toEqual('a\nb\nc, d  e\nf')
  })
  it ('Tests formattedBillAddress when billIsSame: true', () => {
    let customer = new CustomerModel()
    customer.shipAddr.shipAddr1 = 'a'
    customer.shipAddr.shipAddr2 = 'b'
    customer.shipAddr.shipCity = 'c'
    customer.shipAddr.shipState = 'd'
    customer.shipAddr.shipZip = 'e'
    customer.shipAddr.shipCountry = 'f'
    customer.billIsSame = true
    expect(customer.formattedBillAddress).toEqual('a\nb\nc, d  e\nf')
  })
  it ('Tests formattedBillAddress when billIsSame: false', () => {
    let customer = new CustomerModel()
    customer.billAddr.billAddr1 = 'a'
    customer.billAddr.billAddr2 = 'b'
    customer.billAddr.billCity = 'c'
    customer.billAddr.billState = 'd'
    customer.billAddr.billZip = 'e'
    customer.billAddr.billCountry = 'f'
    customer.billIsSame = false
    expect(customer.formattedBillAddress).toEqual('a\nb\nc, d  e\nf')
  })
  it ('Tests get billAddressLine1 when billIsSame: true', () => {
    let customer = new CustomerModel()
    customer.shipAddr.shipAddr1 = 'a'
    customer.billIsSame = true
    expect(customer.billAddressLine1).toEqual('a')
  })
  it ('Tests get billAddressLine1 when billIsSame: false', () => {
    let customer = new CustomerModel()
    customer.billAddr.billAddr1 = 'b'
    customer.billIsSame = false
    expect(customer.billAddressLine1).toEqual('b')
  })
  it ('Tests get billAddressLine2 when shipAddr.shipAddr2: not null, this.billAddr.billAddr2: not null, billIsSame: true', () => {
    let customer = new CustomerModel()
    customer.shipAddr.shipAddr2 = 'a'
    customer.billAddr.billAddr2 = 'b'
    customer.billIsSame = true
    expect(customer.billAddressLine2).toEqual('a')
  })
  it ('Tests get billAddressLine2 when shipAddr.shipAddr2: null, billIsSame: false', () => {
    let customer = new CustomerModel()
    customer.shipAddr.shipAddr2 = null
    customer.billAddr.billAddr2 = 'b'
    customer.billIsSame = false
    expect(customer.billAddressLine2).toEqual('b')
  })
  it ('Tests get get billAddressCity when billIsSame: true', () => {
    let customer = new CustomerModel()
    customer.shipAddr.shipCity = 'a'
    customer.billIsSame = true
    expect(customer.billAddressCity).toEqual('a')
  })
  it ('Tests get get billAddressCity when billIsSame: false', () => {
    let customer = new CustomerModel()
    customer.billAddr.billCity = 'a'
    customer.billIsSame = false
    expect(customer.billAddressCity).toEqual('a')
  })
  it ('Tests get get billAddressState when billIsSame: true', () => {
    let customer = new CustomerModel()
    customer.shipAddr.shipState = 'a'
    customer.billIsSame = true
    expect(customer.billAddressState).toEqual('a')
  })
  it ('Tests get get billAddressState when billIsSame: false', () => {
    let customer = new CustomerModel()
    customer.billAddr.billState = 'a'
    customer.billIsSame = false
    expect(customer.billAddressState).toEqual('a')
  })
  it ('Tests get get billAddressZip when billIsSame: true', () => {
    let customer = new CustomerModel()
    customer.shipAddr.shipZip = 'a'
    customer.billIsSame = true
    expect(customer.billAddressZip).toEqual('a')
  })
  it ('Tests get get billAddressZip when billIsSame: false', () => {
    let customer = new CustomerModel()
    customer.billAddr.billZip = 'a'
    customer.billIsSame = false
    expect(customer.billAddressZip).toEqual('a')
  })
  it ('Tests get get billAddressCountry when billIsSame: true', () => {
    let customer = new CustomerModel()
    customer.shipAddr.shipCountry = 'a'
    customer.billIsSame = true
    expect(customer.billAddressCountry).toEqual('a')
  })
  it ('Tests get get billAddressCountry when billIsSame: false', () => {
    let customer = new CustomerModel()
    customer.billAddr.billCountry = 'a'
    customer.billIsSame = false
    expect(customer.billAddressCountry).toEqual('a')
  })
})
