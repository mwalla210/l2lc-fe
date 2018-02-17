import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'

@inject('page') @observer
export default class Form extends Component {
  renderSelect(obj, index){
      return (
        <div className="form-group" key={index}>
          <label>{obj.label}</label>
          <select className="form-control" id={obj.id}
            value={obj.value}
            onChange={event => {
              this.props.page.formModel.modifyFieldValue(index, event.target.value)}}>
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
              this.props.page.formModel.modifyFieldValue(index, event.target.value)}}/>
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
              this.props.page.formModel.modifyFieldValue(index, event.target.value)}}>
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
