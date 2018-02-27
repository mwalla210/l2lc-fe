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
    color: PropTypes.string
  }

  render(){
    return (
      <input
        disabled={this.props.disabled}
        style={{borderColor:this.props.color}}
        type="text"
        className="form-control"
        id={this.props.id}
        value={this.props.value}
        onChange={this.props.onChange}
        onBlur={this.props.onBlur}
      />
    )
  }
}
