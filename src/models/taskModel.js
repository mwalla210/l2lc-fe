import { action, useStrict, extendObservable, computed } from 'mobx'
import Website from '../store/website'
import API from '../api'
import autoBind from 'auto-bind'
useStrict(true)

/**
 * @name TaskModel
 * @class TaskModel
 * @classdesc Task storage object
 * @property {Boolean} [required=false] Indicates whether the task is required [observable]
 * @property {?String} [processArea=null] Process area associated with the task [observable]
 * @property {String} title Title of the task [observable]
 */
export default class TaskModel {
  constructor(required, title, processArea, id) {
    let addtlProps = {
      required,
      processArea,
      title, // changeable?
    }
    extendObservable(this, addtlProps)
    this.id = id
    autoBind(this)
  }

  // Actions

  @action toggleRequired() {
    this.required = !this.required
    API.updateTask(Website.currentProject.id, this.id, JSON.stringify({
      required: this.required
    }))
  }
}
