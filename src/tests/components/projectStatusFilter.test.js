import React from 'react'
import renderer from 'react-test-renderer'
import ProjectStatusFilter from '../../components/projectStatusFilter'
jest.mock('reactstrap', () => ({
  ButtonDropdown: 'ButtonDropdown',
  DropdownToggle: 'DropdownToggle',
  DropdownMenu: 'DropdownMenu',
}))
jest.mock('react-checkbox-group', () => ({
  Checkbox: 'Checkbox',
  CheckboxGroup: 'CheckboxGroup',
}))

const defaultOptions = {
  onChange: jest.fn(),
  filter:{
    value:null,
  },
  page: {
    tableModel:{
      filterDD: jest.fn(),
      toggleDropdown: jest.fn(),
    },
  },
  website: {
    currentUser:null,
  },
}

const alternateOptions = {
  onChange: jest.fn(),
  filter:null,
  page: {
    tableModel:{
      filterDD: jest.fn(),
      toggleDropdown: jest.fn(),
    },
  },
  website: {
    currentUser:null,
  },
}

describe('ProjectStatusFilter', () => {
  it ('Renders with snapshot', () => {
    let options = Object.assign({}, defaultOptions)
    const component = renderer.create(
      <ProjectStatusFilter {...options}/>,
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it ('Renders with snapshot, alternate arguments', () => {
    let options = Object.assign({}, alternateOptions)
    const component = renderer.create(
      <ProjectStatusFilter {...options}/>,
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('Renders and calls checkChange', () => {
    let options = Object.assign({}, defaultOptions)
    const component = renderer.create(
      <ProjectStatusFilter {...options}/>,
    )
    const inst = component.getInstance()

    expect(inst.props.onChange.mock.calls.length).toBe(0)
    inst.checkChange()
    expect(inst.props.onChange.mock.calls.length).toBe(1)
  })

})
