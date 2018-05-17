import React from 'react'
import renderer from 'react-test-renderer'
import Stations from '../../components/stations'

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
    printClick: jest.fn()
}

describe('Stations', () => {
  it ('Renders with snapshot', () => {
    let options = Object.assign({}, defaultOptions)
    const component = renderer.create(
      <Stations {...options}/>,
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it ('Renders and calls function printClick', () => {
    let options = Object.assign({}, defaultOptions)
    global.print = jest.fn()
    const component = renderer.create(
      <Stations {...options}/>,
    )
    const inst = component.getInstance()
    inst.printClick()
    expect(global.print).toBeCalled()
  })
})
