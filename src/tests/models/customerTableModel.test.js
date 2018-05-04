import CustomerTableModel from '../../models/CustomerTableModel'
import renderer from 'react-test-renderer'
import ButtonDefault from '../../components/buttonDefault'
import TableActionCell from '../../components/tableActionCell'

//jest.mock('../../components/tableActionCell')
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
import Website from '../../store/website'

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
    customer.clickHandler(1,'else')
    expect(Website.setCustomer.mock.calls.length).toBe(2)
  })

  it('Tests actionColumns', () => {
    let customer = new CustomerTableModel(jest.fn(),jest.fn(),jest.fn(),jest.fn())
    customer.nonSelectTable()
    expect(customer.columns[5].getProps()).toEqual({className: 'center',style: {paddingTop: '0px',paddingBottom: '0px'}})
    const component = renderer.create(customer.columns[5].Cell({}))
    let tree2 = component.toJSON()
    expect(tree2).toMatchSnapshot()
    component.root.findByType(TableActionCell)
  })

  it('Tests noActionColumns', () => {
    let customer = new CustomerTableModel(jest.fn(),jest.fn(),jest.fn(),jest.fn())
    customer.selectCreateTable()
    const component = renderer.create(customer.columns[5].Cell({}))
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
    component.root.findByType(ButtonDefault).props.onClick()
  })

  it('Tests selectCreateClick', () => {
    let customer = new CustomerTableModel(jest.fn(),jest.fn(),jest.fn(),jest.fn())
    expect(Website.setCustomer.mock.calls.length).toBe(3)
    customer.selectCreateClick(1)
    expect(Website.setCustomer.mock.calls.length).toBe(4)
  })

  it('Tests selectUpdateClick', () => {
    let customer = new CustomerTableModel(jest.fn(),jest.fn(),jest.fn(),jest.fn())
    expect(Website.updateProject.mock.calls.length).toBe(0)
    customer.selectUpdateClick(1)
    expect(Website.updateProject.mock.calls.length).toBe(1)
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
