import EmployeeSummary from '../components/employeeSummary'
import ProjectSummary from '../components/projectSummary'
import CustomerSummary from '../components/customerSummary'
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
  getSummary(type){
    switch (type) {
      case 'employee':
        return EmployeeSummary
      case 'customer':
        return CustomerSummary
      case 'project':
        return ProjectSummary
    }
  }
}

const summarySelector = new SummarySelector()
export default summarySelector
