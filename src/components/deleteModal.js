import React from 'react'
import { observer } from 'mobx-react'
import { Modal, Button } from 'react-bootstrap'
import PromptModal from './promptModal'

@observer
export default class DeleteModal extends PromptModal {
  static defaultProps = {
    confirmClass: 'btn-danger'
  }

  render(){
    return (
      <Modal bsSize='small' show={this.props.open} onHide={() => this.props.closeFn()}>
        <Modal.Header closeButton className='bg-danger'>
          <Modal.Title className='text-danger'>
            <img src='../../style/open-iconic-master/svg/warning.svg' alt='warning' style={{width: '14px', marginRight: '3px', marginTop: '-2px'}}/>
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
          <Button className={this.props.confirmClass} onClick={() => this.props.confirmOnClick()}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
}
