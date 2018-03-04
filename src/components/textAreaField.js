import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { inject } from 'mobx-react'

@inject('page')
export default class TextAreaField extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    disabled: PropTypes.bool.isRequired,
    value: PropTypes.string.isRequired,
    rows: PropTypes.number,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
    focus:PropTypes.bool.isRequired
  }

  render(){
    return (
        <textarea
          className="form-control"
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
