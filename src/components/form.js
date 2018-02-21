import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import SelectField from './selectField'
import TextField from './textField'
import TextAreaField from './textAreaField'
import CheckboxField from './checkboxField'

@inject('page') @observer
export default class Form extends Component {
  render() {
    return(
      <form>
        {this.props.page.formModel.fields.map((field, index) => {
          switch (field.type){
            case 'select':
              return <SelectField {...field} key={index} index={index}/>
            case 'textfield':
              return <TextField {...field} key={index} index={index}/>
            case 'textarea':
              return <TextAreaField {...field} key={index} index={index}/>
            case 'checkbox':
              return <CheckboxField {...field} key={index} index={index}/>
          }
        })}
        {this.props.page.formModel.secondaryButton &&
          <button
            className='btn btn-secondary'
            onClick={e => {
              e.preventDefault()
              this.props.page.formModel.secondaryButton.onClick()
            }}
          >
            {this.props.page.formModel.secondaryButton.title}
          </button>
        }
        <button
          className='btn btn-primary'
          disabled={this.props.page.formModel.buttonDisabled}
          onClick={e => {
            e.preventDefault()
            this.props.page.formModel.primaryButtonWrapper()
          }}
        >
          {this.props.page.formModel.primaryButton.title}
        </button>
      </form>
    )
  }
}
