import React from 'react'
import renderer from 'react-test-renderer'
import ProjectStatusCell from '../../components/projectStatusCell'

const defaultOptions = {
  row:{
    value:'Completed'
  }
}

const alternateOptions = {
  row:{
    value:'On Hold'
  }
}

const tertiaryOptions = {
  row:{
    value:''
  }
}

describe('ProjectStatusCell', () => {
  it ('Renders with snapshot', () => {
    let options = Object.assign({}, defaultOptions)
    const component = renderer.create(
      <ProjectStatusCell {...options}/>,
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it ('Renders with snapshot, alternate arguements', () => {
    let options = Object.assign({}, alternateOptions)
    const component = renderer.create(
      <ProjectStatusCell {...options}/>,
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it ('Renders with snapshot, tertiary arguements', () => {
    let options = Object.assign({}, tertiaryOptions)
    const component = renderer.create(
      <ProjectStatusCell {...options}/>,
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

})
