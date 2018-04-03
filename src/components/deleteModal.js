import React, { Component } from 'react'
import PropTypes from 'prop-types'
import PromptModal from './promptModal'

/**
 * DeleteModal component; constructor binds functions
 * @namespace DeleteModal
 * @property {String} title Modal title
 * @property {Function} confirmOnClick Confirmation click function
 * @property {Function} denyOnClick Deny click function
 * @property {Boolean} open Modal open indicator
 * @property {Function} closeFn Modal close function
 * @property {String} content Modal content
 * @extends React.Component
 */
export default class DeleteModal extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    confirmOnClick: PropTypes.func.isRequired,
    denyOnClick: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    closeFn: PropTypes.func.isRequired,
    content: PropTypes.string.isRequired,
  }

  /**
   * Renders PromptModal component
   * @method render
   * @memberof DeleteModal.prototype
   * @return {PromptModal}
   */
  render(){
    return (
      <PromptModal
        headerClass="bg-danger"
        title={this.props.title}
        titleImage="warning"
        titleClass="text-danger"
        confirmOnClick={this.props.confirmOnClick}
        denyOnClick={this.props.denyOnClick}
        open={this.props.open}
        closeFn={this.props.closeFn}
        content={this.props.content}
        confirmClass="btn-danger"
      />
    )
  }
}
