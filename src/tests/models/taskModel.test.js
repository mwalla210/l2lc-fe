import TaskModel from '../../models/taskModel'

jest.mock('../../store/website', () => {
  return {
    currentProject: {
      timeEntries: []
    }
  }
})
import Website from '../../store/website'
jest.mock('../../api', () => {
  return {
    updateTask: jest.fn().mockReturnValueOnce(Promise.resolve(null))
  }
})

describe('TaskModel', () => {
  it('Tests constructor', () => {
    let task = new TaskModel(true, 'title','processArea')
    expect(task).toHaveProperty('title')
    expect(task.status).toBe('Not Started')
  })
  it('Tests toggleRequired', () => {
    let task = new TaskModel(true, 'title','processArea')
    task.toggleRequired()
  })
  it('Tests status (one entry)', () => {
    Website.currentProject.timeEntries = [
      {
        station: 'processArea'
      },
      {
        station: 'notProcessArea'
      }
    ]
    let task = new TaskModel(true, 'title','processArea')
    expect(Website.currentProject.timeEntries.length).toBe(2)
    expect(task.status).toBe('At Station')
  })
  it('Tests status (two entries)', () => {
    Website.currentProject.timeEntries = [
      {
        station: 'processArea'
      },
      {
        station: 'processArea'
      },
    ]
    let task = new TaskModel(true, 'title','processArea')
    expect(Website.currentProject.timeEntries.length).toBe(2)
    expect(task.status).toBe('Not At Station')
  })
})
