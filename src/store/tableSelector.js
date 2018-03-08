import CustomerTableModel from '../models/customerTableModel'
import EmployeeTableModel from '../models/employeeTableModel'
import ProjectTableModel from '../models/projectTableModel'
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
   * @return {ProjectTableModel}
   * @memberof TableSelector.prototype
   */
  getProject(infoClickNav, editClickNav){
    return new ProjectTableModel(infoClickNav, editClickNav)
  }

}

const tableSelector = new TableSelector()
export default tableSelector
