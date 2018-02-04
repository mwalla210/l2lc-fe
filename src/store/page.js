import React from 'react'
import { action, useStrict, extendObservable } from 'mobx'
import TableModel from '../models/tableModel'
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
 * @property {Boolean} [loggedin=false] Indicates whether currently logged in [observable]
 * @property {String} [title='Default Title'] Page title [observable]
 * @property {String} [navHighlight=''] Sidebar option highlighted [observable]
 * @property {Object} [content=null] Page inner content [observable]
 * @property {Array} [buttons=[]] Page inner content buttons [observable]
 * @property {Array} [modalOpen=false] Whether a modal is currently open on page [observable]

 */
class Page {
  constructor() {
    let addtlProps = {
      loggedin: true,
      title: 'Default Title',
      navHighlight: '',
      content: null,
      tableModel: null,
      buttons: [],
      modalOpen: false,
    }
    extendObservable(this, addtlProps)
  }

  @action showModal(){this.modalOpen = true}
  @action hideModal(){this.modalOpen = false}

  /*
  Page will house all of the sidebar "change page" functions
  Each function will set title, content, tableModel, buttons, and navHighlight
  If page requires a table, table model should be initialized
  All fetch functions should "modelize" returned data into appropriate models (this file will import models from folder)
   */

  fetchFn(){
    console.log('fetchFn')
    return true
  }

  /**
   * @name customerSelect
   * @description Updates title, tableModel, content, buttons, and navHighlight for Select Customer page.
   * @memberof Page.prototype
   * @method customerSelect
   * @mobx action
   */
  @action customerSelect(){
    this.title = 'Select Customer'
    // Button, fetchFn, rowSelectFn, columns
    this.tableModel = new TableModel(
      {
        title: 'New Customer',
        onClick: () => console.log('New Customer Button')
      },
      this.fetchFn,
      () => console.log('rowSelectFn'),
      customerColumns
    )
    this.content = null
    this.buttons = []
    this.navHighlight = 'Create New Project'
  }

  @action createNewProjMenuItem(){
    this.title = 'New Project'
    this.content = <h1>insert various fields</h1>
    this.buttons = []
  }

  @action projectsMenuItem(){
    this.title = 'Open Projects' //title depends on selected filter
    this.tableModel = new TableModel(
      null,
      this.fetchFn,
      () => console.log('rowSelectFn'),
      projectColumns
    )
    this.content = <h1>content changes but the table does not display :(</h1>
    this.buttons = []
  }

  @action projectTimeEntryMenuItem(){
    this.title = 'Time Entry'
    this.content = <h1>insert various fields</h1>
    this.buttons = []
  }

  @action customerInfoMenuItem(){
    this.title = 'Customer Information'
    this.content = <h1>insert various fields and table</h1>
    this.buttons = []
  }

  @action emplProductivityMenuItem(){
    this.title = 'Employee Productivity'
    this.content = <h1>insert analysis and graph</h1>
    this.buttons = []
  }

  @action workstationTrackingMenuItem(){
    this.title = 'Workstation Tracking'
    this.content = <h1>insert analysis and graph</h1>
    this.buttons = []
  }

  @action jobTypeProductivityMenuItem(){
    this.title = 'Job Type Productivity'
    this.content = <h1>insert analysis and graph</h1>
    this.buttons = []
  }

  @action costCenterTimeMenuItem(){
    this.title = 'Cost Center Time'
    this.content = <h1>insert analysis and graph</h1>
    this.buttons = []
  }

  @action employeeInformationMenuItem(){
    this.title = 'Employee Information'
    this.content = <h1>insert analysis and graph</h1>
    this.buttons = []
  }

  @action accountManagementMenuItem(){
    this.title = 'Account Management'
    this.content = <h1>insert analysis and graph</h1>
    this.buttons = []
  }


  // TODO remove
  @action changeLogin(){
    this.loggedin = !this.loggedin
    this.createNewProjMenuItem()
  }
}

const page = new Page()
export default page
