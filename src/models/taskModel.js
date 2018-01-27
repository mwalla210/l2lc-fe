import { action, useStrict, extendObservable } from 'mobx'
useStrict(true)

/**
 * @name TaskModel
 * @class TaskModel
 * @classdesc Task storage object
 * @property {Boolean} [required=false] Indicates whether the task is required [observable]
 * @property {String} [processArea=null] Process area associated with the task [observable]
 * @property {String} title Title of the task [observable]
 * @property {String} [status=''] Current task status [observable]
 */
export default class TaskModel {
  constructor(title, processArea) {
    let addtlProps = {
      required: false,
      processArea,
      title, // changeable?
      status: '',
    }
    extendObservable(this, addtlProps)
  }

  // Actions

  /**
   * @name toggle
   * @description Calls API to change required status of task in list; updates required
   * @memberof TaskModel.prototype
   * @method toggle
   * @return {Promise}
   * @mobx action
   */
  @action async toggle() {
     console.log('Update required status for a task via API. Returns boolean success.')
  }
}