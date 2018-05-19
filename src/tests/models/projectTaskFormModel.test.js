import ProjectTaskFormModel from '../../models/projectTaskFormModel'

jest.mock('../../store/website', () => {
  return {
    currentProject: {
      id: 1
    }
  }
})
jest.mock('../../api', () => {
  return {
    createTask: jest.fn().mockReturnValueOnce(Promise.resolve(null)).mockReturnValueOnce(Promise.resolve('Error'))
  }
})

describe('ProjectTaskFormModel', () => {
  it ('Tests constructor', () => {
    let projectTaskFormModel = new ProjectTaskFormModel(jest.fn(), jest.fn(), jest.fn(), jest.fn())
    expect(projectTaskFormModel).toHaveProperty('onClickNav')
  })
  it ('Tests resetFields', () => {
    let projectTaskFormModel = new ProjectTaskFormModel(jest.fn(), jest.fn(), jest.fn(), jest.fn())
    projectTaskFormModel.fields = []
    expect(projectTaskFormModel.fields.length).toBe(0)
    projectTaskFormModel.resetFields()
    expect(projectTaskFormModel.fields.length).toBe(7)
  })
  it ('Tests primaryButton onClick (null response)', async function() {
    let projectTaskFormModel = new ProjectTaskFormModel(jest.fn(), jest.fn(), jest.fn(), jest.fn())
    await projectTaskFormModel.primaryButton.onClick([
      {
        id: 'taskName',
        value: 'value'
      },
      {
        id: 'processArea',
        value: ''
      },
    ])
    expect(projectTaskFormModel.onClickNav.mock.calls.length).toBe(1)
    expect(projectTaskFormModel.errorResponse).toBe('')
    expect(projectTaskFormModel.modalOpen).toBe(false)
  })
  it ('Tests primaryButton onClick (null response)', async function() {
    let projectTaskFormModel = new ProjectTaskFormModel(jest.fn(), jest.fn(), jest.fn(), jest.fn())
    await projectTaskFormModel.primaryButton.onClick([
      {
        id: 'taskName',
        value: 'value'
      },
      {
        id: 'processArea',
        value: 'value'
      },
    ])
    expect(projectTaskFormModel.onClickNav.mock.calls.length).toBe(0)
    expect(projectTaskFormModel.errorResponse).toBe('Error')
    expect(projectTaskFormModel.modalOpen).toBe(true)
  })
})
