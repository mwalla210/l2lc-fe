import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class FormItem extends Component {
  static propTypes = {
    isValid: PropTypes.bool.isRequired,
    errorText: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    required: PropTypes.bool.isRequired,
    disabled: PropTypes.bool.isRequired,
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
        <div style={{width:'50%',height:'60px',marginBottom:'10px',marginTop:'10px'}} className="form-group" {...disabledStyle}>
          <div style={{color:'orange'},{position:'absolute',right:'10%'}} className="alert alert-warning" role="alert" {...alertStyle}>
            <div style={{color:'orange'}}><strong>Warning!</strong>{` ${this.props.errorText}`}</div>
          </div>
          <label>{this.props.label}</label> {(this.props.required) ? <span style={{color: 'orange'}}> *</span> : null}
          {this.props.children}
        </div>
    )
  }
}
