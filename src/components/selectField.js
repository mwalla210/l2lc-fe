import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { inject, PropTypes as MobXPropTypes } from 'mobx-react'
import FormItem from './formItem'

@inject('page')
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

  constructor(props){
    super(props)
    this.onChange = this.onChange.bind(this)
    this.onBlur = this.onBlur.bind(this)
  }

  onChange(event){
    this.props.page.formModel.modifyFieldValue(this.props.index, event.target.value)
  }

  onBlur(event){
    event.preventDefault()
    this.props.page.formModel.fieldValidatorWrapper(this.props.index)
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
        <select disabled={this.props.disabled} className="form-control" id={this.props.id}
          value={this.props.value}
          onChange={this.onChange}
          onBlur={this.onBlur}
        >
          {this.props.options.map((option, key) =>
            <option key={key}>{option}</option>
          )}
        </select>
      </FormItem>
    )
  }
}
