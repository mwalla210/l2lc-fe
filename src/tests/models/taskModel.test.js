import TaskModel from '../../models/taskModel'

jest.mock('../../store/website', () => {
  return {
    currentProject: {
      timeEntries: []
    }
  }
})


describe('TaskModel', () => {
  it('Tests constructor', () => {
    let task = new TaskModel('title','processArea')
    expect(task).toHaveProperty('title')
  })
  xit('Tests toggle', () => {
    let task = new TaskModel(1,'username',1,false)
    task.toggleRequired()
  })
})
