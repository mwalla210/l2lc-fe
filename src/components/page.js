import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { toJS } from 'mobx'
import Login from './login'
import Sidebar from './sidebar'
import Table from './table'
import Form from './form'

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
    if (this.props.page.formData){
      formContent = <Form
        fields={toJS(this.props.page.formData.fields)}
        primaryButton={this.props.page.formData.primaryButton}
        secondaryButton={this.props.page.formData.secondaryButton}/>
    }
    return (
      <div className='main'>
        <h1>{this.props.page.title}</h1>
        {this.props.page.content}
        {tableContent}
        {formContent}
        {this.props.page.buttons}
        <Sidebar highlight={this.props.page.navHighlight}/>
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
