import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'

export default class Form extends Component {
  static propTypes = {
    fields: PropTypes.array.isRequired,
    primaryButton: PropTypes.shape({
      title: PropTypes.string.isRequired,
      onClick: PropTypes.func.isRequired
    }).isRequired,
    secondaryButton: PropTypes.shape({
      title: PropTypes.string.isRequired,
      onClick: PropTypes.func.isRequired
    })
  }

  renderSelect(obj, index){
      return (
        <div className="form-group" key={index}>
          <label>{obj.label}</label>
          <select className="form-control" id={obj.id}>
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
          <input type="text" className="form-control" id={obj.id}/>
        </div>
      )
    }

    renderTextarea(obj, index){
      return (
        <div className="form-group" key={index}>
          <label>{obj.label}</label>
          <textarea className="form-control" rows={obj.rows} id={obj.id}></textarea>
        </div>
      )
    }

    renderCheckbox(obj, index){
      return (
        <div className="form-group" key={index}>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" value="" id={obj.id}/>
            <label className="form-check-label" htmlFor={obj.id}>
              {obj.label}
            </label>
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
            <button
              className="btn btn-primary"
              onClick={e => {
                e.preventDefault()
                this.props.primaryButton.onClick()
            }}>
              {this.props.primaryButton.title}
            </button>
            {this.props.secondaryButton &&
              <button
                className="btn btn-secondary"
                onClick={e => {
                  e.preventDefault()
                  this.props.secondaryButton.onClick()
              }}>
                {this.props.secondaryButton.title}
              </button>
            }
          </form>
        )
      }
}
