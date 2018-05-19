import React from 'react'
import renderer from 'react-test-renderer'
import SelectField from '../../components/selectField'
import {observable} from 'mobx'

const defaultOptions = {
  valid: true,
  disabled: false,
  id: 'id',
  value: 'value',
  onChange: jest.fn(),
  onBlur: jest.fn(),
  focus: true,
  options:observable([
    {
      disabled: true,
      title: 'title'
    },
    {
      title: 'title'
    }
  ])
}

const alternateOptions = {
  valid: false,
  disabled: false,
  id: 'id',
  value: '',
  onChange: jest.fn(),
  onBlur: jest.fn(),
  focus: true,
  options:observable([
    {
      disabled: true,
      title: 'title',
      selected: true
    },
    {
      title: 'title',
    }
  ])
}

describe('SelectField', () => {
  it ('Renders with snapshot', () => {
    let option = Object.assign({}, defaultOptions)
    const component = renderer.create(
      <SelectField {...option}/>,
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it ('Renders with snapshot, alternate arguements', () => {
    let option = Object.assign({}, alternateOptions)
    const component = renderer.create(
      <SelectField {...option}/>,
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

})
