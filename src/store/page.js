import React from 'react'
import { action, useStrict, extendObservable, observable, computed } from 'mobx'
import CustomerTable from '../components/customerTable'
import EmployeeTable from '../components/employeeTable'
import ProjectTable from '../components/projectTable'
import CustomerForm from '../components/customerForm'
import EmployeeForm from '../components/employeeForm'
import ProjectForm from '../components/projectForm'
import TimeEntryForm from '../components/timeEntryForm'
import EmployeeSummary from '../components/employeeSummary'
import ProjectSummary from '../components/projectSummary'
import CustomerSummary from '../components/customerSummary'

useStrict(true)

/**
 * @name Page
 * @class Page
 * @classdesc Main MobX store for page
 * @property {Boolean} [loggedin=false] Indicates whether currently logged in [observable]
 * @property {String} [title='Default Title'] Page title [observable]
 * @property {Object} [content=null] Page inner content [observable]
 * @property {TableModel} [tableModel=null] Page table model, if any [observable]
 * @property {Component} [table=null] Page-specific table component to render, if any [observable]
 * @property {FormModel} [formModel=null] Page form model, if any [observable]
 * @property {Boolean} [formEdit=false] Indicator for form editing [observable]
 * @property {Component} [form=null] Page-specific table component to render, if any [observable]
 * @property {Array} [buttons=[]] Page button set [observable]
 */
class Page {
  constructor() {
    let addtlProps = {
      loggedin: false,
      title: 'Default Title',
      content: null,
      tableModel: null,
      table: null,
      formModel: null,
      formEdit: false,
      form: null,
      buttons: [],
      logOutModal: {
        open: false,
      }
    }
    extendObservable(this, addtlProps)
  }

  /**
   * @name setTableModel
   * @description Sets table model
   * @method setTableModel
   * @memberof Page.prototype
   * @param  {TableModel}      tableModel TableModel to use for page
   * @mobx action
   */
  @action setTableModel(tableModel){this.tableModel = observable(tableModel)}
  /**
   * @name setFormModel
   * @description Sets form model
   * @method setFormModel
   * @memberof Page.prototype
   * @param  {FormModel}      formModel FormModel to use for page
   * @mobx action
   */
  @action setFormModel(formModel){this.formModel = observable(formModel)}

  // Page Changes - Projects

  /**
   * @name createNewProjMenuItem
   * @description Updates title, form, table, content, and buttons for Create New Project page
   * @method createNewProjMenuItem
   * @memberof Page.prototype
   * @mobx action
   */
  @action createNewProjMenuItem(){
    this.title = 'New Project'
    this.content = null
    this.table = null
    this.form = ProjectForm
    this.formEdit = false
    this.buttons = []
  }

  /**
   * @name selectCustomerPage
   * @description Updates title, form, table, content, and buttons for Select Customer page.
   * @memberof Page.prototype
   * @method selectCustomerPage
   * @mobx action
   */
  @action selectCustomerPage(){
    this.title = 'Select Customer'
    this.table = CustomerTable
    this.content = null
    this.form = null
    this.buttons = []
  }

  /**
   * @name newCustomerPage
   * @description Updates title, form, table, content, and buttons for New Customer page.
   * @memberof Page.prototype
   * @method newCustomerPage
   * @mobx action
   */
  @action newCustomerPage(){
    this.title = 'New Customer'
    this.table = null
    this.content = null
    this.form = CustomerForm
    this.formEdit = false
    this.buttons = []
  }

  /**
   * @name projectSummaryPage
   * @description Updates title, form, table, content, and buttons for Project Summary page
   * @method projectSummaryPage
   * @memberof Page.prototype
   * @mobx action
   */
  @action projectSummaryPage(){
    this.title = ''
    this.table = null
    this.content = ProjectSummary
    this.form = null
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
  }

  /**
   * @name projectEditPage
   * @description Updates title, form, table, content, and buttons for Project Edit page
   * @method projectEditPage
   * @memberof Page.prototype
   * @mobx action
   */
  @action projectEditPage(){
    this.title = ''
    this.table = null
    this.content = null
    this.form = ProjectForm
    this.formEdit = true
    this.buttons = []
  }

  /**
   * @name projectsMenuItem
   * @description Updates title, form, table, content, and buttons for Projects page
   * @method projectsMenuItem
   * @memberof Page.prototype
   * @mobx action
   */
  @action projectsMenuItem(){
    this.title = 'Projects'
    this.table = ProjectTable
    this.content = null
    this.form = null
    this.buttons = []
  }

  /**
   * @name projectTimeEntryMenuItem
   * @description Updates title, form, table, content, and buttons for Project Time Entry page.
   * @memberof Page.prototype
   * @method projectTimeEntryMenuItem
   * @mobx action
   */
  @action projectTimeEntryMenuItem(){
    this.title = 'Time Entry'
    this.content = null
    this.table = null
    this.form = TimeEntryForm
    this.formEdit = false
    this.buttons = []
  }

  /**
   * @name customerInfoMenuItem
   * @description Updates title, form, table, content, and buttons for Customer Information page.
   * @memberof Page.prototype
   * @method customerInfoMenuItem
   * @mobx action
   */
  @action customerInfoMenuItem(){
    this.title = 'Customers'
    this.table = CustomerTable
    this.content = null
    this.form = null
    this.buttons = []
  }

  /**
   * @name customerSummaryPage
   * @description Updates title, form, table, content, and buttons for Customer Summary page
   * @method customerSummaryPage
   * @memberof Page.prototype
   * @mobx action
   */
  @action customerSummaryPage(){
    this.title = 'Customer Summary'
    this.table = null
    this.content = CustomerSummary
    this.form = null
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
  }

  /**
   * @name customerEditPage
   * @description Updates title, form, table, content, and buttons for Customer Edit page
   * @method customerEditPage
   * @memberof Page.prototype
   * @mobx action
   */
  @action customerEditPage(){
    this.title = 'Edit Customer'
    this.table = null
    this.content = null
    this.form = CustomerForm
    this.formEdit = true
    this.buttons = []
  }

  // Page Changes - Analytics

  /**
   * @name emplProductivityMenuItem
   * @description Updates title, form, table, content, and buttons for Employee Productivity page.
   * @memberof Page.prototype
   * @method emplProductivityMenuItem
   * @mobx action
   */
  @action emplProductivityMenuItem(){
    this.title = 'Employee Productivity [Q3]'
    this.form = null
    this.table = null
    this.content = <h1>insert analysis and graph</h1>
    this.buttons = []
  }

  /**
   * @name workstationTrackingMenuItem
   * @description Updates title, form, table, content, and buttons for Workstation Tracking page.
   * @memberof Page.prototype
   * @method workstationTrackingMenuItem
   * @mobx action
   */
  @action workstationTrackingMenuItem(){
    this.title = 'Workstation Tracking [Q3]'
    this.form = null
    this.table = null
    this.content = <h1>insert analysis and graph</h1>
    this.buttons = []
  }

  /**
   * @name jobTypeProductivityMenuItem
   * @description Updates title, form, table, content, and buttons for Job Type Productivity page.
   * @memberof Page.prototype
   * @method jobTypeProductivityMenuItem
   * @mobx action
   */
  @action jobTypeProductivityMenuItem(){
    this.title = 'Job Type Productivity [Q3]'
    this.form = null
    this.table = null
    this.content = <h1>insert analysis and graph</h1>
    this.buttons = []
  }

  /**
   * @name costCenterTimeMenuItem
   * @description Updates title, form, table, content, and buttons for Cost Center Time page.
   * @memberof Page.prototype
   * @method costCenterTimeMenuItem
   * @mobx action
   */
  @action costCenterTimeMenuItem(){
    this.title = 'Cost Center Time [Q3]'
    this.form = null
    this.table = null
    this.content = <h1>insert analysis and graph</h1>
    this.buttons = []
  }

  // Page Changes - Admin

  /**
   * @name employeeInformationMenuItem
   * @description Updates title, form, table, content, and buttons for Employee Information page.
   * @memberof Page.prototype
   * @method employeeInformationMenuItem
   * @mobx action
   */
   @action employeeInformationMenuItem(){
     this.title = 'Employee Information'
     this.table = EmployeeTable
     this.content = null
     this.form = null
     this.buttons = []
   }

   /**
    * @name newEmployeePage
    * @description Updates title, form, table, content, and buttons for New Employee page.
    * @memberof Page.prototype
    * @method newEmployeePage
    * @mobx action
    */
   @action newEmployeePage(){
     this.title = 'New Employee'
     this.table = null
     this.content = null
     this.form = EmployeeForm
     this.formEdit = false
     this.buttons = []
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
     this.table = null
     this.content = EmployeeSummary
     this.form = EmployeeForm
     this.formEdit = true
     this.buttons = []
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
     this.table = null
     this.form = null
     this.content = EmployeeSummary
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
   * @description Updates title, form, table, content, and buttons for Account Management page.
   * @memberof Page.prototype
   * @method accountManagementMenuItem
   * @mobx action
   */
  @action accountManagementMenuItem(){
    this.title = 'Account Management [Q3]'
    this.form = null
    this.table = null
    this.content = <h1>insert table</h1>
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

  /**
   * @name logOutAlert
   * @description Opens log out modal
   * @method logOutAlert
   * @memberof Page.prototype
   * @mobx action
   */
  @action logOutAlert(){
    this.logOutModal.open = true
  }

  /**
   * @name logOutDismiss
   * @description Closes log out modal
   * @method logOutDismiss
   * @memberof Page.prototype
   * @mobx action
   */
  @action logOutDismiss(){
    this.logOutModal.open = false
  }

  /**
   * @name logOutModalOpen
   * @description Shows status of modal
   * @method logOutModalOpen
   * @return {Boolean}
   * @mobx computed
   */
  @computed get logOutModalOpen(){
    return this.logOutModal.open
  }

}

const page = new Page()
export default page
