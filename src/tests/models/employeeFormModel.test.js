import EmployeeFormModel from '../../models/employeeFormModel'

jest.mock('../../store/website', () => {
  return {
    updateEmployee: jest.fn().mockReturnValueOnce(Promise.resolve(null)).mockReturnValueOnce(Promise.resolve('response')),
    createEmployee: jest.fn().mockReturnValueOnce(Promise.resolve(null)).mockReturnValueOnce(Promise.resolve('response')),
    currentEmployee: jest.fn()
  }
})

describe('EmployeeFormModel', () => {
  it ('Tests constructor', () => {
    let employeeFormModel = new EmployeeFormModel(jest.fn(), jest.fn(), jest.fn())
    expect(employeeFormModel).toHaveProperty('onClickNav')
  })
  it ('Tests setNonEdit', async function() {
    let employeeFormModel = new EmployeeFormModel(jest.fn(), jest.fn(), jest.fn())
    employeeFormModel.primaryButton.onClick = null
    employeeFormModel.setNonEdit()
    expect(typeof employeeFormModel.primaryButton.onClick).toBe('function')
    await employeeFormModel.primaryButtonWrapper()
    expect(employeeFormModel.onClickNav.mock.calls.length).toBe(1)
    expect(employeeFormModel.errorResponse).toBe('')
    expect(employeeFormModel.modalOpen).toBe(false)
  })
  it ('Tests setNonEdit else block from newButton', async function() {
    let employeeFormModel = new EmployeeFormModel(jest.fn(), jest.fn(), jest.fn())
    employeeFormModel.primaryButton.onClick = null
    employeeFormModel.setNonEdit()
    expect(typeof employeeFormModel.primaryButton.onClick).toBe('function')
    await employeeFormModel.primaryButton.onClick([
      {
        id: 'id',
        value: 'value'
      }
    ])
    expect(employeeFormModel.onClickNav.mock.calls.length).toBe(0)
    expect(employeeFormModel.errorResponse).toBe('response')
    expect(employeeFormModel.modalOpen).toBe(true)
  })
  it ('Tests setEdit', async function() {
    let employeeFormModel = new EmployeeFormModel(jest.fn(), jest.fn(), jest.fn())
    employeeFormModel.primaryButton.onClick = null
    employeeFormModel.setEdit()
    expect(typeof employeeFormModel.primaryButton.onClick).toBe('function')
    await employeeFormModel.primaryButton.onClick([
      {
        id: 'id',
        value: 'value'
      }
    ])
    expect(employeeFormModel.onClickNav.mock.calls.length).toBe(1)
    expect(employeeFormModel.errorResponse).toBe('')
    expect(employeeFormModel.modalOpen).toBe(false)
  })
  it ('Tests setEdit else block from editButton', async function() {
    let employeeFormModel = new EmployeeFormModel(jest.fn(), jest.fn(), jest.fn())
    employeeFormModel.primaryButton.onClick = null
    employeeFormModel.setEdit()
    expect(typeof employeeFormModel.primaryButton.onClick).toBe('function')
    await employeeFormModel.primaryButton.onClick([
      {
        id: 'id',
        value: 'value'
      }
    ])
    expect(employeeFormModel.onClickNav.mock.calls.length).toBe(0)
    expect(employeeFormModel.errorResponse).toBe('response')
    expect(employeeFormModel.modalOpen).toBe(true)
  })
})
