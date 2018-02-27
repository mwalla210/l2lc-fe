import React from 'react'
import { useStrict } from 'mobx'
import autoBind from 'auto-bind'
import TableModel from './tableModel'
import Website from '../store/website'
import TableActionCell from '../components/tableActionCell'
import Barcode from '../components/barcode'
import API from '../api'
useStrict(true)

/**
  * @name EmployeeTableModel
  * @class EmployeeTableModel
  * @classdesc Employee initializer for table storage object
  * @description Creates fields, sets correct onClick
  * @property {Function} buttonClickNav Function to navigate on click of table button
  * @property {Function} infoClickNav Function to navigate on click of info icon
  * @property {Function} editClickNav Function to navigate on click of edit icon
 */
export default class EmployeeTableModel extends TableModel{
  constructor(buttonClickNav, infoClickNav, editClickNav) {
    super(
      {
        title: 'New Employee',
        onClick: buttonClickNav
      },
      API.fetchEmployees,
      null,
      {
        title: 'Delete Employee?',
        confirmOnClick: () => console.log('confirm'),
        content: 'This action cannot be undone.'
      },
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
        Header: 'Barcode',
        accessor: 'barcode',
        Cell: row => (
          <span>
            <span>
              <Barcode
                imageDomID={`${row.original.firstName}${row.original.id}`}
                barcodeID={row.original.id.toString()}
              />
            </span>
          </span>
        )
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
        Cell: row => <TableActionCell row={row} set="Full" clickHandler={this.clickHandler}/>
      }
    ]
  }
  /**
   * @name clickHandler
   * @description Handles action icon clicks
   * @method clickHandler
   * @param  {Object}     row   Row of click
   * @param  {String}     type  Icon click type
   */
  clickHandler(row, type){
    if (type == 'info' || type == 'edit' || type == 'delete'){
      Website.setEmployee(row.original)
      if (type == 'info'){
        this.infoClickNav()
      }
      else if (type == 'edit'){
        this.editClickNav()
      }
      else {
        this.openModal()
      }
    }
  }
}
