import React from 'react'
import { useStrict } from 'mobx'
import autoBind from 'auto-bind'
import TableModel from './tableModel'
import Website from '../store/website'
import TableActionCell from '../components/tableActionCell'
import API from '../api'
useStrict(true)

/**
  * @name CustomerTableModel
  * @class CustomerTableModel
  * @classdesc Customer initializer for table storage object
  * @description Creates fields, sets correct onClick
  * @property {Function} infoClickNav Function to navigate on click of info icon
  * @property {Function} editClickNav Function to navigate on click of edit icon
 */
export default class CustomerTableModel extends TableModel{
  constructor(buttonClickNav, infoClickNav, editClickNav) {
    super(
      {
        title: 'New Customer',
        onClick: buttonClickNav
      },
      API.fetchCustomers,
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
        Header: 'Name',
        accessor: 'companyName',
        filterable: true
      },
      {
        Header: 'Shipping Address',
        accessor: 'formattedShipAddress',
        filterable: true
      },
      {
        Header: 'Billing Address',
        accessor: 'formattedBillAddress',
        filterable: true
      },
      {
        Header: 'Phone',
        accessor: 'phone',
        filterable: true
      },
      {
        Header: 'Actions',
        sortable: false,
        maxWidth: 80,
        getProps: () => {
          return {
            className: 'center',
            style: {
              paddingTop: '0px',
              paddingBottom: '0px'
            }
          }
        },
        Cell: row => <TableActionCell row={row} set="Restricted" clickHandler={this.clickHandler}/>
      }
    ]
    this.dataFetch()
  }
  /**
   * @name clickHandler
   * @description Handles action icon clicks
   * @method clickHandler
   * @param  {Object}     row   Row of click
   * @param  {String}     type  Icon click type
   */
  clickHandler(row, type){
    if (type == 'info' || type == 'edit'){
      Website.setCustomer(row.original)
      if (type == 'info'){
        this.infoClickNav()
      }
      else{
        this.editClickNav()
      }
    }
  }
}
