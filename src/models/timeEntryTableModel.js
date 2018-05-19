import { useStrict } from 'mobx'
import autoBind from 'auto-bind'
import TableModel from './tableModel'
import Website from '../store/website'
useStrict(true)

/**
  * @name TimeEntryTableModel
  * @class TimeEntryTableModel
  * @classdesc Time entry initializer for table storage object
  * @description Sets correct onClick and table columns
  * @param {Function} backClickNav Function to navigate on click of back button
  * @extends TableModel
  * @see {@link Website}
 */
export default class TimeEntryTableModel extends TableModel{
  constructor(backClickNav) {
    super(
      null,
      () => Promise.resolve(Website.currentProject.timeEntries),
      null,
      null,
      null,
      backClickNav
    )
    autoBind(this)
    this.columns = [
      {
        Header: 'Time Entry ID',
        accessor: 'id',
        filterable: true
      },
      {
        Header: 'Employee ID',
        accessor: 'employeeId',
        filterable: true
      },
      {
        Header: 'Station',
        accessor: 'station',
        filterable: true
      },
      {
        Header: 'Created',
        accessor: 'created',
        filterable: true
      },
    ]
  }
}
