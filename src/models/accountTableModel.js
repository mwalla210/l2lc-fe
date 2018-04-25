import React from 'react'
import { useStrict, action } from 'mobx'
import autoBind from 'auto-bind'
import TableModel from './tableModel'
import Website from '../store/website'
import TableActionCell from '../components/tableActionCell'
import ButtonDefault from '../components/buttonDefault'
import API from '../api'
useStrict(true)

/**
  * @name AccountTableModel
  * @class AccountTableModel
  * @classdesc Customer initializer for table storage object
  * @description Creates fields, sets correct onClick
  * @property {Function} buttonClickNav Function to navigate on click of table button
  * @property {Function} infoClickNav Function to navigate on click of info icon
  * @property {Function} editClickNav Function to navigate on click of edit icon
  * @property {Function} selectNav Function to navigate on select of row (when adding customer to project)
  * @extends TableModel
 */
export default class AccountTableModel extends TableModel{
  constructor(buttonClickNav, editClickNav) {
    super(
      {
        title: 'New Account',
        onClick: buttonClickNav
      },
      API.fetchAccounts,
    )
    this.editClickNav = editClickNav
    autoBind(this)
    this.columns = [
      {
        Header: 'ID',
        accessor: 'id',
        filterable: true
      },
      {
        Header: 'Username',
        accessor: 'username',
        filterable: true
      },
      {
        id: 'admin',
        Header: 'Admin',
        accessor: d => d.admin.toString(),
        filterable: true
      },
      //{
      //  Header: 'Actions',
      //  sortable: false,
      //  Cell: row => <ProjectStatusCell row={row}/>,
      //}
    ]
  }

  /**
   * @name clickHandler
   * @description Handles action icon clicks
   * @method clickHandler
   * @param  {Object}     row   Row of click
   * @param  {String}     type  Icon click type
   * @memberof AccountTableModel.prototype
   */
  clickHandler(row, type){
    if (type == 'edit'){
      this.editClickNav()
    }
  }
}
