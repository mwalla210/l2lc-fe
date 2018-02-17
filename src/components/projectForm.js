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
    this.props.page.setFormModel(new FormModel(fields,
      {
        title: 'Continue',
        onClick: () => console.log('onClick')
      }
    ))
    // If this.props.edit, update model default field values with this.props.website.currentProject
  }

  render() {
    return (
      <Form/>
    )
  }
}
