import { action, useStrict, extendObservable, observable } from 'mobx'
import Form from '../components/form'
import Table from '../components/table'
import DraggableTable from '../components/draggableTable'
import Analytics from '../components/analytics'
import TimeEntry from '../components/timeEntry'
import SummarySelector from './summarySelector'
import FormSelector from './formSelector'
import TableSelector from './tableSelector'
import AnalyticsSelector from './analyticsSelector'
import Website from './website'
import autoBind from 'auto-bind'
useStrict(true)

/**
 * @name PageStore
 * @class PageStore
 * @classdesc Main MobX store for page
 * @property {String} [title='Default Title'] Page title [observable]
 * @property {?Object} [content=null] Page inner content [observable]
 * @property {?TableModel} [tableModel=null] Page table model, if any [observable]
 * @property {?FormModel} [formModel=null] Page form model, if any [observable]
 * @property {?SummaryModel} [summaryModel=null] Page summary model, if any [observable]
 * @property {?AnalyticsModel} [analyticsModel=null] Page analytics model, if any [observable]
 */
class PageStore {
  constructor() {
    let addtlProps = {
      title: 'Default Title',
      content: null,
      tableModel: null,
      formModel: null,
      summaryModel: null,
      analyticsModel: null
    }
    extendObservable(this, addtlProps)
    autoBind(this)
  }

  /**
   * @name setTableModel
   * @description Sets table model
   * @method setTableModel
   * @memberof PageStore.prototype
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
   * @memberof PageStore.prototype
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
   * @memberof PageStore.prototype
   * @param  {FormModel}      formModel FormModel to use for page
   * @mobx action
   */
  @action setFormModel(formModel){this.formModel = observable(formModel)}

  /**
 * @name setAnalyticsModel
 * @description Sets analytics model
 * @method setAnalyticsModel
 * @memberof PageStore.prototype
 * @param  {AnalyticsModel}      analyticsModel AnalyticsModel to use for page
 * @mobx action
 */
 @action setAnalyticsModel(analyticsList){
   this.analyticsModel = observable(analyticsList)
   analyticsList.forEach(analyticsModel => {
     analyticsModel.model.dataFetch()
   })
 }

  // Page Changes - Create Projects

  /**
   * @name createNewProjMenuItem
   * @description Updates title, form, table, content, and buttons for Create New Project page
   * @method createNewProjMenuItem
   * @memberof PageStore.prototype
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
   * @memberof PageStore.prototype
   * @method selectCustomerPage
   * @mobx action
   */
  @action selectCustomerPage(){
    this.title = 'Select New Project Customer'
    this.setTableModel(TableSelector.getSelectCreateCustomer(this.newProjectNewCustomerPage, this.projectSummaryPage))
    this.content = Table
  }

  /**
   * @name newProjectNewCustomerPage
   * @description Updates title, form, table, content, and buttons for New Customer page.
   * @memberof PageStore.prototype
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
  }

  /**
   * @name changeCustomerPage
   * @description Updates title, form, table, content, and buttons for Change Customer page.
   * @memberof PageStore.prototype
   * @method changeCustomerPage
   * @mobx action
   */
  @action changeCustomerPage(){
    this.title = 'Change Project Customer'
    this.setTableModel(TableSelector.getSelectUpdateCustomer(this.currentProjectNewCustomerPage, this.projectSummaryPage))
    this.content = Table
  }

  /**
   * @name currentProjectNewCustomerPage
   * @description Updates title, form, table, content, and buttons for New Customer page.
   * @memberof PageStore.prototype
   * @method currentProjectNewCustomerPage
   * @mobx action
   */
  @action currentProjectNewCustomerPage(){
    this.title = 'New Customer for Project'
    let func = () => {
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
  }

  /**
   * @name projectSummaryPage
   * @description Updates title, form, table, content, and buttons for Project Summary page
   * @method projectSummaryPage
   * @memberof PageStore.prototype
   * @mobx action
   */
  @action projectSummaryPage(){
    this.title = 'Project Summary'
    let completeFunc = () => {
      Website.updateProjectStatus(Website.currentProject.id, 'Completed')
      .then(() => {
        Website.currentProject.finish()
        this.projectSummaryPage()
      })
    }
    let summaryObject = SummarySelector.getProject(this.projectDeleteFn,completeFunc)
    this.content = summaryObject.component
    this.setSummaryModel(summaryObject.model)
  }

  /**
   * @name projectTaskList
   * @description Updates title, form, table, content, and buttons for Project task list.
   * @memberof PageStore.prototype
   * @method projectTaskList
   * @mobx action
   */
   @action projectTaskList(){
     this.title = 'Project Task List'
     this.setTableModel(TableSelector.getTasks(this.newProjectTaskPage, this.projectTaskList))
     this.content = DraggableTable
   }

   /**
    * @name newProjectTaskPage
    * @description Updates title, form, table, content, and buttons for new Project Task page.
    * @memberof PageStore.prototype
    * @method newProjectTaskPage
    * @mobx action
    */
   @action newProjectTaskPage(){
     this.title = 'New Task'
     this.setFormModel(FormSelector.getTask(this.projectTaskList, this.projectTaskList))
     this.content = Form
   }

  /**
   * @name projectDeleteFn
   * @description Drops a project
   * @method projectDeleteFn
   * @memberof PageStore.prototype
   */
  projectDeleteFn(){
    Website.updateProjectStatus(Website.currentProject.id, 'Dropped')
    .then(() => this.projectsMenuItem())
  }

  // Page Changes - Projects List, Editing

  /**
   * @name projectEditPage
   * @description Updates title, form, table, content, and buttons for Project Edit page
   * @method projectEditPage
   * @memberof PageStore.prototype
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
   * @memberof PageStore.prototype
   * @mobx action
   */
  @action projectsMenuItem(){
    this.title = 'Projects'
    this.setTableModel(TableSelector.getProject(this.projectSummaryPage, this.projectEditPage, this.projectDeleteFn))
    this.content = Table
  }

  // Page Changes - Time Entry

  /**
   * @name projectTimeEntryMenuItem
   * @description Updates title, form, table, content, and buttons for Project Time Entry page.
   * @memberof PageStore.prototype
   * @method projectTimeEntryMenuItem
   * @mobx action
   */
  @action projectTimeEntryMenuItem(){
    this.title = 'Time Entry'
    this.setFormModel(FormSelector.getTimeEntry())
    this.content = TimeEntry
  }

  // Page Changes - Customers

  /**
   * @name customerInfoMenuItem
   * @description Updates title, form, table, content, and buttons for Customer Information page.
   * @memberof PageStore.prototype
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
   * @memberof PageStore.prototype
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
   * @memberof PageStore.prototype
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
   * @memberof PageStore.prototype
   * @mobx action
   */
  @action customerEditPage(){
    this.title = 'Edit Customer'
    this.setFormModel(FormSelector.getEditCustomer(this.customerSummaryPage, this.customerInfoMenuItem))
    this.content = Form
  }

  // Page Changes - Analytics

  /**
   * @name analyticsMenuItem
   * @description Updates title, form, table, content, and buttons for analytics page.
   * @memberof PageStore.prototype
   * @method analyticsMenuItem
   * @mobx action
   */
  @action analyticsMenuItem(){
    this.title = 'Analytics Dashboard'
    this.setAnalyticsModel(AnalyticsSelector.getAll())
    this.content = Analytics
  }

  // Page Changes - Admin

  /**
   * @name employeeInformationMenuItem
   * @description Updates title, form, table, content, and buttons for Employee Information page.
   * @memberof PageStore.prototype
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
   * @memberof PageStore.prototype
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
   * @memberof PageStore.prototype
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
   * @memberof PageStore.prototype
   * @method employeeSummaryPage
   * @mobx action
   */
  @action employeeSummaryPage(){
    this.title = 'Employee Summary'
    let summaryObject = SummarySelector.getEmployee()
    this.content = summaryObject.component
    this.setSummaryModel(summaryObject.model)
  }

  /**
   * @name accountManagementMenuItem
   * @description Updates title, form, table, content, and buttons for Account Management page.
   * @memberof PageStore.prototype
   * @method accountManagementMenuItem
   * @mobx action
   */
  @action accountManagementMenuItem(){
    this.title = 'Account Management [Q3]'
    this.content = null
  }

}

const page = new PageStore()
export default page
