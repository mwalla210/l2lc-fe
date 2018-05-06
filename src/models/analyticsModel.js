import { action, useStrict, extendObservable, toJS, computed } from 'mobx'
import autoBind from 'auto-bind'
useStrict(true)

/**
 * @name AnalyticsModel
 * @class AnalyticsModel
 * @classdesc Analytics storage object
 * @property {Function} fetchFn Analytics data fetch function
 * @property {Object[]} [data=[]] Data array for analytics [observable]
 * @property {String} [currentFilter=null] Filter title (if any filters for model) [observable]
 * @property {String} [component] Component type for model [observable]
 * @property {Object[]} [filters] Filter list for model, if any
 * @property {Object} originalData Original set of data returned from fetch
 */
export default class AnalyticsModel {
  constructor(fetchFn, filters, component){
    let addtlProps = {
      data: [],
      currentFilter: filters ? filters[0].type : null,
      component: filters ? filters[0].component : component
    }
    extendObservable(this, addtlProps)
    // Non-observable
    this.fetchFn = fetchFn
    this.filters = filters
    this.originalData = null
    autoBind(this)
  }

  /**
   * @name dataFetch
   * @description Handles fetching analytics data
   * @memberof AnalyticsModel.prototype
   * @method dataFetch
   * @mobx action
   */
  @action dataFetch(){
    this.data = this.fetchFn()
    this.originalData = Object.assign({},this.data)
  }
  /**
   * @name jsData
   * @description Converts data to regular JS array
   * @memberof AnalyticsModel.prototype
   * @method jsData
   * @mobx computed
   */
  @computed get jsData(){
    return toJS(this.data)
  }
  /**
   * @name setFilteredData
   * @description Converts data to regular JS array
   * @memberof AnalyticsModel.prototype
   * @method setFilteredData
   * @mobx computed
   */
  @action setFilteredData(filter){
    let filterItem = this.filters.find(item => {return item.type == filter})
    if (filterItem.data){
      this.data.datasets = filterItem.data(this.originalData.datasets)
    }
    else{
      this.data = this.originalData
    }
    this.component = filterItem.component
    this.currentFilter = filter
  }
}
