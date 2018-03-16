import { action, useStrict, extendObservable } from 'mobx'
import autoBind from 'auto-bind'
useStrict(true)

/**
 * @name ModalModel
 * @class ModalModel
 * @classdesc Modal model for summary pages
 * @property {Boolean} [modalOpen=false] Modal open indicator [observable]
 * @property {String} title Modal title [observable]
 * @property {String} [contents=''] Modal contents, if any (field modals) [observable]
 * @property {Function} confirmOnClick Modal confirmation function
 */
export default class ModalModel {
  constructor(confirmOnClick, title){
    let addtlProps = {
      modalOpen: false,
      title,
      contents: ''
    }
    extendObservable(this, addtlProps)
    this.confirmOnClick = confirmOnClick
    autoBind(this)
  }

  /**
   * @name closeModal
   * @description Sets modalOpen prop to false
   * @method closeModal
   * @memberof ModalModel.prototype
   * @mobx action
   */
  @action closeModal(){this.modalOpen = false}
  /**
   * @name openModal
   * @description Sets modalOpen prop to true
   * @method openModal
   * @memberof ModalModel.prototype
   * @mobx action
   */
  @action openModal(){this.modalOpen = true}
  /**
   * @name confirmAndClose
   * @description Closes modal and runs confirm function
   * @method confirmAndClose
   * @memberof ModalModel.prototype
   * @mobx action
   */
  @action confirmAndClose(){
    this.closeModal()
    this.confirmOnClick(this.contents)
  }
  /**
   * @name changeTitle
   * @description Modal title updater
   * @method changeTitle
   * @memberof ModalModel.prototype
   * @mobx action
   */
  @action changeTitle(title){
    this.title = title
  }
  /**
   * @name changeContent
   * @description Content change updater
   * @method changeContent
   * @memberof ModalModel.prototype
   * @mobx action
   */
  @action changeContent(content){
    this.contents = content
  }
  /**
   * @name changeConfirmFn
   * @description Confirmation function updater
   * @method changeConfirmFn
   * @memberof ModalModel.prototype
   * @mobx action
   */
  @action changeConfirmFn(confirmFn){
    this.confirmOnClick = confirmFn
  }
}
