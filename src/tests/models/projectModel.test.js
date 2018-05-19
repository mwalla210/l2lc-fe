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

  it('Tests get timeSpent (over an hour)', () => {
    let project = new ProjectModel()
    project.timeEntries[0] = {created: new Date('December 17, 1995 03:14:00')}
    project.timeEntries[1] = {created: new Date('December 17, 1995 03:54:00')}
    project.timeEntries[2] = {created: new Date('December 18, 1995 03:14:00')}
    project.timeEntries[3] = {created: new Date('December 18, 1995 04:54:00')}
    expect(project.timeSpent).toBe('2 hours, 20 minutes')
  })
  it('Tests get timeSpent (an hour)', () => {
    let project = new ProjectModel()
    project.timeEntries[0] = {created: new Date('December 17, 1995 03:14:00')}
    project.timeEntries[1] = {created: new Date('December 17, 1995 04:14:00')}
    expect(project.timeSpent).toBe('1 hour')
  })
  it('Tests get timeSpent (one minute)', () => {
    let project = new ProjectModel()
    project.timeEntries[0] = {created: new Date('December 17, 1995 03:14:00')}
    project.timeEntries[1] = {created: new Date('December 17, 1995 03:15:00')}
    expect(project.timeSpent).toBe('1 minute')
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
