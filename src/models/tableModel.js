import { action, computed, useStrict, extendObservable } from 'mobx'
useStrict(true)

/*
Select Customer
  Model: Customer
  Fields: ID, name, shipping, billing, phone
  Clickable: link to project
  Button: New Customer
  Searchable: by ID

Projects list
  Model: Project
  Fields: ID, customer name, title, cost center, type, status, priority, time spent, date created
  TODO: do we actually want all of these columns? maybe rework
  Clickable: modal
  Searchable: by ID
  TODO: Filtering (or something) by open/closed?

Customer Information
  Model: Customer
  Fields: ID, name, shipping, billing, phone
  Clickable: modal
  Button: New Customer
  Searchable: by ID

Employee Information
  Model: Employee
  Fields: ID, name, barcode
  Clickable: name edit
  Button: New Employee
 */

/**
 * @name TableModel
 * @class TableModel
 * @classdesc Table storage object
 * @property {Object} [tableButton=null] Button component for display above table
 * @property {Function} fetchFn Table data fetch function
 * @property {Array} columns Column header array for ReactTable
 * @property {Function} [rowSelectFn=null] Function for handling clicking of row
 * @property {Boolean} [loading=true] Loading indicator
 * @property {Array} [data=[]] Data array for table
 */
export default class TableModel {
  constructor(tableButton, fetchFn, rowSelectFn, columns){
    let addtlProps = {
      data: [],
      loading: true
    }
    extendObservable(this, addtlProps)
    // Non-observable
    this.columns = columns
    this.tableButton = tableButton
    this.fetchFn = fetchFn
    this.rowSelectFn = rowSelectFn
  }

  @action loadingOn(){this.loading = true}
  @action loadingOff(){this.loading = false}

  /**
   * @name dataFetch
   * @description Handles loading while fetching table data
   * @memberof TableModel.prototype
   * @method dataFetch
   * @mobx action
   */
  @action dataFetch(){
    this.loadingOn()
    this.fetchFn()
    console.log(this.data.length)
    this.loadingOff()
  }
}
