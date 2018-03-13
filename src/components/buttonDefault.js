import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class ButtonDefault extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    text: PropTypes.string,
    className: PropTypes.string,
    type: PropTypes.string
  }

  static defaultProps = {
    type: 'button'
  }

  render(){
    return (
      <button type={this.props.type} className={`btn${(this.props.className)? ` ${this.props.className}`: ''}`} disabled={this.props.disabled} onClick={this.props.onClick}>
        {this.props.text}
      </button>
    )
  }
}
