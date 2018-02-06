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
   * @name selectCustomerPage
   * @description Updates title, tableModel, content, buttons, and navHighlight for Select Customer page.
   * @memberof Page.prototype
   * @method selectCustomerPage
   * @mobx action
   */
  @action selectCustomerPage(){
    this.title = 'Select Customer'
    // Button, fetchFn, rowSelectFn, columns
    this.tableModel = new TableModel(
      {
        title: 'New Customer',
        onClick: () => this.newCustomerPage()
      },
      this.fetchFn,
      () => console.log('rowSelectFn'),
      customerColumns
    )
    this.content = null
    this.buttons = []
    this.navHighlight = 'Create New Project'
  }

  /**
   * @name newCustomerPage
   * @description Updates title, tableModel, content, buttons, and navHighlight for New Customer page.
   * @memberof Page.prototype
   * @method newCustomerPage
   * @mobx action
   */
  @action newCustomerPage(){
    this.title = 'New Customer'
    this.tableModel = null
    this.content = <h1>insert various fields , cont, and cancel buttons</h1>
    this.buttons = []
  }

  /**
   * @name createNewProjMenuItem
   * @description Updates title, tableModel, content, buttons, and navHighlight for Create New Project page.
   * @memberof Page.prototype
   * @method createNewProjMenuItem
   * @mobx action
   */
  @action createNewProjMenuItem(){
    this.title = 'New Project'
    this.content = <h1>insert various fields</h1>
    this.tableModel = null
    this.buttons = []
  }

  /**
   * @name projectsMenuItem
   * @description Updates title, tableModel, content, buttons, and navHighlight for Projects page.
   * @memberof Page.prototype
   * @method projectsMenuItem
   * @mobx action
   */
  @action projectsMenuItem(){
    this.title = 'Open Projects' //title depends on selected filter
    this.tableModel = new TableModel(
      null,
      this.fetchFn,
      () => console.log('rowSelectFn'),
      projectColumns
    )
    this.content = null
    this.buttons = []
  }

  /**
   * @name projectTimeEntryMenuItem
   * @description Updates title, tableModel, content, buttons, and navHighlight for Project Time Entry page.
   * @memberof Page.prototype
   * @method projectTimeEntryMenuItem
   * @mobx action
   */
  @action projectTimeEntryMenuItem(){
    this.title = 'Time Entry'
    this.content = <h1>insert various fields</h1>
    this.tableModel = null
    this.buttons = []
  }

  /**
   * @name customerInfoMenuItem
   * @description Updates title, tableModel, content, buttons, and navHighlight for Customer Information page.
   * @memberof Page.prototype
   * @method customerInfoMenuItem
   * @mobx action
   */
  @action customerInfoMenuItem(){
    this.title = 'Customer Information'
    this.tableModel = new TableModel(
      {
        title: 'New Customer',
        onClick: () => this.newCustomerPage()
      },
      this.fetchFn,
      () => console.log('rowSelectFn'),
      customerColumns
    )
    this.content = null
    this.buttons = []
    //click a customer name and model pops up with "Projects" modal
  }

  /**
   * @name emplProductivityMenuItem
   * @description Updates title, tableModel, content, buttons, and navHighlight for Employee Productivity page.
   * @memberof Page.prototype
   * @method emplProductivityMenuItem
   * @mobx action
   */
  @action emplProductivityMenuItem(){
    this.title = 'Employee Productivity'
    this.content = <h1>insert analysis and graph</h1>
    this.buttons = []
  }

  /**
   * @name workstationTrackingMenuItem
   * @description Updates title, tableModel, content, buttons, and navHighlight for Workstation Tracking page.
   * @memberof Page.prototype
   * @method workstationTrackingMenuItem
   * @mobx action
   */
  @action workstationTrackingMenuItem(){
    this.title = 'Workstation Tracking'
    this.content = <h1>insert analysis and graph</h1>
    this.buttons = []
  }

  /**
   * @name jobTypeProductivityMenuItem
   * @description Updates title, tableModel, content, buttons, and navHighlight for Job Type Productivity page.
   * @memberof Page.prototype
   * @method jobTypeProductivityMenuItem
   * @mobx action
   */
  @action jobTypeProductivityMenuItem(){
    this.title = 'Job Type Productivity'
    this.content = <h1>insert analysis and graph</h1>
    this.buttons = []
  }

  /**
   * @name costCenterTimeMenuItem
   * @description Updates title, tableModel, content, buttons, and navHighlight for Cost Center Time page.
   * @memberof Page.prototype
   * @method costCenterTimeMenuItem
   * @mobx action
   */
  @action costCenterTimeMenuItem(){
    this.title = 'Cost Center Time'
    this.content = <h1>insert analysis and graph</h1>
    this.buttons = []
  }

  /**
   * @name employeeInformationMenuItem
   * @description Updates title, tableModel, content, buttons, and navHighlight for Employee Information page.
   * @memberof Page.prototype
   * @method employeeInformationMenuItem
   * @mobx action
   */
  @action employeeInformationMenuItem(){
    this.title = 'Employee Information'
    this.content = <h1>insert analysis and graph</h1>
    this.buttons = []
  }

  /**
   * @name accountManagementMenuItem
   * @description Updates title, tableModel, content, buttons, and navHighlight for Account Management page.
   * @memberof Page.prototype
   * @method accountManagementMenuItem
   * @mobx action
   */
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
