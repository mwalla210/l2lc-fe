import EmployeeSummary from '../components/employeeSummary'
import ProjectSummary from '../components/projectSummary'
import CustomerSummary from '../components/customerSummary'
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
   * @description Provides new ProjectSummaryModel and ProjectSummary component
   * @method getProject
   * @param  {Function}   deleteOnClick Delete click function
   * @param  {Function}   completeOnClick Complete click function
   * @return {Object}
   * @memberof SummarySelector.prototype
   * @see {@link ProjectSummaryModel}
   * @see {@link ProjectSummary}
   */
  getProject(deleteOnClick, completeOnClick){
    return {model: new ProjectSummaryModel(deleteOnClick, completeOnClick), component: ProjectSummary}
  }
  /**
   * @name getEmployee
   * @description Provides new EmployeeSummary component
   * @method getEmployee
   * @return {Object}
   * @memberof SummarySelector.prototype
   * @see {@link EmployeeSummary}
   */
  getEmployee(){
    return {model: null, component: EmployeeSummary}
  }
  /**
   * @name getCustomer
   * @description Provides new CustomerSummary component
   * @method getCustomer
   * @return {Object}
   * @memberof SummarySelector.prototype
   * @see {@link CustomerSummary}
   */
  getCustomer(){
    return {model: null, component: CustomerSummary}
  }
}

const summarySelector = new SummarySelector()
export default summarySelector
