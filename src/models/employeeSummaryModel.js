import {useStrict, extendObservable } from 'mobx'
useStrict(true)

/**
 * @name EmployeeSummaryModel
 * @class EmployeeSummaryModel
 * @classdesc Employee summary storage object
 */
export default class EmployeeSummaryModel{
  constructor(){
    extendObservable(this)
  }
}
