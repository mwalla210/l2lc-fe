import UserModel from '../../models/userModel'


jest.mock('../../api', () => {
  return {}
})


describe('UserModel', () => {
  it('Tests constructor', () => {
    let user = new UserModel(1,'username',1,false)
    expect(user).toHaveProperty('id')
  })

  it('Tests constructor with admin', () => {
    let user = new UserModel(1,'username',1,true)
    expect(user).toHaveProperty('id')
  })

  it('Tests toggleAdmin', () => {
    let user = new UserModel(1,'username',1,false)
    user.toggleAdmin()
  })

  it('Tests changePassword', () => {
    let user = new UserModel(1,'username',1,false)
    user.changePassword('newPassword')
  })

})
