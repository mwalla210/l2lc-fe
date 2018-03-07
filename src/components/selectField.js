import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { inject, PropTypes as MobXPropTypes } from 'mobx-react'

@inject('page')
export default class SelectField extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    disabled: PropTypes.bool.isRequired,
    value: PropTypes.string.isRequired,
    options: MobXPropTypes.observableArrayOf(PropTypes.object).isRequired,
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
      <select
        disabled={this.props.disabled}
        style = {{borderColor: color}}
        className="form-control"
        id={this.props.id}
        value={this.props.value}
        onChange={this.props.onChange}
        onBlur={this.props.onBlur}
        autoFocus={this.props.focus}
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
