import React from 'react'
import renderer from 'react-test-renderer'
import Navbar from '../../components/navbar'
jest.mock('reactstrap', () => ({
  Navbar: 'Navbar',
  Nav: 'Nav',
  NavbarBrand: 'NavbarBrand',
  Collapse: 'Collapse',
  DropdownMenu: 'DropdownMenu',
  DropdownToggle: 'DropdownToggle',
  DropdownItem: 'DropdownItem',
  UncontrolledDropdown: 'UncontrolledDropdown',
  NavItem: 'NavItem',
  NavLink: 'NavLink',
}))
jest.mock('../../components/promptModal')

const defaultOptions = {
  page: {
    createNewProjMenuItem: jest.fn(),
    projectsMenuItem: jest.fn(),
    projectTimeEntryMenuItem: jest.fn(),
    customerInfoMenuItem: jest.fn(),
    analyticsMenuItem: jest.fn(),
    employeeInformationMenuItem: jest.fn(),
    accountManagementMenuItem:jest.fn()
  },
  website: {
    logOutAlert: jest.fn(),
    setUser: jest.fn(),
    logOutDismiss: jest.fn(),
    logOutModalOpen: false,
    currentUser:{
      username:'testuser',
      admin: true
    },
  },
}

describe('Navbar', () => {
  it ('Renders with snapshot', () => {
    let options = Object.assign({}, defaultOptions)
    const component = renderer.create(
      <Navbar {...options}/>,
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('Renders and calls logoutClick', () => {
    let options = Object.assign({}, defaultOptions)
    const component = renderer.create(
      <Navbar {...options}/>,
    )
    const inst = component.getInstance()

    expect(inst.props.website.logOutAlert.mock.calls.length).toBe(0)
    inst.logoutClick()
    expect(inst.props.website.logOutAlert.mock.calls.length).toBe(1)
  })

  it('Renders and calls promptConfirm', () => {
    let options = Object.assign({}, defaultOptions)
    const component = renderer.create(
      <Navbar {...options}/>,
    )
    const inst = component.getInstance()

    expect(inst.props.website.setUser.mock.calls.length).toBe(0)
    expect(inst.props.website.logOutDismiss.mock.calls.length).toBe(0)
    inst.promptConfirm()
    expect(inst.props.website.setUser.mock.calls.length).toBe(1)
    expect(inst.props.website.logOutDismiss.mock.calls.length).toBe(1)
  })

  it('Renders and calls promptDismiss', () => {
    let options = Object.assign({}, defaultOptions)
    const component = renderer.create(
      <Navbar {...options}/>,
    )
    const inst = component.getInstance()

    expect(inst.props.website.logOutDismiss.mock.calls.length).toBe(1)
    inst.promptDismiss()
    expect(inst.props.website.logOutDismiss.mock.calls.length).toBe(2)
  })

})
