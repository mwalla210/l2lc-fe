import { useStrict, action } from 'mobx'
import autoBind from 'auto-bind'
import FormModel from './formModel'
import Website from '../store/website'
import Consts from '../consts'
useStrict(true)

/**
  * @name EmployeeFormModel
  * @class EmployeeFormModel
  * @classdesc Employee initializer for form storage object
  * @description Creates fields, sets correct button navigations for employee page
  * @param {Function} onClickNav Page navigation function for successful form submission
  * @param {Function} onCancelNav Page navigation function for cancelled form submission
  * @param {Function} errorClick Page navigation function for error modal confirmation click
  * @property {Function} primaryButton Page navigation for new employee
  * @extends FormModel
 */
export default class EmployeeFormModel extends FormModel{
  constructor(onClickNav, onCancelNav, errorClick) {
    let primaryOnClick = null
    super(Consts.employeeFields,
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
   * @memberof EmployeeFormModel.prototype
   */
  editButton(){
    // Change onClick functionality for primary
    return (fields) => {
      let body = {}
      fields.forEach(item => {
        body[item.id] = item.value.trim()
      })
      Website.updateEmployee(Website.currentEmployee.id, body)
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
        }
        else {
          this.setError(response)
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
    this.resetValues()
    // Update fields with values corresponding to currentEmployee
    this.fields.forEach(fieldObj => {
      fieldObj.value = Website.currentEmployee[fieldObj.id]
    })
  }
  /**
   * @name setNonEdit
   * @description Modifies primary button click, initializes field values as default values
   * @method setNonEdit
   * @memberof EmployeeFormModel.prototype
   * @mobx action
   */
  @action setNonEdit(){
    this.primaryButton.onClick = this.newButton()
    this.resetValues()
  }
}
