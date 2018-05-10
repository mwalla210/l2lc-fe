import ProjectModel from '../../models/projectModel'

jest.mock('../../api', () => {
  return {
    fetchProjects: jest.fn(),
    fetchTimeEntries: jest.fn().mockReturnValue(Promise.resolve('res')),
  }
})
jest.mock('../../store/website', () => {
  return {
    setProject: jest.fn(),
  }
})

describe('ProjectModel', () => {
  it('Tests constructor', () => {
    let project = new ProjectModel(1,'costCenterTitle','jobTypeTitle','title','priority','status',Date,1,'desc',1,{},Date)
    expect(project).toHaveProperty('id')
  })

  it('Tests constructor with no arguments', () => {
    new ProjectModel()
  })

  it('Tests changeCustomer', () => {
    let project = new ProjectModel(1,'costCenterTitle','jobTypeTitle','title','priority','status',Date,1,'desc',1,{},Date)
    project.changeCustomer({customer: 'customer'})
    expect(project.customer).toEqual({customer: 'customer'})
  })

  it('Tests finish', () => {
    let project = new ProjectModel(1,'costCenterTitle','jobTypeTitle','title','priority','status',Date,1,'desc',1,{},Date)
    project.finish()
    expect(project.status).toEqual('Completed')
  })

  it('Tests getTimeEntries', () => {
    let project = new ProjectModel(1,'costCenterTitle','jobTypeTitle','title','priority','status',Date,1,'desc',1,{},Date)
    project.getTimeEntries()
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
  })

  xit('Tests get timeSpent', () => {
    let project = new ProjectModel()
    project.timeEntries[0] = {created: 3600000}
    project.timeEntries[1] = {created: 7260000}
    project.timeEntries[0] = {created: 1525123365596}
    project.timeEntries[1] = {created: 2525123974645}
    project.timeEntries[2] = {created: 3525323365596}
    project.timeEntries[3] = {created: 4525523974645}
    project.timeSpent
  })

  xit('Tests get timeSpent with alternate arguments', () => {
    let project = new ProjectModel()
    project.timeEntries[0] = 1525123365596
    project.timeEntries[1] = 2525123974645
    project.timeEntries[2] = 3525323365596
    project.timeEntries[3] = 4525523974645
    project.timeSpent
  })

})
