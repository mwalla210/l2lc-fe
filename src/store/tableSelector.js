import CustomerTableModel from '../models/customerTableModel'
import CustomerProjectsTableModel from '../models/customerProjectsTableModel'
import EmployeeTableModel from '../models/employeeTableModel'
import AccountTableModel from '../models/accountTableModel'
import TimeEntryTableModel from '../models/timeEntryTableModel'
import ProjectTableModel from '../models/projectTableModel'
import ProjectTaskTableModel from '../models/projectTaskTableModel'
import autoBind from 'auto-bind'

/**
 * @name TableSelector
 * @class TableSelector
 * @description Autobinds function
 */
class TableSelector {
  constructor(){
    autoBind(this)
  }
  /**
   * @name getSelectCreateCustomer
   * @description Provides a CustomerTableModel set for creating the project and selecting the customer
   * @method getSelectCreateCustomer
   * @param  {Function}          buttonClickNav TableButton click function
   * @param  {Function}          selectNav      Row select button click function
   * @return {CustomerTableModel}
   * @memberof TableSelector.prototype
   * @see {@link CustomerTableModel}
   */
  getSelectCreateCustomer(buttonClickNav, selectNav){
    let model = new CustomerTableModel(buttonClickNav, null, null, selectNav)
    model.selectCreateTable()
    return model
  }
  /**
   * @name getSelectUpdateCustomer
   * @description Provides a CustomerTableModel set for updating the project and selecting the customer
   * @method getSelectUpdateCustomer
   * @param  {Function}          buttonClickNav TableButton click function
   * @param  {Function}          selectNav      Row select button click function
   * @return {CustomerTableModel}
   * @memberof TableSelector.prototype
   * @see {@link CustomerTableModel}
   */
  getSelectUpdateCustomer(buttonClickNav, selectNav){
    let model = new CustomerTableModel(buttonClickNav, null, null, selectNav)
    model.selectUpdateTable()
    return model
  }
  /**
   * @name getNonSelectCustomer
   * @description Provides a CustomerTableModel for viewing a customer
   * @method getNonSelectCustomer
   * @param  {Function}          buttonClickNav TableButton click function
   * @param  {Function}          infoClickNav   Row info icon click function
   * @param  {Function}          editClickNav   Row edit icon click function
   * @return {CustomerTableModel}
   * @memberof TableSelector.prototype
   * @see {@link CustomerTableModel}
   */
  getNonSelectCustomer(buttonClickNav, infoClickNav, editClickNav){
    return new CustomerTableModel(buttonClickNav, infoClickNav, editClickNav)
  }
  /**
   * @name getEmployee
   * @description Provides a EmployeeTableModel for viewing an employee
   * @method getEmployee
   * @param  {Function}          buttonClickNav TableButton click function
   * @param  {Function}          infoClickNav   Row info icon click function
   * @param  {Function}          editClickNav   Row edit icon click function
   * @return {EmployeeTableModel}
   * @memberof TableSelector.prototype
   * @see {@link EmployeeTableModel}
   */
  getEmployee(buttonClickNav, infoClickNav, editClickNav){
    return new EmployeeTableModel(buttonClickNav, infoClickNav, editClickNav)
  }
  /**
   * @name getProject
   * @description Provides a ProjectTableModel for viewing a project
   * @method getProject
   * @param  {Function}          infoClickNav   Row info icon click function
   * @param  {Function}          editClickNav   Row edit icon click function
   * @param  {Function}          deleteClickNav   Row delete icon click function
   * @return {ProjectTableModel}
   * @memberof TableSelector.prototype
   * @see {@link ProjectTableModel}
   */
  getProject(infoClickNav, editClickNav, deleteClickNav){
    return new ProjectTableModel(infoClickNav, editClickNav, deleteClickNav)
  }
  /**
   * @name getAccount
   * @description Provides a AccountTableModel for viewing an account
   * @method getAccount
   * @param  {Function}          buttonClickNav TableButton click function
   * @param  {Function}          editClickNav   Row edit icon click function
   * @return {AccountTableModel}
   * @memberof TableSelector.prototype
   * @see {@link AccountTableModel}
   */
  getAccount(buttonClickNav, editClickNav){
    return new AccountTableModel(buttonClickNav, editClickNav)
  }
  /**
   * @name getCustomerProjects
   * @description Provides a CustomerProjectsTableModel for viewing projects for a customer
   * @method getCustomerProjects
   * @param  {Function}          infoClickNav   Row info icon click function
   * @param  {Function}          editClickNav   Row edit icon click function
   * @param  {Function}          deleteClickNav   Row delete icon click function
   * @param  {Function}          backClickNav   Table back click function
   * @return {CustomerProjectTableModel}
   * @memberof TableSelector.prototype
   * @see {@link CustomerProjectsTableModel}
   */
  getCustomerProjects(infoClickNav, editClickNav, deleteClickNav, backClickNav){
    return new CustomerProjectsTableModel(infoClickNav, editClickNav, deleteClickNav, backClickNav)
  }
  /**
   * @name getTimeEntries
   * @description Provides a ProjectTableModel for viewing time entries for a project
   * @method getTimeEntries
   * @param  {Function}          backClickNav   Table back click function
   * @return {TimeEntryTableModel}
   * @memberof TableSelector.prototype
   * see {@link TimeEntryTableModel}
   */
  getTimeEntries(backClickNav){
    return new TimeEntryTableModel(backClickNav)
  }
  /**
   * @name getTasks
   * @description Provides a ProjectTableModel for viewing tasks for a project
   * @method getTasks
   * @param  {Function}          buttonClickNav   TableButton click function
   * @param  {Function}          deleteClickNav   Row delete icon click
   * @param  {Function}          backClickNav   Table back click function function
   * @return {ProjectTaskTableModel}
   * @memberof TableSelector.prototype
   * @see {@link ProjectTaskTableModel}
   */
  getTasks(buttonClickNav, deleteClickNav, backClickNav){
    return new ProjectTaskTableModel(buttonClickNav, deleteClickNav, backClickNav)
  }
}

const tableSelector = new TableSelector()
export default tableSelector
