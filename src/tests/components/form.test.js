import React from 'react'
import renderer from 'react-test-renderer'
import Form from '../../components/form'
jest.mock('reactstrap', () => ({
  ButtonToolbar: 'ButtonToolbar',
  ButtonGroup: 'ButtonGroup',
}))
jest.mock('../../components/selectField')
jest.mock('../../components/textField')
jest.mock('../../components/textAreaField')
jest.mock('../../components/checkboxField')
jest.mock('../../components/formItem')
jest.mock('../../components/promptModal')
jest.mock('../../components/buttonPrimary')
jest.mock('../../components/buttonDefault')

const defaultOptions = {
  page: {
    formModel: {
      fields: {
        map: jest.fn()
      },
      modalOpen: false,
      errorResponse: '',
      confirmAndClose: jest.fn(),
      openModal: jest.fn(),
      closeModal: jest.fn(),
      setError: jest.fn(),
      resetValues: jest.fn(),
      resetValueID: jest.fn(),
      resetValueIndex: jest.fn(),
      primaryButtonWrapper: jest.fn(),
      primaryButton: {
        onClick: jest.fn(),
        title: 'primaryButton'
      },
      secondaryButton: {
        onClick: jest.fn(),
        title: 'secondaryButton'
      },
      modifyFieldValue: jest.fn(),
      buttonDisabled:jest.fn(),
      fieldValidatorWrapper: jest.fn(),
    }
  },
  e: {
    preventDefault: jest.fn()
  },
  checkbox: false,
  index: 0,
  event: {
    preventDefault: jest.fn(),
    target:{
      value: 0,
      checked: 1,
    },
  },
}

describe('Form', () => {
  //Initial render test
  it ('Renders with snapshot', () => {
    let options = Object.assign({}, defaultOptions)
    const component = renderer.create(
      <Form {...options}/>,
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it ('Renders and calls primaryOnClick', () => {
    let options = Object.assign({}, defaultOptions)
    const component = renderer.create(
      <Form {...options}/>,
    )
    const inst = component.getInstance()

    expect(inst.props.page.formModel.primaryButtonWrapper.mock.calls.length).toBe(0)
    inst.primaryOnClick(inst.props.e)
    expect(inst.props.page.formModel.primaryButtonWrapper.mock.calls.length).toBe(1)
  })

  it ('Renders and calls secondaryOnClick', () => {
    let options = Object.assign({}, defaultOptions)
    const component = renderer.create(
      <Form {...options}/>,
    )
    const inst = component.getInstance()

    expect(inst.props.page.formModel.secondaryButton.onClick.mock.calls.length).toBe(0)
    inst.secondaryOnClick(inst.props.e)
    expect(inst.props.page.formModel.secondaryButton.onClick.mock.calls.length).toBe(1)
  })

//  it ('Renders and calls onChange', () => {
//    let options = Object.assign({}, defaultOptions)
//    const component = renderer.create(
//      <Form {...options}/>,
//    )
//    const inst = component.getInstance()
//
//    expect(inst.props.page.formModel.modifyFieldValue.mock.calls.length).toBe(0)
//    inst.onChange(inst.props.index, inst.props.checkbox)
//    expect(inst.props.page.formModel.modifyFieldValue.mock.calls.length).toBe(1)
//  })

//  it ('Renders and calls onBlur', () => {
//    let options = Object.assign({}, defaultOptions)
//    const component = renderer.create(
//      <Form {...options}/>,
//    )
//    const inst = component.getInstance()
//
//    expect(inst.props.page.formModel.fieldValidatorWrapper.mock.calls.length).toBe(0)
//    inst.onBlur(inst.props.event)
//    expect(inst.props.page.formModel.fieldValidatorWrapper.mock.calls.length).toBe(1)
//  })

})
