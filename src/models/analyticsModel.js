import { action, useStrict, extendObservable } from 'mobx'
import autoBind from 'auto-bind'
useStrict(true)

/**
 * @name AnalyticsModel
 * @class AnalyticsModel
 * @classdesc Analytics storage object
 * @property {Function} fetchFn Analytics data fetch function
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

  @action dataFetch(){
    this.data = this.fetchFn()
  }
}
