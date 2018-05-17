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
  * @param {Function} onClickNav Page navigation function for successful form submission
  * @param {Function} onCancelNav Page navigation function for cancelled form submission
  * @param {Function} errorClick Page navigation function for error modal confirmation click
  * @extends FormModel
 */
export default class CustomerFormModel extends FormModel{
  constructor(onClickNav, onCancelNav, errorClick) {
    let primaryOnClick = null
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
   * @name editButton
   * @description Returns function for onClick of primary button when editing
   * @method editButton
   * @return {Function}
   * @memberof CustomerFormModel.prototype
   */
  editButton(){
    // Change onClick functionality for primary
    return (fields) => {
      let body = this.parseForm(fields)
      Website.updateCustomer(Website.currentCustomer.id, body)
      .then(response => {
        if(response == null){
          this.onClickNav()
        }
        else {
          this.setError(response)
          this.openModal()
        }
      })
    }
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
      let body = this.parseForm(fields)
      Website.createCustomer(body)
      .then((response) => {
        if(response == null){
          this.onClickNav()
        }
        else {
          this.setError(response)
          this.openModal()
        }
      })
    }
  }

  /**
   * @name parseForm
   * @description Returns body for use with POST
   * @method parseForm
   * @return {Function}
   * @memberof CustomerFormModel.prototype
   */
  parseForm(fields){
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
      email: valueReturn('email').trim(),
      website: valueReturn('website').trim(),
      shippingAddr: {
        street: `${valueReturn('shipAddr1').trim()}, ${valueReturn('shipAddr2').trim()}`.trim(),
        city: valueReturn('shipCity').trim(),
        state: valueReturn('shipState').trim(),
        country: valueReturn('shipCountry').trim(),
        zip: valueReturn('shipZip').trim()
      },
      isPastDue: false,
      phoneNumber: valueReturn('phone').trim(),
    }
    if (valueReturn('billIsSame'))
      body.billingAddr = body.shippingAddr
    else
      body.billingAddr = {
        street: `${valueReturn('billAddr1').trim()}, ${valueReturn('billAddr2').trim()}`.trim(),
        city: valueReturn('billCity').trim(),
        state: valueReturn('billState').trim(),
        country: valueReturn('billCountry').trim(),
        zip: valueReturn('billZip').trim()
      }
    return body
  }

  /**
   * @name setEdit
   * @description Modifies primary button click, calls modifyFieldValue to set values as editing values corresponding to currentCustomer and handle any onUpdate functions needed
   * @method setEdit
   * @memberof CustomerFormModel.prototype
   * @mobx action
   */
  @action setEdit(){
    this.primaryButton.onClick = this.editButton()
    this.resetValues()
    // Update fields with values corresponding to currentCustomer
    this.fields.forEach((fieldObj, index) => {
      let value
      if (!Website.currentCustomer.hasOwnProperty(fieldObj.id)){
        if (fieldObj.id.includes('bill'))
          value = (Website.currentCustomer.billAddr[fieldObj.id])
        else
          value = Website.currentCustomer.shipAddr[fieldObj.id]
      }
      else
        value = Website.currentCustomer[fieldObj.id]
      if (value != null && value != undefined && value != '')
        this.modifyFieldValue(index, value)
    })
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
    this.resetValues()
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
