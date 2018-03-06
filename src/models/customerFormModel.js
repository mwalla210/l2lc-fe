import { useStrict, action } from 'mobx'
import autoBind from 'auto-bind'
import FormModel from './formModel'
import Website from '../store/website'
useStrict(true)

const fields = [
  {
    type: 'textfield',
    label: 'Company Name',
    id: 'companyName',
    required: true,
    disabled: false,
    validation: (value, required) => {
      if (required && value == '')
        return 'Please enter a value.'
      if (value.length > 30)
        return 'The company name must be less than 30 characters.'
      return null
    }
  },
  {
    type: 'textfield',
    label: 'Email Address',
    id: 'emailAddress',
    required: true,
    disabled: false,
    validation: (value, required) => {
      if (required && value == '')
        return 'Please enter a value.'
      let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
      if (value.length > 0 && reg.test(value) == false)
        return 'Please enter a valid email address.'
      if (value.length > 30)
        return 'The email address must be less than 30 characters.'
      return null
    }
  },
  {
    type: 'textfield',
    label: 'Phone Number',
    id: 'phoneNumber',
    required: true,
    disabled: false,
    validation: (value, required) => {
      if (required && value == '')
        return 'Please enter a phone number.'
      if (value.length < 10) //could of put a regex here but international numbers have different formats
        return 'The phone number is too short.'
      return null
    }
  },
  {
    type: 'textfield',
    label: 'Website',
    id: 'websiteLink',
    required: false,
    disabled: false,
    validation: (value, required) => {
      if (required && value == '')
        return 'Please enter a value.'
      let reg = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/
      if (value.length > 0 && reg.test(value) == false)
        return 'Please enter a valid website address.'
      if (value.length > 50)
        return 'The website address must be less than 50 characters.'
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
    validation: (value, required) => {
      if (required && value == '')
        return 'Please select a region.'
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
    validation: (value, required) => {
      if (required && value == '')
        return 'Please enter a value.'
      if (value.length > 30)
        return 'The country name must be less than 30 characters.'
      return null
    }
  },
  {
    type: 'textfield',
    label: 'Address Line 1',
    id: 'addressLine1',
    required: true,
    disabled: false,
    validation: (value, required) => {
      if (required && value == '')
        return 'Please enter a value.'
      if (value.length > 30)
        return 'The address must be less than 30 characters.'
      return null
    }
  },
  {
    type: 'textfield',
    label: 'Address Line 2',
    id: 'addressLine2',
    required: false,
    disabled: false,
    validation: (value, required) => {
      if (required && value == '')
        return 'Please enter a value.'
      if (value.length > 30)
        return 'The address must be less than 30 characters.'
      return null
    }
  },
  {
    type: 'textfield',
    label: 'City',
    id: 'city',
    required: true,
    disabled: false,
    validation: (value, required) => {
      if (required && value == '')
        return 'Please enter a value.'
      if (value.length > 30)
        return 'The city name must be less than 30 characters.'
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
    validation: (value, required) => {
      if (required && value == '')
        return 'Please select the state.'
      return null
    }
  },
  {
    type: 'textfield',
    label: 'Zip Code',
    id: 'zipCode',
    required: true,
    disabled: false,
    validation: (value, required) => {
      if (required && value == '')
        return 'Please enter a value.'
      if (value.length > 10)
        return 'The zip code must be less than 10 characters.'
      return null
    }
  },
  {
    type: 'checkbox',
    label: 'Billing address is same as shipping',
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
    disabled: false,
    validation: (value, required) => {
      if (required && value == '')
        return 'Please select a region.'
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
    disabled: false,
    validation: (value, required) => {
      if (required && value == '')
        return 'Please enter a value.'
      if (value.length > 30)
        return 'The country name must be less than 30 characters.'
      return null
    }
  },
  {
    type: 'textfield',
    label: 'Address Line 1',
    id: 'billingAddressLine1',
    required: false,
    disabled: false,
    validation: (value, required) => {
      if (required && value == '')
        return 'Please enter a value.'
      if (value.length > 30)
        return 'The address must be less than 30 characters.'
      return null
    }
  },
  {
    type: 'textfield',
    label: 'Address Line 2',
    id: 'billingAddressLine2',
    required: false,
    disabled: false,
    validation: (value, required) => {
      if (required && value == '')
        return 'Please enter a value.'
      if (value.length > 30)
        return 'The address must be less than 30 characters.'
      return null
    }
  },
  {
    type: 'textfield',
    label: 'City',
    id: 'billingCity',
    required: false,
    disabled: false,
    validation: (value, required) => {
      if (required && value == '')
        return 'Please enter a value.'
      if (value.length > 30)
        return 'The city name must be less than 30 characters.'
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
    disabled: false,
    validation: (value, required) => {
      if (required && value == '')
        return 'Please select the state.'
      return null
    }
  },
  {
    type: 'textfield',
    label: 'Zip Code',
    id: 'billingZipCode',
    required: false,
    disabled: false,
    validation: (value, required) => {
      if (required && value == '')
        return 'Please enter a value.'
      if (value.length > 10)
        return 'The zip code must be less than 10 characters.'
      return null
    }
  }
]

/**
  * @name CustomerFormModel
  * @class CustomerFormModel
  * @classdesc Customer initializer for form storage object
  * @description Creates fields, sets correct onClick
  * @property {Function} onClickNav Page navigation function for successful form submission
 */
export default class CustomerFormModel extends FormModel{
  constructor(onClickNav, onCancelNav, errorClick) {
    let primaryOnClick = () => {}
    super(fields,
      {
        title: 'Continue',
        onClick: primaryOnClick
      },
      {
        title: 'Cancel',
        onClick: onCancelNav
      },
      null,
      null,
      errorClick
    )
    this.onClickNav = onClickNav
    autoBind(this)
    this.primaryButton.onClick = this.newButton()
  }
  /**
   * @name resetFields
   * @description Sets all fields back to defaults
   * @method resetFields
   * @memberof CustomerFormModel.prototype
   * @mobx action
   */
  @action resetFields(){
    this.fields = fields
  }
  /**
   * @name editButton
   * @description Returns function for onClick of primary button when editing
   * @method editButton
   * @return {Function}
   * @memberof CustomerFormModel.prototype
   */
  editButton(){
    // Change onClick functionality for primary
    return (fields) => console.log('EDIT with', fields)
  }
  /**
   * @name newButton
   * @description Returns function for onClick of primary button when creating
   * @method newButton
   * @return {Function}
   * @memberof CustomerFormModel.prototype
   */
  newButton(){
    return (fields) => {
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
        name: valueReturn('companyName').trim(),
        email: valueReturn('emailAddress').trim(),
        website: valueReturn('websiteLink').trim(),
        shippingAddr: {
          street: `${valueReturn('addressLine1').trim()} ${valueReturn('addressLine2').trim()}`.trim(),
          city: valueReturn('city').trim(),
          state: valueReturn('state').trim(),
          country: valueReturn('region').trim(),
          zip: valueReturn('zipCode').trim()
        },
        isPastDue: false,
        phoneNumber: valueReturn('phoneNumber').trim(),
      }
      if (valueReturn('enableShippingAddress'))
        body.billingAddr = body.shippingAddr
      else
        body.billingAddr = {
          street: `${valueReturn('billingAddressLine1').trim()} ${valueReturn('billingAddressLine2').trim()}`.trim(),
          city: valueReturn('billingCity').trim(),
          state: valueReturn('billingState').trim(),
          country: valueReturn('billingRegion').trim(),
          zip: valueReturn('billingZipCode').trim()
        }
      Website.createCustomer(body)
      .then(() => this.onClickNav())
    }
  }

  /**
   * @name setEdit
   * @description Modifies primary button click, initializes field values as editing values corresponding to currentCustomer
   * @method setEdit
   * @memberof CustomerFormModel.prototype
   * @mobx action
   */
  @action setEdit(){
    this.primaryButton.onClick = this.editButton()
    this.resetFields()
    // Update fields with values corresponding to currentCustomer
    console.log(Website.currentCustomer)
  }
  /**
   * @name setNonEdit
   * @description Modifies primary button click, initializes field values as default values
   * @method setNonEdit
   * @memberof CustomerFormModel.prototype
   * @mobx action
   */
  @action setNonEdit(){
    this.primaryButton.onClick = this.newButton()
    this.resetFields()
  }
  /**
   * @name setOnClickNav
   * @description Modifies primary button click
   * @method setOnClickNav
   * @memberof CustomerFormModel.prototype
   * @mobx action
   */
  @action setOnClickNav(newOnClick){
    this.onClickNav = newOnClick
  }
}
