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

})
