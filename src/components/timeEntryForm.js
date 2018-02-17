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
        required: true
      },
      {
        type: 'textfield',
        label: 'Employee ID',
        id: 'id',
        required: true
      }
    ]
    this.props.page.setFormModel(new FormModel(fields,
      {
        title: 'Submit',
        onClick: () => console.log('submit button onClick')
      },
      {
        title: 'Clear',
        onClick: () => console.log('clear button onClick')
      }
    ))
  }

  render() {
    return (
      <Form/>
    )
  }
}
