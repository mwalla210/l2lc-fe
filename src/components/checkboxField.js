import React, { Component } from 'react'
import PropTypes from 'prop-types'

/**
 * CheckboxField component
 * @namespace CheckboxField
 * @property {String} id Field array index
 * @property {Boolean} disabled Field disabled indicator
 * @property {Boolean} value Field checked indicator
 * @property {Function} onChange Field change function
 * @extends React.Component
 */
export default class CheckboxField extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    disabled: PropTypes.bool.isRequired,
    value: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
  }

  /**
   * Renders HTML input component
   * @method render
   * @memberof CheckboxField.prototype
   * @return {Component}
   */
  render(){
    return (
      <input
        className="form-check-input"
        disabled={this.props.disabled}
        style={{margin: 5}}
        type="checkbox"
        id={this.props.id}
        checked={this.props.value}
        onChange={this.props.onChange}
      />
    )
  }
}
