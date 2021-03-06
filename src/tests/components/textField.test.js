import React from 'react'
import renderer from 'react-test-renderer'
import TextField from '../../components/textField'

describe('TextField', () => {
  it ('Renders with valid false, password true', () => {
    let options = {
      page: {},
      id: '',
      disabled: false,
      value: '',
      onChange: jest.fn(),
      onBlur: jest.fn(),
      valid: false,
      focus: false,
      password:false
    }
    const component = renderer.create(
      <TextField {...options}/>,
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it ('Renders with valid false, password false', () => {
    let options = {
      page: {},
      id: '',
      disabled: false,
      value: '',
      onChange: jest.fn(),
      onBlur: jest.fn(),
      valid: false,
      focus: false,
      password:true
    }
    const component = renderer.create(
      <TextField {...options}/>,
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it ('Renders with valid false, no password', () => {
    let options = {
      page: {},
      id: '',
      disabled: false,
      value: '',
      onChange: jest.fn(),
      onBlur: jest.fn(),
      valid: false,
      focus: false
    }
    const component = renderer.create(
      <TextField {...options}/>,
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it ('Renders with valid true', () => {
    let options = {
      page: {},
      id: '',
      disabled: false,
      value: '',
      onChange: jest.fn(),
      onBlur: jest.fn(),
      valid: true,
      focus: false
    }
    const component = renderer.create(
      <TextField {...options}/>,
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
