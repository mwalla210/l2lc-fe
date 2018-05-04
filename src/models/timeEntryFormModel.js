import { useStrict, action } from 'mobx'
import autoBind from 'auto-bind'
import FormModel from './formModel'
import Consts from '../consts'
import Website from '../store/website'
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
        onClick: null
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
    this.primaryButton.onClick = (fields) => {
      let arrayFields = fields.slice()
      let body = {
        employeeId: arrayFields[1].value.replace('E',''),
        station: Website.currentUser.stationID,
      }
      Website.createTimeEntry(body, arrayFields[0].value.replace('P',''))
      .then(response => {
        if(response == null){
          this.resetValuesAndValidation()
        }
        else {
          this.setError(response)
          this.openModal()
        }
      })
    }
    this.secondaryButton.onClick = this.resetValuesAndValidation
  }
  /**
   * @name resetValuesAndValidation
   * @description Resets field values to defaults and also resets error property
   * @method resetValuesAndValidation
   * @memberof TimeEntryFormModel.prototype
   * @mobx action
   */
  @action resetValuesAndValidation(){
    this.resetValues()
    this.fields.forEach(field => field.isValid = true)
  }
}
