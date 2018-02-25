import { useStrict, action } from 'mobx'
import autoBind from 'auto-bind'
import FormModel from './formModel'
useStrict(true)

const fields = [
  {
    type: 'textfield',
    label: 'Project ID',
    id: 'id',
    required: true,
    validation: (value, required) => {
      if (required && value == '')
        return 'Please enter a value.'
      if (value.length > 15)
        return 'The project ID must be less than 15 characters.'
      return null
    }
  },
  {
    type: 'textfield',
    label: 'Employee ID',
    id: 'id',
    required: true,
    validation: (value, required) => {
      if (required && value == '')
        return 'Please enter a value.'
      if (value.length > 15)
        return 'The employee ID must be less than 15 characters.'
      return null
    }
  }
]

/**
  * @name TimeEntryFormModel
  * @class TimeEntryFormModel
  * @classdesc TimeEntry initializer for form storage object
  * @description Creates fields, sets correct onClick
 */
export default class TimeEntryFormModel extends FormModel{
  constructor() {
    super(fields,
      {
        title: 'Continue',
        onClick: (fields) => console.log('submit button onClick', fields)
      },
      {
        title: 'Cancel',
        onClick: null
      }
    )
    autoBind(this)
    this.secondaryButton.onClick = this.resetValues()
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
}
