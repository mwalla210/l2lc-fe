import CustomerTableModel from '../../models/CustomerTableModel'
import renderer from 'react-test-renderer'

jest.mock('../../components/tableActionCell')
jest.mock('../../components/projectStatusCell')
jest.mock('../../components/projectStatusFilter')

jest.mock('../../api', () => {
  return {
    fetchCustomers: jest.fn()
  }
})
jest.mock('../../store/website', () => {
  return {
    setCustomer: jest.fn(),
    currentProject: {
      changeCustomer: jest.fn()
    },
    updateProject: jest.fn().mockReturnValue(Promise.resolve()),
    createProject: jest.fn().mockReturnValue(Promise.resolve()),
  }
})

describe('CustomerTableModel', () => {
  it('Tests constructor', () => {
    let customer = new CustomerTableModel(jest.fn(),jest.fn(),jest.fn(),jest.fn())
    expect(customer).toHaveProperty('columns')
})

  it('Tests clickHandler with info', () => {
    let customer = new CustomerTableModel(jest.fn(),jest.fn(),jest.fn(),jest.fn())
    expect(customer.infoClickNav.mock.calls.length).toBe(0)
    customer.clickHandler(1,'info')
    expect(customer.infoClickNav.mock.calls.length).toBe(1)
  })

  it('Tests clickHandler with edit', () => {
    let customer = new CustomerTableModel(jest.fn(),jest.fn(),jest.fn(),jest.fn())
    expect(customer.editClickNav.mock.calls.length).toBe(0)
    customer.clickHandler(1,'edit')
    expect(customer.editClickNav.mock.calls.length).toBe(1)
  })

  it('Tests clickHandler with no input', () => {
    let customer = new CustomerTableModel(jest.fn(),jest.fn(),jest.fn(),jest.fn())
    const website = require('../../store/website')
    expect(website.setCustomer.mock.calls.length).toBe(2)
    customer.clickHandler(1,'else')
    expect(website.setCustomer.mock.calls.length).toBe(2)
  })

  it('Tests actionColumns', () => {
    let customer = new CustomerTableModel(jest.fn(),jest.fn(),jest.fn(),jest.fn())
    customer.actionColumns()
    expect(customer.columns[5].getProps()).toEqual({className: 'center',style: {paddingTop: '0px',paddingBottom: '0px'}})
    const component = renderer.create(customer.columns[5].Cell())
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('Tests noActionColumns', () => {
    let customer = new CustomerTableModel(jest.fn(),jest.fn(),jest.fn(),jest.fn())
    customer.noActionColumns()
    const component = renderer.create(customer.columns[5].Cell({}))
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('Tests selectCreateClick', () => {
    let customer = new CustomerTableModel(jest.fn(),jest.fn(),jest.fn(),jest.fn())
    expect(customer.selectNav.mock.calls.length).toBe(0)
    customer.selectCreateClick(1)
    expect(customer.selectNav.mock.calls.length).toBe(0)
  })

  it('Tests selectUpdateClick', () => {
    let customer = new CustomerTableModel(jest.fn(),jest.fn(),jest.fn(),jest.fn())
    expect(customer.selectNav.mock.calls.length).toBe(0)
    customer.selectUpdateClick(1)
    expect(customer.selectNav.mock.calls.length).toBe(0)
  })

  it('Tests selectCreateTable', () => {
    let customer = new CustomerTableModel(jest.fn(),jest.fn(),jest.fn(),jest.fn())
    customer.noActionColumns = jest.fn()
    expect(customer.noActionColumns.mock.calls.length).toBe(0)
    customer.selectCreateTable()
    expect(customer.noActionColumns.mock.calls.length).toBe(1)
  })

  it('Tests selectUpdateTable', () => {
    let customer = new CustomerTableModel(jest.fn(),jest.fn(),jest.fn(),jest.fn())
    customer.noActionColumns = jest.fn()
    expect(customer.noActionColumns.mock.calls.length).toBe(0)
    customer.selectUpdateTable()
    expect(customer.noActionColumns.mock.calls.length).toBe(1)
  })

  it('Tests nonSelectTable', () => {
    let customer = new CustomerTableModel(jest.fn(),jest.fn(),jest.fn(),jest.fn())
    customer.actionColumns = jest.fn()
    expect(customer.actionColumns.mock.calls.length).toBe(0)
    customer.nonSelectTable()
    expect(customer.actionColumns.mock.calls.length).toBe(1)
  })

})
