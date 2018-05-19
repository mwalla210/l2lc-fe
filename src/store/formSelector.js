import CustomerFormModel from '../models/customerFormModel'
import EmployeeFormModel from '../models/employeeFormModel'
import ProjectFormModel from '../models/projectFormModel'
import AccountFormModel from '../models/accountFormModel'
import TimeEntryFormModel from '../models/timeEntryFormModel'
import ProjectTaskFormModel from '../models/projectTaskFormModel'
import autoBind from 'auto-bind'

/**
 * @name FormSelector
 * @class FormSelector
 * @description Autobinds function
 */
class FormSelector {
  constructor(){
    autoBind(this)
  }
  /**
   * @name getNewCustomer
   * @description Provides CustomerFormModel
   * @method getNewCustomer
   * @param  {Function}       onClick  On click function for form
   * @param  {Function}       onCancel On cancel function for form
   * @param  {Function}       errorClick On error modal confirmation click function for form
   * @return {CustomerFormModel}
   * @memberof FormSelector.prototype
   */
  getNewCustomer(onClick, onCancel, errorClick){
    return new CustomerFormModel(onClick, onCancel, errorClick)
  }
  /**
   * @name getEditCustomer
   * @description Provides CustomerFormModel for editing
   * @method getEditCustomer
   * @param  {Function}       onClick  On click function for form
   * @param  {Function}       onCancel On cancel function for form
   * @param  {Function}       errorClick On error modal confirmation click function for form
   * @return {CustomerFormModel}
   * @memberof FormSelector.prototype
   */
  getEditCustomer(onClick, onCancel, errorClick){
    let model = new CustomerFormModel(onClick, onCancel, errorClick)
    model.setEdit()
    return model
  }
  /**
   * @name getEmployee
   * @description Provides EmployeeFormModel
   * @method getEmployee
   * @param  {Function}       onClick  On click function for form
   * @param  {Function}       onCancel On cancel function for form
   * @param  {Function}       errorClick On error modal confirmation click function for form
   * @return {EmployeeFormModel}
   * @memberof FormSelector.prototype
   */
  getEmployee(onClick, onCancel, errorClick){
    return new EmployeeFormModel(onClick, onCancel, errorClick)
  }
  /**
   * @name getEditEmployee
   * @description Provides EmployeeFormModel for editing
   * @method getEditEmployee
   * @param  {Function}       onClick  On click function for form
   * @param  {Function}       onCancel On cancel function for form
   * @param  {Function}       errorClick On error modal confirmation click function for form
   * @return {EmployeeFormModel}
   * @memberof FormSelector.prototype
   */
  getEditEmployee(onClick, onCancel, errorClick){
    let model = new EmployeeFormModel(onClick, onCancel, errorClick)
    model.setEdit()
    return model
  }
  /**
   * @name getProject
   * @description Provides ProjectFormModel
   * @method getProject
   * @param  {Function}       onClick  On click function for form
   * @param  {Function}       onCustomer  On click function for form if project needs customer
   * @param  {Function}       errorClick On error modal confirmation click function for form
   * @return {ProjectFormModel}
   * @memberof FormSelector.prototype
   */
  getProject(onClick, onCustomer, errorClick){
    return new ProjectFormModel(onClick, onCustomer, errorClick)
  }

  /**
   * @name getTask
   * @description Provides ProjectTaskFormModel
   * @method getTask
   * @param  {Function}       onClick  On click function for form
   * @param  {Function}       errorClick On error modal confirmation click function for form
   * @return {ProjectTaskFormModel}
   * @memberof FormSelector.prototype
   */
  getTask(onClick, errorClick){
    return new ProjectTaskFormModel(onClick, errorClick)
  }

  /**
   * @name getProject
   * @description Provides ProjectFormModel for editing
   * @method getProject
   * @param  {Function}       onClick  On click function for form
   * @param  {Function}       onCancel On cancel function for form
   * @param  {Function}       errorClick On error modal confirmation click function for form
   * @return {ProjectFormModel}
   * @memberof FormSelector.prototype
   */
  getEditProject(onClick, onCancel, errorClick){
    let model = new ProjectFormModel(onClick, null, onCancel, errorClick)
    model.setEdit()
    return model
  }

  /**
   * @name getTimeEntry
   * @description Provides TimeEntryFormModel
   * @method getTimeEntry
   * @return {TimeEntryFormModel}
   * @memberof FormSelector.prototype
   */
  getTimeEntry(){
    return new TimeEntryFormModel()
  }

  /**
   * @name getAccount
   * @description Provides AccountFormModel
   * @method getAccount
   * @param  {Function}       onClick  On click function for form
   * @param  {Function}       onCancel On cancel function for form
   * @param  {Function}       errorClick On error modal confirmation click function for form
   * @return {AccountFormModel}
   * @memberof FormSelector.prototype
   */
  getAccount(onClick, onCancel, errorClick){
    return new AccountFormModel(onClick, onCancel, errorClick)
  }
}

const formSelector = new FormSelector()
export default formSelector
