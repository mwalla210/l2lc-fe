import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import Login from './login'
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
    if (this.props.page.table){
      let TableType = this.props.page.table
      tableContent = <TableType/>
    }
    let formContent = null
    if (this.props.page.form){
      let FormType = this.props.page.form
      formContent = <FormType/>
    }
    let content = null
    if (this.props.page.content){
      let ContentType = this.props.page.content
      formContent = <ContentType/>
    }
    return (
      <div>
        <NavBar/>
        <h1>{this.props.page.title}</h1>
        {content}
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
    if (!this.props.page.loggedin)
      content = <div>{this.loginContent()}</div>
    else
      content = <div>{this.pageContent()}</div>
    return content
  }
}
