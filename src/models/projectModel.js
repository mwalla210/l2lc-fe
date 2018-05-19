import { action, computed, useStrict, extendObservable } from 'mobx'
import autoBind from 'auto-bind'
import Consts from '../consts'
import API from '../api'
let dateFormat = require('dateformat')
useStrict(true)

/**
 * @name ProjectModel
 * @class ProjectModel
 * @classdesc Project storage object
 * @param {Number} id Database ID
 * @param {Object} costCenterTitle Cost center title [observable]
 * @param {String} jobTypeTitle Job type title [observable]
 * @param {String} title Project title [observable]
 * @param {String} priority Project priority [observable]
 * @param {String} status Project status [observable]
 * @param {?Date} [dateCreated=null] Project date created
 * @param {?Number} [partCount=null] Project part count [observable]
 * @param {?String} [descr=null] Project description [observable]
 * @param {?String} [refNum=null] Project internal reference number [observable]
 * @param {Customer} [customer] Project Customer (defaults to empty object for table display) [observable]
 * @param {?Date} [dateFinished=null] Project date finished [observable]
 * @param {String} [notes=''] Project date finished [observable]
 * @property {Number} id Database ID
 * @property {Object} costCenterTitle Cost center title [observable]
 * @property {String} jobTypeTitle Job type title [observable]
 * @property {String} title Project title [observable]
 * @property {String} priority Project priority [observable]
 * @property {String} status Project status [observable]
 * @property {?Date} [dateCreated=null] Project date created
 * @property {?Number} [partCount=null] Project part count [observable]
 * @property {?String} [descr=null] Project description [observable]
 * @property {?String} [refNum=null] Project internal reference number [observable]
 * @property {Customer} [customer] Project Customer (defaults to empty object for table display) [observable]
 * @property {?Date} [dateFinished=null] Project date finished [observable]
 * @property {String} [notes=''] Project date finished [observable]
 * @property {String} [processArea=''] Project last process area [observable]
 * @property {Object[]} [timeEntries=[]] Array of objects containing related database employee ID, related database station ID, and date created [observable]
 * @property {Task[]} [tasks=[]] Array of Task(s) associated with Project [observable]
 * @property {String} [historyMsg=''] Time entry history message for Project [observable]
 */
export default class ProjectModel {
  constructor(id, costCenterTitle, jobTypeTitle, title, priority, status, dateCreated=null, partCount=null, descr=null, refNum=null, customer, dateFinished=null, notes='') {
    let addtlProps = {
      costCenterTitle, // changeable?
      jobTypeTitle, // changeable?
      title,
      priority,
      status,
      // Optional
      partCount,
      descr,
      refNum,
      dateFinished,
      customer,
      // Defaults
      processArea: '',
      timeEntries: [],
      tasks: [],
      historyMsg: '',
      notes
    }
    if(!customer)
      addtlProps.customer = {}
    if (dateFinished){
      addtlProps.dateFinished = new Date(dateFinished)
      addtlProps.dateFinished = dateFormat(this.dateFinished, 'mmmm dS, yyyy, h:MM:ss TT')
    }
    extendObservable(this, addtlProps)
    // Non-observable (don't change)
    this.id = id
    this.dateCreated = dateCreated
    if (dateCreated){
      this.dateCreated = new Date(dateCreated)
      this.dateCreated = dateFormat(this.dateCreated, 'mmmm dS, yyyy, h:MM:ss TT')
    }
    autoBind(this)
  }

  // Computations

  /**
   * @name customerID
   * @description Gets this.customer.id, if any
   * @memberof ProjectModel.prototype
   * @method customerID
   * @return {(Number|null)}
   * @mobx computed
   */
  @computed get customerID(){
    if (this.customer) return this.customer.id
    else return null
  }
  /**
   * @name timeSpent
   * @description Calculates Project's time total based on timeEntries
   * @memberof ProjectModel.prototype
   * @method timeSpent
   * @return {String}
   * @mobx computed
   */
  @computed get timeSpent(){
    let {hour, min} = Consts.calculateTime(this.timeEntries)
    return `${(hour != 0) ? `${hour} hour${(hour > 1) ? 's' : '' }, ` : ''}${(min != 0) ? `${min} minute${(min > 1) ? 's' : ''}`: ''}`
  }
  /**
   * @name isOpen
   * @description Projects with null dateFinished have not been closed
   * @method isOpen
   * @memberof ProjectModel.prototype
   * @return {Boolean}
   * @mobx computed
   */
  @computed get isOpen(){
    return (this.dateFinished == null)
  }
  /**
   * @name barcodeDomID
   * @description Return the DOM computed ID for a barcode field, specific to the project
   * @method barcodeDomID
   * @return {String}
   * @memberof ProjectModel.prototype
   * @mobx computed
   */
  @computed get barcodeDomID(){
    return `project${this.id}`
  }
  /**
   * @name barcodeScanID
   * @description Returns the ID to encode in the barcode for scanning purposes
   * @method barcodeScanID
   * @return {String}
   * @memberof ProjectModel.prototype
   * @mobx computed
   */
  @computed get barcodeScanID(){
    return `p${this.id}%`
  }

  // Actions

  /**
   * @name changeCustomer
   * @description Sets this.customer, makes request to API to modify Project's related Customer
   * @memberof ProjectModel.prototype
   * @method changeCustomer
   * @param  {Customer}       customer new Customer to link to Project
   * @return {Promise}
   * @mobx action
   */
  @action changeCustomer(customer){
    this.customer = customer
  }
  /**
   * @name finish
   * @description Sets this.status
   * @memberof ProjectModel.prototype
   * @method finish
   * @mobx action
   */
  @action finish(){
     this.status = 'Completed'
     this.dateFinished = dateFormat(new Date(), 'mmmm dS, yyyy, h:MM:ss TT')
   }

   /**
    * @name changeNotes
    * @description Sets this.notes, makes request to API to modify Project's related notes
    * @memberof ProjectModel.prototype
    * @method changeNotes
    * @param  {Object}       event value string for notes
    * @return {Promise}
    * @mobx action
    */
   @action changeNotes(event){
     this.notes = event.target.value
     API.updateProject(this.id, JSON.stringify({notes: this.notes}))
  }
  /**
   * @name getTimeEntries
   * @description Sets this.timeEntries
   * @memberof ProjectModel.prototype
   * @method getTimeEntries
   * @return {Promise}
   * @mobx action
   */
  @action getTimeEntries(){
    API.fetchTimeEntries(this.id)
    .then(action('fetchSuccess', res => {
      this.timeEntries = res
    }))
  }
  /**
   * @name getCustomer
   * @description Sets this.customer
   * @memberof ProjectModel.prototype
   * @method getCustomer
   * @return {Promise}
   * @mobx action
   */
  @action getCustomer(){
    API.fetchCustomer(this.customer.id)
    .then(action('fetchSuccess', res => {
      this.customer = res
    }))
  }
}
