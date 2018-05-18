import React, {Component} from 'react'
import { inject, observer } from 'mobx-react'
import {Alert, ButtonToolbar, ButtonGroup} from 'reactstrap'
import ButtonPrimary from './buttonPrimary'
import ButtonDefault from './buttonDefault'
import PromptModal from './promptModal'

/**
 * TimeEntry component
 * @namespace TimeEntry
 * @extends React.Component
 * @see {@link PageStore @inject PageStore}
 * @see {@link Website @inject Website}
 */
@inject ('website', 'page') @observer
export default class TimeEntry extends Component {
  constructor(){
    super()
    this.onChange = this.onChange.bind(this)
    this.onClick = this.onClick.bind(this)
    this.onCancel = this.onCancel.bind(this)
  }

  /**
   * On change method for text area field
   * @method onChange
   * @param  {Object} event Event object from text area field change
   * @memberof TimeEntry.prototype
   */
  onChange(event){
    let delineater = event.target.value.includes('%')
    this.props.page.formModel.setValue(event.target.value.replace('%',''),delineater)
  }

  /**
   * On click method for submit button
   * @method onClick
   * @param  {Object} event Event object from button click
   * @memberof TimeEntry.prototype
   */
  onClick(event){
    event.preventDefault()
    this.props.page.formModel.submit()
  }

  /**
   * On click method for cancel button
   * @method onCancel
   * @param  {Object} event Event object from button click
   * @memberof TimeEntry.prototype
   */
  onCancel(event){
    event.preventDefault()
    this.props.page.setNullContent()
    setTimeout(() => {
      this.props.page.projectTimeEntryMenuItem()
    }, 100)
  }

  /**
   * Renders HTML div component, containing employee name, barcode, and buttons
   * @method render
   * @memberof TimeEntry.prototype
   * @return {Component}
   * @see {@link PromptModal}
   * @see {@link ButtonPrimary}
   * @see {@link ButtonDefault}
   * @see {@link https://reactstrap.github.io/components/button-group/ Reactstrap.ButtonGroup}
   * @see {@link https://reactstrap.github.io/components/alert/ Reactstrap.Alert}
   */
  render() {
    return (
      <div className="row justify-content-center">
        <PromptModal
          headerClass="bg-alert"
          title="Warning"
          titleImage="warning"
          titleClass="text-alert"
          confirmOnClick={this.props.page.formModel.closeModal}
          open={this.props.page.formModel.errorModalOpen}
          closeFn={this.props.page.formModel.closeModal}
          content={this.props.page.formModel.errorResponse}
          confirmClass="btn-alert"
          primaryButtonText="Ok"
        />
        <div className="col-6">
          <Alert color="success" isOpen={this.props.page.formModel.submissionConfirmOpen}>
            Time entry submitted successfully!
          </Alert>
          <p>Scan all projects and employees first, then scan station.</p>
          <form>
            <textarea
              className="form-control"
              style={{marginBottom: '10px'}}
              rows="5"
              value={this.props.page.formModel.value}
              onChange={this.onChange}
              autoFocus
            />
            {this.props.page.formModel.projectID != '' && <p>{`Project ID: ${this.props.page.formModel.projectID}`}</p>}
            {this.props.page.formModel.employeeID != '' && <p>{`Employee ID: ${this.props.page.formModel.employeeID}`}</p>}
            {this.props.page.formModel.station != '' && <p>{`Station: ${this.props.page.formModel.station}`}</p>}
            <div className="row justify-content-center">
              <ButtonToolbar>
                <ButtonGroup>
                  <ButtonDefault className="btn-outline-secondary" onClick={this.onCancel} text="Clear"/>
                  <ButtonPrimary
                    disabled={this.props.page.formModel.buttonDisabled}
                    onClick={this.onClick}
                    text="Continue"
                  />
                </ButtonGroup>
              </ButtonToolbar>
            </div>
          </form>
        </div>
        <div className="col-10">
          <textarea
            className="form-control"
            style={{marginTop: '10px'}}
            rows="11"
            value={this.props.website.taskHistory}
            disabled
          />
        </div>
      </div>
    )
  }
}
