import React, { Component } from 'react'
import PropTypes from 'prop-types'

/**
 * ButtonDefault component
 * @namespace ButtonDefault
 * @property {Function} onClick On click function for button
 * @property {Boolean} [disabled] Button disabled flag
 * @property {String} [text] Button text
 * @property {String} [className] Button additional class name
 * @property {String} [type='button'] Button type
 * @property {Object} [style] Button additional styles
 * @extends React.Component
 */
export default class ButtonDefault extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    text: PropTypes.string,
    className: PropTypes.string,
    type: PropTypes.string,
    style: PropTypes.object
  }

  static defaultProps = {
    type: 'button'
  }

  /**
   * Renders HTML button component
   * @method render
   * @memberof ButtonDefault.prototype
   * @return {Component}
   */
  render(){
    return (
      <button
        type={this.props.type}
        className={`btn${(this.props.className)? ` ${this.props.className}`: ''}`}
        disabled={this.props.disabled}
        onClick={this.props.onClick}
        style={this.props.style}
      >
        {this.props.text}
      </button>
    )
  }
}
