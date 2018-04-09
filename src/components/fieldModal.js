import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap'
import ButtonPrimary from './buttonPrimary'
import ButtonDefault from './buttonDefault'

/**
 * FieldModal component; constructor binds functions
 * @namespace FieldModal
 * @property {String} title Modal title
 * @property {Object} submitButton Modal submit button properties
 * @property {String} [submitButton.title] Modal submit button text
 * @property {Function} submitButton.onClick Modal submit button click function
 * @property {Boolean} open Modal open indicator
 * @property {Function} closeFn Modal close function
 * @property {Function} onChangeFn Modal content change function
 * @property {String} contents Modal field contents
 * @extends React.Component
 */
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

  /**
   * Calls closeFn
   * @method hide
   * @memberof FieldModal.prototype
   */
  hide(){
    this.props.closeFn()
  }

  /**
   * Calls onChangeFn with event
   * @method onChange
   * @param {Object} event Field content change event
   * @memberof FieldModal.prototype
   */
  onChange(event){
    this.props.onChangeFn(event.target.value)
  }

  /**
   * Renders ReactBootstrap.Modal component
   * @method render
   * @memberof FieldModal.prototype
   * @return {Component}
   * @see {@link https://reactstrap.github.io/components/modals/ Reactstrap.Modal}
   */
  render(){
    return (
      <Modal isOpen={this.props.open} toggle={this.hide}>
        <ModalHeader toggle={this.hide}>
          {this.props.title}
        </ModalHeader>
        <ModalBody>
          <div className="form-group">
            <textarea onChange={this.onChange} value={this.props.contents} className="form-control" id="modalTextArea" rows="3"/>
          </div>
        </ModalBody>
        <ModalFooter>
          <ButtonDefault onClick={this.hide} text="Close"/>
          <ButtonPrimary onClick={this.props.submitButton.onClick} text={this.props.submitButton.title || 'Submit'}/>
        </ModalFooter>
      </Modal>
    )
  }
}
