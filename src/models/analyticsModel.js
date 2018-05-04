import { action, useStrict, extendObservable, toJS, computed } from 'mobx'
import autoBind from 'auto-bind'
useStrict(true)

/**
 * @name AnalyticsModel
 * @class AnalyticsModel
 * @classdesc Analytics storage object
 * @property {Object[]} [data=[]] Data array for analytics [observable]
 * @property {String} [currentFilter=null] Filter title (if any filters for model) [observable]
 * @property {String} [component] Component type for model [observable]
 * @property {Object[]} [filters] Filter list for model, if any
 * @property {Boolean} [loading] Loading indicator
 * @property {Object} originalData Original set of data returned from fetch
 */
export default class AnalyticsModel {
  constructor(filters, component){
    let addtlProps = {
      data: [],
      currentFilter: filters ? filters[0].type : null,
      component: filters ? filters[0].component : component,
      loading: true
    }
    extendObservable(this, addtlProps)
    // Non-observable
    this.filters = filters
    this.originalData = null
    autoBind(this)
  }

  /**
   * @name setData
   * @description Sets fetchFn
   * @param {Function} func Function to set
   * @memberof AnalyticsModel.prototype
   * @method setData
   * @mobx action
   */
  @action setData(data){
    this.data = data
    this.originalData = Object.assign({},this.data)
    this.loading = false
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
