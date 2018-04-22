import React from 'react'
import renderer from 'react-test-renderer'
import FormItem from '../../components/formItem'

const defaultOptions = {
  isValid: true,
  errorText: 'errorText',
  label: 'label',
  required: true,
  disabled: false,
}

const alternateOptions = {
  isValid: true,
  errorText: 'errorText',
  label: 'label',
  required: true,
  disabled: true,
}

describe('FormItem', () => {
  it ('Renders with snapshot', () => {
    let options = Object.assign({}, defaultOptions)
    const component = renderer.create(
      <FormItem {...options}/>,
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('Renders with snapshot, alternate options', () => {
    let options = Object.assign({}, alternateOptions)
    const component = renderer.create(
      <FormItem {...options}/>,
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
