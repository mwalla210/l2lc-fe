import { useStrict, action } from 'mobx'
import autoBind from 'auto-bind'
import FormModel from './formModel'
import Website from '../store/website'
useStrict(true)

const fields = [
  {
    type: 'select',
    label: 'Cost Center',
    id: 'region',
    options: ['Select...','APC Job','Decorative Job','Maintenance','Administration','Production','Research and Development','Other'],
    required: true,
    validation: (value, required) => {
      if (required && value == '')
        return 'Please select a cost center.'
      return null
    }
  },
  {
    type: 'select',
    label: 'Project Type',
    id: 'projectType',
    options: ['Select...','based on cost center selected'],
    required: true,
    validation: (value, required) => {
      if (required && value == '')
        return 'Please select a project type.'
      return null
    }
  },
  {
    type: 'textfield',
    label: 'Part Count',
    id: 'partCount',
    required: true,
    validation: (value, required) => {
      if (required && value == '')
        return 'Please enter a value.'
      let reg = /^\d+$/
      if (reg.test(value.trim()) == false)
        return 'Please enter a valid number.'
      if (value.length > 4)
        return 'The part count number must be less than 4 characters.'
      return null
    }
  },
  {
    type: 'textfield',
    label: 'Project Title',
    id: 'projectTitle',
    required: false, //NEED TO UPDATE BASED ON PREVIOUS SELECTIONS
    validation: (value, required) => {
      if (required && value == '')
        return 'Please enter a value.'
      if (value.length > 30)
        return 'The project title name must be less than 30 characters.'
      return null
    }
  },
  {
    type: 'select',
    label: 'Priority',
    id: 'priority',
    options: ['Select...','Low','High'],
    required: true,
    validation: (value, required) => {
      if (required && value == '')
        return 'Please select a priority.'
      return null
    }
  },
  {
    type: 'textarea',
    label: 'Description',
    id: 'description',
    required: false,
    validation: (value, required) => {
      if (required && value == '')
        return 'Please enter a value.'
      if (value.length > 100)
        return 'The description must be less than 100 characters.'
      return null
    }
  },
  {
    type: 'textfield',
    label: 'Reference Number',
    id: 'referenceNumber',
    required: false,
    validation: (value, required) => {
      if (required && value == '')
        return 'Please enter a value.'
      if (value.length > 30)
        return 'The reference number must be less than 30 characters.'
      return null
    }
  },
]

/**
  * @name projectFormModel
  * @class projectFormModel
  * @classdesc Customer initializer for form storage object
  * @description Creates fields, sets correct onClick
  * @property {Function} onClickNav Page navigation function for successful form submission
  * @property {Function} onCancelNav Page navigation function for cancelled form submission
 */
export default class projectFormModel extends FormModel{
  constructor(onClickNav, onCancelNav) {
    let primaryOnClick = () => {}
    super(fields,
      {
        title: 'Continue',
        onClick: primaryOnClick
      },
      {
        title: 'Cancel',
        onClick: onCancelNav
      }
    )
    this.onClickNav = onClickNav
    this.onCancelNav = onCancelNav
    autoBind(this)
    this.primaryButton.onClick = this.newButton()
  }
  /**
   * @name resetFields
   * @description Sets all fields back to defaults
   * @method resetFields
   * @memberof projectFormModel.prototype
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
   * @memberof projectFormModel.prototype
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
   * @memberof projectFormModel.prototype
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
   * @memberof projectFormModel.prototype
   */
  newButton(){
    return (fields) => console.log('CREATE with', fields)
  }

  /**
   * @name setEdit
   * @description Modifies primary button click, initializes field values as editing values corresponding to currentProject
   * @method setEdit
   * @memberof projectFormModel.prototype
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
   * @memberof projectFormModel.prototype
   * @mobx action
   */
  @action setNonEdit(){
    this.primaryButton.onClick = this.newButton(this.onClickNav)
    this.secondaryButton = null
    this.resetFields()
  }
}
