import UserModel from '../../models/userModel'

jest.mock('../../api', () => {
  return {
    updateUserAdmin: jest.fn()
  }
})
jest.mock('../../store/page', () => {
  return {
    accountManagementMenuItem: jest.fn(),
  }
})

describe('UserModel', () => {
  it('Tests constructor', () => {
    let user = new UserModel(1,'username',1,true)
    expect(user).toHaveProperty('admin')
  })

  it('Tests constructor with alternate arguements', () => {
    let user = new UserModel(1,'username',1,false)
    expect(user).toHaveProperty('admin')
  })

  it('Tests toggleAdmin', () => {
    let user = new UserModel(1,'username',1,true)
    expect(user.admin).toBe(true)
    user.toggleAdmin()
    expect(user.admin).toBe(false)
  })

})
