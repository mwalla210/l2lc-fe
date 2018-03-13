import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'react-bootstrap'
import ButtonPrimary from './buttonPrimary'
import ButtonDefault from './buttonDefault'

export default class FieldModal extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    submitButton: PropTypes.shape({
      title: PropTypes.string,
      onClick: PropTypes.func.isRequired
    }).isRequired,
    open: PropTypes.bool.isRequired,
    closeFn: PropTypes.func.isRequired,
    onChangeFn: PropTypes.func.isRequired,
    contents: PropTypes.string.isRequired
  }

  constructor(props){
    super(props)
    this.hide = this.hide.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  hide(){
    this.props.closeFn()
  }

  onChange(event){
    this.props.onChangeFn(event.target.value)
  }

  render(){
    return (
      <Modal show={this.props.open} onHide={this.hide}>
        <Modal.Header closeButton>
            <Modal.Title>{this.props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <textarea onChange={this.onChange} value={this.props.contents} className="form-control" id="modalTextArea" rows="3"/>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <ButtonDefault onClick={this.hide} text="Close"/>
          <ButtonPrimary onClick={this.props.submitButton.onClick} text={this.props.submitButton.title || 'Submit'}/>
        </Modal.Footer>
      </Modal>
    )
  }
}
