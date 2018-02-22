import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class CircleButton extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    iconName: PropTypes.string.isRequired,
    styleProps: PropTypes.object
  }

  render(){
    let fileName = '../../style/open-iconic-master/svg/'
    fileName += `${this.props.iconName}.svg`
    return (
      <button type='button' className='btn btn-default btn-circle' aria-label='Left Align' onClick={this.props.onClick}>
        <img src={fileName} alt={this.props.iconName} style={this.props.styleProps}/>
      </button>
    )
  }
}
