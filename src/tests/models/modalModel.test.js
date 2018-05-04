import ModalModel from '../../models/modalModel'


describe('ModalModel', () => {
  it ('Tests constructor', () => {
    let modal = new ModalModel(jest.fn(), 'title')
    expect(modal).toHaveProperty('title')
  })
  it ('Tests closeModal', () => {
    let modal = new ModalModel(jest.fn(), 'title')
    modal.closeModal()
    expect(modal.modalOpen).toBe(false)
  })
  it ('Tests openModal', () => {
    let modal = new ModalModel(jest.fn(), 'title')
    modal.openModal()
    expect(modal.modalOpen).toBe(true)
  })
  it ('Tests confirmAndClose', () => {
    let modal = new ModalModel(jest.fn(), 'title')
    modal.confirmAndClose()
    expect(modal.modalOpen).toBe(false)
    expect(modal.confirmOnClick.mock.calls.length).toBe(1)
  })
  it ('Tests changeTitle', () => {
    let modal = new ModalModel(jest.fn(), 'title')
    modal.changeTitle('new')
    expect(modal.title).toEqual('new')
  })
  it ('Tests changeContent', () => {
    let modal = new ModalModel(jest.fn(), 'title')
    modal.changeContent('new')
    expect(modal.contents).toEqual('new')
  })
  it ('Tests changeConfirmFn', () => {
    let modal = new ModalModel(jest.fn(), 'title')
    modal.changeConfirmFn('confirm')
    expect(modal.confirmOnClick).toEqual('confirm')
  })
})
