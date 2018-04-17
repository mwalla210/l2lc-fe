import { action, useStrict, extendObservable } from 'mobx'
import autoBind from 'auto-bind'
useStrict(true)

/**
 * @name AnalyticsModel
 * @class AnalyticsModel
 * @classdesc Analytics storage object
 * @property {Function} fetchFn Analytics data fetch function
 * @property {Object[]} [data=[]] Data array for analytics [observable]
 */
export default class AnalyticsModel {
  constructor(fetchFn){
    let addtlProps = {
      data: []
    }
    extendObservable(this, addtlProps)
    // Non-observable
    this.fetchFn = fetchFn
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
  }
}
