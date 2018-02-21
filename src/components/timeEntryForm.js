import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import Form from './form'
import FormModel from '../models/formModel'

@inject ('page') @observer
export default class CustomerForm extends Component {
  constructor(props){
    super(props)
    let fields = [
      {
        type: 'textfield',
        label: 'Project ID',
        id: 'id',
        required: true,
        validation: (value, required) => {
          if (required && value == '')
            return 'Please enter a value.'
          if (value.length > 15)
            return 'The project ID must be less than 15 characters.'
          return null
        }
      },
      {
        type: 'textfield',
        label: 'Employee ID',
        id: 'id',
        required: true,
        validation: (value, required) => {
          if (required && value == '')
            return 'Please enter a value.'
          if (value.length > 15)
            return 'The employee ID must be less than 15 characters.'
          return null
        }
      }
    ]
    this.props.page.setFormModel(new FormModel(fields,
      {
        title: 'Submit',
        onClick: () => console.log('submit button onClick')
      },
      {
        title: 'Clear',
        onClick: () => this.props.page.formModel.resetValues()
      },
      true
    ))
  }

  render() {
    return (
      <Form/>
    )
  }
}
