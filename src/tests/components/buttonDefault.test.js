import React from 'react'
import renderer from 'react-test-renderer'
import ButtonDefault from '../../components/buttonDefault'

const defaultOptions = {
  onClick: jest.fn(),
  disabled: false,
  text: 'text',
  className: 'className',
  type: 'button',
  style: {}
}

describe('ButtonDefault', () => {
  it ('Renders with snapshot (disabled: false)', () => {
    let options = Object.assign({}, defaultOptions)
    const component = renderer.create(
      <ButtonDefault {...options}/>,
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it ('Renders with snapshot (disabled: true)', () => {
    let options = Object.assign({}, defaultOptions)
    options.disabled = true
    const component = renderer.create(
      <ButtonDefault {...options}/>,
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it ('Renders with snapshot (disabled: false, className: empty string)', () => {
    let options = Object.assign({}, defaultOptions)
    options.className = ''
    const component = renderer.create(
      <ButtonDefault {...options}/>,
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it ('Renders with snapshot (disabled: true, className: empty string)', () => {
    let options = Object.assign({}, defaultOptions)
    options.disabled = true
    options.className = ''
    const component = renderer.create(
      <ButtonDefault {...options}/>,
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
