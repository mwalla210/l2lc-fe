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
import autoBind from 'auto-bind'
useStrict(true)

/**
 * @name Page
 * @class Page
 * @classdesc Main MobX store for page
 * @property {Boolean} [loggedin=false] Indicates whether currently logged in [observable]
 * @property {String} [title='Default Title'] Page title [observable]
 * @property {?Object} [content=null] Page inner content [observable]
 * @property {?TableModel} [tableModel=null] Page table model, if any [observable]
 * @property {?FormModel} [formModel=null] Page form model, if any [observable]
 * @property {?Boolean} [formEdit=false] Indicator for form editing [observable]
 * @property {?ModalModel} [modal=null] Page summary modal model, if any [observable]
 * @property {?ModalModel} [modalSecondary=null] Secondary page summary modal model, if any [observable]
 */
class Page {
  constructor() {
    let addtlProps = {
      loggedin: false,
      title: 'Default Title',
      content: null,
      tableModel: null,
      formModel: null,
      formEdit: false,
      modal: null,
      modalSecondary: null,
      logOutModal: {
        open: false,
      }
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
  /**
   * @name setModal
   * @description Sets summary modal model
   * @method setModal
   * @memberof Page.prototype
   * @param  {ModalModel}      modalModel ModalModel to use for page
   * @mobx action
   */
  @action setModal(modalModel){this.modal = observable(modalModel)}
  /**
   * @name setModalSecondary
   * @description Sets secondary modal model
   * @method setModalSecondary
   * @memberof Page.prototype
   * @param  {ModalModel}      modalModel ModalModel to use for page
   * @mobx action
   */
  @action setModalSecondary(modalModel){this.modalSecondary = observable(modalModel)}

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
    this.content = ProjectForm
    this.formEdit = false
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
    this.content = CustomerTable
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
    this.content = CustomerForm
    this.formEdit = false
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
    this.content = ProjectSummary
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
    this.content = ProjectForm
    this.formEdit = true
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
    this.content = ProjectTable
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
    this.content = TimeEntryForm
    this.formEdit = false
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
    this.content = CustomerTable
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
    this.content = CustomerSummary
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
    this.content = CustomerForm
    this.formEdit = true
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
     this.content = EmployeeTable
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
     this.content = EmployeeForm
     this.formEdit = false
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
     this.content = EmployeeForm
     this.formEdit = true
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
     this.content = EmployeeSummary
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
    this.content = null
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
   * @memberof Page.prototype
   * @return {Boolean}
   * @mobx computed
   */
  @computed get logOutModalOpen(){
    return this.logOutModal.open
  }

}

const page = new Page()
export default page
