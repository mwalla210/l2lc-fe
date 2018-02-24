import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { inject } from 'mobx-react'
import Form from './form'
import FormModel from '../models/formModel'

@inject ('page', 'website')
export default class ProjectForm extends Component {
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
        type: 'select',
        label: 'Cost Center',
        id: 'region',
        options: ['Select...','APC Job','Decorative Job','Maintenance','Administration','Production','Research and Development','Other'],
        required: true,
        validation: (value, required) => {
          if (required && value == '')
            return 'Please select a cost center.'
          return null
        }
      },
      {
        type: 'select',
        label: 'Project Type',
        id: 'projectType',
        options: ['Select...','based on cost center selected'],
        required: true,
        validation: (value, required) => {
          if (required && value == '')
            return 'Please select a project type.'
          return null
        }
      },
      {
        type: 'textfield',
        label: 'Part Count',
        id: 'partCount',
        required: true,
        validation: (value, required) => {
          if (required && value == '')
            return 'Please enter a value.'
          let reg = /^\d+$/
          if (reg.test(value.trim()) == false)
            return 'Please enter a valid number.'
          if (value.length > 4)
            return 'The part count number must be less than 4 characters.'
          return null
        }
      },
      {
        type: 'textfield',
        label: 'Project Title',
        id: 'projectTitle',
        required: false, //NEED TO UPDATE BASED ON PREVIOUS SELECTIONS
        validation: (value, required) => {
          if (required && value == '')
            return 'Please enter a value.'
          if (value.length > 30)
            return 'The project title name must be less than 30 characters.'
          return null
        }
      },
      {
        type: 'select',
        label: 'Priority',
        id: 'priority',
        options: ['Select...','Low','High'],
        required: true,
        validation: (value, required) => {
          if (required && value == '')
            return 'Please select a priority.'
          return null
        }
      },
      {
        type: 'textarea',
        label: 'Description',
        id: 'description',
        required: false,
        validation: (value, required) => {
          if (required && value == '')
            return 'Please enter a value.'
          if (value.length > 100)
            return 'The description must be less than 100 characters.'
          return null
        }
      },
      {
        type: 'textfield',
        label: 'Reference Number',
        id: 'referenceNumber',
        required: false,
        validation: (value, required) => {
          if (required && value == '')
            return 'Please enter a value.'
          if (value.length > 30)
            return 'The reference number must be less than 30 characters.'
          return null
        }
      },
    ]
    let primaryOnClick = (fields) => console.log('CREATE with', fields)
    let secondaryButton = null
    if (this.props.edit){
      // Change onClick functionality for primary
      primaryOnClick = (fields) => console.log('EDIT with', fields)
      // Add secondaryButton for form to cancel
      secondaryButton = {
        title: 'Cancel',
        onClick: () => {
          console.log('Cancel editing,')
          this.props.page.projectsMenuItem()
        }
      }
    }
    this.props.page.setFormModel(new FormModel(fields,
      {
        title: 'Continue',
        onClick: primaryOnClick
      },
      secondaryButton
    ))
    // If this.props.edit, update model default field values with this.props.website.currentProject
  }

  render() {
    return (
      <Form/>
    )
  }
}
