import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import SelectField from './selectField'
import TextField from './textField'
import TextAreaField from './textAreaField'
import CheckboxField from './checkboxField'
import FormItem from './formItem'
import PromptModal from './promptModal'
import ButtonPrimary from './buttonPrimary'
import ButtonDefault from './buttonDefault'
import {ButtonToolbar, ButtonGroup} from 'react-bootstrap'

@inject('page') @observer
export default class Form extends Component {
  constructor(props){
    super(props)
    this.primaryOnClick = this.primaryOnClick.bind(this)
    this.secondaryOnClick = this.secondaryOnClick.bind(this)
    this.props.page.formModel.confirmAndClose = this.props.page.formModel.confirmAndClose.bind(this.props.page.formModel)
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
          headerClass="bg-alert"
          title="API Return Error"
          titleImage="warning"
          titleClass="text-alert"
          confirmOnClick={this.props.page.formModel.confirmAndClose}
          open={this.props.page.formModel.modalOpen}
          closeFn={this.props.page.formModel.closeModal}
          content={this.props.page.formModel.errorResponse}
          confirmClass="btn-alert"
          primaryButtonText="Ok"
        />
        <form className="col-sm-6 col-sm-offset-3">
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
              onChange: this.onChange(index, field.type == 'checkbox'),
              onBlur: this.onBlur(index),
              valid: field.isValid,
              focus: first
            }
            switch (field.type){
              case 'select':
                child = <SelectField autoFocus {...props} options={field.options}/>
                break
              case 'textfield':
                child = <TextField autoFocus {...props}/>
                break
              case 'textarea':
                child = <TextAreaField autoFocus {...props} rows={field.rows}/>
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
          <div style={{textAlign: 'center'}}>
            <ButtonToolbar>
              {this.props.page.formModel.secondaryButton &&
                <ButtonGroup style={{float: 'inherit'}}>
                  <ButtonDefault onClick={this.secondaryOnClick} text={this.props.page.formModel.secondaryButton.title}/>
                </ButtonGroup>
              }
              <ButtonGroup style={{float: 'inherit'}}>
                <ButtonPrimary
                  disabled={this.props.page.formModel.buttonDisabled}
                  onClick={this.primaryOnClick}
                  text={this.props.page.formModel.primaryButton.title}
                />
              </ButtonGroup>
            </ButtonToolbar>
          </div>
        </form>
      </div>
    )
  }
}
