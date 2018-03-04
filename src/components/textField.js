import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { inject } from 'mobx-react'

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
