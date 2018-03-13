import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ButtonDefault from './buttonDefault'

export default class ButtonPrimary extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    text: PropTypes.string,
    className: PropTypes.string,
    type: PropTypes.string,
    style: PropTypes.object
  }

  render(){
    return (
      <ButtonDefault
        className={`btn-primary${(this.props.className)? ` ${this.props.className}`: ''}`}
        disabled={this.props.disabled}
        onClick={this.props.onClick}
        text={this.props.text}
        type={this.props.type}
        style={this.props.style}
      />
    )
  }
}
