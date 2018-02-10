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
  primaryButtonWrapper(){
    console.log(this.fields, this)
    this.primaryButton.onClick()
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
    console.log('index:',index,'value',value)
    this.fields[index].value = value
  }
}
