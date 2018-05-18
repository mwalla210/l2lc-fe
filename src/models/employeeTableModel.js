import React from 'react'
import { useStrict } from 'mobx'
import autoBind from 'auto-bind'
import TableModel from './tableModel'
import Website from '../store/website'
import TableActionCell from '../components/tableActionCell'
import API from '../api'
useStrict(true)

/**
  * @name EmployeeTableModel
  * @class EmployeeTableModel
  * @classdesc Employee initializer for table storage object
  * @description Sets correct onClicks, table columns, and actions
  * @param {Function} buttonClickNav Function to navigate on click of table button
  * @param {Function} infoClickNav Function to navigate on click of info icon
  * @param {Function} editClickNav Function to navigate on click of edit icon
  * @property {Function} infoClickNav Function to navigate on click of info icon [observable]
  * @property {Function} editClickNav Function to navigate on click of edit icon [observable]
  * @extends TableModel
  * @see {@link TableActionCell}
  * @see {@link API}
 */
export default class EmployeeTableModel extends TableModel{
  constructor(buttonClickNav, infoClickNav, editClickNav) {
    super(
      {
        title: 'New Employee',
        onClick: buttonClickNav
      },
      API.fetchEmployees
    )
    this.infoClickNav = infoClickNav
    this.editClickNav = editClickNav
    autoBind(this)
    this.columns = [
      {
        Header: 'ID',
        accessor: 'id',
        filterable: true
      },
      {
        Header: 'First Name',
        accessor: 'firstName',
        filterable: true
      },
      {
        Header: 'Last Name',
        accessor: 'lastName',
        filterable: true
      },
      {
        Header: 'Actions',
        sortable: false,
        maxWidth: 100,
        getProps: () => {
          return {
            className: 'center',
            style: {
              paddingTop: '0px',
              paddingBottom: '0px',
            }
          }
        },
        Cell: row => <TableActionCell row={row} set="Restricted" clickHandler={this.clickHandler}/>
      }
    ]
  }
  /**
   * @name clickHandler
   * @description Handles action icon clicks
   * @method clickHandler
   * @param  {Object}     row   Row of click
   * @param  {String}     type  Icon click type
   * @memberof EmployeeTableModel.prototype
   * @see {@link Website}
   */
  clickHandler(row, type){
    if (type == 'info' || type == 'edit'){
      Website.setEmployee(row.original)
      if (type == 'info'){
        this.infoClickNav()
      }
      else
        this.editClickNav()
    }
  }
}
