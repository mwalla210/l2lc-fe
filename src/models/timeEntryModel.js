import { action, computed, useStrict, extendObservable } from 'mobx'
import autoBind from 'auto-bind'
useStrict(true)

/**
 * @name TimeEntryModel
 * @class TimeEntryModel
 * @classdesc Time Entry storage object
 * @property {Number} id Database ID of time entry
 * @property {Number} projectId Project ID of time entry [observable]
 * @property {Number} employeeId Employee ID of time entry [observable]
 * @property {String} station Indicator of time entry's station [observable]
 * @property {Number} created Date of time entry in milliseconds since epoch [observable]
 */
export default class TimeEntryModel {
  constructor(id, projectId, employeeId, station, created) {
    let addtlProps = {
      projectId,
      employeeId,
      station,
      created,
    }
    extendObservable(this, addtlProps)
    this.id = id
    autoBind(this)
  }
}
