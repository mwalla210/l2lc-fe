import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { observer, inject } from 'mobx-react'
import Form from './form'
import FormModel from '../models/formModel'

@inject ('page', 'website') @observer
export default class EmployeeForm extends Component {
  static propTypes = {
    edit: PropTypes.bool
  }

  static defaultProps = {
    edit: false
  }

  constructor(props){
    super(props)
    let fields = [
      {
        type: 'textfield',
        label: 'First Name',
        id: 'firstName',
        required: true,
        validation: (value, required) => {
          if (required && value == '')
            return 'Please enter a value.'
          if (value.length > 30)
            return 'The first name must be less than 30 characters.'
          return null
        }
      },
      {
        type: 'textfield',
        label: 'Last Name',
        id: 'lastName',
        required: true,
        validation: (value, required) => {
          if (required && value == '')
            return 'Please enter a value.'
          if (value.length > 30)
            return 'The last name must be less than 30 characters.'
          return null
        }
      },
    ]
    let primaryOnClick = (fields) => {
      let body = {}
      fields.forEach(item => {
        body[item.id] = item.value.trim()
      })
      this.props.website.createEmployee(body)
      .then(() => this.props.page.employeeSummaryPage())
    }
    if (this.props.edit){
      // Change onClick functionality for primary
      primaryOnClick = (fields) => console.log('EDIT with', fields)
    }
    this.props.page.setFormModel(new FormModel(fields,
      {
        title: 'Continue',
        onClick: primaryOnClick
      },
      {
        title: 'Cancel',
        onClick: () => console.log('onClick')
      }
    ))
    // If this.props.edit, update model default field values with this.props.website.currentEmployee
  }

  render() {
    return (
      <Form/>
    )
  }
}
