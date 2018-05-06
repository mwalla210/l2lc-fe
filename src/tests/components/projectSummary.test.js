import React from 'react'
import renderer from 'react-test-renderer'
import ProjectSummary from '../../components/projectSummary'
jest.mock('../../components/barcode')
jest.mock('../../components/deleteModal')
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
      priority: '1-2 Days',
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
      },
      dateCreated: 'dateCreated',
      dateFinished: 'dateFinished'
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
  it ('Renders with snapshot (website.currentProject: priority 1-2 Days, status Completed, hold.flag false)', () => {
    let options = Object.assign({}, defaultOptions)
    const component = renderer.create(
      <ProjectSummary {...options}/>,
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it ('Renders with snapshot (website.currentProject: priority 3 Days, status On Hold, hold.flag true)', () => {
    let options = Object.assign({}, defaultOptions)
    options.website.currentProject.priority = '3 Days'
    options.website.currentProject.status = 'On Hold'
    options.website.currentProject.hold.flag = true
    const component = renderer.create(
      <ProjectSummary {...options}/>,
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it ('Renders with snapshot (website.currentProject: priority 4-5 Days, status (!Completed, !On Hold), hold.flag false)', () => {
    let options = Object.assign({}, defaultOptions)
    options.website.currentProject.priority = '4-5 Days'
    options.website.currentProject.status = 'Received'
    const component = renderer.create(
      <ProjectSummary {...options}/>,
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
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
