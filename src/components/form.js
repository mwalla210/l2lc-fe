import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import SelectField from './selectField'
import TextField from './textField'
import TextAreaField from './textAreaField'
import CheckboxField from './checkboxField'
import FormItem from './formItem'
import PromptModal from './promptModal'

@inject('page') @observer
export default class Form extends Component {
  constructor(props){
    super(props)
    //this.confirmOnClick = this.confirmOnClick.bind(this)
    //this.open = this.open.bind(this)
    //this.closeFn = this.closeFn.bind(this)
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
      <div>
        <PromptModal
          headerClass="bg-danger"
          title="API Return Error"
          titleImage="warning"
          titleClass="text-danger"
          confirmOnClick={this.props.page.formModel.confirmAndClose}
          open={this.props.page.formModel.modalOpen}
          closeFn={this.props.page.formModel.closeModal}
          content="There was an error with the return value from the server"
          confirmClass="btn-danger"
        />
        <form style={{marginLeft: '33%'}}>
          {this.props.page.formModel.fields.map((field, index) => {
            let first = true
            if(index != 0){
              first = false
            }
            let child = null
            let props = {
              id: field.id,
              disabled: field.disabled,
              value: field.value,
              index,
              onChange: this.onChange(index),
              onBlur: this.onBlur(index),
              valid: field.isValid,
              focus: first
            }
            switch (field.type){
              case 'select':
                child = <div><SelectField autoFocus {...props} options={field.options}/></div>
                break
              case 'textfield':
                child = <div><TextField autoFocus {...props}/></div>
                break
              case 'textarea':
                child = <div><TextAreaField autoFocus {...props} rows={field.rows}/></div>
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
      </div>
    )
  }
}
