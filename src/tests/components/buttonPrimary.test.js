import React from 'react'
import renderer from 'react-test-renderer'
import ButtonPrimary from '../../components/buttonPrimary'
jest.mock('../../components/buttonDefault')

const defaultOptions = {
  onClick: jest.fn(),
  disabled: false,
  text: 'text',
  className: 'className',
  type: 'primary',
  style: {}
}

describe('ButtonPrimary', () => {
  it ('Renders with snapshot (disabled: false)', () => {
    let options = Object.assign({}, defaultOptions)
    const component = renderer.create(
      <ButtonPrimary {...options}/>,
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it ('Renders with snapshot (disabled: true)', () => {
    let options = Object.assign({}, defaultOptions)
    options.disabled = true
    const component = renderer.create(
      <ButtonPrimary {...options}/>,
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it ('Renders with snapshot (disabled: true, className: empty string)', () => {
    let options = Object.assign({}, defaultOptions)
    options.className = ''
    const component = renderer.create(
      <ButtonPrimary {...options}/>,
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it ('Renders with snapshot (disabled: false, className: empty string)', () => {
    let options = Object.assign({}, defaultOptions)
    options.className = ''
    const component = renderer.create(
      <ButtonPrimary {...options}/>,
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
