import { action, computed, useStrict, extendObservable } from 'mobx'
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
 */
export default class FormModel {
  constructor(fields, primaryButton, secondaryButton, autoSubmit) {
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
    })
    let addtlProps = {
      fields
    }
    extendObservable(this, addtlProps)
    // non-observable properties
    this.primaryButton = primaryButton
    this.secondaryButton = secondaryButton
    this.autoSubmit = autoSubmit
    this.primaryButtonWrapper = this.primaryButtonWrapper.bind(this)
    this.modifyFieldValue = this.modifyFieldValue.bind(this)
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
      if(field.required){
        switch (field.type){
          case 'textfield':
          case 'textarea':
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
   * @description Updating the fields value
   * @memberof FormModel.prototype
   * @method modifyFieldValue
   * @property {Number} index The field index
   * @property {String} value The field value
   * @mobx action
   */
  @action modifyFieldValue(index, value){
    this.fields[index].value = value
    if(!this.buttonDisabled && this.autoSubmit)
    {
      this.primaryButtonWrapper()
    }
  }
}
