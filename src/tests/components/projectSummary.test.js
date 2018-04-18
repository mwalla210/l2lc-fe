import React from 'react'
import renderer from 'react-test-renderer'
import ProjectSummary from '../../components/projectSummary'
// Mock imports from ProjectSummary since we're not testing them
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
// Set up some default store options so we don't repeat ourselves
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
    summaryMoreDropdownOpen: false,
    toggleSummaryMoreDD: jest.fn(),
    summaryActionsDropdownOpen: false,
    toggleSummaryActionsDD: jest.fn(),
  }
}
// Right now our test won't run anything - the below it statements are "staged" due to the "x" in front of each
// Remove each "x" before executing the test to include these it statements (suggest you do it one at a time to observe coverage changes)
// Coverage is generated in file coverage/lcov-report/index.html
describe('ProjectSummary', () => {
  // The following test does not cover situations:
  //    priority != Low
  //    status == On Hold OR status == (not On Hold or Completed)
  //    hold.flag == true
  // These above situations can be covered in another it (snapshot) block, by modifying website's currentProject content
  xit ('Renders with snapshot (website.currentProject: priority Low, status Completed, hold.flag false)', () => {
    let options = Object.assign({}, defaultOptions)
    const component = renderer.create(
      <ProjectSummary {...options}/>,
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  // Here's how we'd update the default properties (we should also update status & hold.flag to cover those cases)
  xit ('Renders with snapshot (website.currentProject: priority High, status Completed, hold.flag false)', () => {
    let options = Object.assign({}, defaultOptions)
    // Update priority
    options.website.currentProject.priority = 'High'
    // Update status
    // Update hold.flag
    const component = renderer.create(
      <ProjectSummary {...options}/>,
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  // The following test does not snapshot, but calls an function in the component
  xit ('Renders and calls functions', () => {
    let options = Object.assign({}, defaultOptions)
    const component = renderer.create(
      <ProjectSummary {...options}/>,
    )
    const inst = component.getInstance()
    // Let's validate our start state: we've mocked all of our page and website functions and therefore can "spy" on them
    // Defining functions as "jest.fn()" gives us access to them as "mock"s, where we can check things like number of calls, arguments, etc.
    // We reference this instance's props list, then drill down to the relevant function
    // We assume these have not yet been called, because the render of projectSummary does not call them
    expect(inst.props.page.summaryModel.fieldModal.changeTitle.mock.calls.length).toBe(0)
    expect(inst.props.page.summaryModel.fieldModal.changeConfirmFn.mock.calls.length).toBe(0)
    expect(inst.props.page.summaryModel.fieldModal.changeContent.mock.calls.length).toBe(0)
    expect(inst.props.page.summaryModel.fieldModal.openModal.mock.calls.length).toBe(0)
    // The reworkClick function calls changeTitle, changeConfirmFn, as well as changeContent and openModal (indirectly via resetAndOpenModal), so let's call it
    inst.reworkClick()
    // Now let's check the logic was executed as expected
    // Assert changeTitle was called once
    expect(inst.props.page.summaryModel.fieldModal.changeTitle.mock.calls.length).toBe(1)
    // Assert the first argument seen for this item was 'Add Rework'
    expect(inst.props.page.summaryModel.fieldModal.changeTitle.mock.calls[0][0]).toBe('Add Rework')
    // Assert changeConfirmFn was called once
    expect(inst.props.page.summaryModel.fieldModal.changeConfirmFn.mock.calls.length).toBe(1)
    // Assert it received a function as an argument
    expect(typeof inst.props.page.summaryModel.fieldModal.changeConfirmFn.mock.calls[0][0]).toBe('function')
    // To cover that function definition in the file, let's call it
    inst.props.page.summaryModel.fieldModal.changeConfirmFn.mock.calls[0][0]()
    // Assert changeContent was called once
    expect(inst.props.page.summaryModel.fieldModal.changeContent.mock.calls.length).toBe(1)
    // Assert it received empty content
    expect(inst.props.page.summaryModel.fieldModal.changeContent.mock.calls[0][0]).toBe('')
    // Assert openModal was called once
    expect(inst.props.page.summaryModel.fieldModal.openModal.mock.calls.length).toBe(1)
  })
})
