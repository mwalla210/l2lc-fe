import { action, computed, useStrict, extendObservable } from 'mobx'
useStrict(true)

/**
 * @name Task
 * @class Task
 * @description Main MobX store for task
 * @property {Boolean} [required=false] Indicates whether the task is required [observable]
 * @property {String} [processArea=''] Process area associated with the task [observable]
 * @property {String} [title=''] Title of the task [observable]
 * @property {String} [status=''] Current task status [observable]
 */
class Task {
  constructor(title, processArea) {
    this.required = false
    this.processArea = ''
    this.title = ''
    this.status = ''
  }

// Actions

/**
* @name toggle
* @description Calls API to change required status of task in list; updates required
* @memberof Task.prototype
* @method toggle
* @return {Promise}
* @mobx action
*/
  @action async toggle() {
     console.log(`Update required status for a task via API. Returns boolean success.`)
  }
}

const task = new Task()
export default task
export { Task }
