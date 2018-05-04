import { useStrict, action } from 'mobx'
import autoBind from 'auto-bind'
import FormModel from './formModel'
import ProjectModel from './projectModel'
import Website from '../store/website'
import Consts from '../consts'
useStrict(true)

/**
  * @name ProjectFormModel
  * @class ProjectFormModel
  * @classdesc Customer initializer for form storage object
  * @description Creates fields, sets correct onClick
  * @property {Function} onClickNav Page navigation function for successful form submission
  * @property {Function} onClickCustomerNav Page navigation function for successful form submission
  * @property {Function} onCancelNav Page navigation function for cancelled form submission
  * @property {Function} errorClick Page navigation function error modal confirmation click
  * @extends FormModel
 */
export default class projectFormModel extends FormModel{
  constructor(onClickNav, onClickCustomerNav, onCancelNav, errorClick) {
    let primaryOnClick = null
    super(Consts.projectFields,
      {
        title: 'Continue',
        onClick: primaryOnClick
      },
      null,
      null,
      null,
      errorClick
    )
    this.onClickNav = onClickNav
    this.onClickCustomerNav = onClickCustomerNav
    this.onCancelNav = onCancelNav
    autoBind(this)
    this.primaryButton.onClick = this.newButton()
  }
  /**
   * @name editButton
   * @description Returns function for onClick of primary button when editing
   * @method editButton
   * @return {Function}
   * @memberof ProjectFormModel.prototype
   */
  editButton(){
    // Change onClick functionality for primary
    return (fields) => {
      let body = this.parseForm(fields)
      Website.updateProject(Website.currentProject.id, body)
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
   * @name editSecondaryButton
   * @description Returns button props for secondary button when editing
   * @method editSecondaryButton
   * @return {Function}
   * @memberof ProjectFormModel.prototype
   */
  editSecondaryButton(){
    return {
      title: 'Cancel',
      onClick: this.onCancelNav
    }
  }
  /**
   * @name newButton
   * @description Returns function for onClick of primary button when creating
   * @method newButton
   * @return {Function}
   * @memberof ProjectFormModel.prototype
   */
  newButton(){
    return (fields) => {
      let body = this.parseForm(fields)
      if (body.costCenter == 'APC' || body.costCenter == 'Decorative' || body.costCenter == 'Military'){
        // Make a preliminary project model, set as Website.currentProject
        let model = new ProjectModel(null, body.costCenter, body.jobType, body.title, body.priority, null, null, body.partCount, body.description, body.refNumber, null, null)
        Website.setProject(model)
        // Nav to customer select to finalize customer information
        this.onClickCustomerNav()
      }
      else {
        Website.createProject(body)
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
  }

  /**
   * @name parseForm
   * @description Returns body for use with POST
   * @method parseForm
   * @return {Function}
   * @memberof ProjectFormModel.prototype
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
      jobType: valueReturn('jobTypeTitle').trim(),
      costCenter: valueReturn('costCenterTitle').trim(),
      title: valueReturn('title').trim(),
      description:valueReturn('descr').trim(),
      priority: valueReturn('priority').trim(),
      partCount: valueReturn('partCount').trim(),
      refNumber: valueReturn('refNum').trim(),
    }
    return body
  }

  /**
   * @name setEdit
   * @description Modifies primary button click, initializes field values as editing values corresponding to currentProject
   * @method setEdit
   * @memberof ProjectFormModel.prototype
   * @mobx action
   */
  @action setEdit(){
    this.primaryButton.onClick = this.editButton()
    this.secondaryButton = this.editSecondaryButton()
    this.resetValues()
    // Update fields with values corresponding to currentProject
    this.fields.forEach((fieldObj, index) => {
      let value
      if (!Website.currentProject.hasOwnProperty(fieldObj.id)){
        console.log('Missing field',fieldObj.id)
      }
      else
        value = (Website.currentProject[fieldObj.id]).toString()
      if (value != null && value != undefined && value != ''){
        this.modifyFieldValue(index, value)
      }
    })
  }
  /**
   * @name setNonEdit
   * @description Modifies primary button click, initializes field values as default values
   * @method setNonEdit
   * @memberof ProjectFormModel.prototype
   * @mobx action
   */
  @action setNonEdit(){
    this.primaryButton.onClick = this.newButton(this.onClickNav)
    this.secondaryButton = null
    this.resetValues()
  }
}
