import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { observer, inject } from 'mobx-react'
import { Modal, Button } from 'react-bootstrap'

@inject('page') @observer
export default class L2LCModal extends Component {
  // Types of modals in use:
  //  Set of buttons with onClicks: no title, no default bottom close button, provide array of buttons (with title, onClick) for body
  //    Click project in table
  //  Input field: has default bottom close button, provide title, submit button (with title, onClick), and body (field)
  //    Add hold, rework
  static propTypes = {
    title: PropTypes.string,
    body: PropTypes.object.isRequired,
    button: PropTypes.shape({
      title: PropTypes.string.isRequired,
      onClick: PropTypes.func.isRequired
    })
  }

  render(){
    /* Modal allowing additional bottom button, title, body
    <Modal show={this.props.page.modalOpen} onHide={() => this.props.page.hideModal()}>
      <Modal.Header closeButton>
        {this.props.title &&
          <Modal.Title>{this.props.title}</Modal.Title>
        }
      </Modal.Header>
      <Modal.Body>
        {this.props.body}
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => this.props.page.hideModal()}>
            Close
        </Button>
        {this.props.button &&
          <Button
            onClick={this.props.button.onClick}>
              {this.props.button.title}
          </Button>
        }
      </Modal.Footer>
    </Modal>
     */

    /* Modal with sequence of buttons in body
    <Modal show={this.props.page.modalOpen} onHide={() => this.props.page.hideModal()}>
      <Modal.Header closeButton/>
      <Modal.Body>
        <div id='row'>
          <Button
            onClick={() => console.log('onClick')}>
              Button Sequence in Modal
          </Button>
        </div>
        <div id='row'>
          <Button
            onClick={() => console.log('onClick')}>
              Button Sequence in Modal
          </Button>
        </div>
      </Modal.Body>
    </Modal>
     */
    return (
      <Modal show={this.props.page.modalOpen} onHide={() => this.props.page.hideModal()}>
        <Modal.Header closeButton>
          {this.props.title &&
            <Modal.Title>{this.props.title}</Modal.Title>
          }
        </Modal.Header>
        <Modal.Body>
          {this.props.body}
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => this.props.page.hideModal()}>
              Close
          </Button>
          {this.props.button &&
            <Button
              onClick={this.props.button.onClick}>
                {this.props.button.title}
            </Button>
          }
        </Modal.Footer>
      </Modal>
    )
  }
}
