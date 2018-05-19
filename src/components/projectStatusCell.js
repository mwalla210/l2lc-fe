import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Consts from '../consts'

/**
 * ProjectStatusCell component; constructor binds functions
 * @namespace ProjectStatusCell
 * @property {Object} row Row object from table
 * @extends React.Component
 */
export default class ProjectStatusCell extends Component {
  static propTypes = {
    row: PropTypes.object.isRequired
  }

  /**
   * Renders HTML span component, containing project status value and color indicator
   * @method render
   * @memberof ProjectStatusCell.prototype
   * @return {Component}
   * @see {@link Consts}
   */
  render(){
    return (
      <span>
        <span style={{
          color: this.props.row.value === 'Completed' ? Consts.doneColor
            : this.props.row.value === 'On Hold' ? Consts.helpColor
            // Received, In Progress
            : Consts.openColor,
          transition: 'all .3s ease'}}>
            &#x25cf;
        </span>
        {` ${this.props.row.value}`}
      </span>
    )
  }
}
