import React from 'react'
import renderer from 'react-test-renderer'
import EmployeeSummary from '../../components/employeeSummary'

jest.mock('../../components/barcode')
jest.mock('../../components/buttonDefault')
jest.mock('reactstrap', () => ({
  ButtonGroup: 'ButtonGroup',
  DropdownItem: 'DropdownItem',
  DropdownMenu: 'DropdownMenu',
  ButtonDropdown: 'ButtonDropdown',
  DropdownToggle: 'DropdownToggle',
}))

const defaultOptions = {
  page: {
    employeeEditPage: jest.fn(),
    changeCustomerPage: jest.fn(),
  },
  website: {
    currentEmployee: {
      fullName: 'fullName',
      barcodeDomID: 'barcodeDomID',
      barcodeScanID: 'barcodeScanID'
    },
    summaryActionsDropdownOpen: false,
    toggleSummaryActionsDD: jest.fn()
  }
}
describe('EmployeeSummary', () => {
  it ('Renders with snapshot (summaryActionsDropdownOpen: false)', () => {
    let options = Object.assign({}, defaultOptions)
    const component = renderer.create(
      <EmployeeSummary {...options}/>,
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it ('Renders with snapshot (summaryActionsDropdownOpen: true)', () => {
    let options = Object.assign({}, defaultOptions)
    options.website.summaryActionsDropdownOpen = true
    const component = renderer.create(
      <EmployeeSummary {...options}/>,
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it ('Renders and calls function printClick', () => {
    let options = Object.assign({}, defaultOptions)
    global.print = jest.fn()
    const component = renderer.create(
      <EmployeeSummary {...options}/>,
    )
    const inst = component.getInstance()
    inst.printClick()
    expect(global.print).toBeCalled()
  })
})
