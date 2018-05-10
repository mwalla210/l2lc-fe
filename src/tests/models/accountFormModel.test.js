import AccountFormModel from '../../models/accountFormModel'

jest.mock('../../store/website', () => {
  return {
    createAccount: jest.fn().mockReturnValueOnce(Promise.resolve(null)).mockReturnValueOnce(Promise.resolve('response')),
  }
})

describe('AccountFormModel', () => {
  it ('Tests constructor', () => {
    let accountFormModel = new AccountFormModel(jest.fn(), jest.fn(), jest.fn())
    expect(accountFormModel).toHaveProperty('onClickNav')
  })
  it ('Tests primaryButton.onClick (null response)', async function() {
    let accountFormModel = new AccountFormModel(jest.fn(), jest.fn(), jest.fn())
    await accountFormModel.primaryButton.onClick([
      {
        id: 'id',
        value: 'value'
      }
    ])
  })
  it ('Tests primaryButton.onClick (value response)', async function() {
    let accountFormModel = new AccountFormModel(jest.fn(), jest.fn(), jest.fn())
    await accountFormModel.primaryButton.onClick([
      {
        id: 'id',
        value: 'value'
      }
    ])
  })
  it ('Tests resetFields', () => {
    let accountFormModel = new AccountFormModel(jest.fn(), jest.fn(), jest.fn())
    accountFormModel.resetFields()
  })
})
