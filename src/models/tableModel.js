import { action, computed, useStrict, extendObservable } from 'mobx'
useStrict(true)

/*
Select Customer
  Model: Customer
  Fields: ID, name, shipping, billing, phone
  TODO: Clickable: link to project (fn)
  Button: New Customer
  Searchable: by ID

Projects list
  Model: Project
  Fields: ID, customer name, title, cost center, type, status, priority, time spent, date created
  TODO: Clickable: modal
  Searchable: by ID
  TODO: Filtering (or something) by open/closed?

Customer Information
  Model: Customer
  Fields: ID, name, shipping, billing, phone
  TODO: Clickable: modal
  Button: New Customer
  Searchable: by ID

Employee Information
  Model: Employee
  Fields: ID, name, barcode
  TODO Editable: name
  Button: New Employee
 */

/**
 * @name TableModel
 * @class TableModel
 * @classdesc Table storage object
 * @property {Function} fetchFn Table data fetch function
 * @property {Array} columns Column header array for ReactTable
 * @property {Object} [tableButton=null] Button object for display above table
 * @property {String} tableButton.title Button title for display above table
 * @property {Function} tableButton.onClick Button click function for display above table
 * @property {Function} [rowSelectFn=null] Function for handling clicking of row
 * @property {Object} [rowSelectModal=null] Object containing props and type for spawned item
 * @property {String} rowSelectSpawn.title Title for modal
 * @property {String} rowSelectSpawn.body Body for modal
 * @property {Boolean} [loading=true] Loading indicator [observable]
 * @property {Array} [data=[]] Data array for table [observable]
 */
export default class TableModel {
  constructor(tableButton, fetchFn, rowSelectFn, columns, rowSelectModal){
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
    this.rowSelectModal = rowSelectModal
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
