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
        id: 'costCenter',
        options: ['Select...','APC','Decorative','Maintenance','Administration','Production','Research and Development','Other'],
        required: true,
        disabled: false,
        validation: (value, required) => {
          if (required && value == '')
          return 'Please select a cost center.'
          return null
        },
        onUpdate: (value) => {
          if (value == 'APC'){
            return [
              {
                id: 'projectType',
                options: ['Select...','Piston', 'Turbo', 'Rotor', 'Pump', 'Avaslick', 'Specialty'],
                required: true,
                disabled: false
              },
              {
                id: 'partCount',
                required: true,
                disabled: false
              }
            ]
          }
          if (value == 'Decorative'){
            return [
              {
                id: 'projectType',
                options: ['Select...','Decorative'],
                required: true,
                disabled: false
              },
              {
                id: 'partCount',
                required: true,
                disabled: false
              },
              {
                id: 'projectTitle',
                required: true,
                disabled: false
              }
            ]
          }
          if (value == 'Maintenance'){
            return [
              {
                id: 'projectType',
                options: ['Select...','Maintenance'],
                required: true,
                disabled: false
              },
              {
                id: 'projectTitle',
                required: true,
                disabled: false
              }
            ]
          }
          if (value == 'Administration'){
            return [
              {
                id: 'projectType',
                options: ['Select...','ISO','Other'],
                required: true,
                disabled: false
              },
              {
                id: 'projectTitle',
                required: true,
                disabled: false
              }
            ]
          }
          if (value == 'Research and Development'){
            return [
              {
                id: 'projectType',
                options: ['Select...','Research and Development'],
                required: true,
                disabled: false
              },
              {
                id: 'projectTitle',
                required: true,
                disabled: false
              }
            ]
          }
          if (value == 'Production'){
            return [
              {
                id: 'projectType',
                options: ['Select...','Production'],
                required: true,
                disabled: false
              },
              {
                id: 'projectTitle',
                required: true,
                disabled: false
              }
            ]
          }
          if (value == 'Other'){
            return [
              {
                id: 'projectType',
                options: ['Select...','Other'],
                required: true,
                disabled: false
              },
              {
                id: 'projectTitle',
                required: true,
                disabled: false
              }
            ]
          }
        }
      },
      {
        type: 'select',
        label: 'Project Type',
        id: 'projectType',
        options: ['Select...','Piston', 'Turbo', 'Rotor', 'Pump', 'Avaslick', 'Specialty', 'Decorative', 'Maintenance', 'ISO', 'Production', 'Research and Development', 'Other'],
        required: true,
        disabled: false,
        validation: (value, required) => {
          if (required && value == '')
          return 'Please select a project type.'
          return null
        },
        onUpdate: (value) => {
          if (value == 'Avaslick' || value == 'Specialty'){
            return [
              {
                id: 'projectTitle',
                required: true,
                disabled: false
              }
            ]
          }
        }
      },
      {
        type: 'textfield',
        label: 'Part Count',
        id: 'partCount',
        required: false,
        disabled: false,
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
        required: false,
        disabled: false,
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
        disabled: false,
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
        disabled: false,
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
        disabled: false,
        validation: (value, required) => {
          if (required && value == '')
          return 'Please enter a value.'
          if (value.length > 30)
          return 'The reference number must be less than 30 characters.'
          return null
        }
      },
    ]
    let primaryOnClick = (fields) => {
      let valueReturn = (id) => {
        let val
        fields.forEach(item => {
          if (item.id == id){
            val = item.value
          }
        })
        return val
      }
      let body = {
        jobType: valueReturn('projectType').trim(),
        costCenter: valueReturn('costCenter').trim(),
        title: valueReturn('projectTitle').trim(),
        description:valueReturn('description').trim(),
        priority: valueReturn('priority').trim(),
        partCount: valueReturn('partCount').trim(),
        refNumber: valueReturn('referenceNumber').trim(),
        customer: {
          id: '1'
        }
      }
      if (valueReturn('costCenter').trim() == 'APC' || valueReturn('costCenter').trim() == 'Decorative'){
        this.props.website.createProject(body)
        .then(() => this.props.page.selectCustomerPage())
      }
      else {
        this.props.website.createProject(body)
        .then(() => this.props.page.projectSummaryPage())
      }
    }
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
