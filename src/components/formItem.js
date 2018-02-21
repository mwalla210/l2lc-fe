import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { observer, inject } from 'mobx-react'

@inject('page') @observer
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
        <div className='alert alert-danger' role='alert' {...style}>
          <strong>{this.props.errorText}</strong>
        </div>
        <label>{this.props.label}</label> {(this.props.required) ? <span style={{color: 'red'}}> *</span> : null}
        {this.props.children}
      </div>
    )
  }
}
