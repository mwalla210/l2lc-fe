import React from 'react'
import renderer from 'react-test-renderer'
import DraggableTable from '../../components/draggableTable'
jest.mock('react-table', () => 'ReactTable')
jest.mock('react-table/react-table.css', () => 'CSS')
jest.mock('reactstrap', () => ({
  ButtonGroup: 'ButtonGroup',
}))
jest.mock('../../components/tableButton')
jest.mock('../../components/deleteModal')
jest.mock('../../components/promptModal')
jest.mock('../../components/buttonDefault')
jest.mock('../../components/draggableRow')

const defaultOptions = {
  page: {
    tableModel: {
      confirmAndClose: () => {
        console.log('confirmAndClose')
      },
      closeModal: jest.fn(),
      openModal: jest.fn(),
      move: jest.fn(),
      taskConfirmAndClose: jest.fn(),
      taskCloseModal: jest.fn(),
      defaultTaskListModalOpen: false,
      data: [],
      columns: [],
      loading: false,
      deleteModal: {
        title: 'Delete',
        content: 'content'
      },
      tableButton: {
        title: 'Button',
        onClick: jest.fn()
      }
    }
  },
  website: {
    currentProject: {
      notes: '',
      changeNotes: jest.fn()
    }
  }
}
describe('DraggableTable', () => {
  it ('Renders with snapshot', () => {
    let options = Object.assign({}, defaultOptions)
    const component = renderer.create(
      <DraggableTable {...options}/>,
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it ('Renders with long data', () => {
    let options = Object.assign({}, defaultOptions)
    options.page.tableModel.data = [
      {},{},{},{},{},
    ]
    const component = renderer.create(
      <DraggableTable {...options}/>,
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it ('Renders and calls printClick', () => {
    let options = Object.assign({}, defaultOptions)
    global.print = jest.fn()
    const component = renderer.create(
      <DraggableTable {...options}/>,
    )
    const inst = component.getInstance()
    inst.printClick()
    expect(global.print).toBeCalled()
  })
  it ('Renders and calls rowProps (null row)', () => {
    let options = Object.assign({}, defaultOptions)
    const component = renderer.create(
      <DraggableTable {...options}/>,
    )
    const inst = component.getInstance()
    expect(Object.keys(inst.rowProps({},null)).length).toBe(0)
  })
  it ('Renders and calls rowProps (object row)', () => {
    let options = Object.assign({}, defaultOptions)
    const component = renderer.create(
      <DraggableTable {...options}/>,
    )
    const inst = component.getInstance()
    expect(Object.keys(inst.rowProps({},{index: 1})).length).toBe(3)
  })
  it ('Renders and calls confirmOnClick', () => {
    let options = Object.assign({}, defaultOptions)
    const component = renderer.create(
      <DraggableTable {...options}/>,
    )
    const inst = component.getInstance()
    global.console = {log: jest.fn()}
    inst.confirmOnClick()
    expect(console.log).toBeCalled()
  })
})
