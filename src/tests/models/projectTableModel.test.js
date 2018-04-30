import ProjectTableModel from '../../models/projectTableModel'
jest.mock('../../components/tableActionCell')
jest.mock('../../components/projectStatusCell')
jest.mock('../../components/projectStatusFilter')

jest.mock('../../api', () => {
  return {
    fetchProjects: jest.fn()
    // getJSON: (edp) => {
    //   if (edp == '/invites')
    //     return Promise.resolve({
    //       events: {}
    //     })
    //   else if (edp == '/users')
    //     return Promise.resolve({})
    //   else if (edp == '/badges')
    //     return Promise.resolve([])
    //   else if (edp == '/connections')
    //     return Promise.resolve({user_two: {}, user_id: {}})
    // },
  }
})
jest.mock('../../store/website', () => {
  return {
    // isPrimary: () => true,
    // connectionStatus: () => {},
  }
})
// import Website from '../../store/website'

describe('ProjectTableModel', () => {
  it('Tests constructor', () => {
    let project = new ProjectTableModel(jest.fn(),jest.fn(),jest.fn())
    expect(project).toHaveProperty('columns')
    // ...
  })
})
