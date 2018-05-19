import TaskModel from '../../models/taskModel'

jest.mock('../../store/website', () => {
  return {
    currentProject: {
      timeEntries: []
    }
  }
})
jest.mock('../../api', () => {
  return {
    updateTask: jest.fn().mockReturnValueOnce(Promise.resolve(null))
  }
})

describe('TaskModel', () => {
  it('Tests constructor', () => {
    let task = new TaskModel(true, 'title','processArea')
    expect(task).toHaveProperty('title')
  })
  it('Tests toggleRequired', () => {
    let task = new TaskModel(true, 'title','processArea')
    task.toggleRequired()
  })
})
