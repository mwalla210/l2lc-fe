import React from 'react'
import renderer from 'react-test-renderer'
import DraggableRow from '../../components/draggableRow'

const defaultOptions = {
  connectDragSource: input => {return input},
  connectDropTarget: input => {return input},
  index: 0,
  isDragging: false,
  id: 1,
  moverow: jest.fn(),
}
describe('DraggableRow', () => {
  it ('Renders with snapshot', () => {
    let options = Object.assign({}, defaultOptions)
    const component = renderer.create(
      <DraggableRow {...options}/>,
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it ('Renders while dragging, with cursor', () => {
    let options = Object.assign({}, defaultOptions)
    options.isDragging = true
    options.style = {}
    const component = renderer.create(
      <DraggableRow {...options}/>,
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
