import {useStrict, extendObservable } from 'mobx'
import ModalModel from './modalModel'
useStrict(true)

/**
 * @name ProjectSummaryModel
 * @class ProjectSummaryModel
 * @classdesc Project summary storage object
 * @param {Function} deleteOnClick  The on click method for clicking delete in summary page
 * @param {Function} completeOnClick  The on click method for clicking complete in summary page
 * @property {ModalModel} deleteModal  The model for the delete modal [observable]
 * @property {ModalModel} completeModal The model for the complete modal [observable]
 * @see {@link ModalModel}
 */
export default class ProjectSummaryModel{
  constructor(deleteOnClick, completeOnClick){
    let addtlProps = {
      deleteModal: new ModalModel(deleteOnClick),
      completeModal: new ModalModel(completeOnClick)
    }
    extendObservable(this, addtlProps)
  }
}
