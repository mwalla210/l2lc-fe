import CustomerFormModel from '../models/customerFormModel'
import EmployeeFormModel from '../models/employeeFormModel'
import ProjectFormModel from '../models/projectFormModel'
import TimeEntryFormModel from '../models/timeEntryFormModel'
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
   * @return {CustomerFormModel}
   * @memberof FormSelector.prototype
   */
  getNewCustomer(onClick, onCancel){
    return new CustomerFormModel(onClick, onCancel)
  }
  /**
   * @name getEditCustomer
   * @description Provides CustomerFormModel for editing
   * @method getEditCustomer
   * @param  {Function}       onClick  On click function for form
   * @param  {Function}       onCancel On cancel function for form
   * @return {CustomerFormModel}
   * @memberof FormSelector.prototype
   */
  getEditCustomer(onClick, onCancel){
    let model = new CustomerFormModel(onClick, onCancel)
    model.setEdit()
    return model
  }
  /**
   * @name getEmployee
   * @description Provides EmployeeFormModel
   * @method getEmployee
   * @param  {Function}       onClick  On click function for form
   * @param  {Function}       onCancel On cancel function for form
   * @return {EmployeeFormModel}
   * @memberof FormSelector.prototype
   */
  getEmployee(onClick, onCancel){
    return new EmployeeFormModel(onClick, onCancel)
  }
  /**
   * @name getEditEmployee
   * @description Provides EmployeeFormModel for editing
   * @method getEditEmployee
   * @param  {Function}       onClick  On click function for form
   * @param  {Function}       onCancel On cancel function for form
   * @return {EmployeeFormModel}
   * @memberof FormSelector.prototype
   */
  getEditEmployee(onClick, onCancel){
    let model = new EmployeeFormModel(onClick, onCancel)
    model.setEdit()
    return model
  }
  /**
   * @name getProject
   * @description Provides ProjectFormModel
   * @method getProject
   * @param  {Function}       onClick  On click function for form
   * @param  {Function}       onCustomer  On click function for form if project needs customer
   * @return {ProjectFormModel}
   * @memberof FormSelector.prototype
   */
  getProject(onClick, onCustomer){
    return new ProjectFormModel(onClick, onCustomer)
  }
  /**
   * @name getProject
   * @description Provides ProjectFormModel for editing
   * @method getProject
   * @param  {Function}       onClick  On click function for form
   * @param  {Function}       onCancel On cancel function for form
   * @return {ProjectFormModel}
   * @memberof FormSelector.prototype
   */
  getEditProject(onClick, onCancel){
    let model = new ProjectFormModel(onClick, null, onCancel)
    model.setEdit()
    return model
  }

  getTimeEntry(){
    return new TimeEntryFormModel()
  }

}

const formSelector = new FormSelector()
export default formSelector
