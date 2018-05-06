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
   * @description Provides a CustomerTableModel set for selecting
   * @method getSelectCreateCustomer
   * @param  {Function}          buttonClickNav TableButton click function
   * @param  {Function}          selectNav      Row select button click function
   * @return {CustomerTableModel}
   * @memberof TableSelector.prototype
   */
  getSelectCreateCustomer(buttonClickNav, selectNav){
    let model = new CustomerTableModel(buttonClickNav, null, null, selectNav)
    model.selectCreateTable()
    return model
  }
  /**
   * @name getSelectUpdateCustomer
   * @description Provides a CustomerTableModel set for selecting
   * @method getSelectUpdateCustomer
   * @param  {Function}          buttonClickNav TableButton click function
   * @param  {Function}          selectNav      Row select button click function
   * @return {CustomerTableModel}
   * @memberof TableSelector.prototype
   */
  getSelectUpdateCustomer(buttonClickNav, selectNav){
    let model = new CustomerTableModel(buttonClickNav, null, null, selectNav)
    model.selectUpdateTable()
    return model
  }
  /**
   * @name getNonSelectCustomer
   * @description Provides a CustomerTableModel set for selecting
   * @method getNonSelectCustomer
   * @param  {Function}          buttonClickNav TableButton click function
   * @param  {Function}          infoClickNav   Row info icon click function
   * @param  {Function}          editClickNav   Row edit icon click function
   * @return {CustomerTableModel}
   * @memberof TableSelector.prototype
   */
  getNonSelectCustomer(buttonClickNav, infoClickNav, editClickNav){
    return new CustomerTableModel(buttonClickNav, infoClickNav, editClickNav)
  }
  /**
   * @name getEmployee
   * @description Provides a EmployeeTableModel set for selecting
   * @method getEmployee
   * @param  {Function}          buttonClickNav TableButton click function
   * @param  {Function}          infoClickNav   Row info icon click function
   * @param  {Function}          editClickNav   Row edit icon click function
   * @return {EmployeeTableModel}
   * @memberof TableSelector.prototype
   */
  getEmployee(buttonClickNav, infoClickNav, editClickNav){
    return new EmployeeTableModel(buttonClickNav, infoClickNav, editClickNav)
  }
  /**
   * @name getProject
   * @description Provides a ProjectTableModel set for selecting
   * @method getProject
   * @param  {Function}          infoClickNav   Row info icon click function
   * @param  {Function}          editClickNav   Row edit icon click function
   * @param  {Function}          deleteClickNav   Row delete icon click function
   * @return {ProjectTableModel}
   * @memberof TableSelector.prototype
   */
  getProject(infoClickNav, editClickNav, deleteClickNav){
    return new ProjectTableModel(infoClickNav, editClickNav, deleteClickNav)
  }

  /**
     * @name getAccount
     * @description Provides a AccountTableModel set for selecting
     * @method getAccount
     * @param  {Function}          buttonClickNav TableButton click function
     * @param  {Function}          editClickNav   Row edit icon click function
     * @return {AccountTableModel}
     * @memberof TableSelector.prototype
     */
    getAccount(buttonClickNav, editClickNav){
      return new AccountTableModel(buttonClickNav, editClickNav)
    }

    /**
     * @name getCustomerProjects
     * @description Provides a CustomerProjectsTableModel set for selecting
     * @method getCustomerProjects
     * @param  {Function}          infoClickNav   Row info icon click function
     * @param  {Function}          editClickNav   Row edit icon click function
     * @param  {Function}          deleteClickNav   Row delete icon click function
     * @return {CustomerProjectTableModel}
     * @memberof TableSelector.prototype
     */
    getCustomerProjects(infoClickNav, editClickNav, deleteClickNav){
      return new CustomerProjectsTableModel(infoClickNav, editClickNav, deleteClickNav)
    }

    /**
     * @name getProject
     * @description Provides a ProjectTableModel set for selecting
     * @method getProject
     * @param  {Function}          infoClickNav   Row info icon click function
     * @param  {Function}          editClickNav   Row edit icon click function
     * @param  {Function}          deleteClickNav   Row delete icon click function
     * @return {ProjectTableModel}
     * @memberof TableSelector.prototype
     */
    getTimeEntries(buttonClickNav){
      return new TimeEntryTableModel(buttonClickNav)
    }
    /**
    * @name getTasks
    * @description Provides a ProjectTableModel set for selecting
    * @method getTasks
    * @param  {Function}          infoClickNav   Row info icon click function
    * @param  {Function}          editClickNav   Row edit icon click function
    * @param  {Function}          deleteClickNav   Row delete icon click function
    * @return {projectTaskModel}
    * @memberof TableSelector.prototype
    */
   getTasks(buttonClickNav, deleteClickNav){
     return new ProjectTaskTableModel(buttonClickNav, deleteClickNav)
   }

}

const tableSelector = new TableSelector()
export default tableSelector
