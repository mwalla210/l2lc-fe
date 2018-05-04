import React from 'react'
import renderer from 'react-test-renderer'
import CheckboxField from '../../components/checkboxField'

const defaultOptions = {
  id: 'id',
  disabled: false,
  value: false,
  onChange: jest.fn()
}

describe('CheckboxField', () => {
  it ('Renders with snapshot (disabled: false, value: false)', () => {
    let options = Object.assign({}, defaultOptions)
    const component = renderer.create(
      <CheckboxField {...options}/>,
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it ('Renders with snapshot (disabled: true, value: false)', () => {
    let options = Object.assign({}, defaultOptions)
    options.disabled = true
    const component = renderer.create(
      <CheckboxField {...options}/>,
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it ('Renders with snapshot (disabled: true, value: true)', () => {
    let options = Object.assign({}, defaultOptions)
    options.disabled = true
    options.value = true
    const component = renderer.create(
      <CheckboxField {...options}/>,
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it ('Renders with snapshot (disabled: false, value: true)', () => {
    let options = Object.assign({}, defaultOptions)
    options.value = true
    const component = renderer.create(
      <CheckboxField {...options}/>,
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
