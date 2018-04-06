import React, {Component} from 'react'
import { inject, observer } from 'mobx-react'
import Form from './form'

/**
 * TimeEntry component
 * @namespace TimeEntry
 * @extends React.Component
 */
@inject ('website', 'page') @observer
export default class TimeEntry extends Component {
  /**
   * Renders HTML div component, containing employee name, barcode, and buttons
   * @method render
   * @memberof TimeEntry.prototype
   * @return {Component}
   */
  render() {
    return (
      <div>
        <div className="col-sm-6 col-sm-offset-3" style={{marginBottom: '20px'}}>
          <label>{'Station'}</label>
          <input
            disabled
            type="text"
            className="form-control"
            id="stationID"
            value={this.props.website.currentUser.stationID}
          />
        </div>
        <Form/>
      </div>
    )
  }
}
