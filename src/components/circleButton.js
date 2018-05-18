import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'reactstrap'

/**
 * CircleButton component
 * @namespace CircleButton
 * @property {Function} onClick Button click function
 * @property {String} iconName Name of icon to render for button
 * @property {Object} [styleProps] Object of style properties if needed
 * @property {Boolean} [disabled] Disabled indicator (used by user roles)
 * @extends React.Component
 */
export default class CircleButton extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    iconName: PropTypes.string.isRequired,
    styleProps: PropTypes.object,
    disabled: PropTypes.bool,
  }

  /**
   * Renders HTML button component
   * @method render
   * @memberof CircleButton.prototype
   * @return {Component}
   * @see {@link https://reactstrap.github.io/components/buttons/ Reactstrap.Buttons}
   */
  render(){
    let fileName = '../../style/open-iconic-master/svg/'
    fileName += `${this.props.iconName}.svg`
    return (
      <Button outline color="secondary" className="btn-circle" aria-label="Left Align" onClick={this.props.onClick} disabled={this.props.disabled}>
        <img src={fileName} alt={this.props.iconName} style={this.props.styleProps}/>
      </Button>
    )
  }
}
