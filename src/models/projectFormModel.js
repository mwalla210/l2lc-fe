import { useStrict, action } from 'mobx'
import autoBind from 'auto-bind'
import FormModel from './formModel'
import ProjectModel from './projectModel'
import Website from '../store/website'
useStrict(true)

const fields = [
  {
    type: 'select',
    label: 'Cost Center',
    id: 'costCenter',
    options: [{title: 'Select...'}, {title: 'APC'}, {title: 'Decorative'}, {title: 'Maintenance'}, {title: 'Administration'}, {title: 'Production'}, {title: 'Research and Development'}, {title: 'Other'}],
    required: true,
    disabled: false,
    validation: (value, required) => {
      if (required && value == '')
        return 'Please select a cost center.'
      return null
    },
    onUpdate: (value) => {
      if (value == 'APC'){
        return [
          {
            id: 'projectType',
            options: [{title: 'Select...'}, {title: 'Piston'}, {title: 'Turbo'}, {title: 'Rotor'}, {title: 'Pump'}, {title: 'Avaslick'}, {title: 'Specialty'}],
            required: true,
            disabled: false
          },
          {
            id: 'partCount',
            required: true,
            disabled: false
          },
          {
            id: 'projectTitle',
            required: false,
            disabled: false
          },
          {
            id: 'priority',
            required: true,
            disabled: false
          },
          {
            id: 'description',
            required: false,
            disabled: false
          },
          {
            id: 'referenceNumber',
            required: false,
            disabled: false
          }
        ]
      }
      if (value == 'Decorative'){
        return [
          {
            id: 'projectType',
            options: [{title: 'Select...'}, {title: 'Decorative'}],
            required: true,
            disabled: false
          },
          {
            id: 'partCount',
            required: true,
            disabled: false
          },
          {
            id: 'projectTitle',
            required: true,
            disabled: false
          },
          {
            id: 'priority',
            required: true,
            disabled: false
          },
          {
            id: 'description',
            required: false,
            disabled: false
          },
          {
            id: 'referenceNumber',
            required: false,
            disabled: false
          }
        ]
      }
      if (value == 'Maintenance'){
        return [
          {
            id: 'projectType',
            options: [{title: 'Select...'}, {title: 'Maintenance'}],
            required: true,
            disabled: false
          },
          {
            id: 'partCount',
            required: false,
            disabled: true
          },
          {
            id: 'projectTitle',
            required: true,
            disabled: false
          },
          {
            id: 'priority',
            required: true,
            disabled: false
          },
          {
            id: 'description',
            required: false,
            disabled: false
          },
          {
            id: 'referenceNumber',
            required: false,
            disabled: false
          }
        ]
      }
      if (value == 'Administration'){
        return [
          {
            id: 'projectType',
            options: [{title: 'Select...'}, {title: 'ISO'}, {title: 'Other'}],
            required: true,
            disabled: false
          },
          {
            id: 'partCount',
            required: false,
            disabled: true
          },
          {
            id: 'projectTitle',
            required: true,
            disabled: false
          },
          {
            id: 'priority',
            required: true,
            disabled: false
          },
          {
            id: 'description',
            required: false,
            disabled: false
          },
          {
            id: 'referenceNumber',
            required: false,
            disabled: false
          }
        ]
      }
      if (value == 'Research and Development'){
        return [
          {
            id: 'projectType',
            options: [{title: 'Select...'}, {title: 'Research and Development'}],
            required: true,
            disabled: false
          },
          {
            id: 'partCount',
            required: false,
            disabled: true
          },
          {
            id: 'projectTitle',
            required: true,
            disabled: false
          },
          {
            id: 'priority',
            required: true,
            disabled: false
          },
          {
            id: 'description',
            required: false,
            disabled: false
          },
          {
            id: 'referenceNumber',
            required: false,
            disabled: false
          }
        ]
      }
      if (value == 'Production'){
        return [
          {
            id: 'projectType',
            options: [{title: 'Select...'}, {title: 'Production'}],
            required: true,
            disabled: false
          },
          {
            id: 'partCount',
            required: false,
            disabled: true
          },
          {
            id: 'projectTitle',
            required: true,
            disabled: false
          },
          {
            id: 'priority',
            required: true,
            disabled: false
          },
          {
            id: 'description',
            required: false,
            disabled: false
          },
          {
            id: 'referenceNumber',
            required: false,
            disabled: false
          }
        ]
      }
      if (value == 'Other'){
        return [
          {
            id: 'projectType',
            options: [{title: 'Select...'}, {title: 'Other'}],
            required: true,
            disabled: false
          },
          {
            id: 'partCount',
            required: false,
            disabled: true
          },
          {
            id: 'projectTitle',
            required: true,
            disabled: false
          },
          {
            id: 'priority',
            required: true,
            disabled: false
          },
          {
            id: 'description',
            required: false,
            disabled: false
          },
          {
            id: 'referenceNumber',
            required: false,
            disabled: false
          }
        ]
      }
      return [
        {
          id: 'projectType',
          options: [{title: 'Select...'}, {title: 'Piston'}, {title: 'Turbo'}, {title: 'Rotor'}, {title: 'Pump'}, {title: 'Avaslick'}, {title: 'Specialty'}, {title: 'Decorative'}, {title: 'Maintenance'}, {title: 'ISO'}, {title: 'Production'}, {title: 'Research and Development'}, {title: 'Other'}],
          required: true,
          disabled: false
        },
        {
          id: 'partCount',
          required: false,
          disabled: false
        },
        {
          id: 'projectTitle',
          required: true,
          disabled: false
        },
        {
          id: 'priority',
          required: true,
          disabled: false
        },
        {
          id: 'description',
          required: false,
          disabled: false
        },
        {
          id: 'referenceNumber',
          required: false,
          disabled: false
        }
      ]
    }
  },
  {
    type: 'select',
    label: 'Project Type',
    id: 'projectType',
    options: [{title: 'Select...'}, {title: 'Piston'}, {title: 'Turbo'}, {title: 'Rotor'}, {title: 'Pump'}, {title: 'Avaslick'}, {title: 'Specialty'}, {title: 'Decorative'}, {title: 'Maintenance'}, {title: 'ISO'}, {title: 'Production'}, {title: 'Research and Development'}, {title: 'Other'}],
    required: true,
    disabled: true,
    validation: (value, required) => {
      if (required && value == '')
        return 'Please select a project type.'
      return null
    },
    onUpdate: (value) => {
      if (value == 'Piston' || value == 'Turbo' || value == 'Rotor' || value == 'Pump'){
        return [
          {
            id: 'projectTitle',
            required: false,
            disabled: false
          }
        ]
      }
      return [
        {
          id: 'projectTitle',
          required: true,
          disabled: false
        }
      ]
    }
  },
  {
    type: 'textfield',
    label: 'Part Count',
    id: 'partCount',
    required: false,
    disabled: true,
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
    required: false,
    disabled: true,
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
    options: [{title: 'Select...'}, {title: 'Low'}, {title: 'High'}],
    required: true,
    disabled: true,
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
    disabled: true,
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
    disabled: true,
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
  * @name ProjectFormModel
  * @class ProjectFormModel
  * @classdesc Customer initializer for form storage object
  * @description Creates fields, sets correct onClick
  * @property {Function} onClickNav Page navigation function for successful form submission
  * @property {Function} onClickCustomerNav Page navigation function for successful form submission
  * @property {Function} onCancelNav Page navigation function for cancelled form submission
 */
export default class projectFormModel extends FormModel{
  constructor(onClickNav, onClickCustomerNav, onCancelNav, errorClick) {
    let primaryOnClick = () => {}
    super(fields,
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
    this.fields = fields
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
            this.errorText = response
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
