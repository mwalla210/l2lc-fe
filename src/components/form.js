import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import Formfield from './formfield'

export default class Form extends Component {
  static propTypes = {
    fields: PropTypes.array,
  }

  render() {
    return(
      <form>
        <div className="form-group">
          {this.props.fields}
        </div>
        <button className="btn btn-primary" onClick={this.props.onClick}>{this.props.buttonText}</button>
      </form>
    )
  }
}
