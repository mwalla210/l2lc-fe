import { action, useStrict, extendObservable } from 'mobx'
import autoBind from 'auto-bind'
useStrict(true)

/**
 * @name TableModel
 * @class TableModel
 * @classdesc Table storage object
 * @description Sets up default table
 * @param {Object} [tableButton] Button object for display above table
 * @param {Function} fetchFn Table data fetch function
 * @param {Object[]} columns Column header array for ReactTable
 * @param {Object} [deleteModal] Object containing props for row delete modal
 * @param {?Function} [styling] Styling function
 * @param {?Function} [backButtonFunc] Back button function
 * @property {Function} fetchFn Table data fetch function
 * @property {Object[]} columns Column header array for ReactTable [observable]
 * @property {?Function} [styling] Styling function
 * @property {?Function} [backButtonFunc] Back button function
 * @property {Object} [tableButton] Button object for display above table
 * @property {String} tableButton.title Button title for display above table
 * @property {Function} tableButton.onClick Button click function for display above table
 * @property {Object} [deleteModal] Object containing props for row delete modal
 * @property {String} deleteModal.title Title for modal
 * @property {String} deleteModal.content Content for modal
 * @property {Function} deleteModal.confirmOnClick Confirm function
 * @property {Boolean} [loading=true] Loading indicator [observable]
 * @property {Object[]} [data=[]] Data array for table [observable]
 * @property {Boolean} [modalOpen=false] Delete modal open indicator [observable]
 */
export default class TableModel {
  constructor(tableButton, fetchFn, columns, deleteModal, styling, backButtonFunc){
    let addtlProps = {
      data: [],
      loading: true,
      modalOpen: false,
      columns
    }
    extendObservable(this, addtlProps)
    // Non-observable
    this.tableButton = tableButton
    this.fetchFn = fetchFn
    this.deleteModal = deleteModal
    this.styling = styling
    this.backButtonFunc = backButtonFunc
    autoBind(this)
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
        this.loadingOff()
      })
    )
  }
}
