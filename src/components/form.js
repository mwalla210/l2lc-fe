import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { observer, PropTypes as MobXPropTypes } from 'mobx-react'

@observer
export default class Form extends Component {
  static propTypes = {
    fields: MobXPropTypes.observableArray.isRequired,
    primaryButtonTitle: PropTypes.string.isRequired,
    primaryOnClick: PropTypes.func.isRequired,
    secondaryButtonTitle: PropTypes.string,
    secondaryOnClick: PropTypes.func,
    valueChangeFunc: PropTypes.func.isRequired,
    buttonDisabled: PropTypes.bool.isRequired
  }

  renderSelect(obj, index){
      return (
        <div className="form-group" key={index}>
          <label>{obj.label}</label>
          <select className="form-control" id={obj.id}
            value={obj.value}
            onChange={event => {
              this.props.valueChangeFunc(index, event.target.value)}}>
            {obj.options.map((option, key) =>
              <option key={key}>{option}</option>
            )}
          </select>
        </div>
      )
    }

    renderTextfield(obj, index){
      return (
        <div className="form-group" key={index}>
          <label>{obj.label}</label>
          <input type="text" className="form-control"
            id={obj.id} value={obj.value}
            onChange={event => {
              this.props.valueChangeFunc(index, event.target.value)}}/>
        </div>
      )
    }

    renderTextarea(obj, index){
      return (
        <div className="form-group" key={index}>
          <label>{obj.label}</label>
          <textarea className="form-control" rows={obj.rows} id={obj.id}
            value={obj.value}
            onChange={event => {
              this.props.valueChangeFunc(index, event.target.value)}}>
          </textarea>
        </div>
      )
    }

    renderCheckbox(obj, index){
      return (
        <div className="form-group" key={index}>
          <div className="form-check">
            <label className="form-check-label" htmlFor={obj.id}>
              {obj.label}
            </label>
            <input className="form-check-input" type="checkbox" id={obj.id}
              checked={obj.value} onChange={event => {
                this.props.valueChangeFunc(index, event.target.checked)}}/>
          </div>
        </div>
      )
    }

    render() {
        return(
          <form>
            {this.props.fields.map((field, index) => {
                switch (field.type){
                  case 'select':
                    return this.renderSelect(field,index)
                  case 'textfield':
                    return this.renderTextfield(field,index)
                  case 'textarea':
                    return this.renderTextarea(field,index)
                  case 'checkbox':
                    return this.renderCheckbox(field,index)
                }
              })}
            {this.props.secondaryButtonTitle &&
              <button
                className="btn btn-secondary"
                onClick={e => {
                  e.preventDefault()
                  this.props.secondaryOnClick()
              }}>
                {this.props.secondaryButtonTitle}
              </button>
            }
            <button
              className="btn btn-primary"
              disabled={this.props.buttonDisabled}
              onClick={e => {
                e.preventDefault()
                this.props.primaryOnClick()
            }}>
              {this.props.primaryButtonTitle}
            </button>
          </form>
        )
      }
}
