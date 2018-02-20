import { action, computed, useStrict, extendObservable } from 'mobx'
useStrict(true)

/**
  * @name FormModel
  * @class FormModel
  * @classdesc Form storage object
  * @property {Object[]} fields Type of fields for the form [observable]
  * @property {Object} primaryButton Forms primary button properties
  * @property {String} primaryButton.title Forms primary button title
  * @property {Function} primaryButton.onClick Forms primary button onClick
  * @property {Object} [secondaryButton] Forms secondary button properties
  * @property {String} secondaryButton.title Forms secondary button title
  * @property {Function} secondaryButton.onClick Forms secondary button onClick
 */
export default class FormModel {
  constructor(fields, primaryButton, secondaryButton) {
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
      field.disabled = false
    })
    let addtlProps = {
      fields
    }
    extendObservable(this, addtlProps)
    // non-observable properties
    this.primaryButton = primaryButton
    this.secondaryButton = secondaryButton
  }
  /**
   * @name buttonDisabled
   * @description Calculating button disabled state
   * @memberof FormModel.prototype
   * @method buttonDisabled
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
    this.fields[index].value = value
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
    console.log('fieldValidatorWrapper',index, this.fields[index].validation)
    if (this.fields[index].validation){
      let invalid = this.fields[index].validation(this.fields[index].value)
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
