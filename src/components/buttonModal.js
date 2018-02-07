import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Modal, Button } from 'react-bootstrap'

@observer
export default class ButtonModal extends Component {
  //  Set of buttons with onClicks: no title, no default bottom close button, provide array of buttons (with title, onClick) for body
  //    Click project in table
  static propTypes = {
    buttons: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
      onClick: PropTypes.func.isRequired
    })).isRequired,
    open: PropTypes.bool.isRequired,
    closeFn: PropTypes.func.isRequired
  }

  render(){

    return (
      <Modal show={this.props.open} onHide={() => this.props.closeFn()}>
        <Modal.Header closeButton/>
        <Modal.Body>
          {this.props.buttons.map(button =>
            <div id='row'>
              <Button onClick={() => button.onClick()}>
                {button.title}
              </Button>
            </div>
          )}
        </Modal.Body>
      </Modal>
    )
  }
}
