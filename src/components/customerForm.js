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
    let fields = [
      {
        type: 'textfield',
        label: 'Company Name',
        id: 'companyName',
        required: true
      },
      {
        type: 'textfield',
        label: 'Email Address',
        id: 'emailAddress',
        required: true
      },
      {
        type: 'textfield',
        label: 'Phone Number',
        id: 'phoneNumber',
        required: true
      },
      {
        type: 'textfield',
        label: 'Website',
        id: 'websiteLink',
        required: false
      },
      {
        type: 'select',
        label: 'Region',
        id: 'region',
        options: ['Select...','United States','Canada','Mexico','Europe','Asia','Africa'],
        required: true
      },
      {
        type: 'textfield',
        label: 'Country',
        id: 'country',
        required: false //NEED TO UPDATE DEPENDING ON SELECTED REGION
      },
      {
        type: 'textfield',
        label: 'Address Line 1',
        id: 'adressLine1',
        required: true
      },
      {
        type: 'textfield',
        label: 'Address Line 2',
        id: 'adressLine2',
        required: false
      },
      {
        type: 'textfield',
        label: 'City',
        id: 'city',
        required: true
      },
      {
        type: 'select',
        label: 'State',
        id: 'State',
        options: ['Select...','Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado',
          'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois',
          'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland',
          'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana',
          'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
          'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
          'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah',
          'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'],
        required: false //NEED TO UPDATE DEPENDING ON SELECTED REGION
      },
      {
        type: 'textfield',
        label: 'Zip Code',
        id: 'zipCode',
        required: false //NEED TO UPDATE DEPENDING ON SELECTED REGION; SOME COUNTRIES DONT HAVE ZIP CODES
      },
      {
        type: 'checkbox',
        label: 'Billing Address is NOT the same as the Shipping Address',
        id: 'enableShippingAddre',
        required: false
      },
      {
        type: 'textfield',
        label: 'Address Line 1',
        id: 'adressLine1',
        required: false
      },
      {
        type: 'textfield',
        label: 'Address Line 2',
        id: 'adressLine2',
        required: false
      },
      {
        type: 'textfield',
        label: 'City',
        id: 'city',
        required: false
      },
      {
        type: 'textfield',
        label: 'State',
        id: 'state',
        required: false
      },
      {
        type: 'textfield',
        label: 'Country',
        id: 'country',
        required: false
      },
      {
        type: 'textfield',
        label: 'Zip Code',
        id: 'zipCode',
        required: false
      }
    ]
    this.props.page.setFormModel(new FormModel(fields,
      {
        title: 'Continue',
        onClick: () => console.log('onClick')
      },
      {
        title: 'Cancel',
        onClick: () => console.log('onClick')
      }
    ))
    // If this.props.edit, update model default field values with this.props.website.currentCustomer
  }

  render() {
    return (
      <Form/>
    )
  }
}
