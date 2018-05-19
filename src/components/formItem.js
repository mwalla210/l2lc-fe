import React, { Component } from 'react'
import PropTypes from 'prop-types'

/**
 * FormItem component
 * @namespace FormItem
 * @property {Boolean} isValid Validation indicator for field
 * @property {String} errorText Error text for field validation
 * @property {String} label Field label
 * @property {Boolean} required Required indicator for field
 * @property {Boolean} disabled Disabled indicator for field
 * @extends React.Component
 */
export default class FormItem extends Component {
  static propTypes = {
    isValid: PropTypes.bool.isRequired,
    errorText: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    required: PropTypes.bool.isRequired,
    disabled: PropTypes.bool.isRequired
  }

  /**
   * Renders HTML div component
   * @method render
   * @memberof FormItem.prototype
   * @return {Component}
   */
  render(){
    let disabledStyle = null
    if (this.props.disabled){
      disabledStyle = {
        style: {display: 'none'}
      }
    }
    let alertStyle = null
    if (this.props.isValid){
      alertStyle = {
        style: {display: 'none'}
      }
    }
    return (
      <div className="form-group" {...disabledStyle}>
        <div style={{color:'orange'}} className="alert alert-warning" role="alert" {...alertStyle}>
          <div style={{color:'orange'}}><strong>Warning!</strong>{` ${this.props.errorText}`}</div>
        </div>
        <label>{this.props.label}</label> {(this.props.required) ? <span style={{color: 'orange'}}> *</span> : null}
        {this.props.children}
      </div>
    )
  }
}
