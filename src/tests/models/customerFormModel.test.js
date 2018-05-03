import CustomerFormModel from '../../models/customerFormModel'

jest.mock('../../store/website', () => {
  return {
    updateCustomer: jest.fn().mockReturnValueOnce(Promise.resolve(null)).mockReturnValueOnce(Promise.resolve('response')),
    createCustomer: jest.fn().mockReturnValueOnce(Promise.resolve(null)).mockReturnValueOnce(Promise.resolve('response')),
    currentCustomer:jest.fn(),
  }
})

describe('CustomerFormModel', () => {
  it ('Tests constructor', () => {
    let customerFormModel = new CustomerFormModel(jest.fn(), jest.fn(), jest.fn())
    expect(customerFormModel).toHaveProperty('onClickNav')
  })
  it ('Tests setNonEdit with !billIsSame', async function() {
    let customerFormModel = new CustomerFormModel(jest.fn(), jest.fn(), jest.fn())
    customerFormModel.primaryButton.onClick = null
    customerFormModel.setNonEdit()
    expect(typeof customerFormModel.primaryButton.onClick).toBe('function')
    await customerFormModel.primaryButton.onClick([
      {
        id: 'companyName',
        value: 'value'
      },
      {
        id: 'email',
        value: 'value'
      },
      {
        id: 'website',
        value: 'value'
      },
      {
        id: 'shipAddr1',
        value: 'value'
      },
      {
        id: 'shipAddr2',
        value: 'value'
      },
      {
        id: 'shipCity',
        value: 'value'
      },
      {
        id: 'shipState',
        value: 'value'
      },
      {
        id: 'shipCountry',
        value: 'value'
      },
      {
        id: 'shipZip',
        value: 'value'
      },
      {
        id: 'phone',
        value: 'value'
      },
      {
        id: 'billAddr1',
        value: 'value'
      },
      {
        id: 'billAddr2',
        value: 'value'
      },
      {
        id: 'billCity',
        value: 'value'
      },
      {
        id: 'billState',
        value: 'value'
      },
      {
        id: 'billCountry',
        value: 'value'
      },
      {
        id: 'billZip',
        value: 'value'
      }
    ])
    expect(customerFormModel.onClickNav.mock.calls.length).toBe(1)
    expect(customerFormModel.errorResponse).toBe('')
    expect(customerFormModel.modalOpen).toBe(false)
  })
  it ('Tests setNonEdit else block from newButton', async function() {
    let customerFormModel = new CustomerFormModel(jest.fn(), jest.fn(), jest.fn())
    customerFormModel.primaryButton.onClick = null
    customerFormModel.setNonEdit()
    expect(typeof customerFormModel.primaryButton.onClick).toBe('function')
    await customerFormModel.primaryButton.onClick([
      {
        id: 'companyName',
        value: 'value'
      },
      {
        id: 'email',
        value: 'value'
      },
      {
        id: 'website',
        value: 'value'
      },
      {
        id: 'shipAddr1',
        value: 'value'
      },
      {
        id: 'shipAddr2',
        value: 'value'
      },
      {
        id: 'shipCity',
        value: 'value'
      },
      {
        id: 'shipState',
        value: 'value'
      },
      {
        id: 'shipCountry',
        value: 'value'
      },
      {
        id: 'shipZip',
        value: 'value'
      },
      {
        id: 'phone',
        value: 'value'
      },
      {
        id: 'billIsSame',
        value: 'value'
      },
      {
        id: 'billAddr1',
        value: 'value'
      },
      {
        id: 'billAddr2',
        value: 'value'
      },
      {
        id: 'billCity',
        value: 'value'
      },
      {
        id: 'billState',
        value: 'value'
      },
      {
        id: 'billCountry',
        value: 'value'
      },
      {
        id: 'billZip',
        value: 'value'
      }
    ])
    expect(customerFormModel.onClickNav.mock.calls.length).toBe(0)
    expect(customerFormModel.errorResponse).toBe('response')
    expect(customerFormModel.modalOpen).toBe(true)
  })
/*  it ('Tests setEdit', async function() {
    let customerFormModel = new CustomerFormModel(jest.fn(), jest.fn(), jest.fn())
    customerFormModel.primaryButton.onClick = null
    customerFormModel.setEdit()
    expect(typeof customerFormModel.primaryButton.onClick).toBe('function')
    await customerFormModel.primaryButton.onClick([
      {
        id: 'companyName',
        value: 'value'
      },
      {
        id: 'email',
        value: 'value'
      },
      {
        id: 'website',
        value: 'value'
      },
      {
        id: 'shipAddr1',
        value: 'value'
      },
      {
        id: 'shipAddr2',
        value: 'value'
      },
      {
        id: 'shipCity',
        value: 'value'
      },
      {
        id: 'shipState',
        value: 'value'
      },
      {
        id: 'shipCountry',
        value: 'value'
      },
      {
        id: 'shipZip',
        value: 'value'
      },
      {
        id: 'phone',
        value: 'value'
      },
      {
        id: 'billIsSame',
        value: 'value'
      },
      {
        id: 'billAddr1',
        value: 'value'
      },
      {
        id: 'billAddr2',
        value: 'value'
      },
      {
        id: 'billCity',
        value: 'value'
      },
      {
        id: 'billState',
        value: 'value'
      },
      {
        id: 'billCountry',
        value: 'value'
      },
      {
        id: 'billZip',
        value: 'value'
      }
    ])
    expect(customerFormModel.onClickNav.mock.calls.length).toBe(1)
    expect(customerFormModel.errorResponse).toBe('')
    expect(customerFormModel.modalOpen).toBe(false)
    customerFormModel.resetValues([
      {
        id: 'companyName',
        value: 'value'
      },
      {
        id: 'email',
        value: 'value'
      },
      {
        id: 'website',
        value: 'value'
      },
      {
        id: 'shipAddr1',
        value: 'value'
      },
      {
        id: 'shipAddr2',
        value: 'value'
      },
      {
        id: 'shipCity',
        value: 'value'
      },
      {
        id: 'shipState',
        value: 'value'
      },
      {
        id: 'shipCountry',
        value: 'value'
      },
      {
        id: 'shipZip',
        value: 'value'
      },
      {
        id: 'phone',
        value: 'value'
      },
      {
        id: 'billIsSame',
        value: 'value'
      },
      {
        id: 'billAddr1',
        value: 'value'
      },
      {
        id: 'billAddr2',
        value: 'value'
      },
      {
        id: 'billCity',
        value: 'value'
      },
      {
        id: 'billState',
        value: 'value'
      },
      {
        id: 'billCountry',
        value: 'value'
      },
      {
        id: 'billZip',
        value: 'value'
      }
    ])
  })
  it ('Tests setEdit else block from editButton', async function() {
    let customerFormModel = new CustomerFormModel(jest.fn(), jest.fn(), jest.fn())
    customerFormModel.primaryButton.onClick = null
    customerFormModel.setEdit()
    expect(typeof customerFormModel.primaryButton.onClick).toBe('function')
    await customerFormModel.primaryButton.onClick([
      {
        id: 'companyName',
        value: 'value'
      },
      {
        id: 'email',
        value: 'value'
      },
      {
        id: 'website',
        value: 'value'
      },
      {
        id: 'shipAddr1',
        value: 'value'
      },
      {
        id: 'shipAddr2',
        value: 'value'
      },
      {
        id: 'shipCity',
        value: 'value'
      },
      {
        id: 'shipState',
        value: 'value'
      },
      {
        id: 'shipCountry',
        value: 'value'
      },
      {
        id: 'shipZip',
        value: 'value'
      },
      {
        id: 'phone',
        value: 'value'
      },
      {
        id: 'billIsSame',
        value: 'value'
      },
      {
        id: 'billAddr1',
        value: 'value'
      },
      {
        id: 'billAddr2',
        value: 'value'
      },
      {
        id: 'billCity',
        value: 'value'
      },
      {
        id: 'billState',
        value: 'value'
      },
      {
        id: 'billCountry',
        value: 'value'
      },
      {
        id: 'billZip',
        value: 'value'
      }
    ])
    expect(customerFormModel.onClickNav.mock.calls.length).toBe(0)
    expect(customerFormModel.errorResponse).toBe('response')
    expect(customerFormModel.modalOpen).toBe(true)
  })*/
})
