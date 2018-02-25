import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class FormItem extends Component {
  static propTypes = {
    isValid: PropTypes.bool.isRequired,
    errorText: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    required: PropTypes.bool.isRequired,
    disabled: PropTypes.bool.isRequired
  }

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
        <div className="alert alert-warning" role="alert" {...alertStyle}>
          <strong>Warning!</strong>{` ${this.props.errorText}`}
        </div>
        <label>{this.props.label}</label> {(this.props.required) ? <span style={{color: 'red'}}> *</span> : null}
        {this.props.children}
      </div>
    )
  }
}
