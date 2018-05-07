import ProjectTableModel from '../../models/projectTableModel'
import renderer from 'react-test-renderer'
jest.mock('../../components/tableActionCell')
jest.mock('../../components/projectStatusCell')
jest.mock('../../components/projectStatusFilter')

jest.mock('../../api', () => {
  return {
    fetchProjects: jest.fn()
  }
})
jest.mock('../../store/website', () => {
  return {
    setProject: jest.fn(),
    currentUser: {
      admin: false
    },
  }
})
import Website from '../../store/website'

describe('ProjectTableModel', () => {
  it('Tests constructor', () => {
    let project = new ProjectTableModel(jest.fn(),jest.fn(),jest.fn())
    expect(project).toHaveProperty('columns')
    expect(project.columns[1].accessor({dateCreated: new Date('December 17, 1995 03:24:00')})).toEqual(expect.stringContaining('Dec'))
    expect(project.columns[3].accessor({customer: {companyName: 'companyName'}})).toBe('companyName')
    expect(project.columns[6].filterMethod({value:{length: 0}},[]))
    expect(project.columns[6].filterMethod({value:{length: 9, includes: jest.fn()}},[]))
    expect(project.columns[7].getProps()).toEqual({className: 'center',style: {paddingTop: '0px',paddingBottom: '0px'}})
  })

  it('Tests toggleDropdown', () => {
    let project = new ProjectTableModel(jest.fn(),jest.fn(),jest.fn())
    project.toggleDropdown()
    expect(project.filterDD).toBe(true)
  })

  it('Tests Status field Cell', () => {
    let project = new ProjectTableModel(jest.fn(),jest.fn(),jest.fn())
    const component = renderer.create(project.columns[6].Cell({}))
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('Tests Status field Filter', () => {
    let project = new ProjectTableModel(jest.fn(),jest.fn(),jest.fn())
    expect(typeof project.columns[6].Filter({filter:{},onChange:jest.fn()})).toBe('object')
  })

  it('Tests Actions field Cell', () => {
    let project = new ProjectTableModel(jest.fn(),jest.fn(),jest.fn())
    const component = renderer.create(project.columns[7].Cell({original: {status: 'Completed'}}))
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('Tests clickHandler with info', () => {
    let project = new ProjectTableModel(jest.fn(),jest.fn(),jest.fn())
    expect(project.infoClickNav.mock.calls.length).toBe(0)
    project.clickHandler(1,'info')
    expect(project.infoClickNav.mock.calls.length).toBe(1)
  })

  it('Tests clickHandler with edit', () => {
    let project = new ProjectTableModel(jest.fn(),jest.fn(),jest.fn())
    expect(project.editClickNav.mock.calls.length).toBe(0)
    project.clickHandler(1,'edit')
    expect(project.editClickNav.mock.calls.length).toBe(1)
  })

  it('Tests clickHandler with delete', () => {
    let project = new ProjectTableModel(jest.fn(),jest.fn(),jest.fn())
    project.openModal = jest.fn()
    expect(project.openModal.mock.calls.length).toBe(0)
    project.clickHandler(1,'delete')
    expect(project.openModal.mock.calls.length).toBe(1)
  })

  it('Tests clickHandler with no input', () => {
    let project = new ProjectTableModel(jest.fn(),jest.fn(),jest.fn())
    project.openModal = jest.fn()
    expect(project.openModal.mock.calls.length).toBe(0)
    project.clickHandler(1, '')
    expect(project.openModal.mock.calls.length).toBe(0)
  })

  it('Tests non-admin Actions field Cell', () => {
    Website.currentUser.admin = true
    let project = new ProjectTableModel(jest.fn(),jest.fn(),jest.fn())
    expect(project).toHaveProperty('columns')
    const component = renderer.create(project.columns[7].Cell({original: {status: 'Completed'}}))
    let tree2 = component.toJSON()
    expect(tree2).toMatchSnapshot()
  })
})
