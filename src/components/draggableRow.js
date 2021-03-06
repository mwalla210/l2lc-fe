import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { findDOMNode } from 'react-dom'
import { DragSource, DropTarget } from 'react-dnd'
import classnames from 'classnames'

/* istanbul ignore next */
const rowSource = {
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index,
    }
  },
}
/* istanbul ignore next */
const rowTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index
    const hoverIndex = props.index

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return
    }

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect()

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

    // Determine mouse position
    const clientOffset = monitor.getClientOffset()

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return
    }
    if (props.moverow){
      // Time to actually perform the action
      props.moverow(dragIndex, hoverIndex)

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      monitor.getItem().index = hoverIndex
    }
  },
}

/**
 * DraggableRow component for DraggableTable; reclass of ReactTable row
 * @namespace DraggableRow
 * @extends React.Component
 * @property {Function} connectDragSource React DnD function provided by decorator
 * @property {Function} connectDropTarget React DnD function provided by decorator
 * @property {Number} [index] Index of row
 * @property {Boolean} isDragging Dragging indicator
 * @property {Any} [id] Row ID
 * @property {Function} [moverow] Row moving function
 * @see {@link https://github.com/react-dnd/react-dnd React DnD}
 */
@DropTarget('row', rowTarget, /* istanbul ignore next */ connect => ({
  connectDropTarget: connect.dropTarget(),
}))
@DragSource('row', rowSource, /* istanbul ignore next */ (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
}))
export default class DraggableRow extends Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    index: PropTypes.number,
    isDragging: PropTypes.bool.isRequired,
    id: PropTypes.any,
    moverow: PropTypes.func,
  }

  /**
   * Renders HTML div component, encapsulated by connectDragSource and connectDropTarget functions, to allow dragging and dropping
   * @method render
   * @memberof DraggableRow.prototype
   * @return {Component}
   */
  render() {
    const {
      isDragging,
      connectDragSource,
      connectDropTarget,
      children,
      className,
      ...rest
    } = this.props
    let addtl = Object.assign({}, rest)
    delete addtl.moverow
    delete addtl.index
    const opacity = isDragging ? 0 : 1
    const grab = isDragging ? '-webkit-grabbing' : '-webkit-grab'
    if (addtl.style)
      addtl.style.cursor = grab
    else
      addtl.style = {
        cursor: grab
      }
    return connectDragSource(
      connectDropTarget(
        <div
          className={classnames('rt-tr', className)}
          role="row"
          style={{opacity}}
          {...addtl}
        >
          {children}
        </div>
      ),
    )
  }
}
