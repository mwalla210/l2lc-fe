import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'react-bootstrap'
import ButtonDefault from './buttonDefault'

/**
 * PromptModal component; constructor binds functions
 * @namespace PromptModal
 * @property {String} [headerClass] Modal header style class
 * @property {String} title Modal title
 * @property {String} [titleImage] Modal title icon name
 * @property {String} [titleClass] Modal title style class
 * @property {Function} confirmOnClick Confirmation click function
 * @property {String} [confirmClass] Confirmation button style class
 * @property {Function} denyOnClick Deny click function
 * @property {Boolean} open Modal open indicator
 * @property {Function} closeFn Modal close function
 * @property {String} content Modal content
 * @property {String} [primaryButtonText] Modal confirm button text
 * @extends React.Component
 */
export default class PromptModal extends Component {
  static propTypes = {
    headerClass: PropTypes.string,
    title: PropTypes.string.isRequired,
    titleImage: PropTypes.string,
    titleClass: PropTypes.string,
    confirmOnClick: PropTypes.func.isRequired,
    confirmClass: PropTypes.string,
    denyOnClick: PropTypes.func,
    open: PropTypes.bool.isRequired,
    closeFn: PropTypes.func.isRequired,
    content: PropTypes.string.isRequired,
    primaryButtonText: PropTypes.string
  }

  constructor(props){
    super(props)
    this.hide = this.hide.bind(this)
    this.deny = this.deny.bind(this)
    this.confirm = this.confirm.bind(this)
  }

  /**
   * Closes modal
   * @method hide
   * @memberof PromptModal.prototype
   */
  hide(){
    this.props.closeFn()
  }

  /**
   * Calls denyOnClick
   * @method deny
   * @memberof PromptModal.prototype
   */
  deny(){
    this.props.denyOnClick()
  }

  /**
   * Calls confirmOnClick
   * @method confirm
   * @memberof PromptModal.prototype
   */
  confirm(){
    this.props.confirmOnClick()
  }

  /**
   * Renders React Bootstrap Modal component
   * @method render
   * @memberof PromptModal.prototype
   * @return {Component}
   * @see {@link https://react-bootstrap.github.io/components/modal/ ReactBootstrap.Modal}
   */
  render(){
    let confirmText = 'Confirm'
    if(this.props.primaryButtonText != null){
      confirmText = this.props.primaryButtonText
    }
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
      titleImage = (
        <img
          src={`../../style/open-iconic-master/svg/${this.props.titleImage}.svg`}
          alt={this.props.titleImage}
          style={{width: '14px', marginRight: '3px', marginTop: '-2px'}}
        />
      )
    return (
      <Modal bsSize="small" show={this.props.open} onHide={this.hide}>
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
          {((this.props.denyOnClick) ?
          <ButtonDefault onClick={this.deny} text="Close"/> : null)}
          <ButtonDefault {...confirm} onClick={this.confirm} text={confirmText}/>
        </Modal.Footer>
      </Modal>
    )
  }
}
