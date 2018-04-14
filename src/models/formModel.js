import { action, computed, useStrict, extendObservable } from 'mobx'
import autoBind from 'auto-bind'
useStrict(true)

/**
  * @name FormModel
  * @class FormModel
  * @classdesc Form storage object
  * @description Sets default values for each field item
  * @property {Object[]} fields Type of fields for the form [observable]
  * @property {Object} primaryButton Forms primary button properties
  * @property {String} primaryButton.title Forms primary button title
  * @property {Function} primaryButton.onClick Forms primary button onClick
  * @property {Object} [secondaryButton] Forms secondary button properties
  * @property {String} secondaryButton.title Forms secondary button title
  * @property {Function} secondaryButton.onClick Forms secondary button onClick
  * @property {Boolean} autoSubmit Forms auto-submit boolean
  * @property {Function} onChange Form's function to handle ANY field updates (time entry only usage)
  * @property {Function} errorClick Form's function to handle clicking of form error modal confirmation
  * @property {Boolean} [modalOpen=false] Form's indicator for whether error modal is open [observable]
  * @property {String} [errorResponse=''] Form's string field to hold error text passed in from website [observable]
 */
export default class FormModel {
  constructor(fields, primaryButton, secondaryButton, autoSubmit, onChange, errorClick) {
    fields.forEach(field => {
      let value = null
      switch (field.type){ // default value
        case 'select':
        case 'textfield':
        case 'textarea':
          value = ''
          break
        case 'checkbox':
          value = false
          break
      }
      field.value = value
      field.isValid = true
      field.errorText = ''
      // Set if not present
      if (!field.disabled)
        field.disabled = false
    })
    let addtlProps = {
      fields,
      modalOpen: false,
      errorResponse: ''
    }
    extendObservable(this, addtlProps)
    // non-observable properties
    this.primaryButton = primaryButton
    this.secondaryButton = secondaryButton
    this.autoSubmit = autoSubmit
    this.onChange = onChange
    this.errorClick = errorClick
    autoBind(this)
  }

  /**
   * @name setError
   * @description Sets errorResponse prop to value of text
   * @method setError
   * @memberof FormModel.prototype
   * @property {String} text The error modal's content
   * @mobx action
   */
   @action setError(text){this.errorResponse = text}

  /**
   * @name closeModal
   * @description Sets modalOpen prop to false
   * @method closeModal
   * @memberof FormModel.prototype
   * @mobx action
   */
  @action closeModal(){this.modalOpen = false}
  /**
   * @name openModal
   * @description Sets modalOpen prop to true
   * @method openModal
   * @memberof FormModel.prototype
   * @mobx action
   */
  @action openModal(){this.modalOpen = true}
  /**
   * @name confirmAndClose
   * @description Closes modal and runs confirm function
   * @method confirmAndClose
   * @memberof FormModel.prototype
   * @mobx action
   */
  @action confirmAndClose(){
    this.closeModal()
    if(this.errorClick){
      this.errorClick()
    }
  }

  /**
   * @name resetValues
   * @description Resets field values to defaults
   * @method resetValues
   * @memberof FormModel.prototype
   * @mobx action
   */
  @action resetValues(){
    this.fields.forEach(field => {
      this.resetValueID(field.id)
    })
  }
  /**
   * @name resetValueID
   * @description Resets field value to default based on field ID
   * @method resetValueID
   * @memberof FormModel.prototype
   * @property {Number} id The field index to reset
   * @mobx action
   */
  @action resetValueID(id){
    let index = this.fields.findIndex(element => {return element.id == id})
    this.resetValueIndex(index)
  }
  /**
   * @name resetValueIndex
   * @description Resets field value to default based on field ID
   * @method resetValueIndex
   * @memberof FormModel.prototype
   * @property {Number} index The field index
   * @mobx action
   */
  @action resetValueIndex(index){
    let value = null
    switch (this.fields[index].type){
      case 'select':
      case 'textfield':
      case 'textarea':
        value = ''
        break
      case 'checkbox':
        value = false
        break
    }
    this.fields[index].value = value
  }
  /**
   * @name buttonDisabled
   * @description Calculating button disabled state
   * @memberof FormModel.prototype
   * @method buttonDisabled
   * @return {Boolean}
   * @mobx computed
   */
  @computed get buttonDisabled(){
    let disabled = false
    this.fields.forEach(field => {
      if(!field.isValid){
        disabled = true
      }
      if(field.required){
        switch (field.type){
          case 'textfield':
          case 'textarea':
          case 'select':
            if(field.value.trim() == '')
              disabled = true
            break
        }
      }
    })
    return disabled
  }
  /**
   * @name primaryButtonWrapper
   * @description Wrapper func for the primary button's onClick
   * @memberof FormModel.prototype
   * @method primaryButtonWrapper
   */
  primaryButtonWrapper(){
    this.primaryButton.onClick(this.fields)
  }
  /**
   * @name modifyFieldValue
   * @description Updating the fields value and checks the fields onUpdate (if any)
   * @memberof FormModel.prototype
   * @method modifyFieldValue
   * @property {Number} index The field index
   * @property {String} value The field value
   * @mobx action
   */
  @action modifyFieldValue(index, value){
    let priorVal = value
    // If we have special field modification checks (time entry)
    if (this.onChange){
      // Will return null if no changes to be made
      let newindex = this.onChange(this.fields,index,value)
      if (newindex != null){
        // Clear field that was previously being updated
        this.resetValueIndex(index)
        // Set index for updates to one found above
        index = newindex
        // Strip value of special character
        value = value.replace(/\W/g, '')
      }
    }
    // Update field with value
    this.fields[index].value = value
    // If we need to update the field properties due to a change
    if (this.fields[index].onUpdate){
      let updates = this.fields[index].onUpdate(this.fields[index].value)
      updates.forEach(update => {
        let fieldIndex = this.fields.findIndex(field => {return field.id == update.id})
        if(update.hasOwnProperty('required')){
          this.fields[fieldIndex].required = update.required
        }
        if(update.hasOwnProperty('options')){
          this.fields[fieldIndex].options = update.options
        }
        if(update.hasOwnProperty('disabled')){
          this.fields[fieldIndex].disabled = update.disabled
        }
      })
    }
    // If we need to auto submit the form
    if (this.autoSubmit && priorVal && priorVal.includes('%')){
      this.autoSubmitter()
    }
  }
  /**
   * @name autoSubmitter
   * @description Auto submit function for forms
   * @memberof FormModel.prototype
   * @method autoSubmitter
   */
  autoSubmitter(){
    this.fields.forEach((item, index) => {
      if (item.value.trim() != '')
        this.fieldValidatorWrapper(index)
    })
    if(!this.buttonDisabled && this.autoSubmit){
      this.primaryButtonWrapper()
    }
  }
  /**
   * @name fieldValidatorWrapper
   * @description Wrapper func for field validation
   * @memberof FormModel.prototype
   * @method fieldValidatorWrapper
   * @property {Number} index The field index
   * @mobx action
   */
   @action fieldValidatorWrapper(index){
    if (this.fields[index].validation){
      let invalid = this.fields[index].validation(this.fields[index].value.trim(), this.fields[index].required)
      if (!invalid){
        this.fields[index].isValid = true
      }
      else{
        this.fields[index].isValid = false
        this.fields[index].errorText = invalid
      }
    }
  }
}
