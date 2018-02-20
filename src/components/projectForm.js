import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { observer, inject } from 'mobx-react'
import Form from './form'
import FormModel from '../models/formModel'

@inject ('page', 'website') @observer
export default class CustomerForm extends Component {
  static propTypes = {
    edit: PropTypes.bool
  }

  static defaultProps = {
    edit: false
  }

  constructor(props){
    super(props)
    let fields = []
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
