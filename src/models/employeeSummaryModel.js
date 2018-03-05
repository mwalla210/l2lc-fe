import {useStrict, extendObservable } from 'mobx'
import ModalModel from './modalModel'
useStrict(true)

/**
 * @name EmployeeSummaryModel
 * @class EmployeeSummaryModel
 * @classdesc Employee summary storage object
 * @property {ModalModel} deleteModal  The model for the delete modal [observable]
 */
export default class EmployeeSummaryModel{
  constructor(deleteOnClick){
    let addtlProps = {
      deleteModal: new ModalModel(deleteOnClick),
    }
    extendObservable(this, addtlProps)
  }
}
