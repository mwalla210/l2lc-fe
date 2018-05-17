import { useStrict, extendObservable } from 'mobx'
import autoBind from 'auto-bind'
useStrict(true)

/**
 * @name TimeEntryModel
 * @class TimeEntryModel
 * @classdesc Time Entry storage object
 * @param {Number} id Database ID of time entry
 * @param {Number} projectId Project ID of time entry [observable]
 * @param {Number} employeeId Employee ID of time entry [observable]
 * @param {String} station Indicator of time entry's station [observable]
 * @param {Number} created Date of time entry in milliseconds since epoch [observable]
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
