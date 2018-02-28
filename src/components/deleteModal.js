import React, { Component } from 'react'
import PropTypes from 'prop-types'
import PromptModal from './promptModal'

export default class DeleteModal extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    confirmOnClick: PropTypes.func.isRequired,
    denyOnClick: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    closeFn: PropTypes.func.isRequired,
    content: PropTypes.string.isRequired,
  }

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
