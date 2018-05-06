import React from 'react'
import renderer from 'react-test-renderer'
import CustomerSummary from '../../components/customerSummary'

jest.mock('reactstrap', () => ({
  ButtonGroup: 'ButtonGroup',
  DropdownItem: 'DropdownItem',
  DropdownMenu: 'DropdownMenu',
  ButtonDropdown: 'ButtonDropdown',
  DropdownToggle: 'DropdownToggle',
}))

const defaultOptions = {
  page: {
    customerEditPage: jest.fn(),
  },
  website: {
    currentCustomer: {
      companyName: 'name',
      phone: 'phone',
      email: 'email',
      website: 'website',
      pastDue: false,
      formattedShipAddress: 'formattedShipAddress',
      formattedBillAddress: 'formattedBillAddress'
    },
    currentUser: {
      admin: true
    },
    summaryMoreDropdownOpen: false,
    toggleSummaryMoreDD: jest.fn(),
    summaryActionsDropdownOpen: false,
    toggleSummaryActionsDD: jest.fn(),
  }
}
describe('CustomerSummary', () => {
  it ('Renders with snapshot (website.currentCustomer: pastDue false, summaryMoreDropdownOpen false, summaryActionsDropdownOpen false)', () => {
    let options = Object.assign({}, defaultOptions)
    const component = renderer.create(
      <CustomerSummary {...options}/>,
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it ('Renders with snapshot (website.currentCustomer: pastDue false, summaryMoreDropdownOpen true, summaryActionsDropdownOpen false)', () => {
    let options = Object.assign({}, defaultOptions)
    options.website.summaryMoreDropdownOpen = true
    const component = renderer.create(
      <CustomerSummary {...options}/>,
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it ('Renders with snapshot (website.currentCustomer: pastDue false, summaryMoreDropdownOpen true, summaryActionsDropdownOpen true)', () => {
    let options = Object.assign({}, defaultOptions)
    options.website.summaryMoreDropdownOpen = true
    options.website.summaryActionsDropdownOpen = true
    const component = renderer.create(
      <CustomerSummary {...options}/>,
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it ('Renders with snapshot (website.currentCustomer: pastDue false, summaryMoreDropdownOpen false, summaryActionsDropdownOpen true)', () => {
    let options = Object.assign({}, defaultOptions)
    options.website.summaryActionsDropdownOpen = true
    const component = renderer.create(
      <CustomerSummary {...options}/>,
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it ('Renders with snapshot (website.currentCustomer: pastDue true, summaryMoreDropdownOpen false, summaryActionsDropdownOpen false)', () => {
    let options = Object.assign({}, defaultOptions)
    options.website.currentCustomer.pastDue = true
    const component = renderer.create(
      <CustomerSummary {...options}/>,
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it ('Renders with snapshot (website.currentCustomer: pastDue true, summaryMoreDropdownOpen true, summaryActionsDropdownOpen false)', () => {
    let options = Object.assign({}, defaultOptions)
    options.website.currentCustomer.pastDue = true
    options.website.summaryMoreDropdownOpen = true
    const component = renderer.create(
      <CustomerSummary {...options}/>,
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it ('Renders with snapshot (website.currentCustomer: pastDue true, summaryMoreDropdownOpen true, summaryActionsDropdownOpen true)', () => {
    let options = Object.assign({}, defaultOptions)
    options.website.currentCustomer.pastDue = true
    options.website.summaryMoreDropdownOpen = true
    options.website.summaryActionsDropdownOpen = true
    const component = renderer.create(
      <CustomerSummary {...options}/>,
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it ('Renders with snapshot (website.currentCustomer: pastDue true, summaryMoreDropdownOpen false, summaryActionsDropdownOpen true)', () => {
    let options = Object.assign({}, defaultOptions)
    options.website.currentCustomer.pastDue = true
    options.website.summaryActionsDropdownOpen = true
    const component = renderer.create(
      <CustomerSummary {...options}/>,
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
