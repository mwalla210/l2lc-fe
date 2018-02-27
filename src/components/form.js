import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import SelectField from './selectField'
import TextField from './textField'
import TextAreaField from './textAreaField'
import CheckboxField from './checkboxField'
import FormItem from './formItem'

@inject('page') @observer
export default class Form extends Component {
  constructor(props){
    super(props)
    this.primaryOnClick = this.primaryOnClick.bind(this)
    this.secondaryOnClick = this.secondaryOnClick.bind(this)
  }

  primaryOnClick(e){
    e.preventDefault()
    this.props.page.formModel.primaryButtonWrapper()
  }

  secondaryOnClick(e){
    e.preventDefault()
    this.props.page.formModel.secondaryButton.onClick()
  }

  onChange = (index, checkbox=false) => (event) => {
    let val = event.target.value
    if (checkbox)
      val = event.target.checked
    this.props.page.formModel.modifyFieldValue(index, val)
  }

  onBlur = (index) => (event) => {
    event.preventDefault()
    this.props.page.formModel.fieldValidatorWrapper(index)
  }

  render() {
    return(
      <form>
        {this.props.page.formModel.fields.map((field, index) => {
          let child = null
          let props = {
            id: field.id,
            disabled: field.disabled,
            value: field.value,
            index,
            onChange: this.onChange(index, field.type == 'checkbox'),
            onBlur: this.onBlur(index)
          }
          switch (field.type){
            case 'select':
              child = <SelectField {...props} options={field.options}/>
              break
            case 'textfield':
              child = <TextField {...props}/>
              break
            case 'textarea':
              child = <TextAreaField {...props} rows={field.rows}/>
              break
            case 'checkbox':
              child = <CheckboxField {...props}/>
              break
          }
          return (
            <FormItem
              isValid={field.isValid}
              errorText={field.errorText}
              label={field.label}
              required={field.required}
              disabled={field.disabled}
              key={index}
            >
              {child}
            </FormItem>
          )
        })}
        {this.props.page.formModel.secondaryButton &&
          <button className="btn btn-secondary" onClick={this.secondaryOnClick}>
            {this.props.page.formModel.secondaryButton.title}
          </button>
        }
        <button className="btn btn-primary" disabled={this.props.page.formModel.buttonDisabled} onClick={this.primaryOnClick}>
          {this.props.page.formModel.primaryButton.title}
        </button>
      </form>
    )
  }
}
