import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ButtonDefault from './buttonDefault'

/**
 * ButtonPrimary component
 * @namespace ButtonPrimary
 * @property {Function} onClick On click function for button
 * @property {Boolean} [disabled] Button disabled flag
 * @property {String} [text] Button text
 * @property {String} [className] Button additional class name
 * @property {String} [type='button'] Button type
 * @property {Object} [style] Button additional styles
 * @extends React.Component
 */
export default class ButtonPrimary extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    text: PropTypes.string,
    className: PropTypes.string,
    type: PropTypes.string,
    style: PropTypes.object
  }

  /**
   * Renders ButtonDefault with props component
   * @method render
   * @memberof ButtonPrimary.prototype
   * @return {ButtonDefault}
   */
  render(){
    return (
      <ButtonDefault
        className={`btn-primary${(this.props.className)? ` ${this.props.className}`: ''}`}
        disabled={this.props.disabled}
        onClick={this.props.onClick}
        text={this.props.text}
        type={this.props.type}
        style={this.props.style}
      />
    )
  }
}
