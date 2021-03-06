import FormModel from '../../models/formModel'

describe('FormModel', () => {
  it ('Tests constructor', () => {
    let formModel = new FormModel([{type: 'select', isValid: false},{type: 'textfield', isValid: true},{type: 'textarea'},{type: 'checkbox'}], {}, {}, true, jest.fn(), jest.fn())
    formModel.confirmAndClose()
    expect(typeof formModel.setError).toBe('function')
    })
  it ('Tests constructor', () => {
    let formModel = new FormModel([], {}, {}, true, jest.fn())
    formModel.confirmAndClose()
    expect(typeof formModel.setError).toBe('function')
  })

  it ('Tests modifyFieldValue', () => {
    let formModel = new FormModel([{type: 'select', isValid: false},{type: 'textfield', isValid: true},{type: 'textarea'},{type: 'checkbox'}], {}, {}, true, jest.fn().mockReturnValue('1'), jest.fn())
    formModel.modifyFieldValue('1','E12')
    expect(formModel.fields[1].isValid).toEqual(true)
  })

  it ('Tests modifyFieldValue alternate arguements', () => {
    let formModel = new FormModel([{type: 'select', isValid: false, value: 'value'},{type: 'select', isValid: false, value: 'value'}], {onClick: jest.fn()}, {}, true, jest.fn().mockReturnValue(null), jest.fn())
    formModel.modifyFieldValue('1','E12%')
    expect(formModel.fields[1].isValid).toEqual(true)
  })

  it ('Tests autoSubmitter', () => {
    let formModel = new FormModel([{type: 'select', isValid: false, value: 'value'},{type: 'select', isValid: false, value: 'value'}], {onClick: jest.fn()}, {}, true, jest.fn().mockReturnValue('1'), jest.fn())
    formModel.autoSubmitter()
    expect(formModel.fields[1].isValid).toEqual(true)
  })

  it ('Tests autoSubmitter alternate arguements', () => {
    let formModel = new FormModel([{type: 'select', isValid: false, value: 'value'},{type: 'select', isValid: false, value: 'value'}], {onClick: jest.fn()}, {}, true, jest.fn().mockReturnValue('1'), jest.fn())
    formModel.autoSubmit = false
    formModel.autoSubmitter()
    expect(formModel.fields[1].isValid).toEqual(true)
  })

  it ('Tests fieldValidatorWrapper', () => {
    let formModel = new FormModel([{type: 'select', isValid: false, value: 'value', validation: jest.fn().mockReturnValue(false)},{type: 'select', isValid: false, value: 'value', validation: jest.fn().mockReturnValue(false)}], {onClick: jest.fn()}, {}, true, jest.fn().mockReturnValue('1'), jest.fn())
    formModel.fieldValidatorWrapper('1')
      expect(formModel.fields[1].isValid).toEqual(true)
  })

  it ('Tests fieldValidatorWrapper alternate arguements', () => {
    let formModel = new FormModel([{type: 'select', isValid: false, value: 'value', validation: jest.fn().mockReturnValue(true)},{type: 'select', isValid: false, value: 'value', validation: jest.fn().mockReturnValue(true)}], {onClick: jest.fn()}, {}, true, jest.fn().mockReturnValue('1'), jest.fn())
    formModel.fieldValidatorWrapper('1')
      expect(formModel.fields[1].isValid).toEqual(false)
  })

  it ('Tests buttonDisabled', () => {
    let formModel = new FormModel([{type: 'textfield', isValid: false, value: '', validation: jest.fn().mockReturnValue(true)},{type: 'textarea', isValid: false, value: '', validation: jest.fn().mockReturnValue(true)},{type: 'textarea', isValid: false, value: 'value', validation: jest.fn().mockReturnValue(true)}], {onClick: jest.fn()}, {}, true, jest.fn().mockReturnValue('1'), jest.fn())
    formModel.fields[0].isValid = false
    formModel.fields[1].isValid = false
    formModel.fields[2].isValid = false
    formModel.fields[0].type = 'textfield'
    formModel.fields[1].type = 'textarea'
    formModel.fields[1].type = 'select'
    formModel.fields[0].required = true
    formModel.fields[1].required = true
    formModel.fields[2].required = true
    formModel.fields[2].value = 'value'
    expect(formModel.buttonDisabled).toEqual(true)
  })

})
