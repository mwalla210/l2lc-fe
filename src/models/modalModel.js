import { action, computed, useStrict, extendObservable } from 'mobx'
useStrict(true)

/**
 * @name ModalModel
 * @class ModalModel
 * @classdesc Modal storage object
 * @property {String} type Type of modal ['buttons'|'field']
 * @property {Object[]} [buttonSet] Array of button props (title, onClickFn)
 * @property {String} [title] Modal title
 * @property {Object} [submit] Submission button object
 * @property {String} [submit.title='Submit'] Submission button title
 * @property {Function} submit.onClick Submission button onClick function
 * @property {Boolean} open Modal open flag [observable]
 * @property {String} [bodyField=''] Modal field content [observable]
 * @property {Object} [info=null] Modal open information
 */
export default class ModalModel {
  constructor(type, buttonSet, title, submitTitle='Submit', submitOnClickFn){
    // Type processing (validate required fields) here
    if (
      (type != 'buttons' && type != 'field') ||
      (type == 'buttons' && !buttonSet) ||
      (type == 'field' && !title && !submitOnClickFn)
    ){
      return null
    }

    let addtlProps = {
      open: false,
      bodyField: ''
    }
    extendObservable(this, addtlProps)
    this.type = type
    this.buttonSet = buttonSet
    this.title = title
    this.submit = {
      onClick: submitOnClickFn,
      title: submitTitle
    }
    this.info = null
  }

  /**
   * @name openModal
   * @description Opens modal
   * @method openModal
   * @memberof ModalModel.prototype
   * @mobx action
   */
  @action openModal(info){
    this.open = true
    this.info = info
  }
  /**
   * @name closeModal
   * @description Closes modal
   * @method closeModal
   * @memberof ModalModel.prototype
   * @mobx action
   */
  @action closeModal(){
    this.open = false
  }
}
