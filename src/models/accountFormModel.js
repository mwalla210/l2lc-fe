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
  * @param {Function} onClickNav Page navigation function for successful form submission
  * @param {Function} onCancelNav Page navigation function for cancelled form submission
  * @param {Function} errorClick Page navigation function for error modal confirmation click
  * @property {Function} onClickNav Page navigation function for successful form submission
  * @extends FormModel
 */
export default class AccountFormModel extends FormModel{
  constructor(onClickNav, onCancelNav, errorClick) {
    let primaryOnClick = null
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
    this.primaryButton.onClick = (fields) => {
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
   * @name resetFields
   * @description Sets all fields back to defaults
   * @method resetFields
   * @memberof AccountFormModel.prototype
   * @mobx action
   */
  @action resetFields(){
    this.fields = Consts.accountFields
  }
}
