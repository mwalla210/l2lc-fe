import React from 'react'
import renderer from 'react-test-renderer'
import ProjectSummary from '../../components/projectSummary'
jest.mock('../../components/barcode')
jest.mock('../../components/deleteModal')
jest.mock('../../components/fieldModal')
jest.mock('../../components/promptModal')
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
    summaryModel: {
      fieldModal: {
        changeTitle: jest.fn(),
        changeConfirmFn: jest.fn(),
        openModal: jest.fn(),
        title: 'fieldModal',
        confirmAndClose: jest.fn(),
        modalOpen: false,
        closeModal: jest.fn(),
        changeContent: jest.fn(),
        contents: 'contents'
      },
      deleteModal: {
        openModal: jest.fn(),
        confirmAndClose: jest.fn(),
        modalOpen: false,
        closeModal: jest.fn(),
      },
      completeModal: {
        openModal: jest.fn(),
        confirmAndClose: jest.fn(),
        modalOpen: false,
        closeModal: jest.fn(),
      },
    },
    projectEditPage: jest.fn(),
    changeCustomerPage: jest.fn(),
  },
  website: {
    currentProject: {
      title: 'title',
      status: 'Completed',
      priority: 'Low',
      costCenterTitle: 'CC',
      jobTypeTitle: 'JT',
      customer: {
        companyName: 'company',
        id: 1
      },
      timeSpent: 'time',
      partCount: 'parts',
      descr: 'descr',
      refNum: 'ref',
      barcodeDomID: 'barcodeDomID',
      barcodeScanID: 'barcodeScanID',
      hold: {
        flag: false
      }
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

describe('ProjectSummary', () => {
  it ('Renders with snapshot (website.currentProject: priority Low, status Completed, hold.flag false)', () => {
    let options = Object.assign({}, defaultOptions)
    const component = renderer.create(
      <ProjectSummary {...options}/>,
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it ('Renders with snapshot (website.currentProject: priority High, status On Hold, hold.flag true)', () => {
    let options = Object.assign({}, defaultOptions)
    options.website.currentProject.priority = 'High'
    options.website.currentProject.status = 'On Hold'
    options.website.currentProject.hold.flag = true
    const component = renderer.create(
      <ProjectSummary {...options}/>,
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it ('Renders with snapshot (website.currentProject: priority Low, status (!Completed, !On Hold), hold.flag false)', () => {
    let options = Object.assign({}, defaultOptions)
    options.website.currentProject.status = 'Received'
    const component = renderer.create(
      <ProjectSummary {...options}/>,
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it ('Renders and calls reworkClick', () => {
    let options = Object.assign({}, defaultOptions)
    const component = renderer.create(
      <ProjectSummary {...options}/>,
    )
    const inst = component.getInstance()
    expect(inst.props.page.summaryModel.fieldModal.changeTitle.mock.calls.length).toBe(0)
    expect(inst.props.page.summaryModel.fieldModal.changeConfirmFn.mock.calls.length).toBe(0)
    expect(inst.props.page.summaryModel.fieldModal.changeContent.mock.calls.length).toBe(0)
    expect(inst.props.page.summaryModel.fieldModal.openModal.mock.calls.length).toBe(0)
    inst.reworkClick()
    expect(inst.props.page.summaryModel.fieldModal.changeTitle.mock.calls.length).toBe(1)
    expect(inst.props.page.summaryModel.fieldModal.changeTitle.mock.calls[0][0]).toBe('Add Rework')
    expect(inst.props.page.summaryModel.fieldModal.changeConfirmFn.mock.calls.length).toBe(1)
    expect(typeof inst.props.page.summaryModel.fieldModal.changeConfirmFn.mock.calls[0][0]).toBe('function')
    inst.props.page.summaryModel.fieldModal.changeConfirmFn.mock.calls[0][0]()
    expect(inst.props.page.summaryModel.fieldModal.changeContent.mock.calls.length).toBe(1)
    expect(inst.props.page.summaryModel.fieldModal.changeContent.mock.calls[0][0]).toBe('')
    expect(inst.props.page.summaryModel.fieldModal.openModal.mock.calls.length).toBe(1)
  })
  it ('Renders and calls holdClick', () => {
    let options = Object.assign({}, defaultOptions)
    options.page.summaryModel.fieldModal.changeTitle = jest.fn()
    options.page.summaryModel.fieldModal.changeConfirmFn = jest.fn()
    options.page.summaryModel.fieldModal.changeContent = jest.fn()
    options.page.summaryModel.fieldModal.openModal = jest.fn()
    options.website.currentProject.hold.flag = false
    const component = renderer.create(
      <ProjectSummary {...options}/>,
    )
    const inst = component.getInstance()
    expect(inst.props.page.summaryModel.fieldModal.changeTitle.mock.calls.length).toBe(0)
    expect(inst.props.page.summaryModel.fieldModal.changeConfirmFn.mock.calls.length).toBe(0)
    expect(inst.props.page.summaryModel.fieldModal.changeContent.mock.calls.length).toBe(0)
    expect(inst.props.page.summaryModel.fieldModal.openModal.mock.calls.length).toBe(0)
    inst.holdClick()
    expect(inst.props.page.summaryModel.fieldModal.changeTitle.mock.calls.length).toBe(1)
    expect(inst.props.page.summaryModel.fieldModal.changeTitle.mock.calls[0][0]).toBe('Add Hold')
    expect(inst.props.page.summaryModel.fieldModal.changeConfirmFn.mock.calls.length).toBe(1)
    expect(typeof inst.props.page.summaryModel.fieldModal.changeConfirmFn.mock.calls[0][0]).toBe('function')
    inst.props.page.summaryModel.fieldModal.changeConfirmFn.mock.calls[0][0]()
    expect(inst.props.page.summaryModel.fieldModal.changeContent.mock.calls.length).toBe(1)
    expect(inst.props.page.summaryModel.fieldModal.changeContent.mock.calls[0][0]).toBe('')
    expect(inst.props.page.summaryModel.fieldModal.openModal.mock.calls.length).toBe(1)
  })
  it ('Renders and calls holdClick', () => {
    let options = Object.assign({}, defaultOptions)
    options.page.summaryModel.fieldModal.changeTitle = jest.fn()
    options.page.summaryModel.fieldModal.changeConfirmFn = jest.fn()
    options.page.summaryModel.fieldModal.changeContent = jest.fn()
    options.page.summaryModel.fieldModal.openModal = jest.fn()
    options.website.currentProject.hold.flag = true
    const component = renderer.create(
      <ProjectSummary {...options}/>,
    )
    const inst = component.getInstance()
    expect(inst.props.page.summaryModel.fieldModal.changeTitle.mock.calls.length).toBe(0)
    expect(inst.props.page.summaryModel.fieldModal.changeConfirmFn.mock.calls.length).toBe(0)
    expect(inst.props.page.summaryModel.fieldModal.changeContent.mock.calls.length).toBe(0)
    expect(inst.props.page.summaryModel.fieldModal.openModal.mock.calls.length).toBe(0)
    inst.holdClick()
    expect(inst.props.page.summaryModel.fieldModal.changeTitle.mock.calls.length).toBe(1)
    expect(inst.props.page.summaryModel.fieldModal.changeTitle.mock.calls[0][0]).toBe('Remove Hold')
    expect(inst.props.page.summaryModel.fieldModal.changeConfirmFn.mock.calls.length).toBe(1)
    expect(typeof inst.props.page.summaryModel.fieldModal.changeConfirmFn.mock.calls[0][0]).toBe('function')
    inst.props.page.summaryModel.fieldModal.changeConfirmFn.mock.calls[0][0]()
    expect(inst.props.page.summaryModel.fieldModal.changeContent.mock.calls.length).toBe(1)
    expect(inst.props.page.summaryModel.fieldModal.changeContent.mock.calls[0][0]).toBe('')
    expect(inst.props.page.summaryModel.fieldModal.openModal.mock.calls.length).toBe(1)
  })
  it ('Renders and calls tasksClick', () => {
    let options = Object.assign({}, defaultOptions)
    const component = renderer.create(
      <ProjectSummary {...options}/>,
    )
    const inst = component.getInstance()
    inst.tasksClick()
  })
  it ('Renders and calls timeEntries', () => {
    let options = Object.assign({}, defaultOptions)
    const component = renderer.create(
      <ProjectSummary {...options}/>,
    )
    const inst = component.getInstance()
    inst.timeEntries()
  })
  it ('Renders and calls printClick', () => {
    let options = Object.assign({}, defaultOptions)
    global.print = jest.fn()
    const component = renderer.create(
      <ProjectSummary {...options}/>,
    )
    const inst = component.getInstance()
    inst.printClick()
    expect(global.print).toBeCalled()
  })
})
