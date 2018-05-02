import ProjectModel from '../../models/projectModel'

jest.mock('../../api', () => {
  return {
    fetchProjects: jest.fn()
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

  it('Tests constructor with no arguements', () => {
    let project = new ProjectModel()
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

  it('Tests get customerID', () => {
    let project = new ProjectModel()
    project.customer = null
    project.customerID
    expect(project.customer).toEqual(null)
  })

  it('Tests get timeSpent', () => {
    let project = new ProjectModel()
    project.timeEntries[0] = 1525123365596
    project.timeEntries[1] = 1525123374645
    project.timeSpent
  })

  it('Tests get timeSpent', () => {
    let project = new ProjectModel()
    project.timeEntries[0] = 3600000
    project.timeEntries[1] = 7260000
    project.timeSpent
  })

  it('Tests get timeSpent with alternate arguements', () => {
    let project = new ProjectModel()
    project.timeEntries[0] = 1525123365596
    project.timeEntries[1] = 2525123974645
    project.timeEntries[2] = 3525323365596
    project.timeEntries[3] = 4525523974645
    project.timeSpent
  })

  it('Tests toggleTask', () => {
    let project = new ProjectModel()
    project.toggleTask()
  })
  it('Tests addTask', () => {
    let project = new ProjectModel()
      project.addTask()
  })
  it('Tests removeTask', () => {
    let project = new ProjectModel()
      project.removeTask()
  })
})
