import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { inject } from 'mobx-react'

/**
 * TextAreaField component
 * @namespace TextAreaField
 * @property {String} id Field array index
 * @property {Boolean} disabled Field disabled indicator
 * @property {String} value Field value
 * @property {Number} rows Field row number
 * @property {Function} onChange Field change function
 * @property {Function} onBlur Field blur function
 * @property {Boolean} focus Field autofocus indicator
 * @extends React.Component
 */
@inject('page')
export default class TextAreaField extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    disabled: PropTypes.bool.isRequired,
    value: PropTypes.string.isRequired,
    rows: PropTypes.number,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
    focus: PropTypes.bool.isRequired
  }

  /**
   * Renders HTML textarea component
   * @method render
   * @memberof TextAreaField.prototype
   * @return {Component}
   */
  render(){
    return (
      <textarea
        className="form-control"
        style={{height:'46px'}}
        rows={this.props.rows}
        id={this.props.id}
        value={this.props.value}
        disabled={this.props.disabled}
        onChange={this.props.onChange}
        onBlur={this.props.onBlur}
        autoFocus={this.props.focus}
      />
    )
  }
}
