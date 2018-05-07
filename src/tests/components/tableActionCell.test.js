import React from 'react'
import renderer from 'react-test-renderer'
import TableActionCell from '../../components/tableActionCell'
jest.mock('../../components/circleButton')

const defaultOptions = {
  website: {},
  page: {},
  row: {},
  set: 'Full',
  clickHandler: jest.fn()
}

describe('TableActionCell', () => {
  it ('Renders with set Full', () => {
    let options = Object.assign({}, defaultOptions)
    const component = renderer.create(
      <TableActionCell {...options}/>,
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it ('Renders with set Restricted', () => {
    let options = Object.assign({}, defaultOptions)
    options.set = 'Restricted'
    const component = renderer.create(
      <TableActionCell {...options}/>,
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it ('Renders with set Delete', () => {
    let options = Object.assign({}, defaultOptions)
    options.set = 'Delete'
    const component = renderer.create(
      <TableActionCell {...options}/>,
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it ('Calls function infoClick', () => {
    let options = Object.assign({}, defaultOptions)
    options.clickHandler = jest.fn()
    const component = renderer.create(
      <TableActionCell {...options}/>,
    )
    let inst = component.getInstance()
    expect(inst.props.clickHandler.mock.calls.length).toBe(0)
    inst.infoClick()
    expect(inst.props.clickHandler.mock.calls.length).toBe(1)
    expect(inst.props.clickHandler.mock.calls[0][0]).toMatchObject({})
    expect(inst.props.clickHandler.mock.calls[0][1]).toBe('info')
  })
  it ('Calls function editClick', () => {
    let options = Object.assign({}, defaultOptions)
    options.clickHandler = jest.fn()
    const component = renderer.create(
      <TableActionCell {...options}/>,
    )
    let inst = component.getInstance()
    expect(inst.props.clickHandler.mock.calls.length).toBe(0)
    inst.editClick()
    expect(inst.props.clickHandler.mock.calls.length).toBe(1)
    expect(inst.props.clickHandler.mock.calls[0][0]).toMatchObject({})
    expect(inst.props.clickHandler.mock.calls[0][1]).toBe('edit')
  })
  it ('Calls function deleteClick', () => {
    let options = Object.assign({}, defaultOptions)
    options.clickHandler = jest.fn()
    const component = renderer.create(
      <TableActionCell {...options}/>,
    )
    let inst = component.getInstance()
    expect(inst.props.clickHandler.mock.calls.length).toBe(0)
    inst.deleteClick()
    expect(inst.props.clickHandler.mock.calls.length).toBe(1)
    expect(inst.props.clickHandler.mock.calls[0][0]).toMatchObject({})
    expect(inst.props.clickHandler.mock.calls[0][1]).toBe('delete')
  })
})
