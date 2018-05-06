import TaskModel from '../../models/taskModel'


jest.mock('../../api', () => {
  return {}
})


describe('TaskModel', () => {
  it('Tests constructor', () => {
    let task = new TaskModel('title','processArea')
    expect(task).toHaveProperty('title')
  })

  it('Tests toggle', () => {
    let task = new TaskModel(1,'username',1,false)
    task.toggleRequired()
  })
})
