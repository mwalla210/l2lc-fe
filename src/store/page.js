import React from 'react'
import { action, useStrict, extendObservable } from 'mobx'
import TableModel from '../models/tableModel'
import FormModel from '../models/formModel'
import API from '../api'
import Website from './website'
import JsBarcode from 'jsbarcode'

useStrict(true)

const highPriority = '#f4ba61'
const medPriority = '#f4e261'

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
    this.projectColumns = [
      {
        Header: 'ID',
        accessor: 'id',
        filterable: true
      },
      {
        Header: 'Created',
        accessor: 'dateCreated',
        filterable: true
      },
      {
        Header: 'Title',
        accessor: 'title',
        filterable: true
      },
      {
        id: 'customerName', // Required because our accessor is not a string
        Header: 'Customer Name',
        accessor: d => d.customer.name,
        filterable: true
      },
      {
        id: 'costCenter', // Required because our accessor is not a string
        Header: 'Cost Center',
        accessor: d => d.costCenter.title,
        filterable: true
      },
      {
        Header: 'Time Spent',
        accessor: 'timeSpent',
        filterable: true
      },
      {
        Header: 'Finished',
        accessor: 'dateFinished',
        filterable: true
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
      {
        Header: 'Actions',
        sortable: false,
        getProps: () => {
          return {
            className: 'center',
            style: {
              paddingTop: '0px',
              paddingBottom: '0px'
            }
          }
        },
        Cell: row => (
          <span>
            <span>
              <button type="button" className="btn btn-default btn-circle" aria-label="Left Align" onClick={() => {
                Website.setProject(row.original)
                this.projectSummaryPage()
              }}>
                <img src="../../style/open-iconic-master/svg/info.svg" alt="info"/>
              </button>
              <button type="button" className="btn btn-default btn-circle" aria-label="Left Align" onClick={() => {
                Website.setProject(row.original)
                this.projectEditPage()
              }}>
                <img src="../../style/open-iconic-master/svg/pencil.svg" alt="pencil" style={{marginLeft: '2px'}}/>
              </button>
              <button type="button" className="btn btn-default btn-circle" aria-label="Left Align" onClick={() => {
                Website.setProject(row.original)
                this.projectTableModel.openModal()
              }}>
                <img src="../../style/open-iconic-master/svg/trash.svg" alt="trash" style={{marginLeft: '2px'}}/>
              </button>
            </span>
          </span>
        )
      }
    ]
    this.customerColumns = [
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
        Cell: row => (
          <span>
            <span>
              <button type="button" className="btn btn-default btn-circle" aria-label="Left Align" onClick={() => {
                Website.setCustomer(row.original)
                this.customerSummaryPage()
              }}>
                <img src="../../style/open-iconic-master/svg/info.svg" alt="info"/>
              </button>
              <button type="button" className="btn btn-default btn-circle" aria-label="Left Align" onClick={() => {
                Website.setCustomer(row.original)
                this.customerEditPage()
              }}>
                <img src="../../style/open-iconic-master/svg/pencil.svg" alt="pencil" style={{marginLeft: '2px'}}/>
              </button>
            </span>
          </span>
        )
      }
    ]
    this.employeeColumns = [
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
              <img
                onLoad={() => JsBarcode(`#${row.original.firstName}${row.original.id}`, `${row.original.id}`)}
                id={`${row.original.firstName}${row.original.id}`}
                src="../../style/open-iconic-master/svg/image.svg"
                alt="image"
              />
            </span>
          </span>
        )
      },
      {
        Header: 'Actions',
        sortable: false,
        getProps: () => {
          return {
            className: 'center',
            style: {
              paddingTop: '0px',
              paddingBottom: '0px',
            }
          }
        },
        Cell: row => (
          <span>
            <span>
              <button type="button" className="btn btn-default btn-circle" aria-label="Left Align" onClick={() => {
                Website.setEmployee(row.original)
                this.employeeSummaryPage()
              }}>
                <img src="../../style/open-iconic-master/svg/info.svg" alt="info"/>
              </button>
              <button type="button" className="btn btn-default btn-circle" aria-label="Left Align" onClick={() => {
                Website.setEmployee(row.original)
                this.employeeEditPage()
              }}>
                <img src="../../style/open-iconic-master/svg/pencil.svg" alt="pencil" />
              </button>
              <button type="button" className="btn btn-default btn-circle" aria-label="Left Align" onClick={() => {
                Website.setEmployee(row.original)
                this.employeeTableModel.openModal()
              }}>
                <img src="../../style/open-iconic-master/svg/trash.svg" alt="trash" style={{marginLeft: '2px'}}/>
              </button>
            </span>
          </span>
        )
      }
    ]
    // tableButton, fetchFn, rowSelectFn, columns, deleteModal, styling
    this.projectTableModel = new TableModel(
      null,
      API.fetchProjects,
      null,
      this.projectColumns,
      {
        title: 'Delete Project?',
        confirmOnClick: () => console.log('confirm'),
        content: 'This action cannot be undone.'
      },
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
    // tableButton, fetchFn, rowSelectFn, columns, deleteModal, styling
    this.customerTableModel = new TableModel(
      {
        title: 'New Customer',
        onClick: () => this.newCustomerPage()
      },
      API.fetchCustomers,
      null,
      this.customerColumns,
    )
    // tableButton, fetchFn, rowSelectFn, columns, deleteModal, styling
    this.employeeTableModel = new TableModel(
      {
        title: 'New Employee',
        onClick: () => this.newEmployeePage()
      },
      API.fetchEmployees,
      () => console.log('rowSelectFn'),
      this.employeeColumns,
      {
        title: 'Delete Employee?',
        confirmOnClick: () => console.log('confirm'),
        content: 'This action cannot be undone.'
      },
    )
  }

  /*
  Page will house all of the sidebar "change page" functions
  Each function will set title, content, tableModel, buttons, and navHighlight
  If page requires a table, table model should be initialized
  All fetch functions should "modelize" returned data into appropriate models (this file will import models from folder)
   */

  // Page Changes - Projects

  /**
   * @name createNewProjMenuItem
   * @description Updates table, titleModel, content, buttons, and navHighlight for Create New Project page
   * @method createNewProjMenuItem
   * @memberof Page.prototype
   * @mobx action
   */
  @action createNewProjMenuItem(){
    this.title = 'New Project'
    this.content = <p>A form!</p>
    this.tableModel = null
    this.formModel = null
    this.buttons = []
    this.navHighlight = 'Create New Project'
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
   * @name projectSummaryPage
   * @description Updates title, tableModel, content, buttons, and navHighlight for Project Summary page
   * @method projectSummaryPage
   * @memberof Page.prototype
   * @mobx action
   */
  @action projectSummaryPage(){
    this.title = ''
    this.tableModel = null
    this.content = null
    this.formModel = null
    this.buttons = [
      {
        title: 'Tasks',
        onClick: () => console.log('Go to tasks page')
      },
      {
        title: 'Edit Information',
        onClick: () => console.log('Go to edit project page')
      },
      {
        title: 'Add Rework',
        onClick: () => console.log('Rework modal')
      },
      {
        title: 'Modify Hold Status',
        onClick: () => console.log('Hold modal')
      },
      {
        title: 'Delete',
        onClick: () => console.log('Confirm delete'),
        class: 'btn-danger'
      },
    ]
    this.navHighlight = ''
  }

  /**
   * @name projectEditPage
   * @description Updates title, tableModel, content, buttons, and navHighlight for Project Edit page
   * @method projectEditPage
   * @memberof Page.prototype
   * @mobx action
   */
  @action projectEditPage(){
    this.title = ''
    this.tableModel = null
    this.content = null
    this.formModel = null
    this.buttons = []
    this.navHighlight = ''
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
    this.navHighlight = 'Projects'
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
    this.navHighlight = 'Time Entry'
  }

  /**
   * @name customerInfoMenuItem
   * @description Updates title, tableModel, content, buttons, and navHighlight for Customer Information page.
   * @memberof Page.prototype
   * @method customerInfoMenuItem
   * @mobx action
   */
  @action customerInfoMenuItem(){
    this.title = 'Customers'
    this.tableModel = this.customerTableModel
    this.tableModel.dataFetch()
    this.content = null
    this.formModel = null
    this.buttons = []
    // click a customer name and model pops up with "Projects" modal
    this.navHighlight = 'Customer Information'
  }

  /**
   * @name customerSummaryPage
   * @description Updates title, tableModel, content, buttons, and navHighlight for Customer Summary page
   * @method customerSummaryPage
   * @memberof Page.prototype
   * @mobx action
   */
  @action customerSummaryPage(){
    this.title = 'Edit Customer'
    this.tableModel = null
    this.content = null
    this.formModel = null
    this.buttons = [
      {
        title: 'Edit',
        onClick: () => console.log('Go to edit customer page')
      },
      {
        title: 'Delete',
        onClick: () => console.log('Confirm delete'),
        class: 'btn-danger'
      },
    ]
    this.navHighlight = ''
  }

  /**
   * @name customerEditPage
   * @description Updates title, tableModel, content, buttons, and navHighlight for Customer Edit page
   * @method customerEditPage
   * @memberof Page.prototype
   * @mobx action
   */
  @action customerEditPage(){
    this.title = ''
    this.tableModel = null
    this.content = null
    this.formModel = null
    this.buttons = []
    this.navHighlight = ''
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
    this.navHighlight = 'Employee Productivity'
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
    this.navHighlight = 'Workstation Tracking'
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
    this.navHighlight = 'Job Type Productivity'
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
    this.navHighlight = 'Cost Center Time'
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
     this.navHighlight = 'Employee Information'
   }

   /**
    * @name newEmployeePage
    * @description Allows creation of employee
    * @memberof Page.prototype
    * @method newEmployeePage
    * @mobx action
    */
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
     ]
     this.formModel = new FormModel(fields,
       {
         title: 'Continue',
         onClick: (fields) => {
           let body = {}
           fields.forEach(item => {
             body[item.id] = item.value.trim()
           })
           Website.createEmployee(body)
           .then(() => this.employeeSummaryPage())
         }
       },
       {
         title: 'Cancel',
         onClick: () => this.employeeInformationMenuItem()
       }
     )
     this.buttons = []
     this.navHighlight = 'Employee Information'
   }

   /**
    * @name employeeEditPage
    * @description Allows changing of information for Employee Information page entries.
    * @memberof Page.prototype
    * @method employeeEditPage
    * @mobx action
    */
   @action employeeEditPage(){
     this.title = 'Edit Employee'
     this.tableModel = null
     this.content =
     <div>
      <p>First Name: {Website.currentEmployee.firstName}</p>
      <p>Last Name: {Website.currentEmployee.lastName}</p>
       <img
         onLoad={() => JsBarcode(`#${Website.currentEmployee.firstName}${Website.currentEmployee.id}`, `${Website.currentEmployee.id}`)}
         id={`${Website.currentEmployee.firstName}${Website.currentEmployee.id}`}
         src="../../style/open-iconic-master/svg/image.svg"
         alt="image"
       />
     </div>
     let fields = [
       {
         type: 'textfield',
         label: 'New First Name',
         id: 'firstName',
         required: true
       },
       {
         type: 'textfield',
         label: 'New Last Name',
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
         onClick: () => this.employeeInformationMenuItem()
       },
       {
         title: 'Cancel',
         onClick: () => this.employeeInformationMenuItem()
       }
     )
     this.buttons = []
     this.navHighlight = 'Employee Information'
   }

   /**
    * @name employeeSummaryPage
    * @description Displays information about selected employee from Employee Information page entries.
    * @memberof Page.prototype
    * @method employeeSummaryPage
    * @mobx action
    */
   @action employeeSummaryPage(){
     this.title = 'Employee Summary'
     this.tableModel = null
     this.formModel = null
     this.content =
     <div>
      <p>First Name: {Website.currentEmployee.firstName}</p>
      <p>Last Name: {Website.currentEmployee.lastName}</p>
       <img
         onLoad={() => JsBarcode(`#${Website.currentEmployee.firstName}${Website.currentEmployee.id}`, `${Website.currentEmployee.id}`)}
         id={`${Website.currentEmployee.firstName}${Website.currentEmployee.id}`}
         src="../../style/open-iconic-master/svg/image.svg"
         alt="image"
       />
     </div>
     this.buttons = [
       {
         title: 'Edit',
         onClick: () => this.employeeEditPage()
       },
       {
         title: 'Delete',
         onClick: () => this.employeeInformationMenuItem(),
         class: 'btn-danger'
       },
     ]
     this.navHighlight = ''
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
    this.navHighlight = 'Account Information'
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
