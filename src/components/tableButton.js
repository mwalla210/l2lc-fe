import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ButtonPrimary from './buttonPrimary'

/**
 * TableButton component
 * @namespace TableButton
 * @property {Function} onClick On click function for button
 * @property {String} title Button title
 * @extends React.Component
 */
export default class TableButton extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
  }

  /**
   * Renders ButtonPrimary
   * @method render
   * @memberof TableButton.prototype
   * @return {ButtonPrimary}
   */
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
