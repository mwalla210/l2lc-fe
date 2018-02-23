import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal, Button } from 'react-bootstrap'

export default class PromptModal extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    confirmOnClick: PropTypes.func.isRequired,
    confirmClass: PropTypes.string,
    denyOnClick: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    closeFn: PropTypes.func.isRequired,
    content: PropTypes.string.isRequired,
  }

  render(){
    let confirm = {}
    if (this.props.confirmClass)
      confirm = {
        className: this.props.confirmClass
      }
    return (
      <Modal bsSize='small' show={this.props.open} onHide={() => this.props.closeFn()}>
        <Modal.Header closeButton>
          <Modal.Title>{this.props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{this.props.content}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => this.props.denyOnClick()}>
            Close
          </Button>
          <Button {...confirm} onClick={() => this.props.confirmOnClick()}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
}
