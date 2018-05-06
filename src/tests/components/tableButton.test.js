import React from 'react'
import renderer from 'react-test-renderer'
import TableButton from '../../components/tableButton'
jest.mock('../../components/buttonPrimary')

describe('TableButton', () => {
  it ('Renders', () => {
    let options = {
      onClick: jest.fn(),
      title: 'Button'
    }
    const component = renderer.create(
      <TableButton {...options}/>,
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
