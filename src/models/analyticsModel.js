import { action, useStrict, extendObservable, toJS, computed } from 'mobx'
import autoBind from 'auto-bind'
useStrict(true)

/**
 * @name AnalyticsModel
 * @class AnalyticsModel
 * @classdesc Analytics storage object
 * @property {Object} [data={}] Data object for analytics [observable]
 * @property {String} [currentFilter=null] Filter title (if any filters for model) [observable]
 * @property {String} [component] Component type for model [observable]
 * @property {Object[]} [filters] Filter list for model, if any
 * @property {Boolean} [loading] Loading indicator [observable]
 * @property {?Object} [originalData=null] Original set of processed data returned from fetch
 * @property {?String[]} [category=null] Set of categories data is split by
 * @property {?Object} [unProcessedData=null] Unprocessed data structure (year's worth)
 * @property {?Function} [processor=null] Processor function
 */
export default class AnalyticsModel {
  constructor(filters, component){
    let addtlProps = {
      data: {},
      currentFilter: filters ? filters[0].type : null,
      component: filters ? filters[0].component : component,
      yLabel: filters ? filters[0].yLabel : null,
      loading: true,
      currentTimeFrame: 'Year'
    }
    extendObservable(this, addtlProps)
    // Non-observable
    this.filters = filters
    this.originalData = null
    this.unProcessedData = null
    this.category = null
    this.processor = null
    autoBind(this)
  }

  /**
   * @name setData
   * @description Sets category, processor, unProcessedData
   * @param {Function} processor Processor function for data
   * @param {String[]} category String list of category names for processing
   * @param {Object} unProcessedData Data object for processing (year's worth)
   * @memberof AnalyticsModel.prototype
   * @method setData
   * @mobx action
   */
  @action setData(processor, category, unProcessedData){
    this.category = category
    this.processor = processor
    this.unProcessedData = unProcessedData
    this.processData(this.unProcessedData)
  }

  /**
   * @name processData
   * @description Sets data by calling processor
   * @method processData
   * @param  {Object}    data Data object for processing
   * @memberof AnalyticsModel.prototype
   * @method setData
   * @mobx action
   */
  @action processData(data){
    this.data = {
      labels: this.category,
      datasets: this.processor(this.category, data)
    }
    this.originalData = Object.assign({},this.data)
    this.loading = false
  }
  /**
   * @name timeFilterData
   * @description Sets data by calling processor
   * @method timeFilterData
   * @param  {?Date}       [date] Date object to be "limit", if any (no date: full year)
   * @memberof AnalyticsModel.prototype
   */
  @action timeFilterData(date, filterName){
    if (date){
      // Filter unProcessedData by date, then process
      let newData = {}
      Object.keys(this.unProcessedData).forEach(key => {
        // If subset is array
        try {
          newData[key] = []
          this.unProcessedData[key].forEach(entry => {
            if (entry.time > date)
              newData[key].push(entry)
          })
        }
        // If subset is object
        catch (error) {
          delete newData[key]
          if (this.unProcessedData[key].time > date)
            newData[key] = this.unProcessedData[key]
        }
      })
      this.processData(newData)
      this.currentTimeFrame = filterName
    }
    else{
      this.processData(this.unProcessedData)
      this.currentTimeFrame = 'Year'
    }
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
    this.yLabel = filterItem.yLabel
    this.currentFilter = filter
  }
}
