import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal, Button } from 'react-bootstrap'

export default class FieldModal extends Component {
  //  Input field: has default bottom close button, provide title, submit button (with title, onClick)
  //    Add hold, rework
  static propTypes = {
    title: PropTypes.string.isRequired,
    submitButton: PropTypes.shape({
      title: PropTypes.string,
      onClick: PropTypes.func.isRequired
    }).isRequired,
    open: PropTypes.bool.isRequired,
    closeFn: PropTypes.func.isRequired,
    fieldContent: PropTypes.string.isRequired
  }

  render(){
    return (
      <Modal show={this.props.open} onHide={() => this.props.closeFn()}>
        <Modal.Header closeButton>
            <Modal.Title>{this.props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='form-group'>
            <textarea className='form-control' id='modalTextArea' rows='3'></textarea>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => this.props.closeFn()}>
              Close
          </Button>
          <Button onClick={this.props.submitButton.onClick}>
            {this.props.submitButton.title || 'Submit'}
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
}
