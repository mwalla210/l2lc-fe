import { useStrict, action } from 'mobx'
import autoBind from 'auto-bind'
import FormModel from './formModel'
import Website from '../store/website'
import Consts from '../consts'
useStrict(true)

/**
  * @name CustomerFormModel
  * @class CustomerFormModel
  * @classdesc Customer initializer for form storage object
  * @description Creates fields, sets correct onClick
  * @property {Function} onClickNav Page navigation function for successful form submission
  * @extends FormModel
 */
export default class CustomerFormModel extends FormModel{
  constructor(onClickNav, onCancelNav, errorClick) {
    let primaryOnClick = () => {}
    super(Consts.customerFields,
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
    this.fields = Consts.customerFields
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
          country: valueReturn('country').trim(),
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
          country: valueReturn('billingCountry').trim(),
          zip: valueReturn('billingZipCode').trim()
        }
      Website.createCustomer(body)
      .then((response) => {
        if(response == null){
          this.onClickNav()
        } else {
          this.setError(response)
          this.openModal()
        }
      })
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
