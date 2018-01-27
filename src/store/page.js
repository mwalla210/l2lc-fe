import React from 'react'
import { action, useStrict, extendObservable } from 'mobx'
import TableModel from '../models/tableModel'
import TableButton from '../components/tableButton'
import Table from '../components/table'
useStrict(true)

const projectColumns = [
  {
    Header: 'ID',
    accessor: 'id',
    filterable: true
  },
  {
    id: 'customerName', // Required because our accessor is not a string
    Header: 'Customer Name',
    accessor: d => d.customer.name
  },
  {
    Header: 'Title',
    accessor: 'title'
  },
  {
    id: 'costCenter', // Required because our accessor is not a string
    Header: 'Cost Center',
    accessor: d => d.costCenter.title
  },
  {
    id: 'jobType', // Required because our accessor is not a string
    Header: 'Job Type',
    accessor: d => d.jobType.title
  },
  {
    Header: 'Status',
    accessor: 'status'
  },
  {
    Header: 'Priority',
    accessor: 'priority'
  },
  {
    Header: 'Time Spent',
    accessor: 'timeSpent'
  },
  {
    Header: 'Date Created',
    accessor: 'dateCreated'
  },
  {
    Header: 'Date Finished',
    accessor: 'dateFinished'
  },
]

const customerColumns = [
  {
    Header: 'ID',
    accessor: 'id',
    filterable: true
  },
  {
    Header: 'Name',
    accessor: 'name'
  },
  {
    Header: 'Shipping Address',
    accessor: 'formattedShipAddress'
  },
  {
    Header: 'Billing Address',
    accessor: 'formattedBillAddress'
  },
  {
    Header: 'Phone',
    accessor: 'phone'
  },
]

const employeeColumns = [
  {
    Header: 'ID',
    accessor: 'id'
  },
  {
    Header: 'Name',
    accessor: 'name'
  },
  {
    Header: 'Barcode',
    accessor: 'barcode'
  },
]

/**
 * @name Page
 * @class Page
 * @classdesc Main MobX store for page
 * @property {Boolean} [loggedin=false] Indicates whether currently logged in
 * @property {String} [title='Default Title'] Page title
 * @property {String} [navHighlight=''] Sidebar option highlighted
 * @property {Object} [content=null] Page inner content
 * @property {Array} [buttons=[]] Page inner content buttons
 */
class Page {
  constructor() {
    let addtlProps = {
      loggedin: true,
      title: 'Default Title',
      navHighlight: '',
      content: null,
      buttons: [],
    }
    extendObservable(this, addtlProps)
  }

  /*
  Page will house all of the sidebar "change page" functions
  Each function will set title, content, buttons, and navHighlight
  If page requires a table, table model should be initialized
  All fetch functions should "modelize" returned data into appropriate models (this file will import models from folder)
   */

  fetchFn(){
    console.log('fetchFn')
    return true
  }

  /**
   * @name customerSelect
   * @description Updates title, content, and buttons for Select Customer page. Content is table with table button and selectable rows.
   * @memberof Page.prototype
   * @method customerSelect
   * @mobx action
   */
  @action customerSelect(){
    this.title = 'Select Customer'
    let tableModel = new TableModel(
      <TableButton
        title='New Customer'
        onClick={() => console.log('New Customer Button')}/>,
      this.fetchFn,
      null,
      customerColumns
    )
    this.content = <Table tableModel={tableModel}/>
    this.buttons = []
  }

  // TODO remove
  @action changeLogin(){
    this.loggedin = !this.loggedin
    this.customerSelect()
  }
}

const page = new Page()
export default page
