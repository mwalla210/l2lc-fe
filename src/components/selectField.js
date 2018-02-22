import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { observer, inject, PropTypes as MobXPropTypes } from 'mobx-react'
import FormItem from './formItem'

@inject('page') @observer
export default class SelectField extends Component {
  static propTypes = {
    isValid: PropTypes.bool.isRequired,
    errorText: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    required: PropTypes.bool.isRequired,
    id: PropTypes.string.isRequired,
    disabled: PropTypes.bool.isRequired,
    value: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    options: MobXPropTypes.observableArrayOf(PropTypes.string).isRequired,
  }

  render(){
    return (
      <FormItem
        isValid={this.props.isValid}
        errorText={this.props.errorText}
        label={this.props.label}
        required={this.props.required}
      >
        <select disabled={this.props.disabled} className='form-control' id={this.props.id}
          value={this.props.value}
          onChange={event => {
            this.props.page.formModel.modifyFieldValue(this.props.index, event.target.value)}}
          onBlur={event => {
            event.preventDefault()
            this.props.page.formModel.fieldValidatorWrapper(this.props.index)
          }}>
          {this.props.options.map((option, key) =>
            <option key={key}>{option}</option>
          )}
        </select>
      </FormItem>
    )
  }
}
