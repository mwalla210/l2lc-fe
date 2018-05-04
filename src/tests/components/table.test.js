import React from 'react'
import renderer from 'react-test-renderer'
import Table from '../../components/table'
jest.mock('react-table', () => 'ReactTable')
jest.mock('react-table/react-table.css', () => 'CSS')
jest.mock('../../components/tableButton')
jest.mock('../../components/deleteModal')

const defaultOptions = {
  page: {
    tableModel: {
      confirmAndClose: jest.fn(),
      closeModal: jest.fn(),
      modalOpen: false,
      columns: [],
      data: [],
      loading: false
    }
  }
}
describe('Table', () => {
  it ('Renders with default content', () => {
    let options = Object.assign({}, defaultOptions)
    const component = renderer.create(
      <Table {...options}/>,
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it ('Renders with deleteModal', () => {
    let options = Object.assign({}, defaultOptions)
    options.page.tableModel.deleteModal = {
      title: 'Delete',
      content: 'content'
    }
    const component = renderer.create(
      <Table {...options}/>,
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it ('Renders with styling, checks styling function calling', () => {
    let options = Object.assign({}, defaultOptions)
    options.page.tableModel.styling = jest.fn()
    const component = renderer.create(
      <Table {...options}/>,
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
    const inst = component.getInstance()
    const getTree = component.toTree()
    expect(inst.props.page.tableModel.styling.mock.calls.length).toBe(0)
    getTree.rendered.props.children[2].props.children.props.getTrProps('state', 'rowInfo', 'column')
    expect(inst.props.page.tableModel.styling.mock.calls.length).toBe(1)
    expect(inst.props.page.tableModel.styling.mock.calls[0][0]).toBe('state')
    expect(inst.props.page.tableModel.styling.mock.calls[0][1]).toBe('rowInfo')
    expect(inst.props.page.tableModel.styling.mock.calls[0][2]).toBe('column')
  })
  it ('Renders with tableButton', () => {
    let options = Object.assign({}, defaultOptions)
    options.page.tableModel.tableButton = {
      title: 'Button',
      onClick: jest.fn()
    }
    const component = renderer.create(
      <Table {...options}/>,
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it ('Calls filter function', () => {
    let options = Object.assign({}, defaultOptions)
    const component = renderer.create(
      <Table {...options}/>,
    )
    const inst = component.getInstance()
    expect(inst.filter({id: 1},{})).toBe(false)
    expect(inst.filter({id: 1, value: 'value'},{1: 'value'})).toBe(true)
    expect(inst.filter({id: 1, value: 'value'},{2: 'value'})).toBe(false)
  })
})
