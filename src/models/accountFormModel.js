import { useStrict, action } from 'mobx'
import autoBind from 'auto-bind'
import FormModel from './formModel'
import Website from '../store/website'
import Consts from '../consts'
useStrict(true)

/**
  * @name AccountFormModel
  * @class AccountFormModel
  * @classdesc Account initializer for form storage object
  * @description Creates fields, sets correct onClick
  * @property {Function} onClickNav Page navigation function for successful form submission
  * @property {Function} onCancelNav Page navigation function for cancelled form submission
  * @property {Function} errorClick Page navigation function for error modal confirmation click
  * @extends FormModel
 */
export default class AccountFormModel extends FormModel{
  constructor(onClickNav, onCancelNav, errorClick) {
    let primaryOnClick = () => {}
    super(Consts.accountFields,
      {
        title: 'Continue',
        onClick: primaryOnClick
      },
      {
        title: 'Cancel',
        onClick: onCancelNav
      },
      null,
      null,
      errorClick
    )
    this.onClickNav = onClickNav
    autoBind(this)
    this.primaryButton.onClick = this.newButton()
  }
  /**
   * @name resetFields
   * @description Sets all fields back to defaults
   * @method resetFields
   * @memberof AccountFormModel.prototype
   * @mobx action
   */
  @action resetFields(){
    this.fields = Consts.accountFields
  }
  /**
   * @name editButton
   * @description Returns function for onClick of primary button when editing
   * @method editButton
   * @return {Function}
   * @memberof AccountFormModel.prototype
   */
  editButton(){
    // Change onClick functionality for primary
    return (fields) => console.log('EDIT with', fields)
  }
  /**
   * @name newButton
   * @description Returns function for onClick of primary button when creating
   * @method newButton
   * @return {Function}
   * @memberof AccountFormModel.prototype
   */
  newButton(){
    return (fields) => {
      let body = {}
      fields.forEach(item => {
        body[item.id] = item.value
      })
      Website.createAccount(body)
      .then((response) => {
        if(response == null){
          this.onClickNav()
        } else {
          this.setError(response)
          this.openModal()
        }
      })
    }
  }

  /**
   * @name setEdit
   * @description Modifies primary button click, initializes field values as editing values corresponding to currentAccount
   * @method setEdit
   * @memberof AccountFormModel.prototype
   * @mobx action
   */
  @action setEdit(){
    this.primaryButton.onClick = this.editButton()
    this.resetFields()
  }
  /**
   * @name setNonEdit
   * @description Modifies primary button click, initializes field values as default values
   * @method setNonEdit
   * @memberof AccountFormModel.prototype
   * @mobx action
   */
  @action setNonEdit(){
    this.primaryButton.onClick = this.newButton(this.onClickNav)
    this.resetFields()
  }
}
