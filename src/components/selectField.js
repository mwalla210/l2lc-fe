import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { inject, PropTypes as MobXPropTypes } from 'mobx-react'

/**
 * SelectField component
 * @namespace SelectField
 * @property {String} id Field array index
 * @property {Boolean} disabled Field disabled indicator
 * @property {String} value Field value
 * @property {Object[]} options Field select options
 * @property {Function} onChange Field change function
 * @property {Function} onBlur Field blur function
 * @property {Boolean} valid Field validity indicator
 * @property {Boolean} focus Field autofocus indicator
 * @extends React.Component
 * @see {@link PageStore @inject PageStore}
 */
@inject('page')
export default class SelectField extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    disabled: PropTypes.bool.isRequired,
    value: PropTypes.string.isRequired,
    options: MobXPropTypes.observableArrayOf(PropTypes.object).isRequired,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
    valid: PropTypes.bool.isRequired,
    focus:PropTypes.bool.isRequired
  }

  /**
   * Renders HTML select component
   * @method render
   * @memberof SelectField.prototype
   * @return {Component}
   */
  render(){
    let color = ''
    if(!this.props.valid)
      color = 'orange'
    let value = this.props.value
    if(this.props.value == '' && this.props.options.length > 0){
      let selectedItem = this.props.options.find(item => item.selected)
      value = selectedItem.title
    }
    return (
      <select
        disabled={this.props.disabled}
        style = {{borderColor: color}}
        className="form-control"
        id={this.props.id}
        value={value}
        onChange={this.props.onChange}
        onBlur={this.props.onBlur}
        autoFocus={this.props.focus}
      >
        {this.props.options.map((option, key) =>{
          let addtlProps = {}
          if (option.disabled)
            addtlProps = {disabled: true}
          return (<option key={key} {...addtlProps}>{option.title}</option>)
        })}
      </select>
    )
  }
}
