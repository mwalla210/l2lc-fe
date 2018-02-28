import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal, Button } from 'react-bootstrap'

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
          <Button onClick={this.hide}>Close</Button>
          <Button className="btn btn-primary" onClick={this.props.submitButton.onClick}>
            {this.props.submitButton.title || 'Submit'}
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
}
