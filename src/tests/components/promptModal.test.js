import React from 'react'
import renderer from 'react-test-renderer'
import PromptModal from '../../components/promptModal'
jest.mock('reactstrap', () => ({
  Modal: 'Modal',
  ModalBody: 'ModalBody',
  ModalHeader: 'ModalHeader',
  ModalFooter: 'ModalFooter',
}))
jest.mock('../../components/buttonDefault')

const defaultOptions = {
  closeFn: jest.fn(),
  denyOnClick: jest.fn(),
  confirmOnClick: jest.fn(),
  primaryButtonText: 'primaryButtonText',
  confirmClass: 'confirmClassName',
  headerClass: 'headerClassName',
  titleClass: 'titleClassName',
  titleImage: 'imageFilePath',
  open: true,
  title: 'title',
  content: 'content',
  }

  const alternateOptions = {
    closeFn: jest.fn(),
    confirmOnClick: jest.fn(),
    primaryButtonText: null,
    open: true,
    title: 'title',
    content: 'content',
    }

describe('PromptModal', () => {
  it ('Renders with snapshot', () => {
    let options = Object.assign({}, defaultOptions)
    const component = renderer.create(
      <PromptModal {...options}/>,
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it ('Renders with snapshot, alternate arguements', () => {
    let options = Object.assign({}, alternateOptions)
    const component = renderer.create(
      <PromptModal {...options}/>,
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('Renders and calls hide', () => {
    let options = Object.assign({}, defaultOptions)
    const component = renderer.create(
      <PromptModal {...options}/>,
    )
    const inst = component.getInstance()

    expect(inst.props.closeFn.mock.calls.length).toBe(0)
    inst.hide()
    expect(inst.props.closeFn.mock.calls.length).toBe(1)
  })

  it('Renders and calls deny', () => {
    let options = Object.assign({}, defaultOptions)
    const component = renderer.create(
      <PromptModal {...options}/>,
    )
    const inst = component.getInstance()

    expect(inst.props.denyOnClick.mock.calls.length).toBe(0)
    inst.deny()
    expect(inst.props.denyOnClick.mock.calls.length).toBe(1)
  })

  it('Renders and calls confirm', () => {
    let options = Object.assign({}, defaultOptions)
    const component = renderer.create(
      <PromptModal {...options}/>,
    )
    const inst = component.getInstance()

    expect(inst.props.confirmOnClick.mock.calls.length).toBe(0)
    inst.confirm()
    expect(inst.props.confirmOnClick.mock.calls.length).toBe(1)
  })

})
