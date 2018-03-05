import {useStrict, extendObservable } from 'mobx'
import ModalModel from './modalModel'
useStrict(true)

/**
 * @name ProjectSummaryModel
 * @class ProjectSummaryModel
 * @classdesc Project summary storage object
 * @property {ModalModel} deleteModal  The model for the delete modal [observable]
 * @property {ModalModel} fieldModal The model for the field modal [observable]
 * @property {ModalModel} completeModal The model for the complete modal  [observable]
 */
export default class ProjectSummaryModel{
  constructor(deleteOnClick, completeOnClick){
    let addtlProps = {
      deleteModal: new ModalModel(deleteOnClick),
      fieldModal: new ModalModel(null, ''),
      completeModal: new ModalModel(completeOnClick)
    }
    extendObservable(this, addtlProps)
  }
}
