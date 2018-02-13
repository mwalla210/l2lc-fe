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
  Filtering by open/closed

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
 * @property {Object} [deleteModal=null] Object containing props for row delete modal
 * @property {String} deleteModal.title Title for modal
 * @property {String} deleteModal.content Content for modal
 * @property {Function} deleteModal.confirmOnClick Confirm function
 * @property {Boolean} [loading=true] Loading indicator [observable]
 * @property {Array} [data=[]] Data array for table [observable]
 * @property {Array} [modalOpen=false] Delete modal open indicator [observable]
 * @property {Function} [styling] Styling function
 */
export default class TableModel {
  constructor(tableButton, fetchFn, rowSelectFn, columns, deleteModal, styling){
    let addtlProps = {
      data: [],
      loading: true,
      modalOpen: false
    }
    extendObservable(this, addtlProps)
    // Non-observable
    this.columns = columns
    this.tableButton = tableButton
    this.fetchFn = fetchFn
    this.rowSelectFn = rowSelectFn
    this.deleteModal = deleteModal
    this.styling = styling
  }

  /**
   * @name closeModal
   * @description Sets modalOpen prop to false
   * @method closeModal
   * @memberof TableModel.prototype
   * @mobx action
   */
  @action closeModal(){this.modalOpen = false}
  /**
   * @name openModal
   * @description Sets modalOpen prop to true
   * @method openModal
   * @memberof TableModel.prototype
   * @mobx action
   */
  @action openModal(){this.modalOpen = true}
  /**
   * @name confirmAndClose
   * @description Closes modal and runs confirm function
   * @method confirmAndClose
   * @memberof TableModel.prototype
   * @mobx action
   */
  @action confirmAndClose(){
    this.closeModal()
    this.deleteModal.confirmOnClick()
  }

  /**
   * @name loadingOn
   * @description Turns on table's loading
   * @method loadingOn
   * @memberof TableModel.prototype
   * @mobx action
   */
  @action loadingOn(){this.loading = true}
  /**
   * @name loadingOff
   * @description Turns off table's loading
   * @method loadingOff
   * @memberof TableModel.prototype
   * @mobx action
   */
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
    this.fetchFn().then(
      action('fetchSuccess', res => {
        this.data = res
        console.log('data length',this.data.length)
        this.loadingOff()
      })
    )
    // let model = new ProjectModel(1, {id: 1, title: 'cctitle'}, {id: 1, title: 'jttitle'}, 'title', 'priority')
    // this.data = []
    // this.data.push(model)

  }
}
