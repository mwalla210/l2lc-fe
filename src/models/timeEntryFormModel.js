import { useStrict, action, extendObservable, computed } from 'mobx'
import autoBind from 'auto-bind'
import Website from '../store/website'
import Page from '../store/page'
import Consts from '../consts'
let dateFormat = require('dateformat')
useStrict(true)

/**
  * @name TimeEntryFormModel
  * @class TimeEntryFormModel
  * @classdesc TimeEntry initializer for form storage object
  * @description Creates fields, sets correct onClick
  * @property {Boolean} submissionConfirmOpen Boolean for confirmation model
  * @property {String} value Time entry value
  * @property {Object[]} projectID Project
  * @property {Object[]} employeeID Employee
  * @property {String} station Station name
  * @property {Boolean} errorModalOpen Boolean for error modal
  * @property {String} errorResponse error message
 */
export default class TimeEntryFormModel {
  constructor() {
    let addtl = {
      submissionConfirmOpen: false,
      value: '',
      projectID: [],
      employeeID: [],
      station: '',
      errorModalOpen: false,
      errorResponse: ''
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
    return this.station.trim() == '' || this.projectID.length == 0 || this.employeeID.length == 0
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
   * @name openModal
   * @description Opens confirmation alert
   * @method openModal
   * @memberof TimeEntryFormModel.prototype
   * @mobx action
   */
  @action openModal(){this.errorModalOpen = true}
  /**
   * @name closeModal
   * @description Closes confirmation alert
   * @method closeModal
   * @memberof TimeEntryFormModel.prototype
   * @mobx action
   */
  @action closeModal(){this.errorModalOpen = false}
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
   * @param {String} value textarea value
   * @param {String} split textarea value
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
          let stationTitle
          let isShorthand = Consts.stationName(token.toLowerCase())
          if (isShorthand){
            stationTitle = isShorthand
          }
          else {
            stationTitle = token.toLowerCase().replace(
              /\w\S*/g,
              txt => {return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()}
            )
          }
          this.station = stationTitle
        }
        // Project ID
        else if (token.startsWith('P')){
          if (!this.projectID.includes(token))
            this.projectID.push(token)
        }
        // Project ID
        else if (token.startsWith('E')){
          if (!this.employeeID.includes(token))
            this.employeeID.push(token)
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
    let timeEntries = []
    this.projectID.forEach(project => {
      this.employeeID.forEach(employee => {
        let body = {
          employeeId: employee.replace('E',''),
          station: this.station,
        }
        let fn = (body, project) => {
          return Website.createTimeEntry(body, project.replace('P','')).then(response => {return response})
        }
        timeEntries.push(fn(body, project))
      })
    })
    Promise.all(timeEntries)
    .then(results => {
      let nonNull = false
      let error = ''
      results.forEach(result => {
        if (result != null)
          nonNull = true
          error = result
      })
      if(!nonNull){
        this.openConfirmation()
        setTimeout(() => {
          this.closeConfirmation()
          Page.setNullContent()
          setTimeout(() => {
            let date = dateFormat(new Date(), 'mmmm dS, yyyy, h:MM:ss TT')
            this.projectID.forEach(project => {
              this.employeeID.forEach(employee => {
                Website.addToTaskHistory(`Task logged at ${this.station} station at ${date} by employee ${employee} for project ${project}\n`)
              })
            })
            Page.projectTimeEntryMenuItem()
          }, 200)
        }, 1500)
      }
      else {
        this.setError(error)
        this.openModal()
      }
    })
  }
  /**
   * @name setError
   * @description Sets error message
   * @method setError
   * @memberof TimeEntryFormModel.prototype
   * @param {String} val Error message
   * @mobx action
   */
  @action setError(val){
    this.errorResponse = val
  }
}
