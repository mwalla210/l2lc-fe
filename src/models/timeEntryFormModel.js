import { useStrict, action } from 'mobx'
import autoBind from 'auto-bind'
import FormModel from './formModel'
useStrict(true)

const fields = [
  {
    type: 'textfield',
    label: 'Project ID',
    id: 'projectID',
    required: true,
    validation: (value, required) => {
      if (required && value == '')
        return 'Please enter a value.'
      if (value.length > 15)
        return 'The project ID must be less than 15 characters.'
      if (!value.startsWith('p'))
        return 'Project IDs must begin with the letter "p".'
      return null
    },
  },
  {
    type: 'textfield',
    label: 'Employee ID',
    id: 'employeeID',
    required: true,
    validation: (value, required) => {
      if (required && value == '')
        return 'Please enter a value.'
      if (value.length > 15)
        return 'The employee ID must be less than 15 characters.'
      if (!value.startsWith('e'))
        return 'Employee IDs must begin with the letter "e".'
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
        title: 'Clear',
        onClick: null
      },
      true,
      (fields, index, value) => {
        let changeIndex = null
        if (value.includes('™')){
          if (value.startsWith('p')){
            changeIndex = fields.findIndex(element => {return element.id == 'projectID'})
          }
          if (value.startsWith('e')){
            changeIndex = fields.findIndex(element => {return element.id == 'employeeID'})
          }
        }
        return changeIndex
      }
    )
    autoBind(this)
    this.secondaryButton.onClick = () => this.resetFields()
  }
  /**
   * @name resetFields
   * @description Sets all fields back to defaults
   * @method resetFields
   * @memberof TimeEntryFormModel.prototype
   * @mobx action
   */
  @action resetFields(){
    this.fields = fields
  }
}
