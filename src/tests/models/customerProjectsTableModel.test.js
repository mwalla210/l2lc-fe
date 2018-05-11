import CustomerProjectsTableModel from '../../models/customerProjectsTableModel'
import renderer from 'react-test-renderer'

jest.mock('../../components/projectStatusFilter')
jest.mock('../../api', () => {
  return {
    fetchCustomerProjects: jest.fn()
  }
})
jest.mock('../../store/website', () => {
  return {
    setCustomerTable: jest.fn(),
    currentProject: {
      changeCustomerTable: jest.fn()
    },
    currentUser: {
      admin: false
    },
    currentCustomer:{
      id: 1,
    },
    setProject: jest.fn().mockReturnValue(Promise.resolve()),
  }
})
import Website from '../../store/website'

describe('CustomerProjectsTableModel', () => {
  xit('Tests constructor', () => {
    let customerTable = new CustomerProjectsTableModel(jest.fn(),jest.fn(),jest.fn())
    expect(customerTable).toHaveProperty('columns')
    customerTable.fetchFn()
    expect(customerTable.columns[1].accessor({dateCreated: new Date('December 17, 1995 03:24:00')})).toEqual(expect.stringContaining('Dec'))
    expect(customerTable.columns[5].filterMethod({value:{length: 0}},[]))
    expect(customerTable.columns[5].filterMethod({value:{length: 9, includes: jest.fn()}},[]))
})

  it('Tests clickHandler with info', () => {
    let customerTable = new CustomerProjectsTableModel(jest.fn(),jest.fn(),jest.fn(),jest.fn())
    expect(customerTable.infoClickNav.mock.calls.length).toBe(0)
    customerTable.clickHandler(1,'info')
    expect(customerTable.infoClickNav.mock.calls.length).toBe(1)
  })

  it('Tests clickHandler with edit', () => {
    let customerTable = new CustomerProjectsTableModel(jest.fn(),jest.fn(),jest.fn(),jest.fn())
    expect(customerTable.editClickNav.mock.calls.length).toBe(0)
    customerTable.clickHandler(1,'edit')
    expect(customerTable.editClickNav.mock.calls.length).toBe(1)
  })

  it('Tests clickHandler with delete', () => {
    let customerTable = new CustomerProjectsTableModel(jest.fn(),jest.fn(),jest.fn(),jest.fn())
    customerTable.clickHandler(1,'delete')
    //else case, if it ran then it ran
  })

  it('Tests clickHandler with no input', () => {
    let customerTable = new CustomerProjectsTableModel(jest.fn(),jest.fn(),jest.fn(),jest.fn())
    customerTable.clickHandler(1,'null')
    //else case, if it ran then it ran
  })

  it('Tests toggleDropdown', () => {
    let customerTable = new CustomerProjectsTableModel(jest.fn(),jest.fn(),jest.fn(),jest.fn())
    customerTable.toggleDropdown()
    expect(customerTable.filterDD).toEqual(true)
  })

  xit('Tests Actions column', () => {
    let customerTable = new CustomerProjectsTableModel(jest.fn(),jest.fn(),jest.fn(),jest.fn())
    expect(customerTable.columns[6].getProps()).toEqual({className: 'center',style: {paddingTop: '0px',paddingBottom: '0px'}})
    const component = renderer.create(customerTable.columns[6].Cell({original:{toggleAdmin: jest.fn(), status: 'Completed'}}))
    let tree2 = component.toJSON()
    expect(tree2).toMatchSnapshot()
    //component.root.findByType(Switch).props.onClick()
  })

  xit('Tests Actions column', () => {
    let customerTable = new CustomerProjectsTableModel(jest.fn(),jest.fn(),jest.fn(),jest.fn())
    Website.currentUser.admin = true
    expect(customerTable.columns[6].getProps()).toEqual({className: 'center',style: {paddingTop: '0px',paddingBottom: '0px'}})
    const component = renderer.create(customerTable.columns[6].Cell({original:{toggleAdmin: jest.fn(), status: 'Completed'}}))
    let tree2 = component.toJSON()
    expect(tree2).toMatchSnapshot()
    //component.root.findByType(Switch).props.onClick()
  })

  xit('Tests Status Cell', () => {
    let customerTable = new CustomerProjectsTableModel(jest.fn(),jest.fn(),jest.fn(),jest.fn())
    const component = renderer.create(customerTable.columns[5].Cell({}))
    let tree2 = component.toJSON()
    expect(tree2).toMatchSnapshot()
  })

  xit('Tests Status Filter', () => {
    let customerTable = new CustomerProjectsTableModel(jest.fn(),jest.fn(),jest.fn(),jest.fn())
      expect(typeof customerTable.columns[5].Filter({filter:{},onChange:jest.fn()})).toBe('object')
  })

})
