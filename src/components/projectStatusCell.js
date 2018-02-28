import React, { Component } from 'react'
import PropTypes from 'prop-types'

const doneColor = '#49a4ff'
const helpColor = '#ffbf00'
const openColor = '#57d500'

export default class ProjectStatusCell extends Component {
  static propTypes = {
    row: PropTypes.object.isRequired
  }

  render(){
    return (
      <span>
        <span style={{
          color: this.props.row.value === 'Completed' ? doneColor
            : this.props.row.value === 'On Hold' ? helpColor
            // Received, In Progress
            : openColor,
          transition: 'all .3s ease'}}>
            &#x25cf;
        </span>
        {` ${this.props.row.value}`}
      </span>
    )
  }
}
