import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { observer, inject } from 'mobx-react'
import Form from './form'
import FormModel from '../models/formModel'

@inject ('page', 'website') @observer
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
        validation: (value) => {
          if (value == 'Select...')
            return 'Error: you must select a cost center.'
          return null
        }
      },
      {
        type: 'select',
        label: 'Project Type',
        id: 'projectType',
        options: ['Select...','based on cost center selected'],
        required: true,
        validation: (value) => {
          if (value == 'Select...')
            return 'Error: you must select a project type.'
          return null
        }
      },
      {
        type: 'textfield',
        label: 'Part Count',
        id: 'partCount',
        required: true,
        validation: (value) => {
          let reg = /^\d+$/
          if (reg.test(value.trim()) == false)
            return 'Error: please enter a valid number.'
          else if (value.length > 4)
            return 'Error: the part count number is too large.'
          return null
        }
      },
      {
        type: 'textfield',
        label: 'Project Title',
        id: 'projectTitle',
        required: false, //NEED TO UPDATE BASED ON PREVIOUS SELECTIONS
        validation: (value) => {
          if (value.trim() == '')
            return 'Error: please enter a project title.'
          else if (value.length > 30)
            return 'Error: the project title name is too long.'
          return null
        }
      },
      {
        type: 'select',
        label: 'Priority',
        id: 'priority',
        options: ['Select...','Low','High'],
        required: true,
        validation: (value) => {
          if (value == 'Select...')
            return 'Error: you must select a priority.'
          return null
        }
      },
      {
        type: 'textarea',
        label: 'Description',
        id: 'description',
        required: false,
        validation: (value) => {
          if (value.length > 100)
            return 'Error: the description is too long.'
          return null
        }
      },
      {
        type: 'textfield',
        label: 'Reference Number',
        id: 'referenceNumber',
        required: false,
        validation: (value) => {
          if (value.length > 30)
            return 'Error: the reference number is too long.'
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
