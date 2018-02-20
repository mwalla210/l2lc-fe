import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import Login from './login'
import Table from './table'
import Form from './form'
import NavBar from './navbar'

@inject ('page') @observer
export default class Page extends Component {
  loginContent() {
    return(
      <Login/>
    )
  }

  pageContent(){
    let tableContent = null
    if (this.props.page.tableModel){
      tableContent = <Table tableModel={this.props.page.tableModel}/>
    }
    let formContent = null
    if (this.props.page.formModel){
      formContent = <Form
        fields={this.props.page.formModel.fields}
        primaryButtonTitle={this.props.page.formModel.primaryButton.title}
        primaryOnClick={() => this.props.page.formModel.primaryButtonWrapper()}
        secondaryButtonTitle={this.props.page.formModel.secondaryButton.title}
        secondaryOnClick={this.props.page.formModel.secondaryButton.onClick}
        valueChangeFunc={this.props.page.formModel.modifyFieldValue}
        fieldValidator={this.props.page.formModel.fieldValidatorWrapper}
        buttonDisabled={this.props.page.formModel.buttonDisabled}/>
    }
    return (
      <div>
        <NavBar/>
        <h1>{this.props.page.title}</h1>
        {this.props.page.content}
        {tableContent}
        {formContent}
        {(this.props.page.buttons) ? this.props.page.buttons.map((buttonObj, index) => {
          let addtl = {}
          if (buttonObj.class)
            addtl = {className: `btn ${buttonObj.class}`}
          else
            addtl = {className: 'btn btn-default'}
          return (<button onClick={buttonObj.onClick} key={index} {...addtl}>{buttonObj.title}</button>)
        }):
        null}
      </div>
    )
  }

  render() {
    let content = null
    if (this.props.page.loggedin)
      content = <div>{this.loginContent()}</div>
    else
      content = <div>{this.pageContent()}</div>
    return content
  }
}
