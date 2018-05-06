import React from 'react'
import renderer from 'react-test-renderer'
import DeleteModal from '../../components/deleteModal'
jest.mock('../../components/promptModal')

const defaultOptions = {
  title: 'title',
  confirmOnClick: jest.fn(),
  denyOnClick: jest.fn(),
  open: false,
  closeFn: jest.fn(),
  content: 'content'
}

describe('ButtonDefault', () => {
  it ('Renders with snapshot (open: false)', () => {
    let options = Object.assign({}, defaultOptions)
    const component = renderer.create(
      <DeleteModal {...options}/>,
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it ('Renders with snapshot (open: true)', () => {
    let options = Object.assign({}, defaultOptions)
    options.open = true
    const component = renderer.create(
      <DeleteModal {...options}/>,
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
