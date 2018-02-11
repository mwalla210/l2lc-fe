import React from 'react'
import { action, useStrict, extendObservable } from 'mobx'
import TableModel from '../models/tableModel'
import FormModel from '../models/formModel'
import API from '../api'
useStrict(true)

const highPriority = '#f4ba61'
const medPriority = '#f4e261'
const projectColumns = [
  {
    Header: 'ID',
    accessor: 'id',
    filterable: true
  },
  {
    Header: 'Created',
    accessor: 'dateCreated'
  },
  {
    Header: 'Title',
    accessor: 'title'
  },
  {
    id: 'customerName', // Required because our accessor is not a string
    Header: 'Customer Name',
    accessor: d => d.customer.name
  },
  {
    id: 'costCenter', // Required because our accessor is not a string
    Header: 'Cost Center',
    accessor: d => d.costCenter.title
  },
  {
    Header: 'Time Spent',
    accessor: 'timeSpent'
  },
  {
    Header: 'Finished',
    accessor: 'dateFinished'
  },
  {
    Header: 'Status',
    accessor: 'status',
    filterable: true,
    Cell: row => (
      <span>
        {/* TODO: adjust this to be accurate for values of fn*/}
        <span style={{
          color: row.value === 'Closed' ? '#ff2e00'
            : row.value === '?' ? '#ffbf00'
            : '#57d500',
          transition: 'all .3s ease'}}>
            &#x25cf;
        </span>
        {row.value}
      </span>
    ),
    filterMethod: (filter, row) => {
      if (filter.value === 'all') {
        return true
      }
      if (filter.value === 'true') {
        {/* TODO: adjust this to be accurate for values of fn*/}
        return row[filter.id] == 'Open'
      }
      {/* TODO: adjust this to be accurate for values of fn*/}
      return row[filter.id] != 'Open'
    },
    Filter: ({ filter, onChange }) =>
      <select
        onChange={event => onChange(event.target.value)}
        style={{ width: '100%' }}
        value={filter ? filter.value : 'all'}
      >
        <option value="all">Show All</option>
        <option value="true">Open</option>
        <option value="false">Closed</option>
      </select>
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
    accessor: 'companyName'
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
 */
class Page {
  constructor() {
    let addtlProps = {
      loggedin: true,
      title: 'Default Title',
      navHighlight: '',
      content: null,
      tableModel: null,
      formModel: null,
      buttons: [],
    }
    extendObservable(this, addtlProps)
    // Define once, reference later
    this.projectTableModel = new TableModel(
      null,
      API.fetchProjects,
      () => console.log('rowSelectFn'),
      projectColumns,
      null,
      // TODO: make sure comparison is accurate to priority types
      (state, rowInfo) => {
        if (rowInfo && rowInfo.row._original.priority != 'low'){
          return {
            style: {
              background: rowInfo.row._original.priority == 'high' ? highPriority : medPriority
            }
          }
        }
        return {}
      }
    )
    this.customerTableModel = new TableModel(
      {
        title: 'New Customer',
        onClick: () => this.newCustomerPage()
      },
      API.fetchCustomers,
      () => console.log('rowSelectFn'),
      customerColumns
    )
    this.employeeTableModel = new TableModel(
      {
        title: 'New Employee',
        onClick: () => this.newEmployeePage()
      },
      API.fetchEmployees,
      () => console.log('rowSelectFn'),
      employeeColumns
    )
  }

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

  // Page Changes - Projects

  @action createNewProjMenuItem(){
    this.title = 'New Project'
    this.content = <p>A form!</p>
    this.tableModel = null
    this.formModel = null
    this.buttons = []
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
    this.tableModel = this.customerTableModel
    this.tableModel.dataFetch()
    this.content = null
    this.formModel = null
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
    this.content = null
    let fields = [
      {
        type: 'textfield',
        label: 'Company Name',
        id: 'companyName',
        required: true
      },
      {
        type: 'textfield',
        label: 'Email Address',
        id: 'emailAddress',
        required: true
      },
      {
        type: 'textfield',
        label: 'Phone Number',
        id: 'phoneNumber',
        required: true
      },
      {
        type: 'textfield',
        label: 'Website',
        id: 'websiteLink',
        required: false
      },
      {
        type: 'select',
        label: 'Region',
        id: 'region',
        options: ['Select...','United States','Canada','Mexico','Europe','Asia','Africa'],
        required: true
      },
      {
        type: 'textfield',
        label: 'Country',
        id: 'country',
        required: false //NEED TO UPDATE DEPENDING ON SELECTED REGION
      },
      {
        type: 'textfield',
        label: 'Address Line 1',
        id: 'adressLine1',
        required: true
      },
      {
        type: 'textfield',
        label: 'Address Line 2',
        id: 'adressLine2',
        required: false
      },
      {
        type: 'textfield',
        label: 'City',
        id: 'city',
        required: true
      },
      {
        type: 'select',
        label: 'State',
        id: 'State',
        options: ['Select...','Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado',
          'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois',
          'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland',
          'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana',
          'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
          'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
          'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah',
          'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'],
        required: false //NEED TO UPDATE DEPENDING ON SELECTED REGION
      },
      {
        type: 'textfield',
        label: 'Zip Code',
        id: 'zipCode',
        required: false //NEED TO UPDATE DEPENDING ON SELECTED REGION; SOME COUNTRIES DONT HAVE ZIP CODES
      },
      {
        type: 'checkbox',
        label: 'Billing Address is NOT the same as the Shipping Address',
        id: 'enableShippingAddre',
        required: false
      },
      {
        type: 'textfield',
        label: 'Address Line 1',
        id: 'adressLine1',
        required: false
      },
      {
        type: 'textfield',
        label: 'Address Line 2',
        id: 'adressLine2',
        required: false
      },
      {
        type: 'textfield',
        label: 'City',
        id: 'city',
        required: false
      },
      {
        type: 'textfield',
        label: 'State',
        id: 'state',
        required: false
      },
      {
        type: 'textfield',
        label: 'Country',
        id: 'country',
        required: false
      },
      {
        type: 'textfield',
        label: 'Zip Code',
        id: 'zipCode',
        required: false
      }
    ]
    this.formModel = new FormModel(fields,
      {
        title: 'Continue',
        onClick: () => console.log('onClick')
      },
      {
        title: 'Cancel',
        onClick: () => console.log('onClick')
      }
    )
    this.buttons = []
  }

  /**
   * @name projectsMenuItem
   * @description Updates table, titleModel, content, buttons, and navHighlight for Projects page
   * @method projectsMenuItem
   * @memberof Page.prototype
   * @mobx action
   */
  @action projectsMenuItem(){
    this.title = 'Projects'
    this.tableModel = this.projectTableModel
    this.tableModel.dataFetch()
    this.content = null
    this.formModel = null
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
    this.content = null
    this.tableModel = null
    let fields = [
      {
        type: 'textfield',
        label: 'Project ID',
        id: 'id',
        required: true
      },
      {
        type: 'textfield',
        label: 'Employee ID',
        id: 'id',
        required: true
      }
    ]
    this.formModel = new FormModel(fields,
      {
        title: 'Submit',
        onClick: () => console.log('submit button onClick')
      },
      {
        title: 'Clear',
        onClick: () => console.log('clear button onClick')
      }
    )
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
    this.tableModel = this.customerTableModel
    this.tableModel.dataFetch()
    this.content = null
    this.formModel = null
    this.buttons = []
    //click a customer name and model pops up with "Projects" modal
  }

  // Page Changes - Analytics

  /**
   * @name emplProductivityMenuItem
   * @description Updates title, tableModel, content, buttons, and navHighlight for Employee Productivity page.
   * @memberof Page.prototype
   * @method emplProductivityMenuItem
   * @mobx action
   */
  @action emplProductivityMenuItem(){
    this.title = 'Employee Productivity [Q3]'
    this.formModel = null
    this.tableModel = null
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
    this.title = 'Workstation Tracking [Q3]'
    this.formModel = null
    this.tableModel = null
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
    this.title = 'Job Type Productivity [Q3]'
    this.formModel = null
    this.tableModel = null
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
    this.title = 'Cost Center Time [Q3]'
    this.formModel = null
    this.tableModel = null
    this.content = <h1>insert analysis and graph</h1>
    this.buttons = []
  }

  // Page Changes - Admin

  /**
   * @name employeeInformationMenuItem
   * @description Updates title, tableModel, content, buttons, and navHighlight for Employee Information page.
   * @memberof Page.prototype
   * @method employeeInformationMenuItem
   * @mobx action
   */
   @action employeeInformationMenuItem(){
     this.title = 'Employee Information'
     this.tableModel = this.employeeTableModel
     this.tableModel.dataFetch()
     this.content = null
     this.formModel = null
     this.buttons = []
     //click a customer name and model pops up with "Projects" modal
   }

   @action newEmployeePage(){
     this.title = 'New Employee'
     this.tableModel = null
     this.content = null
     let fields = [
       {
         type: 'textfield',
         label: 'First Name',
         id: 'firstName',
         required: true
       },
       {
         type: 'textfield',
         label: 'Last Name',
         id: 'lastName',
         required: true
       },
       {
         type: 'checkbox',
         label: 'Active',
         id: 'active',
         required: false
       }
     ]
     this.formModel = new FormModel(fields,
       {
         title: 'Continue',
         onClick: () => console.log('onClick')
       },
       {
         title: 'Cancel',
         onClick: () => console.log('onClick')
       }
     )
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
    this.title = 'Account Management [Q3]'
    this.formModel = null
    this.tableModel = null
    this.content = <h1>insert analysis and graph</h1>
    this.buttons = []
  }

  // TODO remove
  @action changeLogin(){
    this.loggedin = !this.loggedin
    this.createNewProjMenuItem()
  }

  /**
   * @name logOut
   * @description Log out method
   * @method logOut
   * @memberof Page.prototype
   * @mobx action
   */
  @action logOut(){
    this.loggedin = !this.loggedin
  }
}

const page = new Page()
export default page
