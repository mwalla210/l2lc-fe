import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'

@inject('page') @observer
export default class Form extends Component {
  renderSelect(obj, index){
    let style = null
    if (obj.isValid){
      style = {
        style: {display: 'none'}
      }
    }
    return (
      <div className="form-group" key={index}>
        <div className="alert alert-danger" role="alert" {...style}>
          <strong>{obj.errorText}</strong>
        </div>
        <label>{obj.label}</label> {(obj.required) ? <span style={{color: 'red'}}> *</span> : null}
        <select disabled={obj.disabled} className="form-control" id={obj.id}
          value={obj.value}
          onChange={event => {
            this.props.page.formModel.modifyFieldValue(index, event.target.value)}}
          onBlur={event => {
            event.preventDefault()
            this.props.page.formModel.fieldValidatorWrapper(index)
          }}>
          {obj.options.map((option, key) =>
            <option key={key}>{option}</option>
          )}
        </select>
      </div>
    )
  }

  renderTextfield(obj, index){
    let style = null
    if (obj.isValid){
      style = {
        style: {display: 'none'}
      }
    }
    return (
      <div className="form-group" key={index}>
        <div className="alert alert-danger" role="alert" {...style}>
          <strong>{obj.errorText}</strong>
        </div>
        <label>{obj.label}</label> {(obj.required) ? <span style={{color: 'red'}}> *</span> : null}
        <input disabled={obj.disabled} type="text" className="form-control"
          id={obj.id} value={obj.value}
          onChange={event => {
            this.props.page.formModel.modifyFieldValue(index, event.target.value)}}
          onBlur={event => {
            event.preventDefault()
            this.props.page.formModel.fieldValidatorWrapper(index)
          }}/>
      </div>
    )
  }

  renderTextarea(obj, index){
    let style = null
    if (obj.isValid){
      style = {
        style: {display: 'none'}
      }
    }
    return (
      <div className="form-group" key={index}>
      <div className="alert alert-danger" role="alert" {...style}>
        <strong>{obj.errorText}</strong>
      </div>
        <label>{obj.label}</label> {(obj.required) ? <span style={{color: 'red'}}> *</span> : null}
        <textarea className="form-control" rows={obj.rows} id={obj.id}
          value={obj.value}
          onChange={event => {
            this.props.page.formModel.modifyFieldValue(index, event.target.value)}}
          onBlur={event => {
            event.preventDefault()
            this.props.page.formModel.fieldValidatorWrapper(index)
          }}>
        </textarea>
      </div>
    )
  }

  renderCheckbox(obj, index){
    return (
      <div className="form-group" key={index}>
        <br></br>
        <div className="form-check">
          <label className="form-check-label" htmlFor={obj.id}>
            {obj.label}
          </label>
          <input className="form-check-input" type="checkbox" id={obj.id}
            checked={obj.value} onChange={event => {
              this.props.page.formModel.modifyFieldValue(index, event.target.checked)}}/>
        </div>
      </div>
    )
  }

  render() {
      return(
        <form>
          {this.props.page.formModel.fields.map((field, index) => {
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
          {this.props.page.formModel.secondaryButton &&
            <button
              className="btn btn-secondary"
              onClick={e => {
                e.preventDefault()
                this.props.page.formModel.secondaryButton.onClick()
            }}>
              {this.props.page.formModel.secondaryButton.title}
            </button>
          }
          <button
            className="btn btn-primary"
            disabled={this.props.page.formModel.buttonDisabled}
            onClick={e => {
              e.preventDefault()
              this.props.page.formModel.primaryButtonWrapper()
          }}>
            {this.props.page.formModel.primaryButton.title}
          </button>
        </form>
      )
    }
}
