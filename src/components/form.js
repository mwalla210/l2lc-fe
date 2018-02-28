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

  onChange = (index) => (event) => {
    this.props.page.formModel.modifyFieldValue(index, event.target.value)
  }

  onBlur = (index) => (event) => {
    event.preventDefault()
    this.props.page.formModel.fieldValidatorWrapper(index)
  }

  render() {
    return(
      <form style={{marginLeft: '30%'}}>
        {this.props.page.formModel.fields.map((field, index) => {
          let child = null
          let props = {
            id: field.id,
            disabled: field.disabled,
            value: field.value,
            index,
            onChange: this.onChange(index),
            onBlur: this.onBlur(index),
            valid: field.isValid,
          }
          switch (field.type){
            case 'select':
              child = <div style={{width:'166%'}}><SelectField {...props} options={field.options}/></div>
              break
            case 'textfield':
              child = <div style={{width:'166%'}}><TextField {...props}/></div>
              break
            case 'textarea':
              child = <div style={{width:'166%'}}><TextAreaField {...props} rows={field.rows}/></div>
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
          <button style={{margin:10}} className="btn btn-secondary" onClick={this.secondaryOnClick}>
            {this.props.page.formModel.secondaryButton.title}
          </button>
        }
        <button style={{margin:10}} className="btn btn-primary" disabled={this.props.page.formModel.buttonDisabled} onClick={this.primaryOnClick}>
          {this.props.page.formModel.primaryButton.title}
        </button>
      </form>
    )
  }
}
