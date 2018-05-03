import EmployeeTableModel from '../../models/employeeTableModel'
import renderer from 'react-test-renderer'
import TableActionCell from '../../components/tableActionCell'

//jest.mock('../../components/tableActionCell')
jest.mock('../../components/projectStatusCell')
jest.mock('../../components/projectStatusFilter')

jest.mock('../../api', () => {
  return {
    fetchProjects: jest.fn()
  }
})
jest.mock('../../store/website', () => {
  return {
    setEmployee: jest.fn(),
  }
})

describe('employeeTableModel', () => {
  it('Tests constructor', () => {
    let project = new EmployeeTableModel(jest.fn(),jest.fn(),jest.fn())
    expect(project).toHaveProperty('styling')
    expect(project.columns[3].getProps()).toEqual({className: 'center',style: {paddingTop: '0px',paddingBottom: '0px'}})
  })

  it('Tests clickHandler with info', () => {
    let project = new EmployeeTableModel(jest.fn(),jest.fn(),jest.fn())
    expect(project.infoClickNav.mock.calls.length).toBe(0)
    project.clickHandler(1,'info')
    expect(project.infoClickNav.mock.calls.length).toBe(1)
  })

  it('Tests clickHandler with edit', () => {
    let project = new EmployeeTableModel(jest.fn(),jest.fn(),jest.fn())
    expect(project.editClickNav.mock.calls.length).toBe(0)
    project.clickHandler(1,'edit')
    expect(project.editClickNav.mock.calls.length).toBe(1)
  })

  it('Tests clickHandler with no input', () => {
    let project = new EmployeeTableModel(jest.fn(),jest.fn(),jest.fn())
    const website = require('../../store/website')
    expect(website.setEmployee.mock.calls.length).toBe(2)
    project.clickHandler(1,'else')
    expect(website.setEmployee.mock.calls.length).toBe(2)
  })

  it('Tests Actions field Cell', () => {
    let project = new EmployeeTableModel(jest.fn(),jest.fn(),jest.fn())
    const component = renderer.create(project.columns[3].Cell())
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
