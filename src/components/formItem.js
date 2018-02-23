import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class FormItem extends Component {
  static propTypes = {
    isValid: PropTypes.bool.isRequired,
    errorText: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    required: PropTypes.bool.isRequired,
  }

  render(){
    let style = null
    if (this.props.isValid){
      style = {
        style: {display: 'none'}
      }
    }
    return (
      <div className='form-group'>
        <div className='alert alert-warning' role='alert' {...style}>
          <strong>Warning!</strong>{` ${this.props.errorText}`}
        </div>
        <label>{this.props.label}</label> {(this.props.required) ? <span style={{color: 'red'}}> *</span> : null}
        {this.props.children}
      </div>
    )
  }
}
