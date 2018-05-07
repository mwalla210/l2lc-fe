import { useStrict, action } from 'mobx'
import autoBind from 'auto-bind'
import FormModel from './formModel'
import Website from '../store/website'
import API from '../api'
import Consts from '../consts'
useStrict(true)

/**
  * @name ProjectTaskFormModel
  * @class ProjectTaskFormModel
  * @classdesc Customer initializer for form storage object
  * @description Creates fields, sets correct onClick
  * @property {Function} onClickNav Page navigation function for successful form submission
  * @property {Function} onClickCustomerNav Page navigation function for successful form submission
  * @property {Function} onCancelNav Page navigation function for cancelled form submission
  * @property {Function} errorClick Page navigation function error modal confirmation click
  * @extends FormModel
 */
export default class ProjectTaskFormModel extends FormModel{
  constructor(onClickNav, onCancelNav, errorClick) {
    let primaryOnClick = null
    super(Consts.taskFields,
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
    this.onCancelNav = onCancelNav
    autoBind(this)
    this.primaryButton.onClick = (fields) => {
      let valueReturn = (id) => {
        let val
        fields.forEach(item => {
          if (item.id == id){
            val = item.value
          }
        })
        return val
      }
      let body = {
        title: valueReturn('taskName'),
        required: true,
      }
      let station = valueReturn('processArea')
      if (station.trim() != '')
        body.station = station
      API.createTask(Website.currentProject.id, JSON.stringify(body))
      .then((response) => {
        if(typeof response != 'string'){
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
   * @memberof ProjectTaskFormModel.prototype
   * @mobx action
   */
  @action resetFields(){
    this.fields = Consts.projectFields
  }
}
