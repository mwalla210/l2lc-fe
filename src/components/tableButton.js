import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ButtonPrimary from './buttonPrimary'

export default class TableButton extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
  }

  render() {
    return (
      <ButtonPrimary
        style={{float: 'right', marginBottom: '10px', marginLeft: '10px'}}
        onClick={this.props.onClick}
        text={this.props.title}
      />
    )
  }
}
