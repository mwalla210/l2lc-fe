import React from 'react'
import renderer from 'react-test-renderer'
import CircleButton from '../../components/circleButton'

jest.mock('reactstrap', () => ({
  Button: 'Button'
}))

const defaultOptions = {
  onClick: jest.fn(),
  iconName: 'iconName',
  styleProps: {},
  disabled: false
}

describe('ButtonDefault', () => {
  it ('Renders with snapshot (disabled: false)', () => {
    let options = Object.assign({}, defaultOptions)
    const component = renderer.create(
      <CircleButton {...options}/>,
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it ('Renders with snapshot (disabled: true)', () => {
    let options = Object.assign({}, defaultOptions)
    options.disabled = true
    const component = renderer.create(
      <CircleButton {...options}/>,
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
