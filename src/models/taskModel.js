import { action, useStrict, extendObservable } from 'mobx'
import Website from '../store/website'
import API from '../api'
import autoBind from 'auto-bind'
useStrict(true)

/**
 * @name TaskModel
 * @class TaskModel
 * @classdesc Task storage object
 * @description Sets up tasks with its relevant properties
 * @param {Boolean} [required=false] Indicates whether the task is required
 * @param {String} title Title of the task
 * @param {?String} [processArea=null] Process area associated with the task
 * @param {String} id ID of the task
 * @param {Boolean} [required=false] Indicates whether the task is required [observable]
 * @param {String} title Title of the task [observable]
 * @param {?String} [processArea=null] Process area associated with the task [observable]
 * @property {String} id ID of the task
 */
export default class TaskModel {
  constructor(required, title, processArea, id) {
    let addtlProps = {
      required,
      processArea,
      title,
    }
    extendObservable(this, addtlProps)
    this.id = id
    autoBind(this)
  }

  // Actions

  /**
   * @name toggleRequired
   * @description Calls API to change if task is required
   * @memberof TaskModel.prototype
   * @method toggleRequired
   * @return {Promise}
   * @see {@link API}
   * @see {@link Website}
   * @mobx action
   */
  @action toggleRequired() {
    this.required = !this.required
    API.updateTask(Website.currentProject.id, this.id, JSON.stringify({
      required: this.required
    }))
  }
}
