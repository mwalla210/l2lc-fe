import { useStrict, action } from 'mobx'
import autoBind from 'auto-bind'
import FormModel from './formModel'
import Website from '../store/website'
useStrict(true)

const fields = [
  {
    type: 'textfield',
    label: 'First Name',
    id: 'firstName',
    required: true,
    validation: (value, required) => {
      if (required && value == '')
        return 'Please enter a value.'
      if (value.length > 30)
        return 'The first name must be less than 30 characters.'
      return null
    }
  },
  {
    type: 'textfield',
    label: 'Last Name',
    id: 'lastName',
    required: true,
    validation: (value, required) => {
      if (required && value == '')
        return 'Please enter a value.'
      if (value.length > 30)
        return 'The last name must be less than 30 characters.'
      return null
    }
  },
]

/**
  * @name EmployeeFormModel
  * @class EmployeeFormModel
  * @classdesc Employee initializer for form storage object
  * @description Creates fields, sets correct onClick
  * @property {Function} onClickNav Page navigation function for successful form submission
 */
export default class EmployeeFormModel extends FormModel{
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
   * @memberof EmployeeFormModel.prototype
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
   * @memberof EmployeeFormModel.prototype
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
   * @memberof EmployeeFormModel.prototype
   */
  newButton(){
    return (fields) => {
      let body = {}
      fields.forEach(item => {
        body[item.id] = item.value.trim()
      })
      Website.createEmployee(body)
      .then((response) => {
        if(response == null){
          this.onClickNav()
        } else {
          this.errorText = response
          this.openModal()
        }
      })
    }
  }

  /**
   * @name setEdit
   * @description Modifies primary button click, initializes field values as editing values corresponding to currentEmployee
   * @method setEdit
   * @memberof EmployeeFormModel.prototype
   * @mobx action
   */
  @action setEdit(){
    this.primaryButton.onClick = this.editButton()
    this.resetFields()
    // Update fields with values corresponding to currentEmployee
    console.log(Website.currentEmployee)
  }
  /**
   * @name setNonEdit
   * @description Modifies primary button click, initializes field values as default values
   * @method setNonEdit
   * @memberof EmployeeFormModel.prototype
   * @mobx action
   */
  @action setNonEdit(){
    this.primaryButton.onClick = this.newButton(this.onClickNav)
    this.resetFields()
  }
}
