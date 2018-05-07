import AccountFormModel from '../../models/accountFormModel'

jest.mock('../../store/website', () => {
  return {
    updateEmployee: jest.fn().mockReturnValueOnce(Promise.resolve(null)).mockReturnValueOnce(Promise.resolve('response')),
    createEmployee: jest.fn().mockReturnValueOnce(Promise.resolve(null)).mockReturnValueOnce(Promise.resolve('response')),
    currentEmployee: jest.fn(),
    createAccount: jest.fn().mockReturnValueOnce(Promise.resolve(null)).mockReturnValueOnce(Promise.resolve('response')),
  }
})

describe('EmployeeFormModel', () => {
  it ('Tests constructor', () => {
    let accountFormModel = new AccountFormModel(jest.fn(), jest.fn(), jest.fn())
    accountFormModel.primaryOnClick = jest.fn().mockReturnValueOnce(Promise.resolve({}))
    expect(accountFormModel).toHaveProperty('onClickNav')
  })

  it ('Tests resetFields', () => {
    let accountFormModel = new AccountFormModel(jest.fn(), jest.fn(), jest.fn())
    expect(accountFormModel).toHaveProperty('onClickNav')
    accountFormModel.resetFields()
  })

  it ('Tests editButton', () => {
    let accountFormModel = new AccountFormModel(jest.fn(), jest.fn(), jest.fn())
    accountFormModel.editButton()
    //accountFormModel.editButton().mockReturnValueOnce(Promise.resolve('return'))
  })

  it ('Tests newButton', () => {
    let accountFormModel = new AccountFormModel(jest.fn(), jest.fn(), jest.fn())
    accountFormModel.newButton()
    //expect(accountFormModel.onClickNav.mock.calls.length).toBe(1)
  })

  it ('Tests setEdit', () => {
    let accountFormModel = new AccountFormModel(jest.fn(), jest.fn(), jest.fn())
    accountFormModel.setEdit()
    expect(typeof(accountFormModel.primaryButton.onClick)).toBe(typeof(accountFormModel.editButton))
    //console.log(typeof(accountFormModel.resetFields.mock))
  })

  it ('Tests setNonEdit', async function() {
    let accountFormModel = new AccountFormModel(jest.fn(), jest.fn(), jest.fn())
    accountFormModel.primaryButton.onClick = null
    accountFormModel.setEdit()
    expect(typeof accountFormModel.primaryButton.onClick).toBe('function')
    await accountFormModel.primaryButton.onClick([
      {
        id: 'username',
        value: 'username',
      },
      {
        id: 'password',
        value: 'password'
      },
      {
        id: 'admin',
        value: true
      },
    ])
  })

  it ('Tests setNonEdit', async function() {
    let accountFormModel = new AccountFormModel(jest.fn(), jest.fn(), jest.fn())
    accountFormModel.primaryButton.onClick = null
    accountFormModel.setNonEdit()
    expect(typeof accountFormModel.primaryButton.onClick).toBe('function')
    await accountFormModel.primaryButton.onClick([
      {
        id: 'username',
        value: 'username',
      },
      {
        id: 'password',
        value: 'password'
      },
      {
        id: 'admin',
        value: true
      },
    ])
    expect(accountFormModel.onClickNav.mock.calls.length).toBe(1)
    expect(accountFormModel.errorResponse).toBe('')
    expect(accountFormModel.modalOpen).toBe(false)
  })

  it ('Tests setNonEdit, alternate arguements', async function() {
    let accountFormModel = new AccountFormModel(jest.fn(), jest.fn(), jest.fn())
    accountFormModel.primaryButton.onClick = null
    accountFormModel.setNonEdit()
    expect(typeof accountFormModel.primaryButton.onClick).toBe('function')
    await accountFormModel.primaryButton.onClick([
      {
        id: 'username',
        value: 'username',
      },
      {
        id: 'password',
        value: 'password'
      },
      {
        id: 'admin',
        value: true
      },
    ])
    expect(accountFormModel.onClickNav.mock.calls.length).toBe(0)
    expect(accountFormModel.errorResponse).toBe('response')
    expect(accountFormModel.modalOpen).toBe(true)
  })
})
