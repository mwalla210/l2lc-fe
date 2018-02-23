import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal, Button } from 'react-bootstrap'

export default class PromptModal extends Component {
  static propTypes = {
    headerClass: PropTypes.string,
    title: PropTypes.string.isRequired,
    titleImage: PropTypes.string,
    titleClass: PropTypes.string,
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
    let header = {}
    if (this.props.headerClass)
      header = {
        className: this.props.headerClass
      }
    let titleClass = {}
    if (this.props.titleClass)
      titleClass = {
        className: this.props.titleClass
      }
    let titleImage = null
    if (this.props.titleImage)
      titleImage = <img
        src={`../../style/open-iconic-master/svg/${this.props.titleImage}.svg`}
        alt={this.props.titleImage}
        style={{width: '14px', marginRight: '3px', marginTop: '-2px'}}/>
    return (
      <Modal bsSize='small' show={this.props.open} onHide={() => this.props.closeFn()}>
        <Modal.Header closeButton {...header}>
          <Modal.Title {...titleClass}>
            {titleImage}
            {this.props.title}
          </Modal.Title>
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
