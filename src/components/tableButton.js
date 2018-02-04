import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class TableButton extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
  }

  render() {
    return (
      <button
        type='button'
        style={{float: 'right', marginBottom: '10px', marginLeft: '10px'}}
        className='btn btn-primary'
        onClick={this.props.onClick}>
          {this.props.title}
      </button>
    )
  }
}
