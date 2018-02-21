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
        required: true,
        disabled: false,
        validation: (value) => {
          if (value.trim() == '')
            return 'Error: please enter a company name.'
          else if (value.length > 30)
            return 'Error: the company name is too long.'
          return null
        }
      },
      {
        type: 'textfield',
        label: 'Email Address',
        id: 'emailAddress',
        required: true,
        disabled: false,
        validation: (value) => {
          let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
          if (reg.test(value.trim()) == false)
            return 'Error: please enter a valid email address.'
          else if (value.length > 30)
            return 'Error: the email address is too long.'
          return null
        }
      },
      {
        type: 'textfield',
        label: 'Phone Number',
        id: 'phoneNumber',
        required: true,
        disabled: false,
        validation: (value) => {
          if (value.trim() == '')
            return 'Error: please enter a phone number.'
          else if (value.length < 10) //could of put a regex here but international numbers have different formats
            return 'Error: the phone number is too short.'
          return null
        }
      },
      {
        type: 'textfield',
        label: 'Website',
        id: 'websiteLink',
        required: false,
        disabled: false,
        validation: (value) => {
          let reg = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/
          if (reg.test(value.trim()) == false)
            return 'Error: please enter a valid website address.'
          else if (value.length > 50)
            return 'Error: the website address is too long.'
          return null
        }
      },
      {
        type: 'select',
        label: 'Region',
        id: 'region',
        options: ['Select...','United States','Canada','Mexico','Europe','Asia','Africa'],
        required: true,
        disabled: false,
        validation: (value) => {
          if (value == 'Select...')
            return 'Error: you must select a region.'
          return null
        },
        onUpdate: (value) => {
          if (value == 'United States'){
            return [
              {
                id: 'country',
                required: false,
                disabled: true
              },
              {
                id: 'state',
                options: ['Select...','Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado',
                  'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois',
                  'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland',
                  'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana',
                  'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
                  'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
                  'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah',
                  'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'],
                required: true,
                disabled: false
              },
              {
                id: 'zipCode',
                required: true,
                disabled: false
              }
            ]
          }
          return [
            {
              id: 'country',
              required: true,
              disabled: false
            },
            {
              id: 'state',
              options: ['Not Applicable'],
              required: false,
              disabled: true
            },
            {
              id: 'zipCode',
              required: false,
              disabled: false
            }
          ]
        }
      },
      {
        type: 'textfield',
        label: 'Country',
        id: 'country',
        required: false,
        disabled: false,
        validation: (value) => {
          if (value.trim() == '')
            return 'Error: please enter the country name.'
          else if (value.length > 30)
            return 'Error: the country name is too long.'
          return null
        }
      },
      {
        type: 'textfield',
        label: 'Address Line 1',
        id: 'adressLine1',
        required: true,
        disabled: false,
        validation: (value) => {
          if (value.trim() == '')
            return 'Error: please enter the address.'
          else if (value.length > 30)
            return 'Error: the address is too long.'
          return null
        }
      },
      {
        type: 'textfield',
        label: 'Address Line 2',
        id: 'adressLine2',
        required: false,
        disabled: false,
        validation: (value) => {
          if (value.length > 30)
            return 'Error: the address is too long.'
          return null
        }
      },
      {
        type: 'textfield',
        label: 'City',
        id: 'city',
        required: true,
        disabled: false,
        validation: (value) => {
          if (value.trim() == '')
            return 'Error: please enter the city.'
          else if (value.length > 30)
            return 'Error: the city name is too long.'
          return null
        }
      },
      {
        type: 'select',
        label: 'State',
        id: 'state',
        options: ['Select...','Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado',
          'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois',
          'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland',
          'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana',
          'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
          'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
          'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah',
          'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'],
        required: true,
        disabled: false,
        validation: (value) => {
          if (value.trim() == 'Select...')
            return 'Error: please select the state.'
          return null
        }
      },
      {
        type: 'textfield',
        label: 'Zip Code',
        id: 'zipCode',
        required: true,
        disabled: false,
        validation: (value) => {
          if (value.trim() == '')
            return 'Error: please enter the zip code.'
          else if (value.length > 10)
            return 'Error: the zip code is too long.'
          return null
        }
      },
      {
        type: 'checkbox',
        label: 'Billing Address is the SAME as the Shipping Address',
        id: 'enableShippingAddress',
        required: false,
        validation: null,
        onUpdate: (value) => {
          if (value){
            return [
              {
                id: 'billingRegion',
                required: false,
                disabled: true
              },
              {
                id: 'billingCountry',
                required: false,
                disabled: true
              },
              {
                id: 'billingAddressLine1',
                required: false,
                disabled: true
              },
              {
                id: 'billingAddressLine2',
                required: false,
                disabled: true
              },
              {
                id: 'billingCity',
                required: false,
                disabled: true
              },
              {
                id: 'billingState',
                required: false,
                disabled: true
              },
              {
                id: 'billingZipCode',
                required: false,
                disabled: true
              },
            ]
          }
          return [
            {
              id: 'billingRegion',
              required: true,
              disabled: false
            },
            {
              id: 'billingCountry',
              required: false,
              disabled: false
            },
            {
              id: 'billingAddressLine1',
              required: true,
              disabled: false
            },
            {
              id: 'billingAddressLine2',
              required: false,
              disabled: false
            },
            {
              id: 'billingCity',
              required: true,
              disabled: false
            },
            {
              id: 'billingState',
              required: true,
              disabled: false
            },
            {
              id: 'billingZipCode',
              required: true,
              disabled: false
            },
          ]
        }
      },
      {
        type: 'select',
        label: 'Region',
        id: 'billingRegion',
        options: ['Select...','United States','Canada','Mexico','Europe','Asia','Africa'],
        required: false,
        disabled: true,
        validation: (value) => {
          if (value == 'Select...')
            return 'Error: you must select a region.'
          return null
        },
        onUpdate: (value) => {
          if (value !== 'United States'){
            return [
              {
                id: 'billingCountry',
                required: true,
                disabled: false
              },
              {
                id: 'billingAddressLine1',
                required: true,
                disabled: false
              },
              {
                id: 'billingAddressLine2',
                required: false,
                disabled: false
              },
              {
                id: 'billingCity',
                required: true,
                diabled: false
              },
              {
                id: 'billingState',
                options: ['Not Applicable'],
                required: false,
                disabled: true
              },
              {
                id: 'billingZipCode',
                required: false,
                disabled: false
              }
            ]
          }
          if (value == 'United States'){
            return [
              {
                id: 'billingCountry',
                required: false,
                disabled: true
              },
              {
                id: 'billingAddressLine1',
                required: true,
                disabled: false
              },
              {
                id: 'billingAddressLine2',
                required: false,
                disabled: false
              },
              {
                id: 'billingCity',
                required: true,
                diabled: false
              },
              {
                id: 'billingState',
                options: ['Select...','Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado',
                  'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois',
                  'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland',
                  'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana',
                  'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
                  'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
                  'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah',
                  'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'],
                required: true,
                disabled: false
              },
              {
                id: 'billingZipCode',
                required: true,
                disabled: false
              }
            ]
          }
        }
      },
      {
        type: 'textfield',
        label: 'Country',
        id: 'billingCountry',
        required: false,
        disabled: true,
        validation: (value) => {
          if (value.length > 30)
            return 'Error: the country name is too long.'
          return null
        }
      },
      {
        type: 'textfield',
        label: 'Address Line 1',
        id: 'billingAddressLine1',
        required: false,
        disabled: true,
        validation: (value) => {
          if (value.trim() == '')
            return 'Error: please enter the address.'
          else if (value.length > 30)
            return 'Error: the address is too long.'
          return null
        }
      },
      {
        type: 'textfield',
        label: 'Address Line 2',
        id: 'billingAddressLine2',
        required: false,
        disabled: true,
        validation: (value) => {
          if (value.length > 30)
            return 'Error: the address is too long.'
          return null
        }
      },
      {
        type: 'textfield',
        label: 'City',
        id: 'billingCity',
        required: false,
        disabled: true,
        validation: (value) => {
          if (value.length > 30)
            return 'Error: the city name is too long.'
          return null
        }
      },
      {
        type: 'select',
        label: 'State',
        id: 'billingState',
        options: ['Select...','Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado',
          'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois',
          'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland',
          'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana',
          'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
          'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
          'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah',
          'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'],
        required: false,
        disabled: true,
        validation: (value) => {
          if (value.trim() == 'Select...')
            return 'Error: please select the state.'
          return null
        }
      },
      {
        type: 'textfield',
        label: 'Zip Code',
        id: 'billingZipCode',
        required: false,
        disabled: true,
        validation: (value) => {
          if (value.trim() == '')
            return 'Error: please enter the zip code.'
          else if (value.length > 10)
            return 'Error: the zip code is too long.'
          return null
        }
      }
    ]
    let primaryOnClick = (fields) => console.log('CREATE with', fields)
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
    // If this.props.edit, update model default field values with this.props.website.currentCustomer
  }

  render() {
    return (
      <Form/>
    )
  }
}
