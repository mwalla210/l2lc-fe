import ProjectTaskTableModel from '../../models/projectTaskTableModel'
import renderer from 'react-test-renderer'
jest.mock('../../components/tableActionCell')
jest.mock('react-toggle-switch/dist/css/switch.min.css', () => 'CSS')
jest.mock('react-toggle-switch', () => 'Switch')
jest.mock('../../api', () => {
  return {
    fetchProjectTasks: jest.fn().mockReturnValue(Promise.resolve([])),
    dropTask: jest.fn().mockReturnValue(Promise.resolve([])),
    updateTaskList: jest.fn(),
    createTaskList: (id, tasks) => {
      return Promise.resolve(JSON.parse(tasks))
    }
  }
})
jest.mock('../../store/website', () => {
  return {
    currentProject: {
      id: 1,
      costCenterTitle: 'APC',
      jobTypeTitle: 'Pump'
    },
  }
})
import Website from '../../store/website'

describe('ProjectTaskTableModel', () => {
  it('Tests constructor', () => {
    let projectTask = new ProjectTaskTableModel(jest.fn(),jest.fn())
    expect(projectTask).toHaveProperty('columns')
    expect(projectTask.columns[1].getProps()).toEqual({className: 'center',style: {paddingTop: '0px',paddingBottom: '0px'}})
    expect(projectTask.columns[5].getProps()).toEqual({className: 'center',style: {paddingTop: '0px',paddingBottom: '0px'}})
  })
  it('Tests Required field Cell', () => {
    let projectTask = new ProjectTaskTableModel(jest.fn(),jest.fn())
    projectTask.data = [{}]
    const component = renderer.create(projectTask.columns[1].Cell({original: {toggleRequired: jest.fn()}}))
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
    // Call click
    component.toTree().props.children.props.onClick()
  })
  it('Tests Actions field Cell', () => {
    let projectTask = new ProjectTaskTableModel(jest.fn(),jest.fn())
    const component = renderer.create(projectTask.columns[5].Cell({}))
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('Tests fetchFn with empty list for APC Pump', async function() {
    let projectTask = new ProjectTaskTableModel(jest.fn(),jest.fn())
    let res = await projectTask.fetchFn()
    expect(res.length).toBe(0)
    expect(projectTask.defaultTaskListModalOpen).toBe(true)
  })
  it('Tests fetchFn with empty list for non-APC', async function() {
    let projectTask = new ProjectTaskTableModel(jest.fn(),jest.fn())
    Website.currentProject.costCenterTitle = 'Other'
    let res = await projectTask.fetchFn()
    expect(res.length).toBe(0)
    expect(projectTask.defaultTaskListModalOpen).toBe(false)
  })
  it('Tests clickHandler with delete', () => {
    let projectTask = new ProjectTaskTableModel(jest.fn(),jest.fn())
    projectTask.clickHandler({original: 'original'},'delete')
    expect(projectTask.currentTask).toBe('original')
    expect(projectTask.modalOpen).toBe(true)
  })
  it('Tests deleteModal.confirmOnClick', async function() {
    let projectTask = new ProjectTaskTableModel(jest.fn(),jest.fn())
    projectTask.currentTask = {id: 1}
    await projectTask.deleteModal.confirmOnClick()
    expect(projectTask.deleteClickNav.mock.calls.length).toBe(1)
  })
  it('Tests move (to back)', async function() {
    let projectTask = new ProjectTaskTableModel(jest.fn(),jest.fn())
    projectTask.data = [
      {id: 1},{id: 2},{id: 3}
    ]
    await projectTask.move(1, 3)
    expect(projectTask.data.length).toBe(3)
    expect(projectTask.data[0]).toMatchObject({'id': 1})
    expect(projectTask.data[1]).toMatchObject({'id': 3})
    expect(projectTask.data[2]).toMatchObject({'id': 2})
  })
  it('Tests move (not to back)', async function() {
    let projectTask = new ProjectTaskTableModel(jest.fn(),jest.fn())
    projectTask.data = [
      {id: 1},{id: 2},{id: 3}
    ]
    await projectTask.move(1, 2)
    expect(projectTask.data.length).toBe(3)
    expect(projectTask.data[0]).toMatchObject({'id': 1})
    expect(projectTask.data[1]).toMatchObject({'id': 3})
    expect(projectTask.data[2]).toMatchObject({'id': 2})
  })
  xit('Tests taskConfirmAndClose (Piston)', async function() {
    Website.currentProject.jobTypeTitle = 'Piston'
    let projectTask = new ProjectTaskTableModel(jest.fn(),jest.fn())
    expect(projectTask.data.length).toBe(0)
    await projectTask.taskConfirmAndClose()
    expect(projectTask.data.length).toBe(11)
  })
  xit('Tests taskConfirmAndClose (Turbo)', async function() {
    Website.currentProject.jobTypeTitle = 'Turbo'
    let projectTask = new ProjectTaskTableModel(jest.fn(),jest.fn())
    expect(projectTask.data.length).toBe(0)
    await projectTask.taskConfirmAndClose()
    expect(projectTask.data.length).toBe(11)
  })
  xit('Tests taskConfirmAndClose (Pump)', async function() {
    Website.currentProject.jobTypeTitle = 'Pump'
    let projectTask = new ProjectTaskTableModel(jest.fn(),jest.fn())
    expect(projectTask.data.length).toBe(0)
    await projectTask.taskConfirmAndClose()
    expect(projectTask.data.length).toBe(11)
  })
  xit('Tests taskConfirmAndClose (Rotor)', async function() {
    Website.currentProject.jobTypeTitle = 'Rotor'
    let projectTask = new ProjectTaskTableModel(jest.fn(),jest.fn())
    expect(projectTask.data.length).toBe(0)
    await projectTask.taskConfirmAndClose()
    expect(projectTask.data.length).toBe(11)
  })
  xit('Tests taskConfirmAndClose (Avaslick)', async function() {
    Website.currentProject.jobTypeTitle = 'Avaslick'
    let projectTask = new ProjectTaskTableModel(jest.fn(),jest.fn())
    expect(projectTask.data.length).toBe(0)
    await projectTask.taskConfirmAndClose()
    expect(projectTask.data.length).toBe(11)
  })
})
