import { useStrict } from 'mobx'
import autoBind from 'auto-bind'
import TableModel from './tableModel'
import Website from '../store/website'
import API from '../api'
useStrict(true)

/**
  * @name timeEntryTableModel
  * @class timeEntryTableModel
  * @classdesc Time entry initializer for table storage object
  * @description Creates fields, sets correct onClick
  * @property {Function} buttonClickNav Function to navigate on click of table button
  * @extends TableModel
 */
export default class TimeEntryTableModel extends TableModel{
  constructor(buttonClickNav) {
    super(
      {
        title: 'Back to Project Summary',
        onClick: buttonClickNav
      },
      () => API.fetchTimeEntries(Website.currentProject.id),
    )
    autoBind(this)
    this.columns = [
      {
        Header: 'ID',
        accessor: 'id',
        filterable: true
      },
      {
        Header: 'Project ID',
        accessor: 'projectId',
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
