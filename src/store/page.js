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
 * @property {Function[]} [backNav=[]] Back navigation function list [observable]
 * @property {?Function} [currentPage=null] Current navigation function [observable]
 */
class Page {
  constructor() {
    let addtlProps = {
      title: 'Default Title',
      content: null,
      tableModel: null,
      formModel: null,
      summaryModel: null,
      backNav: []
    }
    extendObservable(this, addtlProps)
    this.currentPage = null
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
  /**
   * @name setCurBack
   * @description Sets backNav and currentPage
   * @method setCurBack
   * @memberof Page.prototype
   * @param  {Function}      cur Current page nav function
   * @mobx action
   */
  @action setCurBack(cur){
    if (this.currentPage)
      this.backNav.push(this.currentPage)
    this.currentPage = cur
  }
  /**
   * @name backNavPop
   * @description Pops backNav and returns
   * @method backNavPop
   * @memberof Page.prototype
   * @returns  {Function}      Previous page nav function
   * @mobx action
   */
  @action backNavPop(){
    return this.backNav.pop()
  }

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
    this.setCurBack(this.createNewProjMenuItem)
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
    this.setTableModel(TableSelector.getSelectCreateCustomer(this.newProjectNewCustomerPage, this.projectSummaryPage))
    this.content = Table
    this.setCurBack(this.selectCustomerPage)
  }

  /**
   * @name newProjectNewCustomerPage
   * @description Updates title, form, table, content, and buttons for New Customer page.
   * @memberof Page.prototype
   * @method newProjectNewCustomerPage
   * @mobx action
   */
  @action newProjectNewCustomerPage(){
    this.title = 'New Customer for New Project'
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
    this.setCurBack(this.newProjectNewCustomerPage)
  }

  /**
   * @name changeCustomerPage
   * @description Updates title, form, table, content, and buttons for Change Customer page.
   * @memberof Page.prototype
   * @method changeCustomerPage
   * @mobx action
   */
  @action changeCustomerPage(){
    this.title = 'Change Customer'
    this.setTableModel(TableSelector.getSelectUpdateCustomer(this.currentProjectNewCustomerPage, this.projectSummaryPage))
    this.content = Table
    this.setCurBack(this.changeCustomerPage)
  }

  /**
   * @name currentProjectNewCustomerPage
   * @description Updates title, form, table, content, and buttons for New Customer page.
   * @memberof Page.prototype
   * @method currentProjectNewCustomerPage
   * @mobx action
   */
  @action currentProjectNewCustomerPage(){
    this.title = 'New Customer for Project'
    let func = () => {
      console.log('send update to API with currentProject, currentCustomer.id', Website.currentProject, Website.currentCustomer.id)
      let body = {
        customer: {id: Website.currentCustomer.id}
      }
      Website.updateProject(Website.currentProject.id, body)
      .then(() => {
        Website.currentProject.changeCustomer(Website.currentCustomer)
        this.projectSummaryPage()
      })
    }
    // TODO: missing cancel function
    this.setFormModel(FormSelector.getNewCustomer(func))
    this.content = Form
    this.setCurBack(this.currentProjectNewCustomerPage)
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
    this.setCurBack(this.projectSummaryPage)
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
    this.setCurBack(this.projectEditPage)
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
    this.setCurBack(this.projectsMenuItem)
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
    this.setCurBack(this.projectTimeEntryMenuItem)
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
    this.setCurBack(this.customerInfoMenuItem)
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
    this.setCurBack(this.newCustomerPage)
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
    this.setCurBack(this.customerSummaryPage)
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
    this.setCurBack(this.customerEditPage)
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
    this.setCurBack(this.emplProductivityMenuItem)
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
    this.setCurBack(this.workstationTrackingMenuItem)
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
    this.setCurBack(this.jobTypeProductivityMenuItem)
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
    this.setCurBack(this.costCenterTimeMenuItem)
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
     this.setCurBack(this.employeeInformationMenuItem)
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
     this.setCurBack(this.newEmployeePage)
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
     this.setCurBack(this.employeeEditPage)
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
     this.setCurBack(this.employeeSummaryPage)
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
    this.setCurBack(this.accountManagementMenuItem)
  }

}

const page = new Page()
export default page
