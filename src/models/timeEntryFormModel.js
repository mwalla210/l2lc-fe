import { useStrict, action } from 'mobx'
import autoBind from 'auto-bind'
import FormModel from './formModel'
import Consts from '../consts'
useStrict(true)

/**
  * @name TimeEntryFormModel
  * @class TimeEntryFormModel
  * @classdesc TimeEntry initializer for form storage object
  * @description Creates fields, sets correct onClick
  * @extends FormModel
 */
export default class TimeEntryFormModel extends FormModel{
  constructor() {
    super(Consts.timeEntryFields,
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
        if (value.includes('%')){
          if (value.startsWith('P')){
            changeIndex = fields.findIndex(element => {return element.id == 'projectID'})
          }
          if (value.startsWith('E')){
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
    this.fields = Consts.timeEntryFields
  }
}
