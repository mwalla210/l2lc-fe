import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { inject } from 'mobx-react'

@inject('page')
export default class CheckboxField extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    disabled: PropTypes.bool.isRequired,
    value: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
  }

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
