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
   * @name getSummary
   * @description Chooses a summary component depending on type
   * @method getSummary
   * @param  {String}   type String for switch
   * @return {Component}
   */
  getProject(deleteOnClick, completeOnClick){
    return {model: new ProjectSummaryModel(deleteOnClick, completeOnClick), component: ProjectSummary}
  }
  /**
   * @name getSummary
   * @description Chooses a summary component depending on type
   * @method getSummary
   * @param  {String}   type String for switch
   * @return {Component}
   */
  getEmployee(deleteOnClick){
    return {model: new EmployeeSummaryModel(deleteOnClick), component: EmployeeSummary}
  }
  /**
   * @name getSummary
   * @description Chooses a summary component depending on type
   * @method getSummary
   * @param  {String}   type String for switch
   * @return {Component}
   */
  getCustomer(){
    return {model: null, component: CustomerSummary}
  }
}

const summarySelector = new SummarySelector()
export default summarySelector
