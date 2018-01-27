import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import Login from './login'

@inject ('page') @observer
export default class Page extends Component {
  loginContent() {
    return(
      <Login/>
    )
  }

  pageContent(){
    // TODO add sidebar
    return (
      <div>
        <h1>{this.props.page.title}</h1>
        {this.props.page.content}
        {this.props.page.buttons}
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
