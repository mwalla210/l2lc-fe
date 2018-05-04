import React from 'react'
import renderer from 'react-test-renderer'
import TextAreaField from '../../components/textAreaField'

describe('TextAreaField', () => {
  it ('Renders', () => {
    let options = {
      page: {},
      id: '',
      disabled: false,
      value: '',
      rows: 1,
      onChange: jest.fn(),
      onBlur: jest.fn(),
      focus: false
    }
    const component = renderer.create(
      <TextAreaField {...options}/>,
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
