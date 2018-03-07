import { action, useStrict, extendObservable, observable } from 'mobx'
import Form from '../components/form'
import Table from '../components/table'
import SummarySelector from './summarySelector'
import FormSelector from './formSelector'
import TableSelector from './tableSelector'
import Website from './website'
import autoBind from 'auto-bind'
useStrict(true)

/**
 * @name Page
 * @class Page
 * @classdesc Main MobX store for page
 * @property {String} [title='Default Title'] Page title [observable]
 * @property {?Object} [content=null] Page inner content [observable]
 * @property {?TableModel} [tableModel=null] Page table model, if any [observable]
 * @property {?FormModel} [formModel=null] Page form model, if any [observable]
 * @property {?SummaryModel} [summaryModel=null] Page summary model, if any [observable]
 */
class Page {
  constructor() {
    let addtlProps = {
      title: 'Default Title',
      content: null,
      tableModel: null,
      formModel: null,
      summaryModel: null
    }
    extendObservable(this, addtlProps)
    autoBind(this)
  }

  /**
   * @name setTableModel
   * @description Sets table model
   * @method setTableModel
   * @memberof Page.prototype
   * @param  {TableModel}      tableModel TableModel to use for page
   * @mobx action
   */
  @action setTableModel(tableModel){
    this.tableModel = observable(tableModel)
    this.tableModel.dataFetch()
  }
  /**
   * @name setSummaryModel
   * @description Sets summary model
   * @method setSummaryModel
   * @memberof Page.prototype
   * @param  {SummaryModel}      summaryModel SummaryModel to use for page
   * @mobx action
   */
  @action setSummaryModel(summaryModel){
    this.summaryModel = observable(summaryModel)
  }
  /**
   * @name setFormModel
   * @description Sets form model
   * @method setFormModel
   * @memberof Page.prototype
   * @param  {FormModel}      formModel FormModel to use for page
   * @mobx action
   */
  @action setFormModel(formModel){this.formModel = observable(formModel)}

  // Page Changes - Create Projects

  /**
   * @name createNewProjMenuItem
   * @description Updates title, form, table, content, and buttons for Create New Project page
   * @method createNewProjMenuItem
   * @memberof Page.prototype
   * @mobx action
   */
  @action createNewProjMenuItem(){
    this.title = 'New Project'
    this.setFormModel(FormSelector.getProject(this.projectSummaryPage, this.selectCustomerPage))
    this.content = Form
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
    this.setTableModel(TableSelector.getSelectCustomer(this.newProjectCustomerPage, this.projectSummaryPage))
    this.content = Table
  }

  /**
   * @name newProjectCustomerPage
   * @description Updates title, form, table, content, and buttons for New Customer page.
   * @memberof Page.prototype
   * @method newProjectCustomerPage
   * @mobx action
   */
  @action newProjectCustomerPage(){
    this.title = 'New Customer for Project'
    let func = () => {
      let body = {
        jobType: Website.currentProject.jobTypeTitle,
        costCenter: Website.currentProject.costCenterTitle,
        title: Website.currentProject.title,
        description: Website.currentProject.descr,
        priority: Website.currentProject.priority,
        partCount: Website.currentProject.partCount,
        refNumber: Website.currentProject.refNum,
        customer: {id: Website.currentCustomer.id}
      }
      Website.createProject(body)
      .then(() => this.projectSummaryPage())
    }
    // TODO: missing cancel function
    this.setFormModel(FormSelector.getNewCustomer(func))
    this.content = Form
  }

  /**
   * @name projectSummaryPage
   * @description Updates title, form, table, content, and buttons for Project Summary page
   * @method projectSummaryPage
   * @memberof Page.prototype
   * @mobx action
   */
  @action projectSummaryPage(){
    this.title = 'Project Summary'
    let deleteFunc = () => {
      Website.updateProjectStatus(Website.currentProject.id, 'Dropped')
      .then(() => this.projectsMenuItem())
    }
    let completeFunc = () => {
      Website.updateProjectStatus(Website.currentProject.id, 'Completed')
      .then(() => this.projectsMenuItem())
    }
    let summaryObject = SummarySelector.getProject(deleteFunc,completeFunc)
    this.content = summaryObject.component
    this.setSummaryModel(summaryObject.model)
  }

  // Page Changes - Projects List, Editing

  /**
   * @name projectEditPage
   * @description Updates title, form, table, content, and buttons for Project Edit page
   * @method projectEditPage
   * @memberof Page.prototype
   * @mobx action
   */
  @action projectEditPage(){
    this.title = 'Edit Project'
    this.setFormModel(FormSelector.getEditProject(this.projectSummaryPage, this.projectsMenuItem))
    this.content = Form
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
    this.setTableModel(TableSelector.getProject(this.projectSummaryPage, this.projectEditPage))
    this.content = Table
  }

  // Page Changes - Time Entry

  /**
   * @name projectTimeEntryMenuItem
   * @description Updates title, form, table, content, and buttons for Project Time Entry page.
   * @memberof Page.prototype
   * @method projectTimeEntryMenuItem
   * @mobx action
   */
  @action projectTimeEntryMenuItem(){
    this.title = 'Time Entry'
    this.setFormModel(FormSelector.getTimeEntry())
    this.content = Form
  }

  // Page Changes - Customers

  /**
   * @name customerInfoMenuItem
   * @description Updates title, form, table, content, and buttons for Customer Information page.
   * @memberof Page.prototype
   * @method customerInfoMenuItem
   * @mobx action
   */
  @action customerInfoMenuItem(){
    this.title = 'Customers'
    this.setTableModel(TableSelector.getNonSelectCustomer(this.newCustomerPage, this.customerSummaryPage, this.customerEditPage))
    this.content = Table
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
    this.setFormModel(FormSelector.getNewCustomer(this.customerSummaryPage, this.customerInfoMenuItem))
    this.content = Form
  }

  /**
   * @name customerSummaryPage
   * @description Displays information about selected customer from Customer Information page entries.
   * @method customerSummaryPage
   * @memberof Page.prototype
   * @mobx action
   */
  @action customerSummaryPage(){
    this.title = 'Customer Summary'
    let summaryObject = SummarySelector.getCustomer()
    this.content = summaryObject.component
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
    this.setFormModel(FormSelector.getEditCustomer(this.customerSummaryPage, this.customerInfoMenuItem))
    this.content = Form
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
    this.content = null
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
    this.content = null
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
    this.content = null
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
    this.content = null
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
     this.setTableModel(TableSelector.getEmployee(this.newEmployeePage, this.employeeSummaryPage, this.employeeEditPage))
     this.content = Table
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
     this.setFormModel(FormSelector.getEmployee(this.employeeSummaryPage, this.employeeInformationMenuItem))
     this.content = Form
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
     this.setFormModel(FormSelector.getEditEmployee(this.employeeSummaryPage, this.employeeInformationMenuItem))
     this.content = Form
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
     let deleteFunc = () => console.log('confirm')
     let summaryObject = SummarySelector.getEmployee(deleteFunc)
     this.content = summaryObject.component
     this.setSummaryModel(summaryObject.model)
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
    this.content = null
  }

}

const page = new Page()
export default page
