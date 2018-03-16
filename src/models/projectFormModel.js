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
    let primaryOnClick = () => {}
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
   * @name resetFields
   * @description Sets all fields back to defaults
   * @method resetFields
   * @memberof ProjectFormModel.prototype
   * @mobx action
   */
  @action resetFields(){
    this.fields = Consts.projectFields
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
    return (fields) => console.log('EDIT with', fields)
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
      let valueReturn = (id) => {
        let val
        fields.forEach(item => {
          if (item.id == id){
            val = item.value
          }
        })
        return val
      }
      let costCenter = valueReturn('costCenter').trim()
      let body = {
        jobType: valueReturn('projectType').trim(),
        costCenter,
        title: valueReturn('projectTitle').trim(),
        description:valueReturn('description').trim(),
        priority: valueReturn('priority').trim(),
        partCount: valueReturn('partCount').trim(),
        refNumber: valueReturn('referenceNumber').trim(),
      }
      if (costCenter == 'APC' || costCenter == 'Decorative'){
        // Make a preliminary project model, set as Website.currentProject
        let model = new ProjectModel(null, body.costCenter, body.jobType, body.title, body.priority, null, null, body.partCount, body.description, body.refNumber, null, null)
        Website.setProject(model)
        console.log(Website.currentProject)
        // Nav to customer select to finalize customer information
        this.onClickCustomerNav()
      }
      else {
        Website.createProject(body)
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
    this.resetFields()
    // Update fields with values corresponding to currentProject
    console.log(Website.currentProject)
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
    this.resetFields()
  }
}
