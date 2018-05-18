import { action, useStrict, extendObservable, observable } from 'mobx'
import Form from '../components/form'
import Table from '../components/table'
import DraggableTable from '../components/draggableTable'
import Analytics from '../components/analytics'
import TimeEntry from '../components/timeEntry'
import Stations from '../components/stations'
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
 * @property {?AnalyticsModel} [analyticsModelList=null] Page analytics models, if any [observable]
 */
class PageStore {
  constructor() {
    let addtlProps = {
      title: 'Default Title',
      content: null,
      tableModel: null,
      formModel: null,
      summaryModel: null,
      analyticsModelList: null
    }
    extendObservable(this, addtlProps)
    autoBind(this)
  }

  /**
   * @name setNullContent
   * @description Sets content to null
   * @method setNullContent
   * @memberof PageStore.prototype
   * @mobx action
   */
  @action setNullContent(){this.content = null}
  /**
   * @name setTableModel
   * @description Sets table model, calls dataFetch
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
  @action setSummaryModel(summaryModel){this.summaryModel = observable(summaryModel)}
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
   * @name setAnalyticsModelList
   * @description Sets analytics model list
   * @method setAnalyticsModelList
   * @memberof PageStore.prototype
   * @param  {Object[]}      analyticsList List of models to use for page
   * @mobx action
   */
  @action setAnalyticsModelList(analyticsList){this.analyticsModelList = observable(analyticsList)}

  // Page Changes - Create Projects

  /**
   * @name createNewProjMenuItem
   * @description Updates title, content, and formModel for Create New Project page.
   * @method createNewProjMenuItem
   * @memberof PageStore.prototype
   * @see {@link FormSelector}
   * @see {@link Form}
   * @mobx action
   */
  @action createNewProjMenuItem(){
    this.title = 'New Project'
    this.setFormModel(FormSelector.getProject(this.projectSummaryPage, this.selectCustomerPage))
    this.content = Form
  }

  /**
   * @name selectCustomerPage
   * @description Updates title, content, and tableModel for Select Customer (for new project) page.
   * @memberof PageStore.prototype
   * @method selectCustomerPage
   * @see {@link TableSelector}
   * @see {@link Table}
   * @mobx action
   */
  @action selectCustomerPage(){
    this.title = 'Select New Project Customer'
    this.setTableModel(TableSelector.getSelectCreateCustomer(this.newProjectNewCustomerPage, this.projectSummaryPage))
    this.content = Table
  }

  /**
   * @name newProjectNewCustomerPage
   * @description Updates title, content, and formModel for New Customer (for new project) page. Form submission function calls Website.createProject.
   * @memberof PageStore.prototype
   * @method newProjectNewCustomerPage
   * @see {@link FormSelector}
   * @see {@link Form}
   * @see {@link Website}
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
   * @description Updates title, content, and tableModel for Change Customer (for current project) page.
   * @memberof PageStore.prototype
   * @method changeCustomerPage
   * @see {@link TableSelector}
   * @see {@link Table}
   * @mobx action
   */
  @action changeCustomerPage(){
    this.title = 'Change Project Customer'
    this.setTableModel(TableSelector.getSelectUpdateCustomer(this.currentProjectNewCustomerPage, this.projectSummaryPage))
    this.content = Table
  }

  /**
   * @name currentProjectNewCustomerPage
   * @description Updates title, content, and formModel for New Customer (for current project) page. Form submission function calls Website.updateProject.
   * @memberof PageStore.prototype
   * @method currentProjectNewCustomerPage
   * @see {@link FormSelector}
   * @see {@link Form}
   * @see {@link Website}
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
   * @description Updates title, content, and formModel for Project Summary page. Form submission function calls Website.updateProjectStatus.
   * @method projectSummaryPage
   * @memberof PageStore.prototype
   * @see {@link FormSelector}
   * @see {@link Form}
   * @see {@link Website}
   * @see {@link SummarySelector}
   * @mobx action
   */
  @action projectSummaryPage(){
    this.title = 'Project Summary ID: ' + Website.currentProject.id
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
    Website.currentProject.getTimeEntries()
    Website.currentProject.getCustomer()
  }

  /**
   * @name projectTaskList
   * @description Updates title, content, and tableModel for Project task list.
   * @memberof PageStore.prototype
   * @method projectTaskList
   * @see {@link TableSelector}
   * @see {@link DraggableTable}
   * @mobx action
   */
  @action projectTaskList(){
    this.title = 'Project Task List for ID: ' + Website.currentProject.id
    this.setTableModel(TableSelector.getTasks(this.newProjectTaskPage, this.projectTaskList, this.projectSummaryPage))
    this.content = DraggableTable
  }

  /**
   * @name projectTimeEntryPage
   * @description Updates title, content, and tableModel for project time entry table page.
   * @memberof PageStore.prototype
   * @method projectTimeEntryPage
   * @see {@link TableSelector}
   * @see {@link Table}
   * @mobx action
   */
  @action projectTimeEntryPage(){
    this.title = 'Project Time Entries for ID: ' + Website.currentProject.id
    this.setTableModel(TableSelector.getTimeEntries(this.projectSummaryPage))
    this.content = Table
  }

  /**
   * @name newProjectTaskPage
   * @description Updates title, content, and formModel for new Project Task page.
   * @memberof PageStore.prototype
   * @method newProjectTaskPage
   * @see {@link FormSelector}
   * @see {@link Form}
   * @mobx action
   */
  @action newProjectTaskPage(){
    this.title = 'New Task for ID: ' + Website.currentProject.id
    this.setFormModel(FormSelector.getTask(this.projectTaskList, this.projectTaskList))
    this.content = Form
  }

  /**
   * @name projectDeleteFn
   * @description Drops a project. Calls Website.updateProjectStatus.
   * @method projectDeleteFn
   * @memberof PageStore.prototype
   * @see {@link Website}
   */
  projectDeleteFn(){
    Website.updateProjectStatus(Website.currentProject.id, 'Dropped')
    .then(() => this.projectsMenuItem())
  }

  // Page Changes - Projects List, Editing

  /**
   * @name projectEditPage
   * @description Updates title, content, and formModel for Project Edit page.
   * @method projectEditPage
   * @memberof PageStore.prototype
   * @see {@link FormSelector}
   * @see {@link Form}
   * @mobx action
   */
  @action projectEditPage(){
    this.title = 'Edit Project ID: ' + Website.currentProject.id
    this.setFormModel(FormSelector.getEditProject(this.projectSummaryPage, this.projectsMenuItem))
    this.content = Form
  }

  /**
   * @name projectsMenuItem
   * @description Updates title, content, and tableModel for Projects page.
   * @method projectsMenuItem
   * @memberof PageStore.prototype
   * @see {@link TableSelector}
   * @see {@link Table}
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
   * @description Updates title, content, and formModel for Time Entry page.
   * @memberof PageStore.prototype
   * @method projectTimeEntryMenuItem
   * @see {@link FormSelector}
   * @see {@link TimeEntry}
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
   * @description Updates title, content, and tableModel for Customer Information page.
   * @memberof PageStore.prototype
   * @method customerInfoMenuItem
   * @see {@link TableSelector}
   * @see {@link Table}
   * @mobx action
   */
  @action customerInfoMenuItem(){
    this.title = 'Customers'
    this.setTableModel(TableSelector.getNonSelectCustomer(this.newCustomerPage, this.customerSummaryPage, this.customerEditPage))
    this.content = Table
  }

  /**
   * @name newCustomerPage
   * @description Updates title, content, and formModel for New Customer page.
   * @memberof PageStore.prototype
   * @method newCustomerPage
   * @see {@link FormSelector}
   * @see {@link Form}
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
   * @see {@link SummarySelector}
   * @mobx action
   */
  @action customerSummaryPage(){
    this.title = 'Customer Summary ID: ' + Website.currentCustomer.id
    let summaryObject = SummarySelector.getCustomer()
    this.content = summaryObject.component
  }

  /**
   * @name customerProjectsPage
   * @description Updates title, content, and tableModel for Customer Projects page.
   * @method customerProjectsPage
   * @memberof PageStore.prototype
   * @see {@link TableSelector}
   * @see {@link Table}
   * @mobx action
   */
  @action customerProjectsPage(){
    this.title = 'Customer Projects ID: ' + Website.currentCustomer.id
    this.setTableModel(TableSelector.getCustomerProjects(this.projectSummaryPage, this.projectEditPage, this.projectDeleteFn, this.customerSummaryPage))
    this.content = Table
  }

  /**
   * @name customerEditPage
   * @description Updates title, content, and formModel for Customer Edit page.
   * @method customerEditPage
   * @memberof PageStore.prototype
   * @see {@link FormSelector}
   * @see {@link Form}
   * @mobx action
   */
  @action customerEditPage(){
    this.title = 'Edit Customer ID: ' + Website.currentCustomer.id
    this.setFormModel(FormSelector.getEditCustomer(this.customerSummaryPage, this.customerInfoMenuItem))
    this.content = Form
  }

  // Page Changes - Analytics

  /**
   * @name analyticsMenuItem
   * @description Updates title, content, and analyticsModelList for Analytics page.
   * @memberof PageStore.prototype
   * @method analyticsMenuItem
   * @see {@link AnalyticsSelector}
   * @see {@link Analytics}
   * @mobx action
   */
  @action analyticsMenuItem(){
    this.title = 'Analytics Dashboard'
    this.setAnalyticsModelList(AnalyticsSelector.getAll())
    this.content = Analytics
  }

  // Page Changes - Admin

  /**
   * @name employeeInformationMenuItem
   * @description Updates title, content, and tableModel for Employee Information page.
   * @memberof PageStore.prototype
   * @method employeeInformationMenuItem
   * @see {@link TableSelector}
   * @see {@link Table}
   * @mobx action
   */
  @action employeeInformationMenuItem(){
    this.title = 'Employee Information'
    this.setTableModel(TableSelector.getEmployee(this.newEmployeePage, this.employeeSummaryPage, this.employeeEditPage))
    this.content = Table
  }

  /**
   * @name newEmployeePage
   * @description Updates title, content, and formModel for New Employee page.
   * @memberof PageStore.prototype
   * @method newEmployeePage
   * @see {@link FormSelector}
   * @see {@link Form}
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
    this.title = 'Edit Employee ID: ' + Website.currentEmployee.id
    this.setFormModel(FormSelector.getEditEmployee(this.employeeSummaryPage, this.employeeInformationMenuItem))
    this.content = Form
  }

  /**
   * @name employeeSummaryPage
   * @description Displays information about selected employee from Employee Information page entries.
   * @memberof PageStore.prototype
   * @method employeeSummaryPage
   * @see {@link SummarySelector}
   * @mobx action
   */
  @action employeeSummaryPage(){
    this.title = Website.currentEmployee.fullName
    let summaryObject = SummarySelector.getEmployee()
    this.content = summaryObject.component
    this.setSummaryModel(summaryObject.model)
  }

  /**
   * @name accountManagementMenuItem
   * @description Updates title, content, and tableModel for Account Management page.
   * @memberof PageStore.prototype
   * @method accountManagementMenuItem
   * @see {@link TableSelector}
   * @see {@link Table}
   * @mobx action
   */
  @action accountManagementMenuItem(){
    this.title = 'Account Management'
    this.setTableModel(TableSelector.getAccount(this.newAccountPage))
    this.content = Table
  }

  /**
   * @name newAccountPage
   * @description Updates title, content, and formModel for New Account page.
   * @memberof PageStore.prototype
   * @method newAccountPage
   * @see {@link FormSelector}
   * @see {@link Form}
   * @mobx action
   */
  @action newAccountPage(){
    this.title = 'New Account'
    this.setFormModel(FormSelector.getAccount(this.accountManagementMenuItem,this.accountManagementMenuItem))
    this.content = Form
  }

  /**
   * @name stationMenuItem
   * @description Updates title and content for Stations page.
   * @memberof PageStore.prototype
   * @method stationMenuItem
   * @see {@link Stations}
   * @mobx action
   */
  @action stationMenuItem(){
    this.title = 'Stations'
    this.content = Stations
  }
}

const page = new PageStore()
export default page
