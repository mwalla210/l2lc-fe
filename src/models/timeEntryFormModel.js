import { useStrict, action, extendObservable, computed } from 'mobx'
import autoBind from 'auto-bind'
import Website from '../store/website'
import Page from '../store/page'
useStrict(true)

/**
  * @name TimeEntryFormModel
  * @class TimeEntryFormModel
  * @classdesc TimeEntry initializer for form storage object
  * @description Creates fields, sets correct onClick
 */
export default class TimeEntryFormModel {
  constructor() {
    let addtl = {
      submissionConfirmOpen: false,
      value: '',
      projectID: '',
      employeeID: '',
      station: ''
    }
    extendObservable(this, addtl)
    autoBind(this)
  }
  /**
   * @name buttonDisabled
   * @description Checks form field validity to indicate whether submit button ought to be disabled
   * @method buttonDisabled
   * @memberof TimeEntryFormModel.prototype
   * @mobx computed
   */
  @computed get buttonDisabled(){
    return this.projectID.trim() == '' || this.employeeID.trim() == '' || this.station.trim() == ''
  }
  /**
   * @name openConfirmation
   * @description Opens confirmation alert
   * @method openConfirmation
   * @memberof TimeEntryFormModel.prototype
   * @mobx action
   */
  @action openConfirmation(){this.submissionConfirmOpen = true}
  /**
   * @name closeConfirmation
   * @description Closes confirmation alert
   * @method closeConfirmation
   * @memberof TimeEntryFormModel.prototype
   * @mobx action
   */
  @action closeConfirmation(){this.submissionConfirmOpen = false}
  /**
   * @name resetValuesAndValidation
   * @description Resets field values to defaults and also resets error property
   * @method resetValuesAndValidation
   * @memberof TimeEntryFormModel.prototype
   * @mobx action
   */
  @action resetValuesAndValidation(){
    this.station = ''
    this.projectID = ''
    this.employeeID = ''
    this.value = ''
  }
  /**
   * @name setValue
   * @description Sets textarea value; if finished
   * @method setValue
   * @memberof TimeEntryFormModel.prototype
   * @mobx action
   */
  @action setValue(value, split){
    this.value = value
    if (split){
      let tokens = this.value.split('\n')
      tokens.forEach(token => {
        let nonNumber = /^([^0-9]*)$/
        // Station
        if (nonNumber.test(token)){
          let stationTitle = token.toLowerCase().replace(
            /\w\S*/g,
            txt => {return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()}
          )
          this.station = stationTitle
        }
        // Project ID
        else if (token.startsWith('P')){
          this.projectID = token
        }
        // Project ID
        else if (token.startsWith('E')){
          this.employeeID = token
        }
      })
      if (!this.buttonDisabled)
        this.submit()
    }
  }
  /**
   * @name submit
   * @description Submits form if filled out completely
   * @method submit
   * @memberof TimeEntryFormModel.prototype
   * @mobx action
   */
  @action submit(){
    let body = {
      employeeId: this.employeeID.replace('E',''),
      station: this.station,
    }
    Website.createTimeEntry(body, this.projectID.replace('P',''))
    .then(response => {
      if(response == null){
        this.openConfirmation()
        setTimeout(() => {
          this.closeConfirmation()
          Page.setNullContent()
          setTimeout(() => {
            Website.addToTaskHistory(`Task logged in ${this.station} station at ${new Date()} by employee ${this.employeeID} for project ${this.projectID}\n`)
            Page.projectTimeEntryMenuItem()
          }, 200)
        }, 2000)
      }
      else {
        this.setError(response)
        this.openModal()
      }
    })
  }
}
