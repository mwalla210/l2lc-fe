import EmployeeSummary from '../components/employeeSummary'
import ProjectSummary from '../components/projectSummary'
import CustomerSummary from '../components/customerSummary'
import EmployeeSummaryModel from '../models/employeeSummaryModel'
import ProjectSummaryModel from '../models/projectSummaryModel'
import autoBind from 'auto-bind'

/**
 * @name SummarySelector
 * @class SummarySelector
 * @description Autobinds function
 */
class SummarySelector {
  constructor(){
    autoBind(this)
  }
  /**
   * @name getProject
   * @description Chooses a summary component for a project depending on type
   * @method getProject
   * @param  {String}   type String for switch
   * @return {Component}
   * @memberof SummarySelector.prototype
   */
  getProject(deleteOnClick, completeOnClick){
    return {model: new ProjectSummaryModel(deleteOnClick, completeOnClick), component: ProjectSummary}
  }
  /**
   * @name getEmployee
   * @description Chooses a summary component for an employee depending on type
   * @method getEmployee
   * @param  {String}   type String for switch
   * @return {Component}
   * @memberof SummarySelector.prototype
   */
  getEmployee(deleteOnClick){
    return {model: new EmployeeSummaryModel(deleteOnClick), component: EmployeeSummary}
  }
  /**
   * @name getCustomer
   * @description Chooses a summary component for a customer depending on type
   * @method getCustomer
   * @param  {String}   type String for switch
   * @return {Component}
   * @memberof SummarySelector.prototype
   */
  getCustomer(){
    return {model: null, component: CustomerSummary}
  }
}

const summarySelector = new SummarySelector()
export default summarySelector
