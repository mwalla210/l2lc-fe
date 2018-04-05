import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { inject } from 'mobx-react'

/**
 * TextField component
 * @namespace TextField
 * @property {String} id Field array index
 * @property {Boolean} disabled Field disabled indicator
 * @property {String} value Field value
 * @property {Function} onChange Field change function
 * @property {Function} onBlur Field blur function
 * @property {Boolean} focus Field autofocus indicator
 * @extends React.Component
 * @see {@link PageStore @inject PageStore}
 */
@inject('page')
export default class TextField extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    disabled: PropTypes.bool.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
    valid: PropTypes.bool.isRequired,
    focus:PropTypes.bool.isRequired
  }

  /**
   * Renders HTML input component
   * @method render
   * @memberof TextField.prototype
   * @return {Component}
   */
  render(){
    let color = ''
    if(!this.props.valid)
      color = 'orange'
    return (
      <input
        disabled={this.props.disabled}
        style={{borderColor:color}}
        type="text"
        className="form-control"
        id={this.props.id}
        value={this.props.value}
        onChange={this.props.onChange}
        onBlur={this.props.onBlur}
        autoFocus={this.props.focus}
      />
    )
  }
}
