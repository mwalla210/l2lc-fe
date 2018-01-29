import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { formfield }

export default class Form extends Component {

  render() {
    return(
      <form>
        <div class="form-group">
          {formfield}
        </div>
        <button class="btn btn-primary" onClick={this.props.onClick}>{this.props.buttonText}</button>
      </form>
    )
  }
}
