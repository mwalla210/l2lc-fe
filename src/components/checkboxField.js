import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { observer, inject } from 'mobx-react'
import FormItem from './formItem'

@inject('page') @observer
export default class CheckboxField extends Component {
  static propTypes = {
    isValid: PropTypes.bool.isRequired,
    errorText: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    required: PropTypes.bool.isRequired,
    id: PropTypes.string.isRequired,
    disabled: PropTypes.bool.isRequired,
    value: PropTypes.bool.isRequired,
    index: PropTypes.number.isRequired,
  }

  render(){
    return (
      <FormItem
        isValid={this.props.isValid}
        errorText={this.props.errorText}
        label={this.props.label}
        required={this.props.required}
        disabled={this.props.disabled}
      >
        <input
          className='form-check-input'
          disabled={this.props.disabled}
          type='checkbox'
          id={this.props.id}
          checked={this.props.value}
          onChange={event => {
            this.props.page.formModel.modifyFieldValue(this.props.index, event.target.checked)}
          }
        />
      </FormItem>
    )
  }
}
