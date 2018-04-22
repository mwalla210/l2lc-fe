import React from 'react'
import renderer from 'react-test-renderer'
import Page from '../../components/page'
jest.mock('../../components/login')
jest.mock('../../components/navbar')

const defaultOptions = {
  page: {
    content:null,
    title: 'title',
  },
  website: {
    currentUser:null,
  },
}

const alternateOptions = {
  page: {
    content:'Form',
    title: 'title',
  },
  website: {
    currentUser:'currentUser',
  },
}

describe('Page', () => {
  it ('Renders with snapshot', () => {
    let options = Object.assign({}, defaultOptions)
    const component = renderer.create(
      <Page {...options}/>,
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it ('Renders with snapshot, alternate arguements', () => {
    let options = Object.assign({}, alternateOptions)
    const component = renderer.create(
      <Page {...options}/>,
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

})
