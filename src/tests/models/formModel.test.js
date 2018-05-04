import FormModel from '../../models/formModel'

describe('FormModel', () => {
  it ('Tests constructor', () => {
    let formModel = new FormModel([], {}, {}, true, jest.fn(), jest.fn())
    formModel.confirmAndClose()
    expect(typeof formModel.setError).toBe('function')
    })
  it ('Tests constructor', () => {
    let formModel = new FormModel([], {}, {}, true, jest.fn())
    formModel.confirmAndClose()
  })
})
