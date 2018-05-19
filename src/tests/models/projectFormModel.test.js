import ProjectFormModel from '../../models/projectFormModel'

jest.mock('../../store/website', () => {
  return {
    setProject: jest.fn(),
    updateProject: jest.fn().mockReturnValueOnce(Promise.resolve(null)).mockReturnValueOnce(Promise.resolve('response')),
    createProject: jest.fn().mockReturnValueOnce(Promise.resolve(null)).mockReturnValueOnce(Promise.resolve('response')),
    currentProject: {
      jobTypeTitle: 'jobTypeTitle',
      costCenterTitle: 'costCenterTitle',
      title: 'title',
      descr: 'descr',
      priority: 'priority',
      partCount: null,
    }
  }
})

describe('ProjectFormModel', () => {
  it ('Tests constructor', () => {
    let projectFormModel = new ProjectFormModel(jest.fn(), jest.fn(), jest.fn(), jest.fn())
    expect(projectFormModel).toHaveProperty('onClickNav')
  })
  it ('Tests setNonEdit', async function() {
    let projectFormModel = new ProjectFormModel(jest.fn(), jest.fn(), jest.fn(), jest.fn())
    projectFormModel.primaryButton.onClick = null
    projectFormModel.setNonEdit()
    expect(typeof projectFormModel.primaryButton.onClick).toBe('function')
    await projectFormModel.primaryButton.onClick([
      {
        id: 'jobTypeTitle',
        value: 'value'
      },
      {
        id: 'costCenterTitle',
        value: 'value'
      },
      {
        id: 'title',
        value: 'value'
      },
      {
        id: 'descr',
        value: 'value'
      },
      {
        id: 'priority',
        value: 'value'
      },
      {
        id: 'partCount',
        value: 'value'
      },
      {
        id: 'refNum',
        value: 'value'
      }
    ])
    expect(projectFormModel.onClickNav.mock.calls.length).toBe(1)
    expect(projectFormModel.errorResponse).toBe('')
    expect(projectFormModel.modalOpen).toBe(false)
  })
  it ('Tests setNonEdit else block from newButton', async function() {
    let projectFormModel = new ProjectFormModel(jest.fn(), jest.fn(), jest.fn(), jest.fn())
    projectFormModel.primaryButton.onClick = null
    projectFormModel.setNonEdit()
    expect(typeof projectFormModel.primaryButton.onClick).toBe('function')
    await projectFormModel.primaryButton.onClick([
      {
        id: 'jobTypeTitle',
        value: 'value'
      },
      {
        id: 'costCenterTitle',
        value: 'value'
      },
      {
        id: 'title',
        value: 'value'
      },
      {
        id: 'descr',
        value: 'value'
      },
      {
        id: 'priority',
        value: 'value'
      },
      {
        id: 'partCount',
        value: 'value'
      },
      {
        id: 'refNum',
        value: 'value'
      }
    ])
    expect(projectFormModel.onClickNav.mock.calls.length).toBe(0)
    expect(projectFormModel.errorResponse).toBe('response')
    expect(projectFormModel.modalOpen).toBe(true)
  })
  it ('Tests setNonEdit with costCenterTitle: APC', async function() {
    let projectFormModel = new ProjectFormModel(jest.fn(), jest.fn(), jest.fn(), jest.fn())
    projectFormModel.primaryButton.onClick = null
    projectFormModel.setNonEdit()
    expect(projectFormModel.buttonDisabled).toBe(true)
    expect(typeof projectFormModel.primaryButton.onClick).toBe('function')
    await projectFormModel.primaryButton.onClick([
      {
        id: 'jobTypeTitle',
        value: 'value'
      },
      {
        id: 'costCenterTitle',
        value: 'APC'
      },
      {
        id: 'title',
        value: 'value'
      },
      {
        id: 'descr',
        value: 'value'
      },
      {
        id: 'priority',
        value: 'value'
      },
      {
        id: 'partCount',
        value: 'value'
      },
      {
        id: 'refNum',
        value: 'value'
      }
    ])
  })
  it ('Tests setEdit', async function() {
    let projectFormModel = new ProjectFormModel(jest.fn(), jest.fn(), jest.fn(), jest.fn())
    projectFormModel.primaryButton.onClick = null
    projectFormModel.setEdit()
    expect(typeof projectFormModel.primaryButton.onClick).toBe('function')
    await projectFormModel.primaryButton.onClick([
      {
        id: 'jobTypeTitle',
        value: 'value'
      },
      {
        id: 'costCenterTitle',
        value: 'value'
      },
      {
        id: 'title',
        value: 'value'
      },
      {
        id: 'descr',
        value: 'value'
      },
      {
        id: 'priority',
        value: 'value'
      },
      {
        id: 'partCount',
        value: 'value'
      },
      {
        id: 'refNum',
        value: 'value'
      }
    ])
    expect(projectFormModel.onClickNav.mock.calls.length).toBe(1)
    expect(projectFormModel.errorResponse).toBe('')
    expect(projectFormModel.modalOpen).toBe(false)
    projectFormModel.resetValues()
  })
  it ('Tests setEdit else block from editButton', async function() {
    let projectFormModel = new ProjectFormModel(jest.fn(), jest.fn(), jest.fn(), jest.fn())
    projectFormModel.primaryButton.onClick = null
    projectFormModel.setEdit()
    expect(typeof projectFormModel.primaryButton.onClick).toBe('function')
    await projectFormModel.primaryButton.onClick([
      {
        id: 'jobTypeTitle',
        value: 'value'
      },
      {
        id: 'costCenterTitle',
        value: 'value'
      },
      {
        id: 'title',
        value: 'value'
      },
      {
        id: 'descr',
        value: 'value'
      },
      {
        id: 'priority',
        value: 'value'
      },
      {
        id: 'partCount',
        value: 'value'
      },
      {
        id: 'refNum',
        value: 'value'
      }
    ])
    expect(projectFormModel.onClickNav.mock.calls.length).toBe(0)
    expect(projectFormModel.errorResponse).toBe('response')
    expect(projectFormModel.modalOpen).toBe(true)
  })
  it ('Tests editSecondaryButton', () => {
    let projectFormModel = new ProjectFormModel(jest.fn(), jest.fn(), jest.fn(), jest.fn())
    projectFormModel.editSecondaryButton()
    expect(projectFormModel).toHaveProperty('onCancelNav')
  })
})
