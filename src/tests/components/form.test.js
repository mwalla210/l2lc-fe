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
      fields:[
        {
          id: 1,
          disabled: true,
          value:'',
          type:'select',
          isValid: true,
          options:[],
          errorText: 'errortext',
          label: 'label',
          required: true
        },
        {
          id: 1,
          disabled: true,
          value:'',
          type:'textfield',
          isValid: true,
          errorText: 'errortext',
          label: 'label',
          required: true
        },
        {
          id: 1,
          disabled: true,
          value:'',
          type:'textarea',
          isValid: true,
          rows:10,
          errorText: 'errortext',
          label: 'label',
          required: true
        },
        {
          id: 1,
          disabled: true,
          value:'',
          type:'checkbox',
          isValid: true,
          errorText: 'errortext',
          label: 'label',
          required: true
        }
      ],
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

  it ('Renders and calls onChange', () => {
    let options = Object.assign({}, defaultOptions)
    const component = renderer.create(
      <Form {...options}/>,
    )
    const inst = component.getInstance()

    expect(inst.props.page.formModel.modifyFieldValue.mock.calls.length).toBe(0)
    let func = inst.onChange(1, true)
    console.log(func)
    func({preventDefault: jest.fn(),
        target:{
          value: 0,
          checked: 1,
        }
      })
    expect(inst.props.page.formModel.modifyFieldValue.mock.calls.length).toBe(1)
    expect(inst.props.page.formModel.modifyFieldValue.mock.calls[0][0]).toBe(1)
    expect(inst.props.page.formModel.modifyFieldValue.mock.calls[0][1]).toBe(1)
  })

  it ('Renders and calls onChange, alternate arguements', () => {
    let options = Object.assign({}, defaultOptions)
    options.page.formModel.modifyFieldValue = jest.fn()
    const component = renderer.create(
      <Form {...options}/>,
    )
    const inst = component.getInstance()

    expect(inst.props.page.formModel.modifyFieldValue.mock.calls.length).toBe(0)
    let func = inst.onChange(1)
    func({preventDefault: jest.fn(),
        target:{
          value: 0,
          checked: 1,
        }
      })
    expect(inst.props.page.formModel.modifyFieldValue.mock.calls.length).toBe(1)
    expect(inst.props.page.formModel.modifyFieldValue.mock.calls[0][0]).toBe(1)
    expect(inst.props.page.formModel.modifyFieldValue.mock.calls[0][1]).toBe(0)
  })

  it ('Renders and calls onBlur', () => {
    let options = Object.assign({}, defaultOptions)
    const component = renderer.create(
      <Form {...options}/>,
    )
    const inst = component.getInstance()

    expect(inst.props.page.formModel.fieldValidatorWrapper.mock.calls.length).toBe(0)
    let func = inst.onBlur(1)
    func({preventDefault: jest.fn()})
    expect(inst.props.page.formModel.fieldValidatorWrapper.mock.calls.length).toBe(1)
    expect(inst.props.page.formModel.fieldValidatorWrapper.mock.calls[0][0]).toBe(1)
  })

})
