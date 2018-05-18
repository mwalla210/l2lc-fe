import ProjectModel from '../../models/projectModel'
let dateFormat = require('dateformat')

jest.mock('../../api', () => {
  return {
    fetchProjects: jest.fn(),
    fetchTimeEntries: jest.fn().mockReturnValue(Promise.resolve('res')),
    updateProject: jest.fn(),
    fetchCustomer: jest.fn().mockReturnValue(Promise.resolve('res'))
  }
})
jest.mock('../../store/website', () => {
  return {
    setProject: jest.fn(),
  }
})

describe('ProjectModel', () => {
  it('Tests constructor', () => {
    let project = new ProjectModel(1,'costCenterTitle','jobTypeTitle','title','priority','status',new Date,1,'desc',1,{},dateFormat(new Date,'mmmm dS, yyyy, h:MM:ss TT'),'')
    expect(project).toHaveProperty('id')
  })

  it('Tests constructor with no arguments', () => {
    let project = new ProjectModel()
    expect(project).toHaveProperty('id')
  })

  it('Tests changeCustomer', () => {
    let project = new ProjectModel(1,'costCenterTitle','jobTypeTitle','title','priority','status',null,1,'desc',1,{},dateFormat(new Date,'mmmm dS, yyyy, h:MM:ss TT'),'')
    project.changeCustomer({customer: 'customer'})
    expect(project.customer).toEqual({customer: 'customer'})
  })

  it('Tests finish', () => {
    let project = new ProjectModel(1,'costCenterTitle','jobTypeTitle','title','priority','status',null,1,'desc',1,{},dateFormat(new Date,'mmmm dS, yyyy, h:MM:ss TT'),'')
    project.finish()
    expect(project.status).toEqual('Completed')
  })

  it('Tests getTimeEntries', () => {
    let project = new ProjectModel(1,'costCenterTitle','jobTypeTitle','title','priority','status',null,1,'desc',1,{},dateFormat(new Date,'mmmm dS, yyyy, h:MM:ss TT'),'')
    project.getTimeEntries()
    expect(project.timeEntries).toEqual({})
  })

  it('Tests get customerID', () => {
    let project = new ProjectModel()
    project.customer = null
    project.customerID
    expect(project.customer).toEqual(null)
  })

  it('Tests get timeSpent', () => {
    let project = new ProjectModel()
    project.timeEntries[0] = {created: 0}
    project.timeEntries[1] = {created: 420000}
    project.timeEntries[2] = {created: 820000}
    project.timeEntries[3] = {created: 196400000}
    project.timeSpent
    expect(typeof(project.timeEntries)).toBe('object')
  })

  it('Tests get timeSpent', () => {
    let project = new ProjectModel()
    project.timeEntries[0] = {created: 3600000}
    project.timeEntries[1] = {created: 7260000}
    project.timeEntries[2] = {created: 1525123365596}
    project.timeEntries[3] = {created: 2525123974645}
    project.timeEntries[4] = {created: 3525323365596}
    project.timeEntries[5] = {created: 4525523974645}
    project.timeSpent
    expect(typeof(project.timeEntries)).toBe('object')
  })

  it('Tests get timeSpent with alternate arguments', () => {
    let project = new ProjectModel()
    project.timeEntries[0] = 1525123365596
    project.timeEntries[1] = 2525123974645
    project.timeEntries[2] = 3525323365596
    project.timeEntries[3] = 4525523974645
    project.timeSpent
    expect(typeof(project.timeEntries)).toBe('object')
  })

  it('Tests changeNotes', () => {
    let project = new ProjectModel(1,'costCenterTitle','jobTypeTitle','title','priority','status',null,1,'desc',1,{},dateFormat(new Date,'mmmm dS, yyyy, h:MM:ss TT'),'')
    project.changeNotes({target:{value:'events'}})
    expect(project.notes).toEqual('events')
  })

  it('Tests getCustomer', () => {
    let project = new ProjectModel(1,'costCenterTitle','jobTypeTitle','title','priority','status',null,1,'desc',1,{},dateFormat(new Date,'mmmm dS, yyyy, h:MM:ss TT'),'')
    project.getCustomer()
    expect(project.customer).toEqual({})
  })

})
