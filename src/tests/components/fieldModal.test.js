import React from 'react'
import renderer from 'react-test-renderer'
import FieldModal from '../../components/fieldModal'
jest.mock('reactstrap', () => ({
  Modal: 'Modal',
  ModalBody: 'ModalBody',
  ModalHeader: 'ModalHeader',
  ModalFooter: 'ModalFooter',
}))
jest.mock('../../components/buttonPrimary')
jest.mock('../../components/buttonDefault')

const defaultOptions = {
  title: 'title',
  submitButton: {
    title: 'title',
    onClick: jest.fn()
  },
  open: false,
  closeFn: jest.fn(),
  onChangeFn: jest.fn(),
  contents: 'contents'
}

describe('FieldModal', () => {
  it ('Renders with snapshot', () => {
    let options = Object.assign({}, defaultOptions)
    const component = renderer.create(
      <FieldModal {...options}/>,
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it ('Renders with snapshot (open: true)', () => {
    let options = Object.assign({}, defaultOptions)
    options.open = true
    const component = renderer.create(
      <FieldModal {...options}/>,
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it ('Renders with snapshot (title: null)', () => {
    let options = Object.assign({}, defaultOptions)
    options.submitButton.title = null
    const component = renderer.create(
      <FieldModal {...options}/>,
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('Renders and calls hide function', () => {
    let options = Object.assign({}, defaultOptions)
    const component = renderer.create(
      <FieldModal {...options}/>,
    )
    const inst = component.getInstance()
    expect(inst.props.closeFn.mock.calls.length).toBe(0)
    inst.hide()
    expect(inst.props.closeFn.mock.calls.length).toBe(1)
  })
  it('Renders and calls onChange function', () => {
    let options = Object.assign({}, defaultOptions)
    const component = renderer.create(
      <FieldModal {...options}/>,
    )
    const inst = component.getInstance()
    expect(inst.props.onChangeFn.mock.calls.length).toBe(0)
    inst.onChange({target:{value:1}})
    expect(inst.props.onChangeFn.mock.calls.length).toBe(1)
    expect(inst.props.onChangeFn.mock.calls[0][0]).toBe(1)
   })
})
