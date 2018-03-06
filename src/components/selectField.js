import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { inject, PropTypes as MobXPropTypes } from 'mobx-react'

@inject('page')
export default class SelectField extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    disabled: PropTypes.bool.isRequired,
    value: PropTypes.string.isRequired,
    options: MobXPropTypes.observableArrayOf(PropTypes.string).isRequired,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
  }

  render(){
    return (
      <select
        disabled={this.props.disabled}
        className="form-control"
        id={this.props.id}
        value={this.props.value}
        onChange={this.props.onChange}
        onBlur={this.props.onBlur}
      >
        {this.props.options.map((option, key) =>{
          let addtlProps = {}
          if (option.disabled)
            addtlProps = {disabled: true}
          return (<option key={key} {...addtlProps}>{option.title}</option>)
        })}
      </select>
    )
  }
}
